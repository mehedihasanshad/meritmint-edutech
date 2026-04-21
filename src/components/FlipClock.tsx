'use client';

import { useEffect, useState } from 'react';

/**
 * Shared digit-flip clock primitives. Used by both the hero's
 * AdmissionCountdown and the per-course CourseMeta countdowns so
 * every ticking clock on the site animates the same way.
 */

export function DigitStack({ text }: { text: string }) {
  return (
    <span className="countdown-digits">
      {text.split('').map((ch, i) => (
        <DigitCell key={i} ch={ch} />
      ))}
    </span>
  );
}

function DigitCell({ ch }: { ch: string }) {
  const [current, setCurrent] = useState(ch);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    if (ch !== current) {
      setPrevious(current);
      setCurrent(ch);
      const t = setTimeout(() => setPrevious(null), 360);
      return () => clearTimeout(t);
    }
  }, [ch, current]);

  return (
    <span className="countdown-digit">
      <span className="countdown-digit-new">{current}</span>
      {previous !== null && (
        <span className="countdown-digit-old">{previous}</span>
      )}
    </span>
  );
}

/**
 * Live countdown hook — returns days/hours/minutes/seconds until the
 * given target timestamp. Updates once per second.
 */
export function useCountdown(target: number) {
  const [ms, setMs] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const tick = () => setMs(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return {
    ms,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
    expired: ms <= 0,
  };
}
