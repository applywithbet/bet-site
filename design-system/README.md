Bet is a job board that applies for you, and everything it ships should look like one product: the website, the dashboard, the Chrome extension and the app. This is that look, taken from the Bet site (applywithbet.com) value for value. Read this page first, then `USING.md` for how to load the files, then the component guidelines.

**In one breath:** an off-white page (`bg`) with white rounded panels (`surface`) and neutral black ink (`ink`); one blue (`primary`) that only ever means something; Google Sans Flex for headings and Roboto for text; pills for every control; liquid glass for the few things that float; one soft colour field, never anywhere near a form; every icon drawn as pixel art; and a crew of three pixel characters, Bloop, Eco and Tango, standing for everything Bet does by itself. Motion arrives once and settles.

## Voice and copy

Write like a small, humble team that knows its product, talking to one person.

- Plain and specific. Say what happens: "Bet fills out the application from your resume. It takes about a minute." Not "Seamlessly streamline your job search."
- Short sentences, sentence case everywhere (headings, buttons, tabs). "Book a demo", "Apply with Bet", "Not interested".
- "You" for the person, "we" for the team, "Bet" for the product. Bet can talk in first person in its own bubble ("I read your resume.").
- The wordmark and Bet's sign-off are lowercase: **bet** beside the octopus, "bet." in its bubble, "Okay, bet." as a reply. Everywhere else it is "Bet".
- **Never use an em dash** (in copy, emails, code comments, commit messages). Use a comma, colon, period or parentheses. Ranges use an en dash: "$110K – $140K" with spaces for money, "1–2 years" without.
- **Never use a middle dot (·) as a separator** ("Seattle · Hybrid" looks generated). Write it out: "Seattle, hybrid", "2h ago, 86 applicants", "Thu, Nov 19 at 2:00 PM". Where facts sit side by side in UI, give each its own span and space them with a CSS gap. Page titles use a bar: "Privacy Policy | Bet".
- Avoid: seamless, leverage, passionate, fast-paced, thrive, "we're not just X", stacked lists of three adjectives, salesy question headlines ("Not ready to talk yet?"), anything that implies press or scale Bet doesn't have.
- Keep list items grammatically parallel. Numbers as digits ("20 jobs a day", "95% faster").
- Don't promise timelines you can't keep. "We read every application, and we'll get back to you if it's a fit."
- Errors say what went wrong and how to fix it: "Enter an email address we can reach you at."
- Empty states say what will appear and what to do now: "Your jobs are on the way." They sit in a card where the list would be (see EmptyState), never as centred text floating in an empty column.
- Some places may be playful (job postings, the octopus), never the controls.
- No emoji in product copy.

## Colour

All colours are tokens with a light and a dark value. Use the token, never the hex.

