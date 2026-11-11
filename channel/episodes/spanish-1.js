/* Spanish, Lesson 1 of 6. Unit: Identity: estar and ser. Follows Oak National Academy's Year 7 lesson "Greetings in the Spanish-speaking world: 'estar' 1st and 3rd person singular", in Oak's order: the sound [a], estar for location, then greetings.
   Our own script and media. Nothing is copied from Oak, and this doesn't mean Oak has approved it. Neutral Latin American forms, with no vosotros. Scene ids start with sp- because voice clips share one folder.
   Voice: npm run voice spanish-1. Beats mix English and Spanish, both from Kokoro. Settings: tools/voice/voices.json.
   Review notes: sources and open questions are in docs/research/2026-11-06-spanish-lesson-1.md. A Spanish speaker hasn't reviewed it yet. Nobody has watched the three clips. See docs/rules/VIDEO-RULES.md. */
(function () {
  const MATEO = 'second';

  const episode = {
    id: 'spanish-1',
    number: 1,
    subject: 'Spanish',
    unit: 'Identity: estar and ser',
    title: '¡Hola! Your First Words in Spanish',
    topic: 'Saying hello and where you are, in Spanish',
    series: 'Spanish · Identity: estar and ser',
    lessonLabel: 'Lesson 1 of 6',
    blurb: 'The one sound of the Spanish a, how to say where someone is with está and estoy, and how to say hello and goodbye.',
    hero: 'spanish-cover.jpg',
    heroAlt: 'The word ¡Hola! and a waving hand, over a map of the countries where Spanish is an official language',
    heroPos: '50% 50%',
    builder: 'plate',
    builderImg: 'spanish-map.jpg',
    builderLabel: 'Fill in the Spanish-speaking world',
    builderDone: 'Your map of the Spanish-speaking world',
    fullScore: '¡Muy bien! That means very good!',
    /* Spanish only, for listening questions. */
    clips: { 'sp-hola': 'Hola', 'sp-hasta-luego': 'Hasta luego', 'sp-estoy': 'Estoy', 'sp-esta': 'Está', 'sp-estar': 'Estar', 'sp-cama': 'Cama', 'sp-casa': 'Casa', 'sp-mapa': 'Mapa' },
    scenes: [
      { id: 'sp-greet', part: 'welcome', chapter: 'Intro', type: 'statement', bg: '#D42A20', beats: [ { say: 'Hello, everyone, and welcome to your very first Spanish lesson!', text: 'Welcome to *Spanish*' }, { say: 'Today, you’ll learn to say hello and goodbye, and to say where you are. Spanish is spoken in many countries around the world, so these words go a long way.', text: 'Today: your first *Spanish* words', hold: 0.4 } ] },
      { id: 'sp-welcome', part: 'welcome', chapter: 'Intro', type: 'statement', bg: '#0F766E', beats: [
        { say: 'People speak Spanish in Colombia, Mexico, Spain and many more countries. By the end of this unit, you’ll be able to say hello, say where you are, and ask where your friends are.', text: 'Spoken in *many countries*', hold: .4 },
      ] },
      { id: 'sp-how', part: 'welcome', chapter: 'Intro', type: 'statement', bg: '#D42A20', beats: [
        { say: 'You’ll hear two voices today. I explain in English, and a Spanish voice says the Spanish. This lesson only works if you speak. When you see Your turn, say it out loud. Nobody’s marking you, and louder is better.', text: 'See *Your turn?* Say it out loud.', hold: 0.6 },
      ] },
    { id: 'sp-known', part: 'known', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'You already know some Spanish, maybe a lot. You’ve heard it in songs, in films, or at home.', text: 'You already *know* some' },
      { say: 'Shout it out: say a Spanish word you know.', text: 'Say a *word*', hold: 3 },
      { say: 'Great. If you couldn’t think of one, that’s fine. You’ll have plenty by the end.', text: 'Plenty *by the end*' },
    ] },
      { id: 'sp-journey', part: 'journey', chapter: 'Intro', type: 'art', art: 'spJourney', layout: 'full', bg: '#17131F', beats: [
        { say: 'This unit has six lessons, and this is the first. Here’s where you are.', hold: .4 },
      ] },
      { id: 'sp-hook', part: 'hook', chapter: 'Intro', type: 'art', art: 'spCols', layout: 'full', bg: '#17131F', poster: 'spanish-cover.jpg', beats: [
        { say: 'Here’s one English letter: a.', speak: 'Here’s one English letter: ay.', text: 'The English letter *a*', big: 'a' },
        { say: 'In English, it makes lots of different sounds. Cat. Cake. Car. About.', text: 'In English, *lots* of sounds', left: ['c[a]t', 'c[a]ke', 'c[a]r', '[a]bout'], stagger: 0.75, delay: 2.6 },
        { say: 'Lots of people expect Spanish letters to change like that too. But listen. Casa. Cama. Nada. Mapa.', parts: [{ en: 'Lots of people expect Spanish letters to change like that too. But listen.' }, { es: 'casa' }, { pause: 0.35 }, { es: 'cama' }, { pause: 0.35 }, { es: 'nada' }, { pause: 0.35 }, { es: 'mapa' }], text: 'Does Spanish do the same?', right: ['c[a]s[a]', 'c[a]m[a]', 'n[a]d[a]', 'm[a]p[a]'], stagger: 0.95, delay: 4.6 },
        { say: 'In Spanish, this letter makes one sound, every time.', text: 'In Spanish: *one sound*' },
      ] },
      { id: 'sp-title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Spanish · Lesson 1 of 6', title: '*¡Hola!* Your First Words in Spanish', img: 'spanish-card.jpg', bg: '#FFC400', fg: '#17131F', beats: [
        { say: '¡Hola! Today, you’ll say your first words in Spanish: hello, goodbye, and where you are.', parts: [{ es: '¡Hola!' }, { pause: 0.3 }, { en: 'Today, you’ll say your first words in Spanish: hello, goodbye, and where you are.' }], hold: 0.8 },
      ] },
      { id: 'sp-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#1D4ED8', heading: 'Today, you’ll be able to', items: ['Make the Spanish a sound', 'Say where you are, and where someone else is', 'Say hello and goodbye'], beats: [
        { say: 'Today, you’ll be able to do three things. Make the Spanish a sound. Say where you are, and where someone else is. And say hello and goodbye.', hold: .4 },
      ] },

      { id: 'sp-ch1', chapter: 'The a sound', type: 'chapter', n: 1, title: 'One letter, one sound: a', hasVideo: true, look: 'number', bg: '#1D4ED8', poster: 'spanish-casa.jpg', beats: [
        { say: 'Chapter one. The Spanish a. It’s a good first sound to learn, because it never changes. Let’s learn to make it.' },
      ] },
      { id: 'sp-a', chapter: 'The a sound', type: 'art', art: 'spWord', layout: 'full', bg: '#17131F', beats: [
        { say: 'Open your mouth wide, and say: a. a. a.', parts: [{ en: 'Open your mouth wide, and say:' }, { es: 'a' }, { pause: 0.6 }, { es: 'a' }, { pause: 0.6 }, { es: 'a' }], word: '[a]', turn: true, hold: 2 },
        { say: 'It’s close to the a in father, but shorter and cleaner. Think of a doctor asking you to say ah, and then cut it short.', word: '[a]', mean: 'Like “father”, but shorter' },
        { say: 'Your mouth stays still, from start to finish. It doesn’t slide into another sound, the way the a in cake does. The Spanish a just stays where it is.', word: '[a]', mean: 'Your mouth stays still' },
      ] },
      { id: 'sp-words', chapter: 'The a sound', type: 'art', art: 'spWord', layout: 'full', bg: '#0F766E', beats: [
        { say: 'Here’s a word with that sound. It means high, or tall. Alto. Alto.', parts: [{ en: 'Here’s a word with that sound. It means high, or tall.' }, { es: 'alto', slow: true }, { pause: 0.5 }, { es: 'alto' }], word: '[a]lto', mean: 'high, tall', img: 'colombia-peak.jpg', turn: true, hold: 2 },
        { say: 'A house. This word has two a’s, and they sound exactly the same. Casa. Casa.', parts: [{ en: 'A house. This word has two a’s, and they sound exactly the same.' }, { es: 'casa', slow: true }, { pause: 0.5 }, { es: 'casa' }], word: 'c[a]s[a]', mean: 'house', img: 'spanish-casa.jpg', turn: true, hold: 2 },
        { say: 'A bed. Only one letter is different from casa, and the a’s don’t change at all. Cama. Cama.', parts: [{ en: 'A bed. Only one letter is different from the last word, and the a’s don’t change at all.' }, { es: 'cama', slow: true }, { pause: 0.5 }, { es: 'cama' }], word: 'c[a]m[a]', mean: 'bed', img: 'spanish-cama.jpg', turn: true, hold: 2 },
        { say: 'A map. It looks almost like the English word, so listen closely to the a’s. Mapa. Mapa.', parts: [{ en: 'A map. It looks almost like the English word, so listen closely to the a’s.' }, { es: 'mapa', slow: true }, { pause: 0.5 }, { es: 'mapa' }], word: 'm[a]p[a]', mean: 'map', img: 'spanish-map.jpg', contain: true, turn: true, hold: 2 },
      ] },
      { id: 'sp-clap', chapter: 'The a sound', type: 'art', art: 'spClap', layout: 'full', bg: '#7E22CE', beats: [
        { say: 'A listening game. Clap if you hear the Spanish a. If you don’t, stay still.', text: 'Hear the *a?* Clap!' },
        { say: 'Cama.', parts: [{ es: 'cama' }], word: 'c[a]m[a]', has: true, hold: 2.4 },
        { say: 'Dos.', parts: [{ es: 'dos' }], word: 'dos', has: false, hold: 2.4 },
        { say: 'Planta.', parts: [{ es: 'planta' }], word: 'pl[a]nt[a]', has: true, hold: 2.4 },
      ] },
      { id: 'sp-compare', chapter: 'The a sound', type: 'art', art: 'spCols', layout: 'full', bg: '#17131F', beats: [
        { say: 'Some words look nearly the same in both languages. English: animal, plant, May.', text: 'Words that *look* the same', left: ['[a]nim[a]l', 'pl[a]nt', 'M[a]y'], stagger: 0.75, delay: 3.6 },
        { say: 'Spanish: animal, planta, mayo.', parts: [{ en: 'Spanish:' }, { es: 'animal' }, { pause: 0.4 }, { es: 'planta' }, { pause: 0.4 }, { es: 'mayo' }], right: ['[a]nim[a]l', 'pl[a]nt[a]', 'm[a]yo'], stagger: 1.05, delay: 0.8 },
        { say: 'That was the wrong idea we started with. English has lots of a sounds, and Spanish has only one. Use that one, and say all three.', text: 'Say all *three*', turn: true, hold: 3.5 },
      ] },
      { id: 'sp-spot', chapter: 'The a sound', type: 'guess', bg: '#D42A20', question: 'Which English word has the closest sound to the Spanish a?', options: ['Cat', 'Father', 'Cake', 'About'], answer: 1, img: 'spanish-planta.jpg', imgCaption: 'Planta: a plant', beats: [
        { say: 'Which English word has the closest sound to the Spanish a?', step: 'ask' },
        { say: 'Shout it out!', step: 'count', hold: 5 },
        { say: 'Father! And here’s a word to try it on. A plant: planta.', parts: [{ en: 'Father! And here’s a word to try it on. A plant:' }, { es: 'planta' }], step: 'reveal', hold: 2 },
      ] },
      { id: 'sp-read', chapter: 'The a sound', type: 'art', art: 'spWord', layout: 'full', bg: '#1D4ED8', beats: [
        { say: 'Now you go first. Read this country’s name out loud, before I do.', word: 'P[a]n[a]m[á]', text: 'Say it before I do', turn: true, hold: 2.5 },
        { say: 'Panamá. Panamá.', parts: [{ es: 'Panamá' }, { pause: 0.5 }, { es: 'Panamá' }], word: 'P[a]n[a]m[á]', mean: 'Panama, a country', text: 'Say it before I do' },
        { say: 'That little line on the last a doesn’t change the sound. It tells you to say that part loudest.', word: 'Pan[a]m[á]', mean: 'á: the same sound, said louder', text: 'What’s that line?' },
        { say: 'Now this city in Venezuela. You first.', word: 'C[a]r[a]c[a]s', text: 'Say it before I do', turn: true, hold: 2.5 },
        { say: 'Caracas. Caracas.', parts: [{ es: 'Caracas' }, { pause: 0.5 }, { es: 'Caracas' }], word: 'C[a]r[a]c[a]s', mean: 'Caracas, a city', text: 'Say it before I do' },
      ] },
      { id: 'sp-video-a', use: 'support', status: 'candidate', chapter: 'The a sound', type: 'video', bg: '#17131F', youtube: 'QubwkrC4UM4', start: 121, end: 205, videoTitle: 'How Spanish vowels sound', channel: 'Spring Spanish', watchFor: 'Listen for what stays the same each time', still: 'spanish-casa.jpg', beats: [
        { say: 'Here’s a short film about it. Listen for what stays the same each time.' },
      ] },

      { id: 'sp-after-a', afterVideo: true, chapter: 'The a sound', type: 'statement', bg: '#0F766E', beats: [
        { say: 'Keep that sound in your head. You’ll use it in every word today.', text: 'Keep that *sound* in your head', hold: .3 },
      ] },

      { id: 'sp-ch2', chapter: 'Está', type: 'chapter', n: 2, title: 'Está: where something is', hasVideo: true, look: 'band', bg: '#0F766E', poster: 'spanish-esta.jpg', posterPos: '50% 50%', beats: [
        { say: 'Chapter two. Where do people speak Spanish? And how do you say where something is?' },
      ] },
      { id: 'sp-world', chapter: 'Está', type: 'number', bg: '#17131F', img: 'spanish-machu.jpg', beats: [
        { say: 'More than 600 million people around the world can speak Spanish. That’s about 1 in every 13 people on Earth, from Mexico in the north, down to Chile and Argentina in the south.', speak: 'More than six hundred million people around the world can speak Spanish. That’s about one in every thirteen people on Earth, from Mexico in the north, down to Chile and Argentina in the south.', from: 0, to: 600, sub: 'million people, about 1 in every 13 on Earth' },
      ] },
      { id: 'sp-map', chapter: 'Está', type: 'atlas', bg: '#FFFFFF', img: 'spanish-map.jpg', ratio: 650 / 1280, plate: 'Map · Where Spanish is official', beats: [
        { say: 'It’s an official language in about 20 countries. They’re dark blue here. Most are in the Americas, and one, Equatorial Guinea, is in Africa.', speak: 'It’s an official language in about twenty countries. They’re dark blue here. Most are in the Americas, and one, Equatorial Guinea, is in Africa.', mark: [30, 62], zoom: 1.5, name: 'About 20 countries', fact: 'Dark blue: Spanish is official' },
        { say: 'Here’s Colombia. Its capital is Bogotá. Listen for the a at the end.', parts: [{ en: 'Here’s' }, { es: 'Colombia.' }, { en: 'Its capital is' }, { es: 'Bogotá.' }, { en: 'Listen for the a at the end.' }, { es: 'Bogotá.' }], mark: [27.5, 45], zoom: 3, name: 'Colombia', fact: 'Capital: Bogotá' },
        { say: 'Here’s Mexico. In Spanish, the x in this name sounds like a breathy h: México.', parts: [{ en: 'Here’s Mexico. In Spanish, the x in this name sounds like a breathy h.' }, { es: 'México.' }], mark: [19.5, 37], zoom: 3, name: 'México', fact: 'Mexico' },
        { say: 'And across the sea, Spain, where the language began: España.', parts: [{ en: 'And across the sea, Spain, where the language began:' }, { es: 'España.' }], mark: [46.8, 25.2], zoom: 3, name: 'España', fact: 'Spain' },
      ] },
      { id: 'sp-nye', chapter: 'Está', type: 'art', art: 'spWord', layout: 'full', bg: '#7E22CE', beats: [
        { say: 'Did you spot the new letter? It’s an n with a wave on top, and it sounds like the middle of the word canyon. You’ll also hear it in mañana, which means tomorrow.', parts: [{ en: 'Did you spot the new letter? It’s an n with a wave on top, and it sounds like the middle of the word canyon. You’ll also hear it in' }, { es: 'mañana,' }, { en: 'which means tomorrow.' }], word: 'Espa[ñ]a', mean: 'ñ: like the middle of “canyon”' },
        { say: 'España. España.', parts: [{ es: 'España', slow: true }, { pause: 0.5 }, { es: 'España' }], word: 'Espa[ñ]a', mean: 'Spain', turn: true, hold: 2 },
      ] },
      { id: 'sp-estar', chapter: 'Está', type: 'art', art: 'spWord', layout: 'full', bg: '#17131F', beats: [
        { say: 'Now your first verb. It means to be, or being. Estar. Estar.', parts: [{ en: 'Now your first verb. It means to be, or being.' }, { es: 'estar' }, { pause: 0.5 }, { es: 'estar' }], word: 'estar', mean: 'to be, being', turn: true, hold: 2 },
        { say: 'We use estar for where someone or something is. That’s called location.', parts: [{ en: 'We use' }, { es: 'estar' }, { en: 'for where someone or something is. That’s called location.' }], word: 'estar', mean: 'for location: where something is' },
        { say: 'English has one verb for to be. Spanish has two. Estar isn’t for the time, or for someone’s job. The other verb does that, and you’ll meet it later in this unit.', parts: [{ en: 'English has one verb for to be. Spanish has two. This one isn’t for the time, or for someone’s job. The other verb does that, and you’ll meet it later in this unit.' }], word: 'estar', mean: 'Not for the time, or a job' },
      ] },
      { id: 'sp-madrid', chapter: 'Está', type: 'art', art: 'spSentence', layout: 'full', bg: '#17131F', beats: [
        { say: 'This is Madrid, the capital of Spain. Madrid está en España.', parts: [{ en: 'This is Madrid, the capital of Spain. Listen.' }, { es: 'Madrid está en España.', slow: true }, { pause: 0.5 }, { es: 'Madrid está en España.' }], img: 'spanish-madrid.jpg', es: [['Madrid'], ['está', 'is'], ['en', 'in'], ['España.', 'Spain']] },
        { say: 'Está means is. En means in, or sometimes on. So: Madrid is in Spain. Your turn.', parts: [{ es: 'Está' }, { en: 'means is.' }, { es: 'En' }, { en: 'means in, or sometimes on. So: Madrid is in Spain. Your turn.' }], img: 'spanish-madrid.jpg', es: [['Madrid'], ['está', 'is'], ['en', 'in'], ['España.', 'Spain']], gloss: true, turn: true, hold: 3 },
      ] },
      { id: 'sp-bogota', chapter: 'Está', type: 'art', art: 'spSentence', layout: 'full', bg: '#17131F', beats: [
        { say: 'Now Colombia’s capital, high in the mountains. Bogotá está en Colombia.', parts: [{ en: 'Now Colombia’s capital, high in the mountains.' }, { es: 'Bogotá está en Colombia.', slow: true }, { pause: 0.5 }, { es: 'Bogotá está en Colombia.' }], img: 'colombia-bogota.jpg', es: [['Bogotá'], ['está', 'is'], ['en', 'in'], ['Colombia.']], gloss: true, turn: true, hold: 3 },
      ] },
      { id: 'sp-london', chapter: 'Está', type: 'art', art: 'spSentence', layout: 'full', bg: '#17131F', beats: [
        { say: 'In Spanish, London is Londres, and England is Inglaterra. Londres está en Inglaterra.', parts: [{ en: 'In Spanish, London is' }, { es: 'Londres,' }, { en: 'and England is' }, { es: 'Inglaterra.' }, { pause: 0.4 }, { es: 'Londres está en Inglaterra.', slow: true }, { pause: 0.5 }, { es: 'Londres está en Inglaterra.' }], img: 'spanish-london.jpg', es: [['Londres', 'London'], ['está', 'is'], ['en', 'in'], ['Inglaterra.', 'England']], gloss: true, turn: true, hold: 3.5 },
      ] },
      { id: 'sp-donde', chapter: 'Está', type: 'art', art: 'spMarks', layout: 'full', bg: '#1D4ED8', beats: [
        { say: 'To ask where, use dónde. The line tells you to say the first part loudest. ¿Dónde está? Where is it?', parts: [{ en: 'To ask where, use' }, { es: 'dónde.' }, { en: 'The line tells you to say the first part loudest.' }, { pause: 0.3 }, { es: '¿Dónde está?', slow: true }, { pause: 0.4 }, { es: '¿Dónde está?' }, { en: 'Where is it?' }], chars: ['¿', 'Dónde está', '?'], mean: 'Where is it?' },
        { say: 'Spanish puts an upside-down question mark at the start, so you know a question is coming.', chars: ['¿', 'Dónde está', '?'], mean: 'A question mark at each end', flip: true },
        { say: '¿Dónde está?', parts: [{ es: '¿Dónde está?' }], chars: ['¿', 'Dónde está', '?'], mean: 'Your turn to ask', flipped: true, turn: true, hold: 2 },
      ] },
      { id: 'sp-q1', chapter: 'Está', type: 'guess', bg: '#D42A20', question: '¿Dónde está Machu Picchu?', options: ['Está en Perú', 'Está en México', 'Está en España'], answer: 0, img: 'spanish-machu.jpg', imgCaption: 'Machu Picchu, in Peru', beats: [
        { say: '¿Dónde está Machu Picchu? Read the answers, and choose one.', parts: [{ es: '¿Dónde está Machu Picchu?' }, { en: 'Read the answers, and choose one.' }], step: 'ask' },
        { say: 'Shout it in Spanish!', step: 'count', hold: 5 },
        { say: 'Está en Perú. It’s in Peru. See that? Está can also mean it is.', parts: [{ es: 'Está en Perú.' }, { en: 'It’s in Peru. See that? On its own, the word can also mean it is.' }], step: 'reveal', hold: 0.5 },
      ] },
      { id: 'sp-sofia', chapter: 'Está', type: 'art', art: 'spSentence', layout: 'full', bg: '#17131F', beats: [
        { say: '¿Dónde está Sofía? Where’s Sofía?', parts: [{ es: '¿Dónde está Sofía?' }, { en: 'Where’s Sofía?' }], img: 'colombia-cartagena.jpg', es: [['¿Dónde', 'where'], ['está', 'is'], ['Sofía?']], gloss: true },
        { say: 'Está en Cartagena. She’s in Cartagena.', parts: [{ es: 'Está en Cartagena.' }, { en: 'She’s in Cartagena.' }], img: 'colombia-cartagena.jpg', es: [['Está', 'she is'], ['en', 'in'], ['Cartagena.']], gloss: true },
        { say: 'One word does all of that: is, it is, she is and he is. Spanish doesn’t need a separate word for she or he, because you already know who we’re talking about. Now you.', img: 'colombia-cartagena.jpg', es: [['Está', 'she is'], ['en', 'in'], ['Cartagena.']], gloss: true, text: 'Is, it is, she is, he is', turn: true, hold: 3 },
      ] },
      { id: 'sp-video-world', use: 'support', status: 'candidate', chapter: 'Está', type: 'video', bg: '#17131F', youtube: 'aJr3nnnXqNg', start: 249, end: 318, videoTitle: 'Spanish-speaking countries of South America', channel: 'Mi Camino Spanish', watchFor: 'Spot the countries in South America', still: 'spanish-machu.jpg', beats: [
        { say: 'Let’s see more of South America on film. Spot the countries that speak Spanish.' },
      ] },

      { id: 'sp-after-world', afterVideo: true, chapter: 'Está', type: 'statement', bg: '#7E22CE', beats: [
        { say: 'Next time you see one of those countries, try it: it’s in Peru. Está en Perú.', parts: [{ en: 'Next time you see one of those countries, try it: it’s in Peru.' }, { es: 'Está en Perú.' }], text: 'Está en *Perú*', hold: .3 },
      ] },

      { id: 'sp-ch3', chapter: 'Estoy', type: 'chapter', n: 3, title: 'Estoy: where I am', look: 'split', bg: '#D42A20', poster: 'spanish-estoy.jpg', beats: [
        { say: 'Chapter three. You can say where other people and places are. Now, say where you are.' },
      ] },
      { id: 'sp-estoy', chapter: 'Estoy', type: 'art', art: 'spWord', layout: 'full', bg: '#1D4ED8', beats: [
        { say: 'Here’s how to say I am: estoy. estoy.', parts: [{ en: 'Here’s how to say I am:' }, { es: 'estoy', slow: true }, { pause: 0.5 }, { es: 'estoy' }], word: '<estoy>', mean: 'I am', turn: true, hold: 2 },
        { say: 'The end rhymes with boy, and that’s the loud part. There’s no separate word for I. The end of the word already tells us.', word: '<estoy>', mean: 'Rhymes with “boy”' },
      ] },
      { id: 'sp-where', chapter: 'Estoy', type: 'art', art: 'spSentence', layout: 'full', bg: '#17131F', beats: [
        { say: 'You’re standing in Mexico City, under that huge flag. Estoy en México.', parts: [{ en: 'You’re standing in Mexico City, under that huge flag.' }, { es: 'Estoy en México.', slow: true }, { pause: 0.5 }, { es: 'Estoy en México.' }], img: 'spanish-zocalo.jpg', es: [['Estoy', 'I am'], ['en', 'in'], ['México.', 'Mexico']], gloss: true, turn: true, hold: 3 },
        { say: 'Now you’re in Colombia, looking at Bogotá. Estoy en Colombia.', parts: [{ en: 'Now you’re in Colombia, looking at the city of Bogotá.' }, { es: 'Estoy en Colombia.', slow: true }, { pause: 0.5 }, { es: 'Estoy en Colombia.' }], img: 'colombia-bogota.jpg', es: [['Estoy', 'I am'], ['en', 'in'], ['Colombia.']], gloss: true, turn: true, hold: 3 },
      ] },
      { id: 'sp-try', chapter: 'Estoy', type: 'art', art: 'spTry', layout: 'full', bg: '#0F766E', beats: [
        { say: 'Try it now! Stand up. When you hear estoy, point at yourself. When you hear está, point away.', parts: [{ en: 'Try it now! Stand up. When you hear' }, { es: 'estoy,' }, { en: 'point at yourself. When you hear' }, { es: 'está,' }, { en: 'point away.' }], act: 'Stand up!', intro: true },
        { say: 'Estoy.', parts: [{ es: 'Estoy.' }], word: 'Estoy', act: 'Point at yourself', c: '#7CD4FF', hold: 2 },
        { say: 'Está.', parts: [{ es: 'Está.' }], word: 'Está', act: 'Point away', c: '#FF9E7A', hold: 2 },
        { say: 'Está en Bogotá.', parts: [{ es: 'Está en Bogotá.' }], word: 'Está en Bogotá', act: 'Point away', c: '#FF9E7A', hold: 2 },
        { say: 'Estoy en Bogotá. Nice work. Sit down.', parts: [{ es: 'Estoy en Bogotá.' }, { pause: 1.6 }, { en: 'Nice work. Sit down.' }], word: 'Estoy en Bogotá', act: 'Point at yourself', c: '#7CD4FF' },
      ] },
      { id: 'sp-pick', chapter: 'Estoy', type: 'art', art: 'spPick', layout: 'full', bg: '#17131F', beats: [
        { say: 'Now just listen. Is it about me, or about someone else? Point left for I am, and right for she or he is. Estoy en Chichén Itzá.', parts: [{ en: 'Now just listen. Is it about me, or about someone else? Point left for I am, and right for she or he is.' }, { pause: 0.4 }, { es: 'Estoy en Chichén Itzá.' }], text: 'Who is it about?', turn: true, hold: 2.5 },
        { say: 'Estoy. I’m in Chichén Itzá, in Mexico.', parts: [{ es: 'Estoy.' }, { en: 'I’m in this ancient Maya city, in Mexico.' }], line: 'Estoy en Chichén Itzá.', answer: 0, img: 'spanish-chichen.jpg' },
        { say: 'Está en Madrid.', parts: [{ es: 'Está en Madrid.' }], text: 'Who is it about?', turn: true, hold: 2.5 },
        { say: 'Está. She or he is in Madrid.', parts: [{ es: 'Está.' }, { en: 'She or he is in Madrid.' }], line: 'Está en Madrid.', answer: 1, img: 'spanish-madrid.jpg' },
      ] },
      { id: 'sp-first', chapter: 'Estoy', type: 'art', art: 'spSentence', layout: 'full', bg: '#7E22CE', beats: [
        { say: 'Say it before I do. I am in Mexico.', text: 'I am in Mexico.', es: [['Estoy', 'I am'], ['en', 'in'], ['México.']], gap: true, turn: true, hold: 3.5 },
        { say: 'Estoy en México.', parts: [{ es: 'Estoy en México.', slow: true }, { pause: 0.5 }, { es: 'Estoy en México.' }], text: 'I am in Mexico.', es: [['Estoy', 'I am'], ['en', 'in'], ['México.']] },
        { say: 'Madrid is in Spain.', text: 'Madrid is in Spain.', es: [['Madrid'], ['está', 'is'], ['en', 'in'], ['España.']], gap: true, turn: true, hold: 3.5 },
        { say: 'Madrid está en España.', parts: [{ es: 'Madrid está en España.', slow: true }, { pause: 0.5 }, { es: 'Madrid está en España.' }], text: 'Madrid is in Spain.', es: [['Madrid'], ['está', 'is'], ['en', 'in'], ['España.']] },
      ] },
      { id: 'sp-page', chapter: 'Estoy', type: 'art', art: 'spPage', layout: 'full', bg: '#17131F', beats: [
        { say: 'Here’s your verb so far. Estar: to be. Estoy: I am. Estoy en Colombia. Está: she, he or it is. Está en México.', parts: [{ en: 'Here’s your verb so far.' }, { es: 'Estar:' }, { en: 'to be.' }, { es: 'Estoy:' }, { en: 'I am.' }, { es: 'Estoy en Colombia.' }, { es: 'Está:' }, { en: 'she, he or it is.' }, { es: 'Está en México.' }], text: 'Your verb so far', rows: [['estar', 'to be, being', 'for location'], ['estoy', 'I am', 'en Colombia'], ['está', 'she, he, it is', 'en México']], hold: 2 },
      ] },

      { id: 'sp-ch4', chapter: 'Greetings', type: 'chapter', n: 4, title: 'Hola and hasta luego', hasVideo: true, look: 'left', bg: '#7E22CE', poster: 'spanish-hello.jpg', beats: [
        { say: 'Chapter four. Time to say hello, and goodbye. You’ll use these two every day.' },
      ] },
      { id: 'sp-hola', chapter: 'Greetings', type: 'art', art: 'spWord', layout: 'full', bg: '#17131F', beats: [
        { say: 'Hello: hola. It works with anyone, at any time of day. Hola.', parts: [{ en: 'Hello:' }, { es: 'hola', slow: true }, { en: 'It works with anyone, at any time of day.' }, { es: 'hola' }], word: 'hol[a]', mean: 'hello', turn: true, hold: 2 },
        { say: 'Look at the first letter. In Spanish, the letter h is silent. It’s written down, but you don’t say it at all.', word: '{h}ol[a]', mean: 'The h is silent' },
      ] },
      { id: 'sp-hasta', chapter: 'Greetings', type: 'art', art: 'spWord', layout: 'full', bg: '#D42A20', beats: [
        { say: 'Now goodbye: hasta luego. It means bye, or see you later.', parts: [{ en: 'Now goodbye:' }, { es: 'hasta luego.', slow: true }, { en: 'It means bye, or see you later.' }], word: 'h[a]st[a] luego', mean: 'bye, see you later' },
        { say: 'Another silent h, and two of your a sounds. Hasta.', parts: [{ en: 'Another silent h, and two of your a sounds.' }, { es: 'hasta', slow: true }], word: '{h}[a]st[a]', turn: true, hold: 1.8 },
        { say: 'Now the second word. Luego.', parts: [{ en: 'Now the second word.' }, { es: 'luego', slow: true }], word: 'luego', mean: 'Starts like “lweh”', turn: true, hold: 1.8 },
        { say: 'All together. Hasta luego.', parts: [{ en: 'All together.' }, { es: 'hasta luego' }], word: '{h}[a]st[a] luego', mean: 'bye, see you later', turn: true, hold: 2 },
        { say: 'In many Latin American countries, you’ll hear this for bye too: chao.', parts: [{ en: 'In many Latin American countries, you’ll hear this for bye too:' }, { es: 'chao' }], word: 'chao', mean: 'bye', hold: 0.8 },
      ] },
      { id: 'sp-bang', chapter: 'Greetings', type: 'art', art: 'spMarks', layout: 'full', bg: '#0F766E', beats: [
        { say: 'When you write it, you’ll see that trick again. An upside-down exclamation mark goes first.', chars: ['¡', 'Hasta luego', '!'], mean: 'An exclamation mark at each end', flip: true },
      ] },
      { id: 'sp-call', chapter: 'Greetings', type: 'art', art: 'spCall', layout: 'full', bg: '#17131F', beats: [
        { say: 'Ana is in Bogotá. Mateo is in Mexico. They’re on a video call. Just listen.', parts: [{ en: 'Ana is in' }, { es: 'Bogotá.' }, { en: 'Mateo is in Mexico. They’re on a video call. Just listen.' }] },
        { say: 'Ana: ¡Hola, Mateo! Estoy en Bogotá.', parts: [{ es: '¡Hola, Mateo! Estoy en Bogotá.' }, { pause: 0.3 }, { en: 'Hello, Mateo. I’m in Bogotá.' }], who: 0, line: '¡Hola, Mateo! Estoy en Bogotá.', en: 'Hello, Mateo! I’m in Bogotá.', hold: 0.5 },
        { say: 'Mateo: ¡Hola, Ana! Estoy en México.', parts: [{ es: '¡Hola, Ana! Estoy en México.', voice: MATEO }, { pause: 0.3 }, { en: 'Hello, Ana. I’m in Mexico.' }], who: 1, line: '¡Hola, Ana! Estoy en México.', en: 'Hello, Ana! I’m in Mexico.', hold: 0.5 },
        { say: 'Ana: ¿Dónde está Sofía?', parts: [{ es: '¿Dónde está Sofía?' }, { pause: 0.3 }, { en: 'Where’s Sofía?' }], who: 0, line: '¿Dónde está Sofía?', en: 'Where’s Sofía?', hold: 0.5 },
        { say: 'Mateo: Está en Cartagena.', parts: [{ es: 'Está en Cartagena.', voice: MATEO }, { pause: 0.3 }, { en: 'She’s in Cartagena.' }], who: 1, line: 'Está en Cartagena.', en: 'She’s in Cartagena.', hold: 0.5 },
        { say: 'Ana: ¡Hasta luego, Mateo!', parts: [{ es: '¡Hasta luego, Mateo!' }], who: 0, line: '¡Hasta luego, Mateo!', en: 'See you later, Mateo!', hold: 0.5 },
        { say: 'Mateo: ¡Hasta luego, Ana!', parts: [{ es: '¡Hasta luego, Ana!', voice: MATEO }], who: 1, line: '¡Hasta luego, Ana!', en: 'See you later, Ana!', hold: 0.5 },
      ] },
      { id: 'sp-call2', chapter: 'Greetings', type: 'art', art: 'spCall', layout: 'full', bg: '#17131F', beats: [
        { say: 'Did you notice? Ana said estoy about herself, and Mateo said está about Sofía. Now it’s your turn. You’re Mateo. Ana speaks, then you answer in the silence.', parts: [{ en: 'Did you notice? Ana used' }, { es: 'estoy' }, { en: 'about herself, and Mateo used' }, { es: 'está' }, { en: 'about Sofía. Now it’s your turn. You’re Mateo. Ana speaks, then you answer in the silence.' }] },
        { say: 'Ana: ¿Dónde está Sofía?', parts: [{ es: '¿Dónde está Sofía?' }], who: 0, line: '¿Dónde está Sofía?', en: 'Where’s Sofía?', hold: 0.4 },
        { say: 'Say: she’s in Cartagena.', who: 1, mine: 'She’s in Cartagena.', turn: true, hold: 3.5 },
        { say: 'Mateo: Está en Cartagena.', parts: [{ es: 'Está en Cartagena.', voice: MATEO }], who: 1, line: 'Está en Cartagena.', en: 'She’s in Cartagena.', hold: 0.5 },
        { say: 'Ana: ¡Hasta luego, Mateo!', parts: [{ es: '¡Hasta luego, Mateo!' }], who: 0, line: '¡Hasta luego, Mateo!', en: 'See you later, Mateo!', hold: 0.4 },
        { say: 'Now say goodbye to Ana.', who: 1, mine: 'See you later, Ana!', turn: true, hold: 3 },
        { say: 'Mateo: ¡Hasta luego, Ana!', parts: [{ es: '¡Hasta luego, Ana!', voice: MATEO }], who: 1, line: '¡Hasta luego, Ana!', en: 'See you later, Ana!', hold: 0.5 },
      ] },
      { id: 'sp-video-talk', use: 'support', status: 'candidate', chapter: 'Greetings', type: 'video', bg: '#17131F', youtube: 'Dji9oiC8c3k', videoTitle: 'Two people practice in Spanish', channel: 'Spanish Playground', watchFor: 'Listen to how Spanish sounds in a real talk', still: 'spanish-hello.jpg', beats: [
        { say: 'Here’s a short film of two people practicing introductions. You’ll hear words you haven’t learned, and that’s fine. Just listen to how it sounds.' },
      ] },

      { id: 'sp-after-talk', afterVideo: true, chapter: 'Greetings', type: 'statement', bg: '#0F766E', beats: [
        { say: 'Did you catch any words you know? Even one is a good start.', text: 'Did you catch *any words?*', hold: .6 },
      ] },

      { id: 'sp-ch5', chapter: 'Be the interpreter', type: 'chapter', n: 5, title: 'Be the interpreter', look: 'full', bg: '#1D4ED8', poster: 'spanish-interpreter.jpg', posterStill: true, beats: [
        { say: 'Chapter five. Now put it all together. You’re going to be an interpreter.' },
      ] },
      { id: 'sp-booths', chapter: 'Be the interpreter', type: 'art', art: 'spBooths', layout: 'full', bg: '#0C0A10', beats: [
        { say: 'An interpreter turns speech into another language, while people are talking. This is the view from inside a booth. The interpreters sit behind glass, looking down on the meeting. They listen, and speak at the same time.', text: 'Inside an interpreter’s *booth*' },
      ] },
      { id: 'sp-interp', chapter: 'Be the interpreter', type: 'art', art: 'spInterp', layout: 'full', bg: '#17131F', beats: [
        { say: 'Interpreters have to think fast, and today, so do you. Lucía only speaks English, and she needs you. Hear her words, then say them in Spanish, in the silence.', step: 'intro' },
        { say: 'Hi! I’m in Mexico. See you later!', step: 'ask', n: 1, line: 'Hi! I’m in Mexico. See you later!', turn: true, hold: 5.5 },
        { say: '¡Hola! Estoy en México. ¡Hasta luego!', parts: [{ es: '¡Hola! Estoy en México. ¡Hasta luego!', slow: true }, { pause: 0.6 }, { es: '¡Hola! Estoy en México. ¡Hasta luego!' }], step: 'show', n: 1, line: 'Hi! I’m in Mexico. See you later!', es: '¡Hola! Estoy en México. ¡Hasta luego!', hold: 0.8 },
        { say: 'Hi! Leo is in England. See you later!', step: 'ask', n: 2, line: 'Hi! Leo is in England. See you later!', turn: true, hold: 6 },
        { say: '¡Hola! Leo está en Inglaterra. ¡Hasta luego!', parts: [{ es: '¡Hola! Leo está en Inglaterra. ¡Hasta luego!', slow: true }, { pause: 0.6 }, { es: '¡Hola! Leo está en Inglaterra. ¡Hasta luego!' }], step: 'show', n: 2, line: 'Hi! Leo is in England. See you later!', es: '¡Hola! Leo está en Inglaterra. ¡Hasta luego!', hold: 0.8 },
        { say: 'Hi! Ana is in Colombia. Bye!', step: 'ask', n: 3, line: 'Hi! Ana is in Colombia. Bye!', turn: true, hold: 6 },
        { say: '¡Hola! Ana está en Colombia. ¡Chao!', parts: [{ es: '¡Hola! Ana está en Colombia. ¡Chao!', slow: true }, { pause: 0.6 }, { es: '¡Hola! Ana está en Colombia. ¡Chao!' }], step: 'show', n: 3, line: 'Hi! Ana is in Colombia. Bye!', es: '¡Hola! Ana está en Colombia. ¡Chao!', hold: 0.8 },
      ] },
      { id: 'sp-you', chapter: 'Be the interpreter', type: 'art', art: 'spWord', layout: 'full', bg: '#0F766E', beats: [
        { say: 'Last one, and it’s all yours. Say hello. Say what country you’re in. Then say goodbye.', word: '¡Hola! Estoy en…', mean: 'Say your own country, then ¡hasta luego!', text: 'Your own words', turn: true, hold: 6 },
      ] },

      { id: 'sp-bonus', chapter: 'Bonus', type: 'chapter', bonus: true, label: 'Bonus', title: 'Same language, different words', look: 'right', bg: '#7E22CE', poster: 'spanish-papa.jpg', beats: [
        { say: 'Bonus! This isn’t in the test. Spanish changes a little from place to place.' },
      ] },
      { id: 'sp-papa', chapter: 'Bonus', type: 'art', art: 'spWord', layout: 'full', bg: '#17131F', beats: [
        { say: 'In Latin America, a potato is a papa. That’s what these farmers are picking, in Colombia.', parts: [{ en: 'In Latin America, a potato is a' }, { es: 'papa.' }, { en: 'That’s what these farmers are picking, in Colombia.' }], word: 'p[a]p[a]', mean: 'potato, in Latin America', img: 'colombia-potato.jpg' },
        { say: 'In Spain, it’s a patata. Both are right. These lessons use Latin American Spanish, and people in Spain will understand you too.', parts: [{ en: 'In Spain, it’s a' }, { es: 'patata.' }, { en: 'Both are right. These lessons use Latin American Spanish, and people in Spain will understand you too.' }], word: 'p[a]t[a]t[a]', mean: 'potato, in Spain', img: 'colombia-potato.jpg' },
      ] },
      { id: 'sp-ola', chapter: 'Bonus', type: 'art', art: 'spWord', layout: 'full', bg: '#1D4ED8', beats: [
        { say: 'And since the h is silent, hola sounds just like another word: ola. It means a wave in the sea.', parts: [{ en: 'And since the h is silent,' }, { es: 'hola' }, { en: 'sounds just like another word:' }, { es: 'ola.' }, { en: 'It means a wave in the sea.' }], word: 'ol[a]', mean: 'a wave', img: 'spanish-wave.jpg' },
      ] },

      { id: 'sp-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
        { say: 'Remember the letter a at the start? In English, it changes all the time. In Spanish, it makes one sound, every time.', text: 'Spanish a: *one sound,* every time', hold: .4 },
      ] },
      { id: 'sp-recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#0F766E', heading: 'What we learned', items: ['The Spanish a: one sound', 'Estar: for location', 'Estoy: I am', 'Está: she, he, it is', '¡Hola! ¡Hasta luego!'], beats: [
        { say: 'Here’s what we learned. The Spanish a has one sound. Estar is for location. Estoy means I am. Está means she, he or it is. And ¡hola! and ¡hasta luego! are hello, and see you later.', parts: [{ en: 'Here’s what we learned. The Spanish a has one sound.' }, { es: 'Estar' }, { en: 'is for location.' }, { es: 'Estoy' }, { en: 'means I am.' }, { es: 'Está' }, { en: 'means she, he or it is. And' }, { es: '¡hola!' }, { en: 'and' }, { es: '¡hasta luego!' }, { en: 'are hello, and see you later.' }] },
      ] },
      { id: 'sp-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
        { say: 'Next lesson, you’ll ask a friend where they are: ¿Dónde estás?', parts: [{ en: 'Next lesson, you’ll ask a friend where they are:' }, { es: '¿Dónde estás?' }], text: 'Next time: *¿Dónde estás?*', hold: .4 },
        { say: 'But first, take the test.', text: 'Now, *the test*', hold: .4 },
      ] },
    ],
    starter: [
      { type: 'radio', q: 'Which of these words is a verb?', o: ['Listen', 'Dog', 'Green'], a: 0, why: 'A verb is a doing or being word, and listen is something you do.' },
      { type: 'radio', q: 'Which of these is about yourself?', o: ['I am', 'She reads', 'It moves'], a: 0, why: '“I am” is about you. “She” and “it” are about someone or something else. Spanish uses a different word for each, as you’ll see.' },
      { type: 'radio', q: 'What do you think? In Spanish, how many sounds does the letter a make?', o: ['One', 'Four', 'It depends on the word'], a: 0, why: 'Just one, every time. Today you’ll learn to make it.' },
    ],
    test: [
      { type: 'listen', clip: 'sp-hola', q: 'Listen. Which word do you hear?', o: ['Hola', 'Hasta luego', 'Estoy'], a: 0, why: 'You heard hola. It means hello, and the h is silent.' },
      { type: 'radio', q: 'Which English word has the closest sound to the Spanish a?', o: ['Cake', 'Father', 'Cat', 'About'], a: 1, why: 'The Spanish a is close to the a in father, but shorter.' },
      { type: 'truefalse', q: 'True or false?', rows: [['In Spanish, the letter a changes its sound from word to word.', false], ['The h in hola is silent.', true], ['In Panamá, the line on the last a tells you to say that part loudest.', true]], why: 'The Spanish a has one sound, and the h is silent. The little line shows which part to say loudest.' },
      { type: 'listen', clip: 'sp-cama', q: 'Listen. Which word do you hear?', o: ['Casa', 'Cama', 'Mapa'], a: 1, why: 'You heard cama, which means bed. All three have the same a sound.' },
      { type: 'match', q: 'Match each photo to its Spanish word.', pairs: [[{ img: 'spanish-casa.jpg', t: 'Photo 1' }, 'Casa'], [{ img: 'spanish-cama.jpg', t: 'Photo 2' }, 'Cama'], [{ img: 'spanish-planta.jpg', t: 'Photo 3' }, 'Planta'], [{ img: 'spanish-map.jpg', t: 'Photo 4' }, 'Mapa']], why: 'Casa is a house, cama is a bed, planta is a plant, and mapa is a map.' },
      { type: 'checkbox', q: 'Estar is for location. Which of these say where someone or something is?', o: ['Madrid está en España.', 'Estoy en Colombia.', 'Está en Perú.', '¡Hasta luego, Ana!'], a: [0, 1, 2], why: 'The first three use estar to say where someone or something is. ¡Hasta luego! just means see you later.' },
      { type: 'listen', clip: 'sp-estoy', q: 'Listen. What does this word mean?', o: ['I am', 'She, he or it is', 'Hello'], a: 0, why: 'You heard estoy, which means I am.' },
      { type: 'sort', q: 'Would you use estoy or está? Sort them.', bins: ['Estoy', 'Está'], items: [{ t: 'I am in Bogotá', bin: 0 }, { t: 'I am in Spain', bin: 0 }, { t: 'Ana is in Mexico', bin: 1 }, { t: 'He is in England', bin: 1 }, { t: 'Madrid is in Spain', bin: 1 }], why: 'Estoy is about you. Está is about someone or something else.' },
      { type: 'gaps', q: 'Finish the Spanish sentences.', text: 'I am in Colombia: {0} en Colombia. Bogotá is in Colombia: Bogotá {1} en Colombia.', bank: ['Estoy', 'está', 'estar', 'hola'], a: ['Estoy', 'está'], why: 'Estoy means I am, and está means is.' },
      { type: 'word', q: 'Spell the Spanish word for hello. It starts with a letter you don’t say.', a: ['hola'], why: 'Hola. The h is silent, but it’s still written.' },
      { type: 'select', q: 'Ana asks where Sofía is. Choose the right words.', text: 'Ana: ¿{0} está Sofía? Mateo: {1} en Cartagena.', choices: [['Dónde', 'Hola', 'Estar'], ['Está', 'Estoy', 'Dónde']], a: ['Dónde', 'Está'], why: 'Dónde means where. Mateo is talking about Sofía, so he says está.' },
      { type: 'order', q: 'Put this call in the right order.', items: ['¡Hola, Mateo!', '¿Dónde está Sofía?', 'Está en Cartagena.', '¡Hasta luego, Mateo!'], why: 'People say hello first. Then there’s a question, then the answer. See you later comes last.' },
    ],
    credits: {
      /* Nobody has watched these. They're in for the owner to judge. See docs/rules/VIDEO-RULES.md. */
      videos: [
        { title: 'How to Pronounce the Spanish Vowels Like a Native Speaker (2:01 to 3:25)', by: 'Spring Spanish', url: 'https://www.youtube.com/watch?v=QubwkrC4UM4' },
        { title: 'Spanish Speaking Countries of the World (4:09 to 5:18)', by: 'Mi Camino Spanish', url: 'https://www.youtube.com/watch?v=aJr3nnnXqNg' },
        { title: 'Spanish Introductions and Greetings', by: 'Spanish Playground', url: 'https://www.youtube.com/watch?v=Dji9oiC8c3k' },
      ],
      deeper: [],
    },
  };
  /* Each line knows its own clip, so "Your turn" can start exactly when the voice stops. */
  episode.scenes.forEach((s) => s.beats.forEach((b, i) => { b.clip = `${s.id}-${i}`; }));
  (window.EPISODES = window.EPISODES || []).push(episode);

  const GOLD = '#FFC400', ME = '#7CD4FF', OTHER = '#FF9E7A';
  const ENGLISH = ['#FF8A80', '#8AB4FF', '#9BE7A8', '#E6A0FF'];
  const safe = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  /* [a] lights up a letter, {h} fades a silent letter, and <estoy> colors a whole word. */
  const spell = (s, color = GOLD) => safe(s.replace(/<(.+?)>/g, '\u0001$1\u0002'))
    .replace(/\[(.+?)\]/g, `<span style="color:${color}">$1</span>`)
    .replace(/\{(.+?)\}/g, '<span style="opacity:.25">$1</span>')
    .replace(/\u0001(.+?)\u0002/g, `<span style="color:${ME}">$1</span>`);
  /* Blue always means estoy, and orange always means está. */
  const verbs = (s) => safe(s).replace(/(^|[\s¡¿])(Estoy|estoy)/g, `$1<span style="color:${ME}">$2</span>`).replace(/(^|[\s¡¿])(Está|está)(?=[\s.,!?]|$)/g, `$1<span style="color:${OTHER}">$2</span>`);
  const seconds = (beat) => { try { const c = State.manifest[beat.clip]; if (c) return c.seconds; } catch (e) { /* The player isn't ready. */ } return (beat.say || '').split(' ').length / 2.6; };

  /* "Your turn": appears when the voice stops, with a bar that runs out across the silence. */
  function turnBar(box, place) {
    const { gsap } = window;
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;${place};width:560px;display:flex;align-items:center;gap:24px;opacity:0;z-index:3`;
    el.innerHTML = '<b style="flex:none;background:#FFC400;color:#17131F;font:800 46px var(--display);padding:12px 26px;border-radius:14px">Your turn</b><span style="flex:1;height:18px;border-radius:9px;background:#FFFFFF33;overflow:hidden;display:block"><i style="display:block;height:100%;background:#FFC400;transform-origin:0 50%"></i></span>';
    box.append(el);
    const fill = el.querySelector('i');
    return (beat) => {
      gsap.killTweensOf([el, fill]);
      if (!beat.turn) { gsap.set(el, { opacity: 0 }); return; }
      const wait = seconds(beat), hold = beat.hold ?? 2;
      gsap.set(fill, { scaleX: 1 });
      gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .25, delay: wait });
      gsap.to(fill, { scaleX: 0, duration: hold, delay: wait, ease: 'none' });
    };
  }
  /* A photo that fades to the next one, and drifts slowly while it's on screen. */
  function photoStack(holder, lib) {
    const { gsap } = window;
    let current = null, name = '';
    return (src, contain) => {
      if (!src || src === name) return;
      name = src;
      const img = document.createElement('img');
      img.src = lib.img(src); img.alt = '';
      img.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:${contain ? 'contain' : 'cover'};background:#FFF`;
      holder.append(img);
      if (current) { const old = current; gsap.to(old, { opacity: 0, duration: .5, onComplete: () => old.remove() }); }
      gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: .6 });
      if (!contain) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 7, ease: 'sine.out' });
      current = img;
    };
  }

  window.ART = Object.assign(window.ART || {}, {
    /* Hear it, then say it. A big word with its meaning, and a real photo when there's one to show. */
    spWord(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="spPic" style="position:absolute;right:0;top:0;width:880px;height:1080px;overflow:hidden;opacity:0;background:#000"></div>
        <div class="headline" style="left:96px;top:100px"></div>
        <div class="spW" style="position:absolute;left:96px;line-height:1.02;font-family:var(--display);font-weight:800;letter-spacing:-.03em"></div>
        <p class="spM" style="position:absolute;left:96px;margin:0;font:500 62px/1.15 var(--body)"></p>`;
      const pic = box.querySelector('.spPic'), w = box.querySelector('.spW'), m = box.querySelector('.spM'), head = box.querySelector('.headline');
      const show = photoStack(pic, lib);
      const barSide = turnBar(box, 'left:96px;top:720px'), barMid = turnBar(box, 'left:680px;top:760px');
      let last = null;
      return (i, beat) => {
        const wide = !beat.img, room = wide ? 1728 : 840, start = wide ? 300 : 190;
        pic.style.opacity = wide ? 0 : 1;
        if (beat.img) show(beat.img, beat.contain);
        head.style.cssText += `;width:${room}px;font-size:64px;text-align:${wide ? 'center' : 'left'}`;
        w.style.textAlign = m.style.textAlign = wide ? 'center' : 'left';
        w.style.width = m.style.width = `${room}px`;
        w.style.top = wide ? '280px' : '300px';
        if (beat.word !== last) {
          last = beat.word;
          w.innerHTML = spell(beat.word);
          w.style.whiteSpace = 'nowrap';
          let size = start;
          w.style.fontSize = `${size}px`;
          while (size > 80 && w.scrollWidth > room) { size -= 10; w.style.fontSize = `${size}px`; }
          gsap.fromTo(w, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power3.out' });
          lib.sfx.pop();
        }
        m.style.top = `${w.offsetTop + w.offsetHeight + 24}px`;
        m.textContent = beat.mean || '';
        if (beat.mean) gsap.fromTo(m, { opacity: 0 }, { opacity: 1, duration: .4 });
        (wide ? barMid : barSide)(beat);
      };
    },

    /* Two lists side by side. English letters change color because they change sound. Spanish stays gold. */
    spCols(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:90px;width:1728px"></div>
        <div class="spBig" style="position:absolute;inset:0;display:grid;place-items:center;font:800 620px/1 var(--display);color:${GOLD};padding-top:60px"></div>
        <div class="spSide" data-side="left" style="position:absolute;left:96px;top:250px;width:800px"></div>
        <div class="spSide" data-side="right" style="position:absolute;left:1000px;top:250px;width:824px"></div>`;
      const big = box.querySelector('.spBig'), bar = turnBar(box, 'left:680px;top:800px');
      const fill = (side, list, beat) => {
        const el = box.querySelector(`[data-side="${side}"]`), label = side === 'left' ? 'English' : 'Spanish';
        el.innerHTML = `<p class="pill" style="margin:0 0 18px">${label}</p>${list.map((word, k) => {
          const color = side === 'left' ? ENGLISH[k % ENGLISH.length] : GOLD;
          return `<div class="row" style="font:800 ${list.length > 3 ? 100 : 120}px/1.14 var(--display);letter-spacing:-.02em;opacity:0">${spell(word, color)}</div>`;
        }).join('')}`;
        gsap.to(el.querySelectorAll('.row'), { opacity: 1, duration: .25, delay: beat.delay || 0, stagger: { each: beat.stagger || .5, onStart: () => lib.sfx.pop() } });
      };
      return (i, beat) => {
        if (beat.big) { big.textContent = beat.big; gsap.fromTo(big, { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(1.6)' }); }
        if (beat.left || beat.right) gsap.to(big, { opacity: 0, duration: .2 });
        if (beat.left) fill('left', beat.left, beat);
        if (beat.right) fill('right', beat.right, beat);
        bar(beat);
      };
    },

    /* Hear a word with nothing to read, and clap if it has the sound. The word appears only afterward. */
    spClap(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:90px;width:1728px;text-align:center"></div>
        <div class="ring" style="position:absolute;left:660px;top:250px;width:600px;height:600px;border-radius:50%;background:#FFFFFF1F;box-shadow:inset 0 0 0 14px #FFFFFF55;display:grid;place-items:center;text-align:center">
          <div><div class="w" style="font:800 150px/1 var(--display);letter-spacing:-.02em">?</div><div class="v" style="font:700 56px/1.2 var(--body);margin-top:18px;opacity:0"></div></div>
        </div>`;
      const ring = box.querySelector('.ring'), w = box.querySelector('.w'), v = box.querySelector('.v');
      return (i, beat) => {
        if (!beat.word) return;
        gsap.killTweensOf([w, v]);
        w.textContent = '?'; gsap.set(v, { opacity: 0 });
        gsap.fromTo(ring, { scale: .94 }, { scale: 1, duration: .5, ease: 'back.out(3)' });
        gsap.delayedCall(seconds(beat) + 1.1, () => {
          w.innerHTML = spell(beat.word);
          v.textContent = beat.has ? 'Clap!' : 'No a. Stay still.';
          v.style.color = beat.has ? GOLD : '#FBFAFF';
          gsap.fromTo(w, { scale: .7 }, { scale: 1, duration: .3, ease: 'back.out(2)' });
          gsap.to(v, { opacity: 1, duration: .25 });
          if (beat.has) lib.sfx.ding(); else lib.sfx.pop();
        });
      };
    },

    /* A sentence on a real place. Each word sits over its meaning, and estoy and está keep their colors. */
    spSentence(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="spBack" style="position:absolute;inset:0;overflow:hidden"></div>
        <div class="scrim" style="position:absolute;inset:0;background:linear-gradient(180deg,#0008 0,#0000 30%,#000D 62%,#000F 100%)"></div>
        <div class="headline" style="left:96px;top:90px;width:1728px;color:#fff;text-shadow:0 4px 30px #000C"></div>
        <div class="chips" style="position:absolute;left:96px;right:96px;top:520px;display:flex;flex-wrap:wrap;gap:12px 44px;align-items:flex-start"></div>`;
      const chips = box.querySelector('.chips'), scrim = box.querySelector('.scrim'), show = photoStack(box.querySelector('.spBack'), lib), bar = turnBar(box, 'left:96px;top:400px');
      let sig = '';
      const isVerb = (word) => /^[¿¡]?(Estoy|estoy|Está|está)$/.test(word);
      return (i, beat) => {
        if (beat.img) show(beat.img);
        scrim.style.opacity = beat.img ? 1 : 0;
        const now = JSON.stringify([beat.es, !!beat.gap]);
        if (now !== sig) {
          sig = now;
          chips.innerHTML = beat.es.map(([word, gloss]) => {
            const verb = isVerb(word), hide = beat.gap && verb, color = /stoy/.test(word) ? ME : OTHER;
            return `<div class="chip1" style="display:grid;gap:6px;opacity:0"><span style="font:800 124px/1.05 var(--display);letter-spacing:-.02em;color:${verb ? color : '#FBFAFF'}">${hide ? '<span style="display:inline-block;width:320px;border-bottom:12px solid #FBFAFF;height:90px"></span>' : safe(word)}</span><span class="gl" style="font:600 50px/1.1 var(--body);color:#FBFAFF;opacity:0">${safe(gloss || '')}</span></div>`;
          }).join('');
          gsap.to(chips.querySelectorAll('.chip1'), { opacity: 1, duration: .3, stagger: .22, delay: beat.parts && !beat.gap ? Math.max(0, seconds(beat) - 2.4) : 0 });
          lib.sfx.pop();
        }
        if (beat.gloss) gsap.to(chips.querySelectorAll('.gl'), { opacity: 1, duration: .4, stagger: .15, delay: beat.turn ? .2 : .6 });
        bar(beat);
      };
    },

    /* Punctuation that really moves: the mark turns over and travels to the front. */
    spMarks(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div style="position:absolute;left:60px;right:60px;top:280px;text-align:center;white-space:nowrap;font:800 190px/1.1 var(--display);letter-spacing:-.03em"><span class="a" style="display:inline-block;color:${GOLD}"></span><span class="b"></span><span class="c" style="display:inline-block;color:${GOLD}"></span></div>
        <p class="spM" style="position:absolute;left:96px;right:96px;top:540px;margin:0;text-align:center;font:500 62px/1.15 var(--body)"></p>`;
      const a = box.querySelector('.a'), b = box.querySelector('.b'), c = box.querySelector('.c'), m = box.querySelector('.spM'), bar = turnBar(box, 'left:680px;top:700px');
      return (i, beat) => {
        const [open, word, close] = beat.chars;
        a.textContent = open; b.innerHTML = verbs(word); c.textContent = close;
        m.textContent = beat.mean || '';
        if (beat.flipped) gsap.set(a, { opacity: 1, x: 0, rotation: 0 });
        else if (beat.flip) { lib.sfx.pop(); gsap.fromTo(a, { opacity: 1, x: c.offsetLeft - a.offsetLeft, rotation: 180 }, { x: 0, rotation: 0, duration: 1.5, delay: 1.2, ease: 'power2.inOut' }); }
        else gsap.set(a, { opacity: 0 });
        bar(beat);
      };
    },

    /* Point at yourself, or point away. The whole screen takes the word's color: blue for estoy, orange for está. */
    spTry(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="wash" style="position:absolute;inset:0;background:#0F766E"></div>
        <p class="pill tag" style="position:absolute;left:96px;top:80px;margin:0;color:#FBFAFF">Try it now</p>
        <div style="position:absolute;left:96px;right:96px;top:250px;text-align:center"><div class="w" style="font:800 190px/1.02 var(--display);letter-spacing:-.03em;color:#FBFAFF"></div><div class="a" style="font:800 100px/1.1 var(--display);margin-top:44px"></div></div>`;
      const wash = box.querySelector('.wash'), w = box.querySelector('.w'), a = box.querySelector('.a'), tag = box.querySelector('.tag');
      return (i, beat) => {
        gsap.killTweensOf([a, wash]);
        if (beat.intro) { w.textContent = beat.act; a.textContent = ''; return; }
        w.textContent = beat.word;
        w.style.color = a.style.color = tag.style.color = '#17131F';
        gsap.to(wash, { backgroundColor: beat.c, duration: .2 });
        a.textContent = beat.act;
        gsap.set(a, { opacity: 0 });
        lib.sfx.pop();
        gsap.to(a, { opacity: 1, duration: .25, delay: Math.min(seconds(beat), 1.6) + .3 });
      };
    },

    /* Listen, decide, then see the answer on the place itself. */
    spPick(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="spBack" style="position:absolute;inset:0;overflow:hidden"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#000A 0,#0006 45%,#000C 100%)"></div>
        <div class="headline" style="left:96px;top:90px;width:1728px;text-align:center;color:#fff"></div>
        <div class="line" style="position:absolute;left:96px;right:96px;top:240px;text-align:center;font:800 110px/1.08 var(--display);letter-spacing:-.02em;text-shadow:0 4px 30px #000C"></div>
        ${[['Estoy', 'I am', ME], ['Está', 'she, he, it is', OTHER]].map(([v, m, c], k) => `<div class="card" data-k="${k}" style="position:absolute;left:${k ? 990 : 96}px;top:540px;width:834px;height:300px;border-radius:24px;background:#17131FDD;box-shadow:inset 0 0 0 8px ${c};display:grid;place-content:center;text-align:center"><b style="font:800 110px/1 var(--display);color:${c}">${v}</b><span style="font:600 56px/1.2 var(--body);color:#FBFAFF;margin-top:12px">${m}</span></div>`).join('')}`;
      const line = box.querySelector('.line'), head = box.querySelector('.headline'), cards = [...box.querySelectorAll('.card')], show = photoStack(box.querySelector('.spBack'), lib), bar = turnBar(box, 'left:680px;top:430px');
      return (i, beat) => {
        if (beat.answer == null) {
          line.textContent = '';
          gsap.set(cards, { opacity: 1, scale: 1 });
        } else {
          show(beat.img);
          head.textContent = '';
          line.innerHTML = verbs(beat.line);
          gsap.fromTo(line, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .45 });
          cards.forEach((c, k) => gsap.to(c, { opacity: k === beat.answer ? 1 : .25, scale: k === beat.answer ? 1.03 : 1, duration: .35 }));
          lib.sfx.ding();
        }
        bar(beat);
      };
    },

    /* The verb so far, as a still page to read. */
    spPage(box, lib) {
      const { gsap } = window;
      box.innerHTML = '<div class="headline" style="left:96px;top:90px"></div><div class="rows" style="position:absolute;left:96px;right:96px;top:250px;display:grid;gap:26px"></div>';
      const rows = box.querySelector('.rows');
      return (i, beat) => {
        const color = { estoy: ME, 'está': OTHER, estar: GOLD };
        rows.innerHTML = beat.rows.map(([es, en, eg]) => `<div class="r" style="display:grid;grid-template-columns:480px 620px 1fr;align-items:center;gap:30px;background:#262033;border-radius:22px;padding:26px 40px;opacity:0"><b style="font:800 104px/1 var(--display);color:${color[es]}">${safe(es)}</b><span style="font:700 60px/1.1 var(--body)">${safe(en)}</span><span style="font:500 50px/1.1 var(--body);color:#C9C4D6">${safe(eg)}</span></div>`).join('');
        gsap.to(rows.querySelectorAll('.r'), { opacity: 1, duration: .4, stagger: 1.7, delay: 1.5, onStart: () => lib.sfx.pop() });
      };
    },

    /* A video call: each person is in their own real place. Ana on the left, Mateo on the right. */
    spCall(box, lib) {
      const { gsap } = window;
      const people = [['Ana', 'in Bogotá', 'colombia-bogota.jpg'], ['Mateo', 'in Mexico', 'spanish-zocalo.jpg']];
      box.innerHTML = people.map(([name, place, img], k) => `<div class="side" data-k="${k}" style="position:absolute;left:${k * 960}px;top:0;width:960px;height:1080px;overflow:hidden;box-shadow:inset 0 0 0 0 ${GOLD}">
          <img src="${lib.img(img)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
          <div class="shade" style="position:absolute;inset:0;background:#0009"></div>
          <div style="position:absolute;left:56px;top:56px;background:#17131FCC;color:#FBFAFF;padding:14px 30px;border-radius:16px;display:flex;gap:18px;align-items:baseline"><b style="font:800 66px/1 var(--display)">${name}</b><span style="font:600 42px/1 var(--body)">${place}</span></div>
          <div class="say" style="position:absolute;left:56px;right:56px;top:280px;background:#FBFAFF;color:#17131F;border-radius:30px;padding:36px 44px;opacity:0"><div class="es" style="font:800 80px/1.08 var(--display);letter-spacing:-.02em"></div><div class="en" style="font:500 44px/1.2 var(--body);margin-top:16px;color:#4A4458"></div></div>
        </div>`).join('');
      const sides = [...box.querySelectorAll('.side')], bar = turnBar(box, 'left:1016px;top:720px');
      return (i, beat) => {
        bar(beat);
        if (beat.who == null) return;
        sides.forEach((s, k) => gsap.to(s.querySelector('.shade'), { opacity: k === beat.who ? .35 : 1, duration: .3 }));
        const s = sides[beat.who], card = s.querySelector('.say'), es = s.querySelector('.es'), en = s.querySelector('.en');
        if (beat.mine) {
          es.textContent = '…'; es.style.color = '#17131F';
          en.textContent = `Say: ${beat.mine}`;
        } else {
          es.innerHTML = safe(beat.line).replace(/(Estoy|estoy)/, '<span style="color:#0B6FA8">$1</span>').replace(/(Está|está)/, '<span style="color:#C2410C">$1</span>');
          en.textContent = beat.en;
        }
        gsap.fromTo(card, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .35, ease: 'power3.out' });
        lib.sfx.pop();
      };
    },

    /* The room with the booth windows marked, so it can't be read as an empty classroom. The frames light up when the voice reaches the booths. */
    spBooths(box, lib) {
      const { gsap } = window;
      const credit = typeof State !== 'undefined' && State.credits['spanish-booths'];
      const tagText = `background:${GOLD};color:#17131F;font:800 52px/1 var(--display);letter-spacing:-.02em;padding:16px 30px;border-radius:16px;white-space:nowrap;position:absolute`;
      /* Each label appears as the voice names that thing, and points at it in the photo. */
      box.innerHTML = `<div class="spRoom" style="position:absolute;inset:0;transform-origin:60% 40%">
          <img src="${lib.img('spanish-booths.jpg')}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
        </div>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#000C 0,#0000 24%,#0000 72%,#000B 100%)"></div>
        <div class="headline" style="left:96px;top:60px;width:1400px;color:#fff;text-shadow:0 4px 30px #000C"></div>
        <div class="spTag" data-at=".42" style="position:absolute;inset:0;pointer-events:none">
          <span style="position:absolute;left:1200px;top:610px;width:10px;height:90px;background:${GOLD}"></span>
          <b style="${tagText};left:980px;top:700px">The interpreters</b>
        </div>
        <div class="spTag" data-at=".62" style="position:absolute;inset:0;pointer-events:none">
          <span style="position:absolute;left:1130px;top:300px;width:10px;height:60px;background:${GOLD}"></span>
          <b style="${tagText};left:980px;top:222px">The meeting</b>
        </div>
        ${credit ? `<p class="credit">${safe(credit.author.slice(0, 50))} · ${safe(credit.license)}</p>` : ''}`;
      const room = box.querySelector('.spRoom'), tags = box.querySelectorAll('.spTag');
      return (i, beat) => {
        gsap.fromTo(room, { scale: 1.05 }, { scale: 1, duration: 9, ease: 'sine.out' });
        tags.forEach((tag) => gsap.fromTo(tag, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .4, delay: seconds(beat) * +tag.dataset.at, onStart: () => lib.sfx.pop() }));
      };
    },

    /* You are here: the unit's lessons, with this one lit up. */
    spJourney(box, lib) {
      const { gsap } = window;
      const LESSONS = (window.CURRICULUM?.unitLessons?.['Identity: estar and ser'] || []).map((l) => l[0]);
      box.innerHTML = `<h1 class="big" style="position:absolute;left:96px;top:90px;margin:0">Identity: 6 lessons</h1>
        <ol style="position:absolute;left:96px;right:96px;top:250px;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">${LESSONS.map((t, k) => `<li class="spStop" style="background:${k ? '#FFFFFF14' : GOLD};color:${k ? '#FBFAFF' : '#17131F'};border-radius:24px;padding:34px 34px;min-height:290px"><b style="display:block;font:800 92px/1 var(--display)">${k + 1}</b><span style="display:block;font:700 46px/1.12 var(--display);margin-top:16px">${safe(t)}</span>${k ? '' : '<strong style="display:block;font:800 38px/1.1 var(--body);margin-top:14px;background:#17131F;color:#FFC400;width:max-content;padding:6px 16px;border-radius:10px">You are here</strong>'}</li>`).join('')}</ol>`;
      return () => { gsap.fromTo(box.querySelectorAll('.spStop'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .12, ease: 'power3.out' }); };
    },

    /* Hear English, say it in Spanish, then check. */
    spInterp(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<p class="pill tag" style="position:absolute;left:96px;top:80px;margin:0">Interpreter</p>
        <div style="position:absolute;left:96px;top:190px;width:1728px"><div class="who" style="font:700 44px var(--body);color:#C9C4D6">Lucía says</div><div class="en" style="font:800 92px/1.08 var(--display);letter-spacing:-.02em;margin-top:14px"></div></div>
        <div class="es" style="position:absolute;left:96px;top:540px;width:1728px;font:800 104px/1.1 var(--display);letter-spacing:-.02em;color:${GOLD}"></div>`;
      const en = box.querySelector('.en'), es = box.querySelector('.es'), tag = box.querySelector('.tag'), who = box.querySelector('.who'), bar = turnBar(box, 'left:96px;top:430px');
      return (i, beat) => {
        bar(beat);
        who.style.opacity = beat.step === 'intro' ? 0 : 1;
        if (beat.step === 'intro') { en.textContent = 'Lucía needs an interpreter.'; return; }
        tag.textContent = `Interpreter · ${beat.n} of 3`;
        en.textContent = beat.line;
        if (beat.step === 'ask') { es.textContent = ''; gsap.fromTo(en, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }); lib.sfx.pop(); }
        if (beat.step === 'show') { es.innerHTML = verbs(beat.es); gsap.fromTo(es, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }); lib.sfx.ding(); }
      };
    },
  });
})();
