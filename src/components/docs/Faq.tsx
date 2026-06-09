import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { WikiSection } from './WikiSection'
import { FAQ_ITEMS } from '../../lib/faq'

/**
 * FAQ — EN uses the canonical `FAQ_ITEMS` shared with schema.
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
      <div className="rounded-md border border-(--border) divide-y divide-(--border) overflow-hidden">
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
                  className="w-full flex items-start justify-between gap-3 text-left px-4 sm:px-5 py-4 bg-transparent border-0 cursor-pointer text-(--fg) font-semibold text-[15px] font-sans hover:bg-(--bg-sunk) transition-colors"
                >
                  <span className="min-w-0 break-words">{question}</span>
                  <ChevronDown
                    size={16}
                    className={`mt-0.5 shrink-0 text-(--fg-muted) transition-transform duration-(--dur-2) ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </h3>
              {isOpen && (
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className="px-4 sm:px-5 pb-4 text-[14px] leading-[1.7] text-(--fg-muted) break-words [overflow-wrap:anywhere]"
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
