import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';

type Row = {
  user_id: number;
  username: string;
  score: number;
  created_at: string;
};

type Exam = { id: number; title: string };

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId: raw } = await params;
  const examId = Number(raw);
  if (!Number.isInteger(examId) || examId <= 0) notFound();

  const db = getDb();
  const exam = db
    .prepare('SELECT id, title FROM exams WHERE id = ?')
    .get(examId) as Exam | undefined;
  if (!exam) notFound();

  const rows = db
    .prepare(
      `SELECT l.user_id, l.score, l.created_at, u.username
       FROM leaderboard l JOIN users u ON u.id = l.user_id
       WHERE l.exam_id = ?
       ORDER BY score DESC, created_at ASC LIMIT 50`
    )
    .all(examId) as Row[];

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <p className="mt-1 text-sm text-white/60">{exam.title}</p>
      <div className="glass mt-6 rounded-xl p-5">
        {rows.length === 0 ? (
          <p className="text-white/60">No submissions yet.</p>
        ) : (
          <ol className="space-y-2">
            {rows.map((r, idx) => (
              <li
                key={`${r.user_id}-${r.created_at}`}
                className="glass flex items-center justify-between rounded-lg p-3 text-sm"
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 text-white/60">#{idx + 1}</span>
                  <span>{r.username}</span>
                </span>
                <span>Score: {r.score}</span>
                <span className="text-white/50">
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
