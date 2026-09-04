import './Timeline.css';

// Renders the long form on wide screens and the terse form on narrow ones.
// Both are in the DOM; CSS picks. Only one is ever visible to a screen reader
// because the other is display:none.
function Detail({ detail, detailShort }) {
  if (!detail) return null;
  if (!detailShort) return <div className="tl__detail">{detail}</div>;

  return (
    <div className="tl__detail">
      <span className="wide-only">{detail}</span>
      <span className="narrow-only">{detailShort}</span>
    </div>
  );
}

export default function Timeline({ items }) {
  return (
    <ol className="tl">
      {items.map((item, i) => (
        <li className="tl__row" key={`${item.year}-${item.title}-${i}`}>
          <span className="tl__year">{item.year}</span>
          <span className={`tl__dot tl__dot--${item.kind}`} aria-hidden="true" />
          <div>
            <div className={`tl__title tl__title--${item.kind}`}>
              {item.title}
            </div>
            <Detail detail={item.detail} detailShort={item.detailShort} />
          </div>
        </li>
      ))}
    </ol>
  );
}
