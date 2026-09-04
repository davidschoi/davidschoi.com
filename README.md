# davidschoi.com

My portfolio. Vite + React + React Router, deployed on Vercel at
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
index.html            app shell
src/routes/           Home, Resume, NotFound (one CSS file each)
src/components/       Footer (shared by every page), Timeline
src/data/             site.js, timeline.js, resume.js — all copy lives here
public/               favicons, resume PDF, archive/
tests/                route smoke tests
```

Copy is data, not markup. To change a job, a date, or a line of the timeline,
edit `src/data/` — nothing in `src/routes/` should need to move.

The home timeline stays to a company and a job title per row — the resume page
carries what each role actually involved, so repeating it there would just be
two places to keep in sync.

## Deploying

Vercel builds every push and PR. `vercel.json` sets the build command, the
output directory, and one rewrite that hands unmatched paths to `index.html`
so client-side routes like `/resume` resolve on a cold load. Real files win
over that rewrite, which is why `/archive/` still serves the old site.

`.github/workflows/ci.yml` runs tests and a build on PRs — it does not deploy.

GitHub Pages is no longer used. The repo served `main`'s root directly until
this rebuild; that has to be turned off, since the root is now an unbuilt Vite
shell.

## The 2016 site

The original portfolio (Bootstrap, later de-jQueried) lives on:

- tagged **`v1-legacy`** — the last commit before this rebuild
- served at **`/archive/`** — copied verbatim into `public/archive/`, no build
  step. Unlinked from the main pages; only the 404 page points at it.

It is frozen. Don't fix its bugs.
