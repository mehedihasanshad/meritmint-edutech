'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const apply = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const root = document.documentElement;
    root.style.setProperty('--tx', `${cx}px`);
    root.style.setProperty('--ty', `${cy}px`);

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };

    if (typeof doc.startViewTransition === 'function') {
      root.classList.add('theme-animating');
      const transition = doc.startViewTransition(() => apply(next));
      transition.finished.finally(() => {
        root.classList.remove('theme-animating');
      });
    } else {
      apply(next);
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="btn-ghost relative h-9 w-9 overflow-hidden !p-0"
      suppressHydrationWarning
    >
      <span className="sr-only">Toggle theme</span>
      <SunMoonIcon theme={mounted ? theme : 'dark'} />
    </button>
  );
}

function SunMoonIcon({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';
  return (
    <span
      className="pointer-events-none inline-flex h-full w-full items-center justify-center"
      style={{
        transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 300ms ease, transform 300ms ease',
          position: 'absolute',
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'scale(0.6)' : 'scale(1)',
          transition: 'opacity 300ms ease, transform 300ms ease',
          position: 'absolute',
        }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </span>
  );
}
