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
  /** In-page contents beside the text, collapsible on narrow screens. */
  toc?: TocSection[]
  /** Heading of the contents panel. */
  tocTitle?: string
}

/**
 * Shared reading layout with a quiet contents panel and a comfortable text measure.
 */
export function DocLayout({ title, children, lead, toc, tocTitle }: DocLayoutProps) {
  const { t } = useTranslation()
  const localize = useLocalizedPath()

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  return (
    <main id="main" className="reading-layout mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="reading-header">
        <Link
          to={localize('/')}
          className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-(--fg-muted) no-underline hover:text-(--fg) focus-visible:ring-2 focus-visible:ring-(--accent)"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t('chrome.doc.backHome')}
        </Link>
        <h1 className="m-0 max-w-[22ch] text-(--fg)">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.55] text-(--fg-muted)">{lead}</p>}
      </header>
      <div className={toc ? 'reading-grid grid gap-x-12 gap-y-6 lg:grid-cols-[248px_minmax(0,1fr)]' : 'reading-grid'}>
        {toc && <aside className="reading-aside"><TocPanel sections={toc} title={tocTitle} /></aside>}
        <article className="reading-article read min-w-0">
          <div className="space-y-12 [&>section]:border-t [&>section]:border-(--rule) [&>section]:pt-8 [&>section:first-child]:border-t-0 [&>section:first-child]:pt-0">
            {children}
          </div>
        </article>
      </div>
    </main>
  )
}
