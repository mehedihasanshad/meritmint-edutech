import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';

type Answer = { questionId: number; answer: string | null };
type CorrectRow = { id: number; correct: string };
type ExamRow = {
  id: number;
  total_marks: number;
  negative_marks: number;
  pass_marks: number;
};

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'login' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const examId = Number(body.examId);
  const answers: Answer[] = Array.isArray(body.answers) ? body.answers : [];
  const timeTakenSecondsRaw = Number(body.timeTakenSeconds);
  const timeTakenSeconds =
    Number.isFinite(timeTakenSecondsRaw) && timeTakenSecondsRaw > 0
      ? Math.floor(timeTakenSecondsRaw)
      : null;

  if (!Number.isInteger(examId) || examId <= 0) {
    return NextResponse.json({ error: 'invalid-exam' }, { status: 400 });
  }

  const exam = await queryOne<ExamRow>(
    `SELECT id, total_marks, negative_marks, pass_marks FROM exams WHERE id = ?`,
    [examId]
  );
  if (!exam) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }

  const rows = await query<CorrectRow>(
    'SELECT id, correct FROM questions WHERE exam_id = ?',
    [examId]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: 'exam-empty' }, { status: 404 });
  }

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const details = rows.map((r) => {
    const submitted = answers.find((a) => Number(a.questionId) === r.id);
    const given = submitted?.answer ? String(submitted.answer).toLowerCase() : null;
    const correctAnswer = r.correct.toLowerCase();
    const isCorrect = given !== null && given === correctAnswer;
    if (given === null) skippedCount += 1;
    else if (isCorrect) correctCount += 1;
    else wrongCount += 1;
    return {
      questionId: r.id,
      given,
      correct: correctAnswer,
      isCorrect,
    };
  });

  const rawScore = correctCount - wrongCount * Number(exam.negative_marks || 0);
  const score = Math.max(0, Math.round(rawScore * 100) / 100);
  const passed =
    exam.pass_marks > 0 ? score >= exam.pass_marks : score > 0;

  const now = new Date().toISOString();
  const inserted = await execute(
    `INSERT INTO results (user_id, exam_id, score, details, created_at, time_taken_seconds)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      session.userId,
      examId,
      score,
      JSON.stringify({
        details,
        totals: {
          correct: correctCount,
          wrong: wrongCount,
          skipped: skippedCount,
          totalQuestions: rows.length,
          totalMarks: exam.total_marks,
          negativeMarks: exam.negative_marks,
          passMarks: exam.pass_marks,
          passed,
        },
      }),
      now,
      timeTakenSeconds,
    ]
  );
  const resultId = inserted.lastInsertRowid ?? 0;

  await execute(
    'INSERT INTO leaderboard (exam_id, user_id, score, created_at) VALUES (?, ?, ?, ?)',
    [examId, session.userId, score, now]
  );

  return NextResponse.json({
    ok: true,
    resultId,
    score,
    totalQuestions: rows.length,
    correct: correctCount,
    wrong: wrongCount,
    skipped: skippedCount,
    passed,
  });
}
