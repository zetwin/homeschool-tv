/* The 3D worlds behind each style. All original low-poly art, built from code. Each returns a small controller the game calls. */
(function () {
  const T = window.THREE;
  const std = (color, o = {}) => new T.MeshStandardMaterial({ color, flatShading: true, roughness: .85, metalness: 0, ...o });
  const basic = (color, o = {}) => new T.MeshBasicMaterial({ color, ...o });
  function mesh(geo, mat, parent, x = 0, y = 0, z = 0, shadow = true) {
    const m = new T.Mesh(geo, mat);
    m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = shadow;
    parent?.add(m);
    return m;
  }
  function light(scene, hemi, ground, sun, power, pos = [6, 12, 8]) {
    scene.add(new T.HemisphereLight(hemi, ground, 1));
    const d = new T.DirectionalLight(sun, power);
    d.position.set(...pos); d.castShadow = true;
    d.shadow.mapSize.set(1024, 1024);
    Object.assign(d.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, far: 50 });
    scene.add(d);
    return d;
  }
  const glowTexture = (() => {
    let tex = null;
    return () => {
      if (tex) return tex;
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const g = c.getContext('2d'), r = g.createRadialGradient(64, 64, 2, 64, 64, 64);
      r.addColorStop(0, '#fff'); r.addColorStop(.25, '#ffffffaa'); r.addColorStop(1, '#ffffff00');
      g.fillStyle = r; g.fillRect(0, 0, 128, 128);
      tex = new T.CanvasTexture(c);
      return tex;
    };
  })();
  const glow = (color, size, parent, x = 0, y = 0, z = 0) => {
    const s = new T.Sprite(new T.SpriteMaterial({ map: glowTexture(), color, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
    s.scale.set(size, size, 1); s.position.set(x, y, z); parent?.add(s);
    return s;
  };
  const flight = (obj, from, to, height, duration, onDone) => {
    const p = { t: 0 };
    obj.visible = true;
    gsap.to(p, { t: 1, duration, ease: 'power1.in', onUpdate: () => { obj.position.lerpVectors(from, to, p.t); obj.position.y += Math.sin(p.t * Math.PI) * height; }, onComplete: () => { obj.visible = false; onDone?.(); } });
  };

  /* ---------- A. Toybox Arena: a sunny floating island. Each right answer fires at the Forgetter. ---------- */
  function arena(scene, cam) {
    light(scene, 0xD8F0FF, 0x4A6B34, 0xFFF3D6, .62);
    scene.children[0].intensity = .62;
    cam.position.set(0, 6.2, 19); cam.lookAt(0, 1.6, 0); cam.fov = 38;
    const isle = new T.Group(); scene.add(isle);
    mesh(new T.CylinderGeometry(7.4, 4.4, 3.2, 14), std(0x8C5E34), isle, 0, -1.75);
    mesh(new T.CylinderGeometry(4, 1.3, 2.6, 10), std(0x6E4726), isle, 0, -4.4);
    const top = mesh(new T.CylinderGeometry(7.7, 7.5, .55, 14), std(0x57B534), isle, 0, -.28);
    top.receiveShadow = true;
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; mesh(new T.ConeGeometry(.42, .85, 5), std(0x57B534), isle, Math.cos(a) * 7.3, -.8, Math.sin(a) * 7.3).rotation.x = Math.PI; }
    const tree = (x, z, s) => { const g = new T.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); mesh(new T.CylinderGeometry(.16, .24, .9, 6), std(0x7A4E26), g, 0, .45); mesh(new T.IcosahedronGeometry(.8, 0), std(0x2FA84A), g, 0, 1.45); mesh(new T.IcosahedronGeometry(.55, 0), std(0x46C95E), g, .28, 2.05); isle.add(g); };
    tree(-6, -2.5, 1.2); tree(5.8, -3, 1.05); tree(-1.5, -4.8, 1.3); tree(2.2, -5.1, .9);
    [[-4.6, 2.8, .4], [5.4, 2.4, .5], [.4, 3.7, .32]].forEach(([x, z, s]) => mesh(new T.DodecahedronGeometry(s, 0), std(0xB7BFC9), isle, x, s * .4, z));

    /* Your tower */
    const tower = new T.Group(); tower.position.set(-4.3, 0, 0); isle.add(tower);
    mesh(new T.CylinderGeometry(1.15, 1.35, 2.9, 10), std(0xE9E3D2), tower, 0, 1.45);
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; if (i % 2) mesh(new T.BoxGeometry(.42, .42, .42), std(0xE9E3D2), tower, Math.cos(a) * 1.1, 3.05, Math.sin(a) * 1.1); }
    mesh(new T.CylinderGeometry(.92, 1, .5, 10), std(0x2D66E8), tower, 0, 3.05);
    mesh(new T.ConeGeometry(1.15, 1.6, 10), std(0x2D66E8), tower, 0, 4.1);
    mesh(new T.CylinderGeometry(.04, .04, 1, 5), std(0x5A4632), tower, 0, 5.3);
    const flag = mesh(new T.BoxGeometry(.8, .42, .04), std(0xFFC21E), tower, .42, 5.58);
    mesh(new T.BoxGeometry(.62, .95, .12), std(0x3B2A18), tower, 0, .48, 1.27, false);

    /* The Forgetter: a round troublemaker. Friendly enough for ten-year-olds. */
    const foe = new T.Group(); foe.position.set(4.1, 0, 0); isle.add(foe);
    const bodyMat = new T.MeshStandardMaterial({ color: 0x8E44E8, roughness: .35, emissive: 0x000000 });
    const body = mesh(new T.SphereGeometry(1.5, 24, 18), bodyMat, foe, 0, 1.55);
    mesh(new T.SphereGeometry(.95, 36, 28), new T.MeshStandardMaterial({ color: 0xC89BFF, roughness: .5 }), body, 0, -.42, .8, false).scale.set(1, .9, .62);
    const eye = (x) => { const e = mesh(new T.SphereGeometry(.44, 16, 12), new T.MeshStandardMaterial({ color: 0xffffff, roughness: .25 }), body, x, .42, 1.24, false); mesh(new T.SphereGeometry(.21, 12, 10), basic(0x1A1030), e, -.03, 0, .32, false); };
    eye(-.5); eye(.5);
    [-.82, .82].forEach((x) => { mesh(new T.ConeGeometry(.28, .85, 7), std(0xFFC21E), body, x, 1.42, 0).rotation.z = x < 0 ? .4 : -.4; });
    [-.7, .7].forEach((x) => mesh(new T.SphereGeometry(.42, 12, 8), bodyMat, foe, x, .28, .3).scale.set(1.15, .6, 1.3));
    const mouth = mesh(new T.TorusGeometry(.32, .07, 8, 14, Math.PI), basic(0x1A1030), body, 0, -.12, 1.42, false); mouth.rotation.z = Math.PI;

    const shot = mesh(new T.IcosahedronGeometry(.42, 1), basic(0xFFD84A), scene); shot.add(glow(0xFFB000, 2.4)); shot.visible = false;
    const bad = mesh(new T.IcosahedronGeometry(.36, 1), basic(0xB56BFF), scene); bad.add(glow(0x8E44E8, 2)); bad.visible = false;
    const clouds = [[-9, 7, -7, 1.5], [8, 8.5, -8, 1.8], [1, 9.5, -11, 1.3], [-13, 5, -4, 1]].map(([x, y, z, s]) => { const g = new T.Group(); g.position.set(x, y, z); [[0, 0, 1], [1.1, -.1, .75], [-1.1, -.15, .7], [.3, .4, .7]].forEach(([a, b, r]) => mesh(new T.IcosahedronGeometry(r * s, 1), new T.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true }), g, a * s, b * s, 0, false)); scene.add(g); return g; });
    const home = new T.Vector3(4.1, 0, 0), start = new T.Vector3(-4.3, 3.2, 0), aim = new T.Vector3(4.1, 1.8, .6);
    let hp = 1;
    const api = {
      target: () => new T.Vector3(4.1, 1.9, .5),
      tick(dt, t) {
        isle.position.y = Math.sin(t * .7) * .1;
        isle.rotation.y = Math.sin(t * .25) * .035;
        body.position.y = 1.55 + Math.abs(Math.sin(t * 2.2)) * .16;
        body.scale.y = (1 + Math.sin(t * 4.4) * .025) * body.userData.sy || 1;
        flag.rotation.y = Math.sin(t * 5) * .22;
        clouds.forEach((c, i) => { c.position.x += dt * (.18 + i * .05); if (c.position.x > 16) c.position.x = -16; });
      },
      progress(p) { hp = 1 - p; gsap.to(foe.scale, { x: .62 + hp * .38, y: .62 + hp * .38, z: .62 + hp * .38, duration: .5, delay: .35, ease: 'back.out(2)' }); },
      fire(done) {
        const sound = shot; flight(sound, start, aim, 2.6, .36, () => {
          bodyMat.emissive.set(0xffffff);
          gsap.to(bodyMat.emissive, { r: 0, g: 0, b: 0, duration: .35 });
          gsap.fromTo(body.scale, { x: 1.45, y: .6, z: 1.45 }, { x: 1, y: 1, z: 1, duration: .75, ease: 'elastic.out(1.1,.35)' });
          gsap.fromTo(foe.position, { x: 5 }, { x: home.x, duration: .6, ease: 'elastic.out(1,.5)' });
          done();
        });
      },
      miss(done) {
        gsap.fromTo(body.position, { y: 1.55 }, { y: 3.1, duration: .24, yoyo: true, repeat: 1, ease: 'power2.out' });
        flight(bad, aim, new T.Vector3(-4.3, 2.4, .6), 1.8, .42, () => {
          gsap.fromTo(tower.rotation, { z: .13 }, { z: 0, duration: .8, ease: 'elastic.out(1,.3)' });
          done();
        });
      },
      win(done) {
        gsap.to(foe.scale, { x: 1.5, y: .1, z: 1.5, duration: .2, ease: 'power2.in', onComplete: () => { foe.visible = false; done?.(); } });
        gsap.to(tower.scale, { y: 1.08, duration: .25, yoyo: true, repeat: 3 });
      },
    };
    body.userData.sy = 1;
    return api;
  }

  /* ---------- B. Neon Rush: flying down a neon track. Each right answer is a boost through a gate. ---------- */
  function neon(scene, cam) {
    scene.fog = new T.Fog(0x2A0B8C, 30, 118);
    scene.add(new T.HemisphereLight(0xFF7AD9, 0x2A0B8C, 1.1));
    const dl = new T.DirectionalLight(0xffffff, .9); dl.position.set(4, 8, 6); scene.add(dl);
    cam.position.set(0, 3.1, 10); cam.lookAt(0, 1.5, -10); cam.fov = 58;
    const floor = mesh(new T.PlaneGeometry(260, 320), new T.MeshBasicMaterial({ color: 0x12064A }), scene, 0, -.01, -110, false); floor.rotation.x = -Math.PI / 2;
    const CELL = 4;
    const grid = new T.GridHelper(280, 70, 0xFF2EDB, 0x27F5F5); grid.position.z = -100; grid.material.transparent = true; grid.material.opacity = .85; grid.material.fog = false; scene.add(grid);
    /* Track edges and glowing pylons */
    [-9, 9].forEach((x) => { const rail = mesh(new T.BoxGeometry(.28, .28, 320), basic(0xFFF04A), scene, x, .15, -110, false); rail.scale.y = 1; });
    const pylons = [];
    for (let i = 0; i < 26; i++) {
      const side = i % 2 ? 1 : -1, h = 3 + (i * 7 % 9);
      const p = mesh(new T.BoxGeometry(1.8, h, 1.8), basic(i % 3 ? 0x3A1FC2 : 0xB21FE0), scene, side * (13 + (i * 13 % 16)), h / 2, -i * 8, false);
      const cap = mesh(new T.BoxGeometry(1.9, .22, 1.9), basic(i % 3 ? 0x27F5F5 : 0xFFF04A), p, 0, h / 2, 0, false); cap.userData = {};
      pylons.push(p);
    }
    /* Your craft: an original wedge flyer */
    const craft = new T.Group(); craft.position.set(0, 1.7, -2); craft.scale.setScalar(.92); scene.add(craft);
    const hull = new T.ConeGeometry(.82, 3.1, 4); hull.rotateX(-Math.PI / 2); hull.rotateZ(Math.PI / 4); hull.scale(1.25, .42, 1);
    mesh(hull, new T.MeshStandardMaterial({ color: 0x2A2FD0, roughness: .25, metalness: .4, flatShading: true }), craft, 0, 0, 0, false);
    mesh(new T.BoxGeometry(1.5, .32, .1), basic(0xFF2EDB), craft, 0, 0, 1.55, false);
    mesh(new T.BoxGeometry(3.4, .08, .85), new T.MeshStandardMaterial({ color: 0xFFF04A, roughness: .3, metalness: .2, flatShading: true }), craft, 0, -.05, .55, false);
    mesh(new T.SphereGeometry(.34, 10, 8), basic(0x27F5F5), craft, 0, .28, -.1, false).scale.set(1, .7, 1.7);
    const fl = glow(0xFF2EDB, 2.2, craft, -.78, -.02, 1.35), fr = glow(0x27F5F5, 2.2, craft, .78, -.02, 1.35);
    const trail = [-1.62, 1.62].map((x) => mesh(new T.BoxGeometry(.035, .035, 9), basic(0x27F5F5, { transparent: true, opacity: .8, blending: T.AdditiveBlending }), craft, x, -.05, 5.4, false));
    /* Gates to fly through, one per question */
    const gates = [];
    for (let i = 0; i < 3; i++) {
      const g = new T.Group(); g.position.z = -30 - i * 34;
      const ring = mesh(new T.TorusGeometry(6.2, .3, 8, 6), basic(0x27F5F5), g, 0, 4.1, 0, false); ring.rotation.z = Math.PI / 6; g.userData.ring = ring;
      g.add(glow(0x27F5F5, 8, null, 0, 4.1, 0)); g.children[1] && (g.children[1].material.opacity = .22);
      scene.add(g); gates.push(g);
    }
    const stars = new T.BufferGeometry(), pts = [];
    for (let i = 0; i < 260; i++) pts.push((Math.random() - .5) * 200, 12 + Math.random() * 60, -40 - Math.random() * 90);
    stars.setAttribute('position', new T.Float32BufferAttribute(pts, 3));
    scene.add(new T.Points(stars, new T.PointsMaterial({ color: 0xffffff, size: .45, transparent: true, opacity: .8, fog: false })));
    let speed = 22, boost = 0, tilt = 0, won = false;
    return {
      target: () => craft.position.clone().add(new T.Vector3(0, .3, -1)),
      tick(dt, t) {
        boost = Math.max(0, boost - dt * 1.3);
        const v = (speed + boost * 90) * dt;
        grid.position.z = (grid.position.z + v) % CELL - 100 - ((-100) % CELL);
        pylons.forEach((p) => { p.position.z += v; if (p.position.z > 14) p.position.z -= 208; });
        gates.forEach((g, i) => { g.position.z += v; if (g.position.z > 14) g.position.z -= 102; g.userData.ring.rotation.z += dt * .35 * (i % 2 ? 1 : -1); });
        tilt = Math.sin(t * .9) * .55;
        craft.position.x = tilt * 1.3 + (won ? 0 : 0);
        craft.position.y = 1.7 + Math.sin(t * 2.2) * .13 + boost * .35;
        craft.rotation.z = -Math.cos(t * .9) * .22;
        craft.rotation.x = -boost * .12;
        const pulse = 1.9 + boost * 2.2 + Math.sin(t * 22) * .15;
        fl.scale.set(pulse, pulse, 1); fr.scale.set(pulse, pulse, 1);
        trail.forEach((m) => { m.scale.z = 1 + boost * 1.4; });
        const fov = 58 + boost * 18;
        if (Math.abs(cam.fov - fov) > .05) { cam.fov = fov; cam.updateProjectionMatrix(); }
      },
      progress(p) { speed = 22 + p * 18; },
      fire(done) { boost = 1; done(); },
      miss(done) {
        speed = Math.max(14, speed - 5);
        gsap.fromTo(craft.rotation, { y: .5 }, { y: 0, duration: .9, ease: 'elastic.out(1,.3)' });
        done();
      },
      win(done) { won = true; boost = 1.5; done?.(); },
    };
  }

  /* ---------- C. Dark Legend: a ruin at night. Each right answer lights a rune and drives back the Forgetter. ---------- */
  function dark(scene, cam) {
    scene.fog = new T.FogExp2(0x120C1F, .036);
    scene.add(new T.HemisphereLight(0x5A5CA8, 0x120C14, .62));
    const moon = light(scene, 0x000000, 0x000000, 0x9DB2FF, .62, [-8, 15, 6]);
    moon.shadow.camera.far = 60;
    cam.position.set(0, 6.4, 20); cam.lookAt(0, 2.9, 0); cam.fov = 40;
    const ground = mesh(new T.CylinderGeometry(15, 15.4, .6, 18), std(0x2E2933), scene, 0, -.3, 0); ground.receiveShadow = true;
    mesh(new T.CylinderGeometry(6.6, 6.9, .28, 14), std(0x3E3845), scene, 0, .12, 0);
    /* Runes around the circle */
    const runes = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const r = mesh(new T.OctahedronGeometry(.46, 0), new T.MeshStandardMaterial({ color: 0x26222E, emissive: 0x000000, flatShading: true, roughness: .4 }), scene, Math.cos(a) * 5.4, .85, Math.sin(a) * 4.5);
      r.userData.g = glow(0xFFB84A, .01, r);
      runes.push(r);
    }
    /* Broken columns with torches */
    const flames = [];
    [[-8.3, -2.6, 5.4], [-6, -6.8, 7.2], [6.2, -6.6, 6.4], [8.5, -2.4, 3.2], [-2.4, -9.5, 8.2], [2.7, -9.8, 4.2]].forEach(([x, z, h], i) => {
      mesh(new T.CylinderGeometry(.68, .82, h, 9), std(0x4A4552), scene, x, h / 2, z);
      mesh(new T.CylinderGeometry(1, 1, .34, 9), std(0x57525F), scene, x, .17, z);
      if (i < 4) {
        mesh(new T.CylinderGeometry(.38, .26, .26, 8), std(0x1A1720), scene, x, h + .14, z);
        const f = mesh(new T.ConeGeometry(.32, .9, 6), basic(0xFF9A2E), scene, x, h + .66, z, false);
        const g = glow(0xFF6A00, 3.8, scene, x, h + .7, z);
        const lamp = i < 2 ? new T.PointLight(0xFF7A1E, 1.25, 16) : null;
        if (lamp) { lamp.position.set(x, h + 1, z + .5); scene.add(lamp); }
        flames.push({ f, g, lamp, seed: i * 2.1 });
      }
    });
    /* The stolen crystal */
    const crystalMat = new T.MeshStandardMaterial({ color: 0x8A4CFF, emissive: 0x4A1FB0, flatShading: true, roughness: .15, metalness: .25 });
    const crystal = mesh(new T.OctahedronGeometry(1, 0), crystalMat, scene, 0, 6.6, -3, false); crystal.scale.y = 1.5;
    const halo = glow(0x8A4CFF, 7, scene, 0, 6.6, -3);
    const cl = new T.PointLight(0x8A4CFF, 1.6, 20); cl.position.set(0, 6.4, -1.8); scene.add(cl);
    /* A hooded figure with glowing eyes */
    const foe = new T.Group(); foe.position.set(0, .2, -.2); scene.add(foe);
    const robeMat = new T.MeshStandardMaterial({ color: 0x241A36, flatShading: true, roughness: .9, emissive: 0x000000 });
    mesh(new T.ConeGeometry(1.35, 3.5, 9), robeMat, foe, 0, 1.75);
    mesh(new T.SphereGeometry(.78, 12, 10), robeMat, foe, 0, 3.6, -.1);
    mesh(new T.ConeGeometry(.86, 1.25, 9), robeMat, foe, 0, 4.42, -.22).rotation.x = -.2;
    mesh(new T.SphereGeometry(.58, 12, 10), basic(0x030206), foe, 0, 3.56, .28, false);
    const eyes = [-.21, .21].map((x) => mesh(new T.SphereGeometry(.075, 8, 6), basic(0x9CF6FF), foe, x, 3.6, .8, false));
    eyes.forEach((e) => e.add(glow(0x49D9FF, .55)));
    /* Lightning */
    const boltMat = new T.LineBasicMaterial({ color: 0xFFF3C4, transparent: true, opacity: 0 });
    const boltGeo = new T.BufferGeometry().setFromPoints(Array.from({ length: 12 }, () => new T.Vector3()));
    const bolt = new T.Line(boltGeo, boltMat); scene.add(bolt);
    const strike = new T.PointLight(0xFFE9AE, 0, 40); strike.position.set(0, 7, 4); scene.add(strike);
    /* Embers */
    const N = 90, emberPos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { emberPos[i * 3] = (Math.random() - .5) * 22; emberPos[i * 3 + 1] = Math.random() * 12; emberPos[i * 3 + 2] = (Math.random() - .5) * 14; }
    const eg = new T.BufferGeometry(); eg.setAttribute('position', new T.BufferAttribute(emberPos, 3));
    scene.add(new T.Points(eg, new T.PointsMaterial({ map: glowTexture(), color: 0xFF8A2E, size: .32, transparent: true, depthWrite: false, blending: T.AdditiveBlending })));
    let lit = 0;
    const camHome = cam.position.clone();
    return {
      target: () => new T.Vector3(0, 3.2, 0),
      tick(dt, t) {
        crystal.rotation.y += dt * .7;
        crystal.position.y = 6.6 + Math.sin(t * 1.2) * .22; halo.position.y = crystal.position.y;
        foe.position.y = .2 + Math.sin(t * 1.4) * .06;
        cam.position.x = camHome.x + Math.sin(t * .2) * .35;
        cam.lookAt(0, 2.9, 0);
        flames.forEach(({ f, g, lamp, seed }) => { const k = 1 + Math.sin(t * 13 + seed) * .14 + Math.sin(t * 29 + seed) * .08; f.scale.set(k, k * 1.1, k); g.scale.set(3.8 * k, 3.8 * k, 1); if (lamp) lamp.intensity = 1.25 * k; });
        for (let i = 0; i < N; i++) { emberPos[i * 3 + 1] += dt * (.5 + (i % 7) * .1); emberPos[i * 3] += Math.sin(t + i) * dt * .2; if (emberPos[i * 3 + 1] > 12) emberPos[i * 3 + 1] = 0; }
        eg.attributes.position.needsUpdate = true;
      },
      progress(p) { const n = Math.round(p * 6); while (lit < n && lit < 6) { const r = runes[lit++]; gsap.to(r.material.emissive, { r: 1, g: .6, b: .16, duration: .5, delay: .25 }); gsap.to(r.userData.g.scale, { x: 2.6, y: 2.6, duration: .5, delay: .25 }); gsap.to(r.position, { y: 1.35, duration: .7, delay: .25, ease: 'back.out(2)' }); } gsap.to(foe.position, { z: -.2 - p * 2.6, duration: .7, ease: 'power2.out' }); },
      fire(done) {
        const pts = [];
        for (let i = 0; i < 12; i++) { const f = i / 11; pts.push(new T.Vector3((Math.random() - .5) * (1 - f) * 2.4, 13 - f * 9.6, foe.position.z + .4)); }
        boltGeo.setFromPoints(pts);
        boltMat.opacity = 1; strike.intensity = 5;
        gsap.to(boltMat, { opacity: 0, duration: .34, ease: 'steps(4)' }); gsap.to(strike, { intensity: 0, duration: .42 });
        robeMat.emissive.set(0xFFE9AE); gsap.to(robeMat.emissive, { r: 0, g: 0, b: 0, duration: .45 });
        gsap.fromTo(foe.rotation, { x: -.28 }, { x: 0, duration: .9, ease: 'elastic.out(1,.4)' });
        done();
      },
      miss(done) {
        gsap.fromTo(crystal.scale, { x: 1.5, z: 1.5 }, { x: 1, z: 1, duration: .8, ease: 'elastic.out(1,.4)' });
        gsap.fromTo(scene.fog, { density: .07 }, { density: .036, duration: 1.2 });
        done();
      },
      win(done) {
        gsap.to(crystalMat.emissive, { r: 1, g: .7, b: .2, duration: .5 }); gsap.to(crystalMat.color, { r: 1, g: .85, b: .4, duration: .5 }); halo.material.color.set(0xFFB84A); gsap.to(halo.scale, { x: 22, y: 22, duration: .9 }); cl.color.set(0xFFB84A); gsap.to(cl, { intensity: 3.2, duration: .8 });
        gsap.to(foe.position, { y: -5, duration: 1.1, ease: 'power2.in' });
        done?.();
      },
    };
  }

  /* ---------- D. Block Builder: a block world. Each right answer stacks one more floor of your tower. ---------- */
  function block(scene, cam) {
    light(scene, 0xCDEBFF, 0x4A6B34, 0xFFF6DF, .62, [-7, 16, 9]);
    scene.children[0].intensity = .6;
    cam.position.set(13, 13.5, 24); cam.lookAt(0, 4.2, 0); cam.fov = 34;
    const box = new T.BoxGeometry(1, 1, 1);
    /* Terrain */
    const R = 11, cells = [];
    const height = (x, z) => { const d = Math.hypot(x, z); if (d < 3.4) return 1; return Math.max(0, Math.round(1 + Math.sin(x * .55) * .9 + Math.cos(z * .6 + x * .15) * .9 + (d > 8 ? -1 : .4))); };
    for (let x = -R; x <= R; x++) for (let z = -R; z <= R; z++) { if (Math.hypot(x, z) > R + .5) continue; const h = height(x, z); for (let y = 0; y <= h; y++) cells.push([x, y, z, y === h, h]); }
    const land = new T.InstancedMesh(box, new T.MeshStandardMaterial({ roughness: .95 }), cells.length);
    const m4 = new T.Matrix4(), col = new T.Color();
    cells.forEach(([x, y, z, top, h], i) => {
      m4.makeTranslation(x, y, z); land.setMatrixAt(i, m4);
      const water = h === 0;
      const shade = ((x * 7 + z * 13) % 3) * .025;
      col.set(water ? 0x2A86D8 : top ? 0x58B838 : y >= h - 1 ? 0x8C5F35 : 0x6F6C78);
      col.offsetHSL(0, 0, shade); land.setColorAt(i, col);
    });
    land.castShadow = true; land.receiveShadow = true; scene.add(land);
    const tree = (x, z) => { const y0 = height(x, z) + 1; [0, 1, 2].forEach((k) => mesh(box, std(0x7A4E26), scene, x, y0 + k, z)); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = 0; c <= 1; c++) if (!(a && b && c)) mesh(box, std(0x2A9C42), scene, x + a, y0 + 3 + c, z + b); };
    tree(-7, -5); tree(6, -7); tree(-3, -9); tree(9, -2);
    const clouds = [[-10, 13, -9], [6, 15, -12], [13, 12, -3]].map(([x, y, z]) => { const g = new T.Group(); g.position.set(x, y, z); [[0, 0], [1, 0], [2, 0], [-1, 0], [1, 1], [0, 1]].forEach(([a, b]) => mesh(box, new T.MeshStandardMaterial({ color: 0xffffff }), g, a * 1.2, b, 0, false).scale.setScalar(1.2)); scene.add(g); return g; });
    /* Your character */
    const hero = new T.Group(); hero.position.set(3.2, 2, 2.6); hero.rotation.y = .5; hero.scale.setScalar(.75); scene.add(hero);
    const skin = std(0xFFC58F), shirt = std(0x2D7CF0), legs = std(0x24315E);
    mesh(box, skin, hero, 0, 2.5, 0).scale.set(1, 1, 1);
    mesh(box, std(0x6B3F1D), hero, 0, 3.1, 0).scale.set(1.04, .3, 1.04);
    [-.2, .2].forEach((x) => mesh(box, basic(0x101018), hero, x, 2.55, .51, false).scale.set(.13, .13, .03));
    mesh(box, shirt, hero, 0, 1.45, 0).scale.set(1, 1.1, .55);
    const armL = mesh(box, skin, hero, -.72, 1.45, 0), armR = mesh(box, skin, hero, .72, 1.45, 0); armL.scale.set(.38, 1.05, .4); armR.scale.set(.38, 1.05, .4);
    const legL = mesh(box, legs, hero, -.26, .42, 0), legR = mesh(box, legs, hero, .26, .42, 0); legL.scale.set(.44, .9, .46); legR.scale.set(.44, .9, .46);
    /* The tower you build */
    const tower = new T.Group(); tower.position.set(0, 2, -.4); scene.add(tower);
    const floors = [0xF04E4E, 0xFF9F2E, 0xFFD632, 0x4FC02C, 0x2D9CF0, 0x8E5CF0];
    const flagPole = new T.Group(); flagPole.visible = false; tower.add(flagPole);
    mesh(box, std(0x6B3F1D), flagPole).scale.set(.2, 2.6, .2); mesh(box, std(0xFFD632), flagPole, .66, .85, 0).scale.set(1.15, .7, .12);
    let built = 0;
    const layers = [];
    function layer(n, immediate) {
      const g = new T.Group(); g.position.y = n * 1; tower.add(g); layers[n] = g;
      const mat = std(floors[n % floors.length]); const win = basic(0x18304D);
      let idx = 0;
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        const hole = a === 0 && b === 0;
        const c = mesh(box, hole ? std(0x333040) : mat, g, a, 0, b);
        c.scale.setScalar(.98);
        if (a === 1 && b === 1) {}
        if (!immediate) gsap.from(c.position, { y: 11, duration: .5, delay: idx * .045, ease: 'bounce.out', onComplete: idx === 8 ? undefined : undefined });
        idx++;
      }
      mesh(box, win, g, 0, 0, 1.5, false).scale.set(.5, .55, .05); mesh(box, win, g, 1.5, 0, 0, false).scale.set(.05, .55, .5);
    }
    return {
      target: () => tower.position.clone().add(new T.Vector3(0, built + .6, 1)),
      tick(dt, t) {
        clouds.forEach((c, i) => { c.position.x += dt * (.22 + i * .07); if (c.position.x > 20) c.position.x = -20; });
        const s = Math.sin(t * 5.5) * .35;
        armL.rotation.x = s; armR.rotation.x = -s;
        hero.position.y = 2 + Math.abs(Math.sin(t * 5.5)) * .04;
      },
      progress() {},
      fire(done) {
        layer(built++);
        gsap.fromTo(hero.position, { y: 3.1 }, { y: 2, duration: .55, ease: 'bounce.out' });
        gsap.delayedCall(.5, done);
      },
      miss(done) {
        if (built) { const g = layers[built - 1]; gsap.fromTo(g.rotation, { z: .09 }, { z: 0, duration: .8, ease: 'elastic.out(1,.3)' }); }
        gsap.fromTo(hero.rotation, { z: .25 }, { z: 0, duration: .7, ease: 'elastic.out(1,.3)' });
        done();
      },
      win(done) { flagPole.position.y = built + 1; flagPole.visible = true; gsap.from(flagPole.scale, { y: 0, duration: .6, ease: 'back.out(2)' }); gsap.to(hero.position, { y: 3.2, duration: .3, yoyo: true, repeat: 5, ease: 'power1.out' }); done?.(); },
      prefill(n) { while (built < n) layer(built++, true); },
    };
  }

  window.WORLDS = { arena, neon, dark, block };
})();
