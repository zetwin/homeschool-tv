/* Colombia, Lesson 1 of 8. Geography. Follows England's KS2 aim to locate countries in North and South America, and Colombia's grade 5 Learning Rights on regions, oceans and thermal floors.
   The six named regions are extra detail. It isn't an Oak unit. Scene ids start with co- because voice clips share one folder. */
(window.EPISODES = window.EPISODES || []).push({
  id: 'colombia',
  subjectStart: false,
  extra: true,
  number: 1,
  subject: 'Geography',
  unit: 'Colombia',
  title: 'Colombia: One Country, Six Regions',
  topic: 'Colombia’s regions',
  series: 'Geography · Colombia',
  lessonLabel: 'Lesson 1 of 8',
  blurb: 'Where Colombia is, its two coasts, the six regions Colombians often describe, and how climbing a mountain changes the climate.',
  hero: 'colombia-cover.jpg',
  heroAlt: 'Six photos, one from each of Colombia’s regions',
  heroPos: '50% 50%',
  builder: 'plate',
  builderImg: 'colombia-regions-map.jpg',
  builderLabel: 'Fill in the map of Colombia',
  builderDone: 'Your map of Colombia',
  fullScore: 'The whole map is filled in!',
  scenes: [
    { id: 'co-greet', part: 'greet', chapter: 'Intro', type: 'statement', bg: '#4D7C0F', beats: [ { say: 'Hello, and welcome to Geography! This is Lesson 1 of our series on Colombia.', text: 'Welcome to *Geography*' }, { say: 'Today, we’re exploring Colombia: where it is, its six very different regions, and why higher means colder. Geography helps you understand any place you’ll ever visit.', text: 'Today: Colombia’s *six regions*', hold: 0.4 } ] },
    { id: 'co-known', part: 'known', chapter: 'Intro', type: 'statement', bg: '#0F766E', beats: [
      { say: 'You may already know a little about Colombia. Its main language is Spanish, and you already understand Spanish.', text: 'Colombia speaks *Spanish*' },
      { say: 'Shout it out: which continent is Colombia on?', text: 'Which *continent*?', hold: 3 },
      { say: 'South America! If you didn’t know, that’s fine. That’s what today is for.', text: '*South America*' },
    ] },
    { id: 'co-unit', part: 'unit', chapter: 'Intro', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'This is a new series: Colombia, in eight lessons. We’ll visit its regions, its mountains, its people and its food.', text: 'New series: *Colombia*' },
      { say: 'And you’ll learn how geography works anywhere: maps, climate, and how people live.', text: 'Maps, climate, *people*' },
    ] },
    { id: 'co-hook', part: 'hook', chapter: 'Intro', type: 'art', art: 'postcards', layout: 'full', bg: '#17131F', poster: 'colombia-cover.jpg', beats: [
      { say: 'Picture Colombia. What do you see?', text: 'Picture Colombia.', hold: 1 },
      { say: 'Rainforest? You’re right.', text: 'Rainforest?', show: 0 },
      { say: 'A desert by the sea? Also right.', text: 'A desert by the sea?', show: 1 },
      { say: 'A busy modern city, high in the mountains? Right again.', text: 'A city in the mountains?', show: 2 },
      { say: 'Beaches on two different coasts? Yes.', text: 'Two different coasts?', show: 3 },
      { say: 'Lots of people think a country is one kind of place. Colombia is all of these.', text: 'One country. All of these.', show: 4 },
    ] },
    { id: 'co-title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Geography · Lesson 1 of 8', title: '*Colombia:* One Country, Six Regions', img: 'colombia-regions-map.jpg', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'This is Colombia. One country, six regions.', hold: 0.8 },
    ] },
    { id: 'co-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#0F766E', heading: 'Today, you’ll be able to', items: ['Find Colombia on a map', 'Name its six regions', 'Explain why higher means colder'], beats: [
      { say: 'Today, you’ll be able to find Colombia on a map, name its six regions, and explain why higher means colder.' },
      { say: 'Why does it matter? You’ll see how one country can feel like many different places.', hold: 0.4 },
    ] },

    { id: 'co-ch1', chapter: 'Where it is', type: 'chapter', n: 1, title: 'Where is Colombia?', bg: '#D42A20', poster: 'colombia-south-america.jpg', beats: [
      { say: 'Chapter one. Where is Colombia?' },
    ] },
    { id: 'co-map', chapter: 'Where it is', type: 'atlas', bg: '#FFFFFF', img: 'colombia-south-america.jpg', ratio: 1091 / 1600, plate: 'Map · South America', beats: [
      { say: 'Colombia sits in the top left corner of South America.', mark: [27, 24], zoom: 1.5, name: 'Colombia', fact: 'The northwest corner of South America' },
      { say: 'It has five neighbors: Panama, Venezuela, Brazil, Peru and Ecuador.', mark: [27, 24], zoom: 1.35, name: 'Five neighbors', fact: 'Panama, Venezuela, Brazil, Peru and Ecuador', count: '5' },
      { say: 'The line around the middle of the Earth, the Equator, runs through its south.', mark: [27, 28.4], zoom: 1.9, name: 'The Equator', fact: 'The middle of the Earth runs through southern Colombia' },
    ] },
    { id: 'co-guess-coast', chapter: 'Where it is', type: 'guess', bg: '#1D4ED8', question: 'Colombia has coasts on which sea and which ocean?', options: ['Caribbean Sea and Pacific Ocean', 'Only the Pacific Ocean', 'Only the Caribbean Sea', 'Indian Ocean and Pacific Ocean'], answer: 0, img: 'colombia-cartagena.jpg', imgCaption: 'Cartagena, on the Caribbean coast', beats: [
      { say: 'Quick question. Colombia has coasts on which sea and which ocean?', step: 'ask' },
      { say: 'Shout your answer now!', step: 'count', hold: 5 },
      { say: 'The Caribbean Sea and the Pacific Ocean! It’s the only country in South America with coasts on both.', step: 'reveal' },
      { say: 'This is Cartagena, on the Caribbean side.', step: 'image', hold: 0.5 },
    ] },
    { id: 'co-count', chapter: 'Where it is', type: 'number', flip: true, bg: '#17131F', img: 'colombia-bogota.jpg', beats: [
      { say: 'About 53 million people live in Colombia, and Spanish is the main language.', speak: 'About fifty-three million people live in Colombia, and Spanish is the main language.', from: 0, to: 53, sub: 'million people, about' },
      { say: 'The capital is Bogotá, a big modern city about 2,600 meters up in the mountains.', speak: 'The capital is Bogotá, a big modern city about two thousand six hundred meters up in the mountains.', from: 53, to: 2600, sub: 'meters up: Bogotá, the capital' },
    ] },
    { id: 'co-named', chapter: 'Where it is', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Where does the name come from? Colombia is named after Christopher Columbus, the explorer.', text: 'Named after *Columbus*' },
      { say: 'In Italian, his name was Colombo. So Colombia has two Os and no U: C, O, L, O, M, B, I, A.', text: 'Spelled C-*O*-L-*O*-M-B-I-A' },
    ] },

    { id: 'co-ch2', chapter: 'Six regions', type: 'chapter', n: 2, title: 'Six regions', look: 'split', bg: '#0F766E', poster: 'colombia-regions-map.jpg', hasVideo: true, beats: [
      { say: 'Chapter two. Colombians often divide their country into six regions. Let’s visit each one.' },
    ] },
    { id: 'co-regions', chapter: 'Six regions', type: 'art', art: 'regionTour', layout: 'full', bg: '#17131F', beats: [
      { say: 'In the north is the Caribbean region: hot beaches, an old walled city called Cartagena, and even a desert, in La Guajira, home of the Wayuu people.', text: 'Caribbean', region: 0 },
      { say: 'In the west is the Pacific region: thick rainforest and one of the rainiest places on Earth. Many Afro-Colombians live here, whose ancestors were brought from Africa by force. Humpback whales visit too.', text: 'Pacific', region: 1 },
      { say: 'Through the middle, the Andes mountains split into three ranges. This is the Andean region, with coffee farms and big cities like Bogotá, Medellín and Cali.', text: 'Andean', region: 2 },
      { say: 'In the east is the Orinoquía: huge grassy plains called the Llanos, with many cattle ranches.', speak: 'In the east is the Orinoquia: huge grassy plains called the Yah-nos, with many cattle ranches.', text: 'Orinoquía', region: 3 },
      { say: 'In the south is the Amazon: rainforest and great rivers, and home to many Indigenous peoples today.', text: 'Amazon', region: 4 },
      { say: 'And out at sea are the islands of the Insular region, like San Andrés, far out in the Caribbean, with coral reefs nearby.', speak: 'And out at sea are the islands of the Insular region, like San Andres, far out in the Caribbean, with coral reefs nearby.', text: 'Insular', region: 5 },
    ] },
    { id: 'co-video-regions', use: 'support', status: 'candidate', chapter: 'Six regions', type: 'video', bg: '#17131F', youtube: 'rTsPaAIJdnw', start: 239, end: 397, videoTitle: 'Colombia’s regions on film', channel: 'Geography Now', watchFor: 'Look for the regions you just met', still: 'colombia-andes.jpg', beats: [
      { say: 'Now let’s see these regions on film. Look for the ones you just met.' },
    ] },
    { id: 'co-after-video-regions', afterVideo: true, chapter: 'Six regions', type: 'statement', bg: '#0F766E', beats: [
      { say: 'Did you spot them? Six regions, all in one country.', text: 'Six regions, *one country*' },
    ] },
    { id: 'co-where', chapter: 'Six regions', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'The Orinoquía and the Amazon cover nearly two thirds of the land, but few people live there.', text: 'Nearly *two thirds* of the land' },
      { say: 'Far more Colombians live in the Andes and on the Caribbean coast.', text: 'More people: *Andes and Caribbean*' },
    ] },
    { id: 'co-regions-recap', chapter: 'Six regions', type: 'recap', bg: '#17131F', heading: 'Six regions', items: ['Caribbean', 'Pacific', 'Andean', 'Orinoquía', 'Amazon', 'Insular'], beats: [
      { say: 'Caribbean. Pacific. Andean. Orinoquía. Amazon. Insular. Say them with me.', hold: 1.5 },
    ] },

    { id: 'co-ch3', chapter: 'Climbing the climate', type: 'chapter', n: 3, title: 'Higher means colder', look: 'left', bg: '#1D4ED8', poster: 'colombia-peak.jpg', beats: [
      { say: 'Chapter three. The Equator runs through Colombia, so shouldn’t it be hot everywhere?' },
    ] },
    { id: 'co-floors', chapter: 'Climbing the climate', type: 'art', art: 'thermalFloors', layout: 'full', bg: '#17131F', beats: [
      { say: 'No. The higher you climb, the colder it gets. Colombians call these layers pisos térmicos, or thermal floors.', speak: 'No. The higher you climb, the colder it gets. Colombians call these layers peesos tehrmeecos, or thermal floors.', text: 'Higher means colder', floor: -1 },
      { say: 'Below about 1,000 meters it’s hot, good for bananas.', speak: 'Below about one thousand meters it’s hot, good for bananas.', text: 'Hot: under about 1,000 m', floor: 0 },
      { say: 'Climb to about 2,000 meters and it’s mild. Coffee grows well here.', speak: 'Climb to about two thousand meters and it’s mild. Coffee grows well here.', text: 'Mild: about 1,000 to 2,000 m', floor: 1 },
      { say: 'Up to about 3,000 meters it’s cold. Bogotá is here, and farmers grow potatoes.', speak: 'Up to about three thousand meters it’s cold. Bogotá is here, and farmers grow potatoes.', text: 'Cold: about 2,000 to 3,000 m', floor: 2 },
      { say: 'Higher still is the páramo: misty, chilly grassland, with strange furry plants called frailejones.', speak: 'Higher still is the pahramo: misty, chilly grassland, with strange furry plants called fry-lay-HOH-ness.', text: 'Páramo: above about 3,000 m', floor: 3 },
      { say: 'And on a few of the highest peaks, there’s snow all year.', text: 'Snow: only the highest peaks', floor: 4 },
    ] },
    { id: 'co-guess-floor', chapter: 'Climbing the climate', type: 'guess', bg: '#D42A20', question: 'Where would you most likely find coffee farms?', options: ['At the snowy peaks', 'On the mild mountain slopes', 'Under the sea', 'On the highest páramo'], answer: 1, img: 'colombia-andes.jpg', imgCaption: 'Mountain slopes in the Andean region', beats: [
      { say: 'So where would you most likely find coffee farms?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 4 },
      { say: 'On the mild mountain slopes, about 1,000 to 2,000 meters up.', speak: 'On the mild mountain slopes, about one to two thousand meters up.', step: 'reveal' },
      { say: 'One mountain can give you bananas at the bottom, and potatoes further up.', step: 'image', hold: 0.5 },
    ] },

    { id: 'co-ch4', chapter: 'Amazing places', type: 'chapter', n: 4, title: 'Birds, giant palms and a red river', look: 'full', hasVideo: true, bg: '#7E22CE', poster: 'colombia-cano.jpg', beats: [
      { say: 'Chapter four. All these different places create some amazing things.' },
    ] },
    { id: 'co-birds', chapter: 'Amazing places', type: 'number', bg: '#0F766E', img: 'colombia-bird.jpg', beats: [
      { say: 'So many kinds of home mean so many kinds of life. Colombia has more than 1,800 kinds of bird, the most of any country in recent counts.', speak: 'So many kinds of home mean so many kinds of life. Colombia has more than eighteen hundred kinds of bird, the most of any country in recent counts.', from: 0, to: 1800, sub: 'kinds of bird, at least' },
    ] },
    { id: 'co-video-wild', use: 'break', status: 'candidate', chapter: 'Amazing places', type: 'video', bg: '#17131F', youtube: 'BASbIdt6p1I', start: 0, end: 150, videoTitle: 'Wild Colombia', channel: 'Free Documentary', watchFor: 'Look for an animal you’ve never seen before', still: 'colombia-bird.jpg', beats: [
      { say: 'Let’s see some of Colombia’s wild places on film. Look for an animal you’ve never seen before.' },
    ] },
    { id: 'co-after-video-wild', afterVideo: true, chapter: 'Amazing places', type: 'statement', bg: '#0F766E', beats: [
      { say: 'Did you see an animal you didn’t know? Colombia is full of them.', text: 'So many *animals*' },
    ] },
    { id: 'co-palm', chapter: 'Amazing places', type: 'photo', bg: '#0C0A10', img: 'colombia-cocora.jpg', beats: [
      { say: 'This is the wax palm, Colombia’s national tree.', text: 'The wax palm', focus: [50, 45, 1.1] },
      { say: 'It’s one of the tallest palms in the world, and can reach about 60 meters. It grows high in the Andes.', speak: 'It’s one of the tallest palms in the world, and can reach about sixty meters. It grows high in the Andes.', text: 'Up to about *60 meters*', focus: [55, 30, 1.35] },
    ] },
    { id: 'co-river', chapter: 'Amazing places', type: 'photo', bg: '#0C0A10', img: 'colombia-cano.jpg', beats: [
      { say: 'And this river is Caño Cristales. Those colors are real.', speak: 'And this river is Cahnyo Cristahles. Those colors are real.', text: 'Caño Cristales', focus: [50, 50, 1.08] },
      { say: 'A water plant turns it green, yellow and shades of red, and the colors change with the rains.', text: 'Colors from a *water plant*', focus: [45, 55, 1.3] },
    ] },

    { id: 'co-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Remember the start? Rainforest, desert, mountains and two coasts. Colombia is all of them, in six regions.', text: 'One country, *six regions*' },
    ] },
    { id: 'co-recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#0F766E', heading: 'What we learned', items: ['Top left of South America', 'Caribbean and Pacific coasts', 'Six regions', 'Higher means colder'], beats: [
      { say: 'Let’s lock it in. Colombia is in the top left of South America. It has Caribbean and Pacific coasts. People often describe six regions. And the higher you climb, the colder it gets.' },
    ] },
    { id: 'co-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Next lesson: why is it cold near the Equator? We’ll climb from the sea to the snow.', text: 'Next time: *sea to snow*', hold: 0.4 },
      { say: 'But first, take the test.', text: 'Now, *the test*', hold: 0.4 },
    ] },
  ],
  starter: [
    { type: 'radio', q: 'Which continent is Colombia in?', o: ['South America', 'Africa', 'Europe'], a: 0, why: 'Colombia is in South America.' },
    { type: 'radio', q: 'What is the Equator?', o: ['An imaginary line around the middle of the Earth', 'A river in Africa', 'A very tall mountain'], a: 0, why: 'It’s an imaginary line around the middle of the Earth.' },
    { type: 'radio', q: 'As you climb a high mountain, the air usually gets…', o: ['Colder', 'Hotter', 'Saltier'], a: 0, why: 'High places are usually colder. You’ll see why that matters today.' },
  ],
  test: [
    { type: 'region', map: 'colombia', q: 'Tap the Andean region.', a: 'andean', why: 'The Andes split into three ranges and run through the middle of Colombia.' },
    { type: 'gaps', img: 'colombia-cartagena.jpg', q: 'Finish the sentence.', text: 'Colombia has coasts on the {0} and the {1}.', bank: ['Caribbean Sea', 'Pacific Ocean', 'Mediterranean Sea', 'Indian Ocean'], a: ['Caribbean Sea', 'Pacific Ocean'], any: true, why: 'It’s the only country in South America with coasts on both.' },
    { type: 'checkbox', img: 'colombia-south-america.jpg', q: 'Which of these countries share a border with Colombia? Tick them all.', o: ['Brazil', 'Peru', 'Venezuela', 'Argentina', 'Chile', 'Mexico'], a: [0, 1, 2], why: 'Brazil, Peru and Venezuela do. Colombia’s other two neighbors are Panama and Ecuador.' },
    { type: 'word', img: 'colombia-bogota.jpg', q: 'What is the capital city of Colombia?', a: ['bogota', 'bogotá'], placeholder: 'Type the city', why: 'The capital is Bogotá.' },
    { type: 'match', q: 'Connect each photo to its region.', pairs: [[{ img: 'colombia-guajira.jpg', t: 'Sand and sea' }, 'Caribbean'], [{ img: 'colombia-llanos.jpg', t: 'Wide, flat plains' }, 'Orinoquía'], [{ img: 'colombia-andes.jpg', t: 'Green mountain farms' }, 'Andean'], [{ img: 'colombia-amazon.jpg', t: 'Rainforest and river' }, 'Amazon']], why: 'A desert coast, grassy plains, coffee slopes, and rainforest with great rivers.' },
    { type: 'sort', q: 'Which of these are regions of Colombia?', bins: ['Regions of Colombia', 'Not in Colombia'], items: [{ t: 'Pacific', bin: 0 }, { t: 'Sahara', bin: 1 }, { t: 'Andean', bin: 0 }, { t: 'Alps', bin: 1 }, { t: 'Caribbean', bin: 0 }], why: 'The six are Caribbean, Pacific, Andean, Orinoquía, Amazon and Insular. The Sahara is in Africa, and the Alps are in Europe.' },
    { type: 'truefalse', img: 'colombia-llanos.jpg', q: 'True or false?', rows: [['Few people live in the Amazon region, compared with the Andes.', true], ['The Equator runs through southern Colombia.', true], ['All of Colombia is hot, because it’s near the Equator.', false]], why: 'Far more people live in the Andes and on the Caribbean coast, and high places are cold.' },
    { type: 'order', q: 'Put these in order, from the lowest up to the highest.', items: ['Hot land with bananas', 'Mild slopes with coffee', 'Cold land with potatoes', 'Misty páramo', 'Snowy peaks'], colors: ['#2E9E4F', '#6DAA3A', '#9C8B4A', '#8C8F7A', '#DCE6F5'], why: 'The higher you climb, the colder it gets.' },
    { type: 'radio', img: 'colombia-bogota.jpg', q: 'Why is it colder in Bogotá than on the Caribbean coast?', o: ['It’s much higher up', 'It’s further from the Equator', 'It has more people', 'It’s closer to Brazil'], a: 0, why: 'Bogotá is about 2,600 meters up, and high places are colder.' },
    { type: 'estimate', picture: 'mountain', q: 'About how high up is Bogotá? Move the line on the mountain.', min: 0, max: 5000, step: 100, unit: 'm', a: 2600, tol: 300, why: 'It’s about 2,600 meters up.' },
    { type: 'radio', img: 'colombia-cano.jpg', q: 'What gives the river Caño Cristales its colors?', o: ['A water plant', 'Paint from factories', 'Colored sand from the sea', 'Rainbows'], a: 0, why: 'A water plant makes the green, yellow and red colors.' },
    { type: 'region', map: 'colombia', q: 'Tap the region with the huge grassy plains called the Llanos.', a: 'orinoquia', why: 'The Llanos are in the Orinoquía, in the east.' },
  ],
  credits: {
    /* Removed after review. New videos go in once a person has watched them: see docs/rules/VIDEO-RULES.md. */
    videos: [
      { title: 'Geography Now! Colombia', by: 'Geography Now', url: 'https://www.youtube.com/watch?v=rTsPaAIJdnw' },
      { title: 'Wild Colombia Revealed', by: 'Free Documentary - Nature', url: 'https://www.youtube.com/watch?v=BASbIdt6p1I' },
    ],
    deeper: [],
  },
});

