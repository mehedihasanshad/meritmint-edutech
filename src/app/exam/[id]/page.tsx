import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { ExamForm } from '@/components/ExamForm';

type Exam = {
  id: number;
  title: string;
  description: string | null;
  total_marks: number;
  duration_minutes: number;
  negative_marks: number;
  pass_marks: number;
};

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

  const exam = await queryOne<Exam>(
    `SELECT id, title, description, total_marks, duration_minutes,
            negative_marks, pass_marks FROM exams WHERE id = ?`,
    [examId]
  );
  if (!exam) notFound();

  const questions = await query<Question>(
    'SELECT id, question, opt_a, opt_b, opt_c, opt_d FROM questions WHERE exam_id = ? ORDER BY id',
    [examId]
  );

  if (questions.length === 0) {
    return (
      <section className="section">
        <h1 className="display-headline">{exam.title}</h1>
        <p className="mt-4 italic-serif text-muted">
          This exam has no questions yet. Check back soon.
        </p>
      </section>
    );
  }

  return <ExamForm exam={exam} questions={questions} />;
}
