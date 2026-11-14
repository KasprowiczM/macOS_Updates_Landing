import i18n, { type i18n as I18nInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pl from './locales/pl.json'
import chromeEn from './locales/chrome.en.json'
import chromePl from './locales/chrome.pl.json'
import type { Lang } from '../lib/routes'
import { APP_VERSION, LATEST_TAGGED_VERSION, TEST_COUNT } from '../lib/site'

/**
 * i18n bootstrap.
 *
 * The URL is the single source of truth for language (see src/lib/routes.ts):
 * "/pl/*" is Polish, everything else is English. There is NO localStorage- or
 * navigator-driven language selection here; that used to serve EN and PL at one
 * URL. The base instance is initialised in English and `getI18n(lang)` hands out
 * one fixed instance per language (sharing the same resource store), which
 * <LangProvider> in App.tsx feeds to react-i18next based on the route. This is
 * SSR-safe: no global language mutation, no races between prerendered routes.
 */
i18n.use(initReactI18next).init({
  resources: {
    // chrome.* holds the shared site chrome (nav, footer, subpage UI); merged under its own top-level key.
    en: { translation: { ...en, ...chromeEn } },
    pl: { translation: { ...pl, ...chromePl } },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  interpolation: { escapeValue: false, defaultVariables: { version: APP_VERSION, latestTag: LATEST_TAGGED_VERSION, tests: TEST_COUNT } },
  react: { useSuspense: false },
})

const instances: Partial<Record<Lang, I18nInstance>> = { en: i18n }

/** Fixed i18n instance for a language (cached, shares the resource store). */
export function getI18n(lang: Lang): I18nInstance {
  const cached = instances[lang]
  if (cached) return cached
  const clone = i18n.cloneInstance({ lng: lang })
  instances[lang] = clone
  return clone
}

export default i18n
