// Keep public/davidschoi-resume.pdf in step with this.

export const summary =
  "I build consumer and B2B web products and stay in the code: tech plan, system design, and ownership through to production monitoring. Accessibility by default, AI-assisted throughout.";

export type Job = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Education = {
  school: string;
  detail: string;
};

export const experience: Job[] = [
  {
    company: 'Wander',
    role: 'Staff Product Engineer',
    start: 'Sep 2025',
    end: 'present',
    location: 'Remote',
    bullets: [
      'Led the full redesign of the consumer marketplace — home, search, property pages, mobile checkout — on a new design system; drove an 8% lift in property-to-checkout conversion, roughly $2.3M/year in incremental GBV.',
      'Own Discounts end to end: Prisma schema, Fastify APIs, operator dashboard, and guest checkout across a Next.js site and a multi-tenant Astro platform, including per-line-item allocation for stacked coupons.',
      'Built the host Listings editor (backend APIs plus React dashboard) enabling self-serve property edits, and launched a direct-booking channel generating ~$100K/month by bypassing Airbnb and Vrbo commissions.',
      'Rolled out property-specific cancellation policies and house rules across web, mobile, and partner sites.',
      'Contributed reusable booking-flow primitives to the shared design system, and a CI pipeline that surfaces bundle-size and Lighthouse deltas on every PR.',
    ],
  },
  {
    company: 'Nextdoor',
    role: 'Senior Software Engineer · Ad Formats & Foundations',
    start: 'Jul 2024',
    end: 'Aug 2025',
    location: 'Remote',
    bullets: [
      "Migrated all US ad formats off Google Ad Manager onto Nextdoor's own platform, retaining $2M/year in ad revenue and removing a deprecated dependency.",
      'Refactored the highest-traffic ad slot rendering pipeline: ~30% faster time-to-render and better above-the-fold viewability, projected at $200K+/year incremental revenue.',
      'Designed a unified ad formats architecture, consolidating every format into a shared library adopted across the monolith and Ad Manager.',
      'Integrated an LLM to pre-fill ad descriptions and image metadata, cutting manual entry time ~40%; built a Cloudinary-AI smart-cropping tool that won the peer-voted company hackathon.',
      'Shipped the Carousel format, multiple-choice lead-gen fields, and multi-aspect-ratio support; owned Cypress E2E and Storybook visual regression for every web ad format.',
    ],
  },
  {
    company: 'Yahoo',
    role: 'Senior Software Engineer · Fantasy Sports',
    start: 'May 2023',
    end: 'Jun 2024',
    location: 'Remote',
    bullets: [
      'Led the React Player Card initiative on a high-traffic fantasy surface, integrating the Sports Design System with internal player-stats APIs.',
      'Modernized Fantasy Football Draft and Matchup Recap, embedding LLM-generated content and migrating the UI from a PHP monolith to React.',
      'Designed an internal moderation framework to validate LLM output for quality and compliance, enabling safe AI rollout at scale.',
      'Architected Google Ad Manager integration across PHP and React repos, lifting ad viewability 12% across tens of millions of monthly pageviews.',
    ],
  },
  {
    company: 'Lyft',
    role: 'Senior Software Engineer · Memberships',
    start: 'Oct 2021',
    end: 'Apr 2023',
    location: 'Remote',
    bullets: [
      'Tech lead for Lyft Pink: owned the consumer web sales flow, checkout, and internal tooling end to end, including mobile webviews embedded in the native iOS and Android apps for millions of riders.',
      'Rebuilt the membership flow into a reusable subscription platform powering internal teams (Transit, Bikes & Scooters) and partners including Chase, CitiBike, GrubHub, Delta, and Amazon.',
      'Migrated the CX & Trust tool to current infrastructure and consolidated membership data, cutting support handling time 40% and cancellations 15%.',
      "Moved web services to Lyft's in-house Node architecture, lifting SEO, performance, and a11y Lighthouse scores from ~60 to 95+.",
      'Conducted 100+ technical interviews and led interview improvement groups on accessible interviewing and grading criteria.',
    ],
  },
  {
    company: 'Twitch',
    role: 'Front End Engineer II (L5) · Creator',
    start: 'Mar 2018',
    end: 'Sep 2021',
    location: 'Irvine, CA',
    bullets: [
      'Led the architecture migration of the Creator Experience platform from .NET/jQuery to Go/React, with a full redesign aligned to the internal design system.',
      'Led the Creator Dashboard analytics suite — Stream Summary, Achievements, Discovery, Engagement, Earnings — and abstracted a reusable graphing component adopted across applications.',
      'Sole frontend engineer across five applications, four of them built from zero to production.',
      'Introduced TypeScript and Jest/Enzyme, enabling CI with 99.9% uptime; implemented an Apollo Client wrapper for state, queries, and JWT auth.',
    ],
  },
  {
    company: 'Solver',
    role: 'Developer',
    start: 'Sep 2016',
    end: 'Feb 2018',
    location: 'Los Angeles',
    bullets: [
      'Led a page-by-page migration from AngularJS to Angular 5 with a zero-downtime deprecation strategy.',
      'Cut initial bundle size from 20MB to 2.5MB and time-to-interactive from 17s to 5s via lazy loading, AoT compilation, and tree shaking.',
    ],
  },
  {
    company: 'Switchfly',
    role: 'Web Developer',
    start: 'Sep 2012',
    end: 'Aug 2016',
    location: 'San Francisco',
    bullets: [
      'Built a reusable component architecture that reduced client branding from 80 hours to 2, enabling rapid sales demos for JetBlue, Southwest, United, American Express, and Mastercard.',
      'Automated 200+ test cases via a Fluent interface on Selenium/Jenkins, cutting QA regression time from 60+ hours to ~30 minutes.',
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    label: 'Languages & frameworks',
    items: [
      'TypeScript',
      'JavaScript',
      'React',
      'React Native',
      'Next.js',
      'Astro',
      'Vite',
      'Tailwind',
      'Vanilla Extract',
      'Storybook',
      'Design Systems',
      'Accessibility',
      'Node.js',
      'Fastify',
      'GraphQL',
      'Prisma',
      'PostgreSQL',
    ],
  },
  {
    label: 'Infrastructure & tooling',
    items: [
      'Vercel',
      'Cloudflare Workers',
      'AWS',
      'CI/CD',
      'Vitest',
      'Jest',
      'Cypress',
      'Claude Code',
      'Cursor',
      'MCP',
    ],
  },
];

export const education: Education = {
  school: 'University of California, Berkeley',
  detail: 'B.A. Sociology · 2011',
};

export const interests =
  'Basketball, puzzles, nature, the Los Angeles Lakers, and the Señor Sisig California spicy pork burrito with egg.';
