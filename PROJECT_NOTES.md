# TBA Coding Club website — project notes

Read this first in every new chat. It saves explaining the project again.

## What this is
- A static website (HTML, CSS, JavaScript only) for the Coding Club at vard Academy (TBA).
- Hosted on GitHub Pages, so there is **no server code**.
- Students are in **Years 7-9 (ages 11-13)**. All student-facing text must use simple words.
- The club teaches **Python and Pygame**. The site itself is written in JavaScript.

## Rules for every change
1. British English spelling (colour, centre, randomise). Code keeps `color` where Pygame needs it.
2. Simple words for ages 11-13.
3. **No libraries or files loaded from the internet.** Everything is in this folder.
4. **Safeguarding:** students appear by **initials only** (for example "Made by KB"). Only the teacher's own games say "Made by Mr Boswell". No photos, no full names.
5. Give the whole updated file(s), not just the changed lines.

## Folder map
```
index.html            the page (all the HTML)
css/
  themes.css          colours: light/dark and 10 colour themes
  base.css            page reset and body
  a11y.css            accessibility modes (large text, high contrast...)
  header.css          top bar, logo, theme and accessibility menus
  layout.css          page container, views, Learn page, footer
  components.css      shared boxes, buttons, code blocks, canvases, D-pad
  home.css            home page and tool cards
  tools.css           the tool workspace
  games.css           Game Lab
  showcase.css        Your Games page
  responsive.css      small-screen rules (loaded last)
js/                   (loaded in this order — see the <script> lines in index.html)
  core/utils.js       saved settings, copy helpers, cached canvas colour
  core/theme.js       light/dark + colour themes (saved in the browser)
  core/a11y.js        accessibility settings (saved in the browser)
  core/router.js      moving between pages, tool filter buttons
  tools/              one file per tool + registry.js (names, titles)
  games/              one file per Game Lab game, lab.js (shared logic)
  games/data/         Python text for each game (full-scripts.js, live-snippets.js)
  home/mini-previews.js   the little animated previews on the home page
  showcase/           Your Games: showcase.js (shared), neonjump.js
  core/input.js       keyboard handling
  core/main-loop.js   the animation loop (runs every frame)
  main.js             start-up (runs last)
```

## How the page works (short version)
- `index.html` holds every page as a `<section id="view-...">`. `navigateTo()` shows one and hides the rest.
- Files share global variables, so **the order of the `<script>` lines matters**. New files go before `core/input.js`.
- `main-loop.js` calls the step function for whatever is on screen.

## Status
- [x] Split into folders and files
- [x] Logo `>>> TBA_`, favicon, tool search removed, wrong E-button key fixed
- [x] British spellings in visible text, Learn page text
- [x] Theme and accessibility choices saved; respects the computer's "reduce motion"
- [x] Home animations use a saved canvas colour; keyboard keys no longer block typing/buttons
- [ ] See the checklist in the chat for what is still to do
- Paused until the teacher is ready: **5 new Game Lab game ideas and 5 new tool ideas**
- Longer term: embed Pygame games in the browser (must work with no internet-loaded files)
- Learn page is empty on purpose; lessons will be planned together later

## Putting it on GitHub Pages
1. Upload the **whole folder** (not just index.html) to the repository.
2. Repository Settings → Pages → choose the branch and the root folder.
3. Open the Pages address the site gives you.
