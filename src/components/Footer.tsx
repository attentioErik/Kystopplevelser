import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__col">
          <Link href="/" className="footer__logo">Kystopplevelser</Link>
          <p className="footer__tagline">{t('tagline')}</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram" className="footer__social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="footer__social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">{t('services')}</h3>
          <nav aria-label={t('services')}>
            <Link href="/rib-tur-bergen" className="footer__link">{t('rib')}</Link>
            <Link href="/baatutleie-bergen" className="footer__link">{t('boat')}</Link>
            <Link href="/sauna-badstue-bergen" className="footer__link">{t('sauna')}</Link>
            <Link href="/om-oss" className="footer__link">{t('aboutLink')}</Link>
            <Link href="/bestilling" className="footer__link">{t('bookingLink')}</Link>
          </nav>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">{t('contact')}</h3>
          <a href="tel:+4793624642" className="footer__link">+47 936 24 642</a>
          <a href="mailto:post@kyst-opplevelser.no" className="footer__link">post@kyst-opplevelser.no</a>
          <address className="footer__address">Bryggen 12, 5003 Bergen</address>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span>&copy; 2025 Kystopplevelser AS</span>
          <div className="footer__legal">
            <Link href="/personvern">{t('privacy')}</Link>
            <Link href="/personvern">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
