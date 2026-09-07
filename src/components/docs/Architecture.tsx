import { WikiSection, CodeBlock, DocTable } from './WikiSection'
import { INTERNET_APP_COUNT, TEST_COUNT } from '../../lib/site'

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
update_npm_cli.sh              # step 2: native vendor CLIs + Node/Bun/npm
update_brew.sh                 # step 3: brew upgrade + cleanup + doctor
update_internet_apps.sh        # step 4: ${INTERNET_APP_COUNT} internet app handlers
build_inventory.sh / postupdate # step 0 & 5: APPLICATIONS.md & UPDATES.md
update_system.sh               # step 6: softwareupdate -ia -R (macOS final)
config/internet_apps.txt       # public registry (${INTERNET_APP_COUNT} apps)
config/inventory_exclusions.txt # discovery exclusions (Ascendo)
lib/brew.sh                    # resilient Homebrew query layer
lib/proc.sh                    # process-group timeout + SIGKILL
lib/native_installers.sh       # vendor CLI download-then-exec
lib/run_lock.sh                # per-repo run lock
lib/version.sh                 # shared version comparison logic
dev_sync/overlay_import.py     # overlay import boundaries + recovery
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
            ['1', 'update_appstore.sh', pl ? 'sudo mas ze zmierzonymi ID + retry w sesji użytkownika + GUI iPada.' : 'sudo mas with measured IDs + user-session retry + iPad GUI'],
            ['2', 'update_npm_cli.sh', pl ? 'Natywne CLI vendorów (claude, Codex, OpenCode, agy) oraz Node/Bun/npm.' : 'Native vendor CLIs (claude, Codex, OpenCode, agy) plus Node/Bun/npm.'],
            ['3', 'update_brew.sh', pl ? 'Homebrew upgrade (--greedy), cleanup i doctor przez lib/brew.sh.' : 'Homebrew upgrade (--greedy), cleanup, and doctor via lib/brew.sh.'],
            ['4', 'update_internet_apps.sh', pl ? `${INTERNET_APP_COUNT} obsługiwane aplikacje internetowe (keystone, dmg, mau, sparkle, etc.).` : `${INTERNET_APP_COUNT} supported internet apps (keystone, dmg, mau, sparkle, etc.).`],
            ['5', 'postupdate', pl ? 'Rozdziela edycje inwentarza od zaobserwowanych zmian pakietów; zapis UPDATES.md.' : 'Splits inventory field edits from observed package changes; writes UPDATES.md.'],
            ['6', 'update_system.sh', pl ? 'softwareupdate -ia -R (końcowy krok bezpieczny dla restartu).' : 'softwareupdate -ia -R (final restart-safe step).'],
          ]}
        />
      </WikiSection>

      <WikiSection id="native-bash" title={pl ? 'Ograniczenia runtime' : 'Runtime Constraints'}>
        <p>{pl
          ? `Projekt musi działać na Bashu 3.2 dostarczanym przez macOS. Nie używa declare -A, mapfile ani readarray. Ścieżki opierają się na SCRIPT_DIR zamiast hardcodowanych katalogów. Wszystkie zmiany przechodzą ${TEST_COUNT} testów statycznych i unit.`
          : `The project must run on macOS-provided Bash 3.2. It avoids declare -A, mapfile, and readarray. Paths are based on SCRIPT_DIR instead of hardcoded directories. All changes pass ${TEST_COUNT} static and unit tests.`
        }</p>
      </WikiSection>
    </>
  )
}
