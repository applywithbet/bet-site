# Choice
Pills for picking: Yes / No questions on an application, and toggle chips for picking several.

- Yes / No: `.bet-choice` holding `label > input[type=radio] + span`. The chosen pill fills with `ink` and its text turns `on-ink`. 140px each on desktop, sharing the width on phones.
- Toggle chips: `button.bet-toggle[aria-pressed]` (38px) in a `.bet-choice` row, for "What kind of job?" style questions.
- A checkbox and its line: `.bet-check` (18px box in `primary`, the line in `muted`).
- Invalid group: `aria-invalid="true"` on `.bet-choice` turns every pill's ring `err`.
