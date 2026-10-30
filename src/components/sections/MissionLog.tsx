import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { useLocalizedPath } from '../../lib/routes'
import { REPO_URL, TEST_COUNT } from '../../lib/site'
import { CONTAINER, SECTION_PAD } from './layout'

interface Readout {
  name: string
  from: string
  to: string
  how: 'appstore' | 'vendor'
}

interface Entry {
  id: 'release' | 'live' | 'verify'
  date: string
  readouts?: readonly Readout[]
}

/** Real, dated entries only. Dates and versions come from the toolkit's own history. */
const ENTRIES: readonly Entry[] = [
  { id: 'release', date: '2026-10-30' },
  {
    id: 'live',
    date: '2026-10-11',
    readouts: [
      { name: 'UniFi', from: '10.38.1', to: '11.0.0', how: 'appstore' },
      { name: 'OpenCode Desktop', from: '1.18.35', to: '1.19.0', how: 'vendor' },
    ],
  },
  { id: 'verify', date: '2026-10-05' },
]

const LINK_CLASS =
  'inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-(--accent-text) underline decoration-1 underline-offset-[0.2em] hover:text-(--accent-hover)'

/**
 * #log: proof as a dated ledger. Entries and the open-source facts share one
 * two-column grid (date or term on the left, content on the right).
 */
export function MissionLog() {
  const { t } = useTranslation()
  const localize = useLocalizedPath()
  const { stars, loading } = useGitHubStats()

  return (
    <section id="log" aria-labelledby="log-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
      <div className={CONTAINER}>
        <h2 id="log-title" className="m-0 max-w-[22ch]">
          {t('log.title')}
        </h2>
        <p className="mt-5 max-w-[40rem] text-(--fg-muted)">{t('log.lead')}</p>

        <ol className="m-0 mt-12 list-none p-0 md:mt-16">
          {ENTRIES.map((entry) => (
            <li
              key={entry.id}
              className="grid gap-x-12 gap-y-3 border-t border-(--rule-strong) py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:py-10"
            >
              <time dateTime={entry.date} className="readout text-[15px] font-medium text-(--fg)">
                {entry.date}
              </time>
              <div className="min-w-0">
                <h3 className="m-0 text-[clamp(1.25rem,1vw+1rem,1.625rem)] font-bold leading-tight tracking-[-0.015em] text-(--fg)">
                  {t(`log.entries.${entry.id}.title`)}
                </h3>
                <p className="mt-3 max-w-[40rem] text-(--fg-muted)">{t(`log.entries.${entry.id}.body`, { tests: TEST_COUNT })}</p>
                {entry.readouts ? (
                  <dl className="screen mt-5 grid max-w-[40rem] gap-0 text-[13px]">
                    {entry.readouts.map((row, i) => (
                      <div
                        key={row.name}
                        className={`grid gap-x-4 gap-y-0.5 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] ${i > 0 ? 'border-t border-(--screen-rule)' : ''}`}
                      >
                        <dt className="font-semibold text-(--screen-fg)">{row.name}</dt>
                        <dd className="readout m-0 text-(--screen-go) sm:text-right">
                          {row.from} → {row.to}
                        </dd>
                        <dd className="m-0 text-(--screen-dim) sm:col-span-2">{t(`log.how.${row.how}`)}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {entry.id === 'live' ? <p className="mt-4 max-w-[40rem] text-[15px] text-(--fg-muted)">{t('log.entries.live.note')}</p> : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-x-12 gap-y-3 border-y border-(--rule-strong) py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:py-10">
            <p className="m-0 text-[15px] font-medium text-(--fg)">{t('log.open.term')}</p>
            <div className="min-w-0">
              <h3 className="m-0 text-[clamp(1.25rem,1vw+1rem,1.625rem)] font-bold leading-tight tracking-[-0.015em] text-(--fg)">
                {t('log.open.title')}
              </h3>
              <p className="mt-3 max-w-[40rem] text-(--fg-muted)">{t('log.open.body', { tests: TEST_COUNT })}</p>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-7 gap-y-0 p-0 text-[15px]">
                <li>
                  <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {t('log.open.github')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </li>
                {!loading && stars > 0 ? (
                  <li className="flex min-h-[44px] items-center text-(--fg-muted)">
                    <span className="readout">{t('log.open.stars', { stars })}</span>
                  </li>
                ) : null}
                <li>
                  <Link to={localize('/changelog')} className={LINK_CLASS}>
                    {t('log.open.changelog')}
                  </Link>
                </li>
                <li>
                  <Link to={localize('/security')} className={LINK_CLASS}>
                    {t('log.open.security')}
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </section>
  )
}
