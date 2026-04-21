'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DigitStack, useCountdown } from './FlipClock';
import { Lang } from './Lang';

const MESSAGES = [
  'আজ ৪২ জন নতুন শিক্ষার্থী যোগ দিয়েছে',
  'শেষ ১২% আসন বাকি · DU ঘ unit batch',
  'রাত ৯টায় Spoken English live session',
  'Early-bird রা পাচ্ছে ১০% ছাড় · শুধু এই সপ্তাহে',
  'আজ সন্ধ্যা ৭টায় Master (Jahangir Alam) — Ch. 12 solve',
  'Admission form ভরার আগে আমাদের strategy session নাও',
];

const DEFAULT_TARGET = new Date('2026-06-30T23:59:59+06:00').getTime();

export function AdmissionCountdown({
  target = DEFAULT_TARGET,
}: {
  target?: number;
}) {
  const { days, hours, minutes, seconds, expired } = useCountdown(target);

  return (
    <div className="admission-countdown">
      <div className="countdown-head">
        <span className="countdown-pulse" aria-hidden />
        <span className="countdown-label" lang="bn">
          {expired ? 'Admission closed' : 'Seat locking in'}
        </span>
        <span className="countdown-sep" aria-hidden>
          ·
        </span>
        <TypingTicker messages={MESSAGES} />
      </div>

      <div className="countdown-row" role="timer" aria-live="polite">
        <Segment value={days} label="Day" bnLabel="দিন" />
        <span className="countdown-colon">:</span>
        <Segment value={hours} label="Hour" bnLabel="ঘণ্টা" />
        <span className="countdown-colon">:</span>
        <Segment value={minutes} label="Min" bnLabel="মিনিট" />
        <span className="countdown-colon">:</span>
        <Segment value={seconds} label="Sec" bnLabel="সেকেন্ড" />
      </div>

      <div className="countdown-cta">
        <Link
          href="#courses"
          className="btn-pill btn-pill-primary countdown-cta-btn"
        >
          <Lang en="See the courses" bn="কোর্স দেখো" />
          <ArrowIcon />
        </Link>
        <Link
          href="/login"
          className="btn-pill btn-pill-ghost countdown-cta-btn"
        >
          <Lang en="3-day free trial" bn="৩ দিনের ফ্রি ট্রায়াল" />
        </Link>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
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
  );
}

function Segment({
  value,
  label,
  bnLabel,
}: {
  value: number;
  label: string;
  bnLabel: string;
}) {
  const text = String(value).padStart(2, '0');
  return (
    <div className="countdown-seg">
      <DigitStack text={text} />
      <div className="countdown-unit">
        <span data-lang-only="en">{label}</span>
        <span data-lang-only="bn" lang="bn">
          {bnLabel}
        </span>
      </div>
    </div>
  );
}

function TypingTicker({ messages }: { messages: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'typing' | 'holding' | 'erasing'>('typing');

  useEffect(() => {
    const current = messages[idx];
    let t: ReturnType<typeof setTimeout>;

    if (mode === 'typing') {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
      } else {
        t = setTimeout(() => setMode('holding'), 1800);
      }
    } else if (mode === 'holding') {
      t = setTimeout(() => setMode('erasing'), 800);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 22);
      } else {
        t = setTimeout(() => {
          setIdx((i) => (i + 1) % messages.length);
          setMode('typing');
        }, 260);
      }
    }
    return () => clearTimeout(t);
  }, [text, mode, idx, messages]);

  return (
    <span className="typing-ticker" lang="bn">
      <span>{text}</span>
      <span className="typing-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
