export interface FaqItem {
  id: string
  q: string
  a: string
}

/**
 * English FAQ source used by JSON-LD. Keep in sync with en.json.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'q1',
    q: 'Is macOS Updates free and open source?',
    a: 'Yes. The public code is MIT licensed and runs locally. Machine-specific files are intentionally gitignored.',
  },
  {
    id: 'q2',
    q: 'Will it install apps I do not already have?',
    a: 'No. The updater only updates software already installed on the Mac. Supported missing apps are reported, not installed.',
  },
  {
    id: 'q3',
    q: 'Why is Apple Silicon required?',
    a: 'The project is scoped to arm64 Macs and Homebrew at /opt/homebrew. Intel Macs are intentionally unsupported.',
  },
  {
    id: 'q4',
    q: 'Can I preview before updating?',
    a: 'Yes. Run bash update_all.sh --dry-run -y or bash scripts/report_update_coverage.sh to inspect coverage first.',
  },
  {
    id: 'q5',
    q: 'What does dev_sync do?',
    a: 'dev_sync handles optional private overlay files such as APPLICATIONS.md, UPDATES.md, .env, preferences, and cloud sync configuration.',
  },
  {
    id: 'q6',
    q: 'Why does mas upgrade use sudo?',
    a: 'The project follows the current macOS/App Store CLI requirement documented in the repo, including the CVE-related Sequoia behavior.',
  },
  {
    id: 'q7',
    q: 'How many apps are supported?',
    a: 'The current registry covers 40+ internet-downloaded apps plus macOS, App Store, Homebrew, and CLI/npm tooling.',
  },
  {
    id: 'q8',
    q: 'How do I add a new internet app?',
    a: 'Use scripts/scaffold_internet_app.sh, register the method and dispatch order, add i18n strings, then run bash run_tests.sh.',
  },
]
