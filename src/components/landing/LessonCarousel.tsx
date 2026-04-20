'use client';

type Lesson = {
  level: string;
  subject: string;
  chapter: string;
  duration: string;
  accent?: boolean;
};

const LESSONS: Lesson[] = [
  { level: 'HSC · 2nd Year', subject: 'Physics', chapter: 'Semiconductors & Digital Logic', duration: '32m' },
  { level: 'Medical Admission', subject: 'Biology', chapter: 'Human Physiology — Endocrine', duration: '41m', accent: true },
  { level: 'BUET Admission', subject: 'Higher Math', chapter: 'Vectors & 3D Geometry', duration: '28m' },
  { level: 'HSC · 1st Year', subject: 'Chemistry', chapter: 'Organic — Reaction Mechanisms', duration: '38m' },
  { level: 'DU · IBA', subject: 'English', chapter: 'Sentence Correction Drill', duration: '22m' },
  { level: 'HSC · 2nd Year', subject: 'ICT', chapter: 'Algorithms — Sorting', duration: '19m' },
  { level: 'Medical Admission', subject: 'Chemistry', chapter: 'Coordination Compounds', duration: '35m' },
  { level: 'HSC · 1st Year', subject: 'Bangla', chapter: 'উচ্চতর ব্যাকরণ — সমাস', duration: '24m' },
  { level: 'BUET Admission', subject: 'Physics', chapter: 'Rotational Mechanics', duration: '44m', accent: true },
  { level: 'DU Admission', subject: 'GK', chapter: 'Bangladesh Constitution — Quick Revise', duration: '17m' },
];

export function LessonCarousel() {
  return (
    <section className="section">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <Dot /> Inside the vault
          </span>
          <h2 className="display-headline mt-4">
            640+ lessons.
            <br />
            <span className="italic-serif accent-red">Pick a chapter. Go.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right">
          Every lesson sits in its own card — subject, chapter, runtime up
          front. Drag the row or scroll to browse.
        </p>
      </div>

      <div className="lesson-scroll" role="region" aria-label="Sample lessons">
        {LESSONS.map((l, i) => (
          <article key={i} className={`lesson-card ${l.accent ? 'lesson-card-accent' : ''}`}>
            <div className="lesson-thumb">
              <SubjectGlyph subject={l.subject} />
              <span className="lesson-play" aria-hidden>
                <PlayIcon />
              </span>
              <span className="lesson-duration">{l.duration}</span>
            </div>
            <div className="lesson-meta">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim">
                {l.level}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide accent-red">
                {l.subject}
              </div>
              <h3 className="mt-1.5 font-display text-[1.15rem] leading-snug">
                {l.chapter}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-ticker-pulse" />
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SubjectGlyph({ subject }: { subject: string }) {
  const key = subject.toLowerCase();
  // Minimal, palette-only iconography — one SVG per subject family
  if (key.includes('phys')) return <Circ text="Φ" />;
  if (key.includes('chem')) return <Circ text="⚗" />;
  if (key.includes('bio')) return <Circ text="🧬" plain />;
  if (key.includes('math')) return <Circ text="∫" />;
  if (key.includes('eng')) return <Circ text="A" />;
  if (key.includes('ict')) return <Circ text="{ }" mono />;
  if (key.includes('bangla')) return <Circ text="অ" />;
  return <Circ text="📖" plain />;
}

function Circ({
  text,
  mono,
  plain,
}: {
  text: string;
  mono?: boolean;
  plain?: boolean;
}) {
  return (
    <div className={`lesson-glyph ${mono ? 'lesson-glyph-mono' : ''} ${plain ? 'lesson-glyph-plain' : ''}`}>
      <span>{text}</span>
    </div>
  );
}
