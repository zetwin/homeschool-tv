# Product requirements

Last updated: 2026-11-05

## Summary
A subscription service that gives home-schooling families a complete, curriculum-based program their children enjoy. Lessons look like the best creator videos, run on the family TV, and are followed by tests and exams. Parents see progress and keep records; tests and exams mark themselves.

## Who it's for
- **Parent (the customer):** teaches at home, isn't a subject expert, has little time, needs to know the program is proper and the child is actually learning.
- **Children aged 10–12 (the users):** learn together on a TV, then test individually. Later, more ages.
- **First users:** a small family pilot.

## The problem
- Free material is scattered, and parents don't know what comes next.
- Good videos exist, but they aren't a program, and nothing checks learning.
- Full online programs often look like school software, and don't suit a family watching together.

## What makes it different
1. Lessons as entertaining as a creator's channel, with real structure and evidence of learning.
2. Watch together on the TV, then each child tests on their own device.
3. A clear map that follows a recognised curriculum.
4. A low-effort parent area: "what needs me today".

## Scope

### Now: prototype for one family
- [x] Channel home, 7 lessons, voice, captions, remote control
- [x] Learning map directions A, B and C, to choose from
- [x] Child sign-in on own device; My day; data shared on home Wi-Fi
- [x] Starter quiz, 19 question types, playful lesson test, re-tests at 1, 7 and 30 days
- [x] Unit exam with sections, timer, flagging and adult PIN. It marks itself; children check their own written answers against the model answer (parent marking was removed on 2026-11-09)
- [x] Parent pad, opened by the parent's own login (the earlier PIN was replaced)
- [ ] Chosen map direction, then build out properly
- [x] Lesson 2, then more lessons: Skeleton, Muscles, two on Colombia, Spanish 1, Emotional Intelligence 1, and a bonus on the brain
- [ ] Placement check and question sets for different levels

### Next: private beta (5–20 families)
- Parent registration; secure child sign-in; TV pairing with a short code
- Shared database for scores and exams
- A full unit per term in core subjects, or a narrower launch in science only
- Payment by Stripe, per child, with a sibling discount
- Legal review of privacy and content before anyone outside the family joins

### Later
- Spanish, then more languages
- Other curriculum frameworks
- More ages and subjects
- A teacher or tutor role
- Exportable records for local home-school rules

## Success measures
- Children finish an episode without being asked to continue.
- 7 out of 10 or better on the lesson test; retention shown by re-tests at 7 and 30 days.
- A parent spends under 15 minutes a week managing it.
- For beta: 60% of families still active after 8 weeks. This target is a starting guess.

## Not doing yet
Live teachers, social features between children, public leaderboards, ads, or any claim of formal accreditation.

## Open questions
- Which country or countries do we launch in? This decides the curriculum and the legal work.
- Science only at first, or maths and English too? Parents usually need those. This is a big decision for scope.
- Which map direction? (Owner to pick.)
- How do paid lessons include video, given YouTube's rules? See `docs/rules/COMPLIANCE-AND-LICENSING.md`.
