import { useState, useCallback, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'

interface Props {
  id: string
  title: string
  children: ReactNode
  level?: 2 | 3
}

export function WikiSection({ id, title, children, level = 2 }: Props) {
  const Tag = level === 2 ? 'h2' : 'h3'
  const size = level === 2 ? 'text-[22px]' : 'text-[18px]'
  const border = level === 2 ? 'border-t border-(--border) pt-10' : ''
  return (
    <section id={id} className={`scroll-mt-28 ${border}`}>
      <Tag className={`text-(--fg) font-semibold ${size} tracking-tight mb-4 font-sans`}>
        {title}
      </Tag>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function CodeBlock({ children, title }: { children: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard not available */ }
  }, [children])

  return (
    <div className="relative group rounded-md bg-(--code-bg) border border-[rgba(255,255,255,0.06)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
        <span className="w-2.5 h-2.5 rounded-full bg-status-err opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-status-warn opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-status-ok opacity-70" />
        {title && (
          <span className="ml-3 text-[11px] font-mono text-(--code-dim)">
            {title}
          </span>
        )}
      </div>

      <div className="px-5 py-4 font-mono text-[13px] leading-[1.6] text-(--code-fg) whitespace-pre-wrap overflow-x-auto">
        {children}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-3 p-1.5 rounded-sm bg-[rgba(255,255,255,0.06)] text-(--code-dim) hover:text-(--code-fg) hover:bg-[rgba(255,255,255,0.1)] transition-all duration-(--dur-2) opacity-0 group-hover:opacity-100 cursor-pointer border-0"
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? <Check size={14} className="text-(--ok)" /> : <Copy size={14} />}
      </button>
    </div>
  )
}

export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-(--border) bg-(--bg-elev) p-5">
      <h4 className="text-(--fg) font-semibold text-[15px] mb-2 font-sans">{title}</h4>
      <div className="text-[14px] leading-[1.6] text-(--fg-muted)">{children}</div>
    </div>
  )
}

interface TableProps {
  headers: string[]
  rows: (string | ReactNode)[][]
}

export function DocTable({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[14px] border-collapse">
        <thead>
          <tr className="border-b border-(--border)">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 pr-4 font-semibold text-(--fg) font-sans">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-(--border)">
              {row.map((cell, j) => (
                <td key={j} className="py-3 pr-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
