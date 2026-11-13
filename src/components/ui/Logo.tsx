import { cn } from '../../lib/utils'
import { UpdateMark } from './UpdateMark'
interface LogoProps { className?: string; width?: number | string; height?: number | string; label?: string }
/** Shared brand animation includes a ten-second rest between cycles. */
export function Logo({ className, width = 32, height = 32, label }: LogoProps) {
  return <UpdateMark animated loop className={cn('shrink-0 text-(--accent-text)', className)} label={label} width={width} height={height} />
}
export function Lockup({ size = 32, className }: { size?: number; className?: string }) {
  return <span className={cn('inline-flex items-center gap-2.5', className)}><Logo width={size} height={size} /><span className="font-sans text-[17px] font-semibold tracking-[-0.035em] leading-none text-(--fg) whitespace-nowrap">macOS Updates</span></span>
}
