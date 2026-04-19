import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'MeritMint',
  description: 'Tension Gone. Grades On.',
};

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
            <ThemeToggle />
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
