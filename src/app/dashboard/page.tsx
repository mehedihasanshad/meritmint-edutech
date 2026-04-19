import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

type Purchase = {
  id: number;
  course_id: number;
  transaction_id: string;
  expires_at: string;
};
type Result = {
  id: number;
  exam_id: number;
  score: number;
  details: string;
  created_at: string;
  title: string;
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login?next=/dashboard');

  const purchases = await query<Purchase>(
    'SELECT id, course_id, transaction_id, expires_at FROM purchases WHERE user_id = ? ORDER BY id DESC',
    [session.userId]
  );
  const results = await query<Result>(
    `SELECT r.id, r.exam_id, r.score, r.details, r.created_at, e.title
     FROM results r JOIN exams e ON e.id = r.exam_id
     WHERE r.user_id = ? ORDER BY r.created_at DESC`,
    [session.userId]
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="glass mt-6 rounded-xl p-5">
        <h2 className="text-lg font-semibold">Purchases</h2>
        {purchases.length === 0 ? (
          <p className="mt-2 text-white/60">No purchases yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {purchases.map((p) => (
              <li
                key={p.id}
                className="glass flex flex-wrap items-center justify-between rounded-lg p-3 text-sm"
              >
                <span>Course #{p.course_id}</span>
                <span className="text-white/60">Tx: {p.transaction_id}</span>
                <span className="text-white/60">
                  Expires: {new Date(p.expires_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="glass mt-6 rounded-xl p-5">
        <h2 className="text-lg font-semibold">Results</h2>
        {results.length === 0 ? (
          <p className="mt-2 text-white/60">No results yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {results.map((r) => (
              <li
                key={r.id}
                className="glass flex flex-wrap items-center justify-between rounded-lg p-3 text-sm"
              >
                <span>{r.title}</span>
                <span>Score: {r.score}</span>
                <span className="text-white/60">
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
