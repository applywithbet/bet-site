# Button
The pill is the only button shape: a dark ink pill for the action, glass beside it for the second choice, quiet text buttons inside panels.

- `.bet-btn`: ink fill, `on-ink` text, `shadow-cta`, lifts 1px on hover. Give each view one main action.
- Add `<span class="bet-btn-arrow">` holding the `arrow-right` glyph when the button takes you somewhere (Book a demo, Apply with Bet). The arrow nudges forward on hover. Use `arrow-down` and `.bet-btn-down` when it scrolls down the page.
- Sizes: `.bet-btn-lg` in a hero, the default (46px) in content, `.bet-btn-sm` (38px) in the top bar, `.bet-btn-block` (54px, full width) at the end of a form.
- Second choice: `.bet-btn-ghost` (liquid glass) beside a dark pill, `.bet-btn-outline` (1.5px `field-line` ring) inside a panel.
- `.bet-btn-quiet` for small text actions in a row: Undo, Replace, Remove, Rewrite. `.bet-btn-light` (white pill with a ring) for Upload file on a `bg` field.
- Busy: set `disabled` (it drops to 72% and the cursor shows progress) and change the label to say what is happening ("Sending…").
- Labels are short verbs in sentence case that say what happens: "Apply with Bet", "Book a demo", "Watch the videos", "Okay, bet." Not "Click here", not "Submit" when a clearer verb exists.
- Icons in buttons are pixel glyphs at 14px (`.bet-pxi`). On hover they turn blue pixel by pixel: `primary-inv` on the dark pill, `primary` on light buttons.
- Focus: a 2px `primary` outline 3px outside the pill.
