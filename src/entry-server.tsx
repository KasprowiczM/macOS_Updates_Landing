import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom'
import './i18n'
import App from './App'
import { SeoCollectorContext, type SeoCollector } from './lib/seoContext'
import { allLocalizedRoutes, stripLangPrefix } from './lib/routes'
import { APP_VERSION, APP_VERSION_DATE, SITE_URL, TEST_COUNT } from './lib/site'
import { isPagePath, pageLoaders } from './lib/pageLoaders'

export interface RenderResult {
  /** Markup for #root (head tags React hoisted are still inside; the prerender script lifts them out). */
  html: string
  /** Serialized JSON-LD documents collected from <Seo>. */
  jsonLd: string[]
}

/** Renders the app for `url` (a pathname such as "/pl/docs") with React 19 static prerender. */
export async function render(url: string): Promise<RenderResult> {
  // Make sure the route chunk is resolved before rendering (React.lazy would also be awaited by prerender).
  const base = stripLangPrefix(url)
  if (isPagePath(base)) await pageLoaders[base]()

  let jsonLd: string[] = []
  const collector: SeoCollector = { setJsonLd: (documents) => { jsonLd = documents } }
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <SeoCollectorContext.Provider value={collector}>
        <HelmetProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </SeoCollectorContext.Provider>
    </StrictMode>,
  )

  const decoder = new TextDecoder()
  let html = ''
  for await (const chunk of prelude as AsyncIterable<Uint8Array | string>) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true })
  }
  html += decoder.decode()
  return { html, jsonLd }
}

/** Build metadata consumed by scripts/prerender.mjs (route list, sitemap inputs). */
export const siteManifest = {
  siteUrl: SITE_URL,
  lastmod: APP_VERSION_DATE,
  /** Values substituted into {{TOKENS}} of dist/llms-full.txt. */
  tokens: { APP_VERSION, APP_VERSION_DATE, TEST_COUNT: String(TEST_COUNT) },
  routes: allLocalizedRoutes(),
}
