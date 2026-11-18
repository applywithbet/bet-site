# Accordion
Common questions: one answer open at a time, and the open one fills with `bg`.

- `.bet-faq` of `.bet-faq-item` (16px radius, `tile-line` ring). The question is a button inside `h3.bet-faq-q` with the two-state `chevron` glyph in `.bet-faq-chev`; it swaps down to up pixel by pixel.
- `Bet.faq()` folds closed answers (0.45s, `ease-out-soft`) and keeps one open. Without script every answer stays open.
- Answers come only from facts the product already states. Plain questions, no sales lines.
