const path = require('path');
const fs = require('fs');
const Database = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'meritmint.db');

let db;

function initDb() {
  const exists = fs.existsSync(DB_PATH);
  db = new Database.Database(DB_PATH);
  if (!exists) {
    // create schema
    db.serialize(() => {
      db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)`);
      db.run(`CREATE TABLE purchases (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, course_id INTEGER, transaction_id TEXT, expires_at TEXT)`);
      db.run(`CREATE TABLE exams (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, total_marks INTEGER)`);
      db.run(`CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, exam_id INTEGER, question TEXT, opt_a TEXT, opt_b TEXT, opt_c TEXT, opt_d TEXT, correct TEXT)`);
      db.run(`CREATE TABLE results (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, exam_id INTEGER, score INTEGER, details TEXT, created_at TEXT)`);
      db.run(`CREATE TABLE leaderboard (id INTEGER PRIMARY KEY AUTOINCREMENT, exam_id INTEGER, user_id INTEGER, score INTEGER, created_at TEXT)`);

      // seed sample exam and questions (5 questions -> 5 marks)
      db.run(`INSERT INTO exams (title, total_marks) VALUES ('MeritMint Full Test - 100 Marks (demo scaled to 5)', 100)` , function() {
        const examId = this.lastID;
        const qstmt = db.prepare('INSERT INTO questions (exam_id, question, opt_a, opt_b, opt_c, opt_d, correct) VALUES (?, ?, ?, ?, ?, ?, ?)');
        qstmt.run(examId, 'What is 2 + 2?', '3', '4', '5', '6', 'b');
        qstmt.run(examId, 'Capital of France?', 'Rome', 'Paris', 'Berlin', 'Madrid', 'b');
        qstmt.run(examId, 'Color of the sky on clear day?', 'Green', 'Blue', 'Red', 'Yellow', 'b');
        qstmt.run(examId, '2 * 3 = ?', '5', '6', '7', '8', 'b');
        qstmt.run(examId, 'Sun rises from the ?', 'West', 'North', 'East', 'South', 'c');
        qstmt.finalize();
      });
    });
  }
}

module.exports = { initDb, get db() { return db; }, db };
