/* Child-screen looks. Each has its own structure, section names and way of moving around, with the same example day.
   Every look fills one screen, at iPad and phone size. Samples only: example child, no real data. */
(function () {
  const PH = (n) => `../assets/img/${n}.jpg`;
  const ART = (n, phone) => `art/${n}-${phone ? 'phone' : 'pad'}.jpg`;
  const OB = (n) => `art/icon-${n}.png`;
  const FOX = 'icons/fox.png';
  const LESSON = { sub: 'Geography', title: 'Why Is It Cold Near the Equator?', time: '09:55', img: 'colombia-peak' };
  /* time, subject, what, color, object, photo, state */
  const DAY = [
    ['09:00', 'Science', 'How muscles work', '#0F9D8A', 'flask', 'muscle-stronger', 'done'],
    ['09:55', 'Geography', 'Why is it cold near the Equator?', '#65A30D', 'mountain', 'colombia-peak', 'now'],
    ['11:00', 'Technology', 'Build, repair or cook', '#F59E0B', 'tools', 'colombia-ajiaco', ''],
    ['11:55', 'Reading', 'Read your own book', '#A855F7', 'books', 'spanish-casa', ''],
    ['13:30', 'Family project', 'Your family’s choice', '#EC4899', 'tent', 'colombia-market', ''],
  ];
  const TODO = [
    ['Re-test: The Skeleton', '3 min', 'test', 'Four questions, with your mistakes first.', 'skeleton'],
    ['Test: Muscles', '10 min', 'run', 'You watched this at 09:00 today.', 'muscle-cover'],
    ['Re-test: Colombia’s regions', '3 min', 'test', 'Four questions from Tuesday.', 'colombia-cover'],
    ['Find your pulse', '5 min', 'scroll', 'Count your heartbeat, then do 20 star jumps and count again.', 'muscle-cardiac'],
  ];
  const MARKS = [['The Skeleton', 9, '#0F9D8A'], ['Muscles', 11, '#F59E0B'], ['Colombia’s regions', 10, '#3B82F6']];
  const WEEK = [['Mon', 5, 5], ['Tue', 5, 5], ['Wed', 3, 5], ['Thu', 0, 5], ['Fri', 1, 5]];
  const STATE = (s) => (s === 'done' ? 'Done' : s === 'now' ? 'Now' : 'Later');

  /* ---- 1. My Room: no menu at all. Things in the room are the sections. ---- */
  const ROOM_PINS = { pad: { desk: [.604, .361], shelf: [.815, .314], board: [.246, .284], wall: [.657, .172], diary: [.471, .7] }, phone: { desk: [.599, .433], shelf: [.821, .424], board: [.208, .412], wall: [.656, .367], diary: [.455, .558] } };
  const ROOM_NAMES = { shelf: 'Shelf', board: 'Noticeboard', wall: 'Wall of marks', diary: 'Diary' };
  function room(sec, phone) {
    const pins = ROOM_PINS[phone ? 'phone' : 'pad'];
    const pin = (k, label, extra = '') => `<button class="rPin rPin-${k}" data-sec="${sec === k ? '' : k}" style="left:${pins[k][0] * 100}%;top:${pins[k][1] * 100}%"><span>${label}${extra}</span></button>`;
    const body = {
      shelf: () => `<ul class="rBooks">${[['Why Don’t You Collapse?', 'skeleton', 'Science', '✓ Test done'], ['How Do Your Muscles Work?', 'muscle-cover', 'Science', 'Test to do'], ['Colombia: One Country, Six Regions', 'colombia-cover', 'Geography', '✓ Test done'], ['Why Is It Cold Near the Equator?', 'colombia-peak', 'Geography', 'Watch today']].map(([t, p, s, st]) => `<li><img src="${PH(p)}" alt=""><span><b>${t}</b><small>${s}. ${st}</small></span></li>`).join('')}</ul>`,
      board: () => `<ul class="rNotes">${TODO.map(([t, m], i) => `<li style="--n:${['#FFE96B', '#FFFDF4', '#FFB8C6', '#BFEFA5'][i]};--a:${[-1.5, 1, 1.4, -.8][i]}deg"><i></i><b>${t}</b><small>${m}</small></li>`).join('')}</ul>`,
      wall: () => `<ul class="rFrames">${MARKS.map(([t, m, c]) => `<li><b style="color:${c}">${m}</b><small>${t}</small></li>`).join('')}</ul>`,
      diary: () => `<ol class="rDiary">${DAY.map(([h, s, t, , , , st]) => `<li class="${st}"><time>${st === 'done' ? '✓' : h}</time><span><b>${s}</b><small>${t}</small></span></li>`).join('')}</ol>`,
    };
    return `<div class="h"><img class="bg" src="${ART('room', phone)}" alt="A cut-away study room with a desk, a shelf, a noticeboard and framed marks">
      <div class="rMe"><img src="${FOX}" alt=""><b>Mia’s room</b><small>Friday, 6 November</small></div>
      ${pin('board', 'Noticeboard', ' <em>4</em>')}${pin('shelf', 'Shelf')}${pin('wall', 'Wall of marks')}${pin('diary', 'Diary')}
      <div class="rToday"><i class="rDot" style="left:${pins.desk[0] * 100}%;top:${pins.desk[1] * 100}%"></i><section><small>On your desk, ${LESSON.time}: ${LESSON.sub}</small><h2>${LESSON.title}</h2><button class="go">Start the lesson</button></section></div>
      ${sec ? `<aside class="rSheet"><header><h3>${ROOM_NAMES[sec]}</h3><button data-sec="" aria-label="Close">✕</button></header>${body[sec]()}</aside>` : ''}</div>`;
  }

  /* ---- 2. Island: each subject is a place. ---- */
  const ISLE = { pad: { science: [.706, .329], geography: [.452, .21], technology: [.674, .198], reading: [.307, .376], family: [.541, .497] }, phone: { science: [.757, .427], geography: [.439, .383], technology: [.725, .383], reading: [.263, .441], family: [.55, .486] } };
  const ISLE_KEY = ['science', 'geography', 'technology', 'reading', 'family'];
  function island(sec, phone) {
    const p = ISLE[phone ? 'phone' : 'pad'];
    const pins = DAY.map(([h, s, , c, , , st], i) => { const k = ISLE_KEY[i]; return `<button class="iPin ${st}" style="left:${p[k][0] * 100}%;top:${p[k][1] * 100}%;--c:${c}"><b>${st === 'done' ? '✓' : i + 1}</b><span>${s}<small>${h}</small></span></button>`; }).join('');
    const panel = {
      route: `<section class="iNext"><img src="${PH(LESSON.img)}" alt=""><div><small>Next stop, ${LESSON.time}: ${LESSON.sub}</small><h2>${LESSON.title}</h2><button class="go">Start the lesson</button></div></section>`,
      backpack: `<section class="iCard"><h3>In my backpack</h3><ul>${TODO.map(([t, m, o]) => `<li><img src="${OB(o)}" alt=""><b>${t}</b><small>${m}</small></li>`).join('')}</ul></section>`,
      logbook: `<section class="iCard"><h3>My logbook</h3><ul>${MARKS.map(([t, m]) => `<li class="mk"><em>${m}</em><b>${t}</b><small>out of 12</small></li>`).join('')}</ul></section>`,
    };
    return `<div class="h"><img class="bg" src="${ART('island', phone)}" alt="A floating island with a mountain, a lab, a workshop, a library and a camp, joined by a path">
      <header class="iTop"><img src="${FOX}" alt=""><b>Mia’s island</b><nav>${[['route', 'Today’s route'], ['backpack', 'Backpack'], ['logbook', 'Logbook']].map(([k, t]) => `<button data-sec="${k}" class="${sec === k ? 'on' : ''}">${t}</button>`).join('')}</nav></header>${pins}${panel[sec]}</div>`;
  }

  /* ---- 4. Now Playing: a music app, where lessons are the tracks. ---- */
  function now(sec, phone) {
    const track = ([h, s, t, c, o, p, st]) => `<li class="${st}"><span class="art" style="--c:${c}"><img src="${OB(o)}" alt=""></span><span class="tt"><b>${t}</b><small>${s}, ${h}</small></span><i>${st === 'done' ? '✓' : st === 'now' ? '▶' : ''}</i></li>`;
    const main = {
      now: `<section class="nNow"><img class="cover" src="${PH(LESSON.img)}" alt="A snowy peak on the Equator"><div class="nInfo"><small>Now playing · ${LESSON.sub}</small><h2>${LESSON.title}</h2><div class="nTime"><span>Class from ${LESSON.time} to 10:40</span></div><div class="nCtl"><button aria-label="Warm up first">Warm up</button><button class="play" aria-label="Play the lesson"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button><button aria-label="Take the test later">Test</button></div></div></section>`,
      next: `<section class="nList"><h2>Up next</h2><ul>${DAY.map(track).join('')}</ul></section>`,
      library: `<section class="nLib"><h2>Library</h2><div>${[['Why Don’t You Collapse?', 'skeleton'], ['How Do Your Muscles Work?', 'muscle-cover'], ['Colombia: Six Regions', 'colombia-cover'], ['Why Is It Cold?', 'colombia-peak'], ['¡Hola! First Words', 'spanish-cover']].map(([t, p]) => `<button><img src="${PH(p)}" alt=""><b>${t}</b></button>`).join('')}</div></section>`,
      scores: `<section class="nList"><h2>Scores</h2><ol class="nChart">${MARKS.map(([t, m], i) => `<li><span>${i + 1}</span><b>${t}</b><em>${m}<small> / 12</small></em></li>`).join('')}</ol><p class="nTodo">To do: ${TODO.length} tests and tasks</p></section>`,
    };
    const side = !phone && sec === 'now' ? `<section class="nList side"><h2>Today</h2><ul>${DAY.map(track).join('')}</ul></section>` : '';
    return `<div class="h"><img class="glowBg" src="${PH(LESSON.img)}" alt=""><header class="nTop"><img src="${FOX}" alt=""><b>Mia</b><span>Friday</span></header><div class="nBody ${side ? 'two' : ''}">${main[sec]}${side}</div>
      <nav class="nTabs">${[['now', 'Now'], ['next', 'Up next'], ['library', 'Library'], ['scores', 'Scores']].map(([k, t]) => `<button data-sec="${k}" class="${sec === k ? 'on' : ''}">${t}</button>`).join('')}</nav></div>`;
  }

  /* ---- 6. Day Dial: a big clock, with one thing in each corner. ---- */
  const arc = (a, b, r) => { const p = (d) => [200 + r * Math.cos(((d - 90) * Math.PI) / 180), 200 + r * Math.sin(((d - 90) * Math.PI) / 180)]; const [x1, y1] = p(a), [x2, y2] = p(b); return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 ${b - a > 180 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`; };
  function dial(sec) {
    const SEG = 360 / 5;
    const rings = {
      now: () => DAY.map(([, , , c, , , st], i) => `<path d="${arc(i * SEG + 3, (i + 1) * SEG - 3, 170)}" stroke="${c}" stroke-width="${st === 'now' ? 36 : 22}" opacity="${st === 'done' ? .6 : 1}"/><text x="${200 + 132 * Math.cos(((i + .5) * SEG - 90) * Math.PI / 180)}" y="${204 + 132 * Math.sin(((i + .5) * SEG - 90) * Math.PI / 180)}" text-anchor="middle" fill="#fff" stroke="none" font-size="13" font-weight="700">${DAY[i][1].split(' ')[0]}</text>`).join(''),
      later: () => DAY.map(([, , , c, , , st], i) => `<path d="${arc(i * SEG + 3, (i + 1) * SEG - 3, 170)}" stroke="${c}" stroke-width="${st ? 14 : 36}" opacity="${st ? .35 : 1}"/>`).join(''),
      week: () => WEEK.map(([, d, n], i) => `<path d="${arc(i * SEG + 3, (i + 1) * SEG - 3, 170)}" stroke="#2C2C34" stroke-width="28"/>${d ? `<path d="${arc(i * SEG + 3, i * SEG + 3 + (SEG - 6) * (d / n), 170)}" stroke="#7CFFB2" stroke-width="28"/>` : ''}`).join(''),
      marks: () => MARKS.map(([, m, c], i) => { const r = 170 - i * 34; return `<circle cx="200" cy="200" r="${r}" stroke="#2C2C34" stroke-width="24"/><path d="${arc(0, 359.9 * (m / 12), r)}" stroke="${c}" stroke-width="24"/>`; }).join(''),
    };
    const middle = {
      now: `<small>Now · ${LESSON.sub}</small><b class="big">${LESSON.time}</b><p>${LESSON.title}</p><button class="go">Start</button>`,
      later: '<small>Later today</small><b class="big">3</b><p>more classes, until 14:15</p>',
      week: '<small>This week</small><b class="big">14<i>/25</i></b><p>classes done</p>',
      marks: '<small>Best mark</small><b class="big">11</b><p>Muscles</p>',
    };
    const detail = {
      now: `<h3>To do</h3><ul>${TODO.map(([t, m]) => `<li><b>${t}</b><small>${m}</small></li>`).join('')}</ul>`,
      later: `<h3>Later today</h3><ul>${DAY.filter((d) => !d[6]).map(([h, s, t, c]) => `<li style="--c:${c}" class="col"><b>${h} ${s}</b><small>${t}</small></li>`).join('')}</ul>`,
      week: `<h3>Each day</h3><ul>${WEEK.map(([d, n, of]) => `<li><b>${d}</b><small>${n} of ${of}</small></li>`).join('')}</ul>`,
      marks: `<h3>My marks</h3><ul>${MARKS.map(([t, m, c]) => `<li style="--c:${c}" class="col"><b>${t}</b><small>${m} out of 12</small></li>`).join('')}</ul>`,
    };
    const corner = (k, label, v, cls) => `<button class="cc ${cls} ${sec === k ? 'on' : ''}" data-sec="${k}"><small>${label}</small><b>${v}</b></button>`;
    return `<div class="h"><header class="dTop"><img src="${FOX}" alt=""><b>Mia</b><span>Friday 6</span></header>
      <div class="dRing"><svg viewBox="0 0 400 400" fill="none" stroke-linecap="round" aria-hidden="true">${rings[sec]()}</svg><div class="dMid">${middle[sec]}</div></div>
      <aside class="dSide">${detail[sec]}</aside>
      <nav class="dCorners">${corner('now', 'Now', LESSON.sub, 'a')}${corner('later', 'Later', '3 classes', 'b')}${corner('week', 'Week', '14 of 25 done', 'c')}${corner('marks', 'Marks', 'Best mark 11', 'd')}</nav></div>`;
  }

  /* ---- 7. Stories: one full screen at a time. Tap the sides or swipe. ---- */
  const STORIES = [
    ['Now', () => `<img class="ph" src="${PH('colombia-peak')}" alt="A snowy peak on the Equator"><div class="sTxt"><small>Now · ${LESSON.time} · ${LESSON.sub}</small><h2>Why is it cold near the Equator?</h2><button class="go">Watch</button></div>`],
    ['Next', () => `<div class="sFlat next" style="background:#F59E0B"><img src="${OB('tools')}" alt=""></div><div class="sTxt"><small>Next · 11:00 · Technology</small><h2>Build, repair or cook something</h2><p>Your own project. Tick it when it’s done.</p></div>`],
    ['To do', () => `<div class="sFlat" style="background:#FFC400"><small>To do</small><h2>4 things</h2><ul>${TODO.map(([t, m]) => `<li><b>${t}</b><span>${m}</span></li>`).join('')}</ul></div>`],
    ['Marks', () => `<div class="sFlat" style="background:#17131F;color:#fff"><small>Your best mark this week, out of 12</small><b class="huge">11</b><h2>Muscles test</h2><ul>${MARKS.map(([t, m]) => `<li><b>${t}</b><span>${m} / 12</span></li>`).join('')}</ul></div>`],
  ];
  function stories(sec, phone) {
    const i = +sec, go = (d) => (i + d + STORIES.length) % STORIES.length;
    const seg = STORIES.map((_, k) => `<i class="${k < i ? 'full' : k === i ? 'now' : ''}"></i>`).join('');
    const card = (k, cls) => `<article class="sCard ${cls}">${STORIES[k][1]()}${cls === 'cur' ? `<div class="sSeg">${seg}</div><header class="sMe"><img src="${FOX}" alt=""><b>Mia</b><span>${STORIES[k][0]}</span></header><button class="sTap l" data-sec="${go(-1)}" aria-label="Previous"></button><button class="sTap r" data-sec="${go(1)}" aria-label="Next"></button>` : ''}</article>`;
    return `<div class="h" data-swipe="${go(-1)},${go(1)}">${phone ? '' : card(go(-1), 'side l')}${card(i, 'cur')}${phone ? '' : card(go(1), 'side r')}
      <nav class="sNames">${STORIES.map(([t], k) => `<button data-sec="${k}" class="${k === i ? 'on' : ''}">${t}</button>`).join('')}</nav></div>`;
  }

  /* ---- 8. Backpack: a grid of slots, with the chosen item explained beside it. ---- */
  const ITEMS = [
    ...DAY.map(([h, s, t, c, o, , st]) => ({ o, n: s, t, line: `Today at ${h}`, b: st === 'done' ? 'You finished this class.' : st === 'now' ? 'This is your class right now. A warm-up, then the lesson, then the test.' : 'Later today.', a: st === 'done' ? 'Done' : st === 'now' ? 'Start' : 'Open', st })),
    ...TODO.map(([t, m, o, b]) => ({ o, n: t.replace(/^(Re-test|Test): /, ''), t, line: `To do, ${m}`, b, a: 'Start', st: 'todo' })),
  ];
  function pack(sec, phone) {
    const [tab, pick = '1'] = String(sec).split(':'), it = ITEMS[+pick] || ITEMS[1];
    const grid = `<div class="pGrid">${Array.from({ length: phone ? 12 : 15 }, (_, i) => { const x = ITEMS[i]; return x ? `<button class="slot ${+pick === i ? 'on' : ''} ${x.st}" data-sec="items:${i}"><img src="${OB(x.o)}" alt=""><span>${x.n}</span></button>` : '<div class="slot empty"></div>'; }).join('')}</div>`;
    const detail = `<aside class="pInfo"><img src="${OB(it.o)}" alt=""><div><small>${it.line}</small><h2>${it.t}</h2><p>${it.b}</p><button class="go">${it.a}</button></div></aside>`;
    const main = {
      items: grid + detail,
      quests: `<ul class="pQuests">${TODO.map(([t, m, o, b], i) => `<li><img src="${OB(o)}" alt=""><span><b>${t}</b><small>${b}</small></span><em>${m}</em></li>`).join('')}</ul>`,
      journal: `<div class="pPage"><h2>Friday, 6 November</h2><ol>${DAY.map(([h, s, t, , , , st]) => `<li class="${st}"><time>${st === 'done' ? '✓' : h}</time><b>${s}</b><span>${t}</span></li>`).join('')}</ol></div>`,
      stats: `<ul class="pStats">${MARKS.map(([t, m, c]) => `<li><b>${t}</b><i><u style="width:${(m / 12) * 100}%;background:${c}"></u></i><em>${m}</em></li>`).join('')}<li class="wk"><b>Classes this week</b><i><u style="width:56%;background:#7CFFB2"></u></i><em>14/25</em></li></ul>`,
    };
    return `<div class="h"><img class="bg" src="art/leather.jpg" alt=""><header class="pTop"><img src="${OB('backpack')}" alt=""><b>Mia’s backpack</b></header>
      <nav class="pTabs">${[['items', 'Items'], ['quests', 'Quests'], ['journal', 'Journal'], ['stats', 'Stats']].map(([k, t]) => `<button data-sec="${k}" class="${tab === k ? 'on' : ''}">${t}</button>`).join('')}</nav><main class="pMain p-${tab}">${main[tab]}</main></div>`;
  }

  const row = (layout, type, sep, words, good, risk) => ({ Layout: layout, 'Type and color': type, 'Parts and separation': sep, Wording: words, 'Good for': good, Risk: risk });
  window.LOOKS = {
    K: { name: 'My Room', first: '', draw: room, sum: 'A real-looking room. There’s no menu: you tap the things in it.', rows: row('A cut-away 3D room fills the screen. The desk is today’s lesson.', 'Warm, rounded type on a teal room and orange backdrop.', 'No tiles. Objects and labels, with a page that slides in.', 'Desk, Shelf, Noticeboard, Wall of marks, Diary.', 'A place that feels like your own, and it could change as the child grows.', 'Finding things depends on the labels. It needs a real artist before launch.') },
    L: { name: 'Island', first: 'route', draw: island, sum: 'Your day is a walk across an island. Each subject is a place.', rows: row('A floating 3D island, with pins on today’s five places.', 'Bold rounded type on bright sky blue.', 'The land separates things. One card sits at the bottom.', 'Today’s route, Backpack, Logbook, “Next stop”.', 'Order and progress at a glance, and the most adventurous.', 'Can feel young at 12. A new subject needs new 3D art.') },
    N: { name: 'Now Playing', first: 'now', draw: now, sum: 'Works like a music app. Lessons are tracks, and today is the queue.', rows: row('A big lesson cover and a play button, with the day as a queue beside it.', 'Clean, heavy type on color taken from the lesson’s photo.', 'Rows and covers, with a tab bar.', 'Now, Up next, Library, Scores.', 'Instantly familiar. Very easy to add lessons, and the cover colors change daily.', 'Needs a strong picture for every lesson, and it’s closest to an ordinary app.') },
    P: { name: 'Day Dial', first: 'now', draw: dial, sum: 'A big clock in the middle, with one thing in each corner.', rows: row('A ring of today’s classes. Four corners change what it shows.', 'Huge numbers on pure black, with vivid arcs.', 'No cards around the ring. Rings and space separate things.', 'Now, Later, Week, Marks.', 'Seeing time and progress in one look. Very simple.', 'Less space for words, and a ring is harder to read than a list.') },
    Q: { name: 'Stories', first: '0', draw: stories, sum: 'One full screen at a time. Tap or swipe to the next, like a phone story.', rows: row('A tall full-picture card, with the next ones peeking at the sides.', 'Tall poster letters over photos and strong color.', 'Each screen is one idea, and bars at the top show where you are.', 'Now, Next, To do, Marks. Short and punchy.', 'Children who use phones a lot. The fastest to understand.', 'You see one thing at a time, so there’s no whole-day view.') },
    R: { name: 'Backpack', first: 'items:1', draw: pack, sum: 'A game’s item screen. Everything for today is an object in a slot.', rows: row('A grid of slots, and the chosen item explained beside it.', 'Chunky rounded type on real leather.', 'Sunken slots with stitched edges.', 'Items, Quests, Journal, Stats.', 'Children who love games, and it’s easy to scan.', 'Words like Quests can feel silly for school. No points or levels, on purpose.') },
  };

  /* Swiping left or right moves between stories. */
  let startX = null;
  document.addEventListener('pointerdown', (e) => { if (e.target.closest('[data-swipe]')) startX = e.clientX; });
  document.addEventListener('pointerup', (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX, box = e.target.closest('[data-swipe]'); startX = null;
    if (!box || Math.abs(dx) < 50) return;
    const [back, on] = box.dataset.swipe.split(','), b = document.createElement('button'); b.dataset.sec = dx > 0 ? back : on; b.hidden = true; box.append(b); b.click();
  });
})();
