# FormCard
The two-layer card that holds a short form: a soft tray (ink at 3% on `bg`, 32px radius, 24px padding) with the white panel inside (16px radius, `shadow-panel`).

- `.bet-tray` > `.bet-panel` > `form.bet-form` (24px between rows). Two short fields share a row in `.bet-form-grid`; `.is-wide` spans both.
- Filled inputs (`.bet-input`) on the white panel. The submit button is `.bet-btn.bet-btn-block` at the end.
- On phones the tray thins to an 8px rim.
- Nothing behind it: no colour field, no glow, no gradient. A plain title above it in one colour.
- After sending, swap the form for the Done state in the same panel, keeping its height.
