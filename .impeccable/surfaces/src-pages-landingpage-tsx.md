---
version: 1
slug: "src-pages-landingpage-tsx"
primary_target: "src/pages/LandingPage.tsx"
related_targets: []
---

## Scope

Landing page `/` (Persuade). Shared chrome (nav, footer, buttons, tokens) carries the same world to /features, /docs, /security, /changelog, /contributing (Read mode inside the same world).

## Audience and job

Apple Silicon owners and developers deciding in under a minute whether to trust a toolkit that runs with sudo. Action: copy the one-line install or open GitHub. Proof: ordered seven-step run, vendor-feed checks, 561 tests, dated live runs (UniFi 10.38.1 to 11.0.0, OpenCode 1.18.35 to 1.19.0), open apps never closed.

## Direction contract

THESIS: Updating a Mac is a launch sequence. The page is a Flight Director's poll: every layer is a console station that reports GO only after the live Mac confirms it, HOLD when a vendor feed is stale, and macOS goes last because it can restart. Refuses the category default of a black page with a neon terminal and three feature cards.

OWN-WORLD: Apollo-era Mission Operations Control Room crossed with the Flight Data File. Light: cool flight-plan paper (blue-grey white), ink navy text, ruled blue grid, engraved console placards in expanded caps. Dark: MOCR console slate-blue (never pure black), CRT readout pale cyan-white, same blue as the single accent. State colors are semantic only: GO (accent blue), HOLD (amber), NO-GO (red), STANDBY (grey). Archivo (width axis: expanded caps for placards, condensed for display) + Martian Mono readouts. Sharp 2px corners, hairline console bezels, no glow, no glass.

STORY: Visitor sees the poll and understands "one command, every layer, in a safe order". Scrolls the wall display (Remotion, scroll-scrubbed) and watches the run: installed vs vendor versions, GO stamps, one HOLD, macOS standby then restart. Believes it because the readouts are real releases and the rules are stated plainly. Copies the install line.

FIRST VIEWPORT: Left 7/12: placard "FLIGHT DIRECTOR POLL", H1 "Every layer of your Mac. GO only when confirmed." (2 lines), 18-word subtext, primary "Copy install command" + secondary "View on GitHub", install line readout below. Right 5/12: the poll console, seven station rows ticking to GO on load, T-minus counter, one HOLD row. Nav 64px, single line.

FORM: Mission control go/no-go poll, position 1 on my ordered list (Impeccable's pick, chosen by user over assigned index 3); seed key 1f3d3476. Raises kept: dry-run previews pending changes before the stamp lands (algorave); warnings never disappear, they stay visible as HOLD (ticket wallet); one scroll pull propagates across the whole run (Miura).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

The scroll-scrubbed wall display: a Remotion composition whose frame is the scroll position, polling seven stations, version readouts counting from installed to vendor, GO lamps landing, macOS last.

## Unresolved

Build path: code-led (no image generation used; Higgsfield credits not spent without consent).
