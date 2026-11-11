import { useId } from 'react'
import type { RefObject } from 'react'
import { CopyButton } from '../ui/CopyButton'
import { MacWindowChrome } from '../ui/MacWindowChrome'
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
    <div className={cn('screen mac-window overflow-hidden', className)} data-window-era="latest">
      <MacWindowChrome title={label ? <span id={id}>{label}</span> : 'Terminal'} action={<CopyButton text={command} />} />
      <div className="min-w-0 flex-1 px-4 py-3">
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

    </div>
  )
}
