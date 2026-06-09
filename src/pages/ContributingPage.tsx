import { useTranslation } from 'react-i18next'
import { DocLayout } from '../components/layout/DocLayout'
import { Seo } from '../components/Seo'
import { CodeBlock } from '../components/docs/WikiSection'
import { SITE_URL } from '../lib/site'

export function ContributingPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'macOS Updates', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: pl ? 'Współtworzenie' : 'Contributing', item: `${SITE_URL}/contributing` },
    ],
  }

  return (
    <>
      <Seo
        title={t('seo.contributingTitle')}
        description={t('seo.contributingDesc')}
        path="/contributing"
        lang={i18n.language}
        jsonLd={breadcrumb}
      />
      <DocLayout title={pl ? 'Jak kontrybuować' : 'Contributing'}>
        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Zakres projektu' : 'Project Scope'}
          </h2>
          <p>
            {pl
              ? 'macOS Updates jest updaterem dla Apple Silicon. Najbardziej wartościowe kontrybucje to nowe handlery aplikacji internetowych, testy registry, dokumentacja operacyjna i poprawki zgodności Bash 3.2.'
              : 'macOS Updates is an Apple Silicon updater. The highest-value contributions are internet app handlers, registry tests, operations docs, and Bash 3.2 compatibility fixes.'}
          </p>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Konfiguracja lokalna' : 'Development Setup'}
          </h2>
          <CodeBlock title="bash">{`git clone https://github.com/KasprowiczM/macOS_updates.git
cd macOS_updates
bash run_tests.sh
bash update_all.sh --dry-run -y`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Dodawanie aplikacji internetowej' : 'Adding an Internet App'}
          </h2>
          <p>
            {pl
              ? 'Nowa aplikacja wymaga wpisu w publicznym registry, metody, funkcji handlera, dispatch order, i18n w siedmiu językach i testów.'
              : 'A new app needs a public registry entry, method, handler function, dispatch order, seven-language i18n, and tests.'}
          </p>
          <CodeBlock title="bash">{`bash scripts/scaffold_internet_app.sh "App Name" silent_launch
# config/internet_apps.txt
# config/internet_app_methods.txt
# config/internet_dispatch_order.txt
# lib/internet_app_updates.sh
# update_internet_apps.sh
# i18n/lang_*.sh
bash run_tests.sh`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Struktura projektu' : 'Project Structure'}
          </h2>
          <CodeBlock title="macOS_updates/">{`install.sh                    # one-line public installer
setup.sh                      # public setup without cloud overlay
migration_setup.sh            # owner setup + cloud wizard
build_inventory.sh            # builds APPLICATIONS.md from this Mac
update_all.sh                 # seven-step orchestrator
update_system.sh              # softwareupdate -ia -R
update_appstore.sh            # sudo mas + AppleScript fallback
update_npm_cli.sh             # Node, Bun, npm global CLIs
update_brew.sh                # Homebrew layer
update_internet_apps.sh       # internet app handlers
config/                       # public app registry and methods
lib/                          # shared Bash libraries
i18n/                         # seven language files
dev_sync/                     # private overlay backend
tests/                        # safety/static tests`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Reguły kodu' : 'Code Rules'}
          </h2>
          <ul className="space-y-2">
            <li>{pl ? 'Bash 3.2 tylko: bez declare -A, mapfile i readarray.' : 'Bash 3.2 only: no declare -A, mapfile, or readarray.'}</li>
            <li>{pl ? 'Nie dodawaj nowych samodzielnych plików .py do pipeline aktualizacji.' : 'Do not add new standalone .py files to the update pipeline.'}</li>
            <li>{pl ? 'softwareupdate musi mieć -R; mas upgrade musi mieć sudo.' : 'softwareupdate must keep -R; mas upgrade must use sudo.'}</li>
            <li>{pl ? 'Nie commituj APPLICATIONS.md, UPDATES.md, .env ani plików dev_sync config.' : 'Do not commit APPLICATIONS.md, UPDATES.md, .env, or dev_sync config files.'}</li>
          </ul>
        </section>
      </DocLayout>
    </>
  )
}

export default ContributingPage
