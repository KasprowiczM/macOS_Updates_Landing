#!/usr/bin/env python3
"""Render an illustrative dry-run terminal replay; never runs the updater.

Requires ImageMagick and FFmpeg. Source strings: i18n/lang_pl.sh:139-140,
update_all.sh:812,1509,1558,1598,1645,1694,2268 and lib/cli.sh:75-82.
"""
import argparse
import html
import subprocess
import tempfile
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--wallpaper', required=True, type=Path)
parser.add_argument('--output', required=True, type=Path)
args = parser.parse_args()
args.output.parent.mkdir(parents=True, exist_ok=True)

stages = [
    ('0. 🔍 Prescan (APPLICATIONS.md)', 'prescan.py (APPLICATIONS.md scan)'),
    ('1. 🛍️ Aplikacje z App Store', 'update_appstore.sh'),
    ('2. 🧰 Native CLI + npm', 'update_npm_cli.sh'),
    ('3. 🍺 Pakiety Homebrew', 'update_brew.sh'),
    ('4. 🌐 Aplikacje pobrane z Internetu', 'update_internet_apps.sh'),
    ('5. 📝 Postupdate i historia', 'postupdate.py (APPLICATIONS.md / UPDATES.md)'),
    ('6. 🍎 System macOS (na końcu; pomijany po wcześniejszym błędzie)', 'update_system.sh (final step)'),
]

def esc(text):
    return html.escape(text, quote=True)

with tempfile.TemporaryDirectory() as temp:
    tmp = Path(temp)
    bg = tmp / 'wallpaper.png'
    subprocess.run(['magick', str(args.wallpaper), '-resize', '1280x720^', '-gravity', 'center', '-extent', '1280x720', '-type', 'TrueColor', str(bg)], check=True)
    for index in range(len(stages)):
        rows = [('<tspan fill="#9db6d2">$</tspan> MAC_UPDATE_LANG=pl bash update_all.sh --dry-run -y', 21),
                ('Skrypt przeprowadzi pełną aktualizację:', 20)]
        for title, action in stages[:index + 1]:
            # Emoji are part of the upstream stage strings. The static composition
            # keeps the wording and drops only the glyph where font support varies.
            plain_title = title[:3] + title[5:]
            rows.append((esc(plain_title), 20))
            rows.append((esc('[DRY-RUN] Would run: ' + action), 18))
        text = ''
        y = 175
        for row, size in rows:
            text += f'<text x="98" y="{y}" font-size="{size}">{row}</text>'
            y += 29 if size == 20 else 25
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
<rect width="1280" height="30" fill="#1a293a" fill-opacity=".55"/>
<text x="24" y="20" fill="#fff" font-family="Arial" font-size="13" font-weight="bold">Terminal</text>
<defs><filter id="window-shadow" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="14"/></filter><clipPath id="window-clip"><rect x="70" y="81" width="1140" height="539" rx="18"/></clipPath><linearGradient id="title-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7fbff" stop-opacity=".88"/><stop offset="1" stop-color="#d5e5f3" stop-opacity=".76"/></linearGradient></defs>
<rect x="70" y="91" width="1140" height="539" rx="18" fill="#071423" fill-opacity=".48" filter="url(#window-shadow)"/>
<g clip-path="url(#window-clip)"><rect x="70" y="81" width="1140" height="539" fill="#101923" fill-opacity=".94"/><rect x="70" y="81" width="1140" height="43" fill="url(#title-glass)"/><path d="M70 82H1210" stroke="#ffffff" stroke-opacity=".8"/><path d="M70 124H1210" stroke="#54697b" stroke-opacity=".45"/></g>
<rect x="70.5" y="81.5" width="1139" height="538" rx="17.5" fill="none" stroke="#f2f8ff" stroke-opacity=".45"/>
<circle cx="94" cy="102" r="6" fill="#ff5f57"/><circle cx="114" cy="102" r="6" fill="#febc2e"/><circle cx="134" cy="102" r="6" fill="#28c840"/>
<text x="640" y="107" text-anchor="middle" fill="#324456" font-family="Arial" font-size="13">Terminal</text>
<g font-family="Menlo, monospace" fill="#edf4fa">{text}</g>
<text x="640" y="664" text-anchor="middle" font-family="Arial" font-size="13" fill="#fff">Podgląd bez instalowania aktualizacji</text></svg>'''
        svg_path = tmp / f'frame{index}.svg'
        overlay = tmp / f'overlay{index}.png'
        frame = tmp / f'frame{index}.png'
        svg_path.write_text(svg)
        subprocess.run(['magick', '-background', 'none', str(svg_path), str(overlay)], check=True)
        subprocess.run(['magick', str(bg), str(overlay), '-composite', '-type', 'TrueColor', str(frame)], check=True)
    concat = tmp / 'frames.txt'
    concat.write_text(''.join(f"file '{tmp / f'frame{i}.png'}'\nduration 1.8\n" for i in range(len(stages))) + f"file '{tmp / 'frame6.png'}'\n")
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', str(concat), '-vf', 'format=gbrp,fps=30,format=yuv420p', '-t', '12.6', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-g', '30', '-keyint_min', '30', '-sc_threshold', '0', '-movflags', '+faststart', str(args.output)], check=True)
    for name in [args.output.stem + '-poster.webp', 'terminal-preview.webp']:
        subprocess.run(['magick', str(tmp / 'frame6.png'), '-quality', '82', str(args.output.with_name(name))], check=True)
