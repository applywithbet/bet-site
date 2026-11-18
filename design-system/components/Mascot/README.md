# Mascot
Bloop, the purple pixel octopus (one of the crew, and the one in the logo): 16 x 14 pixels, flat body (`octo`), a shaded right side (`octo-shade`), a highlight top left (`octo-shine`), white eyes with dark pupils (`octo-glint`, `octo-eye`) and pink cheeks (`octo-cheek`).

- Use the SVG from `mascot/bet.svg` (or `Bet.mascot()`); never redraw it. Keep the 16:14 ratio. Sizes: `.bet-16`, `.bet-24`, `.bet-32`, default 44, `.bet-56`, `.bet-84`, `.bet-230`.
- It bobs a pixel, blinks every 4.2s and walks (two leg frames, 0.9s) with `steps()` timing. `.is-standing` keeps its legs still; `.is-still` stops everything (the top-bar logo, favicons, reduced motion).
- `.bet-float` is the big hero Bet: it floats up and sways ±1.6deg over 6.5s with a soft shadow; its legs move only while `.is-walking`.
- Bloop stands for filling applications: the logo, the "Apply with Bet" reveal, "Drafted by Bet", the marker on fields it filled, the status bar, the extension. Never use a generic AI sparkle for that. Finding jobs is Eco's and the tracker is Tango's (see Crew).
- Its colours never change with the theme. Its dark pupil colour is for the mascot only.
