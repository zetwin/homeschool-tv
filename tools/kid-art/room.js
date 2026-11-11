/* My Room: a cut-away bedroom study, lit by a low sun and a desk lamp. Each thing in it is a section of the child's day. */
import { THREE, dev, stage, sun, glow, pbr, mat, box, cyl, ball, at, group, shadow, paint, gradientBg, tex, finish } from './common.js';

const phone = dev === 'phone';
const st = stage({
  exposure: 1.06, env: .62,
  fov: phone ? 32 : 19.5,
  camera: phone ? [26, 22, 26] : [15.5, 11.6, 15.5],
  look: phone ? [0, .9, 0] : [-.25, 1.15, 0],
  bg: gradientBg([[0, '#FFB463'], [.55, '#F08A4B'], [1, '#C4553A']], true),
});
const { scene } = st;
sun(scene, [-1.5, 15, 13], 2.1, '#FFE3BE', 7.5);

const wood = pbr('old_wood_floor', 2.2, { roughness: .62 });
const desktop = pbr('oak_veneer_01', 1.2, { roughness: .42 });
const wall = pbr('painted_plaster_wall', 2, { color: '#5AA9BE', roughness: .92 });
const wallB = pbr('painted_plaster_wall', 2, { color: '#4A97AF', roughness: .92 });
const white = mat('#F5F0E6', .5);
const trim = mat('#F2E7D3', .45);
const S = 3.2, H = 3.5, T = .22;

/* The block of the room. Earth and floorboards show at the cut. */
scene.add(at(box(2 * S + T, .34, 2 * S + T, mat('#F4E5CC', .7), .05), -T / 2, -.17, -T / 2));
const floor = box(2 * S, .06, 2 * S, wood, 0); scene.add(at(floor, 0, .02, 0));
scene.add(at(box(T, H, 2 * S + T, wall, .02), -S - T / 2, H / 2, -T / 2));
scene.add(at(box(2 * S, H, T, wallB, .02), 0, H / 2, -S - T / 2));
scene.add(at(box(.06, .22, 2 * S, trim, .01), -S + .03, .16, 0));
scene.add(at(box(2 * S, .22, .06, trim, .01), 0, .16, -S + .03));

/* Window on the left wall: a real mountain view from today's lesson. */
const view = tex('../../channel/assets/img/colombia-peak.jpg', 1);
const win = group(
  at(new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.55), new THREE.MeshBasicMaterial({ map: view, toneMapped: false })), 0, 0, .011),
  at(box(2.08, .1, .1, white, .02), 0, .8, .04), at(box(2.08, .1, .1, white, .02), 0, -.8, .04), at(box(.1, 1.68, .1, white, .02), -1, 0, .04), at(box(.1, 1.68, .1, white, .02), 1, 0, .04), at(box(.05, 1.55, .05, white, .01), 0, 0, .04), at(box(2.26, .07, .22, white, .02), 0, -.87, .1),
);
scene.add(at(win, -S + .01, 2.1, -1.35, Math.PI / 2));
glow(scene, [-S + 1.2, 2.2, -1.35], '#BFE3FF', 5, 5);

/* Noticeboard on the left wall: this is To do. */
const cork = mat('#B98A57', .95);
const note = (c, w, h, rot, x, y) => { const p = at(box(w, h, .012, mat(c, .9), .002), x, y, .05, 0, 0, rot); return p; };
const pin = (c, x, y) => at(ball(.026, mat(c, .3)), x, y, .075);
const board = group(
  at(box(1.72, 1.2, .06, cork, .02), 0, 0, 0), at(box(1.8, .06, .08, mat('#6E4A2A', .5), .015), 0, .62, .01), at(box(1.8, .06, .08, mat('#6E4A2A', .5), .015), 0, -.62, .01), at(box(.06, 1.28, .08, mat('#6E4A2A', .5), .015), -.88, 0, .01), at(box(.06, 1.28, .08, mat('#6E4A2A', .5), .015), .88, 0, .01),
  note('#FFE36E', .52, .46, .06, -.5, .24), pin('#E5281E', -.5, .44), note('#FFFDF4', .48, .5, -.05, .08, .24), pin('#2563EB', .08, .46), note('#FFB3C4', .5, .44, .04, .58, .22), pin('#16A34A', .58, .41), note('#BDEFA6', .56, .34, -.03, -.3, -.29), pin('#E5281E', -.3, -.14), note('#A9DCFF', .6, .34, .05, .38, -.3), pin('#FACC15', .38, -.15),
);
scene.add(at(board, -S + .03, 2.05, 1.5, Math.PI / 2));

