import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getSession, isAdmin } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { ExamEditorForm } from '../ExamEditorForm';
import { QuestionsManager } from './QuestionsManager';

type ExamRow = {
  id: number;
  title: string;
  description: string | null;
  total_marks: number;
  duration_minutes: number;
  negative_marks: number;
  pass_marks: number;
};

type QuestionRow = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
  correct: string;
};

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;
  const examId = Number(id);
  if (!Number.isInteger(examId) || examId <= 0) notFound();
  if (!session) redirect(`/login?next=/admin/exams/${examId}`);
  if (!isAdmin(session)) redirect('/');

  const exam = await queryOne<ExamRow>(
    `SELECT id, title, description, total_marks, duration_minutes,
            negative_marks, pass_marks FROM exams WHERE id = ?`,
    [examId]
  );
  if (!exam) notFound();

  const questions = await query<QuestionRow>(
    'SELECT id, question, opt_a, opt_b, opt_c, opt_d, correct FROM questions WHERE exam_id = ? ORDER BY id',
    [examId]
  );

  return (
    <section className="section">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="eyebrow">
            <Link href="/admin" className="underline-offset-4 hover:underline">
              Admin
            </Link>{' '}
            · Exam #{exam.id}
          </span>
          <h1 className="display-headline mt-4">
            {exam.title}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/exam/${exam.id}`} className="btn-pill btn-pill-ghost">
            Preview as student
          </Link>
          <Link href={`/leaderboard/${exam.id}`} className="btn-pill btn-pill-ghost">
            Leaderboard
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-2xl">Settings</h2>
          <ExamEditorForm mode="edit" initial={exam} />
        </div>
        <div>
          <h2 className="font-display text-2xl">
            Questions{' '}
            <span className="italic-serif text-muted">· {questions.length}</span>
          </h2>
          <QuestionsManager examId={exam.id} initial={questions} />
        </div>
      </div>
    </section>
  );
}
