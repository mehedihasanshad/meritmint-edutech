'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to its target when it scrolls into view.
 * Preserves the original string's formatting (Bangla digits, commas,
 * suffixes like "+" or "৳") by only animating the numeric portion.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Detect & parse the numeric part of the value.
    const { prefix, number, suffix, isBengali } = parseValue(value);
    if (number === null) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplay(value);
        return;
      }

      const startTs = performance.now();
      const finalNum = number;
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTs) / duration);
        // easeOutExpo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        const cur = Math.round(finalNum * eased);
        setDisplay(
          `${prefix}${formatNumber(cur, isBengali)}${suffix}`
        );
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

function parseValue(v: string) {
  // Bengali digits: ০-৯. Latin: 0-9.
  const bnDigits = '০১২৩৪৫৬৭৮৯';
  const latinDigits = '0123456789';

  let prefix = '';
  let suffix = '';
  let numStr = '';
  let isBengali = false;
  // Greedy: strip leading non-digits as prefix, then capture digits and
  // separators (commas), then the rest as suffix.
  const chars = Array.from(v);
  let i = 0;
  while (i < chars.length && !latinDigits.includes(chars[i]) && !bnDigits.includes(chars[i])) {
    prefix += chars[i];
    i++;
  }
  while (
    i < chars.length &&
    (latinDigits.includes(chars[i]) || bnDigits.includes(chars[i]) || chars[i] === ',')
  ) {
    numStr += chars[i];
    if (bnDigits.includes(chars[i])) isBengali = true;
    i++;
  }
  suffix = chars.slice(i).join('');

  if (!numStr) return { prefix, number: null, suffix, isBengali };

  // Normalize to Latin number for arithmetic
  let normalized = numStr.replace(/,/g, '');
  if (isBengali) {
    normalized = normalized
      .split('')
      .map((c) => {
        const idx = bnDigits.indexOf(c);
        return idx >= 0 ? String(idx) : c;
      })
      .join('');
  }
  const number = Number(normalized);
  if (!Number.isFinite(number)) return { prefix, number: null, suffix, isBengali };
  return { prefix, number, suffix, isBengali };
}

function formatNumber(n: number, bengali: boolean): string {
  const s = n.toLocaleString('en-US');
  if (!bengali) return s;
  const bnDigits = '০১২৩৪৫৬৭৮৯';
  return s
    .split('')
    .map((c) => (c >= '0' && c <= '9' ? bnDigits[Number(c)] : c))
    .join('');
}
