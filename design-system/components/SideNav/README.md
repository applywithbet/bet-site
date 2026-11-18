# SideNav
A sticky list beside long content (the demos, the teams on Careers, a policy's sections); the part being read turns blue.

- `.bet-sidenav` holds `.bet-sidenav-item` links. Each label is written twice, `.t.off` and `.t.on`, inside `.tx`: the grey copy slides up and the blue copy slides in (0.6s, `ease-std`).
- Lead each item with a tile icon (`.bet-pi`): grey (ink at 6% and 26%) until its item is on, then blue pixel by pixel.
- Set `.is-on` from your own scroll spy: the item whose section has passed 40% of the screen.
- `.bet-sidenav-sm` is the tighter version for long documents. Hide the list under 768px.
- Make the column sticky at `sticky-top` (92px), clear of the floating top bar.

## The app sidebar
In an app (the dashboard) the sections live in a glass pane along the left edge, 12px in from the top, bottom and left (`data-bet-glass="still"`: the frost and light, no bend, because the pane changes width).
- Top: the logo (the octopus on the icons' centre line, standing still, and the wordmark) and the fold button.
- The tabs, one per row (42px, pill hover): a tile icon in a fixed 21px column, the label, the count at the end. The open tab sits under the lens, which slides between tabs by transform, leading edge first. Up and Down move between tabs.
- Groups under a small muted label ("Dashboards"), each item with an initials tile; secondary rows below; the save line and the light / dark switch at the foot, under a hairline.
- Folded, the pane narrows to its icons (68px); a glass label names each icon under the pointer, and the fold button shows over the octopus on hover. The pane's width and the page's columns move together on `--ease-glide`; the list keeps its width, so it only slides. The choice is remembered.
- Between 1080px and 1320px the open pane floats over the list's edge (a click on the page folds it); under 1080px a glass button at the top left, naming the open tab, slides it in over a dimmed page.
