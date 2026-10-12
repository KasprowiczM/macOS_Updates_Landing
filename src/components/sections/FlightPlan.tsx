import { useTranslation } from 'react-i18next'
import { INTERNET_APP_COUNT, UPDATE_METHOD_COUNT } from '../../lib/site'
import { Code } from './Code'
import { CONTAINER, SECTION_PAD } from './layout'

const STEPS = [
  { id: 'prescan', step: 0 },
  { id: 'appstore', step: 1 },
  { id: 'cli', step: 2 },
  { id: 'brew', step: 3 },
  { id: 'internet', step: 4 },
  { id: 'post', step: 5 },
  { id: 'macos', step: 6 },
] as const

const MOBILE_LABEL =
  'max-md:before:mb-1 max-md:before:block max-md:before:content-[attr(data-label)] max-md:before:text-[11.5px] max-md:before:font-semibold max-md:before:uppercase max-md:before:leading-tight max-md:before:tracking-[0.07em] max-md:before:text-(--fg-muted) max-md:before:[font-stretch:125%]'

/**
 * #stations: the reference version of the wall. A real table on desktop; on
 * small screens every row becomes a stacked block. ARIA roles are kept so the
 * table semantics survive the display change.
 */
export function FlightPlan() {
  const { t } = useTranslation()
  const colStation = t('stations.cols.station')
  const colWhat = t('stations.cols.what')
  const colGuard = t('stations.cols.guard')

  return (
    <section id="stations" aria-labelledby="stations-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
      <div className={CONTAINER}>
        <h2 id="stations-title" className="m-0 max-w-[24ch]">
          {t('stations.title')}
        </h2>
        <p className="mt-5 max-w-[40rem] text-(--fg-muted)">{t('stations.lead')}</p>

        <div className="mt-12 overflow-hidden rounded-sm border border-(--rule-strong) bg-(--bg-elev) md:mt-14">
          <table role="table" className="w-full border-collapse text-left max-md:block">
            <caption className="sr-only">{t('stations.caption')}</caption>
            <thead role="rowgroup" className="max-md:sr-only">
              <tr role="row" className="border-b border-(--rule-strong) bg-(--bg-sunk)">
                <th role="columnheader" scope="col" className="placard w-[13.5rem] px-5 py-3 font-semibold">
                  {colStation}
                </th>
                <th role="columnheader" scope="col" className="placard px-5 py-3 font-semibold">
                  {colWhat}
                </th>
                <th role="columnheader" scope="col" className="placard px-5 py-3 font-semibold">
                  {colGuard}
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="max-md:block">
              {STEPS.map(({ id, step }) => (
                <tr
                  key={id}
                  role="row"
                  className="border-t border-(--rule) first:border-t-0 max-md:block max-md:px-5 max-md:py-5"
                >
                  <th
                    role="rowheader"
                    scope="row"
                    className="px-5 py-5 align-top font-normal max-md:block max-md:p-0"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="readout w-5 text-[13px] text-(--fg-faint)">{String(step + 1).padStart(2, '0')}</span>
                      <span className={`placard text-(--fg) ${id === 'macos' ? 'normal-case' : ''}`}>{t(`wall.station.${id}.name`)}</span>
                    </span>
                  </th>
                  <td
                    role="cell"
                    data-label={colWhat}
                    className={`px-5 py-5 align-top text-[15px] leading-relaxed text-(--fg) max-md:mt-3 max-md:block max-md:p-0 ${MOBILE_LABEL}`}
                  >
                    {t(`stations.rows.${id}.what`, { apps: INTERNET_APP_COUNT, methods: UPDATE_METHOD_COUNT })}
                  </td>
                  <td
                    role="cell"
                    data-label={colGuard}
                    className={`px-5 py-5 align-top text-[15px] leading-relaxed text-(--fg-muted) max-md:mt-3 max-md:block max-md:p-0 ${MOBILE_LABEL}`}
                  >
                    {t(`stations.rows.${id}.guard`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 flex max-w-[48rem] flex-wrap items-center gap-x-2 gap-y-2 text-[15px] text-(--fg-muted)">
          <span>{t('stations.flags')}</span>
          <Code>--skip-appstore</Code>
          <Code>--skip-system</Code>
          <Code>--dry-run</Code>
        </p>
      </div>
    </section>
  )
}
