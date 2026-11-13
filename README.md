# macOS Updates Landing

[![Source snapshot](https://img.shields.io/badge/source-v1.6.0-blue.svg)](https://github.com/KasprowiczM/macOS_updates)
[![Tests](https://img.shields.io/badge/tests-846%20unit-cases-success.svg)](https://github.com/KasprowiczM/macOS_updates)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

The landing page and documentation site for [**macOS Updates**](https://github.com/KasprowiczM/macOS_updates), a one-command updater for Apple Silicon Macs running macOS 13 to 27. The production site is [macos-updates.64bit.site](https://macos-updates.64bit.site); this repository describes the current source and does not imply that every local change is published.

The site is static: no backend and no secrets. Every page is prerendered at build time, then hydrated in the browser.

---

## What the site is

The landing page explains how macOS Updates checks and updates software already installed on Apple Silicon Macs. Sections on the home page, in order:

- Full-width workshop hero with modern and historical computer scenes, a reversible era switch, and a direct install action
- Product overview and source-backed registry facts
- `#wall`: finite Terminal preview with seven CLI languages, playback controls, and upstream dry-run messages
- A three-stage explanation of preview, source verification, and updates
- `#coverage`: searchable application registry with update-method filter and expandable results
- A daylight office close with installation instructions and optional support

Pages: `/` (home), `/features`, `/docs`, `/security`, `/changelog`, `/contributing`, `/support`. Every page also exists in Polish under `/pl`.

---

## Stack

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4 (design tokens in `src/index.css`)
- Motion (`motion/react`) for finite animation; respects `prefers-reduced-motion`
- react-router-dom 7 with `StaticRouter` for prerender; react-helmet-async 3 for head tags
- i18next and react-i18next for English and Polish
- Self-hosted Manrope Variable for display and reading, plus IBM Plex Mono for commands and terminal output
- The previous Remotion wall components remain available in source. The current landing uses lightweight Motion and an optional H.264 film; Remotion is absent from its entry bundle.

---

## Commands

```bash
npm install        # Node >= 20
npm run dev        # Vite dev server with HMR
npm run build      # typecheck, client build, SSR build, prerender
npm run preview    # serve the production build locally
npm run lint       # ESLint
```

`npm run build` runs, in order:

1. `tsc -b`
2. `vite build` (client assets to `dist/`)
3. `vite build --ssr src/entry-server.tsx --outDir dist-server`
4. `node scripts/prerender.mjs`

The prerender step must report every route in both languages. A missing `<!--app-head-->` or `<!--app-html-->` marker in `index.html` fails the build.

---

## Prerendering and /pl routing

- Language comes only from the URL path. English lives at the root (`/docs`), Polish under `/pl` (`/pl/docs`). Route definitions are in `src/lib/routes.ts`; `src/lib/site.ts` holds the route list.
- `src/entry-server.tsx` renders a route with React 19 `prerenderToNodeStream` and `StaticRouter`.
- `scripts/prerender.mjs` writes `dist/<route>/index.html` and `dist/<route>.html` (Vercel `cleanUrls`), lifts the hoisted head tags into the template, writes `dist/404.html` (noindex) and generates `dist/sitemap.xml` from the same route list.
- Each page's `<title>`, description, canonical, hreflang, Open Graph, Twitter tags and JSON-LD come from the `Seo` component (`src/components/Seo.tsx`). Hydration adopts the prerendered markup, so the page does not shift on load.

---

## SEO, structured data and agent discovery

- **Per-route head:** title, description, canonical, hreflang (`en`, `pl`, `x-default`), Open Graph and Twitter tags.
- **JSON-LD:** one `@graph` per page, built in `src/lib/jsonld.ts`: `WebSite`, publisher, `SoftwareApplication`, `SoftwareSourceCode`, page node, `BreadcrumbList`, and `FAQPage` or `HowTo` where a page has them. All version facts come from `src/lib/site.ts`.
- **`index.html`** holds only the theme bootstrap, favicon and manifest links, and the two prerender markers. It contains no static JSON-LD and no version or count.
- **Crawlers and agents:** `public/robots.txt` allows every crawler, with explicit groups for search, OpenAI, Anthropic, Perplexity, Google and Apple AI, and other AI assistants. `dist/sitemap.xml` is generated at build time with `hreflang` alternates. `public/llms.txt` is static; `public/llms-full.txt` has `{{APP_VERSION}}`, `{{APP_VERSION_DATE}}` and `{{TEST_COUNT}}` tokens that the prerender fills from `site.ts`.
- **Headers and routing:** `vercel.json` sets clean URLs, no trailing slash, security headers, long cache on `/assets/*`, and `text/plain` for the llms files.

---

## Brand assets

- The interrupted update ring mark is implemented in `src/components/ui/UpdateMark.tsx`; compact instances remain static. SVG and raster brand assets live in `public/`.
- Original workshop scenes are optimized responsive WebP files in `public/images/workshop/`. Prompts and provenance are documented in `docs/design/ASSETS.md`.
- The visual specification is `design_system/DESIGN.md`. It is the visual source of truth; token values are in `src/index.css`.

---

## Project structure

```
macOS_updates_landing/
├── public/              # Icons, manifest, robots.txt, llms.txt, llms-full.txt, OG image, logo files
├── scripts/
│   ├── prerender.mjs    # Static prerender of every route in both languages, sitemap
│   └── og/              # Brand asset and OG image generation (build-brand.mjs, og.html, wordmark)
├── design_system/       # DESIGN.md (visual source of truth), assets, UI kits
├── src/
│   ├── App.tsx          # Router, lazy route chunks, Suspense
│   ├── entry-server.tsx # SSR and prerender entry (render(url), siteManifest)
│   ├── main.tsx         # Browser entry, hydration
│   ├── index.css        # Tailwind v4 theme, design tokens, radius (2px)
│   ├── components/
│   │   ├── Seo.tsx      # Per-route head tags and JSON-LD
│   │   ├── sections/    # Home page sections (hero, poll, rules, stations, coverage, log, FAQ, install)
│   │   ├── wall/        # Remotion wall display: section, lazy player, composition, labels
│   │   ├── layout/      # Navbar, Footer, DocLayout, WikiLayout, TocPanel
│   │   ├── docs/        # Wiki sections for the docs page
│   │   └── ui/          # Button, Logo, LanguageToggle, ThemeToggle, TerminalBlock, etc.
│   ├── hooks/           # useTheme, useHtmlLang, useGitHubStats
│   ├── i18n/
│   │   └── locales/     # en.json, pl.json (page copy); chrome.en.json, chrome.pl.json (UI chrome)
│   ├── lib/
│   │   ├── site.ts      # Site constants (single source of truth)
│   │   ├── routes.ts    # Language-aware routing helpers
│   │   ├── jsonld.ts    # JSON-LD @graph builder
│   │   ├── pageLoaders.ts # Route chunk loaders (used by prerender)
│   │   ├── seoContext.ts  # JSON-LD collector for SSR
│   │   └── faq.ts       # FAQ items shared by the page and FAQPage JSON-LD
│   └── pages/           # Landing, Features, Docs, Security, Changelog, Contributing, NotFound
├── index.html           # HTML shell with the prerender markers
├── vercel.json          # Clean URLs, headers, cache rules
└── vite.config.ts       # Vite 8, vendor chunking
```

---

## Deployment

`npm run build` produces the static output in `dist/`. `vercel.json` contains clean URL, header, and cache configuration. A successful local build does not mean the changes have been published.

---

## Maintenance

Sync with every upstream macOS Updates release. Update `src/lib/site.ts`:

- `APP_VERSION` (current upstream source snapshot: `v1.6.0`; latest tagged release: `v1.5.5`)
- `APP_VERSION_DATE` (currently `2026-11-10`)
- `TEST_COUNT` (currently `846` collected Python unittest cases)
- `INTERNET_APP_COUNT` (currently `47`)
- `UPDATE_METHOD_COUNT` (currently `11`)

JSON-LD, the sitemap and the `llms-full.txt` tokens follow automatically on the next build. Update these by hand so they match the release: the version badge above, `CHANGELOG.md`, the version and test count in `public/llms.txt` (a static file), and the copy in `src/i18n/locales/en.json`. Every English claim and test count in `en.json` needs a Polish counterpart in `pl.json`, and the same for `chrome.en.json` and `chrome.pl.json`. Then run `npm run build` and confirm the prerender reports all routes.

Contributor and agent rules are in `AGENTS.md`.

---

## License

Released under the MIT License. Copyright (c) 2026 macOS Updates Contributors.

## Workshop and demonstrations

The Terminal showcase uses source-derived `--dry-run` messages. It does not scan a visitor's Mac or run updates. Historical computer artwork is design context only. The toolkit supports modern Apple Silicon Macs running macOS 13 to 27. The workshop era switch and Terminal playback are finite. The brand logo repeats a 2.8-second ring, arrow, and check sequence followed by a 10-second still end-state, pausing offscreen and when the tab is hidden. Reduced-motion preferences keep animated content static.

Optional support is a one-time contribution. The toolkit remains free under the MIT License, and contributions do not unlock features. Hosted payment providers handle payment details and display their status. A site return is not treated as proof of payment.

All routes share the same system typography, theme tokens and reading layout. The mobile navigation uses a native modal dialog rendered outside the blurred header, so its fixed geometry covers the viewport and keyboard focus stays inside the menu.
