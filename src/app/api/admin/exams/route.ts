import { NextResponse } from 'next/server';
import { AdminDenied, requireAdmin } from '@/lib/auth';
import { execute, query } from '@/lib/db';

type ExamPayload = {
  title?: unknown;
  description?: unknown;
  total_marks?: unknown;
  duration_minutes?: unknown;
  negative_marks?: unknown;
  pass_marks?: unknown;
};

function parse(body: ExamPayload) {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const description =
    typeof body.description === 'string' ? body.description.trim() : '';
  const total_marks = Number(body.total_marks);
  const duration_minutes = Number(body.duration_minutes);
  const negative_marks = Number(body.negative_marks);
  const pass_marks = Number(body.pass_marks);

  if (!title) return { error: 'title-required' as const };
  if (!Number.isInteger(total_marks) || total_marks <= 0)
    return { error: 'invalid-total-marks' as const };
  if (!Number.isInteger(duration_minutes) || duration_minutes <= 0)
    return { error: 'invalid-duration' as const };
  if (!Number.isFinite(negative_marks) || negative_marks < 0)
    return { error: 'invalid-negative' as const };
  if (!Number.isInteger(pass_marks) || pass_marks < 0 || pass_marks > total_marks)
    return { error: 'invalid-pass' as const };

  return {
    ok: true as const,
    data: { title, description, total_marks, duration_minutes, negative_marks, pass_marks },
  };
}

export async function GET() {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof AdminDenied)
      return NextResponse.json({ error: 'admin-only' }, { status: 403 });
    throw e;
  }
  const exams = await query(
    `SELECT e.id, e.title, e.description, e.total_marks, e.duration_minutes,
            e.negative_marks, e.pass_marks,
            (SELECT COUNT(*) FROM questions q WHERE q.exam_id = e.id) AS question_count
     FROM exams e ORDER BY e.id DESC`
  );
  return NextResponse.json(exams);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof AdminDenied)
      return NextResponse.json({ error: 'admin-only' }, { status: 403 });
    throw e;
  }
  const body = (await req.json().catch(() => ({}))) as ExamPayload;
  const parsed = parse(body);
  if ('error' in parsed)
    return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { title, description, total_marks, duration_minutes, negative_marks, pass_marks } =
    parsed.data;
  const res = await execute(
    `INSERT INTO exams (title, description, total_marks, duration_minutes, negative_marks, pass_marks)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description || null, total_marks, duration_minutes, negative_marks, pass_marks]
  );
  return NextResponse.json({ ok: true, id: res.lastInsertRowid });
}
