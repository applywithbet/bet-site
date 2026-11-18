# JobCard
The product's core card: one job with its company, title, facts, how well it fits, what the job is, and the two choices.

- `.bet-jobcard` (`surface`, 30px radius, `shadow-card`): `.bet-jobcard-body` then `.bet-jobcard-acts`.
- Head: `.bet-co` with a `.bet-logo`, the company (`.bet-co-name`) over one fact (`.bet-co-sub`), and a `.bet-save` circle.
- Title in `.bet-app-title` (display, 700, 25px). Facts in `.bet-jobmeta`: place, workplace, pay, age. Pay ranges use an en dash with spaces: "$150K – $190K".
- Fit: `.bet-fit` (a `tint` block, 18px radius) with a `.bet-ring` (set `--p` to the score) and a line of reasons, each tied to the person's resume.
- Body: `.bet-sec` section labels, `.bet-app-body` text, `.bet-ul` bullets, `.bet-tags` skills.
- Actions: the round pass button (`.bet-icon-btn.bet-icon-btn-xl` with `close`) and `.bet-go`, the dark Apply pill with its arrow circle. Applying never submits by itself: it opens the application, Bet fills it, the person submits.
- While dragging, add `.is-lift`: a deeper shadow fades in as opacity.

## In a list (the dashboard)
The dashboard's cards are rows in one long list, read top to bottom. Each fact appears once.
- Head: the logo tile (LogoTile) with the card's rank under it ("#1"), the company, and the title as the link to the posting (no separate "Posting" button).
- Facts, as separate spans set apart by a gap: place, pay, and one time ("Posted 2 days ago", else "Found yesterday"). Bet's link check lives in that time's hover, not in its own row.
- Tags: level, category, then warnings. Drop a tag the why line already says.
- The why line: one hugging block on a faint purple tint; the strongest reason in bold purple, the rest muted. Leave out drawbacks the card already shows ("outside Chicago").
- Actions: Apply and Mark applied on the left; People and Not for me quiet on the right.
- Show a fit ring only when the score is the person's own fit; a source's rough score shown as "2/5" on the top pick reads as broken.
- Not on the card: the source row (only Closed, On LinkedIn or a search link, as a small chip), a "New" chip, the posting's own words (they live in the level tag's hover).
