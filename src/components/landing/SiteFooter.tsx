import Link from 'next/link';
import Image from 'next/image';

const LINKS_LEARN = [
  { label: 'All courses', href: '#courses' },
  { label: 'How it works', href: '#how' },
  { label: 'Free library', href: 'https://youtube.com/@meritmint' },
  { label: 'Scholarships', href: '#pricing' },
  { label: 'Past papers', href: '/login' },
];

const LINKS_COMPANY = [
  { label: 'About us', href: '/about' },
  { label: 'Careers · we\'re hiring', href: '/careers' },
  { label: 'Partner a coaching', href: '/partners' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '#connect' },
];

const LINKS_LEGAL = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Refund policy', href: '/refund' },
  { label: 'Community rules', href: '/rules' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="footer-badge">
                <Image
                  src="/logo-icon.png"
                  alt="MeritMint"
                  width={48}
                  height={48}
                />
              </span>
              <div>
                <div className="font-display text-2xl">MeritMint</div>
                <div className="italic-serif text-sm text-muted" lang="bn">
                  Tension Gone · Grades On · তোমার rank, আমাদের কাজ।
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted" lang="bn">
              যে admission prep সত্যিই কাজ করে। Dhaka-তে তৈরি, সেই ভাইয়া-আপুদের
              হাতে যারা নিজেরা admission পেরিয়েছে, এমন দামে যে family-র গায়ে
              লাগে না।
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="#" className="btn-pill btn-pill-primary text-sm">
                <PlayStoreIcon /> Google Play
              </Link>
              <Link href="#" className="btn-pill btn-pill-ghost text-sm">
                <AppleIcon /> App Store
              </Link>
            </div>
          </div>

          <FooterCol title="Learn" items={LINKS_LEARN} />
          <FooterCol title="Company" items={LINKS_COMPANY} />
          <FooterCol title="Legal" items={LINKS_LEGAL} />
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col gap-4 text-xs text-dim md:flex-row md:items-center md:justify-between">
          <div>
            MeritMint Edutech Pvt. Ltd. · Dhaka, Bangladesh ·{' '}
            <a href="mailto:hello@meritmint.com" className="hover:text-fg">
              hello@meritmint.com
            </a>
          </div>
          <div className="flex flex-wrap gap-4">
            <Social label="Facebook" href="https://facebook.com/meritmint"><FbIcon /></Social>
            <Social label="YouTube" href="https://youtube.com/@meritmint"><YtIcon /></Social>
            <Social label="Instagram" href="https://instagram.com/meritmint"><IgIcon /></Social>
            <Social label="WhatsApp" href="https://wa.me/8801000000000"><WaIcon /></Social>
          </div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em]">
            © 2026 MeritMint · v0.2
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className="footer-link">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="footer-social"
    >
      {children}
    </Link>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 3.5v17l9-8.5z M14 12l4 3.5L5 22l9-10zM14 12 5 2l13 6.5z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 12.5c0-2.4 2-3.5 2-3.5s-1.1-1.6-2.8-1.6c-1.2 0-2 .7-3.2.7s-2-.7-3.3-.7C6.2 7.4 4 9.6 4 13.5c0 4.5 3 8 4.3 8 1 0 1.6-.7 3.2-.7 1.5 0 1.9.7 3.1.7 1.7 0 3.4-2.7 3.9-4.2 0 0-2-1-2-4.8zM14 5c.6-.7 1-1.7 1-2.5-1 .1-2 .7-2.6 1.4-.5.7-1 1.7-.9 2.5 1 .1 2-.7 2.5-1.4z" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.5-2 2-2h2V2h-3c-3 0-5 2-5 5v3H6v4h3v8z" />
    </svg>
  );
}
function YtIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 7.5s-.2-1.5-.8-2.1c-.8-.8-1.7-.9-2.1-1C16 4 12 4 12 4s-4 0-7.1.4c-.4.1-1.3.2-2.1 1C2.2 6 2 7.5 2 7.5S1.8 9.3 1.8 11v1.5c0 1.7.2 3.4.2 3.4s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 7.3.4 7.3.4s4 0 7.1-.4c.4-.1 1.3-.2 2.1-1 .6-.6.8-2.1.8-2.1s.2-1.7.2-3.4V11c0-1.7-.2-3.4-.2-3.4zM10 15V9l5 3z" />
    </svg>
  );
}
function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 12a8 8 0 1 1-14.5 4.7L4 20l3.4-1.3A8 8 0 0 1 20 12zm-5 2.1c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.1-.3.2-.5.1a6 6 0 0 1-1.8-1.1 7 7 0 0 1-1.2-1.6c-.1-.2 0-.3.1-.4l.3-.4.2-.3c.1-.1 0-.2 0-.3 0-.1-.5-1.1-.6-1.5-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4 1.5.6 2.1.6 2.8.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.1z" />
    </svg>
  );
}
