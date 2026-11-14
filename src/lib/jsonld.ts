import {
  APP_VERSION,
  APP_VERSION_DATE,
  LATEST_TAGGED_VERSION,
  INSTALL_NIX,
  REPO_URL,
  SITE_URL,
} from './site'
import { localizedPath, type Lang } from './routes'
import type { FaqItem } from './faq'

/**
 * Structured data (schema.org JSON-LD) for every page.
 *
 * Each page emits ONE `@graph` that always carries the shared entities
 * (WebSite, publisher Person, SoftwareApplication, SoftwareSourceCode) linked by
 * stable @id values, plus the page's own WebPage/TechArticle + BreadcrumbList
 * and optional FAQPage / HowTo nodes. All facts come from the project ground
 * truth and the constants in ./site.ts; nothing here is hard-coded per release.
 */

export const IDS = {
  website: `${SITE_URL}/#website`,
  publisher: `${SITE_URL}/#publisher`,
  software: `${SITE_URL}/#software`,
  source: `${SITE_URL}/#source`,
} as const

const PUBLISHER_URL = 'https://github.com/KasprowiczM'
const VERSION_NUMBER = APP_VERSION.replace(/^v/i, '')
const OG_IMAGE = `${SITE_URL}/og-image.png`

const COPY = {
  en: {
    siteName: 'macOS Updates',
    siteDesc: 'Open-source macOS update toolkit for Apple Silicon, with source-aware planning and explicit consent.',
    appDesc: 'macOS Updates is an open-source Bash and Python toolkit for managing updates on Apple Silicon Macs.',
    sourceDesc: `Public upstream main source snapshot ${APP_VERSION}, dated ${APP_VERSION_DATE}. Latest tagged release: ${LATEST_TAGGED_VERSION}. No tag or GitHub Release exists for ${APP_VERSION}.`,
    category: 'System update utility',
    os: 'macOS 13 or later (Apple Silicon)',
    home: 'Home',
    features: [
      'Open-source toolkit for Apple Silicon Macs',
      'Local inventory and update workflow',
    ],
    howTo: {
      name: 'Install and run macOS Updates on an Apple Silicon Mac',
      description:
        'Install the current source snapshot, preview the proposed updates without applying them, then decide whether to run the full workflow.',
      tool: 'Terminal',
      steps: [
        {
          name: 'Install',
          text: `Run the one-line installer in Terminal. It inspects setup and, if Python is available, builds a local inventory. Dependency installation requires separate consent; the optional catalog starts unselected: ${INSTALL_NIX}`,
          anchor: '#quick-install',
        },
        {
          name: 'Preview with a dry-run',
          text: 'Run from the install folder: cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y. Review the proposed changes before continuing.',
          anchor: '#quick-install',
        },
        {
          name: 'Run the update',
          text: 'Run from the install folder: cd ~/Dev_Env/macOS_updates && bash update_all.sh. Review the plan and consent to eligible actions; unresolved sources remain manual.',
          anchor: '#quick-install',
        },
      ],
    },
    crumbs: {
      '/features': 'Features',
      '/docs': 'Documentation',
      '/security': 'Security',
      '/changelog': 'Changelog',
      '/contributing': 'Contributing',
    } as Record<string, string>,
  },
  pl: {
    siteName: 'macOS Updates',
    siteDesc: 'Otwarty toolkit aktualizacji macOS dla Apple Silicon, z planowaniem według źródła i jawną zgodą.',
    appDesc: 'macOS Updates to otwarty toolkit Bash i Python do zarządzania aktualizacjami na Macach Apple Silicon.',
    sourceDesc: `Publiczny snapshot kodu upstream main ${APP_VERSION} z dnia ${APP_VERSION_DATE}. Najnowszy tag wydania: ${LATEST_TAGGED_VERSION}. Nie ma taga ani GitHub Release dla ${APP_VERSION}.`,
    category: 'Narzędzie do aktualizacji systemu',
    os: 'macOS 13 lub nowszy (Apple Silicon)',
    home: 'Strona główna',
    features: [
      'Otwarty toolkit dla Maców Apple Silicon',
      'Lokalny inwentarz i proces aktualizacji',
    ],
    howTo: {
      name: 'Instalacja i uruchomienie macOS Updates na Macu z Apple Silicon',
      description:
        'Zainstaluj bieżący snapshot kodu, przejrzyj proponowane aktualizacje bez ich stosowania, a następnie zdecyduj, czy uruchomić pełny przebieg.',
      tool: 'Terminal',
      steps: [
        {
          name: 'Instalacja',
          text: `Uruchom jednoliniowy instalator w Terminalu. Sprawdza konfigurację i, jeśli Python jest dostępny, buduje lokalny inwentarz. Instalacja zależności wymaga osobnej zgody; opcjonalny katalog jest niewybrany: ${INSTALL_NIX}`,
          anchor: '#quick-install',
        },
        {
          name: 'Podgląd w trybie dry-run',
          text: 'Uruchom z katalogu instalacji: cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y. Przejrzyj proponowane zmiany przed kontynuacją.',
          anchor: '#quick-install',
        },
        {
          name: 'Uruchom aktualizację',
          text: 'Uruchom z katalogu instalacji: cd ~/Dev_Env/macOS_updates && bash update_all.sh. Przejrzyj plan i wyraź zgodę na dopuszczone działania; nierozstrzygnięte źródła pozostają ręczne.',
          anchor: '#quick-install',
        },
      ],
    },
    crumbs: {
      '/features': 'Funkcje',
      '/docs': 'Dokumentacja',
      '/security': 'Bezpieczeństwo',
      '/changelog': 'Historia zmian',
      '/contributing': 'Współtworzenie',
    } as Record<string, string>,
  },
} satisfies Record<Lang, unknown>

