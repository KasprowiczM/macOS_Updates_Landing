import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GitBranch,
  Camera,
  Lightbulb,
  Puzzle,
  Layers,
  ShieldCheck,
  Terminal,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDot,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Seo } from '../components/Seo'
import { SectionReveal } from '../components/ui/SectionReveal'
import { SITE_URL } from '../lib/site'

interface FeatureItem {
  icon: LucideIcon
  title: string
  desc: string
}

interface FeatureGroup {
  id: string
  title: string
  items: FeatureItem[]
}

export function FeaturesPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'

  const groups: FeatureGroup[] = [
    {
      id: 'core-pipeline',
      title: pl ? 'Pipeline i inwentarz' : 'Pipeline & Inventory',
      items: [
        {
          icon: GitBranch,
          title: t('features.pipeline.title'),
          desc: t('features.pipeline.desc'),
        },
        {
          icon: ShieldCheck,
          title: t('features.frontends.title'),
          desc: t('features.frontends.desc'),
        },
        {
          icon: Camera,
          title: t('features.snapshot.title'),
          desc: t('features.snapshot.desc'),
        },
      ],
    },
    {
      id: 'data-protection',
      title: pl ? 'Pokrycie i prywatność' : 'Coverage & Privacy',
      items: [
        {
          icon: ShieldCheck,
          title: t('features.scheduler.title'),
          desc: t('features.scheduler.desc'),
        },
        {
          icon: Layers,
          title: t('features.editions.title'),
          desc: t('features.editions.desc'),
        },
        {
          icon: Lightbulb,
          title: t('features.vanillaJs.title'),
          desc: t('features.vanillaJs.desc'),
        },
      ],
    },
    {
      id: 'execution-auditing',
      title: pl ? 'Rozszerzanie i audyt' : 'Extension & Auditing',
      items: [
        {
          icon: Terminal,
          title: t('features.aiTools.title'),
          desc: t('features.aiTools.desc'),
        },
        {
          icon: Lightbulb,
          title: t('features.suggestionsAi.title'),
          desc: t('features.suggestionsAi.desc'),
        },
        {
          icon: Puzzle,
          title: t('features.plugins.title'),
          desc: t('features.plugins.desc'),
        },
        {
          icon: GitBranch,
          title: t('features.multihost.title'),
          desc: t('features.multihost.desc'),
        },
      ],
    },
  ]

  const roadmapItems = [
    'signing',
    'installers',
    'marketplace',
    'i18nMore',
    'telemetry',
    'parallel',
  ] as const

  const shippingToday = pl
    ? [
        'Siedem kroków: prescan → system → App Store → CLI/npm → brew → internet → postupdate',
        'Lokalny APPLICATIONS.md budowany z tego Maca',
        '40+ obsługiwanych aplikacji internetowych',
        'Dwutorowy App Store: sudo mas + fallback AppleScript',
        'Wymuszone softwareupdate -R dla aktualizacji macOS',
        'Prywatny overlay dev_sync dla inwentarza i historii',
        'Siedem języków UI terminala',
        'Testy statyczne, registry parity i scan sekretów',
      ]
    : [
        'Seven steps: prescan → system → App Store → CLI/npm → brew → internet → postupdate',
        'Local APPLICATIONS.md built from this Mac',
        '40+ supported internet-downloaded apps',
        'Two-track App Store: sudo mas + AppleScript fallback',
        'Mandatory softwareupdate -R for macOS updates',
        'Private dev_sync overlay for inventory and history',
        'Seven terminal UI languages',
        'Static safety tests, registry parity, and secret scanning',
      ]

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Features',
        item: `${SITE_URL}/features`,
      },
    ],
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.featuresTitle'),
    description: t('seo.featuresDesc'),
    url: `${SITE_URL}/features`,
    inLanguage: i18n.language,
    isPartOf: {
      '@type': 'WebSite',
      name: 'macOS Updates',
      url: `${SITE_URL}/`,
    },
  }

  return (
    <>
      <Seo
        title={t('seo.featuresTitle')}
        description={t('seo.featuresDesc')}
        path="/features"
        lang={i18n.language}
        jsonLd={[breadcrumb, webPage]}
      />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Header */}
          <SectionReveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-(--fg-muted) hover:text-(--fg) text-[13px] font-mono no-underline mb-8 transition-colors duration-(--dur-2)"
            >
              <ArrowLeft size={14} />
              {pl ? 'Wróć do strony głównej' : 'Back to home'}
            </Link>
            <div className="font-mono text-[11px] uppercase tracking-normal text-(--accent-strong) mb-4">
              {t('nav.features')}
            </div>
            <h1
              className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[820px]"
              style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 3.4rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
            >
              {t('seo.featuresTitle')}
            </h1>
            <p
              className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[640px] mb-16"
              style={{ textWrap: 'pretty' as const }}
            >
              {t('seo.featuresDesc')}
            </p>
          </SectionReveal>

          {/* Feature groups */}
          <div className="space-y-16">
            {groups.map((group, gi) => (
              <SectionReveal key={group.id} delay={0.05 * gi}>
                <section id={group.id}>
                  <h2 className="font-semibold text-(--fg) font-sans tracking-tight text-[22px] mb-6 pb-3 border-b border-(--border)">
                    {group.title}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <m.div
                          key={item.title}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="p-6 border border-(--border) rounded-lg bg-(--bg-elev) hover:shadow-(--shadow-md) transition-shadow duration-(--dur-2)"
                        >
                          <div className="w-9 h-9 rounded-sm bg-(--accent) text-(--accent-ink) flex items-center justify-center mb-4">
                            <Icon size={18} />
                          </div>
                          <h3 className="font-semibold text-[15px] font-sans tracking-tight mb-2 text-(--fg)">
                            {item.title}
                          </h3>
                          <p className="text-(--fg-muted) text-[13px] leading-[1.6] font-sans m-0">
                            {item.desc}
                          </p>
                        </m.div>
                      )
                    })}
                  </div>
                </section>
              </SectionReveal>
            ))}
          </div>

          {/* Roadmap */}
          <SectionReveal delay={0.1}>
            <section id="roadmap" className="mt-24">
              <div className="font-mono text-[11px] uppercase tracking-normal text-(--accent-strong) mb-4">
                {t('roadmap.eyebrow')}
              </div>
              <h2
                className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
                style={{ fontSize: 'clamp(1.7rem, 3vw + 1rem, 2.6rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
              >
                {t('roadmap.title')}
              </h2>
              <p
                className="text-(--fg-muted) text-[16px] leading-normal font-sans max-w-[620px] mb-12"
                style={{ textWrap: 'pretty' as const }}
              >
                {t('roadmap.subtitle')}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Shipping today */}
                <div className="p-7 border border-(--border) rounded-lg bg-(--bg-elev)">
                  <h3 className="flex items-center gap-2 font-semibold text-[16px] font-sans tracking-tight mb-5 text-(--fg)">
                    <CheckCircle2 size={18} className="text-(--accent-strong)" />
                    {t('roadmap.statusNow')}
                  </h3>
                  <ul className="space-y-3 m-0 p-0 list-none">
                    {shippingToday.map((label) => (
                      <li key={label} className="flex items-start gap-2.5 text-(--fg-muted) text-[13px] leading-[1.5] font-sans">
                        <CheckCircle2 size={14} className="text-(--accent-strong) shrink-0 mt-0.5" />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next */}
                <div className="p-7 border border-(--border) rounded-lg bg-(--bg-elev)">
                  <h3 className="flex items-center gap-2 font-semibold text-[16px] font-sans tracking-tight mb-5 text-(--fg)">
                    <CircleDot size={18} className="text-(--fg-muted)" />
                    {t('roadmap.statusNext')}
                  </h3>
                  <ul className="space-y-4 m-0 p-0 list-none">
                    {roadmapItems.map((key) => (
                      <li key={key} className="flex items-start gap-2.5">
                        <CircleDot size={14} className="text-(--fg-faint) shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-[13px] font-sans text-(--fg) mb-0.5">
                            {t(`roadmap.items.${key}.title`)}
                          </div>
                          <div className="text-(--fg-muted) text-[12px] leading-[1.5] font-sans">
                            {t(`roadmap.items.${key}.desc`)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* Back-to-home CTA */}
          <SectionReveal delay={0.15}>
            <div className="mt-20 flex flex-wrap items-center gap-4">
              <Link
                to="/docs#quick-install"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-(--accent) text-(--accent-ink) font-semibold text-[13px] font-sans no-underline hover:bg-(--accent-hover) transition-colors duration-(--dur-2)"
              >
                {pl ? 'Zacznij teraz' : 'Get started'}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-(--fg) hover:text-(--accent-strong) text-[13px] font-semibold font-sans no-underline transition-colors duration-(--dur-2)"
              >
                <ArrowLeft size={14} />
                {pl ? 'Wróć do strony głównej' : 'Back to home'}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </main>
    </>
  )
}

export default FeaturesPage
