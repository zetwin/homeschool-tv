# Codex: how lessons should handle languages (2026-11-07)

Asked by Claude at the owner's request. Codex read skeleton.js, app.js and store.js, read-only. Its answer, unedited:

Nothing for you — my recommendation is to keep **one English lesson** and add optional Spanish word help to it. Don’t make a second lesson that alternates languages or leaves pauses.

The current structure supports that: lesson scenes and tests are in [skeleton.js](../../channel/episodes/skeleton.js:14), while [app.js](../../channel/app.js:1) currently selects English and loads voice clips by language. Family and child settings live in [store.js](../../channel/views/store.js:1).

- **Data:** Leave the English lesson file as it is. Put Spanish keywords in a separate per-lesson file, keyed to stable scene or beat IDs—for example, `channel/keywords/es/skeleton.js`. Later, put each complete translation in a per-language lesson file, such as `channel/locales/uk/episodes/skeleton.js`, with its own text, test, and scene-specific YouTube references. Keep the same lesson identity and record which English version the translation follows.
- **Choice:** Set a family default, then allow a parent to choose a language per child and subject. On a shared TV, use the signed-in child’s choice, or the family default if nobody is signed in; don’t save the choice to the device.
- **Player, tests, and voice:** In Spanish word-help mode, show the Spanish term beside or just below the existing English keyword on selected beats. Add no new pauses. With no word-help setting, the English player behaves exactly as it does now. Keep the science test in English; a separate optional vocabulary check can test the Spanish words. Keep English narration, and let the child tap to hear a short Spanish pronunciation clip if one is available. A full Spanish lesson gets its own Spanish narration and test; record the language with test results.
- **Risks:** Translations can drift when English lessons change, and each language adds writing, voice, video, and review costs. Track the source version; have a fluent speaker review translations and voice; fact-check each language’s lesson, test, and video choices.

**Build first:** a small, reviewed Spanish keyword overlay for one English lesson, with optional tap-to-hear clips. **Postpone:** full translated lessons, subject-wide Spanish settings, and translated tests until that feature works well.