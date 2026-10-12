// Outlines the "macOS Updates" wordmark (Archivo, weight 700, width 112%) into one SVG path.
// Pipeline: headless Chrome prints text to PDF (variable font instance embedded as glyph outlines),
// pdftocairo converts the PDF to SVG, and this script flattens <use> glyphs into a single path.
// Needs: Google Chrome, poppler (pdftocairo), and a running dev server for the woff2 (or pass FONT=path).
// Output: scripts/og/wordmark.json { d, width, height, baseline, capHeight, fontSize }.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const FS = 100 // px
const tmp = mkdtempSync(join(tmpdir(), 'wm-'))
const fontPath = process.env.FONT || join(here, '../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')
const font = join(tmp, 'archivo.woff2')
if (existsSync(fontPath)) writeFileSync(font, readFileSync(fontPath))
else throw new Error('Archivo woff2 not readable; set FONT=/path/to/archivo-latin-wdth-normal.woff2')

writeFileSync(
  join(tmp, 'wm.html'),
  `<!doctype html><meta charset=utf-8><style>
@font-face{font-family:A;src:url(archivo.woff2) format('woff2-variations');font-weight:100 900;font-stretch:62% 125%}
@page{size:700px 140px;margin:0}html,body{margin:0;background:#fff}
span{font-family:A;font-weight:700;font-stretch:112%;font-size:${FS}px;letter-spacing:-0.012em;line-height:140px;color:#000;white-space:nowrap;position:absolute;left:0;top:0}
</style><span>macOS Updates</span>`,
)
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
execFileSync(chrome, ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${join(tmp, 'wm.pdf')}`, `file://${join(tmp, 'wm.html')}`], { stdio: 'ignore' })
execFileSync('pdftocairo', ['-svg', join(tmp, 'wm.pdf'), join(tmp, 'wm.svg')])
const svg = readFileSync(join(tmp, 'wm.svg'), 'utf8')

const K = 4 / 3 // pt -> px
const glyphs = {}
for (const m of svg.matchAll(/<g id="(glyph-\d+-\d+)">\s*(?:<path d="([^"]*)"\/>\s*)?<\/g>/g)) glyphs[m[1]] = m[2] || ''

const uses = [...svg.matchAll(/<use xlink:href="#(glyph-\d+-\d+)" x="([\d.\-]+)" y="([\d.\-]+)"\/>/g)]
if (!uses.length) throw new Error('no glyph uses found')

const r = (n) => +n.toFixed(2)
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
const parts = []
for (const [, id, x, y] of uses) {
  const dx = +x * K, dy = +y * K
  if (!glyphs[id]) continue // whitespace glyph
  const toks = glyphs[id].trim().split(/\s+/)
  let out = '', i = 0, cmd = ''
  while (i < toks.length) {
    if (/^[MLCZ]$/.test(toks[i])) { cmd = toks[i++]; out += cmd; if (cmd === 'Z') continue }
    const n = cmd === 'C' ? 6 : 2
    const nums = toks.slice(i, i + n).map(Number); i += n
    const pts = []
    for (let k = 0; k < n; k += 2) {
      const px = nums[k] * K + dx, py = nums[k + 1] * K + dy
      pts.push(`${r(px)} ${r(py)}`)
      minX = Math.min(minX, px); maxX = Math.max(maxX, px); minY = Math.min(minY, py); maxY = Math.max(maxY, py)
    }
    out += pts.join(' ') + ' '
  }
  parts.push(out.trim())
}
const baseline = +uses[0][3] * K
// cap height from the 'O' is approximated by minY of the tallest ascender-free run; report bbox instead.
writeFileSync(
  join(here, 'wordmark.json'),
  JSON.stringify({ d: parts.join(' '), minX: r(minX), maxX: r(maxX), minY: r(minY), maxY: r(maxY), baseline: r(baseline), fontSize: FS }, null, 1) + '\n',
)
console.log({ minX, maxX, minY, maxY, baseline })
