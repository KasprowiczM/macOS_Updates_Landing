import { lazy, Suspense, type ReactElement, type ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Link, Route, Routes } from 'react-router-dom'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { useHtmlLang } from './hooks/useHtmlLang'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Seo } from './components/Seo'
import { getI18n } from './i18n'
import { LANGS, localizedPath, useLang } from './lib/routes'
import { pageLoaders, type PagePath } from './lib/pageLoaders'

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
      <div className="flex items-center gap-2 font-mono text-[13px] text-(--fg-muted)">
        <span className="w-2 h-2 rounded-full bg-(--accent) animate-ping" />
        <span>Loading...</span>
      </div>
    </div>
  )
}

/** Unknown URL: a real (noindex) page, served by the host with a 404 status via 404.html. */
function NotFoundPage() {
  const { i18n } = useTranslation()
  const pl = i18n.language === 'pl'
  return (
    <>
      <Seo title={pl ? 'Nie znaleziono strony | macOS Updates' : 'Page not found | macOS Updates'} description="" path="/404" noindex />
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
        <h1 className="text-(--fg) font-bold text-[32px] tracking-tight font-sans m-0">
          {pl ? 'Nie znaleziono strony' : 'Page not found'}
        </h1>
        <p className="text-(--fg-muted) text-[16px] font-sans m-0">
          {pl ? 'Ten adres nie istnieje.' : 'This address does not exist.'}
        </p>
        <Link
          to={localizedPath('/', i18n.language)}
          className="inline-flex items-center justify-center min-h-[44px] px-4 text-(--accent) font-mono text-[14px] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus)"
        >
          {pl ? 'Wróć na stronę główną' : 'Back to home'}
        </Link>
      </main>
    </>
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
