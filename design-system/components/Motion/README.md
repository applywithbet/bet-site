# Motion
Things arrive once and settle; small things move a pixel at a time; nothing loops while nobody can see it.

- Easings: `--ease-out` (0.16, 1, 0.3, 1) for reveals and rises; `--ease-out-soft` (0.22, 1, 0.36, 1) for bars, accordions and view swaps on the site; `--ease-std` (0.44, 0, 0.56, 1) for cards appearing and list items switching; `--ease-pop` and `--ease-spring` for small pops; `--ease-lens` for the glass lens; `--ease-glide` (0.32, 0.08, 0.24, 1) over `--dur-glide` (0.46s) for everything in an app that folds, opens, slides away or makes room.
- Glide starts from rest, peaks in the middle and settles slowly (about 3px in the first frame of a 188px move). The first frame after a click is slow because the page lays out; a curve at full speed from the start reads as a stall and then a lurch. Things that move together (a sidebar and the columns it pushes) use the same curve, the same length and the same start.
- Scroll reveal: `[data-bet-reveal]` rises 32px (0.75s) when it enters the screen; only what starts below the first screen waits. `data-bet-reveal="words"` lifts each word out of its own box.
- Cards in a list: `.bet-appear` (60px, 0.6s, `ease-std`, 0.1s late). A page settling in: `.bet-rise` (18px, 0.7s; stagger with `--d`).
- Hero: the colour field blooms (1.5s), Bet floats up (1.3s from 0.55s), the words rise (from 1.05s, 0.95s each), the buttons pop in (1.5s, 1.62s), the top bar slides in at 1.75s.
- Hover: 1px lift on buttons and pills, colour in 0.2s to 0.25s. Pixel things step (`steps()`), never ease.
- Page to page: the new page fades in over the old one (0.32s) and the top bar stays put. Theme switch: a circle grows from the button (650ms).
- Smooth scrolling on desktop: Lenis 1.1.18, `duration: 1.2`, `lerp: 0`, exponential ease-out (`Bet.smooth()`). Touch screens scroll natively, and scroll-driven effects there must be CSS only.
- `prefers-reduced-motion`: no reveals, no drawing in, no swimming; Bet stands still. Every state must look finished without motion.

## Folds and slides in an app
- **Lay out once, then move.** Change the layout in one go, then slide each column from where it was with a transform (FLIP: measure, change, invert, play). Never animate padding, margins or a container's width when that re-wraps text on every frame. A sidebar's own width may ease, on the same clock as the columns.
- **Nothing snaps.** What appears grows in place and fades in; what goes folds to nothing before it is removed, with its old content still on show while the box closes. Never swap the content and then resize an empty box. Slide what is under a fold (transform) and draw the fold's moving bottom edge with a clip, rather than easing a height and laying the page out every frame.
- Text in a box that changes width is clipped at its edge while it moves (`text-overflow: clip`), never re-shortened with "..." on every frame. A list keeps its width when a sidebar folds, so it only slides.
- Pixel-by-pixel draw-ins and glyph swaps stay out of a moving fold: a two-state chevron turns smoothly (`rotate` on `--ease-glide`) and only its first glyph is drawn.
- A character that travels (Tango hopping between the numbers strip and the goals card) runs its whole path as one precomputed keyframe animation, so a busy main thread can't stall it.
- Check a fold by sampling what is under it on every frame (and a screencast), not only the frame rate. On a Mac below 20% battery, Chrome and macOS cap pages at 30fps: plug in before judging smoothness.
