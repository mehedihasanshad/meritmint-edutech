'use client';

import { useEffect, useState } from 'react';

/**
 * Back-to-top ribbon pinned inside the footer. Appears after the user
 * has scrolled past the first viewport; clicking it smooth-scrolls to
 * the very top of the page.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goTop() {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? 'is-visible' : ''}`}
      onClick={goTop}
      aria-label="Back to top"
    >
      <span className="scroll-top-arrow" aria-hidden>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
      <span className="scroll-top-label">
        <span data-lang-only="en">Back to top</span>
        <span data-lang-only="bn" lang="bn">
          উপরে ফেরো
        </span>
      </span>
    </button>
  );
}
