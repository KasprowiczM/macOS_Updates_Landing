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
      <main id="main" className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="screen mb-8 w-full max-w-[34rem] overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-(--screen-rule) px-4 py-2.5">
            <span className="lamp lamp-nogo" aria-hidden="true" />
            <span className="placard text-(--screen-fg)">NO-GO</span>
            <span className="readout ml-auto text-[12px] text-(--screen-dim)">404</span>
          </div>
          <p className="readout m-0 truncate px-4 py-3 text-[13px] text-(--screen-fg)" title={pathname}>
            <span className="mr-2.5 select-none text-(--screen-dim)" aria-hidden="true">GET</span>
            {pathname}
          </p>
        </div>
        <h1 className="m-0 max-w-[16ch]" style={{ fontSize: 'clamp(2.25rem, 3.4vw + 0.9rem, 3.75rem)' }}>
          {t('chrome.notFound.title')}
        </h1>
        <p className="mb-8 mt-4 max-w-[52ch] text-[18px] text-(--fg-muted)">{t('chrome.notFound.body')}</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">{t('chrome.notFound.home')}</Button>
          <Button href="/docs" variant="secondary">{t('chrome.notFound.docs')}</Button>
        </div>
      </main>
    </>
  )
}

export default NotFoundPage
