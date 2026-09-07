import { useTranslation } from 'react-i18next'
import { DocLayout } from '../components/layout/DocLayout'
import { Seo } from '../components/Seo'
import { APP_VERSION, SITE_URL } from '../lib/site'

export function SecurityPage() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'macOS Updates', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: pl ? 'Bezpieczeństwo' : 'Security', item: `${SITE_URL}/security` },
    ],
  }

  return (
    <>
      <Seo
        title={t('seo.securityTitle')}
        description={t('seo.securityDesc')}
        path="/security"
        lang={i18n.language}
        jsonLd={breadcrumb}
      />
      <DocLayout title={pl ? 'Polityka bezpieczeństwa' : 'Security Policy'}>
        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Zgłaszanie podatności' : 'Reporting a Vulnerability'}
          </h2>
          <div className="p-5 rounded-lg border border-(--err) bg-(--err-bg) mb-4">
            <p className="text-(--fg) font-semibold mb-2">
              {pl ? 'Nie zgłaszaj podatności jako publicznych Issues.' : 'Do not file public GitHub Issues for security vulnerabilities.'}
            </p>
            <p className="text-(--fg-muted) text-[14px]">
              {pl ? 'Użyj prywatnego kanału: GitHub Security Advisories albo email.' : 'Use a private channel: GitHub Security Advisories or email.'}
            </p>
          </div>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong className="text-(--fg)">GitHub Security Advisories</strong> —{' '}
              <a href="https://github.com/KasprowiczM/macOS_updates/security/advisories/new" target="_blank" rel="noopener noreferrer" className="text-(--accent-strong) hover:text-(--accent) no-underline transition-colors">
                {pl ? 'zgłoś prywatnie' : 'report privately'}
              </a>
            </li>
            <li>
              <strong className="text-(--fg)">Email</strong> — <code className="bg-(--bg-sunk) px-1.5 py-0.5 rounded text-[13px] font-mono break-words [overflow-wrap:anywhere]">gaipro.mk@gmail.com</code> <code className="bg-(--bg-sunk) px-1.5 py-0.5 rounded text-[13px] font-mono break-words">[macOS_updates-security]</code>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Chronione granice' : 'Protected Boundaries'}
          </h2>
          <ul className="space-y-2">
            <li>{pl ? 'Prywatne pliki maszyny są gitignored: APPLICATIONS.md, UPDATES.md, .env, .dev_sync_config.json, .mac_update_prefs.' : 'Machine-private files are gitignored: APPLICATIONS.md, UPDATES.md, .env, .dev_sync_config.json, .mac_update_prefs.'}</li>
            <li>{pl ? 'Publiczna instalacja nie importuje cudzych inwentarzy ani nie instaluje brakujących aplikacji.' : 'Public install does not import another user inventory or install missing apps.'}</li>
            <li>{pl ? 'Pobrane DMG/PKG i aplikacje mają reguły weryfikacji przed instalacją.' : 'Downloaded DMGs/PKGs/apps have verification rules before installation.'}</li>
            <li>{pl ? 'run_tests.sh zawiera scan sekretów i testy statyczne reguł krytycznych.' : 'run_tests.sh includes secret scanning and static tests for critical rules.'}</li>
            <li>{pl ? 'Import overlay pomija pliki śledzone przez Git, odmawia ucieczek symlinkami i zostawia ścieżkę odzyskania, gdy zamiana się nie uda.' : 'Overlay import skips Git-tracked files, refuses symlink escapes, and leaves a recovery path if a swap fails.'}</li>
            <li>{pl ? 'Przepisania konfiguracji MCP zostają przy 0600 (lub ostrzejszym oryginale); równoległe runy biorą blokadę repozytorium.' : 'MCP config rewrites stay 0600 (or the stricter original mode); parallel runs take a per-repo lock.'}</li>
            <li>{pl ? 'CLI vendora jest raportowane jako zaktualizowane tylko gdy istnieje działające --version; nieznane pending nie zamienia się w zero.' : 'A vendor CLI is reported updated only when a working --version exists; unknown pending stays unknown, not zero.'}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Co uznajemy za podatność' : 'What We Consider a Vulnerability'}
          </h2>
          <ul className="space-y-2">
            <li>{pl ? 'Wykonanie niezaufanych danych jako shell/Python/AppleScript.' : 'Executing untrusted data as shell, Python, or AppleScript.'}</li>
            <li>{pl ? 'Wycieki tokenów, .env albo konfiguracji prywatnego overlay do publicznego repo.' : 'Leaking tokens, .env, or private overlay config into the public repo.'}</li>
            <li>{pl ? 'Pominięcie -R w aktualizacji macOS lub sudo dla mas upgrade.' : 'Dropping -R from macOS updates or sudo from mas upgrade.'}</li>
            <li>{pl ? 'Raportowanie sukcesu po nieudanej krytycznej instalacji lub kopii aplikacji, albo po curl|sh bez działającego binarium.' : 'Reporting success after a failed critical install or app copy, or after curl|sh without a working binary.'}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-(--fg) font-semibold text-[22px] tracking-tight mb-3">
            {pl ? 'Wspierane wersje' : 'Supported Versions'}
          </h2>
          <p>{pl
            ? `Aktualne wydanie ${APP_VERSION} otrzymuje poprawki bezpieczeństwa. Starsze wersje mogą wymagać aktualizacji do najnowszego tagu.`
            : `The current ${APP_VERSION} line receives security fixes. Older versions may need to upgrade to the latest tag.`
          }</p>
        </section>
      </DocLayout>
    </>
  )
}

export default SecurityPage
