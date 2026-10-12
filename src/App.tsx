import { lazy, Suspense, type ReactElement, type ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { useHtmlLang } from './hooks/useHtmlLang'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { getI18n } from './i18n'
import { LANGS, localizedPath, useLang } from './lib/routes'
import { pageLoaders, type PagePath } from './lib/pageLoaders'
import { NotFoundPage } from './pages/NotFoundPage'

const LandingPage = lazy(pageLoaders['/'])
const FeaturesPage = lazy(pageLoaders['/features'])
const DocsPage = lazy(pageLoaders['/docs'])
const SecurityPage = lazy(pageLoaders['/security'])
const ChangelogPage = lazy(pageLoaders['/changelog'])
const ContributingPage = lazy(pageLoaders['/contributing'])

const PAGES: Record<PagePath, ReactElement> = {
  '/': <LandingPage />,
  '/features': <FeaturesPage />,
  '/docs': <DocsPage />,
  '/security': <SecurityPage />,
  '/changelog': <ChangelogPage />,
  '/contributing': <ContributingPage />,
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
            (Object.keys(PAGES) as PagePath[]).map((path) => (
              <Route key={`${lang}:${path}`} path={localizedPath(path, lang)} element={PAGES[path]} />
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
