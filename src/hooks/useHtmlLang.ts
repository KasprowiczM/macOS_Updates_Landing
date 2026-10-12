import { useEffect } from 'react'
import { useLang } from '../lib/routes'

/**
 * Keeps `document.documentElement.lang` equal to the language of the current
 * URL ("/pl/*" -> pl, otherwise en). The prerender script already writes the
 * correct `<html lang>` into every static page; this covers client-side
 * navigation and language switches.
 */
export function useHtmlLang() {
  const lang = useLang()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
}

export default useHtmlLang
