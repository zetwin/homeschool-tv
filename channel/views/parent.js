/* Parent side: login opens the parent pad, with no side menu. Admin sits behind a button marked Admin. Billing is a sample screen. See docs/product/PARENT-PAD-PURPOSE.md. */
(function () {
  /* Admin: the account, not the teaching. Everything else belongs to the pad. */
  const ADMIN = [['family', 'Family'], ['me', 'Your account'], ['plan', 'Lessons and languages'], ['how', 'How it works'], ['account', 'Plan and billing'], ['health', 'Feedback and checks']];
  const isAdmin = (tab) => ADMIN.some(([k]) => k === tab);
  /* These pages live in their own files, but open inside the same side menu. */
  const OUTSIDE = { diary: () => window.renderDiary(), timetable: () => window.renderTimetable(), program: () => window.renderProgramDoc(), how: () => window.renderHow(), print: () => window.renderPrint() };
  const V = { tab: 'today', journalKid: 'all' };
  const shortDate = (t) => new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  const S = window.Store;
  const totals = (r) => window.examTotals(r);
  const face = (k) => S.face(k, 'small');
  /* Parents have no picture: their first letter stands in. */
  const adultFace = (p, size = 'small') => `<span class="kidFace adultFace ${size}" aria-hidden="true">${esc((p.name || p.username || '?').trim().charAt(0).toUpperCase())}</span>`;
  const CHEVRON = '<svg class="famGo" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  const years = (sel) => window.CURRICULUM.years.map((y) => `<option ${y.name === sel ? 'selected' : ''}>${y.name}</option>`).join('');

  const KIND = { starter: 'Starter quiz', test: 'Lesson test', retest: 'Re-test' };
  function journalRows() {
    const rows = S.data.attempts.map((a) => ({ at: a.at, kidId: a.kidId, subject: window.EPISODES.find((e) => e.id === (a.ep || 'skeleton'))?.subject || 'Science', topic: window.EPISODES.find((e) => e.id === (a.ep || 'skeleton'))?.topic || '', type: KIND[a.kind] || a.kind, got: a.score, total: a.total }));
    S.data.exams.forEach((r) => { const t = totals(r); rows.push({ at: r.at, kidId: r.kidId, topic: 'Human skeleton and muscles', type: 'Unit exam', got: t.got, total: t.total, waiting: t.waiting, self: t.self }); });
    /* Marks a parent gives in a class count as scores too, so the two never disagree. */
    S.data.kids.forEach((k) => Object.entries(S.data.school?.log?.[k.id] || {}).forEach(([key, e]) => {
      if (!e.mark || Number.isNaN(+e.mark)) return;
      const date = key.slice(0, 10), p = window.Schedule.dayOf(k, date).periods.find((x) => x.n === +key.slice(11));
      rows.push({ at: `${date}T12:00:00`, kidId: k.id, subject: p?.subject || '', topic: p?.title || p?.subject || 'Class', type: 'Class mark', got: +e.mark, total: S.data.school.scale === 'percent' ? 100 : 12 });
    }));
    return rows.sort((a, b) => new Date(b.at) - new Date(a.at));
  }
  const tabs = {
    journal() {
      const rows = journalRows().filter((r) => V.journalKid === 'all' || r.kidId === V.journalKid);
      return `<h1>Gradebook</h1><p class="lead">Every test and exam, kept as a dated record.</p>
        <div class="journalFilter" role="group" aria-label="Show results for"><button class="plainBtn ${V.journalKid === 'all' ? 'on' : ''}" data-f data-jkid="all">All children</button>${S.data.kids.map((k) => `<button class="plainBtn ${V.journalKid === k.id ? 'on' : ''}" data-f data-jkid="${esc(k.id)}">${esc(k.name)}</button>`).join('')}</div>
        ${rows.length ? `<div class="tableWrap"><table class="reportTable"><thead><tr><th>Date</th><th>Child</th><th>Subject</th><th>Topic</th><th>Type</th><th>Result</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${shortDate(r.at)}</td><td>${esc(S.kid(r.kidId)?.name || '')}</td><td>${esc(r.subject || 'Science')}</td><td>${esc(r.topic)}</td><td>${esc(r.type)}</td><td>${r.got}/${r.total}${r.waiting ? ' so far' : ''}${r.waiting ? '<small class="selfNote">Written answers not checked yet</small>' : r.self ? '<small class="selfNote">Written answers self-checked</small>' : ''}</td></tr>`).join('')}</tbody></table></div>` : '<p class="lead">No results yet. They appear here as soon as a child finishes a quiz, test or exam.</p>'}`;
    },
    today() { return ''; },
    /* Your account: only the signed-in parent's own things. */
    me() {
      const me = S.me(), i = S.data.parents.indexOf(me);
      return `<h1>Your account</h1><p class="lead">Your name and your password. Only you see this page. Text size is the Aa button at the top of every screen.</p>
        <section class="famCard"><div class="famCardHead">${adultFace(me, '')}<div><h2>${esc(me.name || 'Parent')}</h2><p>Signs in as ${esc(me.username)}</p></div></div><p class="famSaid" role="status">${esc(V.saved || '')}</p>
          <div class="famFields"><label for="myName">Your name<input id="myName" data-parentname="${i}" value="${esc(me.name || '')}" autocomplete="off"></label>
          <label for="myUser">Username<input id="myUser" data-parentuser="${i}" value="${esc(me.username)}" autocomplete="off" autocapitalize="off"></label></div><p class="fine">Changes save by themselves when you leave a box.</p></section>
        <section class="famCard" aria-labelledby="pwHead"><h2 id="pwHead">Change my password</h2>
          <div class="famFields"><label for="newPass">New password<input id="newPass" type="password" autocomplete="new-password"></label>
          <label for="newPass2">Type it again<input id="newPass2" type="password" autocomplete="new-password"></label></div>
          <div class="famActions"><button class="solidBtn dark" data-f data-savepass>Save my password</button><p class="famSaid" role="status">${esc(V.passSaid || '')}</p></div></section>
`;
    },
    /* Family: everyone who uses Home School. A tap opens one person's card. */
    family() {
      if (V.person === 'new-parent' || V.person === 'new-child') return newPerson(V.person === 'new-parent');
      const person = V.person && (S.data.parents.find((p) => p.id === V.person) || S.kid(V.person));
      if (person) return S.data.parents.includes(person) ? parentCard(person) : childCard(person);
      const me = S.me();
      const parentRows = [me, ...S.data.parents.filter((p) => p !== me)].filter(Boolean).map((p) => `<li><button class="famRow" data-f ${p === me ? 'data-ptab="me"' : `data-person="${esc(p.id)}"`}>${adultFace(p)}<span class="famWho"><b>${esc(p.name || p.username)}</b><small>${p === me ? (p.name === 'Parent' ? 'You. Add your name in Your account' : 'You') : p.mustChange ? 'Hasn’t signed in yet' : 'Parent'}</small></span>${CHEVRON}</button></li>`).join('');
      const kidRows = S.data.kids.map((k) => `<li><button class="famRow" data-f data-person="${esc(k.id)}">${face(k)}<span class="famWho"><b>${esc(k.name)}</b><small>${esc(k.year)}</small></span>${CHEVRON}</button></li>`).join('');
      return `<h1>Family</h1><p class="lead">Everyone in your home school. Tap a person to change their name or login.</p>
        <section class="famGroup" aria-labelledby="famParents"><div class="famGroupHead"><h2 id="famParents">Parents</h2><button class="plainBtn" data-f data-person="new-parent">Add a parent</button></div><ul class="famList">${parentRows}</ul></section>
        <section class="famGroup" aria-labelledby="famKids"><div class="famGroupHead"><h2 id="famKids">Children</h2><button class="plainBtn" data-f data-person="new-child">Add a child</button></div>${kidRows ? `<ul class="famList">${kidRows}</ul>` : '<p class="lead">No children yet.</p>'}<p class="fine">Children sign in on their own device. They don’t need an email address.</p></section>
        <section class="famGroup" aria-labelledby="famPin"><h2 id="famPin">Exam PIN</h2><div class="familyCode admPin"><label for="parentPin">The 4 numbers<input id="parentPin" class="pinInput" data-parentpin value="${esc(S.data.parentPin)}" inputmode="numeric" maxlength="4" autocomplete="off"></label><p>An adult types these 4 numbers to start a child’s exam, so a child can’t start one alone.</p></div></section>`;
    },
    /* Feedback and checks: what parents sent, and the last 7 days from the log on the Mac. See docs/product/MONITORING.md. */
    health() {
      const fb = [...(S.data.feedback || [])].reverse(), log = V.log || [], when = (t) => new Date(t).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      const name = (who) => S.data.parents.find((p) => p.id === who)?.name || S.kid(who)?.name || (who === 'nobody' ? 'Not signed in' : 'Parent');
      const count = (f) => log.filter(f).length, errs = {}, early = {};
      log.filter((e) => e.kind === 'error' || (e.did === 'failed')).forEach((e) => { const file = e.msg === 'A file didn’t load' ? (/\.mp3/.test(e.where || '') ? 'A voice clip didn’t load' : /\.(jpe?g|png|webp|svg)/.test(e.where || '') ? 'A picture didn’t load' : 'A file didn’t load') : null;
        const k = e.kind === 'error' ? (file ? `${file}${e.page && e.page !== 'home' ? ` (on ${e.page.replace(/-/g, ' ')})` : ''}` : e.msg) : `${e.kind === 'video' ? 'A video didn’t play' : 'A voice clip didn’t load'}: ${e.ep || ''} ${e.scene || e.clip || ''}`; (errs[k] ??= { n: 0, last: e.at, where: new Set() }).n++; errs[k].last = e.at; errs[k].where.add(e.device || ''); });
      log.filter((e) => e.did === 'left early').forEach((e) => { const k = window.EPISODES.find((x) => x.id === e.ep)?.topic || e.ep; early[k] = (early[k] || 0) + 1; });
      const nums = [['Sign-ins', count((e) => e.kind === 'signin')], ['Lessons finished', count((e) => e.did === 'finished')], ['Left early', count((e) => e.did === 'left early')], ['Problems', Object.values(errs).reduce((n, x) => n + x.n, 0), true]];
      return `<h1>Feedback and checks</h1><p class="lead">What parents sent us, and how Home School worked this week. Nothing here leaves your home.</p>
        <section class="health"><h2>Ideas and problems</h2>${fb.length ? `<ul class="famList">${fb.map((f) => `<li class="fbItem"><b>${f.kind === 'problem' ? 'Something’s wrong' : 'An idea'}</b><span>${esc(f.text)}</span><small>${esc(f.name || 'Parent')}, ${esc(when(f.at))}</small></li>`).join('')}</ul>` : '<p>Nothing yet. The speech bubble at the top of the pad sends one.</p>'}</section>
        <section class="health"><h2>The last 7 days</h2>${V.log ? `<div class="healthNums">${nums.map(([t, n, bad]) => `<div class="${bad && n ? 'bad' : ''}"><b>${n}</b><span>${t}</span></div>`).join('')}</div>
          ${Object.keys(errs).length ? `<h3>Problems</h3><p>These are ours to fix, not yours. Ask Claude to “check the home school”, or send them with the speech bubble on the pad.</p><ul class="famList">${Object.entries(errs).sort((a, b) => b[1].n - a[1].n).map(([m, x]) => `<li class="fbItem"><b>${esc(m)}</b><small>${x.n} ${x.n === 1 ? 'time' : 'times'}, last ${esc(when(x.last))}, on ${esc([...x.where].filter(Boolean).join(', ') || 'a device')}</small></li>`).join('')}</ul>` : '<p>No problems recorded.</p>'}
          ${Object.keys(early).length ? `<h3>Lessons left before the end</h3><ul class="famList">${Object.entries(early).map(([t, n]) => `<li class="fbItem"><b>${esc(t)}</b><small>${n} ${n === 1 ? 'time' : 'times'}</small></li>`).join('')}</ul>` : ''}
          <h3>Who signed in</h3><p>${[...new Set(log.filter((e) => e.kind === 'signin').map((e) => name(e.who)))].map(esc).join(', ') || 'Nobody yet'}</p>` : '<p>Loading…</p>'}</section>`;
    },
    plan() {
      const C = window.CURRICULUM;
      return `<h1>Lessons and languages</h1><p class="lead">What your children learn, and in which language.</p>
        <section class="famCard" aria-labelledby="progHead"><h2 id="progHead">The program</h2>
          <p class="admSay">Lessons follow <b>${esc(C.standard.replace('National Curriculum', 'national curriculum'))}</b>.</p>
          <p>All ${C.program.length} subjects have their units and lessons planned. We make the video lessons one by one, so many classes don’t have a video yet.</p>
          <p class="fine">Programs from other countries, such as Spain and the United States, are coming later.</p>
          <div class="famActions"><button class="solidBtn dark" data-f id="openMap">Open the program</button><button class="plainBtn" data-f id="openAssessFromPlan">How tests and exams work</button></div></section>
        ${languages()}`;
    },
    account() {
      const n = S.data.kids.length;
      return `<h1>Plan and billing</h1><p class="lead">Free during the trial. Nothing is charged, and we don’t ask for payment details.</p>
        <section class="famCard"><h2>Your plan</h2><p class="admSay"><b>Family trial</b> for ${n} ${n === 1 ? 'child' : 'children'}. Free.</p></section>`;
    },
  };
  const back = '<button class="plainBtn famBack" data-f data-person="">All the family</button>';
  /* Languages: lessons are taught in English. Word help adds the Spanish for key words, for the family or one child. See docs/product/LANGUAGES.md. */
  const WH = [['off', 'No, English only', 'Lessons stay as they are'], ['es', 'Yes, English with Spanish words', 'The Spanish for each key word shows in the corner, with a word list at the end']];
  function languages() {
    const L = S.data.languages;
    return `<section class="famCard" aria-labelledby="langHead"><h2 id="langHead">Spanish key words</h2>
      <p class="admSay">Lessons are in English. <b>Show key words in Spanish too?</b></p>
      <div class="padChoice two whChoice" role="group" aria-label="Show key words in Spanish too?">${WH.map(([v, t, sub]) => `<button data-f data-wordhelp="${v}" aria-pressed="${(L.wordHelp || 'off') === v}"><b>${t}</b><span>${sub}</span></button>`).join('')}</div>
      <p class="fine">This is for the whole family. One child can have a different choice: open their card in Family.</p></section>`;
  }
  function newPerson(adult) {
    return `${back}<h1>${adult ? 'Add a parent' : 'Add a child'}</h1><p class="lead">${adult ? 'They get their own login. You’ll see a starting password to give them, and they choose their own the first time they sign in.' : 'They get their own login for their own device.'}</p>
      <section class="famCard"><div class="famFields"><label for="newName">${adult ? 'Their name' : 'Child’s name'}<input id="newName" autocomplete="off"></label>
      ${adult ? '' : `<label for="newYear">School level<select id="newYear">${years('Year 7')}</select></label>`}</div>
      <div class="famActions"><button class="solidBtn dark" data-f data-create="${adult ? 'parent' : 'child'}">${adult ? 'Create their login' : 'Add this child'}</button><p class="famSaid" role="status">${esc(V.passSaid || '')}</p></div></section>`;
  }
  /* A login just made or reset is shown once, so it can be passed on. Afterwards only its owner knows it. */
  const handOver = (who, user, pass, adult) => `<div class="famHand" role="status"><h2>Give ${esc(who)} these</h2><dl><div><dt>Username</dt><dd>${esc(user)}</dd></div><div><dt>${adult ? 'Starting password' : 'Password'}</dt><dd>${esc(pass)}</dd></div></dl><p>${adult ? `${esc(who)} chooses their own password the first time they sign in. Write it down or take a photo now. If it gets lost, tap Make a new password.` : 'You can see this password here again at any time.'}</p></div>`;
  function parentCard(p) {
    const i = S.data.parents.indexOf(p), shown = V.shownPass?.id === p.id ? V.shownPass.pass : null, who = p.name || p.username;
    return `${back}<section class="famCard"><div class="famCardHead">${adultFace(p, '')}<div><h1>${esc(who)}</h1><p>Parent${p.mustChange ? ', hasn’t signed in yet' : ''}</p></div></div><p class="famSaid" role="status">${esc(V.saved || '')}</p>
      ${shown ? handOver(who, p.username, shown, true) : ''}
      <div class="famFields"><label for="pName">Name<input id="pName" data-parentname="${i}" value="${esc(p.name || '')}" autocomplete="off"></label>
      <label for="pUser">Username<input id="pUser" data-parentuser="${i}" value="${esc(p.username)}" autocomplete="off" autocapitalize="off"></label></div>
      <div class="famPass"><b>Password</b><p>${shown ? 'Shown above, once.' : `Hidden. Only ${esc(who)} knows it.`}</p>${V.resetting === p.id ? `<div class="removeAsk"><p><b>Make a new password for ${esc(who)}?</b> The one they use now will stop working.</p><button class="plainBtn" data-f data-keepreset>Keep it</button><button class="solidBtn dark" data-f data-resetparent="${esc(p.id)}">Make a new one</button></div>` : `<button class="plainBtn" data-f data-askreset="${esc(p.id)}">Make a new password</button>`}</div></section>
      ${V.removingParent === p.id ? `<div class="removeAsk"><p><b>Remove ${esc(who)} from the family?</b> They won’t be able to sign in. The children’s work stays.</p><button class="plainBtn" data-f data-keepparent>Keep ${esc(who)}</button><button class="solidBtn dangerBtn" data-f data-removeparent="${esc(p.id)}">Remove</button></div>` : `<button class="plainBtn famRemove" data-f data-askremoveparent="${esc(p.id)}">Remove from the family</button>`}`;
  }
  function childCard(k) {
    const i = S.data.kids.indexOf(k);
    return `${back}<section class="famCard"><div class="famCardHead">${S.face(k)}<div><h1>${esc(k.name)}</h1><p>${esc(k.year)}</p></div></div><p class="famSaid" role="status">${esc(V.saved || '')}</p>
      ${V.shownPass?.id === k.id ? handOver(k.name, k.username, k.pin, false) : ''}
      <div class="famFields"><label for="kidName${i}">Name<input id="kidName${i}" data-kidname="${i}" value="${esc(k.name)}" autocomplete="off"></label>
      <label for="kidYear${i}">School level<select id="kidYear${i}" data-kidyear="${i}">${years(k.year)}</select></label>
      <label for="kidUser${i}">Username<input id="kidUser${i}" data-kiduser="${i}" value="${esc(k.username)}" autocomplete="off" autocapitalize="off"></label>
      </div>
      <div class="famPass famKidPass"><b>Password</b><p>${esc(k.name)} signs in with <strong>${esc(k.username)}</strong> and the password <strong>${esc(k.pin)}</strong></p>
        ${V.kidPass === k.id ? `<div class="famFields"><label for="kidNewPin">New password<input id="kidNewPin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"></label></div>
        <div class="famActions"><button class="plainBtn" data-f data-keepkidpin>Cancel</button><button class="solidBtn dark" data-f data-savekidpin="${i}">Save the new password</button></div>` : `<button class="plainBtn" data-f data-changekidpin="${esc(k.id)}">Change password</button>`}</div>
      <div class="kidWh"><h2>Spanish key words for ${esc(k.name)}</h2><div class="padChoice whChoice three" role="group" aria-label="Spanish key words for ${esc(k.name)}">${[['family', 'Same as the family', (S.data.languages.wordHelp || 'off') === 'es' ? 'Now: English with Spanish words' : 'Now: English only'], ['off', 'English only', 'Lessons stay as they are'], ['es', 'English with Spanish words', 'Key words also in Spanish']].map(([v, t, sub]) => `<button data-f data-kidwhset="${i}|${v}" aria-pressed="${(k.wordHelp || 'family') === v}"><b>${t}</b><span>${sub}</span></button>`).join('')}</div></div>
      <p class="fine">You can always see and change a child’s password here, because children forget them.</p></section>
      ${V.removing === k.id ? `<div class="removeAsk"><p><b>Remove ${esc(k.name)}?</b> This also erases their tests, exams, marks and diary, and it can’t be undone.</p><button class="plainBtn" data-f data-keepkid>Keep ${esc(k.name)}</button><button class="solidBtn dangerBtn" data-f data-removekid="${esc(k.id)}">Remove for good</button></div>` : `<button class="plainBtn famRemove" data-f data-askremove="${esc(k.id)}">Remove from the family</button>`}`;
  }
  /* A parent with a starting password chooses their own before anything else. */
  function choosePassword(me) {
    app.innerHTML = `<main class="famFirst"><div class="famStack"><p class="famBrand">Home School <i>TV</i></p><section class="famCard"><h1>Welcome, ${esc(me.name || 'there')}</h1><p class="lead">Choose your own password. You’ll use it with the username <b>${esc(me.username)}</b> from now on.</p>
      <div class="famFields"><label for="newPass">New password<input id="newPass" type="password" autocomplete="new-password"></label><label for="newPass2">Type it again<input id="newPass2" type="password" autocomplete="new-password"></label></div>
      <div class="famActions"><button class="solidBtn dark" data-f data-savepass>Save and continue</button><p class="famSaid" role="status">${esc(V.passSaid || '')}</p></div></section><button class="famOut" data-f id="parentExit">Not ${esc(me.name || 'you')}? Sign out</button></div></main>`;
    document.getElementById('newPass').focus({ preventScroll: true });
  }
  /* Every parent screen uses the pad's frame and parts (owner, 2026-11-09): the pad, Admin, and the pages other files draw. */
  function shell(tab, main, fit) {
    window.Pad.applyReading();
    if (tab === 'today') { app.innerHTML = window.Pad.html(); window.Pad.fit?.(); window.scrollTo(0, 0); return; }
    app.innerHTML = isAdmin(tab) ? window.Pad.adminShell(ADMIN, tab, main) : window.Pad.pageShell(tab, main, fit);
    window.scrollTo(0, 0);
  }

  function draw() {
    document.body.dataset.surface = 'paper';
    if (V.tab === 'children') V.tab = 'family';
    if (!tabs[V.tab]) V.tab = 'today';
    window.setRoute(V.tab === 'today' ? 'parent' : `parent-${V.tab}`);
    const me = S.me();
    if (me?.mustChange && !S.preview) { choosePassword(me); return; }
    shell(V.tab, tabs[V.tab]());
  }
  window.drawParent = draw;
  window.ParentData = { journalRows, KIND, shortDate };
  /* Other files draw a parent page through this, so the menu is always there. */
  window.cabinetPage = (tab, html, surface) => { document.body.dataset.surface = surface; V.tab = tab; shell(tab, html, true); };
  window.renderParent = async (tab) => {
    if (tab) { V.tab = tab; V.saved = V.passSaid = ''; V.person = null; }
    if (V.tab === 'health') fetch('/api/log?days=7').then((r) => (r.ok ? r.json() : [])).catch(() => []).then((l) => { V.log = l; if (V.tab === 'health') draw(); });
    if (!S.isParent()) { window.renderLogin(); return; }
    await S.refresh();
    if (OUTSIDE[V.tab]) V.tab = 'today';
    draw();
  };

  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button');
    if (!el) return;
    if (el.dataset.ptab && OUTSIDE[el.dataset.ptab]) OUTSIDE[el.dataset.ptab]();
    else if (el.dataset.ptab === 'health') { V.tab = 'health'; V.log = null; S.refresh().then(draw); fetch('/api/log?days=7').then((r) => (r.ok ? r.json() : [])).catch(() => []).then((l) => { V.log = l; if (V.tab === 'health') draw(); }); }
    else if (el.dataset.ptab) { V.tab = el.dataset.ptab; V.person = el.dataset.pperson || null; V.shownPass = V.resetting = V.kidPass = null; V.passSaid = V.saved = ''; S.refresh().then(draw); }
    else if (el.dataset.jkid) { V.journalKid = el.dataset.jkid; draw(); }
    else if (el.id === 'parentExit' || el.dataset.signout != null) { window.endScreens?.(); S.signOut(); V.tab = 'today'; window.renderLogin(); }
    else if (el.id === 'openAssessFromPlan') window.renderAssess();
    else if (el.dataset.person != null) { V.person = el.dataset.person || null; V.removing = V.removingParent = V.shownPass = V.resetting = V.kidPass = null; V.passSaid = V.saved = ''; draw(); document.querySelector('.cabMain h1, .cabMain input')?.focus({ preventScroll: true }); }
    else if (el.dataset.create) {
      const name = document.getElementById('newName').value.trim();
      if (!name) { V.passSaid = 'Type a name first.'; draw(); document.getElementById('newName').focus(); return; }
      V.passSaid = '';
      if (el.dataset.create === 'parent') { const p = S.addParent(name); V.person = p.id; V.shownPass = { id: p.id, pass: p.password }; }
      else { const k = S.addKid(name, document.getElementById('newYear').value); V.person = k.id; V.shownPass = { id: k.id }; }
      draw();
    }
    else if (el.dataset.kidwhset) { const [ki, v] = el.dataset.kidwhset.split('|'), k = S.data.kids[+ki]; if (v === 'family') delete k.wordHelp; else k.wordHelp = v; S.saveSettings(); V.saved = 'Saved Spanish key words.'; draw(); document.querySelector(`[data-kidwhset="${ki}|${v}"]`)?.focus({ preventScroll: true }); }
    else if (el.dataset.wordhelp) { S.data.languages.wordHelp = el.dataset.wordhelp; S.saveLanguages(); draw(); document.querySelector(`[data-wordhelp="${el.dataset.wordhelp}"]`)?.focus({ preventScroll: true }); }
    else if (el.dataset.askreset) { V.resetting = el.dataset.askreset; draw(); document.querySelector('[data-keepreset]')?.focus({ preventScroll: true }); }
    else if (el.dataset.keepreset != null) { V.resetting = null; draw(); }
    else if (el.dataset.changekidpin) { V.kidPass = el.dataset.changekidpin; V.saved = ''; draw(); document.getElementById('kidNewPin')?.focus(); }
    else if (el.dataset.keepkidpin != null) { V.kidPass = null; draw(); }
    else if (el.dataset.savekidpin != null) {
      const k = S.data.kids[+el.dataset.savekidpin], next = (document.getElementById('kidNewPin')?.value || '').trim();
      if (next.length < 3) { V.saved = 'Use at least 3 letters or numbers.'; draw(); document.getElementById('kidNewPin')?.focus(); return; }
      k.pin = next; V.kidPass = null; V.saved = 'Saving…'; draw();
      /* Waits for the home server, so the parent knows the child can sign in with it everywhere. */
      S.saveSettings().then((done) => { V.saved = done ? `Saved. ${k.name} now signs in with ${k.username} and ${next}.` : 'Not saved: the home server didn’t answer. Try again.'; if (V.person === k.id) draw(); });
    }
    else if (el.dataset.resetparent) { V.resetting = null; const p = S.data.parents.find((x) => x.id === el.dataset.resetparent); V.shownPass = { id: p.id, pass: S.resetParent(p) }; draw(); }
    else if (el.dataset.savepass != null) {
      const a = document.getElementById('newPass').value, b = document.getElementById('newPass2').value, me = S.me();
      V.passSaid = a.trim().length < 4 ? 'Use at least 4 characters.' : a !== b ? 'The two passwords aren’t the same.' : '';
      if (!V.passSaid) { me.password = a; delete me.mustChange; S.saveSettings(); V.passSaid = V.tab === 'me' ? 'Saved. Use it next time you sign in.' : ''; }
      draw();
    }
    else if (el.dataset.askremove) { V.removing = el.dataset.askremove; draw(); document.querySelector('[data-keepkid]')?.focus({ preventScroll: true }); }
    else if (el.dataset.keepkid != null) { V.removing = null; draw(); }
    else if (el.dataset.askremoveparent) { V.removingParent = el.dataset.askremoveparent; draw(); document.querySelector('[data-keepparent]')?.focus({ preventScroll: true }); }
    else if (el.dataset.keepparent != null) { V.removingParent = null; draw(); }
    else if (el.dataset.removeparent) { S.removeParent(el.dataset.removeparent); V.removingParent = null; V.person = null; draw(); }
    else if (el.dataset.removekid) { S.removeKid(el.dataset.removekid); V.removing = null; V.person = null; V.journalKid = 'all'; draw(); }
  });
  /* Fields save when you leave them. The card then says so, or says why not, and redraws so its heading and hand-over box match. */
  const said = (ok, what) => { V.saved = ok ? `Saved ${what}.` : what; setTimeout(() => { const id = document.activeElement?.id; if (['me', 'family', 'plan'].includes(V.tab)) draw(); if (id) document.getElementById(id)?.focus({ preventScroll: true }); }); };
  const taken = 'That username is already used in this family. Try another.';
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.target.id === 'kidNewPin') { ev.preventDefault(); document.querySelector('[data-savekidpin]')?.click(); } });
  document.addEventListener('change', (ev) => {
    const t = ev.target;
    if (t.dataset.kidname != null) { const next = t.value.trim(); const k = S.data.kids[+t.dataset.kidname]; if (next) k.name = next; else t.value = k.name; S.saveSettings(); said(!!next, next ? 'the name' : 'A name can’t be empty.'); }
    if (t.dataset.kidwh != null) { const k = S.data.kids[+t.dataset.kidwh]; if (t.value === 'family') delete k.wordHelp; else k.wordHelp = t.value; S.saveSettings(); said(true, 'word help'); }
    if (t.dataset.kidyear != null) { S.data.kids[+t.dataset.kidyear].year = t.value; S.saveSettings(); said(true, 'the school level'); }
    if (t.dataset.kidpin != null) { const k = S.data.kids[+t.dataset.kidpin], next = t.value.trim(); if (next) k.pin = next; else t.value = k.pin; S.saveSettings(); said(!!next, next ? 'the password' : 'A password can’t be empty.'); }
    if (t.dataset.kiduser != null) { const k = S.data.kids[+t.dataset.kiduser], next = t.value.trim().toLowerCase(), clash = next && S.usernameTaken(next, k); if (next && !clash) k.username = next; else t.value = k.username; S.saveSettings(); said(next && !clash, next && !clash ? 'the username' : clash ? taken : 'A username can’t be empty.'); }
    if (t.dataset.parentname != null) { const p = S.data.parents[+t.dataset.parentname], next = t.value.trim(); if (next) p.name = next; else t.value = p.name || ''; S.saveSettings(); said(!!next, next ? 'the name' : 'A name can’t be empty.'); }
    if (t.dataset.parentuser != null) { const p = S.data.parents[+t.dataset.parentuser], next = t.value.trim().toLowerCase(), clash = next && S.usernameTaken(next, p); if (next && !clash) p.username = next; else t.value = p.username; S.saveSettings(); said(next && !clash, next && !clash ? 'the username' : clash ? taken : 'A username can’t be empty.'); }
    if (t.dataset.parentpin != null) { if (/^\d{4}$/.test(t.value)) S.data.parentPin = t.value; else t.value = S.data.parentPin; S.saveSettings(); }
  });
})();
