import { WikiSection, CodeBlock, DocTable } from './WikiSection'

export function UserGuide({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="daily-usage" title={pl ? 'Codzienne użycie' : 'Daily Usage'}>
        <p>{pl
          ? 'Najczęstszy workflow to prescan, raport pokrycia, dry-run i dopiero pełna aktualizacja.'
          : 'The common workflow is prescan, coverage report, dry-run, then the full update.'
        }</p>
        <CodeBlock title="bash">{`bash build_inventory.sh
bash scripts/report_update_coverage.sh
bash update_all.sh --dry-run -y
bash update_all.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="risk-taxonomy" title={pl ? 'Zasady aktualizacji' : 'Update Rules'}>
        <DocTable
          headers={[pl ? 'Zasada' : 'Rule', pl ? 'Znaczenie' : 'Meaning']}
          rows={[
            [pl ? 'Tylko zainstalowane' : 'Installed only', pl ? 'Brakujące obsługiwane aplikacje są raportowane, nie instalowane.' : 'Supported missing apps are reported, not installed.'],
            ['softwareupdate -R', pl ? 'Aktualizacje macOS zachowują metadane restartu wymagane do zastosowania update.' : 'macOS updates preserve reboot metadata needed to apply the update.'],
            ['sudo mas upgrade', pl ? 'App Store CLI działa przez sudo zgodnie z aktualnym zachowaniem macOS.' : 'The App Store CLI runs through sudo for current macOS behavior.'],
            [pl ? 'Prywatny overlay' : 'Private overlay', pl ? 'APPLICATIONS.md, UPDATES.md i sekrety pozostają poza publicznym Git.' : 'APPLICATIONS.md, UPDATES.md, and secrets stay outside public Git.'],
          ]}
        />
      </WikiSection>

      <WikiSection id="private-overlay" title={pl ? 'Prywatny overlay dev_sync' : 'Private dev_sync Overlay'}>
        <p>{pl
          ? 'dev_sync rozdziela publiczny kod od plików konkretnej maszyny: inwentarza, historii, preferencji, .env i konfiguracji chmury.'
          : 'dev_sync separates public code from machine-specific files: inventory, history, preferences, .env, and cloud configuration.'
        }</p>
        <CodeBlock title="bash">{`bash dev_sync/provider_setup.sh
bash dev_sync/dev-sync-export.sh
bash dev_sync/dev-sync-import.sh
bash dev_sync/dev-sync-verify-full.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="scheduling" title={pl ? 'Tryby i flagi' : 'Modes and Flags'}>
        <p>{pl
          ? 'update_all.sh obsługuje dry-run, automatyczne potwierdzenie i flagi skip dla selektywnego pomijania warstw.'
          : 'update_all.sh supports dry-run, yes mode, and skip flags for selectively bypassing layers.'
        }</p>
        <CodeBlock title="bash">{`bash update_all.sh --dry-run -y
bash update_all.sh --skip-system
bash update_all.sh --skip-appstore
bash update_all.sh --skip-brew
bash update_all.sh --skip-internet`}</CodeBlock>
      </WikiSection>
    </>
  )
}
