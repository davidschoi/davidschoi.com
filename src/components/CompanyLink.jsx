import { companyUrls } from '../data/site.js';

// A company name links to its home page only if site.js has a URL for it, so
// adding or dropping a link is a data change rather than a markup change.
export default function CompanyLink({ name }) {
  const url = companyUrls[name];

  if (!url) return name;

  return (
    <a
      className="link-quiet"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
}
