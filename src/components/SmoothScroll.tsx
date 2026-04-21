'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth-scroll provider. Replaces the browser's linear scroll
 * with Lenis's momentum-based smoothing — content glides with water-like
 * inertia. Anchor jumps still work; Lenis hooks into them automatically.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect the user's reduced-motion preference.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth scroll to hash on click for in-page anchors.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.3 });
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
