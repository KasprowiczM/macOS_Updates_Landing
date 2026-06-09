import { useTranslation } from 'react-i18next'
import { WikiLayout, type WikiSection as WikiSectionType } from '../components/layout/WikiLayout'
import { Seo } from '../components/Seo'
import { SITE_URL, REPO_URL } from '../lib/site'
import { FAQ_ITEMS } from '../lib/faq'
import { GettingStarted } from '../components/docs/GettingStarted'
import { UserGuide } from '../components/docs/UserGuide'
import { Architecture } from '../components/docs/Architecture'
import { PlatformReference } from '../components/docs/PlatformReference'
import { DeveloperGuide } from '../components/docs/DeveloperGuide'
import { Faq } from '../components/docs/Faq'

export function DocsPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'

  const techArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t('seo.docsTitle'),
    description: t('seo.docsDesc'),
    inLanguage: i18n.language,
    url: `${SITE_URL}/docs`,
    author: { '@type': 'Organization', name: 'macOS Updates', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'macOS Updates', url: SITE_URL },
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'macOS Updates', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: pl ? 'Dokumentacja' : 'Documentation', item: `${SITE_URL}/docs` },
    ],
  }

  const localizedFaqItems = FAQ_ITEMS.map((item) => ({
    q: pl ? t(`faq.items.${item.id}.q`) : item.q,
    a: pl ? t(`faq.items.${item.id}.a`) : item.a,
  }))

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localizedFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const sections: WikiSectionType[] = [
    {
      id: 'overview',
      label: pl ? 'Pierwsze kroki' : 'Getting Started',
      children: [
        { id: 'overview', label: pl ? 'Przegląd' : 'Overview' },
        { id: 'quick-install', label: pl ? 'Instalacja' : 'Installation' },
        { id: 'update', label: pl ? 'Aktualizacja' : 'Updating' },
        { id: 'uninstall', label: pl ? 'Deinstalacja' : 'Uninstall' },
      ],
    },
    {
      id: 'daily-usage',
      label: pl ? 'Przewodnik użytkownika' : 'User Guide',
      children: [
        { id: 'daily-usage', label: pl ? 'Codzienne użycie' : 'Daily Usage' },
        { id: 'risk-taxonomy', label: pl ? 'Zasady aktualizacji' : 'Update Rules' },
        { id: 'private-overlay', label: pl ? 'Prywatny overlay' : 'Private Overlay' },
        { id: 'scheduling', label: pl ? 'Tryby i flagi' : 'Modes and Flags' },
      ],
    },
    {
      id: 'architecture',
      label: pl ? 'Architektura' : 'Architecture',
      children: [
        { id: 'architecture', label: pl ? 'Architektura' : 'Architecture' },
        { id: 'four-phase', label: pl ? '7-krokowy Pipeline' : '7-Step Pipeline' },
        { id: 'native-bash', label: pl ? 'Runtime' : 'Runtime' },
      ],
    },
    {
      id: 'platform-status',
      label: pl ? 'Referencyjna platforma' : 'Platform Reference',
      children: [
        { id: 'platform-status', label: pl ? 'Status' : 'Status' },
        { id: 'categories', label: pl ? 'Kategorie aktualizacji' : 'Update Categories' },
      ],
    },
    {
      id: 'dev-setup',
      label: pl ? 'Przewodnik dewelopera' : 'Developer Guide',
      children: [
        { id: 'dev-setup', label: pl ? 'Konfiguracja' : 'Setup' },
        { id: 'code-style', label: pl ? 'Styl kodu' : 'Code Style' },
        { id: 'testing', label: pl ? 'Testowanie' : 'Testing' },
        { id: 'pr-workflow', label: pl ? 'Pull Request' : 'PR Workflow' },
        { id: 'architecture-firewall', label: pl ? 'Firewall' : 'Architecture Firewall' },
        { id: 'contributing-plugins', label: pl ? 'Tworzenie pluginów' : 'Creating Plugins' },
        { id: 'security', label: pl ? 'Bezpieczeństwo' : 'Security' },
      ],
    },
    {
      id: 'faq',
      label: 'FAQ',
      children: [
        { id: 'faq', label: pl ? 'Najczęściej zadawane pytania' : 'FAQ' },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={t('seo.docsTitle')}
        description={t('seo.docsDesc')}
        path="/docs"
        lang={i18n.language}
        jsonLd={[techArticle, breadcrumbList, faqPage]}
      />
      <WikiLayout title={pl ? 'Dokumentacja' : 'Documentation'} sections={sections}>
        {/* Getting Started */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-md bg-(--accent-soft) flex items-center justify-center text-(--accent-strong) text-[14px] font-bold">1</div>
          <h2 className="text-(--fg) font-bold text-[26px] tracking-tight font-sans m-0">
            {pl ? 'Pierwsze kroki' : 'Getting Started'}
          </h2>
        </div>
        <GettingStarted pl={pl} />

        {/* User Guide */}
        <div className="flex items-center gap-3 mb-6 pt-10 border-t border-(--border)">
          <div className="w-8 h-8 rounded-md bg-(--accent-soft) flex items-center justify-center text-(--accent-strong) text-[14px] font-bold">2</div>
          <h2 className="text-(--fg) font-bold text-[26px] tracking-tight font-sans m-0">
            {pl ? 'Przewodnik użytkownika' : 'User Guide'}
          </h2>
        </div>
        <UserGuide pl={pl} />

        {/* Architecture */}
        <div className="flex items-center gap-3 mb-6 pt-10 border-t border-(--border)">
          <div className="w-8 h-8 rounded-md bg-(--accent-soft) flex items-center justify-center text-(--accent-strong) text-[14px] font-bold">3</div>
          <h2 className="text-(--fg) font-bold text-[26px] tracking-tight font-sans m-0">
            {pl ? 'Architektura' : 'Architecture'}
          </h2>
        </div>
        <Architecture pl={pl} />

        {/* Platform Reference */}
        <div className="flex items-center gap-3 mb-6 pt-10 border-t border-(--border)">
          <div className="w-8 h-8 rounded-md bg-(--accent-soft) flex items-center justify-center text-(--accent-strong) text-[14px] font-bold">4</div>
          <h2 className="text-(--fg) font-bold text-[26px] tracking-tight font-sans m-0">
            {pl ? 'Referencyjna platforma' : 'Platform Reference'}
          </h2>
        </div>
        <PlatformReference pl={pl} />

        {/* Developer Guide */}
        <div className="flex items-center gap-3 mb-6 pt-10 border-t border-(--border)">
          <div className="w-8 h-8 rounded-md bg-(--accent-soft) flex items-center justify-center text-(--accent-strong) text-[14px] font-bold">5</div>
          <h2 className="text-(--fg) font-bold text-[26px] tracking-tight font-sans m-0">
            {pl ? 'Przewodnik dewelopera' : 'Developer Guide'}
          </h2>
        </div>
        <DeveloperGuide pl={pl} />

        {/* FAQ */}
        <div className="flex items-center gap-3 mb-6 pt-10 border-t border-(--border)">
          <div className="w-8 h-8 rounded-md bg-(--accent-soft) flex items-center justify-center text-(--accent-strong) text-[14px] font-bold">6</div>
          <h2 className="text-(--fg) font-bold text-[26px] tracking-tight font-sans m-0">
            FAQ
          </h2>
        </div>
        <Faq pl={pl} />

        {/* Footer link */}
        <section className="pt-10 border-t border-(--border)">
          <p className="text-[14px]">
            {pl ? 'Pełna dokumentacja techniczna dostępna w ' : 'For the full technical documentation, see the '}
            <a
              href={`${REPO_URL}/tree/main/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--accent-strong) hover:text-(--accent) no-underline transition-colors break-words"
            >
              {pl ? 'katalogu docs/ na GitHub →' : 'docs/ directory on GitHub →'}
            </a>
          </p>
        </section>
      </WikiLayout>
    </>
  )
}
