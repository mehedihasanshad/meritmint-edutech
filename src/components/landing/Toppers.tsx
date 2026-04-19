const TOPPERS = [
  { name: 'Fahim Ahmed', rank: 'BUET CSE · 12th', initial: 'F', quote: 'Skipped a coaching. Didn\'t skip MeritMint.' },
  { name: 'Tahsina Rahman', rank: 'DMC · 41st', initial: 'T', quote: 'The mocks were harder than the real paper. Thank god.' },
  { name: 'Rafid Islam', rank: 'BUET EEE · 7th', initial: 'R', quote: 'Doubt cleared at 1:40am. I remember this.' },
  { name: 'Anika Chowdhury', rank: 'DU IBA · 3rd', initial: 'A', quote: 'Finally, notes that don\'t lie to you.' },
  { name: 'Shadman Kabir', rank: 'RUET · 22nd', initial: 'S', quote: 'Repeater batch. 180 → 47 rank.' },
  { name: 'Mahin Haque', rank: 'DMC · 88th', initial: 'M', quote: 'Printed books arrived. I actually cried.' },
  { name: 'Nawrin Zaman', rank: 'DU Economics · 1st', initial: 'N', quote: 'My mom watched the dashboard daily. Silence was peace.' },
  { name: 'Ishraq Rashid', rank: 'BUET ME · 19th', initial: 'I', quote: 'Three months out. Crash course. In.' },
  { name: 'Samiha Alam', rank: 'SUST CSE · 5th', initial: 'S', quote: 'Worth every taka. Possibly the first internet thing that was.' },
  { name: 'Arif Hossain', rank: 'CMC · 34th', initial: 'A', quote: 'Topper mentors are real. I DM\'d one at 2am.' },
];

export function Toppers() {
  const doubled = [...TOPPERS, ...TOPPERS];
  return (
    <section className="section">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">The Wall</span>
          <h2 className="display-headline mt-4">
            They cracked it.
            <br />
            <span className="italic-serif accent-red">In their words.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right">
          No stock photos. No paid testimonials. Real ranks, real names —
          hover to pause, scroll to read.
        </p>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div key={i} className="topper-card">
              <div className="topper-avatar">{t.initial}</div>
              <div className="topper-meta">
                <span className="topper-rank">{t.rank}</span>
                <span className="topper-name">{t.name}</span>
              </div>
              <span className="hide-sm mx-2 h-6 w-px bg-white/20" aria-hidden />
              <span className="hide-sm italic-serif text-sm text-muted">
                "{t.quote}"
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