/* The desk against the back wall: this is today's lesson. */
const legs = (w, d, h) => [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => at(box(.09, h, .09, mat('#2D2A33', .4, .4), .02), a * (w / 2 - .1), h / 2, b * (d / 2 - .1)));
const desk = group(at(box(2.7, .09, 1.1, desktop, .02), 0, .92, 0), ...legs(2.7, 1.1, .88), at(box(.7, .5, .95, mat('#E8E0D2', .55), .03), 1.0, .62, 0));
desk.children.slice(-1)[0].castShadow = true;
scene.add(at(desk, -.75, 0, -S + .62));
const dx = -.75, dz = -S + .62, dy = .965;
/* The laptop shows the lesson. */
const screenTex = tex('../../channel/assets/img/colombia-peak.jpg', 1);
screenTex.repeat.set(.9, .9);
const laptop = group(
  at(box(.82, .03, .56, mat('#C9CCD3', .3, .85), .012), 0, .015, 0),
  at(group(at(box(.82, .54, .022, mat('#C9CCD3', .3, .85), .01), 0, .27, 0), at(new THREE.Mesh(new THREE.PlaneGeometry(.76, .48), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })), 0, .27, .013)), 0, .03, -.27, 0, -.2),
);
scene.add(at(laptop, dx - .1, dy, dz + .05, .12));
glow(scene, [dx - .1, dy + .4, dz + .4], '#DDEBFF', 1.4, 2.5);
/* Lamp, with warm light across the desk. */
const metal = mat('#E5462F', .35, .35);
const lamp = group(at(cyl(.15, .17, .03, metal), 0, .015, 0), at(cyl(.016, .016, .52, metal), .03, .27, 0, 0, 0, -.1), at(cyl(.016, .016, .42, metal), .2, .62, 0, 0, 0, -.75), at(shadow(new THREE.Mesh(new THREE.ConeGeometry(.16, .2, 32, 1, true), mat('#E5462F', .35, .3, { side: THREE.DoubleSide }))), .4, .72, 0, 0, 0, .35), at(new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 16), new THREE.MeshBasicMaterial({ color: '#FFF3C8' })), .42, .66, 0));
scene.add(at(lamp, dx - 1.05, dy, dz - .1));
glow(scene, [dx - .55, dy + .58, dz], '#FFC67A', 5.5, 3.8, true);
/* Things on the desk: books, a mug and a small globe. */
scene.add(at(box(.5, .05, .36, mat('#D42A20', .55), .012), dx + .78, dy + .025, dz + .22, .2), at(box(.46, .05, .34, mat('#1D4ED8', .55), .012), dx + .78, dy + .075, dz + .22, -.1), at(box(.4, .04, .3, mat('#FFC400', .55), .012), dx + .78, dy + .12, dz + .22, .35));
scene.add(at(cyl(.055, .05, .11, mat('#FFFDF4', .35)), dx + .42, dy + .055, dz + .32));
const globeTex = tex('../../channel/assets/img/colombia-south-america.jpg', 1);
scene.add(at(group(at(cyl(.07, .1, .03, mat('#3A2A1C', .4, .3)), 0, .015, 0), at(cyl(.012, .012, .08, mat('#C9A14A', .3, .8)), 0, .06, 0), at(ball(.15, mat('#2E86C1', .32, 0, { map: globeTex })), 0, .24, 0)), dx + 1.12, dy, dz - .14));

