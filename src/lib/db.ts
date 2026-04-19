import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'meritmint.db');

declare global {
  var __meritmintDb: Database.Database | undefined;
}

function createDb(): Database.Database {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const fresh = !fs.existsSync(DB_PATH);
  const database = new Database(DB_PATH);
  database.pragma('journal_mode = WAL');
  database.pragma('foreign_keys = ON');

  database.exec(`
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
  `);

  if (fresh) seed(database);
  return database;
}

function seed(database: Database.Database) {
  const insertExam = database.prepare(
    'INSERT INTO exams (title, total_marks) VALUES (?, ?)'
  );
  const insertQ = database.prepare(
    'INSERT INTO questions (exam_id, question, opt_a, opt_b, opt_c, opt_d, correct) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const tx = database.transaction(() => {
    const info = insertExam.run('MeritMint Full Test — Demo (5 Qs)', 5);
    const examId = Number(info.lastInsertRowid);
    insertQ.run(examId, 'What is 2 + 2?', '3', '4', '5', '6', 'b');
    insertQ.run(examId, 'Capital of France?', 'Rome', 'Paris', 'Berlin', 'Madrid', 'b');
    insertQ.run(examId, 'Color of the sky on a clear day?', 'Green', 'Blue', 'Red', 'Yellow', 'b');
    insertQ.run(examId, '2 × 3 = ?', '5', '6', '7', '8', 'b');
    insertQ.run(examId, 'Sun rises from the?', 'West', 'North', 'East', 'South', 'c');
  });
  tx();
}

export function getDb(): Database.Database {
  if (!globalThis.__meritmintDb) {
    globalThis.__meritmintDb = createDb();
  }
  return globalThis.__meritmintDb;
}
