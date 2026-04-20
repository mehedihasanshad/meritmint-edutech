import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession, isAdmin } from '@/lib/auth';
import { query } from '@/lib/db';
import { DeleteExamButton } from './DeleteExamButton';

type ExamRow = {
  id: number;
  title: string;
  description: string | null;
  total_marks: number;
  duration_minutes: number;
  negative_marks: number;
  pass_marks: number;
  question_count: number;
};

export default async function AdminHome() {
  const session = await getSession();
  if (!session) redirect('/login?next=/admin');
  if (!isAdmin(session)) redirect('/');

  const exams = await query<ExamRow>(
    `SELECT e.id, e.title, e.description, e.total_marks, e.duration_minutes,
            e.negative_marks, e.pass_marks,
            (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS question_count
     FROM exams e ORDER BY e.id DESC`
  );

  return (
    <section className="section">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="display-headline mt-4">
            Exams
            <span className="italic-serif text-muted"> · {exams.length}</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Create exams, add questions, configure timing and negative marking.
          </p>
        </div>
        <Link href="/admin/exams/new" className="btn-pill btn-pill-primary">
          + New exam
        </Link>
      </div>

      {exams.length === 0 ? (
        <div className="card-tilt mt-10 text-center italic-serif text-muted">
          No exams yet. Create your first one.
        </div>
      ) : (
        <ul className="mt-10 grid gap-4">
          {exams.map((e) => (
            <li key={e.id} className="card-tilt">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
                    Exam #{e.id}
                  </div>
                  <h2 className="mt-1 font-display text-2xl leading-tight">
                    {e.title}
                  </h2>
                  {e.description && (
                    <p className="mt-2 text-sm text-muted">{e.description}</p>
                  )}
                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
                    <Stat k="Questions" v={e.question_count} />
                    <Stat k="Total marks" v={e.total_marks} />
                    <Stat k="Pass" v={e.pass_marks} />
                    <Stat k="Duration" v={`${e.duration_minutes} min`} />
                    <Stat k="Negative" v={e.negative_marks || 'none'} />
                  </dl>
                </div>
                <div className="flex flex-shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/admin/exams/${e.id}`}
                    className="btn-pill btn-pill-ghost text-xs"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/exam/${e.id}`}
                    className="btn-pill btn-pill-ghost text-xs"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/leaderboard/${e.id}`}
                    className="btn-pill btn-pill-ghost text-xs"
                  >
                    Board
                  </Link>
                  <DeleteExamButton id={e.id} title={e.title} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Stat({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.62rem] uppercase tracking-[0.15em] text-dim">
        {k}
      </dt>
      <dd className="font-mono text-sm text-fg">{v}</dd>
    </div>
  );
}
