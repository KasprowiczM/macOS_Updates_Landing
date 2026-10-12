import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Inline code / command / flag. Mono only for code, per the token contract. */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        'readout rounded-sm border border-(--rule) bg-(--bg-sunk) px-1.5 py-0.5 text-[0.8em] text-(--fg) [overflow-wrap:anywhere]',
        className,
      )}
    >
      {children}
    </code>
  )
}
