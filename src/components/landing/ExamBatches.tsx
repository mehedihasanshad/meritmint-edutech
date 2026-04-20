import Link from 'next/link';
import { query } from '@/lib/db';

type Exam = {
  id: number;
  title: string;
  total_marks: number;
  duration_minutes: number;
  pass_marks: number;
  question_count: number;
};

export async function ExamBatches() {
  let exams: Exam[] = [];
  try {
    exams = await query<Exam>(
      `SELECT e.id, e.title, e.total_marks, e.duration_minutes, e.pass_marks,
              (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS question_count
       FROM exams e ORDER BY e.id DESC`
    );
  } catch {
    exams = [];
  }

  return (
    <section id="exams" className="section">
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
            <li key={e.id} className="card-tilt flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent animate-ticker-pulse" />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim">
                    live · open seats
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight">{e.title}</h3>
                <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
                  <Tag label="Questions" value={e.question_count} />
                  <Tag label="Marks" value={e.total_marks} />
                  <Tag label="Duration" value={`${e.duration_minutes} min`} />
                  {e.pass_marks > 0 && (
                    <Tag label="Pass" value={e.pass_marks} />
                  )}
                </dl>
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

function Tag({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.6rem] uppercase tracking-[0.15em] text-dim">
        {label}
      </dt>
      <dd className="font-mono text-sm text-fg">{value}</dd>
    </div>
  );
}
