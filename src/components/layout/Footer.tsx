import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { APP_VERSION, APP_VERSION_DATE, REPO_URL } from '../../lib/site'
import { alternateLangPath, saveLangPreference, useLang, useLocalizedPath, type Lang } from '../../lib/routes'
import { Lockup } from '../ui/Logo'
import { ArrowUpRight } from 'lucide-react'
import { experienceCopy } from '../experience/copy'

const LINK =
  'inline-flex items-center min-h-[44px] min-w-[44px] text-[14px] text-(--fg-muted) no-underline hover:text-(--fg) hover:underline underline-offset-[0.2em] decoration-1'

export function Footer() {
  const { t } = useTranslation()
  const localize = useLocalizedPath()
  const lang = useLang()
  const { pathname, search, hash } = useLocation()

  const explore = [
    { label: t('chrome.footer.features'), href: localize('/features') },
    { label: t('chrome.footer.docs'), href: localize('/docs') },
    { label: t('chrome.footer.security'), href: localize('/security') },
    { label: t('chrome.footer.changelog'), href: localize('/changelog') },
    { label: t('chrome.footer.contributing'), href: localize('/contributing') },
    { label: t('chrome.footer.support'), href: localize('/support') },
  ]

  const languages: { code: Lang; label: string }[] = [
    { code: 'en', label: t('chrome.footer.english') },
    { code: 'pl', label: t('chrome.footer.polish') },
  ]

  return (
    <footer className="experience-footer">
      <Link to={localize('/docs#quick-install')} className="footer-statement">
        <span>{experienceCopy[lang].footerTitle}</span><ArrowUpRight aria-hidden="true" />
      </Link>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:px-8">
        <div>
          <Link
            to={localize('/')}
            aria-label={t('chrome.nav.home')}
            className="inline-flex min-h-[44px] items-center no-underline text-(--fg)"
          >
            <Lockup size={32} />
          </Link>
          <p className="mt-3 max-w-[38ch] text-[14px] leading-[1.6] text-(--fg-muted)">{t('chrome.footer.blurb')}</p>
        </div>

        <nav aria-label={t('chrome.footer.explore')}>
          <h2 className="placard m-0 mb-2">
            {t('chrome.footer.explore')}
          </h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {explore.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('chrome.footer.project')}>
          <h2 className="placard m-0 mb-2">
            {t('chrome.footer.project')}
          </h2>
          <ul className="m-0 flex list-none flex-col p-0">
            <li>
              <a href={REPO_URL} className={LINK} target="_blank" rel="noopener noreferrer">
                {t('chrome.footer.github')}
              </a>
            </li>
            <li>
              <a href="/llms.txt" className={LINK}>
                {t('chrome.footer.llms')}
              </a>
            </li>
            <li>
              <a href={`${REPO_URL}/blob/main/LICENSE`} className={LINK} target="_blank" rel="noopener noreferrer">
                {t('chrome.footer.license')}
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label={t('chrome.footer.language')}>
          <h2 className="placard m-0 mb-2">
            {t('chrome.footer.language')}
          </h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {languages.map((l) => (
              <li key={l.code}>
                <Link
                  to={alternateLangPath(pathname, l.code, search, hash)}
                  lang={l.code}
                  hrefLang={l.code}
                  aria-current={lang === l.code ? 'true' : undefined}
                  onClick={() => saveLangPreference(l.code)}
                  className={`${LINK} ${lang === l.code ? '!text-(--fg) font-semibold' : ''}`}
                >
                  {lang === l.code && <span aria-hidden="true" className="lamp lamp-go mr-2" />}
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-(--rule)">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
          <p className="m-0 text-[13px] text-(--fg-muted)">{t('chrome.footer.rights')} · MIT</p>
          <Link
            to={localize('/changelog')}
            className="screen readout inline-flex min-h-[44px] items-center gap-2.5 px-3 text-[12px] no-underline hover:border-(--screen-go)"
          >
            <span className="lamp lamp-go" aria-hidden="true" />
            <span className="sr-only">{t('chrome.footer.releaseLink')} </span>
            <span className="text-(--screen-fg)">{APP_VERSION}</span>
            <span className="text-(--screen-dim)">{APP_VERSION_DATE}</span>
          </Link>
        </div>
      </div>
      <p className="footer-independent">{experienceCopy[lang].independent}</p>
    </footer>
  )
}
