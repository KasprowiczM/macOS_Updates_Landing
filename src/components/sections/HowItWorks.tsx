import { useTranslation } from 'react-i18next'
import { Download, Settings, Zap } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'
import { TerminalBlock } from '../ui/TerminalBlock'

const STEPS = [
  {
    key: 'step1',
    icon: Download,
    lines: [
      { text: '# Install macOS Updates', className: 'text-(--code-dim)' },
      { text: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/KasprowiczM/macOS_updates/main/install.sh)"', className: 'text-(--accent-strong)' },
      { text: '', className: '' },
      { text: 'bash build_inventory.sh', className: 'text-(--code-fg)' },
    ],
    copyText: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/KasprowiczM/macOS_updates/main/install.sh)"',
  },
  {
    key: 'step2',
    icon: Settings,
    lines: [
      { text: '# Preview and coverage', className: 'text-(--code-dim)' },
      { text: 'bash update_all.sh --dry-run -y', className: 'text-(--accent-strong)' },
      { text: '', className: '' },
      { text: 'bash scripts/report_update_coverage.sh', className: 'text-(--code-fg)' },
      { text: '  supported installed · missing · unknown', className: 'text-(--code-fg)' },
    ],
    copyText: 'bash update_all.sh --dry-run -y',
  },
  {
    key: 'step3',
    icon: Zap,
    lines: [
      { text: '# Run the orchestrator', className: 'text-(--code-dim)' },
      { text: 'bash update_all.sh', className: 'text-(--accent-strong)' },
      { text: '', className: '' },
      { text: '  ▸ system · appstore · npm · brew · internet', className: 'text-(--code-fg)' },
      { text: '  ✓ postupdate inventory and history written', className: 'text-(--code-fg)' },
    ],
    copyText: 'bash update_all.sh',
  },
] as const

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <SectionReveal>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('howItWorks.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[560px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('howItWorks.subtitle')}
        </p>
      </SectionReveal>

      {/* Timeline layout — vertical on all sizes */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-(--border) hidden md:block" />

        <div className="space-y-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <SectionReveal key={step.key} delay={i * 0.12}>
                <div className="relative flex gap-6 md:gap-8">
                  {/* Timeline node */}
                  <div className="hidden md:flex flex-col items-center shrink-0">
                    <span className="w-10 h-10 rounded-full bg-(--accent) text-(--accent-ink) flex items-center justify-center font-mono font-bold text-[14px] z-10 relative shadow-[0_0_0_4px_var(--bg)]">
                      {i + 1}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-(--border-strong) mt-2" />
                    )}
                  </div>

                  {/* Card content — full width */}
                  <div className="flex-1 min-w-0">
                    {/* Mobile step number */}
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                      <span className="md:hidden w-8 h-8 rounded-full bg-(--accent) text-(--accent-ink) flex items-center justify-center font-mono font-bold text-[13px]">
                        {i + 1}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--fg-muted) md:mb-3 md:block">
                        {t(`howItWorks.${step.key}.label`)}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 border border-(--border) rounded-lg bg-(--bg-elev) hover:shadow-(--shadow-md) transition-shadow duration-(--dur-2)">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-9 h-9 rounded-sm bg-(--accent-soft) text-(--accent-strong) flex items-center justify-center shrink-0">
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[17px] font-sans tracking-tight mb-1">
                            {t(`howItWorks.${step.key}.title`)}
                          </h3>
                          <p className="text-(--fg-muted) text-[14px] leading-[1.55] font-sans">
                            {t(`howItWorks.${step.key}.desc`)}
                          </p>
                        </div>
                      </div>
                      <TerminalBlock
                        lines={[...step.lines]}
                        copyText={step.copyText}
                      />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
