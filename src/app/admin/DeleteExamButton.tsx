'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteExamButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm(`Delete "${title}" and all its questions and results?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/exams/${id}`, { method: 'DELETE' });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert('Delete failed.');
  }

  return (
    <button
      onClick={onDelete}
      disabled={busy}
      className="btn-pill text-xs"
      style={{
        background: 'rgba(255, 59, 48, 0.12)',
        border: '1px solid rgba(255, 59, 48, 0.3)',
        color: '#ff6f64',
      }}
    >
      {busy ? 'Deleting…' : 'Delete'}
    </button>
  );
}
