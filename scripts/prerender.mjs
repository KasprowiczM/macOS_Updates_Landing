#!/usr/bin/env node
/**
 * Static prerender (SSG) for every route, both languages.
 *
 * Run after `vite build` (client -> dist/) and `vite build --ssr src/entry-server.tsx
 * --outDir dist-server`. For each route it:
 *   1. renders <App/> through dist-server/entry-server.js (React 19 prerenderToNodeStream),
 *   2. lifts the head tags React hoisted (title, meta, link) out of the markup,
 *   3. injects them + JSON-LD into <head> of the built dist/index.html template exactly once,
 *   4. injects the markup into #root and writes dist/<route>/index.html (plus <route>.html,
 *      the file Vercel serves for cleanUrls) and dist/404.html (noindex).
 * It also generates dist/sitemap.xml from the same route list (single source).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const serverEntry = join(root, 'dist-server', 'entry-server.js')

const HEAD_MARK = '<!--app-head-->'
const HTML_MARK = '<!--app-html-->'

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Split React's hoisted head tags (always a leading run of title/meta/link) from the app markup. */
function splitHoisted(html) {
  const re = /^(?:<title>[\s\S]*?<\/title>|<meta\s[^>]*>|<link\s[^>]*>)+/
  const match = re.exec(html)
  if (!match) return { head: '', body: html }
  const head = match[0]
    // React serialises the JSX prop name; the HTML attribute is lower-case.
    .replace(/\shrefLang=/g, ' hreflang=')
    // React 19 does not adopt server head tags during hydration (it inserts its own copies),
    // so tag the ones Seo owns; <Seo> removes them on mount, leaving exactly one set.
    .replace(/<(title|meta)(?=[\s>])/g, '<$1 data-ssr-head')
    .replace(/<link(?=\s+rel="(?:canonical|alternate)")/g, '<link data-ssr-head')
  return { head, body: html.slice(match[0].length) }
}

function injectPage(template, { lang, route, head, body, jsonLd }) {
  const ldTags = jsonLd.map((json) => `<script type="application/ld+json" data-seo-jsonld>${json}</script>`).join('')
  if (!template.includes(HEAD_MARK) || !template.includes(HTML_MARK)) {
    throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> markers (see index.html)')
  }
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(HEAD_MARK, () => `${head}${ldTags}`)
    .replace('<div id="root">' + HTML_MARK, () => `<div id="root" data-prerendered="${route}">${body}`)
}

function buildSitemap({ siteUrl, lastmod, routes }) {
  const byBase = new Map()
  for (const r of routes) {
    if (!byBase.has(r.base)) byBase.set(r.base, {})
    byBase.get(r.base)[r.lang] = `${siteUrl}${r.path}`
  }
  const urls = []
  for (const r of routes) {
    const alts = byBase.get(r.base)
    const links = [
      `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(alts.en)}"/>`,
      `<xhtml:link rel="alternate" hreflang="pl" href="${escapeXml(alts.pl)}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alts.en)}"/>`,
    ].join('\n    ')
    urls.push(
      `  <url>\n    <loc>${escapeXml(`${siteUrl}${r.path}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    ${links}\n  </url>`,
    )
  }
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n'
  )
}

async function writeFileDeep(path, content) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content)
}

async function main() {
  const template = await readFile(join(distDir, 'index.html'), 'utf8')
  const { render, siteManifest } = await import(pathToFileURL(serverEntry).href)

  let count = 0
  for (const { path, lang } of siteManifest.routes) {
    const { html, jsonLd } = await render(path)
    const { head, body } = splitHoisted(html)
    if (!/<title[\s>]/.test(head)) throw new Error(`No <title> hoisted for ${path}; Seo head tags were not rendered`)
    const page = injectPage(template, { lang, route: path, head, body, jsonLd })

    if (path === '/') {
      await writeFileDeep(join(distDir, 'index.html'), page)
    } else {
      await writeFileDeep(join(distDir, path, 'index.html'), page)
      // Vercel (cleanUrls: true) serves /docs from docs.html; keep both so every host resolves it.
      await writeFileDeep(join(distDir, `${path}.html`), page)
    }
    count++
  }

  // 404 page: rendered through the router's catch-all, noindex, never hydrated ("*").
  {
    const { html, jsonLd } = await render('/404')
    const { head, body } = splitHoisted(html)
    await writeFileDeep(
      join(distDir, '404.html'),
      injectPage(template, { lang: 'en', route: '*', head, body, jsonLd }),
    )
  }

  await writeFileDeep(join(distDir, 'sitemap.xml'), buildSitemap(siteManifest))

  // llms-full.txt carries {{TOKENS}} so version facts always come from src/lib/site.ts.
  const llmsPath = join(distDir, 'llms-full.txt')
  let llms = await readFile(llmsPath, 'utf8')
  for (const [key, value] of Object.entries(siteManifest.tokens)) llms = llms.replaceAll(`{{${key}}}`, value)
  const unresolved = llms.match(/\{\{[A-Z_]+\}\}/g)
  if (unresolved) throw new Error(`Unresolved tokens in llms-full.txt: ${unresolved.join(', ')}`)
  await writeFile(llmsPath, llms)
  console.log(`prerender: ${count} routes + 404.html + sitemap.xml written to dist/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
