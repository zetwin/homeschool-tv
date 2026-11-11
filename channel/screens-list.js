/* Internal list of the service's pages, for reviewing them. Families never see this; it's reached only at #screens.
   Each group has the pages in use. `more` holds other versions or small pages, with no picture.
   `size` is the screen its reader really uses. tools/capture-screens.mjs takes the pictures. */
window.SCREEN_GROUPS = [
  { id: 'today', title: 'Today', items: [
    { id: 'home', name: 'TV home', who: 'Children together, on the TV', size: 'tv', open: 'home' },
    { id: 'day', name: 'My day', who: 'One child, on their own device', size: 'device', open: 'myDay' },
    { id: 'diary', name: 'Diary', who: 'One child, a week on one screen', size: 'device', open: 'diary' },
    { id: 'timetable', name: 'Timetable', who: 'A parent, on a laptop', size: 'device', open: 'timetable' },
  ] },
  { id: 'program', title: 'Program', items: [
    { id: 'map-shelves', name: 'The whole year', who: 'Chosen version E', size: 'tv', open: 'map', arg: 'shelves' },
    { id: 'map-channel', name: 'Inside a subject', who: 'Chosen version D', size: 'tv', open: 'map', arg: 'channel' },
    { id: 'program-doc', name: 'Program document', who: 'Parents and children, formal and printable', size: 'device', open: 'programDoc' },
  ], more: [['Year on one page', 'map', 'wall'], ['Book contents', 'map', 'contents'], ['One path', 'map', 'path'], ['Zoom in', 'map', 'zoom'], ['School year', 'map', 'year']], moreLabel: 'Other versions:' },
  { id: 'lesson', title: 'Lesson', items: [
    { id: 'lesson-2', img: 'home', name: 'Lesson page', who: 'Children together, on the TV', size: 'tv', open: 'lesson', arg: 'muscles' },
    { id: 'play-2', name: 'Lesson playing', who: 'Opens from the start of Muscles', size: 'tv', open: 'play', arg: 'muscles', shot: 'mu-kind-cardiac-1' },
  ], more: [['Lesson 1 page', 'lesson', 'skeleton'], ['Play Lesson 1', 'play', 'skeleton'], ['Emotions lesson page', 'lesson', 'emotions-1'], ['Play the emotions lesson', 'play', 'emotions-1']], moreLabel: 'Also:' },
  { id: 'test', title: 'Test', items: [
    { id: 'test', name: 'A test question', who: 'One child, on their own device', size: 'device', open: 'quiz', arg: 'test' },
    { id: 'result', name: 'Test result', who: 'One child, on their own device', size: 'device', open: 'quizResult' },
  ], more: [['Starter quiz', 'quiz', 'starter']], moreLabel: 'Also:' },
  { id: 'exam', title: 'Exam', items: [
    { id: 'exam-paper', name: 'Exam paper', who: 'One child, 30 minutes', size: 'laptop', open: 'examPaper' },
    { id: 'exam-check', name: 'Check written answers', who: 'One child, after the exam', size: 'laptop', open: 'examCheck' },
    { id: 'exam-result', name: 'Exam result', who: 'One child', size: 'laptop', open: 'examResult' },
  ] },
  { id: 'examparent', title: 'Exam: the parent’s part', items: [
    { id: 'exam-start', name: 'Start with the PIN', who: 'Parent beside the child', size: 'laptop', open: 'examStart' },
  ] },
  { id: 'print', title: 'Materials (the pad’s bottom bar)', items: [
    { id: 'print', name: 'Materials', who: 'Parent, iPad. Every category, the same size', size: 'device', open: 'print', arg: '' },
    { id: 'print-week', name: 'This week', who: 'Parent, iPad. This week’s pages, and Print the pack', size: 'device', open: 'print', arg: 'cat-week' },
    { id: 'print-cat', name: 'A category', who: 'Parent, iPad. Its pages as a gallery', size: 'device', open: 'print', arg: 'cat-science' },
    { id: 'print-lesson', name: 'A page open', who: 'Parent, iPad. The page right, the others left', size: 'device', open: 'print', arg: 'lesson-muscles' },
    { id: 'print-exam', name: 'Exam paper', who: 'Parent only, then a child on paper', size: 'device', open: 'print', arg: 'exam' },
  ] },
  { id: 'parent', title: 'Parent pad and journal', items: [
    { id: 'dash-clear', name: 'Parent pad: Today', who: 'Prototype. The class now, today’s classes, what needs you', size: 'device', open: 'padLook', arg: 'clear' },
    { id: 'dash-clear-1', name: 'Today with one child', who: 'Prototype. The same screen for a family of one', size: 'device', open: 'padLook', arg: 'clear||1' },
    { id: 'dash-clear-5', name: 'Today with five children', who: 'Prototype. The same screen for a family of five', size: 'device', open: 'padLook', arg: 'clear||5' },
    { id: 'dash-light', name: 'Parent pad: Paper look', who: 'Prototype. Light, with the Home School red', size: 'device', open: 'padLook', arg: 'light' },
    { id: 'dash-light-kid', name: 'Paper look: one child', who: 'Prototype. A tap on a child', size: 'device', open: 'padLook', arg: 'light|kid:k2' },
    { id: 'dash-light-results', name: 'Paper look: test results', who: 'Prototype. Each child side by side', size: 'device', open: 'padLook', arg: 'light|results' },
    { id: 'dash-light-admin', name: 'Paper look: Admin', who: 'Prototype. Behind Admin on the pad', size: 'device', open: 'padLook', arg: 'light|admin:family' },
    { id: 'dash-deep', name: 'Parent pad: Channel look', who: 'Prototype. Dark bars like the TV channel', size: 'device', open: 'padLook', arg: 'deep' },
    { id: 'dash-deep-kid', name: 'Channel look: one child', who: 'Prototype. A tap on a child', size: 'device', open: 'padLook', arg: 'deep|kid:k2' },
    { id: 'dash-deep-results', name: 'Channel look: test results', who: 'Prototype. Each child side by side', size: 'device', open: 'padLook', arg: 'deep|results' },
    { id: 'dash-deep-admin', name: 'Channel look: Admin', who: 'Prototype. Behind Admin on the pad', size: 'device', open: 'padLook', arg: 'deep|admin:family' },
    { id: 'dash-board', name: 'Parent pad: as it is now', who: 'The Board today, to compare', size: 'device', open: 'padLook', arg: 'board' },
    { id: 'journal', name: 'Gradebook', who: 'Parent, on a laptop', size: 'laptop', open: 'parent', arg: 'journal' },
  ], more: [['Your account', 'parent', 'me'], ['Family', 'parent', 'family'], ['Lessons and languages', 'parent', 'plan'], ['Plan and billing', 'parent', 'account'], ['Sign in', 'login'], ['How it works', 'how'], ['How tests work', 'ladder']], moreLabel: 'Small pages:' },
];
window.SCREEN_SIZES = { tv: [1920, 1080], device: [1024, 768], laptop: [1440, 900] };
