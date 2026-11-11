# Desktop transformation

Software landing for the existing macOS Updates toolkit. The owner requested Apple-inspired full-screen storytelling, a journey through MacBook eras transforming into a contemporary desktop, original graphics, film, and a useful application catalog. The owner confirmed the toolkit and application catalog scope; this is not an operating-system release database.

## Direction

One memorable transformation, followed by calm product explanation. The opening combines large editorial type with a real HTML desktop over original blue glass artwork. Scrolling dissolves a classic monochrome desktop into a contemporary desktop and reveals the toolkit preview. The historical scene is an illustration, never a claim that the tool upgrades classic hardware.

## Approaches

- A video-only hero gives cinematic control but weak localization and mobile readability.
- A 3D hardware flight adds weight and distracts from the actual command-line product.
- Chosen: layered HTML desktop with scroll-linked transform and opacity, plus an optional silent film. This preserves sharp localized text, accessible content, and a static reduced-motion state.

## Journey and feeling

1. Recognition: a classic desktop and a short promise.
2. The peak: monochrome becomes luminous blue glass as the preview window appears.
3. Confidence: interactive preview explains inventory, vendor checks, open-app protection, and macOS last.
4. Utility: search and filter the real application registry.
5. Resolution: install, preview, run; oversized typographic footer.

Use the existing React/Vite stack, route lazy loading, static EN/PL prerender, and exact vendor chunks. Respect system theme and reduced motion. All colors, fonts, radii and shadows remain tokens in index.css. The existing 2px radius, no-shadow rule and single blue accent remain. Keep real source facts in site.ts. No invented release versions, testimonials, benchmarks or installation outcomes. Desktop/window graphics and film are explicitly illustrative.

## Acceptance

Build and lint pass. All EN/PL routes plus 404 and sitemap prerender. Verify desktop and phone layouts, intermediate scroll states, search/filter/reset/empty state, theme and language controls, video playback, keyboard access, and reduced-motion behavior. No production deployment is included.

## Owner refinements during implementation

Use four representative MacBook eras over roughly twenty years, starting in 2006. The 1984 Macintosh remains an unused asset study. Keep the primary promise about time saved by update automation; history is a reminder not to fall behind. Final hero copy: “Aktualizacje z głowy. Więcej czasu dla ciebie.” Copy controls must show icons only, with accessible labels retained.
