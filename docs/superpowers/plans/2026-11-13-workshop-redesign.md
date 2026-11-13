# Workshop redesign implementation plan

**Goal:** Deliver the approved original macOS Updates identity with new photography, finite motion and optional support.

**Architecture:** Retain React, Vite, existing localized lazy routes and SSG. Build focused workshop components and reuse source-backed Terminal data and app registry.

**Spec:** `docs/superpowers/specs/2026-11-13-workshop-redesign.md`.

## Tasks

- [x] Generate and visually inspect modern-workshop, historical CRT and quiet-office artwork; optimize project copies and record prompts in `docs/design/ASSETS.md`.
- [x] Build `src/components/workshop/Workshop.tsx` with EN/PL copy, era control, workflow stages, installation and support finale. Reuse `TerminalShowcase` and `AppCoverage`.
- [x] Implement the new native SVG mark and localized hosted-support page. Validate payment URL handling and add both localized routes to the shared manifest.
- [x] Update `src/index.css` tokens and workshop rules; integrate navigation/footer and apply the typography to reading routes.
- [x] Refresh favicon, manifest icons and social artwork with the new mark. Update README, changelog and design-system documentation.
- [x] Run lint/build; verify SSG route count, internal links and no private data. Inspect Chromium desktop/mobile, keyboard interactions and reduced motion; fix material findings once.

## Review focus

Long Polish copy and 320px viewports must remain readable; all images preserve their subjects. Era switching retains focus and works without animation. Terminal controls do not execute software or imply a real scan. Hosted payment return URLs cannot assert payment success. Lazy page hydration preserves prerendered content.
