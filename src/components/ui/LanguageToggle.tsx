import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { alternateLangPath, saveLangPreference, useLang } from '../../lib/routes'
import { cn } from '../../lib/utils'

/**
 * Switches to the same page in the other language by navigating to its URL
 * (/docs <-> /pl/docs), preserving query and hash. The URL is the single source
 * of truth for language; the choice is only remembered as a suggestion.
 * Rendered as a two-position console switch: the lit cell is the current language.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const lang = useLang()
  const { t } = useTranslation()
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const next = lang === 'en' ? 'pl' : 'en'

  const toggle = () => {
    saveLangPreference(next)
    navigate(alternateLangPath(pathname, next, search, hash))
  }

  const label = t('chrome.lang.switchTo', { name: t(`chrome.lang.name_${next}`) })
  const cell = (active: boolean) =>
    cn(
      'readout flex h-8 min-w-8 items-center justify-center rounded-[1px] border px-1.5 text-[12px] font-semibold transition-colors duration-(--dur-2) ease-(--ease-out)',
      active
        ? 'bg-(--bg-elev) border-(--rule-strong) text-(--accent-text)'
        : 'border-transparent text-(--fg-faint)',
    )

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'group inline-flex min-h-[44px] min-w-[44px] items-center justify-center cursor-pointer bg-transparent border-0 px-1',
        className,
      )}
    >
      <span className="inline-flex gap-0.5 rounded-sm border border-(--rule-strong) bg-(--bg-sunk) p-0.5 group-hover:border-(--fg-faint) transition-colors duration-(--dur-2)">
        <span className={cell(lang === 'en')} aria-hidden="true">EN</span>
        <span className={cell(lang === 'pl')} aria-hidden="true">PL</span>
      </span>
    </button>
  )
}
