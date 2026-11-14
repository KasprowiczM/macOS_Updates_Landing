import { WikiSection, CodeBlock, InfoCard } from './WikiSection'
import { APP_VERSION, INTERNET_APP_COUNT, LATEST_TAGGED_VERSION } from '../../lib/site'

export function GettingStarted({ pl }: { pl: boolean }) {
  return (
    <>
      <WikiSection id="overview" title={pl ? 'Przegląd' : 'Overview'}>
        <p>{pl
          ? `macOS Updates ${APP_VERSION} to toolkit dla Maców Apple Silicon z inwentarzem zależnym od źródła. Rejestr ma ${INTERNET_APP_COUNT} wpisów dawnych możliwości, nie gwarantowanych automatycznych ścieżek.`
          : `macOS Updates ${APP_VERSION} is a toolkit for Apple Silicon Macs with source-aware inventory. Its ${INTERNET_APP_COUNT} registry rows describe legacy capabilities, not guaranteed automatic paths.`
        }</p>
        <p>{pl
          ? `Witryna opisuje bieżący snapshot kodu upstream ${APP_VERSION}. Najnowszy tag wydania w Git to ${LATEST_TAGGED_VERSION}; dla ${APP_VERSION} nie ma taga ani GitHub Release.`
          : `The site describes the current upstream source snapshot ${APP_VERSION}. The latest Git release tag is ${LATEST_TAGGED_VERSION}; ${APP_VERSION} has no tag or GitHub Release.`
        }</p>
        <p>{pl
          ? 'Plan dotyczy istniejącego oprogramowania. Osobny katalog jest niewybrany i nie ma zatwierdzonych publicznych receptur automatycznej instalacji.'
          : 'The update plan concerns existing software. The separate catalog starts unselected and has no approved public automatic installation recipes.'
        }</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoCard title={pl ? 'Wymagania' : 'Requirements'}>
            <p>{pl ? 'Mac z Apple Silicon, macOS 13 lub nowszy, połączenie z internetem i konto administratora.' : 'An Apple Silicon Mac, macOS 13 or later, an internet connection, and an administrator account.'}</p>
          </InfoCard>
          <InfoCard title={pl ? 'Języki' : 'Languages'}>
            <p>{pl ? 'EN, PL, DE, FR, ES, IT i PT w komunikatach terminala.' : 'EN, PL, DE, FR, ES, IT, and PT terminal messages.'}</p>
          </InfoCard>
        </div>
      </WikiSection>

      <WikiSection id="quick-install" title={pl ? 'Instalacja' : 'Installation'}>
        <p>{pl
          ? 'Uruchom instalator. Przygotuje zależności, sklonuje repozytorium i zbuduje APPLICATIONS.md z tego Maca. Po zakończeniu sprawdź podgląd i dopiero potem uruchom aktualizacje.'
          : 'Run the installer. It prepares dependencies, clones the repository, and builds APPLICATIONS.md from this Mac. When it finishes, preview the updates before running them.'
        }</p>
        <CodeBlock title={pl ? 'Krok 1. Instalacja' : 'Step 1. Install'}>{`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/KasprowiczM/macOS_updates/main/install.sh)"`}</CodeBlock>
        <InfoCard title={pl ? 'Co przygotowuje instalator' : 'What setup changes'}>
          <p>{pl
            ? 'Sprawdza konfigurację i buduje lokalny inwentarz. Instalacja zależności oraz konfiguracja powłoki wymagają osobnej zgody. Opcjonalny katalog jest niewybrany i ma osobny plan instalacji; brak zatwierdzonych publicznych receptur automatycznej instalacji.'
            : 'It inspects setup and builds a local inventory. Dependency installation and shell configuration require separate consent. The optional catalog starts unselected and has a separate install plan; no public automatic installation recipes are approved.'
          }</p>
        </InfoCard>
        <h3>{pl ? 'Krok 2. Podejrzyj zmiany' : 'Step 2. Preview the changes'}</h3>
        <p>{pl ? 'Uruchom podgląd z katalogu instalacji. To polecenie nie stosuje aktualizacji.' : 'Run the preview from the install folder. This command does not apply updates.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y`}</CodeBlock>
        <h3>{pl ? 'Krok 3. Uruchom aktualizacje' : 'Step 3. Run the updates'}</h3>
        <p>{pl ? 'Po sprawdzeniu podglądu uruchom aktualizacje. macOS jest przetwarzany na końcu i może wymagać restartu.' : 'After reviewing the preview, run the updates. macOS runs last and may require a restart.'}</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="update" title={pl ? 'Kolejne aktualizacje' : 'Later updates'}>
        <p>{pl
          ? 'Kiedy chcesz ponownie zaktualizować Maca, uruchom podgląd i pełny przebieg z katalogu instalacji. Przed pełnym przebiegiem przejrzyj proponowane zmiany.'
          : 'When you want to update your Mac again, run the preview and full workflow from the install folder. Review the proposed changes before the full run.'
        }</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y`}</CodeBlock>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash update_all.sh`}</CodeBlock>
      </WikiSection>

      <WikiSection id="uninstall" title={pl ? 'Deinstalacja' : 'Uninstall'}>
        <p>{pl
          ? 'Deinstalacja usuwa katalog narzędzia. Nie usuwa Homebrew ani aplikacji, które były aktualizowane.'
          : 'Uninstall removes the toolkit directory. It does not remove Homebrew or apps that were updated.'
        }</p>
        <CodeBlock title="bash">{`cd ~/Dev_Env/macOS_updates && bash uninstall.sh`}</CodeBlock>
      </WikiSection>
    </>
  )
}
