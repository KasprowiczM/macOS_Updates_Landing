---
name: macOS Updates
description: A precise, human-controlled Terminal workflow for keeping a modern Apple Silicon Mac current
typography:
  display: Manrope Variable
  reading: Manrope Variable
  technical: IBM Plex Mono
rounded:
  default: 2px
---

# macOS Updates design system

Current visual direction, 2026-11-13. CSS tokens and implementation rules live in `src/index.css`.

## Product and composition

macOS Updates is a free, open-source Terminal toolkit, not a graphical updater. Its workshop identity puts one Mac and the ordered update workflow at the center. The opening photograph pairs a contemporary workstation with direct, asymmetric copy and an install action. A reversible 1984/2026 control changes between a matched current laptop scene and an illustrative CRT scene. Historical hardware is design context, never a compatibility claim.

The page proceeds through source-backed facts, a real-message Terminal demonstration, a three-stage explanation, a searchable app registry, and a quiet office close with installation and optional support. Terminal examples are demonstrations only. The website does not scan a visitor's computer or run updates.

## Type, color, and shape

Manrope Variable carries display and reading copy. IBM Plex Mono identifies commands, Terminal output, methods, and compact technical details. Headings use tight tracking and short lines; body text keeps comfortable measures.

Graphite, silver, and neutral surfaces support a single GO blue accent. Amber is reserved for HOLD. All colors, fonts, radii, and shadows are tokens in `src/index.css`. Site controls use 2px corners without shadows. Native Mac window reproductions retain the approved era-specific frame, glass, and control treatment. The interrupted update ring mark is original SVG geometry.

## Motion and accessibility

The era switch uses a short, user-triggered screen transition and remains reversible. Terminal playback is finite, can be played, paused, and replayed, and pauses when it leaves the viewport or the document is hidden. The mark animation runs once when visible and can be replayed from its control. No animation loops. Reduced-motion preferences remove transitions and leave readable static content.

Interactive targets are at least 44px with visible focus treatment. Era selection exposes pressed state and a live caption; stage controls expose the selected step. Photos have localized descriptions, while decorative graphics stay out of the accessibility tree. English and Polish copy share equivalent product claims.

## Artwork and provenance

Three original 16:9 workshop photographs are supplied in standard and compact WebP sizes. The modern and heritage views share composition so the era control feels like one scene. The office finale shifts to daylight. They are editorial illustrations, not product screenshots or captured update runs. Prompts, dimensions, and asset inventory are recorded in `docs/design/ASSETS.md`.

## Support and integrity

The toolkit remains free under MIT, with no paid features. Optional support is a one-time contribution through validated hosted Stripe or Revolut links. Suggested contributions are PLN 25, EUR 5, and USD 6; custom amounts are supported within each provider's configured limits. The provider collects payment details and confirms the contribution. A return to the site never counts as proof of payment. Provider availability follows valid configuration; no BLIK availability is promised.

## Technical constraints

Keep route-level lazy loading, bilingual prerendering, canonical metadata, and sitemap generation. Source version and registry facts come from `src/lib/site.ts`. Do not claim that a collected test count means the suite ran. Do not present the Terminal demonstration as an execution or a successful update.
