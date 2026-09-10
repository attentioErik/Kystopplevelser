'use client';

import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  /** Uploadcare adaptive_video URL (HLS master playlist) */
  src: string;
  /** Progressive MP4 used if HLS can't be played */
  fallbackSrc?: string;
}

// Adaptive bitrate (HLS) background video.
// Safari/iOS play HLS natively; other browsers lazy-load hls.js.
export default function HeroVideo({ src, fallbackSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => video.play().catch(() => {});
    const useFallback = () => {
      if (!fallbackSrc) return;
      video.src = fallbackSrc;
      play();
    };

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      play();
      return;
    }

    let hls: import('hls.js').default | undefined;
    let cancelled = false;

    import('hls.js')
      .then(({ default: Hls }) => {
        if (cancelled) return;
        if (!Hls.isSupported()) return useFallback();
        hls = new Hls({ capLevelToPlayerSize: true, startLevel: -1 });
        hls.on(Hls.Events.ERROR, (_e, data) => {
          if (data.fatal) {
            hls?.destroy();
            hls = undefined;
            useFallback();
          }
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, play);
      })
      .catch(useFallback);

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src, fallbackSrc]);

  return (
    <video
      ref={videoRef}
      id="heroVideo"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%,-50%)',
      }}
      title="Kystopplevelser Promo"
    />
  );
}
