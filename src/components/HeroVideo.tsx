'use client';

import { useEffect } from 'react';

export default function HeroVideo() {
  useEffect(() => {
    const thumb = document.getElementById('heroThumb');
    const iframe = document.getElementById('heroVideo') as HTMLIFrameElement | null;
    if (!thumb || !iframe) return;

    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = () => {
      // @ts-expect-error Vimeo global
      const player = new window.Vimeo.Player(iframe);
      player.on('playing', () => {
        iframe.style.opacity = '1';
        thumb.classList.add('hero__video-thumb--hidden');
      });
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
