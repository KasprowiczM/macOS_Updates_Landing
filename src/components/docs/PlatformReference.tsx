import { WikiSection, DocTable } from './WikiSection'

export function PlatformReference({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="platform-status" title={pl ? 'Status platformy' : 'Platform Status'}>
        <p>{pl
          ? 'macOS Updates v1.0.17 jest przeznaczony wyłącznie dla Apple Silicon i macOS 13+.'
          : 'macOS Updates v1.0.17 is scoped to Apple Silicon and macOS 13+ only.'
        }</p>
        <DocTable
          headers={[pl ? 'Platforma' : 'Platform', 'Status']}
          rows={[
            ['Apple Silicon macOS 13+', pl ? 'Obsługiwane' : 'Supported'],
            ['Intel Mac', pl ? 'Nieobsługiwane' : 'Unsupported'],
            ['Linux / Windows', pl ? 'Poza zakresem' : 'Out of scope'],
          ]}
        />
      </WikiSection>

      <WikiSection id="categories" title={pl ? 'Kategorie aktualizacji' : 'Update Categories'}>
        <DocTable
          headers={[pl ? 'Kategoria' : 'Category', pl ? 'Metoda' : 'Method']}
          rows={[
            ['macOS', 'softwareupdate -ia -R --verbose'],
            ['App Store', 'sudo mas upgrade + AppleScript GUI fallback'],
            ['Native CLI/npm', 'Node, Bun, npm global CLI updates'],
            ['Homebrew', 'brew upgrade + cleanup + doctor'],
            [pl ? 'Aplikacje internetowe' : 'Internet apps', 'keystone, github_dmg, silent_launch, msupdate, docker_cli, manual'],
            ['dev_sync', pl ? 'Prywatny overlay dla lokalnego stanu.' : 'Private overlay for local state.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="doctor-reference" title={pl ? 'Raport pokrycia' : 'Coverage Report'}>
        <p className="text-[14px] mb-3">{pl
          ? 'Raport pokrycia pokazuje, które zainstalowane aplikacje są obsługiwane, które obsługiwane aplikacje nie są zainstalowane oraz które aplikacje pozostają nieznane.'
          : 'The coverage report shows which installed apps are supported, which supported apps are missing, and which installed apps are still unknown.'
        }</p>
        <DocTable
          headers={[pl ? 'Polecenie' : 'Command', pl ? 'Cel' : 'Purpose']}
          rows={[
            ['bash scripts/report_update_coverage.sh', pl ? 'Pełny raport pokrycia metod.' : 'Full method coverage report.'],
            ['bash scripts/scaffold_internet_app.sh "App Name" silent_launch', pl ? 'Szkielet nowego handlera.' : 'Scaffold a new handler.'],
            ['bash run_tests.sh', pl ? 'Walidacja registry, testów i sekretów.' : 'Validate registry, tests, and secrets.'],
          ]}
        />
      </WikiSection>
    </>
  )
}
