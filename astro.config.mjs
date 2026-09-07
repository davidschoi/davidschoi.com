import { defineConfig } from 'astro/config';

// The archive's asset paths are relative, so they break without the trailing
// slash. Dev needs the second branch; static hosts resolve it themselves.
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
