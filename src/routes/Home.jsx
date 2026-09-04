import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Timeline from '../components/Timeline.jsx';
import timeline from '../data/timeline.js';
import portrait from '../assets/david-illustration.png';
import { colophon, company, lede, location, role } from '../data/site.js';
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

        <Footer primary={{ to: '/resume', label: 'Resume →' }} />

      </div>
    </main>
  );
}
