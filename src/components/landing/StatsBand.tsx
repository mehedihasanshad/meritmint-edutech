export function StatsBand() {
  return (
    <section className="section section-tight">
      <div className="grid gap-10 md:grid-cols-4">
        <Stat
          value="14,200+"
          label="students currently preparing"
          note="across Bangladesh + diaspora"
        />
        <Stat
          value="2,847"
          label="medical / engineering / varsity placements"
          note="last three admission cycles combined"
          accent
        />
        <Stat
          value="48"
          label="topper-mentors on the platform"
          note="avg response time: 11 min"
        />
        <Stat
          value="৳3,200"
          label="full in-depth course, all inclusive"
          note="vs. ৳50,000+ traditional coaching"
        />
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  note,
  accent,
}: {
  value: string;
  label: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div
        className={`stat-number ${accent ? 'accent-red' : ''}`}
        style={{ fontFeatureSettings: '"tnum" on' }}
      >
        {value}
      </div>
      <div className="mt-3 h-px w-10 bg-accent/60" />
      <div className="mt-3 text-sm text-fg">{label}</div>
      <div className="mt-1 text-xs italic-serif text-dim">{note}</div>
    </div>
  );
}
