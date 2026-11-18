# TopBar
The floating liquid-glass capsule at the top of every Bet page: the wordmark, the section tabs, the theme switch and one dark pill.

- `.bet-topbar` is only as wide as its contents and centred, so it never sits on a panel's edge. `.bet-topbar-fixed` pins it 16px from the top (12px on phones).
- Inside: `.bet-brand` (the octopus at 24px and the lowercase wordmark), `.bet-tabs` with `.bet-tab` links, a `.bet-theme-toggle`, then `.bet-btn.bet-btn-sm`.
- Mark the current tab with `aria-current`. `Bet.lens()` slides a brighter drop of glass to it: the leading edge moves first, the trailing edge 90ms later, and it squashes a little on the way. Change `aria-current` and the lens follows.
- Wrap each tab's text as `<span class="lbl" data-label="Same text">` so tabs keep their width when the current one goes bold (600).
- Narrow screens: under 800px the wordmark hides; under 720px the pill hides and the tabs scroll sideways inside the bar, with faded edges, keeping the current tab in view.
- `data-bet-refract` adds real refraction along the rim in Chromium on desktop.
- In a product the same bar carries the app's sections ("Apply today", "Job bank", "Tracker"), each with a `.bet-count`.
