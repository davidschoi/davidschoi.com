import { defineConfig } from 'astro/config';

// The 2016 archive ships from public/ as hand-written markup. Static hosts and
// `astro preview` resolve /archive/ to its index.html themselves, but the dev
// server does no directory-index lookup inside public/, so the 404 page's one
// link to the archive would 404 in dev only. Dev-only shim; the build output is
// untouched, and /archive/index.html keeps working everywhere regardless.
const archiveDirectoryIndex = {
  name: 'archive-directory-index',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/archive' || req.url === '/archive/') {
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
