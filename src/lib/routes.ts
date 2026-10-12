import { useLocation } from 'react-router-dom'
import { ROUTES } from './site'

/**
 * Locale-aware routing helpers.
 *
 * Language is derived from the URL path and nothing else:
 *   English  -> "/", "/docs", ...        (root URLs, unchanged)
 *   Polish   -> "/pl", "/pl/docs", ...
 */

export const LANGS = ['en', 'pl'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

const PL_PREFIX = '/pl'

/** Base (English) route paths, in sitemap order. */
export const BASE_ROUTES: readonly string[] = ROUTES

export function isLang(value: string | null | undefined): value is Lang {
  return value === 'en' || value === 'pl'
}

/** "/pl", "/pl/docs" -> "pl"; everything else -> "en". */
export function langFromPathname(pathname: string): Lang {
  return pathname === PL_PREFIX || pathname.startsWith(`${PL_PREFIX}/`) ? 'pl' : 'en'
}

/** Normalise a pathname: ensure leading slash, drop trailing slash (except root). */
export function normalizePath(pathname: string): string {
  let p = pathname || '/'
  if (!p.startsWith('/')) p = `/${p}`
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p
}

/** "/pl/docs" -> "/docs", "/pl" -> "/", "/docs" -> "/docs". */
export function stripLangPrefix(pathname: string): string {
  const p = normalizePath(pathname)
  if (p === PL_PREFIX) return '/'
  if (p.startsWith(`${PL_PREFIX}/`)) return p.slice(PL_PREFIX.length)
  return p
}

/**
 * Convert a language-neutral path (optionally with ?query and #hash) to the
 * URL for `lang`. "/docs#quick-install" + "pl" -> "/pl/docs#quick-install";
 * "/#how-it-works" + "pl" -> "/pl#how-it-works". Absolute URLs and bare
 * hashes are returned unchanged.
 */
export function localizedPath(path: string, lang: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//') || path.startsWith('#')) return path
  const match = /^([^?#]*)(.*)$/.exec(path)
  const pathname = match?.[1] ?? path
  const suffix = match?.[2] ?? ''
  const base = stripLangPrefix(pathname || '/')
  if (lang !== 'pl') return `${base}${suffix}`
  return `${base === '/' ? PL_PREFIX : `${PL_PREFIX}${base}`}${suffix}`
}

/** Path of the same page in the other language, preserving ?query and #hash. */
export function alternateLangPath(pathname: string, target: Lang, search = '', hash = ''): string {
  return `${localizedPath(stripLangPrefix(pathname), target)}${search}${hash}`
}

/** Every public URL (path only) for every language, English first. */
export function allLocalizedRoutes(): { path: string; lang: Lang; base: string }[] {
  const out: { path: string; lang: Lang; base: string }[] = []
  for (const lang of LANGS) {
    for (const base of BASE_ROUTES) {
      out.push({ path: localizedPath(base, lang), lang, base })
    }
  }
  return out
}

/** Current language, derived from the router location. */
export function useLang(): Lang {
  return langFromPathname(useLocation().pathname)
}

/** Returns a function that localizes language-neutral paths for the current URL language. */
export function useLocalizedPath(): (path: string) => string {
  const lang = useLang()
  return (path: string) => localizedPath(path, lang)
}

const LANG_PREF_KEY = 'macos-updates-lang'

/**
 * Remembered language choice. It is only ever a SUGGESTION (e.g. to render a
 * "Switch to Polski?" prompt); nothing redirects based on it and it never
 * influences which language a URL renders.
 */
export function readSavedLangPreference(): Lang | null {
  try {
    const saved = localStorage.getItem(LANG_PREF_KEY)
    return isLang(saved) ? saved : null
  } catch {
    return null
  }
}

export function saveLangPreference(lang: Lang): void {
  try {
    localStorage.setItem(LANG_PREF_KEY, lang)
  } catch { /* storage unavailable */ }
}
