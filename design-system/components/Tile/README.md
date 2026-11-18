# Tile
The bento box: a `surface` panel with a 24px radius and a masked 1.5px `tile-line` edge that lights up blue around the pointer.

- `.bet-tile` inside `.bet-tiles` (a 12-column grid, 16px gaps; 2 columns under 1024px, 1 under 640px). Give each tile its span with `grid-column`.
- The edge glow comes from `Bet.glow()` on the grid (mouse and trackpad only): a 240px blue circle at the pointer, shown on every tile's edge at once, so neighbours glow where the pointer is near them.
- `.bet-recess` is a panel set into a tile (`bg` fill, inset ink 5% ring, 16px radius) for a feed or a small form. Fade its overflow to `bg`.
- `.bet-tile-dots` puts a faint 20px dot grid in the tile's top right corner.
- One idea per tile: a headline, one number, one moving example. Don't pad a tile with filler charts or made-up stats; leave the space or make the real fact bigger.
- `.bet-tile.bet-tile-field` with a `.bet-swirl` inside is the sign-off tile on the colour field.
