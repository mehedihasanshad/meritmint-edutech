# MeritMint — Next.js Edutech Platform

Minimal edutech demo rewritten on **Next.js 14 (App Router)**, TypeScript, Tailwind and SQLite.

## Features

- Register / login with bcrypt-hashed passwords and signed JWT cookie sessions (via `jose`).
- Course purchase flow by transaction id (mock).
- Exam taking with immediate per-question feedback and persisted results.
- Dashboard (purchases + results) and per-exam leaderboard.
- SQLite (better-sqlite3) with idempotent schema + seed, WAL mode, FK enforcement.

## Quick start

```sh
npm install
cp .env.local.example .env.local   # set AUTH_SECRET (>= 16 chars)
npm run dev
```

Open http://localhost:3000.

## Environment

| Var          | Purpose                              |
|--------------|--------------------------------------|
| `AUTH_SECRET`| HMAC key used to sign session JWTs.  |

## Project layout

```
src/
  app/              App Router pages + API route handlers
    api/            register, login, logout, me, purchase, exams, exam/[id], submit, dashboard, leaderboard/[examId]
    exam/[id]/      Exam taking page
    leaderboard/[examId]/
    dashboard/
    login/
  components/       Client components (forms, buttons)
  lib/
    db.ts           Singleton better-sqlite3 wrapper + schema/seed
    auth.ts         JWT cookie session helpers
data/meritmint.db   SQLite file (created on first run, git-ignored)
```

## Security notes / fixes applied

- Passwords now bcrypt-hashed (previously plaintext).
- Sessions are signed JWT cookies (`httpOnly`, `sameSite=lax`, `secure` in prod).
- Input validation on every route; sensible HTTP status codes.
- Correct answers never sent to the client in `GET /api/exam/:id`.
- Foreign keys enforced; transactional inserts on exam submission.

## Production TODO

- Payment gateway integration + server-side transaction validation.
- Admin UI for exam/question management.
- Rate limiting on auth routes.
- Question support for images, code blocks, timers, negative marking.
