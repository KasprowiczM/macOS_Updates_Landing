# macOS Updates Design System

Reusable design package for the `macOS Updates` landing page and product
surfaces. This system is intentionally blue-led, with an identity built around
update orchestration rather than maintenance-cleaner metaphors.

## Product Position

macOS Updates is an Apple Silicon update orchestrator. The interface should
feel like a precise macOS operations console: local inventory first, installed
software only, clear update layers, and private machine state separated from
public code.

## Visual Thesis

Blue update orbit: pale macOS folder-blue surfaces in light mode, deep navy
terminal surfaces in dark mode, crisp sky-blue CTAs, and restrained motion
around terminal proof.

## Core Palette

| Token | Light | Dark | Purpose |
|---|---:|---:|---|
| `--accent` | `#3278B8` | `#3278B8` | Primary CTA, active UI, progress |
| `--accent-hover` | `#4AA3FF` | `#4AA3FF` | Hover and high-energy edge |
| `--accent-strong` | `#256EA8` | `#7BC4FF` | Links, labels, focused text |
| `--accent-soft` | `#E3EFF8` | `rgba(74,163,255,.16)` | Badges and subtle fields |
| `--bg` | `#EEF2F6` | `#0F1115` | Page shell |
| `--bg-elev` | `#F7F9FC` | `#171C23` | Raised surfaces |
| `--code-bg` | `#0F1115` | `#0F1115` | Terminal windows |

Use the blue palette for CTAs, section labels, badges, logo marks, and proof
windows. Success/progress states use blue unless a third-party platform
convention requires another color.

## Logo

The mark is an orbiting update loop around a terminal pane. Use the same blue
family for both arrows:

- Primary rail: `#3278B8`
- Highlight rail: `#7BC4FF`
- Terminal prompt: `#7BC4FF`
- Terminal stroke: `#D9ECFF`

Do not use maintenance-cleaner metaphors for the brand mark or feature icons.

## Typography

- Display and UI: `Inter Tight`, then system UI.
- Terminal/proof: `JetBrains Mono`, then SF Mono.
- Letter spacing stays `0` for prose and headings.
- Letter spacing stays `0` for labels and metadata as well.

## Components

- Primary buttons: blue filled background, 44px minimum height.
- Secondary buttons: transparent or subtle surface with blue hover text.
- Badges: use `--accent-soft` and `--accent-strong`.
- Terminals: dark surface, macOS dots, blue prompt/progress text.
- Roadmap/proof rows: icons in blue soft tiles.

## Motion

Use motion to show update orchestration:

1. Hero typewriter terminal.
2. Auto-advancing pipeline phases.
3. Scroll reveal for proof sections.

Motion should reveal state, not decorate empty space.

## Content Rules

Use update vocabulary:

- Prescan
- Local inventory
- Installed software only
- System + Store
- CLI/npm + Homebrew
- Internet app handlers
- Postupdate history
- Private `dev_sync` overlay

Avoid cleanup vocabulary unless naming the real Homebrew command
`brew cleanup`.
