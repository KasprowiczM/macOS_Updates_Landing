import type { ComponentType } from 'react'

/**
 * Dynamic importers for the route components. Shared by App (React.lazy) and
 * main.tsx, which awaits the current route's chunk before hydrating so the
 * prerendered markup is adopted instead of being replaced by a Suspense fallback.
 */
export const pageLoaders = {
  '/': () => import('../pages/LandingPage').then((m) => ({ default: m.LandingPage })),
  '/features': () => import('../pages/FeaturesPage').then((m) => ({ default: m.FeaturesPage })),
  '/docs': () => import('../pages/DocsPage').then((m) => ({ default: m.DocsPage })),
  '/security': () => import('../pages/SecurityPage').then((m) => ({ default: m.SecurityPage })),
  '/changelog': () => import('../pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage })),
  '/contributing': () => import('../pages/ContributingPage').then((m) => ({ default: m.ContributingPage })),
} as const

export type PagePath = keyof typeof pageLoaders

type PageComponent = ComponentType<object>

/** Modules already loaded, readable synchronously so hydration never suspends on them. */
const loadedPages: Partial<Record<PagePath, PageComponent>> = {}

/** Loads a route chunk once and remembers its component. */
export async function preloadPage(path: PagePath): Promise<{ default: PageComponent }> {
  const mod = await pageLoaders[path]()
  loadedPages[path] = mod.default as PageComponent
  return { default: mod.default as PageComponent }
}

export function getLoadedPage(path: PagePath): PageComponent | undefined {
  return loadedPages[path]
}

export function isPagePath(path: string): path is PagePath {
  return Object.prototype.hasOwnProperty.call(pageLoaders, path)
}
