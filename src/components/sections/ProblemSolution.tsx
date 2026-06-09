import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionReveal } from '../ui/SectionReveal'

const WITHOUT_LINES = [
  { text: '# Manual update pass', delay: 0, color: 'text-(--code-dim)' },
  { text: '> Open System Settings → Software Update', delay: 800, color: 'text-(--code-fg)' },
  { text: '  Restart required; come back later', delay: 1400, color: 'text-(--code-dim)' },
  { text: '> Open App Store → Updates', delay: 2400, color: 'text-(--code-fg)' },
  { text: '  iPad apps still waiting behind GUI', delay: 3400, color: 'text-status-warn' },
  { text: '> brew update && brew upgrade', delay: 4200, color: 'text-(--code-fg)' },
  { text: '  npm globals, Bun, and vendor apps not covered', delay: 5000, color: 'text-status-warn' },
  { text: '> Check Chrome, VS Code, Docker, Office...', delay: 5800, color: 'text-(--code-fg)' },
  { text: '  different updater, different state, no inventory', delay: 6600, color: 'text-status-err' },
  { text: '', delay: 7200 },
  { text: '# No single report. No coverage picture.', delay: 7800, color: 'text-status-err' },
  { text: '# Unknown installed apps stay unknown.', delay: 8600, color: 'text-status-err' },
]

const WITH_LINES = [
  { text: '$ bash update_all.sh --dry-run -y', delay: 0, color: 'text-(--code-fg)' },
  { text: '', delay: 600 },
  { text: '  ▸ Prescan     APPLICATIONS.md refreshed', delay: 800, color: 'text-(--code-fg)' },
  { text: '  ▸ Coverage    supported installed: 42 handlers', delay: 1200, color: 'text-(--code-fg)' },
  { text: '  ▸ Policy      missing apps reported, not installed', delay: 1600, color: 'text-(--code-dim)' },
  { text: '$ bash update_all.sh', delay: 2400, color: 'text-(--code-fg)' },
  { text: '  ▸ Apply       system, store, cli, brew, internet', delay: 3000, color: 'text-status-ok' },
  { text: '  ▸ Postupdate  UPDATES.md appended', delay: 3600, color: 'text-status-ok' },
  { text: '', delay: 4000 },
  { text: '  ✓ one run · local inventory · auditable log', delay: 4400, color: 'text-(--accent-strong)' },
  { text: '  ✓ logs/session-20260609/update_all.log', delay: 4800, color: 'text-(--accent-strong)' },
]

interface AnimatedTerminalProps {
  lines: typeof WITHOUT_LINES
  label: string
  variant: 'error' | 'success'
  timeLabel: string
}

function AnimatedTerminal({ lines, label, variant, timeLabel }: AnimatedTerminalProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [done, setDone] = useState(false)
  const started = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasBeenVisible = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible.current) {
          hasBeenVisible.current = true
          if (!started.current) {
            started.current = true
            lines.forEach((line, i) => {
              setTimeout(() => {
                setVisibleLines(i + 1)
                if (i === lines.length - 1) setDone(true)
              }, line.delay)
            })
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [lines])

  return (
    <div ref={containerRef} className="min-w-0">
      <div className="font-mono text-[11px] uppercase tracking-normal text-(--fg-faint) mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${variant === 'error' ? 'bg-(--err)' : 'bg-(--ok)'}`} />
          {label}
        </span>
        <span className={`text-[10px] font-bold ${variant === 'error' ? 'text-(--err)' : 'text-(--accent-strong)'}`}>
          {timeLabel}
        </span>
      </div>
      <div className="relative rounded-lg bg-(--code-bg) border border-[rgba(255,255,255,0.06)] overflow-hidden shadow-xl min-w-0 max-w-full">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
          <span className="w-2.5 h-2.5 rounded-full bg-(--err)" />
          <span className="w-2.5 h-2.5 rounded-full bg-(--warn)" />
          <span className="w-2.5 h-2.5 rounded-full bg-(--ok)" />
        </div>

        <div className="px-5 py-4 font-mono text-[13px] leading-[1.7] min-h-[200px] sm:min-h-[280px] overflow-x-auto whitespace-pre">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`${line.color || 'text-(--code-fg)'} ${line.text === '' ? 'h-3' : ''}`}>
              {line.text}
            </div>
          ))}
          {!done && visibleLines > 0 && visibleLines < lines.length && (
            <span className="inline-block w-2 h-4 bg-(--accent) animate-[blink_1s_step-end_infinite] ml-0.5" />
          )}
        </div>
      </div>
    </div>
  )
}

export function ProblemSolution() {
  const { t } = useTranslation()

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <SectionReveal>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('problemSolution.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[620px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('problemSolution.subtitle')}
        </p>
      </SectionReveal>

      <div className="grid md:grid-cols-2 gap-5 [&>*]:min-w-0">
        <SectionReveal delay={0.1}>
          <AnimatedTerminal
            lines={WITHOUT_LINES}
            label={t('problemSolution.without')}
            variant="error"
            timeLabel="~2h+ manual"
          />
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <AnimatedTerminal
            lines={WITH_LINES}
            label={t('problemSolution.with')}
            variant="success"
            timeLabel="~3 min"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-(--fg-muted) text-[13px] font-mono mt-3 tracking-wide"
          >
            {t('problemSolution.withDesc')}
          </motion.p>
        </SectionReveal>
      </div>
    </section>
  )
}
