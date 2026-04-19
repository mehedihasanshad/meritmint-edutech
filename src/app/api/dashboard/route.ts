import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'login' }, { status: 401 });
  }
  const purchases = await query(
    'SELECT id, course_id, transaction_id, expires_at FROM purchases WHERE user_id = ? ORDER BY id DESC',
    [session.userId]
  );
  const results = await query(
    `SELECT r.id, r.exam_id, r.score, r.details, r.created_at, e.title
     FROM results r JOIN exams e ON e.id = r.exam_id
     WHERE r.user_id = ? ORDER BY r.created_at DESC`,
    [session.userId]
  );
  return NextResponse.json({ user: session, purchases, results });
}
