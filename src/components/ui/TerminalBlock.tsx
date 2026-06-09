import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Copy } from 'lucide-react'

interface TerminalBlockProps {
  lines: { text: string; className?: string }[]
  showCopy?: boolean
  copyText?: string
  className?: string
}

export function TerminalBlock({ lines, showCopy = true, copyText, className }: TerminalBlockProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const text = copyText || lines.map(l => l.text).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard not available */ }
  }, [copyText, lines])

  return (
    <div className={`relative group rounded-md bg-(--code-bg) border border-[rgba(255,255,255,0.06)] overflow-hidden ${className || ''}`}>
      {/* Window dots */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
        <span className="w-2.5 h-2.5 rounded-full bg-status-err opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-status-warn opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-status-ok opacity-70" />
      </div>

      <div className="px-5 py-4 font-mono text-[13px] leading-[1.6] overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className={line.className || 'text-(--code-fg)'}>
            {line.text}
          </div>
        ))}
      </div>

      {showCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-3 p-1.5 rounded-sm bg-[rgba(255,255,255,0.06)] text-(--code-dim) hover:text-(--code-fg) hover:bg-[rgba(255,255,255,0.1)] transition-all duration-(--dur-2) opacity-0 group-hover:opacity-100 cursor-pointer border-0"
          aria-label={copied ? t('installation.copied') : t('installation.copyToClipboard')}
        >
          {copied ? <Check size={14} className="text-(--ok)" /> : <Copy size={14} />}
        </button>
      )}
    </div>
  )
}
