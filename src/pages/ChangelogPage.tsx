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
