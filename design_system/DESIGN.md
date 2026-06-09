# macOS Updates Visual Specification

## Mood

Technical, calm, and Mac-native. The visual language should resemble a precise
system updater, not a disk cleaner. Use blue rails, navy terminals, and pale
folder-blue surfaces.

## Color Tokens

```css
:root {
  --bg: #EEF2F6;
  --bg-elev: #F7F9FC;
  --bg-sunk: #E8EDF3;
  --fg: #0F1115;
  --fg-muted: #4A5563;
  --border: #D8DEE6;

  --accent: #3278B8;
  --accent-hover: #4AA3FF;
  --accent-strong: #256EA8;
  --accent-soft: #E3EFF8;
  --accent-ink: #F7F9FC;

  --code-bg: #0F1115;
  --code-fg: #F7F9FC;
  --code-dim: #7B8491;
}

:root[data-theme="dark"] {
  --bg: #0F1115;
  --bg-elev: #171C23;
  --bg-sunk: #12161C;
  --fg: #F7F9FC;
  --fg-muted: #AAB2BD;
  --border: #2B333D;

  --accent: #3278B8;
  --accent-hover: #4AA3FF;
  --accent-strong: #7BC4FF;
  --accent-soft: rgba(74, 163, 255, 0.16);
  --accent-ink: #F7F9FC;
}
```

## Logo Rules

- Use `assets/macos-updates-mark.svg` for icon-only moments.
- Use `/public/logo.svg` for the full wordmark.
- Keep all logo rails blue.
- Keep the terminal center; it ties the brand to shell automation.

## Landing Page Hierarchy

1. Brand and slogan: `UPDATE ORBIT`
2. Hero: local inventory and installed-only policy.
3. Proof terminal: seven-step updater.
4. Status strip: version, license, layers, safety checks.
5. Problem section: manual update sprawl vs orchestrated run.
6. Pipeline: prescan, System + Store, CLI + Brew, Internet + Report.
7. Docs and install CTA.

## Components

### Buttons

Primary:

```css
background: var(--accent);
color: var(--accent-ink);
```

Hover:

```css
background: var(--accent-hover);
```

### Terminal Lines

- Command: `--code-fg`
- Successful/progress line: `--accent-strong`
- Muted note: `--code-dim`
- Warning: amber semantic token
- Error: red semantic token

### Badges

Use blue soft badges for product status. Examples:

- `v1.0.17`
- `Apple Silicon`
- `macOS 13+`
- `40+ apps`
- `dev_sync`

## Do Not Use

- Legacy non-blue brand accents.
- Maintenance-cleaner metaphors.
- Risk-model labels from unrelated utility products.
- Purple-blue gradients as the dominant palette.
- One-note dark navy without the folder-blue surface contrast.
