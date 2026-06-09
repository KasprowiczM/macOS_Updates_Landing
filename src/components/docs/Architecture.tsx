import { WikiSection, CodeBlock, DocTable } from './WikiSection'

export function Architecture({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="architecture" title={pl ? 'Architektura' : 'Architecture'}>
        <p>{pl
          ? 'Rdzeń to Bash 3.2 z pomocniczym Pythonem inline/heredoc tam, gdzie trzeba parsować dane strukturalne. Publiczny registry aplikacji internetowych mieszka w config/, a wspólne funkcje w lib/.'
          : 'The core is Bash 3.2 with inline/heredoc Python where structured parsing is needed. The public internet-app registry lives in config/, and shared behavior lives in lib/.'
        }</p>
        <CodeBlock title="macOS_updates/">{`update_all.sh                  # ${pl ? 'główny orkiestrator' : 'main orchestrator'}
update_system.sh               # softwareupdate -ia -R
update_appstore.sh             # sudo mas + AppleScript fallback
update_npm_cli.sh              # Node, Bun, npm global CLIs
update_brew.sh                 # brew upgrade + cleanup + doctor
update_internet_apps.sh        # 40+ internet app handlers
config/internet_apps.txt       # public registry
dev_sync/                      # private overlay backend
docs/agents/critical_rules.md  # ${pl ? 'reguły nienegocjowalne' : 'non-negotiable rules'}`}</CodeBlock>
      </WikiSection>

      <WikiSection id="four-phase" title={pl ? '7-krokowy pipeline' : '7-Step Pipeline'}>
        <p>{pl
          ? 'update_all.sh wykonuje warstwy w stałej kolejności. Błąd krytycznego kroku ma zwrócić niezerowy exit status.'
          : 'update_all.sh runs layers in a fixed order. A failed critical child step must return a non-zero exit status.'
        }</p>
        <DocTable
          headers={[pl ? 'Krok' : 'Step', pl ? 'Skrypt' : 'Script', pl ? 'Cel' : 'Purpose']}
          rows={[
            ['0', 'prescan', pl ? 'Odświeża APPLICATIONS.md z tej maszyny.' : 'Refresh APPLICATIONS.md from this machine.'],
            ['1', 'update_system.sh', 'softwareupdate -ia -R --verbose'],
            ['2', 'update_appstore.sh', 'sudo mas upgrade + AppleScript fallback'],
            ['3', 'update_npm_cli.sh', pl ? 'Node, Bun i globalne CLI npm.' : 'Node, Bun, and npm global CLIs.'],
            ['4', 'update_brew.sh', pl ? 'Homebrew upgrade, cleanup i doctor.' : 'Homebrew upgrade, cleanup, and doctor.'],
            ['5', 'update_internet_apps.sh', pl ? 'Obsługiwane aplikacje internetowe, tylko gdy zainstalowane.' : 'Supported internet apps, only when installed.'],
            ['6', 'postupdate', pl ? 'Wersje w inwentarzu i historia UPDATES.md.' : 'Inventory versions and UPDATES.md history.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="native-bash" title={pl ? 'Ograniczenia runtime' : 'Runtime Constraints'}>
        <p>{pl
          ? 'Projekt musi działać na Bashu 3.2 dostarczanym przez macOS. Nie używa declare -A, mapfile ani readarray. Ścieżki opierają się na SCRIPT_DIR zamiast hardcodowanych katalogów.'
          : 'The project must run on macOS-provided Bash 3.2. It avoids declare -A, mapfile, and readarray. Paths are based on SCRIPT_DIR instead of hardcoded directories.'
        }</p>
      </WikiSection>
    </>
  )
}
