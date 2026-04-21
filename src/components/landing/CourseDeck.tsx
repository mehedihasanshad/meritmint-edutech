'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { BuyCourseButton } from '@/components/BuyCourseButton';
import { CourseMeta, type CourseStatus } from '@/components/CourseMeta';

type Course = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  tagline: string;
  price: string;
  length: string;
  deliverables: string[];
  for: string;
  status: CourseStatus;
  startDate: string;
  deadline?: number;
  seatsTotal: number;
  seatsFilled: number;
  enrolled: number;
};

const COURSES: Course[] = [
  {
    id: 1,
    tag: 'Flagship',
    title: 'University Admission',
    subtitle: 'Non-science · DU · JU · BUP · JnU · IBA',
    tagline: 'আমাদের মূল কাজ — এখান থেকেই সব শুরু।',
    price: '৳৩,২০০',
    length: '১৬ সপ্তাহ',
    deliverables: [
      'বাংলা · English · General Knowledge · General Math',
      'ক / খ / গ / ঘ unit-wise mock',
      'সপ্তাহ ধরে ধরে chapter plan',
      'Full-length mock paper × ৮',
    ],
    for: 'Non-science background-এ admission-এ serious — এটাই তোমার জন্য।',
    status: 'live',
    startDate: 'Jan 15, 2026',
    deadline: new Date('2026-06-30T23:59:59+06:00').getTime(),
    seatsTotal: 200,
    seatsFilled: 176,
    enrolled: 1240,
  },
  {
    id: 2,
    tag: 'Academic',
    title: 'SSC Academic',
    subtitle: 'Class 6 → SSC · Science stream',
    tagline: 'ভিত্তিটা শক্ত হোক।',
    price: '৳১,৪০০',
    length: 'মাসিক',
    deliverables: [
      'Physics · Chemistry · Biology · Higher Math · ICT',
      'Chapter ধরে ধরে animated lesson',
      'প্রতি সপ্তাহে chapter assessment',
      'Live doubt clearing × ২ / সপ্তাহে',
    ],
    for: 'স্কুলের science stream — আগে থেকে গুছিয়ে পড়তে চায়।',
    status: 'live',
    startDate: 'Ongoing · monthly',
    deadline: new Date('2026-05-05T23:59:59+06:00').getTime(),
    seatsTotal: 150,
    seatsFilled: 98,
    enrolled: 870,
  },
  {
    id: 3,
    tag: 'Skill',
    title: 'Spoken English',
    subtitle: 'Confidence আগে, grammar পরে',
    tagline: 'মুখে আটকে যাওয়া বন্ধ।',
    price: '৳৯৯৯',
    length: '৮ সপ্তাহ',
    deliverables: [
      '২০টা small-group live class (max ১২ জন)',
      'Peer practice + সাপ্তাহিক review',
      'Daily speaking prompt + recording',
      'Interview / IELTS speaking add-on',
    ],
    for: 'Viva, interview, presentation — সবখানে সহজে কথা বলতে চাও।',
    status: 'upcoming',
    startDate: 'May 1, 2026',
    deadline: new Date('2026-04-28T23:59:59+06:00').getTime(),
    seatsTotal: 96,
    seatsFilled: 62,
    enrolled: 430,
  },
  {
    id: 4,
    tag: 'Skill',
    title: 'Competitive Math',
    subtitle: 'Olympiad + admission sharpening',
    tagline: 'গণিতকে ভয় না, বন্ধু বানাও।',
    price: '৳১,২০০',
    length: '১২ সপ্তাহ',
    deliverables: [
      'Number theory · Combinatorics · Geometry · Algebra',
      'সাপ্তাহিক problem-set (ranked)',
      'Past Olympiad walkthrough',
      'Admission math-এর edge-sharpening',
    ],
    for: 'Admission math-এ ধার চাও, অথবা Olympiad-এ যেতে চাও।',
    status: 'live',
    startDate: 'Feb 20, 2026',
    deadline: new Date('2026-05-15T23:59:59+06:00').getTime(),
    seatsTotal: 60,
    seatsFilled: 48,
    enrolled: 320,
  },
  {
    id: 5,
    tag: 'Book Series',
    title: 'Book Completion',
    subtitle: 'Master (Jahangir Alam) · আরও কয়েকটি',
    tagline: 'বই ধরেই শেষ — পুরোটা।',
    price: '৳৭৯৯',
    length: '৪ – ৮ সপ্তাহ',
    deliverables: [
      'Jahangir Alam স্যারের Master · সম্পূর্ণ completion',
      'অন্যান্য নির্বাচিত admission বই',
      'Chapter ধরে ধরে breakdown',
      'কাগজে solve করিয়ে one-by-one checking',
    ],
    for: 'নির্দিষ্ট একটা বই শেষ করতে চাও, একা বসে পারছ না।',
    status: 'upcoming',
    startDate: 'May 10, 2026',
    deadline: new Date('2026-05-08T23:59:59+06:00').getTime(),
    seatsTotal: 40,
    seatsFilled: 22,
    enrolled: 180,
  },
];

