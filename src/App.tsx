import { createElement, lazy, Suspense, type ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { useHtmlLang } from './hooks/useHtmlLang'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { getI18n } from './i18n'
import { LANGS, localizedPath, useLang } from './lib/routes'
import { getLoadedPage, pageLoaders, preloadPage, type PagePath } from './lib/pageLoaders'
import { NotFoundPage } from './pages/NotFoundPage'

// React.lazy creates a fresh pending promise on first render even when main.tsx
// already loaded the chunk, which made hydration drop the prerendered HTML for the
// Suspense fallback (a large layout shift). Render the cached module directly when
// it is available and fall back to lazy loading only for routes not loaded yet.
const LAZY_PAGES = Object.fromEntries(
  (Object.keys(pageLoaders) as PagePath[]).map((path) => [path, lazy(() => preloadPage(path))]),
) as Record<PagePath, ReturnType<typeof lazy>>

function RoutePage({ path }: { path: PagePath }) {
  return createElement(getLoadedPage(path) ?? LAZY_PAGES[path])
}

function PageLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-2.5 text-(--fg-muted)">
        <span className="lamp lamp-standby" aria-hidden="true" />
        <span className="placard">Loading</span>
      </div>
    </div>
  )
}

/** Feeds react-i18next the fixed instance for the language of the current URL. */
function LangProvider({ children }: { children: ReactNode }) {
  const lang = useLang()
  return <I18nextProvider i18n={getI18n(lang)}>{children}</I18nextProvider>
}

function Shell() {
  const { theme, toggle } = useTheme()
  useHtmlLang()

  return (
    <LazyMotion features={domAnimation}>
      <Navbar theme={theme} toggleTheme={toggle} />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {LANGS.flatMap((lang) =>
            (Object.keys(pageLoaders) as PagePath[]).map((path) => (
              <Route key={`${lang}:${path}`} path={localizedPath(path, lang)} element={<RoutePage path={path} />} />
            )),
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </LazyMotion>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  )
}
