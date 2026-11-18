# Using it in a product

How to load the Bet design system in each kind of product, and how to restyle an existing one without breaking it.

## The files

| File | What it is |
| --- | --- |
| `tokens.json` | The source of every colour, size, radius, shadow and type style. Edit this, then run `python3 tools/build.py`. |
| `tokens.css` | Generated. Every token as a CSS custom property on `:root` and `:host`, with the light / dark / system theme blocks. |
| `fonts.css`, `fonts/` | Google Sans Flex and Roboto, variable (400 to 700), latin and latin-ext, as local files. |
| `bet.css` | The components and motion, all prefixed `bet-` so they can sit inside any page or shadow root. Needs `tokens.css`. |
| `icons/icons.js` | Generated. Every pixel icon, the octopus and its friends as markup (`window.BetIcons`). |
| `bet.js` | Behaviours (`window.Bet`): theme switch, lens, liquid glass (bend, light, flex), pixel draw-in, reveals, tile glow, copy, accordion, segmented control, fish, Lenis. Plain script, no build. |
| `bet-theme-head.js` | Sets `data-theme` before first paint from the saved choice ("bet-theme") or the system. |
| `bet-css.js` | Generated. `window.BetCSS` (tokens + components as a string) and `BetFontFaces(base)`, for UI injected into other sites. |
| `icons/glyph/*.svg`, `icons/tile/*.svg`, `mascot/**/*.svg` | The pixel art as files. |
| `components/*/README.md`, `example.html` | Guidelines and the reference markup for each component. |
| `gallery.html` | Generated. Every component on one page, light and dark. Open it in a browser to compare. |

Load order is always: fonts, `tokens.css`, `bet.css`, then `icons/icons.js`, then `bet.js`.

## A page you host (the website, a new web app)

```html
<script src="design-system/bet-theme-head.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap">
<link rel="stylesheet" href="design-system/tokens.css">
<link rel="stylesheet" href="design-system/bet.css">
<script src="design-system/icons/icons.js"></script>
<script src="design-system/bet.js" data-bet-init></script>
...
<body class="bet-base bet-page">
```

`data-bet-init` wires everything on the page once the DOM is ready. Load Lenis 1.1.18 before `bet.js` (only on fine pointers) for smooth scrolling. For multi-page sites, keep the top bar in the same place on every page: the CSS fades the new page in over the old one.

## A claude.ai artifact page (the Apply Desk dashboard and start page)

Artifacts may load stylesheets only from Google Fonts and scripts only from a few CDNs, so the system goes **inside** the page:

- Link the two fonts from Google Fonts (above). Don't ship the font files.
- Paste `tokens.css` and then `bet.css` into the page's `<style>`, between marker comments (`/* bet design system: tokens.css */` ... `/* end */`) so they can be replaced wholesale when the system changes. Or paste only the components the page uses, unchanged. Keep the page's own rules after the last `/* end */`, never inside a marked block, or the next splice drops them. Replace a block with a script that finds the markers and asserts each one appears once; several people (and sessions) edit these pages at once, so never restore a page from an older copy.
- Paste `icons/icons.js` and `bet.js` at the start of the page's script, or copy the few pieces you need (`Bet.icon`, `Bet.mascot`, `Bet.lens`, `Bet.pixels`).
- Do **not** run `bet-theme-head.js` or `Bet.theme.init()`: the claude.ai host sets `data-theme` on the page itself. The token blocks already follow it.
- Keep the page's own constraints (it may be a fragment without `<html>`, it may be built into another file by a script).

## Chrome extension pages (popup, options)

MV3 forbids inline scripts, so every script is a file:

- Copy the design system into the extension (for example `autofill/design-system/`: `fonts/`, `fonts.css`, `tokens.css`, `bet.css`, `icons/icons.js`, `bet.js`, `bet-theme-head.js`).
- In the page: `<script src="design-system/bet-theme-head.js"></script>`, the three stylesheets, then `icons.js` and `bet.js`, and call `Bet.init(document)` from your own script file (or use `data-bet-init`).
- Use `fonts.css` (local files): extension pages should work offline and need no Google request.
- The popup is narrow (about 300 to 360px): use the product scale (`app-*` styles, `.bet-btn` at default size, `.bet-input-sm`), one main dark button, and the octopus at 32px in the header.

## UI injected into other sites (content scripts)

The floating Bet box, the "Fill out with Bet" button and any dialog on a job site:

- Keep each piece in an **open shadow root** on a host element with `all: initial` and the maximum z-index, as today.
- Put the styles in the shadow root from `bet-css.js` (list it in the manifest's content scripts before your own script): `shadow.innerHTML = '<style>' + BetCSS + '</style><div class="bet-base">…</div>'`. No file fetches, nothing exposed to the site.
- Build markup with `Bet.icon('check')` and `Bet.mascot({ cls: 'bet-32' })` (include `icons/icons.js` and `bet.js` as content scripts too), then call `Bet.init(wrapper)` with the `.bet-base` wrapper inside the shadow root.
- Theme: leave `data-theme` off the host and it follows the person's system setting; or set it on the host to match the Bet profile.
- **Fonts:** Chrome ignores `@font-face` inside a shadow root, so fonts have to be declared on the site's document. Two choices:
  1. Recommended for the exact look: list `design-system/fonts/*.woff2` under `web_accessible_resources` with `"use_dynamic_url": true` (the URL changes every session, so a site can't probe for the extension by a fixed address), and add one `<style>` to the document with `BetFontFaces(chrome.runtime.getURL('design-system/fonts/'))`. Sites can still see that the fonts were declared.
  2. Most private: skip the fonts. The stacks fall back to Roboto, Helvetica Neue and Arial, which keeps sizes and weights but not the faces.
- Marks on the site's own fields (highlight sweeps, flashes) can't use tokens; use the literal light values and keep them subtle.

## Restyling an existing app without renaming anything

An app that already has its own class names, ids and tests (Apply Desk) keeps them. Restyle in place:

1. Load the tokens (`tokens.css`). Point the app's existing custom properties at Bet's (`--surface-1: var(--bg)`, `--outline: var(--field-line)` and so on), then remove the old values.
2. For each existing component, copy the matching recipe's values from `bet.css` onto the app's own selectors: the button recipe onto `.btn`, the chip recipe onto `.chip`, the glass top bar and lens onto the tab bar. Or add the `bet-` class beside the old one where markup is generated in one place.
3. Replace every icon with a pixel glyph or tile from `icons/`. If one is missing, draw it in the same grammar and add it to `icons/glyph/` here, so every product gets it.
4. Replace every copy of the octopus with `mascot/bet.svg` (or `Bet.mascot()`), so there is one octopus.
5. Keep anything other code or tests read: ids, class names used by scripts, button ids, visible strings that tests assert on.
6. Compare against `gallery.html` in both themes and at phone width.

## Dropdowns

`bet.css` turns every `<select>` into the glass menu when it opens (see Menu). For long choices to end in "...", each page adds a `<button data-fit><selectedcontent></selectedcontent></button>` as the select's first child (only where `CSS.supports("appearance", "base-select")`), and re-makes it when the options' text changes. Read a select's choice with `selectedOptions`.

## Changing the system

1. Edit `tokens.json`, `bet.css`, `bet.js`, an icon SVG, or a component's `README.md` / `example.html`.
2. Run `python3 tools/build.py` and open `gallery.html`.
3. Republish the Design System artifact (`python3 tools/build.py --artifact <folder>` builds its file tree) and copy the changed files into each product.
