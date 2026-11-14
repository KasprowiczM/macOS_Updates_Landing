import type { TFunction } from 'i18next'
import { INTERNET_APP_COUNT, PREVIEW_TARGET_LIMIT, PRODUCT_COUNT } from './site'

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
    id: 'q10',
    q: 'How do I update all apps on a Mac at once?',
    a: "Preview with bash update_all.sh --dry-run -y. Eligible manager updates require explicit consent; unresolved paths remain manual.",
  },
  {
    id: 'q11',
    q: 'Does macOS Updates close my open apps?',
    a: "Apps you already have open are protected. Native lifecycle infrastructure can control only an observed process it owns, with separate explicit lifecycle consent. No production native drivers are active.",
  },
  {
    id: 'q12',
    q: 'Is it safe to run with sudo?',
    a: "It is built for it. sudo is requested at most once per run, never without a terminal and never during --dry-run. Only the App Store and macOS steps need it, and the code is open to review.",
  },
  {
    id: 'q13',
    q: 'Does it work on Intel Macs?',
    a: "No. macOS Updates supports Apple Silicon (arm64) Macs running macOS 13 to 27, with Homebrew at /opt/homebrew. Intel Macs are intentionally unsupported.",
  },
  {
    id: 'q14',
    q: 'How is it different from Homebrew or the App Store alone?',
    a: "The toolkit builds a source-aware inventory and plan. Eligible manager updates require consent; unknown paths remain manual.",
  },
  {
    id: 'q1',
    q: 'Is macOS Updates free and open source?',
    a: 'Yes. The public code is MIT licensed and runs locally. Machine-specific files are intentionally gitignored.',
  },
  {
    id: 'q2',
    q: 'Will it install apps I do not already have?',
    a: 'The optional catalog starts unselected and has a separate install plan. No public automatic installation recipes are approved.',
  },
  {
    id: 'q3',
    q: 'Why is Apple Silicon required?',
    a: 'The project is scoped to arm64 Macs and Homebrew at /opt/homebrew. Intel Macs are intentionally unsupported.',
  },
  {
    id: 'q4',
    q: 'Can I preview before updating?',
    a: `Yes. bash update_all.sh --dry-run -y shows up to ${PREVIEW_TARGET_LIMIT} targets in a readable preview. Use --dry-run --json-summary or --plan for the full JSON plan. Neither grants consent or changes apps.`,
  },
  {
    id: 'q5',
    q: 'What does dev_sync do?',
    a: 'dev_sync handles optional private overlay files such as APPLICATIONS.md, UPDATES.md, .env, preferences, and cloud sync configuration. Import expands directory manifests, skips Git-tracked and excluded files, refuses symlink escapes, and leaves a recovery path if a swap fails.',
  },
  {
    id: 'q6',
    q: 'Why does mas upgrade use sudo?',
    a: 'The project follows the current macOS/App Store CLI requirement documented in the repo, including the CVE-related Sequoia behavior.',
  },
  {
    id: 'q7',
    q: 'How many apps are supported?',
    a: `The registry has ${INTERNET_APP_COUNT} rows for ${PRODUCT_COUNT} products; entries do not guarantee automatic updates.`,
  },
  {
    id: 'q8',
    q: 'How do I add a new internet app?',
    a: 'Use scripts/scaffold_internet_app.sh /path/Observed.app --json for a review-only proposal. Recipe evidence and acceptance remain separate; then run bash run_tests.sh.',
  },
  {
    id: 'q9',
    q: 'How do I know an update actually landed?',
    a: 'Updates need fresh identity, source and installed-version evidence. Inventory field changes, elapsed time and a successful command exit alone do not prove an update. Incomplete observations remain unknown.',
  },
]

/**
 * Localised FAQ items for the given translation function.
 *
 * `faq.items.<id>.{q,a}` exists in both en.json and pl.json, so the visible
 * FAQ and the FAQPage JSON-LD share one source per language. The English text
 * above is only the fallback if a key is ever missing.
 */
export function getFaqItems(t: TFunction): FaqItem[] {
  return FAQ_ITEMS.map((item) => ({
    id: item.id,
    q: t(`faq.items.${item.id}.q`, { defaultValue: item.q }) as string,
    a: t(`faq.items.${item.id}.a`, { defaultValue: item.a }) as string,
  }))
}
