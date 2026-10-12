import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'

/**
 * Copies `text` to the clipboard. Falls back to execCommand, then to selecting
 * the visible command (`selectRef`) so the user can copy it by hand.
 */
export function useCopy(text: string, selectRef?: RefObject<HTMLElement | null>) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const flash = useCallback((next: CopyStatus) => {
    setStatus(next)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 2400)
  }, [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      flash('copied')
      return
    } catch {
      /* fall through to the legacy path */
    }
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(area)
      if (ok) {
        flash('copied')
        return
      }
    } catch {
      /* fall through to selection */
    }
    const node = selectRef?.current
    if (node) {
      const range = document.createRange()
      range.selectNodeContents(node)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
    flash('failed')
  }, [flash, selectRef, text])

  return { status, copy }
}
