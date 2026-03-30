import { Link } from '@/i18n/navigation';

interface HeroCTA {
  href: string;
  label: string;
  variant: 'primary' | 'ghost';
}

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctas: HeroCTA[];
  variant?: 'full' | 'inner';
  bgStyle?: React.CSSProperties;
  videoUrl?: string;
}

export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctas,
  variant = 'full',
  bgStyle,
  videoUrl,
}: HeroProps) {
  const isInner = variant === 'inner';

  return (
    <section className={`hero${isInner ? ' hero--inner' : ''}`} aria-label={title}>
      <div
        className="hero__bg"
        aria-hidden="true"
        style={bgStyle || { background: '#0A141D' }}
      >
        {videoUrl && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <iframe
              id="heroVideo"
              src={videoUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vw',
                height: '56.25vw',
                minHeight: '100%',
                minWidth: '177.78vh',
                transform: 'translate(-50%,-50%)',
                opacity: 0,
                transition: 'opacity .8s ease',
              }}
              title="Kystopplevelser Promo"
            />
          </div>
        )}
        {isInner && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, overflow: 'hidden', opacity: 0.1 }}>
            <svg className="hero-wave-animate" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" style={{ height: 120 }} aria-hidden="true">
              <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="#A8C5D8" />
              <path d="M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80 L1440,120 L0,120 Z" fill="#2C5F8A" opacity="0.6" />
            </svg>
          </div>
        )}
      </div>
      <div className="hero__overlay" aria-hidden="true"></div>
      <div className="hero__content container">
        <p className="hero__eyebrow reveal">{eyebrow}</p>
        <h1 className="hero__title reveal">{title}</h1>
        <p className="hero__subtitle reveal">{subtitle}</p>
        <div className="hero__ctas reveal">
          {ctas.map((cta, i) => {
            const isAnchor = cta.href.startsWith('#');
            if (isAnchor) {
              return (
                <a key={i} href={cta.href} className={`btn btn--${cta.variant} btn--lg`}>
                  {cta.label}
                </a>
              );
            }
            return (
              <Link key={i} href={cta.href as '/'} className={`btn btn--${cta.variant} btn--lg`}>
                {cta.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
