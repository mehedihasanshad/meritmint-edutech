import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { getSession, isAdmin } from '@/lib/auth';
import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavLogo } from '@/components/NavLogo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MeritMint — Tension Gone. Grades On.',
  description:
    'Admission-prep that actually works. Taught by toppers who cracked it. Resources, mocks, mentorship — one place, one fair price.',
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
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden />
        <header className="site-header">
          <NavLogo />
          <nav className="flex items-center gap-2">
            {session ? (
              <>
                <span className="hidden text-sm text-white/70 sm:inline">
                  Hi, {session.username}
                </span>
                {isAdmin(session) && (
                  <Link href="/admin" className="btn-ghost">
                    Admin
                  </Link>
                )}
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
