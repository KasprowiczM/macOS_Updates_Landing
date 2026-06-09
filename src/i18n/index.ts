import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pl from './locales/pl.json'

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('macos-updates-lang') : null

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  lng: savedLang || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
