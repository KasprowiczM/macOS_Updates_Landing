import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { WikiLayout, type WikiSection as WikiSectionType } from '../components/layout/WikiLayout'
import { Seo } from '../components/Seo'
import { REPO_URL } from '../lib/site'
import { getFaqItems } from '../lib/faq'
import { buildPageJsonLd, faqPageNode, howToNode } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { GettingStarted } from '../components/docs/GettingStarted'
import { UserGuide } from '../components/docs/UserGuide'
import { Architecture } from '../components/docs/Architecture'
import { PlatformReference } from '../components/docs/PlatformReference'
import { DeveloperGuide } from '../components/docs/DeveloperGuide'
import { Faq } from '../components/docs/Faq'

export function DocsPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'

  const lang = useLang()
  const jsonLd = buildPageJsonLd({
    lang,
    path: '/docs',
    name: t('seo.docsTitle'),
    description: t('seo.docsDesc'),
    type: 'TechArticle',
    extra: [faqPageNode(getFaqItems(t), '/docs', lang), howToNode('/docs', lang)],
  })

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

  const groups: { key: string; title: string; node: ReactNode }[] = [
    { key: 'getting-started', title: pl ? 'Pierwsze kroki' : 'Getting Started', node: <GettingStarted pl={pl} /> },
    { key: 'user-guide', title: pl ? 'Przewodnik użytkownika' : 'User Guide', node: <UserGuide pl={pl} /> },
    { key: 'architecture-group', title: pl ? 'Architektura' : 'Architecture', node: <Architecture pl={pl} /> },
    { key: 'platform-reference', title: pl ? 'Referencyjna platforma' : 'Platform Reference', node: <PlatformReference pl={pl} /> },
    { key: 'developer-guide', title: pl ? 'Przewodnik dewelopera' : 'Developer Guide', node: <DeveloperGuide pl={pl} /> },
    { key: 'faq-group', title: 'FAQ', node: <Faq pl={pl} /> },
  ]

  return (
    <>
      <Seo
        title={t('seo.docsTitle')}
        description={t('seo.docsDesc')}
        path="/docs"
        lang={lang}
        jsonLd={jsonLd}
      />
      <WikiLayout title={pl ? 'Dokumentacja' : 'Documentation'} sections={sections}>
        {groups.map((group) => (
          <section key={group.key} aria-labelledby={`${group.key}-title`}>
            <h2 id={`${group.key}-title`} className="mb-6">{group.title}</h2>
            <div className="space-y-10">{group.node}</div>
          </section>
        ))}

        <section>
          <p className="m-0">
            {pl ? 'Pełna dokumentacja techniczna dostępna jest w ' : 'For the full technical documentation, see the '}
            <a href={`${REPO_URL}/tree/main/docs`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-words">
              {pl ? 'katalogu docs/ na GitHubie' : 'docs/ directory on GitHub'}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            .
          </p>
        </section>
      </WikiLayout>
    </>
  )
}
