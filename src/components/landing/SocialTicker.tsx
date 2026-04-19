const ITEMS = [
  '342 students solving Physics Ch. 4 right now',
  'Medical prep batch — 87% seats filled',
  '12 toppers online · answering doubts',
  'New: HSC ICT মডেল টেস্ট dropped this morning',
  '১৪,২০০+ students practicing this week',
  'Fahim (BUET CSE \'24) teaching Math Ch. 9 at 9pm',
  'Last mock paper downloaded 2,381 times',
  'Tonight: Chemistry live doubt session · free',
];

export function SocialTicker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-strip" role="marquee">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="ticker-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
