'use client';

import Link from 'next/link';
import { useState } from 'react';

type Question = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
};

type SubmitResponse = {
  ok: true;
  score: number;
  totalQuestions: number;
  details: {
    questionId: number;
    given: string | null;
    correct: string;
    isCorrect: boolean;
  }[];
};

export function ExamForm({
  examId,
  questions,
}: {
  examId: number;
  questions: Question[];
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const payload = {
      examId,
      answers: questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id] ?? null,
      })),
    };
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setErr(data.error ?? 'Submission failed.');
      return;
    }
    setResult(data);
  }

  if (result) {
    const correctMap = new Map(result.details.map((d) => [d.questionId, d]));
    return (
      <div className="mt-6 space-y-3">
        <div className="glass rounded-xl p-5">
          <h2 className="text-xl font-semibold">
            Score: {result.score} / {result.totalQuestions}
          </h2>
        </div>
        {questions.map((q, idx) => {
          const d = correctMap.get(q.id);
          const opts: [string, string][] = [
            ['a', q.opt_a],
            ['b', q.opt_b],
            ['c', q.opt_c],
            ['d', q.opt_d],
          ];
          return (
            <div key={q.id} className="glass rounded-lg p-4">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {opts.map(([key, label]) => {
                  const isCorrect = d?.correct.toLowerCase() === key;
                  const isGiven = d?.given === key;
                  return (
                    <li
                      key={key}
                      className={
                        isCorrect
                          ? 'text-emerald-400'
                          : isGiven
                            ? 'text-red-400'
                            : 'text-white/70'
                      }
                    >
                      {key.toUpperCase()}. {label}
                      {isCorrect && ' ✓'}
                      {isGiven && !isCorrect && ' ✗'}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="flex gap-2 pt-2">
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
          <Link href={`/leaderboard/${examId}`} className="btn-secondary">
            View Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      {questions.map((q, idx) => (
        <fieldset key={q.id} className="glass rounded-lg p-4">
          <legend className="px-2 font-medium">
            {idx + 1}. {q.question}
          </legend>
          {(
            [
              ['a', q.opt_a],
              ['b', q.opt_b],
              ['c', q.opt_c],
              ['d', q.opt_d],
            ] as [string, string][]
          ).map(([key, label]) => (
            <label key={key} className="mt-1 flex items-center gap-2">
              <input
                type="radio"
                name={`q${q.id}`}
                value={key}
                checked={answers[q.id] === key}
                onChange={() =>
                  setAnswers((prev) => ({ ...prev, [q.id]: key }))
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      ))}
      {err && <p className="text-sm text-red-400">{err}</p>}
      <button type="submit" disabled={busy} className="btn-primary">
        {busy ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
