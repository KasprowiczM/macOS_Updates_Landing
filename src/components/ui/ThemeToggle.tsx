import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  toggle: () => void
  className?: string
}

/** Two-position console switch: the lit cell is the active theme. 44px tap target. */
export function ThemeToggle({ theme, toggle, className }: ThemeToggleProps) {
  const { t } = useTranslation()
  const label = theme === 'dark' ? t('chrome.theme.toLight') : t('chrome.theme.toDark')
  const cell = (active: boolean) =>
    cn(
      'flex h-8 w-8 items-center justify-center rounded-[1px] border transition-colors duration-(--dur-2) ease-(--ease-out)',
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
        <span className={cell(theme === 'light')}>
          <Sun size={16} aria-hidden="true" />
        </span>
        <span className={cell(theme === 'dark')}>
          <Moon size={16} aria-hidden="true" />
        </span>
      </span>
    </button>
  )
}
