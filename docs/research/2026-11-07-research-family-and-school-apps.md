# How real family and school apps build the parent's home screen

Research date: 2026-11-07. Web research only.

**How sure each claim is**
- **[seen]**: read on an official help page, an official blog, a release note, or a screen caption on a UI gallery.
- **[secondary]**: from a school guide, a news article or a review site.
- **[unverified]**: from memory or inference, with no source found this session.

**Blocked or not useful:** Mobbin (403), help.seesaw.me (403), the Khan Kids Zendesk (403), Capterra (403) and the Instructure Canvas guides (moved behind a login) could not be fetched. Screensdesign.com shows only captions, because the screenshots are behind a paywall. No screenshot image was examined directly, so every layout detail below comes from text.

---

## 1. Apple Screen Time / Family Sharing (parent view on iPhone or iPad)
- **Home:** there is no separate parent app. The parent goes to Settings → Family → the child's name → Screen Time [seen, support.apple.com/108806]. Settings → Family opens with the members' avatars and a "Family Checklist" of suggested actions, such as turning on Location Sharing or updating a child's controls as they get older [secondary]. A child's Screen Time report has a bar chart (day or week) coloured by category, then "Most Used", "Pickups" and "Notifications" [unverified, from memory].
- **Switching children:** pick the child from a list. A Mac uses a "Family Member" pop-up menu [seen, Apple Mac help].
- **One tap deeper:** each tap pushes a full page in the standard iOS list style (a "drill-down").
- **Settings:** the whole thing lives inside Settings. Requests from children (Ask to Buy, Ask to Browse, new contacts) arrive as notifications to approve [seen].
- **Style:** grouped white lists on grey, the system font, and full support for the iPhone's text-size setting (Dynamic Type) [unverified, standard iOS behaviour].
- **Learn:** requests come to the parent as notifications; the parent doesn't have to look for them. Respect the system text size.
- **Avoid:** burying the child under three levels of Settings. It works for setting things up, not for daily checking.

## 2. Google Family Link (parent app)
- **Home:** bottom tabs **Screen time · Controls · Location** [seen: 9to5google 2025-02 and 2025-03]. Before 2025 the first tab was "Highlights" [seen, blog.google 2022-10-18]. The first card is **"Time spent today"** with the most-used apps; tapping it opens a detailed breakdown. Below it come the **Device** card (with a **Lock** shortcut), **Time limits** and **Schedules** [seen, 9to5google 2025-03-20]. Google says the redesign "brings the most important tools… to the forefront" [seen].
- **Switching children:** "a new **pill** design in the **top-left corner**" [seen, 9to5google]. Earlier coverage describes an oval at the top that names the child and can be swiped [secondary].
- **One tap deeper:** a card opens a full page of detail [seen, for the time card].
- **Notifications and requests:** a **bell icon at the top** opens one place for alerts and requests from children (app downloads, blocked sites) [seen, blog.google 2022].
- **Settings:** the Controls tab is a list of large links (Google Account settings, Play, YouTube, Chrome, Search, Photos, Location settings, Signed-in devices) [seen]. Account management sits behind the profile picture, top right [unverified].
- **Style:** Material You, with big rounded cards, one card per job and progress bars that fill up towards the daily limit [seen, 2022 coverage].
- **Learn:** one child at a time in focus, with a small, always-visible switcher. Each card states a fact *and* offers the action (time today plus Lock). "Today Only" changes one day without touching the standing rules [seen].
- **Avoid:** there is no all-children view on the home tab. Only the Location map shows every child at once [seen].

## 3. ClassDojo (parent side)
- **Home:** opens on the **Story** feed (class and school posts with photos) [secondary: App Store reviews and school guides]. A bottom bar also has a calendar tab, chats/messages, and a "Resources" tab with sideways-scrolling rows [seen, screensdesign captions].
- **Switching children:** a **"Profile switching modal listing parent and child accounts"**, with Add child and Log into another account [seen, caption]. Older guides describe a **Kids** section reached through a monster avatar, which shows each child and a two-week points report [secondary].
- **One tap deeper:** the switcher is a modal; messages open as full chat pages.
- **Settings:** an account page with "security options, subscription status, and language preferences" as a vertical list, plus a separate family-management page ("Add family members") [seen, captions]. How the parent reaches it is not described.
- **Style:** white cards, a green mascot and monster illustrations, purple accents [seen, captions]. Friendly and photo-heavy.
- **Learn:** each child is a recognisable character (the monster avatar), so who is who is clear without reading.
- **Avoid:** a feed-first home answers "what happened?" but not "what do I need to do?". Its empty states are paywall banners [seen].

