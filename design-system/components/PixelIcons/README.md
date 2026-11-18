# PixelIcons
Every icon is pixel art, drawn on a grid with square pixels and `shape-rendering: crispEdges`.

- Glyphs (`.bet-pxi`, `icons/glyph/`): one colour (`currentColor`) on a 7x7 grid (9x9 for sun and moon, 5x5 for lock), shown at 2px a pixel: 14px, 18px, 10px. Use 21px (`.bet-pxi-lg`) where a glyph stands alone (Back, the done tick).
- Tiles (`.bet-pi`, `icons/tile/`): a 5x5 drawing on a 7x7 tile, `primary` on `primary-soft`, 21px (14px with `.bet-pi-sm`). They label something: a list item, a tile title, a feature pill. `.bet-pi-muted` is the grey state.
- Motion: they draw in pixel by pixel the first time they're seen (`Bet.pixels()`, `--i` per pixel, `--pxs` 30ms), glyphs turn blue pixel by pixel on hover, tile icons redraw when their card is pointed at, and swaps (copy and tick, sun and moon, chevron down and up) go pixel by pixel. Reduced motion: they're simply there. Icons in a fixed bar carry `is-drawn` so they never redraw.
- Diagonals are two-pixel stair steps (one-pixel diagonals look thin beside text). Check a new icon at 21px before using it.
- Glyphs marked `data-added="products"` (close, search, plus, minus, more, person, trash, pause, star, bookmark) were drawn for the products in the same style.
- Company logos stay the companies' own marks. No outline icon sets, no emoji, no sparkles.
