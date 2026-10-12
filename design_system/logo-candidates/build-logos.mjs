// Generator for the macOS Updates logo candidates (Mission Control direction).
// Usage: node build-logos.mjs   (writes SVGs next to this file; no dependencies)
// Wordmark: hand-constructed squared caps (chamfered, 20-unit cap height, 4-unit stem),
// emitted as filled polygons. No <text>, no font dependency.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.dirname(fileURLToPath(import.meta.url));
const r2 = (n) => +n.toFixed(2);
const rad = (d) => (d * Math.PI) / 180;

// ---------- palette ----------
const THEME = {
  light: { name: 'light', ground: '#EEF2F5', fg: '#0D1B2A', go: '#1F5FA8', on: '#EEF2F5', bezel: '#0D1B2A', bezelHair: '#2A3F55', screw: '#2F4660', gridOp: 0.16 },
  dark: { name: 'dark', ground: '#0F1823', fg: '#EEF2F5', go: '#5DB0FF', on: '#0D1B2A', bezel: '#1B2B3E', bezelHair: '#3A5068', screw: '#4A6380', gridOp: 0.2 },
};

// ---------- shared pieces ----------
// Classic chevron, flat-cut arms. (cx, top) = outer apex. W = half width, v = vertical thickness.
const chevron = (cx, top, W, v, fill) =>
  `<path d="M${r2(cx)} ${r2(top)}L${r2(cx + W)} ${r2(top + W)}V${r2(top + W + v)}L${r2(cx)} ${r2(top + v)}L${r2(cx - W)} ${r2(top + W + v)}V${r2(top + W)}Z" fill="${fill}"/>`;

const pt = (cx, cy, r, beta, o) => {
  // point on circle radius r lying on the line parallel to the radial at angle beta, offset o along its normal
  const t = Math.sqrt(r * r - o * o), b = rad(beta);
  return [cx + t * Math.cos(b) - o * Math.sin(b), cy + t * Math.sin(b) + o * Math.cos(b)];
};
// annular segment between boundaries b0 and b1 with parallel-sided gap g
const segment = (cx, cy, r0, r1, b0, b1, g) => {
  const A = pt(cx, cy, r1, b0, g / 2), B = pt(cx, cy, r1, b1, -g / 2);
  const C = pt(cx, cy, r0, b1, -g / 2), D = pt(cx, cy, r0, b0, g / 2);
  return `M${r2(A[0])} ${r2(A[1])}A${r1} ${r1} 0 0 1 ${r2(B[0])} ${r2(B[1])}L${r2(C[0])} ${r2(C[1])}A${r0} ${r0} 0 0 0 ${r2(D[0])} ${r2(D[1])}Z`;
};

// ---------- A: Poll ring ----------
function markA(T) {
  const c = 32, g = 4, step = 360 / 7;
  const beta = (k) => r2(-90 + (k + 0.5) * step); // boundary after segment k (k=0 is the top segment)
  const lit = [];
  for (let k = 1; k <= 6; k++) lit.push(segment(c, c, 14, 24, beta(k - 1), beta(k), g));
  const top = segment(c, c, 13, 26, beta(-1), beta(0), g);
  return (
    `<path d="${lit.join('')}" fill="${T.go}"/>` +
    `<path d="${top}" fill="${T.fg}"/>` +
    chevron(c, 23.5, 8.75, 6.5, T.fg)
  );
}
const VB_A = [4, 4, 56];

// ---------- B: Status lamp ----------
function markB(T, { bleed = false } = {}) {
  let s = '';
  if (!bleed) s += `<rect x="4" y="4" width="56" height="56" rx="3" fill="${T.bezel}"/>`;
  else s += `<rect width="64" height="64" fill="${T.bezel}"/>`;
  if (!bleed) {
    s += `<rect x="9.75" y="9.75" width="44.5" height="44.5" rx="1.5" fill="none" stroke="${T.bezelHair}" stroke-width="1.5"/>`;
    // four console screws
    for (const [x, y] of [[7, 7], [57, 7], [7, 57], [57, 57]]) s += `<circle cx="${x}" cy="${y}" r="1.1" fill="${T.screw}"/>`;
  }
  s += `<rect x="13" y="13" width="38" height="38" rx="2" fill="${T.go}"/>`;
  s += chevron(32, 20.75, 13, 9.5, T.on);
  return s;
}
const VB_B = [3, 3, 58];

