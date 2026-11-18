# Chat
A conversation with Bet (the start page's questions, the dashboard's Bet panel).

- Product addition, built from the speech bubble.
- `.bet-chat` holds `.bet-chat-line` (the speaker at 2px a pixel beside its newest line only, a `.bet-placeholder` keeps earlier lines aligned) and `.bet-chat-me` (the person: `tint`, right-aligned, no tail).
- Any of the crew can speak: Bloop is the octopus (`.bet-32`), Eco and Tango go in the same slot (`Bet.crew('eco', { px: 2 })`). When the speaker changes, the new speaker's name goes over its first line as `.bet-chat-who.is-eco` (or `is-bloop`, `is-tango`), the way a group chat shows who is talking; a run of lines by the same speaker gets one label.
- Lines are short, plain and specific, and each member talks about its own job. Offer choices as toggle chips under the line.
