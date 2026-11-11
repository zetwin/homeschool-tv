/* Children page lab: three ideas built from the parent's four questions (2026-11-11):
   1. Is each child doing their school today?  2. What did they do, and how did it go?
   3. Does anyone need me right now?  4. What's next for each child?
   A "By child": one card per child answers all four (like Google Family Link's child cards).
   B "By question": four answers, each showing every child (like a morning briefing).
   C "Needs you first": the children who need you, big; everyone else on one calm line each (like a notification summary).
   Address: view.html#<a|b|c>-<number of children>[-<child id>]. One child goes straight to that child's page. */
(function () {
  const D = window.KIDS, $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const I = {
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M9 20v-6h6v6"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z"/>',
    week: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>', say: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>', alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    play: '<path d="M7 4l13 8-13 8z"/>', test: '<path d="M9 3h6l1 3H8z"/><rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 12l2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', next: '<path d="M9 5l7 7-7 7"/>',
  };
  const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
  const face = (k, cls = '') => `<img class="face ${cls}" src="../assets/avatars/${k.face}.png" alt="">`;
  const [opt = 'a', , kidId] = (location.hash.slice(1) || 'a-3').split('-');
  const kids = D.kids, one = kids.length === 1;

  const head = (title, back) => `<header class="head">${back ? `<a class="back" href="${back.href}">${icon('back')}<span>${back.word}</span></a>` : ''}<h1>${esc(title)}</h1>
    <div class="tools"><button class="tool" aria-label="Text size and contrast"><b aria-hidden="true">Aa</b></button><button class="tool" aria-label="Tell us an idea or a problem">${icon('say')}</button><button class="tool" aria-label="Admin">${icon('gear')}</button></div></header>`;
  const PLACES = [['Today', 'Today', 'home'], [one ? 'Your child' : 'Children', one ? 'Child' : 'Children', 'people'], ['Materials', 'Materials', 'print'], ['The week', 'Week', 'week'], ['The program', 'Program', 'book']];
  const nav = () => `<nav class="nav" aria-label="Places">${PLACES.map(([w, s, ic], i) => `<button aria-current="${i === 1 ? 'page' : 'false'}">${icon(ic)}<span class="long">${w}</span><span class="short" aria-hidden="true">${s}</span></button>`).join('')}</nav>`;

  /* Shared answer pieces, the same words and shapes in every option. */
  const statusChip = (a) => `<span class="st st-${a.status === 'Finished' || a.status === 'Done for now' ? 'fin' : a.status === 'Working' ? 'work' : 'none'}">${a.status === 'Finished' || a.status === 'Done for now' ? icon('check') : '<i></i>'}${a.status === 'Done for now' && a.next ? `Done until ${a.next.time}` : a.status}</span>`;
  const bar = (a, k) => `<span class="bar" role="img" aria-label="${a.done} of ${a.total} classes done${a.missed.length ? `, ${a.missed.length} missed` : ''}">${k.classes.map((c) => `<i class="${c.state === 'done' ? 'on' : c.state === 'missed' ? 'miss' : ''}"></i>`).join('')}</span>`;
  const howWord = (a) => `<span class="how how-${a.how.tone}">${esc(a.how.word)}</span>`;
  const nextLine = (a) => (a.next ? `${a.next.state === 'now' ? 'Now' : 'Next'}: ${esc(a.next.subject)}${a.next.state === 'now' ? '' : ` ${a.next.time}`}` : 'Nothing left today');
  /* One class, one line: a mark, the subject, and how it went, in words. */
  const mark = (c) => c.state === 'done' ? `<span class="mk mk-done">${icon('check')}</span>` : c.state === 'missed' ? `<span class="mk mk-miss">!</span>` : c.state === 'now' ? '<span class="mk mk-now"></span>' : '<span class="mk mk-later"></span>';
  const result = (c) => c.state === 'done' ? (c.test ? `<span class="how how-${D.grade(...c.test)}">${c.test[0]} of ${c.test[1]}</span>` : `<span class="res">${c.watched}</span>`) : c.state === 'missed' ? '<span class="res miss">Missed</span>' : c.state === 'now' ? '<span class="res nowW">Now</span>' : `<span class="res">${c.time}</span>`;
  const classRows = (k, withLesson) => `<ul class="cls">${k.classes.map((c) => `<li class="c-${c.state}">${mark(c)}<span class="sb">${esc(c.subject)}${withLesson ? `<small>${esc(c.lesson)}</small>` : ''}</span>${result(c)}</li>`).join('')}</ul>`;
  const link = (k) => `view.html#${opt}-${kids.length}-${k.id}`;
  const needing = kids.filter((k) => D.answers(k).needs.length);
  const headline = () => (!needing.length ? 'Everyone is on track' : needing.length === 1 ? `${needing[0].name} needs you` : `${needing.length} children need you`);

  /* A: one card per child, the four answers top to bottom. */
  function byChild() {
    return `<div class="sum"><h2 class="lead">${headline()}</h2><p class="date">${D.DATE}, ${D.NOW}</p></div>
      <div class="cards" style="--n:${kids.length}">${kids.map((k) => { const a = D.answers(k); return `<a class="card ${a.needs.length ? 'needs' : ''}" href="${link(k)}">
        <div class="who">${face(k)}<b>${esc(k.name)}</b>${icon('next', 'go')}</div>
        <div class="q1">${statusChip(a)}</div>
        ${classRows(k, 'short')}
        ${a.how.tone === 'none' || a.how.tone === 'bad' ? '' : `<div class="q2"><span class="qk">Tests</span>${howWord(a)}</div>`}
        ${a.needs.length ? `<div class="q3">${icon('alert')}<span>${a.needs.map(esc).join('. ')}</span></div>` : ''}
        <div class="q4">${bar(a, k)}<span>${nextLine(a)}</span></div></a>`; }).join('')}</div>`;
  }
  /* B: four answers, each one showing every child. */
  function byQuestion() {
    const rows = (fn) => `<ul class="rows">${kids.map((k) => `<li><a href="${link(k)}">${face(k, 'sm')}<b>${esc(k.name)}</b>${fn(k, D.answers(k))}</a></li>`).join('')}</ul>`;
    const need = needing.length ? `<ul class="rows">${needing.map((k) => `<li><a href="${link(k)}">${face(k, 'sm')}<b>${esc(k.name)}</b><span class="nd">${D.answers(k).needs.map(esc).join('. ')}</span></a></li>`).join('')}</ul>` : `<p class="allok">${icon('check')}Nobody. All fine.</p>`;
    return `<div class="sum"><h2 class="lead">${headline()}</h2><p class="date">${D.DATE}, ${D.NOW}</p></div>
      <div class="qs">
        <section class="qbox"><h3>Doing school today?</h3>${rows((k, a) => `<span class="r">${statusChip(a)}${bar(a, k)}</span>`)}</section>
        <section class="qbox ${needing.length ? 'needs' : ''}"><h3>Who needs you?</h3>${need}</section>
        <section class="qbox"><h3>How are the tests?</h3>${rows((k, a) => `<span class="r">${howWord(a)}</span>`)}</section>
        <section class="qbox"><h3>What's next?</h3>${rows((k, a) => `<span class="r nx">${nextLine(a)}</span>`)}</section>
      </div>`;
  }
  /* C: the children who need you first, big; then everyone on one line. */
  function needsFirst() {
    const top = needing.length ? `<div class="alarm" style="--n:${needing.length}">${needing.map((k) => { const a = D.answers(k); return `<a class="alarmCard" href="${link(k)}">${face(k, 'lg')}<div><b>${esc(k.name)} needs you</b>${a.needs.map((t) => `<span>${esc(t)}</span>`).join('')}</div><span class="btn">Open ${esc(k.name)}</span></a>`; }).join('')}</div>`
      : `<div class="calm">${icon('check')}<div><b>Everyone is on track</b><span>Nobody needs you right now.</span></div></div>`;
    return `<p class="date solo">${D.DATE}, ${D.NOW}</p>${top}
      <div class="lines"><h3>Everyone today</h3>${kids.map((k) => { const a = D.answers(k); return `<a class="line" href="${link(k)}">${face(k, 'sm')}<b class="nm">${esc(k.name)}</b>${statusChip(a)}<span class="cnt">${bar(a, k)}</span><span class="t"><span class="qk">Tests</span> ${howWord(a)}</span><span class="nx">${nextLine(a)}</span>${icon('next', 'go')}</a>`; }).join('')}</div>`;
  }
  /* One child's page: the same four answers, in more detail. */
  function kidPage(k) {
    const a = D.answers(k);
    const waiting = k.tests.length + k.catchup.length;
    return `<div class="kp">
      <div class="kpTop">${face(k, 'xl')}<div><h2 class="lead">${a.status === 'Not started' ? 'Not started yet' : a.status === 'Finished' ? 'Finished for today' : a.status === 'Done for now' ? `Done until ${a.next.time}` : 'Working now'}</h2>
        ${a.how.detail ? `<p class="kpSub"><span>Tests ${howWord(a)}</span><span class="quiet">${esc(a.how.detail)}</span></p>` : ''}</div></div>
      ${waiting ? `<div class="kpGrid">
        <section class="kpBox"><h3>Today, class by class</h3>${classRows(k, true)}</section>
        <div class="kpSide">
          ${waiting ? `<section class="kpBox"><h3>Waiting</h3><ul class="left">${k.tests.map((t) => `<li>${icon('test', 'k')}<span class="w">${esc(t)}</span></li>`).join('')}${k.catchup.map((t) => `<li>${icon('play', 'k')}<span class="w">${esc(t)}</span></li>`).join('')}</ul></section>` : ''}
          <p class="sign quiet">${esc(k.name)} signs in with <b>${k.id.replace('k', 'kid')}</b>. <a href="#" onclick="return false">Change password</a></p>
        </div>` : `<div class="kpGrid one">
        <section class="kpBox"><div class="kpBoxHead"><h3>Today, class by class</h3><span class="allok sm">${icon('check')}Nothing waiting</span></div>${classRows(k, true)}</section>
        <p class="sign quiet">${esc(k.name)} signs in with <b>${k.id.replace('k', 'kid')}</b>. <a href="#" onclick="return false">Change password</a></p>`}
      </div></div>`;
  }

  const kid = kids.find((k) => k.id === kidId) || (one ? kids[0] : null);
  const back = kid && !one ? { href: `view.html#${opt}-${kids.length}`, word: 'Children' } : null;
  const body = kid ? kidPage(kid) : opt === 'b' ? byQuestion() : opt === 'c' ? needsFirst() : byChild();
  $('#app').innerHTML = `${head(kid ? kid.name : 'Children', back)}<main class="main opt-${opt} n${kids.length} ${kids.length >= 5 || (innerWidth < 600 && kids.length >= 3) ? 'compact' : ''}">${body}</main>${nav()}`;
  document.title = `Children ${opt.toUpperCase()}${kid ? `: ${kid.name}` : ''}`;
  addEventListener('hashchange', () => location.reload());
})();
