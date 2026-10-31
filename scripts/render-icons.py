#!/usr/bin/env python3
"""Design-time asset renderer. Requires Pillow and @resvg/resvg-js; CI uses committed PNGs."""
from pathlib import Path
from io import BytesIO
import subprocess
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
RES = ROOT / 'resources'
OUT = ROOT / 'android-res'

def svg(name, size):
    return Image.open(BytesIO(subprocess.check_output(['node', str(ROOT / 'scripts/render-svg.cjs'), str(RES / name), str(size)]))).convert('RGBA')

def save(im, path):
    path = ROOT / path
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, optimize=True)

def icon(size):
    im = svg('icon-background.svg', size)
    im.alpha_composite(svg('icon-foreground.svg', size))
    return im

save(icon(512), 'docs/icon-512.png')
for density, legacy, adaptive in [('mdpi',48,108),('hdpi',72,162),('xhdpi',96,216),('xxhdpi',144,324),('xxxhdpi',192,432)]:
    legacy_icon = icon(legacy)
    save(legacy_icon, f'android-res/mipmap-{density}/ic_launcher.png')
    # Supersample the mask so pre-adaptive round launcher edges stay smooth.
    mask = Image.new('L', (legacy*4, legacy*4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, legacy*4-1, legacy*4-1), fill=255)
    legacy_icon.putalpha(mask.resize((legacy, legacy), Image.Resampling.LANCZOS))
    save(legacy_icon, f'android-res/mipmap-{density}/ic_launcher_round.png')
    save(svg('icon-foreground.svg', adaptive), f'android-res/mipmap-{density}/ic_launcher_foreground.png')
    save(svg('icon-monochrome.svg', adaptive), f'android-res/mipmap-{density}/ic_launcher_monochrome.png')
    save(svg('icon-background.svg', adaptive), f'android-res/mipmap-{density}/ic_launcher_background.png')
# Landscape splash: the emblem remains centered and the entire canvas is dark green.
splash = Image.new('RGBA', (1920,1080), '#12261c')
emblem = svg('icon-foreground.svg', 500)
splash.alpha_composite(emblem, ((1920-500)//2,(1080-500)//2))
save(splash, 'android-res/drawable/splash.png')
# Contact sheet for design review only, not shipped.
preview = Image.new('RGB', (800, 800), '#20251f')
draw = ImageDraw.Draw(preview)
for col,size in enumerate((48,72,96,192)):
    for row, (color, shape) in enumerate([('#eeeae0','circle'),('#20251f','circle'),('#eeeae0','squircle'),('#20251f','squircle')]):
        x=col*200+4;y=row*200+4
        draw.rectangle((x,y,x+191,y+191), fill=color)
        tile=icon(size); mask=Image.new('L',(size,size)); m=ImageDraw.Draw(mask)
        if shape=='circle': m.ellipse((0,0,size-1,size-1),fill=255)
        else: m.rounded_rectangle((0,0,size-1,size-1),radius=round(size*.22),fill=255)
        tile.putalpha(mask);preview.paste(tile,(x+(192-size)//2,y+(192-size)//2),tile)
save(preview,'resources/icon-preview.png')
