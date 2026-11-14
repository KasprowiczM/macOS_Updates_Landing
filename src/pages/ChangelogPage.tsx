import { useTranslation } from 'react-i18next'
import { DocLayout } from '../components/layout/DocLayout'
import { Seo } from '../components/Seo'
import { buildPageJsonLd } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { ACTIVE_RECIPE_COUNT, APP_VERSION, APP_VERSION_DATE, LATEST_TAGGED_VERSION, PREVIEW_TARGET_LIMIT, PRODUCTION_NATIVE_DRIVER_COUNT, SYNC_DATE } from '../lib/site'

interface Release {
  version: string
  date: string
  sourceSnapshot?: boolean
  rc?: boolean
  summary: { en: string; pl: string }
  added?: { en: string; pl: string }[]
  changed?: { en: string; pl: string }[]
  fixed?: { en: string; pl: string }[]
}

const RELEASES: Release[] = [
  {
    version: APP_VERSION,
    date: APP_VERSION_DATE,
    sourceSnapshot: true,
    summary: {
      en: `Source snapshot synchronized on ${SYNC_DATE}. The latest tagged release remains ${LATEST_TAGGED_VERSION}; no ${APP_VERSION} tag or GitHub Release exists. Checkpoints T1 through T5b add evidence timing, exact recipe bindings, consent-bound execution infrastructure, native-session supervision and durable scheduling. Active vendor, native and first-install recipes: ${ACTIVE_RECIPE_COUNT}; production native drivers: ${PRODUCTION_NATIVE_DRIVER_COUNT}. Live acceptance remains deferred.`,
      pl: `Snapshot kodu zsynchronizowany ${SYNC_DATE}. Najnowszy tag wydania to ${LATEST_TAGGED_VERSION}; nie ma taga ani GitHub Release ${APP_VERSION}. Etapy T1 do T5b dodają pomiar czasu dowodów, dokładne wiązania receptur, infrastrukturę wykonania zależną od zgody, nadzór sesji natywnych i trwałe harmonogramowanie. Aktywne receptury producentów, natywne i pierwszej instalacji: ${ACTIVE_RECIPE_COUNT}; produkcyjne sterowniki natywne: ${PRODUCTION_NATIVE_DRIVER_COUNT}. Akceptacja na żywo pozostaje odroczona.`,
    },
    fixed: [
      {
        en: `Plain --dry-run now shows a readable preview of up to ${PREVIEW_TARGET_LIMIT} targets. --plan and --dry-run --json-summary retain the full JSON plan. Unicode output and closed output pipes are handled without a shutdown traceback; previews remain observational.`,
        pl: `Zwykły --dry-run pokazuje teraz czytelny podgląd do ${PREVIEW_TARGET_LIMIT} celów. --plan i --dry-run --json-summary zachowują pełny plan JSON. Obsługa Unicode i zamkniętego potoku wyjściowego zapobiega tracebackowi przy kończeniu; podgląd pozostaje obserwacyjny.`,
      },
    ],
  },
  {
    version: 'v1.6.0',
    date: '2026-11-10',
    sourceSnapshot: true,
    summary: {
      en: 'Earlier upstream source snapshot identified as v1.6.0. No v1.6.0 Git tag or GitHub Release is published; v1.5.5 remains the latest tag. This source adds safer scheduled runs, a read-only readiness doctor, pre-flight checks, safer cask handling, persistent vendor-feed state, and new app handlers.',
      pl: 'Wcześniejszy snapshot kodu upstream oznaczony jako v1.6.0. Nie opublikowano taga Git ani GitHub Release v1.6.0; najnowszym tagiem pozostaje v1.5.5. Ten kod dodaje bezpieczniejsze harmonogramy, raport gotowości tylko do odczytu, kontrole wstępne, bezpieczniejszą obsługę casków, pamięć statusów kanałów producentów i nowe handlery aplikacji.',
    },
    added: [
      {
        en: 'Scheduled runs now use an explicit PATH, verify that the LaunchAgent loaded, and support --minute N and one-time --once-in N (1 to 1440 minutes). Use --check to inspect the installed schedule.',
        pl: 'Zaplanowane przebiegi używają jawnego PATH, weryfikują załadowanie LaunchAgent i obsługują --minute N oraz jednorazowe --once-in N (od 1 do 1440 minut). --check pokazuje stan zainstalowanego harmonogramu.',
      },
      {
        en: 'bash update_all.sh --doctor prints a read-only readiness report for tools, permissions, LaunchAgent, disk, power, network, toolkit state, and the last real run. Real runs add disk, battery, and network pre-flight checks and keep the Mac awake.',
        pl: 'bash update_all.sh --doctor wyświetla raport gotowości bez zmian: narzędzia, uprawnienia, LaunchAgent, miejsce, zasilanie, sieć, stan toolkita i ostatni rzeczywisty przebieg. Rzeczywiste przebiegi dodają kontrole miejsca, baterii i sieci oraz utrzymują Maca aktywnego.',
      },
      {
        en: 'New internet app handlers: DeepSeek Harness and Grok Bot. DJI Assistant 2 was removed from the current registry. The registry now has 47 apps across 11 methods.',
        pl: 'Dodano handlery DeepSeek Harness i Grok Bot. DJI Assistant 2 usunięto z bieżącego rejestru. Rejestr obejmuje teraz 47 aplikacji w 11 metodach.',
      },
    ],
    changed: [
      {
        en: 'Mid-run prompts have a configurable timeout (MAC_UPDATE_PROMPT_TIMEOUT); a timeout safely answers no. Homebrew casks are deferred when their app is running or its state is unknown. Open apps are not closed or replaced.',
        pl: 'Pytania w trakcie przebiegu mają konfigurowalny limit czasu (MAC_UPDATE_PROMPT_TIMEOUT); po jego przekroczeniu bezpieczną odpowiedzią jest „nie”. Caski Homebrew są odraczane, gdy aplikacja działa albo jej stan jest nieznany. Otwarte aplikacje nie są zamykane ani podmieniane.',
      },
      {
        en: 'Vendor feed state is persisted. feed_unreachable, current_cached, and current_feed_regressed distinguish an unavailable feed, recent cached proof, and a feed regression. Cached proof is not counted as verified update evidence.',
        pl: 'Stan kanałów producentów jest zapisywany. feed_unreachable, current_cached i current_feed_regressed rozróżniają niedostępny feed, świeży dowód z pamięci podręcznej i cofnięcie wersji kanału. Dowód z pamięci podręcznej nie jest liczony jako potwierdzenie aktualizacji.',
      },
      {
        en: 'HyperFrames and Superset use verified direct-only installs and are never launched by the toolkit. Open Design is never launched or quit; when behind, the report asks the user to open it. Per-step durations, advisories, and ANSI-free logs improve run reporting.',
        pl: 'HyperFrames i Superset używają zweryfikowanej instalacji bezpośredniej i toolkit ich nie uruchamia. Open Design nie jest uruchamiany ani zamykany; przy nieaktualnej wersji raport prosi o otwarcie aplikacji. Czas kroków, advisories i logi bez ANSI poprawiają raportowanie przebiegu.',
      },
    ],
  },
  {
    version: 'v1.5.5',
    date: '2026-10-30',
    summary: {
      en: 'A Homebrew upgrade that removes python3 mid-run no longer breaks reporting, reporting failures no longer postpone macOS updates, toolkit-launched apps are asked to quit repeatedly but never force-killed, and comprehensive follow-ups harden Node.js stable pinning, declined restart safety, App Store Track 2 polling, Proton Drive rollout detection, and host-tool test guards.',
      pl: 'Aktualizacja Homebrew, która usuwa python3 w trakcie biegu, nie psuje już kroku raportowania, błędy raportowania nie odraczają aktualizacji macOS, aplikacje uruchomione przez toolkit są wielokrotnie proszone o zamknięcie, ale nigdy nie są zamykane siłą, a kompleksowe aktualizacje uzupełniające utwardzają przypinanie stabilnych wersji Node.js, bezpieczną obsługę odrzuconego restartu, odpytywanie w App Store Track 2, wykrywanie kanałów rolloutu Proton Drive i strażniki narzędzi w testach.',
    },
    fixed: [
      {
        en: 'Managed Node.js pins strictly to stable releases. lib/python/node_releases.py selects the newest stable vX.Y.Z from nodejs.org/dist/index.json, and n installs that exact version to prevent installing pre-release or alpha builds (such as v27.0.0-alpha).',
        pl: 'Zarządzany Node.js przypina wyłącznie wersje stabilne. lib/python/node_releases.py wybiera najnowsze stabilne wydanie vX.Y.Z z nodejs.org/dist/index.json, a n instaluje tę dokładną wersję, zapobiegając instalacji wydań testowych lub alpha (takich jak v27.0.0-alpha).',
      },
      {
        en: 'Declining an automatic restart no longer fails the run. Answering no to the restart prompt installs no-restart labels, skips restart-required labels without running them without -R, records system_skipped_by_user, and exits 10 with a localized message (L_SYSTEM_RESTART_DECLINED_FMT in seven languages).',
        pl: 'Odrzucenie automatycznego restartu nie powoduje już błędu całego przebiegu. Odpowiedź odmowna instaluje etykiety niewymagające restartu, pomija te wymagające restartu bez wywoływania ich bez flagi -R, zapisuje system_skipped_by_user i kończy bieg kodem 10 ze zlokalizowanym komunikatem (L_SYSTEM_RESTART_DECLINED_FMT w siedmiu językach).',
      },
      {
        en: 'OpenCode Desktop feed migrated to Electron. The updater switches from the deprecated Tauri feed to latest-mac.yml, prefers arm64 zip archives in multi-architecture feeds, and resolves relative download URLs cleanly.',
        pl: 'Kanał wydań OpenCode Desktop zmigrowany do formatu Electron. Updater przechodzi z wycofanego kanału Tauri na latest-mac.yml, preferuje archiwa arm64 zip w feedach wieloarchitekturowych i poprawnie rozwiązuje względne adresy URL.',
      },
      {
        en: 'Terminal status visibility in vendor truth checks. The current, stale-feed, unknown, and dry-run branches of internet_handler_vendor_truth now explicitly print their status instead of leaving empty application sections.',
        pl: 'Widoczność statusu w terminalu podczas weryfikacji dostawców. Gałęzie stanu aktualnego, nieświeżego kanału, nieznanego oraz dry-run w internet_handler_vendor_truth jawnie wypisują swój status zamiast pozostawiać puste sekcje aplikacji.',
      },
      {
        en: 'App Store Track 2 polling and fallback. The AppleScript polls the Updates page for up to 30 seconds across name, description, and title attributes, refreshes once (Cmd+R), falls back to opening individual product pages, and emits a non-blocking soft warning (L_APPSTORE_IOS_NOT_OFFERED_FMT, exit 10) when the store does not offer a pending iPad app.',
        pl: 'Odpytywanie i fallbacki w App Store Track 2. AppleScript odpytuje stronę uaktualnień do 30 sekund sprawdzając atrybuty name, description i title, odświeża stronę raz (Cmd+R), przechodzi awaryjnie do otwierania stron produktów i zgłasza nieblokujące miękkie ostrzeżenie (L_APPSTORE_IOS_NOT_OFFERED_FMT, kod 10), gdy sklep nie oferuje jeszcze oczekującej aplikacji dla iPada.',
      },
      {
        en: 'Proton Drive gradual-rollout channel proof. When the primary feed is older than the installed app, internet_handler_vendor_truth cross-checks the appcast in config/vendor_appcasts.txt to verify staged rollout builds as current without false stale-feed warnings. Rollout builds are never treated as install targets.',
        pl: 'Weryfikacja kanału stopniowego wdrażania Proton Drive. Gdy główny kanał jest starszy niż zainstalowana aplikacja, internet_handler_vendor_truth weryfikuje appcast z config/vendor_appcasts.txt, aby potwierdzić etapowy rollout jako stan aktualny bez fałszywych ostrzeżeń. Wersje z rolloutu nigdy nie stają się celem instalacji.',
      },
      {
        en: 'Honest final banner for feed-only warnings. When the only cause of a degraded run is a manufacturer feed warning and no updates are unverified or pending, update_all.sh prints L_ALL_WARNINGS_ONLY in all seven languages.',
        pl: 'Uczciwy baner końcowy przy ostrzeżeniach kanałów producentów. Gdy jedyną przyczyną obniżonego statusu jest ostrzeżenie o feedzie producenta i żadne aktualizacje nie pozostają niepotwierdzone ani oczekujące, update_all.sh wypisuje L_ALL_WARNINGS_ONLY we wszystkich siedmiu językach.',
      },
      {
        en: 'Fixed intermittent softwareupdate -l crash (exit 139). Subshell locale overrides with Homebrew bash 5.3 and gettext on macOS 27 crashed in setlocale(). Both calls now invoke through env LANG=C LC_ALL=C softwareupdate -l, protected by a static safety guard.',
        pl: 'Naprawiono sporadyczny błąd softwareupdate -l (kod 139). Nadpisywanie zmiennych lokalizacyjnych w podpowłoce przy użyciu Homebrew bash 5.3 i gettext na macOS 27 powodowało awarię w setlocale(). Oba wywołania korzystają teraz z env LANG=C LC_ALL=C softwareupdate -l, chronione przez statyczny test bezpieczeństwa.',
      },
      {
        en: 'Profile backups created only on real content changes. Backups of ~/.zshrc and ~/.npmrc and their terminal notices appear only when file contents actually change, and .npmrc prefix cleanup runs only when prefix or globalconfig directives are present.',
        pl: 'Kopie zapasowe profili tworzone tylko przy rzeczywistej zmianie treści. Kopie ~/.zshrc i ~/.npmrc oraz powiadomienia w terminalu pojawiają się tylko wtedy, gdy zawartość ulega zmianie, a czyszczenie .npmrc uruchamia się wyłącznie w obecności wpisów prefix lub globalconfig.',
      },
      {
        en: 'A Homebrew upgrade that removed python3 mid-run left bash with a stale command hash, so the inventory and run-summary steps failed. Every orchestrator now enables checkhash, and update_all.sh clears the hash table with hash -r before steps 2 to 5.',
        pl: 'Aktualizacja Homebrew, która usunęła python3 w trakcie biegu, pozostawiła bash z nieaktualną zapamiętaną ścieżką polecenia, przez co kroki inwentarza i zapisu podsumowania kończyły się błędem. Wszystkie orkiestratory włączają teraz checkhash, a update_all.sh czyści tablicę poleceń przez hash -r przed krokami od 2 do 5.',
      },
      {
        en: 'Reporting failures no longer defer macOS updates. A failed inventory or postupdate step is still recorded and exits non-zero, but it no longer blocks the macOS step because it changes nothing.',
        pl: 'Błędy raportowania nie odraczają już aktualizacji macOS. Nieudany krok inwentarza lub postupdate nadal jest zapisywany i kończy się kodem niezerowym, ale nie blokuje kroku macOS, ponieważ niczego nie modyfikuje.',
      },
      {
        en: 'The closing "files updated" message is printed only when the inventory step succeeded, so a failed run no longer claims that APPLICATIONS.md and UPDATES.md were updated.',
        pl: 'Końcowy komunikat o zaktualizowanych plikach pojawia się tylko wtedy, gdy krok inwentarza się powiódł, więc nieudany bieg nie twierdzi już, że APPLICATIONS.md i UPDATES.md zostały zaktualizowane.',
      },
      {
        en: 'Run-summary failures are named. write_machine_summary states whether python3 is missing from PATH or what its exit status was, and a summary left at "started" after a failed final write is relabelled "failed".',
        pl: 'Błędy podsumowania biegu są nazwane. write_machine_summary podaje, czy python3 brakuje w PATH, albo jaki był kod wyjścia, a podsumowanie pozostawione ze statusem "started" po nieudanym końcowym zapisie jest oznaczane jako "failed".',
      },
      {
        en: 'Toolkit-launched apps are asked to quit repeatedly. internet_app_quit_gracefully resends the quit request every 10 seconds within its wait window, so a copy relaunched by a vendor updater is asked to quit too. Apps are never force-killed. New settings: MAC_UPDATE_QUIT_WAIT (default 60, range 0 to 300) and MAC_UPDATE_QUIT_RESEND (default 10, range 1 to 60).',
        pl: 'Aplikacje uruchomione przez toolkit są wielokrotnie proszone o zamknięcie. internet_app_quit_gracefully ponawia żądanie quit przez AppleScript co 10 sekund w oknie oczekiwania, więc kopia ponownie uruchomiona przez updater producenta też dostaje prośbę o zamknięcie. Aplikacje nigdy nie są zamykane siłą. Nowe ustawienia: MAC_UPDATE_QUIT_WAIT (domyślnie 60, zakres od 0 do 300) i MAC_UPDATE_QUIT_RESEND (domyślnie 10, zakres od 1 do 60).',
      },
      {
        en: 'Warnings are worded honestly. A stale manufacturer feed, or a toolkit-launched app that did not quit, now produces "finished with warnings; no application update is pending" in all seven languages instead of claiming that an application was not verified or updated. The exit code stays 10.',
        pl: 'Ostrzeżenia mają uczciwe brzmienie. Nieaktualny feed producenta albo aplikacja uruchomiona przez toolkit, która się nie zamknęła, daje teraz komunikat "zakończono z ostrzeżeniami; żadna aktualizacja aplikacji nie oczekuje" we wszystkich siedmiu językach, zamiast twierdzić, że aplikacja nie została zweryfikowana lub zaktualizowana. Kod wyjścia pozostaje 10.',
      },
    ],
    changed: [
      {
        en: 'The automated suite expanded with host-tool isolation guards and broader regression coverage.',
        pl: 'Zestaw automatyczny rozszerzono o strażniki izolujące narzędzia hosta i szersze testy regresyjne.',
      },
      {
        en: 'Documented lockstep versioning policy with Ascendo. Release versions of macOS Updates and Ascendo proceed in lockstep starting from v1.5.5, with parity ports sharing identical release version numbers.',
        pl: 'Udokumentowano politykę wersjonowania lockstep z projektem Ascendo. Numery wydań macOS Updates i Ascendo postępują wspólnie począwszy od v1.5.5, a porty spójności dzielą identyczne oznaczenia wersji.',
      },
      {
        en: 'Documentation updated to reflect that the Xcode license gate is xcodebuild -license check (the previously documented -checkFirstLaunchStatus flag returned exit 69 on a licensed Xcode 27.2).',
        pl: 'Dokumentacja zaktualizowana: bramą licencji Xcode jest xcodebuild -license check (wcześniej dokumentowana flaga -checkFirstLaunchStatus zwracała kod 69 na licencjonowanym Xcode 27.2).',
      },
      {
        en: 'Live evidence from 2026-10-11 to 2026-10-30: App Store Track 2 (UniFi), verified vendor updates (KeePassXC 2.7.12 to 2.8.0, OpenCode Desktop 1.18.35 to 1.19.0), stable CLI toolchain verification across macOS 27.0.1 and macOS 27.2, and clean exit status across all 11 vendor feeds.',
        pl: 'Dowody z przebiegów na żywo od 2026-10-11 do 2026-10-30: App Store Track 2 (UniFi), zweryfikowane aktualizacje od producentów (KeePassXC 2.7.12 do 2.8.0, OpenCode Desktop 1.18.35 do 1.19.0), weryfikacja stabilnego toolchaina CLI na macOS 27.0.1 i macOS 27.2 oraz czyste statusy we wszystkich 11 kanałach producentów.',
      },
    ],
    added: [
      {
        en: 'Host-tool isolation guard in run_tests.sh. The unittest step runs with closed stdin and a guard directory containing failing stubs for softwareupdate, mas, brew, msupdate, installer, sudo, launchctl, docker, and killall behind mocks to prevent tests from reaching live native tools.',
        pl: 'Strażnik izolacji narzędzi systemowych w run_tests.sh. Krok testów jednostkowych działa z zamkniętym wejściem stdin i katalogiem atrap dla softwareupdate, mas, brew, msupdate, installer, sudo, launchctl, docker oraz killall umieszczonym za mockami, zapobiegając sięganiu testów do rzeczywistych narzędzi hosta.',
      },
      {
        en: 'Regression and unit test coverage expanded: tests/test_run_log_regressions_20261025.py covers appcast channels, Track 2 fallbacks, and profile sync idempotency; tests/test_node_releases.py covers stable Node.js selection; tests/test_system_step.py covers declined restarts.',
        pl: 'Rozszerzone pokrycie testami regresyjnymi i jednostkowymi: tests/test_run_log_regressions_20261025.py pokrywa kanały appcastów, fallbacki Track 2 i idempotencję synchronizacji profilu; tests/test_node_releases.py sprawdza wybór stabilnego Node.js; tests/test_system_step.py weryfikuje odrzucenie restartu.',
      },
      {
        en: 'New regression tests in tests/test_run_log_regressions_20261011.py cover checkhash with a vanishing python3, the non-blocking inventory step, the conditional "files updated" message, summary failures, repeated quit with a stubbed osascript, and warning wording. A static checkhash guard was added to test_safety_static.py.',
        pl: 'Nowe testy regresyjne w tests/test_run_log_regressions_20261011.py obejmują checkhash przy znikającym python3, nieblokujący krok inwentarza, warunkowy komunikat o zaktualizowanych plikach, błędy podsumowania, powtarzane żądanie zamknięcia z atrapą osascript oraz brzmienie ostrzeżeń. Statyczny strażnik checkhash dodano do test_safety_static.py.',
      },
    ],
  },
  {
    version: 'v1.5.4',
    date: '2026-10-05',
    summary: {
      en: 'Manufacturer feed warnings are decoupled from update targets, duplicate unconfirmed updater items are eliminated, and warning summaries are localized across seven languages.',
      pl: 'Ostrzeżenia o feedach producentów zostały oddzielone od celów instalacji, wyeliminowano duplikaty niepotwierdzonych updaterów, a podsumowania ostrzeżeń przetłumaczono na siedem języków.',
    },
    fixed: [
      {
        en: 'A stale manufacturer feed is treated as an informative warning with separate installed and vendor version evidence, never as a pending downgrade.',
        pl: 'Nieaktualny feed producenta jest traktowany jako informacyjne ostrzeżenie z osobnymi wersjami zainstalowaną i dostępną, nigdy jako oczekujący downgrade.',
      },
      {
        en: 'Per-app manufacturer warnings no longer emit duplicate generic unconfirmed updater items claiming an updater was launched.',
        pl: 'Ostrzeżenia producenta dla pojedynczych aplikacji nie generują już zduplikowanych ogólnych wpisów sugerujących uruchomienie updatera.',
      },
      {
        en: 'Run summary warning and unconfirmed operation labels are fully localized across all seven supported languages.',
        pl: 'Etykiety ostrzeżeń i niepotwierdzonych operacji w podsumowaniu zostały w pełni zlokalizowane w siedmiu językach.',
      },
      {
        en: 'Proton Mail informational message describes its native updater generically without misidentifying it as Sparkle.',
        pl: 'Komunikat informacyjny Proton Mail opisuje natywny updater bez błędnego kwalifikowania go jako Sparkle.',
      },
    ],
    changed: [
      {
        en: 'Verified live run completed in 108 seconds with 25 verified internet applications and zero unverified app updaters (532 passing tests).',
        pl: 'Zweryfikowany bieg na żywo zakończył się w 108 sekund przy 25 zweryfikowanych aplikacjach internetowych i zero niepotwierdzonych updaterach (532 testy).',
      },
    ],
  },
  {
    version: 'v1.5.3',
    date: '2026-10-05',
    summary: {
      en: 'Direct vendor downloads for ChatGPT, Proton release map parsing, native CLI precedence, running application bundle protection, and unattended sudo safety.',
      pl: 'Bezpośrednie pobieranie wydań ChatGPT, parsowanie mapy wydań Proton, pierwszeństwo natywnych CLI, ochrona otwartych aplikacji i bezpieczeństwo nieinteraktywnego sudo.',
    },
    added: [
      {
        en: 'ChatGPT uses verified vendor downloads before GUI launch when an update is available, saving up to 150 seconds per run.',
        pl: 'ChatGPT pobiera zweryfikowany pakiet producenta przed próbą uruchomienia GUI, oszczędzając do 150 sekund na bieg.',
      },
      {
        en: 'Proton release JSON support with vendor release mapping, minimum macOS requirements, and staged rollout detection.',
        pl: 'Obsługa formatu JSON wydań Proton z mapowaniem wersji, wymaganiami minimalnymi macOS i detekcją etapowych rolloutów.',
      },
    ],
    changed: [
      {
        en: 'Native CLI toolchains update before Node/npm; redundant npm packages are pruned only after validating working native binaries.',
        pl: 'Natywne łańcuchy CLI aktualizują się przed Node/npm; zbędne pakiety npm są usuwane dopiero po walidacji natywnych binariów.',
      },
      {
        en: 'Bundle replacements strictly verify running process state; running applications are never terminated and are deferred to restart.',
        pl: 'Podmiana aplikacji ściśle weryfikuje procesy w tle; działające aplikacje nigdy nie są zamykane i zostają odroczone do restartu.',
      },
      {
        en: 'Settle sleep delay is skipped when no application was launched; absent DJI software is omitted from inventory.',
        pl: 'Pauza oczekiwania jest pomijana, gdy nie uruchomiono żadnej aplikacji; brakujące oprogramowanie DJI nie trafia do inwentarza.',
      },
    ],
    fixed: [
      {
        en: 'Unattended system updates use non-interactive sudo (sudo -n) and propagate warnings cleanly into the final degraded summary.',
        pl: 'Nienadzorowane aktualizacje systemu używają nieinteraktywnego sudo (-n) i poprawnie przekazują ostrzeżenia do podsumowania.',
      },
      {
        en: 'App Store queue parser prevents falling back to unconstrained mas upgrade when update IDs cannot be resolved.',
        pl: 'Parser kolejki App Store zapobiega wywołaniu nieograniczonego mas upgrade w przypadku braku odczytania identyfikatorów.',
      },
    ],
  },
  {
    version: 'v1.5.2',
    date: '2026-09-28',
    summary: {
      en: 'Chromium updater verification via updater_history.jsonl, idle Docker Desktop verified DMG upgrade, OpenCode direct fallback, and hermetic CI testing.',
      pl: 'Weryfikacja updaterów Chromium przez updater_history.jsonl, aktualizacja bezczynnego Dockera z DMG, instalacja direct OpenCode i hermetyczne testy CI.',
    },
    added: [
      {
        en: 'Pre-action Omaha history proof from updater_history.jsonl for Chrome, Gemini, and Comet, eliminating redundant 45s wait cycles.',
        pl: 'Sprawdzanie historii Omaha z pliku updater_history.jsonl przed wybudzeniem updaterów dla Chrome, Gemini i Comet, oszczędzające 45 s na aplikację.',
      },
      {
        en: 'Docker Desktop updates from verified appcast DMG when idle; active containers are protected by deferring running instances.',
        pl: 'Docker Desktop aktualizuje się ze zweryfikowanego DMG z appcastu w stanie spoczynku; kontenery są chronione przez odroczenie uruchomionego Dockera.',
      },
      {
        en: 'OpenCode added to vendor_direct_first.txt for instantaneous direct installation.',
        pl: 'OpenCode dodany do vendor_direct_first.txt w celu natychmiastowej instalacji bezpośredniej ze zweryfikowanego archiwum.',
      },
    ],
    fixed: [
      {
        en: 'Suppressed false TEAMS21 quarantine release messages by maintaining MAU DeferralVersions pins.',
        pl: 'Wyeliminowano fałszywe komunikaty zwalniania kwarantanny TEAMS21 poprzez zachowanie reguł DeferralVersions w MAU.',
      },
      {
        en: 'App Store Track 2 skips user prompts and Accessibility checks when no native App Store updates are pending.',
        pl: 'Tor 2 App Store pomija pytania i sprawdzanie uprawnień Accessibility, gdy nie ma oczekujących aplikacji.',
      },
      {
        en: 'Run summary attributes unverified internet apps by specific application name instead of generic step headers.',
        pl: 'Podsumowanie biegu wymienia niepotwierdzone aplikacje z nazwy zamiast ogólnego nagłówka kroku.',
      },
      {
        en: 'Hermetic test suite eliminating host /Applications and architecture dependencies across 496 automated tests.',
        pl: 'Hermetyczny zestaw testów eliminujący zależności od lokalnego katalogu /Applications i architektury w 496 testach.',
      },
    ],
  },
  {
    version: 'v1.5.1',
    date: '2026-09-25',
    summary: {
      en: 'Chrome during Google staged rollouts now reports an informative hold status instead of an unverified missing response. Toolkit documentation and static safety guards are fully synchronized.',
      pl: 'Google Chrome w trakcie etapowego rolloutu pokazuje czytelny stan informacyjny zamiast braku odpowiedzi z serwera Omaha. Dokumentacja toolkita i strażniki statyczne zostały w pełni zsynchronizowane.',
    },
    fixed: [
      {
        en: 'Report staged vendor rollout (⏸) for Chrome when VersionHistory shows a newer public release not yet served to the local machine, preventing misleading unverified warnings.',
        pl: 'Raportowanie etapowego rolloutu (⏸) dla Chrome, gdy VersionHistory wskazuje nowszą wersję publiczną jeszcze nieudostępnioną lokalnej maszynie, zapobiegając mylnym ostrzeżeniom.',
      },
    ],
    changed: [
      {
        en: 'Synchronized documentation across all agent guides, multi-language READMEs, and added a static guard test enforcing living library documentation.',
        pl: 'Zsynchronizowano dokumentację we wszystkich przewodnikach agentów i wielojęzycznych README oraz dodano test-strażnik wymagający dokumentacji każdego modułu biblioteki.',
      },
    ],
  },
  {
    version: 'v1.5.0',
    date: '2026-09-25',
    summary: {
      en: 'Vendor truth feeds, only-installed software updates, orphan cask protection, and drift-free inventory sync.',
      pl: 'Prawda z feedów producentów, aktualizacja tylko zainstalowanego oprogramowania, ochrona przed osieroconymi caskami i bezbłędna synchronizacja inwentarza.',
    },
    added: [
      {
        en: 'Vendor feed comparison (Sparkle, JSON, YAML, Key-Value) with Gatekeeper signature and Team ID verification for direct updates.',
        pl: 'Porównywanie wersji z oficjalnymi feedami producentów (Sparkle, JSON, YAML, Key-Value) z weryfikacją podpisu Gatekeeper i Team ID przy instalacjach bezpośrednich.',
      },
      {
        en: 'Live Omaha updater status tracking for Google Chrome, Gemini, and Comet; staged rollout detection via VersionHistory.',
        pl: 'Śledzenie statusu na żywo przez logi Omaha dla Google Chrome, Gemini i Comet; wykrywanie rolloutu etapowego przez VersionHistory.',
      },
      {
        en: 'Orphan Homebrew cask detection: casks whose apps were manually removed are skipped and never reinstalled.',
        pl: 'Wykrywanie osieroconych casków Homebrew: caski, których aplikacje usunięto ręcznie, są pomijane i nigdy nie wracają.',
      },
      {
        en: 'iTunes Lookup API gate for iPad apps to skip Track 2 AppleScript GUI automation when everything is already up to date.',
        pl: 'Weryfikacja przez iTunes Lookup API dla aplikacji z iPada omija automatyzację GUI AppleScript, gdy wszystko jest aktualne.',
      },
      {
        en: 'Diagnostic tool scripts/check_vendor_feeds.sh for inspecting vendor feed truths, versions, and live Omaha updater logs.',
        pl: 'Narzędzie diagnostyczne scripts/check_vendor_feeds.sh do podglądu prawdy z feedów producentów, wersji i logów Omaha.',
      },
    ],
    changed: [
      {
        en: 'Only installed applications and CLI toolchains are updated; missing tools are never installed without explicit --bootstrap-cli.',
        pl: 'Aktualizowane jest tylko to, co jest faktycznie zainstalowane; brakujące narzędzia CLI wymagają jawnej flagi --bootstrap-cli.',
      },
      {
        en: 'Apps you have open are never closed: the toolkit only quits applications it launched itself to trigger background updates.',
        pl: 'Otwarte aplikacje nigdy nie są zamykane: skrypt zamyka wyłącznie te programy, które sam uruchomił w celu wywołania updatera.',
      },
      {
        en: 'System updates split into non-restart labels (installed per-label) and restart-required labels (installed in one batch with -R).',
        pl: 'Aktualizacje systemowe rozdzielone na etykiety bez restartu (pojedynczo) oraz wymagające restartu (zbiorczo z opcją -R).',
      },
    ],
    fixed: [
      {
        en: 'Drift-free inventory synchronization (inventory_sync.py) updating all groups in APPLICATIONS.md without accidental wipes.',
        pl: 'Bezbłędna synchronizacja inwentarza (inventory_sync.py) aktualizująca wszystkie grupy w APPLICATIONS.md bez ryzyka przypadkowego skasowania.',
      },
    ],
  },
  {
    version: 'v1.4.6',
    date: '2026-09-16',
    summary: {
      en: 'macOS 27 Golden Gate adaptation: Xcode license gate, major upgrade isolation, and architecture awareness.',
      pl: 'Adaptacja do macOS 27 Golden Gate: brama licencji Xcode, izolacja wydań major macOS i świadomość architektury binarnej.',
    },
    added: [
      {
        en: 'Pre-emptive Xcode license check in Homebrew step (xcodebuild -checkFirstLaunchStatus) to prevent license acceptance failures.',
        pl: 'Prewencyjne sprawdzanie licencji Xcode przed krokiem Homebrew, zapobiegające błędom po aktualizacji Xcode w App Store.',
      },
      {
        en: 'Binary architecture scanner (app_architecture) alerting on Intel x86_64 apps affected by macOS 27 Rosetta changes.',
        pl: 'Skaner architektury binarnej ostrzegający o aplikacjach Intel x86_64 po zmianach w Rosetta w macOS 27.',
      },
      {
        en: 'Homebrew Cask oracle (config/cask_oracles.txt) verifying installed versions for background auto-updating apps.',
        pl: 'Oracle Homebrew Cask (config/cask_oracles.txt) weryfikujący zainstalowane wersje dla aplikacji z automatycznymi updaterami.',
      },
      {
        en: 'LaunchAgent modernized for macOS 27 launchd bootstrap and quarantine attribute stripping.',
        pl: 'Modernizacja LaunchAgent pod launchd macOS 27 z usuwaniem atrybutów kwarantanny.',
      },
    ],
    changed: [
      {
        en: 'Major macOS upgrades isolated from security patches: canceling a major upgrade cleanly reports pending state without losing updates.',
        pl: 'Izolacja wydań major macOS od łatek bezpieczeństwa: rezygnacja z dużej wersji zapisuje stan pending bez ukrywania aktualizacji.',
      },
      {
        en: 'Platform metadata updated to macOS 13 to 27 across documentation and agent context files.',
        pl: 'Zaktualizowano metadane wspieranych platform do macOS od 13 do 27 w dokumentacji i profilach agentów.',
      },
    ],
  },
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
      en: 'Unblocked Codex, Ledger Live, Brave, and MAU deferral verification: four run-log warnings that were permanent update blocks.',
      pl: 'Odblokowane Codex, Ledger Live, Brave i weryfikacja odroczeń MAU: cztery ostrzeżenia z logu, które były trwałymi blokadami aktualizacji.',
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

function releaseId(version: string) {
  return `release-${version.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}`
}

export function ChangelogPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'
  const lang = useLang()
  const jsonLd = buildPageJsonLd({
    lang,
    path: '/changelog',
    name: t('seo.changelogTitle'),
    description: t('seo.changelogDesc'),
    type: 'CollectionPage',
  })

  const groups = [
    { key: 'added', label: t('chrome.changelog.added') },
    { key: 'changed', label: t('chrome.changelog.changed') },
    { key: 'fixed', label: t('chrome.changelog.fixed') },
  ] as const

  return (
    <>
      <Seo
        title={t('seo.changelogTitle')}
        description={t('seo.changelogDesc')}
        path="/changelog"
        lang={lang}
        jsonLd={jsonLd}
      />
      <DocLayout
        title={t('chrome.changelog.title')}
        lead={t('chrome.changelog.intro')}
        tocTitle={t('chrome.changelog.releases')}
        toc={RELEASES.map((r) => ({ id: releaseId(r.version), label: r.version, detail: r.date }))}
      >
        {RELEASES.map((r, idx) => (
          <section key={r.version} id={releaseId(r.version)} className="reading-release scroll-mt-24">
            <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 className="m-0 text-[1.75rem] font-semibold tracking-normal text-(--fg)">{r.version}</h2>
              <time dateTime={r.date} className="readout text-[14px] text-(--fg-muted)">{r.date}</time>
              {r.sourceSnapshot && (
                <span className="inline-flex items-center text-[13px] font-medium text-(--fg-muted)">
                  {t('chrome.changelog.currentSource')}
                </span>
              )}
              {!r.sourceSnapshot && idx === 1 && (
                <span className="inline-flex items-center text-[13px] font-medium text-(--fg-muted)">
                  {t('chrome.changelog.latestTagged')}
                </span>
              )}
              {r.rc && (
                <span className="inline-flex items-center text-[13px] font-medium text-(--fg-muted)">
                  {t('chrome.changelog.candidate')}
                </span>
              )}
            </div>
            <p className="mb-5 font-semibold leading-[1.5] text-(--fg)">{pl ? r.summary.pl : r.summary.en}</p>

            {groups.map((g) => {
              const items = r[g.key]
              if (!items?.length) return null
              return (
                <div key={g.key} className="mb-5 last:mb-0">
                  <h3 className="mb-2 mt-0 text-[15px] font-semibold text-(--fg)">{g.label}</h3>
                  <ul>
                    {items.map((item, i) => (
                      <li key={i} className="[overflow-wrap:anywhere]">{pl ? item.pl : item.en}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </section>
        ))}
      </DocLayout>
    </>
  )
}

export default ChangelogPage
