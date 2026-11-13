export type SupportCurrency = 'EUR' | 'USD' | 'PLN'
export type SupportProvider = 'revolut' | 'stripe'

const REVOLUT_URL = 'https://revolut.me/micha3ru'
const STRIPE_URLS: Record<SupportCurrency, string | undefined> = {
  EUR: import.meta.env.VITE_SUPPORT_EUR_URL ?? 'https://donate.stripe.com/14AfZjcwR4d9cWu3IO0Ny04',
  USD: import.meta.env.VITE_SUPPORT_USD_URL ?? 'https://donate.stripe.com/8x2cN7dAVcJF6y66V00Ny05',
  PLN: import.meta.env.VITE_SUPPORT_PLN_URL ?? 'https://donate.stripe.com/fZu14pfJ36lh5u23IO0Ny03',
}

function validRevolutUrl(value: string): string | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.hostname !== 'revolut.me' || url.port || url.username || url.password || url.search || url.hash) return null
    const parts = url.pathname.split('/')
    if (parts.length !== 2 || !/^[A-Za-z0-9._~-]+$/.test(parts[1]) || parts[1] === '.' || parts[1] === '..') return null
    return url.toString()
  } catch { return null }
}

function validStripeUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || !['buy.stripe.com', 'checkout.stripe.com', 'donate.stripe.com'].includes(url.hostname) || url.port || url.username || url.password || url.hash || url.pathname === '/') return null
    if (/test_|cs_test_/i.test(url.pathname)) return null
    return url.toString()
  } catch { return null }
}

export function getSupportLinks(currency: SupportCurrency): { provider: SupportProvider; url: string }[] {
  const links: { provider: SupportProvider; url: string }[] = []
  const stripe = validStripeUrl(STRIPE_URLS[currency])
  const revolut = validRevolutUrl(REVOLUT_URL)
  if (stripe) links.push({ provider: 'stripe', url: stripe })
  if (revolut) links.push({ provider: 'revolut', url: revolut })
  return links
}
