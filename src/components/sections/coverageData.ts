/**
 * The internet-app registry, grouped by update method.
 * Source of truth: config/internet_app_methods.txt in the toolkit repo
 * (AppName|method). The total must equal INTERNET_APP_COUNT and the number of
 * groups must equal UPDATE_METHOD_COUNT (src/lib/site.ts).
 */
export interface MethodGroup {
  /** Registry key, as written in the toolkit config. */
  method: string
  apps: readonly string[]
}

export const METHOD_GROUPS: readonly MethodGroup[] = [
  {
    method: 'brew_cask',
    apps: [
      'Brave Browser',
      'Perplexity',
      'LM Studio',
      'Obsidian',
      'ProtonVPN',
      'zoom.us',
      'MEGAsync',
      'AppCleaner',
      'Spotify',
      'CapCut',
      'Inkscape',
    ],
  },
  {
    method: 'silent_launch',
    apps: [
      'ChatGPT / Codex',
      'Claude',
      'Antigravity',
      'Antigravity IDE',
      'OpenCode',
      'Cursor',
      'Proton Mail',
      'Warp',
      'Remote Desktop Manager',
    ],
  },
  {
    method: 'github_dmg',
    apps: ['Firefox Developer Edition', 'KeePassXC', 'Visual Studio Code', 'CodeEdit', 'Ledger Live', 'Trezor Suite'],
  },
  {
    method: 'msupdate',
    apps: ['Microsoft Excel', 'Microsoft Word', 'Microsoft Outlook', 'Microsoft PowerPoint', 'Microsoft OneNote'],
  },
  { method: 'keystone', apps: ['Google Chrome', 'Gemini', 'Google Drive'] },
  { method: 'appstore_gui', apps: ['UniFi', 'WiFiman', 'Picsart'] },
  { method: 'manual', apps: ['IPMIView', 'DJI Assistant 2'] },
  { method: 'sparkle_appcast', apps: ['Proton Drive'] },
  { method: 'docker_cli', apps: ['Docker Desktop'] },
  { method: 'mau_fallback_self_update', apps: ['Microsoft Teams'] },
  { method: 'chromium_updater', apps: ['Comet'] },
]
