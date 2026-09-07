import { defineConfig } from 'astro/config';

// Static output, no integrations — every page is HTML by the time it ships.
// `site` gives the layout an origin to build canonical and og:url from.
export default defineConfig({
  site: 'https://www.davidschoi.com',
});
