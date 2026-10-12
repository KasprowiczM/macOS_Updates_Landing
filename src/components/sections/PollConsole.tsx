import { useId } from 'react'
import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { INTERNET_APP_COUNT, UPDATE_METHOD_COUNT } from '../../lib/site'
import { STATIONS } from './pollData'
import type { PollState } from './pollData'
import './poll.css'

const LAMP_CLASS: Record<PollState, string> = {
  go: 'lamp lamp-go',
  hold: 'lamp lamp-hold',
  standby: 'lamp lamp-standby',
}

const STATE_COLOR: Record<PollState, string> = {
  go: 'text-(--screen-go)',
  hold: 'text-(--screen-hold)',
  standby: 'text-(--screen-dim)',
}

export function PollConsole() {
  const { t } = useTranslation()
  const titleId = useId()

  return (
    <div id="poll-console" className="screen scroll-mt-24" role="group" aria-labelledby={titleId}>
      <div className="flex items-center justify-between gap-3 border-b border-(--screen-rule) px-4 py-3.5">
        <p id={titleId} className="placard m-0 min-w-0 text-[10.5px] tracking-[0.05em] text-(--screen-fg) sm:text-[11.5px] sm:tracking-[0.07em]">
          {t('wall.screen.title')}
        </p>
        <p className="m-0 flex shrink-0 items-baseline gap-2 whitespace-nowrap" aria-hidden="true">
          <span className="placard">{t('wall.screen.tMinus')}</span>
          <span className="poll-count readout text-[14px] text-(--screen-go) sm:text-[15px]" />
        </p>
      </div>

      <ol className="m-0 list-none p-0" aria-label={t('wall.listLabel')}>
        {STATIONS.map((station, index) => {
          const animated = station.id !== 'macos'
          const style = { '--i': index } as CSSProperties
          return (
            <li
              key={station.id}
              style={style}
              className={`${animated ? 'poll-row ' : ''}grid grid-cols-[10px_minmax(0,1fr)] items-center gap-x-3.5 border-b border-(--screen-rule) px-4 py-3.5 sm:grid-cols-[10px_minmax(0,1fr)_auto]`}
            >
              <span className={LAMP_CLASS[station.lamp]} aria-hidden="true" />
              <div className="min-w-0">
                <p className={`placard m-0 text-[12px] text-(--screen-fg) ${station.id === 'macos' ? 'normal-case' : ''}`}>{t(`wall.station.${station.id}.name`)}</p>
                <p className="readout m-0 mt-0.5 truncate text-[11.5px] leading-snug text-(--screen-dim)">
                  {t(`hero.console.detail.${station.id}`, { apps: INTERNET_APP_COUNT, methods: UPDATE_METHOD_COUNT })}
                </p>
              </div>
              <span
                className={`placard col-start-2 mt-1.5 text-[11.5px] whitespace-nowrap sm:col-start-3 sm:mt-0 ${STATE_COLOR[station.lamp]} ${animated ? 'poll-state' : ''}`}
                data-from={animated ? t('wall.state.standby') : undefined}
              >
                <span className="poll-state-to">{t(`hero.console.state.${station.text}`)}</span>
              </span>
            </li>
          )
        })}
      </ol>

      <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 px-4 py-3.5 text-[12px] leading-snug text-(--screen-dim)">
        {(['go', 'hold', 'standby'] as const).map((key) => (
          <li key={key} className="flex items-center gap-2">
            <span className={LAMP_CLASS[key]} aria-hidden="true" />
            <span>
              <strong className="font-semibold text-(--screen-fg)">{t(`wall.state.${key}`)}</strong>
              {': '}
              {t(`hero.console.legend.${key}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
