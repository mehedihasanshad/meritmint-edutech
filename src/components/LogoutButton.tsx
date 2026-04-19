'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function onClick() {
    await fetch('/api/logout', { method: 'POST' });
    startTransition(() => router.refresh());
  }

  return (
    <button onClick={onClick} disabled={pending} className="btn-ghost">
      {pending ? 'Logging out…' : 'Logout'}
    </button>
  );
}
