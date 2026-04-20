const QA = [
  {
    q: 'ভাই, ২ মাস বাকি। আমি কি শেষ?',
    a: 'একদম না। Crash Course এই জন্যই আছে। ৬ সপ্তাহের sprint lesson + highest-weightage chapter। গত cycle-এর অনেক topper এখান থেকেই শুরু করেছিল।',
  },
  {
    q: '10MS / Shikho থেকে এটা কতটা আলাদা?',
    a: 'আমরা শুধু admission prep করি — school syllabus না। ছোট ব্যাচ, real topper mentor, ranked mock। Focus-এ ওরা আমাদের match করতে পারবে না।',
  },
  {
    q: 'আমার এলাকায় net ভালো না, video বাফার করলে কী হবে?',
    a: 'সব lesson download করা যায়। PDF offline চলে। Printed বই পৌঁছে দেই বাড়িতে। এক দাগ signal-এও প্রস্তুতি চালানো যাবে।',
  },
  {
    q: 'যদি admission না হয়?',
    a: 'সৎভাবে বলি: কোনো platform guarantee দিতে পারে না। আমরা guarantee দিই — তুমি যেসব gap আছে সেগুলো জেনে exam hall-এ ঢুকবে। প্রথম ১৪ দিনে refund চাইলে full refund।',
  },
  {
    q: 'Payment কীভাবে করবো?',
    a: 'bKash, Nagad, Rocket — যেকোনোটা। Card-ও কাজ করে। দুই installment-এ ভাগ করেও দিতে পারো।',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="mb-10 max-w-2xl">
        <span className="eyebrow">সোজা উত্তর</span>
        <h2 className="display-headline mt-4">
          <span lang="bn">যেসব প্রশ্ন</span>
          <br />
          <span lang="bn" className="italic-serif">
            সবাই আসলেই জিজ্ঞেস করে।
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        {QA.map((qa, i) => (
          <div key={i} className="faq-row">
            <div className="bubble bubble-q">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim">
                student
              </span>
              <p className="mt-1" lang="bn">
                {qa.q}
              </p>
            </div>
            <div className="bubble bubble-a">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/80">
                meritmint
              </span>
              <p className="mt-1" lang="bn">
                {qa.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
