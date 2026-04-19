import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

type ExamRow = { id: number; title: string; total_marks: number };
type QuestionRow = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const examId = Number(id);
  if (!Number.isInteger(examId) || examId <= 0) {
    return NextResponse.json({ error: 'invalid-id' }, { status: 400 });
  }
  const db = getDb();
  const exam = db
    .prepare('SELECT id, title, total_marks FROM exams WHERE id = ?')
    .get(examId) as ExamRow | undefined;
  if (!exam) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }

  const questions = db
    .prepare(
      'SELECT id, question, opt_a, opt_b, opt_c, opt_d FROM questions WHERE exam_id = ? ORDER BY id'
    )
    .all(examId) as QuestionRow[];

  return NextResponse.json({ exam, questions });
}
