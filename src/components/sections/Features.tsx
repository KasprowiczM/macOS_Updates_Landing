import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, RefreshCw, Layers, Clock, Bot, Zap } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'

const FEATURES = [
  { key: 'pipeline', icon: Play },
  { key: 'snapshot', icon: RefreshCw },
  { key: 'frontends', icon: Layers },
  { key: 'scheduler', icon: Clock },
  { key: 'aiTools', icon: Bot },
  { key: 'vanillaJs', icon: Zap },
] as const

export function Features() {
  const { t } = useTranslation()

  return (
    <section id="features" className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <SectionReveal>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('features.title')}{' '}
          <code className="font-mono font-normal text-[0.85em] bg-(--bg-sunk) px-1.5 py-0.5 rounded-xs">
            {t('features.titleCode')}
          </code>{' '}
          {t('features.titleEnd')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[560px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('features.subtitle')}
        </p>
      </SectionReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feat, i) => {
          const Icon = feat.icon
          return (
            <SectionReveal key={feat.key} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="h-full p-7 border border-(--border) rounded-lg bg-(--bg-elev) hover:shadow-(--shadow-md) transition-shadow duration-(--dur-2)"
              >
                <div className="w-9 h-9 rounded-md bg-(--accent-soft) text-(--accent-strong) flex items-center justify-center mb-5">
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-[17px] font-sans tracking-tight mb-2">
                  {t(`features.${feat.key}.title`)}
                </h3>
                <p className="text-(--fg-muted) text-[14px] leading-[1.55] font-sans m-0">
                  {t(`features.${feat.key}.desc`)}
                </p>
              </motion.div>
            </SectionReveal>
          )
        })}
      </div>

      <SectionReveal delay={0.2}>
        <div className="mt-12">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono font-semibold text-[13px] tracking-wide text-(--fg) border border-(--border-strong) hover:bg-(--bg-sunk) hover:text-(--accent-strong) no-underline transition-colors duration-(--dur-2)"
          >
            {t('features.cta')}
          </Link>
        </div>
      </SectionReveal>
    </section>
  )
}
