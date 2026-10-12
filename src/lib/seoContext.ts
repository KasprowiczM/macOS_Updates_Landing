import { createContext } from 'react'

/**
 * Server-render collector for JSON-LD.
 *
 * Under React 19 `<title>`, `<meta>` and `<link>` are hoisted to <head> by React
 * itself, but inline `<script type="application/ld+json">` stays where it is
 * rendered (in <body>). To publish JSON-LD in <head> without hydration
 * mismatches, <Seo> reports its JSON-LD into this collector while prerendering
 * (scripts/prerender.mjs injects it into <head>) and, in the browser, manages the
 * same tags imperatively in <head> after mount. The rendered React tree is
 * identical on server and client.
 */
export interface SeoCollector {
  /** Replaces the collected JSON-LD (last write wins, so a re-rendered boundary cannot duplicate). */
  setJsonLd: (documents: string[]) => void
}

export const SeoCollectorContext = createContext<SeoCollector | null>(null)
