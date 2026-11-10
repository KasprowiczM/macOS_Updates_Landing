# macOS Updates Landing

[![Source snapshot](https://img.shields.io/badge/source-v1.6.0-blue.svg)](https://github.com/KasprowiczM/macOS_updates)
[![Tests](https://img.shields.io/badge/tests-846%20unit-cases-success.svg)](https://github.com/KasprowiczM/macOS_updates)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

The landing page and documentation site for [**macOS Updates**](https://github.com/KasprowiczM/macOS_updates), a one-command updater for Apple Silicon Macs running macOS 13 to 27. The live site is [macos-updates.64bit.site](https://macos-updates.64bit.site).

The site is static: no backend and no secrets. Every page is prerendered at build time, then hydrated in the browser.

---

## What the site is

The landing page explains how macOS Updates checks and updates software already installed on Apple Silicon Macs. Sections on the home page, in order:

- `#poll`: hero with the generated software-layer illustration and copyable install command
- Feature illustrations: coverage, verified direct installs and preview workflow
- `#rules`: four update safeguards
- `#wall`: recorded update workflow with a lazy scroll-driven desktop view and a readable native sequence on mobile
- `#stations`: ordered pipeline reference
- `#coverage`: coverage roster, 47 internet apps and 11 update methods
- `#log`: dated release and live-run evidence
- `#faq`: FAQ, shared with the `FAQPage` JSON-LD
- Illustrative terminal preview with an animated dry run
- `#install`: three copyable installation and update commands

Pages: `/` (home), `/features`, `/docs`, `/security`, `/changelog`, `/contributing`. Every page also exists in Polish under `/pl`.

---

## Stack

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4 (design tokens in `src/index.css`)
- Motion (`motion/react`) for animation; respects `prefers-reduced-motion`
- react-router-dom 7 with `StaticRouter` for prerender; react-helmet-async 3 for head tags
- i18next and react-i18next for English and Polish
- Self-hosted fonts: Manrope Variable and IBM Plex Mono (`@fontsource`)
- Remotion 4.0.530 (`remotion`, `@remotion/player`) for the wall display. It is loaded as a lazy chunk and never in the main entry bundle. Remotion is free for individuals and small teams (see remotion.dev/license); this is an individual open-source project.

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

- Logo geometry lives in `src/components/ui/Logo.tsx` (40-unit grid). Run `node scripts/og/build-brand.mjs` with ImageMagick to regenerate the shared mark, favicons, PWA icons and logo lockups.
- Generated illustration variants live in `public/images/`, with prompt provenance in adjacent JSON files. The Open Graph image uses the same generated hero artwork. The old `scripts/og/og.html` is a historical rendering recipe.
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

Production deploys from the `main` branch on Vercel. `vercel.json` controls URL and header behavior. The static output is `dist/`, produced by `npm run build`.

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
