import { Link } from 'react-router-dom';
import { name } from '../data/site.js';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="sheet" id="main">
      <div className="sheet__inner notfound">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">Nothing here</h1>
        <p className="notfound__body">
          That page doesn't exist. It may never have.
        </p>
        <nav className="notfound__links" aria-label="Elsewhere">
          <Link className="notfound__home" to="/">
            ← {name}
          </Link>
          <a className="link" href="/archive/">
            The 2016 site
          </a>
        </nav>
      </div>
    </main>
  );
}
