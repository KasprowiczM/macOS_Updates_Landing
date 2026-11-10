import { WikiSection, CodeBlock, DocTable } from './WikiSection'

export function UserGuide({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="daily-usage" title={pl ? 'Codzienne użycie' : 'Daily Usage'}>
        <p>{pl
          ? 'Najczęstszy workflow to prescan, raport pokrycia, dry-run i dopiero pełna aktualizacja.'
          : 'The common workflow is prescan, coverage report, dry-run, then the full update.'
        }</p>
        <p>{pl ? 'Najpierw podejrzyj plan. Ta komenda nie wprowadza zmian.' : 'Preview the plan first. This command makes no changes.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y`}</CodeBlock>
        <p>{pl ? 'Po przejrzeniu planu uruchom pełną aktualizację osobno.' : 'After reviewing the plan, run the full update separately.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="risk-taxonomy" title={pl ? 'Zasady aktualizacji' : 'Update Rules'}>
        <DocTable
          headers={[pl ? 'Zasada' : 'Rule', pl ? 'Znaczenie' : 'Meaning']}
          rows={[
            [pl ? 'Tylko zainstalowane' : 'Installed only', pl ? 'Brakujące obsługiwane aplikacje są raportowane, nie instalowane.' : 'Supported missing apps are reported, not installed.'],
            ['softwareupdate -R', pl ? 'Aktualizacje macOS wymagają -R; odrzucenie restartu instaluje pakiety bez restartu, pomija pakiety z restartem i kończy kodem 10 (skipped by user).' : 'macOS updates require -R; declining a restart installs no-restart labels, skips restart labels, and exits 10 (skipped by user).'],
            ['App Store Track 1 & 2', pl ? 'Track 1 działa przez sudo ze zmierzonymi ID; Track 2 odpytuje GUI do 30 s z fallbackiem na product page i kodem 10 dla nieoferowanych aplikacji.' : 'Track 1 runs through sudo with measured IDs; Track 2 polls the GUI up to 30 s with product-page fallback and exit 10 for unoffered apps.'],
            [pl ? 'Stabilny Node.js' : 'Stable Node.js', pl ? 'Managed Node.js wybiera najnowsze wydanie stabilne vX.Y.Z z nodejs.org/dist/index.json, eliminując wersje alpha.' : 'Managed Node.js selects the newest stable vX.Y.Z release from nodejs.org/dist/index.json, eliminating alpha builds.'],
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
