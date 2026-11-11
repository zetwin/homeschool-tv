// Checks that a lesson follows docs/rules/LESSON-RULES.md and VIDEO-RULES.md: its opening, its ending and its videos.
// Usage: node tools/check-lesson.mjs [lesson id ...]   With no ids, it checks every lesson. Exits with 1 if any lesson fails.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
globalThis.window = { EPISODES: [] };
const dir = resolve('channel/episodes');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js'))) await import(pathToFileURL(resolve(dir, f)).href);
const manifest = JSON.parse(readFileSync(resolve('channel/assets/voice/en/manifest.json'), 'utf8'));
const only = process.argv.slice(2), ALL = window.EPISODES.filter((e) => !only.length || only.includes(e.id));
let failed = 0;
for (const ep of ALL) {
  const issues = [], parts = ep.scenes.map((s) => s.part), n = +(/Lesson (\d+)/.exec(ep.lessonLabel || '') || [])[1] || 1;
  const has = (p) => parts.includes(p), at = (p) => parts.indexOf(p);
  const firstOfSubject = n === 1 && ep.subjectStart !== false, opening = n > 1 ? ['greet', 'lastTime', 'hook', 'title', 'today'] : firstOfSubject ? ['welcome', 'known', 'journey', 'hook', 'title', 'today'] : ['greet', 'known', 'unit', 'hook', 'title', 'today'];
  if (ep.scenes.some((s) => s.type === 'title') && !has('title')) { /* Older files: the title scene counts as tagged. */ const i = ep.scenes.findIndex((s) => s.type === 'title'); parts[i] = 'title'; }
  if (/hook$/.test(ep.scenes[0]?.id || '') && !has('hook')) parts[0] = 'hook';
  /* Like a real class: hello and what today is about come first, before any hook. */
  if (!['greet', 'welcome'].includes(parts[0])) issues.push(`The lesson must open with a welcome ("greet", or "welcome" for a new subject), not "${parts[0] || ep.scenes[0]?.type}"`);
  opening.forEach((p) => { if (!parts.includes(p)) issues.push(`Opening has no "${p}" part`); });
  for (let i = 1, last = -1; i <= opening.length; i++) { const k = parts.indexOf(opening[i - 1]); if (k >= 0 && k < last) issues.push(`Opening is out of order at "${opening[i - 1]}"`); if (k >= 0) last = k; }
  ['answer', 'summary', 'next'].forEach((p) => { if (!parts.includes(p)) issues.push(`Ending has no "${p}" part`); });
  const sum = parts.indexOf('summary'), bonus = ep.scenes.findIndex((s) => s.bonus || s.chapter === 'Bonus');
  if (sum >= 0 && ep.scenes.slice(sum + 1).some((s) => s.type === 'chapter' || s.type === 'video' || s.chapter === 'Bonus')) issues.push('What we learned must come after all chapters, videos and bonus');
  /* Videos */
  ep.scenes.forEach((s, i) => { if (s.type !== 'video') return;
    if (!['support', 'break', 'chapter'].includes(s.use)) issues.push(`Video ${s.id}: no kind (use: support, break or chapter)`);
    if (i === 0 || i === ep.scenes.length - 1) issues.push(`Video ${s.id}: can't start or end a lesson`);
    if (ep.scenes[i + 1]?.type === 'video') issues.push(`Video ${s.id}: two videos in a row`);
    if (ep.scenes[i + 1]?.part === 'summary' || parts[i + 1] === 'answer') issues.push(`Video ${s.id}: can't sit right before the ending`);
    if (s.use === 'support' && !s.watchFor) issues.push(`Video ${s.id}: support clip with no "watch for"`);
    if (!s.after && !ep.scenes[i + 1]?.afterVideo) issues.push(`Video ${s.id}: no line after it (add afterVideo: true on the next scene)`);
    if (!s.status) issues.push(`Video ${s.id}: no status (candidate, or owner yes)`);
  });
  /* Voice: every line needs its clip. */
  const missing = ep.scenes.flatMap((s) => s.beats.map((b, i) => `${s.id}-${i}`)).filter((id) => !manifest[id] || !existsSync(resolve(`channel/assets/voice/en/${id}.mp3`)));
  if (missing.length) issues.push(`${missing.length} lines have no voice file, such as ${missing[0]}`);
  console.log(`${issues.length ? 'NOT YET' : 'OK     '} ${ep.id}${issues.length ? '' : ''}`); issues.forEach((t) => console.log(`        - ${t}`));
  if (issues.length) failed++;
}
console.log(`\n${ALL.length - failed} of ${ALL.length} lessons pass.`);
process.exit(failed ? 1 : 0);
