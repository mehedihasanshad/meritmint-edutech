import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ examId: string }> }
) {
  const { examId: raw } = await ctx.params;
  const examId = Number(raw);
  if (!Number.isInteger(examId) || examId <= 0) {
    return NextResponse.json({ error: 'invalid-exam' }, { status: 400 });
  }
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT l.user_id, l.score, l.created_at, u.username
       FROM leaderboard l JOIN users u ON u.id = l.user_id
       WHERE l.exam_id = ?
       ORDER BY score DESC, created_at ASC LIMIT 50`
    )
    .all(examId);
  return NextResponse.json(rows);
}
