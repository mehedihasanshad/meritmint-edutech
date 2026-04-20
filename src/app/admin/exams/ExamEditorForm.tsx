'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Initial = {
  id?: number;
  title?: string;
  description?: string | null;
  total_marks?: number;
  duration_minutes?: number;
  negative_marks?: number;
  pass_marks?: number;
};

export function ExamEditorForm({
  mode,
  initial = {},
}: {
  mode: 'create' | 'edit';
  initial?: Initial;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [totalMarks, setTotalMarks] = useState(
    String(initial.total_marks ?? 10)
  );
  const [durationMinutes, setDurationMinutes] = useState(
    String(initial.duration_minutes ?? 10)
  );
  const [negativeMarks, setNegativeMarks] = useState(
    String(initial.negative_marks ?? 0)
  );
  const [passMarks, setPassMarks] = useState(String(initial.pass_marks ?? 0));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const payload = {
      title,
      description,
      total_marks: Number(totalMarks),
      duration_minutes: Number(durationMinutes),
      negative_marks: Number(negativeMarks),
      pass_marks: Number(passMarks),
    };
    const url =
      mode === 'create'
        ? '/api/admin/exams'
        : `/api/admin/exams/${initial.id}`;
    const method = mode === 'create' ? 'POST' : 'PATCH';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setErr(errorMessage(data.error));
      return;
    }
    if (mode === 'create') {
      router.push(`/admin/exams/${data.id}`);
    } else {
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSave} className="mt-8 grid max-w-3xl gap-4">
      <Field label="Title">
        <input
          className="field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. BUET Admission Mock · Physics set 3"
        />
      </Field>
      <Field label="Description (optional)">
        <textarea
          className="field"
          rows={3}
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short note shown to students before they begin."
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Total marks">
          <input
            className="field"
            type="number"
            min={1}
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />
        </Field>
        <Field label="Duration (min)">
          <input
            className="field"
            type="number"
            min={1}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            required
          />
        </Field>
        <Field label="Negative marks / wrong">
          <input
            className="field"
            type="number"
            step="0.25"
            min={0}
            value={negativeMarks}
            onChange={(e) => setNegativeMarks(e.target.value)}
          />
        </Field>
        <Field label="Pass mark">
          <input
            className="field"
            type="number"
            min={0}
            value={passMarks}
            onChange={(e) => setPassMarks(e.target.value)}
          />
        </Field>
      </div>

      {err && <p className="text-sm text-red-400">{err}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={busy} className="btn-pill btn-pill-primary">
          {busy
            ? 'Saving…'
            : mode === 'create'
            ? 'Create exam'
            : 'Save changes'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-[0.15em] text-dim">{label}</span>
      {children}
    </label>
  );
}

function errorMessage(code: unknown): string {
  switch (code) {
    case 'title-required':
      return 'Title is required.';
    case 'invalid-total-marks':
      return 'Total marks must be a positive integer.';
    case 'invalid-duration':
      return 'Duration must be a positive integer.';
    case 'invalid-negative':
      return 'Negative marks must be 0 or more.';
    case 'invalid-pass':
      return 'Pass mark must be between 0 and total marks.';
    case 'admin-only':
      return 'Admin-only action.';
    default:
      return 'Save failed. Try again.';
  }
}
