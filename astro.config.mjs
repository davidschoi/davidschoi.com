import { defineConfig } from 'astro/config';

// The 2016 archive ships from public/ as hand-written markup, and its asset
// paths are relative (`css/style.css`), so they only resolve while the browser's
// URL ends in a slash — /archive would load the page unstyled. Hence a redirect
// to /archive/ rather than an internal rewrite. Static hosts resolve /archive/
// to its index.html themselves; the dev server needs the second branch spelled
// out, since it does no directory-index lookup inside public/.
const archiveDirectoryIndex = {
  name: 'archive-directory-index',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/archive') {
          res.writeHead(307, { Location: '/archive/' });
          res.end();
          return;
        }
        if (req.url === '/archive/') {
          req.url = '/archive/index.html';
        }
        next();
      });
    },
  },
};

export default defineConfig({
  site: 'https://www.davidschoi.com',
  integrations: [archiveDirectoryIndex],
});
