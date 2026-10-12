import { cn } from '../../lib/utils'
import { CopyButton } from './CopyButton'

interface TerminalBlockProps {
  lines: { text: string; className?: string }[]
  showCopy?: boolean
  copyText?: string
  className?: string
  /** Optional title in the readout header (a file or directory name). */
  title?: string
}

/**
 * A dark instrument readout (.screen) for commands. Lines without a custom className are
 * commands and get a prompt glyph; lines with one (or starting with #) are output/comments.
 * The prompt is not selectable, so a manual selection copies only the command text.
 */
export function TerminalBlock({ lines, showCopy = true, copyText, className, title }: TerminalBlockProps) {
  const text = copyText ?? lines.map((l) => l.text).join('\n')

  return (
    <div className={cn('screen overflow-hidden', className)}>
      {title && (
        <div className="px-4 py-2 border-b border-(--screen-rule) placard text-(--screen-dim)">{title}</div>
      )}
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
        {showCopy && (
          <div className="shrink-0 flex items-start border-l border-(--screen-rule)">
            <CopyButton text={text} />
          </div>
        )}
      </div>
    </div>
  )
}
