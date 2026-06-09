import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, Shield, Zap, AlertTriangle, Calendar, Settings2 } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'

const STATS = [
  { key: 'timeBefore', value: '2h+', icon: Clock, highlight: true },
  { key: 'timeAfter', value: '~3 min', icon: Zap, highlight: false },
  { key: 'sources', value: '10+', icon: Settings2, highlight: false },
]

const REASONS = [
  { key: 'security', icon: Shield },
  { key: 'compatibility', icon: AlertTriangle },
  { key: 'automation', icon: Calendar },
]

export function WhyUpdate() {
  const { t } = useTranslation()

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle accent background */}
      <div className="absolute inset-0 bg-(--bg-sunk) opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionReveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--accent-strong) mb-4">
            {t('whyUpdate.eyebrow')}
          </div>
          <h2
            className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
            style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          >
            {t('whyUpdate.title')}
          </h2>
          <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[620px] mb-14" style={{ textWrap: 'pretty' as const }}>
            {t('whyUpdate.subtitle')}
          </p>
        </SectionReveal>

        {/* Time comparison cards */}
        <SectionReveal delay={0.1}>
          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.key}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative p-7 rounded-lg border ${
                    stat.highlight
                      ? 'border-(--err) bg-(--err-bg)'
                      : 'border-(--border) bg-(--bg-elev)'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-4 ${
                    stat.highlight ? 'bg-(--err) text-white' : 'bg-(--accent) text-(--accent-ink)'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className={`font-mono font-bold mb-1 ${
                    stat.highlight ? 'text-(--err) text-[32px]' : 'text-(--accent-strong) text-[32px]'
                  }`}>
                    {stat.value}
                  </div>
                  <p className="text-(--fg-muted) text-[14px] leading-normal font-sans">
                    {t(`whyUpdate.stats.${stat.key}`)}
                  </p>
                  {i === 0 && (
                    <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-(--err) opacity-60">
                      before
                    </div>
                  )}
                  {i === 1 && (
                    <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-(--accent-strong) opacity-60">
                      after
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </SectionReveal>

        {/* Why it matters — reasons grid */}
        <SectionReveal delay={0.2}>
          <div className="grid md:grid-cols-3 gap-5">
            {REASONS.map((reason) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.key}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 border border-(--border) rounded-lg bg-(--bg-elev) hover:shadow-(--shadow-md) transition-shadow duration-(--dur-2)"
                >
                  <div className="w-8 h-8 rounded-sm bg-(--accent) text-(--accent-ink) flex items-center justify-center mb-4">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-semibold text-[16px] font-sans tracking-tight mb-2">
                    {t(`whyUpdate.reasons.${reason.key}.title`)}
                  </h3>
                  <p className="text-(--fg-muted) text-[13px] leading-[1.55] font-sans m-0">
                    {t(`whyUpdate.reasons.${reason.key}.desc`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </SectionReveal>

        {/* Callout — personal story */}
        <SectionReveal delay={0.3}>
          <div className="mt-10 p-6 md:p-8 rounded-lg border border-(--border) bg-(--bg-elev) max-w-[720px]">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-(--accent) text-(--accent-ink) flex items-center justify-center shrink-0 mt-1 font-bold text-[14px]">
                ⚡
              </div>
              <div>
                <p className="text-(--fg) text-[15px] leading-[1.6] font-sans mb-0">
                  {t('whyUpdate.callout')}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
