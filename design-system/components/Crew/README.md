# Crew
Bloop, Eco and Tango: the three pixel characters that do Bet's work. Their initials spell bet.

- **Bloop** (the octopus, `Bet.mascot()`) fills applications. **Eco** (the fish, `Bet.crew('eco')`) finds the jobs. **Tango** (the crab, `Bet.crew('tango')`) keeps the tracker and the goals. The brand book's crew section says where each one appears and how it talks.
- One pixel size for all three: the box classes `.bet-eco` and `.bet-tango` take `--ps` (`.bet-px1` to `.bet-px4`), and the octopus's `.bet-16` / `.bet-32` sizes are the same 1px and 2px pixel. Beside a chat line use 2px; next to the 44px Bloop in a panel head, 2.75 (the default); standing alone, 3 to 4.
- Each one idles on its own: Bloop bobs and blinks, Eco holds its place in the water, Tango blinks and takes a step now and then. `.is-still` stops it (a logo, reduced motion).
- `.bet-crew` is the "meet the crew" strip: a list of `.bet-crew-member`, each a `.bet-crew-stage` (42px tall, the three at 3px a pixel on one baseline), a `.bet-crew-name` with `.is-bloop` / `.is-eco` / `.is-tango` for the colour, and a `.bet-crew-role` line. Keep each role line to one short sentence in the character's own voice or one plain fact.
- In a chat, Eco and Tango sit in the octopus's slot on their newest line and the speaker's name goes over the first line of a run (`.bet-chat-who.is-eco`). See Chat.
- One of each on screen: a character stands in one place at a time. Tango sits at the head of the dashboard's numbers strip and moves to the goals card while the Tracker is open, hopping across (one keyframe path, a squash on landing); it is never in both.
- On a welcome screen the crew is one card under the main box: three cells split by hairlines, each a sprite over a name over two or three words ("Fills applications", "Finds jobs daily", "Tracks your goals"); rows on a phone.
- Never recolour a character or use a crew colour on a panel. Don't put one in a button; the one exception is the dashboard's numbers strip, a button that opens the Tracker, which carries Tango.
