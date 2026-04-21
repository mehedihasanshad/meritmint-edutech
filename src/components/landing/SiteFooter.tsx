import Link from 'next/link';
import Image from 'next/image';
import { ScrollToTop } from '@/components/ScrollToTop';

const LINKS_LEARN = [
  { label: 'All courses', href: '#courses' },
  { label: 'Mocks & batches', href: '#exams' },
  { label: 'Payment guide', href: '#payment' },
  { label: 'Free library', href: 'https://www.youtube.com/@ConnectXmeritmint' },
  { label: 'FAQ', href: '#faq' },
];

const LINKS_COMPANY = [
  { label: 'About us', href: '/about' },
  { label: 'Careers · we\'re hiring', href: '/careers' },
  { label: 'Partner a coaching', href: '/partners' },
  { label: 'Press', href: '/press' },
];

const LINKS_LEGAL = [
  { label: 'Terms of use', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Refund policy', href: '/refund' },
  { label: 'Community rules', href: '/rules' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <ScrollToTop />

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

            <p className="mt-4 max-w-md text-sm text-muted" lang="bn">
              যে admission prep সত্যিই কাজ করে। Dhaka-তে তৈরি, সেই ভাইয়া-আপুদের
              হাতে যারা নিজেরা admission পেরিয়েছে।
            </p>

            {/* Contact tile + actions tile — two side-by-side panels.
                Contact: address / phone / email only (breathable spacing).
                Actions: socials + app-store pills on the right. */}
            <div className="footer-contact-row-wrap">
              <dl className="footer-contact">
                <div className="footer-contact-line">
                  <dt aria-label="Address">
                    <PinIcon />
                  </dt>
                  <dd>
                    Mirpur 12, Block D, Pallabi
                    <br />
                    Dhaka, Bangladesh
                  </dd>
                </div>
                <div className="footer-contact-line">
                  <dt aria-label="Phone">
                    <PhoneIcon />
                  </dt>
                  <dd>
                    <a href="tel:+8801751589525" className="footer-link">
                      +880 1751 589 525
                    </a>
                  </dd>
                </div>
                <div className="footer-contact-line">
                  <dt aria-label="Email">
                    <MailIcon />
                  </dt>
                  <dd>
                    <a
                      href="mailto:hello@meritmint.com"
                      className="footer-link"
                    >
                      hello@meritmint.com
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="footer-actions">
                <div className="footer-actions-socials">
                  <Social
                    label="Facebook"
                    href="https://facebook.com/ConnectXmeritmint"
                  >
                    <FbIcon />
                  </Social>
                  <Social
                    label="YouTube"
                    href="https://www.youtube.com/@ConnectXmeritmint"
                  >
                    <YtIcon />
                  </Social>
                  <Social
                    label="Instagram"
                    href="https://instagram.com/ConnectXmeritmint"
                  >
                    <IgIcon />
                  </Social>
                  <Social label="WhatsApp" href="https://wa.me/8801751589525">
                    <WaIcon />
                  </Social>
                </div>

                <div className="footer-actions-apps">
                  <Link
                    href="#"
                    className="footer-app-pill"
                    aria-label="Get MeritMint on Google Play"
                  >
                    <PlayStoreIcon />
                    <span>
                      <span className="footer-app-pill-top">Get it on</span>
                      <span className="footer-app-pill-bot">Google Play</span>
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="footer-app-pill"
                    aria-label="Download MeritMint on the App Store"
                  >
                    <AppleIcon />
                    <span>
                      <span className="footer-app-pill-top">
                        Download on
                      </span>
                      <span className="footer-app-pill-bot">App Store</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <FooterCol title="Learn" items={LINKS_LEARN} />
          <FooterCol title="Company" items={LINKS_COMPANY} />
          <FooterCol title="Legal" items={LINKS_LEGAL} />
        </div>

        <div className="footer-copyright-center">
          © {new Date().getFullYear()} · All rights reserved by{' '}
          <span className="text-fg font-semibold">Mehedi Hasan Shad</span>
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

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s7-7.6 7-13a7 7 0 1 0-14 0c0 5.4 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.75.63 2.58a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.58.63a2 2 0 0 1 1.72 2z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function PlayStoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 3.5v17l9-8.5z M14 12l4 3.5L5 22l9-10zM14 12 5 2l13 6.5z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
      <path d="M20 12a8 8 0 1 1-14.5 4.7L4 20l3.4-1.3A8 8 0 0 1 20 12zm-5 2.1c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.1-.3.2-.5.1a6 6 0 0 1-1.8-1.1 7 7 0 0 1-1.2-1.6c-.1-.2 0-.3.1-.4l.3-.4.2-.3c.1-.1 0-.2 0-.3 0-.1-.5-1.1-.6-1.5-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.5c.1.2 1.6 2.5 3.9 3.4 1.5.6 2.1.6 2.8.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.1z" />
    </svg>
  );
}
