import { NextResponse } from 'next/server';
import { AdminDenied, requireAdmin } from '@/lib/auth';
import { execute } from '@/lib/db';

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
  ctx: { params: Promise<{ qid: string }> }
) {
  const denial = await guard();
  if (denial) return denial;
  const { qid } = await ctx.params;
  const questionId = Number(qid);
  if (!Number.isInteger(questionId) || questionId <= 0)
    return NextResponse.json({ error: 'invalid-id' }, { status: 400 });

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

  await execute(
    `UPDATE questions SET question = ?, opt_a = ?, opt_b = ?, opt_c = ?, opt_d = ?, correct = ?
     WHERE id = ?`,
    [question, opt_a, opt_b, opt_c, opt_d, correct, questionId]
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ qid: string }> }
) {
  const denial = await guard();
  if (denial) return denial;
  const { qid } = await ctx.params;
  const questionId = Number(qid);
  if (!Number.isInteger(questionId) || questionId <= 0)
    return NextResponse.json({ error: 'invalid-id' }, { status: 400 });
  await execute('DELETE FROM questions WHERE id = ?', [questionId]);
  return NextResponse.json({ ok: true });
}
