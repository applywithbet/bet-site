# Menu
A short list of actions in a glass panel, opened from a button (My dashboards, a row's More menu).

- Product addition, built from the liquid glass and the quiet button.
- `.bet-menu` holds `.bet-menu-item` buttons or links, 38px tall, hover fill ink at 6%. Separate groups with an `hr`. A destructive item takes `.is-danger` (`err`) and a word that says what goes ("Delete dashboard").
- Open it under its button, close it on Escape, outside click and choice; move focus into it and back.

## Select (an open dropdown)
- Every `<select>` on a page that loads `bet.css` opens as this menu, in Chromium (customizable select, `appearance: base-select`): the glass panel, 38px options with the ink 6% hover, the chosen one at 600 with the pixel `check` in `primary` at the end, and the `bet-glass-in` landing. Safari and Firefox keep their own list. The closed field keeps its page's look (a pill or an outlined field with the pixel chevron).
- It opens downward and fits the room under the field, scrolling when longer; it flips up only when less than 160px is left below. If the page can scroll, scroll it just enough before opening a field that sits near the bottom of the screen, rather than letting the list open upward over what is above.
- Long choices end in "..." when the page puts `<button data-fit><selectedcontent></selectedcontent></button>` first inside the select; re-make it when the options' text changes (counts like "All regions (321)"), because the browser copies the choice only when it changes. Read the choice with `selectedOptions`, not `textContent`.
