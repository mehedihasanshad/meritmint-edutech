'use client';

import { useState } from 'react';
import { CountUp } from '@/components/CountUp';

const STATS: {
  value: string;
  label: string;
  note: string;
  accent?: boolean;
}[] = [
  {
    value: '১৪,২০০+',
    label: 'শিক্ষার্থী এখন preparation নিচ্ছে',
    note: 'সারা বাংলাদেশ + diaspora জুড়ে',
  },
  {
    value: '২,৮৪৭',
    label: 'DU · JU · BUP · JnU · IBA placement',
    note: 'শেষ তিনটি admission cycle মিলিয়ে',
    accent: true,
  },
  {
    value: '৪৮',
    label: 'Topper mentor platform-এ active',
    note: 'গড় reply time — ১১ মিনিট',
  },
  {
    value: '৳৩,২০০',
    label: 'ফুল in-depth course — সব কিছু included',
    note: 'Coaching ৳৫০,০০০+ বনাম এটা',
  },
];

export function StatsBand() {
  return (
    <section className="section section-tight">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <FlipStat key={s.value} {...s} />
        ))}
      </div>
    </section>
  );
}

function FlipStat({
  value,
  label,
  note,
  accent,
}: {
  value: string;
  label: string;
  note: string;
  accent?: boolean;
}) {
  const [tapped, setTapped] = useState(false);
  const isBengali = /[\u0980-\u09FF]/.test(value);

  return (
    <div
      className={`stat-flip ${tapped ? 'stat-flip-tapped' : ''}`}
      onClick={() => setTapped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setTapped((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${value} — ${label}`}
    >
      <div className="stat-flip-inner">
        <div className="stat-face stat-face-front">
          <span className="stat-corner-dot" aria-hidden />
          <span className="stat-number-glow" aria-hidden />
          <div
            className={`stat-number ${accent ? 'accent-red' : ''}`}
            lang={isBengali ? 'bn' : undefined}
            style={{ fontFeatureSettings: '"tnum" on' }}
          >
            <CountUp value={value} />
          </div>
          <div className="h-[2px] w-12 bg-accent/70 rounded-full" />
        </div>
        <div className="stat-face stat-face-back">
          <div
            className="text-[0.72rem] font-mono uppercase tracking-[0.18em] accent-red"
            lang={isBengali ? 'bn' : undefined}
          >
            {value}
          </div>
          <div
            className="mt-3 text-[1rem] font-medium leading-snug text-fg"
            lang="bn"
          >
            {label}
          </div>
          <div
            className="mt-2 text-xs italic-serif leading-snug text-muted"
            lang="bn"
          >
            {note}
          </div>
        </div>
      </div>
    </div>
  );
}
