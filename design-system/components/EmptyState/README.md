# EmptyState
When a list is empty, Bet says what will show up here and how to get it, in a card where the list's cards would be.

- `.bet-empty`: a `surface` card (app-card radius, `shadow-card`) on the list's left edge. In a row: the crew member whose list it is at 48px (Bloop as the octopus at 48 x 42; Eco or Tango through `Bet.crew('eco')`, 3px a pixel), then `.bet-empty-t` with a `.bet-empty-h` title (what will appear, in ink, no full stop) over one `muted` line (what to do now), and at most one button. On a phone the row aligns to the top.
- Loading is the same card with the wait dots (`.bet-wait`) in the member's place, so nothing jumps when the list arrives empty.
- Say what's coming and what to do now, in that member's voice: Eco on an empty job list ("Your jobs are on the way. I'm searching your cities now; the first ones show up within the hour."), Tango on an empty tracker ("Nothing tracked yet. Mark a job applied and I'll keep the date."). Never just "No data".
- Never a centred paragraph floating in an empty column: it reads as random text on the page.
