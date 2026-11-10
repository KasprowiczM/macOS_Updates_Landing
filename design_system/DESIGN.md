---
name: macOS Updates
description: Precision editorial software maintenance
colors:
  primary: "#165EE5"
  surface: "#FAFAF8"
  elevated: "#FFFFFF"
  ink: "#202321"
  muted: "#59605D"
  rule: "#E0E3DE"
typography:
  display:
    fontFamily: "Manrope Variable"
    fontWeight: 500
    fontSize: "clamp(3.2rem, 6.5vw, 6rem)"
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope Variable"
    fontWeight: 400
    fontSize: "17px"
    lineHeight: 1.6
rounded:
  default: "2px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  section: "112px"
---

# macOS Updates design system

Current visual identity, November 2026. The implementation tokens in `src/index.css` govern every route.

## Direction

Precision editorial. A calm, readable interface for people trusting a maintenance tool with their Mac. The product speaks before the interface: a short promise, a visible command, clear safeguards and an illustrative walkthrough. URL structure and section anchors remain stable.

## Type and composition

Self-hosted Manrope Variable for all prose, display and navigation. IBM Plex Mono regular for commands and versions. Headings use medium weight with tracking no tighter than -0.04em. Shared 1280px container, 16px mobile gutters, 24px tablet gutters, 32px desktop gutters. Generous vertical rhythm separates sections. Content remains in document order when the hero collapses below 768px.

## Color and shape

Warm near-white and graphite neutrals, a single cobalt accent. Dark mode uses neutral green-grey surfaces, with the same hierarchy and accent role. Amber means a real warning only. All surface colors come from semantic CSS tokens. Corners are 2px. No shadows or decorative grids. Code and demonstrations inherit the page theme.

## Identity and imagery

Three ascending open chevrons represent software layers receiving an update. The live wordmark preserves the product name. Public SVG and raster icons use the same mark. The generated hero depicts stacked aluminum software layers above a compact computer base, with one blue upward arrow. It is an abstract illustration, not a screenshot or evidence of a user's system.

The asset `public/images/update-layers.webp` was generated using the built-in imagegen tool on 2026-11-10 and compressed to WebP. Prompt: premium industrial product photograph, seven thin aluminum plates floating above a silver compact computer base, a cobalt upward arrow, white seamless studio, no text or interface. No external artwork was used as input.

## Motion

The hero illustration moves 75px and rotates four degrees as the visitor scrolls through its section. This explains a stack rising toward its updated state. The existing lazy Remotion walkthrough maps scroll progress to update stages; it does not run automatically or loop. Supporting safeguards settle into view once through IntersectionObserver. Reduced-motion users receive a static hero and semantic walkthrough list. Rendered content remains visible without animation support.

## Reference principles

Reviewed online on 2026-11-10: Linear (`https://linear.app`) for concise hierarchy and product demonstrations, Motion (`https://motion.dev`) for spatial transforms linked to interaction and clear accessible fallbacks. Their branding, layouts and assets are not copied.

## Accessibility and performance

Minimum 44px interactive targets, visible accent focus outlines, native headings and landmarks, bilingual routes, and readable measures. Decorative hero image has empty alternative text. Hero is an optimized local WebP with explicit dimensions. Route chunks and the Remotion player stay lazy. Fonts are local. Light, dark and reduced-motion states share one system.

## Feature and installation extensions

A matching triptych illustrates coverage, verification and the preview-update-verify process. Its seven tiles mean the pipeline layers and do not count update methods. Images are decorative; adjacent real text explains capabilities. `FeatureVisual` shares the artwork with the detailed features route. Both light and dark variants were generated from the hero material language with imagegen, without external source art. Feature art moves 48px over its viewport passage; no continuous loops run.

`TerminalPreview` is explicitly an illustrative dry run. Lines reveal once when viewed and remain readable for reduced-motion users. It executes nothing. Copyable preview commands include the default install directory. The installation section states the alternative `MAC_UPDATE_DIR` path requirement. Documentation command blocks reuse the same `CopyButton` primitive.

## Update workflow review

The recorded update section uses the same editorial type and silver/cobalt artwork as the landing page. The desktop composition presents an ordered step list and a single current-step detail view. It has no countdown, flight vocabulary, plotter, expanded capitals or console bezels. Actual recorded versions remain visible in each relevant step. A vendor-feed warning stays visible after its step and macOS is explicitly marked as not run in this replay.

Below 768px the section becomes a native vertical HTML sequence rather than a scaled-down animation canvas. This preserves 21px step titles and 15px descriptions on narrow screens. Reduced-motion visitors receive the same semantic sequence at every viewport. The desktop Remotion player stays in a lazy chunk and follows scroll position without automatic playback.

The hero artwork is clipped by a separate boundary. Its animated transform cannot overlap the proof row below it.
