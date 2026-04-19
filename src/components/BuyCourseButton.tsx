'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function BuyCourseButton({ courseId }: { courseId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!tx.trim()) {
      setErr('Enter a transaction id.');
      return;
    }
    setBusy(true);
    const res = await fetch('/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, transactionId: tx.trim() }),
    });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (data.error === 'login') {
        router.push('/login?next=/');
        return;
      }
      setErr(data.error ?? 'Something went wrong.');
      return;
    }
    setOpen(false);
    setTx('');
    router.push('/dashboard');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary mt-4 w-full"
      >
        Buy (via Transaction ID)
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold">Purchase Course {courseId}</h3>
            <input
              autoFocus
              value={tx}
              onChange={(e) => setTx(e.target.value)}
              placeholder="Enter Transaction ID"
              className="field mt-4"
            />
            {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" disabled={busy} className="btn-primary">
                {busy ? 'Submitting…' : 'Submit Transaction'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
