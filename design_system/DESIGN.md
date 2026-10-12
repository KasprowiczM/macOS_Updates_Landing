# macOS Updates: Design System ("Mission Control")

Source of truth for the visual world of macosupdates.dev since landing v1.5.5 (2026-10-12).
Implementation lives in `src/index.css` (tokens and world utilities); this file documents it.

## Idea

Updating a Mac is a launch sequence. The site is a flight director's go/no-go poll: every
update layer is a console station that reports **GO** only after the live Mac confirms it,
**HOLD** when a vendor feed is stale (the warning stays visible), and macOS goes last because
it can restart. Apollo-era mission control room plus the paper flight data file. No neon,
no glow, no glass, no gradients.

## Themes

Both themes are first-class; `index.html` sets `data-theme` before paint from saved choice
or `prefers-color-scheme`.

| Token | Light (flight plan paper) | Dark (console room) |
|---|---|---|
| `--bg` | #EEF2F5 | #0F1823 |
| `--bg-elev` | #F7F9FB | #15212F |
| `--bg-sunk` | #E3E9EF | #0B131C |
| `--fg` | #0D1B2A | #E4EDF5 |
| `--fg-muted` | #42536A | #9FB1C3 |
| `--fg-faint` | #536377 | #7E92A6 |
| `--rule` | #C9D5E0 | #233447 |
| `--rule-strong` | #8FA5BA | #34506B |
| `--accent` (GO, the only accent) | #1F5FA8 | #4A9EF0 |
| `--accent-hover` | #2A74C6 | #7BC4FF |
| `--accent-ink` (text on accent) | #F7F9FB | #06121E |
| `--accent-text` (accent as text) | #1F5FA8 | #5DB0FF |
| `--accent-soft` | #DCE8F5 | rgba(93,176,255,.14) |
| `--hold` (text) / `--hold-lamp` | #8A5A12 / #E0A82E | #F2B544 |
| `--nogo` | #B23A33 | #F0736A |
| `--standby` | #536377 | #7E92A6 |
| `--selection` | #CFE0F3 | rgba(93,176,255,.28) |

**Screens** (console insets, wall display, command readouts, code) are dark in both themes:
`--screen-bg #0B1621`, `--screen-elev #112131`, `--screen-rule #1F3347`, `--screen-fg #D9E6F2`,
`--screen-dim #7D93A8`, `--screen-go #5DB0FF`, `--screen-hold #F2B544`, `--screen-nogo #F0736A`.
Inside `.screen` the page tokens are remapped to screen tokens and the focus ring uses `--screen-go`.

All text pairs meet WCAG AA (verified; Lighthouse accessibility 100).

## Type

- Sans: **Archivo Variable** (wdth + wght axes, self-hosted via `@fontsource-variable/archivo/wdth.css`).
- Mono: **Martian Mono Variable** (`@fontsource-variable/martian-mono/wdth.css`) only for commands,
  versions, readouts and timestamps, always `tabular-nums`.
- H1: weight ~760, tracking -0.03em, 2 lines max, capped at 4rem in the 7/12 hero column
  (font-stretch 90% there to hold two lines in EN and PL).
- H2: weight ~720, tracking -0.025em, clamp(1.9rem, 2.6vw + .6rem, 3rem).
- Body: 16 to 17px / 1.6, 68ch measure (`.measure`, `.read`).
- `.placard`: engraved console label, uppercase, font-stretch 125%, weight 620, tracking .07em,
  11 to 12px. Only on instruments (panels, lamps, table headers, the wall), never above a heading.

## Shape, depth, texture

- Radius 2px everywhere (all `--radius-*` tokens resolve to 2px). No pills.
- Elevation by 1px hairlines only (`--rule`, `--rule-strong` for bezels). Shadow tokens are off.
- The only grid texture is the plotting grid inside screens (the wall plotter).

## World components

- `.lamp` + `.lamp-go | .lamp-hold | .lamp-standby | .lamp-nogo`: 10px square status lamp,
  always paired with a text label.
- `.screen`, `.readout`: instrument surfaces and readouts.
- Button: primary = accent fill + `--accent-ink`; secondary/ghost = 1px `--rule-strong` border;
  min 44px, `:active` translate 1px. One label per intent: "Copy install command",
  "View on GitHub", "Read the docs".
- Logo: square status lamp (bezel, screws, lens, engraved up-chevron). `public/brand-icon.svg`,
  `brand-icon-dark.svg`, `favicon.svg` (light/dark aware), `logo.svg` lockup with outlined
  Archivo wordmark "macOS Updates". Screws drop below 28px. Regenerate with
  `node scripts/og/build-brand.mjs`; OG image from `scripts/og/og.html` (1200x630).

## Motion

- Ease `cubic-bezier(0.16, 1, 0.3, 1)`; 160 to 240ms UI, 600 to 900ms one-time reveals.
- One authored moment: the Remotion wall display (`src/components/wall/`), frame = scroll
  position via `useScroll`, lazy chunk, static semantic board for SSR, reduced motion and chunk
  failure. Second: the hero poll console ticks STANDBY to GO once (CSS only, SSR shows final state).
- Content is visible by default; no loops, no bounce, no scroll listeners, no scroll cues.

## Browser surfaces

Themed `::selection`, caret, scrollbar, 2px `--accent` focus ring with 2px offset,
link underline offset .2em, tabular numerals.

## Copy rules

No em or en dashes in visible text, no eyebrows or kickers above headings, no decorative
section numbers (station order 01 to 07 is information), no invented numbers: counts come
from `src/lib/site.ts`, evidence only from dated real runs.

## Layout (landing)

`#poll` hero 7/5 split (mobile status strip under CTAs) · `#rules` ruled 4-col / 2x2 grid ·
`#wall` pinned scroll-scrubbed screen · `#stations` flight plan table · `#coverage` grouped
roster (43 apps, 11 methods) · `#log` dated mission log · `#faq` disclosure rows ·
`#install` centered close. Subpages (Read mode) use the sticky console TOC panel.
