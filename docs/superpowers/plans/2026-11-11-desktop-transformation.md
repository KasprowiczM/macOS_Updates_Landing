# Desktop transformation implementation plan

**Goal:** Deliver the authorized full-screen toolkit landing and searchable application catalog.

**Architecture:** Keep route and SEO infrastructure. Add focused desktop scene, product walkthrough and bilingual experience copy under components/experience. Motion values drive compositor transforms and opacity. Retain semantic static markup.

**Stack:** React 19, Vite 8, Tailwind 4, existing Motion, original WebP artwork, optional H.264 film.

**Spec:** docs/superpowers/specs/2026-11-11-desktop-transformation-design.md

## Tasks

- [x] Create original wallpaper and reproducible short illustrative desktop film; compress media.
- [x] Implement bilingual classic-to-contemporary desktop hero, with reduced-motion static state.
- [x] Implement interactive product walkthrough, film, facts, installation flow and large footer.
- [x] Integrate the real registry catalog with search, method filter, reset and empty state.
- [x] Apply shared token-based light/dark styling and responsive layouts without changing the route contract.
- [x] Run build and lint; inspect desktop, phone, intermediate scroll states and useful interactions in browser.
- [x] Update current design documentation, changelog and README; record limitations and handoff.

## Review focus

SSR must contain useful copy without JavaScript. Reduced motion removes pinning and movement. Short phone screens must keep text and controls readable. Filtering must reflect the real registry and be reversible. Illustrations must not imply upgrades on unsupported hardware or a GUI application that the toolkit does not provide.

## Verification record

Build and lint passed. Local HTTP checks found all 12 prerendered routes and seven referenced media assets. Browser checks covered desktop 1440 by 900 and phone 390 by 844, light/dark switching, mobile menu, catalog search, method filter, empty/reset state, selectable workflow and icon-only command copying. Reduced-motion behavior is implemented and checked in source; an actual phone and OS reduced-motion runtime were not tested. Historical studies are not mounted on the final landing.

The final photo and heading opacity maps use explicit clamped functions. Browser inspection confirmed only the active era is visible, followed by all four photograph opacities at zero and the glass desktop at one. This avoids the native range-animation fill behavior observed during scroll verification. Film playback was started through native controls and reported an eight-second duration without a media error.
