Nothing for you — here are the source review findings, with the most disruptive first.

1. **Child Diary, iPad browser Back:** Opening Diary writes `#diary`, then the child screen changes it to `#me-diary`, leaving two history entries. The first Back swipe restores the same Diary screen, so it looks like Back did nothing. Make the child screen write only `me-diary`, while keeping the parent route as `diary`. ([diary.js:59](../../channel/views/diary.js:59), [student.js:72](../../channel/views/student.js:72), [store.js:200](../../channel/views/store.js:200))

2. **Program map and full program document:** Choosing a map view or unit changes the screen without updating its route. Back can skip the document, and reloading may reopen the wrong page. Save the selected view and unit in the route and restore them from it. ([program-doc.js:17](../../channel/views/program-doc.js:17), [map.js:179](../../channel/views/map.js:179), [app.js:1017](../../channel/app.js:1017))

3. **Parent Timetable on phones and portrait iPads:** The weekday grid is at least 640px wide, so parents must scroll sideways to see or edit the whole week. Use day cards or a one-day-at-a-time view on narrow screens. ([index.html:1196](../../channel/index.html:1196), [index.html:1197](../../channel/index.html:1197))

4. **Timetable settings and break controls:** Several controls are only 24–34px tall, and text fields can use 12.5px text. They are hard to tap, and the small text can make iPads zoom when typing. Make controls at least 44px tall, text fields at least 16px, and stack the break form on phones. ([index.html:1101](../../channel/index.html:1101), [index.html:1105](../../channel/index.html:1105), [index.html:1107](../../channel/index.html:1107))

5. **Child test results on phones:** The result screen and review card hide overflow, so long missed-answer explanations can be cut off. Let the review or the whole result screen scroll vertically. ([student.js:297](../../channel/views/student.js:297), [index.html:1694](../../channel/index.html:1694), [index.html:1695](../../channel/index.html:1695))

6. **Parent Diary weekly note:** The note box uses a font size that can fall to 12.5px on phones and iPads, which can trigger iPad zoom when the parent taps it. Set the note text to at least 16px and allow the note area to expand or scroll. ([index.html:995](../../channel/index.html:995), [index.html:1048](../../channel/index.html:1048))

7. **Parent Diary touch controls:** The week arrows are 40px wide, “No school” is 24px tall, and “Sign week” is 34px tall. Parents can miss these controls on a touchscreen; give them hit areas at least 44px tall and wide. ([index.html:1009](../../channel/index.html:1009), [index.html:1024](../../channel/index.html:1024), [index.html:1055](../../channel/index.html:1055))

8. **Child Lessons tab:** Selecting a subject or unit is kept only in memory. After a reload, the tab opens at “Ready now,” losing the child’s place. Save the selected subject and unit in the route or per-child settings, then restore them. ([student.js:142](../../channel/views/student.js:142), [student.js:172](../../channel/views/student.js:172), [app.js:1023](../../channel/app.js:1023))

9. **Missing lesson in Diary:** The screen says a parent can set a book, page, or video instead, but the edit sheet only records homework text; a video address gets no child-facing Play button. Either describe this as a homework note or add a resource field with a clear way for the child to open it. ([diary.js:68](../../channel/views/diary.js:68), [diary.js:71](../../channel/views/diary.js:71), [diary.js:72](../../channel/views/diary.js:72))

10. **Child label quiz:** The instructions say to tap a letter, but each letter target is 36×36px, making it easy for a child to miss on an iPad. Give each pin a 44px hit area while keeping its visible marker in place. ([student.js:253](../../channel/views/student.js:253), [index.html:1677](../../channel/index.html:1677))

11. **Admin Gradebook:** “The real service would export this…” reads like a developer note and tells parents the export is missing. Remove it or explain clearly what parents can do with the results today. ([parent.js:38](../../channel/views/parent.js:38))

12. **Admin Feedback and checks:** Missing-file errors can show paths such as `assets/...`, without telling parents which lesson is affected or what to do. Show a plain screen or lesson name and a useful next step. ([parent.js:71](../../channel/views/parent.js:71), [parent.js:77](../../channel/views/parent.js:77), [store.js:188](../../channel/views/store.js:188))

13. **How it works:** The page says the button for sending an idea or problem is still being made, but that button is already on the parent pad. Update or remove the roadmap item so it matches the app. ([how.js:59](../../channel/views/how.js:59), [pad.js:185](../../channel/views/pad.js:185))

14. **Child Settings theme chooser:** It shows “Clean Pro — Modern web apps, for parents,” wording that does not belong in a child’s theme choices. Hide that option there or give it a child-facing name and description. ([themes.js:18](../../channel/views/themes.js:18), [themes.js:142](../../channel/views/themes.js:142), [student.js:321](../../channel/views/student.js:321))