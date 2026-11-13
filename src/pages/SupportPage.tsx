import { useState } from 'react'
import { ArrowUpRight, Heart } from 'lucide-react'
import { Seo } from '../components/Seo'
import { UpdateMark } from '../components/ui/UpdateMark'
import { PaymentProviderMark } from '../components/ui/PaymentProviderMark'
import { PaymentMethodMark } from '../components/ui/PaymentMethodMark'
import { getSupportLinks, type SupportCurrency, type SupportProvider } from '../lib/support'
import { useLang } from '../lib/routes'
import { REPO_URL } from '../lib/site'
import './SupportPage.css'

const CURRENCIES: { code: SupportCurrency; symbol: string }[] = [
  { code: 'EUR', symbol: '€' }, { code: 'USD', symbol: '$' }, { code: 'PLN', symbol: 'zł' },
]

const COPY = {
  en: {
    title: 'Support the project',
    description: 'macOS Updates is free and open source. Optional one-time support helps maintain the toolkit.',
    lead: 'macOS Updates is free software under the MIT License. If it saves you time, you can make an optional one-time contribution.',
    note: 'Support is voluntary. The toolkit remains free, and contributions do not unlock features or affect updates.',
    repo: 'View the source on GitHub',
    panel: 'Make a contribution', currency: 'Currency for Stripe', provider: 'Payment provider',
    currencies: { EUR: 'Euro', USD: 'US dollar', PLN: 'Polish złoty' },
    methods: 'Supported payment methods', card: 'Card', revolutPay: 'Revolut transfer',
    methodsNote: 'The provider determines which methods appear based on your country, device and amount.',
    stripeNote: 'Choose your amount on Stripe. Stripe handles your payment details and displays its status.',
    revolutNote: 'Revolut handles the currency and amount in its own payment flow and displays the payment status.',
    pending: 'Stripe is unavailable for this currency. You can still use Revolut.',
    unavailable: 'This payment provider is currently unavailable.',
    continueWith: { stripe: 'Continue with Stripe', revolut: 'Continue with Revolut' },
    once: 'Optional one-time support',
  },
  pl: {
    title: 'Wesprzyj projekt',
    description: 'macOS Updates jest darmowym projektem open source. Opcjonalne jednorazowe wsparcie pomaga utrzymywać narzędzie.',
    lead: 'macOS Updates jest darmowym oprogramowaniem na licencji MIT. Jeśli oszczędza Twój czas, możesz przekazać opcjonalne jednorazowe wsparcie.',
    note: 'Wsparcie jest dobrowolne. Narzędzie pozostaje darmowe, a wpłaty nie odblokowują funkcji ani aktualizacji.',
    repo: 'Zobacz kod w GitHub',
    panel: 'Przekaż wsparcie', currency: 'Waluta dla Stripe', provider: 'Operator płatności',
    currencies: { EUR: 'Euro', USD: 'Dolar amerykański', PLN: 'Polski złoty' },
    methods: 'Obsługiwane metody płatności', card: 'Karta', revolutPay: 'Przelew Revolut',
    methodsNote: 'Operator decyduje, które metody wyświetlić, zależnie od kraju, urządzenia i kwoty.',
    stripeNote: 'Kwotę wybierasz w Stripe. Stripe obsługuje dane płatności i wyświetla jej status.',
    revolutNote: 'Walutę i kwotę wybierasz w Revolut. Operator wyświetla też status płatności.',
    pending: 'Stripe jest niedostępny dla tej waluty. Możesz nadal skorzystać z Revolut.',
    unavailable: 'Ten operator płatności jest obecnie niedostępny.',
    continueWith: { stripe: 'Kontynuuj przez Stripe', revolut: 'Kontynuuj przez Revolut' },
    once: 'Opcjonalne jednorazowe wsparcie',
  },
} as const

export function SupportPage() {
  const lang = useLang()
  return <SupportPageContent key={lang} lang={lang} />
}

