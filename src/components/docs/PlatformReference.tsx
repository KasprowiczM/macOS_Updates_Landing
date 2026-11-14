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
            [pl ? 'Menedżery' : 'Managers', pl ? 'Dopuszczone aktualizacje istniejącego menedżera wymagają planu i zgody.' : 'Eligible existing-manager updates require a plan and consent.'],
            ['App Store', pl ? 'Działania podlegają bramce planu; dawny interfejs Track 2 nie jest aktywny.' : 'Actions pass the plan gate; the legacy Track 2 GUI is inactive.'],
            ['CLI / npm', pl ? 'Natywne CLI, Node i Bun pozostają ręczne; efekty npm związane ze skryptami, zależnościami i nowymi poleceniami są odraczane.' : 'Native CLI, Node and Bun remain manual; npm effects involving scripts, dependencies and new commands are deferred.'],
            [pl ? 'Rejestr' : 'Registry', pl ? `${INTERNET_APP_COUNT} wpisów opisuje dawne możliwości, nie aktywne ścieżki.` : `${INTERNET_APP_COUNT} rows describe legacy capabilities, not enabled paths.`],
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
            ['bash update_all.sh --doctor', pl ? 'Tylko do odczytu raport gotowości: narzędzia, harmonogram, uprawnienia, miejsce, zasilanie, sieć i ostatni rzeczywisty przebieg.' : 'Read-only readiness report for tools, scheduling, permissions, disk, power, network, and the last real run.'],
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
