export function WhatYouGet() {
  return (
    <section className="section">
      <div className="mb-10 max-w-3xl">
        <span className="eyebrow">What's Actually In The Box</span>
        <h2 className="display-headline mt-4">
          Notes, mocks, mentors —
          <br />
          <span className="italic-serif">and nobody upselling you.</span>
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <Panel className="md:col-span-7 md:row-span-2 min-h-[280px]" tone="dark">
          <span className="kicker-tag">
            <Dot /> Notes
          </span>
          <h3 className="mt-5 font-display text-4xl leading-none">
            340 chapter notes.
            <br />
            <span className="italic-serif text-muted">
              Written once. Rewritten till they clicked.
            </span>
          </h3>
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-muted">
            <NoteChip label="Physics" count="52" />
            <NoteChip label="Chemistry" count="48" />
            <NoteChip label="Biology" count="61" />
            <NoteChip label="Higher Math" count="44" />
            <NoteChip label="Bangla" count="38" />
            <NoteChip label="English" count="29" />
            <NoteChip label="ICT" count="22" />
            <NoteChip label="General" count="46" />
          </div>
        </Panel>

        <Panel className="md:col-span-5" tone="accent">
          <span className="kicker-tag">
            <Dot /> Mock Papers
          </span>
          <div className="mt-5 font-display text-[4.5rem] leading-none">47</div>
          <p className="mt-1 text-white/80">
            Full-length mocks calibrated against 6 years of past papers.
            You'll recognise the paper before you open it.
          </p>
        </Panel>

        <Panel className="md:col-span-5" tone="glass">
          <span className="kicker-tag">
            <Dot /> Mentors
          </span>
          <h3 className="mt-5 font-display text-3xl leading-tight">
            Actual toppers.
            <br />
            <span className="italic-serif">Not paid lookalikes.</span>
          </h3>
          <p className="mt-3 text-sm text-muted">
            MBBS students from DMC · engineers from BUET · varsity rankers from
            DU. They answer doubts, review mocks, and text you the night before
            the exam.
          </p>
        </Panel>

        <Panel className="md:col-span-4" tone="glass">
          <span className="kicker-tag">
            <Dot /> Leaderboard
          </span>
          <h3 className="mt-5 font-display text-3xl leading-tight">
            Rank before you
            <br />
            <span className="italic-serif">rank.</span>
          </h3>
          <p className="mt-3 text-sm text-muted">
            Every mock places you against the whole batch. See exactly where
            you stand, not where a pamphlet says you should.
          </p>
        </Panel>

        <Panel className="md:col-span-4" tone="dark">
          <span className="kicker-tag">
            <Dot /> Resource Books
          </span>
          <h3 className="mt-5 font-display text-3xl leading-tight">
            Printed. Shipped.
            <br />
            <span className="italic-serif">Actually useful.</span>
          </h3>
          <p className="mt-3 text-sm text-muted">
            Past-paper digest, formula booklet, weakness workbook — delivered
            nationwide within 4 days. Or read the PDFs. Whichever.
          </p>
        </Panel>

        <Panel className="md:col-span-4" tone="accent-soft">
          <span className="kicker-tag">
            <Dot /> Exam-Day Kit
          </span>
          <h3 className="mt-5 font-display text-3xl leading-tight">
            One-page plan for the
            <br />
            <span className="italic-serif">last 48 hours.</span>
          </h3>
          <p className="mt-3 text-sm text-muted">
            What to revise, what to skip, when to sleep, what to eat. Sent to
            your phone the morning before. Trust it.
          </p>
        </Panel>
      </div>
    </section>
  );
}

function Panel({
  children,
  className = '',
  tone = 'glass',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'glass' | 'dark' | 'accent' | 'accent-soft';
}) {
  const toneClass =
    tone === 'accent'
      ? 'bg-accent text-white border-transparent'
      : tone === 'accent-soft'
      ? 'border-accent/30 bg-[rgba(255,59,48,0.06)]'
      : tone === 'dark'
      ? 'bg-ink/40 border-white/10'
      : 'card-tilt';
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 md:p-7 ${toneClass} ${className}`}
      style={{
        backdropFilter: 'blur(10px) saturate(140%)',
        WebkitBackdropFilter: 'blur(10px) saturate(140%)',
      }}
    >
      {children}
    </div>
  );
}

function NoteChip({ label, count }: { label: string; count: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="text-xs text-dim">{label}</div>
      <div className="font-display text-xl leading-none">{count}</div>
    </div>
  );
}

function Dot() {
  return (
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-ticker-pulse" />
  );
}
