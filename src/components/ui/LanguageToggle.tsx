import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggle = () => {
    const next = i18n.language === 'en' ? 'pl' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('macos-updates-lang', next)
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-sm text-(--fg-muted) hover:text-(--fg) hover:bg-(--bg-sunk) transition-colors duration-(--dur-2) font-mono text-[12px] uppercase tracking-wide"
      aria-label={`Switch language to ${i18n.language === 'en' ? 'Polish' : 'English'}`}
    >
      <Globe size={14} />
      {i18n.language === 'en' ? 'PL' : 'EN'}
    </button>
  )
}
