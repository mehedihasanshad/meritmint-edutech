'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const CHAOS_WORDS = [
  'ch. 7 revision…',
  'only 47 days left',
  'mock #12',
  'parents asking again',
  'what is merit?',
  'bhai notes dao',
  'physics = পরী',
  "last year's cutoff?",
  'sleep: 4h',
  'telegram group',
  'উচ্চতর গণিত',
  'organic ch. 5',
  'what if I fail?',
  'admission = life',
  'সময় নাই',
  'HSC result…',
  'coaching fees',
  'medical? buet?',
];

type Chaos = {
  id: number;
  text: string;
  top: string;
  left: string;
  delay: number;
  dx: string;
  dy: string;
};

export function Hero() {
  const [calm, setCalm] = useState(false);

  const chaos = useMemo<Chaos[]>(() => {
    return CHAOS_WORDS.map((text, i) => ({
      id: i,
      text,
      top: `${Math.random() * 80 + 5}%`,
      left: `${Math.random() * 85 + 3}%`,
      delay: Math.random() * 1600,
      dx: `${(Math.random() - 0.5) * 80}px`,
      dy: `${(Math.random() - 0.5) * 80}px`,
    }));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCalm(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero-stage">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {!calm &&
          chaos.map((c) => (
            <span
              key={c.id}
              className="chaos-word"
              style={{
                top: c.top,
                left: c.left,
                animationDelay: `${c.delay}ms`,
                ['--dx' as string]: c.dx,
                ['--dy' as string]: c.dy,
              }}
            >
              {c.text}
            </span>
          ))}
      </div>

      <div className="section relative z-10 flex w-full flex-col items-start gap-8 md:gap-10">
        <span className="kicker-tag">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-ticker-pulse" />
          Admission '26 · Batches live now
        </span>

        <h1 className="display-giant max-w-[14ch]">
          Tension{' '}
          <span className="strike-through-red italic-serif">gone</span>.
          <br />
          Grades <span className="accent-red">on</span>.
        </h1>

        <p className="max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
          An admission-prep platform built by people who actually cracked the
          exam — not a coaching-center brochure. Notes that don't waste your
          night. Mocks that mirror the real paper. Mentors who pick up the
          phone. <span className="italic-serif text-fg">Bhai, start today.</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="#courses" className="btn-pill btn-pill-primary">
            See the courses
            <ArrowIcon />
          </Link>
          <Link href="/login" className="btn-pill btn-pill-ghost">
            Free trial · 3 days
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-dim">
          <Tick /> 14,200+ students prepping right now
          <span className="text-dim">·</span>
          <Tick /> ₹/৳ 3,200 all-in · no upsell
          <span className="text-dim">·</span>
          <Tick /> 48 toppers on the other end
        </div>
      </div>

      <Image
        src="/logo-icon.png"
        alt=""
        aria-hidden
        width={500}
        height={500}
        className="pointer-events-none absolute right-[-10%] top-1/2 hidden w-[42vw] max-w-[620px] -translate-y-1/2 opacity-[0.09] md:block"
      />
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
