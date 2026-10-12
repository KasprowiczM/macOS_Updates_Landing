import { type ReactNode } from 'react'
import { DocLayout } from './DocLayout'
import type { TocSection } from './TocPanel'

export type WikiSection = TocSection

interface WikiLayoutProps {
  title: string
  sections: WikiSection[]
  children: ReactNode
  lead?: string
}

/** Documentation shell: the Read layout with the grouped contents panel. */
export function WikiLayout({ title, sections, children, lead }: WikiLayoutProps) {
  return (
    <DocLayout title={title} lead={lead} toc={sections}>
      {children}
    </DocLayout>
  )
}
