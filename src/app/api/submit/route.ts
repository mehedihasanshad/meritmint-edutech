import { NextResponse } from 'next/server';
import { batchWrite, query } from '@/lib/db';
import { getSession } from '@/lib/auth';

type Answer = { questionId: number; answer: string | null };
type CorrectRow = { id: number; correct: string };

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'login' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const examId = Number(body.examId);
  const answers: Answer[] = Array.isArray(body.answers) ? body.answers : [];

  if (!Number.isInteger(examId) || examId <= 0) {
    return NextResponse.json({ error: 'invalid-exam' }, { status: 400 });
  }

  const rows = await query<CorrectRow>(
    'SELECT id, correct FROM questions WHERE exam_id = ?',
    [examId]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: 'exam-empty' }, { status: 404 });
  }

  let score = 0;
  const details = rows.map((r) => {
    const submitted = answers.find((a) => Number(a.questionId) === r.id);
    const given = submitted?.answer ? String(submitted.answer).toLowerCase() : null;
    const isCorrect = given !== null && given === r.correct.toLowerCase();
    if (isCorrect) score += 1;
    return { questionId: r.id, given, correct: r.correct, isCorrect };
  });

  const now = new Date().toISOString();
  await batchWrite([
    {
      sql: 'INSERT INTO results (user_id, exam_id, score, details, created_at) VALUES (?, ?, ?, ?, ?)',
      args: [session.userId, examId, score, JSON.stringify(details), now],
    },
    {
      sql: 'INSERT INTO leaderboard (exam_id, user_id, score, created_at) VALUES (?, ?, ?, ?)',
      args: [examId, session.userId, score, now],
    },
  ]);

  return NextResponse.json({
    ok: true,
    score,
    totalQuestions: rows.length,
    details,
  });
}