function SupportPageContent({ lang }: { lang: 'en' | 'pl' }) {
  const copy = COPY[lang]
  const [currency, setCurrency] = useState<SupportCurrency>(lang === 'pl' ? 'PLN' : 'EUR')
  const [selectedProvider, setSelectedProvider] = useState<SupportProvider>('stripe')
  const links = getSupportLinks(currency)
  const stripe = links.find(link => link.provider === 'stripe')
  const revolut = links.find(link => link.provider === 'revolut')
  const provider = selectedProvider === 'stripe' && !stripe && revolut ? 'revolut' : selectedProvider
  const selectedLink = links.find(link => link.provider === provider)
  const methods = provider === 'stripe'
    ? [{ id: 'card', label: copy.card }, { id: 'applepay', label: 'Apple Pay' }, { id: 'link', label: 'Link' }, ...(currency === 'PLN' ? [{ id: 'blik', label: 'BLIK' }] : currency === 'EUR' ? [{ id: 'bancontact', label: 'Bancontact' }, { id: 'eps', label: 'EPS' }, { id: 'mbway', label: 'MB WAY' }, { id: 'satispay', label: 'Satispay' }] : [])]
    : [{ id: 'revolut', label: copy.revolutPay }, { id: 'card', label: copy.card }, { id: 'applepay', label: 'Apple Pay' }]

  return <>
    <Seo title={copy.title} description={copy.description} path="/support" lang={lang} />
    <main id="main" className="support-layout" lang={lang}>
      <section className="support-layout__hero" aria-labelledby="support-title">
        <div className="support-layout__intro">
          <UpdateMark animated replay label={copy.title} className="support-layout__mark" />
          <h1 id="support-title">{copy.title}</h1>
          <p className="support-layout__lead">{copy.lead}</p>
          <p className="support-layout__note"><Heart size={18} aria-hidden="true" />{copy.note}</p>
          <a className="support-layout__repo" href={REPO_URL} target="_blank" rel="noopener noreferrer">{copy.repo}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <section className="support-layout__panel" aria-labelledby="support-panel-title">
          <h2 id="support-panel-title">{copy.panel}</h2>
          <p className="support-layout__label" id="support-currency-label">{copy.currency}</p>
          <div className="support-layout__currencies" role="group" aria-labelledby="support-currency-label">
            {CURRENCIES.map(({ code, symbol }) => <button key={code} type="button" aria-pressed={currency === code} onClick={() => setCurrency(code)}>
              <span className="support-layout__symbol" aria-hidden="true">{symbol}</span><span className="support-layout__code">{code}</span><small>{copy.currencies[code]}</small>
            </button>)}
          </div>
          <p className="support-layout__label" id="support-provider-label">{copy.provider}</p>
          <div className="support-layout__providers" role="group" aria-labelledby="support-provider-label">
            {(['stripe', 'revolut'] as const).map(option => <button key={option} type="button" aria-pressed={provider === option} disabled={!links.some(link => link.provider === option)} onClick={() => setSelectedProvider(option)}><PaymentProviderMark provider={option} /><span>{option === 'stripe' ? 'Stripe' : 'Revolut'}</span></button>)}
          </div>
          {!stripe && <p className="support-layout__availability" role="status">{copy.pending}</p>}
          {selectedLink && <div className="support-layout__methods" aria-live="polite" aria-atomic="true">
            <p className="support-layout__methods-title">{copy.methods}</p>
            <ul>{methods.map(method => <li key={method.id}><PaymentMethodMark method={method.id} />{method.label}</li>)}</ul>
            <p>{copy.methodsNote}</p>
          </div>}
          <p className="support-layout__payment-note">{selectedLink ? (provider === 'stripe' ? copy.stripeNote : copy.revolutNote) : copy.unavailable}</p>
          {selectedLink ? <a className="support-layout__continue" href={selectedLink.url} target="_blank" rel="noopener noreferrer">{copy.continueWith[provider]}<ArrowUpRight size={16} aria-hidden="true" /></a> : <button className="support-layout__continue" disabled type="button">{copy.unavailable}</button>}
          <p className="support-layout__once">{copy.once}</p>
        </section>
      </section>
    </main>
  </>
}
