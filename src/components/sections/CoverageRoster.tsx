import { useTranslation } from 'react-i18next'
import { INTERNET_APP_COUNT, UPDATE_METHOD_COUNT } from '../../lib/site'
import { Code } from './Code'
import { METHOD_GROUPS } from './coverageData'
import { CONTAINER, SECTION_PAD } from './layout'

const OTHER_LAYERS = ['appstore', 'brew', 'cli', 'macos'] as const

/**
 * #coverage: the registry as grouped chunks in balanced columns. Chunks differ
 * in height on purpose, so the roster reads as a roster and not as a card grid.
 */
export function CoverageRoster() {
  const { t } = useTranslation()

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-title"
      className={`border-y border-(--rule) bg-(--bg-sunk) ${SECTION_PAD}`}
    >
      <div className={CONTAINER}>
        <h2 id="coverage-title" className="m-0 max-w-[22ch]">
          {t('coverage.title', { apps: INTERNET_APP_COUNT, methods: UPDATE_METHOD_COUNT })}
        </h2>
        <p className="mt-5 max-w-[40rem] text-(--fg-muted)">{t('coverage.lead')}</p>

        <div className="-mb-10 mt-14 gap-x-12 sm:columns-2 lg:columns-3 md:mt-16">
          {METHOD_GROUPS.map((group) => (
            <div
              key={group.method}
              role="group"
              aria-labelledby={`cov-${group.method}`}
              className="mb-10 break-inside-avoid border-t border-(--rule-strong) pt-4"
            >
              <header className="flex items-baseline justify-between gap-3">
                <h3 id={`cov-${group.method}`} className="placard m-0 text-[12px] font-semibold text-(--fg)">
                  {t(`coverage.methods.${group.method}.name`)}
                </h3>
                <span className="readout text-[13px] text-(--fg-faint)">
                  {group.apps.length}
                </span>
              </header>
              <p className="readout mt-1 text-[11.5px] text-(--fg-faint)">{group.method}</p>
              <p className="mt-2 text-[14.5px] leading-snug text-(--fg-muted)">{t(`coverage.methods.${group.method}.note`)}</p>
              <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-0 gap-y-1 p-0 text-[15px] leading-snug text-(--fg)">
                {group.apps.map((app) => (
                  <li key={app} className="after:mr-1.5 after:content-[','] last:after:content-none">
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div role="group" aria-labelledby="cov-other" className="mb-10 break-inside-avoid border-t border-(--rule-strong) pt-4">
            <h3 id="cov-other" className="placard m-0 text-[12px] font-semibold text-(--fg)">
              {t('coverage.other.title')}
            </h3>
            <dl className="m-0 mt-3 grid gap-3 text-[14.5px] leading-snug">
              {OTHER_LAYERS.map((layer) => (
                <div key={layer}>
                  <dt className="font-semibold text-(--fg)">{t(`coverage.other.${layer}.name`)}</dt>
                  <dd className="m-0 text-(--fg-muted)">{t(`coverage.other.${layer}.note`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-12 flex max-w-[52rem] flex-wrap items-center gap-x-2 gap-y-2 text-[15px] text-(--fg-muted)">
          <Code>bash scripts/report_update_coverage.sh</Code>
          <span>
            {t('coverage.reportCmd')} {t('coverage.report')}
          </span>
        </p>
      </div>
    </section>
  )
}
