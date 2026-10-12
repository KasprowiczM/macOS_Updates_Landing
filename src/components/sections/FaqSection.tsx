import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { getFaqItems } from '../../lib/faq'
import { CONTAINER, SECTION_PAD } from './layout'

/**
 * #faq: the same items the FAQPage JSON-LD is built from (getFaqItems), as
 * native <details> disclosure rows. Answers are always in the DOM.
 */
export function FaqSection() {
  const { t } = useTranslation()
  const items = getFaqItems(t)

  return (
    <section id="faq" aria-labelledby="faq-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-12`}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <h2 id="faq-title" className="m-0">
              {t('faq.title')}
            </h2>
            <p className="mt-5 max-w-[26rem] text-(--fg-muted)">{t('faq.lead')}</p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div className="border-t border-(--rule-strong)">
            {items.map((item, index) => (
              <details key={item.id} open={index === 0} className="group border-b border-(--rule-strong)">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[17px] font-semibold leading-snug text-(--fg) transition-colors duration-(--dur-2) ease-(--ease-out) hover:text-(--accent-text) focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 [overflow-wrap:anywhere]">{item.q}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-(--fg-muted) transition-transform duration-(--dur-2) ease-(--ease-out) group-open:rotate-180"
                  />
                </summary>
                <p className="m-0 max-w-[40rem] pb-6 pr-10 text-(--fg-muted) [overflow-wrap:anywhere]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
