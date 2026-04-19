import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { ExamForm } from '@/components/ExamForm';

type Exam = { id: number; title: string; total_marks: number };
type Question = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
};

export default async function ExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;
  const examId = Number(id);
  if (!Number.isInteger(examId) || examId <= 0) notFound();
  if (!session) redirect(`/login?next=/exam/${examId}`);

  const db = getDb();
  const exam = db
    .prepare('SELECT id, title, total_marks FROM exams WHERE id = ?')
    .get(examId) as Exam | undefined;
  if (!exam) notFound();

  const questions = db
    .prepare(
      'SELECT id, question, opt_a, opt_b, opt_c, opt_d FROM questions WHERE exam_id = ? ORDER BY id'
    )
    .all(examId) as Question[];

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{exam.title}</h1>
      <p className="mt-1 text-sm text-white/60">
        {questions.length} questions · 1 mark each
      </p>
      <ExamForm examId={exam.id} questions={questions} />
    </section>
  );
}
