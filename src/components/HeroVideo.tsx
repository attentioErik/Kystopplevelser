'use client';

import { useEffect, useState, useCallback } from 'react';
import HeroLoader from './HeroLoader';

const MIN_LOADER_TIME = 1800; // ms — minimum time to show the loader

export default function HeroVideo() {
  const [loaderVisible, setLoaderVisible] = useState(true);

  const hideLoader = useCallback(() => {
    setLoaderVisible(false);
  }, []);

  useEffect(() => {
    const iframe = document.getElementById('heroVideo') as HTMLIFrameElement | null;
    if (!iframe) return;

    const mountTime = Date.now();
    let videoReady = false;
    let minTimeReached = false;

    function tryHide() {
      if (videoReady && minTimeReached) {
        iframe!.style.opacity = '1';
        setLoaderVisible(false);
      }
    }

    // Minimum display time
    const timer = setTimeout(() => {
      minTimeReached = true;
      tryHide();
    }, MIN_LOADER_TIME);

    // Load Vimeo API and listen for playing
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = () => {
      // @ts-expect-error Vimeo global
      const player = new window.Vimeo.Player(iframe);
      player.on('playing', () => {
        videoReady = true;
        // If min time already passed, calculate remaining wait
        const elapsed = Date.now() - mountTime;
        if (elapsed >= MIN_LOADER_TIME) {
          minTimeReached = true;
          tryHide();
        }
      });
    };
    document.head.appendChild(script);

    return () => clearTimeout(timer);
  }, [hideLoader]);

  return <HeroLoader visible={loaderVisible} />;
}
