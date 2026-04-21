const QA = [
  {
    q: 'ভাই, হাতে ২ মাস। শেষ তো?',
    a: 'শেষ না। Crash Course এই জন্যই বানানো। ছয় সপ্তাহের ছোট-ছোট sprint lesson আর যেসব chapter-এ সবচেয়ে বেশি মার্ক আসে সেগুলোর drill। গত cycle-এর অনেক topper এখান থেকেই শুরু করেছিল।',
  },
  {
    q: '10 Minute School বা Shikho-র সাথে পার্থক্য কী?',
    a: 'ওরা সবকিছু পড়ায়। আমরা শুধু non-science university admission, SSC-পর্যন্ত academic, Spoken English, Competitive Math আর admission-এর বই-completion এই কয়েকটাতেই মন দিই। ছোট ব্যাচ, real topper mentor, ranked mock — focus-এর জায়গায় ওরা আমাদের ছুঁতে পারবে না।',
  },
  {
    q: 'আমার এলাকায় net দুর্বল। Video buffer করলে কী করবো?',
    a: 'সব lesson download করা যায়, PDF offline-এ চলে। Printed বই-গুলো বাড়িতে পাঠিয়ে দিই। এক দাগ signal দিয়েও preparation চালানো যাবে।',
  },
  {
    q: 'যদি admission-এ না হয়, তাহলে?',
    a: 'সৎভাবে বলি — কোনো platform admission guarantee দিতে পারে না। আমরা একটাই guarantee দিই: পরীক্ষার হলে ঢোকার আগে তুমি জানবে তোমার gap কোথায়। প্রথম ১৪ দিনে মন না বসলে পুরো টাকা ফেরত, কোনো প্রশ্ন ছাড়াই।',
  },
  {
    q: 'আমি science background-এর — তোমাদের কাছে কী আছে?',
    a: 'Admission prep-টা non-science-দের জন্য, এটা সত্যি। কিন্তু SSC-পর্যন্ত academic course-এ Physics, Chemistry, Biology, Higher Math, ICT সব আছে। Spoken English আর Competitive Math তো সবার জন্যই খোলা। HSC-এর পর science admission এখনও আমাদের scope-এ নেই — মিথ্যা বলব না।',
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
            আসলেই সবাই জিজ্ঞেস করে।
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
