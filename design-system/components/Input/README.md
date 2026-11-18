# Input
Text fields in two styles: filled for short forms on a white panel, outlined for long application forms where every field must read as a field.

- `.bet-field-row` holds `.bet-field-label` (0.875rem, 500), the control, then `.bet-help` and `.bet-err`. `.bet-field-lg` sets labels in the display face at 1rem for long forms.
- `.bet-input` (filled): 54px, `bg` fill, no outline until hover (ink at 14%) or focus. `.bet-input.bet-input-outline`: 48px, 1.5px `field-line`, turns `surface` on focus.
- Focus is always a `primary` border plus a 3px `focus-ring` glow. Invalid: `aria-invalid="true"` turns the border `err`; say what is wrong and how to fix it in `.bet-err`.
- `select.bet-input.bet-select` draws the pixel chevron. `textarea.bet-input` starts at 120px and grows by hand.
- `.bet-search` is the `tint` pill for search; `.bet-input-sm` (38px) for filters and inline edits in dense screens.
- Inputs are 16px text so phones don't zoom.
