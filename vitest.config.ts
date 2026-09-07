import { defineConfig } from 'vitest/config';

// Tests parse built HTML with jsdom directly, so no DOM environment is needed.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
