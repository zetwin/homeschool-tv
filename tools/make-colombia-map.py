#!/usr/bin/env python3
"""Turns Wikimedia's region map of Colombia into a small data file, so children can tap real region shapes.

Source: File:Mapa de Colombia (regiones naturales)-nn.svg, by Milenioscuro and others, CC BY-SA 4.0.
Only land and region outlines are kept. Labels, rivers and sea borders are dropped.
Usage: python3 tools/make-colombia-map.py <source.svg> <output.js> [more outputs]
"""
import json
import re
import sys
import xml.etree.ElementTree as ET

SVG = '{http://www.w3.org/2000/svg}'
INK = '{http://www.inkscape.org/namespaces/inkscape}'
REGIONS = {
    'path3846': ('caribbean', 'Caribbean', '#F2B632'),
    'path4630': ('pacific', 'Pacific', '#3F7FCB'),
    'path4646': ('andean', 'Andean', '#B0703A'),
    'path4641': ('orinoquia', 'Orinoquía', '#A5C63F'),
    'path3773': ('amazon', 'Amazon', '#1F8A55'),
    'path3771': ('insular', 'Insular', '#EE5FA7'),
}


def translation(el):
    m = re.match(r'translate\(([-\d.e]+),?\s*([-\d.e]*)\)', el.attrib.get('transform', ''))
    return (float(m[1]), float(m[2] or 0)) if m else (0.0, 0.0)


def subpaths(d):
    """Reads an SVG path and returns its outlines as lists of points. Curves are sampled."""
    tokens = re.findall(r'[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?', d)
    i, cmd, x, y, sx, sy = 0, None, 0.0, 0.0, 0.0, 0.0
    out, cur = [], []

    def num():
        nonlocal i
        i += 1
        return float(tokens[i - 1])

    while i < len(tokens):
        if tokens[i].isalpha():
            cmd = tokens[i]
            i += 1
            if cmd in 'zZ':
                if cur:
                    out.append(cur)
                cur, x, y = [], sx, sy
                continue
        rel = cmd.islower()
        c = cmd.lower()
        ox, oy = (x, y) if rel else (0.0, 0.0)
        if c == 'm':
            if cur:
                out.append(cur)
            x, y = num() + ox, num() + oy
            sx, sy = x, y
            cur = [(x, y)]
            cmd = 'l' if rel else 'L'
        elif c == 'l':
            x, y = num() + ox, num() + oy
            cur.append((x, y))
        elif c == 'h':
            x = num() + ox
            cur.append((x, y))
        elif c == 'v':
            y = num() + oy
            cur.append((x, y))
        elif c == 'c':
            a, b = num() + ox, num() + oy
            e, f = num() + ox, num() + oy
            g, h = num() + ox, num() + oy
            cur.append((.125 * x + .375 * a + .375 * e + .125 * g, .125 * y + .375 * b + .375 * f + .125 * h))
            x, y = g, h
            cur.append((x, y))
        elif c in 'sq':
            num(), num()
            x, y = num() + ox, num() + oy
            cur.append((x, y))
        else:
            raise ValueError(f'Unsupported path command {cmd}')
    if cur:
        out.append(cur)
    return out


def simplify(pts, tol):
    """Ramer-Douglas-Peucker, keeping the outline's shape with far fewer points."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        length = (dx * dx + dy * dy) ** .5 or 1
        best, at = 0, None
        for k in range(a + 1, b):
            px, py = pts[k]
            dist = abs(dx * (ay - py) - dy * (ax - px)) / length
            if dist > best:
                best, at = dist, k
        if at is not None and best > tol:
            keep[at] = True
            stack += [(a, at), (at, b)]
    return [p for p, k in zip(pts, keep) if k]


def to_d(paths, offset, tol, min_size=0):
    parts = []
    for pts in paths:
        pts = [(x + offset[0], y + offset[1]) for x, y in pts]
        xs, ys = [p[0] for p in pts], [p[1] for p in pts]
        if max(xs) - min(xs) < min_size and max(ys) - min(ys) < min_size:
            continue
        pts = simplify(pts, tol)
        parts.append('M' + 'L'.join(f'{round(x)} {round(y)}' for x, y in pts) + 'Z')
    return ''.join(parts)


root = ET.parse(sys.argv[1]).getroot()
layers = {g.attrib.get(INK + 'label'): g for g in root if g.tag == SVG + 'g'}
land_layer, region_layer = layers['Land'], layers['Regions']
land_off = translation(land_layer)
land = to_d(subpaths(next(land_layer.iter(SVG + 'path')).attrib['d']), land_off, 2.2, 12)
base = translation(region_layer)
regions = []
for p in region_layer.iter(SVG + 'path'):
    if p.attrib.get('id') not in REGIONS:
        continue
    key, name, color = REGIONS[p.attrib['id']]
    t = translation(p)
    off = (base[0] + t[0], base[1] + t[1])
    outlines = subpaths(p.attrib['d'])
    pts = [q for o in outlines for q in o]
    cx = sum(q[0] for q in pts) / len(pts) + off[0]
    cy = sum(q[1] for q in pts) / len(pts) + off[1]
    regions.append({'id': key, 'name': name, 'color': color, 'center': [round(cx), round(cy)], 'd': to_d(outlines, off, 1.0, 1.5)})
    # The islands are too small to tap, so they get a tap ring around them.
    if key == 'insular':
        regions[-1]['ring'] = [115, 225, 90]
data = {
    'viewBox': '0 0 1763 2126',
    'source': 'Wikimedia Commons: Mapa de Colombia (regiones naturales)-nn.svg. CC BY-SA 4.0. Simplified, labels and sea borders removed.',
    'land': land,
    'regions': regions,
}
text = '/* Made by tools/make-colombia-map.py. ' + data['source'] + ' */\nwindow.COLOMBIA_MAP = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n'
for path in sys.argv[2:]:
    with open(path, 'w') as f:
        f.write(text)
print(len(text), [(r['id'], r['center'], len(r['d'])) for r in regions], len(land))
