# davidschoi.com

My portfolio. Astro + TypeScript, deployed on Vercel at [www.davidschoi.com](https://www.davidschoi.com/). Every page is static HTML — no client-side JavaScript ships beyond Vercel's analytics tags.

Built from a Claude Design canvas (`David Choi Site.dc.html`) — the home page, its 390px treatment, and the resume page.

## Develop

```bash
npm install
npm run dev      # dev server
npm run check    # astro check (typecheck)
npm test         # builds, then asserts against dist/
npm run build    # -> dist/
npm run preview  # serve dist/ locally
```

## Layout

```
src/pages/            index, resume, 404 — file-based routing
src/layouts/          Base.astro — the <head>, skip link, analytics
src/components/       Footer (shared by every page), Timeline, Job, CompanyLink
src/styles/           global.css plus one file per page
src/data/             site.ts, timeline.ts, resume.ts — all copy lives here
public/               favicons, resume PDF, archive/
tests/                assertions against the built HTML in dist/
```

Components are `.astro`: an HTML template over a TypeScript frontmatter block that runs once, at build time. Nothing above the `---` reaches the browser, which is why `src/data/` is consumed into HTML rather than shipped.

Copy is data, not markup. To change a job, a date, or a line of the timeline, edit `src/data/` — nothing in `src/pages/` should need to move.

The home timeline stays to a company and a job title per row — the resume page carries what each role actually involved, so repeating it there would just be two places to keep in sync.

## Deploying

Vercel builds every push and PR. `vercel.json` names the framework, the build command and the output directory, plus one redirect for `/archive`. Each route is a real file (`dist/index.html`, `dist/resume/index.html`, `dist/404.html`), so there is no rewrite to reason about and Vercel serves `404.html` for unmatched paths on its own. `/archive/` is served straight out of `public/`.

`.github/workflows/ci.yml` runs the typecheck, tests and a build on PRs — it does not deploy.

GitHub Pages is no longer used. The repo served `main`'s root directly until the v2 rebuild; that has to stay off, since there is no longer an `index.html` at the root to serve.

## The 2016 site

The original portfolio (Bootstrap, later de-jQueried) lives on:

- tagged **`v1-legacy`** — the last commit before the v2 rebuild
- served at **`/archive/`** — copied verbatim into `public/archive/`, no build step. Unlinked from the main pages; only the 404 page points at it.

It is frozen. Don't fix its bugs.

Link it as `/archive/`, with the trailing slash — its markup references assets relatively (`css/style.css`), so `/archive` would render it unstyled. `vercel.json` redirects the slashless form for anyone who types it.

The major version tracks the design generation, not the stack: 2016 was v1, the current design is v2. A redesign is what makes it v3 — a framework change isn't.
