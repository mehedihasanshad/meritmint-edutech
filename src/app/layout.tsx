import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { LogoutButton } from '@/components/LogoutButton';

export const metadata: Metadata = {
  title: 'MeritMint',
  description: 'Tension Gone. Grades On.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <header className="flex items-center justify-between px-8 py-4">
          <Link href="/" className="text-xl font-bold tracking-wide">
            MeritMint
          </Link>
          <nav className="flex items-center gap-2">
            {session ? (
              <>
                <span className="text-sm text-white/70">Hi, {session.username}</span>
                <Link href="/dashboard" className="btn-ghost">
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="btn-ghost">
                Login / Register
              </Link>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
