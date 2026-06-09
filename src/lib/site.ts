/**
 * Single source of truth for site-wide constants.
 * Referenced by SEO components, sitemap generation logic, and feature/version copy.
 * All values are from the project Ground-Truth Facts — do NOT deviate.
 */

export const SITE_URL = 'https://macosupdates.dev'

export const REPO_URL = 'https://github.com/KasprowiczM/macOS_updates'

export const APP_VERSION = 'v1.0.17'

export const APP_VERSION_DATE = '2026-06-09'

export const TEST_COUNT = 7

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
