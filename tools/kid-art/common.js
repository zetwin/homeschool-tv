/* Shared kit for the Kid Lab's 3D art. Scenes are rendered once to images, so children's devices need no 3D at all.
   Render with: node tools/kid-art/render.mjs <scene> */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export { THREE, RoundedBoxGeometry };
const q = new URLSearchParams(location.search);
export const dev = q.get('dev') || 'pad';
const W = +q.get('w') || innerWidth, H = +q.get('h') || innerHeight;
export const aspect = W / H;
export const param = (k) => q.get(k);
const loader = new THREE.TextureLoader();
const waits = [];
export function tex(file, repeat = 1, color = true) {
  const t = loader.load(file.includes('/') ? file : `tex/${file}.jpg`); waits.push(new Promise((ok) => { const i = new Image(); i.onload = i.onerror = ok; i.src = file.includes('/') ? file : `tex/${file}.jpg`; }));
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, Array.isArray(repeat) ? repeat[1] : repeat); t.anisotropy = 16;
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
export const pbr = (name, repeat, opts = {}) => new THREE.MeshStandardMaterial({ map: tex(`${name}_diff`, repeat), normalMap: tex(`${name}_nor_gl`, repeat, false), roughness: .8, ...opts });
export const mat = (color, roughness = .6, metalness = 0, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
export function box(w, h, d, m, r = .03) { const g = r ? new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2 - .001, h / 2 - .001, d / 2 - .001)) : new THREE.BoxGeometry(w, h, d); return shadow(new THREE.Mesh(g, m)); }
export function shadow(o) { o.castShadow = o.receiveShadow = true; return o; }
export const at = (o, x, y, z, ry = 0, rx = 0, rz = 0) => { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); return o; };
export function cyl(rt, rb, h, m, seg = 32) { return shadow(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m)); }
export function ball(r, m, seg = 32) { return shadow(new THREE.Mesh(new THREE.SphereGeometry(r, seg, seg), m)); }
export function group(...kids) { const g = new THREE.Group(); g.add(...kids); return g; }
/* A flat picture or sign drawn with canvas. */
export function paint(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 16; return t; }
export function gradientBg(stops, radial = false) { return paint(1024, 1024, (x, w, h) => { const g = radial ? x.createRadialGradient(w * .5, h * .42, 40, w * .5, h * .5, w * .78) : x.createLinearGradient(0, 0, 0, h); stops.forEach(([p, c]) => g.addColorStop(p, c)); x.fillStyle = g; x.fillRect(0, 0, w, h); }); }
export function stage({ exposure = 1, env = .5, bg, fov = 24, camera = [10, 8, 10], look = [0, 1, 0], transparent = false }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent, preserveDrawingBuffer: true });
  renderer.setSize(W, H); renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = exposure;
  if (transparent) renderer.setClearColor(0, 0);
  document.body.append(renderer.domElement);
  const scene = new THREE.Scene(); if (bg) scene.background = bg;
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture; scene.environmentIntensity = env;
  const cam = new THREE.PerspectiveCamera(fov, aspect, .1, 400); cam.position.set(...camera); cam.lookAt(...look);
  return { renderer, scene, cam };
}
export function sun(scene, pos, intensity = 3, color = '#FFF1DC', spread = 9, map = 4096) {
  const l = new THREE.DirectionalLight(color, intensity); l.position.set(...pos); l.castShadow = true; l.shadow.mapSize.set(map, map);
  Object.assign(l.shadow.camera, { left: -spread, right: spread, top: spread, bottom: -spread, near: .5, far: 80 }); l.shadow.bias = -.0004; l.shadow.radius = 5; l.shadow.blurSamples = 16; scene.add(l); return l;
}
export function glow(scene, pos, color, intensity, distance = 8, shadows = false) { const l = new THREE.PointLight(color, intensity, distance, 2); l.position.set(...pos); if (shadows) { l.castShadow = true; l.shadow.mapSize.set(2048, 2048); l.shadow.radius = 6; l.shadow.bias = -.002; } scene.add(l); return l; }
/* Finished: renders, and writes where the tap points fall on screen, as fractions of the width and height. */
export async function finish({ renderer, scene, cam }, spots = {}) {
  await Promise.all(waits); await new Promise((r) => setTimeout(r, 300));
  renderer.render(scene, cam); renderer.render(scene, cam);
  const out = {}; Object.entries(spots).forEach(([k, p]) => { const v = new THREE.Vector3(...p).project(cam); out[k] = [+((v.x + 1) / 2).toFixed(4), +((1 - v.y) / 2).toFixed(4)]; });
  const pre = document.createElement('pre'); pre.id = 'spots'; pre.style.display = 'none'; pre.textContent = JSON.stringify(out); document.body.append(pre);
  const png = document.createElement('pre'); png.id = 'png'; png.style.display = 'none'; png.textContent = renderer.domElement.toDataURL('image/png'); document.body.append(png);
  document.title = 'done';
}
