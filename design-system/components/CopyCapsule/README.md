# CopyCapsule
A capsule that copies a value (an email address, a link) when clicked, then says so.

- Markup: `button.bet-copy[data-bet-copy="the value"]` holding `.bet-copy-text` (the `.bet-copy-value` and a `.bet-copy-done` line) and `.bet-copy-icon` with the `copy` and `check` glyphs (classes `i-copy`, `i-check`). Put a visually hidden `.bet-copy-live` (aria-live) next to it.
- `Bet.copy()` copies, rolls the text to "Copied to clipboard", swaps copy for a tick pixel by pixel, and floats four pixel hearts up from the icon. It resets after 2.2s.
- Where the clipboard is out of reach it selects the value instead and says so.
- It hugs its text. Never stretch it like a field.
