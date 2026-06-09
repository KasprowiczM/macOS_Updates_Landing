import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SectionReveal } from '../ui/SectionReveal'
import { TerminalBlock } from '../ui/TerminalBlock'
import { INSTALL_NIX } from '../../lib/site'

const UPDATE_NIX = 'cd ~/Dev_Env/macOS_updates && git pull'

export function Installation() {
  const { t } = useTranslation()
  const install = INSTALL_NIX
  const update = UPDATE_NIX

  return (
    <section id="installation" className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 overflow-hidden">
      <SectionReveal>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('installation.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[560px] mb-10" style={{ textWrap: 'pretty' as const }}>
          {t('installation.subtitle')}
        </p>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="max-w-[720px] space-y-8">
          {/* Prominent one-liner */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--accent-strong) mb-3">
              {t('installation.oneLiner')}
            </div>
            <TerminalBlock
              lines={[{ text: install, className: 'text-(--accent-strong)' }]}
              copyText={install}
            />
          </div>

          {/* Verify */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--fg-faint) mb-3">
              {t('installation.verify')}
            </div>
            <TerminalBlock
              lines={[{ text: 'bash update_all.sh --dry-run -y', className: 'text-(--code-fg)' }]}
              copyText="bash update_all.sh --dry-run -y"
            />
          </div>

          {/* Update */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--fg-faint) mb-3">
              {t('installation.update')}
            </div>
            <TerminalBlock
              lines={[{ text: update, className: 'text-(--code-fg)' }]}
              copyText={update}
            />
          </div>

          <div>
            <Link
              to="/docs#quick-install"
              className="text-(--accent-strong) hover:text-(--accent) text-[14px] font-medium font-sans no-underline transition-colors duration-(--dur-2)"
            >
              {t('installation.fullGuide')}
            </Link>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
