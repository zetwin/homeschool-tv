/* Shared header, bottom bar and icons for the Materials prototypes. Icons are the pad's own set (Lucide-style, ISC license). */
(function () {
  const I = {
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M9 20v-6h6v6"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z"/>',
    week: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    say: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    tablet: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
  };
  const icon = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
  const PLACES = [['today', 'Today', 'Today', 'home'], ['kids', 'Children', 'Children', 'people'], ['print', 'Materials', 'Materials', 'print'], ['diary', 'The week', 'Week', 'week'], ['program', 'The program', 'Program', 'book']];
  /* The header: the page's title on the left and three round icon tools on the right. `back` adds a way up from one item. */
  const head = (title, back) => `<header class="head">${back ? `<button class="back" data-back aria-label="${back}">${icon('back')}<span>${back}</span></button>` : ''}<h1>${title}</h1>
    <div class="tools"><button class="tool" aria-label="Text size and contrast"><b aria-hidden="true">Aa</b></button><button class="tool" aria-label="Tell us an idea or a problem">${icon('say')}</button><button class="tool" aria-label="Admin">${icon('gear')}</button></div></header>`;
  const nav = () => { const one = window.MAT.kids.length === 1;
    return `<nav class="nav" aria-label="Places">${PLACES.map(([key, word, short, ic]) => `<button aria-current="${key === 'print' ? 'page' : 'false'}">${icon(ic)}<span class="long">${key === 'kids' && one ? 'Your child' : word}</span><span class="short" aria-hidden="true">${key === 'kids' && one ? 'Child' : short}</span></button>`).join('')}</nav>`; };
  const page = (kind, cls = '') => `<div class="page ${cls}">${window.THUMB(kind)}</div>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const names = (kids) => (kids.length === 1 ? kids[0].name : kids.length === 2 ? `${kids[0].name} and ${kids[1].name}` : kids.length <= 3 ? `${kids.slice(0, -1).map((k) => k.name).join(', ')} and ${kids.at(-1).name}` : `all ${kids.length} children`);
  const kidChips = (kids, on = kids.map((k) => k.id)) => kids.map((k) => `<button class="kid" data-kid="${k.id}" aria-pressed="${on.includes(k.id)}"><i aria-hidden="true">${k.name[0]}</i>${esc(k.name)}</button>`).join('');
  /* What's real: shown quietly on an opened item, so the owner always knows what exists. */
  const STATUS = { built: 'In the app now', planned: 'Sample: made from the lesson', idea: 'Sample: a new kind' };
  const sheets = (n) => (n < 1 ? 'Half a sheet' : `${n} ${n === 1 ? 'sheet' : 'sheets'}`);
  /* Words that follow the number of children: "their devices" for several, "Ana’s device" for one. */
  const K = () => window.MAT.kids, SEND = () => (K().length === 1 ? `Send to ${K()[0].name}` : 'Send to devices'), EACH = () => (K().length === 1 ? `For ${K()[0].name}` : 'One for each child');
  window.UI = { icon, head, nav, page, esc, names, kidChips, STATUS, sheets, SEND, EACH };
  /* Tapping a child mark toggles it. */
  document.addEventListener('click', (e) => { const k = e.target.closest('[data-kid]'); if (k) k.setAttribute('aria-pressed', k.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); });
})();
