import { cn } from '../../lib/utils'
import { CopyButton } from './CopyButton'
import { MacWindowChrome } from './MacWindowChrome'

interface TerminalBlockProps {
  lines: { text: string; className?: string }[]
  showCopy?: boolean
  copyText?: string
  className?: string
  /** Optional title in the readout header (a file or directory name). */
  title?: string
}

/**
 * A contemporary Mac Terminal window for commands. Lines without a custom className are
 * commands and get a prompt glyph; lines with one (or starting with #) are output/comments.
 * The prompt is not selectable, so a manual selection copies only the command text.
 */
export function TerminalBlock({ lines, showCopy = true, copyText, className, title }: TerminalBlockProps) {
  const text = copyText ?? lines.map((l) => l.text).join('\n')

  return (
    <div className={cn('screen mac-window overflow-hidden', className)} data-window-era="latest">
      <MacWindowChrome title={title ?? 'Terminal'} action={showCopy ? <CopyButton text={text} /> : undefined} />
      <div className="flex items-stretch">
        <pre
          tabIndex={0}
          className="readout flex-1 min-w-0 m-0 px-4 py-3 text-[13px] leading-[1.7] overflow-x-auto"
        >
          {lines.map((line, i) => {
            const isCommand = !line.className && !line.text.trimStart().startsWith('#')
            return (
              <div key={i} className={cn('whitespace-pre', line.className || (isCommand ? 'text-(--screen-fg)' : 'text-(--screen-dim)'))}>
                {isCommand ? (
                  <span aria-hidden="true" className="select-none text-(--screen-go) mr-2.5">$</span>
                ) : (
                  <span aria-hidden="true" className="select-none mr-2.5 invisible">$</span>
                )}
                {line.text}
              </div>
            )
          })}
        </pre>

      </div>
    </div>
  )
}
