import { type ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface DocLayoutProps {
  title: string
  children: ReactNode
}

export function DocLayout({ title, children }: DocLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <article className="min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-(--fg-muted) hover:text-(--fg) text-[14px] font-medium font-sans no-underline transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <h1
          className="font-bold text-(--fg) font-sans tracking-tight mb-8"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>

        <div className="doc-content font-sans text-(--fg-muted) text-[16px] leading-[1.7] space-y-6">
          {children}
        </div>
      </div>
    </article>
  )
}
