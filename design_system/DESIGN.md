---
name: macOS Updates
description: A time-saving update toolkit with a cinematic MacBook journey
typography:
  display: Native system sans serif
  reading: Native system sans serif
  technical: IBM Plex Mono
rounded:
  default: 2px
---

# macOS Updates design system

Current visual direction, 2026-11-11. All implementation tokens live in `src/index.css`.

## Product message

The product is a Terminal application, not a graphical updater. It is an automation toolkit that saves manual checking and updating. The primary promise is “Aktualizacje z głowy. Więcej czasu dla ciebie.” Historical hardware supports keeping software current. It does not imply that the toolkit upgrades historical Macs or changes their hardware.

## Journey

The full-height hero progresses through four representative MacBook eras: white polycarbonate, aluminum Air, Retina and contemporary Apple silicon design. Local generated images share a front-facing camera and neutral lighting. Each screen contains a Terminal window with source-derived CLI output. The final glass desktop keeps that same Terminal workflow; it never becomes a graphical updater. These are illustrations, not product screenshots or recorded installations.

The rest of the page explains the toolkit: source-backed counts, a seven-language Terminal replay, open-app protection, an optional silent film, a searchable application registry, FAQ and installation. The ending uses oversized type and a single directional link. The primary objective remains starting with a preview of the update workflow.

## Type and composition

Native system sans serif gives the entire site familiar macOS typography. IBM Plex Mono identifies commands, Terminal output, dates and registry methods. Large headings use restrained weight, tight tracking and short lines. Equal outer edges frame changing section compositions. The phone layout uses its own heading sizes and product framing.

## Color and shape

Warm near-white and deep graphite surfaces, one blue action accent. The generated wallpaper uses blue optical glass. Light and dark modes follow system preference initially and persist explicit choices. Amber remains reserved for HOLD. All colors, fonts and shapes are CSS tokens. Site controls retain 2px corners and no ornamental shadows. Native Mac window reproductions use a separate token family: rounded frames, subtle rim highlights, soft system-style shadows and circular red/yellow/green controls. This owner-requested exception applies to Terminal and code windows, including the rendered film. Historical laptop scenes use Aqua (2006), Snow Leopard (2010) and Yosemite (2015) chrome; every contemporary window uses the latest Liquid Glass-inspired treatment. Glass stays translucent while terminal text remains on a high-contrast dark surface. Decorative window controls are hidden from assistive technology.

## Motion

Native scrolling drives Motion values for photograph opacity, scale, the era ruler and progress bars. The MacBook section spans 350svh on desktop and 320svh on phones, with a persistent viewport stage. Header copy stays readable through the photo sequence, then gives way to a contemporary result. Supporting motion settles once. Buttons and links respond briefly to hover and press.

Reduced motion removes long pinning and photo transitions. A static semantic page and contemporary desktop remain. The 12.6-second Terminal film is silent, has native controls, loads on demand and never autoplays or loops. Main copy and catalog controls are prerendered.

## Interface and accessibility

Controls have at least 44px targets and visible accent focus outlines. Copy controls use icons, an accessible name and a live success announcement. The catalog has labeled search and method controls, an honest result count, an empty state, reset and an expandable list. The default eight rows keep the landing compact. Search and method filters reveal all matching rows. Native FAQ disclosures keep their answers in the DOM.

All product claims have English and Polish counterparts. Source facts continue to come from `src/lib/site.ts`. The historical laptop artwork is hidden from assistive technology; adjacent text explains the narrative and Apple silicon compatibility.

## Performance and references

Route lazy loading and exact package vendor chunks remain. The landing does not load Remotion. Laptop artwork uses compressed local WebP, the wallpaper uses local JPEG, and the film is H.264 with fast start and dense keyframes. Explicit image and video dimensions reserve space.

References reviewed for this direction include [Apple macOS](https://www.apple.com/os/macos/) and [Apple window anatomy](https://developer.apple.com/design/human-interface-guidelines/windows), the 84-24 restoration story and Elena Gonci’s portfolio. Their visual principles inform pacing, typography and desktop metaphors; their assets are not copied. Asset prompts and provenance are in `design_system/assets/desktop-journey-prompts.md`.

## Terminal truth and reading surfaces

The canonical replay dataset is `src/components/experience/terminalData.ts`. Introductory text and all 49 localized stage titles were compared directly with upstream shell language catalogs; all seven dry-run action records were matched to upstream calls. Dry-run lines remain English in every locale, as in the actual program. No live host scan or update is executed by the website or its media renderer.

The same Terminal component appears on the historical laptop screens, the contemporary desktop, the workflow section and the features page. A language selector exposes EN, PL, ES, FR, DE, IT and PT. Output follows scrolling or a visitor-started finite replay, with pause and restart controls. Reading pages share system typography, neutral surfaces, a common page header and a quiet contents panel. Mobile contents expand in normal flow. The site menu uses a native modal dialog portaled to the document body; the header's backdrop blur can no longer clip it.
