import { WikiSection, CodeBlock, DocTable } from './WikiSection'
import { TEST_COUNT } from '../../lib/site'

export function Architecture({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="architecture" title={pl ? 'Architektura' : 'Architecture'}>
        <p>{pl
          ? 'Rdzeń to Bash 3.2 z pomocniczym Pythonem inline/heredoc tam, gdzie trzeba parsować dane strukturalne. Publiczny registry aplikacji internetowych mieszka w config/, a wspólne funkcje w lib/.'
          : 'The core is Bash 3.2 with inline/heredoc Python where structured parsing is needed. The public internet-app registry lives in config/, and shared behavior lives in lib/.'
        }</p>
        <CodeBlock title="macOS_updates/" copyable={false}>{`update_all.sh                  # orchestrator and plan
build_inventory.sh             # source-aware inventory
config/internet_apps.txt       # legacy catalog registry
lib/python/policy_runtime.py   # source-bound action policy
update_system.sh               # macOS system update`}</CodeBlock>
      </WikiSection>

      <WikiSection id="four-phase" title={pl ? '7-krokowy pipeline' : '7-Step Pipeline'}>
        <p>{pl
          ? 'Plan ogranicza wykonanie do dopuszczonych działań menedżera. Nieznane ścieżki pozostają ręczne.'
          : 'The plan limits execution to eligible manager actions. Unknown paths remain manual.'
        }</p>
        <DocTable
          headers={[pl ? 'Krok' : 'Step', pl ? 'Skrypt' : 'Script', pl ? 'Cel' : 'Purpose']}
          rows={[
            ['0', 'prescan.py', pl ? 'Lokalny inwentarz i obserwacja źródeł.' : 'Local inventory and source observation.'],
            ['1', 'update_appstore.sh', pl ? 'Plan i zgoda dla dopuszczonych działań menedżera; dawny Track 2 GUI jest nieaktywny.' : 'Plan and consent gate eligible manager actions; legacy Track 2 GUI is inactive.'],
            ['2', 'update_npm_cli.sh', pl ? 'Natywne CLI, Node i Bun pozostają ręczne; ryzykowne efekty npm są odraczane.' : 'Native CLI, Node and Bun remain manual; npm side effects are deferred.'],
            ['3', 'update_brew.sh', pl ? 'Dopuszczone aktualizacje Homebrew podlegają planowi, kontroli i zgodzie.' : 'Eligible Homebrew updates require a plan, checks and consent.'],
            ['4', 'update_internet_apps.sh', pl ? 'Rejestr opisuje dawne możliwości; ogólne ścieżki producentów pozostają ręczne.' : 'The registry describes legacy capabilities; generic vendor paths remain manual.'],
            ['5', 'postupdate.py', pl ? 'Zapis inwentarza i historii na podstawie obserwacji.' : 'Records inventory and history from observations.'],
            ['6', 'update_system.sh', pl ? 'Aktualizacja macOS na końcu; restart wymaga decyzji użytkownika.' : 'macOS system update last; restart requires the user’s decision.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="native-bash" title={pl ? 'Ograniczenia runtime' : 'Runtime Constraints'}>
        <p>{pl
          ? `Projekt musi działać na Bashu 3.2 dostarczanym przez macOS. Nie używa declare -A, mapfile ani readarray. Ścieżki opierają się na SCRIPT_DIR zamiast hardcodowanych katalogów. Zebrano ${TEST_COUNT} przypadków unittest; kontrole statyczne są osobne.`
          : `The project must run on macOS-provided Bash 3.2. It avoids declare -A, mapfile, and readarray. Paths are based on SCRIPT_DIR instead of hardcoded directories. The suite collected ${TEST_COUNT} unittest cases; static checks are separate.`
        }</p>
      </WikiSection>
    </>
  )
}
