'use client';

import { useEffect, useState } from 'react';

const NOTICES = [
  '🔴 Medical Admission ২০২৬ batch — শেষ ১২% আসন বাকি',
  '📣 আজ রাত ৯টায়: Physics Ch. 9 live doubt clearing — সবার জন্য ফ্রি',
  '📖 নতুন: HSC ICT মডেল টেস্ট drop হয়েছে · ১,২০০+ download in 2 ঘণ্টা',
];

const INTERVAL_MS = 5000;

export function SocialTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % NOTICES.length),
      INTERVAL_MS
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="broadcast-strip" role="status" aria-live="polite">
      <div className="broadcast-inner" lang="bn">
        {NOTICES.map((n, i) => (
          <span
            key={i}
            className={`broadcast-item ${i === idx ? 'active' : ''}`}
            aria-hidden={i !== idx}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="broadcast-dots" aria-hidden>
        {NOTICES.map((_, i) => (
          <span
            key={i}
            className={`broadcast-dot ${i === idx ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
