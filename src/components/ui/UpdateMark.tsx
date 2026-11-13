import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

interface UpdateMarkProps {
  className?: string
  label?: string
  width?: number | string
  height?: number | string
  animated?: boolean
  replay?: boolean
}

/** An interrupted mechanical ring resolves from an update arrow into a check. */
export function UpdateMark({ className, label, width = 32, height = 32, animated = false, replay = false }: UpdateMarkProps) {
  const ref = useRef<SVGSVGElement>(null)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (!animated || played || !ref.current) return
    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setPlayed(true)
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [animated, played, replay])

  return <svg ref={ref} viewBox="0 0 64 64" width={width} height={height} className={cn('update-mark', animated && !played && 'update-mark-ready', animated && played && 'update-mark-played', replay && 'update-mark-replay', className)} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    <circle className="update-mark__ring" cx="32" cy="32" r="23" pathLength="100" />
    <path className="update-mark__arrow" d="M32 43V23m0 0-8 8m8-8 8 8" />
    <path className="update-mark__check" d="m22 33 7 7 14-15" />
  </svg>
}
