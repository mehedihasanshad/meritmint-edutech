'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Question = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
};

type ExamMeta = {
  id: number;
  title: string;
  total_marks: number;
  duration_minutes: number;
  negative_marks: number;
  pass_marks: number;
};

type Choice = 'a' | 'b' | 'c' | 'd' | null;

type QState = {
  answer: Choice;
  flagged: boolean;
  visited: boolean;
};

function fmtTime(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

const OPTIONS = ['a', 'b', 'c', 'd'] as const;

export function ExamForm({
  exam,
  questions,
}: {
  exam: ExamMeta;
  questions: Question[];
}) {
  const router = useRouter();
  const storageKey = `mm-exam-${exam.id}`;
  const totalSeconds = exam.duration_minutes * 60;

  const initialStates = useMemo<QState[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            Array.isArray(parsed.states) &&
            parsed.states.length === questions.length
          ) {
            return parsed.states;
          }
        }
      } catch {}
    }
    return questions.map(() => ({
      answer: null,
      flagged: false,
      visited: false,
    }));
  }, [questions.length, storageKey]);

  const initialStartedAt = useMemo<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed.startedAt === 'number') return parsed.startedAt;
        }
      } catch {}
    }
    return Date.now();
  }, [storageKey]);

  const [states, setStates] = useState<QState[]>(initialStates);
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - initialStartedAt) / 1000);
    return Math.max(0, totalSeconds - elapsed);
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittedRef = useRef(false);

  // Mark current as visited
  useEffect(() => {
    setStates((prev) => {
      if (prev[current]?.visited) return prev;
      const next = [...prev];
      next[current] = { ...next[current], visited: true };
      return next;
    });
  }, [current]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ states, startedAt: initialStartedAt })
      );
    } catch {}
  }, [states, initialStartedAt, storageKey]);

  // Timer
  useEffect(() => {
    if (submittedRef.current) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          void autoSubmit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // beforeunload
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (submittedRef.current) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  // Keyboard shortcuts (1-4 pick option, ArrowLeft/Right navigate, F flag)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showConfirm || submitting) return;
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'))
        return;
      if (e.key === 'ArrowRight') setCurrent((c) => Math.min(c + 1, questions.length - 1));
      else if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(0, c - 1));
      else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = Number(e.key) - 1;
        setAnswer(OPTIONS[idx]);
      } else if (e.key.toLowerCase() === 'f') toggleFlag();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirm, submitting, questions.length]);

  const setAnswer = useCallback((choice: Choice) => {
    setStates((prev) => {
      const next = [...prev];
      next[current] = { ...next[current], answer: choice, visited: true };
      return next;
    });
  }, [current]);

  const toggleFlag = useCallback(() => {
    setStates((prev) => {
      const next = [...prev];
      next[current] = { ...next[current], flagged: !next[current].flagged };
      return next;
    });
  }, [current]);

  const clearAnswer = useCallback(() => {
    setStates((prev) => {
      const next = [...prev];
      next[current] = { ...next[current], answer: null };
      return next;
    });
  }, [current]);

  const counts = useMemo(() => {
    const answered = states.filter((s) => s.answer !== null).length;
    const flagged = states.filter((s) => s.flagged).length;
    const unanswered = states.length - answered;
    return { answered, unanswered, flagged };
  }, [states]);

  async function performSubmit(auto: boolean) {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setSubmitError(null);

    const elapsed = Math.floor((Date.now() - initialStartedAt) / 1000);
    const payload = {
      examId: exam.id,
      timeTakenSeconds: Math.min(elapsed, totalSeconds),
      answers: questions.map((q, i) => ({
        questionId: q.id,
        answer: states[i]?.answer ?? null,
      })),
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        submittedRef.current = false;
        setSubmitError(data.error ?? 'Submission failed.');
        setSubmitting(false);
        return;
      }
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      router.push(`/exam/${exam.id}/result/${data.resultId}`);
    } catch {
      submittedRef.current = false;
      setSubmitError(auto ? 'Auto-submit failed.' : 'Submission failed.');
      setSubmitting(false);
    }
  }

  const autoSubmit = () => performSubmit(true);

  const q = questions[current];
  const qs = states[current];
  const lowTime = secondsLeft <= 60;

  return (
    <div className="exam-shell">
      <header className="exam-topbar">
        <div className="min-w-0">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim">
            Exam #{exam.id} · {questions.length} Qs · {exam.total_marks} marks
          </div>
          <h1 className="truncate font-display text-2xl leading-tight">
            {exam.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className={`exam-timer ${lowTime ? 'exam-timer-low' : ''}`}>
            <TimerIcon />
            <span>{fmtTime(secondsLeft)}</span>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={submitting}
            className="btn-pill btn-pill-primary"
          >
            Submit
          </button>
        </div>
      </header>

      <div className="exam-body">
        <main className="exam-question-panel">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-dim">
              Question {current + 1}{' '}
              <span className="text-dim/60">/ {questions.length}</span>
            </div>
            <button
              onClick={toggleFlag}
              className={`btn-pill text-xs ${
                qs?.flagged ? 'exam-flagged' : 'btn-pill-ghost'
              }`}
            >
              {qs?.flagged ? '★ Flagged' : '☆ Mark for review'}
            </button>
          </div>

          <p className="exam-question-text">{q?.question}</p>

          <div className="exam-options">
            {OPTIONS.map((k, idx) => {
              const label = (q?.[`opt_${k}` as keyof Question] as string) ?? '';
              const selected = qs?.answer === k;
              return (
                <button
                  type="button"
                  key={k}
                  onClick={() => setAnswer(k)}
                  className={`exam-option ${selected ? 'exam-option-selected' : ''}`}
                >
                  <span className="exam-option-letter">{k.toUpperCase()}</span>
                  <span className="exam-option-label">{label}</span>
                  <span className="exam-option-kbd">{idx + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={clearAnswer}
              disabled={qs?.answer === null}
              className="btn-pill btn-pill-ghost text-sm"
            >
              Clear response
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="btn-pill btn-pill-ghost"
              >
                ← Previous
              </button>
              {current < questions.length - 1 ? (
                <button
                  onClick={() => setCurrent((c) => Math.min(c + 1, questions.length - 1))}
                  className="btn-pill btn-pill-primary"
                >
                  Save & Next →
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="btn-pill btn-pill-primary"
                >
                  Finish & Submit
                </button>
              )}
            </div>
          </div>
        </main>

        <aside className="exam-sidebar">
          <div className="exam-palette-head">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
              Question Palette
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-[0.65rem] text-muted">
              <Legend className="pal-answered" label={`${counts.answered} answered`} />
              <Legend className="pal-flagged" label={`${counts.flagged} flagged`} />
              <Legend className="pal-unvisited" label={`${counts.unanswered} left`} />
            </div>
          </div>

          <div className="exam-palette">
            {questions.map((_, i) => {
              const s = states[i];
              const status = !s?.visited
                ? 'pal-unvisited'
                : s.flagged && s.answer !== null
                ? 'pal-flagged-answered'
                : s.flagged
                ? 'pal-flagged'
                : s.answer !== null
                ? 'pal-answered'
                : 'pal-visited';
              const active = i === current ? 'pal-active' : '';
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`pal-cell ${status} ${active}`}
                  aria-label={`Go to question ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-muted">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-dim">
              Shortcuts
            </div>
            <ul className="mt-2 space-y-1">
              <li><kbd>1</kbd>–<kbd>4</kbd> pick option</li>
              <li><kbd>←</kbd> / <kbd>→</kbd> navigate</li>
              <li><kbd>F</kbd> flag for review</li>
            </ul>
          </div>
        </aside>
      </div>

      {submitError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {submitError}
        </div>
      )}

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => !submitting && setShowConfirm(false)}
        >
          <div
            className="glass w-full max-w-md rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl">Submit exam?</h2>
            <p className="mt-2 text-sm text-muted">
              Once you submit, you can't change your answers.
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Tile k="Answered" v={counts.answered} tone="ok" />
              <Tile k="Unanswered" v={counts.unanswered} tone={counts.unanswered ? 'warn' : 'ok'} />
              <Tile k="Flagged" v={counts.flagged} tone="muted" />
            </dl>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="btn-pill btn-pill-ghost"
              >
                Keep going
              </button>
              <button
                onClick={() => performSubmit(false)}
                disabled={submitting}
                className="btn-pill btn-pill-primary"
              >
                {submitting ? 'Submitting…' : 'Yes, submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded ${className}`} />
      <span>{label}</span>
    </div>
  );
}

function Tile({
  k,
  v,
  tone,
}: {
  k: string;
  v: number;
  tone: 'ok' | 'warn' | 'muted';
}) {
  const toneClass =
    tone === 'ok'
      ? 'text-emerald-300'
      : tone === 'warn'
      ? 'text-accent'
      : 'text-muted';
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div className="text-[0.6rem] uppercase tracking-[0.15em] text-dim">
        {k}
      </div>
      <div className={`mt-1 font-display text-3xl ${toneClass}`}>{v}</div>
    </div>
  );
}

function TimerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2M9 2h6M5 4l-2 2" />
    </svg>
  );
}
