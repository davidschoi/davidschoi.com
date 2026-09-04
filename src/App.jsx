import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Resume from './routes/Resume.jsx';
import NotFound from './routes/NotFound.jsx';

const TITLES = {
  '/': 'David S Choi',
  '/resume': 'Resume — David S Choi',
};

// Client-side navigation keeps the scroll position and never updates the
// document title, so do both by hand.
function usePageChrome() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] ?? 'Not found — David S Choi';
  }, [pathname]);
}

export default function App() {
  usePageChrome();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
