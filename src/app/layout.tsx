import './globals.css';
import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Hind_Siliguri,
  Noto_Serif_Bengali,
} from 'next/font/google';
import { getSession, isAdmin } from '@/lib/auth';
import { MainNav } from '@/components/MainNav';

// Latin body — Plus Jakarta Sans: modern, premium, warmer than Inter,
// variable weight 200–800. Used by high-end product sites.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});
// Latin display — Instrument Serif italic: editorial, elegant.
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
// Mono — JetBrains Mono: crisp tabular numerics.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
// Bengali body — Hind Siliguri: the industry-standard Bangla web
// typeface for Bangladeshi digital products. Comprehensive Unicode
// coverage including every conjunct used in modern Bangla, five
// weights, proven rendering across browsers and low-end devices.
const bengali = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
});
// Bengali display — Noto Serif Bengali: used only for large editorial
// headlines where a serif contrast is desirable. Hind Siliguri handles
// everything else.
const bengaliDisplay = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-bengali-display',
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
      className={`${sans.variable} ${display.variable} ${mono.variable} ${bengali.variable} ${bengaliDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden />
        <header className="site-header">
          <MainNav
            username={session?.username ?? null}
            isAdminUser={isAdmin(session)}
          />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