/* A chair at the desk. */
const seat = mat('#FFC400', .5);
const chair = group(at(box(.56, .08, .56, seat, .035), 0, .55, 0), at(box(.54, .62, .07, seat, .035), 0, .92, -.26, 0, -.08), at(cyl(.03, .03, .42, mat('#25222B', .3, .6)), 0, .31, 0), at(cyl(.27, .27, .03, mat('#25222B', .3, .6)), 0, .08, 0));
scene.add(at(chair, dx - .1, 0, dz + 1.02, Math.PI + .2));

/* Bookshelf to the right of the desk: this is Lessons. One color per subject. */
const shelf = group();
const sw = 1.55, sh = 3.0, sd = .42, shelfWood = desktop;
shelf.add(at(box(.08, sh, sd, shelfWood, .012), -sw / 2, sh / 2, 0), at(box(.08, sh, sd, shelfWood, .012), sw / 2, sh / 2, 0), at(box(sw, sh, .03, mat('#264F60', .8), 0), 0, sh / 2, -sd / 2 + .02));
const COLORS = ['#D42A20', '#1D4ED8', '#0F766E', '#7E22CE', '#FFC400', '#EA580C', '#E5E0D5', '#16A34A', '#DB2777', '#0E7490', '#7C2D12'];
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (let row = 0; row < 5; row++) {
  const y = .06 + row * .73;
  shelf.add(at(box(sw, .06, sd, shelfWood, .01), 0, y, 0));
  let x = -sw / 2 + .08;
  const stop = row === 3 ? .15 : sw / 2 - .14;
  while (x < stop) {
    const w = .05 + rnd() * .06, h = .38 + rnd() * .22;
    const c = COLORS[Math.floor(rnd() * COLORS.length)];
    shelf.add(at(box(w, h, .26 + rnd() * .06, mat(c, .55), .007), x + w / 2, y + .03 + h / 2, .02));
    x += w + .004;
  }
  if (row === 3) shelf.add(at(ball(.14, mat('#FFC400', .25, .75)), .42, y + .17, .03), at(cyl(.1, .13, .05, mat('#3A2A1C', .4)), .42, y + .055, .03));
}
scene.add(at(shelf, 2.15, 0, -S + .24));

