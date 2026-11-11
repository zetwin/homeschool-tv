/* Family data. Saved in the browser, and on the Mac server when one is running, so every device on the home Wi-Fi sees the same family. */
(function () {
  const KEY = 'hs-family-v2', SESSION = 'hs-session-v2';
  const COLORS = ['#D42A20', '#0F766E', '#1D4ED8', '#7E22CE', '#B45309', '#9F1239'];
  const seed = () => ({
    parents: [{ id: 'p1', name: 'Parent', username: 'parent', password: 'parent' }], parentPin: '0000',
    kids: [
      { id: 'k1', name: 'Kid 1', username: 'kid1', year: 'Year 6', pin: '1111', color: COLORS[0] },
      { id: 'k2', name: 'Kid 2', username: 'kid2', year: 'Year 7', pin: '2222', color: COLORS[1] },
      { id: 'k3', name: 'Kid 3', username: 'kid3', year: 'Year 7', pin: '3333', color: COLORS[2] },
    ],
    attempts: [], exams: [], watched: {}, ratings: {}, school: defaultSchool(),
  });
  /* The default timetable. Weekly counts come from the program's own lesson counts over 39 school weeks. See docs/product/SCHEDULE-AND-DIARY.md. */
  const defaultSchool = () => ({
    start: '2026-11-02', dayStart: '09:00', lessonMin: 45, scale: '12',
    startUnit: { Science: 'Human skeleton and muscles', Geography: 'Colombia' },
    timetable: {
      mon: ['Maths', 'English', 'Science', 'History', 'PE', ''],
      tue: ['English', 'Maths', 'Spanish', 'Geography', 'Art', ''],
      wed: ['Maths', 'Science', 'English', 'Computing', 'Music', ''],
      thu: ['English', 'Maths', 'History', 'Spanish', 'PE', ''],
      fri: ['Science', 'Geography', 'Technology', 'Reading', 'Family project', ''],
    },
    breaks: [
      { name: 'Winter break', from: '2026-12-21', to: '2027-01-01' },
      { name: 'February break', from: '2027-02-15', to: '2027-02-19' },
      { name: 'Spring break', from: '2027-03-29', to: '2027-04-09' },
      { name: 'May break', from: '2027-05-31', to: '2027-06-04' },
      { name: 'Summer break', from: '2027-07-23', to: '2027-08-31' },
    ],
    off: [], kidTimetable: {}, log: {}, signed: {}, notes: {},
  });
  const get = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} };
  const local = () => { try { return JSON.parse(get(KEY)) || null; } catch (e) { return null; } };
  const send = (op, value) => (Store.preview ? Promise.resolve(null) : fetch('/api/state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op, value }) }).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((done) => { if (!done) Store.log('error', { msg: 'A save didn’t reach the Mac', op }); return done; }));

  /* Data saved before accounts existed gets usernames here. */
  const upgrade = (d) => {
    /* Each adult has their own login. Older data had one shared parent, who becomes the first. */
    if (!Array.isArray(d.parents) || !d.parents.length) d.parents = [{ id: 'p1', name: 'Parent', ...(d.parent || { username: 'parent', password: 'parent' }) }];
    delete d.parent;
    d.kids.forEach((k, i) => { k.username ??= `kid${i + 1}`; });
    d.school ??= defaultSchool();
    d.watched ??= {};
    d.ratings ??= {};
    /* Word help: off by default. `checked` marks word lists a fluent speaker has approved, and `fixes` holds their corrections. */
    d.languages ??= { wordHelp: 'off', checked: {}, fixes: {} };
    return d;
  };
  const Store = {
    data: upgrade(local() || seed()),
    colors: COLORS,
    online: false,
    /* Preview: the Screens page shows example results. Nothing is saved, and this device's real sign-in isn't touched. */
    preview: false,
    startPreview(data) { if (!this.preview) this.real = this.data; this.preview = true; this.data = data; this.previewSession = null; },
    endPreview() { if (!this.preview) return; this.preview = false; this.data = this.real; this.previewSession = null; this.clearReading(); },
    /* A parent's text size and contrast apply only on parent screens, so they're cleared when that parent leaves. */
    clearReading() { delete document.body.dataset.ptext; delete document.body.dataset.pcontrast; },
    /* Reads the latest family from the server, if there is one. */
    async refresh() {
      if (this.preview) return;
      try {
        const r = await fetch('/api/state');
        const remote = r.ok ? await r.json() : undefined;
        if (remote === undefined) return;
        this.online = true;
        if (remote) { this.data = upgrade({ ...seed(), ...(Array.isArray(remote.parents) ? {} : { parents: null }), ...remote }); } else { await send('seed', this.data); }
        set(KEY, JSON.stringify(this.data));
      } catch (e) { /* No server: this device's copy is used. */ }
    },
    save() { if (!this.preview) set(KEY, JSON.stringify(this.data)); },
    addAttempt(record) { this.data.attempts.push(record); this.save(); send('attempt', record); },
    /* Who has seen a lesson. A TV doesn't know who's in the room, so it marks the whole family. A signed-in child's device marks that child. */
    markWatched(ep) {
      if (this.preview) return;
      const who = this.currentKid()?.id || 'family', at = new Date().toISOString(), w = this.data.watched;
      (w[who] ??= {})[ep] ??= at;
      this.save();
      send('watched', { who, ep, at });
    },
    watchedAt(kidId, ep) { const w = this.data.watched || {}; return w[kidId]?.[ep] || w.family?.[ep] || null; },
    hasWatched(kidId, ep) { return !!this.watchedAt(kidId, ep) || this.attemptsFor(kidId, 'test', ep).length > 0; },
    /* Star ratings for a lesson, one per person: `who` is 'parent' or a child's id. These say how good the lesson was. They aren't marks.
       It reads the latest first, so a rating from one device doesn't undo another's. */
    rating(ep, who) { return this.data.ratings?.[ep]?.[who] || 0; },
    async rateLesson(ep, who, stars) {
      await this.refresh();
      const all = (this.data.ratings ??= {}), one = (all[ep] ??= {});
      if (one[who] === stars) delete one[who]; else one[who] = stars;
      this.save();
      send('settings', { ratings: all });
    },
    putExam(record) { const i = this.data.exams.findIndex((e) => e.id === record.id); if (i >= 0) this.data.exams[i] = record; else this.data.exams.push(record); this.save(); send('exam', record); },
    saveSettings() { this.save(); return send('settings', { kids: this.data.kids, parents: this.data.parents, parent: null, parentPin: this.data.parentPin }); },
    /* The parent signed in on this device. Older sessions didn't record which parent, so they get the first. */
    me() { const s = this.session(); return s?.role === 'parent' ? this.data.parents.find((p) => p.id === s.id) || this.data.parents[0] : null; },
    /* A username must be unique across parents and children. */
    usernameTaken(name, except) { return [...this.data.parents, ...this.data.kids].some((x) => x !== except && x.username.toLowerCase() === name); },
    /* A username from a name: lowercase letters only, made unique with a number. */
    freeUsername(name, fallback) { const base = (name || '').normalize('NFD').replace(/[^a-zA-Z]/g, '').toLowerCase() || fallback; let u = base, n = 2; while (this.usernameTaken(u)) u = `${base}${n++}`; return u; },
    /* A starting password nobody can guess. The new parent chooses their own the first time they sign in. */
    newPassword() { const chars = 'abcdefghjkmnpqrstuvwxyz23456789'; return Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => chars[b % chars.length]).join(''); },
    addParent(name) {
      const p = { id: `p${Date.now()}`, name, username: this.freeUsername(name, 'parent'), password: this.newPassword(), mustChange: true };
      this.data.parents.push(p); this.saveSettings(); return p;
    },
    resetParent(p) { p.password = this.newPassword(); p.mustChange = true; this.saveSettings(); return p.password; },
    addKid(name, year) {
      const n = this.data.kids.length, pin = String(1000 + (crypto.getRandomValues(new Uint16Array(1))[0] % 9000));
      const k = { id: `k${Date.now()}`, name, username: this.freeUsername(name, 'child'), year, pin, color: COLORS[n % COLORS.length] };
      this.data.kids.push(k); this.saveSettings(); return k;
    },
    /* An idea or a problem from a parent, with the screen they were on. Saved with the family data and in the log. */
    async sendFeedback(kind, text) {
      const me = this.me(), item = { id: Date.now(), at: new Date().toISOString(), kind, text: text.slice(0, 2000), by: me?.id || 'parent', name: me?.name || '', page: location.hash.slice(1, 60) || 'home' };
      (this.data.feedback ??= []).push(item); this.save();
      this.log('feedback', { kind, text: text.slice(0, 300) });
      return !!(await send('feedback', item));
    },
    saveLanguages() { this.save(); send('settings', { languages: this.data.languages }); },
    removeParent(id) { if (this.data.parents.length < 2) return; this.data.parents = this.data.parents.filter((p) => p.id !== id); this.saveSettings(); },
    /* Removes a child and everything saved about them. A parent has to confirm first. */
    removeKid(id) {
      const d = this.data;
      d.kids = d.kids.filter((k) => k.id !== id);
      d.attempts = d.attempts.filter((a) => a.kidId !== id);
      d.exams = d.exams.filter((e) => e.kidId !== id);
      ['log', 'signed', 'notes', 'kidTimetable'].forEach((part) => { if (d.school?.[part]) delete d.school[part][id]; });
      delete d.watched?.[id];
      Object.values(d.ratings || {}).forEach((one) => delete one[id]);
      this.save();
      send('settings', { kids: d.kids, attempts: d.attempts, exams: d.exams, school: d.school, watched: d.watched, ratings: d.ratings });
    },

    kid(id) { return this.data.kids.find((k) => k.id === id); },
    /* A child's chosen picture, or an animal picked by their place in the family until they choose one. */
    face(k, size = '') { const first = ['owl', 'fox', 'panda', 'robot', 'lion', 'dolphin'], pic = k.avatar || first[Math.max(0, this.data.kids.findIndex((x) => x.id === k.id)) % first.length]; return `<span class="kidFace hasPic ${size}" style="background:${k.color}"><img src="assets/avatars/${esc(pic)}.png" alt=""></span>`; },
    AVATARS: ['fox', 'cat_face', 'dog_face', 'panda', 'lion', 'tiger_face', 'unicorn', 'dragon_face', 'owl', 'penguin', 'frog', 'turtle', 'octopus', 'dolphin', 'robot', 'alien', 'butterfly', 'hedgehog', 'koala', 'monkey_face', 'bear', 'rabbit_face', 'rocket', 'parrot'],
    session() { if (this.preview) return this.previewSession; try { return JSON.parse(get(SESSION)); } catch (e) { return null; } },
    setSession(value) { if (this.preview) this.previewSession = value; else set(SESSION, value && JSON.stringify(value)); },
    currentKid() { const s = this.session(); return s?.role === 'child' ? this.kid(s.id) : undefined; },
    isParent() { return this.session()?.role === 'parent'; },
    /* One sign-in for everyone. The account decides which dashboard opens. */
    signIn(username, password) {
      const name = username.trim().toLowerCase();
      /* A space an iPad keyboard adds by itself shouldn't lock anyone out. */
      const pass = (p) => p === password || p === password.trim();
      const adult = this.data.parents.find((p) => p.username.toLowerCase() === name && pass(p.password));
      if (adult) { this.setSession({ role: 'parent', id: adult.id }); this.log('signin', { role: 'parent' }); return 'parent'; }
      const kid = this.data.kids.find((k) => k.username.toLowerCase() === name && pass(k.pin));
      if (kid) { this.setSession({ role: 'child', id: kid.id }); this.log('signin', { role: 'child' }); return 'child'; }
      /* A failed try is logged with the username typed, never the password, so a sign-in problem on a device can be found. */
      const known = [...this.data.parents, ...this.data.kids].some((x) => x.username.toLowerCase() === name);
      this.lastFailure = known ? 'password' : 'username';
      this.log('signin', { did: 'failed', user: name.slice(0, 40), known });
      return null;
    },
    signOut() { this.log('signout'); this.setSession(null); this.clearReading(); },
    attemptsFor(id, kind, ep) { return this.data.attempts.filter((a) => a.kidId === id && (!kind || a.kind === kind) && (!ep || (a.ep || 'skeleton') === ep)); },
    examsFor(id) { return this.data.exams.filter((e) => e.kidId === id); },
  };
  window.Store = Store;

  /* Activity and errors go to the log on the Mac, so a problem on any device gets noticed. Only what docs/product/MONITORING.md lists:
     who signed in, lessons started and finished, failed videos, voice and saves, and errors. Nothing goes anywhere else.
     If the Mac can't be reached, up to 50 lines wait on this device and go with the next one that does. */
  const LOGQ = 'hs-logq';
  const device = () => { const u = navigator.userAgent; return /iPhone|Android.*Mobile/.test(u) ? 'phone' : /iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1) ? 'iPad' : /SMART-TV|SmartTV|Tizen|Web0S|webOS|CrKey|BRAVIA|Android TV|GoogleTV|AFT/i.test(u) ? 'TV' : /Android/.test(u) ? 'tablet' : 'computer'; };
  const queued = () => { try { return JSON.parse(get(LOGQ)) || []; } catch (e) { return []; } };
  let flushing = false;
  Store.flushLog = function () {
    const q = queued(); if (flushing || !q.length || this.preview) return;
    flushing = true;
    fetch('/api/log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q), keepalive: true })
      .then((r) => { if (!r.ok) return; set(LOGQ, JSON.stringify(queued().slice(q.length))); flushing = false; if (queued().length) Store.flushLog(); }).catch(() => {}).finally(() => { flushing = false; });
  };
  Store.log = function (kind, info = {}) {
    /* Our own automatic checks drive a browser too. They mustn't fill the family's log. */
    if (this.preview || window.HS_NO_LOG || (navigator.webdriver && !window.HS_LOG_TEST)) return;
    const s = this.session(), who = s?.role === 'child' ? s.id : s?.role === 'parent' ? s.id || 'parent' : 'nobody';
    set(LOGQ, JSON.stringify([...queued(), { kind, ...info, who, device: device(), page: location.hash.slice(1, 60) || 'home', at: new Date().toISOString() }].slice(-50)));
    this.flushLog();
  };
  /* Errors on any screen: the same one is sent once per visit, and at most 20 in all. A missing picture or sound on our own server counts too. */
  const sent = new Set();
  const report = (msg, where) => { const key = `${msg}|${where}`; if (sent.has(key) || sent.size >= 20) return; sent.add(key); Store.log('error', { msg: String(msg).slice(0, 300), where }); };
  addEventListener('error', (e) => {
    const el = e.target;
    if (el && el !== window) { const src = el.currentSrc || el.src || el.href || ''; if (src.startsWith(location.origin) && !/favicon/.test(src)) report('A file didn’t load', src.replace(location.origin, '')); return; }
    report(e.message, `${(e.filename || '').split('/').pop()}:${e.lineno || ''}`);
  }, true);
  addEventListener('unhandledrejection', (e) => report(e.reason?.message || e.reason, 'promise'));
  /* Each screen writes its name into the address, so a refresh, or the app reopening on an iPad, comes back to the same screen.
     replaceState doesn't add history or fire hashchange. The names are the ones openRoute in app.js understands. */
  window.setRoute = (route) => {
    const now = location.hash.slice(1); if (Store.preview || now === route) return;
    const url = route ? `#${route}` : location.pathname + location.search, area = (r) => r.split('-')[0];
    /* A new place gets its own history entry, so Back and the iPad's swipe-back return to it. Tabs within one place,
       the first screen after loading, and screens redrawn by Back itself replace the entry instead. */
    try {
      if (!window.hsBooted || window.hsRestoring || area(now) === area(route)) history.replaceState(history.state, '', url);
      else history.pushState({ hs: (typeof history.state?.hs === 'number' ? history.state.hs : 0) + 1 }, '', url);
    } catch (e) {}
    window.hsLastHash = location.hash;
  };
  /* A screen's Back button goes to the screen the person came from. With nothing to go back to, such as a link opened fresh, it opens `fallback`.
     (goBack in app.js is a different thing: what the TV remote's Back key does.) */
  window.backTo = (fallback) => { if (typeof history.state?.hs === 'number' && history.state.hs > 0) history.back(); else fallback(); };

  /* Five stars for rating a lesson. Filled and empty stars differ in shape, so color isn't the only signal. Tapping the same star again clears it. */
  window.rateStars = (ep, who, label) => {
    const now = Store.rating(ep, who);
    return `<div class="rateStars" role="group" aria-label="${label}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="rateStar ${n <= now ? 'on' : ''}" data-f data-rate="${ep}|${who}|${n}" aria-label="${n} ${n === 1 ? 'star' : 'stars'}" aria-pressed="${n === now}">${n <= now ? '★' : '☆'}</button>`).join('')}</div>`;
  };
  document.addEventListener('click', async (ev) => {
    const el = ev.target.closest?.('[data-rate]'); if (!el) return;
    const [ep, who, stars] = el.dataset.rate.split('|');
    await Store.rateLesson(ep, who, +stars);
    const now = Store.rating(ep, who);
    document.querySelectorAll(`[data-rate^="${ep}|${who}|"]`).forEach((b) => { const n = +b.dataset.rate.split('|')[2]; b.classList.toggle('on', n <= now); b.textContent = n <= now ? '★' : '☆'; b.setAttribute('aria-pressed', n === now); });
    window.dispatchEvent(new CustomEvent('hs-rated', { detail: el.dataset.rate }));
  });

  /* A number pad for PINs and codes. Works by tapping, or with a keyboard or remote. */
  window.pinPad = function (box, { length = 4, onDone, hint = '' }) {
    let entry = '';
    const draw = () => {
      box.querySelector('.pinDots').innerHTML = Array.from({ length }, (_, i) => `<i class="${i < entry.length ? 'on' : ''}"></i>`).join('');
    };
    box.innerHTML = `<div class="pinDots" aria-live="polite"></div><p class="pinError" hidden></p>
      <div class="pinKeys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button data-f data-key="${n}">${n}</button>`).join('')}<span></span><button data-f data-key="0">0</button><button data-f data-key="back" aria-label="Delete">⌫</button></div>${hint ? `<p class="pinHint">${esc(hint)}</p>` : ''}`;
    draw();
    const press = (key) => {
      if (key === 'back') entry = entry.slice(0, -1);
      else if (entry.length < length) entry += key;
      draw();
      if (entry.length === length) {
        const value = entry; entry = '';
        setTimeout(() => {
          draw();
          const message = onDone(value);
          if (message) { const e = box.querySelector('.pinError'); if (e) { e.textContent = message; e.hidden = false; gsap.fromTo(box.querySelector('.pinDots'), { x: -14 }, { x: 0, duration: .4, ease: 'elastic.out(1,.3)' }); } }
        }, 120);
      }
    };
    box.addEventListener('click', (ev) => { const b = ev.target.closest('[data-key]'); if (b) press(b.dataset.key); });
    box._keys = (ev) => { if (/^\d$/.test(ev.key)) press(ev.key); else if (ev.key === 'Backspace') { ev.preventDefault(); ev.stopPropagation(); press('back'); } };
    document.addEventListener('keydown', box._keys, true);
    const stop = new MutationObserver(() => { if (!box.isConnected) { document.removeEventListener('keydown', box._keys, true); stop.disconnect(); } });
    stop.observe(document.body, { childList: true, subtree: true });
    box.querySelector('[data-key]')?.focus({ preventScroll: true });
  };
})();
