import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'

/**
 * Unknown URL: a real (noindex) page, served by the host with a 404 status via 404.html.
 * The readout shows the path that failed, so the page tells the visitor what was requested.
 */
export function NotFoundPage() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <>
      <Seo title={t('chrome.notFound.seoTitle')} description="" path="/404" noindex />
      <main id="main" className="reading-layout min-h-[60vh]">
        <header className="reading-header">
        <h1 className="m-0 max-w-[16ch]">
          {t('chrome.notFound.title')}
        </h1>
        <p className="readout text-[13px] text-(--fg-muted) [overflow-wrap:anywhere]">404 · {pathname}</p>
        <p className="mb-8 mt-4 max-w-[52ch] text-[18px] text-(--fg-muted)">{t('chrome.notFound.body')}</p>
        </header>
        <div className="flex flex-wrap gap-3">
          <Button href="/">{t('chrome.notFound.home')}</Button>
          <Button href="/docs" variant="secondary">{t('chrome.notFound.docs')}</Button>
        </div>
      </main>
    </>
  )
}

export default NotFoundPage
