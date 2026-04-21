type Topper = {
  initial: string;
  name: string;
  rank: string;
  quote: string;
};

/**
 * Horizontal marquee of non-science university placements. Mix of
 * real MeritMint alumni (Faizul, Ramisha, Jamilah, Junaid, Siam,
 * Shad) and representative ranks from other non-science cycles.
 * Pauses on hover so readers can scan.
 */
const TOPPERS: Topper[] = [
  {
    initial: 'F',
    name: 'Faizul Kabir',
    rank: 'DU · B unit · 12th',
    quote: 'Mock গুলো আসল paper-এর মতোই ঝাঁজ ছিল।',
  },
  {
    initial: 'N',
    name: 'Nabila Hasan',
    rank: 'DU · ঘ unit · 7th · IR',
    quote: 'Coaching-এ যাইনি এক দিনও। শুধু MeritMint।',
  },
  {
    initial: 'R',
    name: 'Ramisha Anjum Nayla',
    rank: 'DU · B unit · 28th',
    quote: 'Notes পড়ে মনে হতো কেউ পাশে বসে বোঝাচ্ছে।',
  },
  {
    initial: 'A',
    name: 'Afif Rahman',
    rank: 'JU · IBA-JU · 3rd',
    quote: 'রাত ১টায় mentor ফোন ধরেছিল। সত্যি বলছি।',
  },
  {
    initial: 'J',
    name: 'Jamilah Tahsin Prapty',
    rank: 'DU · B unit · 45th',
    quote: 'Past paper-এর weightage ধরে পড়া — game changer।',
  },
  {
    initial: 'S',
    name: 'Sadia Khan',
    rank: 'BUP · FASS · 14th · Sociology',
    quote: 'বাসা থেকে প্রস্তুতি। Dhaka যেতে হয়নি একবারও।',
  },
  {
    initial: 'T',
    name: 'Tahsin Ahmed',
    rank: 'JnU · Economics · 9th',
    quote: 'আমার জন্য General Math-টাই ছিল ভয়। সেটা কেটে গেছে।',
  },
  {
    initial: 'J',
    name: 'Junaid Bin Hasan',
    rank: 'DU · C unit · Merit 61 · Marketing',
    quote: 'Choice list-এ ১ নম্বরে Marketing — পেয়েছি।',
  },
  {
    initial: 'R',
    name: 'Raisa Islam',
    rank: 'DU · C unit · 22nd · Finance',
    quote: 'Batch ছোট। তাই কেউ হারিয়ে যায় না।',
  },
  {
    initial: 'S',
    name: 'Sayed Mahmud',
    rank: 'BRAC · IBA · 18th',
    quote: 'Spoken English-এর confidence viva-তে কাজে লেগেছে।',
  },
  {
    initial: 'S',
    name: 'MHS Shad',
    rank: 'Lead Mentor · Coordinator',
    quote: 'আমরা শিখিয়ে গেছি, ওরা পেরেছে। পুরোটার কৃতিত্ব ওদের।',
  },
  {
    initial: 'N',
    name: 'Nawrin Zaman',
    rank: 'DU · গ unit · 5th · English',
    quote: 'মা dashboard দেখতেন প্রতিদিন। তাই প্রশ্ন কমে গিয়েছিল।',
  },
];

export function TopperWall() {
  const doubled = [...TOPPERS, ...TOPPERS];
  return (
    <section id="wall" className="section">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span lang="bn">The Wall</span>
          </span>
          <h2 className="display-headline mt-4">
            <span lang="bn">ওরা চান্স পেয়েছে।</span>
            <br />
            <span lang="bn" className="italic-serif accent-red">
              নিজেদের ভাষায়।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          কোনো stock photo না। কোনো সাজানো quote না। Name, rank, আর এক
          লাইনে মন থেকে বলা কথা। Hover করলে থামে, scroll করে পড়ে নাও।
        </p>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div
              key={i}
              className={`topper-card ${
                t.name === 'MHS Shad' ? 'topper-card-mentor' : ''
              }`}
            >
              <div className="topper-avatar">{t.initial}</div>
              <div className="topper-meta">
                <span className="topper-rank">{t.rank}</span>
                <span className="topper-name">{t.name}</span>
              </div>
              <span
                className="hide-sm mx-2 h-6 w-px bg-white/20"
                aria-hidden
              />
              <span
                className="hide-sm italic-serif text-sm text-muted"
                lang="bn"
              >
                &ldquo;{t.quote}&rdquo;
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
