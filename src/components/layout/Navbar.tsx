import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Star } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { Logo } from '../ui/Logo'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}



export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { t } = useTranslation()
  const { stars } = useGitHubStats()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/features', label: t('nav.features'), isHash: false },
    { href: isHome ? '#how-it-works' : '/#how-it-works', label: t('nav.howItWorks'), isHash: true },
    { href: isHome ? '#installation' : '/#installation', label: t('nav.installation'), isHash: true },
    { href: '/docs', label: t('nav.docs'), isHash: false },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-(--dur-3) ${
        scrolled
          ? 'bg-(--bg)/80 backdrop-blur-xl border-b border-(--border)'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline text-(--fg) shrink-0">
          <Logo width={32} height={32} />
          <div className="flex flex-col">
            <span className="font-bold text-lg font-sans tracking-tight leading-none">
              macOS Updates
            </span>
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-(--nav-tagline) leading-none mt-0.5">
              {t('nav.tagline')}
            </span>
          </div>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(link => (
            link.isHash ? (
              <a
                key={link.href}
                href={link.href}
                className="text-(--fg-muted) hover:text-(--fg) text-[14px] font-medium font-sans no-underline transition-colors duration-(--dur-2) whitespace-nowrap"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-(--fg-muted) hover:text-(--fg) text-[14px] font-medium font-sans no-underline transition-colors duration-(--dur-2) whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Right: Controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <LanguageToggle />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <Button
            as="a"
            href="https://github.com/KasprowiczM/macOS_updates"
            variant="ghost"
          >
            <Star size={14} />
            {t('nav.starOnGitHub')}
            {stars > 0 && (
              <span className="font-mono text-[12px] text-(--fg-faint)">
                {stars}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-(--fg-muted) hover:text-(--fg)"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-(--bg-elev) border-b border-(--border) px-6 py-4 space-y-3">
          {navLinks.map(link => (
            link.isHash ? (
              <a
                key={link.href}
                href={link.href}
                className="block text-(--fg-muted) hover:text-(--fg) text-[14px] font-medium no-underline py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="block text-(--fg-muted) hover:text-(--fg) text-[14px] font-medium no-underline py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-(--border)">
            <LanguageToggle />
            <ThemeToggle theme={theme} toggle={toggleTheme} />
          </div>
          <Button
            as="a"
            href="https://github.com/KasprowiczM/macOS_updates"
            variant="ghost"
            className="w-full justify-center"
          >
            <Star size={14} />
            {t('nav.starOnGitHub')}
          </Button>
        </div>
      )}
    </nav>
  )
}
