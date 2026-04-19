const QA = [
  {
    q: "Bhai, I'm 2 months out. Am I cooked?",
    a: "No. Crash Course exists for exactly this. 6 weeks of sprint lessons + the highest-weightage chapters. A lot of last year's toppers started from here.",
  },
  {
    q: "How are these different from 10MS / Shikho?",
    a: "We only do admission prep — not school syllabus. Smaller batches, real mentors, ranked mocks. We can't match 10MS on scale; they can't match us on focus.",
  },
  {
    q: "What if the video buffers? My area has bad net.",
    a: "Every lesson is downloadable. PDFs work offline. Printed books ship to you. You can prepare with one bar of signal.",
  },
  {
    q: "What if I don't get in?",
    a: "We're honest: nothing guarantees admission. What we guarantee is that you walk in without gaps you didn't know you had. Full refund in the first 14 days, no questions asked.",
  },
  {
    q: "My parents want receipts. Do you give one?",
    a: "Yes. Proper invoice with batch, duration, and everything listed. Your guardian gets weekly progress email too, if you want.",
  },
  {
    q: "Scholarships real?",
    a: "Real. We give 60–100% off to ~400 students per cycle based on need. One form, no photo of you holding certificates. We believe you.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="mb-10 max-w-2xl">
        <span className="eyebrow">Straight answers</span>
        <h2 className="display-headline mt-4">
          The questions
          <br />
          <span className="italic-serif">everyone actually asks.</span>
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        {QA.map((qa, i) => (
          <div key={i} className="faq-row">
            <div className="bubble bubble-q">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim">
                student
              </span>
              <p className="mt-1">{qa.q}</p>
            </div>
            <div className="bubble bubble-a">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/80">
                meritmint
              </span>
              <p className="mt-1">{qa.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
