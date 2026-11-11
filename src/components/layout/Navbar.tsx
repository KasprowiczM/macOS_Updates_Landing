import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Star, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { Lockup } from '../ui/Logo'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { REPO_URL } from '../../lib/site'
import { stripLangPrefix, useLocalizedPath } from '../../lib/routes'
import { cn } from '../../lib/utils'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

interface NavItem {
  key: string
  label: string
  href: string
  /** In-page anchor on the landing page: a plain <a> so the browser owns the scroll. */
  isHash: boolean
  /** Language-neutral route path, for aria-current on page links. */
  path?: string
}

const LINK_BASE =
  'inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 text-[14px] font-medium no-underline whitespace-nowrap rounded-sm ' +
  'transition-colors duration-(--dur-2) ease-(--ease-out) hover:text-(--fg) hover:bg-(--bg-sunk)'

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { t } = useTranslation()
  const { stars } = useGitHubStats()
  const location = useLocation()
  const localize = useLocalizedPath()
  const basePath = stripLangPrefix(location.pathname)
  const isHome = basePath === '/'

  const [scrolled, setScrolled] = useState(false)
  // The menu is open only for the location it was opened on, so any navigation closes it.
  const locationKey = `${location.pathname}${location.hash}`
  const [openAt, setOpenAt] = useState<string | null>(null)
  const mobileOpen = openAt === locationKey
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeMenu = useCallback(() => setOpenAt(null), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: Escape closes (focus returns to the trigger), body scroll is locked,
  // and growing past the desktop breakpoint dismisses it.
  useEffect(() => {
    if (!mobileOpen) return
    const dialog = dialogRef.current
    const trigger = menuButtonRef.current
    if (dialog && !dialog.open) dialog.showModal()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenAt(null)
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpenAt(null)
    }
    document.addEventListener('keydown', onKey)
    mql.addEventListener('change', onChange)
    return () => {
      if (dialog?.open) dialog.close()
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onChange)
      trigger?.focus({ preventScroll: true })
    }
  }, [mobileOpen])

  const hash = (id: string) => (isHome ? `#${id}` : localize(`/#${id}`))

  const navItems: NavItem[] = [
    { key: 'features', label: t('chrome.nav.features'), href: localize('/features'), isHash: false, path: '/features' },
    { key: 'howItWorks', label: t('chrome.nav.howItWorks'), href: hash('wall'), isHash: true },
    { key: 'coverage', label: t('chrome.nav.coverage'), href: hash('coverage'), isHash: true },
    { key: 'install', label: t('chrome.nav.install'), href: hash('install'), isHash: true },
    { key: 'docs', label: t('chrome.nav.docs'), href: localize('/docs'), isHash: false, path: '/docs' },
  ]

  const githubLabel = stars > 0 ? t('chrome.nav.githubStars', { count: stars }) : t('chrome.nav.github')

  const renderItem = (item: NavItem, mobile: boolean) => {
    const current = !item.isHash && item.path === basePath
    const className = cn(
      mobile
        ? 'flex items-center min-h-[52px] px-1 text-[17px] font-semibold no-underline border-b border-(--rule) text-(--fg)'
        : LINK_BASE,
      !mobile && (current ? 'text-(--fg)' : 'text-(--fg-muted)'),
      mobile && current && 'text-(--accent-text)',
    )
    const content = (
      <>
        {item.label}
        {current && !mobile && (
          <span aria-hidden="true" className="ml-2 lamp lamp-go" />
        )}
      </>
    )
    return item.isHash ? (
      <a key={item.key} href={item.href} className={className} onClick={closeMenu}>
        {content}
      </a>
    ) : (
      <Link key={item.key} to={item.href} className={className} aria-current={current ? 'page' : undefined} onClick={closeMenu}>
        {content}
      </Link>
    )
  }

  return (
    <header className={cn('experience-navbar sticky top-0 z-50 bg-(--bg) border-b border-(--rule)', scrolled && 'nav-scrolled')}>
      <a href="#main" className="skip-link">
        {t('chrome.skip')}
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          to={localize('/')}
          aria-label={t('chrome.nav.home')}
          className="inline-flex min-h-[44px] items-center no-underline text-(--fg) shrink-0 rounded-sm"
          onClick={closeMenu}
        >
          <Lockup size={32} />
        </Link>

        <nav aria-label={t('chrome.nav.primary')} className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => renderItem(item, false))}
        </nav>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <Button
            href={REPO_URL}
            variant="secondary"
            size="sm"
            className="nav-github mr-1"
            aria-label={githubLabel}
          >
            <Star size={14} aria-hidden="true" />
            {t('chrome.nav.github')}
            {stars > 0 && <span className="readout text-[12px] text-(--fg-muted)">{stars}</span>}
          </Button>
          <LanguageToggle />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-(--rule-strong) bg-transparent text-(--fg) cursor-pointer hover:bg-(--bg-sunk) lg:hidden"
          onClick={() => setOpenAt(mobileOpen ? null : locationKey)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? t('chrome.nav.menuClose') : t('chrome.nav.menuOpen')}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && createPortal(
        <dialog
          ref={dialogRef}
          id="mobile-navigation"
          aria-label={t('chrome.nav.mobileLabel')}
          onCancel={(event) => { event.preventDefault(); closeMenu() }}
          className="mobile-navigation-dialog"
        >
          <div className="mobile-navigation-heading">
            <Link to={localize('/')} onClick={closeMenu} aria-label={t('chrome.nav.home')}><Lockup size={32} /></Link>
            <button type="button" autoFocus onClick={closeMenu} aria-label={t('chrome.nav.menuClose')} className="mobile-navigation-close"><X size={20} aria-hidden="true" /></button>
          </div>
          <div className="mobile-navigation-content">
          <nav aria-label={t('chrome.nav.primary')} className="flex flex-col">
            {navItems.map((item) => renderItem(item, true))}
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <LanguageToggle />
            <ThemeToggle theme={theme} toggle={toggleTheme} />
          </div>
          <Button href={REPO_URL} variant="secondary" className="mt-6 w-full" aria-label={githubLabel}>
            <Star size={14} aria-hidden="true" />
            {t('chrome.nav.github')}
            {stars > 0 && <span className="readout text-[12px] text-(--fg-muted)">{stars}</span>}
          </Button>
          </div>
        </dialog>, document.body,
      )}
    </header>
  )
}