/** Absolute URL of a (language-neutral) route in `lang`. */
export function pageUrl(path: string, lang: Lang): string {
  const p = localizedPath(path, lang)
  return `${SITE_URL}${p}`
}

function homeUrl(lang: Lang): string {
  return pageUrl('/', lang)
}

function webSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: `${SITE_URL}/`,
    name: COPY.en.siteName,
    description: COPY.en.siteDesc,
    inLanguage: ['en', 'pl'],
    publisher: { '@id': IDS.publisher },
  }
}

function publisherNode() {
  return {
    '@type': 'Person',
    '@id': IDS.publisher,
    name: 'KasprowiczM',
    url: PUBLISHER_URL,
    sameAs: [PUBLISHER_URL, REPO_URL],
  }
}

function softwareNode(lang: Lang) {
  const c = COPY[lang]
  return {
    '@type': 'SoftwareApplication',
    '@id': IDS.software,
    name: 'macOS Updates',
    alternateName: ['macOS_updates', 'macos-updates'],
    description: c.appDesc,
    url: homeUrl(lang),
    inLanguage: lang,
    softwareVersion: LATEST_TAGGED_VERSION.replace(/^v/i, ''),
    dateModified: APP_VERSION_DATE,
    operatingSystem: c.os,
    processorRequirements: 'Apple Silicon (arm64)',
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: c.category,
    isAccessibleForFree: true,
    license: 'https://opensource.org/licenses/MIT',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: c.features,
    releaseNotes: pageUrl('/changelog', lang),
    softwareHelp: pageUrl('/docs', lang),
    downloadUrl: REPO_URL,
    installUrl: REPO_URL,
    screenshot: OG_IMAGE,
    image: OG_IMAGE,
    author: { '@id': IDS.publisher },
    publisher: { '@id': IDS.publisher },
    isBasedOn: { '@id': IDS.source },
  }
}

function sourceNode(lang: Lang) {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': IDS.source,
    name: 'macOS Updates source code',
    description: COPY[lang].sourceDesc,
    codeRepository: REPO_URL,
    programmingLanguage: ['Bash', 'Python'],
    runtimePlatform: 'macOS (Apple Silicon)',
    license: 'https://opensource.org/licenses/MIT',
    version: VERSION_NUMBER,
    dateModified: APP_VERSION_DATE,
    author: { '@id': IDS.publisher },
    targetProduct: { '@id': IDS.software },
  }
}

export function faqPageNode(items: FaqItem[], path: string, lang: Lang) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl(path, lang)}#faq`,
    inLanguage: lang,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function howToNode(path: string, lang: Lang) {
  const h = COPY[lang].howTo
  const url = pageUrl(path, lang)
  return {
    '@type': 'HowTo',
    '@id': `${url}#howto-install`,
    name: h.name,
    description: h.description,
    inLanguage: lang,
    tool: [{ '@type': 'HowToTool', name: h.tool }],
    step: h.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${pageUrl('/docs', lang)}${s.anchor}`,
    })),
  }
}

export interface PageJsonLdInput {
  lang: Lang
  /** Language-neutral route, e.g. "/docs". */
  path: string
  name: string
  description: string
  /** 'TechArticle' for documentation; WebPage otherwise. */
  type?: 'WebPage' | 'TechArticle' | 'AboutPage' | 'CollectionPage'
  /** Extra nodes (FAQPage, HowTo, ...) appended to the graph. */
  extra?: object[]
}

/** One complete `@graph` for a page. */
export function buildPageJsonLd({ lang, path, name, description, type = 'WebPage', extra = [] }: PageJsonLdInput) {
  const url = pageUrl(path, lang)
  const isHome = path === '/'
  const crumbLabel = COPY[lang].crumbs[path] ?? name

  const page: Record<string, unknown> = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.software },
    publisher: { '@id': IDS.publisher },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    dateModified: APP_VERSION_DATE,
  }
  if (type === 'TechArticle') {
    page.headline = name
    page.author = { '@id': IDS.publisher }
    page.mainEntityOfPage = url
  }
  if (!isHome) page.breadcrumb = { '@id': `${url}#breadcrumb` }

  const graph: object[] = [webSiteNode(), publisherNode(), softwareNode(lang), sourceNode(lang), page]

  if (!isHome) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: COPY[lang].home, item: homeUrl(lang) },
        { '@type': 'ListItem', position: 2, name: crumbLabel, item: url },
      ],
    })
  }

  graph.push(...extra)
  return { '@context': 'https://schema.org', '@graph': graph }
}
