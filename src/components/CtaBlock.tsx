import { Link } from '@/i18n/navigation';

interface CtaCTA {
  href: string;
  label: string;
  variant: 'primary' | 'ghost';
}

interface CtaBlockProps {
  eyebrow: string;
  title: string;
  body: string;
  ctas: CtaCTA[];
  topWaveFill?: string;
}

export default function CtaBlock({ eyebrow, title, body, ctas, topWaveFill }: CtaBlockProps) {
  return (
    <section className="cta-block">
      <div className="cta-block__deco cta-block__deco--top" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: 80 }}>
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z" fill={topWaveFill || '#F5F2EC'} />
        </svg>
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <span className="cta-block__eyebrow">{eyebrow}</span>
          <h2 className="cta-block__title">{title}</h2>
          <p className="cta-block__body">{body}</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => {
              const isExternal = /^(https?:|mailto:|tel:)/.test(cta.href);
              const className = `btn btn--${cta.variant} btn--lg`;
              return isExternal ? (
                <a key={i} href={cta.href} className={className} target={cta.href.startsWith('http') ? '_blank' : undefined} rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {cta.label}
                </a>
              ) : (
                <Link key={i} href={cta.href as '/'} className={className}>
                  {cta.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="cta-block__deco" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: 80 }}>
          <path d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,80 L0,80 Z" fill="#1B3A52" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
