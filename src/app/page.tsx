import Link from 'next/link';
import { getDb } from '@/lib/db';
import { BuyCourseButton } from '@/components/BuyCourseButton';

type Exam = { id: number; title: string; total_marks: number };

const COURSES = [
  {
    id: 1,
    title: 'Course in Depth',
    description: 'Comprehensive deep course for long-term preparation.',
  },
  {
    id: 2,
    title: 'Crash Course',
    description: 'Short focused crash course for fast improvement.',
  },
  {
    id: 3,
    title: 'Sure Shot (Recorded)',
    description: 'Recorded lessons, repeat any time.',
  },
];

export default function HomePage() {
  const exams = getDb()
    .prepare('SELECT id, title, total_marks FROM exams ORDER BY id')
    .all() as Exam[];

  return (
    <>
      <section className="flex items-center justify-center px-4 py-16">
        <div className="glass hero-card w-full max-w-5xl rounded-2xl p-10 text-center">
          <h1 className="text-5xl font-bold">MeritMint</h1>
          <p className="mt-2 text-white/70">Tension Gone. Grades On.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COURSES.map((c) => (
              <div key={c.id} className="glass rounded-xl p-5 text-left">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-white/60">{c.description}</p>
                <BuyCourseButton courseId={c.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="glass rounded-xl p-5">
          <h2 className="text-xl font-semibold">Running Exam Batches</h2>
          {exams.length === 0 ? (
            <p className="mt-2 text-white/60">No exam batches running.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {exams.map((e) => (
                <li
                  key={e.id}
                  className="glass flex items-center justify-between rounded-lg p-4"
                >
                  <div>
                    <strong>{e.title}</strong>
                    <p className="text-xs text-white/50">
                      Total marks: {e.total_marks}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/leaderboard/${e.id}`} className="btn-ghost">
                      Leaderboard
                    </Link>
                    <Link href={`/exam/${e.id}`} className="btn-secondary">
                      Take Exam
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
