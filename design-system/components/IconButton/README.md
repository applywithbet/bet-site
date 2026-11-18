# IconButton
A round button holding one pixel glyph, for actions that don't need a word.

- `.bet-icon-btn` (38px): inside glass bars (the theme switch). Hover fills with `glass-hover`.
- `.bet-icon-btn-lg` (44px): on a page (Back). Hover fills with `tint`; the glyph is 21px.
- `.bet-icon-btn-xl` (56px): the round pass button beside the Apply pill on a job card.
- `.bet-save` (38px on `tint`): save a job; `aria-pressed="true"` turns it blue.
- Always give it an `aria-label` that says what it does ("Back to all jobs", "Not interested", "Switch to dark mode").
- The theme switch holds both the sun and the moon glyph (classes `i-sun`, `i-moon`); they swap pixel by pixel. `Bet.theme.toggle()` grows the new theme as a circle out of the button.
