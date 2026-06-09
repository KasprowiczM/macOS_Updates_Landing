import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  as?: 'button' | 'a'
  href?: string
  children: React.ReactNode
}

export function Button({ variant = 'primary', as = 'button', href, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-semibold text-[13px] font-sans border border-transparent cursor-pointer transition-colors no-underline',
    'duration-(--dur-2)',
    variant === 'primary' && 'bg-(--accent) text-(--accent-ink) hover:bg-(--accent-hover)',
    variant === 'ghost' && 'text-(--fg) border-(--border-strong) hover:bg-(--bg-sunk)',
    className
  )

  // Render as a link when explicitly an anchor or an href is provided.
  if (as === 'a' || href) {
    const isExternal = !!href && /^https?:\/\//i.test(href)
    const isInternal = !!href && href.startsWith('/')

    // External links: open in a new tab, with safe rel.
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    // Internal SPA routes: client-side navigation, same tab, no target.
    if (isInternal) {
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      )
    }

    // Fallback (hash anchors, mailto:, etc.): plain same-tab anchor.
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return <button className={classes} {...props}>{children}</button>
}
