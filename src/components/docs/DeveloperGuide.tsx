import { WikiSection, CodeBlock, DocTable } from './WikiSection'

export function DeveloperGuide({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="dev-setup" title={pl ? 'Konfiguracja deweloperska' : 'Development Setup'}>
        <CodeBlock title="bash">{`git clone https://github.com/KasprowiczM/macOS_updates.git
cd macOS_updates
bash run_tests.sh`}</CodeBlock>
        <p className="text-[14px]">{pl
          ? 'Przed zmianami w updaterach uruchom syntax check i testy. Nie dodawaj nowych samodzielnych plików .py do pipeline aktualizacji.'
          : 'Before updater changes, run syntax checks and tests. Do not add new standalone .py files to the update pipeline.'
        }</p>
      </WikiSection>

      <WikiSection id="code-style" title={pl ? 'Styl kodu' : 'Code Style'}>
        <DocTable
          headers={[pl ? 'Obszar' : 'Area', pl ? 'Reguła' : 'Rule']}
          rows={[
            ['Bash', 'Bash 3.2 only; no declare -A, mapfile, readarray'],
            ['Paths', 'SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"'],
            ['macOS update', 'softwareupdate must keep -R'],
            ['App Store', 'mas upgrade must run through sudo'],
            ['Private files', '.env, APPLICATIONS.md, UPDATES.md, .dev_sync_config.json stay gitignored'],
          ]}
        />
      </WikiSection>

      <WikiSection id="testing" title={pl ? 'Testowanie' : 'Testing'}>
        <CodeBlock title="bash">{`bash -n update_all.sh
bash update_all.sh --dry-run -y
bash scripts/report_update_coverage.sh
bash run_tests.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="pr-workflow" title={pl ? 'Workflow Pull Request' : 'Pull Request Workflow'}>
        <ol className="list-decimal list-inside space-y-2 text-[14px]">
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
        <CodeBlock title="bash">{`sudo softwareupdate -ia -R --verbose
sudo env MAS_NO_AUTO_INDEX=1 mas upgrade`}</CodeBlock>
      </WikiSection>

      <WikiSection id="contributing-plugins" title={pl ? 'Dodawanie aplikacji internetowej' : 'Adding an Internet App'}>
        <CodeBlock title="bash">{`bash scripts/scaffold_internet_app.sh "App Name" silent_launch
# update config/internet_apps.txt
# update config/internet_app_methods.txt
# update config/internet_dispatch_order.txt
# add L_INTERNET_* keys to all 7 i18n/lang_*.sh files
bash run_tests.sh`}</CodeBlock>
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
