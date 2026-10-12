import { useEffect, useRef } from 'react'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  /** Seconds. */
  delay?: number
}

/**
 * Content is always rendered visible (prerendered HTML included). The first time a block that
 * started below the fold scrolls into view it settles once: a short translate and a slight
 * opacity lift from an already-visible state, exponential ease-out. Blocks that are on screen at
 * load never move. Static under prefers-reduced-motion and without IntersectionObserver.
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined' || typeof el.animate !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        el.animate(
          [
            { opacity: 0.55, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 700, delay: delay * 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' },
        )
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
