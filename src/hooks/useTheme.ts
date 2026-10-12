import { useCallback, useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'macos-updates-theme'
const listeners = new Set<() => void>()
let current: Theme | null = null

/** Saved preference, else the OS preference. Browser only; guarded for private mode. */
function readInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* storage unavailable */ }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'dark'
  }
}

function getSnapshot(): Theme {
  if (current === null) current = readInitialTheme()
  return current
}

/** Server and hydration render use the same theme the prerendered HTML ships with. */
function getServerSnapshot(): Theme {
  return 'dark'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * Theme state. The inline bootstrap script in index.html already set
 * `data-theme` before first paint; this hook keeps React state in sync and
 * persists explicit user choices. SSR-safe (no window access during render).
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark'
    current = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch { /* storage unavailable */ }
    listeners.forEach((listener) => listener())
  }, [])

  return { theme, toggle } as const
}
