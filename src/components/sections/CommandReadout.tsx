import { useId } from 'react'
import type { RefObject } from 'react'
import { CopyButton } from '../ui/CopyButton'
import { cn } from '../../lib/utils'

interface CommandReadoutProps {
  command: string
  /** Placard shown on the readout (instrument label). */
  label?: string
  className?: string
  /** Lets the page select the command when the clipboard is unavailable. */
  codeRef?: RefObject<HTMLElement | null>
}

/**
 * One command on a dark screen. The full command stays visible (it wraps), the
 * prompt is not selectable, and the copy control is always on screen.
 */
export function CommandReadout({ command, label, className, codeRef }: CommandReadoutProps) {
  const id = useId()
  return (
    <div className={cn('screen flex items-stretch', className)}>
      <div className="min-w-0 flex-1 px-4 py-3">
        {label ? (
          <p id={id} className="placard m-0 mb-1.5">
            {label}
          </p>
        ) : null}
        <p className="readout m-0 flex gap-2.5 text-[12.5px] leading-[1.65] text-(--screen-fg)">
          <span aria-hidden="true" className="select-none text-(--screen-go)">
            $
          </span>
          <code
            ref={codeRef}
            tabIndex={0}
            aria-labelledby={label ? id : undefined}
            className="min-w-0 [overflow-wrap:anywhere] whitespace-pre-wrap"
          >
            {command}
          </code>
        </p>
      </div>
      <div className="flex shrink-0 items-start border-l border-(--screen-rule)">
        <CopyButton text={command} />
      </div>
    </div>
  )
}
