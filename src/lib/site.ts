/**
 * Single source of truth for site-wide constants.
 * Referenced by SEO components, sitemap generation logic, and feature/version copy.
 * All values are from the project Ground-Truth Facts — do NOT deviate.
 */

export const SITE_URL = 'https://macos-updates.64bit.site'

export const REPO_URL = 'https://github.com/KasprowiczM/macOS_updates'

export const APP_VERSION = 'v1.7.7'

export const LATEST_TAGGED_VERSION = 'v1.5.5'

export const SYNC_DATE = '2026-11-14'

export const PRODUCT_COUNT = 48

export const PREVIEW_TARGET_LIMIT = 25

export const ACTIVE_RECIPE_COUNT = 0

export const PRODUCTION_NATIVE_DRIVER_COUNT = 0

export const APP_VERSION_DATE = '2026-11-14'

export const TEST_COUNT = 1350

export const TEST_PASSED = 1350

export const TEST_SKIPPED = 0

export const VERIFICATION_DATE = '2026-11-14'

/** Canonical internet-app registry size (`config/internet_apps.txt`). */
export const INTERNET_APP_COUNT = 47

/** Legacy registry capability categories, not necessarily enabled execution paths. */
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
  '/support',
] as const

export type Route = (typeof ROUTES)[number]