## 4. Seesaw (family side)
- **Home:** family members get **Home, Journals, Messages**, and Home (recent posts) is the default [secondary, school guides quoting help.seesaw.me]. Journals shows posts by child or by class.
- **Switching children:** tap the **profile icon at the top left** twice to list all accounts, then pick one [secondary]. Children are added with "+Add Child's Journal".
- **One tap deeper:** a post opens full screen.
- **Settings:** behind the profile icon [secondary].
- **Learn:** messages to families sit in their own place and children can't see them [secondary]. That fits our separate parent area.
- **Avoid:** account switching is hidden behind a double tap. Schools warn that a child on the parent's device can switch into the family account [secondary].

## 5. Khan Academy Kids (parent section)
- **Home:** the app is the child's. The parent area is a gated **"Grown-Ups Only"** section, reached from the avatar at the top right or by swiping up [secondary: Khan Kids help snippet, video walkthrough].
- **Switching children:** avatar picker. Each child has a name, age and animal avatar [secondary].
- **Progress:** Kids progress does *not* show in the Khan Academy Parent Dashboard [seen, support forum reply; may be outdated]. The main Parent Dashboard uses an **Activity** tab with reports filtered by time and content, and "Edit Settings" per child [seen, snippet].
- **Learn:** a clear adult gate, and the child's home stays the child's.
- **Avoid:** progress kept in a different product from the one the child uses.

