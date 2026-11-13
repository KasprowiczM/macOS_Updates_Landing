# Changelog — macOS Updates Landing Page

All notable changes to the **macOS Updates Landing Page** (`macos-updates.64bit.site`) are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Added an English and Polish support route for optional one-time contributions. The toolkit remains free under MIT with no paid features. Hosted Stripe links use currency-specific configuration; Revolut remains an alternative. Suggested amounts are PLN 25, EUR 5, and USD 6. Custom contributions range from PLN 2 or EUR/USD 1 up to 1,000 units, subject to provider limits. The provider displays payment status; returning to the site does not indicate success.
- Added original responsive workshop artwork for modern, heritage, and office scenes, with prompt notes in `docs/design/ASSETS.md`.
- Added a finite update-ring brand mark, replay control, and matching favicon and social artwork.

### Changed
- Reframed the home page as a technical workshop with a reversible modern and historical scene switch, a source-based Terminal demonstration, a three-stage workflow, the searchable app registry, and an office installation close.
- Updated the visual system to Manrope and IBM Plex Mono, graphite and silver surfaces, and one GO blue accent. Amber remains reserved for HOLD. Reduced-motion behavior removes transitions and leaves static content.
- Fixed reduced-motion hydration by keeping the first browser render consistent with prerendered Terminal markup.
- Added `/support` to the localized English and Polish route manifest for prerendering and sitemap generation.
- Added circular red/yellow/green Mac window controls, historical Aqua/Snow Leopard/Yosemite chrome in the laptop journey and a shared contemporary glass Terminal treatment across the site and film.
- Replaced invented updater GUI mockups with Terminal windows containing verified upstream dry-run messages in all seven CLI languages. Added scroll-linked output and finite playback controls.
- Rebuilt the optional film as a Terminal workflow preview and exported a matching source-derived still.
- Unified features, documentation, security, changelog, contribution and 404 pages with the landing typography and light/dark surfaces. Kept all public routes and section anchors.
- Fixed clipped mobile navigation by rendering a native modal dialog outside the blurred header, with Escape handling and keyboard focus containment.
- Rebuilt the landing around time saved by one update toolkit, with a scroll-linked journey through four MacBook eras and a contemporary glass desktop finale.
- Added original local laptop graphics, a blue glass wallpaper and an optional silent film, with responsive and reduced-motion presentations.
- Added application search, update-method filtering, expandable registry results and a seven-language Terminal workflow preview.
- Added an oversized typographic footer and changed command copy controls to icons with accessible labels.
- Rebuilt the recorded workflow with editorial typography, a current-step view and persistent warning status. Mobile uses a native readable sequence; reduced-motion behavior and recorded example dates are preserved.
- Contained the moving hero artwork so it cannot cover the mobile facts row. Synced v1.6.0 source documentation and the 47-app coverage roster, while keeping the latest tagged release distinct.
- Split command blocks into individual actions and removed Copy from illustrative references, file trees and placeholder scaffolds.
- Replaced Mission Control styling with a unified precision editorial identity: Manrope, IBM Plex Mono, a three-layer logo, neutral light/dark tokens and generated silver/cobalt illustrations.
- Added scroll-linked artwork, a clearly labelled illustrative terminal preview and matching feature illustrations. Reduced-motion visitors receive static content.
- Improved installation guidance with separate copyable commands, preserved bilingual routes and metadata, and refreshed social imagery.
- Applied compatible dependency fixes. Runtime dependency audit reports zero vulnerabilities; nine moderate findings remain in the development lint toolchain.
- **Upstream Ground-Truth Synchronization (2026-11-02):**
  - Updated `TEST_COUNT` to 621 automated tests (from 600).
  - Updated `INTERNET_APP_COUNT` to 46 internet apps (from 43).
  - Updated `APP_VERSION_DATE` to `2026-11-02`.
  - Added 3 new internet apps since last sync: Open Design, HyperFrames, Superset (all `silent_launch`).
  - Added 21 new regression tests (`test_run_log_regressions_20261025`, `test_run_log_regressions_20261102`).
  - Synchronized all hardcoded counts in `en.json`, `pl.json`, `llms.txt`, `llms-full.txt`, `README.md`, and `AGENTS.md`.

