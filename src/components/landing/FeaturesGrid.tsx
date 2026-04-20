import type { ComponentType, SVGProps } from 'react';

const FEATURES: {
  title: string;
  body: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: 'Animated lessons',
    body: 'Hand-drawn concepts, not just a talking head in front of a chalkboard.',
    icon: IconPlay,
  },
  {
    title: 'Live doubt clearing',
    body: 'Weekly sessions with toppers who cracked the actual paper you\'re prepping for.',
    icon: IconChat,
  },
  {
    title: 'Calibrated mocks',
    body: '47 full-length mocks, tuned against 6 years of past admission questions.',
    icon: IconTarget,
  },
  {
    title: 'Printed resources',
    body: 'Past-paper digest, formula booklet, workbook — shipped nationwide in 4 days.',
    icon: IconBook,
  },
  {
    title: 'Scholarship path',
    body: '400 seats per cycle at 60–100% off, need-based, no photo-with-certificate drama.',
    icon: IconMedal,
  },
];

export function FeaturesGrid() {
  return (
    <section className="section">
      <div className="mb-10 max-w-2xl">
        <span className="eyebrow">Why MeritMint</span>
        <h2 className="display-headline mt-4">
          Built for admission.
          <br />
          <span className="italic-serif">Nothing else.</span>
        </h2>
        <p className="mt-3 text-muted">
          We don't teach school syllabus. We don't run BCS prep. We build
          one thing well — the path from HSC to the admission letter you
          actually want.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <article key={f.title} className="feature-card">
              <div className="feature-icon" aria-hidden>
                <Icon width={22} height={22} />
              </div>
              <h3 className="mt-5 font-display text-xl leading-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function IconPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}
function IconTarget(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
      <path d="M4 17a2 2 0 0 1 2-2h12" />
    </svg>
  );
}
function IconGauge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 14a9 9 0 1 1 18 0" />
      <path d="m12 14 5-4" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}
function IconMedal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="15" r="5" />
      <path d="M8 10 5 3h5l2 4M16 10l3-7h-5l-2 4" />
    </svg>
  );
}
