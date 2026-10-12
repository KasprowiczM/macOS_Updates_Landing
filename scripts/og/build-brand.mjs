// Builds the brand mark assets for public/ and design_system/assets/.
//   node scripts/og/build-brand.mjs
// Source of truth for the geometry is src/components/ui/Logo.tsx (same numbers, 64-unit grid).
// Needs Inkscape for PNG export. Wordmark outlines come from scripts/og/wordmark.json
// (run build-wordmark.mjs first if it is missing).
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '../..')
const pub = (f) => join(root, 'public', f)

const PALETTE = {
  light: {
    bezel: '#0D1B2A', rim: '#2A3F55', screw: '#6A829C', seat: '#050B12',
    lens: '#1F5FA8', lensEdge: '#174B85', legend: '#EEF2F5', cut: '#050B12', cutOp: 0.55,
    word: '#0D1B2A',
  },
  dark: {
    bezel: '#1B2B3E', rim: '#3A5068', screw: '#7C95B0', seat: '#0B1621',
    lens: '#5DB0FF', lensEdge: '#3E8EDB', legend: '#0D1B2A', cut: '#B5DEFF', cutOp: 0.9,
    word: '#E4EDF5',
  },
}
const CHEVRON = 'M32 21.5L45.5 35V44.5L32 31L18.5 44.5V35Z'
const SCREWS = [
  [7.4, 7.4, 28], [56.6, 7.4, -52], [7.4, 56.6, 76], [56.6, 56.6, -14],
]

/** The lamp on the 4..60 grid (56 units). opts: screws, rim, edge, radius. */
function lamp(c, { screws = true, rim = true, edge = true, radius = 3, cut = true } = {}) {
  let s = `<rect x="4" y="4" width="56" height="56" rx="${radius}" fill="${c.bezel}"/>`
  if (rim) s += `<rect x="10" y="10" width="44" height="44" rx="1.5" fill="none" stroke="${c.rim}" stroke-width="1.2"/>`
  if (screws) {
    for (const [x, y, a] of SCREWS) {
      s += `<circle cx="${x}" cy="${y}" r="1.45" fill="${c.screw}"/>`
      s += `<line x1="${x - 1.05}" y1="${y}" x2="${x + 1.05}" y2="${y}" stroke="${c.bezel}" stroke-width="0.5" transform="rotate(${a} ${x} ${y})"/>`
    }
  }
  if (rim) s += `<rect x="12" y="12" width="40" height="40" rx="2.6" fill="${c.seat}"/>`
  s += `<rect x="13.4" y="13.4" width="37.2" height="37.2" rx="1.8" fill="${c.lens}"/>`
  if (edge) s += `<rect x="15.6" y="15.6" width="32.8" height="32.8" rx="0.9" fill="none" stroke="${c.lensEdge}" stroke-width="0.7"/>`
  if (cut) s += `<path d="${CHEVRON}" transform="translate(0 1.1)" fill="${c.cut}" fill-opacity="${c.cutOp}"/>`
  s += `<path d="${CHEVRON}" fill="${c.legend}"/>`
  return s
}

const svg = (vb, body, label = 'macOS Updates') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${label}">${body}</svg>\n`

const write = (file, text) => writeFileSync(file, text)
const png = (src, out, w, h = w) =>
  execFileSync('inkscape', [src, '-w', String(w), '-h', String(h), '-o', out], { stdio: 'ignore' })

// 1. Marks (bezel only, 1 unit of air)
const markLight = svg('3 3 58 58', lamp(PALETTE.light))
const markDark = svg('3 3 58 58', lamp(PALETTE.dark))
write(pub('brand-icon.svg'), markLight)
write(pub('brand-icon-dark.svg'), markDark)
write(join(root, 'design_system/assets/macos-updates-mark.svg'), markLight)
write(join(root, 'design_system/assets/macos-updates-mark-dark.svg'), markDark)

