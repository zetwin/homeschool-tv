# TV controls

Last updated: 2026-11-07. Read before changing the lesson player. Test with `channel/remote-test.html` on the real TV.

## Ways people control a lesson
| Device | How |
|---|---|
| TV remote | Arrows, OK, Back, sometimes play/pause |
| Laptop connected to the TV | Keyboard, mouse, the play/pause key |
| Tablet or phone | Tap. Double tap on the left or right third skips 10 seconds, like YouTube, and tapping on keeps skipping |

## What each button does
Left and right skip through the lesson, like any video player. The owner corrected this on 2026-11-06: they had walked through the buttons.

| Button | Playing | On the timeline | On the buttons | Chapter strip open | During a video |
|---|---|---|---|---|---|
| **OK** | Pause or play | Pause or play | Presses that button | Plays that chapter | Pause or play |
| **Left, Right** | Skip 10 seconds | Skip 10 seconds | Moves between buttons | Moves between chapters | Skip 10 seconds |
| **Down** | Moves to the timeline | Moves to the buttons | Opens the chapter strip | Nothing | Moves to Skip video |
| **Up** | Moves to the timeline | Moves to the back button | Moves to the timeline | Closes it | Leaves Skip video |
| **Back** | Leaves the lesson | Hides the controls | Hides the controls | Closes the strip | Leaves the video, the lesson carries on |
| **Play/pause key** | Pause or play | Same | Same | Same | Same |
| **Next, previous, fast forward, rewind** | Chapters | Chapters | Chapters | Chapters | Skip, or 10 seconds |

**Play speed:** the button beside Full screen goes through normal, 1.25, 1.5, 2 and 0.75, on any device. It's remembered on that device. The voice keeps its pitch, and pictures and pauses follow the same speed. So at 2× a "Your turn" pause is half as long. Videos follow it where YouTube allows.

Chapters: the Previous and Next buttons, the remote's next and previous keys, or the chapter strip.

While paused, Back leaves the lesson. Your place is saved, and the home screen offers Continue lesson and Start over.

## Cases covered
- **Different remotes:** Back is matched by name and number (LG 461, Samsung 10009, Android 4). Media keys too.
- **Back acting as the browser's back button:** handled, so it goes back one step and doesn't leave the site.
- **Back on other screens:** goes to the channel. Never during an exam or a form, where it could lose work.
- **A click inside a YouTube video** takes the keyboard away from the page: we take it back so the remote keeps working.
- **OK during a video:** pauses. It never skips by accident.
- **Video won't play, or autoplay is blocked:** the lesson carries on, or it says "Press OK to start the video".
- **Slow Wi-Fi:** videos can take a long time. The screen says it's loading, Skip video always works, and it gives up after 30 seconds only if YouTube's script never arrives.
- **YouTube's own bar:** the player sits outside the shrunk lesson stage, so its bar lines up with the cursor.
- **Screen going to sleep:** a wake lock keeps it on while the lesson plays, where the browser allows it.
- **Switching apps or tabs:** the lesson pauses.
- **Browser bars on screen:** big screens enter full screen on starting a lesson. There's a button, and the F key.
- **A child's theme:** the player resets the colors, so a lesson and its end screen look the same on every device. Without this, a dark theme made the end screen white on white.
- **A double tap during a video** goes to YouTube, not to us, because its player takes the tap.
- **Edges cut off on old TVs:** controls stay inside a safe margin of about 4 percent.
- **First or last chapter:** left restarts the first. Right on the last says "This is the last chapter".
- **Laptop play/pause key:** the computer keeps it for itself and passes it on through Media Session, so it works only during a lesson. It won't show on the remote test page.
- **Subtitles:** sit above the controls on every screen, and hide behind the chapter strip. If a subtitle would still cover a chapter title, the title moves up while the controls show.

## Tested and not tested
Tested with real key presses in a TV-sized browser: see the latest report in the team's private notes.
**Not tested on a real TV or a real remote.** The owner runs `channel/remote-test.html` on the TV and reports any button that stays grey, with its number.
