import { Link } from 'react-router-dom';
import Timeline from '../components/Timeline.jsx';
import timeline from '../data/timeline.jsx';
import portrait from '../assets/david-illustration.png';
import {
  colophon,
  company,
  email,
  github,
  lede,
  linkedin,
  location,
  role,
} from '../data/site.js';
import './Home.css';

export default function Home() {
  return (
    <main className="sheet" id="main">
      <div className="sheet__inner home">
        <header className="masthead">
          <h1 className="masthead__name">
            David
            <br className="masthead__break" /> S Choi
          </h1>

          <img
            className="masthead__portrait"
            src={portrait}
            alt="Illustrated portrait of David Choi"
            width="700"
            height="800"
          />

          <div className="masthead__intro">
            {/* Three stacked lines on desktop; the last two share a line at
                390px, exactly as the mobile artboard has it. */}
            <p className="masthead__meta">
              {role}
              <br />
              {company}
              <br className="wide-only" />
              <span className="narrow-only"> · </span>
              {location}
            </p>
            <p className="masthead__lede">{lede}</p>
          </div>
        </header>

        <Timeline items={timeline} />

        <p className="home__colophon">{colophon}</p>

        <nav className="home__links" aria-label="Elsewhere">
          <Link className="home__resume" to="/resume">
            Resume →
          </Link>
          <span className="home__slash" aria-hidden="true">
            /
          </span>
          <span className="home__externals">
            <a className="link" href={github}>
              GitHub
            </a>
            <a className="link" href={linkedin}>
              LinkedIn
            </a>
            <a className="link" href={`mailto:${email}`}>
              Email
            </a>
          </span>
        </nav>

        <p className="home__archive">
          This site, 2026. The{' '}
          <a className="link" href="/archive/">
            2016 version
          </a>{' '}
          is still standing.
        </p>
      </div>
    </main>
  );
}
