'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Q = {
  id: number;
  question: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
  correct: string;
};

type Draft = Omit<Q, 'id'> & { id?: number };

const EMPTY: Draft = {
  question: '',
  opt_a: '',
  opt_b: '',
  opt_c: '',
  opt_d: '',
  correct: 'a',
};

export function QuestionsManager({
  examId,
  initial,
}: {
  examId: number;
  initial: Q[];
}) {
  const router = useRouter();
  const [items] = useState<Q[]>(initial);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSave(draft: Draft) {
    setErr(null);
    setBusy(true);
    const isNew = !draft.id;
    const res = await fetch(
      isNew
        ? `/api/admin/exams/${examId}/questions`
        : `/api/admin/questions/${draft.id}`,
      {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      }
    );
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setErr(data.error ?? 'Save failed.');
      return;
    }
    setEditing(null);
    router.refresh();
  }

  async function onDelete(id: number) {
    if (!confirm('Delete this question?')) return;
    setBusy(true);
    const res = await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert('Delete failed.');
  }

  return (
    <div className="mt-6 space-y-3">
      {items.length === 0 ? (
        <div className="card-tilt italic-serif text-muted text-center">
          No questions yet. Add your first below.
        </div>
      ) : (
        items.map((q, idx) => (
          <div key={q.id} className="card-tilt">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-dim">
                  Q{idx + 1}
                </div>
                <p className="mt-1 font-medium">{q.question}</p>
                <ul className="mt-2 grid gap-1 text-sm">
                  {(
                    [
                      ['a', q.opt_a],
                      ['b', q.opt_b],
                      ['c', q.opt_c],
                      ['d', q.opt_d],
                    ] as [string, string][]
                  ).map(([k, v]) => {
                    const isCorrect = q.correct === k;
                    return (
                      <li
                        key={k}
                        className={
                          isCorrect
                            ? 'review-option-correct rounded-md px-2 py-1'
                            : 'text-muted'
                        }
                      >
                        {k.toUpperCase()}. {v} {isCorrect && '✓'}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setEditing(q)}
                  className="btn-pill btn-pill-ghost text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(q.id)}
                  className="btn-pill text-xs"
                  style={{
                    background: 'rgba(255, 59, 48, 0.12)',
                    border: '1px solid rgba(255, 59, 48, 0.3)',
                    color: '#ff6f64',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {editing ? (
        <QuestionForm
          key={editing.id ?? 'new'}
          initial={editing}
          busy={busy}
          onCancel={() => setEditing(null)}
          onSave={onSave}
        />
      ) : (
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="btn-pill btn-pill-primary w-full"
        >
          + Add question
        </button>
      )}

      {err && <p className="text-sm text-red-400">{err}</p>}
    </div>
  );
}

function QuestionForm({
  initial,
  busy,
  onCancel,
  onSave,
}: {
  initial: Draft;
  busy: boolean;
  onCancel: () => void;
  onSave: (d: Draft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<Draft>(initial);
  const patch = (k: keyof Draft, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
      className="card-tilt grid gap-3"
    >
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] accent-red">
        {draft.id ? `Edit Q#${draft.id}` : 'New question'}
      </div>
      <textarea
        className="field"
        rows={2}
        placeholder="Question text"
        value={draft.question}
        onChange={(e) => patch('question', e.target.value)}
        required
      />
      <div className="grid gap-2 md:grid-cols-2">
        {(['a', 'b', 'c', 'd'] as const).map((k) => (
          <label key={k} className="flex items-center gap-2">
            <input
              type="radio"
              name="correct"
              checked={draft.correct === k}
              onChange={() => patch('correct', k)}
              className="mt-0 flex-shrink-0"
            />
            <span className="w-5 text-xs font-mono uppercase text-dim">
              {k}
            </span>
            <input
              className="field"
              placeholder={`Option ${k.toUpperCase()}`}
              value={draft[`opt_${k}` as keyof Draft] as string}
              onChange={(e) =>
                patch(`opt_${k}` as keyof Draft, e.target.value)
              }
              required
            />
          </label>
        ))}
      </div>
      <p className="text-xs text-dim">
        Tick the radio next to the correct option.
      </p>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={busy}
          className="btn-pill btn-pill-primary"
        >
          {busy ? 'Saving…' : draft.id ? 'Save' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-pill btn-pill-ghost"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
