export function HowItWorks() {
  const steps = [
    {
      n: '০১',
      title: 'তোমার runway বলো',
      body:
        'Admission কত দিন বাকি? এক form পূরণ করলে আমরা সঠিক ব্যাচে বসিয়ে দিই — Deep, Crash, বা Recorded।',
    },
    {
      n: '০২',
      title: 'পরিকল্পনা আমরা দিই',
      body:
        'Week-by-week roadmap। কোন chapter past paper-এ ৮০% মার্ক বহন করে — exact list। মা-বাবাও dashboard পড়তে পারবেন।',
    },
    {
      n: '০৩',
      title: 'তুমি পড়ো, আমরা match করি',
      body:
        'প্রতিদিন lesson। প্রতি সপ্তাহে mock। 1-tap doubt chat। Rank move করে। Exam-এর দিন তুমি জেনে ঢোকো — কী আসছে।',
    },
  ];

  return (
    <section id="how" className="section">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">কীভাবে চলে</span>
          <h2 className="display-headline mt-4">
            <span lang="bn">তিন ধাপ।</span>
            <br />
            <span lang="bn" className="italic-serif">
              কোনো funnel trick নেই।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          তোমাকে ৪৭টা email করে harass করবো না আগে try করতে দেওয়ার আগে।
          পুরো system নিচে — পরিষ্কার।
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
            <h3 className="mt-4 font-display text-[1.8rem] leading-tight" lang="bn">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted" lang="bn">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
