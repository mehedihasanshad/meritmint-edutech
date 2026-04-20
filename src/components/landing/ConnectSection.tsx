import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';

const CHANNELS: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  name: string;
  note: string;
  cta: string;
  href: string;
}[] = [
  {
    icon: IconPhone,
    label: 'হটলাইন',
    name: 'WhatsApp · বিকাল ৪টা–রাত ১১টা',
    note: 'আটকে গেলে call দাও — একজন real topper ধরবে।',
    cta: 'WhatsApp-এ message করো',
    href: 'https://wa.me/8801000000000',
  },
  {
    icon: IconGroup,
    label: 'কমিউনিটি',
    name: 'Facebook · এডমিশন ২০২৬',
    note: 'প্রতিদিন প্রশ্ন drop, past paper drill, live আলোচনা।',
    cta: 'Group-এ join করো',
    href: 'https://facebook.com/groups/meritmint',
  },
  {
    icon: IconPlayCircle,
    label: 'ফ্রি লাইব্রেরি',
    name: 'YouTube · MeritMint',
    note: 'প্রতি lesson-এর preview এখানে। কেনার আগে একটা দেখে নাও।',
    cta: 'YouTube-এ দেখো',
    href: 'https://youtube.com/@meritmint',
  },
];

export function ConnectSection() {
  return (
    <section id="connect" className="section">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span lang="bn">তিনভাবে পাওয়া যাবে</span>
          </span>
          <h2 className="display-headline mt-4">
            <span lang="bn">এক টাকাও খরচ করার আগে,</span>
            <br />
            <span lang="bn" className="italic-serif">
              কথা বলো।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          কোনো lead-capture form নেই। "এটা fill up করো আর ৪৮ ঘণ্টা wait করো"
          বলবো না। তিনটা channel, real মানুষ, এখনই খোলা।
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <article key={c.name} className="connect-card">
              <div className="connect-icon" aria-hidden>
                <Icon width={22} height={22} />
              </div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] accent-red">
                {c.label}
              </div>
              <h3 className="mt-1 font-display text-2xl leading-tight">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{c.note}</p>
              <Link
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 btn-pill btn-pill-ghost text-sm"
              >
                {c.cta}
                <ArrowIcon />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.75.63 2.58a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.58.63a2 2 0 0 1 1.72 2z" />
    </svg>
  );
}
function IconGroup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconPlayCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
