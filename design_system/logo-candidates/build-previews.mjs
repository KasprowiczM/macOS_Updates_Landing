// Renders PNG previews + comparison sheet with headless Chrome and ImageMagick.
// Usage: node build-previews.mjs [scratchDir]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const TMP = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'logo-'));
fs.mkdirSync(TMP, { recursive: true });
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LIGHT = '#EEF2F5', DARK = '#0F1823';
const CANDS = [
  { id: 'a-poll-ring', tag: 'A', name: 'Poll ring' },
  { id: 'b-status-lamp', tag: 'B', name: 'Status lamp' },
  { id: 'c-trajectory', tag: 'C', name: 'Trajectory' },
];
const url = (f) => 'file://' + path.join(DIR, f);

function shot(html, out, w, h) {
  const f = path.join(TMP, path.basename(out) + '.html');
  fs.writeFileSync(f, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--screenshot=${out}`, `--window-size=${w},${h}`, '--virtual-time-budget=2000', 'file://' + f], { stdio: 'ignore' });
  // normalise to exact size (headless can add chrome rows)
  execFileSync('magick', [out, '-crop', `${w}x${h}+0+0`, '+repage', out]);
}
const page = (bg, body, extra = '') =>
  `<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:${bg};}body{display:flex;align-items:center;justify-content:center;width:100vw;height:100vh;overflow:hidden}img{display:block}${extra}</style>${body}`;

// 1) per-candidate 512 previews
for (const c of CANDS) {
  shot(page(LIGHT, `<img src="${url(c.id + '-mark.svg')}" width=400 height=400>`), path.join(DIR, `${c.id}-mark-on-light.png`), 512, 512);
  shot(page(DARK, `<img src="${url(c.id + '-mark-dark.svg')}" width=400 height=400>`), path.join(DIR, `${c.id}-mark-on-dark.png`), 512, 512);
  shot(page(LIGHT, `<img src="${url(c.id + '-lockup.svg')}" width=880>`), path.join(DIR, `${c.id}-lockup-on-light.png`), 1024, 512);
  shot(page(DARK, `<img src="${url(c.id + '-lockup-dark.svg')}" width=880>`), path.join(DIR, `${c.id}-lockup-on-dark.png`), 1024, 512);
}

// 2) true-pixel 16/32 renders, magnified for inspection
const zoomDir = path.join(TMP, 'zoom'); fs.mkdirSync(zoomDir, { recursive: true });
for (const c of CANDS) for (const g of ['light', 'dark']) for (const s of [16, 32]) {
  const out = path.join(zoomDir, `${c.id}-${g}-${s}.png`);
  shot(page(g === 'light' ? LIGHT : DARK, `<img src="${url(c.id + (g === 'light' ? '-mark.svg' : '-mark-dark.svg'))}" width=${s} height=${s}>`), out, s, s);
  execFileSync('magick', [out, '-filter', 'point', '-resize', s === 16 ? '800%' : '400%', out.replace('.png', '-x.png')]);
}
for (const c of CANDS) { // icon rasters (square, true size) for 16px favicon of the icon variant
  const out = path.join(zoomDir, `${c.id}-icon-16.png`);
  shot(page('#fff', `<img src="${url(c.id + '-icon.svg')}" width=16 height=16>`), out, 16, 16);
  execFileSync('magick', [out, '-filter', 'point', '-resize', '800%', out.replace('.png', '-x.png')]);
}

// 3) comparison sheet
const bg = (g) => (g === 'light' ? LIGHT : DARK);
const ink = (g) => (g === 'light' ? '#0D1B2A' : '#EEF2F5');
const mut = (g) => (g === 'light' ? '#4A5B6E' : '#8FA3B8');
const markFile = (c, g) => c.id + (g === 'light' ? '-mark.svg' : '-mark-dark.svg');
const lockFile = (c, g) => c.id + (g === 'light' ? '-lockup.svg' : '-lockup-dark.svg');
const panel = (g) => `
<section class="panel" style="background:${bg(g)};color:${ink(g)}">
  <h2 style="color:${mut(g)}">${g === 'light' ? 'LIGHT GROUND  #EEF2F5' : 'DARK GROUND  #0F1823'}</h2>
  <div class="cols">${CANDS.map((c) => `
    <div class="col">
      <div class="tag"><b>${c.tag}</b> ${c.name}</div>
      <div class="sizes">${[16, 32, 64, 180].map((s) => `<figure><img src="${url(markFile(c, g))}" width=${s} height=${s}><figcaption style="color:${mut(g)}">${s}</figcaption></figure>`).join('')}</div>
      <div class="zoom">
        <img class="px" src="file://${path.join(zoomDir, `${c.id}-${g}-16-x.png`)}">
        <img class="px" src="file://${path.join(zoomDir, `${c.id}-${g}-32-x.png`)}">
      </div>
      <img class="lock" src="${url(lockFile(c, g))}">
      <div class="lock small"><img src="${url(lockFile(c, g))}" height=32><img src="${url(lockFile(c, g))}" height=22></div>
    </div>`).join('')}
  </div>
</section>`;
const icons = `
<section class="panel" style="background:#2B3138;color:#EEF2F5">
  <h2 style="color:#9AA6B2">MASKABLE / APP ICON  (full-bleed ground; circle = worst-case mask; dashed = 80% safe zone)</h2>
  <div class="cols">${CANDS.map((c) => `
    <div class="col"><div class="tag"><b>${c.tag}</b> ${c.name}</div>
      <div class="sizes">
        <figure><div class="mask"><img src="${url(c.id + '-icon.svg')}" width=180 height=180><i></i></div><figcaption>circle mask 180</figcaption></figure>
        <figure><div class="sq"><img src="${url(c.id + '-icon.svg')}" width=180 height=180></div><figcaption>squircle 180</figcaption></figure>
        <figure><img src="${url(c.id + '-icon.svg')}" width=64 height=64><figcaption>64</figcaption></figure>
        <figure><img class="px" src="file://${path.join(zoomDir, `${c.id}-icon-16-x.png`)}"><figcaption>16 (x8)</figcaption></figure>
      </div></div>`).join('')}
  </div>
</section>`;
const sheet = `<!doctype html><meta charset=utf-8><style>
html,body{margin:0;background:#fff;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}
.panel{padding:28px 40px 36px}
h2{font:600 13px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;margin:0 0 22px}
.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:48px}
.tag{font:600 18px/1 -apple-system,Arial;margin-bottom:18px}.tag b{display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;border:2px solid currentColor;margin-right:10px}
.sizes{display:flex;align-items:flex-end;gap:26px;height:200px}
figure{margin:0;text-align:left}figcaption{font:11px ui-monospace,Menlo,monospace;margin-top:6px}
.zoom{display:flex;gap:18px;margin:18px 0;align-items:flex-end}
.px{image-rendering:pixelated}
.lock{width:100%;max-width:520px;margin:6px 0 14px;display:block}
.small{display:flex;gap:24px;align-items:center}
.mask{width:180px;height:180px;border-radius:50%;overflow:hidden;position:relative}.mask i{position:absolute;inset:18px;border:1px dashed #ff7a7a;border-radius:50%}
.sq{width:180px;height:180px;border-radius:40px;overflow:hidden}
</style>${panel('light')}${panel('dark')}${icons}`;
shot(sheet, path.join(DIR, 'comparison.png'), 1800, 1900);
console.log('previews done', TMP);