## 6. Brightwheel (parent side)
- **Home:** the mobile home lists the children. **"Tap the student's name from the home screen"** to open their feed, with the newest item at the top (check-in and check-out, photos, meals, milestones) [seen, Brightwheel help article].
- **Switching children:** go back to home and tap another name. On the web, a "My Children" side menu → child → "Feed" tab [seen].
- **One tap deeper:** a full page per child. Paperwork for *all* children is in the left-hand menu [secondary, What's New PDF].
- **Settings:** "My Profile" holds email preferences such as the daily report [seen].
- **User feedback:** reviewers say parents with several children must switch feeds one by one and ask for **a quick view of all children on the home screen**. One review called the home section "too detailed" for everyday use [secondary, Capterra snippets].
- **Learn:** the opt-in **daily summary email** per child [seen].
- **Avoid:** the exact gap our pad must fill: no single view of all the children together.

## 7. Cozi Family Organizer
- **Home:** **"Cozi Today"** is the first item in the main menu. It brings together current to-dos, recently added shopping items, and events "happening now or within the next day"; **past events are hidden** later in the day [seen, Cozi blog, 2014-09-17]. A newer description lists upcoming events, shared lists and an upgrade card, with a bottom navigation bar [secondary, screensdesign captions].
- **Switching people:** no switching. One view for the whole family, with a **coloured dot per member**, set in Settings → Calendar [secondary]. The calendar can show everyone or filter to one person [secondary].
- **One tap deeper:** tapping a card goes to that feature's full page [seen].
- **Settings:** "Family > Settings" for members [secondary]; a menu at the top left on Android.
- **Style:** blue header, gold "premium" badges, and many "Unlock Pro" overlays [seen, captions].
- **Learn:** the time filter. The today view drops what's already over, so it stays short.
- **Avoid:** upsell cards on the home screen. They take the space the important things need.

## 8. Skylight Calendar (wall screen plus phone app)
- **Home:** on the wall screen, the **Tasks** view shows **one column per person**, side by side, with the day and date on top. Routines are grouped Morning, Afternoon and Evening, and each routine has a **progress bar**. A **Filter** shows or hides completed, late and skipped tasks and each profile [seen, Skylight help]. Columns can be reordered by dragging the name.
- **Switching people:** none needed in Day view, because everyone is on screen. **Week view** shows one person; tap a profile to change [seen].
- **Marking done:** tap the white circle on the right. Or tap the task to open a **Details pop-up** with "Mark as Complete" [seen].
- **People:** each profile has an **avatar and a colour**, and the colour is used on that person's events and tasks [secondary, help snippets]. The product page says you can **"Adjust font size"** [secondary, official snippet].
- **Settings:** in the phone app, the **"My Skylight" menu (upper right) → Settings**, a separate page grouped as App Settings, Devices and Add-Ons [seen].
- **Style:** big type for reading across a kitchen, a soft colour per person, very little chrome.
- **Learn:** **columns per child on a wide screen** (very close to our iPad pad), plus progress per routine and the "late" state shown on the board.
- **Avoid:** columns get crowded with many tasks. Skylight solves it with time-of-day groups and filters.

## 9. Google Classroom guardian email summaries
- **Format:** an email, not an app screen. Three sections: **Missing work**, **Upcoming work** (today and tomorrow in daily emails, the coming week in weekly ones), and **Class activity** [seen, support.google.com/edu/classroom/answer/6386354]. Daily or weekly can be chosen **per student**. No grades. Edu Plus and Standard editions add **"View in Classroom"** links to the student's Classwork page [seen]. No email is sent when there's nothing to report [seen].
- **Learn:** the order *missing, then upcoming, then what happened* is a proven priority order for "what needs me?". Saying nothing on quiet days builds trust.
- **Avoid:** an email can't take action. The parent can't mark or reply from it.

## 10. Canvas Parent
- **Home:** opens on **Courses** for the selected student, showing course names and **current grades** [secondary, many school guides]. Bottom tabs: **Courses · Calendar · Alerts** [secondary].
- **Switching children:** a **student selector at the top**. Parent 2.0 "replaced the student carousel with a drop-down menu" [secondary, school PDF]. Tap the name, then choose another student [seen in search snippet of the Instructure guide].
- **One tap deeper:** course → a full page of grades and assignments; assignment → a detail page.
- **Alerts:** per-student **thresholds** (grade below or above X, missing assignment, announcements) set under User Menu → Manage Students → student [secondary].
- **Settings:** a **User Menu** (hamburger) holds Manage Students, Settings and the theme (light or dark) [secondary]. Per-student colours exist on the *web* course cards [seen, Canvas observer guide snippet]. A per-student colour for the whole Parent app header is remembered but **not confirmed** [unverified].
- **Learn:** alerts the parent sets by rule, so the app tells you when something is wrong. A grade sits next to each course on the first screen.
- **Avoid:** a course list is a school's structure, not a family's day. Submissions can't be seen in the app [secondary].

## 11. Homeschool Planet / Homeschool Panda
- **Homeschool Planet:** a web planner with **Day, week and month views** and a scrolling checklist "Planner" view. You can "**See any combination of students at once**" [seen, homeschoolplanet.com/features]. Colour by **student, subject or class**, with custom colours. Optional student logins let children check off their own work, and the parent keeps the whole-family view. "Hide completed items". Weighted grading with GPA and report cards. The **dashboard** is widgets: to-do, shopping and reading lists, messages, weather, a daily quote, a note pad. Settings include 120+ themes and 19 fonts [seen].
- **Homeschool Panda:** planner, attendance, check-ins, portfolio, and a "Parent administration page" with reports by subject or date. Parents are told when a child completes an assignment [secondary, third-party listings and the Panda blog]. Its UI could not be verified.
- **Learn:** the planner's "all students together or filter to one" model is right for one parent with three children. Showing the student's colour everywhere helps.
- **Avoid:** Planet's dashboard is filled with general widgets (weather, quotes) that answer no daily question. Reviewers call these tools powerful but dense [secondary].

## 12. Duolingo Family Plan
- A **"family hub"** inside the **Super dashboard**, reached from the Super icon in the app or from the profile on the web, where the manager can "Add, manage, and follow" members [seen, blog.duolingo.com/plus-family-plan]. Members can be added directly when a device is shared [seen]. What progress the manager can see is unclear: low-quality sites contradict each other [unverified].
- **Learn:** add a child to a shared device without an invite or an email (this matches our "no child email" rule).
- **Avoid:** nothing to copy for a parent overview. Duolingo has no real parent progress view.

---

## Patterns these apps share

1. **One question per screen region, in priority order.** Classroom puts *missing → upcoming → activity*; Family Link puts *time today → lock → limits → schedules*. *Why it works:* the parent reads top to bottom and stops once they have the answer, so the most urgent item has to come first.
2. **"Today" filters out the past.** Cozi Today hides events that are over; Classroom's daily email covers only today and tomorrow. *Why:* a short list can be read at a glance, and big text fits.
3. **Every child has a colour and a face, used everywhere.** Skylight, Cozi, Homeschool Planet, Khan Kids and ClassDojo all do this. *Why:* the parent recognises a child before reading a name, which matters with large text and three children.
4. **All children side by side when there are few of them.** Skylight's Day columns and Homeschool Planet's "any combination of students" do it; Brightwheel's users ask for it. *Why:* with 2–4 children, comparing them is the job, and switching hides two of them. The single-child switcher (Family Link's pill, Canvas's dropdown) suits apps that hold a lot of data per child.
5. **A card shows a fact and its action together.** Family Link's time card has Lock; Skylight's task has a tick circle. *Why:* nothing is shown without a reason, and there's no hunting for the button.
6. **Things that need the parent come to them as one list.** Family Link's bell, Canvas Alerts with thresholds, Apple's Ask to Buy. *Why:* the parent shouldn't open each child to find problems, and an empty list means "all fine".
7. **Settings are a separate place behind a small, steady entry point:** a profile picture, "My Skylight" at the top right, a User Menu, or iOS Settings. They are never cards on the home screen. *Why:* setup happens rarely and daily checking happens often, so mixing them slows the daily job.
8. **Depth opens as a full page (push), with small pop-ups only for quick actions.** Skylight's task Details pop-up and ClassDojo's switcher modal are the pop-up cases. *Why:* a full page has room for big text and a clear Back. A pop-up suits a confirm-or-tick action.
9. **Few, large, calm surfaces.** One card per job, generous spacing, one accent colour plus the children's colours. The weak examples are the ones covered in upsells or widgets (Cozi, Homeschool Planet's dashboard).

