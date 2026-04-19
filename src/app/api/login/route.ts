import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { createSession } from '@/lib/auth';

type UserRow = { id: number; username: string; password_hash: string };

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username || !password) {
    return NextResponse.json({ error: 'missing' }, { status: 400 });
  }

  const user = await queryOne<UserRow>(
    'SELECT id, username, password_hash FROM users WHERE username = ?',
    [username]
  );

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return NextResponse.json({ error: 'invalid' }, { status: 401 });
  }

  await createSession({ userId: user.id, username: user.username });
  return NextResponse.json({ ok: true, userId: user.id, username: user.username });
}
