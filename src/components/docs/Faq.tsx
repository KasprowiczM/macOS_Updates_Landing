import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { WikiSection } from './WikiSection'
import { FAQ_ITEMS } from '../../lib/faq'

/**
 * FAQ: EN uses the canonical `FAQ_ITEMS` shared with schema.
 * PL renders translated locale strings so the visible docs page is localized.
 */
export function Faq({ pl = false }: { pl?: boolean }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null)

  const toggle = useCallback((id: string) => {
    setOpen((cur) => (cur === id ? null : id))
  }, [])

  return (
    <WikiSection id="faq" title={pl ? 'Najczęściej zadawane pytania' : 'Frequently Asked Questions'}>
      <div className="max-w-[68ch] divide-y divide-(--rule) border-y border-(--rule-strong)">
        {FAQ_ITEMS.map((item) => {
          const isOpen = open === item.id
          const question = pl ? t(`faq.items.${item.id}.q`) : item.q
          const answer = pl ? t(`faq.items.${item.id}.a`) : item.a
          return (
            <div key={item.id}>
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-trigger-${item.id}`}
                  className="flex min-h-[52px] w-full cursor-pointer items-start justify-between gap-4 border-0 bg-transparent px-1 py-3.5 text-left font-sans text-[17px] font-semibold leading-snug text-(--fg) transition-colors duration-(--dur-2) hover:bg-(--bg-sunk)"
                >
                  <span className="min-w-0 break-words">{question}</span>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`mt-1 shrink-0 text-(--fg-muted) transition-transform duration-(--dur-2) ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </h3>
              {isOpen && (
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className="px-1 pb-5 pr-8 text-[16px] leading-[1.65] text-(--fg-muted) break-words [overflow-wrap:anywhere]"
                >
                  {answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </WikiSection>
  )
}
