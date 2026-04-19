import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (username.length < 3 || username.length > 32) {
    return NextResponse.json({ error: 'invalid-username' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'weak-password' }, { status: 400 });
  }

  const db = getDb();
  const existing = db
    .prepare('SELECT id FROM users WHERE username = ?')
    .get(username);
  if (existing) {
    return NextResponse.json({ error: 'username-taken' }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const info = db
    .prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    .run(username, hash);
  const userId = Number(info.lastInsertRowid);

  await createSession({ userId, username });
  return NextResponse.json({ ok: true, userId, username });
}