// ---------- C: Launch trajectory on a plotting grid ----------
function markC(T) {
  let s = `<rect x="5" y="5" width="54" height="54" rx="1" fill="none" stroke="${T.fg}" stroke-width="5.5"/>`;
  // plotting grid (hairlines)
  s += `<path d="M20 8V56M32 8V56M44 8V56M8 20H56M8 32H56M8 44H56" stroke="${T.fg}" stroke-opacity="${T.gridOp}" stroke-width="1.2" fill="none"/>`;
  const cx = 47, cy = 50, R = 33;
  // ascent arc: quarter circle, vertical tangent at lift-off, horizontal at insertion
  s += `<path d="M${cx - R} ${cy}A${R} ${R} 0 0 1 ${cx} ${cy - R}" fill="none" stroke="${T.go}" stroke-width="6"/>`;
  // seven stations 15deg apart: six radial ticks (0..75deg) + the final dot at 90deg
  let ticks = '';
  for (let i = 0; i < 6; i++) {
    const phi = rad(i * 15);
    const x = cx - R * Math.cos(phi), y = cy - R * Math.sin(phi);
    const dx = -Math.cos(phi), dy = -Math.sin(phi), L = 5.5;
    ticks += `M${r2(x - dx * L)} ${r2(y - dy * L)}L${r2(x + dx * L)} ${r2(y + dy * L)}`;
  }
  s += `<path d="${ticks}" stroke="${T.fg}" stroke-width="2.4" fill="none"/>`;
  s += `<circle cx="${cx}" cy="${cy - R}" r="5.75" fill="${T.fg}"/>`;
  return s;
}
const VB_C = [2, 2, 60];

// ---------- wordmark glyphs (cap height 20, stem 4) ----------
const GL = {
  M: { w: 22, p: [[[0, 0], [4.5, 0], [11, 12], [17.5, 0], [22, 0], [22, 20], [18, 20], [18, 6.2], [11, 19.1], [4, 6.2], [4, 20], [0, 20]]] },
  A: { w: 20, p: [
    [[0, 20], [7.6, 0], [12.4, 0], [20, 20], [15.7, 20], [14.33, 16.4], [5.67, 16.4], [4.3, 20]],
    [[10, 5], [12.81, 12.4], [7.19, 12.4]],
  ] },
  C: { w: 17, p: [[[5, 0], [17, 0], [17, 4], [6.7, 4], [4, 6.7], [4, 13.3], [6.7, 16], [17, 16], [17, 20], [5, 20], [0, 15], [0, 5]]] },
  O: { w: 18, p: [
    [[5, 0], [13, 0], [18, 5], [18, 15], [13, 20], [5, 20], [0, 15], [0, 5]],
    [[6.7, 4], [11.3, 4], [14, 6.7], [14, 13.3], [11.3, 16], [6.7, 16], [4, 13.3], [4, 6.7]],
  ] },
  S: { w: 16, p: [[[5, 0], [16, 0], [16, 4], [6.7, 4], [4, 6.7], [4, 8], [11, 8], [16, 13], [16, 15], [11, 20], [0, 20], [0, 16], [9.3, 16], [12, 13.3], [12, 12], [5, 12], [0, 7], [0, 5]]] },
  U: { w: 16, p: [[[0, 0], [4, 0], [4, 13.3], [6.7, 16], [9.3, 16], [12, 13.3], [12, 0], [16, 0], [16, 15], [11, 20], [5, 20], [0, 15]]] },
  P: { w: 17, p: [
    [[0, 0], [12, 0], [17, 5], [17, 9], [12, 14], [4, 14], [4, 20], [0, 20]],
    [[4, 4], [10.3, 4], [13, 6.7], [13, 7.3], [10.3, 10], [4, 10]],
  ] },
  D: { w: 18, p: [
    [[0, 0], [13, 0], [18, 5], [18, 15], [13, 20], [0, 20]],
    [[4, 4], [11.3, 4], [14, 6.7], [14, 13.3], [11.3, 16], [4, 16]],
  ] },
  T: { w: 16, p: [[[0, 0], [16, 0], [16, 4], [10, 4], [10, 20], [6, 20], [6, 4], [0, 4]]] },
  E: { w: 15, p: [[[0, 0], [15, 0], [15, 4], [4, 4], [4, 8], [13, 8], [13, 12], [4, 12], [4, 16], [15, 16], [15, 20], [0, 20]]] },
};
const KERN = { 'M|A': -0.8, 'A|C': -0.4, 'A|T': -2.2, 'D|A': -0.6, 'S|U': 0 };
const TRACK = 3.6, SPACE = 10;

