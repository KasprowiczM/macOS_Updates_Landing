import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BookOpen, GitFork, Star, Users } from 'lucide-react'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { SectionReveal } from '../ui/SectionReveal'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { TEST_COUNT, REPO_URL } from '../../lib/site'

export function OpenSource() {
  const { t } = useTranslation()
  const { stars, forks, contributors } = useGitHubStats()

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <SectionReveal>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('openSource.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[620px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('openSource.subtitle')}
        </p>
      </SectionReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Main card */}
        <SectionReveal delay={0.1}>
          <div className="p-8 border border-(--border) rounded-lg bg-(--bg-elev) h-full">
            <div className="flex gap-2 mb-6 flex-wrap">
              <Badge variant="accent">MIT</Badge>
              <Badge>Open source</Badge>
              <Badge>{TEST_COUNT} safety checks</Badge>
              <Badge>v1.0.17</Badge>
            </div>

            <h3 className="font-semibold text-xl font-sans tracking-tight mb-3">
              {t('openSource.builtInOpen')}
            </h3>
            <p className="text-(--fg-muted) text-[14px] leading-[1.6] font-sans mb-6">
              {t('openSource.builtInOpenDesc')}
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                to="/contributing"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-semibold text-[13px] font-sans text-(--fg) border border-(--border-strong) hover:bg-(--bg-sunk) no-underline transition-colors duration-(--dur-2)"
              >
                <BookOpen size={14} />
                {t('openSource.contribute')}
              </Link>
              <Link
                to="/changelog"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-semibold text-[13px] font-sans text-(--fg) border border-(--border-strong) hover:bg-(--bg-sunk) no-underline transition-colors duration-(--dur-2)"
              >
                {t('openSource.changelog')}
              </Link>
            </div>
          </div>
        </SectionReveal>

        {/* Stats card */}
        <SectionReveal delay={0.2}>
          <div className="p-8 border border-(--border) rounded-lg bg-(--bg-elev) h-full flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-normal text-(--fg-faint) mb-6">
                GitHub stats
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-(--fg-muted)">
                    <Star size={16} className="text-(--fg-faint)" />
                    <span className="text-[14px] font-sans">Stars</span>
                  </div>
                  <span className="font-mono font-semibold text-(--fg)">
                    {stars}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-(--fg-muted)">
                    <GitFork size={16} className="text-(--fg-faint)" />
                    <span className="text-[14px] font-sans">Forks</span>
                  </div>
                  <span className="font-mono font-semibold text-(--fg)">
                    {forks}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-(--fg-muted)">
                    <Users size={16} className="text-(--fg-faint)" />
                    <span className="text-[14px] font-sans">Contributors</span>
                  </div>
                  <span className="font-mono font-semibold text-(--fg)">
                    {contributors}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button as="a" href={REPO_URL} variant="primary" className="w-full justify-center">
                <GitHubIcon size={16} />
                View on GitHub
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
