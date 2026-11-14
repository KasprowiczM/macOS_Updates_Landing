import { TerminalWindow } from '../components/experience/TerminalWindow'
import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { DocLayout } from '../components/layout/DocLayout'
import { Button } from '../components/ui/Button'
import { CodeBlock } from '../components/docs/WikiSection'
import { buildPageJsonLd } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { INTERNET_APP_COUNT, UPDATE_METHOD_COUNT, TEST_COUNT } from '../lib/site'

interface FeatureItem {
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
          title: t('features.pipeline.title'),
          desc: t('features.pipeline.desc'),
        },
        {
          title: t('features.frontends.title'),
          desc: t('features.frontends.desc'),
        },
        {
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
          title: t('features.scheduler.title'),
          desc: t('features.scheduler.desc'),
        },
        {
          title: t('features.editions.title'),
          desc: t('features.editions.desc'),
        },
        {
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
          title: t('features.aiTools.title'),
          desc: t('features.aiTools.desc'),
        },
        {
          title: t('features.suggestionsAi.title'),
          desc: t('features.suggestionsAi.desc'),
        },
        {
          title: t('features.plugins.title'),
          desc: t('features.plugins.desc', { tests: TEST_COUNT }),
        },
        {
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
        'Inwentarz rozpoznaje instancje, źródła, konflikty i nieznane pochodzenie; zasady i migracja wymagają jawnych decyzji',
        `${INTERNET_APP_COUNT} wpisów rejestru w ${UPDATE_METHOD_COUNT} historycznych kategoriach możliwości, bez gwarancji aktywnej ścieżki`,
        'Plan i dry-run pokazują propozycje. Wykonanie jest ograniczone do kwalifikujących się aktualizacji przez menedżera i wymaga zgody',
        'Natywne CLI, Node, Bun i ogólne ścieżki producentów pozostają ręczne; efekty npm dotyczące skryptów, zależności lub nowych poleceń są odraczane',
        'Porady o najnowszej stabilnej wersji nie wykonują automatycznej migracji',
        'Opcjonalny katalog jest niewybrany, a instalacja ma osobny plan. Brak zatwierdzonych publicznych receptur automatycznej instalacji',
        'Raport gotowości --doctor tylko do odczytu, lokalna historia i siedem języków interfejsu terminala',
        `${TEST_COUNT} zebranych przypadków unittest w Pythonie`,
      ]
    : [
        'Inventory identifies separate instances, sources, conflicts and unknown origins; policies and migration require explicit decisions',
        `${INTERNET_APP_COUNT} registry rows in ${UPDATE_METHOD_COUNT} legacy capability categories, without a guarantee of an enabled path`,
        'Plan and dry-run show proposals. Execution is limited to eligible manager updates and requires consent',
        'Native CLIs, Node, Bun and generic vendor paths remain manual; npm effects involving scripts, dependencies or new commands are deferred',
        'Latest-stable advice does not automatically migrate software',
        'The optional catalog starts unselected and installation has a separate plan. No public automatic installation recipes are approved',
        'Read-only --doctor readiness report, local history and seven terminal UI languages',
        `${TEST_COUNT} collected Python unittest cases`,
      ]

  const lang = useLang()
  const jsonLd = buildPageJsonLd({
    lang,
    path: '/features',
    name: t('seo.featuresTitle'),
    description: t('seo.featuresDesc'),
  })

  const toc = [
    ...groups.map((g) => ({ id: g.id, label: g.title })),
    { id: 'roadmap', label: t('roadmap.title') },
  ]

  return (
    <>
      <Seo
        title={t('seo.featuresTitle')}
        description={t('seo.featuresDesc')}
        path="/features"
        lang={lang}
        jsonLd={jsonLd}
      />
      <DocLayout title={t('chrome.features.title')} lead={t('seo.featuresDesc')} toc={toc}>
        {groups.map((group, gi) => (
            <section key={group.id} id={group.id} className="feature-section scroll-mt-24">
              <h2 className="mb-4">{group.title}</h2>
              {gi === 0 && <div className="feature-terminal"><TerminalWindow language={lang} /><CodeBlock title="Terminal">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y`}</CodeBlock></div>}
              <dl className="feature-list m-0 border-b border-(--rule-strong)">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-x-8 gap-y-1 border-t border-(--rule-strong) py-4 md:grid-cols-[15rem_minmax(0,1fr)]"
                  >
                    <dt className="font-semibold leading-snug text-(--fg)">{item.title}</dt>
                    <dd className="m-0 max-w-[62ch] text-(--fg-muted)">{item.desc}</dd>
                  </div>
                ))}
              </dl>
            </section>
        ))}

          <section id="roadmap" className="feature-roadmap scroll-mt-24">
            <h2 className="mb-3">{t('roadmap.title')}</h2>
            <p className="mb-8">{t('roadmap.subtitle')}</p>

            <div className="feature-roadmap-grid grid items-start gap-10 xl:grid-cols-2">
              <div className="border-t border-(--rule-strong)">
                <div className="border-b border-(--rule) py-4">
                  <h3 className="m-0 text-(--fg)">{t('roadmap.statusNow')}</h3>
                </div>
                <ul className="m-0 list-none p-0">
                  {shippingToday.map((label) => (
                    <li
                      key={label}
                      className="m-0 flex max-w-none items-start gap-3 border-b border-(--rule) py-3 text-[15px] leading-[1.5] last:border-b-0"
                    >
                      <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-(--rule-strong)">
                <div className="border-b border-(--rule) py-4">
                  <h3 className="m-0 text-(--fg)">{t('roadmap.statusNext')}</h3>
                </div>
                <ul className="m-0 list-none p-0">
                  {roadmapItems.map((key) => (
                    <li key={key} className="m-0 flex max-w-none items-start gap-3 border-b border-(--rule) py-3 last:border-b-0">
                      <div className="min-w-0">
                        <div className="font-semibold leading-snug text-(--fg)">{t(`roadmap.items.${key}.title`)}</div>
                        <div className="mt-0.5 text-[15px] leading-[1.5]">{t(`roadmap.items.${key}.desc`)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        <div className="flex flex-wrap items-center gap-3">
          <Button href="/docs#quick-install">{t('chrome.features.getStarted')}</Button>
          <Button href="/" variant="secondary">{t('chrome.features.backHome')}</Button>
        </div>
      </DocLayout>
    </>
  )
}

export default FeaturesPage
