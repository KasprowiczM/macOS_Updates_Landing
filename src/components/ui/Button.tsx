import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { localizedPath, useLang } from '../../lib/routes'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = accent fill; secondary/ghost = 1px strong-rule outline. */
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'sm' | 'lg'
  as?: 'button' | 'a'
  href?: string
  children: React.ReactNode
}

const BASE =
  'inline-flex items-center justify-center gap-2 min-h-[44px] rounded-sm border font-sans font-semibold leading-none cursor-pointer no-underline select-none ' +
  'transition-[background-color,border-color,color,transform] duration-(--dur-2) ease-(--ease-out) active:translate-y-px ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0'

const SIZES = {
  sm: 'px-3.5 text-[13px]',
  md: 'px-5 text-[14px]',
  lg: 'px-6 text-[15px] min-h-[48px]',
} as const

const VARIANTS = {
  primary:
    'bg-(--accent) text-(--accent-ink) border-(--accent) hover:bg-(--accent-hover) hover:border-(--accent-hover)',
  secondary:
    'bg-transparent text-(--fg) border-(--rule-strong) hover:bg-(--bg-sunk) hover:border-(--fg-faint)',
  ghost:
    'bg-transparent text-(--fg) border-(--rule-strong) hover:bg-(--bg-sunk) hover:border-(--fg-faint)',
} as const

export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  className,
  children,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const lang = useLang()
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className)

  // Render as a link when explicitly an anchor or an href is provided.
  if (as === 'a' || href) {
    const isExternal = !!href && /^(https?:)?\/\//i.test(href)
    const isInternal = !!href && href.startsWith('/') && !href.startsWith('//')

    // External links: open in a new tab, with safe rel.
    if (isExternal) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    // Internal SPA routes: language-correct, client-side navigation. Hash targets on the
    // landing page ("/#install") keep a plain anchor so the browser handles the scroll.
    if (isInternal) {
      const to = localizedPath(href, lang)
      if (href.includes('#')) {
        return (
          <a href={to} className={classes} aria-label={ariaLabel}>
            {children}
          </a>
        )
      }
      return (
        <Link to={to} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      )
    }

    // Fallback (bare hash anchors, mailto:, etc.): plain same-tab anchor.
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  )
}
