import { vi } from 'vitest';

// jsdom has no layout, so scrollTo throws "Not implemented" noise on every
// route change. The app only needs the call to be harmless.
window.scrollTo = vi.fn();
