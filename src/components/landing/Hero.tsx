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
        <span className="kicker-tag">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-ticker-pulse" />
          <Lang
            en="Admission '26 · Batches live now"
            bn="এডমিশন ২০২৬ · ব্যাচ চলছে"
          />
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

        <p className="max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
          <Lang
            en={
              <>
                MeritMint is admission prep for non-science university
                seekers in Bangladesh — DU, JU, BUP, JnU, IBA. We also run
                SSC-level academic, Spoken English, Competitive Math, and
                book-completion series (Master by Jahangir Alam and
                others). Built by people who actually got in, so the notes
                make things click, the mocks hurt the way the real paper
                does, and the mentors actually answer.{' '}
                <span className="italic-serif text-fg">
                  Start today.
                </span>
              </>
            }
            bn={
              <>
                MeritMint — Non-science background-এর student-দের জন্য
                university admission prep। DU, JU, BUP, JnU, IBA-তে লড়াইয়ের
                সঙ্গী। পাশাপাশি SSC পর্যন্ত science-ভিত্তিক academic course,
                Spoken English, Competitive Math, আর admission-এর বই-গুলোকে
                ধরে ধরে শেষ করানোর series (যেমন Jahangir Alam স্যারের
                Master)। পুরোটা বানিয়েছে সেই ভাই-আপুরা যারা নিজেরাই এই পথে
                হেঁটে এসেছে — তাই notes বোঝায়, mock আসলেই ঝাঁকায়, mentor
                সত্যিই ফোন ধরে।{' '}
                <span className="italic-serif text-fg">
                  ভাই, শুরুটা আজকেই হোক।
                </span>
              </>
            }
          />
        </p>

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
