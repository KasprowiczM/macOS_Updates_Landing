import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SITE_URL } from '../lib/site'

export interface SeoProps {
  /** Page <title>. */
  title: string
  /** Meta description. */
  description: string
  /** Route path beginning with "/" (e.g. "/docs"). Used for canonical + OG url + hreflang. */
  path: string
  /** Language code ("en" | "pl" | …). Defaults to the active i18n language. */
  lang?: string
  /** One or more JSON-LD objects rendered as <script type="application/ld+json">. */
  jsonLd?: object | object[]
  /** When true, emit robots "noindex,nofollow". */
  noindex?: boolean
}

const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  pl: 'pl_PL',
}

/**
 * Per-page SEO + GEO head management.
 *
 * Emits title, description, canonical, Open Graph, Twitter card,
 * <html lang>, hreflang alternates and JSON-LD structured data.
 */
export function Seo({
  title,
  description,
  path,
  lang,
  jsonLd,
  noindex = false,
}: SeoProps) {
  const { i18n } = useTranslation()
  const activeLang = lang ?? i18n.language ?? 'en'
  const langKey = activeLang.split('-')[0].toLowerCase()

  const url = `${SITE_URL}${path}`
  const image = `${SITE_URL}/og-image.png`
  const ogLocale = OG_LOCALE[langKey] ?? 'en_US'
  const ogLocaleAlt = langKey === 'pl' ? 'en_US' : 'pl_PL'
  const robots = noindex ? 'noindex,nofollow' : 'index,follow'

  const jsonLdList: object[] = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : []

  return (
    <Helmet htmlAttributes={{ lang: langKey }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/*
        No hreflang alternates: EN/PL are a client-side toggle served at the
        SAME URL (no per-locale routes), so language-specific alternate URLs
        do not exist. Emitting en/pl that both resolve to one URL is invalid
        per Google's hreflang spec, so the self-referencing canonical above
        is the correct signal. og:locale + og:locale:alternate still advertise
        bilingual availability.
      */}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="macOS Updates" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Structured data — one script per entry */}
      {jsonLdList.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
