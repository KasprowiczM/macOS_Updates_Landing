import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'
import { BookOpen, ChevronDown, Apple } from 'lucide-react'
import { Button } from '../ui/Button'
import { TerminalBlock } from '../ui/TerminalBlock'
import { INSTALL_NIX, REPO_URL } from '../../lib/site'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

const TERMINAL_LINES = [
  { text: '$ bash update_all.sh --dry-run -y', delay: 0, color: 'text-(--code-fg)' },
  { text: '  ▸ step 0  prescan /Applications + brew + mas', delay: 700, color: 'text-(--code-fg)' },
  { text: '  ✓ inventory APPLICATIONS.md refreshed', delay: 1200, color: 'text-status-ok' },
  { text: '', delay: 1100 },
  { text: '  ▸ step 1  softwareupdate -ia -R --verbose', delay: 1650, color: 'text-(--code-fg)' },
  { text: '  ▸ step 2  sudo mas upgrade + iPad fallback', delay: 2150, color: 'text-(--code-fg)' },
  { text: '  ▸ step 3  Node, Bun, npm global CLIs', delay: 2650, color: 'text-(--code-fg)' },
  { text: '  ▸ step 4  brew upgrade + cleanup + doctor', delay: 3150, color: 'text-(--code-fg)' },
  { text: '  ▸ step 5  40+ internet app handlers', delay: 3650, color: 'text-(--code-fg)' },
  { text: '  ▸ step 6  postupdate history and versions', delay: 4150, color: 'text-(--code-fg)' },
  { text: '', delay: 4550 },
  { text: '  ✓ dry-run complete · no mutations applied', delay: 4850, color: 'text-(--accent-strong)' },
]

function TypewriterTerminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    })
  }, [])

  return (
    <div className="relative rounded-lg bg-(--code-bg) border border-[rgba(255,255,255,0.06)] overflow-hidden shadow-xl min-w-0 max-w-full">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
        <span className="w-2.5 h-2.5 rounded-full bg-status-err opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-status-warn opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-status-ok opacity-70" />
        <span className="ml-3 text-[11px] font-mono text-(--code-dim)">
          macOS Updates — zsh
        </span>
      </div>

      <div className="px-5 py-4 font-mono text-[13px] leading-[1.7] min-h-[260px] overflow-x-auto whitespace-pre">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.color || 'text-(--code-fg)'} ${line.text === '' ? 'h-3' : ''}`}>
            {line.text}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-(--accent) animate-[blink_1s_step-end_infinite] ml-0.5" />
        )}
      </div>
    </div>
  )
}


export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(50,120,184,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50,120,184,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-16">
        {/* Two-column layout on desktop */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text content */}
          <div className="min-w-0">
            {/* Eyebrow */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-(--accent-strong) shadow-[0_0_0_4px_rgba(74,163,255,0.18)]" />
              <span className="font-mono text-[12px] tracking-normal uppercase text-(--fg-muted)">
                {t('hero.eyebrow')}
              </span>
            </m.div>

            {/* Headline — three parts, serif-italic middle */}
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-(--fg) font-bold leading-[0.95] tracking-normal font-sans mb-0"
              style={{ fontSize: 'clamp(2rem, 4.5vw + 0.5rem, 3.8rem)' }}
            >
              {t('hero.headline1')}{' '}
              <em className="font-[family-name:var(--font-display)] font-normal italic tracking-tight text-(--fg-display)">
                {t('hero.headline2')}
              </em>
              <br />
              {t('hero.headline3')}
            </m.h1>

            {/* Subheadline — one sentence */}
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-(--fg-muted) max-w-[520px] mt-6 mb-7 leading-normal font-sans"
              style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
            >
              {t('hero.subheadline')}
            </m.p>

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3 items-center flex-wrap"
            >
              <Button as="a" href="/docs#quick-install" variant="primary">
                <BookOpen size={16} />
                {t('hero.ctaPrimary')}
              </Button>
              <Button as="a" href={REPO_URL} variant="ghost">
                <GitHubIcon size={16} />
                {t('hero.ctaSecondary')}
              </Button>
            </m.div>

            {/* One-liner install block */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-[560px]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-normal text-(--fg-faint)">
                  {t('hero.oneLinerLabel')}
                </span>
              </div>
              <TerminalBlock
                lines={[{ text: INSTALL_NIX, className: 'text-(--code-fg)' }]}
                copyText={INSTALL_NIX}
              />
            </m.div>

            {/* Platform badges */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4 items-center flex-wrap mt-8 font-mono text-[12px] font-medium text-(--fg-muted) tracking-wide"
            >
              <span className="flex items-center gap-2">
                <Apple size={14} className="text-(--fg-faint)" />
                {t('hero.platforms')}
              </span>
            </m.div>
          </div>

          {/* Right: Terminal demo (visible on lg+, below on mobile) */}
          <m.div
            className="min-w-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TypewriterTerminal />
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-(--fg-faint)" />
        </m.div>
      </m.div>
    </section>
  )
}
