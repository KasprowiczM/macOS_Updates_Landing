import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Store, PackageCheck, FileCheck, ChevronRight } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'

const PHASES = [
  {
    key: 'check',
    icon: Search,
    color: '#3278B8',
    terminal: [
      '$ bash build_inventory.sh',
      '',
      '  ▸ scan      /Applications',
      '  ▸ scan      brew formulae and casks',
      '  ▸ scan      mas installed apps',
      '  ▸ write     APPLICATIONS.md',
      '',
      '  ✓ prescan complete — local inventory ready',
    ],
  },
  {
    key: 'plan',
    icon: Store,
    color: '#E0A82E',
    terminal: [
      '  ▸ step 1   sudo softwareupdate -ia -R --verbose',
      '  ▸ step 2   sudo env MAS_NO_AUTO_INDEX=1 mas upgrade',
      '',
      '  app store:',
      '    native macOS apps       mas',
      '    iPad apps on macOS      AppleScript GUI',
      '',
      '  ✓ Apple layers complete',
    ],
  },
  {
    key: 'apply',
    icon: PackageCheck,
    color: '#18A66A',
    terminal: [
      '  ▸ step 3   update_npm_cli.sh',
      '  ▸ native   Node.js, Bun, npm global CLIs',
      '  ▸ step 4   update_brew.sh',
      '  ▸ brew     formulae, casks, cleanup, doctor',
      '',
      '  ✓ developer tooling current',
    ],
  },
  {
    key: 'verify',
    icon: FileCheck,
    color: '#18A66A',
    terminal: [
      '  ▸ step 5   update_internet_apps.sh',
      '  ▸ methods  keystone · github_dmg · msupdate · docker_cli',
      '  ▸ policy   missing supported apps are reported only',
      '  ▸ step 6   postupdate.py',
      '',
      '  ✓ APPLICATIONS.md versions bumped',
      '  ✓ UPDATES.md history appended',
    ],
  },
] as const

export function UpdatePipeline() {
  const { t } = useTranslation()
  const [activePhase, setActivePhase] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isAutoPlaying) return
    intervalRef.current = setInterval(() => {
      setActivePhase(prev => (prev + 1) % PHASES.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying])

  const handlePhaseClick = (index: number) => {
    setActivePhase(index)
    setIsAutoPlaying(false)
  }

  const phase = PHASES[activePhase]
  const Icon = phase.icon

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      {/* Subtle token gradient backdrop (replaces removed broken screenshot ref) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 rounded-xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(24,166,106,0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <SectionReveal>
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--accent-strong) mb-4">
          {t('pipeline.eyebrow')}
        </div>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('pipeline.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[620px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('pipeline.subtitle')}
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        {/* Phase selector — horizontal pipeline */}
        <div className="flex items-center gap-1 md:gap-0 mb-8 overflow-x-auto pb-2">
          {PHASES.map((p, i) => {
            const PhaseIcon = p.icon
            const isActive = i === activePhase
            const isPast = i < activePhase
            return (
              <div key={p.key} className="flex items-center shrink-0">
                <button
                  onClick={() => handlePhaseClick(i)}
                  className={`relative flex items-center gap-2 px-4 py-3 rounded-md font-mono text-[12px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 border ${
                    isActive
                      ? 'bg-(--bg-inverse) text-(--fg-inverse) border-transparent shadow-lg'
                      : isPast
                        ? 'bg-(--bg-sunk) text-(--fg) border-(--border)'
                        : 'text-(--fg-muted) border-transparent hover:text-(--fg) hover:bg-(--bg-sunk)'
                  }`}
                >
                  <PhaseIcon size={14} />
                  <span className="hidden sm:inline">{t(`pipeline.phases.${p.key}.name`)}</span>
                  {isActive && (
                    <motion.div
                      layoutId="pipeline-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  )}
                </button>
                {i < PHASES.length - 1 && (
                  <ChevronRight size={14} className={`mx-1 shrink-0 ${i < activePhase ? 'text-(--fg-muted)' : 'text-(--fg-faint)'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Phase content */}
        <div className="grid md:grid-cols-[1fr,1.4fr] gap-6">
          {/* Description card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="p-7 border border-(--border) rounded-lg bg-(--bg-elev)"
            >
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-5"
                style={{ backgroundColor: `${phase.color}40`, color: phase.color }}
              >
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-[18px] font-sans tracking-tight mb-2">
                {t(`pipeline.phases.${phase.key}.name`)}
              </h3>
              <p className="text-(--fg-muted) text-[14px] leading-[1.6] font-sans mb-4">
                {t(`pipeline.phases.${phase.key}.desc`)}
              </p>
              <div className="text-(--fg-muted) text-[12px] font-mono leading-normal">
                {t(`pipeline.phases.${phase.key}.detail`)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Terminal preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.key + '-term'}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg bg-(--code-bg) border border-[rgba(255,255,255,0.06)] overflow-hidden"
            >
              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
                <span className="w-2.5 h-2.5 rounded-full bg-status-err opacity-70" />
                <span className="w-2.5 h-2.5 rounded-full bg-status-warn opacity-70" />
                <span className="w-2.5 h-2.5 rounded-full bg-status-ok opacity-70" />
                <span className="ml-3 text-[11px] font-mono text-(--code-dim)">
                  phase: {phase.key}
                </span>
                {/* Phase progress dots */}
                <div className="ml-auto flex gap-1.5">
                  {PHASES.map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: i <= activePhase ? PHASES[i].color : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 font-mono text-[12px] leading-[1.7] min-h-[200px] sm:min-h-[240px] overflow-x-auto whitespace-pre">
                {phase.terminal.map((line, i) => (
                  <motion.div
                    key={`${phase.key}-${i}`}
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    className={`${
                      line === '' ? 'h-3' :
                      line.startsWith('  ✓') ? 'text-(--accent-strong)' :
                      line.startsWith('  ▸') ? 'text-(--code-fg)' :
                      line.startsWith('$') ? 'text-(--code-fg)' :
                      'text-(--code-dim)'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-play indicator */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-(--fg-faint) hover:text-(--fg-muted) text-[11px] font-mono tracking-wide uppercase transition-colors"
          >
            {isAutoPlaying ? '⏸ pause' : '▶ auto-play'}
          </button>
          {isAutoPlaying && (
            <motion.div
              key={activePhase}
              className="h-0.5 rounded-full bg-(--accent-strong)"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          )}
        </div>
      </SectionReveal>
    </section>
  )
}
