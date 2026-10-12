import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { CopyButton } from '../ui/CopyButton'

interface Props {
  id: string
  title: string
  children: ReactNode
  /** 2 = group-level heading, 3 = a section inside a group (default). */
  level?: 2 | 3
}

export function WikiSection({ id, title, children, level = 3 }: Props) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <section id={id} className="scroll-mt-24">
      <Tag>{title}</Tag>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

/** A command or file listing on a dark instrument screen, with a 44px copy control. */
export function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="screen overflow-hidden">
      <div className="flex items-stretch border-b border-(--screen-rule)">
        <p className="placard m-0 flex min-h-[44px] max-w-none min-w-0 flex-1 items-center truncate px-4 text-(--screen-dim)">{title ?? ' '}</p>
        <CopyButton text={children} />
      </div>
      <pre
        tabIndex={0}
        className="readout m-0 overflow-x-auto px-4 py-3.5 text-[13px] leading-[1.7] whitespace-pre text-(--screen-fg)"
      >
        {children}
      </pre>
    </div>
  )
}

/** Small bordered console panel for a short fact (requirements, languages). */
export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-sm border border-(--rule-strong) bg-(--bg-elev)">
      <h4 className="placard m-0 border-b border-(--rule) bg-(--bg-sunk) px-4 py-2 text-(--fg)">{title}</h4>
      <div className="px-4 py-3 text-[15px] leading-[1.6] text-(--fg-muted) [&>p]:m-0">{children}</div>
    </div>
  )
}

interface TableProps {
  headers: string[]
  rows: (string | ReactNode)[][]
}

const CODE_LIKE = /(\.sh\b|\.py\b|\.txt\b|^bash |^sudo |^softwareupdate|^mas |--[a-z]|^[A-Z_]{4,}$)/

/** Reference table: placard column heads, hairline rows, command-like cells set in mono. */
export function DocTable({ headers, rows }: TableProps) {
  return (
    <div className="max-w-full overflow-x-auto rounded-sm border border-(--rule-strong) bg-(--bg-elev)" tabIndex={0}>
      <table className="w-full border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b border-(--rule-strong) bg-(--bg-sunk)">
            {headers.map((h, i) => (
              <th key={i} scope="col" className="placard px-4 py-2.5 text-left text-(--fg)">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-(--rule) last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-4 py-2.5 align-top',
                    j === 0 && 'font-semibold text-(--fg)',
                    typeof cell === 'string' && CODE_LIKE.test(cell) && 'readout text-[13px] font-medium break-words [overflow-wrap:anywhere]',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
