# Logo candidates: Mission Control direction

Status: first pass, one iteration done. Regenerate with `node build-logos.mjs && node build-previews.mjs` (needs Chrome + ImageMagick). Overview image: `comparison.png`.

Palette: ink #0D1B2A, GO blue #1F5FA8 (light) / #5DB0FF (dark), console slate #0F1823, paper #EEF2F5. No amber (no HOLD state in the mark). No gradients, glow or 3D.

Wordmark: hand-constructed squared, chamfered caps (20-unit cap height, 4-unit stem), emitted as filled polygons, so there is no `<text>` and no font dependency. It is NOT Archivo: the Archivo woff2 files in `node_modules/` were blocked by the session's permission settings, and fontTools/brotli are not installed. It is set in caps (`MACOS UPDATES`) because the glyph set was built for caps only; a mixed-case `macOS Updates` would need lowercase glyphs or real Archivo outlines.

Files per candidate (`a-poll-ring`, `b-status-lamp`, `c-trajectory`): `-mark.svg`, `-mark-dark.svg`, `-lockup.svg`, `-lockup-dark.svg`, `-icon.svg` (full-bleed maskable/app icon), and 512px PNG previews `-mark-on-light.png`, `-mark-on-dark.png`, `-lockup-on-light.png`, `-lockup-on-dark.png` (lockups are 1024x512 canvases).

## A. Poll ring
Concept: seven segments around a circle, one per console station. Six are lit GO blue; the seventh sits at the top as an ink "keystone" that is slightly larger than the others (it is macOS, the last station), with an upward chevron in the centre.
Fit: it is the go/no-go poll itself, and the segment count carries the "seven ordered stations" claim.
Small sizes: legible down to 32px. At 16px the seven segments dither into a dotted ring and the chevron is lost. This is the weakest candidate at favicon size; it would need a 16px-specific variant (fewer or fatter segments, no chevron detail).
Risks: ring plus arrow can read as a generic loader or refresh icon; the keystone segment is the only thing that separates it.

## B. Status lamp
Concept: a square annunciator lamp. An ink bezel with an inset hairline and four screws holds a GO blue lens, with a flat-cut upward chevron as the legend.
Fit: it is the physical object a Flight Director's poll lights up. It is the simplest form and carries the update-and-launch idea in one glyph.
Small sizes: best of the three. At 16px it is a solid blue square with a light chevron inside a dark frame; the screws and hairline drop out cleanly. The maskable icon is the lens on an ink ground and survives the 80% safe zone and a circle mask.
Risks: closest to a generic "scroll to top" or app-tile icon; the bezel and screws are the Mission Control cues and they vanish at small size. In the dark version the bezel is only slightly lifted from the ground, so the lens carries the shape alone.

## C. Trajectory on a plot
Concept: a square plot frame with a faint grid. A quarter-circle ascent arc crosses six radial station ticks and ends in a filled dot, the seventh station.
Fit: closest to the launch-sequence story and to plotting-grid ops rooms; the arc also reads as an orbit-insertion profile.
Small sizes: the frame and arc hold at 32px. At 16px the ticks and grid disappear and the arc plus frame is marginal, with some anti-aliased grey on the frame edges.
Risks: can read as an analytics or growth chart. The frame is the busiest silhouette of the three, and the line weights are thin compared to A and B.

## Recommendation
B (status lamp) is the strongest all-round mark: it survives 16px, works as a maskable icon, and fits the console metaphor. A is the best poll-concept mark and works for large hero use, but needs a dedicated 16px variant. C is the most narrative but the least robust.
