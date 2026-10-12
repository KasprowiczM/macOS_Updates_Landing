import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SITE_URL } from '../lib/site'
import { isLang, localizedPath, useLang, type Lang } from '../lib/routes'
import { SeoCollectorContext } from '../lib/seoContext'

export interface SeoProps {
  /** Page <title>. */
  title: string
  /** Meta description. */
  description: string
  /**
   * Language-NEUTRAL route path beginning with "/" (e.g. "/docs"). Canonical,
   * og:url and hreflang URLs are derived from it for the page language.
   */
  path: string
  /** Page language. Defaults to the language derived from the URL. */
  lang?: string
  /** JSON-LD object(s), rendered as <script type="application/ld+json"> in <head>. */
  jsonLd?: object | object[]
  /** When true, emit robots "noindex,nofollow" and no hreflang alternates. */
  noindex?: boolean
}

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', pl: 'pl_PL' }
const JSON_LD_ATTR = 'data-seo-jsonld'
const SSR_HEAD_ATTR = 'data-ssr-head'

/**
 * Per-page SEO + GEO head management.
 *
 * Emits title, description, robots, canonical, hreflang (en, pl, x-default),
 * Open Graph and Twitter tags through react-helmet-async. On React 19 Helmet
 * renders real elements that React hoists into <head> (and that the prerender
 * script lifts out of the rendered markup); <html lang> is set by useHtmlLang
 * and scripts/prerender.mjs. JSON-LD is handled via SeoCollectorContext.
 */
export function Seo({ title, description, path, lang, jsonLd, noindex = false }: SeoProps) {
  const { i18n } = useTranslation()
  const urlLang = useLang()
  const key = (lang ?? i18n.language ?? urlLang).split('-')[0].toLowerCase()
  const langKey: Lang = isLang(key) ? key : urlLang

  const url = `${SITE_URL}${localizedPath(path, langKey)}`
  const image = `${SITE_URL}/og-image.png`
  const robots = noindex ? 'noindex,nofollow' : 'index,follow'
  const altLang: Lang = langKey === 'pl' ? 'en' : 'pl'

  const alternates = noindex
    ? []
    : [
        { hrefLang: langKey, href: url },
        { hrefLang: altLang, href: `${SITE_URL}${localizedPath(path, altLang)}` },
        { hrefLang: 'x-default', href: `${SITE_URL}${localizedPath(path, 'en')}` },
      ]

  const jsonLdList: object[] = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  const serialized = jsonLdList.map((entry) => JSON.stringify(entry).replace(/</g, '\\u003c'))
  const serializedKey = serialized.join('\n')

  // Server render: hand JSON-LD to the prerenderer (last write wins, so a retried render cannot duplicate).
  const collector = useContext(SeoCollectorContext)
  collector?.setJsonLd(serialized)

  // Browser: React 19 inserts its own head tags during hydration instead of adopting the
  // prerendered ones, so drop the prerendered copies once <Seo> has mounted.
  useEffect(() => {
    // Remove a prerendered tag only when React has inserted its own copy. When hydration
    // adopts the server HTML, React does not re-insert hoisted head tags, so the
    // prerendered ones must stay (removing them unconditionally left the page untitled).
    const keyOf = (el: Element) =>
      [
        el.tagName,
        el.getAttribute('name'),
        el.getAttribute('property'),
        el.getAttribute('rel'),
        el.getAttribute('hreflang'),
      ].join('|')
    const live = new Set(
      Array.from(document.head.querySelectorAll(`title, meta, link`))
        .filter((el) => !el.hasAttribute(SSR_HEAD_ATTR))
        .map(keyOf),
    )
    document.head.querySelectorAll(`[${SSR_HEAD_ATTR}]`).forEach((node) => {
      if (live.has(keyOf(node))) node.remove()
    })
  }, [])

  // Browser: keep exactly one set of JSON-LD tags in <head>, replacing the prerendered ones.
  useEffect(() => {
    const head = document.head
    head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((node) => node.remove())
    const added: HTMLScriptElement[] = []
    for (const text of serializedKey ? serializedKey.split('\n') : []) {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.setAttribute(JSON_LD_ATTR, '')
      el.text = text
      head.appendChild(el)
      added.push(el)
    }
    return () => added.forEach((el) => el.remove())
  }, [serializedKey])

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {!noindex && <link rel="canonical" href={url} />}

      {/* hreflang: every page exists in en and pl; x-default is English. */}
      {alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="macOS Updates" />
      <meta property="og:locale" content={OG_LOCALE[langKey]} />
      <meta property="og:locale:alternate" content={OG_LOCALE[altLang]} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  )
}

export default Seo
