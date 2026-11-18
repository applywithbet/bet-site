# Segmented
A filter with two to four choices inside a list: a white thumb slides along a `tint` track.

- `.bet-seg` holds buttons with `aria-pressed` (or `aria-selected`). `Bet.seg()` sets `--n` and `--at` and moves the thumb with `ease-pop` (0.55s). It fires a `bet-change` event with the index.
- A count can follow the label in `<small>`, in `muted`.
- Keep labels to one or two words.
