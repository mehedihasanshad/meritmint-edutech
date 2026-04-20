import { NextResponse } from 'next/server';
import { AdminDenied, requireAdmin } from '@/lib/auth';
import { execute, queryOne } from '@/lib/db';

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof AdminDenied)
      return NextResponse.json({ error: 'admin-only' }, { status: 403 });
    throw e;
  }
  const { id } = await ctx.params;
  const examId = Number(id);
  if (!Number.isInteger(examId) || examId <= 0)
    return NextResponse.json({ error: 'invalid-id' }, { status: 400 });

  const exam = await queryOne<{ id: number }>(
    'SELECT id FROM exams WHERE id = ?',
    [examId]
  );
  if (!exam) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  const opt_a = typeof body.opt_a === 'string' ? body.opt_a.trim() : '';
  const opt_b = typeof body.opt_b === 'string' ? body.opt_b.trim() : '';
  const opt_c = typeof body.opt_c === 'string' ? body.opt_c.trim() : '';
  const opt_d = typeof body.opt_d === 'string' ? body.opt_d.trim() : '';
  const correct =
    typeof body.correct === 'string' ? body.correct.trim().toLowerCase() : '';

  if (!question || !opt_a || !opt_b || !opt_c || !opt_d)
    return NextResponse.json({ error: 'missing-fields' }, { status: 400 });
  if (!['a', 'b', 'c', 'd'].includes(correct))
    return NextResponse.json({ error: 'invalid-correct' }, { status: 400 });

  const res = await execute(
    'INSERT INTO questions (exam_id, question, opt_a, opt_b, opt_c, opt_d, correct) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [examId, question, opt_a, opt_b, opt_c, opt_d, correct]
  );
  return NextResponse.json({ ok: true, id: res.lastInsertRowid });
}
