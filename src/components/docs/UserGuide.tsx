import { WikiSection, CodeBlock, DocTable } from './WikiSection'
import { CONSENT_PAGE_SIZE, CONSENT_TIMEOUT_SECONDS, PREVIEW_TARGET_LIMIT } from '../../lib/site'

export function UserGuide({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="terminal-workspace" title={pl ? 'Środowisko terminalowe' : 'Terminal workspace'}>
        <p>{pl ? 'Uruchomienie bash update_all.sh bez opcji w interaktywnym terminalu otwiera środowisko, a przy pierwszym uruchomieniu kreator. Lewy panel służy do nawigacji, środek pokazuje działania i bieżące wyjście, a prawy panel szczegóły. Wybierz grupy przed uruchomieniem. Jednocześnie działa jedno zadanie.' : 'In an interactive terminal, bash update_all.sh opens the workspace, with a wizard on first launch. The left panel provides navigation, the center shows actions and live output, and the right panel shows details. Choose groups before starting. One job runs at a time.'}</p>
        <figure className="space-y-2">
          <img
            src="/terminal-workspace-demo.svg"
            width={1440}
            height={800}
            loading="lazy"
            alt={pl ? 'Ilustracyjny, przykładowy widok środowiska terminalowego z fikcyjnymi nazwami. Nie przedstawia rzeczywistych aplikacji ani wykonanych aktualizacji.' : 'Illustrative terminal workspace mockup with synthetic names. It does not show real applications or completed updates.'}
            className="w-full rounded-sm border border-(--rule-strong)"
          />
          <figcaption className="text-sm leading-relaxed text-(--fg-muted)">
            {pl ? 'Ilustracja interfejsu z fikcyjnymi nazwami; nie pokazuje rzeczywistych aktualizacji.' : 'Illustration of the interface using synthetic names; it does not show real updates.'}
          </figcaption>
        </figure>
        <p>{pl ? 'Ustawienia i ukończenie kreatora są zapisywane. Pomoc otwiera ?, a Ctrl+P paletę działań. Klawisz c kopiuje aktywne polecenie, wyjście lub podsumowanie; Ctrl+V wkleja tylko do pola odpowiedzi. Wprowadzane sekrety są maskowane, gdy program wyłączy echo.' : 'Settings and wizard completion are saved. Press ? for help or Ctrl+P for the action palette. Press c to copy the focused command, output or summary; Ctrl+V pastes only into an input field. Secret input is masked when the running program disables echo.'}</p>
        <p>{pl ? 'Opcjonalne automatyczne dopasowanie może poprosić terminal o rozmiar 140×38; terminal może zignorować tę prośbę. Przy wyjściu aplikacja prosi o przywrócenie poprzedniego rozmiaru. Do operacji zmieniających stan wymagane jest co najmniej 80×24.' : 'Optional automatic resizing can request a 140×38 terminal; the terminal may ignore the request. The previous size is requested on exit. State-changing operations require at least 80×24.'}</p>
        <p>{pl ? 'Użyj --cli dla dotychczasowego interfejsu. Opcje takie jak --dry-run pozostają w CLI. setup.sh otwiera kreator, a build_inventory.sh widok inwentarza przy interaktywnym uruchomieniu bez opcji.' : 'Use --cli for the legacy interface. Flags such as --dry-run stay in the CLI. Bare interactive setup.sh opens the wizard and build_inventory.sh opens inventory.'}</p>
      </WikiSection>

      <WikiSection id="daily-usage" title={pl ? 'Codzienne użycie' : 'Daily Usage'}>
        <p>{pl
          ? 'Najczęstszy workflow to prescan, raport pokrycia, dry-run, plan i decyzja o dopuszczonych działaniach.'
          : 'The common workflow is prescan, coverage report, dry-run, plan and a decision on eligible actions.'
        }</p>
        <p>{pl ? 'Najpierw podejrzyj plan. Ta komenda nie wprowadza zmian.' : 'Preview the plan first. This command makes no changes.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y`}</CodeBlock>
        <p>{pl ? `Zwykły dry-run pokazuje do ${PREVIEW_TARGET_LIMIT} nazw ze źródłem i statusem oraz cztery liczby: już dozwolone, wymagające decyzji, zablokowane oraz ręczne lub pominięte. --plan oraz --dry-run --json-summary zachowują pełny JSON, bez zmian plików i bez nowych zgód.` : `Plain dry-run shows up to ${PREVIEW_TARGET_LIMIT} names with source and status, plus four totals: already allowed, needing a decision, blocked, and manual or skipped. --plan and --dry-run --json-summary retain full JSON, without file changes or new consent.`}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --plan`}</CodeBlock>
        <p>{pl ? 'Po przejrzeniu planu osobno zdecyduj o dopuszczonych działaniach.' : 'After reviewing the plan, decide separately on eligible actions.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh`}</CodeBlock>
        <p>{pl
          ? `Menu zwykłego przebiegu pokazuje tylko działania możliwe do zatwierdzenia, po ${CONSENT_PAGE_SIZE} na stronę. Wpisz 1,3, aby zatwierdzić wyłącznie pokazane zakresy tych pozycji; n i p zmieniają stronę. Początkowe potwierdzenie rozpoczyna kontrole i przegląd uprawnień; zgodę na zakres nadaje dopiero wybór w menu. Cały przegląd ma wyjaśniony limit ${CONSENT_TIMEOUT_SECONDS} sekund. Brak odpowiedzi, Enter lub q oznacza dalszy przebieg bez nowej zgody; zapisane zgody nadal obowiązują. Komunikaty są dostępne we wszystkich siedmiu językach toolkita.`
          : `The normal-run menu shows only actions eligible for approval, ${CONSENT_PAGE_SIZE} per page. Enter 1,3 to approve only those entries' displayed scopes; n and p change pages. The initial confirmation starts checks and permission review; choosing entries in the menu grants scope approval. The whole review has an explained ${CONSENT_TIMEOUT_SECONDS}-second limit. No answer, Enter or q continues without new consent; saved permissions remain in effect. Messages are available in all seven toolkit languages.`
        }</p>
        <p>{pl
          ? 'Log rzeczywistego przebiegu rozpoczyna się przed przeglądem zgód, więc oczekiwanie jest widoczne w diagnostyce. Pełny, zweryfikowany skan Cellar zachowuje świeże dowody formuł Homebrew mimo błędnych metadanych casków. Niepełny Cellar nadal blokuje działania; aktualizacje formuł wymagają zgody i świeżych kontroli. Metadane hosta nie są automatycznie naprawiane.'
          : 'The real-run log starts before consent review, so the wait is visible in diagnostics. A complete, validated Cellar scan keeps Homebrew formula evidence fresh despite invalid cask metadata. An incomplete Cellar still blocks actions; formula updates require consent and fresh checks. Host metadata is not repaired automatically.'
        }</p>
        <p>{pl
          ? 'Aby przejrzeć lub zmienić zasady dla aplikacji, otwórz ustawienia aktualizacji. Konflikt App Store i Homebrew wymaga decyzji o źródle; nie powoduje automatycznej migracji.'
          : 'Open update preferences to review or change application policies. An App Store and Homebrew conflict needs a source decision; it does not cause automatic migration.'
        }</p>
        <CodeBlock title="bash">{`bash update_all.sh --preferences`}</CodeBlock>
        <p>{pl
          ? 'Opcjonalny katalog rozpoczyna się bez zaznaczonych aplikacji. Pokazuje wymagania i osobny plan instalacji. Obecnie wszystkie publiczne pozycje wymagają ręcznego pozyskania lub dalszej weryfikacji receptury; wybranie pozycji nie instaluje jej automatycznie.'
          : 'The optional catalog starts with no applications selected. It shows requirements and a separate installation plan. All public entries currently require manual acquisition or further recipe review; selecting an entry does not install it automatically.'
        }</p>
        <CodeBlock title="bash">{`bash setup.sh --catalog`}</CodeBlock>
        <p>{pl
          ? 'Przeniesienie starego raportu Markdown do nowego inwentarza ma osobny podgląd i wymaga akceptacji wyświetlonej propozycji. Nieznane aplikacje pozostają w inwentarzu bez wymuszania źródła.'
          : 'Migrating an older Markdown report to the new inventory has a separate preview and requires acceptance of the displayed proposal. Unknown applications remain in the inventory without a forced source choice.'
        }</p>
        <CodeBlock title="bash">{`bash build_inventory.sh --migration --preview`}</CodeBlock>
      </WikiSection>

      <WikiSection id="risk-taxonomy" title={pl ? 'Zasady aktualizacji' : 'Update Rules'}>
        <DocTable
          headers={[pl ? 'Zasada' : 'Rule', pl ? 'Znaczenie' : 'Meaning']}
          rows={[
            [pl ? 'Tylko zainstalowane' : 'Installed only', pl ? 'Brakujące obsługiwane aplikacje są raportowane, nie instalowane.' : 'Supported missing apps are reported, not installed.'],
            ['softwareupdate -R', pl ? 'Aktualizacje macOS wymagają -R; odrzucenie restartu instaluje pakiety bez restartu, pomija pakiety z restartem i kończy kodem 10 (skipped by user).' : 'macOS updates require -R; declining a restart installs no-restart labels, skips restart labels, and exits 10 (skipped by user).'],
            [pl ? 'Plan i zgoda' : 'Plan and consent', pl ? 'Dopuszczone aktualizacje menedżera wymagają jawnej zgody. Track 2 GUI nie jest aktywny.' : 'Eligible manager updates require explicit consent. Track 2 GUI is inactive.'],
            [pl ? 'Ścieżki ręczne' : 'Manual paths', pl ? 'Natywne CLI, Node, Bun i ogólne ścieżki producentów pozostają ręczne.' : 'Native CLIs, Node, Bun and generic vendor paths remain manual.'],
            [pl ? 'Prywatny overlay' : 'Private overlay', pl ? 'APPLICATIONS.md, UPDATES.md i sekrety pozostają poza publicznym Git.' : 'APPLICATIONS.md, UPDATES.md, and secrets stay outside public Git.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="private-overlay" title={pl ? 'Prywatny overlay dev_sync' : 'Private dev_sync Overlay'}>
        <p>{pl
          ? 'dev_sync rozdziela publiczny kod od plików konkretnej maszyny: inwentarza, historii, preferencji, .env i konfiguracji chmury. Import rozwija manifesty katalogów, pomija pliki śledzone przez Git i wykluczone, odmawia ucieczek symlinkami i zostawia ścieżkę odzyskania, gdy zamiana się nie uda.'
          : 'dev_sync separates public code from machine-specific files: inventory, history, preferences, .env, and cloud configuration. Import expands directory manifests, skips Git-tracked and excluded files, refuses symlink escapes, and leaves a recovery path if a swap fails.'
        }</p>
        <p>{pl ? 'Skonfiguruj dostawcę synchronizacji tylko wtedy, gdy chcesz użyć prywatnego overlay.' : 'Set up a sync provider only if you want to use the private overlay.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash dev_sync/provider_setup.sh`}</CodeBlock>
        <p>{pl ? 'Eksportuje prywatne pliki do skonfigurowanego dostawcy.' : 'Export private files to the configured provider.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash dev_sync/dev-sync-export.sh`}</CodeBlock>
        <p>{pl ? 'Importuje prywatne pliki z dostawcy.' : 'Import private files from the provider.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash dev_sync/dev-sync-import.sh`}</CodeBlock>
        <p>{pl ? 'Weryfikuje pełną synchronizację bez zmiany źródła.' : 'Verify the full sync without changing the source.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash dev_sync/dev-sync-verify-full.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="scheduling" title={pl ? 'Tryby, flagi i automatyzacja' : 'Modes, Flags & Automation'}>
        <p>{pl
          ? 'Etapy kodu T1 do T5b dodają trwałe harmonogramowanie dwóch równoległych działań, potwierdzenia poszczególnych działań, anulowanie i bariery odzyskiwania. Aktualizacja macOS ma wyłączny nadzór. Równoległość produkcyjna pozostaje wyłączona do akceptacji zakresu efektów produktu. Są to funkcje sprawdzone na izolowanych danych testowych; nie oznaczają nowej akceptacji na żywo ani aktywacji receptur.'
          : 'Source checkpoints T1 through T5b add durable scheduling for two concurrent actions, per-action receipts, cancellation and recovery barriers. macOS updates have exclusive supervision. Production parallelism remains disabled until product effect contracts pass live acceptance. These features were checked with isolated fixtures; they imply no new live acceptance or recipe activation.'
        }</p>
        <p>{pl
          ? 'Przed aktualizacją użyj --doctor, aby odczytać gotowość systemu bez zmian. Rzeczywisty przebieg dodaje kontrole miejsca, zasilania i sieci. Pytania w trakcie przebiegu mają limit czasu, a brak odpowiedzi jest bezpiecznym „nie”.'
          : 'Use --doctor before updating for a read-only readiness report. Real runs add disk, power, and network checks. Mid-run prompts have a timeout, and no answer defaults safely to no.'
        }</p>
        <p>{pl ? '--doctor wykonuje tylko kontrolę gotowości i nie uruchamia aktualizacji.' : '--doctor checks readiness only and does not run updates.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --doctor`}</CodeBlock>
        <p>{pl ? '--verify-only sprawdza wersje bez mutacji.' : '--verify-only checks versions without mutations.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --verify-only`}</CodeBlock>
        <p>{pl ? 'Opcjonalna konfiguracja Touch ID dla sudo.' : 'Optional Touch ID setup for sudo.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash scripts/setup_touchid_sudo.sh`}</CodeBlock>
        <p>{pl ? 'Przykład: cotygodniowy przebieg w sobotę o 10:30.' : 'Example: a weekly run on Saturday at 10:30.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash scripts/install_launchagent.sh --day 6 --hour 10 --minute 30`}</CodeBlock>
        <p>{pl ? 'Przykład: jednorazowy test za 5 minut.' : 'Example: a one-time test in 5 minutes.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash scripts/install_launchagent.sh --once-in 5`}</CodeBlock>
        <p>{pl ? 'Sprawdź zainstalowany harmonogram.' : 'Check the installed schedule.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash scripts/install_launchagent.sh --check`}</CodeBlock>
        <p>{pl
          ? 'Harmonogram LaunchAgent korzysta z jawnej ścieżki PATH i sprawdza, czy usługa jest załadowana. --once-in N uruchamia jednorazowy test za 1 do 1440 minut. Caski Homebrew, których aplikacja działa lub których stanu nie można potwierdzić, są odraczane. Żadna otwarta aplikacja nie jest zamykana ani podmieniana.'
          : 'The LaunchAgent uses an explicit PATH and verifies that the service is loaded. --once-in N schedules a one-time test 1 to 1440 minutes from now. Homebrew casks are deferred when their app is running or its state cannot be confirmed. Open apps are not closed or replaced.'
        }</p>
        <p>{pl
          ? 'Stan kanałów producentów jest zapamiętywany. Feed niedostępny, potwierdzenie z pamięci podręcznej i cofnięcie wersji feedu mają osobne statusy; nie są traktowane jak potwierdzona aktualizacja.'
          : 'Vendor feed state is remembered. An unreachable feed, cached current proof, and a feed version regression have distinct statuses; none is treated as a confirmed update.'
        }</p>
      </WikiSection>
    </>
  )
}