## The 3 to imitate for our pad

1. **Skylight Calendar (Tasks Day view).** It is the nearest match to an iPad pad for one family: one column per child with avatar and colour, today's items in time order, a progress bar, a tick to mark done, late items flagged, big adjustable type, and Settings kept behind a menu. Copy the side-by-side columns for three children, and the time-of-day grouping.
2. **Google Family Link (2025).** Its card order is a model of "fact first, action attached". It has one alerts inbox (the bell), a small switcher pill for when one child needs a focused view, and controls kept in their own tab. Copy the card structure and the alerts inbox, and add the all-children overview that Family Link lacks.
3. **Google Classroom guardian summaries, with Canvas Parent's alert rules.** Not as screens, but as **the content order for "What needs you"**: Missing or late → To mark → Coming up → What happened, plus thresholds the parent sets (for example "tell me when a score is below 60%"). It stays silent when there's nothing to report.

Runner-up for detail pages: **Canvas Parent**, which pushes a full page per course with the grade next to each course on the first screen.

## Sources
- Apple: https://support.apple.com/en-us/108806 ; https://support.apple.com/guide/mac-help/mchlca5139d2/mac
- Family Link: https://blog.google/technology/families/familylink-newlook/ ; https://9to5google.com/2025/02/12/family-link-redesign-2025/ ; https://9to5google.com/2025/03/20/family-link-redesign-android/ ; https://chromeunboxed.com/the-google-family-link-app-just-got-completely-redesigned-and-it-looks-much-more-user-friendly/
- ClassDojo: https://apps.apple.com/us/app/classdojo/id552602056 ; https://screensdesign.com/apps/classdojo/ ; https://www.providenceschools.org/cms/lib/RI01900003/Centricity/Domain/2857/ClassDojo_Family_Account_Overview.pdf
- Seesaw: https://sites.google.com/k12albemarle.org/seesawathome/for-families/using-seesaw/family-app-vs-class-app ; https://help.seesaw.me/hc/en-gb/articles/203729445 (blocked)
- Khan Kids: https://khankids.zendesk.com/hc/en-us/articles/360006538192-How-do-I-add-a-new-user (blocked, snippet only) ; https://support.khanacademy.org/hc/articles/360040168512-Parent-Quick-Start-Guide
- Brightwheel: https://intercom.help/brightwheel/en/articles/942392-student-activity-feed ; https://apps.apple.com/us/app/brightwheel-child-care-app/id902823296 ; https://capterra.com/p/144060/brightwheel/reviews/?page=2 (blocked, snippet only)
- Cozi: https://www.cozi.com/blog/introducing-cozi-today-your-up-to-date-snapshot-of-whats-in-cozi ; https://screensdesign.com/apps/cozi-family-organizer/
- Skylight: https://skylight.zendesk.com/hc/en-us/articles/36846381293979-Using-the-Tasks-Tab-Routines-and-Chores ; https://skylight.zendesk.com/hc/en-us/articles/45664471763995-Settings ; https://skylight.zendesk.com/hc/en-us/articles/42814221359003
- Google Classroom: https://support.google.com/edu/classroom/answer/6386354
- Canvas Parent: https://community.canvaslms.com/t5/Observer-Guide/How-do-I-organize-multiple-students-in-my-account/ta-p/463708 ; https://www.browardschools.com//cms/lib/FL01803656/Centricity/Domain/14817/CanvasParentiOSGuide.pdf ; https://us.alonot.com/wp-content/uploads/2025/05/Whats-New-Canvas-Parent-Indiana-School-Resources.pdf
- Homeschool Planet: https://homeschoolplanet.com/features
- Homeschool Panda: https://www.sourceforge.net/software/product/Homeschool-Panda ; https://medium.com/the-homeschool-panda-blog/introducing-hsp-kids-b2275106ce9b
- Duolingo: https://blog.duolingo.com/plus-family-plan
