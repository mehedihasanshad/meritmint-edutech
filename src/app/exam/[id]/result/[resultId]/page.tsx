import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

type ResultRow = {
  id: number;
  user_id: number;
  exam_id: number;
  score: number;
  details: string;
  created_at: string;
  time_taken_seconds: number | null;
};

type ExamRow = {
  id: number;
  title: string;
  total_marks: number;
  pass_marks: number;
  duration_minutes: number;
  negative_marks: number;
};

type QuestionRow = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
};

type StoredDetails = {
  details: {
    questionId: number;
    given: string | null;
    correct: string;
    isCorrect: boolean;
  }[];
  totals: {
    correct: number;
    wrong: number;
    skipped: number;
    totalQuestions: number;
    totalMarks: number;
    negativeMarks: number;
    passMarks: number;
    passed: boolean;
  };
};

function fmt(seconds: number | null): string {
  if (!seconds || seconds <= 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string; resultId: string }>;
}) {
  const session = await getSession();
  const { id, resultId: rid } = await params;
  const examId = Number(id);
  const resultId = Number(rid);
  if (
    !Number.isInteger(examId) ||
    examId <= 0 ||
    !Number.isInteger(resultId) ||
    resultId <= 0
  )
    notFound();
  if (!session) redirect(`/login?next=/exam/${examId}/result/${resultId}`);

  const result = await queryOne<ResultRow>(
    'SELECT * FROM results WHERE id = ? AND user_id = ?',
    [resultId, session.userId]
  );
  if (!result) notFound();

  const exam = await queryOne<ExamRow>(
    'SELECT id, title, total_marks, pass_marks, duration_minutes, negative_marks FROM exams WHERE id = ?',
    [examId]
  );
  if (!exam) notFound();

  let parsed: StoredDetails;
  try {
    parsed = JSON.parse(result.details);
  } catch {
    notFound();
  }

  const questions = await query<QuestionRow>(
    'SELECT id, question, opt_a, opt_b, opt_c, opt_d FROM questions WHERE exam_id = ? ORDER BY id',
    [examId]
  );

  const detailsMap = new Map(parsed.details.map((d) => [d.questionId, d]));
  const pct = Math.round((result.score / exam.total_marks) * 100);
  const passed = parsed.totals.passed;

  // Rank among all leaderboard entries for this exam
  const rank = await queryOne<{ n: number }>(
    `SELECT (1 + (SELECT COUNT(*) FROM leaderboard
       WHERE exam_id = ? AND score > ?)) AS n`,
    [examId, result.score]
  );
  const totalAttempts = await queryOne<{ n: number }>(
    'SELECT COUNT(*) AS n FROM leaderboard WHERE exam_id = ?',
    [examId]
  );

  return (
    <section className="section">
      <div className="flex flex-col items-start gap-3">
        <span className="eyebrow">Result · {exam.title}</span>
        <h1 className="display-giant">
          {passed ? (
            <>
              Passed.{' '}
              <span className="italic-serif accent-red">Nice.</span>
            </>
          ) : (
            <>
              Not yet.{' '}
              <span className="italic-serif text-muted">Try again.</span>
            </>
          )}
        </h1>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[auto_1fr]">
        <ResultRing score={result.score} total={exam.total_marks} passed={passed} />

        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatTile k="Correct" v={parsed.totals.correct} accent="fg" />
          <StatTile k="Wrong" v={parsed.totals.wrong} accent="red" />
          <StatTile k="Skipped" v={parsed.totals.skipped} accent="muted" />
          <StatTile
            k="Percentage"
            v={`${pct}%`}
            accent={passed ? 'fg' : 'red'}
          />
          <StatTile
            k="Time taken"
            v={fmt(result.time_taken_seconds)}
            accent="muted"
          />
          <StatTile
            k="Rank"
            v={rank ? `#${rank.n} / ${totalAttempts?.n ?? '—'}` : '—'}
            accent="muted"
          />
          <StatTile
            k="Pass mark"
            v={exam.pass_marks || 'any'}
            accent="muted"
          />
          <StatTile
            k="Negative"
            v={exam.negative_marks ? `–${exam.negative_marks}` : 'none'}
            accent="muted"
          />
        </dl>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link href={`/leaderboard/${examId}`} className="btn-pill btn-pill-primary">
          View leaderboard
        </Link>
        <Link href="/dashboard" className="btn-pill btn-pill-ghost">
          Go to dashboard
        </Link>
        <Link href={`/exam/${examId}`} className="btn-pill btn-pill-ghost">
          Retake
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="display-headline">
          Review <span className="italic-serif text-muted">every answer.</span>
        </h2>
        <ol className="mt-8 space-y-4">
          {questions.map((q, idx) => {
            const d = detailsMap.get(q.id);
            const given = d?.given ?? null;
            const correct = d?.correct ?? '';
            const isCorrect = d?.isCorrect ?? false;
            const isSkipped = given === null;
            const tone = isSkipped
              ? 'tone-skipped'
              : isCorrect
              ? 'tone-correct'
              : 'tone-wrong';
            return (
              <li key={q.id} className={`review-card ${tone}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim">
                      Q{idx + 1}
                    </div>
                    <p className="mt-1 font-medium">{q.question}</p>
                  </div>
                  <span
                    className={`review-badge ${
                      isSkipped
                        ? 'badge-skipped'
                        : isCorrect
                        ? 'badge-correct'
                        : 'badge-wrong'
                    }`}
                  >
                    {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Wrong'}
                  </span>
                </div>
                <ul className="mt-3 grid gap-1 text-sm">
                  {(
                    [
                      ['a', q.opt_a],
                      ['b', q.opt_b],
                      ['c', q.opt_c],
                      ['d', q.opt_d],
                    ] as [string, string][]
                  ).map(([k, v]) => {
                    const isRight = k === correct;
                    const isYours = k === given;
                    return (
                      <li
                        key={k}
                        className={`flex items-start gap-2 rounded-md px-2 py-1 ${
                          isRight
                            ? 'review-option-correct'
                            : isYours
                            ? 'review-option-wrong'
                            : 'text-muted'
                        }`}
                      >
                        <span className="font-mono text-xs uppercase">
                          {k}
                        </span>
                        <span className="flex-1">{v}</span>
                        {isRight && <span>✓ correct</span>}
                        {isYours && !isRight && <span>your answer</span>}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function StatTile({
  k,
  v,
  accent,
}: {
  k: string;
  v: React.ReactNode;
  accent: 'fg' | 'red' | 'muted';
}) {
  const color =
    accent === 'red' ? 'accent-red' : accent === 'muted' ? 'text-muted' : 'text-fg';
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
      }}
    >
      <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-dim">
        {k}
      </dt>
      <dd className={`mt-1 font-display text-3xl leading-none ${color}`}>
        {v}
      </dd>
    </div>
  );
}

function ResultRing({
  score,
  total,
  passed,
}: {
  score: number;
  total: number;
  passed: boolean;
}) {
  const pct = total > 0 ? Math.min(100, (score / total) * 100) : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;
  const color = passed ? 'rgba(255, 255, 255, 0.9)' : '#ff3b30';
  return (
    <div className="result-ring">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="result-ring-inner">
        <div className="font-display text-5xl leading-none">{score}</div>
        <div className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-dim">
          of {total}
        </div>
      </div>
    </div>
  );
}
