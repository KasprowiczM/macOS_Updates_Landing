import { WikiSection, CodeBlock, DocTable } from './WikiSection'

export function DeveloperGuide({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="dev-setup" title={pl ? 'Konfiguracja deweloperska' : 'Development Setup'}>
        <CodeBlock title="bash">{`git clone https://github.com/KasprowiczM/macOS_updates.git ~/Dev_Env/macOS_updates`}</CodeBlock>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash run_tests.sh`}</CodeBlock>
        <p>{pl
          ? 'Przed zmianami w updaterach uruchom syntax check i testy. Nie dodawaj nowych samodzielnych plików .py do pipeline aktualizacji.'
          : 'Before updater changes, run syntax checks and tests. Do not add new standalone .py files to the update pipeline.'
        }</p>
      </WikiSection>

      <WikiSection id="terminal-development" title={pl ? 'Terminal i testy' : 'Terminal and tests'}>
        <p>{pl ? 'Interfejs korzysta z modułów Python i uruchamia wyłącznie przypisane działania jako procesy potomne. Testuj na izolowanych danych bez uruchamiania narzędzi systemowych. --cli wymusza dotychczasową ścieżkę, a --preferences-only otwiera przegląd zapisanych decyzji bez przebiegu aktualizacji.' : 'The interface uses Python modules and launches fixed child actions. Test with isolated fixtures without running host tools. --cli forces the legacy path, and --preferences-only reviews saved decisions without running updates.'}</p>
      </WikiSection>

      <WikiSection id="code-style" title={pl ? 'Styl kodu' : 'Code Style'}>
        <DocTable
          headers={[pl ? 'Obszar' : 'Area', pl ? 'Reguła' : 'Rule']}
          rows={[
            ['Bash', 'Bash 3.2 only; no declare -A, mapfile, readarray'],
            ['Paths', 'SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"'],
            ['macOS update', 'softwareupdate must keep -R; declined restart installs no-restart labels and exits 10'],
            ['Source policy', 'Only eligible manager updates execute through the plan and consent gate; generic vendor/native paths remain manual.'],
            ['macOS 27 & Locale', 'Locale overrides must use env LANG=C LC_ALL=C to avoid bash setlocale segfault'],
            ['Xcode gate', 'xcodebuild -license check (not -checkFirstLaunchStatus, which returns 69 on licensed Xcode 27.2)'],
            ['Release versioning', 'macOS_updates and Ascendo releases are intended to use matching versions. An explicitly approved upstream release may precede parity; report the latest tag separately from the source version.'],
            ['Private files', '.env, APPLICATIONS.md, UPDATES.md, .dev_sync_config.json stay gitignored'],
          ]}
        />
      </WikiSection>

      <WikiSection id="testing" title={pl ? 'Testowanie' : 'Testing'}>
        <p>{pl ? 'Sprawdź gotowość bez uruchamiania aktualizacji.' : 'Check readiness without running updates.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --doctor`}</CodeBlock>
        <p>{pl ? 'Uruchom testy projektu osobno.' : 'Run the project tests separately.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash run_tests.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="pr-workflow" title={pl ? 'Workflow Pull Request' : 'Pull Request Workflow'}>
        <ol>
          <li>{pl ? 'Utrzymuj zmiany małe i zgodne z istniejącymi modułami.' : 'Keep changes small and aligned with existing modules.'}</li>
          <li>{pl ? 'Dla nowej aplikacji dodaj registry, handler, dispatch i i18n.' : 'For a new app, add registry, handler, dispatch, and i18n.'}</li>
          <li>{pl ? 'Uruchom run_tests.sh i raport pokrycia.' : 'Run run_tests.sh and the coverage report.'}</li>
          <li>{pl ? 'Nie commituj prywatnego inwentarza ani historii.' : 'Do not commit private inventory or history.'}</li>
        </ol>
      </WikiSection>

      <WikiSection id="architecture-firewall" title={pl ? 'Nienegocjowalne reguły' : 'Non-Negotiable Rules'}>
        <p>{pl
          ? 'Te reguły pochodzą z docs/agents/critical_rules.md i są częścią publicznego kontraktu projektu.'
          : 'These rules come from docs/agents/critical_rules.md and are part of the project contract.'
        }</p>
        <CodeBlock title="shell reference" copyable={false}>{`Read-only listing:
  env LANG=C LC_ALL=C softwareupdate -l

One system-update example (requires restart approval):
  sudo softwareupdate -i "$label" -R --verbose

One App Store CLI example (use only measured app IDs):
  Review the source-aware plan and explicit consent before any manager update

Xcode licence check:
  xcodebuild -license check`}</CodeBlock>
      </WikiSection>

      <WikiSection id="contributing-plugins" title={pl ? 'Dodawanie aplikacji internetowej' : 'Adding an Internet App'}>
        <p>{pl ? 'Podaj dokładną ścieżkę zaobserwowanej aplikacji. Polecenie zwraca propozycję do przeglądu; nie tworzy wykonywalnego handlera ani nie zatwierdza receptury.' : 'Supply the exact path of an observed app. The command returns a review-only proposal; it creates no executable handler and approves no recipe.'}</p>
        <CodeBlock title="bash" copyable={false}>{`cd ~/Dev_Env/macOS_updates && bash scripts/scaffold_internet_app.sh /path/Observed.app --json`}</CodeBlock>
        <p>{pl ? 'Po przeglądzie źródła, tożsamości i zakresu receptury uruchom testy. Akceptacja aktualizacji, pierwszej instalacji i cyklu życia pozostaje osobna.' : 'Run tests after reviewing the recipe source, identity and scope. Update, first-install and lifecycle acceptance remain separate.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash run_tests.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="security" title={pl ? 'Bezpieczeństwo' : 'Security'}>
        <p>{pl
          ? 'Nie zgłaszaj podatności przez publiczne Issues. Użyj GitHub Security Advisories albo prywatnego emaila z prefiksem [macOS_updates-security].'
          : 'Do not report vulnerabilities through public Issues. Use GitHub Security Advisories or private email with the [macOS_updates-security] subject prefix.'
        }</p>
      </WikiSection>
    </>
  )
}
