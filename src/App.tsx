import { LazyMotion, domAnimation } from 'framer-motion'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Seo } from './components/Seo'
import { LandingPage } from './pages/LandingPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { DocsPage } from './pages/DocsPage'
import { SecurityPage } from './pages/SecurityPage'
import { ChangelogPage } from './pages/ChangelogPage'
import { ContributingPage } from './pages/ContributingPage'

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/contributing" element={<ContributingPage />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
      <Footer />
    </LazyMotion>
  )
}
