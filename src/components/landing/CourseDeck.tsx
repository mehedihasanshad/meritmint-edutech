import Link from 'next/link';
import Image from 'next/image';
import { BuyCourseButton } from '@/components/BuyCourseButton';

const COURSES = [
  {
    id: 1,
    tag: 'Full-Length',
    title: 'Course in Depth',
    tagline: 'পুরো syllabus, ঠিকঠাক।',
    price: '৳৩,২০০',
    length: '১৬ সপ্তাহ',
    deliverables: [
      '১২৪ recorded lesson · সব subject',
      'সাপ্তাহিক live doubt session',
      'Chapter-wise notes (PDF)',
      'Full-length mock × ৮',
    ],
    for: 'Admission যদি ৩+ মাস দূরে, আর সিরিয়াসলি preparation চাও।',
  },
  {
    id: 2,
    tag: 'Hot',
    title: 'Crash Course',
    tagline: 'ধারালো, দ্রুত, নির্দয়।',
    price: '৳১,৮০০',
    length: '৬ সপ্তাহ',
    deliverables: [
      '৪৮ recorded sprint lesson',
      'High-weightage chapter drill',
      'Condensed summary sheet',
      'Mock paper × ৪',
    ],
    for: '৬ সপ্তাহ বাকি, panic হচ্ছে? শ্বাস নাও, এটা দেখো।',
  },
  {
    id: 3,
    tag: 'Recorded',
    title: 'Sure Shot',
    tagline: 'যতদিন না আয়ত্তে, ততদিন দেখে যাও।',
    price: '৳১,১০০',
    length: 'lifetime access',
    deliverables: [
      'Pre-recorded · self-paced',
      'Past-paper weight অনুযায়ী topic hunting',
      'Revision-mode notes',
      'Mock paper × ২',
    ],
    for: 'Second-timer, repeater — যে একা পড়তে ভালোবাসে, তার জন্য।',
  },
];

export function CourseDeck() {
  return (
    <section id="courses" className="section">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">তিনভাবে ঢোকো</span>
          <h2 className="display-headline mt-4">
            <span lang="bn">তোমার সময়ের সাথে</span>
            <br />
            <span lang="bn" className="italic-serif">
              খাপ খায় এমন একটা।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          প্রতিটা course admission-grade। পার্থক্য শুধু গতিতে — quality-তে না।
          কোনো "premium plan" নেই যেটা ভালো জিনিস lock করে রাখবে।
        </p>
      </div>

      <div className="deck">
        {COURSES.map((c) => (
          <article key={c.id} className="deck-card group">
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
              <h3 className="mt-6 font-display text-4xl leading-none">
                {c.title}
              </h3>
              <p className="mt-2 italic-serif text-muted">{c.tagline}</p>
            </header>

            <div className="relative z-10 mt-6">
              <ul className="space-y-1.5 text-sm text-muted">
                {c.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1 w-3 bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs italic-serif text-dim">
                {c.for}
              </p>
            </div>

            <footer className="relative z-10 mt-7 flex items-end justify-between gap-3">
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim">
                  all in
                </div>
                <div className="font-display text-3xl leading-none">
                  {c.price}
                </div>
              </div>
              <BuyCourseButton courseId={c.id} />
            </footer>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-dim" lang="bn">
        কোনটা নিবে বুঝতে পারছ না?{' '}
        <Link href="#faq" className="underline underline-offset-4">
          আমরা কীভাবে choose করতাম পড়ে নাও →
        </Link>
      </div>
    </section>
  );
}
