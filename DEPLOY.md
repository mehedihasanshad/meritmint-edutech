# Deploying MeritMint

The app uses **libSQL** (SQLite over HTTP) via [Turso](https://turso.tech) so it
runs on Vercel's read-only serverless filesystem without changes.

## Local development

```bash
npm install
cp .env.example .env.local
# Fill AUTH_SECRET (any 32+ random chars)
# Leave TURSO_* blank — dev falls back to ./data/meritmint.db
npm run dev
```

The database is created and seeded automatically on first request.

## Production (Vercel)

### 1. Create a Turso database (one time)

```bash
curl -sSfL https://get.tur.so/install.sh | bash   # install CLI
turso auth signup                                  # or login
turso db create meritmint
turso db show meritmint --url                      # copy URL
turso db tokens create meritmint                   # copy token
```

### 2. Add environment variables in Vercel

Project → Settings → Environment Variables, add for **Production** (and
Preview if you want):

| Name | Value |
| --- | --- |
| `AUTH_SECRET` | 32+ random chars — `openssl rand -hex 32` |
| `TURSO_DATABASE_URL` | `libsql://meritmint-<org>.turso.io` |
| `TURSO_AUTH_TOKEN` | the token from step 1 |

### 3. Deploy

```bash
git push origin main
```

Vercel auto-deploys. Schema + demo exam seed run on first request.

## Notes

- `data/` is in `.gitignore`. The local SQLite file never ships to the repo.
- Cold starts are a single RTT to Turso (usually <100ms).
- To wipe/reseed: `turso db shell meritmint "DROP TABLE exams"` (then redeploy).
