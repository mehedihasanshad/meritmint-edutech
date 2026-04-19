import Link from 'next/link';
import Image from 'next/image';
import { BuyCourseButton } from '@/components/BuyCourseButton';

const COURSES = [
  {
    id: 1,
    tag: 'Full-Length',
    title: 'Course in Depth',
    tagline: 'The whole syllabus, properly.',
    price: '৳3,200',
    length: '16 weeks',
    deliverables: [
      '124 recorded lessons · all subjects',
      'Weekly live doubt clearing',
      'Chapter-wise notes (PDF)',
      'Full-length mock × 8',
    ],
    for: 'If you\'re starting 3+ months out and you want the real thing.',
  },
  {
    id: 2,
    tag: 'Hot',
    title: 'Crash Course',
    tagline: 'Sharp, fast, ruthless.',
    price: '৳1,800',
    length: '6 weeks',
    deliverables: [
      '48 recorded sprint lessons',
      'High-weightage chapter drills',
      'Condensed summary sheets',
      'Mock papers × 4',
    ],
    for: 'Six weeks out and panicking? Read this, then breathe.',
  },
  {
    id: 3,
    tag: 'Recorded',
    title: 'Sure Shot',
    tagline: 'Repeat it till you own it.',
    price: '৳1,100',
    length: 'lifetime access',
    deliverables: [
      'Pre-recorded, self-paced',
      'Topic hunting by past-paper weight',
      'Revision-mode notes',
      'Mock papers × 2',
    ],
    for: 'Second-timers, repeaters, or anyone who learns best alone.',
  },
];

export function CourseDeck() {
  return (
    <section id="courses" className="section">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">Three Ways In</span>
          <h2 className="display-headline mt-4">
            Pick the one that fits
            <br />
            <span className="italic-serif">your runway.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right">
          Every course is admission-grade. The difference is pace — not
          quality. No "premium plan" locking you out of the good stuff.
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

      <div className="mt-10 text-center text-sm text-dim">
        Not sure which?{' '}
        <Link href="#faq" className="underline underline-offset-4">
          Read how we'd pick for you →
        </Link>
      </div>
    </section>
  );
}
