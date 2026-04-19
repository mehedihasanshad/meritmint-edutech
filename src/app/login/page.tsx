import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { LoginForm } from '@/components/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  const { next } = await searchParams;
  if (session) redirect(next || '/dashboard');

  return (
    <section className="flex items-center justify-center px-4 py-16">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-semibold">Login or Register</h1>
        <p className="mt-1 text-sm text-white/60">
          Use any username & password (min 6 chars).
        </p>
        <LoginForm next={next ?? '/dashboard'} />
      </div>
    </section>
  );
}
