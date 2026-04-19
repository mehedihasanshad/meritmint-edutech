const api = (path, opts = {}) => fetch('/api' + path, opts).then(r => r.json());

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
modalClose && modalClose.addEventListener('click', () => { modal.classList.add('hidden') });

document.getElementById('btn-login').addEventListener('click', openLogin);
document.getElementById('btn-dashboard').addEventListener('click', openDashboard);

function openLogin(){
  modalContent.innerHTML = `
    <h3>Login / Register</h3>
    <div>
      <input id="username" placeholder="username" class="login-form" />
      <input id="password" placeholder="password" type="password" class="login-form" />
      <button id="do-login">Login</button>
      <button id="do-register">Register</button>
    </div>
  `;
  modal.classList.remove('hidden');
  document.getElementById('do-login').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await api('/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) });
    if (res.ok) { modal.classList.add('hidden'); alert('Logged in as ' + username); }
    else alert('Login failed');
  });
  document.getElementById('do-register').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await api('/register', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) });
    if (res.ok) { modal.classList.add('hidden'); alert('Registered and logged in'); }
    else alert('Register failed (maybe username taken)');
  });
}

async function openDashboard(){
  modalContent.innerHTML = `<h3>Dashboard</h3><div id="dash-body">Loading...</div>`;
  modal.classList.remove('hidden');
  const res = await api('/dashboard');
  if (res.error === 'login') {
    modalContent.innerHTML += `<p>Please log in first.</p>`;
    return;
  }
  const body = document.getElementById('dash-body');
  body.innerHTML = '<h4>Purchases</h4>' + (res.purchases.length ? '<ul>' + res.purchases.map(p => `<li>Course ${p.course_id} — Tx: ${p.transaction_id} — expires: ${new Date(p.expires_at).toLocaleString()}</li>`).join('') + '</ul>' : '<p>None</p>');
  body.innerHTML += '<h4>Results</h4>' + (res.results.length ? '<ul>' + res.results.map(r => `<li>${r.title} — ${r.score} — ${new Date(r.created_at).toLocaleString()}</li>`).join('') + '</ul>' : '<p>No results</p>');
}

async function loadExams(){
  const list = document.getElementById('exams-list');
  const exams = await api('/exams');
  if (!exams || exams.length === 0) { list.innerHTML = '<p>No exam batches running.</p>'; return; }
  list.innerHTML = exams.map(e => `<div class="exam glass"><div><strong>${e.title}</strong></div><div><button data-id="${e.id}" class="take">Take Exam</button></div></div>`).join('');
  document.querySelectorAll('.take').forEach(btn => btn.addEventListener('click', () => openExam(btn.dataset.id)));
}

async function openExam(id){
  const data = await api('/exam/' + id);
  if (data.error) { alert('Could not open exam'); return; }
  modalContent.innerHTML = `<h3>${data.exam.title}</h3><form id="exam-form"></form><button id="submit-exam">Submit</button>`;
  const form = document.getElementById('exam-form');
  data.questions.forEach((q, idx) => {
    form.innerHTML += `<div class="q glass" style="padding:8px;margin:8px 0;border-radius:8px"><p><strong>${idx+1}.</strong> ${q.question}</p>
      <label><input type="radio" name="q${q.id}" value="a"> ${q.opt_a}</label><br>
      <label><input type="radio" name="q${q.id}" value="b"> ${q.opt_b}</label><br>
      <label><input type="radio" name="q${q.id}" value="c"> ${q.opt_c}</label><br>
      <label><input type="radio" name="q${q.id}" value="d"> ${q.opt_d}</label></div>`;
  });
  modal.classList.remove('hidden');
  document.getElementById('submit-exam').addEventListener('click', async () => {
    const answers = [];
    data.questions.forEach(q => {
      const sel = document.querySelector(`input[name="q${q.id}"]:checked`);
      answers.push({ questionId: q.id, answer: sel ? sel.value : null });
    });
    const res = await api('/submit', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ examId: data.exam.id, answers }) });
    if (res.error === 'login') { alert('Please login to submit'); return; }
    if (res.ok) {
      // immediate per-question feedback
      let out = `<h4>Score: ${res.score}/${res.totalQuestions}</h4>`;
      out += '<div>' + res.details.map(d => `<div style="padding:6px;margin:6px 0;background:rgba(255,255,255,0.03);border-radius:6px"><strong>Q ${d.questionId}</strong> — Your: ${d.given} — Correct: ${d.correct} — ${d.isCorrect?'<span style="color:#0f0">Correct</span>':'<span style="color:#f55">Wrong</span>'}</div>`).join('') + '</div>';
      modalContent.innerHTML = out + '<p>Result saved. Check dashboard for history and leaderboard for rank.</p>';
    }
  });
}

// Purchase flow: ask for transaction id and call /purchase
document.querySelectorAll('.buy').forEach(btn => btn.addEventListener('click', () => {
  const courseId = btn.dataset.course;
  modalContent.innerHTML = `<h3>Purchase Course ${courseId}</h3><input id="tx-id" class="tx-input" placeholder="Enter Transaction ID" /><button id="do-purchase">Submit Transaction</button>`;
  modal.classList.remove('hidden');
  document.getElementById('do-purchase').addEventListener('click', async () => {
    const tx = document.getElementById('tx-id').value.trim();
    if (!tx) return alert('Enter transaction id');
    const res = await api('/purchase', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ courseId, transactionId: tx }) });
    if (res.error === 'login') { alert('Please login first'); return; }
    if (res.ok) { alert('Purchase saved.'); modal.classList.add('hidden'); }
  });
}));

loadExams();
