const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { initDb, db } = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'meritmint-secret-session',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Init DB
initDb();

// --- Auth ---
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'missing' });
  try {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = stmt.run(username, password);
    req.session.userId = info.lastInsertRowid;
    return res.json({ ok: true, userId: info.lastInsertRowid });
  } catch (err) {
    return res.status(400).json({ error: 'username-taken' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const row = db.prepare('SELECT id, username FROM users WHERE username = ? AND password = ?').get(username, password);
  if (!row) return res.status(401).json({ error: 'invalid' });
  req.session.userId = row.id;
  res.json({ ok: true, userId: row.id, username: row.username });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// --- Purchase by transaction id ---
app.post('/api/purchase', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'login' });
  const { courseId, transactionId, expiresDays } = req.body;
  if (!transactionId) return res.status(400).json({ error: 'missing-transaction' });
  const stmt = db.prepare('INSERT INTO purchases (user_id, course_id, transaction_id, expires_at) VALUES (?, ?, ?, ?)');
  const expires = new Date(Date.now() + (parseInt(expiresDays || 30, 10) * 24 * 60 * 60 * 1000)).toISOString();
  const info = stmt.run(userId, courseId || 1, transactionId, expires);
  res.json({ ok: true, purchaseId: info.lastInsertRowid, expires });
});

// --- Exams ---
app.get('/api/exams', (req, res) => {
  const rows = db.prepare('SELECT id, title, total_marks FROM exams').all();
  res.json(rows);
});

app.get('/api/exam/:id', (req, res) => {
  const id = req.params.id;
  const exam = db.prepare('SELECT id, title, total_marks FROM exams WHERE id = ?').get(id);
  if (!exam) return res.status(404).json({ error: 'not-found' });
  const qs = db.prepare('SELECT id, question, opt_a, opt_b, opt_c, opt_d, correct FROM questions WHERE exam_id = ?').all(id);
  // Remove correct answers for sending to client
  const publicQs = qs.map(q => ({ id: q.id, question: q.question, opt_a: q.opt_a, opt_b: q.opt_b, opt_c: q.opt_c, opt_d: q.opt_d }));
  res.json({ exam, questions: publicQs });
});

// Submit answers: receives {examId, answers: [{questionId, answer}] }
app.post('/api/submit', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'login' });
  const { examId, answers } = req.body;
  const qs = db.prepare('SELECT id, correct FROM questions WHERE exam_id = ?').all(examId);
  const correctMap = {};
  qs.forEach(q => (correctMap[q.id] = q.correct));
  let score = 0;
  const perQ = [];
  answers.forEach(a => {
    const correct = correctMap[a.questionId];
    const isCorrect = String(a.answer).toLowerCase() === String(correct).toLowerCase();
    if (isCorrect) score += 1;
    perQ.push({ questionId: a.questionId, given: a.answer, correct, isCorrect });
  });
  const totalMarks = score; // 1 mark per question; exam object can scale if needed
  const stmt = db.prepare('INSERT INTO results (user_id, exam_id, score, details, created_at) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(userId, examId, totalMarks, JSON.stringify(perQ), new Date().toISOString());

  // Update leaderboard table
  db.prepare('INSERT INTO leaderboard (exam_id, user_id, score, created_at) VALUES (?, ?, ?, ?)').run(examId, userId, totalMarks, new Date().toISOString());

  res.json({ ok: true, score: totalMarks, totalQuestions: qs.length, details: perQ });
});

app.get('/api/dashboard', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'login' });
  const purchases = db.prepare('SELECT id, course_id, transaction_id, expires_at FROM purchases WHERE user_id = ?').all(userId);
  const results = db.prepare('SELECT r.id, r.exam_id, r.score, r.details, r.created_at, e.title FROM results r JOIN exams e ON e.id = r.exam_id WHERE r.user_id = ? ORDER BY r.created_at DESC').all(userId);
  res.json({ purchases, results });
});

app.get('/api/leaderboard/:examId', (req, res) => {
  const examId = req.params.examId;
  const rows = db.prepare('SELECT l.user_id, l.score, l.created_at, u.username FROM leaderboard l JOIN users u ON u.id = l.user_id WHERE l.exam_id = ? ORDER BY score DESC, created_at ASC LIMIT 50').all(examId);
  res.json(rows);
});

// fallback to index for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
