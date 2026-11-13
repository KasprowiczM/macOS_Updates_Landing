import { useState } from 'react'
import { ArrowUpRight, Heart } from 'lucide-react'
import { Seo } from '../components/Seo'
import { UpdateMark } from '../components/ui/UpdateMark'
import { getSupportLinks, type SupportCurrency } from '../lib/support'
import { useLang } from '../lib/routes'
import { REPO_URL } from '../lib/site'

const COPY = {
  en: {
    title: 'Support the project',
    description: 'macOS Updates is free and open source. Optional one-time support helps maintain the toolkit.',
    lead: 'macOS Updates is free software under the MIT License. If it saves you time, you can make an optional one-time contribution.',
    note: 'Support is voluntary. The toolkit remains free, and contributions do not unlock features or affect updates.',
    providers: { stripe: 'Continue with Stripe', revolut: 'Continue with Revolut' },
    external: 'The provider handles your payment details and displays its payment status. You choose the amount on its site.',
    pending: 'Stripe is unavailable for this currency. You can still use Revolut.',
    currency: 'Currency for Stripe',
    revolutNote: 'Revolut handles currency and amount in its own payment flow.',
    repo: 'View the source on GitHub',
  },
  pl: {
    title: 'Wesprzyj projekt',
    description: 'macOS Updates jest darmowym projektem open source. Opcjonalne jednorazowe wsparcie pomaga utrzymywać narzędzie.',
    lead: 'macOS Updates jest darmowym oprogramowaniem na licencji MIT. Jeśli oszczędza Twój czas, możesz przekazać opcjonalne jednorazowe wsparcie.',
    note: 'Wsparcie jest dobrowolne. Narzędzie pozostaje darmowe, a wpłaty nie odblokowują funkcji ani aktualizacji.',
    providers: { stripe: 'Kontynuuj przez Stripe', revolut: 'Kontynuuj przez Revolut' },
    external: 'Operator obsługuje dane płatności i wyświetla jej status. Kwotę wybierasz na jego stronie.',
    pending: 'Stripe jest niedostępny dla tej waluty. Możesz nadal skorzystać z Revolut.',
    currency: 'Waluta dla Stripe',
    revolutNote: 'Walutę i kwotę w Revolut wybierasz w jego własnym procesie płatności.',
    repo: 'Zobacz kod w GitHub',
  },
} as const

export function SupportPage() {
  const lang = useLang()
  const copy = COPY[lang]
  const [currency, setCurrency] = useState<SupportCurrency>(lang === 'pl' ? 'PLN' : 'EUR')
  const links = getSupportLinks(currency)
  const hasStripe = links.some(link => link.provider === 'stripe')

  return <>
    <Seo title={copy.title} description={copy.description} path="/support" lang={lang} />
    <main id="main" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      <section className="support-page" aria-labelledby="support-title" lang={lang}>
        <UpdateMark animated replay label={copy.title} className="support-page__mark" />
        <h1 id="support-title" className="mt-8 text-4xl font-semibold tracking-tight text-(--fg) sm:text-6xl">{copy.title}</h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-(--fg-muted)">{copy.lead}</p>
        <p className="mt-4 flex max-w-[62ch] items-start gap-2 text-sm leading-relaxed text-(--fg-muted)"><Heart className="mt-0.5 shrink-0 text-(--accent-text)" size={18} aria-hidden="true" />{copy.note}</p>
        <div className="mt-8 flex max-w-64 flex-col gap-2 text-sm text-(--fg-muted)"><label htmlFor="support-currency">{copy.currency}</label><select id="support-currency" className="min-h-[44px] rounded-[2px] border border-(--rule-strong) bg-(--bg) px-3 text-(--fg) focus-visible:ring-2 focus-visible:ring-(--accent)" value={currency} onChange={event => setCurrency(event.target.value as SupportCurrency)}><option value="PLN">PLN</option><option value="EUR">EUR</option><option value="USD">USD</option></select></div>
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map(({ provider, url }) => <a key={provider} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-[2px] border border-(--rule-strong) px-4 py-2 text-sm font-semibold text-(--fg) no-underline hover:border-(--accent) hover:text-(--accent-text) focus-visible:ring-2 focus-visible:ring-(--accent)">{copy.providers[provider]}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
        </div>
        {!hasStripe && <p className="mt-3 text-sm text-(--fg-muted)">{copy.pending}</p>}
        <p className="mt-3 max-w-[60ch] text-sm text-(--fg-muted)">{copy.external}</p>
        <p className="mt-2 max-w-[60ch] text-sm text-(--fg-muted)">{copy.revolutNote}</p>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[44px] items-center text-sm font-medium text-(--accent-text) underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-(--accent)">{copy.repo}<ArrowUpRight className="ml-1" size={15} aria-hidden="true" /></a>
      </section>
    </main>
  </>
}
