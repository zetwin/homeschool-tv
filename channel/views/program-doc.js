/* The program as one formal document, which also works for navigation. Its first page is the whole year. It can be printed or saved as a PDF. */
(function () {
  const C = () => window.CURRICULUM;
  const TERMS = ['Autumn', 'Spring', 'Summer'];
  const OAK = { Science: 'science', Maths: 'maths', English: 'english', History: 'history', Geography: 'geography', Computing: 'computing', Spanish: 'spanish' };
  const oakUrl = (s) => `https://www.thenational.academy/teachers/programmes/${OAK[s]}-secondary-ks3/units?year=year-7`;
  const lessonsIn = (p) => p.units.reduce((n, u) => n + u[1], 0);
  function termsOf(units) {
    const total = units.reduce((n, u) => n + u[1], 0), out = [[], [], []];
    let seen = 0;
    units.forEach((u) => { const f = seen / total; out[f < 1 / 3 ? 0 : f < 2 / 3 ? 1 : 2].push(u); seen += u[1]; });
    return out;
  }
  const readyIn = (name) => (C().unitLessons[name] || []).filter((l) => l[2] === 'ready').length;
  const unitLink = (p, u) => {
    const ready = readyIn(u[0]), now = u[0] === C().here.unit;
    return `<button class="pUnit ${ready ? 'ready' : ''} ${now ? 'now' : ''}" data-f data-unit="${esc(`${p.subject}|${u[0]}`)}"><span>${esc(u[0])}</span><i>${u[1]}</i></button>`;
  };
  const subjectRow = (p, i) => {
    const parts = termsOf(p.units), weekly = Math.max(1, Math.round(lessonsIn(p) / window.Schedule.SCHOOL_WEEKS));
    const unitRows = p.units.map((u, n) => {
      const list = C().unitLessons[u[0]], ready = readyIn(u[0]), term = parts.findIndex((t) => t.includes(u));
      const lessons = list ? `<ol class="pLessons">${list.map(([t, goal, st, ep]) => `<li>${st === 'ready' ? `<button class="pLesson" data-f data-lesson="${esc(ep)}">${esc(t)}</button>` : `<span>${esc(t)}</span>`}${goal ? `<small>${esc(goal)}</small>` : ''}${st === 'ready' ? '<em>Ready</em>' : ''}</li>`).join('')}</ol>` : '';
      return `<tr><td>${i + 1}.${n + 1}</td><td><button class="pLesson" data-f data-unit="${esc(`${p.subject}|${u[0]}`)}">${esc(u[0])}</button>${lessons}</td><td>${TERMS[term]}</td><td>${u[1]}</td><td>${ready ? `<em>${ready} ready</em>` : u[0] === 'Colombia' ? '' : ''}</td></tr>`;
    }).join('');
    return `<section class="pSubject" id="doc-${esc(p.subject)}"><header><h2><span>${i + 1}</span>${esc(p.subject)}</h2><p>${p.units.length} units, ${lessonsIn(p)} lessons, about ${weekly} a week. ${OAK[p.subject] ? `<a href="${oakUrl(p.subject)}" target="_blank" rel="noopener">Oak’s ${esc(p.subject)} program</a>` : 'Aligned to England’s Health Education. Not an Oak subject.'}</p></header>
      <table class="pTable"><thead><tr><th scope="col">No.</th><th scope="col">Unit and lessons</th><th scope="col">Term</th><th scope="col">Lessons</th><th scope="col">Status</th></tr></thead><tbody>${unitRows}</tbody></table></section>`;
  };
  window.renderProgramDoc = () => {
    window.setRoute('program');
    const P = C().program, totals = P.reduce((n, p) => n + lessonsIn(p), 0), units = P.reduce((n, p) => n + p.units.length, 0);
    const ready = window.EPISODES.length;
    const parent = window.Store.isParent();
    const html = `<div class="docWrap"><div class="docBar">${parent ? '' : '<button data-f data-back>Back</button><button data-f id="openMap">Program with pictures</button>'}<span class="docBarGap"></span><button data-f id="docPrint">Print or save as PDF</button></div>
      <article class="doc">
        <section class="docSheet docFirst">
          <header class="docHead"><div><p>Home School TV</p><h1>Program of study</h1></div><dl><div><dt>Year</dt><dd>Year 7, ages 11 to 12</dd></div><div><dt>Follows</dt><dd>${esc(C().standard)}, with units in ${esc(C().sequence)}</dd></div><div><dt>Size</dt><dd>${P.length} subjects, ${units} units, ${totals} lessons, ${window.Schedule.SCHOOL_WEEKS} school weeks</dd></div><div><dt>Ready today</dt><dd>${ready} lessons</dd></div></dl></header>
          <div class="pMapWrap"><table class="pMap"><thead><tr><th scope="col"><span class="vh">Term</span></th>${P.map((p) => `<th scope="col" style="--c:${p.color}"><button data-f data-docgo="${esc(p.subject)}">${esc(p.subject)}</button><small>${lessonsIn(p)} lessons</small></th>`).join('')}</tr></thead>
            <tbody>${TERMS.map((t, i) => `<tr><th scope="row">${t}</th>${P.map((p) => `<td>${termsOf(p.units)[i].map((u) => unitLink(p, u)).join('')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
          <p class="docKey"><span><i class="kNow"></i>You are here</span><span><i class="kReady"></i>Has a lesson ready to watch</span><span>Numbers show how many lessons a unit has. Select any unit to open it.</span></p>
        </section>
        <section class="docSheet"><h2 class="docPart">How the year is organized</h2>
          <div class="docTwo"><div><h3>Each lesson</h3><ol class="docList"><li>A moving lesson with a voice, watched on the TV.</li><li>A test on the child’s own device, opened by QR code.</li><li>Re-tests after 1, 7 and 30 days.</li></ol></div>
          <div><h3>Each unit</h3><ol class="docList"><li>Lessons in the order shown here.</li><li>A unit exam, started by an adult.</li><li>Marks go to the diary and the gradebook.</li></ol></div></div>
          <p class="docNote">The terms are our suggestion, with about a third of each subject’s lessons in each. Some unit titles are shortened. Colombia is our own family unit and isn’t from Oak. Our family joined this year partway through: Science starts from Human skeleton and muscles, and Geography starts from Colombia. This program follows these sources. It isn’t approved or accredited by them.</p>
          <p class="docSources">${C().sources.slice(0, 3).map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</p></section>
        ${P.map((p, i) => `<div class="docSheet">${subjectRow(p, i)}</div>`).join('')}
      </article></div>`;
    if (parent) { window.cabinetPage('program', html, 'doc'); return; }
    document.body.dataset.surface = 'doc';
    app.innerHTML = html;
    window.scrollTo(0, 0);
    app.querySelector('.docBar [data-f]')?.focus({ preventScroll: true });
  };
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('button'); if (!el) return;
    if (el.id === 'openProgramDoc') window.renderProgramDoc();
    else if (el.id === 'docPrint') window.print();
    else if (el.dataset.docgo) document.getElementById(`doc-${el.dataset.docgo}`)?.scrollIntoView({ behavior: 'smooth' });
  });
})();
