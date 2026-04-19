import Link from 'next/link';
import { query } from '@/lib/db';

type Exam = { id: number; title: string; total_marks: number };

export async function ExamBatches() {
  let exams: Exam[] = [];
  try {
    exams = await query<Exam>(
      'SELECT id, title, total_marks FROM exams ORDER BY id'
    );
  } catch {
    exams = [];
  }

  return (
    <section className="section">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <Live /> Running right now
          </span>
          <h2 className="display-headline mt-4">
            Live exam batches.
            <br />
            <span className="italic-serif">Join a paper in progress.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right">
          Open batches — take the exam, land on the leaderboard, compare
          yourself against today's students.
        </p>
      </div>

      {exams.length === 0 ? (
        <div className="card-tilt text-center italic-serif text-muted">
          No exam batches running right now. Next drop: Friday 9pm.
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {exams.map((e) => (
            <li key={e.id} className="card-tilt flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent animate-ticker-pulse" />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim">
                    live · open seats
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight">{e.title}</h3>
                <p className="mt-1 text-xs text-dim">
                  Total marks: <span className="font-mono">{e.total_marks}</span>
                </p>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Link href={`/leaderboard/${e.id}`} className="btn-pill btn-pill-ghost text-xs">
                  Board
                </Link>
                <Link href={`/exam/${e.id}`} className="btn-pill btn-pill-primary text-xs">
                  Take →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Live() {
  return (
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-ticker-pulse" />
  );
}
