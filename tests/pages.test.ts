import { existsSync, readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, test } from 'vitest';
import timeline from '../src/data/timeline';
import { experience, skills } from '../src/data/resume';
import { github, location, role, whoami } from '../src/data/site';

// `npm test` builds first, so these assert the bytes that actually ship.
function raw(file: string): string {
  return readFileSync(`dist/${file}`, 'utf8');
}

function page(file: string): Document {
  return new JSDOM(raw(file)).window.document;
}

const home = page('index.html');
const resume = page('resume/index.html');
const notFound = page('404.html');
const archive = page('archive/index.html');

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
  test('lists each skill group from the same array the home console reads', () => {
    const bodies = [...resume.querySelectorAll('.skill__body')].map((n) =>
      n.textContent?.trim()
    );
    expect(bodies).toEqual(skills.map((group) => group.items.join(', ')));
  });

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
    const pdf = resume.querySelector('a[download]');
    expect(pdf?.getAttribute('href')).toBe('/davidschoi-resume.pdf');
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

  test('renders the same on every page, apart from where it points', () => {
    // The pages read as one site or they don't; the footer is the seam.
    const shape = (doc: Document) => {
      const nav = doc.querySelector('.footer');
      return {
        classes: nav?.className,
        links: [...(nav?.querySelectorAll('.footer__externals .link') ?? [])].map(
          (a) => a.getAttribute('href')
        ),
        toggle: !!nav?.querySelector('.theme-toggle'),
      };
    };
    expect(shape(home)).toEqual(shape(resume));
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

  test('the 2016 archive is titled apart from the live site', () => {
    expect(archive.title).toBe('2016 archive — David S Choi');
    expect(archive.title).not.toBe(home.title);
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

describe('consoles', () => {
  const consoleOn = (doc: Document) => doc.querySelector('.console');

  test('the home page runs /whoami and the resume runs /stack', () => {
    expect(home.querySelector('.console__command')?.textContent?.trim()).toBe('/whoami');
    expect(resume.querySelector('.console__command')?.textContent?.trim()).toBe('/stack');
  });

  test('each seeds its line with entries that fit the narrowest screen', () => {
    // What a reader sees with the script blocked.
    expect(home.querySelector('.console__readout')?.textContent?.trim()).toBe(
      whoami.slice(0, 1).join(' \u00b7 ')
    );
    expect(resume.querySelector('.console__readout')?.textContent?.trim()).toBe(
      skills[0].items.slice(0, 3).join(' \u00b7 ')
    );
  });

  test('each carries every entry for a screen reader', () => {
    const listed = (doc: Document) =>
      [...(consoleOn(doc)?.querySelectorAll('.console__sr li') ?? [])].map(
        (n) => n.textContent
      );
    expect(listed(home)).toEqual(whoami);
    expect(listed(resume)).toEqual(skills.flatMap((group) => group.items));
  });

  test('keeps the group labels out of the visible line', () => {
    const shown = resume.querySelector('.console__line')?.textContent ?? '';
    for (const group of skills) {
      expect(shown).not.toContain(group.label);
    }
  });

  test('capitalises every entry, so the cycling line reads evenly', () => {
    // One lowercase entry between two proper nouns reads as a mistake.
    const entries = [...skills.flatMap((group) => group.items), ...whoami];
    expect(entries.filter((e) => e[0] !== e[0].toUpperCase())).toEqual([]);
  });

  test('/whoami sits between the lede and the timeline', () => {
    const nodes = [...home.querySelectorAll('.masthead, .console, .tl')];
    expect(nodes.map((n) => n.className.split(' ')[0])).toEqual([
      'masthead',
      'console',
      'tl',
    ]);
  });

  test('/stack sits under the summary, above Experience', () => {
    const nodes = [
      ...resume.querySelectorAll('.resume__summary, .console, .resume__section'),
    ];
    expect(nodes.slice(0, 3).map((n) => n.className.split(' ')[0])).toEqual([
      'resume__summary',
      'console',
      'resume__section',
    ]);
  });

  test('leaves the resume Skills prose in place', () => {
    expect(resume.querySelectorAll('.skill__body').length).toBe(skills.length);
  });
});

describe('theme', () => {
  test('every page offers a labelled toggle', () => {
    for (const doc of [home, resume, notFound]) {
      const btn = doc.querySelector('.theme-toggle');
      expect(btn?.tagName).toBe('BUTTON');
      expect(btn?.getAttribute('aria-label')).toMatch(/theme/i);
    }
  });

  test('restores a stored theme before the body renders', () => {
    // Below <body> it would paint light first and then flip — the flash.
    const html = raw('index.html');
    const script = html.indexOf("localStorage.getItem('theme')");
    expect(script).toBeGreaterThan(-1);
    expect(script).toBeLessThan(html.indexOf('<body'));
  });

  test('ships a dark favicon for the toggle to swap in', () => {
    expect(existsSync('dist/favicon-32-dark.png')).toBe(true);
    expect(existsSync('dist/favicon-512-dark.png')).toBe(true);
    // Markup points at the light pair; the theme script rewrites href from there,
    // so the swap is idempotent across repeated toggles.
    const icons = [...home.querySelectorAll('link[rel="icon"]')].map((l) =>
      l.getAttribute('href')
    );
    expect(icons).toEqual(['/favicon-32.png', '/favicon-512.png']);
  });

  test('ships both palettes, so neither needs a round trip', () => {
    const html = raw('index.html');
    expect(html).toContain('light-dark(#f5f2eb,#1a1712)');
    expect(html).toContain('light-dark(#1c1a16,#f0ece2)');
  });
});