- **Ground:** `bg` is the page. `surface` is every panel, tile, card and sheet on it. `tint` is the quiet fill: row hover, quiet button hover, the search bar, small icon squares, the segmented track. Fields sit on `bg` inside a `surface` panel.
- **Text:** `ink` for text and titles; `muted` for descriptions, meta lines, labels and inactive tabs. Both read at 4.5:1 or better on `bg`, `surface` and `tint` in both themes.
- **Lines:** shades of ink, not greys: `hairline` (6%) between cards, `tile-line` (8%) for panel edges and tag outlines, `field-line` (16%) for outlined fields and the outline button, `line` for solid rules. Every divider fades out at both ends.
- **Blue means something.** `primary` is for links, the current item in a list, the accent words of a heading, focus rings, progress, the big number. Its fills are `primary-soft` (with `on-primary-soft` text). Don't paint panels or big areas blue.
- **One accent word per heading.** A section heading may set its last phrase in `primary` ("The future of *applying to jobs*"). Only the hero headline and a line on the colour field use `hero-accent` (purple) for their accent word, at 700.
- **Dark fills are neutral black.** The main button is `ink` with `on-ink` text. Never a near-black purple or navy for buttons, text or shadows; that reads as generic. Shadows are neutral (`rgb 20 20 20`); use the `shadow-*` tokens.
- **Status:** chips pair a soft fill with its ink: `chip-green` (interview, done), `chip-blue` (applied, new), `chip-purple` (things Bet did), `chip-amber` (kept as a token, but not used: no yellow or amber text anywhere, it reads as vibecoded; "needs a look" is ink on `tint`), `chip-red` (closed, failed). Always with a word, never colour alone. `err` is error text and invalid borders.
- **No status dots.** A small coloured dot as status (a green "live" dot with a halo, a flat red "not connected" dot, colour-key dots on tiles) reads as generated. Say it in words ("Last search 10 minutes ago", "Extension not connected"), show a pixel glyph (the `check` in `muted` for "Saved"), or show nothing.
- **The colour field** (`hero-base` with `hero-a` blue, `hero-b` lilac, `hero-c` lavender, `hero-d` periwinkle) is the brand's only gradient. It appears in a hero, a sign-off tile and a showcase panel. It stays smooth (never stepped or pixelated) and it never sits behind a form, a dialog, a job posting or the careers page. No green in it or in any brand gradient (a mint `hero-c` was tried and read as vibecoded); green is for status chips only.
- **In an app** (the dashboard) the field is only a faint wash: behind the page head, in the gap a page shows when it bounces past its top, and as three soft blobs at the screen edges, so every screenful has a little colour. Content panels stay solid on top of it.
- **The crew's colours** (`octo-*` for Bloop, `fish-*` for Eco, `crab-*` for Tango) belong to the characters only and don't change with the theme. Their names in text use `crew-bloop`, `crew-eco` and `crew-tango`, which do.
- **Theme:** light and dark are the same design with different token values, switched by `data-theme="light" | "dark"` on `<html>` (or a shadow host); without it the system setting decides. Never write a separate `prefers-color-scheme` rule for a component: put the colour in tokens.json so the theme switch reaches it.

## Type

Two families: **Google Sans Flex** (`--font-display`) for headings, names, labels, pills and numbers that matter; **Roboto** (`--font-body`) for text, buttons, fields and tabs. Both are variable (400 to 700) and ship in `fonts/`.

