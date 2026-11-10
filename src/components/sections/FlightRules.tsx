import { useTranslation } from 'react-i18next'
import { ShieldCheck, MousePointer2, PackageCheck, CheckCheck } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'
import { CONTAINER, SECTION_PAD } from './layout'
const RULES = ['vendor', 'open', 'installed', 'confirmed'] as const
const ICONS = [ShieldCheck, MousePointer2, PackageCheck, CheckCheck]
export function FlightRules() {
  const { t } = useTranslation()
  return (
    <section id="rules" aria-labelledby="rules-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
      <div className={`${CONTAINER} rules-layout`}>
        <div>
          <h2 id="rules-title" className="m-0 max-w-[18ch]">{t('rules.title')}</h2>
          <p className="mt-5 max-w-[30rem] text-(--fg-muted)">{t('rules.lead')}</p>
        </div>
        <div className="rules-items">
          {RULES.map((rule, i) => { const Icon = ICONS[i]; return <SectionReveal key={rule} delay={i * 0.08}>
            <Icon className="rule-icon" size={26} strokeWidth={1.4} aria-hidden="true" />
            <h3 className="m-0">{t(`rules.items.${rule}.title`)}</h3>
            <p className="mt-3">{t(`rules.items.${rule}.body`)}</p>
          </SectionReveal> })}
        </div>
      </div>
    </section>
  )
}
