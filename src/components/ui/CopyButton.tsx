import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CopyButtonProps {
  text: string
  /** Accessible label override (defaults to "Copy"). */
  label?: string
  className?: string
}

/**
 * 44px icon-only copy control. A check icon and polite live region announce success. Always visible and keyboard focusable.
 */
export function CopyButton({ text, label, className }: CopyButtonProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available */
    }
  }, [text])

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={t('chrome.terminal.copyAria')}
        title={copied ? t('chrome.terminal.copied') : (label ?? t('chrome.terminal.copy'))}
        className={cn(
          'inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3 cursor-pointer border-0 bg-transparent',
          'placard hover:bg-(--screen-elev) hover:text-(--screen-fg)',
          'transition-colors duration-(--dur-2) ease-(--ease-out) focus-visible:outline-offset-[-2px]',
          copied ? 'text-(--screen-go)' : 'text-(--screen-dim)',
          className,
        )}
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        <span className="sr-only">{copied ? t('chrome.terminal.copied') : (label ?? t('chrome.terminal.copy'))}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? t('chrome.terminal.copiedAria') : ''}
      </span>
    </>
  )
}
