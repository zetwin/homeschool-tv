// Where kept Chatterbox takes live, and how a line of Spanish finds its take.
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';
import { join } from 'node:path';
export const TAKES = join(homedir(), '.cache/homeschool-voices/takes');
/* The same words share one take. A comma or colon at the end changes nothing, but ? and ! change the tune, so those stay. */
export const takeText = (es) => { const t = es.normalize('NFC').trim().replace(/[.,:;…]+$/, ''); return /[?!]$/.test(t) ? t : `${t}.`; };
export const takeKey = (es, voice) => createHash('sha1').update(`${voice}|${takeText(es).toLowerCase()}`).digest('hex').slice(0, 16);
