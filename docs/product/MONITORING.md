# Monitoring: knowing that Home School works

Started 2026-11-07, when the first family began using it. The owner asked: what do we collect, what do we need, what can we build now, and what goes on the task list.

## The idea
We need to know three things without asking the family every day:
1. **Is it working?** Errors, failed saves, videos or voices that didn't play.
2. **Is it used the way we think?** Who signs in, which lessons are finished, and where children stop.
3. **What do the parents want?** Their ideas and problems, in their own words.

Everything stays **on the family's Mac**. Nothing is sent to any outside service, and there's no tracking for ads. Project rule 5 says no tracking on child screens: this is the family's own record on their own computer, like the marks already saved there, and it records only the events below, never every tap.

## Built now (2026-11-07)
| What | Where it's kept | Who sees it |
|---|---|---|
| **Sign-ins and sign-outs:** who, on which kind of device (iPad, phone, TV, computer) | `data/family-log.jsonl` on the Mac | Parents, in Admin, Feedback and checks. Claude, when asked |
| **Lessons:** started, resumed, finished, or left early and at which scene | Same log | Same |
| **Videos that didn't play,** with YouTube's reason | Same log | Same |
| **Voice clips that didn't load** | Same log | Same |
| **Saves that didn't reach the Mac** | Same log | Same |
| **Errors on any screen,** and our own files that didn't load. Each one once per visit, 20 at most | Same log | Same |
| **Ideas and problems from parents:** the speech bubble at the top of the pad. Typed, or spoken with the iPad keyboard's microphone | With the family data, and in the log | Parents, in Admin. Claude copies each into the team's private notes |

- **How it works:** each device keeps up to 50 lines if the Mac can't be reached, and sends them later. The server writes one line per event, keeps 90 days, and stops writing if the file reaches 20 MB.
- **Feedback and checks** in Admin shows the last 7 days: sign-ins, lessons finished, lessons left early, and problems grouped by kind.
- **Claude can read it** when the owner asks "check the home school": `GET /api/log?days=7` on the Mac, or the file itself.

## Never collected
- Every tap, scroll or keystroke, or how long a child looks at a screen.
- Voices, camera or location.
- Anything sent to an analytics, advertising or error-reporting company.
- Passwords. Test answers are already in the family data, not in the log.

## Next (on the task list)
| What | Why | Size |
|---|---|---|
| A **weekly summary** for the owner: problems, lessons finished, lessons left early | So nobody has to open Admin to notice a problem | Small |
| A **"server is running" check**, so the TV and iPads say clearly when the Mac is off or asleep | Today a sleeping Mac looks like a broken app | Small |
| **Daily backup** of family data and the log. The owner said not now | Losing the file loses every mark | Small |
| **Answers per question:** which questions most children get wrong | Shows which lesson part to improve. The data is already in attempts; it needs a page | Medium |
| **Speed:** how long lessons and pages take to start on each device | Finds slow iPads or Wi-Fi | Small |
| **Feedback from children:** a simple "this was confusing" button in lessons | Children notice different problems | Small, needs the owner's yes |

## Later, with paying families
- Each family's log stays in its own account, and the family can download or delete it.
- Error reports from many families may need an outside service. That needs a privacy review and the parents' consent first.
