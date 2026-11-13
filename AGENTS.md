# AGENTS.md

## GitHub Actions budget guardrail

This repository is owned by the `KasprowiczM` GitHub Free account. Private repositories share a hard allowance of 2,000 GitHub Actions minutes per month.

- Do not add, enable, or broaden scheduled workflows without the user's explicit approval.
- Default to `ubuntu-latest`; use macOS, Windows, or larger runners only when technically required and explicitly approved.
- Expensive platform-specific jobs should be manual or release-only, not triggered by every branch push.
- Restrict push/PR triggers by branch and path, add `concurrency` with cancellation, and set `timeout-minutes` on every job.
- Before changing Actions, estimate the monthly run count and minute impact. Do not change billing or spending limits without explicit approval.
- Public-repository standard runners may be free, but the same anti-waste rules still apply.

## Project Maintenance & Ground-Truth Synchronization

- **Source of Truth:** The upstream toolkit is at `../macOS_updates` or `https://github.com/KasprowiczM/macOS_updates`. Its releases are the ground truth for version, test count, app count and update-method facts.
- **Lockstep Versioning:** Release versions of `macOS_updates` and `Ascendo` are intended to proceed in lockstep. If the upstream owner explicitly publishes a release before parity is ready, use the latest upstream Git tag as the public release version and document any untagged source snapshot separately. Do not use VERSION alone as proof of a tagged release.
- **Node.js Stability Rule:** Managed Node.js must select the newest stable vX.Y.Z from `nodejs.org/dist/index.json` (`lib/python/node_releases.py`) and install with `n <version>`. Never use `n latest` or index head (which introduced v27.0.0-alpha).
- **Restart & System Update Rules:** A declined automatic restart in `update_system.sh` installs no-restart labels, skips restart-required labels, records `system_skipped_by_user`, and exits 10 without failing the run. Restart labels must never run without `-R`.
- **App Store Track 2 Rules:** AppleScript GUI automation for iPad apps polls up to 30s, checks name/description/title, refreshes once (Cmd+R), falls back to product pages, and emits a non-blocking soft warning (exit 10, `not_offered`) when an update is not offered by the store.
- **Testing Guardrails:** `run_tests.sh` runs unittests with closed stdin and failing host-tool guard stubs behind mocks to guarantee tests never touch real native tools on the host. The current upstream main branch collects 846 Python unittest cases; this count is collection evidence, not a claim that the suite was run in this sync.
- **Site Constants:** `src/lib/site.ts` is the only place for `APP_VERSION`, `APP_VERSION_DATE`, `TEST_COUNT`, `INTERNET_APP_COUNT` and `UPDATE_METHOD_COUNT`. Update them first on every upstream sync. Do not hard-code these values elsewhere in `src/`.
- **JSON-LD and Metadata:** `src/lib/jsonld.ts` builds the JSON-LD `@graph` from `site.ts`; `Seo.tsx` and the prerender write it into each page. `index.html` must not carry a static JSON-LD block or version facts. It holds only the theme bootstrap, icon and manifest links, and the `<!--app-head-->` and `<!--app-html-->` markers. `public/llms.txt` is a static file: update its version and test count by hand. `public/llms-full.txt` takes its `{{TOKENS}}` from `site.ts` at build time.
- **i18n Parity:** Every user-facing claim and test count in `src/i18n/locales/en.json` needs a matching counterpart in `pl.json`. Apply the same rule to `chrome.en.json` and `chrome.pl.json`.
- **Route Parity:** Polish routes under `/pl` mirror the English routes listed in `ROUTES` in `src/lib/site.ts`. A new route needs its English and Polish copy, its page loader, and its prerender output (including `sitemap.xml`).
- **Build Gate:** Run `npm run build` before reporting work as done. The prerender must report every EN and PL route, plus `404.html` and `sitemap.xml`. A failed marker check means `index.html` was changed in a way the prerender cannot fill.
- **Performance:** Keep route-level lazy loading (`React.lazy`) and the package-exact vendor chunks in `vite.config.ts`. Remotion (`remotion`, `@remotion/player`) stays in the lazy wall chunk, never in the main entry chunk. Do not bundle full pages or large libraries into the entry chunk.
- **Accessibility & Craft Floor:** Interactive elements keep a minimum 44px tap target (`min-h-[44px]` / `min-w-[44px]`) and a visible focus ring (`focus-visible:ring-2`, in `--accent`). Honor `prefers-reduced-motion`; the wall display already has a static semantic board for that case. No infinite animated loops (bounce, pulse, looping scroll cues), except the owner-approved brand logo loop: its ring, arrow, and check sequence runs for 2.8 seconds, followed by a 10-second still end-state, for a 12.8-second repeat. It applies to compact header/footer marks and large marks, pauses offscreen and when the tab is hidden, and is static with reduced motion.
- **Design Tokens:** Colors, radii, shadows and fonts are tokens in `src/index.css` only. No one-off hex values in components. Site controls use a 2px corner radius and no shadows. Native Mac window reproductions are the owner-approved exception: era-specific rounded frames, glass materials, soft window shadows and circular red/yellow/green controls use dedicated CSS tokens. There is one accent (GO blue); amber is reserved for HOLD.
- **Copy Rules:** No em dashes or en dashes in visible copy or in new documentation text. No eyebrows or kickers above headings. No scroll cues.
- **Visual Source of Truth:** `design_system/DESIGN.md` is the visual source of truth once it is finalized for the current release. Until then, `src/index.css` governs.
- **Public Repository:** `README.md`, `CHANGELOG.md` and this file are public. Never add private paths, private store references, memory content or private notes to them.
