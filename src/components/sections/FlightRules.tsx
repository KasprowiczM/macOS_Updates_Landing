import { useTranslation } from 'react-i18next'
import { CONTAINER, SECTION_PAD } from './layout'

const RULES = ['vendor', 'open', 'installed', 'confirmed'] as const

/**
 * #rules: the four promises as a ruled grid. Four columns from 1280px, a 2x2
 * grid from 768px, one column below. Each rule hangs from the same hairline.
 */
export function FlightRules() {
  const { t } = useTranslation()

  return (
    <section id="rules" aria-labelledby="rules-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
      <div className={CONTAINER}>
        <h2 id="rules-title" className="m-0 max-w-[22ch]">
          {t('rules.title')}
        </h2>
        <p className="mt-5 max-w-[40rem] text-(--fg-muted)">{t('rules.lead')}</p>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:mt-14 md:grid-cols-2 xl:grid-cols-4">
          {RULES.map((rule) => (
            <div key={rule} className="border-t-2 border-(--fg) pt-5">
              <h3 className="m-0 text-[1.625rem] font-bold leading-[1.1] tracking-[-0.02em] text-(--fg) md:text-[1.75rem]">
                {t(`rules.items.${rule}.title`)}
              </h3>
              <p className="mt-3 max-w-[30rem] text-[16px] leading-relaxed text-(--fg-muted)">
                {t(`rules.items.${rule}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
