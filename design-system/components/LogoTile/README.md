# LogoTile
A company's own mark on a rounded square, or a person's initials in a circle.

- `.bet-logo` (set `--sz`, 46px by default; radius 27% of the size). Put the company's real logo inside (`img` or `svg`, 56%), on `--lg-bg` / `--lg-fg` when the mark needs its own colour. The 1px ring (ink at 12%) keeps white tiles visible on white.
- Fit each logo file to the tile, judged from its edge pixels: a solid square logo (an app-icon style mark) fills the whole tile and takes its rounded corners; a mark on a clear or white ground sits at about two thirds of the tile on white; a white mark sits on a near-black tile. Shrinking every logo into a frame, or stretching every logo to fill (cropped, pixelated), were both rejected.
- No logo: `.bet-logo.is-initials`, one or two letters in the display face on `tint`. Never invent or redraw a company's mark.
- People: `.bet-avatar` (round, 32px), initials or a photo.
