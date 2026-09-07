import { defineConfig } from 'vitest/config';

// The suite reads the built HTML out of dist/ and parses it with jsdom by
// hand, so it needs no DOM environment of its own. `npm test` builds first.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
