/* Example morning for the Children page lab. Wednesday 11 November at 11:40. Nothing here is real family data.
   Each child's day, class by class: its time, subject, state (done, now, missed, later), the lesson watched and
   the test score. Classes with no lesson made are left out, so they never show as noise. */
(function () {
  const NOW = '11:40';
  const LESSON = { Maths: 'Place value', Science: 'How muscles work', English: 'Step into the unknown', Music: 'Play, sing or listen' };
  const C = (time, subject, state, watched, got, of) => ({ time, subject, lesson: LESSON[subject], state, watched, test: got == null ? null : [got, of] });
  const KIDS = [
    { id: 'k1', name: 'Kid 1', face: 'owl', classes: [C('09:00', 'Maths', 'done', '09:05', 11, 12), C('09:55', 'Science', 'done', '09:58', 9, 10), C('11:00', 'English', 'done', '11:02'), C('13:30', 'Music', 'later')], tests: [], catchup: [] },
    { id: 'k2', name: 'Kid 2', face: 'fox', classes: [C('09:00', 'Maths', 'done', '09:10', 9, 12), C('09:55', 'Science', 'done', '10:05', 7, 10), C('11:00', 'English', 'now'), C('13:30', 'Music', 'later')], tests: [], catchup: ['Spanish: ¡Hola!, from Monday'] },
    { id: 'k3', name: 'Kid 3', face: 'panda', classes: [C('09:00', 'Maths', 'missed'), C('09:55', 'Science', 'missed'), C('11:00', 'English', 'now'), C('13:30', 'Music', 'later')], tests: ['Colombia test', 'Spanish test'], catchup: ['Colombia, from Tuesday'] },
    { id: 'k4', name: 'Kid 4', face: 'bear', classes: [C('09:00', 'Maths', 'done', '09:02', 5, 12), C('09:55', 'Science', 'done', '10:00'), C('11:00', 'English', 'now'), C('13:30', 'Music', 'later')], tests: ['Muscles test'], catchup: [] },
    { id: 'k5', name: 'Kid 5', face: 'frog', classes: [C('09:00', 'Maths', 'done', '09:00', 12, 12), C('09:55', 'Science', 'done', '09:56', 10, 10), C('11:00', 'English', 'done', '11:01'), C('13:30', 'Music', 'later')], tests: [], catchup: [] },
    { id: 'k6', name: 'Kid 6', face: 'rabbit_face', classes: [C('09:00', 'Maths', 'done', '09:12', 10, 12), C('09:55', 'Science', 'done', '10:10'), C('11:00', 'English', 'now'), C('13:30', 'Music', 'later')], tests: ['Muscles test'], catchup: [] },
  ];
  /* The four answers, worked out once, so every option says the same thing in the same words. */
  const grade = (got, of) => (got / of >= .85 ? 'good' : got / of >= .65 ? 'ok' : 'bad');
  const answers = (k) => {
    const done = k.classes.filter((c) => c.state === 'done').length, total = k.classes.length, missed = k.classes.filter((c) => c.state === 'missed').map((c) => c.subject);
    const tests = k.classes.filter((c) => c.test), got = tests.reduce((a, c) => a + c.test[0], 0), of = tests.reduce((a, c) => a + c.test[1], 0);
    const p = of ? Math.round((100 * got) / of) : null;
    const status = !k.classes.some((c) => c.watched) ? 'Not started' : k.classes.every((c) => c.state === 'done') ? 'Finished' : k.classes.some((c) => c.state === 'now') ? 'Working' : 'Done for now';
    const how = p === null ? { word: 'No tests yet', tone: 'none' } : { word: { good: 'Great', ok: 'Good', bad: 'Needs help' }[grade(got, of)], tone: grade(got, of) };
    how.detail = p === null ? '' : `${tests.length} ${tests.length === 1 ? 'test' : 'tests'}, ${p}% right`;
    const needs = [];
    if (missed.length) needs.push(`Missed ${missed.join(' and ')}`);
    tests.filter((c) => grade(...c.test) === 'bad').forEach((c) => needs.push(`${c.subject} test: ${c.test[0]} of ${c.test[1]}`));
    const next = k.classes.find((c) => c.state === 'now') || k.classes.find((c) => c.state === 'later');
    const last = [...k.classes].reverse().find((c) => c.watched);
    return { done, total, missed, status, how, needs, next, last };
  };
  const n = (() => { const m = location.hash.match(/-(\d)/); return m ? Math.max(1, Math.min(6, +m[1])) : 3; })();
  window.KIDS = { NOW, DATE: 'Wednesday 11 November', all: KIDS, kids: KIDS.slice(0, n), answers, grade };
})();
