import { cn } from '../../lib/utils'

interface LogoProps {
  className?: string
  width?: number | string
  height?: number | string
  /** Accessible name. When omitted the mark is decorative (use it next to the wordmark). */
  label?: string
}

const CHEVRON = 'M32 21.5L45.5 35V44.5L32 31L18.5 44.5V35Z'
const SCREWS = [
  { x: 7.4, y: 7.4, a: 28 },
  { x: 56.6, y: 7.4, a: -52 },
  { x: 7.4, y: 56.6, a: 76 },
  { x: 56.6, y: 56.6, a: -14 },
]

/**
 * Brand mark: a square annunciator lamp. Ink bezel with screws, a recessed GO lens,
 * and a cut chevron legend. Recolors with the theme through the --logo-* tokens.
 * Small renders drop the screws and bevel so the silhouette stays clean.
 */
export function Logo({ className, width = 32, height = 32, label }: LogoProps) {
  const px = typeof width === 'number' ? width : parseFloat(String(width))
  const detailed = !Number.isFinite(px) || px > 28
  return (
    <svg
      viewBox="4 4 56 56"
      width={width}
      height={height}
      className={cn('shrink-0', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect className="logo-bezel" x="4" y="4" width="56" height="56" rx="3" />
      {detailed && (
        <>
          <rect className="logo-rim" x="10" y="10" width="44" height="44" rx="1.5" strokeWidth="1.2" />
          {SCREWS.map((s) => (
            <g key={`${s.x}-${s.y}`}>
              <circle className="logo-screw" cx={s.x} cy={s.y} r="1.45" />
              <line
                className="logo-slot"
                x1={s.x - 1.05}
                y1={s.y}
                x2={s.x + 1.05}
                y2={s.y}
                strokeWidth="0.5"
                transform={`rotate(${s.a} ${s.x} ${s.y})`}
              />
            </g>
          ))}
          <rect className="logo-seat" x="12" y="12" width="40" height="40" rx="2.6" />
        </>
      )}
      <rect className="logo-lens" x="13.4" y="13.4" width="37.2" height="37.2" rx="1.8" />
      {detailed && (
        <rect className="logo-lens-edge" x="15.6" y="15.6" width="32.8" height="32.8" rx="0.9" strokeWidth="0.7" />
      )}
      <path className="logo-cut" d={CHEVRON} transform="translate(0 1.1)" />
      <path className="logo-legend" d={CHEVRON} />
    </svg>
  )
}

/** Mark plus live-text wordmark. The name is "macOS Updates": lowercase m, capital OS. */
export function Lockup({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Logo width={size} height={size} />
      <span
        className="font-sans text-[18px] leading-none text-(--fg) whitespace-nowrap"
        style={{ fontWeight: 700, fontStretch: '112%', letterSpacing: '-0.012em' }}
      >
        macOS Updates
      </span>
    </span>
  )
}
