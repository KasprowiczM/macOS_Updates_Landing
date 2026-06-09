import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Apple, CheckCircle2 } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'
import { Badge } from '../ui/Badge'

export function PlatformSupport() {
  const { t } = useTranslation()
  const managers = t(`platformSupport.macos.managers`, { returnObjects: true }) as string[]

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 overflow-hidden">
      <SectionReveal>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('platformSupport.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[620px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('platformSupport.subtitle')}
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Platform Card */}
          <div className="bg-(--bg-elev) border border-(--border) rounded-xl overflow-hidden shadow-(--shadow-md) min-w-0">
            <div className="flex px-5 py-3.5 font-mono font-semibold text-[13px] tracking-wide uppercase border-b border-(--border) bg-(--bg-sunk) text-(--fg)">
              <Apple size={16} className="mr-2" />
              {t(`platformSupport.macos.name`)}
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="accent">
                  <CheckCircle2 size={12} />
                  Supported
                </Badge>
              </div>

              <h3 className="font-semibold text-xl font-sans tracking-tight mb-3">
                {t(`platformSupport.macos.name`)}
              </h3>

              <p className="font-mono text-[12px] leading-[1.6] text-(--fg-muted) mb-6 break-words">
                {t(`platformSupport.macos.status`)}
              </p>

              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--fg-faint) mb-3">
                Package managers covered
              </div>
              <div className="flex gap-2 flex-wrap">
                {managers.map((mgr: string) => (
                  <span
                    key={mgr}
                    className="font-mono text-[11px] font-medium px-2.5 py-1 rounded-(--radius-xs) bg-(--accent-soft) text-(--accent-strong) border border-(--border)"
                  >
                    {mgr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Manager explanations */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-(--bg-elev) border border-(--border) rounded-xl p-6 sm:p-8 md:p-10 shadow-(--shadow-md) min-w-0"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--accent-strong) mb-6">
              Manager details
            </div>

            <div className="space-y-5">
              {managers.map((mgr: string) => (
                <div key={mgr} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-(--accent-strong) mt-2 shrink-0" />
                  <div className="min-w-0">
                    <span className="font-mono text-[13px] font-semibold text-(--fg)">
                      {mgr}
                    </span>
                    <p className="text-(--fg-muted) text-[13px] leading-[1.55] font-sans mt-0.5 m-0 break-words">
                      {t(`platformSupport.managerDetail.${mgr}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="text-(--fg-faint) text-[13px] leading-[1.6] font-sans mt-8 max-w-[640px]" style={{ textWrap: 'pretty' as const }}>
          {t('platformSupport.note')}
        </p>
      </SectionReveal>
    </section>
  )
}
