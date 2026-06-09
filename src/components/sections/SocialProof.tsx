import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Star, Users, Tag, Scale, Layers, FlaskConical } from 'lucide-react'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { SectionReveal } from '../ui/SectionReveal'
import { APP_VERSION, TEST_COUNT } from '../../lib/site'

function CountUp({ target, duration = 600 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (target <= 0 || started.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(target * eased))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}</span>
}

export function SocialProof() {
  const { t } = useTranslation()
  const { stars, contributors } = useGitHubStats()

  const items = [
    { icon: Star, label: t('socialProof.stars'), value: stars, countUp: true },
    { icon: Users, label: t('socialProof.contributors'), value: contributors, countUp: true },
    { icon: Tag, label: t('socialProof.version'), value: APP_VERSION, countUp: false },
    { icon: FlaskConical, label: t('socialProof.tests'), value: `${TEST_COUNT}`, countUp: false },
    { icon: Scale, label: t('socialProof.license'), value: 'MIT', countUp: false },
    { icon: Layers, label: t('socialProof.platforms'), value: '7', countUp: false },
  ]

  return (
    <SectionReveal>
      <div className="border-y border-(--border) bg-(--bg-elev)">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 text-(--fg-muted)">
              <item.icon size={15} className="text-(--fg-faint) shrink-0" />
              <span className="text-[13px] font-mono min-w-0">
                {item.countUp && typeof item.value === 'number' ? (
                  <span className="text-(--fg) font-semibold">
                    <CountUp target={item.value} />
                  </span>
                ) : (
                  <span className="text-(--fg) font-semibold">{item.value}</span>
                )}
                <span className="ml-1.5 text-[11px] tracking-wide uppercase">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
