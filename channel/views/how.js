/* How it works, as a brochure for parents. Each page holds one idea and fits one screen. It prints as a landscape PDF.
   Pictures in assets/how/ are real screenshots. Only say what's true: what isn't built yet stays on the last page. */
(function () {
  const pic = (name, alt = '') => `<img src="assets/how/${name}.jpg" alt="${esc(alt)}" loading="lazy">`;
  const tv = (name, alt) => `<figure class="fTv"><div>${pic(name, alt)}</div></figure>`;
  const lap = (name, alt) => `<figure class="fLap"><div>${pic(name, alt)}</div></figure>`;
  const phone = (name, alt) => `<figure class="fPhone"><div>${pic(name, alt)}</div></figure>`;

  function pages() {
    const P = window.CURRICULUM.program, units = P.reduce((n, p) => n + p.units.length, 0), lessons = P.reduce((n, p) => p.units.reduce((m, u) => m + u[1], n), 0), ready = window.EPISODES.length;
    return [
      ['ppCover', `<div class="ppCoverText"><p class="ppBrand">Home School <i>TV</i></p><h1>A real school, at home.</h1><p class="ppLead">Lessons on your TV. Tests on each child’s own device. Every mark in one place.</p><p class="ppSmall">How it works, for parents</p></div>
        <div class="ppCoverArt">${tv('tv-home', 'The home screen on a TV')}${phone('phone-test', 'A test on a phone')}</div>`],

      ['ppThree', `<h2>Three screens. One school.</h2><div class="ppCols">
        <div>${tv('lesson', 'A lesson playing on the TV')}<h3>The TV</h3><p>The family watches lessons together. Nothing personal ever shows here.</p></div>
        <div>${lap('day', 'A child’s My day page')}<h3>Each child’s device</h3><p>Their own sign-in opens their own day, tests and marks. Laptop, tablet or phone.</p></div>
        <div>${lap('parent-pad', 'The parent pad')}<h3>Your iPad or phone</h3><p>The parent pad: today’s classes, marks and homework for every child, on one screen.</p></div></div>`],

      ['ppDay', `<h2>One school day.</h2><ol class="ppSteps">
        <li>${pic('diary', 'The diary')}<b>Open the diary</b><p>Today’s classes are already there.</p></li>
        <li>${pic('day', 'My day')}<b>Warm up</b><p>Three quick questions, one minute.</p></li>
        <li>${pic('lesson', 'A lesson')}<b>Watch together</b><p>The lesson plays on the TV.</p></li>
        <li>${pic('qr', 'A QR code on the TV')}<b>Scan the code</b><p>Each child opens the test on their own device.</p></li>
        <li>${pic('t-match', 'A test question')}<b>Take the test</b><p>Every answer is explained straight away.</p></li>
        <li>${pic('journal', 'The gradebook')}<b>See the mark</b><p>It goes to the diary and to you.</p></li></ol>`],

      ['ppPad', `<figure class="fPad"><div>${pic('pad-home', 'A child’s home screen on an iPad')}</div></figure><div class="ppPadText"><h2>On your child’s iPad.</h2><p class="ppLead">One screen, like the best apps they already use. Nothing to scroll, and one clear thing to do next.</p><ol class="ppSections"><li><span><b>Their name and picture.</b> Tap it to change their picture and look.</span></li><li><span><b>Next up.</b> The one big thing to do, with its steps.</span></li><li><span><b>To do.</b> Homework that’s due. A long list scrolls inside this box only.</span></li><li><span><b>Today’s classes.</b> The timetable, in order.</span></li><li><span><b>Five tabs.</b> Today, Diary, Lessons, To do and Marks, always in the same place.</span></li></ol></div>`],

      ['ppTabs', `<h2>Everything is one tap away.</h2><div class="ppTabGrid"><div><figure class="fPad"><div>${pic('pad-diary', 'The diary')}</div></figure><h3>Diary</h3><p>The week, with homework and marks.</p></div><div><figure class="fPad"><div>${pic('pad-lessons', 'The lessons tab')}</div></figure><h3>Lessons</h3><p>Every lesson that’s ready, and the whole year.</p></div><div><figure class="fPad"><div>${pic('pad-todo', 'The to do tab')}</div></figure><h3>To do</h3><p>Tests, re-tests and anything you set.</p></div><div><figure class="fPad"><div>${pic('pad-marks', 'The marks tab')}</div></figure><h3>Marks</h3><p>Their own marks, and nobody else’s.</p></div></div>`],

      ['ppFinger', `<h2>On a tablet, fingers do the work.</h2><div><figure class="fPad"><div>${pic('pad-test-map', 'Tapping a region on a map')}</div></figure><h3>Tap the place itself</h3><p>The answer checks itself straight away.</p></div><div><figure class="fPad"><div>${pic('pad-test-muscle', 'Pulling a bone to shorten a muscle')}</div></figure><h3>Pull, drag and swipe</h3><p>Each drag also works by tapping.</p></div><div><figure class="fPad"><div>${pic('pad-test-result', 'A test result')}</div></figure><h3>See what to fix</h3><p>Honest words, and mistakes to fix straight away.</p></div>`],

      ['ppLesson', `${tv('lesson', 'A lesson showing the Pacific region of Colombia, with a map')}<div class="ppSide"><h2>Lessons that keep moving.</h2><ul class="ppList"><li><b>A voice tells the story,</b> with subtitles.</li><li><b>Real photos and real maps,</b> each one checked against the line it goes with.</li><li><b>Stop and guess</b> moments, to shout out together.</li><li><b>Short video clips,</b> only after a parent has watched them.</li><li><b>Chapters</b> you can jump between with the TV remote.</li></ul><p class="ppSmall">New lessons run about 15 minutes.</p></div>`],

      ['ppLesson ppWords', `${tv('words', 'A lesson with Spanish key words in the corner')}<div class="ppSide"><h2>Spanish key words, if you want them.</h2><ul class="ppList"><li><b>Off unless you turn it on.</b> Lessons stay in English.</li><li><b>For the family or one child,</b> in Admin.</li><li><b>While a key word is said,</b> its Spanish appears in the corner.</li><li><b>At the end,</b> every key word in both languages.</li></ul><p class="ppSmall">Ready for the Skeleton lesson. More lessons next.</p></div>`],

      ['ppTests', `<h2>A test, not a form.</h2><p class="ppLead">Children do something real with what they just learned.</p><div class="ppFour">
        <figure>${pic('q-region', 'Tapping a region on the map of Colombia')}<figcaption>Tap the real place on the map</figcaption></figure>
        <figure>${pic('q-estimate', 'Setting the height of Bogotá on a mountain')}<figcaption>Set the height on the mountain</figcaption></figure>
        <figure>${pic('q-contract', 'Shortening a muscle with a slider')}<figcaption>Shrink a muscle and see what happens</figcaption></figure>
        <figure>${pic('q-match', 'Connecting photos to regions')}<figcaption>Connect each photo to its region</figcaption></figure></div>
        <p class="ppFoot">Mistakes come back after <b>1, 7 and 30 days,</b> so learning sticks.</p>`],

      ['ppLooks', `<div class="ppLooksText"><h2>Their school. Their look.</h2><p class="ppLead">Each child picks from 14 looks, in light or dark, inspired by the kinds of games they love. Their choice follows them to any device.</p><p class="ppSmall">The questions stay exactly the same. Only colors and shapes change. All looks are our own designs.</p></div>
        <div class="ppFan"><figure>${pic('look-realm', 'The same question in a dark fantasy look')}</figure><figure>${pic('look-bubble', 'The same question in a bright party look')}</figure><figure>${pic('look-block', 'The same question in a block-world look')}</figure></div>`],

      ['ppDiary', `<div class="ppWide">${lap('diary', 'A week in the diary')}</div><div class="ppNotes"><h2>A personal diary, like a real school’s.</h2><p class="ppLead">Think of the щоденник from Ukrainian schools, always up to date.</p><ul class="ppList"><li><b>The week on one screen,</b> by day and class.</li><li><b>Homework and marks</b> fill in by themselves.</li><li><b>You sign each week,</b> and can leave a note.</li></ul></div>`],

      ['ppWeek', `<div class="ppNotes"><h2>You set the week.</h2><p class="ppLead">Different subjects on different days, like a normal school. Lessons follow it by themselves.</p><ul class="ppList"><li><b>A ready-made start,</b> worked out from how many lessons each subject has.</li><li><b>Change any class,</b> or give a child their own timetable.</li><li><b>A sick day or a trip?</b> Classes move to the next school day, and nothing is lost.</li></ul></div><div class="ppWide">${lap('timetable', 'The timetable page')}</div>`],

      ['ppProgram', `<div class="ppNums"><h2>The whole year, on one page.</h2><dl><div><dt>${P.length}</dt><dd>subjects</dd></div><div><dt>${units}</dt><dd>units</dd></div><div><dt>${lessons}</dt><dd>lessons planned</dd></div><div><dt>${ready}</dt><dd>ready to watch today, with more being made</dd></div></dl><p class="ppSmall">Year 7. Follows England’s National Curriculum, with units in Oak National Academy’s order. It isn’t approved or accredited by them.</p></div><div class="ppWide">${lap('program', 'The program document')}</div>`],

      ['ppCharge', `<h2>You stay in charge.</h2><div class="ppSplit"><div>${lap('exam', 'A timed exam')}<h3>Exams feel like exams</h3><p>You start each one with your PIN. It’s timed, with one attempt, and answers appear only at the end.</p></div><div>${lap('journal', 'The gradebook')}<h3>You see everything</h3><p>Every test and exam for every child. Children check their own written answers against a model answer, so nothing waits for you.</p></div></div>`],

      ['ppWeek ppFamily', `<div class="ppNotes"><h2>Everyone has their own login.</h2><p class="ppLead">Each parent and each child signs in with their own name and password.</p><ul class="ppList"><li><b>Add the other parent</b> in Admin, Family. They get a starting password and choose their own.</li><li><b>Children’s logins</b> live inside your account. No email needed.</li><li><b>Your own page</b> for your name, password and text size, so every screen is easy to read.</li></ul></div><div class="ppWide">${lap('family', 'The Family page with parents and children')}</div>`],

      ['ppComing', `<div class="ppComingHead"><h2>What’s coming.</h2><p class="ppLead">Plans can change. We’ll tell you when each one arrives.</p></div><div class="ppComingCols">
        <div><h3>Being made now</h3><ul class="ppList"><li>New looks for the parent pad, with bigger, clearer text</li><li>Simpler Admin pages</li><li>Fewer, bigger things on the parent pad, for easy reading</li></ul></div>
        <div><h3>Next</h3><ul class="ppList"><li>Spanish key words in every lesson</li><li>A practice tab for children: quick quizzes, word games and habits</li><li>Maths daily practice</li><li>More lessons: feelings, the brain, Colombia and the human body</li></ul></div>
        <div><h3>Later</h3><ul class="ppList"><li>Lessons fully in Spanish, at your children’s level</li><li>Secure online accounts and daily backups</li><li>More year groups</li><li>Family plans, after the free trial</li></ul></div></div>`],

      ['ppLast', `<div><h2>Made with children’s privacy in mind.</h2><ul class="ppChecks"><li>No child email, ever</li><li>No ads, and no tracking on child screens</li><li>Children’s logins sit inside your account</li><li>Each person has one sign-in, and it opens their own page</li></ul></div>
        <div class="ppHonest"><h3>Good to know</h3><p>Today, family data stays on your own computer at home, and anyone on your home Wi-Fi can reach it.</p><div class="ppBtns"><button class="tvBtn" data-f id="openMe">Sign in</button><button class="tvBtn alt" data-f id="openAssessFromPlan">How tests and exams work</button></div></div>`],
    ];
  }
  /* Draws a brochure: one idea per page, each page fits one screen, and it prints as a landscape PDF. How it works and Tests and exams both use it. */
  function brochure(route, list) {
    window.setRoute(route);
    const parent = window.Store.isParent();
    const html = `<div class="docWrap promo"><div class="docBar">${parent ? '' : '<button data-f data-back>Back</button>'}<span class="docBarGap"></span><button data-f id="docPrint">Print or save as PDF</button></div>
      ${list.map(([cls, body], i) => `<section class="pp ${cls}" aria-label="Page ${i + 1} of ${list.length}">${body}${i ? `<footer class="ppPage"><span>Home School TV</span><span>${i + 1}</span></footer>` : ''}</section>`).join('')}</div>`;
    if (parent) { window.cabinetPage(route, html, 'doc'); return; }
    document.body.dataset.surface = 'doc';
    app.innerHTML = html;
    window.scrollTo(0, 0);
    app.querySelector('.docBar [data-f]')?.focus({ preventScroll: true });
  }
  window.renderHow = () => brochure('how', pages());
  window.Brochure = { brochure, pic, tv, lap, phone };
})();
