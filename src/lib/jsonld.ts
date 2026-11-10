import {
  APP_VERSION,
  APP_VERSION_DATE,
  INSTALL_NIX,
  INTERNET_APP_COUNT,
  REPO_URL,
  SITE_URL,
  TEST_COUNT,
  UPDATE_METHOD_COUNT,
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
    siteDesc:
      'Open-source, one-command updater for Apple Silicon Macs: macOS, App Store, Homebrew, native CLIs, npm and internet-downloaded apps, updated only when the live Mac confirms it.',
    appDesc: `macOS Updates is an open-source Bash and Python toolkit that keeps macOS, App Store apps, Homebrew, native CLI tools, npm globals and ${INTERNET_APP_COUNT} internet-downloaded apps current on Apple Silicon Macs. It updates only software already installed, never closes apps you have open, checks each vendor's own feed before acting, and reports a result only after the live Mac confirms it.`,
    sourceDesc: 'Public source snapshot of macOS Updates on upstream main, currently identified as v1.6.0. The latest tagged release is v1.5.5; no v1.6.0 Git tag or GitHub Release exists.',
    category: 'System update utility',
    os: 'macOS 13 or later (Apple Silicon)',
    home: 'Home',
    features: [
      'Seven ordered steps: prescan, App Store, native CLIs and npm, Homebrew, internet apps, postupdate history, macOS system update last',
      'Updates only software already installed on the Mac; supported missing apps are reported, never installed',
      'Open apps are never closed: the toolkit only quits apps it launched itself',
      `${INTERNET_APP_COUNT} internet-downloaded apps checked against the vendor's own feed through ${UPDATE_METHOD_COUNT} update methods`,
      'Verified vendor downloads: Gatekeeper assessment, bundle ID and Apple Team ID checks, staged swap with automatic rollback',
      'Results reported only when the live Mac confirms them; unknown stays unknown',
      'Dry-run mode and read-only update coverage report before anything is changed',
      'macOS softwareupdate with mandatory -R runs last because it can restart the Mac',
      'Optional private dev_sync overlay for inventory, history and preferences',
      `Seven terminal UI languages (EN, PL, DE, FR, ES, IT, PT) and ${TEST_COUNT} collected Python unittest cases`,
    ],
    howTo: {
      name: 'Install and run macOS Updates on an Apple Silicon Mac',
      description:
        'Install the current source snapshot, preview the proposed updates without applying them, then decide whether to run the full workflow.',
      tool: 'Terminal',
      steps: [
        {
          name: 'Install',
          text: `Run the one-line installer in Terminal. It checks or installs setup dependencies, builds a local inventory, and may configure Touch ID for sudo. It does not install supported apps: ${INSTALL_NIX}`,
          anchor: '#quick-install',
        },
        {
          name: 'Preview with a dry-run',
          text: 'Run from the install folder: cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y. Review the proposed changes before continuing.',
          anchor: '#quick-install',
        },
        {
          name: 'Run the update',
          text: 'Run from the install folder: cd ~/Dev_Env/macOS_updates && bash update_all.sh. The seven steps run in order and the macOS system update runs last because it can restart the Mac.',
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
    siteDesc:
      'Open-source’owy aktualizator Apple Silicon jedną komendą: macOS, App Store, Homebrew, natywne CLI, npm i aplikacje pobrane z internetu, aktualizowane tylko wtedy, gdy potwierdzi to żywy Mac.',
    appDesc: `macOS Updates to open-source’owy zestaw skryptów Bash i Python, który utrzymuje aktualne macOS, aplikacje z App Store, Homebrew, natywne narzędzia CLI, globalne pakiety npm i ${INTERNET_APP_COUNT} aplikacji pobranych z internetu na Macach z Apple Silicon. Aktualizuje tylko oprogramowanie już zainstalowane, nigdy nie zamyka otwartych aplikacji, sprawdza wersję w feedzie producenta przed działaniem i raportuje wynik dopiero po potwierdzeniu przez żywego Maca.`,
    sourceDesc: 'Publiczny snapshot kodu macOS Updates w gałęzi upstream main, obecnie oznaczony jako v1.6.0. Najnowszy tag wydania to v1.5.5; nie ma taga v1.6.0 ani GitHub Release.',
    category: 'Narzędzie do aktualizacji systemu',
    os: 'macOS 13 lub nowszy (Apple Silicon)',
    home: 'Strona główna',
    features: [
      'Siedem uporządkowanych kroków: prescan, App Store, natywne CLI i npm, Homebrew, aplikacje internetowe, historia postupdate, aktualizacja macOS na końcu',
      'Aktualizuje tylko oprogramowanie już zainstalowane na Macu; obsługiwane brakujące aplikacje są raportowane, nigdy instalowane',
      'Otwarte aplikacje nigdy nie są zamykane: zestaw zamyka tylko aplikacje, które sam uruchomił',
      `${INTERNET_APP_COUNT} aplikacji z internetu sprawdzanych w feedzie producenta przez ${UPDATE_METHOD_COUNT} metod aktualizacji`,
      'Weryfikowane pobrania od producenta: Gatekeeper, bundle ID i Apple Team ID, etapowa podmiana z automatycznym rollbackiem',
      'Wyniki raportowane tylko po potwierdzeniu przez żywego Maca; nieznane pozostaje nieznane',
      'Tryb dry-run i raport pokrycia tylko do odczytu przed jakąkolwiek zmianą',
      'macOS softwareupdate z obowiązkowym -R działa na końcu, bo może zrestartować Maca',
      'Opcjonalny prywatny overlay dev_sync dla inwentarza, historii i preferencji',
      `Siedem języków interfejsu terminala (EN, PL, DE, FR, ES, IT, PT) i ${TEST_COUNT} zebranych przypadków unittest w Pythonie`,
    ],
    howTo: {
      name: 'Instalacja i uruchomienie macOS Updates na Macu z Apple Silicon',
      description:
        'Zainstaluj bieżący snapshot kodu, przejrzyj proponowane aktualizacje bez ich stosowania, a następnie zdecyduj, czy uruchomić pełny przebieg.',
      tool: 'Terminal',
      steps: [
        {
          name: 'Instalacja',
          text: `Uruchom jednoliniowy instalator w Terminalu. Sprawdza lub instaluje zależności, buduje lokalny inwentarz i może skonfigurować Touch ID dla sudo. Nie instaluje obsługiwanych aplikacji: ${INSTALL_NIX}`,
          anchor: '#quick-install',
        },
        {
          name: 'Podgląd w trybie dry-run',
          text: 'Uruchom z katalogu instalacji: cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y. Przejrzyj proponowane zmiany przed kontynuacją.',
          anchor: '#quick-install',
        },
        {
          name: 'Uruchom aktualizację',
          text: 'Uruchom z katalogu instalacji: cd ~/Dev_Env/macOS_updates && bash update_all.sh. Siedem kroków działa po kolei, a aktualizacja systemu macOS na końcu, bo może zrestartować Maca.',
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
    softwareVersion: VERSION_NUMBER,
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
