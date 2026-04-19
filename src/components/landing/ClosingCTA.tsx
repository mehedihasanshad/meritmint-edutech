import Link from 'next/link';
import Image from 'next/image';

export function ClosingCTA() {
  return (
    <section className="section">
      <div className="mega-cta">
        <Image
          src="/logo-icon.png"
          alt=""
          aria-hidden
          width={500}
          height={500}
          className="pointer-events-none absolute -right-[10%] -top-[30%] w-[60%] max-w-[600px] opacity-[0.07]"
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="eyebrow">One decision</span>
          <h2 className="mt-6 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight">
            Start today.
            <br />
            <span className="italic-serif accent-red">Rank next.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            Seats for the '26 admission cycle are filling. The longer you
            wait, the louder the tension gets. Pick a course, take the first
            class, see if it clicks. 3-day free trial, cancel if it doesn't.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="btn-pill btn-pill-primary">
              Start free trial
              <Arrow />
            </Link>
            <Link href="#courses" className="btn-pill btn-pill-ghost">
              Compare courses
            </Link>
          </div>
          <p className="mt-6 text-xs text-dim">
            No card required · bKash/Nagad when you're ready · cancel one-tap
          </p>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-start justify-between gap-4 text-sm text-dim md:flex-row md:items-center">
        <div className="italic-serif">
          MeritMint · Tension Gone. Grades On.
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="#courses" className="hover:text-fg">
            Courses
          </Link>
          <Link href="#faq" className="hover:text-fg">
            FAQ
          </Link>
          <Link href="/login" className="hover:text-fg">
            Login
          </Link>
          <span>© 2026</span>
        </div>
      </footer>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
