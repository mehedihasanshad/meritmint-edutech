import './globals.css';
import type { Metadata } from 'next';
import {
  Geist,
  Fraunces,
  Geist_Mono,
  Hind_Siliguri,
  Noto_Serif_Bengali,
} from 'next/font/google';
import { getSession, isAdmin } from '@/lib/auth';
import { MainNav } from '@/components/MainNav';
import { FloatingContact } from '@/components/FloatingContact';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ScrollProgress } from '@/components/ScrollProgress';

// Latin body — Geist: Vercel's flagship sans. Technical, restrained,
// optically refined at every size. Reads as "2025 product" the way
// Helvetica used to read as "corporate". Variable weight 100–900.
const sans = Geist({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
// Latin display — Fraunces: a variable serif with four axes — weight,
// optical size (opsz), SOFT (curvature), and WONK (stylistic
// alternates that rotate irregularly, giving headlines a human
// imperfection). Used by editorial/fashion brands for premium
// personality. Supports italic for the "italic-serif" accent moments.
const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
  display: 'swap',
});
// Mono — Geist Mono: matches Geist, tabular numerics dialled in.
const mono = Geist_Mono({
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
    const theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  try {
    const lng = localStorage.getItem('lang');
    document.documentElement.setAttribute('data-lang', lng === 'bn' ? 'bn' : 'en');
  } catch (e) {
    document.documentElement.setAttribute('data-lang', 'en');
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
      data-lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${bengali.variable} ${bengaliDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <div className="noise-overlay" aria-hidden />
        <header className="site-header">
          <MainNav
            username={session?.username ?? null}
            isAdminUser={isAdmin(session)}
          />
        </header>
        <main>{children}</main>
        <FloatingContact />
      </body>
    </html>
  );
}
