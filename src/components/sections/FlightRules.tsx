import { useTranslation } from 'react-i18next'
import { CONTAINER, SECTION_PAD } from './layout'

const RULES = ['vendor', 'open', 'installed', 'confirmed'] as const

/**
 * #rules: the four promises as large typographic statements. Offset on a
 * 12-column grid so the eye zigzags down the page; single column on mobile.
 */
export function FlightRules() {
  const { t } = useTranslation()

  return (
    <section id="rules" aria-labelledby="rules-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
      <div className={CONTAINER}>
        <div className="max-w-[44rem]">
          <h2 id="rules-title" className="m-0">
            {t('rules.title')}
          </h2>
          <p className="mt-5 max-w-[40rem] text-(--fg-muted)">{t('rules.lead')}</p>
        </div>

        <div className="mt-14 grid gap-y-12 md:mt-20 md:gap-y-16 lg:grid-cols-12">
          {RULES.map((rule, index) => (
            <div
              key={rule}
              className={`border-t border-(--rule-strong) pt-6 lg:col-span-8 ${index % 2 === 1 ? 'lg:col-start-5' : ''}`}
            >
              <h3 className="m-0 text-[clamp(1.75rem,2.5vw+0.9rem,2.875rem)] font-bold leading-[1.06] tracking-[-0.025em] text-(--fg)">
                {t(`rules.items.${rule}.title`)}
              </h3>
              <p className="mt-4 max-w-[34rem] text-[17px] text-(--fg-muted)">{t(`rules.items.${rule}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
