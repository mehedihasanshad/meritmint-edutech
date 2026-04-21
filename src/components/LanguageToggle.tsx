'use client';

import { useEffect, useState } from 'react';

type Lng = 'en' | 'bn';

function readInitial(): Lng {
  if (typeof document === 'undefined') return 'en';
  const attr = document.documentElement.getAttribute('data-lang');
  return attr === 'bn' ? 'bn' : 'en';
}

export function LanguageToggle() {
  const [lng, setLng] = useState<Lng>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLng(readInitial());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Lng = lng === 'en' ? 'bn' : 'en';
    document.documentElement.setAttribute('data-lang', next);
    try {
      localStorage.setItem('lang', next);
    } catch {}
    setLng(next);
  }

  return (
    <button
      type="button"
      className="lang-toggle"
      aria-label={`Switch to ${lng === 'en' ? 'Bengali' : 'English'}`}
      title={`Language · ${lng === 'en' ? 'English' : 'বাংলা'}`}
      onClick={toggle}
      suppressHydrationWarning
    >
      <span className={`lang-chip ${mounted && lng === 'en' ? 'is-active' : ''}`}>
        EN
      </span>
      <span className={`lang-chip ${mounted && lng === 'bn' ? 'is-active' : ''}`}>
        বাং
      </span>
    </button>
  );
}
