import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, test } from 'vitest';
import timeline from '../src/data/timeline';
import { experience } from '../src/data/resume';
import { github, location, role } from '../src/data/site';

// `npm test` builds first, so these assert the bytes that actually ship.
function page(file: string): Document {
  return new JSDOM(readFileSync(`dist/${file}`, 'utf8')).window.document;
}

const home = page('index.html');
const resume = page('resume/index.html');
const notFound = page('404.html');

describe('home', () => {
  test('leads with the name and the current role', () => {
    expect(home.querySelector('h1')?.textContent).toMatch(/David\s*S Choi/);
    // Scoped to the masthead — the timeline rows name roles too.
    const meta = home.querySelector('.masthead__meta');
    expect(meta?.textContent).toContain(role);
    expect(meta?.textContent).toContain(location);
  });

  test('renders every timeline entry, oldest first', () => {
    const rows = [...home.querySelectorAll('.tl__row')];
    expect(rows.length).toBe(timeline.length);
    expect(rows[0]?.querySelector('.tl__year')?.textContent).toBe('1988');
    expect(rows.at(-1)?.querySelector('.tl__year')?.textContent).toBe('2025');
  });

  test('links companies that have a URL and leaves the rest as text', () => {
    const titles = [...home.querySelectorAll('.tl__title')];
    const berkeley = titles.find((n) => n.textContent?.trim() === 'UC Berkeley');
    expect(berkeley?.querySelector('a')).toBeNull();

    const twitch = titles.find((n) => n.textContent?.trim() === 'Twitch');
    expect(twitch?.querySelector('a')?.getAttribute('href')).toBe('https://twitch.tv');
  });
});

describe('resume', () => {
  test('renders every job with its bullets', () => {
    const companies = [...resume.querySelectorAll('.job__company')].map((n) =>
      n.textContent?.trim()
    );
    for (const job of experience) {
      expect(companies).toContain(job.company);
    }
    const bulletCount = experience.reduce((n, j) => n + j.bullets.length, 0);
    expect(resume.querySelectorAll('.job__bullet').length).toBe(bulletCount);
  });

  test('offers the PDF as a download', () => {
    const pdf = resume.querySelector('.resume__download');
    expect(pdf?.getAttribute('href')).toBe('/David-S-Choi-Resume.pdf');
    expect(pdf?.hasAttribute('download')).toBe(true);
  });
});

describe('unknown routes', () => {
  test('get a 404 page rather than a blank screen', () => {
    expect(notFound.querySelector('h1')?.textContent).toMatch(/Nothing here/);
  });

  test('link the archive with a trailing slash', () => {
    const archive = [...notFound.querySelectorAll('a')].find((a) =>
      a.getAttribute('href')?.includes('archive')
    );
    // Relative asset paths in the 2016 markup break without the slash.
    expect(archive?.getAttribute('href')).toBe('/archive/');
  });
});

describe('footer', () => {
  test('is shared, and its primary link points the other way on each page', () => {
    expect(home.querySelector('.footer__primary')?.getAttribute('href')).toBe('/resume');
    expect(resume.querySelector('.footer__primary')?.getAttribute('href')).toBe('/');
  });

  test('opens GitHub, LinkedIn and Email in a new tab, safely', () => {
    const links = [...home.querySelectorAll('.footer__externals .link')];
    expect(links.map((a) => a.textContent?.trim())).toEqual([
      'GitHub',
      'LinkedIn',
      'Email',
    ]);
    for (const a of links) {
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
    }
    expect(links[0]?.getAttribute('href')).toBe(github);
  });
});

describe('static output', () => {
  test('each page carries its own title and og:url', () => {
    expect(home.title).toBe('David S Choi');
    expect(resume.title).toBe('Resume — David S Choi');

    const ogUrl = (doc: Document) =>
      doc.querySelector('meta[property="og:url"]')?.getAttribute('content');
    expect(ogUrl(home)).toBe('https://www.davidschoi.com/');
    expect(ogUrl(resume)).toBe('https://www.davidschoi.com/resume');
  });

  test('ships no framework JavaScript bundle', () => {
    for (const doc of [home, resume, notFound]) {
      const bundled = [...doc.querySelectorAll('script[src]')]
        .map((s) => s.getAttribute('src') ?? '')
        .filter((src) => src.includes('/_astro/'));
      expect(bundled).toEqual([]);
    }
  });

  test('renders content into the HTML rather than an empty root', () => {
    expect(home.querySelectorAll('.tl__row').length).toBeGreaterThan(0);
    expect(home.querySelector('#root')).toBeNull();
  });
});
