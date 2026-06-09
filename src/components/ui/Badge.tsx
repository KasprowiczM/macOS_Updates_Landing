import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'mono'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-(--radius-pill) text-[11px] font-medium font-mono tracking-wide',
        variant === 'default' && 'bg-(--bg-sunk) text-(--fg-muted) border border-(--border)',
        variant === 'accent' && 'bg-(--accent-soft) text-(--accent-strong)',
        variant === 'mono' && 'bg-(--code-bg) text-(--code-fg)',
        className
      )}
    >
      {children}
    </span>
  )
}
