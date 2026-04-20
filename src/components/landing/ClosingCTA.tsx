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
          <span className="eyebrow">
            <span lang="bn">একটাই সিদ্ধান্ত</span>
          </span>
          <h2 className="mt-6 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight">
            <span lang="bn">আজই শুরু।</span>
            <br />
            <span lang="bn" className="italic-serif accent-red">
              পরের rank-এ তুমি।
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted" lang="bn">
            ২০২৬ admission cycle-এর আসন filled হচ্ছে দ্রুত। যত দেরি, tension
            তত বাড়ে। একটা course ধরো, প্রথম class দেখে নাও, click করলে থাকো
            — না করলে ৩ দিনের trial শেষে cancel।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="btn-pill btn-pill-primary">
              <span lang="bn">ফ্রি trial শুরু করো</span>
              <Arrow />
            </Link>
            <Link href="#courses" className="btn-pill btn-pill-ghost">
              <span lang="bn">Course গুলো compare করো</span>
            </Link>
          </div>
          <p className="mt-6 text-xs text-dim" lang="bn">
            Card লাগবে না · bKash/Nagad — যখন তুমি ready · one-tap cancel
          </p>
        </div>
      </div>
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
