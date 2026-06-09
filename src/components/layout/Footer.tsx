import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { APP_VERSION } from '../../lib/site'
import { Logo } from '../ui/Logo'

export function Footer() {
  const { t } = useTranslation()

  const internalLinks = [
    { label: t('footer.features'), href: '/features' },
    { label: t('footer.docs'), href: '/docs' },
    { label: t('footer.security'), href: '/security' },
    { label: t('footer.changelog'), href: '/changelog' },
    { label: t('footer.contributing'), href: '/contributing' },
  ]

  return (
    <footer className="border-t border-(--border) mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Logo width={24} height={24} />
          <span className="text-(--fg-faint) text-[13px] font-sans">
            {t('footer.copyright')}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {internalLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="text-(--fg-muted) hover:text-(--fg) text-[13px] no-underline font-sans transition-colors duration-(--dur-2)"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/KasprowiczM/macOS_updates"
            className="text-(--fg-muted) hover:text-(--fg) text-[13px] no-underline font-sans transition-colors duration-(--dur-2)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.github')}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-8">
        <p className="text-center text-(--fg-faint) text-[11px] font-mono tracking-wide uppercase">
          {APP_VERSION} · macOS · MIT · Bash + Python
        </p>
      </div>
    </footer>
  )
}
