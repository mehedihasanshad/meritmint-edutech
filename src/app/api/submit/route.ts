import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
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

  const db = getDb();
  const rows = db
    .prepare('SELECT id, correct FROM questions WHERE exam_id = ?')
    .all(examId) as CorrectRow[];
  if (rows.length === 0) {
    return NextResponse.json({ error: 'exam-empty' }, { status: 404 });
  }

  const correctMap = new Map<number, string>();
  rows.forEach((r) => correctMap.set(r.id, r.correct.toLowerCase()));

  let score = 0;
  const details = rows.map((r) => {
    const submitted = answers.find((a) => Number(a.questionId) === r.id);
    const given = submitted?.answer ? String(submitted.answer).toLowerCase() : null;
    const isCorrect = given !== null && given === r.correct.toLowerCase();
    if (isCorrect) score += 1;
    return { questionId: r.id, given, correct: r.correct, isCorrect };
  });

  const now = new Date().toISOString();
  const insertResult = db.prepare(
    'INSERT INTO results (user_id, exam_id, score, details, created_at) VALUES (?, ?, ?, ?, ?)'
  );
  const insertLb = db.prepare(
    'INSERT INTO leaderboard (exam_id, user_id, score, created_at) VALUES (?, ?, ?, ?)'
  );
  const tx = db.transaction(() => {
    insertResult.run(session.userId, examId, score, JSON.stringify(details), now);
    insertLb.run(examId, session.userId, score, now);
  });
  tx();

  return NextResponse.json({
    ok: true,
    score,
    totalQuestions: rows.length,
    details,
  });
}
