'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ERRORS: Record<string, string> = {
  missing: 'Enter both username and password.',
  invalid: 'Wrong username or password.',
  'invalid-username': 'Username must be 3–32 characters.',
  'weak-password': 'Password must be at least 6 characters.',
  'username-taken': 'Username already taken.',
};

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<'login' | 'register' | null>(null);

  async function submit(mode: 'login' | 'register') {
    setErr(null);
    setBusy(mode);
    const res = await fetch(`/api/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setBusy(null);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setErr(ERRORS[data.error] ?? 'Something went wrong.');
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit('login');
      }}
      className="mt-6 space-y-3"
    >
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        className="field"
        autoComplete="username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        className="field"
        autoComplete="current-password"
      />
      {err && <p className="text-sm text-red-400">{err}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!!busy}
          className="btn-primary flex-1"
        >
          {busy === 'login' ? 'Logging in…' : 'Login'}
        </button>
        <button
          type="button"
          disabled={!!busy}
          onClick={() => submit('register')}
          className="btn-secondary flex-1"
        >
          {busy === 'register' ? 'Creating…' : 'Register'}
        </button>
      </div>
    </form>
  );
}
