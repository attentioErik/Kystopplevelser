import { Link } from '@/i18n/navigation';

interface ServiceHubCardProps {
  href: string;
  imageUrl: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  desc: string;
  linkText: string;
}

export default function ServiceHubCard({
  href,
  imageUrl,
  imageAlt,
  eyebrow,
  title,
  desc,
  linkText,
}: ServiceHubCardProps) {
  return (
    <Link href={href as '/'} className="service-hub-card reveal">
      <div className="service-hub-card__image">
        <div
          className="service-hub-card__image-bg"
          role="img"
          aria-label={imageAlt}
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <div className="service-hub-card__body">
        <p className="service-hub-card__eyebrow">{eyebrow}</p>
        <h3 className="service-hub-card__title">{title}</h3>
        <p className="service-hub-card__desc">{desc}</p>
        <span className="service-hub-card__link">
          {linkText}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