/* Wall of marks: real frames above the desk. */
const frame = (w, h, draw) => { const t = paint(Math.round(w * 500), Math.round(h * 500), draw); return group(at(box(w + .1, h + .1, .05, mat('#231F29', .35, .2), .01), 0, 0, 0), at(new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .5 })), 0, 0, .027)); };
const big = frame(.72, .86, (x, w, h) => { x.fillStyle = '#FFFDF4'; x.fillRect(0, 0, w, h); x.fillStyle = '#D42A20'; x.font = '800 230px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('11', w / 2, h * .46); x.strokeStyle = '#D42A20'; x.lineWidth = 12; x.beginPath(); x.arc(w / 2, h * .46, w * .4, 0, 7); x.stroke(); });
const small1 = frame(.44, .44, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0F766E'); g.addColorStop(1, '#0B4F4A'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '800 120px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('9', w / 2, h / 2); });
const small2 = frame(.44, .44, (x, w, h) => { x.fillStyle = '#FFC400'; x.fillRect(0, 0, w, h); x.fillStyle = '#17131F'; x.font = '800 120px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('10', w / 2, h / 2); });
const small3 = frame(.44, .44, (x, w, h) => { x.fillStyle = '#1D4ED8'; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '800 120px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('8', w / 2, h / 2); });
scene.add(at(big, -1.1, 2.48, -S + .03), at(small1, -.3, 2.72, -S + .03), at(small2, .28, 2.72, -S + .03), at(small3, -.02, 2.18, -S + .03));

/* A diary lying open on a rug, a backpack, a beanbag and a plant, so the room feels lived in. */
const rugTex = paint(1024, 1024, (x, w, h) => { x.fillStyle = '#F4E3C1'; x.fillRect(0, 0, w, h); x.strokeStyle = '#D42A20'; x.lineWidth = 40; x.strokeRect(60, 60, w - 120, h - 120); x.strokeStyle = '#1D4E63'; x.lineWidth = 16; x.strokeRect(110, 110, w - 220, h - 220); for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { x.fillStyle = (i + j) % 2 ? '#E58A3A' : '#1D4E63'; x.save(); x.translate(200 + i * 104, 200 + j * 104); x.rotate(Math.PI / 4); x.fillRect(-20, -20, 40, 40); x.restore(); } });
scene.add(at(box(3.2, .03, 2.5, mat('#fff', .95, 0, { map: rugTex }), .01), .55, .065, 1.3));
const bag = mat('#E5462F', .75, 0, { normalMap: tex('denim_fabric_nor_gl', 3, false) });
const beanbag = ball(.62, mat('#7E22CE', .85, 0, { normalMap: tex('denim_fabric_nor_gl', 3, false) })); beanbag.scale.set(1.08, .72, 1.08);
scene.add(at(beanbag, -1.75, .46, 2.25));
scene.add(at(group(at(box(.5, .58, .28, bag, .1), 0, .3, 0), at(box(.36, .26, .1, mat('#B8301F', .75), .04), 0, .22, .18), at(box(.1, .42, .05, mat('#8E2517', .8), .02), -.14, .38, -.15), at(box(.1, .42, .05, mat('#8E2517', .8), .02), .14, .38, -.15)), 1.05, .08, -1.05, .5));
const pot = group(at(cyl(.24, .17, .36, mat('#F4E5CC', .55)), 0, .18, 0));
for (let i = 0; i < 16; i++) { const a = i * 2.4, r = .1 + (i % 4) * .07; const leaf = shadow(new THREE.Mesh(new THREE.SphereGeometry(.2, 16, 16), mat(i % 2 ? '#2F855A' : '#3DA56E', .55))); leaf.scale.set(.55, 1.5, .16); pot.add(at(leaf, Math.cos(a) * r, .58 + (i % 5) * .19, Math.sin(a) * r, -a, Math.cos(a) * .55, Math.sin(a) * .55)); }
scene.add(at(pot, -2.55, .06, -2.55));
/* The open diary on the rug. */
const page = mat('#FFFDF4', .85);
const lineTex = paint(512, 340, (x, w, h) => { x.fillStyle = '#FFFDF4'; x.fillRect(0, 0, w, h); x.strokeStyle = '#7FA6C9'; x.lineWidth = 3; for (let y = 34; y < h; y += 34) { x.beginPath(); x.moveTo(24, y); x.lineTo(w - 24, y); x.stroke(); } x.fillStyle = '#1D4ED8'; x.font = '700 30px Georgia'; x.fillText('Friday', 30, 28); x.fillStyle = '#35303F'; x.font = '24px Georgia'; ['Science', 'Geography', 'Technology', 'Reading', 'Project'].forEach((t, i) => x.fillText(t, 34, 92 + i * 34 - 3)); });
scene.add(at(group(at(box(1.08, .05, .74, mat('#8E2517', .6), .012), 0, .03, 0), at(box(.5, .03, .68, page, .006), -.26, .07, 0), at(new THREE.Mesh(new THREE.PlaneGeometry(.5, .68), new THREE.MeshStandardMaterial({ map: lineTex, roughness: .85 })), .26, .086, 0, 0, -Math.PI / 2), at(box(.5, .03, .68, page, .006), .26, .07, 0), at(new THREE.Mesh(new THREE.PlaneGeometry(.5, .68), new THREE.MeshStandardMaterial({ map: lineTex, roughness: .85 })), -.26, .086, 0, 0, -Math.PI / 2)), .75, .08, 1.45, -.45));
/* Warm bounce from the rug. */
glow(scene, [.8, 1.8, 2.4], '#FFD8A8', 3.2, 6);

finish(st, { desk: [dx - .1, dy + .55, dz + .1], shelf: [2.15, 2.7, -S + .3], board: [-S + .05, 2.7, 1.5], wall: [-.6, 3.2, -S + .05], diary: [.75, .2, 1.45] });
