# MeritMint — Minimal Edutech Demo

This repository is a minimal, runnable starting point for the MeritMint edutech platform you described. It includes:

- Express backend (SQLite) with user auth (session), purchase-by-transaction-id, exam endpoints, submit scoring and a leaderboard.
- Static frontend (glassmorphism style) showing hero/courses, purchase flow, login/register, exam-taking UI with immediate answer reveal and dashboard.

Note: This is a demo scaffold. Replace the logo images in `public/assets` with your attached MeritMint images to use your branding.

Quick start

1. Install dependencies

```sh
cd "/home/shad143/Documents/Vs Code MT Folder"
npm install
```

2. Run the server

```sh
npm run dev
```

3. Open http://localhost:4000 in your browser.

How to use

- Register or login via the Login button.
- Buy a course by clicking Buy — enter a transaction id (any string) to simulate a purchase.
- Take the demo exam in Running Exam Batches; after submitting you'll see immediate per-question feedback and your result saved to Dashboard.

Next steps to make it production-ready (suggested)

- Use hashed passwords (bcrypt) instead of plain text.
- Use a proper authentication system (JWT/OAuth) and secure sessions.
- Integrate payment gateway and validate transaction ids server-side.
- Expand the question system to support images, code blocks, and time limits.
- Add admin UI to create exam batches and import questions.
