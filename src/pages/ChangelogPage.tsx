import { useTranslation } from 'react-i18next'
import { DocLayout } from '../components/layout/DocLayout'
import { Seo } from '../components/Seo'

interface Release {
  version: string
  date: string
  rc?: boolean
  summary: { en: string; pl: string }
  added?: { en: string; pl: string }[]
  changed?: { en: string; pl: string }[]
  fixed?: { en: string; pl: string }[]
}

const RELEASES: Release[] = [
  {
    version: 'v1.4.5',
    date: '2026-09-07',
    summary: {
      en: 'Overlay import integrity, vendor CLI contracts that require a working binary, and honest run reporting.',
      pl: 'Integralność importu overlay, kontrakty CLI vendorów wymagające działającego binarium oraz uczciwe raportowanie przebiegu.',
    },
    added: [
      {
        en: 'Process-group timeouts with SIGKILL for vendor TUIs that ignore SIGTERM, plus a per-repo run lock so parallel runs cannot collide.',
        pl: 'Timeouty grupy procesów z SIGKILL dla TUI vendorów ignorujących SIGTERM oraz blokada przebiegu w repozytorium, żeby równoległe runy się nie zderzały.',
      },
      {
        en: 'Run JSON format 2 (mode 0600) with run_id/run_status, and postupdate UI that splits inventory field edits from observed package/CLI changes in all seven languages.',
        pl: 'JSON przebiegu w formacie 2 (tryb 0600) z run_id/run_status oraz UI postupdate, które rozdziela edycje pól inwentarza od zaobserwowanych zmian pakietów/CLI w siedmiu językach.',
      },
    ],
    changed: [
      {
        en: 'rclone export writes an explicit overlay manifest; import uses that plan instead of a full remote listing. Ubuntu Python gate on push/PR; the full macOS suite remains manual/tag.',
        pl: 'Eksport rclone zapisuje jawny manifest overlay; import korzysta z tego planu zamiast pełnego listingu zdalnego. Brama Pythona na Ubuntu przy push/PR; pełny zestaw macOS zostaje ręczny/tagowy.',
      },
    ],
    fixed: [
      {
        en: 'Overlay import expands directory manifests, skips Git-tracked and excluded files, refuses symlink escapes, and leaves a recovery path if a failed swap cannot restore.',
        pl: 'Import overlay rozwija manifesty katalogów, pomija pliki śledzone przez Git i wykluczone, odmawia ucieczek symlinkami i zostawia ścieżkę odzyskania, gdy nieudana zamiana nie może przywrócić backupu.',
      },
      {
        en: 'Codex/agy bootstrap downloads then execs (never curl|sh success); OpenCode repair is scoped to an existing managed stub with --allow-scripts=opencode-ai and never writes ~/.npmrc.',
        pl: 'Bootstrap Codex/agy pobiera, potem uruchamia (nigdy sukces curl|sh); naprawa OpenCode dotyczy wyłącznie istniejącego stuba w zarządzanym prefiksie z --allow-scripts=opencode-ai i nigdy nie zapisuje ~/.npmrc.',
      },
      {
        en: 'Unknown pending counts stay unknown instead of becoming zero; a vendor CLI is only reported updated when a working --version exists.',
        pl: 'Nieznane pending nie zamienia się w zero; CLI vendora jest raportowane jako zaktualizowane tylko gdy istnieje działające --version.',
      },
    ],
  },
  {
    version: 'v1.4.4',
    date: '2026-09-03',
    summary: {
      en: 'Hang-proof Claude Code updates, native OpenCode self-updater, and after-run observability.',
      pl: 'Aktualizacje Claude Code bez zawieszania pipeline, natywny self-updater OpenCode i obserwowalność po przebiegu.',
    },
    added: [
      {
        en: 'Chronic step-warning detector over dated run summaries, pending-after-run counts, and a three-way App Store diagnostic that always records before / GUI / after.',
        pl: 'Detektor chronicznych ostrzeżeń kroków na datowanych podsumowaniach, liczniki pending po przebiegu oraz trójstronna diagnostyka App Store (przed / GUI / po).',
      },
    ],
    changed: [
      {
        en: 'OpenCode updates through opencode upgrade --method npm. Existing Claude binaries call claude update instead of re-running install.sh.',
        pl: 'OpenCode aktualizuje się przez opencode upgrade --method npm. Istniejące binaria Claude wywołują claude update zamiast ponownie uruchamiać install.sh.',
      },
    ],
    fixed: [
      {
        en: 'Anthropic install.sh post-install TUI no longer hangs the whole pipeline: GNU timeout follows SIGTERM with SIGKILL after five seconds.',
        pl: 'TUI post-install Anthropic install.sh nie wiesza już całego pipeline: GNU timeout po SIGTERM wysyła SIGKILL po pięciu sekundach.',
      },
      {
        en: 'Firefox Developer Edition reports both bundle version and channel in current/updated messages.',
        pl: 'Firefox Developer Edition raportuje zarówno wersję bundla, jak i kanał w komunikatach current/updated.',
      },
    ],
  },
  {
    version: 'v1.4.3',
    date: '2026-09-02',
    summary: {
      en: 'Office quarantine deadlock broken, App Store upgrades by measured IDs, and run summaries that actually carry counts.',
      pl: 'Przerwany impas kwarantanny Office, aktualizacje App Store po zmierzonych ID oraz podsumowania przebiegu z rzeczywistymi licznikami.',
    },
    added: [
      {
        en: 'MAU quarantine expiry under MAC_UPDATE_MAU_QUARANTINE_MAX_DAYS (default 14). Past the window the guard releases itself so the next run can see the feed again.',
        pl: 'Wygaśnięcie kwarantanny MAU pod MAC_UPDATE_MAU_QUARANTINE_MAX_DAYS (domyślnie 14). Po oknie strażnik sam się zwalnia, żeby kolejny przebieg znów widział feed.',
      },
    ],
    changed: [
      {
        en: 'sudo mas upgrade receives the explicit IDs the pre-scan measured, with one per-ID retry in the invoking user session when root still leaves an app outdated.',
        pl: 'sudo mas upgrade dostaje jawne ID zmierzone w pre-skanie, z jednym retry per-ID w sesji użytkownika, gdy root nadal zostawia aplikację nieaktualną.',
      },
    ],
    fixed: [
      {
        en: 'Armed DeferralDays entries no longer hide Office upgrades forever: the quarantine had suppressed the evidence needed to release it, so a real 16.112.3 offer stayed invisible for seven weeks.',
        pl: 'Uzbrojone wpisy DeferralDays nie ukrywają już aktualizacji Office w nieskończoność: kwarantanna tłumiła dowód potrzebny do jej zdjęcia, więc prawdziwa oferta 16.112.3 była niewidoczna przez siedem tygodni.',
      },
      {
        en: 'DeferralVersions pins at the installed build (MAU bookkeeping, e.g. TEAMS21) are left alone; only a pin strictly older than installed is released.',
        pl: 'Piny DeferralVersions na zainstalowanej wersji (księgowość MAU, np. TEAMS21) zostają w spokoju; zwalniany jest tylko pin ściśle starszy niż zainstalowana wersja.',
      },
      {
        en: 'Every run_summary now reads the counts step 5 already computed instead of shipping an empty counts block.',
        pl: 'Każde run_summary czyta liczniki, które krok 5 już wyliczył, zamiast wysyłać pusty blok counts.',
      },
    ],
  },
  {
    version: 'v1.4.2',
    date: '2026-08-26',
    summary: {
      en: 'Unblocked Codex, Ledger Live, Brave, and MAU deferral verification — four run-log warnings that were permanent update blocks.',
      pl: 'Odblokowane Codex, Ledger Live, Brave i weryfikacja odroczeń MAU — cztery ostrzeżenia z logu, które były trwałymi blokadami aktualizacji.',
    },
    added: [
      {
        en: 'Scheme-aware app_vs_package_version_relation() so cask downgrade guards compare Homebrew records against bundle versions without inventing a downgrade.',
        pl: 'Świadome schematu app_vs_package_version_relation(), żeby strażnik downgrade casków porównywał ewidencję Homebrew z wersją bundla bez wymyślania downgrade’u.',
      },
    ],
    changed: [
      {
        en: 'Standalone CLIs (Claude Code, Codex, OpenCode, agy, cursor-agent) update through native vendor installers, not npm -g @latest. Codex runs with CODEX_NON_INTERACTIVE=1 and a 360s timeout.',
        pl: 'Samodzielne CLI (Claude Code, Codex, OpenCode, agy, cursor-agent) aktualizują się natywnymi instalatorami vendorów, nie npm -g @latest. Codex działa z CODEX_NON_INTERACTIVE=1 i timeoutem 360 s.',
      },
    ],
    fixed: [
      {
        en: 'Ledger Live checksum reads the DMG url and digest from the same latest-mac.yml entry instead of comparing a ZIP digest to a DMG download.',
        pl: 'Suma kontrolna Ledger Live czyta URL i digest DMG z tego samego wpisu latest-mac.yml zamiast porównywać digest ZIP-a z pobranym DMG.',
      },
      {
        en: 'Brave was skipped forever because the guard compared Chromium-prefixed bundle 151.x with Homebrew 1.x. Removals of MAU deferrals are now measured against the live domain, not plutil exit codes on an export.',
        pl: 'Brave był pomijany na stałe, bo strażnik porównywał bundel z prefiksem Chromium 151.x z Homebrew 1.x. Usunięcia odroczeń MAU są mierzone względem żywej domeny, nie kodu wyjścia plutil na eksporcie.',
      },
      {
        en: 'Prescan no longer treats the toolkit’s own 🆕 inventory marker as a newly discovered application.',
        pl: 'Prescan nie traktuje już własnego znacznika 🆕 w inwentarzu jako nowo odkrytej aplikacji.',
      },
    ],
  },
  {
    version: 'v1.4.1',
    date: '2026-08-19',
    summary: {
      en: 'Resilient Homebrew query layer, toolchain isolation fix, and CaskLoader regression fallback.',
      pl: 'Odporna warstwa zapytań Homebrew, izolacja toolchaina PATH i fallback na regresje CaskLoader.',
    },
    added: [
      {
        en: 'lib/brew.sh module with brew_cask_versions fallback to Caskroom layout when upstream CaskLoader fails.',
        pl: 'Moduł lib/brew.sh z fallbackiem brew_cask_versions do układu Caskroom w razie awarii CaskLoader.',
      },
      {
        en: 'Toolchain isolation: managed prefix ~/.local/share/mac-update/ wins PATH by default over ambient nvm shims.',
        pl: 'Izolacja toolchaina: zarządzany prefiks ~/.local/share/mac-update/ domyślnie wygrywa w PATH nad shimami nvm.',
      },
    ],
    changed: [
      {
        en: 'Filtered stderr progress chatter from brew outdated so macOS security updates are not falsely deferred.',
        pl: 'Filtrowanie szumu z stderr w brew outdated, eliminujące fałszywe odraczanie aktualizacji macOS.',
      },
    ],
    fixed: [
      {
        en: 'Fixed Homebrew 4.4+ CaskLoader API incompatibility when parsing cask versions.',
        pl: 'Naprawiono niekompatybilność API CaskLoader w Homebrew 4.4+ przy parsowaniu wersji casków.',
      },
    ],
  },
  {
    version: 'v1.4.0',
    date: '2026-08-14',
    summary: {
      en: 'Non-mutating --verify-only mode, structured JSON run summaries, LaunchAgent scheduler, and Touch ID sudo onboarding.',
      pl: 'Tryb bezmutacyjnej weryfikacji --verify-only, strukturalne podsumowanie JSON, harmonogram LaunchAgent i onboarding Touch ID.',
    },
    added: [
      {
        en: '--verify-only flag to check version delta against logs/version_history.tsv without making any system changes.',
        pl: 'Flaga --verify-only sprawdzająca delty wersji względem logs/version_history.tsv bez wprowadzania zmian w systemie.',
      },
      {
        en: 'Structured JSON execution summary (logs/run_summary_latest.json) for monitoring and automated reporting.',
        pl: 'Strukturalny plik JSON z podsumowaniem (logs/run_summary_latest.json) do monitoringu i raportowania.',
      },
      {
        en: 'LaunchAgent automated scheduling installer (scripts/install_launchagent.sh) with desktop notifications.',
        pl: 'Instalator harmonogramu LaunchAgent (scripts/install_launchagent.sh) z powiadomieniami na pulpicie.',
      },
      {
        en: 'Touch ID sudo setup script (scripts/setup_touchid_sudo.sh) for biometric privilege escalation.',
        pl: 'Skrypt konfiguracji Touch ID dla sudo (scripts/setup_touchid_sudo.sh) dla biometrycznej autoryzacji.',
      },
    ],
    changed: [
      {
        en: 'Native CLI self-updates (claude, codex, agy) now execute with npm_config_prefix pinned to toolchain.',
        pl: 'Natywne self-update CLI (claude, codex, agy) wykonują się z npm_config_prefix przypiętym do toolchaina.',
      },
    ],
  },
  {
    version: 'v1.3.1',
    date: '2026-08-05',
    summary: {
      en: 'Inventory cleanup, ChatGPT Atlas browser deprecation removal, and Ascendo moved to exclusions.',
      pl: 'Czyszczenie inwentarza, usunięcie wycofanej przeglądarki ChatGPT Atlas i przeniesienie Ascendo do wykluczeń.',
    },
    changed: [
      {
        en: 'Updated canonical internet apps list to 43 applications.',
        pl: 'Zaktualizowano kanoniczną listę aplikacji internetowych do 43 pozycji.',
      },
      {
        en: 'Added config/inventory_exclusions.txt for explicit app ignore rules (Ascendo).',
        pl: 'Dodano config/inventory_exclusions.txt dla jawnych reguł ignorowania aplikacji (Ascendo).',
      },
    ],
  },
  {
    version: 'v1.3.0',
    date: '2026-08-05',
    summary: {
      en: 'Sparkle appcast feed update method, Cask downgrade prevention, and dry-run safety enhancements.',
      pl: 'Metoda aktualizacji przez feed Sparkle appcast, blokada downgrade casków i ulepszenia dry-run.',
    },
    added: [
      {
        en: 'Support for sparkle_appcast update method directly parsing XML appcasts.',
        pl: 'Obsługa metody sparkle_appcast bezpośrednio parsującej kanały XML appcast.',
      },
      {
        en: 'Cask downgrade prevention guard comparing bundle semantic versions before upgrade.',
        pl: 'Zabezpieczenie przed downgrade casków porównujące wersje semantyczne pakietu przed instalacją.',
      },
    ],
  },
  {
    version: 'v1.2.0',
    date: '2026-08-05',
    summary: {
      en: 'GitHub DMG direct updater, Keystone engine updates, and 10 distinct update methods.',
      pl: 'Bezpośredni instalator GitHub DMG, aktualizacje silnika Keystone i 10 odrębnych metod aktualizacji.',
    },
    added: [
      {
        en: 'github_dmg automated release download and mount/install method.',
        pl: 'Metoda github_dmg do automatycznego pobierania, montowania i instalacji wydań z GitHuba.',
      },
    ],
  },
  {
    version: 'v1.1.1',
    date: '2026-08-05',
    summary: {
      en: 'Extended test suite to 170 unit and safety tests, and automated Gitleaks verification.',
      pl: 'Rozszerzenie zestawu testów do 170 testów jednostkowych i bezpieczeństwa oraz weryfikacja Gitleaks.',
    },
    added: [
      {
        en: 'Comprehensive test suite with 170 safety and unit tests covering all update handlers and shell constraints.',
        pl: 'Kompleksowy zestaw 170 testów bezpieczeństwa i jednostkowych pokrywający wszystkie handlery i ograniczenia powłoki.',
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2026-08-05',
    summary: {
      en: 'Multi-language support (7 languages) and multi-cloud private overlay sync via dev_sync.',
      pl: 'Obsługa 7 języków oraz synchronizacja prywatnego overlayu z wieloma chmurami przez dev_sync.',
    },
    added: [
      {
        en: 'Complete localization for 7 languages (EN, PL, DE, FR, ES, IT, PT).',
        pl: 'Pełna lokalizacja dla 7 języków (EN, PL, DE, FR, ES, IT, PT).',
      },
      {
        en: 'dev_sync private overlay management supporting Proton Drive, iCloud, and local targets.',
        pl: 'Zarządzanie prywatnym overlayem dev_sync ze wsparciem dla Proton Drive, iCloud i celów lokalnych.',
      },
    ],
  },
  {
    version: 'v1.0.21',
    date: '2026-07-28',
    summary: {
      en: 'Microsoft AutoUpdate (MAU) deferral preflight & quarantine persistence, non-blocking step severity contract, and configurable settle delays.',
      pl: 'Preflight odroczeń Microsoft AutoUpdate (MAU) i trwała kwarantanna, nietamujący kontrakt błędów kroków i konfigurowalne opóźnienia osiadania.',
    },
    added: [
      {
        en: 'MAC_UPDATE_SETTLE_DELAY environment variable to tune internet app launch/close wait times.',
        pl: 'Zmienna środowiskowa MAC_UPDATE_SETTLE_DELAY pozwalająca dostosować czas oczekiwania na uruchomienie/zamknięcie aplikacji.',
      },
      {
        en: 'Non-blocking step severity contract: soft app-updater failures no longer suppress full macOS system updates.',
        pl: 'Nietamujący kontrakt ważności kroków: miękkie błędy updaterów aplikacji nie blokują końcowej aktualizacji systemu macOS.',
      },
    ],
    changed: [
      {
        en: 'Preflight MAU deferrals quarantine broken Microsoft Office packages and stop loop oscillations.',
        pl: 'Preflight odroczeń MAU poddaje kwarantannie uszkodzone pakiety Microsoft Office i eliminuje pętle prób.',
      },
    ],
    fixed: [
      {
        en: 'Prevent retrying Office/Teams updates that provably cannot install on the target macOS version.',
        pl: 'Zapobieganie ponownemu próbowaniu aktualizacji Office/Teams, które nie mogą zostać zainstalowane na danej wersji macOS.',
      },
    ],
  },
  {
    version: 'v1.0.20',
    date: '2026-07-13',
    summary: {
      en: 'Full macOS update pipeline hardening, MCP path discovery fixes, and atomic state write safety.',
      pl: 'Utwardzenie pełnego pipeline aktualizacji macOS, poprawki wykrywania ścieżek MCP i bezpieczne atomowe zapisy stanu.',
    },
    added: [
      {
        en: 'Staged app swaps with Gatekeeper signature validation and unique per-session DMG mountpoints.',
        pl: 'Etapowa zamiana aplikacji z weryfikacją podpisu Gatekeeper i unikalnymi punktami montowania DMG na sesję.',
      },
    ],
    changed: [
      {
        en: 'Hardened migration_setup.sh 16-step setup wizard and username migration logic.',
        pl: 'Utwardzony 16-fazowy kreator migration_setup.sh i logika migracji nazwy użytkownika.',
      },
    ],
    fixed: [
      {
        en: 'Ledger Live DMG/zip parsing bug fix, Docker status conflation fix, and non-atomic state write fixes.',
        pl: 'Poprawka błędu parsowania DMG/zip Ledger Live, usunięcie konfliktu statusu Docker i poprawki nieatomowych zapisów.',
      },
    ],
  },
  {
    version: 'v1.0.19',
    date: '2026-06-27',
    summary: {
      en: 'Expansion to 48 supported internet applications, iOS/iPadOS version detection on Apple Silicon, and uninstall safety.',
      pl: 'Rozszerzenie do 48 obsługiwanych aplikacji internetowych, wykrywanie wersji aplikacji iOS/iPadOS na Apple Silicon i bezpieczeństwo odinstalowania.',
    },
    added: [
      {
        en: 'Support for 48 internet applications across 9 update methods (keystone, github_dmg, silent_launch, msupdate, mau_fallback, docker_cli, brew_cask, appstore_gui, manual).',
        pl: 'Obsługa 48 aplikacji internetowych poprzez 9 metod aktualizacji (keystone, github_dmg, silent_launch, msupdate, mau_fallback, docker_cli, brew_cask, appstore_gui, manual).',
      },
      {
        en: 'iOS and iPadOS app version detection for App Store Track 2 updates on Apple Silicon Macs.',
        pl: 'Wykrywanie wersji aplikacji iOS i iPadOS dla aktualizacji App Store Tor 2 na Macach Apple Silicon.',
      },
    ],
    changed: [
      {
        en: 'Refactored atomic JSON state writes for APPLICATIONS.md and UPDATES.md.',
        pl: 'Zrefaktoryzowane atomowe zapisy stanu JSON dla APPLICATIONS.md i UPDATES.md.',
      },
    ],
    fixed: [
      {
        en: 'Uninstall path safety guards to prevent accidental deletion of parent system paths.',
        pl: 'Zabezpieczenia ścieżek uninstall.sh zapobiegające przypadkowemu usunięciu ścieżek systemowych.',
      },
    ],
  },
  {
    version: 'v1.0.18',
    date: '2026-06-10',
    summary: {
      en: 'Parser hardening, FABLE5 review fixes, and new static test coverage for library parsers.',
      pl: 'Utwardzenie parserów, poprawki z przeglądu FABLE5 oraz nowe testy statyczne dla parserów bibliotecznych.',
    },
    added: [
      {
        en: 'InternetLibParserTests for lib/ config parsers covering missing config guards, comment skipping, and special-case apps.',
        pl: 'InternetLibParserTests dla parserów konfiguracji lib/, pokrywające guardy brakującej konfiguracji, pomijanie komentarzy i przypadki specjalne aplikacji.',
      },
    ],
    changed: [
      {
        en: 'Registry loader validates field counts and skips malformed rows with a warning.',
        pl: 'Registry loader weryfikuje liczbę pól i pomija wadliwe wiersze z ostrzeżeniem.',
      },
    ],
    fixed: [
      {
        en: 'Defense-in-depth eval guard in internet_handler_set_status to prevent injection.',
        pl: 'Guard obrony w głąb (defense-in-depth) dla eval w internet_handler_set_status zapobiegający wstrzyknięciom.',
      },
    ],
  },
  {
    version: 'v1.0.17',
    date: '2026-06-09',
    summary: {
      en: 'Production-ready public release of macOS Updates: Apple Silicon updater with local inventory, seven-step orchestration, seven languages, and private overlay support.',
      pl: 'Produkcyjne publiczne wydanie macOS Updates: updater Apple Silicon z lokalnym inwentarzem, siedmiokrokową orkiestracją, siedmioma językami i prywatnym overlay.',
    },
    added: [
      {
        en: 'update_all.sh orchestrates prescan, App Store, CLI/npm, Homebrew, 48 internet apps, postupdate, and macOS system updates.',
        pl: 'update_all.sh orkiestruje prescan, App Store, CLI/npm, Homebrew, 48 aplikacji internetowych, postupdate i system macOS.',
      },
      {
        en: 'One-line installer builds APPLICATIONS.md from the current Mac instead of importing another user inventory.',
        pl: 'Instalator jedną linią buduje APPLICATIONS.md z bieżącego Maca zamiast importować cudzy inwentarz.',
      },
      {
        en: 'Seven terminal UI languages: English, Polish, German, French, Spanish, Italian, and Portuguese.',
        pl: 'Siedem języków UI terminala: angielski, polski, niemiecki, francuski, hiszpański, włoski i portugalski.',
      },
      {
        en: 'Private dev_sync overlay for APPLICATIONS.md, UPDATES.md, .env, preferences, and cloud sync configuration.',
        pl: 'Prywatny overlay dev_sync dla APPLICATIONS.md, UPDATES.md, .env, preferencji i konfiguracji chmury.',
      },
    ],
    changed: [
      {
        en: 'Documented softwareupdate -R and sudo mas upgrade as non-negotiable update safety rules.',
        pl: 'Udokumentowano softwareupdate -R oraz sudo mas upgrade jako nienegocjowalne reguły bezpieczeństwa aktualizacji.',
      },
    ],
    fixed: [
      {
        en: 'Static tests verify Bash 3.2 constraints, registry parity, and secret-deny rules.',
        pl: 'Testy statyczne weryfikują ograniczenia Bash 3.2, spójność registry i reguły blokowania sekretów.',
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-06-04',
    rc: true,
    summary: {
      en: 'Initial public update orchestrator baseline with installer, setup, inventory builder, update scripts, docs, and tests.',
      pl: 'Pierwsza publiczna baza orkiestratora aktualizacji z instalatorem, setupem, inwentarzem, skryptami, dokumentacją i testami.',
    },
    added: [
      {
        en: 'install.sh, setup.sh, migration_setup.sh, build_inventory.sh, and update_all.sh entrypoints.',
        pl: 'Entrypointy install.sh, setup.sh, migration_setup.sh, build_inventory.sh i update_all.sh.',
      },
    ],
  },
]

export function ChangelogPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'

  return (
    <>
      <Seo
        title={t('seo.changelogTitle')}
        description={t('seo.changelogDesc')}
        path="/changelog"
        lang={i18n.language}
      />
      <DocLayout title="Changelog">
        <p className="text-[15px]">
          {pl
            ? 'Znaczące zmiany w projekcie macOS Updates są udokumentowane poniżej, od najnowszych.'
            : 'Notable macOS Updates changes are documented below, newest first.'}
        </p>

        {RELEASES.map((r, idx) => (
          <section key={r.version} className={idx === 0 ? 'mt-8' : 'mt-8 pt-6 border-t border-(--border)'}>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-sm font-mono font-bold text-[13px] ${r.rc ? 'bg-(--bg-sunk) text-(--fg)' : 'bg-(--accent) text-(--accent-ink)'}`}>
                {r.version}
              </span>
              <span className="text-(--fg-muted) text-[14px] font-mono">{r.date}</span>
            </div>
            <p className="font-semibold text-(--fg) mb-3">{pl ? r.summary.pl : r.summary.en}</p>

            {r.added && (
              <>
                <h3 className="text-(--fg) font-semibold text-[16px] mb-2 mt-4">{pl ? 'Dodane' : 'Added'}</h3>
                <ul className="space-y-2 text-[14px] list-disc list-inside">
                  {r.added.map((item, i) => <li key={i}>{pl ? item.pl : item.en}</li>)}
                </ul>
              </>
            )}
            {r.changed && (
              <>
                <h3 className="text-(--fg) font-semibold text-[16px] mb-2 mt-4">{pl ? 'Zmienione' : 'Changed'}</h3>
                <ul className="space-y-2 text-[14px] list-disc list-inside">
                  {r.changed.map((item, i) => <li key={i}>{pl ? item.pl : item.en}</li>)}
                </ul>
              </>
            )}
            {r.fixed && (
              <>
                <h3 className="text-(--fg) font-semibold text-[16px] mb-2 mt-4">{pl ? 'Naprawione' : 'Fixed'}</h3>
                <ul className="space-y-2 text-[14px] list-disc list-inside">
                  {r.fixed.map((item, i) => <li key={i}>{pl ? item.pl : item.en}</li>)}
                </ul>
              </>
            )}
          </section>
        ))}
      </DocLayout>
    </>
  )
}

export default ChangelogPage
