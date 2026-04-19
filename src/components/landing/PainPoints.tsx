export function PainPoints() {
  return (
    <section className="section">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">The Uncomfortable Part</span>
          <h2 className="display-headline mt-4">
            You're not lazy.
            <br />
            <span className="italic-serif accent-red">The system is loud.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right">
          Every admission cycle, 3 lakh students chase the same 4,500 seats.
          The noise doesn't help you. Let's turn it off.
        </p>
      </div>

      <div className="bento mt-12">
        <Card
          className="b-a"
          label="Too many sources"
          value="∞"
          note="Facebook group PDFs. Cousin's 2018 notes. YouTube playlists. Three coaching centers. You can't study ten things at once — and you shouldn't have to."
        />
        <Card
          className="b-b"
          label="Parents' watch"
          value="24/7"
          note="'পড়ছিস?' every 20 minutes. The anxiety compounds. We give you a ranked dashboard they can check instead."
        />
        <Card
          className="b-c"
          label="Mock papers"
          value="fake"
          note="Most mocks don't mirror the real difficulty curve. Ours are calibrated against 6 years of past papers."
        />
        <Card
          className="b-d"
          label="Doubts at 1am"
          value="silent"
          note="Toppers on the other end actually reply. Ceiling-staring is not a study technique."
        />
        <Card
          className="b-e"
          label="Time math"
          value="৫২ দিন"
          note="If admission is in 52 days and you sleep 7 hours, you have 585 usable hours left. We help you spend them where the marks are."
        />
        <Card
          className="b-f"
          label="Money"
          value="৳50,000+"
          note="Traditional coaching cost. Most families can't. That's why we exist."
        />
      </div>
    </section>
  );
}

type CardProps = {
  className?: string;
  label: string;
  value: string;
  note: string;
};

function Card({ className, label, value, note }: CardProps) {
  return (
    <div className={`card-tilt ${className ?? ''}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
          {label}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim">
          ×
        </span>
      </div>
      <div className="mt-2 font-display text-[3rem] leading-none tracking-tight accent-red">
        {value}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>
    </div>
  );
}