- **Upstream Ground-Truth Synchronization (2026-10-30):**
  - Updated `APP_VERSION_DATE` to `2026-10-30` and `TEST_COUNT` to 600 automated tests.
  - Documented lockstep versioning policy between macOS Updates and Ascendo starting from v1.5.5.
  - Synchronized site documentation, guides, security boundaries, and changelog across all pages:
    - Managed Node.js pins strictly to stable releases from nodejs.org/dist/index.json, rejecting alpha builds.
    - Declined automatic restarts skip restart labels, install no-restart labels, record `system_skipped_by_user`, and exit 10.
    - App Store Track 2 polls up to 30s, falls back to individual product pages, and emits a non-blocking soft warning exit 10 for unoffered iPad apps.
    - Staged rollout channels verified via `config/vendor_appcasts.txt` without false stale-feed warnings.
    - Host-tool isolation stubs in `run_tests.sh` to prevent unit tests from calling live host tools.
    - Locale overrides invoke through `env LANG=C LC_ALL=C softwareupdate -l` to prevent bash setlocale crashes.
    - Xcode gate verifies license via `xcodebuild -license check`.
  - Synchronized `README.md`, `AGENTS.md`, `public/llms.txt`, and `public/llms-full.txt`.

### Fixed
- **Canonical domain:** `SITE_URL` now points to the live production domain `macos-updates.64bit.site`. Canonical and `og:url` tags, hreflang alternates, JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt` no longer reference the unregistered `macosupdates.dev`.

## Upstream fact sync (2026-11-10)

- Updated product registry count to 47 apps and the collected Python unittest case count to 846 from the upstream main branch. Test collection was counted without running the suite.
- The landing now identifies upstream main as source snapshot v1.6.0 from VERSION and CHANGELOG. No v1.6.0 Git tag or GitHub Release exists; v1.5.5 remains the latest tagged release.
- Added the upstream v1.6.0 source changes to the product facts: scheduled launchd runs, `--doctor` readiness checks, preflight checks, persistent vendor-feed state, and safer handling of Open Design, HyperFrames, and Superset.
- Corrected the install guide to include changing into the cloned repository before running commands and to disclose setup dependency and optional Touch ID configuration effects.
- Reworked English and Polish page metadata for clear product and install intent.

## [1.5.5] - 2026-10-12

Synchronized with macOS Updates v1.5.5: 561 automated tests, 43 internet apps, 11 update methods.

### Added
- **Mission Control visual overhaul:** the updater is framed as a flight director's go/no-go poll. Light theme is flight-plan paper, dark theme is the console room, with dark instrument screens in both. One GO-blue accent, amber only for HOLD, 2px corner radius.
- **Self-hosted fonts:** Archivo Variable and Martian Mono Variable via `@fontsource-variable`.
- **Status-lamp logo:** new brand icon, favicons with light and dark variants, PWA and apple-touch icons, and an outlined-wordmark logo lockup. Regenerated by `scripts/og/build-brand.mjs`.
- **Open Graph image** rendered from `scripts/og/og.html` with headless Chrome.
- **Home page sections:** poll console (`#poll`), flight rules (`#rules`), scroll-scrubbed wall display (`#wall`), flight plan (`#stations`), coverage roster (`#coverage`), mission log with dated real runs (`#log`), FAQ (`#faq`), install close (`#install`).
- **Static prerender:** every route is rendered at build time into `dist/<route>/index.html` and `dist/<route>.html`, with a noindex `404.html`.
- **Polish routes** under `/pl`, with hreflang `en`, `pl` and `x-default`.
- **Structured data and agent files:** per-route head tags, a JSON-LD `@graph` (SoftwareApplication, SoftwareSourceCode, WebSite, WebPage, BreadcrumbList, FAQPage, HowTo) generated from `src/lib/site.ts`, a generated `sitemap.xml` with alternates, `robots.txt` with explicit AI crawler groups, and `llms.txt` and `llms-full.txt`.

### Changed
- Animation moved from `framer-motion` to `motion` (`motion/react`). `react-helmet-async` upgraded to 3.
- Vendor chunking is package-exact in `vite.config.ts`. The Remotion player stays in the lazy wall chunk.
- `npm run build` now runs `tsc -b`, the client build, the SSR build and the prerender.
- JSON-LD is generated from `src/lib/site.ts`; `index.html` no longer carries a static JSON-LD block.
- Production build verified with Lighthouse mobile: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100.

