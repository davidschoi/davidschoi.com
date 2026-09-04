import { Link } from 'react-router-dom';
import { email, github, linkedin } from '../data/site.js';
import './Footer.css';

// Shared by every page. `primary` is the one route-level link that changes:
// the home page points at the resume, the resume points back.
export default function Footer({ primary, ruled = false }) {
  return (
    <nav className={ruled ? 'footer footer--ruled' : 'footer'} aria-label="Elsewhere">
      <Link className="footer__primary" to={primary.to}>
        {primary.label}
      </Link>

      <span className="footer__slash" aria-hidden="true">
        /
      </span>

      <span className="footer__externals">
        <a className="link" href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="link" href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a
          className="link"
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </span>
    </nav>
  );
}