function wordmarkPath(text, scale, ox, oy) {
  let x = 0, d = '';
  const chars = [...text];
  chars.forEach((ch, i) => {
    if (ch === ' ') { x += SPACE; return; }
    const g = GL[ch];
    for (const poly of g.p) {
      d += poly.map(([px, py], j) => `${j ? 'L' : 'M'}${r2(ox + (x + px) * scale)} ${r2(oy + py * scale)}`).join('') + 'Z';
    }
    const nxt = chars[i + 1];
    x += g.w + (nxt && nxt !== ' ' ? TRACK + (KERN[`${ch}|${nxt}`] ?? 0) : TRACK);
  });
  const width = (x - TRACK) * scale;
  return { d, width };
}

// ---------- assembly ----------
const CANDS = [
  { id: 'a-poll-ring', fn: markA, vb: VB_A },
  { id: 'b-status-lamp', fn: markB, vb: VB_B },
  { id: 'c-trajectory', fn: markC, vb: VB_C },
];
const NS = 'xmlns="http://www.w3.org/2000/svg"';
const write = (f, s) => fs.writeFileSync(path.join(OUT, f), s.endsWith('\n') ? s : s + '\n');

for (const c of CANDS) {
  for (const T of [THEME.light, THEME.dark]) {
    const suffix = T.name === 'dark' ? '-dark' : '';
    const [vx, vy, vs] = c.vb;
    // mark (transparent ground)
    write(`${c.id}-mark${suffix}.svg`,
      `<svg ${NS} viewBox="${vx} ${vy} ${vs} ${vs}" role="img" aria-label="macOS Updates">${c.fn(T)}</svg>`);
    // lockup
    const H = 64, capH = 26, scale = capH / 20, gapX = 22;
    const wm = wordmarkPath('MACOS UPDATES', scale, 0, 0);
    const s = H / vs;
    const ox = H + gapX, oy = (H - capH) / 2;
    const wm2 = wordmarkPath('MACOS UPDATES', scale, ox, oy);
    const W = Math.ceil(ox + wm.width);
    write(`${c.id}-lockup${suffix}.svg`,
      `<svg ${NS} viewBox="0 0 ${W} ${H}" role="img" aria-label="macOS Updates">` +
      `<g transform="scale(${r2(s)}) translate(${-vx} ${-vy})">${c.fn(T)}</g>` +
      `<path d="${wm2.d}" fill="${T.fg}" fill-rule="evenodd"/></svg>`);
  }
  // maskable / app icon: full-bleed ink ground, dark-ground mark, essentials inside the 80% circle
  const D = THEME.dark;
  const ICON = { ground: '#0D1B2A' };
  let inner;
  if (c.id === 'a-poll-ring') inner = `<g transform="translate(32 32) scale(.96) translate(-32 -32)">${markA(D)}</g>`;
  if (c.id === 'b-status-lamp') inner = markB({ ...D, bezel: '#0D1B2A' }, { bleed: true });
  if (c.id === 'c-trajectory') inner = `<g transform="translate(32 32) scale(.76) translate(-32 -32)">${markC(D)}</g>`;
  const iconGround = c.id === 'b-status-lamp' ? '' : `<rect width="64" height="64" fill="${ICON.ground}"/>`;
  write(`${c.id}-icon.svg`,
    `<svg ${NS} viewBox="0 0 64 64" role="img" aria-label="macOS Updates">${iconGround}${inner}</svg>`);
}
console.log('ok');
