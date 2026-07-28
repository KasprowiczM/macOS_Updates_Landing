import { WikiSection, CodeBlock, DocTable } from './WikiSection'

export function Architecture({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="architecture" title={pl ? 'Architektura' : 'Architecture'}>
        <p>{pl
          ? 'Rdzeń to Bash 3.2 z pomocniczym Pythonem inline/heredoc tam, gdzie trzeba parsować dane strukturalne. Publiczny registry aplikacji internetowych mieszka w config/, a wspólne funkcje w lib/.'
          : 'The core is Bash 3.2 with inline/heredoc Python where structured parsing is needed. The public internet-app registry lives in config/, and shared behavior lives in lib/.'
        }</p>
        <CodeBlock title="macOS_updates/">{`update_all.sh                  # ${pl ? 'główny orkiestrator (kroki 0 do 6)' : 'main orchestrator (steps 0 to 6)'}
update_appstore.sh             # step 1: sudo mas + AppleScript fallback
update_npm_cli.sh              # step 2: Node, Bun, npm global CLIs
update_brew.sh                 # step 3: brew upgrade + cleanup + doctor
update_internet_apps.sh        # step 4: 48 internet app handlers
build_inventory.sh / postupdate # step 0 & 5: APPLICATIONS.md & UPDATES.md
update_system.sh               # step 6: softwareupdate -ia -R (macOS final)
config/internet_apps.txt       # public registry (48 apps)
dev_sync/                      # private overlay backend
docs/agents/critical_rules.md  # ${pl ? 'reguły nienegocjowalne' : 'non-negotiable rules'}`}</CodeBlock>
      </WikiSection>

      <WikiSection id="four-phase" title={pl ? '7-krokowy pipeline' : '7-Step Pipeline'}>
        <p>{pl
          ? 'update_all.sh wykonuje warstwy w stałej kolejności (0 do 6). Aktualizacja systemu macOS wykonuje się na końcu, a miękkie błędy aplikacji nie blokują aktualizacji macOS.'
          : 'update_all.sh runs layers in a fixed order (0 to 6). macOS system updates run last, and soft app failures do not block macOS system updates.'
        }</p>
        <DocTable
          headers={[pl ? 'Krok' : 'Step', pl ? 'Skrypt' : 'Script', pl ? 'Cel' : 'Purpose']}
          rows={[
            ['0', 'prescan', pl ? 'Odświeża APPLICATIONS.md z tej maszyny.' : 'Refresh APPLICATIONS.md from this machine.'],
            ['1', 'update_appstore.sh', 'sudo mas upgrade + AppleScript GUI fallback'],
            ['2', 'update_npm_cli.sh', pl ? 'Node, Bun i globalne CLI npm.' : 'Node, Bun, and npm global CLIs.'],
            ['3', 'update_brew.sh', pl ? 'Homebrew upgrade (--greedy), cleanup i doctor.' : 'Homebrew upgrade (--greedy), cleanup, and doctor.'],
            ['4', 'update_internet_apps.sh', pl ? '48 obsługiwanych aplikacji internetowych (keystone, dmg, mau, etc.).' : '48 supported internet apps (keystone, dmg, mau, etc.).'],
            ['5', 'postupdate', pl ? 'Atomowy zapis wersji w inwentarzu i historii UPDATES.md.' : 'Atomic write to inventory versions and UPDATES.md history.'],
            ['6', 'update_system.sh', pl ? 'softwareupdate -ia -R (końcowy krok bezpieczny dla restartu).' : 'softwareupdate -ia -R (final restart-safe step).'],
          ]}
        />
      </WikiSection>

      <WikiSection id="native-bash" title={pl ? 'Ograniczenia runtime' : 'Runtime Constraints'}>
        <p>{pl
          ? 'Projekt musi działać na Bashu 3.2 dostarczanym przez macOS. Nie używa declare -A, mapfile ani readarray. Ścieżki opierają się na SCRIPT_DIR zamiast hardcodowanych katalogów. Wszystkie zmiany przechodzą 94 testy statyczne i unit.'
          : 'The project must run on macOS-provided Bash 3.2. It avoids declare -A, mapfile, and readarray. Paths are based on SCRIPT_DIR instead of hardcoded directories. All changes pass 94 static and unit tests.'
        }</p>
      </WikiSection>
    </>
  )
}
