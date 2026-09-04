# davidschoi.com

My portfolio. Vite + React + React Router, deployed to GitHub Pages at
[www.davidschoi.com](https://www.davidschoi.com/).

Built from a Claude Design canvas (`David Choi Site.dc.html`) — the home page,
its 390px treatment, and the resume page.

## Develop

```bash
npm install
npm run dev      # dev server
npm test         # vitest
npm run build    # -> dist/
npm run preview  # serve dist/ locally
```

## Layout

```
index.html            app shell; also restores deep links bounced by 404.html
src/routes/           Home, Resume, NotFound (one CSS file each)
src/components/       Timeline
src/data/             site.js, timeline.jsx, resume.js — all copy lives here
public/               CNAME, favicons, resume PDF, 404.html, archive/
tests/                route smoke tests
```

Copy is data, not markup. To change a job, a date, or a line of the timeline,
edit `src/data/` — nothing in `src/routes/` should need to move.

The timeline carries two phrasings for some rows: `detail` and the terser
`detailShort`, which CSS swaps in below 640px. That mirrors the two artboards
in the design rather than reflowing one set of copy.

## Deploying

Pushes to `master` build and deploy via `.github/workflows/static.yml`.

**This requires Settings → Pages → Source set to "GitHub Actions."** The repo
previously served the branch root directly; while that setting says "Deploy
from a branch," the deploy step will fail.

GitHub Pages has no SPA fallback, so `public/404.html` rewrites unknown paths
into `/?/<path>` and an inline script in `index.html` restores them before
React Router mounts. Deep links like `/resume` work because of that pair — if
you change one, change the other.

## The 2016 site

The original portfolio (Bootstrap, later de-jQueried) lives on:

- tagged **`v1-legacy`** — the last commit before this rebuild
- served at **`/archive/`** — copied verbatim into `public/archive/`, no build
  step, linked from the footer

It is frozen. Don't fix its bugs.
