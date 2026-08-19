import { WikiSection, DocTable } from './WikiSection'

export function PlatformReference({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="platform-status" title={pl ? 'Status platformy' : 'Platform Status'}>
        <p>{pl
          ? 'macOS Updates v1.4.1 jest przeznaczony wyłącznie dla Apple Silicon i macOS 13+.'
          : 'macOS Updates v1.4.1 is scoped to Apple Silicon and macOS 13+ only.'
        }</p>
        <DocTable
          headers={[pl ? 'Platforma' : 'Platform', 'Status']}
          rows={[
            ['Apple Silicon macOS 13+', pl ? 'Obsługiwane (v1.4.1)' : 'Supported (v1.4.1)'],
            ['Intel Mac', pl ? 'Nieobsługiwane' : 'Unsupported'],
            ['Linux / Windows', pl ? 'Poza zakresem' : 'Out of scope'],
          ]}
        />
      </WikiSection>

      <WikiSection id="categories" title={pl ? 'Kategorie aktualizacji' : 'Update Categories'}>
        <DocTable
          headers={[pl ? 'Kategoria' : 'Category', pl ? 'Metoda / Narzędzie' : 'Method / Tool']}
          rows={[
            ['macOS (Step 6)', 'softwareupdate -ia -R --verbose'],
            ['App Store (Step 1)', 'sudo mas upgrade + AppleScript GUI fallback (Track 2)'],
            ['Native CLI/npm (Step 2)', 'Node, Bun, global npm CLIs (claude, codex, agy self-update)'],
            ['Homebrew (Step 3)', 'brew upgrade (--greedy) + cleanup + doctor (lib/brew.sh)'],
            [pl ? 'Aplikacje internetowe (Step 4)' : 'Internet apps (Step 4)', 'keystone, github_dmg, silent_launch, msupdate, mau_fallback_self_update, docker_cli, brew_cask, sparkle_appcast, appstore_gui, manual'],
            ['dev_sync', pl ? 'Prywatny overlay dla inwentarza i historii.' : 'Private overlay for inventory and history.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="doctor-reference" title={pl ? 'Raport pokrycia & Testy' : 'Coverage Report & Testing'}>
        <p className="text-[14px] mb-3">{pl
          ? 'Raport pokrycia pokazuje, które zainstalowane aplikacje są obsługiwane, które obsługiwane aplikacje nie są zainstalowane oraz które aplikacje pozostają nieznane.'
          : 'The coverage report shows which installed apps are supported, which supported apps are missing, and which installed apps are still unknown.'
        }</p>
        <DocTable
          headers={[pl ? 'Polecenie' : 'Command', pl ? 'Cel' : 'Purpose']}
          rows={[
            ['bash scripts/report_update_coverage.sh', pl ? 'Pełny raport pokrycia metod dla 43 aplikacji.' : 'Full method coverage report for 43 apps.'],
            ['bash update_all.sh --verify-only', pl ? 'Weryfikacja wersji aplikacji bez modyfikacji systemu.' : 'Verify app versions without system mutations.'],
            ['bash scripts/scaffold_internet_app.sh "App Name" silent_launch', pl ? 'Szkielet nowego handlera aplikacji.' : 'Scaffold a new app handler.'],
            ['bash run_tests.sh', pl ? '170 testów statycznych, registry, py_compile, unittest i gitleaks.' : '170 static, registry, py_compile, unittest, and gitleaks tests.'],
          ]}
        />
      </WikiSection>
    </>
  )
}
