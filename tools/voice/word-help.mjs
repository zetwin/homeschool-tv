// Word help: a lesson's Spanish key words (channel/keywords/es/<lesson>.js) are recorded with the lesson, as clips.
// The player reads them aloud at the end of the lesson, and plays one when a child taps it. See docs/product/LANGUAGES.md.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/* The clip name for one key word, such as skeleton-wh-es-red-blood-cells. app.js builds the same name. */
export const wordClipId = (lesson, en) => `${lesson}-wh-es-${en.split('|')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

/* Adds the lesson's Spanish key words to episode.clips, so the usual recording run picks them up. */
export async function addWordHelp(episode, channelRoot) {
  const file = resolve(channelRoot, 'keywords/es', `${episode.id}.js`);
  if (!existsSync(file)) return 0;
  await import(pathToFileURL(file).href);
  const list = globalThis.window.KEYWORDS?.es?.[episode.id] || [];
  episode.clips = { ...(episode.clips || {}) };
  for (const [en, es] of list) episode.clips[wordClipId(episode.id, en)] = es;
  return list.length;
}
