'use client';

import { useEffect, useState } from 'react';
import HeroLoader from './HeroLoader';

const MIN_LOADER_TIME = 1800;
const CACHE_KEY = 'kyst-video-loaded';

export default function HeroVideo() {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem(CACHE_KEY);
  });
  const [loaderVisible, setLoaderVisible] = useState(showLoader);

  useEffect(() => {
    const iframe = document.getElementById('heroVideo') as HTMLIFrameElement | null;
    if (!iframe) return;

    // If video was already loaded this session, show it immediately
    if (!showLoader) {
      iframe.style.opacity = '1';
      return;
    }

    const mountTime = Date.now();
    let videoReady = false;
    let minTimeReached = false;

    function tryHide() {
      if (videoReady && minTimeReached) {
        iframe!.style.opacity = '1';
        setLoaderVisible(false);
        sessionStorage.setItem(CACHE_KEY, '1');
      }
    }

    const timer = setTimeout(() => {
      minTimeReached = true;
      tryHide();
    }, MIN_LOADER_TIME);

    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = () => {
      // @ts-expect-error Vimeo global
      const player = new window.Vimeo.Player(iframe);
      player.on('playing', () => {
        videoReady = true;
        const elapsed = Date.now() - mountTime;
        if (elapsed >= MIN_LOADER_TIME) {
          minTimeReached = true;
          tryHide();
        }
      });
    };
    document.head.appendChild(script);

    return () => clearTimeout(timer);
  }, [showLoader]);

  if (!showLoader) return null;
  return <HeroLoader visible={loaderVisible} />;
}
