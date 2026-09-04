import './Timeline.css';

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
            {item.detail && <div className="tl__detail">{item.detail}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
