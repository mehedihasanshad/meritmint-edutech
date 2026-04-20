import { NextResponse } from 'next/server';
import { AdminDenied, requireAdmin } from '@/lib/auth';
import { execute, queryOne } from '@/lib/db';

async function guard() {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof AdminDenied) {
      return NextResponse.json({ error: 'admin-only' }, { status: 403 });
    }
    throw e;
  }
  return null;
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const denial = await guard();
  if (denial) return denial;
  const { id } = await ctx.params;
  const examId = Number(id);
  if (!Number.isInteger(examId) || examId <= 0)
    return NextResponse.json({ error: 'invalid-id' }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const description =
    typeof body.description === 'string' ? body.description.trim() : '';
  const total_marks = Number(body.total_marks);
  const duration_minutes = Number(body.duration_minutes);
  const negative_marks = Number(body.negative_marks);
  const pass_marks = Number(body.pass_marks);

  if (!title)
    return NextResponse.json({ error: 'title-required' }, { status: 400 });
  if (!Number.isInteger(total_marks) || total_marks <= 0)
    return NextResponse.json({ error: 'invalid-total-marks' }, { status: 400 });
  if (!Number.isInteger(duration_minutes) || duration_minutes <= 0)
    return NextResponse.json({ error: 'invalid-duration' }, { status: 400 });
  if (!Number.isFinite(negative_marks) || negative_marks < 0)
    return NextResponse.json({ error: 'invalid-negative' }, { status: 400 });
  if (!Number.isInteger(pass_marks) || pass_marks < 0 || pass_marks > total_marks)
    return NextResponse.json({ error: 'invalid-pass' }, { status: 400 });

  const existing = await queryOne<{ id: number }>(
    'SELECT id FROM exams WHERE id = ?',
    [examId]
  );
  if (!existing)
    return NextResponse.json({ error: 'not-found' }, { status: 404 });

  await execute(
    `UPDATE exams SET title = ?, description = ?, total_marks = ?,
       duration_minutes = ?, negative_marks = ?, pass_marks = ?
     WHERE id = ?`,
    [title, description || null, total_marks, duration_minutes, negative_marks, pass_marks, examId]
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const denial = await guard();
  if (denial) return denial;
  const { id } = await ctx.params;
  const examId = Number(id);
  if (!Number.isInteger(examId) || examId <= 0)
    return NextResponse.json({ error: 'invalid-id' }, { status: 400 });
  await execute('DELETE FROM exams WHERE id = ?', [examId]);
  return NextResponse.json({ ok: true });
}
