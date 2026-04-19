export function PricingPitch() {
  return (
    <section className="section">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <span className="eyebrow">The Money Part</span>
          <h2 className="display-headline mt-4">
            Traditional coaching:{' '}
            <span className="strike-through-red italic-serif">৳50,000+</span>
            <br />
            MeritMint: <span className="accent-red">৳3,200</span>
            <span className="italic-serif text-muted text-[0.6em]">
              {' '}all-in.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-muted">
            That's not a discount. It's a different business model. We don't
            rent a building on Farmgate, we don't print glossy flyers, and we
            don't pay agents a cut. Every taka goes to the teachers and the
            mocks.
          </p>
          <div className="mt-8 flex flex-col gap-2 text-sm text-muted">
            <Line>Scholarships available — need only, no begging form</Line>
            <Line>Pay in 2 installments — no cards, bKash works</Line>
            <Line>3-day free trial · cancel with one tap</Line>
          </div>
        </div>

        <div className="relative">
          <div className="card-tilt">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] accent-red">
                Receipt · sample
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim">
                #MM-2026-04
              </span>
            </div>
            <hr className="rule my-4" />
            <Row left="Course in Depth · 16w" right="৳3,200" />
            <Row left="Printed past-paper digest" right="incl." />
            <Row left="Mock papers × 8" right="incl." />
            <Row left="Topper doubt chat" right="incl." />
            <Row left="Exam-day kit + hotline" right="incl." />
            <hr className="rule my-4" />
            <Row left="Surprise upsells" right="৳0" bold />
            <Row left="You paid" right="৳3,200" bold large />
            <p className="mt-4 italic-serif text-sm text-muted">
              That's the whole receipt. Nothing hidden below.
            </p>
          </div>
          <div
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,59,48,0.4), transparent 70%)',
            }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1.5 flex-shrink-0">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

function Row({
  left,
  right,
  bold,
  large,
}: {
  left: string;
  right: string;
  bold?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between py-1.5 ${
        bold ? 'font-semibold' : 'text-muted'
      } ${large ? 'text-lg' : 'text-sm'}`}
    >
      <span>{left}</span>
      <span
        className={large ? 'font-display text-3xl accent-red' : 'font-mono'}
      >
        {right}
      </span>
    </div>
  );
}
