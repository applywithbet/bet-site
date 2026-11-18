# StatusBar
Bet at work on a page: the octopus, what it is doing, and a ring that fills. When it's done, the ring becomes a tick.

- Built for the extension's floating box on application pages, and anywhere Bet works in the background.
- `.bet-statusbar` (glass, 24px radius, at least 62px tall): the octopus at 30 x 26 (walking while it works), `.bet-statusbar-text` (`b` what it is doing, `span` the detail), `.bet-statusbar-ring` with `--p` from 0 to 100.
- `.is-ready` swaps the ring for the green tick: "Ready for you to review". Bet never submits for the person.
- Copy: "Filling in your application", "9 of 14 fields on Workday", "Ready for you to review", "Check it, then press Submit".
