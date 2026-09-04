import { describe, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import timeline from '../src/data/timeline.js';
import { experience } from '../src/data/resume.js';
import { location, role } from '../src/data/site.js';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('home', () => {
  test('leads with the name and the current role', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /David\s*S Choi/ })
    ).toBeTruthy();
    // Read from the data rather than hardcoded, so editing site.js doesn't
    // silently break this. Scoped to the masthead — timeline rows name roles too.
    const meta = document.querySelector('.masthead__meta');
    expect(meta.textContent).toContain(role);
    expect(meta.textContent).toContain(location);
  });

  test('renders every timeline entry, oldest first', () => {
    renderAt('/');
    const entries = screen.getByRole('list').querySelectorAll('.tl__row');
    expect(entries.length).toBe(timeline.length);
    expect(within(entries[0]).getByText('1988')).toBeTruthy();
    expect(within(entries[entries.length - 1]).getByText('2025')).toBeTruthy();
  });

  test('links to the resume route', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: /Resume/ }).getAttribute('href')).toBe(
      '/resume'
    );
  });
});

describe('resume', () => {
  test('renders every job with its bullets', () => {
    renderAt('/resume');
    for (const job of experience) {
      expect(screen.getByRole('heading', { name: job.company })).toBeTruthy();
    }
    const bulletCount = experience.reduce((n, j) => n + j.bullets.length, 0);
    expect(document.querySelectorAll('.job__bullet').length).toBe(bulletCount);
  });

  test('offers the PDF as a download', () => {
    renderAt('/resume');
    const pdf = screen.getByRole('link', { name: /Download PDF/ });
    expect(pdf.getAttribute('href')).toBe('/David-S-Choi-Resume.pdf');
    expect(pdf.hasAttribute('download')).toBe(true);
  });
});

describe('unknown routes', () => {
  test('fall through to the 404 page rather than a blank screen', () => {
    renderAt('/nope');
    expect(screen.getByRole('heading', { name: /Nothing here/ })).toBeTruthy();
  });
});

describe('footer', () => {
  test('is shared, and its primary link points the other way on each page', () => {
    const home = renderAt('/');
    expect(
      home.container.querySelector('.footer__primary').getAttribute('href')
    ).toBe('/resume');
    home.unmount();

    const resume = renderAt('/resume');
    expect(
      resume.container.querySelector('.footer__primary').getAttribute('href')
    ).toBe('/');
  });

  test('opens GitHub, LinkedIn and Email in a new tab, safely', () => {
    renderAt('/');
    for (const name of ['GitHub', 'LinkedIn', 'Email']) {
      const a = screen.getByRole('link', { name });
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
    }
    expect(screen.getByRole('link', { name: 'GitHub' }).getAttribute('href')).toBe(
      'https://github.com/davidschoi'
    );
  });
});
