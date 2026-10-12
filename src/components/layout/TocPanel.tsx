import { useEffect, useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface TocSection {
  id: string
  label: string
  /** Secondary readout, right aligned (a date, a count). */
  detail?: string
  children?: TocSection[]
}

interface TocPanelProps {
  sections: TocSection[]
  /** Accessible name and desktop header. Defaults to "On this page". */
  title?: string
}

/** Flat, de-duplicated list of anchor ids, in document order. */
function collectIds(sections: TocSection[]): string[] {
  const seen = new Set<string>()
  const ids: string[] = []
  const walk = (items: TocSection[]) => {
    for (const item of items) {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        ids.push(item.id)
      }
      if (item.children) walk(item.children)
    }
  }
  walk(sections)
  return ids
}

/**
 * Console side panel for in-page navigation. Each entry is a station lamp: the section in view
 * reports GO, the rest stand by. Desktop: sticky beside the content. Mobile: a collapsible
 * "Contents" control above the content (no overlay, nothing covers the text).
 */
export function TocPanel({ sections, title }: TocPanelProps) {
  const { t } = useTranslation()
  const heading = title ?? t('chrome.doc.onThisPage')
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const ids = useMemo(() => collectIds(sections), [sections])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        visible.sort((a, b) => ids.indexOf(a.target.id) - ids.indexOf(b.target.id))
        setActive(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -65% 0px', threshold: 0 },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  const link = (item: TocSection, nested: boolean) => {
    const isActive = active === item.id
    return (
      <a
        href={`#${item.id}`}
        aria-current={isActive ? 'location' : undefined}
        onClick={() => setOpen(false)}
        className={cn(
          'flex min-h-[36px] items-center gap-2.5 py-1.5 pr-3 text-[13.5px] leading-[1.3] no-underline lg:min-h-[32px] lg:py-1',
          nested ? 'pl-5' : 'pl-3',
          isActive ? 'font-semibold text-(--fg) bg-(--accent-soft)' : 'text-(--fg-muted) hover:text-(--fg) hover:bg-(--bg-sunk)',
        )}
      >
        <span aria-hidden="true" className={cn('lamp', isActive ? 'lamp-go' : 'lamp-standby')} />
        <span className="min-w-0 flex-1">{item.label}</span>
        {item.detail && <span className="readout shrink-0 text-[11.5px] text-(--fg-faint)">{item.detail}</span>}
      </a>
    )
  }

  const list = (
    <ul className="m-0 list-none p-0">
      {sections.map((group) => {
        const children = group.children?.length ? group.children : null
        return (
          <li key={group.id + group.label} className="border-b border-(--rule) last:border-b-0">
            {children ? (
              <>
                <p className="placard m-0 px-3 pb-1 pt-3">{group.label}</p>
                <ul className="m-0 mb-1 list-none p-0">
                  {children.map((child) => (
                    <li key={child.id}>{link(child, true)}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="py-0.5">{link(group, false)}</div>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav aria-label={heading} className="lg:sticky lg:top-[calc(var(--nav-h)+24px)] lg:max-h-[calc(100vh-var(--nav-h)-48px)] lg:overflow-y-auto">
      {/* Mobile: collapsible contents */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-sm border border-(--rule-strong) bg-(--bg-elev) px-3 text-left text-(--fg)"
        >
          <span className="placard text-(--fg)">{t('chrome.doc.contents')}</span>
          <ChevronDown size={16} aria-hidden="true" className={cn('transition-transform duration-(--dur-2)', open && 'rotate-180')} />
        </button>
        <div id={panelId} hidden={!open} className="mt-2 rounded-sm border border-(--rule-strong) bg-(--bg-elev)">
          {list}
        </div>
      </div>

      {/* Desktop: sticky console panel */}
      <div className="hidden rounded-sm border border-(--rule-strong) bg-(--bg-elev) lg:block">
        <div className="border-b border-(--rule-strong) bg-(--bg-sunk) px-3 py-2">
          <p className="placard m-0">{heading}</p>
        </div>
        {list}
      </div>
    </nav>
  )
}
