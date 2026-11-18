# PixelBand
The dotted band between sections, with Bet's sea friends living in it.

- `.bet-band` (96px, 48px on phones) with four empty `i` children: 1px `px-dot` dots on a staggered 5px grid, four blocks of page colour stepping into its top edge, and ends that fade like every divider. Set `--band-bg` if the page behind isn't `bg`.
- A crab (`.bet-crab` holding `mascot/friends/crab.svg`) sits on top of the band, blinks and shuffles now and then, and hops when pointed at.
- A fish (`.bet-swim` > `.bet-swim-bob` holding `fish.svg`) swims through once when the band comes into view, at most every 20 seconds, blowing bubbles (`Bet.swim()`).
- Friends are drawn in Bet's style at 3px a pixel (2px on phones): flat fill, shade on the right, highlight top left, white and dark eyes, pink cheeks. Add new ones in the same vocabulary; no illustrated scenery.
- Use bands sparingly, between big sections. Loops pause off screen.
