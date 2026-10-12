# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people who own one or more Apple Silicon Macs and are tired of updating them piece by piece (developers, power users, people who maintain a family or small-team Mac). They arrive from GitHub, a search engine, or an AI assistant answer, already comfortable pasting a command into Terminal. Their job: decide in under a minute whether this toolkit is trustworthy enough to run with `sudo` on their own machine, then install it.

Secondary (inferred from repo evidence, not interviewed): contributors evaluating the codebase, and AI answer engines (ChatGPT, Claude, Perplexity, Grok, Cursor) summarizing "how do I update everything on my Mac".

## Product Purpose

macOS Updates is an open-source (MIT) Bash/Python toolkit that updates every layer of an Apple Silicon Mac in one run: App Store, native vendor CLIs and npm, Homebrew, 43 internet-downloaded apps, inventory/history, and finally macOS itself. Success for the landing page: a visitor understands what it does, believes it is safe, and copies the one-line install or opens the GitHub repo.

## Positioning

Vendor truth plus honest reporting. Each app's installed version is checked against its vendor's own feed before anything runs; only software already installed on this Mac is updated; apps the user has open are never closed (the toolkit only quits what it launched itself); and a result is reported only when the live Mac confirms it. Warnings are shown as warnings, never dressed up as success.

## Operating Context

Runs from Terminal (`bash update_all.sh`, `--dry-run`, flags in `lib/cli.sh`), optionally weekly via a LaunchAgent that skips App Store and macOS steps by design. Builds a private `APPLICATIONS.md` inventory from the current Mac; history goes to `UPDATES.md`. Optional private `dev_sync/` overlay. Seven-language CLI (EN, PL, ES, FR, DE, IT, PT); the landing page itself ships EN and PL.

## Capabilities and Constraints

- Apple Silicon only, macOS 13 to 27, Bash 3.2 compatible.
- Seven ordered steps: prescan/inventory, App Store (`sudo mas` measured IDs plus AppleScript Track 2), native CLIs + npm, Homebrew (`--greedy`, orphan casks skipped), 43 internet apps via 11 update methods, postupdate inventory/history, macOS `softwareupdate -i <label> -R` last.
- Verified vendor downloads: Gatekeeper, bundle ID and Apple Team ID checks, staged swap with rollback.
- Current release: v1.5.5 (2026-10-12), 561 automated tests. Ground truth lives in the upstream repo and `src/lib/site.ts`.
- Landing stack: React 19, Vite 8, Tailwind 4, react-i18next (EN/PL at the same URLs), deployed on Vercel from `main`. Static, no backend, no secrets.

## Brand Commitments

- Name "macOS Updates"; existing logo files in `public/` (logo.svg, brand-icon.svg, favicons). The user approved a full visual overhaul on 2026-10-12; logo assets stay unless replaced deliberately.
- Voice: precise, technical, honest; no hype. The open-apps principle is a core public promise.

## Evidence on Hand

- Real: upstream CHANGELOG (v1.4 to v1.5.5), test count, live-run notes (v1.5.3 verification run 108 s with no updates; 2026-10-11 run verified UniFi 10.38.1 to 11.0.0 via App Store Track 2 and OpenCode Desktop 1.18.35 to 1.19.0 via verified vendor install), GitHub stars via API.
- Absent, must not be fabricated: user testimonials, customer logos, download counts, benchmarks beyond the dated live runs above, press coverage, any pricing (it is free).

## Product Principles

1. Truth before action: check the vendor feed, then act; report only what the Mac confirms.
2. Respect the user's machine: never close open apps, never install what was not there, never import someone else's inventory.
3. One run, every layer, in a safe order (macOS last because it can restart).
4. Transparent and auditable: open source, dry-run first, readable logs.

## Accessibility & Inclusion

WCAG 2.2 AA; 44px minimum tap targets and visible focus rings (project AGENTS.md); honor reduced motion; no infinite bounce loops.