### Fixed
- Hydration adopts the prerendered HTML, reducing layout shift on load (CLS 0.21 to 0.03).
- Accessibility and `llms.txt` corrections from the v1.5.5 review.

---

## [1.5.4] — 2026-10-05

### Added
- **Full v1.5.2, v1.5.3, and v1.5.4 Release History:** Integrated comprehensive bilingual release notes (EN/PL) into `ChangelogPage.tsx`.
- **Route-Level Code-Splitting:** Converted static page imports in `src/App.tsx` to `React.lazy()` with `<Suspense>` fallback, drastically reducing entry bundle size from 610 kB to 42 kB (gzip: 14 kB).
- **Fine-Grained Vendor Chunking:** Configured `manualChunks` in `vite.config.ts` separating `vendor-react`, `vendor-motion`, `vendor-icons`, and `vendor-i18n`.
- **Architecture Wiki Modules:** Added `lib/python/vendor_feeds.py`, `lib/vendor_direct.sh`, `lib/python/cli_duplicates.py`, `config/vendor_feeds.txt`, and `config/vendor_direct_first.txt` to the architecture reference.
- **Production README:** Added comprehensive `README.md` documenting tech stack, architecture, accessibility, and build instructions.

### Changed
- **Synchronized Ground Truth Constants:**
  - Upgraded `APP_VERSION` to `v1.5.4` (`2026-10-05`).
  - Updated `TEST_COUNT` to **532** passing tests in `src/lib/site.ts`, `en.json`, and `pl.json`.
  - Updated structured JSON-LD in `index.html` to version `1.5.4` (date: `2026-10-05`).
- **Platform Support Registry Alignment:**
  - `Comet` mapped to canonical `chromium_updater`.
  - `Gemini` mapped to canonical `keystone`.
  - `Remote Desktop Manager` mapped to `silent_launch` (KV feed).
- **Features Page Roadmap & Today Section:**
  - Added vendor feed truth, Omaha history proof, idle Docker Desktop verified DMG, ChatGPT direct downloads, and stale feed warning decoupling to `shippingToday`.

### Fixed (Ultra-Review, Taste-Skill & Impeccable Audit)
- **WCAG Tap Target Sizing (Min 44px):**
  - `Button.tsx`: Added `min-h-[44px]`, `items-center justify-center`.
  - `ThemeToggle.tsx`: Expanded hit box to `min-w-[44px] min-h-[44px]`.
  - `LanguageToggle.tsx`: Added `min-h-[44px] px-3`.
  - `TerminalBlock.tsx` and `WikiSection.tsx`: Increased copy button to `min-w-[44px] min-h-[44px]`.
  - `Navbar.tsx`: Expanded mobile menu trigger to 44px × 44px and navigation links to `py-3`.
- **Keyboard Accessibility (WCAG 2.4.7 Focus Visible):**
  - Terminal copy buttons now show `focus-visible:opacity-100` and `focus-visible:ring-2`, ensuring full visibility for keyboard navigation.
  - Added standardized `focus-visible:ring-2 focus-visible:ring-(--border-focus)` across buttons, toggles, search input, and links.
  - Added `aria-label` to the application search input in `PlatformSupport.tsx`.
  - Added `aria-expanded` and `aria-controls` to the mobile navigation toggle.
- **Taste & Motion Restraint:**
  - Removed infinite bounce loop on scroll indicator in `Hero.tsx`, replacing it with a quiet, engineering-grade indicator.
  - Stabilized typewriter terminal height (`min-h-[340px] sm:min-h-[300px] md:min-h-[280px]`) to eliminate Cumulative Layout Shift (CLS).

---

## [1.5.1] — 2026-09-25

### Changed
- Synchronized landing page with macOS Updates v1.5.1 release.
- Added Chrome staged rollout status documentation and 480 test safety verification count.

---

## [1.5.0] — 2026-09-24

### Added
- Vendor truth feeds section, three-way version comparison showcase, and orphan Homebrew cask protection overview.
- Added drift-free inventory synchronization details.

---

## [1.4.6] — 2026-09-16

### Added
- macOS 27 Golden Gate adaptation coverage: Xcode license pre-check, major upgrade isolation, and Apple Silicon binary architecture detection.
