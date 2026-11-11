/* The learning program, in several versions to compare. D to G use the channel's own look; A to C are the earlier directions, kept as options. */
(function () {
  const C = () => window.CURRICULUM;
  const M = { view: 'shelves', stop: 5, zoom: [], year: 2, subject: 0, pick: null };
  /* Where you were on the map survives a refresh on this device. */
  try { Object.assign(M, JSON.parse(sessionStorage.getItem('hs-map')) || {}); } catch (e) {}
  const keep = () => { try { sessionStorage.setItem('hs-map', JSON.stringify(M)); } catch (e) {} };
  const STRANDS = { Biology: '#0F766E', Chemistry: '#7E22CE', Physics: '#1D4ED8' };
  const color = (s) => STRANDS[s] || '#575166';
  const VIEWS = [['shelves', 'E · Whole year'], ['channel', 'D · Inside a subject'], ['wall', 'F · Year on one page'], ['contents', 'G · Book contents'], ['path', 'A · One path'], ['zoom', 'B · Zoom in'], ['year', 'C · School year']];
  const INTRO = {
    channel: 'Chosen. What you see after opening a subject or a unit.',
    shelves: 'Chosen. The whole year: every subject as a shelf.',
    wall: 'The whole year on one screen, like a chart on a school wall. Best for parents.',
    contents: 'The contents page of a book, one subject at a time. Best for reading closely.',
    path: 'One line of lessons. Move left and right. Best for kids on a TV.',
    zoom: 'Open one level at a time, from subject down to lesson. Best for exploring.',
    year: 'One school year, split into terms. Best for parents planning ahead.',
  };
  const TERMS = ['Autumn', 'Spring', 'Summer'];
  const FINE = 'Year 7. Unit order follows Oak National Academy. The split into terms is our suggestion, and some titles are shortened. Colombia is our own family unit and isn’t from Oak: it suits ages 9 to 11, and follows England’s aim of studying a part of South America.';
  const count = (p) => `${p.units.length} units, ${p.units.reduce((n, u) => n + u[1], 0)} lessons`;
  const isNow = (u) => u[0] === C().here.unit;
  const unitId = (p, u) => esc(`${p.subject}|${u[0]}`);
  /* Each term gets about a third of the subject's lessons. */
  function termsOf(units) {
    const total = units.reduce((n, u) => n + u[1], 0), out = [[], [], []];
    let seen = 0;
    units.forEach((u) => { const f = seen / total; out[f < 1 / 3 ? 0 : f < 2 / 3 ? 1 : 2].push(u); seen += u[1]; });
    return out;
  }

  function shell(body) {
    const inside = M.view === 'channel';
    document.body.dataset.surface = 'tv';
    /* Families see one program: E, with D inside a subject. The older versions are reachable only from the internal page list. */
    const versions = window.Store.preview && !['shelves', 'channel'].includes(M.view) ? `<div class="mapSwitch" role="group" aria-label="Program version">${VIEWS.map(([k, t]) => `<button data-f data-mapview="${k}" aria-pressed="${M.view === k}">${t}</button>`).join('')}</div><p class="mapIntro">${INTRO[M.view]}</p>` : '';
    app.innerHTML = `<div class="mapPage">
      <div class="mapTop">${inside ? '<button class="tvBtn alt" data-f data-mapview="shelves">Whole year</button>' : '<button class="tvBtn alt" data-f data-home>Back to the channel</button>'}${window.Store.isParent() ? '' : '<button class="tvBtn alt" data-f id="openProgramDoc">Full program document</button>'}</div>${versions}${body}</div>`;
    const first = app.querySelector('[data-mapfocus]') || app.querySelector('.mapTop [data-f]');
    first?.focus({ preventScroll: true });
  }

  /* Shared pieces of the channel-style versions. */
  /* Done means this child took the lesson's test. On a shared TV, lessons before the current one count as done. */
  function lessonStates(unit) {
    const list = C().unitLessons[unit] || [], kid = window.Store.currentKid(), cur = window.currentEpisode()?.id;
    const curAt = list.findIndex((l) => l[3] === cur);
    const done = list.map((l, i) => (kid ? !!l[3] && window.Store.attemptsFor(kid.id, 'test', l[3]).length > 0 : curAt >= 0 && i < curAt));
    const now = done.findIndex((d) => !d);
    return list.map((l, i) => (done[i] ? 'done' : i === now ? 'now' : i === now + 1 ? 'next' : 'later'));
  }
  const WORD = { done: 'Done', now: 'Now', next: 'Next', later: 'Later' };
  function pathTrack(unit) {
    const list = C().unitLessons[unit]; if (!list) return '';
    const st = lessonStates(unit), allDone = st.every((x) => x === 'done');
    return `<ol class="pathTrack" aria-label="Where you are in ${esc(unit)}">${list.map(([t], i) => `<li class="${st[i]}"><small>${st[i] === 'done' ? '✓ ' : ''}${WORD[st[i]]}</small><b>${esc(t)}</b></li>`).join('')}<li class="${allDone ? 'now' : 'later'}"><small>${allDone ? 'Now' : 'Last'}</small><b>Unit exam</b></li></ol>`;
  }
  function nowBand() {
    const ep = window.currentEpisode();
    return `<button class="progNow" data-f data-mapfocus data-lessonplay="${esc(ep.id)}"><img src="assets/img/${esc(ep.hero)}" alt="" style="object-position:${ep.heroPos || '50% 20%'}">
      <span class="progNowText"><small>You are here</small><b>${esc(ep.topic)}</b><span>${esc(ep.subject || 'Science')}, ${esc(ep.unit || C().here.unit)}, ${esc(ep.lessonLabel)}</span></span><span class="tvBtn">Play</span></button>`;
  }
  function unitPoster(p, u) {
    const st = C().unitLessons[u[0]] ? lessonStates(u[0]) : null;
    const started = st && st.some((x) => x === 'done') || isNow(u), finished = st && st.every((x) => x === 'done');
    const ready = (C().unitLessons[u[0]] || []).filter((l) => l[2] === 'ready').length;
    const pill = finished ? '<span class="sPill done">✓ Done</span>' : started ? '<span class="sPill now">In progress</span>' : ready ? `<span class="sPill next">${ready} ready</span>` : '';
    return `<button class="artPoster unitPoster ${isNow(u) ? 'isNow' : ''}" data-f data-unit="${unitId(p, u)}" style="background:${p.color}">${pill}${window.unitArt(u[0])}<small>${u[1]} lessons</small><b>${esc(u[0])}</b></button>`;
  }

  /* D: inside a subject. The chosen unit on top, its lessons, then the rest of the year by term. */
  function viewChannel() {
    const p = C().program[M.subject], parts = termsOf(p.units);
    const unit = p.units.find((u) => u[0] === M.pick) || p.units.find(isNow) || p.units[0];
    const lessons = C().unitLessons[unit[0]];
    const head = isNow(unit) ? nowBand() : `<div class="subjectBand" style="background:${p.color}">${window.unitArt(unit[0])}<small>${esc(p.subject)}, unit ${p.units.indexOf(unit) + 1} of ${p.units.length}</small><b>${esc(unit[0])}</b><span>${unit[1]} lessons</span></div>`;
    const list = lessons ? `<section class="rowTV flushRow"><h2>Lessons in this unit</h2>${pathTrack(unit[0])}<div class="posterRow" style="margin-top:12px">${lessons.map(([t, , st, ep], i) => { const state = lessonStates(unit[0])[i]; const pill = `<span class="sPill ${state}">${state === 'done' ? '✓ ' : ''}${WORD[state]}</span>`; return st === 'ready' ? `<button class="photoPoster unitPoster ${state === 'now' ? 'isNow' : ''}" data-f data-lessonplay="${esc(ep)}" style="background-image:linear-gradient(0deg,#000C,#0000 60%),url(assets/img/${esc(window.EPISODES.find((e) => e.id === ep).hero)})">${pill}<small>Lesson ${i + 1}</small><b>${esc(t)}</b></button>` : `<button class="artPoster unitPoster" data-f data-soon style="background:${p.color}">${pill}${window.unitArt(t)}<small>Lesson ${i + 1}, not made yet</small><b>${esc(t)}</b></button>`; }).join('')}</div></section>`
      : `<p class="unitEmpty">The ${unit[1]} lessons in this unit will be listed here once we have Oak’s full program.</p>`;
    shell(`<div class="subjectTabs" role="group" aria-label="Subject">${C().program.map((s, i) => `<button data-f data-subj="${i}" aria-pressed="${i === M.subject}">${esc(s.subject)}</button>`).join('')}</div>${head}${list}
      ${parts.map((part, t) => (part.length ? `<section class="rowTV flushRow"><h2>${TERMS[t]} term</h2><div class="posterRow">${part.map((u) => unitPoster(p, u)).join('')}</div></section>` : '')).join('')}
      <p class="mapFine">${FINE}</p>`);
    window.mapPicked = unit[0];
  }

  /* E: every subject is a shelf. */
  function viewShelves() {
    shell(`<h1 class="programTitle">Your year</h1>${nowBand()}${pathTrack(C().here.unit)}<section class="rowTV flushRow"><h2>Ready to watch</h2><div class="posterRow">${window.readyPosters()}</div></section>${C().program.map((p, i) => `<section class="rowTV flushRow"><h2><button class="shelfTitle" data-f data-subjopen="${i}">${esc(p.subject)}</button> <small class="shelfCount">${count(p)}</small></h2><div class="posterRow">${p.units.map((u) => unitPoster(p, u)).join('')}</div></section>`).join('')}<p class="mapFine">${FINE}</p>`);
  }

  /* F: the school wall chart. Blocks are wider when a unit has more lessons. */
  function viewWall() {
    shell(`<div class="wall"><div class="wallHead"><span></span>${TERMS.map((t) => `<b>${t} term</b>`).join('')}</div>
      ${C().program.map((p) => `<div class="wallRow"><h2 style="--c:${p.color}">${esc(p.subject)}<small>${count(p)}</small></h2>${termsOf(p.units).map((part) => `<div class="wallCell">${part.map((u) => `<button class="wallChip ${isNow(u) ? 'isNow' : ''}" data-f data-unit="${unitId(p, u)}" style="flex-grow:${u[1]};background:${p.color}">${isNow(u) ? '<small>You are here</small>' : ''}${esc(u[0])}</button>`).join('')}</div>`).join('')}</div>`).join('')}</div>
      <p class="mapFine">${FINE} Wider blocks have more lessons.</p>`);
  }

  /* G: a book's contents page, on paper inside the channel. */
  function viewContents() {
    const p = C().program[M.subject];
    const line = (u) => {
      const lessons = isNow(u) ? C().unitLessons[u[0]] : null;
      return `<li class="${isNow(u) ? 'isNow' : ''}"><button data-f data-unit="${unitId(p, u)}" ${isNow(u) ? 'data-mapfocus' : ''}><span>${esc(u[0])}</span><i></i><span>${u[1]} lessons</span></button>
        ${lessons ? `<ol class="tocLessons">${lessons.map(([t, goal, st, ep]) => `<li class="${ep === window.currentEpisode().id ? 'here' : ''}"><b>${esc(t)}</b><small>${esc(goal)}</small>${st === 'ready' ? `<button class="tvBtn" data-f data-lessonplay="${esc(ep)}">Play</button>` : '<em>Not made yet</em>'}</li>`).join('')}</ol>` : ''}</li>`;
    };
    shell(`<div class="book"><nav class="bookNav" aria-label="Subject">${C().program.map((s, i) => `<button data-f data-subj="${i}" aria-current="${i === M.subject ? 'page' : 'false'}"><i style="background:${s.color}"></i>${esc(s.subject)}</button>`).join('')}</nav>
      <article class="bookPage"><p class="bookKicker">Year 7, ages 11 to 12</p><h1>${esc(p.subject)}</h1><p class="bookLead">${count(p)}</p>${termsOf(p.units).map((part, t) => (part.length ? `<section><h2>${TERMS[t]} term</h2><ol class="toc">${part.map(line).join('')}</ol></section>` : '')).join('')}</article></div>
      <p class="mapFine">${FINE}</p>`);
  }

  /* A: one path. The current stop fills the screen; everything else is a small step away. */
  function viewPath() {
    const list = C().path, p = list[M.stop];
    const status = p.ep ? 'Episode ready to watch' : p.status === 'done' ? 'Earlier stage' : 'Not built yet';
    const side = (i, dir) => {
      const s = list[i];
      return s ? `<button class="pathSide" data-f data-stop="${i}"><small>${dir}</small><b>${esc(s.title)}</b></button>` : '<div class="pathSide empty"></div>';
    };
    shell(`<div class="pathStage">${side(M.stop - 1, 'Before')}
        <article class="pathMain ${p.status}"><p class="pathLabel">${esc(p.label)} · ${esc(p.when)}</p><h1>${esc(p.title)}</h1><p class="pathNote">${esc(p.note)}</p>
        <p class="pathStatus">${status}</p>${p.ep ? `<button class="tvBtn light" data-f data-lessonplay="${esc(p.ep)}" data-mapfocus>Play episode</button>` : ''}</article>
        ${side(M.stop + 1, 'Next')}</div>
      <ol class="pathLine" aria-label="All stops">${list.map((s, i) => `<li class="${i === M.stop ? 'on' : ''} ${s.status}"><button data-f data-stop="${i}" aria-label="${esc(s.title)}"></button></li>`).join('')}</ol>
      <p class="pathCrumb">Science · Biology · The human body</p>`);
  }

  /* B: zoom in. Only one level is on screen. */
  function allUnits(strand) {
    const out = [];
    C().years.forEach((y) => y.units.forEach((u, i) => { if (u[1] === strand || (strand === 'Mixed' && !STRANDS[u[1]])) out.push({ year: y.name, age: y.age, title: u[0], lessons: u[2], n: i + 1 }); }));
    return out;
  }
  function viewZoom() {
    const z = M.zoom, h = C().here;
    const crumbs = ['Subjects', ...z];
    const crumb = `<nav class="zoomCrumb" aria-label="Where you are">${crumbs.map((c, i) => (i === crumbs.length - 1 ? `<b>${esc(c)}</b>` : `<button data-f data-zoomto="${i}">${esc(c)}</button>`)).join('<span>›</span>')}</nav>`;
    let body;
    if (z.length === 0) {
      body = `<button class="zoomContinue" data-f data-lessonplay="${esc(window.currentEpisode().id)}" data-mapfocus><small>Continue</small><b>${esc(h.lesson)}</b><span>${esc(h.unit)}</span></button>
        <div class="zoomGrid"><button class="zoomTile" data-f data-zoomin="Science" style="--c:#D42A20"><b>Science</b><small>Mapped, ages 9 to 13</small></button>
        ${C().otherSubjects.map((s) => `<div class="zoomTile off"><b>${esc(s)}</b><small>Not mapped yet</small></div>`).join('')}</div>`;
    } else if (z.length === 1) {
      body = `<div class="zoomGrid three">${['Biology', 'Chemistry', 'Physics', 'Mixed'].map((s, i) => `<button class="zoomTile" data-f ${i ? '' : 'data-mapfocus'} data-zoomin="${s}" style="--c:${color(s)}"><b>${s}</b><small>${allUnits(s).length} units</small></button>`).join('')}</div>`;
    } else if (z.length === 2) {
      const units = allUnits(z[1]);
      const years = [...new Set(units.map((u) => u.year))];
      body = years.map((y) => `<section class="zoomYear"><h2>${esc(y)} <small>${esc(units.find((u) => u.year === y).age)}</small></h2><div class="zoomList">${units.filter((u) => u.year === y).map((u) => `<button class="zoomRow ${u.title === h.unit ? 'here' : ''}" data-f ${u.title === h.unit ? 'data-mapfocus' : ''} data-zoomin="${esc(u.title)}"><b>${esc(u.title)}</b><span>${u.lessons} lessons</span></button>`).join('')}</div></section>`).join('');
    } else {
      const lessons = C().unitLessons[z[2]];
      body = lessons ? `<ol class="zoomLessons">${lessons.map(([t, goal, st, ep]) => `<li class="${st}"><span>${lessons.indexOf(lessons.find((l) => l[0] === t)) + 1}</span><div><b>${esc(t)}</b>${goal ? `<small>${esc(goal)}</small>` : ''}</div>${st === 'ready' ? `<button class="tvBtn" data-f data-mapfocus data-lessonplay="${esc(ep)}">Play</button>` : '<em>Not built yet</em>'}</li>`).join('')}</ol>`
        : '<p class="zoomEmpty">The lesson list for this unit hasn’t been added yet.</p>';
    }
    shell(crumb + body);
  }

  /* C: school year. One year, three terms, and the current week on top. */
  function viewYear() {
    const y = C().years[M.year], h = C().here, n = y.units.length;
    const cut = [Math.round(n / 3), Math.round((2 * n) / 3)];
    const terms = [['Autumn term', y.units.slice(0, cut[0]), 0], ['Spring term', y.units.slice(cut[0], cut[1]), cut[0]], ['Summer term', y.units.slice(cut[1]), cut[1]]];
    const here = y.units.some((u) => u[0] === h.unit);
    shell(`<div class="yearTabs" role="group" aria-label="School year">${C().years.map((yr, i) => `<button data-f data-year="${i}" aria-pressed="${i === M.year}" ${i === M.year ? 'data-mapfocus' : ''}>${esc(yr.name)}<small>${esc(yr.age)}</small></button>`).join('')}</div>
      ${here ? `<button class="yearNow" data-f data-lessonplay="${esc(window.currentEpisode().id)}"><small>This week</small><b>${esc(h.unit)}</b><span>${esc(h.lesson)}</span></button>` : ''}
      <div class="yearTerms">${terms.map(([t, list, start]) => `<section><h2>${t}</h2>${list.map((u, i) => `<div class="yearUnit ${u[0] === h.unit ? 'here' : ''}"><i style="background:${color(u[1])}"></i><div><b>${esc(u[0])}</b><small>${esc(u[1])} · ${u[2]} lessons · unit ${start + i + 1}</small></div></div>`).join('')}</section>`).join('')}</div>
      <p class="mapFine">Unit order follows Oak National Academy. Splitting it into terms is my suggestion.</p>`);
  }

  function draw() { ({ channel: viewChannel, shelves: viewShelves, wall: viewWall, contents: viewContents, path: viewPath, zoom: viewZoom, year: viewYear })[M.view](); window.scrollTo(0, 0); }
  window.renderMap = (view) => {
    window.setRoute(view ? `map-${view}` : 'map');
    if (VIEWS.some(([k]) => k === view)) M.view = view;
    draw();
  };
  window.resetMap = () => { M.view = 'shelves'; M.pick = null; };

  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button');
    if (!el) return;
    /* Changing view, or opening a subject or unit (also from the program document), goes through renderMap, so the address and Back follow. */
    if (el.dataset.mapview) { keep(); window.renderMap(el.dataset.mapview); }
    else if (el.dataset.subj != null) { M.subject = +el.dataset.subj; M.pick = null; draw(); }
    else if (el.dataset.subjopen != null) { M.subject = +el.dataset.subjopen; M.pick = null; window.renderMap('channel'); }
    else if (el.dataset.unit) { const [subject, unit] = el.dataset.unit.split('|'); M.subject = C().program.findIndex((p) => p.subject === subject); M.pick = unit; window.renderMap('channel'); }
    else if (el.dataset.stop != null) { M.stop = +el.dataset.stop; draw(); document.querySelector(`.pathLine li.on button`)?.focus(); }
    else if (el.dataset.zoomin) { M.zoom = [...M.zoom, el.dataset.zoomin]; draw(); }
    else if (el.dataset.zoomto != null) { M.zoom = M.zoom.slice(0, +el.dataset.zoomto); draw(); }
    else if (el.dataset.year != null) { M.year = +el.dataset.year; draw(); }
    else return;
    keep();
  });
  /* On a remote, left and right walk the path directly. */
  document.addEventListener('keydown', (ev) => {
    if (M.view !== 'path' || !document.querySelector('.pathStage') || !['ArrowLeft', 'ArrowRight'].includes(ev.key)) return;
    if (document.activeElement?.closest('.mapSwitch, .mapTop')) return;
    ev.preventDefault(); ev.stopImmediatePropagation();
    M.stop = Math.max(0, Math.min(C().path.length - 1, M.stop + (ev.key === 'ArrowRight' ? 1 : -1)));
    draw(); document.querySelector('.pathLine li.on button')?.focus();
  }, true);
})();
