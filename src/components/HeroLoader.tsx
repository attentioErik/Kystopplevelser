'use client';

interface HeroLoaderProps {
  visible: boolean;
}

export default function HeroLoader({ visible }: HeroLoaderProps) {
  return (
    <div
      className={`hero-loader${visible ? '' : ' hero-loader--hidden'}`}
      aria-hidden={!visible}
    >
      {/* Background gradient */}
      <div className="hero-loader__bg" />

      {/* Animated waves */}
      <div className="hero-loader__waves">
        <svg className="hero-loader__wave hero-loader__wave--3" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,192 C320,280 640,120 960,192 C1280,264 1600,120 1920,192 C2240,264 2560,120 2880,192 L2880,320 L0,320 Z" />
        </svg>
        <svg className="hero-loader__wave hero-loader__wave--2" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,224 C360,160 720,288 1080,224 C1440,160 1800,288 2160,224 C2520,160 2880,288 2880,224 L2880,320 L0,320 Z" />
        </svg>
        <svg className="hero-loader__wave hero-loader__wave--1" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,256 C480,200 720,310 1080,256 C1440,200 1680,310 2160,256 C2520,200 2760,310 2880,256 L2880,320 L0,320 Z" />
        </svg>
      </div>

      {/* Centered content */}
      <div className="hero-loader__content">
        <div className="hero-loader__logo">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M4 20 Q8 12 16 16 Q24 20 28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M4 24 Q8 16 16 20 Q24 24 28 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>
        </div>
        <h2 className="hero-loader__title">Kystopplevelser</h2>
        <p className="hero-loader__subtitle">Bergen · Norge</p>
        <div className="hero-loader__pulse">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
