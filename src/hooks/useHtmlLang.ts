import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Keeps `document.documentElement.lang` in sync with the active i18n
 * language — on mount and on every i18next `languageChanged` event.
 *
 * Fixes the bug where `<html lang>` never updated on language switch.
 */
export function useHtmlLang() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const apply = (lng: string) => {
      const langKey = (lng || 'en').split('-')[0].toLowerCase()
      document.documentElement.lang = langKey
    }

    // Sync immediately on mount.
    apply(i18n.language)

    // Sync on every language change, then clean up the listener.
    i18n.on('languageChanged', apply)
    return () => {
      i18n.off('languageChanged', apply)
    }
  }, [i18n])
}

export default useHtmlLang
