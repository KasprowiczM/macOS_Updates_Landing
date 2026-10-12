import { useLocation, useNavigate } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { alternateLangPath, saveLangPreference, useLang } from '../../lib/routes'

/**
 * Switches to the same page in the other language by navigating to its URL
 * (/docs <-> /pl/docs), preserving query and hash. The URL is the single source
 * of truth for language; the choice is only remembered as a suggestion.
 */
export function LanguageToggle() {
  const lang = useLang()
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const next = lang === 'en' ? 'pl' : 'en'

  const toggle = () => {
    saveLangPreference(next)
    navigate(alternateLangPath(pathname, next, search, hash))
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center gap-1.5 px-3 min-h-[44px] rounded-sm text-(--fg-muted) hover:text-(--fg) hover:bg-(--bg-sunk) transition-colors duration-(--dur-2) font-mono text-[12px] uppercase tracking-wide cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus)"
      aria-label={`Switch language to ${lang === 'en' ? 'Polish' : 'English'}`}
      lang={next}
    >
      <Globe size={14} />
      {next.toUpperCase()}
    </button>
  )
}