- **Two weights carry everything.** 500 for large display headings (`hero`, `display`, `headline`, `section`, `step`, `stat`) and for UI (buttons, tabs, labels, names, chips). 700 (`--title-weight`) for titles at card scale and below (`title-xl` to `title-sm`, `app-title`), the wordmark, the "bet." bubble and accent words. If something looks too bold, it's probably a big heading set at 700.
- Display text is tight: letter-spacing from -0.01em (labels) to -0.06em (the big number), line-height 0.9 to 1.2. Headings use `text-wrap: balance`, paragraphs `pretty`.
- Running text: 16px at 1.5 (descriptions 1.7), at most `measure` (62ch). Secondary text is `muted`, not smaller.
- Product screens use the app scale: `app-title` 25px, `app-heading` 21px, `app-body` 14px, `app-meta` 12.5px.
- Big sizes are fluid (`clamp`, see each style's usage). Inputs are 16px so phones don't zoom. Numbers that line up use tabular figures.
- The current tab goes to 600 without shifting its neighbours (the `data-label` trick in TopBar).

## Shape, space and layout

- **Pills for controls.** Buttons, tabs, chips, tags, the top bar, the search bar and Yes/No choices are all `radius-pill`.
- **Radius by role:** `radius-tray` 32 (form tray), `radius-app-card` 30 (job card), `radius-sheet` 28, `radius-tile` 24 (tiles, panels, bubbles), `radius-list` 22, `radius-row` 18, `radius-panel` 16 (inner panels, accordion items, video frames, drop zones), `radius-field` 12, `radius-sm` 10. Phones step the big ones down (24 to 20, 28 to 22).
- **Bands:** the widest content is `band` (1240px, `min(1240px, 100vw - 40px)`) with side padding `clamp(20px, 4vw, 50px)`; a reading column is `column` (960px); a form or FAQ is `form-width` (720px). Sticky columns stop at `sticky-top` (92px), under the floating bar.
- **Space over lines.** Group with whitespace and alignment. A panel gets at most one line inside it. Never build a grid of hairlines or a directory of boxed rows.
- **One clear structure per section**, modelled on a polished reference (Salix, Rogo, Ashby, Harmonic). No stacks of identical cards "demo after demo", no numbered badges, step pills or "what happens next" chips unless the content really is a sequence.
- **The first screen shows more.** The next section peeks above the fold at laptop heights (660 to 960px tall), so people can tell the page scrolls.
- **Gaps from the scale:** 8 label to field, 12 between buttons, 16 between tiles, 22 inside a tile, 24 between form rows, 28 head to media, 40 between cards in a list, 56 between a sticky column and its content.

## Surfaces and depth

- **Solid panels:** Tile (bento box with a masked 1.5px edge that glows blue near the pointer), Card (a big raised panel), Sheet (lifts off what's behind with a top-only shadow), Tray + Panel (forms). Content lives on these.
- **Liquid glass** is for what floats over the page or controls it: the top bar or the app's sidebar, the second button, feature pills, the search bar and filter pills, a numbers strip that opens a view, the status bar, menus and open dropdowns, toasts, and the tab of a panel that has slid away. **Content is solid:** job cards, news panels, goals, stage tiles, tables, Bet's card and empty states. Glass on every panel was tried and read as overused; choose it with taste. The recipe is fixed (see Glass): tint gradient `glass-a` to `glass-b`, `blur(16px) saturate(1.8)`, a rim light and a sheen lit from the top left (the light stays there; it does not follow the pointer), a hairline `glass-edge`, `shadow-glass`. In Chromium on desktop every small piece of glass bends what is behind its rim like the edge of a lens, with a little colour split; a pane that changes size (the sidebar) keeps the frost without the bend. Glass squashes when pressed, lifts on hover, lands like a drop and flexes with the scroll. Never make a whole page out of glass.
- **The current tab** gets the lens: a brighter drop of glass that slides between tabs with a stretchy leading and trailing edge.
- **Shadows** come only from the `shadow-*` tokens. Media frames use `shadow-media`; dragging uses `shadow-lift` faded in as opacity.

## Iconography

Every icon is pixel art. There are no outline icon sets, no emoji and no sparkles.

- **Glyphs** (`icons/glyph/`, `.bet-pxi`): one colour (`currentColor`) on a 7x7 grid, 2px a pixel, so 14px beside text (9x9 at 18px for sun and moon; 21px when a glyph stands alone).
- **Tile icons** (`icons/tile/`, `.bet-pi`): a 5x5 drawing on a 7x7 tile, `primary` on `primary-soft`, 21px or 14px. They label something: a list item, a tile title, a feature pill. Grey (`.bet-pi-muted`) until active.
- They come alive a pixel at a time: they draw in the first time they're seen, glyphs turn blue on hover, tile icons redraw when their card is pointed at, and pairs swap (copy and tick, sun and moon, chevron down and up). With reduced motion they are simply there.
- Draw new ones in the same grammar: square pixels, crisp edges, two-pixel stair-step diagonals, a draw order (`--i`) that follows the stroke. Check them at 21px; ideas that don't read at 5x5 (an envelope, a bell) get a different picture.
- Glyphs added for the products: close, search, plus, minus, more, person, trash, pause, star, bookmark.
- Company logos stay the companies' own marks (`.bet-logo`), never redrawn or recoloured; with no mark, initials. Never invent a logo.
- Bet's own actions show the crew member who does them, not a generic AI symbol: Bloop on "Apply with Bet", "Drafted by Bet", the marker on fields it filled and the status bar; Eco on the search and new jobs; Tango on the tracker and goals.

## The crew: Bloop, Eco and Tango

Three pixel characters do Bet's work, and their initials spell **bet**. Each stands for one thing Bet does by itself, so a person always knows who is talking and what it is about. Bet, the product, keeps its name everywhere ("Apply with Bet"); the crew is how it shows up.

| | Who | Does | Appears on |
| --- | --- | --- | --- |
| Bloop | the purple octopus, `mascot/bet.svg` | fills applications: reads the résumé, types the answers, drafts the essays | the logo, "Apply with Bet", "Drafted by Bet", the marker on filled fields, the status bar, the extension |
| Eco | the blue fish, `mascot/friends/fish.svg` | finds the jobs: the hourly search, today's list, the job bank, what came out today | Apply today, Job bank, the new-jobs panel, "Last search" |
| Tango | the coral crab, `mascot/friends/crab.svg` | keeps the tracker and the goals: applied, interviews, offers, days in a row | Tracker, the header numbers, the goals tile, "Mark applied" |

- **Bloop, the octopus**: 16 x 14 pixels, flat `octo` body, `octo-shade` on the right, `octo-shine` highlight top left, white eyes with `octo-eye` pupils, `octo-cheek` cheeks. Use `mascot/bet.svg` as it is; keep the 16:14 ratio; never redraw, recolour, outline or add a face. It bobs a pixel, blinks every 4.2s, and walks with two leg frames. It stands still in the logo, in favicons and with reduced motion. The big one floats (6.5s sway, soft shadow) on a first screen.
- **Eco, the fish** (13 x 8, `fish`, `fish-shade`, `fish-shine`) holds its place in the water: a pixel up and a pixel forward on Bloop's beat. It swims through a pixel band once when the band comes into view.
- **Tango, the crab** (15 x 11, `crab`, `crab-shade`, `crab-shine`) blinks and shuffles a step sideways now and then, and hops when pointed at on a band.
- **One pixel size for all three** keeps them in scale: `--ps` is the size of a pixel (`.bet-px1` to `.bet-px4`; 2px beside a chat line, 2.75 beside the 44px Bloop, 3 to 4 standing alone). `Bet.crew('eco', { px: 2 })` and `Bet.crew('tango')` build the markup; Bloop is `Bet.mascot()`.
- **They speak in speech bubbles** with a tail pointing at them ("bet.", "Okay, bet.", "Got it."). A crew member can travel with the person through a page (on the site Bloop moves between perches and ends in the top-bar logo), but quietly: no hopping about, legs moving only while it travels. In a chat, the speaker's name sits over the first line of a run (`.bet-chat-who`), in its colour.
- **Names in text** use `crew-bloop`, `crew-eco`, `crew-tango` (display, 700). Never paint a panel, button or chip in a crew colour.
- **Voice**: first person, short, specific, about its own job. Bloop: "I'll fill this one in from your résumé." Eco: "12 new jobs this morning, 3 new to you." Tango: "Two more and you've hit this week's goal." Nobody talks about another member's work, and nobody nags.
- **One of each on screen.** A character stands in one place at a time. Tango sits at the head of the dashboard's numbers strip, and moves to the goals card while the Tracker is open, hopping from one to the other; it is never in both. The numbers strip is the one button with a character in it (it opens the Tracker, Tango's view).
- **Goals stay honest**: Tango's goals are the person's own numbers (applications a week, interviews a month, days in a row). Progress is a `.bet-progress` line and a tabular number; no badges, levels, points or confetti storms. Hitting a goal earns pixel hearts (`Bet.hearts`) and one plain line.
- `.bet-crew` is the "meet the crew" strip: the three in a row, each on one 42px baseline, a name in its colour and one line on what it does. On a welcome screen the crew is one card under the main box (three cells split by hairlines: sprite, name, two or three words such as "Finds jobs daily"); on a phone the cells become rows.
- Other friends in the same style: bubbles and hearts (`mascot/friends/`). New ones use the same rules (3px a pixel, flat fill, shade right, highlight top left, white and dark eyes, pink cheeks). No illustrated scenery, with one exception: the dashboard ends in a small sea floor, found by scrolling past the list like a footer (a pixel sand strip, a sea fan, a coral branch with pebbles, a shell, and one stream of the friends' blue bubbles that runs only while it is on screen). It is an easter egg: nothing busier, and nothing like it higher up the page.

## Pixel touches

- **Bands** (`.bet-band`) between big sections: 1px `px-dot` dots on a staggered 5px grid with page-colour blocks stepping into the top edge and faded ends. The crab sits on one; the fish swims through one now and then.
- **Pixel bubbles** drift up the sides of a colour field; **pixel hearts** float up from a button that just did something nice (copied, saved).
- Pixel art is for marks, icons and small characters. Gradients, type and panels stay smooth.

## Motion

- Things arrive once and settle; nothing bounces around the page or loops while off screen.
- Easings: `--ease-out` for reveals and rises, `--ease-out-soft` for bars, accordions and view swaps on the site, `--ease-std` for cards appearing and list items switching, `--ease-pop` and `--ease-spring` only for small pops, `--ease-lens` for the glass lens, and `--ease-glide` (0.46s, `--dur-glide`) for anything in an app that folds, opens, slides away or makes room: the sidebar, panels, folds, a card closing onto its tab. Glide starts from rest; a curve that starts at full speed lurches after the slow first frame. Things that move together use the same curve and length. Pixel things step with `steps()`.
- **Smooth means nothing snaps.** Dropped frames are rarely the problem; content jumping in one frame is. Lay the page out once and slide the columns from where they were with transforms (FLIP). What appears grows in place and fades in; what goes folds to nothing before it is removed (never swap the content and then resize an empty box). Text in a box that changes width is clipped at its edge while it moves, never re-shortened with "..." on every frame. A list keeps its width when a sidebar folds, so its lines never re-wrap mid-move. Pixel-by-pixel draw-ins and swaps stay out of a moving fold (a chevron turns smoothly instead). Check a fold by watching what is under it frame by frame, not only the frame rate.
- Durations: colour 0.2 to 0.25s, a step fading 0.35s, accordions 0.45s, cards appearing 0.6s (60px, 0.1s late), page settle 0.7s, scroll reveal 0.75s (32px), page-to-page fade 0.32s with the top bar holding still, theme circle 650ms.
- Desktop scrolls smoothly with Lenis (1.2s, exponential ease-out); touch screens scroll natively, and anything tied to scroll there is CSS only.
- `prefers-reduced-motion`: no reveals, drawing in, swimming or smooth scrolling; Bet stands still; every state looks finished.
- Demo videos never show a play button, even when the browser refuses to autoplay: the cover frame stays up instead. No click circles, cursors flashing or toasts in recordings.

## Accessibility

- Focus is always visible: a 2px `primary` outline (offset 2 to 3px outside, -2px inside tabs). Fields focus with a `primary` border plus a 3px `focus-ring` glow.
- Text meets 4.5:1 on its ground in both themes (3:1 for 24px+). Status is never colour alone.
- Every icon-only button has an `aria-label`. Decorative pixel art is `aria-hidden`.
- Reduced motion is honoured everywhere (see Motion).

## Ruled out

Each of these was built and rejected. Don't bring them back.

- Near-black purple or navy (`#1b1840`-style) for buttons, text or shadows.
- A pixelated or stepped version of the colour field.
- Gradients, glows, swirls, kickers or two-tone headlines behind or inside forms and dialogs; dark purple job pages.
- Hairline systems: grids of lines, boxed directory rows, many dividers in one panel.
- Logos in moving carousels or tickers.
- Stacks of identical demo cards with chips, numbered step badges and connector pills.
- Generic AI sparkle icons for Bet's actions.
- A Tinder-style "PASS" stamp on swipes; step dots or "page" indicators under a phone mock-up.
- Filler stats and decorative charts in a tile.
- Play buttons on demo videos; toasts and click circles in recordings.
- Illustrated pixel scenery (sea scenes, corner pieces), beyond the one small sea floor at the foot of the dashboard; a busier floor (kelp whips, a back row, light shafts) was tried and rejected.
- Glass on content (job cards, news panels, goals, tables): it reads as overused. Glass is for what floats or controls.
- A light on glass that follows the pointer.
- Green in the colour field or any brand gradient.
- Status dots of any kind, flat or glowing.
- Middle dots (·) as separators.
- Centred empty-state text floating in an empty column.
- A speech bubble beside a panel's tab once the panel has slid away (Bet's line shows in the glass toast instead).
- The same crew member in two places on one screen.
- A long paragraph on a welcome screen: keep it to the logo, the box, two buttons and the crew card.
- Company logos shrunk into a frame, or every logo stretched to fill its tile (cropped, pixelated). Fit each one (LogoTile).
- A fit score the person can't trust (a scraper's score shown as "2/5" on the top pick).
- Scroll-jacking, snap-pausing or timed holds while scrolling.
