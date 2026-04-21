'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Lang } from '../Lang';
import { AdmissionCountdown } from '../AdmissionCountdown';
import { AlumniBubbles } from '../AlumniBubbles';

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
        <span className="live-pill" role="status" aria-live="polite">
          <span className="live-pill-badge" aria-hidden>
            <span className="live-pill-bars">
              <span className="live-pill-bar" />
              <span className="live-pill-bar" />
              <span className="live-pill-bar" />
            </span>
            <span className="live-pill-word">LIVE</span>
          </span>
          <span className="live-pill-body">
            <Lang
              en="Admission '26 · Batches running now"
              bn="এডমিশন ২০২৬ · ব্যাচ চলছে"
            />
            <svg
              className="live-pill-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
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
            <span className="chip-num">
              <Lang en="47" bn="৪৭" />
            </span>
            <span className="chip-label">
              <Lang en="calibrated mocks" bn="calibrated mock" />
            </span>
          </FloatingChip>
          <FloatingChip className="chip-tr" depth={-22}>
            <span className="chip-num">
              <Lang en="2,847" bn="২,৮৪৭" />
            </span>
            <span className="chip-label">
              <Lang
                en="placed · last 3 cycles"
                bn="placed · গত ৩ cycle"
              />
            </span>
          </FloatingChip>
          <FloatingChip className="chip-br" depth={14}>
            <span className="chip-dot" />
            <span className="chip-label">DU · JU · BUP · JnU · IBA</span>
          </FloatingChip>
        </div>

        <div className="hero-copy">
          {/* Scale hook — two-figure split with a scarcity meter. The
              contrast is the point: ghosted outline number on the left
              (the crowd), solid red number on the right (the prize). */}
          <div className="hero-hook">
            <div className="hero-hook-cell">
              <span className="hero-hook-num hero-hook-num-ghost">
                <Lang en="4,00,000" bn="৪,০০,০০০" />
              </span>
              <span className="hero-hook-label">
                <Lang en="apply every cycle" bn="প্রতি cycle-এ apply" />
              </span>
            </div>

            <div className="hero-hook-arrow" aria-hidden>
              <svg
                viewBox="0 0 120 24"
                width="100%"
                height="24"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="12"
                  x2="118"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                  className="hero-hook-arrow-line"
                />
                <path
                  d="M108 6 l10 6 -10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hero-hook-arrow-head"
                />
              </svg>
              <span className="hero-hook-arrow-tag" aria-hidden>
                <Lang en="1 in 89" bn="৮৯-এ ১" />
              </span>
            </div>

            <div className="hero-hook-cell hero-hook-cell-right">
              <span className="hero-hook-num hero-hook-num-solid">
                <Lang en="4,500" bn="৪,৫০০" />
              </span>
              <span className="hero-hook-label hero-hook-label-accent">
                <Lang en="actually get in" bn="সত্যিই চান্স পায়" />
              </span>
            </div>
          </div>

          {/* Scarcity meter — the visual punchline */}
          <div className="hero-hook-meter" aria-hidden>
            <div className="hero-hook-meter-track">
              <div className="hero-hook-meter-fill" />
              <div className="hero-hook-meter-you" />
            </div>
            <span className="hero-hook-meter-caption">
              <Lang
                en={<>Only <b>1.1%</b> cross this line. Prepare like it.</>}
                bn={
                  <>
                    মাত্র <b>১.১%</b> এই line পেরোয়। সেই preparation-ই
                    দরকার।
                  </>
                }
              />
            </span>
          </div>

          {/* Positioning — what we actually do */}
          <p className="hero-copy-body">
            <Lang
              en={
                <>
                  MeritMint doesn&rsquo;t do magic — we do{' '}
                  <strong>preparation</strong>. For non-science admission.
                </>
              }
              bn={
                <>
                  MeritMint magic করে না — আমরা{' '}
                  <strong>preparation</strong> দিই, non-science admission
                  সিকারদের জন্য।
                </>
              }
            />
          </p>

          {/* Product universe as pills — scannable at a glance */}
          <div className="hero-copy-pills">
            <span className="hero-pill hero-pill-solid">DU</span>
            <span className="hero-pill hero-pill-solid">JU</span>
            <span className="hero-pill hero-pill-solid">BUP</span>
            <span className="hero-pill hero-pill-solid">JnU</span>
            <span className="hero-pill hero-pill-solid">IBA</span>
            <span className="hero-pill-divider" aria-hidden>
              +
            </span>
            <span className="hero-pill hero-pill-ghost">
              <Lang en="SSC Academic" bn="SSC Academic" />
            </span>
            <span className="hero-pill hero-pill-ghost">
              <Lang en="Spoken English" bn="Spoken English" />
            </span>
            <span className="hero-pill hero-pill-ghost">
              <Lang en="Competitive Math" bn="Competitive Math" />
            </span>
            <span className="hero-pill hero-pill-ghost">
              <Lang
                en={<>Book series · Master <em>by Jahangir Alam</em></>}
                bn={<>Book series · Master <em>(Jahangir Alam)</em></>}
              />
            </span>
          </div>

          {/* Signature trust-line — italic serif, left-accented */}
          <p className="hero-copy-closer">
            <span className="italic-serif">
              <Lang
                en="Built by people who actually got in."
                bn="বানিয়েছে সেই ভাই-আপুরা — যারা নিজেরাই পেরিয়েছে।"
              />
            </span>
          </p>
        </div>

        <div className="hero-urgency-row">
          <AdmissionCountdown />
          <AlumniBubbles />
        </div>
      </div>
    </section>
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