export function CourseDeck() {
  return (
    <section id="courses" className="section">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">আমরা যা যা পড়াই</span>
          <h2 className="display-headline mt-4">
            <span lang="bn">পাঁচটা আলাদা পথ —</span>
            <br />
            <span lang="bn" className="italic-serif">
              তুমি যেটায় আছো, সেটাই বেছে নাও।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          আমাদের মূল কাজ non-science admission prep। পাশাপাশি SSC-পর্যন্ত
          academic, Spoken English, Competitive Math, আর নির্দিষ্ট কিছু
          admission বই ধরে-ধরে শেষ করানো।
        </p>
      </div>

      <div className="courses-grid">
        {COURSES.map((c) => (
          <CourseFlipCard key={c.id} course={c} />
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-dim" lang="bn">
        কোনটা তোমার জন্য বুঝতে পারছ না?{' '}
        <Link href="#faq" className="underline underline-offset-4">
          আমরা হলে কীভাবে বাছতাম — দেখে নাও →
        </Link>
      </div>
    </section>
  );
}

function CourseFlipCard({ course: c }: { course: Course }) {
  const [tapped, setTapped] = useState(false);

  return (
    <article
      className={`course-flip ${tapped ? 'is-flipped' : ''}`}
      onClick={() => setTapped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setTapped((v) => !v);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${c.title} — tap for details`}
    >
      <div className="course-flip-inner">
        {/* FRONT — title, live/seats, price, buy */}
        <div className="course-face course-face-front">
          <Image
            src="/logo-icon.png"
            alt=""
            aria-hidden
            width={500}
            height={500}
            className="chevron-bg"
          />

          <header className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] accent-red">
                {c.tag}
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-dim">
                {c.length}
              </span>
            </div>
            <h3 className="course-flip-title">{c.title}</h3>
          </header>

          <div className="relative z-10 mt-5">
            <CourseMeta
              status={c.status}
              startDate={c.startDate}
              deadline={c.deadline}
              seatsTotal={c.seatsTotal}
              seatsFilled={c.seatsFilled}
              enrolled={c.enrolled}
            />
          </div>

          <footer className="relative z-10 mt-auto flex items-end justify-between gap-3 pt-6">
            <div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim">
                all in
              </div>
              <div className="font-display text-3xl leading-none">
                {c.price}
              </div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <BuyCourseButton courseId={c.id} />
            </div>
          </footer>

          <div className="course-flip-hint" aria-hidden>
            <span className="stat-flip-dot" />
            <span>details</span>
          </div>
        </div>

        {/* BACK — subtitle, tagline, deliverables, for-whom */}
        <div className="course-face course-face-back">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] accent-red">
              {c.tag} · details
            </span>
            <span
              className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim"
              lang="bn"
            >
              {c.startDate}
            </span>
          </div>

          <p
            className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-dim"
            lang="bn"
          >
            {c.subtitle}
          </p>
          <p className="mt-2 italic-serif text-lg text-fg" lang="bn">
            {c.tagline}
          </p>

          <ul
            className="mt-5 space-y-2 text-sm text-muted"
            lang="bn"
          >
            {c.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1 w-3 bg-accent flex-shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <p
            className="mt-auto pt-5 text-xs italic-serif text-dim"
            lang="bn"
          >
            {c.for}
          </p>

          <div className="course-flip-back-hint" aria-hidden>
            ← back to summary
          </div>
        </div>
      </div>
    </article>
  );
}
