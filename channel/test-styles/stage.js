/* The 3D stage: real reflections, soft glow and rim light, plus one scene for each lesson interaction. All art is built from code. */
(function () {
  const T = window.THREE;
  const col = (h) => new T.Color(h).convertSRGBToLinear();
  const LOOKS = {
    lab: { sky: ['#0F3A46', '#071A22', '#02080C'], env: ['#0A2A34', '#031014'], box: '#BFF6FF', key: '#D8F6FF', rims: ['#2DE6D6', '#FF5A4E'], tissue: '#F0524A', tissueHi: '#FF8A74', bone: '#E8E6D8', accent: '#2DE6D6', accent2: '#FFD24A', body: '#7FF0E6', bloom: [.42, .5, .92], glass: .34, exposure: .92, floor: .42 },
    soft: { sky: ['#BFF0FF', '#6CC4FF', '#3D8BEB'], env: ['#FFFFFF', '#8FC8FF'], box: '#FFFFFF', key: '#FFF6E6', rims: ['#FFFFFF', '#FFB0D0'], tissue: '#FF5C57', tissueHi: '#FF9A86', bone: '#FFF4DC', accent: '#FFC21E', accent2: '#2D66E8', body: '#FFFFFF', bloom: [.14, .45, .96], glass: .5, exposure: .9, floor: .22 },
    show: { sky: ['#4A2A78', '#211338', '#0B0910'], env: ['#2C1A4A', '#0B0910'], box: '#FFE9C4', key: '#FFF0DC', rims: ['#FFC400', '#D42A20'], tissue: '#E8332A', tissueHi: '#FF7A5C', bone: '#F5F1E2', accent: '#FFC400', accent2: '#FBFAFF', body: '#FFD86B', bloom: [.36, .5, .92], glass: .36, exposure: .92, floor: .4 },
  };
  const S = { r: null, scene: null, cam: null, composer: null, bloom: null, grade: null, root: null, cur: null, look: LOOKS.show, name: 'show', t: 0, calm: false, env: null, bgTex: null, usePost: false, ray: new T.Raycaster(), ndc: new T.Vector2(), dist: 10, lookY: 0, drag: null, boost: 0, offset: 0 };

  const GRADE = {
    uniforms: { tDiffuse: { value: null }, exposure: { value: 1 }, time: { value: 0 }, dim: { value: 1 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: `uniform sampler2D tDiffuse; uniform float exposure, time, dim; varying vec2 vUv;
      vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.); }
      float rnd(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233))+time)*43758.5453); }
      void main(){ vec3 c = texture2D(tDiffuse,vUv).rgb*exposure*dim; c = aces(c);
        vec2 d = vUv-.5; c *= 1.-dot(d,d)*.62; c = pow(c,vec3(1./2.2)); c += (rnd(vUv)-.5)*.012;
        gl_FragColor = vec4(c,1.); }`,
  };

  function init(canvas) {
    try {
      S.r = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) { S.r = null; return false; }
    S.r.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    S.r.shadowMap.enabled = true; S.r.shadowMap.type = T.PCFSoftShadowMap;
    S.scene = new T.Scene();
    S.cam = new T.PerspectiveCamera(36, 1, .1, 200);
    try {
      const size = S.r.getDrawingBufferSize(new T.Vector2());
      const opts = { minFilter: T.LinearFilter, magFilter: T.LinearFilter, format: T.RGBAFormat, type: T.HalfFloatType };
      const rt = S.r.capabilities.isWebGL2 ? new T.WebGLMultisampleRenderTarget(size.x, size.y, opts) : new T.WebGLRenderTarget(size.x, size.y, opts);
      S.composer = new T.EffectComposer(S.r, rt);
      S.composer.addPass(new T.RenderPass(S.scene, S.cam));
      S.bloom = new T.UnrealBloomPass(new T.Vector2(size.x, size.y), .7, .55, .7);
      S.composer.addPass(S.bloom);
      S.grade = new T.ShaderPass(GRADE);
      S.composer.addPass(S.grade);
      S.usePost = true;
    } catch (e) {
      S.usePost = false; S.r.outputEncoding = T.sRGBEncoding; S.r.toneMapping = T.ACESFilmicToneMapping;
    }
    const lights = S.lights = {
      hemi: new T.HemisphereLight(0xffffff, 0x222233, .35),
      key: new T.DirectionalLight(0xffffff, .95),
      rimA: new T.DirectionalLight(0xffffff, .9),
      rimB: new T.DirectionalLight(0xffffff, .8),
    };
    lights.key.position.set(3, 7, 7); lights.key.castShadow = true; lights.key.shadow.mapSize.set(1024, 1024); lights.key.shadow.radius = 6;
    Object.assign(lights.key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, far: 30 });
    lights.rimA.position.set(-7, 3, -5); lights.rimB.position.set(7, 1, -4);
    Object.values(lights).forEach((l) => S.scene.add(l));
    S.floor = new T.Mesh(new T.PlaneGeometry(40, 40), new T.ShadowMaterial({ opacity: .4 }));
    S.floor.rotation.x = -Math.PI / 2; S.floor.receiveShadow = true; S.scene.add(S.floor);
    S.root = new T.Group(); S.scene.add(S.root);
    bindPointer(canvas);
    addEventListener('resize', resize);
    setLook(S.name);
    resize();
    gsap.ticker.add((time, delta) => frame(Math.min(delta / 1000, .05)));
    return true;
  }
  function frame(dt) {
    S.t += dt;
    if (S.cur?.tick) S.cur.tick(dt, S.t);
    S.boost = Math.max(0, S.boost - dt * 2.4);
    if (S.usePost) {
      S.bloom.strength = (S.calm ? S.look.bloom[0] * .55 : S.look.bloom[0]) + S.boost * .8;
      S.grade.uniforms.time.value = S.t % 10;
      S.composer.render();
    } else if (S.r) S.r.render(S.scene, S.cam);
  }
  function resize() {
    if (!S.r) return;
    const w = innerWidth, h = innerHeight;
    S.r.setSize(w, h, false);
    S.composer?.setSize(w, h);
    S.cam.aspect = w / h;
    place();
  }
  /* Keeps the scene clear of the question text and buttons, and moves back on narrow screens. */
  function place() {
    const a = S.cam.aspect, z = S.dist * (a < 1 ? 1.95 : a < 1.3 ? 1.15 : 1);
    S.cam.position.set(S.camX || 0, (S.camY ?? 1) * (z / S.dist), z);
    S.cam.lookAt(0, S.lookY, 0);
    S.cam.updateProjectionMatrix();
  }
  function setLook(name) {
    S.name = name; S.look = LOOKS[name]; const L = S.look;
    const c = document.createElement('canvas'); c.width = 64; c.height = 256;
    const g = c.getContext('2d'), grad = g.createLinearGradient(0, 0, 0, 256);
    L.sky.forEach((k, i) => grad.addColorStop(i / (L.sky.length - 1), k));
    g.fillStyle = grad; g.fillRect(0, 0, 64, 256);
    S.bgTex?.dispose(); S.bgTex = new T.CanvasTexture(c); S.bgTex.encoding = T.sRGBEncoding;
    S.scene.background = S.bgTex;
    /* Reflections: a tiny studio that glossy things mirror. */
    const es = new T.Scene();
    /* The reflection tool stores colors in a special format that plain materials handle for us. */
    const dome = new T.SphereGeometry(20, 24, 16), top = col(L.env[0]), low = col(L.env[1]), tint = new T.Color(), domeColors = [];
    for (let i = 0; i < dome.attributes.position.count; i++) { tint.copy(low).lerp(top, dome.attributes.position.getY(i) / 40 + .5); domeColors.push(tint.r, tint.g, tint.b); }
    dome.setAttribute('color', new T.Float32BufferAttribute(domeColors, 3));
    es.add(new T.Mesh(dome, new T.MeshBasicMaterial({ vertexColors: true, side: T.BackSide })));
    const panel = (x, y, z, w, h, power, color) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: col(color).multiplyScalar(power), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m); };
    panel(0, 12, 6, 14, 6, 2.6, L.box); panel(-13, 2, 6, 3, 12, 2, L.rims[0]); panel(13, 2, 4, 3, 12, 2, L.rims[1]); panel(0, -4, 14, 12, 2, .5, L.box);
    const pm = new T.PMREMGenerator(S.r);
    S.env?.dispose(); S.env = pm.fromScene(es, .03).texture; S.scene.environment = S.env; pm.dispose();
    S.lights.key.color = col(L.key); S.lights.rimA.color = col(L.rims[0]); S.lights.rimB.color = col(L.rims[1]);
    S.floor.material.opacity = L.floor;
    if (S.usePost) { S.bloom.radius = L.bloom[1]; S.bloom.threshold = L.bloom[2]; S.grade.uniforms.exposure.value = L.exposure; }
    else S.r.toneMappingExposure = L.exposure;
  }
  function clear() {
    S.drag = null;
    S.root.traverse((o) => { o.geometry?.dispose(); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose()); });
    S.scene.remove(S.root);
    S.root = new T.Group(); S.scene.add(S.root);
    S.cur = null;
  }
  function frameCam(dist, y, lookY, x = 0) { S.dist = dist; S.camY = y; S.lookY = lookY; S.camX = x; place(); }

  /* Pointer: scenes get a tap or a drag, in screen pixels. */
  function bindPointer(el) {
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', (e) => { S.drag = { x: e.clientX, y: e.clientY, moved: 0 }; el.setPointerCapture?.(e.pointerId); S.cur?.down?.(e); });
    el.addEventListener('pointermove', (e) => { if (S.drag) { S.drag.moved += Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0); S.cur?.drag?.(e, e.clientX - S.drag.x, e.clientY - S.drag.y); } else S.cur?.hover?.(e); });
    el.addEventListener('pointerup', (e) => { const d = S.drag; S.drag = null; if (d) { if (d.moved < 10) S.cur?.tap?.(e); S.cur?.up?.(e); } });
  }
  function pick(e, list) {
    S.ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    S.ray.setFromCamera(S.ndc, S.cam);
    return S.ray.intersectObjects(list, false)[0] || null;
  }
  const toScreen = (v) => { const p = v.clone(); p.project(S.cam); return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight }; };

  /* ---------- Materials ---------- */
  /* Muscle fibers run along the muscle: lengthwise for spindles and cells, around for the food tube. */
  function fibers(base, hi, around = false) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = base; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 300; i++) {
      const at = Math.random() * 512, w = 1 + Math.random() * 3.5;
      g.globalAlpha = .07 + Math.random() * .22; g.fillStyle = i % 2 ? hi : '#6E1014';
      if (around) g.fillRect(at, 0, w, 512); else g.fillRect(0, at, 512, w);
    }
    const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = 8;
    return t;
  }
  const tissue = (o = {}) => new T.MeshPhysicalMaterial({ color: col(S.look.tissue), roughness: .36, metalness: 0, clearcoat: .9, clearcoatRoughness: .28, envMapIntensity: 1.1, ...o });
  const bone = () => new T.MeshPhysicalMaterial({ color: col(S.look.bone), roughness: .42, clearcoat: .5, clearcoatRoughness: .4 });
  const glow = (color, power = 2.6) => new T.MeshBasicMaterial({ color: col(color).multiplyScalar(power), toneMapped: false });
  const mesh = (geo, mat, parent, x = 0, y = 0, z = 0, shadow = true) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; (parent || S.root).add(m); return m; };
  const spindle = (len, r, seg = 48) => { /* A muscle shape along X. */
    const pts = []; const n = 44;
    for (let i = 0; i <= n; i++) { const f = i / n, s = Math.sin(f * Math.PI); pts.push(new T.Vector2(Math.max(.002, r * (s ** .78)), (f - .5) * len)); }
    const g = new T.LatheGeometry(pts, seg); g.rotateZ(Math.PI / 2); return g;
  };
  const fresnel = (color, base, power = 2.6) => new T.ShaderMaterial({
    transparent: true, depthWrite: false, side: T.FrontSide,
    uniforms: { c: { value: col(color) }, base: { value: base }, p: { value: power } },
    vertexShader: 'varying vec3 n,v; void main(){ vec4 m = modelViewMatrix*vec4(position,1.); n = normalize(normalMatrix*normal); v = normalize(-m.xyz); gl_Position = projectionMatrix*m; }',
    fragmentShader: 'uniform vec3 c; uniform float base,p; varying vec3 n,v; void main(){ float f = pow(1.-abs(dot(normalize(n),normalize(v))),p); gl_FragColor = vec4(c*(1.+f*2.2), base+f*.92); }',
  });

  /* ---------- Contract: pull one bone toward the other, and the muscle really shortens and thickens ---------- */
  function muscleScene({ onLength, onReached, hero }) {
    clear();
    frameCam(15, 1.6, .2);
    S.floor.position.y = -1.95;
    const L = S.look, group = new T.Group(); S.root.add(group);
    const map = fibers(L.tissue, L.tissueHi); map.rotation = Math.PI / 2;
    const mat = tissue({ map, color: 0xffffff, bumpMap: map, bumpScale: .008, emissive: col(L.tissue), emissiveIntensity: 0 });
    const FULL = 5.4, muscle = mesh(spindle(FULL, 1.02), mat, group, 0, .1);
    const tendon = new T.MeshPhysicalMaterial({ color: col('#EFE8D2'), roughness: .3, clearcoat: .8 });
    const tL = mesh(new T.CylinderGeometry(.09, .15, .9, 14), tendon, group); tL.rotation.z = Math.PI / 2;
    const tR = mesh(new T.CylinderGeometry(.15, .09, .9, 14), tendon, group); tR.rotation.z = Math.PI / 2;
    const bm = bone(), bar = (x) => { const g = new T.Group(); g.position.set(x, .1, 0); group.add(g); mesh(new T.CylinderGeometry(.32, .32, 3.5, 24), bm, g); mesh(new T.SphereGeometry(.46, 24, 18), bm, g, 0, 1.75).scale.set(1, .8, 1); mesh(new T.SphereGeometry(.46, 24, 18), bm, g, 0, -1.75).scale.set(1, .8, 1); return g; };
    const boneL = bar(-3.5), boneR = bar(3.5);
    const ring = mesh(new T.TorusGeometry(.82, .055, 12, 48), glow(L.accent, 3), boneR, 0, 0, 0, false); ring.rotation.y = Math.PI / 2;
    const ring2 = mesh(new T.TorusGeometry(.82, .03, 8, 48), glow(L.accent, 3), boneR, 0, 0, 0, false); ring2.rotation.y = Math.PI / 2;
    const state = { k: 1, target: 1, held: false, reached: false, flex: 0 };
    function apply(k) {
      const len = FULL * k, r = 1 / Math.sqrt(k);
      muscle.scale.set(k, r, r);
      map.repeat.set(1, 1); map.offset.y = 0;
      const half = len / 2 * .96;
      tL.position.set(-half - .35, .1, 0); tR.position.set(half + .35, .1, 0);
      boneL.position.x = -half - .82; boneR.position.x = half + .82;
      mat.emissiveIntensity = (1 - k) * 1.5;
      onLength?.(k);
    }
    apply(1);
    return S.cur = {
      tick(dt, t) {
        group.rotation.y = Math.sin(t * .42) * .13; group.rotation.x = Math.sin(t * .31) * .04;
        if (hero || state.flex) state.target = .72 + Math.sin(t * 2.6) * .16;
        state.k += (state.target - state.k) * Math.min(1, dt * (state.held ? 22 : 7));
        apply(state.k);
        const pulse = 1 + Math.sin(t * 4) * .12; ring2.scale.setScalar(state.reached && !state.flex ? 1 : pulse * 1.25);
        ring2.material.opacity = 1;
      },
      down(e) { if (hero || state.flex || state.reached) return; state.held = true; state.start = state.k; },
      drag(e, dx) { if (!state.held) return; const w = Math.max(innerWidth * .34, 260); state.target = Math.max(.6, Math.min(1, state.start + dx / w * .55)); if (state.target <= .64 && !state.reached) { state.reached = true; state.held = false; state.target = .62; S.boost = .7; onReached?.(); } },
      up() { state.held = false; if (!state.reached) state.target = 1; },
      nudge(d) { if (state.reached) return; state.target = Math.max(.6, Math.min(1, state.target + d)); if (state.target <= .64) { state.reached = true; state.target = .62; S.boost = .7; onReached?.(); } },
      flex() { state.flex = 1; ring.visible = ring2.visible = false; S.boost = 1; },
      point: () => toScreen(new T.Vector3(0, .6, 0)),
      handle: () => toScreen(boneR.getWorldPosition(new T.Vector3())),
    };
  }

  /* ---------- Fuel: send things into the blood. Only what the cell uses reaches it. ---------- */
  function fuelScene({ onArrive }) {
    clear();
    frameCam(15.5, 1, 1.05);
    S.floor.position.y = -3.4;
    const L = S.look, group = new T.Group(); S.root.add(group);
    const curve = new T.CatmullRomCurve3([[-9, 2.8, 0], [-5, 3.15, 0], [-1, 2.65, .1], [3, 3.1, 0], [9, 2.75, 0]].map((p) => new T.Vector3(...p)));
    mesh(new T.TubeGeometry(curve, 70, .86, 28), new T.MeshPhysicalMaterial({ color: col('#8F1016'), roughness: .16, clearcoat: 1, transparent: true, opacity: L.glass + .12, depthWrite: false, side: T.DoubleSide }), group, 0, 0, 0, false);
    const N = 40, cellMat = new T.MeshPhysicalMaterial({ color: col('#E5262E'), roughness: .3, clearcoat: .8 });
    const blood = new T.InstancedMesh(new T.SphereGeometry(.24, 14, 10), cellMat, N); group.add(blood);
    const bloodData = Array.from({ length: N }, () => ({ u: Math.random(), y: (Math.random() - .5) * 1, z: (Math.random() - .5) * 1, s: .7 + Math.random() * .5, r: Math.random() * 6 }));
    const m4 = new T.Matrix4(), q = new T.Quaternion(), e3 = new T.Euler(), p3 = new T.Vector3(), s3 = new T.Vector3();
    /* The muscle cell */
    const map = fibers(L.tissue, L.tissueHi); map.rotation = Math.PI / 2;
    const cellShell = new T.MeshPhysicalMaterial({ map, color: 0xffffff, roughness: .28, clearcoat: 1, transparent: true, opacity: .62, depthWrite: false, side: T.DoubleSide, emissive: col(L.tissue), emissiveIntensity: .05 });
    const cell = new T.Group(); cell.position.set(0, -.75, 0); group.add(cell);
    const shell = new T.Mesh(capsule(6.2, 1.5), cellShell); cell.add(shell); shell.renderOrder = 2;
    const mitos = [-3.2, -1.9, -.65, .65, 1.9, 3.2].map((x, i) => { const m = new T.MeshPhysicalMaterial({ color: col('#7C5A2A'), roughness: .3, clearcoat: .8, emissive: col(L.accent2 === '#FBFAFF' ? L.accent : L.accent), emissiveIntensity: 0 }); const o = mesh(new T.SphereGeometry(.56, 24, 16), m, cell, x, (i % 2 ? -.34 : .3), .1, false); o.scale.set(1.5, .72, .72); return o; });
    const orbs = [];
    function orb(color) { const m = mesh(new T.IcosahedronGeometry(.34, 2), glow(color, 2.8), group, 0, 0, .3, false); orbs.push(m); return m; }
    let powered = 0, flexing = 0;
    return S.cur = {
      tick(dt, t) {
        group.rotation.y = Math.sin(t * .3) * .06;
        bloodData.forEach((b, i) => {
          b.u = (b.u + dt * (.05 + powered * .02)) % 1; curve.getPointAt(b.u, p3);
          p3.y += b.y * .55 + Math.sin(t * 2 + i) * .05; p3.z += b.z * .55; b.r += dt * 1.4;
          e3.set(b.r, b.r * .6, 0); q.setFromEuler(e3); s3.set(b.s, b.s * .46, b.s);
          blood.setMatrixAt(i, m4.compose(p3, q, s3));
        });
        blood.instanceMatrix.needsUpdate = true;
        if (flexing) { const k = 1 - (Math.sin(t * 3.6) * .5 + .5) * .24; cell.scale.set(k, 1 / Math.sqrt(k), 1 / Math.sqrt(k)); }
        map.offset.x = t * .012;
        orbs.forEach((o) => { o.rotation.y += dt * 3; });
      },
      /* Sends a token from a point on screen into the blood. */
      send(kind, color, good, startX) {
        const o = orb(color), from = new T.Vector3((startX / innerWidth - .5) * 11, -4, 1);
        o.position.copy(from);
        const entry = new T.Vector3((startX / innerWidth - .5) * 7, 2.85, 0);
        gsap.to(o.position, { x: entry.x, y: entry.y, z: 0, duration: .55, ease: 'power2.out', onComplete: () => {
          S.boost = Math.max(S.boost, .3);
          if (!good) {
            gsap.to(o.position, { x: entry.x + 1.8, y: 7, z: 2, duration: .6, ease: 'power1.in' });
            gsap.to(o.scale, { x: .01, y: .01, z: .01, duration: .6, onComplete: () => o.removeFromParent() });
            onArrive?.(kind, false, toScreen(entry));
            return;
          }
          const targets = powered === 0 ? mitos.slice(0, 3) : mitos.slice(3);
          const to = targets[1].getWorldPosition(new T.Vector3());
          gsap.to(o.position, { x: to.x, y: to.y, z: to.z, duration: .7, ease: 'power2.in', onComplete: () => {
            o.removeFromParent();
            targets.forEach((m, i) => gsap.to(m.material, { emissiveIntensity: 2.6, duration: .4, delay: i * .1 }));
            S.boost = .8; powered++;
            onArrive?.(kind, true, toScreen(to), powered);
          } });
        } });
      },
      flex() { flexing = 1; gsap.to(cellShell, { emissiveIntensity: .7, duration: .5 }); S.boost = 1.2; },
      point: () => toScreen(new T.Vector3(0, -.75, 0)),
    };
  }
  function capsule(len, r) {
    const pts = [], n = 18;
    for (let i = 0; i <= n; i++) { const a = -Math.PI / 2 + i / n * Math.PI / 2; pts.push(new T.Vector2(Math.max(.001, Math.cos(a) * r), Math.sin(a) * r - len / 2)); }
    for (let i = 0; i <= n; i++) { const a = i / n * Math.PI / 2; pts.push(new T.Vector2(Math.max(.001, Math.cos(a) * r), Math.sin(a) * r + len / 2)); }
    const g = new T.LatheGeometry(pts, 40); g.rotateZ(Math.PI / 2); return g;
  }

  /* ---------- Find: a body you can turn, with real places to tap ---------- */
  function bodyScene({ onPick, onHover, answer, showBack }) {
    clear();
    frameCam(15, 1, .35);
    S.floor.position.y = -3.65;
    const L = S.look, group = new T.Group(); group.position.y = .35; S.root.add(group);
    const shell = fresnel(L.body, L.glass * .32);
    const limb = (a, b, r1, r2) => {
      const A = new T.Vector3(...a), B = new T.Vector3(...b), mid = A.clone().add(B).multiplyScalar(.5), len = A.distanceTo(B);
      const m = new T.Mesh(new T.CylinderGeometry(r2, r1, len, 24, 1, true), shell); m.position.copy(mid); m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), B.clone().sub(A).normalize()); group.add(m); m.renderOrder = 5;
      [[A, r1], [B, r2]].forEach(([p, r]) => { const c = new T.Mesh(new T.SphereGeometry(r, 18, 14), shell); c.position.copy(p); group.add(c); c.renderOrder = 5; });
    };
    /* Torso from a smooth outline */
    const prof = [[.01, 2.42], [.3, 2.4], [.88, 2.18], [1.08, 1.75], [.96, 1.1], [.78, .55], [.72, .12], [.82, -.3], [.86, -.66], [.5, -.92], [.01, -.98]].map(([x, y]) => new T.Vector2(x, y));
    const torso = new T.Mesh(new T.LatheGeometry(new T.SplineCurve(prof).getPoints(40), 40), shell); torso.scale.z = .56; group.add(torso); torso.renderOrder = 5;
    const head = new T.Mesh(new T.SphereGeometry(.56, 28, 22), shell); head.position.y = 3.24; head.scale.set(.86, 1.06, .94); group.add(head); head.renderOrder = 5;
    limb([0, 2.42, 0], [0, 2.8, 0], .22, .2);
    [-1, 1].forEach((s) => { limb([s * 1.06, 2.05, 0], [s * 1.34, .75, 0], .25, .19); limb([s * 1.34, .75, 0], [s * 1.5, -.42, .05], .19, .13); limb([s * .42, -.82, 0], [s * .5, -2.2, 0], .36, .23); limb([s * .5, -2.2, 0], [s * .52, -3.5, 0], .23, .13); });
    /* Inside: real places */
    const muscleMat = () => tissue({ emissive: col(L.tissue), emissiveIntensity: .12 });
    const zones = {};
    const zone = (name, label, meshes, at, pickR) => { const hit = new T.Mesh(new T.SphereGeometry(pickR, 10, 8), new T.MeshBasicMaterial({ visible: false })); hit.position.copy(at); hit.scale.set(...(zone.sc || [1, 1, 1])); group.add(hit); hit.userData.zone = name; zones[name] = { name, label, meshes, at, hit }; };
    const heartShape = new T.Shape(); heartShape.moveTo(0, -.34); heartShape.bezierCurveTo(-.5, 0, -.42, .42, -.16, .42); heartShape.bezierCurveTo(-.05, .42, 0, .32, 0, .24); heartShape.bezierCurveTo(0, .32, .05, .42, .16, .42); heartShape.bezierCurveTo(.42, .42, .5, 0, 0, -.34);
    const hg = new T.ExtrudeGeometry(heartShape, { depth: .22, bevelEnabled: true, bevelSize: .1, bevelThickness: .12, bevelSegments: 6, curveSegments: 24 }); hg.center();
    const heart = mesh(hg, tissue({ color: col('#E4122A'), emissive: col('#E4122A'), emissiveIntensity: .25 }), group, .2, 1.62, .05, false); heart.scale.setScalar(.92); heart.rotation.z = -.2;
    zone('heart', 'Cardiac muscle: the heart', [heart], new T.Vector3(.2, 1.62, .1), .46);
    const gutCurve = new T.CatmullRomCurve3([[-.42, .62], [.42, .55], [.5, .28], [-.42, .28], [-.5, .02], [.42, .02], [.5, -.26], [-.38, -.28], [-.2, -.55], [.1, -.62]].map(([x, y], i) => new T.Vector3(x, y, Math.sin(i * 1.7) * .08)));
    const gut = mesh(new T.TubeGeometry(gutCurve, 90, .115, 14), tissue({ color: col('#F08A6E'), emissive: col('#F08A6E'), emissiveIntensity: .1 }), group, 0, 0, 0, false);
    const stomach = mesh(new T.SphereGeometry(.34, 22, 16), tissue({ color: col('#F08A6E'), emissive: col('#F08A6E'), emissiveIntensity: .1 }), group, -.22, .96, .02, false); stomach.scale.set(1.2, .8, .7);
    zone('gut', 'Smooth muscle: stomach and intestines', [gut, stomach], new T.Vector3(0, .25, 0), .78);
    const arms = [-1, 1].map((s) => { const a = mesh(spindle(1.15, .17, 18), muscleMat(), group, s * 1.2, 1.4, .06, false); a.rotation.z = Math.PI / 2 - s * .21; return a; });
    arms.forEach((a, i) => { const s = i ? 1 : -1; zone(i ? 'armR' : 'armL', 'Skeletal muscle: the biceps', arms, new T.Vector3(s * 1.2, 1.4, .06), .44); });
    const quads = [-1, 1].map((s) => { const a = mesh(spindle(1.25, .27, 18), muscleMat(), group, s * .46, -1.55, .05, false); a.rotation.z = Math.PI / 2 + s * .05; return a; });
    quads.forEach((a, i) => { const s = i ? 1 : -1; zone(i ? 'legR' : 'legL', 'Skeletal muscle: the thigh', quads, new T.Vector3(s * .46, -1.55, .05), .5); });
    const hits = Object.values(zones).map((z) => z.hit);
    const base = new Map(); Object.values(zones).forEach((z) => z.meshes.forEach((m) => base.set(m, m.material.emissiveIntensity)));
    const st = { rot: 0, vel: 0, target: 0, hover: null, chosen: null, beat: 1, startRot: 0, locked: false };
    const glowZone = (z, v, dur = .15) => z.meshes.forEach((m) => gsap.to(m.material, { emissiveIntensity: v, duration: dur }));
    return S.cur = {
      zones,
      tick(dt, t) {
        if (!S.drag) st.target += Math.sin(t * .5) * dt * .1;
        st.rot += (st.target - st.rot) * Math.min(1, dt * 9); group.rotation.y = st.rot;
        const b = Math.max(Math.sin(t * 5.2 * st.beat) ** 3, 0);
        heart.scale.setScalar(.92 + b * (st.beat > 1 ? .28 : .09));
      },
      down() { st.startRot = st.target; },
      drag(e, dx) { st.target = st.startRot + dx * .011; document.body.style.cursor = 'grabbing'; },
      up() { document.body.style.cursor = ''; },
      hover(e) { if (st.locked) return; const h = pick(e, hits), n = h ? h.object.userData.zone : null; if (n !== st.hover) { if (st.hover && st.hover !== st.chosen) glowZone(zones[st.hover], base.get(zones[st.hover].meshes[0])); st.hover = n; if (n) glowZone(zones[n], 1.1); document.body.style.cursor = n ? 'pointer' : ''; onHover?.(n && zones[n]); } },
      tap(e) { if (st.locked) return; const h = pick(e, hits); if (!h) return; const z = zones[h.object.userData.zone]; S.cur.choose(z); onPick?.(z, toScreen(z.hit.getWorldPosition(new T.Vector3()))); },
      choose(z) { if (st.chosen) glowZone(zones[st.chosen], base.get(zones[st.chosen].meshes[0])); st.chosen = z.name; glowZone(z, 1.5, .1); },
      lock() { st.locked = true; document.body.style.cursor = ''; },
      celebrate(name) { st.beat = name === 'heart' ? 1.5 : 1; S.boost = 1; glowZone(zones[name], 2.4, .2); },
      reveal(name) { glowZone(zones[name], 2.4, .2); st.target = Math.round(st.target / (Math.PI * 2)) * Math.PI * 2; },
      where: (name) => toScreen(zones[name].hit.getWorldPosition(new T.Vector3())),
      setChosen(name) { if (name && zones[name]) S.cur.choose(zones[name]); },
    };
  }

  /* ---------- Squeeze: tap behind the food to push it along ---------- */
  function squeezeScene({ onResult }) {
    clear();
    frameCam(15, 1.6, .25);
    S.floor.position.y = -2.45;
    const L = S.look, group = new T.Group(); S.root.add(group);
    const LEN = 13, SEG = 110, RAD = 30, R0 = 1.34;
    const pos = new Float32Array((SEG + 1) * (RAD + 1) * 3), uv = new Float32Array((SEG + 1) * (RAD + 1) * 2), index = [];
    for (let i = 0; i < SEG; i++) for (let j = 0; j < RAD; j++) { const a = i * (RAD + 1) + j, b = a + RAD + 1; index.push(a, a + 1, b, b, a + 1, b + 1); }
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('uv', new T.BufferAttribute(uv, 2)); geo.setIndex(index);
    const map = fibers(L.tissue, L.tissueHi, true); map.repeat.set(2, 1);
    const wall = new T.MeshPhysicalMaterial({ map, color: 0xffffff, roughness: .24, clearcoat: 1, clearcoatRoughness: .2, transparent: true, opacity: .56 + L.glass * .1, side: T.DoubleSide, depthWrite: false, emissive: col(L.tissue), emissiveIntensity: .06 });
    const tube = new T.Mesh(geo, wall); tube.renderOrder = 3; group.add(tube);
    const food = mesh(new T.IcosahedronGeometry(.82, 3), new T.MeshPhysicalMaterial({ color: col('#FFC23A'), roughness: .36, clearcoat: .7, emissive: col('#FF9A1E'), emissiveIntensity: .32 }), group, -3.1, 0, 0, false);
    const goal = mesh(new T.TorusGeometry(1.62, .05, 10, 48), glow(L.accent, 3), group, 5.9, 0, 0, false); goal.rotation.y = Math.PI / 2;
    const squeezes = [];
    const st = { fx: -3.1, won: false, tried: false, first: null, stuck: 0 };
    function radiusAt(x) {
      let r = R0;
      const bulge = Math.exp(-(((x - st.fx) / 1.1) ** 2)) * .12;
      r += bulge;
      squeezes.forEach((s) => { r -= s.amp * (R0 - .22) * Math.exp(-(((x - s.x) / .62) ** 2)); });
      return Math.max(.2, r);
    }
    function rebuild() {
      let k = 0, u = 0;
      for (let i = 0; i <= SEG; i++) {
        const x = -LEN / 2 + i / SEG * LEN, r = radiusAt(x);
        for (let j = 0; j <= RAD; j++) { const a = j / RAD * Math.PI * 2; pos[k++] = x; pos[k++] = Math.cos(a) * r; pos[k++] = Math.sin(a) * r; uv[u++] = i / SEG * 3; uv[u++] = j / RAD; }
      }
      geo.attributes.position.needsUpdate = true; geo.attributes.uv.needsUpdate = true; geo.computeVertexNormals();
    }
    rebuild();
    const plane = new T.Mesh(new T.PlaneGeometry(LEN, 5), new T.MeshBasicMaterial({ visible: false })); group.add(plane);
    return S.cur = {
      tick(dt, t) {
        group.rotation.x = -.14; group.rotation.y = Math.sin(t * .36) * .05;
        goal.scale.setScalar(1 + Math.sin(t * 3.4) * .03);
        food.rotation.z -= dt * (st.moving ? 3 : .2);
        food.position.x = st.fx;
        const squash = squeezes.reduce((m, s) => Math.max(m, s.amp * Math.exp(-(((st.fx - s.x) / .9) ** 2))), 0);
        food.scale.set(1 + squash * .25, 1 - squash * .2, 1 - squash * .2);
        rebuild();
      },
      tap(e) {
        if (st.won) return;
        const h = pick(e, [plane]); if (!h) return;
        const x = group.worldToLocal(h.point.clone()).x;
        const behind = x < st.fx - .3 && x > st.fx - 4, inFront = x > st.fx + .3;
        const s = { x, amp: 0 }; squeezes.push(s);
        S.boost = Math.max(S.boost, .35);
        if (st.first === null) st.first = behind;
        if (behind) {
          /* The squeeze travels forward and carries the food. */
          st.moving = true;
          gsap.to(s, { amp: 1, duration: .22, ease: 'power2.out' });
          gsap.to(s, { x: 5.2, duration: 1.45, delay: .15, ease: 'power1.inOut', onUpdate: () => { if (s.x + 1.05 > st.fx) st.fx = s.x + 1.05; }, onComplete: () => {
            gsap.to(s, { amp: 0, duration: .3, onComplete: () => squeezes.splice(squeezes.indexOf(s), 1) });
            st.moving = false; st.won = true;
            onResult?.(true, st.first, toScreen(new T.Vector3(5.9, 0, 0)));
          } });
        } else {
          gsap.to(s, { amp: 1, duration: .2, ease: 'power2.out' });
          gsap.to(s, { amp: 0, duration: .38, delay: .55, ease: 'power2.in', onComplete: () => squeezes.splice(squeezes.indexOf(s), 1) });
          if (inFront) gsap.fromTo(st, { fx: st.fx }, { fx: st.fx - .28, duration: .2, yoyo: true, repeat: 1, ease: 'power2.out' });
          onResult?.(false, st.first, toScreen(new T.Vector3(x, 0, 0)), inFront ? 'front' : 'far');
        }
      },
      /* Keyboard and remote: squeeze just behind the food. */
      auto() { if (!st.won) S.cur.tap({ clientX: toScreen(new T.Vector3(st.fx - 1.2, 0, 0)).x, clientY: toScreen(new T.Vector3(st.fx - 1.2, 0, 0)).y }); },
      point: () => toScreen(new T.Vector3(0, 0, 0)),
      foodAt: () => toScreen(new T.Vector3(st.fx, 0, 0)),
    };
  }

  window.Stage = {
    init, setLook, muscleScene, fuelScene, bodyScene, squeezeScene,
    setCalm(v) { S.calm = v; if (S.usePost) gsap.to(S.grade.uniforms.dim, { value: v ? .6 : 1, duration: .5 }); },
    boost(v) { S.boost = v; },
    get ok() { return !!S.r; },
    get current() { return S.cur; },
  };
})();