window.ART = Object.assign(window.ART || {}, {
  /* Real places, one after another, to answer "what does Colombia look like?" */
  postcards(box, lib) {
    const { gsap } = window;
    const pics = [['colombia-amazon.jpg', 'Amazon', 700, 150, -5], ['colombia-guajira.jpg', 'La Guajira', 1180, 120, 4], ['colombia-bogota.jpg', 'Bogotá', 690, 500, 3], ['colombia-cartagena.jpg', 'Cartagena', 1190, 490, -4]];
    box.innerHTML = `<div class="headline" style="left:96px;top:380px;width:560px;font-size:84px"></div>
      ${pics.map(([src, name, x, y, r], i) => `<figure class="pc" data-i="${i}" style="position:absolute;left:${x}px;top:${y}px;width:480px;height:330px;margin:0;opacity:0;transform:rotate(${r}deg);background:#fff;padding:10px 10px 44px;box-shadow:0 24px 60px #000A"><img src="${lib.img(src)}" alt="${name}" style="width:100%;height:100%;object-fit:cover;display:block"><figcaption style="color:#17131F;font:700 26px var(--body);padding-top:5px">${name}</figcaption></figure>`).join('')}`;
    const cards = [...box.querySelectorAll('.pc')];
    return (i, beat) => {
      if (beat.show != null && cards[beat.show]) { lib.sfx.pop(); gsap.fromTo(cards[beat.show], { opacity: 0, scale: 1.5, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: .45, ease: 'power3.out' }); }
      if (beat.show === 4) gsap.to(cards, { scale: 1.03, duration: .5, stagger: .06, yoyo: true, repeat: 1, ease: 'sine.inOut' });
    };
  },

  /* One region at a time: a large real photo, with the map showing where it is. */
  regionTour(box, lib) {
    const { gsap } = window;
    const regions = [['colombia-guajira.jpg', 49, 22], ['colombia-pacific.jpg', 31, 54], ['colombia-andes.jpg', 47, 47], ['colombia-llanos.jpg', 75, 46], ['colombia-amazon.jpg', 67, 75], ['colombia-sanandres.jpg', 6.5, 6]];
    box.innerHTML = `${regions.map(([src], i) => `<img class="rp" data-i="${i}" src="${lib.img(src)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0">`).join('')}
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,#000C 0,#0000 46%,#0000 66%,#000A 100%),linear-gradient(0deg,#000C 0,#0000 40%)"></div>
      <div class="headline" style="left:96px;top:96px;width:1000px;font-size:124px;color:#fff;text-shadow:0 4px 30px #000A"></div>
      <div style="position:absolute;right:80px;top:90px;width:430px;height:492px;background:#fff;border-radius:6px;box-shadow:0 20px 60px #0009;overflow:hidden"><img src="${lib.img('colombia-regions-map.jpg')}" alt="Map of Colombia's regions" style="width:100%;height:100%;object-fit:cover"><div id="pin" style="position:absolute;width:40px;height:40px;margin:-20px;border-radius:50%;background:#D42A20;box-shadow:0 0 0 8px #D42A2055;opacity:0"></div></div>`;
    const imgs = [...box.querySelectorAll('.rp')], pin = box.querySelector('#pin');
    let last = null;
    return (i, beat) => {
      const r = beat.region;
      if (last != null) gsap.to(imgs[last], { opacity: 0, duration: .6 });
      gsap.killTweensOf(imgs[r]);
      gsap.fromTo(imgs[r], { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: .7, ease: 'power2.out' });
      gsap.to(imgs[r], { scale: 1.08, duration: 12, delay: .7, ease: 'none' });
      gsap.to(pin, { left: `${regions[r][1]}%`, top: `${regions[r][2]}%`, opacity: 1, duration: .5, ease: 'power3.inOut', onComplete: lib.sfx.pop });
      last = r;
    };
  },

  /* A mountain whose climate bands light up as we climb. */
  thermalFloors(box, lib) {
    const { gsap } = window;
    const bands = [[0, 'Hot', '#2E9E4F', 'Bananas'], [1, 'Mild', '#6DAA3A', 'Coffee'], [2, 'Cold', '#9C8B4A', 'Potatoes, and Bogotá'], [3, 'Páramo', '#8C8F7A', 'Frailejones'], [4, 'Snow', '#F5F7FF', 'Only the highest peaks']];
    const W = 1100, H = 780, y = (k) => H - k * (H / 5);
    const clip = `M0 ${H} L${W * .1} ${y(1)} L${W * .22} ${y(2.1)} L${W * .34} ${y(3)} L${W * .44} ${y(4)} L${W * .5} ${y(5)} L${W * .57} ${y(4.05)} L${W * .67} ${y(3.1)} L${W * .79} ${y(2)} L${W * .9} ${y(1)} L${W} ${H} Z`;
    box.innerHTML = `<div class="headline" style="left:96px;top:96px;width:800px"></div>
      <svg viewBox="0 0 ${W} ${H}" style="position:absolute;left:700px;top:130px;width:${W}px;height:${H}px">
        <defs><clipPath id="mtn"><path d="${clip}"/></clipPath></defs>
        <g clip-path="url(#mtn)">${bands.map(([k, , c]) => `<rect class="band" data-k="${k}" x="0" y="${y(k + 1)}" width="${W}" height="${H / 5 + 1}" fill="${c}" opacity=".22"/>`).join('')}</g>
        <path d="${clip}" fill="none" stroke="#F5F1E2" stroke-width="5" stroke-linejoin="round"/>
        <circle id="walker" cx="110" cy="${H - 26}" r="20" fill="#FFC400" stroke="#17131F" stroke-width="5"/>
      </svg>
      <ul id="floorList" style="position:absolute;left:96px;top:320px;width:600px;margin:0;padding:0;list-style:none;display:flex;flex-direction:column-reverse;gap:14px">${bands.map(([k, n, c, what]) => `<li data-k="${k}" style="opacity:.28;font:600 42px/1.1 var(--body);display:flex;gap:18px;align-items:center"><i style="flex:none;width:34px;height:34px;border-radius:6px;background:${c}"></i><span><b>${n}.</b> ${what}</span></li>`).join('')}</ul>`;
    const walker = box.querySelector('#walker');
    const xs = [150, 270, 370, 460, 545], ys = bands.map(([k]) => y(k + .5));
    return (i, beat) => {
      const f = beat.floor; if (f == null || f < 0) return;
      lib.sfx.pop();
      gsap.to(box.querySelector(`.band[data-k="${f}"]`), { opacity: 1, duration: .5 });
      gsap.to(box.querySelector(`#floorList [data-k="${f}"]`), { opacity: 1, x: 14, duration: .4, ease: 'power3.out' });
      gsap.to(walker, { attr: { cx: xs[f], cy: ys[f] }, duration: .9, ease: 'power2.inOut' });
    };
  },
});
