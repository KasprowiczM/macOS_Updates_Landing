import { type ReactNode, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Menu, X, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface WikiSection {
  id: string
  label: string
  icon?: ReactNode
  children?: WikiSection[]
}

interface WikiLayoutProps {
  title: string
  sections: WikiSection[]
  children: ReactNode
}

export function WikiLayout({ title, sections, children }: WikiLayoutProps) {
  const { i18n } = useTranslation()
  const pl = i18n.language === 'pl'
  const [activeSection, setActiveSection] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSectionClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 100
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setSidebarOpen(false)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const seen = new Set<string>()
    const allIds: string[] = []
    const collectIds = (items: WikiSection[]) => {
      items.forEach(s => {
        if (!seen.has(s.id)) {
          seen.add(s.id)
          allIds.push(s.id)
        }
        if (s.children) collectIds(s.children)
      })
    }
    collectIds(sections)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const sorted = visible.sort((a, b) => {
            return allIds.indexOf(a.target.id) - allIds.indexOf(b.target.id)
          })
          setActiveSection(sorted[0].target.id)
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    )

    allIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const renderSidebarItems = (items: WikiSection[], depth = 0) => (
    <ul className={depth === 0 ? 'space-y-1' : 'space-y-0.5 mt-1'}>
      {items.map(section => {
        const isActive = activeSection === section.id
        const hasActiveChild = section.children?.some(c => activeSection === c.id) ?? false
        return (
          <li key={section.id}>
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`
                w-full text-left text-[13px] font-sans rounded-sm px-3 py-1.5 transition-all duration-150 cursor-pointer border-0 bg-transparent
                ${depth > 0 ? 'ml-3 text-[12px]' : ''}
                ${isActive
                  ? 'bg-(--accent-soft) text-(--accent-strong) font-semibold'
                  : hasActiveChild
                    ? 'text-(--fg) font-medium'
                    : 'text-(--fg-muted) hover:text-(--fg) hover:bg-(--bg-sunk)'
                }
              `}
            >
              <span className="flex items-center gap-1.5">
                {section.icon}
                {section.label}
                {section.children && section.children.length > 0 && (
                  <ChevronRight size={10} className={`ml-auto transition-transform ${hasActiveChild || isActive ? 'rotate-90' : ''}`} />
                )}
              </span>
            </button>
            {section.children && section.children.length > 0 && renderSidebarItems(section.children, depth + 1)}
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 rounded-md bg-(--bg-elev) border border-(--border) shadow-(--shadow-sm) flex items-center justify-center text-(--fg-muted) hover:text-(--fg) cursor-pointer transition-colors"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 left-0 z-40 lg:z-auto
          w-[280px] lg:w-[240px] h-[calc(100vh-5rem)] shrink-0
          bg-(--bg) lg:bg-transparent
          border-r border-(--border) lg:border-0
          overflow-y-auto overscroll-contain
          px-4 py-6
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-(--fg-muted) hover:text-(--fg) text-[13px] font-medium font-sans no-underline transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            {pl ? 'Strona główna' : 'Back to home'}
          </Link>

          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-(--fg-faint) font-sans mb-3 px-3">
            {title}
          </h2>

          <nav>
            {renderSidebarItems(sections)}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pl-0 lg:pl-12 py-8 pb-24">
          <div className="max-w-[820px]">
            <h1
              className="font-bold text-(--fg) font-sans tracking-tight mb-10"
              style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
            >
              {title}
            </h1>

            <div className="wiki-content font-sans text-(--fg-muted) text-[15.5px] leading-[1.7] space-y-12 break-words">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
