// The home-page ledger: career and life in one list, oldest first.
//
// `kind` drives the marker — 'work' gets a filled sienna square and a heavier
// title, 'life' gets a hollow one. `detailShort` is the terser phrasing from
// the 390px artboard; where it exists, CSS swaps it in on narrow screens.

const timeline = [
  {
    year: '1988',
    kind: 'life',
    title: 'Born',
    detail: 'Southern California, and never really left',
  },
  {
    year: '2011',
    kind: 'work',
    title: 'UC Berkeley',
    detail: 'B.A. Sociology. Go Bears.',
  },
  {
    year: '2012',
    kind: 'work',
    title: 'Switchfly',
    detail:
      'Web Developer — taught myself to code nights and weekends to get here, then made airline checkouts behave',
    detailShort:
      'Web Developer — taught myself to code nights and weekends to get here',
  },
  {
    year: '2016',
    kind: 'work',
    title: 'Solver',
    detail:
      'Developer — AngularJS to Angular 5, zero downtime, 20MB bundle down to 2.5MB',
    detailShort: 'Developer — AngularJS to Angular 5, 20MB bundle down to 2.5MB',
  },
  {
    year: '2017',
    kind: 'life',
    title: 'Married Jean',
    detail: 'Serra Plaza, San Juan Capistrano',
  },
  {
    year: '2018',
    kind: 'work',
    title: 'Twitch',
    detail:
      'Front End Engineer II — creator analytics, and moving a .NET/jQuery platform to Go/React',
    detailShort:
      'Front End Engineer II — creator analytics, .NET/jQuery to Go/React',
  },
  {
    year: '2021',
    kind: 'work',
    title: 'Lyft',
    detail:
      'Senior Software Engineer — tech lead for Lyft Pink, and the subscription platform behind it',
    detailShort: 'Senior Software Engineer — tech lead for Lyft Pink',
  },
  {
    year: '2022',
    kind: 'life',
    title: 'Lucy',
  },
  {
    year: '2023',
    kind: 'work',
    title: 'Yahoo',
    detail:
      'Senior Software Engineer — Fantasy Sports, PHP monolith to React at fantasy-football scale',
    detailShort: 'Senior Software Engineer — Fantasy Sports',
  },
  {
    year: '2024',
    kind: 'life',
    title: 'Colette',
    detail: (
      <>
        Her site, and her sister's, live at{' '}
        <a className="link" href="https://choifam.com">
          choifam.com
        </a>
      </>
    ),
    detailShort: (
      <>
        Their sites:{' '}
        <a className="link" href="https://choifam.com">
          choifam.com
        </a>
      </>
    ),
  },
  {
    year: '2024',
    kind: 'work',
    title: 'Nextdoor',
    detail:
      'Senior Software Engineer — Ad Formats & Foundations, off Google Ad Manager and onto our own',
    detailShort: 'Senior Software Engineer — Ad Formats & Foundations',
  },
  {
    year: '2025',
    kind: 'work',
    title: 'Wander',
    detail:
      'Staff Product Engineer — redesigned the marketplace, own Discounts and the host Listings editor',
    detailShort:
      'Staff Product Engineer — marketplace redesign, Discounts, Listings editor',
  },
];

export default timeline;
