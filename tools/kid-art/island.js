/* Island: a floating piece of land. Each subject is a place, joined by today's route. */
import { THREE, dev, stage, sun, glow, mat, box, cyl, ball, at, group, shadow, gradientBg, finish, paint } from './common.js';
const phone = dev === 'phone';
const st = stage({ exposure: 1.05, env: .55, fov: phone ? 38 : 25, camera: phone ? [0, 30, 55] : [0, 23, 33], look: phone ? [0, -1.2, 0] : [0, -1.5, 0], bg: gradientBg([[0, '#2A6FDB'], [.55, '#55B7E8'], [1, '#BDEBF2']]) });
const { scene } = st;
sun(scene, [-11, 22, 9], 3.1, '#FFEBC8', 15);
/* Noise that always gives the same land. */
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
const smooth = (t) => t * t * (3 - 2 * t);
const noise = (x, y) => { const i = Math.floor(x), j = Math.floor(y), f = x - i, g = y - j; const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1); return a + (b - a) * smooth(f) + (c - a) * smooth(g) + (a - b - c + d) * smooth(f) * smooth(g); };
const fbm = (x, y) => noise(x, y) * .55 + noise(x * 2.1, y * 2.1) * .3 + noise(x * 4.3, y * 4.3) * .15;
const rim = (a) => 8.6 + Math.sin(a * 3 + .6) * .8 + Math.sin(a * 5 + 2) * .45 + Math.sin(a * 9) * .2;
const PEAK = [-3.6, -3.1];
const height = (x, z) => {
  const r = Math.hypot(x, z), R = rim(Math.atan2(z, x)), edge = Math.min(1, Math.max(0, (R - r) / 1.5));
  const mtn = Math.exp(-((x - PEAK[0]) ** 2 + (z - PEAK[1]) ** 2) / 6.4) * 4.3;
  const hills = (fbm(x * .28 + 3, z * .28 + 7) - .3) * 1.1;
  return (.55 + hills + mtn * (1 + (fbm(x, z) - .5) * .55)) * smooth(edge);
};
const col = new THREE.Color(), c2 = new THREE.Color();
const BANDS = [[-1, '#F2DDA6'], [.2, '#F2DDA6'], [.34, '#6FC04C'], [1.3, '#57AE42'], [2.05, '#3F8F46'], [2.5, '#88867F'], [3.05, '#77757A'], [3.35, '#FBFDFF'], [9, '#FFFFFF']];
const colorAt = (y, x, z) => { const h = y + (fbm(x * .9, z * .9) - .5) * .3; for (let i = 0; i < BANDS.length - 1; i++) if (h <= BANDS[i + 1][0]) { const t = (h - BANDS[i][0]) / (BANDS[i + 1][0] - BANDS[i][0]); return col.set(BANDS[i][1]).lerp(c2.set(BANDS[i + 1][1]), Math.max(0, Math.min(1, t))); } return col; };
const top = new THREE.PlaneGeometry(22, 22, 150, 150).toNonIndexed(); top.rotateX(-Math.PI / 2);
const p = top.attributes.position;
for (let i = 0; i < p.count; i++) { let x = p.getX(i), z = p.getZ(i); const a = Math.atan2(z, x), R = rim(a), r = Math.hypot(x, z); if (r > R) { x = Math.cos(a) * R; z = Math.sin(a) * R; } p.setXYZ(i, x, height(x, z), z); }
const colors = new Float32Array(p.count * 3);
for (let i = 0; i < p.count; i++) { colorAt(p.getY(i), p.getX(i), p.getZ(i)); colors.set([col.r, col.g, col.b], i * 3); }
top.setAttribute('color', new THREE.BufferAttribute(colors, 3)); top.computeVertexNormals();
scene.add(shadow(new THREE.Mesh(top, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .95, flatShading: true }))));
/* The underside: layers of earth and rock, narrowing to a point. */
const under = new THREE.ConeGeometry(1, 7.5, 40, 12, true).toNonIndexed(); under.rotateX(Math.PI); under.translate(0, -3.75, 0);
const u = under.attributes.position, uc = new Float32Array(u.count * 3);
for (let i = 0; i < u.count; i++) { const x = u.getX(i), y = u.getY(i), z = u.getZ(i), a = Math.atan2(z, x), t = -y / 7.5, r = Math.hypot(x, z), w = (fbm(a * 3 + 9, t * 5) - .5) * 1.7; const R = rim(a) * Math.max(.02, r) ; u.setXYZ(i, Math.cos(a) * (R + w * (t > .03 ? 1 : 0)), y * (1 + (fbm(a * 4, 2) - .5) * .4), Math.sin(a) * (R + w * (t > .03 ? 1 : 0))); col.set(t < .1 ? '#7A5230' : t < .32 ? '#8E5F36' : t < .6 ? '#6C5346' : '#4E4550'); uc.set([col.r, col.g, col.b], i * 3); }
under.setAttribute('color', new THREE.BufferAttribute(uc, 3)); under.computeVertexNormals();
scene.add(shadow(new THREE.Mesh(under, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, side: THREE.DoubleSide }))));
const ground = (x, z) => height(x, z);
const put = (o, x, z, ry = 0, lift = 0) => { o.position.set(x, ground(x, z) + lift, z); o.rotation.y = ry; scene.add(o); return o; };
const wall = mat('#FFF7E8', .75), red = mat('#D9432F', .6), blue = mat('#2563EB', .45), dark = mat('#33303A', .6), wood = mat('#9B6A3C', .8), gold = mat('#FFC400', .3, .55);
/* Trees and rocks. */
const tree = (s, c) => group(at(cyl(.09 * s, .13 * s, .5 * s, wood, 7), 0, .25 * s, 0), at(shadow(new THREE.Mesh(new THREE.ConeGeometry(.55 * s, 1.05 * s, 7), mat(c, .8, 0, { flatShading: true }))), 0, .95 * s, 0), at(shadow(new THREE.Mesh(new THREE.ConeGeometry(.42 * s, .85 * s, 7), mat(c, .8, 0, { flatShading: true }))), 0, 1.45 * s, 0));
const round = (s, c) => group(at(cyl(.08 * s, .12 * s, .55 * s, wood, 7), 0, .27 * s, 0), at(shadow(new THREE.Mesh(new THREE.IcosahedronGeometry(.56 * s, 1), mat(c, .8, 0, { flatShading: true }))), 0, .95 * s, 0));
const rock = (s) => { const m = shadow(new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), mat('#9A9892', .95, 0, { flatShading: true }))); m.scale.y = .7; return m; };
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const STOPS = { science: [4.9, 1.4], geography: [-1.2, -1.2], technology: [4.6, -3.5], reading: [-4.4, 3.2], family: [.9, 5.1] };
const near = (x, z, d) => Object.values(STOPS).some(([a, b]) => Math.hypot(x - a, z - b) < d);
for (let i = 0; i < 70; i++) { const a = rnd() * 6.283, r = 3.5 + rnd() * 4.3, x = Math.cos(a) * r, z = Math.sin(a) * r, y = ground(x, z); if (y < .3 || y > 2.5 || near(x, z, 2.5) || z > 4.6) continue; const s = .7 + rnd() * .65; put(rnd() > .55 ? tree(s, rnd() > .5 ? '#2F7D4C' : '#26703F') : round(s, ['#58A83F', '#8DBF3D', '#E89A2E'][Math.floor(rnd() * 3)]), x, z, rnd() * 6); }
for (let i = 0; i < 16; i++) { const a = rnd() * 6.283, r = 3 + rnd() * 5, x = Math.cos(a) * r, z = Math.sin(a) * r; if (near(x, z, 1.4)) continue; put(rock(.14 + rnd() * .22), x, z, rnd() * 6, .05); }
/* Science: a round lab with a dome, and a tall flask beside it. */
const lab = group(at(cyl(1, 1.05, .8, wall), 0, .4, 0), at(shadow(new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, 6.283, 0, 1.57), mat('#BEE9F5', .12, .1, { transparent: true, opacity: .78 }))), 0, .8, 0), at(cyl(1.08, 1.08, .1, blue), 0, .82, 0), at(box(.4, .55, .1, dark, .03), .3, .28, .95, .3));
const flask = group(at(ball(.34, mat('#49DB8F', .15, 0, { transparent: true, opacity: .92 })), 0, .34, 0), at(cyl(.1, .13, .42, mat('#E4F7FB', .1, 0, { transparent: true, opacity: .75 })), 0, .82, 0), at(cyl(.13, .13, .05, wall), 0, 1.05, 0));
put(lab, ...STOPS.science); put(flask, STOPS.science[0] + 1.3, STOPS.science[1] + .5);
glow(scene, [STOPS.science[0], ground(...STOPS.science) + 1.2, STOPS.science[1]], '#8FF0D2', 4, 4);
/* Geography: a survey hut under the mountain, with a flag at the snow line. */
const hut = group(at(box(1.2, .7, .95, wood, .03), 0, .35, 0), at(shadow(new THREE.Mesh(new THREE.ConeGeometry(.98, .68, 4), red)), 0, 1.04, 0, Math.PI / 4), at(box(.26, .42, .03, dark, .01), 0, .21, .48), at(ball(.2, mat('#2E86C1', .25)), .95, .3, .2), at(cyl(.015, .015, .25, gold, 8), .95, .1, .2));
put(hut, ...STOPS.geography, .3);
const flag = group(at(cyl(.025, .025, 1.1, dark, 8), 0, .55, 0), at(box(.55, .34, .02, mat('#FFC400', .5), .005), .28, .92, 0));
put(flag, PEAK[0], PEAK[1], .4, -.08);
/* Technology: a workshop with a chimney and a big gear. */
const gearTex = (r) => { const s = new THREE.Shape(); const n = 10; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * 6.283, a2 = ((i + 1) / (n * 2)) * 6.283, R = i % 2 ? r * .78 : r; s[i ? 'lineTo' : 'moveTo'](Math.cos(a) * R, Math.sin(a) * R); s.lineTo(Math.cos(a2) * R, Math.sin(a2) * R); } const hole = new THREE.Path(); hole.absarc(0, 0, r * .32, 0, 6.283); s.holes.push(hole); return shadow(new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: .1, bevelEnabled: false }), mat('#F59E0B', .32, .7))); };
const shop = group(at(box(1.7, .9, 1.1, mat('#6B7C93', .7), .03), 0, .45, 0), at(box(1.9, .12, 1.3, mat('#374151', .6), .03), 0, .97, 0, 0, 0, 0), at(box(.3, .85, .3, mat('#A9553A', .8), .03), -.5, 1.3, -.2), at(box(.6, .55, .03, dark, .01), .3, .28, .56), at(gearTex(.5), .35, 1.32, .1), at(gearTex(.3), .95, 1.16, .1));
put(shop, ...STOPS.technology, -.45);
/* Reading: a library tower, with a roof of stacked books. */
const lib = group(at(cyl(.72, .85, 1.6, wall, 12), 0, .8, 0), at(box(1.75, .16, 1.35, mat('#D42A20', .55), .03), 0, 1.68, 0, .2), at(box(1.55, .15, 1.2, mat('#1D4ED8', .55), .03), 0, 1.84, 0, -.15), at(box(1.3, .15, 1, mat('#FFC400', .55), .03), 0, 2, 0, .3), at(box(.34, .6, .04, dark, .01), 0, .3, .8), at(box(.22, .34, .04, mat('#FFD887', .25, 0, { emissive: '#FFB347', emissiveIntensity: .9 }), .01), .36, 1.05, .69, .47), at(box(.22, .34, .04, mat('#FFD887', .25, 0, { emissive: '#FFB347', emissiveIntensity: .9 }), .01), -.36, 1.05, .69, -.47));
put(lib, ...STOPS.reading, -.03);
/* Family project: two tents and a campfire. */
const tent = (c) => { const s = shadow(new THREE.Mesh(new THREE.ConeGeometry(.82, 1.05, 4), mat(c, .7, 0, { flatShading: true }))); s.rotation.y = Math.PI / 4; s.position.y = .5; return s; };
const camp = group(at(group(tent('#F97316')), -.75, 0, -.2), at(group(tent('#7E22CE')), .65, 0, -.45), at(cyl(.32, .36, .08, rock(.1).material), 0, .04, .65), at(shadow(new THREE.Mesh(new THREE.ConeGeometry(.15, .38, 8), new THREE.MeshBasicMaterial({ color: '#FFB020' }))), 0, .26, .65), at(box(.72, .1, .14, wood, .03), .75, .07, .55, .3), at(box(.72, .1, .14, wood, .03), -.75, .07, .55, -.3));
put(camp, ...STOPS.family);
glow(scene, [STOPS.family[0], ground(...STOPS.family) + .7, STOPS.family[1] + .65], '#FFA24C', 5, 4);
/* Today's route: stepping stones, in class order. */
const P = (k) => new THREE.Vector3(STOPS[k][0], 0, STOPS[k][1]);
const curve = new THREE.CatmullRomCurve3([P('science').add(new THREE.Vector3(-.6, 0, 1.25)), new THREE.Vector3(1.8, 0, 1.6), P('geography').add(new THREE.Vector3(.2, 0, 1.2)), new THREE.Vector3(1.6, 0, -1.6), P('technology').add(new THREE.Vector3(-.7, 0, .9)), new THREE.Vector3(3, 0, 3.6), new THREE.Vector3(-1, 0, 2.3), P('reading').add(new THREE.Vector3(.5, 0, 1.2)), new THREE.Vector3(-2.3, 0, 5.4), P('family').add(new THREE.Vector3(-.7, 0, .9))]);
for (let i = 0; i <= 74; i++) { const v = curve.getPointAt(i / 74); const y = ground(v.x, v.z); const s = shadow(new THREE.Mesh(new THREE.CylinderGeometry(.13, .15, .07, 10), i < 18 ? mat('#FFFDF4', .6) : gold)); s.position.set(v.x, y + .06, v.z); s.rotation.y = i; scene.add(s); }
/* A few clouds, so the land floats. */
const puff = (x, y, z, s) => { const g = group(); [[0, 0, 1], [1.1, -.1, .78], [-1.15, -.14, .72], [.4, .35, .75], [-.4, .3, .6]].forEach(([a, b, c]) => g.add(at(new THREE.Mesh(new THREE.IcosahedronGeometry(c, 2), mat('#FFFFFF', .95)), a, b, 0))); g.scale.setScalar(s); g.position.set(x, y, z); scene.add(g); };
puff(-10.5, -3.5, 3, 1.3); puff(11, -2.5, 0, 1.5); puff(9, 3, -9, 1.1); puff(-12, 2, -8, 1.3); puff(-6, -7, 9, 1.4); puff(7, -8, 8, 1.2);
const h = (k, l) => [STOPS[k][0], ground(...STOPS[k]) + l, STOPS[k][1]];
finish(st, { science: h('science', 2.1), geography: h('geography', 2), technology: h('technology', 2), reading: h('reading', 2.6), family: h('family', 1.6) });
