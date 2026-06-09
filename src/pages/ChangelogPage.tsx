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
    version: 'v1.0.17',
    date: '2026-06-09',
    summary: {
      en: 'Production-ready public release of macOS Updates: Apple Silicon updater with local inventory, seven-step orchestration, seven languages, and private overlay support.',
      pl: 'Produkcyjne publiczne wydanie macOS Updates: updater Apple Silicon z lokalnym inwentarzem, siedmiokrokową orkiestracją, siedmioma językami i prywatnym overlay.',
    },
    added: [
      {
        en: 'update_all.sh orchestrates prescan, macOS, App Store, CLI/npm, Homebrew, internet apps, and postupdate.',
        pl: 'update_all.sh orkiestruje prescan, macOS, App Store, CLI/npm, Homebrew, aplikacje internetowe i postupdate.',
      },
      {
        en: 'One-line installer builds APPLICATIONS.md from the current Mac instead of importing another user inventory.',
        pl: 'Instalator jedną linią buduje APPLICATIONS.md z bieżącego Maca zamiast importować cudzy inwentarz.',
      },
      {
        en: '40+ internet-downloaded app handlers through keystone, github_dmg, silent_launch, msupdate, docker_cli, and manual methods.',
        pl: '40+ handlerów aplikacji internetowych przez metody keystone, github_dmg, silent_launch, msupdate, docker_cli i manual.',
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
      {
        en: 'Public release docs clarify public GitHub code versus private cloud/local overlay files.',
        pl: 'Dokumentacja public release wyjaśnia granicę między publicznym kodem GitHub a prywatnym overlay.',
      },
    ],
    fixed: [
      {
        en: 'Static tests verify Bash 3.2 constraints, registry parity, and secret-deny rules.',
        pl: 'Testy statyczne weryfikują ograniczenia Bash 3.2, spójność registry i reguły blokowania sekretów.',
      },
      {
        en: 'Child update scripts are expected to fail non-zero for failed critical operations.',
        pl: 'Skrypty potomne mają zwracać niezerowy status dla nieudanych operacji krytycznych.',
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
      {
        en: 'Public config registry for internet app update methods and dispatch order.',
        pl: 'Publiczny registry konfiguracji metod aktualizacji aplikacji internetowych i kolejności dispatch.',
      },
      {
        en: 'User, operator, and agent documentation for installation, operations, architecture, and critical rules.',
        pl: 'Dokumentacja użytkownika, operatora i agentów dla instalacji, operacji, architektury i reguł krytycznych.',
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
