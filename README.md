# macOS Updates — Official Landing Page & Documentation

[![Build & Lint](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/version-v1.5.4-blue.svg)](https://github.com/KasprowiczM/macOS_updates)
[![Tests](https://img.shields.io/badge/tests-532%20passed-success.svg)](https://github.com/KasprowiczM/macOS_updates)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Production landing page, feature showcase, and operational documentation portal for [**macOS Updates**](https://github.com/KasprowiczM/macOS_updates) — the one-command update orchestrator for Apple Silicon Macs running macOS 13–27.

---

## Overview

This repository powers [`macosupdates.dev`](https://macosupdates.dev), providing:
- **Product Overview & Live Terminal Simulation:** Zero-CLS interactive terminal demonstrating `update_all.sh --dry-run` and the seven-layer pipeline.
- **Seven-Phase Update Architecture:** Deep-dive into prescan, App Store, CLI/npm, Homebrew, 43 internet apps, postupdate, and macOS system updates.
- **Interactive App Registry & Coverage:** Searchable matrix of supported applications, canonical update methods (`keystone`, `github_dmg`, `silent_launch`, `msupdate`, `docker_cli`, `sparkle_appcast`, `chromium_updater`, etc.), and vendor feed truth mappings.
- **Complete Release History:** Bilingual (EN/PL) changelog synchronized with upstream release versions (**v1.5.4**, **v1.5.3**, **v1.5.2**, **v1.5.1**, **v1.5.0**, **v1.4.6**, etc.).
- **Security Policy & Operations Wiki:** Direct guides for operators, developers, and autonomous agents.

---

## Technical Stack & Architecture

- **Runtime & Framework:** React 19, TypeScript 6, Vite 8 (Rolldown engine).
- **Styling & Design Tokens:** Tailwind CSS v4 CSS-first design system with blue update-orbit tokens and dark/light mode parity.
- **Motion & Micro-interactions:** Framer Motion (restrained Motion 5 setting, prefers-reduced-motion compliance, zero uninvited looping animations).
- **Internationalization (i18n):** `i18next` with full English (`en`) and Polish (`pl`) parity, persisted via local storage and HTML lang sync.
- **SEO & Structured Data:** `react-helmet-async` managing canonical routes, OpenGraph, Twitter Cards, Breadcrumbs, and JSON-LD `SoftwareApplication` metadata.
- **Performance & Code-Splitting:** Dynamic `React.lazy()` route loading with `<Suspense>` fallbacks and fine-grained vendor chunk partitioning (`vendor-react`, `vendor-motion`, `vendor-icons`, `vendor-i18n`), reducing initial bundle size to under 180 kB.
- **Accessibility:** WCAG AA/AAA compliant 44px minimum tap targets across all buttons and toggles, `focus-visible` focus rings, and screen-reader accessible copy buttons.

---

## Project Structure

```
macOS_updates_landing/
├── public/                 # Static assets, favicon, manifest, robots.txt, sitemap.xml
├── src/
│   ├── components/
│   │   ├── docs/           # Wiki documentation submodules (Architecture, GettingStarted, etc.)
│   │   ├── layout/         # Navbar, Footer, DocLayout, WikiLayout
│   │   ├── sections/       # Hero, Features, HowItWorks, PlatformSupport, UpdatePipeline, etc.
│   │   └── ui/             # Badge, Button, LanguageToggle, Logo, SectionReveal, TerminalBlock, ThemeToggle
│   ├── hooks/              # useGitHubStats, useHtmlLang, useTheme
│   ├── i18n/               # i18next configuration and bilingual locale files (en.json, pl.json)
│   ├── lib/                # Single source of truth (site.ts), utils, FAQ data
│   ├── pages/              # LandingPage, FeaturesPage, DocsPage, SecurityPage, ChangelogPage, ContributingPage
│   ├── App.tsx             # Root router with Suspense-wrapped lazy routes
│   ├── index.css           # Tailwind v4 theme, design tokens, responsive typography
│   └── main.tsx            # Entry point with HelmetProvider and I18nextProvider
├── index.html              # HTML shell with noscript fallbacks and JSON-LD schema
├── vite.config.ts          # Vite 8 config with manual vendor chunking
└── package.json            # Node >= 20 dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
git clone https://github.com/KasprowiczM/macOS_updates_landing.git
cd macOS_updates_landing
npm install
```

### Development

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Production Build

Typecheck and compile optimized static assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint with React Hooks and TypeScript rules:

```bash
npm run lint
```

---

## Upstream Synchronization

Site constants are governed by `src/lib/site.ts`:
- `APP_VERSION`: Current upstream version (`v1.5.4`).
- `APP_VERSION_DATE`: Upstream release date (`2026-10-05`).
- `TEST_COUNT`: Number of passing upstream automated checks (`532`).
- `INTERNET_APP_COUNT`: Canonical internet app registry size (`43`).
- `UPDATE_METHOD_COUNT`: Distinct update handlers (`11`).

---

## License

MIT License. Copyright (c) 2026 macOS Updates Contributors.
