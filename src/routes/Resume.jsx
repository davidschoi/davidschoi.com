import { Link } from 'react-router-dom';
import {
  education,
  experience,
  interests,
  skills,
  summary,
} from '../data/resume.js';
import { email, github, linkedin, name, resumePdf } from '../data/site.js';
import './Resume.css';

function Job({ job }) {
  return (
    <article className="job">
      {/* Stacked on desktop, one line on mobile — the em dash between the
          dates comes from CSS so it can adapt to either. */}
      <div className="job__when">
        <span className="job__start">{job.start}</span>
        <span>{job.end}</span>
        <span className="job__where">{job.location}</span>
      </div>

      <div className="job__body">
        <div>
          <h3 className="job__company">{job.company}</h3>
          <div className="job__role">{job.role}</div>
        </div>

        <ul className="job__bullets">
          {job.bullets.map((bullet, i) => (
            <li className="job__bullet" key={i}>
              <span className="job__dash" aria-hidden="true">
                —
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Resume() {
  return (
    <main className="sheet" id="main">
      <div className="sheet__inner resume">
        <Link className="resume__back" to="/">
          ← {name}
        </Link>

        <div className="resume__head">
          <h1 className="resume__title">Resume</h1>
          <a className="resume__download" href={resumePdf} download>
            Download PDF ↓
          </a>
        </div>

        <p className="resume__summary">{summary}</p>

        <section className="resume__section">
          <h2 className="resume__label resume__label--stacked">Experience</h2>
          {experience.map((job) => (
            <Job job={job} key={job.company} />
          ))}
        </section>

        <section className="resume__section resume__row">
          <h2 className="resume__label">Skills</h2>
          <div className="resume__skills">
            {skills.map((group) => (
              <div className="skill" key={group.label}>
                <h3 className="skill__label">{group.label}</h3>
                <p className="skill__body">{group.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="resume__section resume__row resume__row--ruled">
          <h2 className="resume__label">Education</h2>
          <div>
            <div className="edu__school">{education.school}</div>
            <div className="edu__detail">{education.detail}</div>
          </div>
        </section>

        <section className="resume__section resume__row resume__row--ruled">
          <h2 className="resume__label">Interests</h2>
          <p className="resume__interests">{interests}</p>
        </section>

        <footer className="resume__footer">
          <a className="resume__email" href={`mailto:${email}`}>
            {email}
          </a>
          <span className="resume__slash" aria-hidden="true">
            /
          </span>
          <a className="link" href={linkedin}>
            LinkedIn
          </a>
          <a className="link" href={github}>
            GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}
