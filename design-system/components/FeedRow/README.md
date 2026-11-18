# FeedRow
One job in a live feed: title and one line on the left, its age on the right. The newest age turns blue with a pinging dot.

- `ul.bet-feed` of `.bet-feedrow` (`surface`, 12px radius, `shadow-row`), 8px apart, usually inside a `.bet-recess`.
- New rows slide in at the top (700ms, `ease-out-soft`, from 10px above and 97% scale); the oldest drops off the bottom; the list fades to `bg` at the bottom.
- Titles and lines truncate with an ellipsis; never wrap.
