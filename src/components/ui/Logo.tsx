import { cn } from '../../lib/utils'
interface LogoProps { className?: string; width?: number | string; height?: number | string; label?: string }
/** Three ascending layers form a single update arrow. */
export function Logo({ className, width = 32, height = 32, label }: LogoProps) {
  return <svg viewBox="0 0 40 40" width={width} height={height} className={cn('shrink-0 text-(--accent-text)', className)} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    <path d="M7 19 20 6l13 13M7 27l13-13 13 13M7 35l13-13 13 13" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="miter" />
  </svg>
}
export function Lockup({ size = 32, className }: { size?: number; className?: string }) {
  return <span className={cn('inline-flex items-center gap-2.5', className)}><Logo width={size} height={size} /><span className="font-sans text-[17px] font-semibold tracking-[-0.035em] leading-none text-(--fg) whitespace-nowrap">macOS Updates</span></span>
}
