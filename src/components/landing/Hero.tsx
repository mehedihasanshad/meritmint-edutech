'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const stageRef = useRef<HTMLElement | null>(null);

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

  // Mouse parallax on the banner + floating chips
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', String(x));
        el.style.setProperty('--my', String(y));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero-stage" ref={stageRef}>
      <div aria-hidden className="hero-dot-grid" />

      <div className="section relative z-10 flex w-full flex-col items-start gap-8 md:gap-10">
        <span className="kicker-tag">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-ticker-pulse" />
          <span lang="bn">এডমিশন ২০২৬</span> · ব্যাচ চলছে এখনই
        </span>

        <div className="hero-banner-wrap">
          <div className="hero-banner-glow" aria-hidden />
          <div className="hero-banner-frame">
            <Image
              src="/banner-dark.jpg"
              alt="MeritMint — Tension Gone. Grades On."
              width={1280}
              height={720}
              priority
              className="hero-banner-img hero-banner-dark"
            />
            <Image
              src="/banner-light.jpg"
              alt=""
              aria-hidden
              width={1280}
              height={720}
              priority
              className="hero-banner-img hero-banner-light"
            />
            <div className="hero-banner-shine" aria-hidden />
          </div>

          <div aria-hidden className="hero-banner-chaos">
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

          <FloatingChip className="chip-tl" depth={18}>
            <span className="chip-num">৪৭</span>
            <span className="chip-label" lang="bn">
              calibrated mock
            </span>
          </FloatingChip>
          <FloatingChip className="chip-tr" depth={-22}>
            <span className="chip-num">২,৮৪৭</span>
            <span className="chip-label" lang="bn">
              placed · গত ৩ cycle
            </span>
          </FloatingChip>
          <FloatingChip className="chip-br" depth={14}>
            <span className="chip-dot" />
            <span className="chip-label" lang="bn">
              DMC · BUET · DU · IBA
            </span>
          </FloatingChip>
        </div>

        <p className="max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
          <span lang="bn">
            MeritMint হচ্ছে সেই admission prep platform — যেটা বানিয়েছে সেই
            ভাইয়া-আপুরা যারা নিজেরা HSC পেরিয়ে Medical, BUET, DU-তে পৌঁছেছে।
            রাত নষ্ট করে এমন notes না, আসল exam-এর মতো calibrated mock, আর
            doubt-এ phone ধরে এমন mentor।
          </span>{' '}
          <span lang="bn" className="italic-serif text-fg">
            ভাই, আজই শুরু করো।
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="#courses" className="btn-pill btn-pill-primary">
            <span lang="bn">কোর্স দেখো</span>
            <ArrowIcon />
          </Link>
          <Link href="/login" className="btn-pill btn-pill-ghost">
            <span lang="bn">৩ দিন ফ্রি ট্রায়াল</span>
          </Link>
        </div>

      </div>
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

function FloatingChip({
  className = '',
  depth = 10,
  children,
}: {
  className?: string;
  depth?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`hero-chip ${className}`}
      style={{ ['--chip-depth' as string]: `${depth}` }}
    >
      {children}
    </div>
  );
}
