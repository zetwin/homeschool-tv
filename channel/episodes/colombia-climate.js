/* Colombia, Lesson 2 of 8. Geography. Follows England's KS2 climate zones aim, and Colombia's grade 5 Learning Rights on thermal floors. It isn't an Oak unit.
   Goal: explain how altitude changes climate and crops. Scene ids start with cc- because voice clips share one folder.
   Review notes: sources and open questions are in docs/research/2026-11-06-colombia-climate.md. Voice part only: no clips until the owner approves them (docs/rules/VIDEO-RULES.md). A Colombian reader hasn't reviewed it. */
(window.EPISODES = window.EPISODES || []).push({
  id: 'colombia-climate',
  extra: true,
  number: 2,
  subject: 'Geography',
  unit: 'Colombia',
  title: 'Why Is It Cold Near the Equator?',
  topic: 'Climate and height in Colombia',
  series: 'Geography · Colombia',
  lessonLabel: 'Lesson 2 of 8',
  blurb: 'Why air gets colder as you climb, what grows on each thermal floor, how people dress and eat at each height, and why the páramo and the ice matter.',
  hero: 'colombia-tolima.jpg',
  heroAlt: 'Frailejón plants on a high slope, with a snowy peak behind them, in Colombia',
  heroPos: '50% 55%',
  builder: 'plate',
  builderImg: 'colombia-tolima.jpg',
  builderLabel: 'Climb to the snow',
  builderDone: 'Your climb to the snow',
  fullScore: 'You reached the snow!',
  scenes: [
    { id: 'cc-greet', part: 'greet', chapter: 'Intro', type: 'statement', bg: '#4D7C0F', beats: [ { say: 'Hello again, and welcome back to Geography. This is Lesson 2 of our series on Colombia.', text: 'Welcome back to *Geography*' }, { say: 'Today, we’re finding out why it can be cold right next to the Equator, and how height changes what people wear, eat and grow. It explains how snow and beaches can be in the same country.', text: 'Today: why it’s *cold* near the Equator', hold: 0.4 } ] },
    { id: 'cc-last', part: 'lastTime', chapter: 'Intro', type: 'recap', bg: '#1D4ED8', heading: 'Last time', items: ['Top left of South America', 'Six regions', 'Higher means colder'], beats: [
      { say: 'Last time: Colombia. It’s in the top left of South America. It has six regions. And the higher you climb, the colder it gets.' },
      { say: 'Shout it out: name one of Colombia’s six regions.', hold: 4 },
      { say: 'The Caribbean, the Pacific, the Andes, the Orinoquía, the Amazon, or the islands. If you missed that lesson, that’s fine.', speak: 'The Caribbean, the Pacific, the Andes, the Oh-ree-noh-kee-ah, the Amazon, or the islands. If you missed that lesson, that’s fine.' },
      { say: 'Today, we find out why higher means colder.', hold: 0.4 },
    ] },
    { id: 'cc-hook', part: 'hook', chapter: 'Intro', type: 'art', art: 'ccTwoPlaces', layout: 'full', bg: '#17131F', poster: 'colombia-tolima.jpg', beats: [
      { say: 'A normal day in Colombia. On this beach, people are swimming in the warm sea.', text: 'A warm sea', show: 0 },
      { say: 'On this mountain, on the same day, there’s deep snow.', text: 'Deep snow', show: 1 },
      { say: 'Both places are close to the Equator, where lots of people expect heat.', text: 'Both near the Equator', dim: true },
      { say: 'And a mountain top is closer to the Sun. So shouldn’t it be hotter up there?', text: 'Closer to the Sun, but *colder?*', dim: true },
    ] },
    { id: 'cc-title', part: 'title', chapter: 'Intro', type: 'title', eyebrow: 'Colombia · Lesson 2 of 8', title: 'Why Is It *Cold* Near the Equator?', img: 'colombia-tolima.jpg', bg: '#FFC400', fg: '#17131F', beats: [
      { say: 'Today, we climb from the sea to the snow, and find out why it’s cold near the Equator.', hold: 0.8 },
    ] },
    { id: 'cc-today', part: 'today', chapter: 'Intro', type: 'recap', bg: '#0F766E', heading: 'Today, you’ll be able to', items: ['Explain why mountains are colder', 'Say what grows on each floor', 'Explain why the páramo matters'], beats: [
      { say: 'Today, you’ll be able to explain why mountains are colder, say what grows on each floor, and explain why the páramo matters.', speak: 'Today, you’ll be able to explain why mountains are colder, say what grows on each floor, and explain why the pahramo matters.' },
      { say: 'Why does it matter? Near the Equator, height decides how people dress, what they farm, and where cities get their water.', hold: 0.4 },
    ] },

    { id: 'cc-ch1', chapter: 'Why it’s colder', type: 'chapter', n: 1, title: 'Why air gets colder higher up', hasVideo: true, look: 'number', bg: '#1D4ED8', poster: 'colombia-peak.jpg', beats: [
      { say: 'Chapter one. Why does the air get colder as you climb?' },
    ] },
    { id: 'cc-guess-sun', chapter: 'Why it’s colder', type: 'guess', bg: '#D42A20', question: 'Climb closer to the Sun. What happens to the air?', options: ['It gets hotter', 'It gets colder', 'It stays the same', 'It disappears'], answer: 1, img: 'colombia-peak.jpg', imgCaption: 'Snow on El Cocuy, in Colombia', beats: [
      { say: 'Climb a mountain and you get a little closer to the Sun. So what happens to the air?', step: 'ask' },
      { say: 'Shout your answer now!', step: 'count', hold: 5 },
      { say: 'It gets colder! Being closer to the Sun makes almost no difference.', step: 'reveal' },
      { say: 'Here’s the snow to prove it, on a mountain called El Cocuy.', speak: 'Here’s the snow to prove it, on a mountain called El Coh-cooy.', step: 'image', hold: 0.5 },
    ] },
    { id: 'cc-sun', chapter: 'Why it’s colder', type: 'number', bg: '#0C0A10', img: 'colombia-sun.jpg', beats: [
      { say: 'Here’s why. The Sun is about 150 million kilometers away.', speak: 'Here’s why. The Sun is about a hundred and fifty million kilometers away.', from: 0, to: 150, sub: 'million km to the Sun, about' },
      { say: 'Colombia’s highest mountains are less than 6 kilometers high.', speak: 'Colombia’s highest mountains are less than six kilometers high.', from: 150, to: 6, sub: 'km high, at most: Colombia’s peaks' },
      { say: 'So climbing one is like taking one step toward a campfire on the other side of the world. You wouldn’t feel any warmer.', sub: 'One small step toward a faraway fire' },
    ] },
    { id: 'cc-air', chapter: 'Why it’s colder', type: 'art', art: 'ccAir', layout: 'full', bg: '#17131F', beats: [
      { say: 'So where does the warmth come from? Sunlight shines through the air, without warming it much.', text: 'Sunlight goes through the air', step: 'rays' },
      { say: 'It warms the ground instead.', text: 'It warms the *ground*', step: 'ground' },
      { say: 'Then the warm ground warms the air touching it, like a pan on a stove.', text: 'The ground warms the air', step: 'warm' },
      { say: 'Higher up, there’s less air above, pressing down. So the air is thinner.', text: 'High up: *thinner air*', step: 'thin' },
      { say: 'When air rises, it has room to spread out. And air that spreads out gets colder.', text: 'Air spreads out and *cools*', step: 'spread' },
      { say: 'It works the other way too. Pump up a bike tire and the pump gets warm, because you’re squeezing air.', text: 'Squeeze air and it *warms*', step: 'pump' },
      { say: 'So high up, the air is thin, and far from the warm ground. That’s why it’s colder.', text: 'Thin air, far from warm ground', step: 'final' },
    ] },
    { id: 'cc-rule', chapter: 'Why it’s colder', type: 'art', art: 'ccClimb', layout: 'full', bg: '#17131F', beats: [
      { say: 'Here’s a handy rule. You lose about 6 degrees Celsius for every 1,000 meters you climb. Start by the sea, at about 28.', speak: 'Here’s a handy rule. You lose about six degrees Celsius for every thousand meters you climb. Start by the sea, at about twenty-eight.', text: 'About *6° colder* every 1,000 m', alt: 0 },
      { say: 'Climb 1,000 meters. About 22.', speak: 'Climb a thousand meters. About twenty-two.', text: 'Up 1,000 m', alt: 1000 },
      { say: '2,000 meters. About 16.', speak: 'Two thousand meters. About sixteen.', text: 'Up 2,000 m', alt: 2000 },
      { say: '3,000 meters. About 10. Time for a warm coat.', speak: 'Three thousand meters. About ten. Time for a warm coat.', text: 'Up 3,000 m', alt: 3000 },
      { say: 'By about 4,700 meters, it’s around freezing. So only the highest peaks keep their snow.', speak: 'By about four thousand seven hundred meters, it’s around freezing. So only the highest peaks keep their snow.', text: 'Around freezing', alt: 4700 },
    ] },
    { id: 'cc-predict', chapter: 'Why it’s colder', type: 'guess', bg: '#0F766E', question: 'It’s 30° at the bottom. You climb 1,000 m. How warm is it now?', options: ['About 36°', 'About 24°', 'About 30°', 'About 5°'], answer: 1, img: 'colombia-andes.jpg', imgCaption: 'Farms on mild land in the Andes', beats: [
      { say: 'Your turn. It’s 30 degrees at the bottom of a hill. You climb 1,000 meters. How warm is it now?', speak: 'Your turn. It’s thirty degrees at the bottom of a hill. You climb a thousand meters. How warm is it now?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'About 24 degrees. You lost about 6 on the way up.', speak: 'About twenty-four degrees. You lost about six on the way up.', step: 'reveal' },
      { say: 'Warm, but not too hot, for farms like these.', step: 'image', hold: 0.5 },
    ] },
    { id: 'cc-year', chapter: 'Why it’s colder', type: 'art', art: 'ccYear', layout: 'full', bg: '#17131F', beats: [
      { say: 'In many places, the month decides how warm it is. In London, January is about 6 degrees, and July about 19.', speak: 'In many places, the month decides how warm it is. In London, January is about six degrees, and July about nineteen.', text: 'London: the month matters', line: 0 },
      { say: 'In Bogotá, every month is about 14 degrees.', speak: 'In Bogotá, every month is about fourteen degrees.', text: 'Bogotá: about 14°, all year', line: 1 },
      { say: 'Girardot is a town much lower down. It stays around 28 degrees, all year.', speak: 'Hee-rar-dot is a town much lower down. It stays around twenty-eight degrees, all year.', text: 'Girardot: about 28°, all year', line: 2 },
      { say: 'Months can bring rain. But near the Equator, it’s how high you are that decides how warm you are.', text: 'Near the Equator, *height* decides' },
    ] },

    { id: 'cc-video-air', use: 'support', status: 'candidate', chapter: 'Why it’s colder', type: 'video', bg: '#17131F', youtube: 'cimgIhtN-AU', start: 0, end: 167, videoTitle: 'Why does it get colder as we go higher?', channel: 'BBC Earth Science', watchFor: 'Listen for why high air is colder', still: 'colombia-peak.jpg', beats: [
      { say: 'Here’s a short film that explains it another way. Listen for why high air is colder.' },
    ] },
    { id: 'cc-after-video-air', afterVideo: true, chapter: 'Why it’s colder', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So high air is colder because it’s thin, and far from the warm ground.', text: 'Thin air is *colder*' },
    ] },
    { id: 'cc-ch2', chapter: 'Floors and food', type: 'chapter', n: 2, title: 'What grows at each height', hasVideo: true, look: 'split', bg: '#0F766E', poster: 'colombia-potato.jpg', beats: [
      { say: 'Chapter two. Colombians call these layers pisos térmicos, or thermal floors. Each floor has its own food. Let’s ride the elevator.', speak: 'Chapter two. Colombians call these layers peesos tehrmeecos, or thermal floors. Each floor has its own food. Let’s ride the elevator.' },
    ] },
    { id: 'cc-hot', chapter: 'Floors and food', type: 'art', art: 'ccFloor', layout: 'full', bg: '#17131F', beats: [
      { say: 'First stop: tierra caliente, the hot land. It runs from the sea up to about 1,000 meters, and it’s usually over 24 degrees.', speak: 'First stop: tee-air-ah cah-lee-en-tay, the hot land. It runs from the sea up to about one thousand meters, and it’s usually over twenty-four degrees.', text: 'Hot land', floor: 0, img: 'colombia-beach.jpg', pos: '100% 50%' },
      { say: 'Cartagena is on this floor, right by the Caribbean Sea.', text: 'Cartagena', floor: 0, img: 'colombia-cartagena.jpg' },
      { say: 'Bananas love it here.', text: 'Bananas', floor: 0, img: 'colombia-banana.jpg', pos: '50% 30%' },
      { say: 'So does sugar cane. This worker is cutting it by hand.', text: 'Sugar cane', floor: 0, img: 'colombia-cane.jpg', pos: '50% 45%' },
      { say: 'And these red pods are cacao. The beans inside give us chocolate.', text: 'Cacao, for chocolate', floor: 0, img: 'colombia-cacao.jpg' },
    ] },
    { id: 'cc-mild', chapter: 'Floors and food', type: 'art', art: 'ccFloor', layout: 'full', bg: '#17131F', beats: [
      { say: 'Up to the second floor: tierra templada, the mild land. About 1,000 to 2,000 meters, and often around 20 degrees.', speak: 'Up to the second floor: tee-air-ah tem-plah-dah, the mild land. About one to two thousand meters, and often around twenty degrees.', text: 'Mild land', floor: 1, img: 'colombia-medellin.jpg', pos: '50% 60%' },
      { say: 'This is Medellín, the City of Eternal Spring, because it’s mild all year.', speak: 'This is Meh-deh-yeen, the City of Eternal Spring, because it’s mild all year.', text: 'Medellín: eternal spring', floor: 1, img: 'colombia-medellin.jpg', pos: '50% 60%' },
      { say: 'And this is coffee’s favorite floor: neither too hot nor too cold. We’ll visit a coffee farm in a later lesson.', text: 'Coffee', floor: 1, img: 'colombia-andes.jpg' },
    ] },
    { id: 'cc-guess-crop', chapter: 'Floors and food', type: 'guess', bg: '#7E22CE', question: 'Your farm is 2,800 meters up. What should you plant?', options: ['Bananas', 'Cacao', 'Potatoes', 'Sugar cane'], answer: 2, img: 'colombia-potato.jpg', imgCaption: 'A potato harvest in Boyacá', beats: [
      { say: 'Imagine your farm is 2,800 meters up. What should you plant?', speak: 'Imagine your farm is two thousand eight hundred meters up. What should you plant?', step: 'ask' },
      { say: 'Shout it out!', step: 'count', hold: 5 },
      { say: 'Potatoes! Bananas and cacao would be far too cold up here.', step: 'reveal' },
      { say: 'This is a real potato harvest, high up in Boyacá.', speak: 'This is a real potato harvest, high up in Boh-yah-kah.', step: 'image', hold: 0.5 },
    ] },
    { id: 'cc-cold', chapter: 'Floors and food', type: 'art', art: 'ccFloor', layout: 'full', bg: '#17131F', beats: [
      { say: 'Welcome to the third floor: tierra fría, the cold land. About 2,000 to 3,000 meters, and around 12 to 18 degrees.', speak: 'Welcome to the third floor: tee-air-ah free-ah, the cold land. About two to three thousand meters, and around twelve to eighteen degrees.', text: 'Cold land', floor: 2, img: 'colombia-bogota.jpg' },
      { say: 'Bogotá, Colombia’s capital, is on this floor.', speak: 'Bogotá, Colombia’s capital, is on this floor.', text: 'Bogotá', floor: 2, img: 'colombia-bogota.jpg' },
      { say: 'Farmers grow potatoes, barley and oats. Potatoes first came from the Andes, so they’re right at home.', text: 'Potatoes, barley, oats', floor: 2, img: 'colombia-potato.jpg' },
    ] },
    { id: 'cc-roses', chapter: 'Floors and food', type: 'statement', bg: '#D42A20', beats: [
      { say: 'And a surprise: roses. Around Bogotá, growers raise them in greenhouses, and send them around the world.', text: '*Roses,* grown 2,600 m up' },
    ] },
    { id: 'cc-market', chapter: 'Floors and food', type: 'photo', bg: '#0C0A10', img: 'colombia-market.jpg', beats: [
      { say: 'Trucks carry food up and down the mountains. So in this market in Bogotá, green bananas from the hot land can sit beside vegetables from the cold land.', text: 'Food from *many floors*', focus: [58, 44, 1.2] },
    ] },
    { id: 'cc-floors-page', chapter: 'Floors and food', type: 'art', art: 'ccFloorsPage', layout: 'full', bg: '#17131F', beats: [
      { say: 'Five floors, on one mountain. Hot. Mild. Cold. Páramo. And snow. Say them with me.', speak: 'Five floors, on one mountain. Hot. Mild. Cold. Pahramo. And snow. Say them with me.', text: 'Five floors, one mountain', hold: 1.5 },
    ] },

    { id: 'cc-video-coffee', use: 'support', status: 'candidate', chapter: 'Floors and food', type: 'video', bg: '#17131F', youtube: 'evCf7YYZk3w', videoTitle: 'Colombia’s coffee harvest', channel: 'Discovery UK', watchFor: 'Watch how the coffee is picked and washed', still: 'colombia-andes.jpg', beats: [
      { say: 'Coffee likes those mild slopes. Watch how it’s picked and washed.' },
    ] },
    { id: 'cc-after-video-coffee', afterVideo: true, chapter: 'Floors and food', type: 'statement', bg: '#0F766E', beats: [
      { say: 'Coffee grows best on the mild floor: not too hot, and not too cold.', text: 'Coffee: the *mild* floor' },
    ] },
    { id: 'cc-ch3', chapter: 'Hot to cold', type: 'chapter', n: 3, title: 'One road, from hot to cold', look: 'band', bg: '#D42A20', poster: 'colombia-girardot.jpg', posterPos: '50% 35%', beats: [
      { say: 'Chapter three. How does all this change the way people live? Let’s take a road trip.' },
    ] },
    { id: 'cc-road', chapter: 'Hot to cold', type: 'art', art: 'ccRoad', layout: 'full', bg: '#17131F', beats: [
      { say: 'Imagine a family from Bogotá, on a holiday weekend in Girardot, where lots of Bogotá families go to swim.', speak: 'Imagine a family from Bogotá, on a holiday weekend in Hee-rar-dot, where lots of Bogotá families go to swim.', text: 'A weekend in the hot land', stop: 0 },
      { say: 'It’s about 290 meters up, and about 28 degrees. T-shirts and sandals.', speak: 'It’s about two hundred and ninety meters up, and about twenty-eight degrees. T-shirts and sandals.', text: 'T-shirts and sandals', stop: 0 },
      { say: 'Now it’s time to drive home. The road climbs and climbs.', text: 'The road climbs', stop: 0.45 },
      { say: 'Here’s Fusagasugá, about 1,700 meters up, and about 20 degrees. Long sleeves.', speak: 'Here’s Foo-sah-gah-soo-gah, about one thousand seven hundred meters up, and about twenty degrees. Long sleeves.', text: 'Long sleeves', stop: 1 },
      { say: 'On a clear day, you can even see a snowy peak from here, far away.', speak: 'On a clear day, you can even see a snowy peak from here, far away.', text: 'Snow in the distance', stop: 1 },
      { say: 'Then on to Bogotá: about 2,600 meters up, and about 14 degrees. Jackets on!', speak: 'Then on to Bogotá: about two thousand six hundred meters up, and about fourteen degrees. Jackets on!', text: 'Jackets on!', stop: 2 },
      { say: 'One road, about 134 kilometers, about three hours in good traffic. And about 14 degrees colder.', speak: 'One road, about a hundred and thirty-four kilometers, about three hours in good traffic. And about fourteen degrees colder.', text: 'One road, one afternoon', stop: 2, total: true },
      { say: 'Like going from summer to autumn, just by driving home.', text: 'From summer to autumn', stop: 2, total: true },
    ] },
    { id: 'cc-try', chapter: 'Hot to cold', type: 'art', art: 'ccDress', layout: 'full', bg: '#0F766E', beats: [
      { say: 'Try it now! Stand up. You’re on the hot coast, and it’s roasting. Fan yourself!', img: 'colombia-beach.jpg', pos: '100% 50%', act: 'Fan yourself!', temp: '28°', hold: 3 },
      { say: 'Climb to the mild land. Ahh. Stop fanning. It’s just right.', img: 'colombia-medellin.jpg', pos: '50% 60%', act: 'Just right', temp: '20°', hold: 2 },
      { say: 'Up to Bogotá. It’s getting cold! Zip up your jacket.', img: 'colombia-bogota.jpg', act: 'Zip up!', temp: '14°', hold: 3 },
      { say: 'Up to the páramo. Wrap your arms around yourself, and shiver!', speak: 'Up to the pahramo. Wrap your arms around yourself, and shiver!', img: 'colombia-monks.jpg', act: 'Shiver!', temp: 'Brrr', hold: 3 },
      { say: 'Nice work. Sit down, and warm up.', img: 'colombia-monks.jpg', act: 'Sit down', temp: 'Brrr' },
    ] },
    { id: 'cc-living', chapter: 'Hot to cold', type: 'art', art: 'ccLiving', layout: 'full', bg: '#17131F', beats: [
      { say: 'People dress for their floor. This is a ruana: a thick square of sheep’s wool, worn by farmers in cold Boyacá.', speak: 'People dress for their floor. This is a roo-ah-nah: a thick square of sheep’s wool, worn by farmers in cold Boh-yah-kah.', text: 'Dressed for the *cold*', show: 0 },
      { say: 'In the hot lowlands near the Caribbean, Zenú people weave this hat, the sombrero vueltiao, a national symbol.', speak: 'In the hot lowlands near the Caribbean, Zeh-noo people weave this hat, the sombrero vwel-tee-ow, a national symbol.', text: 'Woven in the *hot* lowlands', show: 1 },
      { say: 'And in chilly Bogotá, a favorite food is ajiaco, a warming chicken soup with three kinds of potato.', speak: 'And in chilly Bogotá, a favorite food is ah-hee-ah-ko, a warming chicken soup with three kinds of potato.', text: 'A warm soup for *cold* land', show: 2 },
    ] },

    { id: 'cc-ch4', chapter: 'Sea to snow', type: 'chapter', n: 4, title: 'From the sea to the snow', look: 'full', bg: '#7E22CE', poster: 'colombia-sierra.jpg', beats: [
      { say: 'Chapter four. Now for some special mountains, with every floor, all close together.' },
    ] },
    { id: 'cc-sierra-map', chapter: 'Sea to snow', type: 'atlas', bg: '#FFFFFF', img: 'colombia-regions-map.jpg', ratio: 1149 / 1000, plate: 'Map · Colombia', beats: [
      { say: 'This is the Sierra Nevada de Santa Marta, in Colombia’s Caribbean region.', speak: 'This is the See-air-ah Neh-vah-dah deh Santa Marta, in Colombia’s Caribbean region.', mark: [61, 15.5], zoom: 1.2, name: 'Sierra Nevada', fact: 'de Santa Marta, in the Caribbean region' },
      { say: 'It stands on its own, apart from the Andes, right beside the sea.', mark: [61, 15.5], zoom: 2, name: 'On its own', fact: 'Apart from the Andes, right beside the sea' },
    ] },
    { id: 'cc-sierra', chapter: 'Sea to snow', type: 'art', art: 'ccSierra', layout: 'full', bg: '#17131F', beats: [
      { say: 'Its twin peaks rise to over 5,700 meters. It’s the highest coastal mountain range in the tropics.', speak: 'Its twin peaks rise to over five thousand seven hundred meters. It’s the highest coastal mountain range in the tropics.', text: 'Twin peaks, over *5,700 m*', peak: true },
      { say: 'And those peaks are only about 42 kilometers from the coast, in a straight line. That’s about the length of a marathon.', speak: 'And those peaks are only about forty-two kilometers from the coast, in a straight line. That’s about the length of a marathon.', text: 'About one marathon from the sea', dist: true },
      { say: 'Imagine walking up from the sea. First, hot beaches and palm trees.', text: 'Hot beaches', floors: [0], inset: 'colombia-beach.jpg', pos: '100% 50%' },
      { say: 'Above about 1,000 meters, you’re in misty cloud forest.', speak: 'Above about one thousand meters, you’re in misty cloud forest.', text: 'Misty cloud forest', floors: [1] },
      { say: 'Higher still, it turns cold, and then you reach the páramo.', speak: 'Higher still, it turns cold, and then you reach the pahramo.', text: 'Cold land, then páramo', floors: [2, 3] },
      { say: 'And at the top, snow and ice. Every floor, in about one marathon.', text: 'Every floor, *sea to snow*', floors: [4], inset: 'colombia-pico.jpg' },
    ] },
    { id: 'cc-sierra-people', chapter: 'Sea to snow', type: 'photo', bg: '#0C0A10', img: 'colombia-sierra-people.jpg', beats: [
      { say: 'Four Indigenous peoples call the Sierra home today: the Kogi, Arhuaco, Kankuamo and Wiwa.', speak: 'Four Indigenous peoples call the Sierra home today: the Koh-ghee, Ar-wah-ko, Kan-kwah-mo and Wee-wah.', text: 'Kogi, Arhuaco, Kankuamo, Wiwa', focus: [54, 46, 1.1] },
      { say: 'They’re about 70,000 people. UNESCO lists their knowledge of these mountains as cultural heritage.', speak: 'They’re about seventy thousand people. Yoo-ness-ko lists their knowledge of these mountains as cultural heritage.', text: 'About *70,000* people', focus: [56, 46, 1.2] },
    ] },

    { id: 'cc-ch5', chapter: 'Páramo', type: 'chapter', n: 5, title: 'The páramo: where water begins', hasVideo: true, look: 'left', bg: '#0F766E', poster: 'colombia-paramo.jpg', beats: [
      { say: 'Chapter five. Back up to the páramo, because a lot of Colombia’s water starts here.', speak: 'Chapter five. Back up to the pahramo, because a lot of Colombia’s water starts here.' },
    ] },
    { id: 'cc-paramo', chapter: 'Páramo', type: 'photo', bg: '#0C0A10', img: 'colombia-sumapaz.jpg', beats: [
      { say: 'Above about 3,000 meters, forest gives way to this: cold, misty grassland.', speak: 'Above about three thousand meters, forest gives way to this: cold, misty grassland.', text: 'The páramo', focus: [50, 50, 1.08] },
    ] },
    { id: 'cc-half', chapter: 'Páramo', type: 'statement', bg: '#1D4ED8', beats: [
      { say: 'About half of all the world’s páramos are in Colombia.', speak: 'About half of all the world’s pahramos are in Colombia.', text: 'About *half* of the world’s páramos' },
    ] },
    { id: 'cc-monks', chapter: 'Páramo', type: 'photo', bg: '#0C0A10', img: 'colombia-monks.jpg', beats: [
      { say: 'These strange plants are frailejones. The name means big monks. Can you see them, in a line in the mist?', speak: 'These strange plants are fry-lay-hoh-ness. The name means big monks. Can you see them, in a line in the mist?', text: 'Frailejones: “big monks”', focus: [60, 44, 1.3] },
    ] },
    { id: 'cc-plant', chapter: 'Páramo', type: 'art', art: 'ccPlant', layout: 'full', bg: '#17131F', beats: [
      { say: 'How do they survive the cold? First, a woolly coat. Soft hairs cover the leaves.', text: 'First: *woolly* leaves', show: 0 },
      { say: 'Second, their dead leaves stay on the stem, like a thick jacket.', text: 'Second: dead leaves *stay on*', show: 1 },
    ] },
    { id: 'cc-growth', chapter: 'Páramo', type: 'art', art: 'ccGrowth', layout: 'full', bg: '#17131F', beats: [
      { say: 'They grow very slowly: often just 1 or 2 centimeters a year.', speak: 'They grow very slowly: often just one or two centimeters a year.', text: 'Often *1 or 2 cm* a year' },
      { say: 'You grew to about 1.4 meters tall in about 11 years.', speak: 'You grew to about one point four meters tall in about eleven years.', text: 'You: fast!', you: true },
      { say: 'But a frailejón just 1 meter tall can be up to 100 years old. Maybe older than your grandparents!', speak: 'But a fry-lay-hohn just one meter tall can be up to a hundred years old. Maybe older than your grandparents!', text: 'Frailejón: very slow', plant: true },
    ] },
    { id: 'cc-water', chapter: 'Páramo', type: 'art', art: 'ccWater', layout: 'full', bg: '#17131F', beats: [
      { say: 'Now for the páramo’s big job. Cold, wet clouds drift across it.', speak: 'Now for the pahramo’s big job. Cold, wet clouds drift across it.', text: 'Wet clouds drift in', step: 0, img: 'colombia-monks.jpg' },
      { say: 'Woolly leaves catch the moisture, and drops run into the ground.', text: 'Leaves catch the water', step: 1, img: 'colombia-wool.jpg' },
      { say: 'The deep, soft soil soaks it up, like a giant sponge.', text: 'Soil soaks it up', step: 2, img: 'colombia-bog.jpg' },
      { say: 'Then it lets the water out slowly, so streams keep flowing, even when it hasn’t rained.', text: 'Water seeps out slowly', step: 3, img: 'colombia-sumapaz.jpg' },
      { say: 'Those streams feed the rivers that cities drink from.', text: 'Rivers reach the cities', step: 4, img: 'colombia-bogota.jpg' },
    ] },
    { id: 'cc-drink', chapter: 'Páramo', type: 'number', flip: true, bg: '#1D4ED8', img: 'colombia-chingaza.jpg', beats: [
      { say: 'About 17 million Colombians drink water that starts in a páramo. That’s about one in every three.', speak: 'About seventeen million Colombians drink water that starts in a pahramo. That’s about one in every three.', from: 0, to: 17, sub: 'million people, about 1 in 3' },
      { say: 'Most of Bogotá’s water comes through one páramo, Chingaza. That’s its lake.', speak: 'Most of Bogotá’s water comes through one pahramo, Cheen-gah-sah. That’s its lake.', sub: 'Chingaza: most of Bogotá’s water' },
      { say: 'So Colombia has a law to protect its páramos.', speak: 'So Colombia has a law to protect its pahramos.', sub: 'A law protects the páramos' },
    ] },

    { id: 'cc-video-paramo', use: 'support', status: 'candidate', chapter: 'Páramo', type: 'video', bg: '#17131F', youtube: 'VHijg3fVJgc', videoTitle: 'Bogotá’s water, from the páramo', channel: 'DW News', watchFor: 'Watch how this high land gives water to a huge city', still: 'colombia-paramo.jpg', beats: [
      { say: 'Let’s go up there on film. Watch how this high land gives water to a huge city.', speak: 'Let’s go up there on film. Watch how this high land gives water to a huge city.' },
    ] },
    { id: 'cc-after-video-paramo', afterVideo: true, chapter: 'Páramo', type: 'statement', bg: '#0F766E', beats: [
      { say: 'So the páramo works like a sponge, and gives water to a whole city.', text: 'A sponge for the *city*' },
    ] },
    { id: 'cc-ch6', chapter: 'Shrinking ice', type: 'chapter', n: 6, title: 'Colombia’s shrinking ice', look: 'right', bg: '#1D4ED8', poster: 'colombia-peak.jpg', beats: [
      { say: 'Chapter six. On the highest mountains, there’s ice. But less of it every year.' },
    ] },
    { id: 'cc-ice-map', chapter: 'Shrinking ice', type: 'atlas', bg: '#FFFFFF', img: 'colombia-ruiz-map.jpg', ratio: 1311 / 1280, plate: 'Map · Nevado del Ruiz', beats: [
      { say: 'This map shows one mountain, the Nevado del Ruiz. All the purple was ice in about 1850.', speak: 'This map shows one mountain, the Neh-vah-doh del Roo-eess. All the purple was ice in about eighteen fifty.', mark: [28, 42], zoom: 1.25, name: 'In 1850', fact: 'All the purple was covered in ice', },
      { say: 'The white shows what was left by 2016.', speak: 'The white shows what was left by twenty sixteen.', mark: [50, 50], zoom: 1.9, name: 'By 2016', fact: 'Only the white was left' },
    ] },
    { id: 'cc-ice', chapter: 'Shrinking ice', type: 'art', art: 'ccIce', layout: 'full', bg: '#17131F', beats: [
      { say: 'Across Colombia, there were about 350 square kilometers of ice in the 1800s. Each square here is one.', speak: 'Across Colombia, there were about three hundred and fifty square kilometers of ice in the eighteen hundreds. Each square here is one.', text: 'The 1800s: about *350* km² of ice' },
      { say: 'By 2024, only about 31 were left. That’s about 9 out of every 10 gone.', speak: 'By twenty twenty-four, only about thirty-one were left. That’s about nine out of every ten gone.', text: '2024: about *31* km²', melt: true },
      { say: 'All of it would fit in a square about 5 and a half kilometers wide. You could walk across in a little over an hour.', speak: 'All of it would fit in a square about five and a half kilometers wide. You could walk across in a little over an hour.', text: 'All of it, in one square', gather: true },
      { say: 'In 2026, scientists confirmed that one glacier on El Cocuy had melted away completely.', speak: 'In twenty twenty-six, scientists confirmed that one glacier on El Coh-cooy had melted away completely.', text: 'One glacier: *gone*', pic: true },
      { say: 'Scientists link this to Earth’s warming climate. They keep measuring the ice, and Colombians work to protect their mountains.', text: 'Measured, and protected', pic: true },
    ] },

    { id: 'cc-bonus', chapter: 'Bonus', type: 'chapter', bonus: true, label: 'Bonus', title: 'Strange things thin air does', look: 'band', bg: '#7E22CE', poster: 'colombia-bogota.jpg', posterPos: '50% 62%', beats: [
      { say: 'Bonus! This isn’t in the test. Thin air does strange things.' },
    ] },
    { id: 'cc-boil', chapter: 'Bonus', type: 'statement', bg: '#D42A20', beats: [
      { say: 'By the sea, water boils at 100 degrees. In Bogotá, at about 91. So food can take longer to cook.', speak: 'By the sea, water boils at a hundred degrees. In Bogotá, at about ninety-one. So food can take longer to cook.', text: 'In Bogotá, water boils at *about 91°*' },
    ] },
    { id: 'cc-bernal', chapter: 'Bonus', type: 'number', flip: true, bg: '#17131F', img: 'colombia-bernal.jpg', beats: [
      { say: 'And Egan Bernal grew up about 2,600 meters up. In 2019, aged 22, he became the first Colombian to win the Tour de France.', speak: 'And Egan Ber-nal grew up about two thousand six hundred meters up. In twenty nineteen, aged twenty-two, he became the first Colombian to win the Tour de France.', from: 2000, to: 2019, sub: 'Egan Bernal: first Colombian to win the Tour de France' },
      { say: 'Thin air may have helped. Years of hard training did too.', sub: 'Thin air may have helped. Hard training did too.' },
    ] },

    { id: 'cc-answer', part: 'answer', chapter: 'What we learned', type: 'statement', bg: '#D42A20', beats: [
      { say: 'Remember the start? A mountain top is closer to the Sun, but colder. The air up there is thin, and far from the warm ground.', text: 'Thin air, far from *warm ground*' },
    ] },
    { id: 'cc-recap', part: 'summary', chapter: 'What we learned', type: 'recap', bg: '#0F766E', heading: 'What we learned', items: ['Thin air high up is colder', 'Each floor grows its own food', 'One range: sea to snow', 'Páramos store water', 'Colombia’s ice is shrinking'], beats: [
      { say: 'Let’s lock it in. Thin air high up is colder. Each floor grows its own food. The Sierra Nevada goes from sea to snow. Páramos store water. And Colombia’s ice is shrinking.', speak: 'Let’s lock it in. Thin air high up is colder. Each floor grows its own food. The See-air-ah Neh-vah-dah goes from sea to snow. Pahramos store water. And Colombia’s ice is shrinking.' },
    ] },
    { id: 'cc-next', part: 'next', chapter: 'What we learned', type: 'statement', bg: '#7E22CE', beats: [
      { say: 'Next lesson, we’ll meet the people who live on all these floors.', text: 'Next time: *the people*', hold: 0.4 },
      { say: 'But first, take the test.', text: 'Now, *the test*', hold: 0.4 },
    ] },
  ],
  starter: [
    { type: 'radio', q: 'Last lesson, what did we call the layers of climate on a mountain in Colombia?', o: ['Thermal floors', 'Weather stairs', 'Cloud rooms'], a: 0, why: 'Colombians call them pisos térmicos, or thermal floors.' },
    { type: 'radio', q: 'Where is Bogotá?', o: ['High in the mountains', 'On the Caribbean coast', 'In the Amazon rainforest'], a: 0, why: 'Bogotá is about 2,600 meters up, in the Andes.' },
    { type: 'radio', q: 'What do you think? Both places are near the Equator. Which is colder?', o: ['A mountain top', 'A beach', 'They’re the same'], a: 0, why: 'The mountain top is colder. Today you’ll find out why.' },
  ],
  test: [
    { type: 'radio', q: 'A mountain top is a little closer to the Sun. So why is it colder?', o: ['The air is thin, and far from the warm ground', 'The Sun doesn’t shine on mountains', 'Snow keeps falling from space', 'Mountains are further from the Equator'], a: 0, why: 'The Sun is so far away that a mountain makes almost no difference. Thin air, far from the warm ground, is colder.' },
    { type: 'gaps', q: 'Finish the sentences.', text: 'Sunlight warms the {0}, and that warms the air. High up, the air is {1}, and air {2} as it spreads out.', bank: ['ground', 'thinner', 'cools', 'clouds', 'thicker', 'heats up'], a: ['ground', 'thinner', 'cools'], why: 'The ground warms the air. Higher up the air is thinner, and spreading out cools it.' },
    { type: 'number', q: 'It’s 28 degrees by the sea. You climb 2,000 meters. About how warm is it now?', hint: 'You lose about 6 degrees for every 1,000 meters.', unit: '°C', a: 16, tol: 1, why: 'Two lots of 6 degrees is 12, and 28 minus 12 is 16.' },
    { type: 'estimate', picture: 'mountain', q: 'Move the slider to where the páramo begins.', min: 0, max: 5000, step: 100, unit: 'm', a: 3000, tol: 300, why: 'The páramo begins at about 3,000 meters.' },
    { type: 'order', q: 'Put these in order, from the lowest up to the highest.', items: ['Cacao', 'Coffee', 'Potatoes', 'Frailejones', 'Snow all year'], colors: ['#2E9E4F', '#6DAA3A', '#9C8B4A', '#8C8F7A', '#F5F7FF'], why: 'Cacao is on the hot floor, coffee on the mild floor, potatoes on the cold floor, and frailejones on the páramo. Snow stays only on the highest peaks.' },
    { type: 'sort', q: 'Which floor does each one grow on? Sort them.', bins: ['Hot land', 'Cold land'], items: [{ t: 'Bananas', bin: 0, img: 'colombia-banana.jpg' }, { t: 'Cacao', bin: 0, img: 'colombia-cacao.jpg' }, { t: 'Sugar cane', bin: 0, img: 'colombia-cane.jpg' }, { t: 'Potatoes', bin: 1, img: 'colombia-potato.jpg' }, { t: 'Barley', bin: 1 }, { t: 'Oats', bin: 1 }], why: 'Bananas, cacao and sugar cane like the hot land. Potatoes, barley and oats grow in the cold land.' },
    { type: 'pics', q: 'Which picture shows a páramo?', o: [{ img: 'colombia-cane.jpg', t: 'Picture A' }, { img: 'colombia-paramo.jpg', t: 'Picture B' }, { img: 'colombia-medellin.jpg', t: 'Picture C' }, { img: 'colombia-beach.jpg', t: 'Picture D' }], a: 1, why: 'Picture B shows frailejones on cold, high grassland. That’s a páramo.' },
    { type: 'region', map: 'colombia', q: 'Tap the region where you’d find the Sierra Nevada de Santa Marta.', a: 'caribbean', why: 'It’s in the Caribbean region, right beside the sea.' },
    { type: 'select', q: 'A family drives home from Girardot up to Bogotá. Choose the right words.', text: 'As they climb, it gets {0}. In Bogotá it’s about {1} degrees.', choices: [['colder', 'hotter', 'no different'], ['14', '28', '40']], a: ['colder', '14'], why: 'The road climbs about 2,300 meters. It goes from about 28 degrees in Girardot to about 14 in Bogotá.' },
    { type: 'match', q: 'Match each photo to what it shows.', pairs: [[{ img: 'colombia-ruana.jpg', t: 'Photo 1' }, 'A wool ruana, for cold land'], [{ img: 'colombia-vueltiao.jpg', t: 'Photo 2' }, 'A woven hat from the hot lowlands'], [{ img: 'colombia-ajiaco.jpg', t: 'Photo 3' }, 'Ajiaco, a potato soup from Bogotá'], [{ img: 'colombia-coat.jpg', t: 'Photo 4' }, 'Frailejones with their dead leaves']], why: 'What people wear and eat, and how plants grow, all change with height.' },
    { type: 'checkbox', q: 'How do frailejones cope with the cold? Tick all that are true.', o: ['Woolly hairs on their leaves', 'Dead leaves that stay on the stem', 'They walk downhill at night', 'They grow as fast as they can'], a: [0, 1], why: 'Woolly leaves and a jacket of dead leaves help keep out the cold. They grow very slowly.' },
    { type: 'truefalse', q: 'True or false?', rows: [['The soil of a páramo soaks up water and lets it out slowly.', true], ['In Bogotá, July is much hotter than January.', false], ['Colombia has less ice now than in the 1800s.', true]], why: 'Páramo soil works like a sponge. Bogotá stays about 14 degrees all year. About 9 out of every 10 parts of Colombia’s ice have gone.' },
  ],
  credits: {
    /* Candidates are in docs/rules/VIDEO-RULES.md. New videos go in once the owner has watched them. */
    videos: [
      { title: 'Why Does Altitude Affect Temperature?', by: 'BBC Earth Science', url: 'https://www.youtube.com/watch?v=cimgIhtN-AU' },
      { title: 'Colombia Coffee Harvest', by: 'Discovery UK', url: 'https://www.youtube.com/watch?v=evCf7YYZk3w' },
      { title: 'Bogotá’s unique water source at risk', by: 'DW News', url: 'https://www.youtube.com/watch?v=VHijg3fVJgc' },
    ],
    deeper: [],
  },
});

