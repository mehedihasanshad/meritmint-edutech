import Link from 'next/link';
import { notFound } from 'next/navigation';
import { query, queryOne } from '@/lib/db';

type Row = {
  user_id: number;
  username: string;
  score: number;
  created_at: string;
};

type Exam = {
  id: number;
  title: string;
  total_marks: number;
  duration_minutes: number;
};

function medal(rank: number): string | null {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
}

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId: raw } = await params;
  const examId = Number(raw);
  if (!Number.isInteger(examId) || examId <= 0) notFound();

  const exam = await queryOne<Exam>(
    'SELECT id, title, total_marks, duration_minutes FROM exams WHERE id = ?',
    [examId]
  );
  if (!exam) notFound();

  const rows = await query<Row>(
    `SELECT l.user_id, l.score, l.created_at, u.username
     FROM leaderboard l JOIN users u ON u.id = l.user_id
     WHERE l.exam_id = ?
     ORDER BY score DESC, created_at ASC LIMIT 100`,
    [examId]
  );

  const totalAttempts = rows.length;
  const avgScore =
    totalAttempts > 0
      ? (rows.reduce((sum, r) => sum + r.score, 0) / totalAttempts).toFixed(1)
      : '—';
  const top = rows[0];

  return (
    <section className="section">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Leaderboard</span>
          <h1 className="display-headline mt-4">{exam.title}</h1>
          <p className="mt-2 text-sm text-muted">
            Total marks {exam.total_marks} · {exam.duration_minutes} min ·{' '}
            {totalAttempts} {totalAttempts === 1 ? 'attempt' : 'attempts'}
          </p>
        </div>
        <Link href={`/exam/${examId}`} className="btn-pill btn-pill-primary">
          Take this exam
        </Link>
      </div>

      {totalAttempts > 0 && (
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <StatBlock
            label="Top scorer"
            value={top?.username ?? '—'}
            note={`Score ${top?.score}`}
          />
          <StatBlock label="Total attempts" value={String(totalAttempts)} note="" />
          <StatBlock label="Average score" value={String(avgScore)} note={`of ${exam.total_marks}`} />
        </div>
      )}

      <div className="mt-10">
        {rows.length === 0 ? (
          <div className="card-tilt text-center italic-serif text-muted">
            No submissions yet. Be the first.
          </div>
        ) : (
          <ol className="space-y-2">
            {rows.map((r, idx) => {
              const rank = idx + 1;
              const m = medal(rank);
              const pct = Math.round((r.score / exam.total_marks) * 100);
              return (
                <li
                  key={`${r.user_id}-${r.created_at}`}
                  className={`lb-row ${rank <= 3 ? 'lb-row-top' : ''}`}
                >
                  <div className="lb-rank">
                    {m ? <span className="text-2xl leading-none">{m}</span> : `#${rank}`}
                  </div>
                  <div className="lb-user">
                    <div className="font-medium">{r.username}</div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim">
                      {new Date(r.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="lb-bar">
                    <div
                      className="lb-bar-fill"
                      style={{ width: `${pct}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="lb-score">
                    <div className="font-display text-2xl leading-none">
                      {r.score}
                    </div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-dim">
                      {pct}%
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}

function StatBlock({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="card-tilt">
      <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl leading-none">{value}</div>
      {note && (
        <div className="mt-1 text-xs italic-serif text-muted">{note}</div>
      )}
    </div>
  );
}
