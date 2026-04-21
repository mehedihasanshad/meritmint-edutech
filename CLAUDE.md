# MeritMint — Project notes for Claude

## Project overview

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v3
- Data: libSQL via `@libsql/client` — Turso in production, a local
  `file:./data/meritmint.db` in dev. Never reintroduce `better-sqlite3`
  (native module → breaks Vercel serverless).
- Auth: JWT cookie via `jose`; admin gate via `ADMIN_USERNAMES` env var
  (comma-separated list of usernames).
- Payment: bKash Send Money (`+8801751589525`) → student pastes TrxID
  in the purchase modal → manual verification.
- Audience: **non-science** Bangladeshi university admission (DU · JU ·
  BUP · JnU · IBA) — plus SSC-level academic, Spoken English,
  Competitive Math, and book-completion series (Master by Jahangir
  Alam and others).
- Brand: black + dark red (`#ff3b30`) + water-white glass in dark mode;
  pure-white → red watercolor blooms in light mode. Dark is default.
- Typography: Geist (Latin body), Instrument Serif → Fraunces (Latin
  display with WONK/SOFT/opsz axes), Hind Siliguri (Bangla body), Noto
  Serif Bengali (Bangla display), JetBrains Mono → Geist Mono (mono).

## Commit rules — CHUNK BY DEFAULT

**When the user asks to "commit all" (or any phrase that implies
shipping the current work), do NOT stage everything into one mega
commit.** Break the working-tree changes into **logical chunked
commits** by feature / concern, each with a proper descriptive message,
before touching the remote.

Standard chunking recipe:

1. Run `git status --short` and `git diff --stat HEAD` to see the
   surface of what's changed.
2. Group files by topic — one commit per topic. Common topics:
   - Dependency bumps (`package.json`, `package-lock.json`)
   - Schema / DB migrations (`src/lib/db.ts`, migration files)
   - A single new component + its CSS
   - A refactor of an existing section
   - Footer / nav / layout restructures
   - Copy rewrites
   - Design-system / token updates (`globals.css` palette + motion)
   - Bugfixes (grouped by root cause)
3. For each group: `git add <files>` → `git commit -m "<type: summary>"`
   with a HEREDOC body explaining **why**. Include the
   `Co-Authored-By: Claude Opus 4.7 (1M context)` trailer.
4. Never amend a shared commit to avoid losing history granularity.
5. Never `git add .` or `git add -A` — always name the files/paths.
6. Don't push unless the user explicitly says "push". When pushing,
   use `git push origin main` unless the user names a different
   remote/branch.
7. If a commit message references removing or migrating files,
   double-check with `git status` afterwards that the tree is clean.

Commit message style:

- Subject: imperative mood, ≤72 chars, no trailing period
- Body: wrap at 72 cols, explain why (not what — the diff shows what)
- Separate subject and body with a blank line
- Use bullet lists in the body when helpful

If the user asks to commit a single file or a single concern, skip the
chunking and commit that one concern.

## Execution defaults

- Auto mode is typically active — execute immediately, prefer action.
- Confirm before any destructive git action (`reset --hard`, `push
  --force`, `branch -D`). Never skip pre-commit hooks.
- Use the Edit tool (not `sed`), Read tool (not `cat`), Grep (not `rg`
  shelled out). Prefer dedicated tools.
- The sandbox is a Flatpak — host tools reached via
  `flatpak-spawn --host`. `npm`, `node`, `openssl`, `git` are all host
  binaries.
- Dev server URL: `http://localhost:3000`. Vercel deploy hooks on
  push to `main`. Env vars required in Vercel: `AUTH_SECRET`,
  `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_USERNAMES`.

## Palette & motion tokens

- Motion easing tokens in `src/app/globals.css`:
  `--ease-out-expo`, `--ease-out-quint`, `--ease-in-out-quart`,
  `--ease-spring`
- Duration tokens: `--t-quick` (180ms), `--t-base` (320ms),
  `--t-slow` (560ms), `--t-cinematic` (900ms)
- Use them consistently on new transitions so hovers across the site
  feel tuned by the same hand.

## What NOT to do

- Don't put green/amber/emerald/yellow semantic colors anywhere —
  palette is black + red + water-white only. "Correct" uses white/
  bright fg, "wrong" uses red, "skipped" uses dim gray.
- Don't reintroduce the old Toppers marquee component; its spiritual
  replacement is `TopperWall.tsx` with real alumni + representative
  non-science placements.
- Don't add a separate "Hall of Fame" full-page section — the hero's
  `AlumniBubbles` constellation serves that role now.
- Don't auto-flip course or stat cards on hover — flip only on click.
  Hover-triggered flips broke the Buy + Transaction-ID interaction.
- Don't surface `prefers-color-scheme` for the initial theme — default
  is dark regardless of OS. User opts into light via the toggle.
