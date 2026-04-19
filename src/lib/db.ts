import { createClient, type Client, type InValue } from '@libsql/client';
import fs from 'node:fs';
import path from 'node:path';

declare global {
  // eslint-disable-next-line no-var
  var __meritmintDb: Client | undefined;
  // eslint-disable-next-line no-var
  var __meritmintInit: Promise<void> | undefined;
}

function resolveUrl(): string {
  const envUrl = process.env.TURSO_DATABASE_URL?.trim();
  if (envUrl) return envUrl;

  const dataDir = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  } catch {
    // read-only fs (Vercel without Turso env): fall through to in-memory
    return ':memory:';
  }
  return `file:${path.join(dataDir, 'meritmint.db')}`;
}

function create(): Client {
  const url = resolveUrl();
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
  return createClient({ url, authToken });
}

export function getDb(): Client {
  if (!globalThis.__meritmintDb) {
    globalThis.__meritmintDb = create();
  }
  return globalThis.__meritmintDb;
}

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    transaction_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    total_marks INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    opt_a TEXT NOT NULL,
    opt_b TEXT NOT NULL,
    opt_c TEXT NOT NULL,
    opt_d TEXT NOT NULL,
    correct TEXT NOT NULL CHECK (correct IN ('a','b','c','d')),
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    exam_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    details TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_leaderboard_exam_score
    ON leaderboard(exam_id, score DESC, created_at ASC);
  CREATE INDEX IF NOT EXISTS idx_results_user
    ON results(user_id, created_at DESC);
`;

async function initOnce(): Promise<void> {
  const db = getDb();
  await db.executeMultiple(SCHEMA);

  const existing = await db.execute('SELECT COUNT(*) AS n FROM exams');
  const n = Number(existing.rows[0]?.n ?? 0);
  if (n === 0) {
    const seed = await db.execute({
      sql: 'INSERT INTO exams (title, total_marks) VALUES (?, ?)',
      args: ['MeritMint Full Test — Demo (5 Qs)', 5],
    });
    const examId = Number(seed.lastInsertRowid);
    const insertQ =
      'INSERT INTO questions (exam_id, question, opt_a, opt_b, opt_c, opt_d, correct) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await db.batch(
      [
        { sql: insertQ, args: [examId, 'What is 2 + 2?', '3', '4', '5', '6', 'b'] },
        { sql: insertQ, args: [examId, 'Capital of France?', 'Rome', 'Paris', 'Berlin', 'Madrid', 'b'] },
        { sql: insertQ, args: [examId, 'Color of the sky on a clear day?', 'Green', 'Blue', 'Red', 'Yellow', 'b'] },
        { sql: insertQ, args: [examId, '2 × 3 = ?', '5', '6', '7', '8', 'b'] },
        { sql: insertQ, args: [examId, 'Sun rises from the?', 'West', 'North', 'East', 'South', 'c'] },
      ],
      'write'
    );
  }
}

export function ensureDb(): Promise<void> {
  if (!globalThis.__meritmintInit) {
    globalThis.__meritmintInit = initOnce().catch((err) => {
      globalThis.__meritmintInit = undefined;
      throw err;
    });
  }
  return globalThis.__meritmintInit;
}

type Row = Record<string, unknown>;

function coerceRow<T>(row: Row): T {
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = typeof v === 'bigint' ? Number(v) : v;
  }
  return out as T;
}

export async function query<T>(sql: string, args: InValue[] = []): Promise<T[]> {
  await ensureDb();
  const res = await getDb().execute({ sql, args });
  return res.rows.map((r) => coerceRow<T>(r as unknown as Row));
}

export async function queryOne<T>(
  sql: string,
  args: InValue[] = []
): Promise<T | null> {
  const rows = await query<T>(sql, args);
  return rows[0] ?? null;
}

export async function execute(
  sql: string,
  args: InValue[] = []
): Promise<{ lastInsertRowid: number | null; rowsAffected: number }> {
  await ensureDb();
  const res = await getDb().execute({ sql, args });
  return {
    lastInsertRowid:
      res.lastInsertRowid === undefined || res.lastInsertRowid === null
        ? null
        : Number(res.lastInsertRowid),
    rowsAffected: res.rowsAffected,
  };
}

export async function batchWrite(
  stmts: { sql: string; args: InValue[] }[]
): Promise<void> {
  await ensureDb();
  await getDb().batch(stmts, 'write');
}
