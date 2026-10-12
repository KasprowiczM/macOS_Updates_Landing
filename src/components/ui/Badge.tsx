import { cn } from '../../lib/utils'

type BadgeState = 'go' | 'hold' | 'nogo' | 'standby'

interface BadgeProps {
  children: React.ReactNode
  /** Legacy variants still render: default = standby, accent = go, mono = readout. */
  variant?: 'default' | 'accent' | 'mono' | BadgeState
  className?: string
}

const STATE_FOR: Record<NonNullable<BadgeProps['variant']>, BadgeState | null> = {
  default: 'standby',
  accent: 'go',
  mono: null,
  go: 'go',
  hold: 'hold',
  nogo: 'nogo',
  standby: 'standby',
}

/** Console status tag: a lamp plus a placard label. State is never carried by color alone. */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const state = STATE_FOR[variant]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 min-h-[24px] px-2.5 py-1 rounded-sm border border-(--rule-strong) bg-(--bg-elev)',
        variant === 'mono' ? 'readout text-[12px] text-(--fg)' : 'placard text-(--fg)',
        className,
      )}
    >
      {state && <span className={cn('lamp', `lamp-${state}`)} aria-hidden="true" />}
      {children}
    </span>
  )
}
