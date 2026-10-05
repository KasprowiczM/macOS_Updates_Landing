import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Seo } from './components/Seo'

const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then(m => ({ default: m.FeaturesPage })))
const DocsPage = lazy(() => import('./pages/DocsPage').then(m => ({ default: m.DocsPage })))
const SecurityPage = lazy(() => import('./pages/SecurityPage').then(m => ({ default: m.SecurityPage })))
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })))
const ContributingPage = lazy(() => import('./pages/ContributingPage').then(m => ({ default: m.ContributingPage })))

function PageLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-2 font-mono text-[13px] text-(--fg-muted)">
        <span className="w-2 h-2 rounded-full bg-(--accent) animate-ping" />
        <span>Loading...</span>
      </div>
    </div>
  )
}

function NotFoundRedirect() {
  const { i18n } = useTranslation()
  return (
    <>
      <Seo
        title="macOS Updates"
        description=""
        path="/404"
        lang={i18n.language}
        noindex
      />
      <Navigate to="/" replace />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <LazyMotion features={domAnimation}>
      <Navbar theme={theme} toggleTheme={toggle} />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/contributing" element={<ContributingPage />} />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </Suspense>
      <Footer />
    </LazyMotion>
  )
}
