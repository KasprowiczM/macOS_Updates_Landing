// Historical pre-1.7 illustration; current source-aware policy has different execution gates.
// Source: i18n/lang_{en,pl,es,fr,de,it,pt}.sh, L_UPDATE_ALL_INTRO and L_UPDATE_ALL_STEPS (lines 120-140).
// Actions: update_all.sh:812,1509,1558,1598,1645,1694,2268; format: lib/cli.sh:75-82.
// The action text is English in every upstream language. These are previews, not completed updates.
export const TERMINAL_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pl", label: "Polski" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
 ] as const

export type TerminalLanguage = (typeof TERMINAL_LANGUAGES)[number]['code']
export type TerminalStage = { title: string; lines: readonly string[] }
export type TerminalRun = { mode: 'dry-run'; intro: string; stages: readonly TerminalStage[] }

const actions = [
  "[DRY-RUN] Would run: prescan.py (APPLICATIONS.md scan)",
  "[DRY-RUN] Would run: update_appstore.sh",
  "[DRY-RUN] Would run: update_npm_cli.sh",
  "[DRY-RUN] Would run: update_brew.sh",
  "[DRY-RUN] Would run: update_internet_apps.sh",
  "[DRY-RUN] Would run: postupdate.py (APPLICATIONS.md / UPDATES.md)",
  "[DRY-RUN] Would run: update_system.sh (final step)",
] as const

export const terminalRuns: Record<TerminalLanguage, TerminalRun> = {
  en: {
    mode: 'dry-run',
    intro: "The script will run a full update:",
    stages: [
      { title: "0. 🔍 Prescan (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ App Store Apps", lines: [actions[1]] },
      { title: "2. 🧰 Native CLI + npm", lines: [actions[2]] },
      { title: "3. 🍺 Homebrew Packages", lines: [actions[3]] },
      { title: "4. 🌐 Internet-Downloaded Apps", lines: [actions[4]] },
      { title: "5. 📝 Postupdate and history", lines: [actions[5]] },
      { title: "6. 🍎 macOS System (final; skipped after earlier failure)", lines: [actions[6]] },
    ],
  },
  pl: {
    mode: 'dry-run',
    intro: "Skrypt przeprowadzi pełną aktualizację:",
    stages: [
      { title: "0. 🔍 Prescan (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ Aplikacje z App Store", lines: [actions[1]] },
      { title: "2. 🧰 Native CLI + npm", lines: [actions[2]] },
      { title: "3. 🍺 Pakiety Homebrew", lines: [actions[3]] },
      { title: "4. 🌐 Aplikacje pobrane z Internetu", lines: [actions[4]] },
      { title: "5. 📝 Postupdate i historia", lines: [actions[5]] },
      { title: "6. 🍎 System macOS (na końcu; pomijany po wcześniejszym błędzie)", lines: [actions[6]] },
    ],
  },
  es: {
    mode: 'dry-run',
    intro: "El script ejecutará una actualización completa:",
    stages: [
      { title: "0. 🔍 Escaneo previo (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ Aplicaciones de App Store", lines: [actions[1]] },
      { title: "2. 🧰 CLI nativo + npm", lines: [actions[2]] },
      { title: "3. 🍺 Paquetes Homebrew", lines: [actions[3]] },
      { title: "4. 🌐 Aplicaciones de Internet", lines: [actions[4]] },
      { title: "5. 📝 Post-actualización e historial", lines: [actions[5]] },
      { title: "6. 🍎 Sistema macOS (al final; omitido tras un fallo anterior)", lines: [actions[6]] },
    ],
  },
  fr: {
    mode: 'dry-run',
    intro: "Le script exécutera une mise à jour complète:",
    stages: [
      { title: "0. 🔍 Pré-analyse (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ Applications de l'App Store", lines: [actions[1]] },
      { title: "2. 🧰 CLI natif + npm", lines: [actions[2]] },
      { title: "3. 🍺 Paquets Homebrew", lines: [actions[3]] },
      { title: "4. 🌐 Applications Internet", lines: [actions[4]] },
      { title: "5. 📝 Post-mise à jour et historique", lines: [actions[5]] },
      { title: "6. 🍎 Système macOS (en dernier ; ignoré après un échec)", lines: [actions[6]] },
    ],
  },
  de: {
    mode: 'dry-run',
    intro: "Das Skript führt ein vollständiges Update aus:",
    stages: [
      { title: "0. 🔍 Vorab-Scan (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ App Store-Apps", lines: [actions[1]] },
      { title: "2. 🧰 Native CLI + npm", lines: [actions[2]] },
      { title: "3. 🍺 Homebrew-Pakete", lines: [actions[3]] },
      { title: "4. 🌐 Internet-Apps", lines: [actions[4]] },
      { title: "5. 📝 Post-Update und Verlauf", lines: [actions[5]] },
      { title: "6. 🍎 macOS-System (zuletzt; entfällt nach früherem Fehler)", lines: [actions[6]] },
    ],
  },
  it: {
    mode: 'dry-run',
    intro: "Lo script eseguirà un aggiornamento completo:",
    stages: [
      { title: "0. 🔍 Pre-scansione (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ App di App Store", lines: [actions[1]] },
      { title: "2. 🧰 CLI nativo + npm", lines: [actions[2]] },
      { title: "3. 🍺 Pacchetti Homebrew", lines: [actions[3]] },
      { title: "4. 🌐 App Internet", lines: [actions[4]] },
      { title: "5. 📝 Post-aggiornamento e cronologia", lines: [actions[5]] },
      { title: "6. 🍎 Sistema macOS (per ultimo; saltato dopo un errore)", lines: [actions[6]] },
    ],
  },
  pt: {
    mode: 'dry-run',
    intro: "O script executará uma atualização completa:",
    stages: [
      { title: "0. 🔍 Pré-análise (APPLICATIONS.md)", lines: [actions[0]] },
      { title: "1. 🛍️ Aplicações do App Store", lines: [actions[1]] },
      { title: "2. 🧰 CLI nativo + npm", lines: [actions[2]] },
      { title: "3. 🍺 Pacotes Homebrew", lines: [actions[3]] },
      { title: "4. 🌐 Aplicações da Internet", lines: [actions[4]] },
      { title: "5. 📝 Pós-atualização e histórico", lines: [actions[5]] },
      { title: "6. 🍎 Sistema macOS (por último; ignorado após uma falha)", lines: [actions[6]] },
    ],
  },
}
