import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { DocLayout } from '../components/layout/DocLayout'
import { Button } from '../components/ui/Button'
import { SectionReveal } from '../components/ui/SectionReveal'
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
          desc: t('features.plugins.desc'),
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
        'Siedem kroków: prescan → App Store → CLI/npm → brew → internet → postupdate → system macOS',
        'Lokalny APPLICATIONS.md budowany z tego Maca z wykluczeniami w inventory_exclusions.txt',
        `${INTERNET_APP_COUNT} obsługiwane aplikacje internetowe w ${UPDATE_METHOD_COUNT} metodach (w tym Sparkle appcast, GitHub DMG i vendor feed truth)`,
        'Prawda feedów producentów (vendor_feeds.txt: Sparkle RSS, JSON, YAML, KV) z weryfikacją Gatekeeper i Team ID',
        'Sprawdzanie historii Omaha (updater_history.jsonl) przed wybudzeniem updaterów Chrome, Gemini i Comet',
        'Bezpośrednie pobieranie wydań ChatGPT przed uruchomieniem GUI (oszczędność do 150 s na bieg)',
        'Aktualizacja bezczynnego Dockera ze zweryfikowanego DMG z appcastu (działający Docker jest chroniony)',
        'Oddzielenie ostrzeżeń o feedach producentów od celów instalacji bez rzekomych downgrade’ów (od v1.5.4)',
        'Aplikacje otwarte przez Ciebie nigdy nie są zamykane: toolkit zamyka tylko to, co sam uruchomił',
        'Dwutorowy App Store: sudo mas ze zmierzonymi ID; Track 2 GUI dla aplikacji iPada (polling 30 s, product page fallback, soft warning exit 10)',
        'Natywne CLI vendorów (claude, Codex, OpenCode, agy), stabilny Node.js (bez wydań alpha), czyszczenie duplikatów',
        'Uczciwe raporty: edycje inwentarza vs zaobserwowane zmiany pakietów/CLI; nieznane pending zostaje nieznane',
        'Import overlay odmawia nadpisania Git, pomija wykluczenia i zostawia ścieżkę odzyskania po nieudanej zamianie',
        'Kwarantanna MAU z własnym wygaśnięciem: aktualizacje Office nie mogą ukryć się w nieskończoność',
        'Końcowa bezpieczna aktualizacja macOS: softwareupdate -R, instalacja bezrestartowa przy odrzuceniu restartu (exit 10)',
        'Prywatny overlay dev_sync dla inwentarza i historii ze wsparciem Proton Drive',
        'Tryb bezmutacyjnej weryfikacji --verify-only oraz automatyzacja LaunchAgent i Touch ID sudo',
        'Siedem języków UI terminala (EN, PL, DE, FR, ES, IT, PT)',
        `${TEST_COUNT} hermetycznych testów statycznych, unit, registry parity i skan sekretów gitleaks`,
      ]
    : [
        'Seven steps: prescan → App Store → CLI/npm → brew → internet → postupdate → macOS system',
        'Local APPLICATIONS.md built from this Mac with inventory_exclusions.txt support',
        `${INTERNET_APP_COUNT} supported internet-downloaded apps across ${UPDATE_METHOD_COUNT} methods (including Sparkle appcast, GitHub DMG, and vendor feed truth)`,
        'Vendor feed truth (vendor_feeds.txt: Sparkle RSS, JSON, YAML, Key-Value) with Gatekeeper & Team ID verification',
        'Pre-action Omaha history proof (updater_history.jsonl) before wake for Chrome, Gemini, and Comet',
        'Direct verified downloads for ChatGPT before GUI launch saving up to 150 seconds per run',
        'Idle Docker Desktop updates from verified appcast DMG without container engine disruptions',
        'Decoupled manufacturer feed warnings with explicit versions and no false downgrade targets (since v1.5.4)',
        'Apps you have open are never closed: the toolkit only quits what it launched itself',
        'Two-track App Store: sudo mas with measured IDs; Track 2 iPad GUI (30 s polling, product-page fallback, exit 10 soft warning)',
        'Native vendor CLIs (claude, Codex, OpenCode, agy), stable Node.js (alpha releases excluded), duplicate binary cleanup',
        'Honest reports: inventory field edits vs observed package/CLI changes; unknown pending stays unknown',
        'Overlay import refuses Git overwrite, skips exclusions, and keeps a recovery path after a failed swap',
        'MAU quarantine with self-owned expiry so Office updates cannot hide forever',
        'Restart-safe final macOS system update: softwareupdate -R, no-restart labels installed on declined reboot (exit 10)',
        'Private dev_sync overlay for inventory and history with Proton Drive support',
        'Non-mutating --verify-only mode, LaunchAgent automation, and Touch ID sudo onboarding',
        'Seven terminal UI languages (EN, PL, DE, FR, ES, IT, PT)',
        `${TEST_COUNT} hermetic static, unit, registry parity, and gitleaks secret scanning tests`,
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
          <SectionReveal key={group.id} delay={0.04 * gi}>
            <section id={group.id} className="scroll-mt-24">
              <h2 className="mb-4">{group.title}</h2>
              <dl className="m-0 border-b border-(--rule-strong)">
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
          </SectionReveal>
        ))}

        <SectionReveal>
          <section id="roadmap" className="scroll-mt-24">
            <h2 className="mb-3">{t('roadmap.title')}</h2>
            <p className="mb-8">{t('roadmap.subtitle')}</p>

            <div className="grid items-start gap-6 xl:grid-cols-2">
              <div className="rounded-sm border border-(--rule-strong) bg-(--bg-elev)">
                <div className="flex items-center gap-2.5 border-b border-(--rule-strong) bg-(--bg-sunk) px-4 py-2.5">
                  <span className="lamp lamp-go" aria-hidden="true" />
                  <h3 className="placard m-0 text-(--fg)">{t('roadmap.statusNow')}</h3>
                </div>
                <ul className="m-0 list-none p-0">
                  {shippingToday.map((label) => (
                    <li
                      key={label}
                      className="m-0 flex max-w-none items-start gap-3 border-b border-(--rule) px-4 py-3 text-[15px] leading-[1.5] last:border-b-0"
                    >
                      <span className="lamp lamp-go mt-[5px]" aria-hidden="true" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border border-(--rule-strong) bg-(--bg-elev)">
                <div className="flex items-center gap-2.5 border-b border-(--rule-strong) bg-(--bg-sunk) px-4 py-2.5">
                  <span className="lamp lamp-standby" aria-hidden="true" />
                  <h3 className="placard m-0 text-(--fg)">{t('roadmap.statusNext')}</h3>
                </div>
                <ul className="m-0 list-none p-0">
                  {roadmapItems.map((key) => (
                    <li key={key} className="m-0 flex max-w-none items-start gap-3 border-b border-(--rule) px-4 py-3 last:border-b-0">
                      <span className="lamp lamp-standby mt-[5px]" aria-hidden="true" />
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
        </SectionReveal>

        <div className="flex flex-wrap items-center gap-3">
          <Button href="/docs#quick-install">{t('chrome.features.getStarted')}</Button>
          <Button href="/" variant="secondary">{t('chrome.features.backHome')}</Button>
        </div>
      </DocLayout>
    </>
  )
}

export default FeaturesPage
