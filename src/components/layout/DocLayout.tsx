import { type ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '../../lib/routes'
import { TocPanel, type TocSection } from './TocPanel'

interface DocLayoutProps {
  title: string
  children: ReactNode
  /** One-sentence lead under the title. */
  lead?: string
  /** In-page contents: rendered as a sticky console panel beside the text. */
  toc?: TocSection[]
  /** Heading of the contents panel. */
  tocTitle?: string
}

/**
 * Read mode: comprehension first. A 68ch measure, a quiet title, and an optional console
 * side panel that follows the reader through the page.
 */
export function DocLayout({ title, children, lead, toc, tocTitle }: DocLayoutProps) {
  const { t } = useTranslation()
  const localize = useLocalizedPath()

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className={toc ? 'grid gap-x-12 gap-y-6 lg:grid-cols-[248px_minmax(0,1fr)]' : undefined}>
        {toc && (
          <aside className="order-2 lg:order-1 lg:row-span-2">
            <TocPanel sections={toc} title={tocTitle} />
          </aside>
        )}

        <header className="order-1 lg:order-2 lg:col-start-2">
          <Link
            to={localize('/')}
            className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-(--fg-muted) no-underline hover:text-(--fg)"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t('chrome.doc.backHome')}
          </Link>
          <h1
            className="m-0 max-w-[22ch] text-(--fg)"
            style={{ fontSize: 'clamp(2.25rem, 3.4vw + 0.9rem, 3.75rem)', lineHeight: 1.03 }}
          >
            {title}
          </h1>
          {lead && <p className="mt-4 max-w-[60ch] text-[18px] leading-[1.55] text-(--fg-muted)">{lead}</p>}
        </header>

        <article className="read order-3 min-w-0 pt-6 lg:col-start-2">
          <div className="space-y-12 [&>section]:border-t [&>section]:border-(--rule) [&>section]:pt-8 [&>section:first-child]:border-t-0 [&>section:first-child]:pt-0">
            {children}
          </div>
        </article>
      </div>
    </main>
  )
}
