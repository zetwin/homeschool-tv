/* School time. Turns the program and the family's timetable into dated classes, so lessons follow the week like a real school.
   Rules and cases are in docs/product/SCHEDULE-AND-DIARY.md. */
(function () {
  const C = () => window.CURRICULUM, S = () => window.Store;
  const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'];
  const DAY_NAMES = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday' };
  const DAY_MS = 86400000, RETESTS = [1, 7, 30];
  /* Subjects with no lessons of ours yet. They stay on the timetable as the child's own activity. */
  const ACTIVITIES = {
    PE: ['Move: sport, swimming or a long walk', '#C2410C'],
    Art: ['Draw, paint or make something', '#BE185D'],
    Music: ['Play, sing or listen closely', '#4338CA'],
    Technology: ['Build, repair or cook something', '#475569'],
    Reading: ['Read your own book', '#3F6212'],
    'Family project': ['Your family’s choice this week', '#0E7490'],
  };
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const monday = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const todayIso = () => iso(new Date());
  const school = () => S().data.school;
  const timetableFor = (kid) => (kid && school().kidTimetable?.[kid.id]) || school().timetable;
  const subjectOf = (name) => C().program.find((p) => p.subject === name);
  const colorOf = (name) => subjectOf(name)?.color || ACTIVITIES[name]?.[1] || '#475569';
  const offReason = (date) => {
    const single = school().off.find((o) => o.date === date);
    if (single) return single.reason || 'No school';
    return school().breaks.find((b) => date >= b.from && date <= b.to)?.name || null;
  };
  /* A subject's lessons in teaching order, starting where this family starts. Every unit ends with its exam. */
  function sequence(name) {
    const p = subjectOf(name); if (!p) return [];
    /* Bonus units are in the program, but never fill a class on the timetable. */
    const units = p.units.filter((u) => !u[2]?.bonus), at = Math.max(0, units.findIndex((u) => u[0] === school().startUnit?.[name]));
    return [...units.slice(at), ...units.slice(0, at)].flatMap(([unit, count]) => {
      const named = C().unitLessons[unit] || [];
      const lessons = Array.from({ length: count }, (_, i) => {
        const [title, goal, status, ep] = named[i] || [];
        return { kind: 'lesson', subject: name, unit, i: i + 1, of: count, title: title || `${unit}, lesson ${i + 1}`, goal: goal || '', ep: status === 'ready' ? ep : null };
      });
      return [...lessons, { kind: 'exam', subject: name, unit, title: `${unit}: unit exam`, ready: unit === C().here.unit }];
    });
  }
  /* Walks school days from the start date. Days off are skipped, so classes simply move to the next day. */
  function plan(kid, until) {
    const table = timetableFor(kid), used = {}, out = {}, seq = {};
    for (let d = monday(parse(school().start)); iso(d) <= until; d = addDays(d, 1)) {
      const date = iso(d), key = DAYS[(d.getDay() + 6) % 7];
      if (!key || date < school().start || offReason(date)) continue;
      out[date] = (table[key] || []).map((subject, n) => {
        if (!subject) return null;
        if (!subjectOf(subject)) return { kind: 'activity', subject, unit: '', title: ACTIVITIES[subject]?.[0] || 'Your own activity', n: n + 1 };
        seq[subject] ??= sequence(subject);
        const entry = seq[subject][used[subject] = (used[subject] ?? -1) + 1] || { kind: 'free', subject, unit: '', title: 'Review what you’ve learned' };
        return { ...entry, n: n + 1 };
      });
    }
    return out;
  }
  /* School-day clock, with a short break, a long break and lunch. */
  function periodTime(n) {
    const { dayStart = '09:00', lessonMin = 45 } = school();
    const [h, m] = dayStart.split(':').map(Number), gaps = [10, 20, 10, 50, 10];
    let t = h * 60 + m;
    for (let i = 1; i < n; i++) t += lessonMin + gaps[i - 1];
    return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
  }
  const mark12 = (score, total) => Math.max(1, Math.round((score / (total || 1)) * 12));
  const showMark = (score, total) => (school().scale === 'percent' ? `${Math.round((score / (total || 1)) * 100)}%` : String(mark12(score, total)));
  const logFor = (kid, date, n) => (kid && school().log?.[kid.id]?.[`${date}-${n}`]) || {};
  const shortDate = (d) => parse(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  function nextClassOf(table, entry, date) {
    for (const [d, list] of Object.entries(table).sort()) if (d > date && list.some((x) => x?.subject === entry.subject)) return d;
    return null;
  }
  /* What a class looks like for this child today: state, homework and mark. */
  function detail(kid, entry, date, table) {
    const today = todayIso(), log = logFor(kid, date, entry.n), out = { ...entry, date, time: periodTime(entry.n), color: colorOf(entry.subject), log, state: 'none', mark: log.mark ? String(log.mark) : '', hw: log.hw || '' };
    if (entry.kind === 'activity') { out.state = log.done ? 'done' : date < today ? 'past' : date === today ? 'now' : 'later'; return out; }
    if (entry.kind === 'exam') {
      out.state = entry.ready ? (date === today ? 'now' : date < today ? 'catch' : 'ready') : 'missing';
      const taken = kid && entry.ready && S().examsFor(kid.id).at(-1);
      if (taken) { const t = window.examTotals?.(taken); out.state = 'done'; if (t?.total) out.mark = showMark(t.got, t.total); }
      return out;
    }
    if (!entry.ep) { out.state = log.done ? 'done' : 'missing'; return out; }
    const tests = kid ? S().attemptsFor(kid.id, 'test', entry.ep) : [];
    if (tests.length) {
      out.state = 'done';
      const best = tests.reduce((a, b) => (b.score / b.total > a.score / a.total ? b : a));
      out.mark ||= showMark(best.score, best.total);
      const done = S().attemptsFor(kid.id, 'retest', entry.ep).length, nextDay = RETESTS[done];
      if (nextDay != null && !log.hw) { const due = iso(new Date(new Date(tests[0].at).getTime() + nextDay * DAY_MS)); out.hw = `Re-test by ${shortDate(due)}`; out.hwDo = 'retest'; }
    } else {
      out.state = date < today ? 'catch' : date === today ? 'now' : 'ready';
      /* The test comes after the lesson. It's due by the next class in this subject, counted from the class or the watching, whichever is later. */
      const seen = kid && S().watchedAt(kid.id, entry.ep);
      if (seen) {
        const on = iso(new Date(seen)), due = nextClassOf(table, entry, on > date ? on : date);
        out.late = !!due && due < today;
        if (!log.hw) { out.hw = due ? `Lesson test by ${shortDate(due)}` : 'Lesson test'; out.hwDo = 'test'; }
      } else if (date <= today && !log.hw) { out.hw = date < today ? 'Catch up: watch it' : 'Watch today'; out.hwDo = 'watch'; }
    }
    return out;
  }
  function week(kid, mondayDate) {
    const days = DAYS.map((key, i) => ({ key, name: DAY_NAMES[key], date: iso(addDays(mondayDate, i)) }));
    /* Plans one extra week so "due by" dates can look ahead. */
    const table = plan(kid, iso(addDays(mondayDate, 13)));
    return days.map((d) => {
      const off = d.date < school().start ? 'Before the school start date' : offReason(d.date);
      return { ...d, off, periods: off ? [] : (table[d.date] || []).map((e) => (e ? detail(kid, e, d.date, table) : null)).filter(Boolean) };
    });
  }
  const schoolDay = (from) => { let d = from; for (let i = 0; i < 40; i++, d = addDays(d, 1)) { const day = (d.getDay() + 6) % 7; if (day < 5 && !offReason(iso(d)) && iso(d) >= school().start) return d; } return from; };
  function dayOf(kid, date) { const d = parse(date); return week(kid, monday(d))[(d.getDay() + 6) % 7]; }
  /* The lesson this child should do next: today's first one without a test, then the oldest one still open. A shared TV shows the latest one due. */
  function nextLesson(kid) {
    const now = todayIso(), table = plan(kid, now), due = [];
    Object.keys(table).sort().forEach((date) => table[date].forEach((e) => { if (e?.ep) due.push({ ep: e.ep, date }); }));
    if (!due.length) return null;
    if (!kid) return due.at(-1).ep;
    const open = due.filter((x) => !S().attemptsFor(kid.id, 'test', x.ep).length);
    return (open.find((x) => x.date === now) || open[0])?.ep || null;
  }
  /* How many lessons a week each subject needs to finish the program in a 39-week school year. */
  const SCHOOL_WEEKS = 39;
  const needed = () => C().program.map((p) => { const total = p.units.filter((u) => !u[2]?.bonus).reduce((n, u) => n + u[1], 0); return { subject: p.subject, total, perWeek: total / SCHOOL_WEEKS }; });
  window.Schedule = { showMark, DAYS, DAY_NAMES, ACTIVITIES, SCHOOL_WEEKS, iso, parse, addDays, monday, todayIso, week, dayOf, schoolDay, nextLesson, needed, colorOf, timetableFor, periodTime, offReason, shortDate, sequence };
})();
