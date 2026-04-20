export function PainPoints() {
  return (
    <section className="section">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span lang="bn">অস্বস্তিকর সত্যি</span>
          </span>
          <h2 className="display-headline mt-4">
            <span lang="bn">তুমি অলস না।</span>
            <br />
            <span lang="bn" className="italic-serif accent-red">
              সিস্টেমটাই noise।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          প্রতি admission cycle-এ ৩ লাখ শিক্ষার্থী একই ৪,৫০০ সিটের পিছনে ছোটে।
          এই noise তোমাকে help করে না। চলো এটা বন্ধ করি।
        </p>
      </div>

      <div className="bento mt-12">
        <Card
          className="b-a"
          label="Too many sources"
          bnLabel="অনেক source"
          value="∞"
          note="Facebook group-এর PDF. কাজিনের ২০১৮-এর notes. YouTube playlist. তিন coaching-এর বই। একসাথে ১০টা জায়গায় পড়া যায় না — দরকারও নেই।"
        />
        <Card
          className="b-b"
          label="Parents' watch"
          bnLabel="মা-বাবার watch"
          value="২৪/৭"
          note="'পড়ছিস?' প্রতি ২০ মিনিটে। Anxiety বাড়ে। আমরা একটা ranked dashboard দিই — ওনারা সেটা দেখলে কথা কম বলেন।"
        />
        <Card
          className="b-c"
          label="Mock papers"
          bnLabel="Mock paper"
          value="fake"
          note="বেশিরভাগ mock আসল paper-এর difficulty match করে না। আমাদেরগুলো ৬ বছরের past paper-এর বিপরীতে calibrated।"
        />
        <Card
          className="b-e"
          label="Time math"
          bnLabel="সময়ের হিসাব"
          value="৫২ দিন"
          note="Admission যদি ৫২ দিন পর হয় আর তুমি ৭ ঘণ্টা ঘুমাও, হাতে ৫৮৫ কার্যকর ঘণ্টা। সেটা ঠিক জায়গায় খরচ করতে সাহায্য করি।"
        />
        <Card
          className="b-f"
          label="Money"
          bnLabel="টাকা"
          value="৳৫০,০০০+"
          note="Traditional coaching-এর দাম। বেশিরভাগ family afford করতে পারে না। সেই কারণেই আমরা আছি।"
        />
      </div>
    </section>
  );
}

type CardProps = {
  className?: string;
  label: string;
  bnLabel: string;
  value: string;
  note: string;
};

function Card({ className, label, bnLabel, value, note }: CardProps) {
  return (
    <div className={`card-tilt ${className ?? ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim">
            {label}
          </span>
          <span className="block text-[0.7rem] text-dim" lang="bn">
            {bnLabel}
          </span>
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-dim">
          ×
        </span>
      </div>
      <div className="mt-2 font-display text-[3rem] leading-none tracking-tight accent-red">
        {value}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted" lang="bn">
        {note}
      </p>
    </div>
  );
}
