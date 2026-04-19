import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'login' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const courseId = Number(body.courseId);
  const transactionId =
    typeof body.transactionId === 'string' ? body.transactionId.trim() : '';
  const expiresDaysRaw = Number(body.expiresDays);
  const expiresDays = Number.isFinite(expiresDaysRaw) && expiresDaysRaw > 0 ? expiresDaysRaw : 30;

  if (!transactionId) {
    return NextResponse.json({ error: 'missing-transaction' }, { status: 400 });
  }
  if (!Number.isInteger(courseId) || courseId <= 0) {
    return NextResponse.json({ error: 'invalid-course' }, { status: 400 });
  }

  const expires = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000).toISOString();
  const db = getDb();
  const info = db
    .prepare(
      'INSERT INTO purchases (user_id, course_id, transaction_id, expires_at) VALUES (?, ?, ?, ?)'
    )
    .run(session.userId, courseId, transactionId, expires);

  return NextResponse.json({
    ok: true,
    purchaseId: Number(info.lastInsertRowid),
    expires,
  });
}
