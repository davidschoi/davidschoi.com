# davidschoi.com

My portfolio. Astro + TypeScript, deployed on Vercel at [www.davidschoi.com](https://www.davidschoi.com/). Every page is static HTML; the only client-side JavaScript is two small inline scripts — the theme toggle and the consoles — plus Vercel's analytics tags.

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

```plaintext
src/pages/            index, resume, 404 — file-based routing
src/layouts/          Base.astro — the <head>, skip link, analytics
src/components/       Footer (shared by every page), Console, Timeline, Job, CompanyLink
src/styles/           global.css plus one file per page
src/data/             site.ts, timeline.ts, resume.ts — all copy lives here
public/               favicons, resume PDF, archive/
tests/                assertions against the built HTML in dist/
```

Components are `.astro`: an HTML template over a TypeScript frontmatter block that runs once, at build time. Nothing above the `---` reaches the browser, which is why `src/data/` is consumed into HTML rather than shipped.

Copy is data, not markup. To change a job, a date, or a line of the timeline, edit `src/data/` — nothing in `src/pages/` should need to move.

The home timeline stays to a company and a job title per row — the resume page carries what each role actually involved, so repeating it there would just be two places to keep in sync.

`Console.astro` types a slash command and cycles a list through the line beneath it, a set of entries at a time: `/whoami` on the home page, `/stack` on the resume. The resume's Skills section joins the same array into prose.

## Deploying

Vercel builds every push and PR. `vercel.json` names the framework, the build command and the output directory, plus one redirect for `/archive`. Each route is a real file (`dist/index.html`, `dist/resume/index.html`, `dist/404.html`), so there is no rewrite to reason about and Vercel serves `404.html` for unmatched paths on its own.

`.github/workflows/ci.yml` runs the typecheck, tests and a build on PRs — it does not deploy.

## The 2016 site

The original portfolio (Bootstrap, later de-jQueried) is tagged **`v1-legacy`** and served at **`/archive/`**, copied verbatim into `public/archive/` with no build step. Only the 404 page links to it.

It is frozen. Don't fix its bugs. Link it with the trailing slash — its assets are referenced relatively, so `/archive` renders unstyled.
