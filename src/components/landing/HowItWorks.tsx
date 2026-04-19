export function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Tell us your runway',
      body:
        'How many days till your admission? We place you in the right batch — Deep, Crash, or Recorded — in one form.',
    },
    {
      n: '02',
      title: 'We hand you the plan',
      body:
        'Week-by-week roadmap. The exact chapters that carry 80% of past marks. A dashboard your parents can actually read.',
    },
    {
      n: '03',
      title: 'You show up. We match it.',
      body:
        'Daily lessons. Weekly mocks. 1-tap doubt chat. Your rank moves. On exam day you walk in knowing what\'s coming.',
    },
  ];

  return (
    <section className="section">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">How this goes</span>
          <h2 className="display-headline mt-4">
            Three steps.
            <br />
            <span className="italic-serif">No funnel tricks.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right">
          We won't email you 47 times before you're allowed to try. Here's the
          whole thing, laid out.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="card-tilt flex flex-col">
            <div className="flex items-baseline justify-between">
              <span className="step-num">{s.n}</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
                step
              </span>
            </div>
            <h3 className="mt-4 font-display text-[1.8rem] leading-tight">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