// 2. Favicon: simplified silhouette (no screws/rim), adapts to the browser's color scheme.
const fav = (c) => `<rect width="32" height="32" rx="2" fill="${c.bezel}"/><rect x="4.25" y="4.25" width="23.5" height="23.5" rx="1.5" fill="${c.lens}"/><path d="M16 8.7L24.3 17.1V22.9L16 14.6L7.7 22.9V17.1Z" fill="${c.legend}"/>`
const L = PALETTE.light, D = PALETTE.dark
write(
  pub('favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="macOS Updates"><style>.b{fill:${L.bezel}}.l{fill:${L.lens}}.g{fill:${L.legend}}@media (prefers-color-scheme:dark){.b{fill:${D.bezel}}.l{fill:${D.lens}}.g{fill:${D.legend}}}</style><rect class="b" width="32" height="32" rx="2"/><rect class="l" x="4.25" y="4.25" width="23.5" height="23.5" rx="1.5"/><path class="g" d="M16 8.7L24.3 17.1V22.9L16 14.6L7.7 22.9V17.1Z"/></svg>\n`,
)
write(pub('favicon-light.svg'), svg('0 0 32 32', fav(L)))
write(pub('favicon-dark.svg'), svg('0 0 32 32', fav(D)))

// 3. Bleed icons (opaque, sharp corners; the OS applies its own mask). No screws near the corners.
const k = 64 / 56
const bleed = (c) =>
  `<g transform="scale(${k}) translate(-4 -4)">${lamp(c, { screws: false, radius: 0 })}</g>`
const bleedSvg = svg('0 0 64 64', bleed(L))
// Maskable: everything inside the central 80% circle (radius 25.6 of 64).
const maskable = svg(
  '0 0 64 64',
  `<rect width="64" height="64" fill="${L.bezel}"/><g transform="translate(32 32) scale(0.9) translate(-32 -32)"><rect x="12" y="12" width="40" height="40" rx="2.6" fill="${L.seat}"/><rect x="13.4" y="13.4" width="37.2" height="37.2" rx="1.8" fill="${L.lens}"/><path d="${CHEVRON}" transform="translate(0 1.1)" fill="${L.cut}" fill-opacity="${L.cutOp}"/><path d="${CHEVRON}" fill="${L.legend}"/></g>`,
)

// 4. Lockup: mark + outlined wordmark (Archivo 700, 112% width), see build-wordmark.mjs.
const wm = JSON.parse(readFileSync(join(here, 'wordmark.json'), 'utf8'))
const ASC = wm.baseline - wm.minY // ascender height in px at 100px font size
const target = 28 // ascender height in the 64-unit lockup
const s = target / ASC
const wmWidth = (wm.maxX - wm.minX) * s
const baselineY = 32 + target / 2
const lockup = (c) => {
  const word = `<path transform="translate(${(80 - wm.minX * s).toFixed(2)} ${(baselineY - wm.baseline * s).toFixed(2)}) scale(${s.toFixed(5)})" d="${wm.d}" fill="${c.word}"/>`
  const w = Math.ceil(80 + wmWidth + 2)
  return svg(`0 0 ${w} 64`, `<g transform="scale(${k}) translate(-4 -4)">${lamp(c)}</g>${word}`)
}
write(pub('logo.svg'), lockup(L))
write(pub('logo-dark.svg'), lockup(D))

// 5. Rasters
const tmp = (f) => join(root, 'scripts/og', `.tmp-${f}`)
write(tmp('bleed.svg'), bleedSvg)
write(tmp('maskable.svg'), maskable)
png(pub('brand-icon.svg'), pub('brand-icon.png'), 512)
png(pub('favicon-light.svg'), pub('favicon-16.png'), 16)
png(pub('favicon-light.svg'), pub('favicon-32.png'), 32)
png(pub('favicon-light.svg'), pub('favicon.png'), 256)
png(tmp('bleed.svg'), pub('apple-touch-icon.png'), 180)
png(tmp('bleed.svg'), pub('icon-192.png'), 192)
png(tmp('bleed.svg'), pub('icon-512.png'), 512)
png(tmp('maskable.svg'), pub('maskable-icon-512.png'), 512)
const logoW = Math.ceil(80 + wmWidth + 2)
png(pub('logo.svg'), pub('logo.png'), logoW * 3, 64 * 3)
execFileSync('rm', [tmp('bleed.svg'), tmp('maskable.svg')])
console.log('brand assets written; lockup width', logoW)
