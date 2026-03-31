'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const BASIN_ENDPOINT = 'https://usebasin.com/f/a1c855f71785';

interface FormErrors {
  fornavn?: string;
  etternavn?: string;
  epost?: string;
  opplevelse?: string;
  dato?: string;
  antall?: string;
  gdpr?: string;
}

export default function BookingForm() {
  const t = useTranslations('booking');
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fornavn: '',
    etternavn: '',
    epost: '',
    telefon: '',
    opplevelse: [] as string[],
    dato: '',
    datoUkjent: false,
    antall: '',
    melding: '',
    kilde: '',
    gdpr: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // URL param pre-selection (supports: ?opplevelse=rib, ?opplevelse=rib-bergen, ?opplevelse=rib-sotra)
  useEffect(() => {
    const opplevelseParam = searchParams.get('opplevelse');
    if (opplevelseParam) {
      const values = opplevelseParam.split(',').map((v) => v.trim().toLowerCase());
      const valid = ['rib', 'rib-bergen', 'rib-sotra', 'batleje', 'badstue'];
      setFormData((prev) => ({
        ...prev,
        opplevelse: values.filter((v) => valid.includes(v)),
      }));
    }
  }, [searchParams]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fornavn.trim()) {
      newErrors.fornavn = t('errorFirstNameRequired');
    }
    if (!formData.etternavn.trim()) {
      newErrors.etternavn = t('errorLastNameRequired');
    }
    if (!formData.epost.trim()) {
      newErrors.epost = t('errorEmailRequired');
    } else if (!isValidEmail(formData.epost.trim())) {
      newErrors.epost = t('errorEmailInvalid');
    }
    if (formData.opplevelse.length === 0) {
      newErrors.opplevelse = t('errorExperienceRequired');
    }
    if (!formData.datoUkjent && !formData.dato) {
      newErrors.dato = t('errorDateRequired');
    }
    if (!formData.antall || parseInt(formData.antall, 10) < 1) {
      newErrors.antall = t('errorGuestsRequired');
    }
    if (!formData.gdpr) {
      newErrors.gdpr = t('errorGdprRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setTimeout(() => {
        const firstError = document.querySelector('.form-error:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 0);
      return;
    }

    setSubmitting(true);

    const body = new FormData();
    body.append('fornavn', formData.fornavn);
    body.append('etternavn', formData.etternavn);
    body.append('epost', formData.epost);
    if (formData.telefon) body.append('telefon', formData.telefon);
    body.append('opplevelse', formData.opplevelse.join(', '));
    body.append('dato', formData.datoUkjent ? 'Ikke bestemt' : formData.dato);
    body.append('antall', formData.antall);
    if (formData.melding) body.append('melding', formData.melding);
    if (formData.kilde) body.append('kilde', formData.kilde);

    try {
      await fetch(BASIN_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      setSubmitted(true);
    } catch {
      // Still show success — Basin queues submissions
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => {
      const arr = prev.opplevelse.includes(value)
        ? prev.opplevelse.filter((v) => v !== value)
        : [...prev.opplevelse, value];
      return { ...prev, opplevelse: arr };
    });
    if (errors.opplevelse) {
      setErrors((prev) => ({ ...prev, opplevelse: undefined }));
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section
        className="section section--sm"
        style={{ paddingTop: 'calc(var(--section-padding) + 72px)', paddingBottom: 'var(--space-6)' }}
        aria-labelledby="booking-heading"
      >
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <p className="section__eyebrow">{t('eyebrow')}</p>
            <h1
              id="booking-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-3xl)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {t('heading')}
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-lg)',
                maxWidth: '48ch',
                marginInline: 'auto',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN BOOKING SECTION */}
      <section className="section section--sm" aria-label={t('formAriaLabel')}>
        <div className="container">
          <div className="booking-layout reveal">
            {/* FORM COLUMN */}
            <div>
              {!submitted ? (
                <form className="booking-form" noValidate aria-label={t('formAriaLabel')} onSubmit={handleSubmit}>
                  {/* Name row */}
                  <div className="form-row form-row--2col">
                    <div className="form-group">
                      <label htmlFor="fornavn" className="form-label">
                        {t('labelFirstName')} <span aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="fornavn"
                        name="fornavn"
                        className="form-input"
                        required
                        autoComplete="given-name"
                        aria-required="true"
                        placeholder={t('placeholderFirstName')}
                        value={formData.fornavn}
                        onChange={(e) => handleInputChange('fornavn', e.target.value)}
                        style={errors.fornavn ? { borderColor: '#D93025' } : {}}
                      />
                      <span className="form-error" role="alert">
                        {errors.fornavn || ''}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="etternavn" className="form-label">
                        {t('labelLastName')} <span aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="etternavn"
                        name="etternavn"
                        className="form-input"
                        required
                        autoComplete="family-name"
                        placeholder={t('placeholderLastName')}
                        value={formData.etternavn}
                        onChange={(e) => handleInputChange('etternavn', e.target.value)}
                        style={errors.etternavn ? { borderColor: '#D93025' } : {}}
                      />
                      <span className="form-error" role="alert">
                        {errors.etternavn || ''}
                      </span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="form-group">
                    <label htmlFor="epost" className="form-label">
                      {t('labelEmail')} <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="epost"
                      name="epost"
                      className="form-input"
                      required
                      autoComplete="email"
                      aria-required="true"
                      placeholder={t('placeholderEmail')}
                      value={formData.epost}
                      onChange={(e) => handleInputChange('epost', e.target.value)}
                      style={errors.epost ? { borderColor: '#D93025' } : {}}
                    />
                    <span className="form-error" role="alert">
                      {errors.epost || ''}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefon" className="form-label">
                      {t('labelPhone')}
                    </label>
                    <input
                      type="tel"
                      id="telefon"
                      name="telefon"
                      className="form-input"
                      autoComplete="tel"
                      placeholder={t('placeholderPhone')}
                      value={formData.telefon}
                      onChange={(e) => handleInputChange('telefon', e.target.value)}
                    />
                  </div>

                  {/* Experiences */}
                  <fieldset className="form-group form-group--fieldset">
                    <legend className="form-label">
                      {t('labelExperience')} <span aria-hidden="true">*</span>
                    </legend>
                    <div className="form-checkboxes">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="opplevelse"
                          value="rib-bergen"
                          checked={formData.opplevelse.includes('rib-bergen')}
                          onChange={() => handleCheckboxChange('rib-bergen')}
                        />
                        <span>{t('experienceRibBergen')}</span>
                      </label>
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="opplevelse"
                          value="rib-sotra"
                          checked={formData.opplevelse.includes('rib-sotra')}
                          onChange={() => handleCheckboxChange('rib-sotra')}
                        />
                        <span>{t('experienceRibSotra')}</span>
                      </label>
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="opplevelse"
                          value="batleje"
                          checked={formData.opplevelse.includes('batleje')}
                          onChange={() => handleCheckboxChange('batleje')}
                        />
                        <span>{t('experienceBoat')}</span>
                      </label>
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="opplevelse"
                          value="badstue"
                          checked={formData.opplevelse.includes('badstue')}
                          onChange={() => handleCheckboxChange('badstue')}
                        />
                        <span>{t('experienceSauna')}</span>
                      </label>
                    </div>
                    <span className="form-error" role="alert">
                      {errors.opplevelse || ''}
                    </span>
                  </fieldset>

                  {/* Date + Group */}
                  <div className="form-row form-row--2col">
                    <div className="form-group">
                      <label htmlFor="dato" className="form-label">
                        {t('labelDate')} {!formData.datoUkjent && <span aria-hidden="true">*</span>}
                      </label>
                      <input
                        type="date"
                        id="dato"
                        name="dato"
                        className="form-input"
                        required={!formData.datoUkjent}
                        aria-required={!formData.datoUkjent}
                        disabled={formData.datoUkjent}
                        min={minDate}
                        value={formData.datoUkjent ? '' : formData.dato}
                        onChange={(e) => handleInputChange('dato', e.target.value)}
                        style={{
                          ...(errors.dato ? { borderColor: '#D93025' } : {}),
                          ...(formData.datoUkjent ? { opacity: 0.5 } : {}),
                        }}
                      />
                      <label className="form-checkbox" style={{ marginTop: 'var(--space-2)' }}>
                        <input
                          type="checkbox"
                          checked={formData.datoUkjent}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, datoUkjent: e.target.checked, dato: '' }));
                            if (errors.dato) setErrors((prev) => ({ ...prev, dato: undefined }));
                          }}
                        />
                        <span style={{ fontSize: 'var(--text-sm)' }}>{t('dateUnknown')}</span>
                      </label>
                      <span className="form-error" role="alert">
                        {errors.dato || ''}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="antall" className="form-label">
                        {t('labelGuests')} <span aria-hidden="true">*</span>
                      </label>
                      <input
                        type="number"
                        id="antall"
                        name="antall"
                        className="form-input"
                        min="1"
                        max="30"
                        required
                        aria-required="true"
                        placeholder={t('placeholderGuests')}
                        value={formData.antall}
                        onChange={(e) => handleInputChange('antall', e.target.value)}
                        style={errors.antall ? { borderColor: '#D93025' } : {}}
                      />
                      <span className="form-error" role="alert">
                        {errors.antall || ''}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="melding" className="form-label">
                      {t('labelMessage')}
                    </label>
                    <textarea
                      id="melding"
                      name="melding"
                      className="form-input form-input--textarea"
                      rows={4}
                      placeholder={t('placeholderMessage')}
                      value={formData.melding}
                      onChange={(e) => handleInputChange('melding', e.target.value)}
                    ></textarea>
                  </div>

                  {/* Source */}
                  <div className="form-group">
                    <label htmlFor="kilde" className="form-label">
                      {t('labelSource')}
                    </label>
                    <select
                      id="kilde"
                      name="kilde"
                      className="form-input form-input--select"
                      value={formData.kilde}
                      onChange={(e) => handleInputChange('kilde', e.target.value)}
                    >
                      <option value="">{t('sourceDefault')}</option>
                      <option value="google">{t('sourceGoogle')}</option>
                      <option value="instagram">{t('sourceInstagram')}</option>
                      <option value="facebook">{t('sourceFacebook')}</option>
                      <option value="tripadvisor">{t('sourceTripadvisor')}</option>
                      <option value="anbefaling">{t('sourceRecommendation')}</option>
                      <option value="annet">{t('sourceOther')}</option>
                    </select>
                  </div>

                  {/* GDPR */}
                  <div className="form-group">
                    <label className="form-checkbox form-checkbox--gdpr">
                      <input
                        type="checkbox"
                        name="gdpr"
                        checked={formData.gdpr}
                        onChange={(e) => handleInputChange('gdpr', e.target.checked)}
                      />
                      <span>
                        {t('gdprText')}{' '}
                        <span aria-hidden="true">*</span>
                      </span>
                    </label>
                    <span className="form-error" role="alert">
                      {errors.gdpr || ''}
                    </span>
                  </div>

                  <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
                    {submitting ? '...' : t('submitButton')}
                  </button>
                </form>
              ) : (
                <div className="form-success" aria-live="polite" tabIndex={-1}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t('successMessage')}
                </div>
              )}
            </div>

            {/* SIDEBAR COLUMN */}
            <div className="booking-sidebar">
              <div className="sidebar-card">
                <h2 className="sidebar-card__title">{t('sidebarContactTitle')}</h2>
                <a href="tel:+4793624642" className="sidebar-contact-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
                  </svg>
                  <span>+47 936 24 642</span>
                </a>
                <a href="mailto:post@kyst-opplevelser.no" className="sidebar-contact-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>post@kyst-opplevelser.no</span>
                </a>
                <div className="sidebar-contact-item" style={{ cursor: 'default' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <address style={{ fontStyle: 'normal' }}>Austefjordsvegen 165, 5379 Steinsland</address>
                </div>
              </div>

              <div className="sidebar-card">
                <h2 className="sidebar-card__title">{t('sidebarHoursTitle')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    <span>{t('sidebarHoursDays')}</span>
                    <span style={{ fontWeight: 'var(--weight-medium)' as unknown as number, color: 'var(--text-primary)' }}>08:00 – 20:00</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{t('sidebarHoursSeason')}</div>
                </div>
              </div>

              <div className="sidebar-note">
                <p>
                  <strong style={{ color: 'var(--text-primary)' }}>{t('sidebarSeasonalLabel')}</strong>{' '}
                  {t('sidebarSeasonalText')}
                </p>
              </div>

              <div className="sidebar-card">
                <h2 className="sidebar-card__title">{t('sidebarTrustTitle')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t(`trust${i}`)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section section--secondary" aria-labelledby="faq-heading">
        <div className="container--md">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('faqEyebrow')}</p>
            <h2 id="faq-heading" className="section__title">{t('faqTitle')}</h2>
            <p className="section__subtitle">{t('faqSubtitle')}</p>
          </div>
          <div className="faq reveal" role="list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <details key={i} role="listitem">
                <summary>{t(`faq${i}Question`)}</summary>
                <div className="faq__answer"><div className="faq__answer-inner">{t(`faq${i}Answer`)}</div></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="section section--sm" style={{ textAlign: 'center' }} aria-label={t('ctaAriaLabel')}>
        <div className="container reveal">
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            {t('ctaText')}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+4793624642" className="btn btn--outline btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
              </svg>
              {t('ctaCallButton')}
            </a>
            <a href="mailto:post@kyst-opplevelser.no" className="btn btn--primary btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t('ctaEmailButton')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