(function () {
  /* The same five colors mean the same floors as in Lesson 1. */
  const FLOORS = [
    { name: 'Hot', land: 'Hot land', c: '#2E9E4F', ink: '#FFFFFF', top: 1000, band: 'Under about 1,000 m', food: 'Bananas, sugar cane, cacao' },
    { name: 'Mild', land: 'Mild land', c: '#6DAA3A', ink: '#17131F', top: 2000, band: 'About 1,000 to 2,000 m', food: 'Coffee' },
    { name: 'Cold', land: 'Cold land', c: '#9C8B4A', ink: '#17131F', top: 3000, band: 'About 2,000 to 3,000 m', food: 'Potatoes, barley, oats, roses' },
    { name: 'Páramo', land: 'Páramo', c: '#8C8F7A', ink: '#17131F', top: 4700, band: 'Above about 3,000 m', food: 'Frailejones' },
    { name: 'Snow', land: 'Snow', c: '#F5F7FF', ink: '#17131F', top: 5800, band: 'The highest peaks', food: 'No farms' },
  ];
  const HOT = '#EE5A2C', COOL = '#3E8CF2';
  const fadeIn = (el, vars = {}) => window.gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .5, ...vars });
  /* Stacked photos: fades to the one a line asks for, and moves it slowly. */
  function photoStack(box, lib, shade) {
    const { gsap } = window;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;overflow:hidden';
    box.prepend(wrap);
    const scrim = document.createElement('div');
    scrim.style.cssText = `position:absolute;inset:0;background:${shade}`;
    wrap.append(scrim);
    let current = null, name = '';
    return (src, pos = '50% 50%') => {
      if (!src || src === name) return;
      name = src;
      const img = document.createElement('img');
      img.src = lib.img(src); img.alt = '';
      img.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}`;
      wrap.insertBefore(img, scrim);
      if (current) gsap.to(current, { opacity: 0, duration: .6 });
      gsap.fromTo(img, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: .8, ease: 'power2.out' });
      current = img;
    };
  }

  window.ART = Object.assign(window.ART || {}, {
    /* Two real places, side by side, on the same day. */
    ccTwoPlaces(box, lib) {
      const { gsap } = window;
      const half = (src, side, pos) => `<img class="half" src="${lib.img(src)}" alt="" style="position:absolute;top:0;${side}:0;width:960px;height:1080px;object-fit:cover;object-position:${pos};opacity:0">`;
      box.innerHTML = `${half('colombia-beach.jpg', 'left', '100% 50%')}${half('colombia-peak.jpg', 'right', '60% 50%')}
        <div class="veil" style="position:absolute;inset:0;background:#000;opacity:0"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#000A 0,#0000 34%)"></div>
        <div class="headline" style="left:96px;top:80px;width:1728px;text-align:center;font-size:96px;color:#fff;text-shadow:0 4px 30px #000C"></div>`;
      const halves = [...box.querySelectorAll('.half')], veil = box.querySelector('.veil');
      return (i, beat) => {
        if (beat.show != null) { lib.sfx.pop(); gsap.fromTo(halves[beat.show], { opacity: 0, x: beat.show ? 120 : -120 }, { opacity: 1, x: 0, duration: .8, ease: 'power3.out' }); }
        if (beat.dim) gsap.to(veil, { opacity: .45, duration: .6 });
      };
    },

    /* Air as dots: packed low down, spread out high up. One bubble of air rises and cools. */
    ccAir(box, lib) {
      const { gsap } = window;
      const W = 900, G = 720;
      let seed = 7;
      const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const dots = Array.from({ length: 520 }, () => {
        const h = -230 * Math.log(1 - rnd() * (1 - Math.exp(-690 / 230)));
        return { x: 30 + rnd() * (W - 60), y: G - h - 8, low: h < 170 };
      });
      const rays = [90, 230, 370, 530, 670, 810];
      const tag = (cls, x, y, t) => `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" style="font:800 46px var(--body);fill:#fff;stroke:#17131F;stroke-width:12;paint-order:stroke;opacity:0">${t}</text>`;
      box.innerHTML = `<div class="headline" style="left:96px;top:300px;width:780px"></div>
        <svg viewBox="0 0 ${W} 790" style="position:absolute;left:930px;top:60px;width:${W}px;height:790px" role="img" aria-label="Air as dots, packed together near the ground and spread out higher up">
          ${dots.map((d) => `<circle class="${d.low ? 'dot low' : 'dot'}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="7" fill="#BFD9FF" opacity=".8"/>`).join('')}
          ${rays.map((x) => `<line class="ray" x1="${x}" y1="0" x2="${x}" y2="${G}" pathLength="1" stroke="#FFC400" stroke-width="7" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}
          <rect class="land" x="0" y="${G}" width="${W}" height="70" rx="8" fill="#5A4A38"/>
          <g class="bubble" style="opacity:0"><circle cx="450" cy="630" r="48" fill="${HOT}" stroke="#fff" stroke-width="5"/></g>
          ${tag('t-thin', 450, 60, 'Thin air')}${tag('t-thick', 250, 660, 'Thick air')}${tag('t-land', 450, 768, 'Warm ground')}${tag('t-cool', 450, 330, 'Spreads out: cools')}${tag('t-warm', 450, 330, 'Squeezed: warms')}
        </svg>`;
      const q = (s) => box.querySelector(s), ball = q('.bubble circle');
      const show = (s) => gsap.to(q(s), { opacity: 1, duration: .4 }), hide = (s) => gsap.to(q(s), { opacity: 0, duration: .3 });
      return (i, beat) => {
        const step = beat.step;
        lib.sfx.pop();
        if (step === 'rays') gsap.to(box.querySelectorAll('.ray'), { attr: { 'stroke-dashoffset': 0 }, duration: 1, stagger: .12, ease: 'power1.in' });
        if (step === 'ground') { gsap.to(q('.land'), { attr: { fill: HOT }, duration: .6 }); show('.t-land'); }
        if (step === 'warm') { gsap.to(box.querySelectorAll('.dot.low'), { attr: { fill: HOT }, opacity: 1, duration: .5, stagger: { amount: 1.4, from: 'random' } }); }
        if (step === 'thin') { gsap.to(box.querySelectorAll('.ray'), { opacity: .15, duration: .5 }); show('.t-thin'); show('.t-thick'); }
        if (step === 'spread') {
          hide('.t-thick'); hide('.t-thin'); gsap.to(q('.bubble'), { opacity: 1, duration: .3 });
          gsap.to(ball, { attr: { cy: 170, r: 118, fill: COOL }, duration: 3, ease: 'sine.inOut' }); show('.t-cool');
        }
        if (step === 'pump') {
          hide('.t-cool');
          gsap.to(ball, { attr: { cy: 630, r: 48, fill: HOT }, duration: 2.4, ease: 'sine.inOut' }); show('.t-warm');
        }
        if (step === 'final') {
          hide('.t-warm');
          gsap.to(ball, { attr: { cy: 170, r: 118, fill: COOL }, duration: 2.2, ease: 'sine.inOut' }); show('.t-thin');
        }
      };
    },

    /* A climb with a temperature that falls by about 6 degrees for every 1,000 meters. */
    ccClimb(box, lib) {
      const { gsap } = window;
      const y = (a) => 760 - a / 5000 * 710, x = (a) => 130 + a / 5000 * 640, temp = (a) => Math.round(28 - 6 * a / 1000) || 0;
      const path = `M0 760 L${x(0)} ${y(0)} L${x(5000)} ${y(5000)} L1100 760 Z`;
      const bands = [[0, 1000], [1000, 2000], [2000, 3000], [3000, 4700], [4700, 5000]];
      box.innerHTML = `<div class="headline" style="left:96px;top:96px;width:900px"></div>
        <div style="position:absolute;left:96px;top:370px;width:640px"><div class="tab cT" style="font:800 300px/.95 var(--display);letter-spacing:-.04em">28°</div><p class="sub cA" style="margin:0">at sea level</p></div>
        <svg viewBox="0 0 1100 790" style="position:absolute;left:760px;top:70px;width:1100px;height:790px;overflow:visible" role="img" aria-label="A mountain, with the temperature falling as the height rises">
          <defs><clipPath id="ccMtn"><path d="${path}"/></clipPath></defs>
          <g clip-path="url(#ccMtn)">${bands.map(([a, b], k) => `<rect x="0" y="${y(b)}" width="1100" height="${y(a) - y(b) + 1}" fill="${FLOORS[k].c}"/>`).join('')}</g>
          <path d="${path}" fill="none" stroke="#F5F1E2" stroke-width="5" stroke-linejoin="round"/>
          <g class="marks"></g>
          <circle class="walker" cx="${x(0)}" cy="${y(0)}" r="22" fill="#FFC400" stroke="#17131F" stroke-width="5"/>
        </svg>`;
      const walker = box.querySelector('.walker'), cT = box.querySelector('.cT'), cA = box.querySelector('.cA'), marks = box.querySelector('.marks');
      const val = { a: 0 };
      return (i, beat) => {
        const draw = () => { cT.textContent = `${temp(val.a)}°`; cA.textContent = val.a < 5 ? 'at sea level' : `at about ${(Math.round(val.a / 100) * 100).toLocaleString('en-US')} m`; };
        gsap.to(val, { a: beat.alt, duration: 1.3, ease: 'power2.inOut', onUpdate: draw, onComplete: draw });
        gsap.to(walker, { attr: { cx: x(beat.alt), cy: y(beat.alt) }, duration: 1.3, ease: 'power2.inOut' });
        if (beat.alt) {
          lib.sfx.pop();
          marks.insertAdjacentHTML('beforeend', `<text x="${x(beat.alt) - 34}" y="${y(beat.alt) + 14}" text-anchor="end" style="font:800 44px var(--body);fill:#FBFAFF">${beat.alt.toLocaleString('en-US')} m: ${temp(beat.alt)}°</text>`);
        }
      };
    },

    /* Three real places through one year: only London changes much. */
    ccYear(box, lib) {
      const { gsap } = window;
      const series = [
        { name: 'London', note: 'not on the Equator', c: '#C9C4D6', d: [5.6, 5.8, 7.9, 10.5, 13.7, 16.8, 19.0, 18.7, 15.9, 12.3, 8.4, 5.9] },
        { name: 'Bogotá', note: 'about 2,600 m up', c: COOL, d: [13.6, 14.0, 14.1, 14.3, 14.3, 14.2, 13.8, 13.8, 13.8, 13.7, 13.8, 13.7] },
        { name: 'Girardot', note: 'about 290 m up', c: HOT, d: [28.8, 28.9, 28.3, 27.2, 27.1, 27.4, 28.4, 29.5, 28.8, 27.6, 27.0, 27.6] },
      ];
      const X = (m) => 100 + m * 100, Y = (t) => 590 - t / 32 * 560;
      const line = (d) => d.map((t, m) => `${m ? 'L' : 'M'}${X(m)} ${Y(t).toFixed(1)}`).join(' ');
      const rule = (t) => `<line x1="${X(0)}" x2="${X(11)}" y1="${Y(t)}" y2="${Y(t)}" stroke="#FFF" stroke-opacity=".14" stroke-width="2"/><text x="${X(0) - 22}" y="${Y(t) + 11}" text-anchor="end" style="font:500 32px var(--body);fill:#C9C4D6">${t}°</text>`;
      box.innerHTML = `<div class="headline" style="left:96px;top:96px"></div>
        <svg viewBox="0 0 1728 650" style="position:absolute;left:96px;top:225px;width:1728px;height:650px" role="img" aria-label="Average temperature each month. London goes from 6 to 19 degrees. Bogotá stays about 14, and Girardot about 28.">
          ${[0, 10, 20, 30].map(rule).join('')}
          ${'JFMAMJJASOND'.split('').map((l, m) => `<text x="${X(m)}" y="636" text-anchor="middle" style="font:500 32px var(--body);fill:#C9C4D6">${l}</text>`).join('')}
          ${series.map((s, k) => `<path class="ln" data-k="${k}" d="${line(s.d)}" pathLength="1" fill="none" stroke="${s.c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1" stroke-dashoffset="1"/>
            <g class="lb" data-k="${k}" style="opacity:0"><rect x="${X(11) + 22}" y="${Y(s.d[11]) - 16}" width="26" height="26" rx="6" fill="${s.c}"/><text x="${X(11) + 60}" y="${Y(s.d[11]) + 6}" style="font:800 44px var(--body);fill:#FBFAFF">${s.name}</text><text x="${X(11) + 60}" y="${Y(s.d[11]) + 46}" style="font:500 32px var(--body);fill:#C9C4D6">${s.note}</text></g>`).join('')}
          <g class="lb" data-k="0" style="opacity:0"><text x="${X(0)}" y="${Y(5.6) - 18}" text-anchor="middle" style="font:800 40px var(--body);fill:#FBFAFF">6°</text><text x="${X(6)}" y="${Y(19) - 18}" text-anchor="middle" style="font:800 40px var(--body);fill:#FBFAFF">19°</text></g>
        </svg>`;
      return (i, beat) => {
        if (beat.line == null) return;
        lib.sfx.pop();
        gsap.to(box.querySelector(`.ln[data-k="${beat.line}"]`), { attr: { 'stroke-dashoffset': 0 }, duration: 1.4, ease: 'power1.inOut' });
        gsap.to(box.querySelectorAll(`.lb[data-k="${beat.line}"]`), { opacity: 1, duration: .5, delay: 1 });
      };
    },

    /* One thermal floor at a time: a large real photo, with "you are here" on the stack of floors. */
    ccFloor(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:90px;width:1250px;font-size:112px;color:#fff;text-shadow:0 4px 30px #000C"></div>
        <div class="gauge" style="position:absolute;right:70px;top:90px;width:390px;display:flex;flex-direction:column-reverse;gap:8px">
          ${FLOORS.map((f, k) => `<div class="fl" data-k="${k}" style="background:${f.c};color:${f.ink};height:132px;border-radius:12px;padding:14px 20px;box-sizing:border-box;opacity:.7;transform-origin:100% 50%;box-shadow:0 8px 30px #0008"><b style="font:800 44px/1.05 var(--display);display:block">${f.name}</b><span style="font:600 27px/1.1 var(--body)">${f.band}</span></div>`).join('')}
        </div>
        <div class="here" style="position:absolute;right:480px;top:0;background:#FFC400;color:#17131F;font:800 32px var(--body);padding:10px 20px;border-radius:12px;opacity:0;box-shadow:0 8px 30px #0008">You are here</div>`;
      const show = photoStack(box, lib, 'linear-gradient(90deg,#000B 0,#0000 52%),linear-gradient(180deg,#000A 0,#0000 40%),linear-gradient(270deg,#0009 0,#0000 26%)');
      const rows = [...box.querySelectorAll('.fl')], here = box.querySelector('.here');
      let last = -1;
      return (i, beat) => {
        show(beat.img, beat.pos);
        if (beat.floor === last) return;
        last = beat.floor;
        lib.sfx.pop();
        rows.forEach((r, k) => gsap.to(r, { opacity: k === beat.floor ? 1 : .7, scale: k === beat.floor ? 1.08 : 1, duration: .4 }));
        gsap.fromTo(here, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .4, delay: .2 });
        gsap.set(here, { top: 90 + (4 - beat.floor) * 140 + 42 });
      };
    },

    /* A still page to read: all five floors stacked like a mountain. */
    ccFloorsPage(box) {
      const { gsap } = window;
      box.innerHTML = `<div class="headline" style="left:96px;top:70px;width:1728px;text-align:center"></div>
        <div style="position:absolute;left:96px;right:96px;top:190px;display:flex;flex-direction:column-reverse;align-items:center;gap:8px">
          ${FLOORS.map((f, k) => `<div class="row" style="width:${760 + (4 - k) * 240}px;max-width:100%;min-height:128px;box-sizing:border-box;padding:12px 30px;border-radius:14px;background:${f.c};color:${f.ink};display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center"><b style="font:800 50px/1.05 var(--display)">${f.name}</b><span style="font:600 32px/1.15 var(--body)">${f.band}${k < 4 ? `: ${f.food}` : ''}</span></div>`).join('')}
        </div>`;
      const rows = [...box.querySelectorAll('.row')];
      return () => { gsap.fromTo(rows, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .5, stagger: .35, ease: 'power3.out' }); };
    },

    /* The real road from Girardot to Bogotá, shown as a climb. Three real heights, joined by a smooth line. */
    ccRoad(box, lib) {
      const { gsap } = window;
      const stops = [
        { name: 'Girardot', km: 0, h: 290, t: '28°', wear: 'T-shirt, shorts, sandals', img: 'colombia-girardot.jpg', label: 'Girardot, about 290 m' },
        { name: 'Fusagasugá', km: 75, h: 1700, t: '20°', wear: 'Long sleeves', img: 'colombia-fusa.jpg', label: 'Fusagasugá, about 1,700 m' },
        { name: 'Bogotá', km: 134, h: 2600, t: '14°', wear: 'A warm jacket', img: 'colombia-bogota.jpg', label: 'Bogotá, about 2,600 m' },
      ];
      const X = (km) => 70 + km / 134 * 1590, Y = (h) => 300 - (h - 290) / 2310 * 215;
      const P = stops.map((s) => [X(s.km), Y(s.h)]);
      const road = `M${P[0][0]} ${P[0][1]} C${P[0][0] + 240} ${P[0][1]},${P[1][0] - 220} ${P[1][1] + 40},${P[1][0]} ${P[1][1]} C${P[1][0] + 200} ${P[1][1] - 35},${P[2][0] - 180} ${P[2][1]},${P[2][0]} ${P[2][1]}`;
      const area = `${road} L${P[2][0] + 70} ${P[2][1]} L${P[2][0] + 70} 320 L0 320 L0 ${P[0][1]} Z`;
      const lands = [[0, 1000], [1000, 2000], [2000, 3100]];
      box.innerHTML = `<div class="headline" style="left:96px;top:56px;width:1728px"></div>
        <div class="pics" style="position:absolute;left:96px;top:170px;width:800px;height:370px;border-radius:18px;overflow:hidden;box-shadow:0 20px 60px #0009;background:#000">${stops.map((s) => `<img src="${lib.img(s.img)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0">`).join('')}</div>
        <div style="position:absolute;left:950px;top:160px;width:880px">
          <div class="rT tab" style="font:800 220px/1 var(--display);letter-spacing:-.04em">28°</div>
          <p class="rN" style="margin:6px 0 0;font:800 60px/1.1 var(--display)"></p>
          <p class="rW" style="margin:8px 0 0;font:500 46px/1.15 var(--body);color:#FFC400"></p>
        </div>
        <svg viewBox="0 0 1728 320" style="position:absolute;left:96px;top:560px;width:1728px;height:320px" role="img" aria-label="The road climbs from Girardot through Fusagasugá to Bogotá">
          <defs><clipPath id="ccRoadClip"><path d="${area}"/></clipPath></defs>
          <g clip-path="url(#ccRoadClip)">${lands.map(([, b], k) => `<rect x="0" y="${Y(b)}" width="1728" height="${320 - Y(b)}" fill="${FLOORS[k].c}"/>`).reverse().join('')}</g>
          <path class="rp" d="${road}" fill="none" stroke="#FBFAFF" stroke-width="9" stroke-linecap="round"/>
          ${stops.map((s, k) => `<text x="${P[k][0] + (k === 2 ? 40 : k === 1 ? -10 : -6)}" y="${P[k][1] - 38}" text-anchor="${k === 0 ? 'start' : 'end'}" style="font:800 36px var(--body);fill:#FBFAFF">${s.label}</text>`).join('')}
          <circle class="car" cx="${P[0][0]}" cy="${P[0][1]}" r="20" fill="#FFC400" stroke="#17131F" stroke-width="5"/>
        </svg>`;
      const q = (s) => box.querySelector(s), imgs = [...box.querySelectorAll('.pics img')], rp = q('.rp'), car = q('.car');
      const len = rp.getTotalLength();
      const lengthAt = (x) => { let lo = 0, hi = len; for (let n = 0; n < 24; n++) { const mid = (lo + hi) / 2; if (rp.getPointAtLength(mid).x < x) lo = mid; else hi = mid; } return lo; };
      const atStop = stops.map((s, k) => (k === 2 ? len : k ? lengthAt(P[k][0]) : 0));
      const pos = { l: 0 };
      let photo = -1;
      return (i, beat) => {
        const whole = Math.floor(beat.stop), part = beat.stop - whole;
        const to = part ? atStop[whole] + (atStop[whole + 1] - atStop[whole]) * part : atStop[whole];
        const place = () => { const p = rp.getPointAtLength(pos.l); car.setAttribute('cx', p.x); car.setAttribute('cy', p.y); };
        gsap.to(pos, { l: to, duration: 2, ease: 'sine.inOut', onUpdate: place, onComplete: place });
        const s = stops[whole];
        if (!part && whole !== photo) {
          if (photo >= 0) gsap.to(imgs[photo], { opacity: 0, duration: .6 });
          gsap.to(imgs[whole], { opacity: 1, duration: .6 });
          photo = whole; lib.sfx.pop();
        }
        q('.rT').textContent = beat.total ? '14° colder' : s.t;
        q('.rT').style.fontSize = beat.total ? '150px' : '220px';
        q('.rN').textContent = beat.total ? 'About 134 km' : s.name;
        q('.rW').textContent = beat.total ? 'About three hours in good traffic' : part ? 'On the road…' : s.wear;
      };
    },

    /* Try it now: the whole screen climbs, and the child acts it out. */
    ccDress(box, lib) {
      const { gsap } = window;
      box.innerHTML = `<p class="pill" style="position:absolute;left:96px;top:90px;margin:0;z-index:2">Try it now</p>
        <h1 class="act" style="position:absolute;left:96px;top:230px;width:1300px;margin:0;font:800 190px/1 var(--display);letter-spacing:-.03em;color:#fff;text-shadow:0 6px 40px #000C;z-index:2"></h1>
        <div class="temp tab" style="position:absolute;right:96px;top:90px;font:800 170px/1 var(--display);color:#FFC400;text-shadow:0 6px 40px #000C;z-index:2"></div>`;
      const show = photoStack(box, lib, 'linear-gradient(90deg,#000B 0,#0003 70%),linear-gradient(180deg,#0008 0,#0000 40%)');
      const act = box.querySelector('.act'), temp = box.querySelector('.temp');
      return (i, beat) => {
        show(beat.img, beat.pos);
        lib.sfx.pop();
        act.textContent = beat.act; temp.textContent = beat.temp;
        gsap.fromTo(act, { scale: .7, opacity: 0, transformOrigin: '0 50%' }, { scale: 1, opacity: 1, duration: .5, ease: 'back.out(2)' });
        gsap.fromTo(temp, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .4 });
      };
    },

    /* What people wear and eat, card by card. */
    ccLiving(box, lib) {
      const { gsap } = window;
      const cards = [['colombia-ruana.jpg', 'A ruana', '50% 30%'], ['colombia-vueltiao.jpg', 'A sombrero vueltiao', '50% 50%'], ['colombia-ajiaco.jpg', 'Ajiaco', '50% 50%']];
      box.innerHTML = `<div class="headline" style="left:96px;top:70px"></div>
        <div style="position:absolute;left:96px;right:96px;top:200px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
          ${cards.map(([src, name, pos]) => `<figure class="lc" style="margin:0;background:#FFF;color:#17131F;border-radius:22px;overflow:hidden;opacity:0;box-shadow:0 24px 60px #000A"><img src="${lib.img(src)}" alt="${name}" style="width:100%;height:540px;object-fit:cover;object-position:${pos};display:block"><figcaption style="padding:14px 24px;font:800 48px var(--display)">${name}</figcaption></figure>`).join('')}
        </div>`;
      const els = [...box.querySelectorAll('.lc')];
      return (i, beat) => {
        lib.sfx.pop();
        gsap.fromTo(els[beat.show], { y: 120, opacity: 0, rotation: -3 }, { y: 0, opacity: 1, rotation: 0, duration: .7, ease: 'back.out(1.4)' });
        els.forEach((c, k) => { if (k < beat.show) gsap.to(c, { opacity: .55, duration: .4 }); });
      };
    },

    /* The Sierra Nevada, side on, from the sea to the peaks, to scale. The slope is simplified. */
    ccSierra(box, lib) {
      const { gsap } = window;
      const X = (km) => 250 + km / 42 * 1170, Y = (h) => 840 - h / 5700 * 610;
      const slope = [[0, 0], [6, 500], [12, 1300], [18, 2300], [26, 3500], [34, 4800], [42, 5700]];
      const back = [[46, 5000], [52, 3900], [58, 3000]];
      const shape = `M${X(0)} 840 ${[...slope, ...back].map(([k, h]) => `L${X(k)} ${Y(h)}`).join(' ')} L1920 ${Y(2600)} L1920 840 Z`;
      const edges = [0, 1000, 2000, 3000, 4700, 5800];
      const names = [[1000, 'Hot'], [1110, 'Mild'], [1230, 'Cold'], [1340, 'Páramo'], [0, '']];
      const walk = [[3, 250], [9, 1000], [15, 1900], [28, 3800], [42, 5700]];
      box.innerHTML = `<div class="headline" style="left:96px;top:70px;width:1100px"></div>
        <svg viewBox="0 0 1920 900" style="position:absolute;left:0;top:0;width:1920px;height:900px" role="img" aria-label="A mountain rising from the sea to snow, in about 42 kilometers">
          <defs><clipPath id="ccSierraClip"><path d="${shape}"/></clipPath></defs>
          <rect x="0" y="838" width="${X(0)}" height="24" fill="${COOL}"/>
          <g clip-path="url(#ccSierraClip)">${FLOORS.map((f, k) => `<rect class="sb" data-k="${k}" x="0" y="${Y(edges[k + 1])}" width="1920" height="${Y(edges[k]) - Y(edges[k + 1]) + 1}" fill="${f.c}" opacity=".24"/>`).join('')}</g>
          <path d="${shape}" fill="none" stroke="#F5F1E2" stroke-width="5" stroke-linejoin="round"/>
          ${names.map(([x, n], k) => (n ? `<text class="sn" data-k="${k}" x="${x}" y="${Y((edges[k] + edges[k + 1]) / 2) + 16}" text-anchor="middle" style="font:800 46px var(--body);fill:#17131F;opacity:0">${n}</text>` : '')).join('')}
          <g class="peakM" style="opacity:0"><text x="${X(42)}" y="${Y(5700) - 36}" text-anchor="middle" style="font:800 46px var(--body);fill:#FBFAFF">Over 5,700 m</text></g>
          <g class="distM" style="opacity:0"><line x1="${X(0)}" x2="${X(42)}" y1="868" y2="868" stroke="#FFC400" stroke-width="7"/><line x1="${X(0)}" x2="${X(0)}" y1="852" y2="884" stroke="#FFC400" stroke-width="7"/><line x1="${X(42)}" x2="${X(42)}" y1="852" y2="884" stroke="#FFC400" stroke-width="7"/><text x="${X(12) + 60}" y="826" text-anchor="middle" style="font:800 42px var(--body);fill:#FBFAFF;stroke:#17131F;stroke-width:9;paint-order:stroke">About 42 km</text></g>
          <text x="${X(0) / 2}" y="826" text-anchor="middle" style="font:600 32px var(--body);fill:#BFD9FF">Sea</text>
          <circle class="sw" cx="${X(0)}" cy="838" r="20" fill="#FFC400" stroke="#17131F" stroke-width="5" style="opacity:0"/>
        </svg>
        <div class="sI" style="position:absolute;left:96px;top:310px;width:470px;height:320px;border-radius:18px;overflow:hidden;background:#000;box-shadow:0 20px 60px #000A;opacity:0"><img alt="" style="width:100%;height:100%;object-fit:cover;display:block"></div>`;
      const q = (s) => box.querySelector(s), inset = q('.sI');
      return (i, beat) => {
        if (beat.peak) gsap.to(q('.peakM'), { opacity: 1, duration: .5 });
        if (beat.dist) gsap.fromTo(q('.distM'), { opacity: 0 }, { opacity: 1, duration: .5 });
        if (beat.floors) {
          lib.sfx.pop();
          beat.floors.forEach((f) => {
            gsap.to(q(`.sb[data-k="${f}"]`), { opacity: 1, duration: .6 });
            const n = q(`.sn[data-k="${f}"]`); if (n) gsap.to(n, { opacity: 1, duration: .4, delay: .2 });
          });
          const [k, h] = walk[beat.floors[beat.floors.length - 1]];
          gsap.to(q('.sw'), { opacity: 1, attr: { cx: X(k), cy: Y(h) }, duration: 1.1, ease: 'power2.inOut' });
        }
        if (beat.inset) {
          const img = q('.sI img');
          img.src = lib.img(beat.inset); img.style.objectPosition = beat.pos || '50% 50%';
          gsap.fromTo(inset, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.5)' });
        } else if (beat.floors) gsap.to(inset, { opacity: 0, duration: .3 });
      };
    },

    /* Two close-ups of how a frailejón stays warm. */
    ccPlant(box, lib) {
      const { gsap } = window;
      const pics = [['colombia-wool.jpg', 'Soft, woolly hairs', '50% 45%'], ['colombia-coat.jpg', 'A jacket of dead leaves', '85% 60%']];
      box.innerHTML = `<div class="headline" style="left:96px;top:70px"></div>
        <div style="position:absolute;left:96px;right:96px;top:200px;display:grid;grid-template-columns:1fr 1fr;gap:36px">
          ${pics.map(([src, name, pos]) => `<figure class="pl" style="margin:0;position:relative;height:650px;border-radius:22px;overflow:hidden;opacity:0;box-shadow:0 24px 60px #000A"><img src="${lib.img(src)}" alt="${name}" style="width:100%;height:100%;object-fit:cover;object-position:${pos};display:block"><figcaption style="position:absolute;left:0;right:0;bottom:0;padding:14px 26px;background:#000C;color:#fff;font:800 46px var(--display)">${name}</figcaption></figure>`).join('')}
        </div>`;
      const els = [...box.querySelectorAll('.pl')];
      return (i, beat) => { lib.sfx.pop(); gsap.fromTo(els[beat.show], { opacity: 0, x: beat.show ? 200 : -200 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }); };
    },

    /* You and a frailejón, drawn to the same scale. Years count up as it grows. */
    ccGrowth(box, lib) {
      const { gsap } = window;
      const M = 420, base = 850;
      const bar = (cls, left, h, c, ink, name, sub) => `<div class="${cls}" style="position:absolute;left:${left}px;top:${base - h}px;width:330px;height:${h}px;background:${c};color:${ink};border-radius:16px 16px 0 0;transform-origin:50% 100%;transform:scaleY(0);overflow:hidden;padding:18px 20px;box-sizing:border-box"><b style="display:block;font:800 52px/1 var(--display)">${name}</b><span style="display:block;margin-top:8px;font:600 34px/1.12 var(--body)">${sub}</span></div>`;
      box.innerHTML = `<div class="headline" style="left:96px;top:70px"></div>
        <img src="${lib.img('colombia-paramo.jpg')}" alt="Frailejones" style="position:absolute;left:96px;top:200px;width:800px;height:650px;object-fit:cover;border-radius:22px;box-shadow:0 24px 60px #000A">
        ${bar('bY', 1010, 1.4 * M, '#FFC400', '#17131F', 'You', 'About 1.4 m, in about 11 years')}
        ${bar('bF', 1400, 1 * M, FLOORS[3].c, '#17131F', 'Frailejón', '1 m, in up to 100 years')}
        <div style="position:absolute;left:980px;width:790px;top:${base}px;height:6px;background:#FBFAFF"></div>
        <div class="bT" style="position:absolute;left:1190px;width:370px;top:${base - 170}px;text-align:center"><p style="margin:0 0 40px;font:800 44px/1.1 var(--body)">One year of growth, to scale</p><i style="display:block;height:${0.02 * M}px;margin-top:${118 - 0.02 * M - 40 + 6}px;background:${FLOORS[3].c};border-radius:2px"></i></div>
        <div class="yrs tab" style="position:absolute;left:1400px;width:330px;top:220px;text-align:center;font:800 90px/1 var(--display);opacity:0"><span class="yv">0</span><small style="display:block;font:600 36px var(--body)">years</small></div>`;
      const q = (s) => box.querySelector(s), yrs = { v: 0 };
      return (i, beat) => {
        if (beat.you) { lib.sfx.pop(); gsap.to(q('.bT'), { opacity: 0, duration: .3 }); gsap.to(q('.bY'), { scaleY: 1, duration: 1, ease: 'power2.out' }); }
        if (beat.plant) {
          gsap.to(q('.yrs'), { opacity: 1, duration: .3 });
          gsap.to(q('.bF'), { scaleY: 1, duration: 4, ease: 'none' });
          gsap.to(yrs, { v: 100, duration: 4, ease: 'none', onUpdate: () => { q('.yv').textContent = Math.round(yrs.v); }, onComplete: () => { q('.yv').textContent = '100'; lib.sfx.pop(); } });
        }
      };
    },

    /* How water moves through a páramo, with the steps in a row along the bottom. */
    ccWater(box, lib) {
      const { gsap } = window;
      const steps = ['Clouds', 'Leaves', 'Soil', 'Streams', 'Cities'];
      box.innerHTML = `<div class="headline" style="left:96px;top:90px;color:#fff;text-shadow:0 4px 30px #000C"></div>
        <div style="position:absolute;left:96px;right:96px;top:730px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px">
          ${steps.map((s, k) => `<div class="st" style="position:relative;background:#17131FDD;color:#FBFAFF;border-radius:16px;padding:22px 10px;text-align:center;font:800 50px var(--display);opacity:.55">${s}${k < 4 ? '<i style="position:absolute;right:-16px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:#FFC400"></i>' : ''}</div>`).join('')}
        </div>`;
      const show = photoStack(box, lib, 'linear-gradient(180deg,#000A 0,#0000 38%),linear-gradient(0deg,#000A 0,#0000 40%)');
      const chips = [...box.querySelectorAll('.st')];
      return (i, beat) => {
        show(beat.img);
        lib.sfx.pop();
        chips.forEach((c, k) => gsap.to(c, { opacity: k <= beat.step ? 1 : .55, backgroundColor: k === beat.step ? '#FFC400' : '#17131FDD', color: k === beat.step ? '#17131F' : '#FBFAFF', duration: .35 }));
      };
    },

    /* One square for each square kilometer of ice: about 348 then, about 31 now. */
    ccIce(box, lib) {
      const { gsap } = window;
      const cols = 29, rows = 12, cell = 50, size = 42, total = 348, kept = 31;
      const keep = new Set(Array.from({ length: kept }, (_, n) => Math.floor((n + .5) * total / kept)));
      const cells = Array.from({ length: total }, (_, n) => ({ x: (n % cols) * cell, y: Math.floor(n / cols) * cell, keep: keep.has(n) }));
      box.innerHTML = `<div class="headline" style="left:96px;top:70px;width:1728px"></div>
        <svg viewBox="0 0 ${cols * cell} ${rows * cell}" style="position:absolute;left:235px;top:220px;width:${cols * cell}px;height:${rows * cell}px" role="img" aria-label="Squares of ice. About 348 in the 1800s, about 31 in 2024.">
          ${cells.map((c) => `<rect class="${c.keep ? 'iK' : 'iL'}" x="${c.x}" y="${c.y}" width="${size}" height="${size}" rx="6" fill="#F5F7FF"/>`).join('')}
        </svg>
        <p class="iB" style="position:absolute;left:235px;top:540px;width:360px;margin:0;font:800 44px/1.15 var(--body);color:#FBFAFF;opacity:0">About 5.5 km across</p>
        <figure class="iP" style="position:absolute;left:800px;top:220px;width:1000px;height:640px;margin:0;border-radius:22px;overflow:hidden;box-shadow:0 24px 60px #000A;opacity:0"><img src="${lib.img('colombia-peak.jpg')}" alt="Ice on the Sierra Nevada de El Cocuy" style="width:100%;height:100%;object-fit:cover;object-position:50% 70%;display:block"><figcaption style="position:absolute;left:0;right:0;bottom:0;padding:12px 24px;background:#000C;color:#fff;font:600 34px var(--body)">Ice on El Cocuy</figcaption></figure>`;
      const lost = [...box.querySelectorAll('.iL')], left = [...box.querySelectorAll('.iK')];
      const q = (s) => box.querySelector(s);
      fadeIn(box.querySelector('svg'));
      return (i, beat) => {
        if (beat.melt) { lib.sfx.pop(); gsap.to(lost, { opacity: .12, duration: .4, stagger: { amount: 2.4, from: 'random' } }); }
        if (beat.gather) {
          lib.sfx.pop();
          gsap.to(lost, { opacity: 0, duration: .4 });
          left.forEach((r, n) => gsap.to(r, { attr: { x: (n % 6) * cell, y: Math.floor(n / 6) * cell }, duration: 1.2, ease: 'power3.inOut' }));
          gsap.to(q('.iB'), { opacity: 1, duration: .4, delay: 1 });
        }
        if (beat.pic) gsap.to(q('.iP'), { opacity: 1, duration: .6 });
      };
    },
  });
})();
