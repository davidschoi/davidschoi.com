# davidschoi.com

Personal site for David S Choi — Senior Software Engineer.

Built as a single static page with semantic HTML, modern CSS (custom
properties, `clamp()` typography, dark-first with `prefers-color-scheme`
light support), and a small amount of vanilla JavaScript. No frameworks, no
build step — GitHub Pages serves the files as-is.

## Why no framework / no Tailwind?

This is one page. A build pipeline (React, Next, Gatsby, or even a Tailwind
CLI step) would mean adding Node tooling, GitHub Actions changes, and a
generated `dist/` folder for ~6KB of CSS that fits comfortably in a single
hand-written file. Reassess if this grows into multiple pages or a blog.

## Local preview

```bash
npm start         # python3 -m http.server 4000
# then open http://localhost:4000
```

## Tests

```bash
npm install
npm test
```

The test suite covers:

- `getExperienceMessage` year math
- presence of the main page sections by id
- skill cards rendering into `#skillsContainer`

## Deploy

Pushes to `master` deploy to GitHub Pages via `.github/workflows/static.yml`.
