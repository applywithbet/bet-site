# Tabs
Underline tabs switch between two or three views of one thing (a posting's Overview and Application).

- `.bet-utabs` holds `.bet-utab` buttons or links; the current one has `aria-selected="true"` (or `aria-current`) and an ink bar that grows from the middle (0.4s, `ease-out-soft`).
- Display face, 500, 1.12rem. Each tab is 200px wide on desktop and shares the width on tablets and phones.
- For an app's main sections use the glass tabs in the TopBar instead; for a filter inside a list use Segmented.
