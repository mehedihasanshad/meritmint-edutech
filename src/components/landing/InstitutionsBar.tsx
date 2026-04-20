const INSTITUTIONS = [
  { name: 'Dhaka Medical College', short: 'DMC' },
  { name: 'BUET', short: 'BUET' },
  { name: 'Dhaka University', short: 'DU' },
  { name: 'IBA · DU', short: 'IBA' },
  { name: 'Chittagong Medical', short: 'CMC' },
  { name: 'Rajshahi Medical', short: 'RMC' },
  { name: 'SUST', short: 'SUST' },
  { name: 'RUET', short: 'RUET' },
  { name: 'KUET', short: 'KUET' },
  { name: 'Sir Salimullah Medical', short: 'SSMC' },
  { name: 'Jahangirnagar University', short: 'JU' },
  { name: 'BUP', short: 'BUP' },
];

export function InstitutionsBar() {
  const doubled = [...INSTITUTIONS, ...INSTITUTIONS];
  return (
    <section className="section section-tight">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <span className="eyebrow">Placements · '23, '24, '25 cycles</span>
        <h2 className="display-headline mt-3 text-center">
          Where our toppers{' '}
          <span className="italic-serif accent-red">landed.</span>
        </h2>
      </div>

      <div className="marquee-wrap mt-8">
        <div className="marquee-track">
          {doubled.map((i, idx) => (
            <div key={idx} className="institution-chip">
              <span className="institution-short">{i.short}</span>
              <span className="institution-name">{i.name}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs italic-serif text-dim">
        Aggregate across all MeritMint admission-prep batches. Names of
        individual students on request.
      </p>
    </section>
  );
}
