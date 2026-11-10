/**
 * Single source of truth for site-wide constants.
 * Referenced by SEO components, sitemap generation logic, and feature/version copy.
 * All values are from the project Ground-Truth Facts — do NOT deviate.
 */

export const SITE_URL = 'https://macos-updates.64bit.site'

export const REPO_URL = 'https://github.com/KasprowiczM/macOS_updates'

export const APP_VERSION = 'v1.6.0'

export const APP_VERSION_DATE = '2026-11-10'

export const TEST_COUNT = 846

/** Canonical internet-app registry size (`config/internet_apps.txt`). */
export const INTERNET_APP_COUNT = 47

/** Distinct internet-app update methods in `config/internet_app_methods.txt`. */
export const UPDATE_METHOD_COUNT = 11

/** Recommended Basic CLI install — macOS. */
export const INSTALL_NIX =
  '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/KasprowiczM/macOS_updates/main/install.sh)"'

/** Public SPA routes — order is the sitemap order. */
export const ROUTES = [
  '/',
  '/features',
  '/docs',
  '/security',
  '/changelog',
  '/contributing',
] as const

export type Route = (typeof ROUTES)[number]
