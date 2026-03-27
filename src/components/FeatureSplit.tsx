import { Link } from '@/i18n/navigation';

interface FeatureSplitProps {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  reversed?: boolean;
  useImgTag?: boolean;
}

export default function FeatureSplit({
  eyebrow,
  title,
  body,
  bullets,
  ctaText,
  ctaHref,
  imageUrl,
  imageAlt,
  reversed = false,
  useImgTag = false,
}: FeatureSplitProps) {
  return (
    <div className={`feature-split${reversed ? ' feature-split--reverse' : ''}`}>
      {!reversed && (
        <div className="feature-split__image reveal reveal--left">
          {useImgTag ? (
            <img src={imageUrl} alt={imageAlt} className="feature-split__img" loading="lazy" />
          ) : (
            <div
              className="feature-split__image-placeholder"
              role="img"
              aria-label={imageAlt}
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
        </div>
      )}
      <div className={`feature-split__text reveal reveal--${reversed ? 'left' : 'right'}`}>
        <p className="feature-split__eyebrow">{eyebrow}</p>
        <h2 className="feature-split__title">{title}</h2>
        <p className="feature-split__body">{body}</p>
        <ul className="feature-split__bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <Link href={ctaHref as '/'} className="feature-split__cta">
          {ctaText}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
      {reversed && (
        <div className="feature-split__image reveal reveal--right">
          <div
            className="feature-split__image-placeholder"
            role="img"
            aria-label={imageAlt}
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      )}
    </div>
  );
}
