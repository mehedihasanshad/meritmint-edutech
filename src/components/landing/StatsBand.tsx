export function StatsBand() {
  return (
    <section className="section section-tight">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          value="১৪,২০০+"
          label="শিক্ষার্থী এখন preparation নিচ্ছে"
          note="সারা বাংলাদেশ + diaspora জুড়ে"
        />
        <Stat
          value="২,৮৪৭"
          label="Medical · Engineering · Varsity placement"
          note="শেষ তিনটি admission cycle মিলিয়ে"
          accent
        />
        <Stat
          value="৪৮"
          label="Topper mentor platform-এ active"
          note="গড় reply time — ১১ মিনিট"
        />
        <Stat
          value="৳৩,২০০"
          label="ফুল in-depth course — সব কিছু included"
          note="Coaching ৳৫০,০০০+ বনাম এটা"
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
  const isBengali = /[\u0980-\u09FF]/.test(value);
  return (
    <div className="stat-tile">
      <div
        className={`stat-number ${accent ? 'accent-red' : ''}`}
        lang={isBengali ? 'bn' : undefined}
        style={{ fontFeatureSettings: '"tnum" on' }}
      >
        {value}
      </div>
      <div className="mt-3 h-px w-10 bg-accent/60" />
      <div
        className="mt-3 max-w-[26ch] text-[0.95rem] leading-snug text-fg"
        lang="bn"
      >
        {label}
      </div>
      <div
        className="mt-1.5 max-w-[26ch] text-xs italic-serif leading-snug text-dim"
        lang="bn"
      >
        {note}
      </div>
    </div>
  );
}
