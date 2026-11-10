import { WikiSection, DocTable } from './WikiSection'
import { APP_VERSION, INTERNET_APP_COUNT, TEST_COUNT } from '../../lib/site'

export function PlatformReference({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="platform-status" title={pl ? 'Status platformy' : 'Platform Status'}>
        <p>{pl
          ? `macOS Updates ${APP_VERSION} jest przeznaczony wyłącznie dla Apple Silicon i macOS 13 do 27 (testowane do macOS 27.2).`
          : `macOS Updates ${APP_VERSION} is scoped to Apple Silicon and macOS 13 to 27 only (tested through macOS 27.2).`
        }</p>
        <DocTable
          headers={[pl ? 'Platforma' : 'Platform', 'Status']}
          rows={[
            ['Apple Silicon macOS 13 to 27', pl ? `Obsługiwane (${APP_VERSION})` : `Supported (${APP_VERSION})`],
            ['Intel Mac', pl ? 'Nieobsługiwane' : 'Unsupported'],
            ['Linux / Windows', pl ? 'Poza zakresem' : 'Out of scope'],
          ]}
        />
      </WikiSection>

      <WikiSection id="categories" title={pl ? 'Kategorie aktualizacji' : 'Update Categories'}>
        <DocTable
          headers={[pl ? 'Kategoria' : 'Category', pl ? 'Metoda / Narzędzie' : 'Method / Tool']}
          rows={[
            ['macOS (Step 6)', 'softwareupdate -i <label> -R (per-label + batch restart; exit 10 if restart declined)'],
            ['App Store (Step 1)', 'Track 1: sudo mas upgrade; Track 2: AppleScript GUI for iPad apps (30 s polling, product-page fallback, exit 10 if unoffered)'],
            ['Native CLI/npm (Step 2)', 'Stable Node (via node_releases.py), Bun, npm globals, claude, Codex, opencode, agy'],
            ['Homebrew (Step 3)', pl ? 'brew upgrade (formuły + wyznaczone caski, pomijanie sierot) + cleanup + doctor' : 'brew upgrade (formulae + designated casks, orphan skip) + cleanup + doctor'],
            [pl ? 'Aplikacje internetowe (Step 4)' : 'Internet apps (Step 4)', 'keystone, github_dmg, silent_launch, msupdate, mau_fallback_self_update, docker_cli, brew_cask, sparkle_appcast, chromium_updater, appstore_gui, manual'],
            ['dev_sync', pl ? 'Prywatny overlay dla inwentarza i historii.' : 'Private overlay for inventory and history.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="doctor-reference" title={pl ? 'Raport pokrycia & Testy' : 'Coverage Report & Testing'}>
        <p>{pl
          ? 'Raport pokrycia pokazuje, które zainstalowane aplikacje są obsługiwane, które obsługiwane aplikacje nie są zainstalowane oraz które aplikacje pozostają nieznane.'
          : 'The coverage report shows which installed apps are supported, which supported apps are missing, and which installed apps are still unknown.'
        }</p>
        <DocTable
          headers={[pl ? 'Polecenie' : 'Command', pl ? 'Cel' : 'Purpose']}
          rows={[
            ['bash scripts/report_update_coverage.sh', pl ? `Pełny raport pokrycia metod dla ${INTERNET_APP_COUNT} aplikacji.` : `Full method coverage report for ${INTERNET_APP_COUNT} apps.`],
            ['bash update_all.sh --verify-only', pl ? 'Weryfikacja wersji aplikacji bez modyfikacji systemu.' : 'Verify app versions without system mutations.'],
            ['bash scripts/scaffold_internet_app.sh "App Name" silent_launch', pl ? 'Szkielet nowego handlera aplikacji.' : 'Scaffold a new app handler.'],
            ['bash run_tests.sh', pl ? `${TEST_COUNT} zebranych przypadków unittest w Pythonie, plus składnia, registry i gitleaks.` : `${TEST_COUNT} collected Python unittest cases, plus syntax, registry, and gitleaks checks.`],
          ]}
        />
      </WikiSection>
    </>
  )
}
