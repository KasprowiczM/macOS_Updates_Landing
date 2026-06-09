import { WikiSection, CodeBlock, InfoCard } from './WikiSection'

export function GettingStarted({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="overview" title={pl ? 'Przegląd' : 'Overview'}>
        <p>{pl
          ? 'macOS Updates to jednopoleceniowy aktualizator dla Maców Apple Silicon. Aktualizuje macOS, App Store, Homebrew, natywne CLI/npm i ponad 40 aplikacji internetowych na podstawie lokalnego inwentarza.'
          : 'macOS Updates is a one-command updater for Apple Silicon Macs. It updates macOS, App Store apps, Homebrew, native CLI/npm tooling, and 40+ internet-downloaded apps from a local inventory.'
        }</p>
        <p className="text-[14px]">{pl
          ? 'Kluczowa zasada: aktualizowane jest tylko oprogramowanie już zainstalowane na tym Macu. Instalator nie importuje cudzych plików APPLICATIONS.md i nie instaluje brakujących aplikacji.'
          : 'Core rule: it updates only software already installed on this Mac. The installer does not import another user’s APPLICATIONS.md and does not install missing apps.'
        }</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <InfoCard title={pl ? 'Wymagania' : 'Requirements'}>
            <p>{pl ? 'Apple Silicon, macOS 13+, Bash 3.2, Xcode Command Line Tools i Homebrew.' : 'Apple Silicon, macOS 13+, Bash 3.2, Xcode Command Line Tools, and Homebrew.'}</p>
          </InfoCard>
          <InfoCard title={pl ? 'Języki' : 'Languages'}>
            <p>{pl ? 'EN, PL, DE, FR, ES, IT i PT w komunikatach terminala.' : 'EN, PL, DE, FR, ES, IT, and PT terminal messages.'}</p>
          </InfoCard>
        </div>
      </WikiSection>

      <WikiSection id="quick-install" title={pl ? 'Instalacja' : 'Installation'}>
        <p>{pl
          ? 'Instalator klonuje repo, konfiguruje zależności, pyta o język i buduje świeży APPLICATIONS.md z tego Maca.'
          : 'The installer clones the repo, configures dependencies, asks for language, and builds a fresh APPLICATIONS.md from this Mac.'
        }</p>
        <CodeBlock title="bash">{`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/KasprowiczM/macOS_updates/main/install.sh)"`}</CodeBlock>
        <h3 className="text-(--fg) font-semibold text-[15px] mt-5 mb-2">{pl ? 'Instalacja ręczna' : 'Manual install'}</h3>
        <CodeBlock title="bash">{`git clone https://github.com/KasprowiczM/macOS_updates.git ~/Dev_Env/macOS_updates
cd ~/Dev_Env/macOS_updates
bash setup.sh
bash build_inventory.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="update" title={pl ? 'Aktualizacja' : 'Updating'}>
        <p>{pl
          ? 'Najpierw podejrzyj pełny przebieg bez stosowania zmian, potem uruchom orkiestrator.'
          : 'Preview the full workflow without applying changes, then run the orchestrator.'
        }</p>
        <CodeBlock title="bash">{`bash update_all.sh --dry-run -y
bash update_all.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="uninstall" title={pl ? 'Deinstalacja' : 'Uninstall'}>
        <p>{pl
          ? 'Uninstall usuwa katalog narzędzia. Nie usuwa Homebrew ani aplikacji, które były aktualizowane.'
          : 'Uninstall removes the toolkit directory. It does not remove Homebrew or apps that were updated.'
        }</p>
        <CodeBlock title="bash">{`bash uninstall.sh`}</CodeBlock>
      </WikiSection>
    </>
  )
}
