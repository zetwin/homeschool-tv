# Licensing and children's privacy

Last updated: 2026-11-05. **These are research notes, not legal advice.** Have a lawyer review them before anyone outside the family uses the service, and before charging.

## The main finding
What's fine for one family at home may not be fine in a paid service. Core lessons must work without anything we don't have the right to sell.

## YouTube
From [YouTube's Developer Policies](https://developers.google.com/youtube/terms/developer-policies), which [apply to the embedded player](https://support.google.com/youtube/answer/171780):
- III.F.3.a: "must not charge users to watch content in an embedded YouTube player."
- III.F.3.b: must not otherwise gate access to a video.
- III.F.3.c: must not offer incentives or rewards to users, so no points for watching.
- III.E.1.a: must not download or store copies without written approval.
- III.E.4.j: must look up each embedded video's Made for Kids status and turn off tracking for those videos. Child-directed sites must identify themselves.
- III.G: selling an API client is allowed, but selling the API services or access to them isn't, without written approval. Advertising limits also apply.

From [Required Minimum Functionality](https://developers.google.com/youtube/terms/required-minimum-functionality):
- No overlays or frames over the player, including its controls.
- Autoplay only when more than half of the player is visible, with one autoplaying player at a time.
- Player viewport at least 200×200 px. The page must send a Referer header.

**What this means**
- Family use now is fine in spirit, and the prototype moved its Skip button off the player.
- A paid lesson that plays YouTube videos inside the paywall is a **serious open risk**. The policy doesn't clearly address a subscription site whose own lessons are the paid value.
- Don't assume. Ask YouTube for written approval or get legal advice.

**Options for paid lessons, best first**
1. **Our own motion scenes** carry the core teaching. These are ours.
2. **Oak lesson videos** under the Open Government Licence, once checked lesson by lesson.
3. **Direct licenses** from creators or channels, which can also be a marketing partnership.
4. **Free "Watch on YouTube" links** as optional extras, not inside the paid gate and with no rewards.
5. **Original video** we commission.

## Oak National Academy
From [Oak's terms](https://www.thenational.academy/legal/terms-and-conditions), updated 8 September 2026:
- Lesson content published after 1 September 2022, including quizzes, slides, worksheets, audio, video and transcripts, is under Open Government Licence v3.0 "except where otherwise stated".
- That license allows commercial use.
- Older content is non-commercial only.
- Third-party material can have its own restrictions, so check each lesson.
- Required credit: "A [subject] lesson by Oak National Academy licensed under Open Government Licence (OGL)", with a link to the license.
- Don't say or imply Oak endorses us. Don't use Oak's name or logo to promote similar services without permission. Using it factually in a credit should be checked with counsel.

## Curriculum documents
- England's National Curriculum: Open Government Licence v3.0, Crown copyright.
- NGSS: a registered trademark; [its guidelines](https://www.nextgenscience.org/) need checking. Not yet confirmed.
- Cambridge: the full framework is for registered schools. Don't copy it.

## Images in the prototype
All sources are in `channel/assets/img/credits.json`. Licenses are CC0, public domain, "No restrictions" and CC BY, which needs credit. The credit is shown on screen and on the home page. Before launch, re-check each file's Commons page, and don't assume the "No restrictions" Internet Archive scans are clear in every country.

## Voice
- [Kokoro model](https://huggingface.co/hexgrad/Kokoro-82M): Apache 2.0. An older README notes a GPLv3 dependency, espeak-ng, used in text processing. Check whether this affects us; we only distribute audio output.
- Tell users the narration is AI-generated. The credits already do.
- **Spanish uses Kokoro's Spanish voices (Dora, Alex),** spoken with `espeak-ng` turning words into sounds. `espeak-ng` is GPL-3.0, used only as a tool while recording, and isn't shipped. Confirm this in the legal review. Apple voices are no longer used.

## Claims
- OK if true: "follows England's National Curriculum", "aligned to".
- Not OK without proof: "approved", "accredited", "government-recognised", "endorsed by Oak".
- [Accreditation applies to schools or organisations](https://novatio.school/blog/what-is-cognia-accreditation) such as those reviewed by Cognia, not usually to a curriculum product. This source is a vendor blog; confirm with the accreditor.
- Don't imply the program replaces a school or meets any country's legal requirements without checking. Home-school rules vary by country and region.

## Children's data
| Rule | Where | Key points | Confidence |
|---|---|---|---|
| COPPA, amended 2025 | US, under 13 | Verifiable parental consent; separate consent for third-party disclosure; written security program and data retention policy; compliance date 22 April 2026 | [Law-firm summary](https://www.lw.com/admin/upload/SiteAttachments/FTC-Publishes-Updates-to-COPPA-Rule.pdf). Check the FTC's text |
| UK Children's Code | UK | Design standards for online services likely to be used by children | From memory; the ICO's page couldn't be fetched. Read directly |
| GDPR Article 8 | EU | Parental consent below a national age; Spain is 14 | From memory. Verify |

### Our design rules
- Parents sign up and consent. Children sign in with a family code, picture and PIN inside that account, with no email or password of their own.
- Collect only a first name or nickname, school level, and learning results.
- No ads, no advertising trackers, no selling data, no public profiles or chat on child screens.
- Parents can export and delete all family data.
- Keep a data retention policy and a written security plan from the first beta.
- Voice and camera input from children count as sensitive. Avoid until reviewed.
- Tell parents which third parties receive data. YouTube is one if its player is used.

## Before charging: checklist
- [ ] Lawyer reviews privacy, terms, claims and each launch country
- [ ] Written decision on YouTube
- [ ] Every asset in core lessons has a license safe for commercial use
- [x] Apple voices replaced in Spanish Lesson 1 (2026-11-06)
- [ ] Legal review confirms Kokoro's voices, and `espeak-ng` as a recording tool
- [ ] Privacy policy and parental consent flow
- [ ] Data export and delete working
- [ ] Oak attribution in place, with no suggestion of endorsement
