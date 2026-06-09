import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  toggle: () => void
}

export function ThemeToggle({ theme, toggle }: ThemeToggleProps) {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-sm text-(--fg-muted) hover:text-(--fg) hover:bg-(--bg-sunk) transition-colors duration-(--dur-2)"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
