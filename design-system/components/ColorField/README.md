# ColorField
The colour field: four soft blobs (`hero-a` blue, `hero-b` lilac, `hero-c` lavender, `hero-d` periwinkle) on `hero-base`, a veil of light in the middle and faint grain so it never bands.

- `.bet-colorfield` paints it inside any box, scaled to the box (`Bet.colorfield()` keeps `--m`, the long side, measured).
- `.bet-hero-field` is the live version for a first screen: add `.bet-blobs` with four `.bet-blob` (`.a` to `.d`) and a `.bet-veil`; the blobs bloom in and drift slowly. Add `.bet-bubbles` for white pixel bubbles rising at the sides.
- It is the brand's one gradient, and it stays smooth (a stepped, pixelated version was rejected).
- Use it for a hero, a sign-off tile, a showcase panel behind a phone. Never behind a form, a dialog, a job page or careers. It is not a "vibe" background.
- In an app (the dashboard) it is only a faint wash: behind the page head (masked off within about 560px), in the gap a page shows when it bounces past its top, and as three soft blobs at the screen edges. Content panels stay solid on top of it.
- No green: the field is blue, lilac, lavender and periwinkle. A mint `hero-c` was tried and read as vibecoded.
- Text on it is `hero-ink`; one accent word may be `hero-accent` at 700.
