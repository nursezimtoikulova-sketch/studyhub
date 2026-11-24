// ===== Shared learning engine: markdown, Leitner flashcards, quiz, match, blitz =====
// Mini markdown: ## heading, - bullet, > tip, | table |, **bold**, `code`, *italic*
function md(src) {
  const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/~(.+?)~/g, '<code>$1</code>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  let out = '', list = false, tbl = null;
  const flush = () => { if (list) { out += '</ul>'; list = false; } if (tbl) { out += '<div class="tbl"><table>' + tbl.map((r, i) => '<tr>' + r.map(c => i ? `<td>${inl(c)}</td>` : `<th>${inl(c)}</th>`).join('') + '</tr>').join('') + '</table></div>'; tbl = null; } };
  src.trim().split('\n').forEach(l => {
    l = l.trim();
    if (l.startsWith('|')) { if (list) { out += '</ul>'; list = false; } (tbl = tbl || []).push(l.replace(/^\||\|$/g, '').split('|').map(s => s.trim())); return; }
    if (l.startsWith('- ')) { if (tbl) flush(); if (!list) { out += '<ul>'; list = true; } out += `<li>${inl(l.slice(2))}</li>`; return; }
    flush();
    if (!l) return;
    if (l.startsWith('## ')) out += `<h3>${inl(l.slice(3))}</h3>`;
    else if (l.startsWith('> ')) out += `<p class="tip">💡 ${inl(l.slice(2))}</p>`;
    else out += `<p>${inl(l)}</p>`;
  });
  flush(); return out;
}
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];

// ---- Leitner flashcards. cards: [[front, back, (extra)]]. opts: {key, speak: lang for front, title}
function Deck(host, cards, opts) {
  const key = 'deck.' + opts.key; let st = Store.get(key, {}); let cur = null, rev = !!opts.reverse, flipped = false, seen = 0, right = 0;
  host.innerHTML = `<div class="deck"><div class="row small"><span class="deck-boxes"></span><label style="margin-left:auto"><input type="checkbox" class="d-rev" ${rev ? 'checked' : ''}> обратная сторона</label></div>
    <div class="flash d-card" tabindex="0"></div>
    <div class="row" style="justify-content:center"><button class="btn bad d-no">✗ Не знаю <span class="muted small">(1)</span></button><button class="btn ok d-yes">✓ Знаю <span class="muted small">(2)</span></button></div>
    <p class="small muted" style="text-align:center">Нажми на карточку или пробел — перевернуть. Коробки Лейтнера: правильный ответ двигает карточку в следующую коробку (реже повторяется), ошибка — обратно в 1.</p><p class="small d-sess" style="text-align:center"></p></div>`;
  const id = c => c[0];
  const boxes = () => { const n = [0, 0, 0, 0, 0, 0]; cards.forEach(c => n[st[id(c)] || 0]++); $('.deck-boxes', host).innerHTML = `Новые: <b>${n[0]}</b> · ` + [1, 2, 3, 4, 5].map(b => `📦${b}: <b>${n[b]}</b>`).join(' · ') + ` · <span class="muted">выучено ${Math.round(n[5] / cards.length * 100)}%</span>`; };
  const next = () => {
    // weight: new and low boxes more often
    const w = cards.map(c => { const b = st[id(c)] || 0; return b === 0 ? 4 : [0, 8, 4, 2, 1, .4][b]; }); let r = Math.random() * w.reduce((a, b) => a + b, 0), i = 0;
    for (; i < w.length; i++) { r -= w[i]; if (r <= 0) break; }
    let c = cards[Math.min(i, cards.length - 1)]; if (c === cur && cards.length > 1) c = cards[(cards.indexOf(c) + 1) % cards.length];
    cur = c; flipped = false; draw(); if (opts.speak && !rev) Speech.say(cur[0], opts.speak);
  };
  const draw = () => { const f = rev ? cur[1] : cur[0], b = rev ? cur[0] : cur[1];
    $('.d-card', host).innerHTML = flipped ? `<div>${esc(f)}</div><div class="back" style="color:var(--ink)">${esc(b)}</div>${cur[2] ? `<div class="back small">${esc(cur[2])}</div>` : ''}` : `${esc(f)}<div class="back small">📦 ${st[id(cur)] || 'новая'} · нажми, чтобы перевернуть</div>`; };
  const grade = ok => { if (!cur) return; seen++; right += ok; st[id(cur)] = ok ? Math.min(5, (st[id(cur)] || 0) + 1) : 1; Store.set(key, st); boxes(); $('.d-sess', host).textContent = `Эта сессия: ${right} / ${seen}`; next(); };
  $('.d-card', host).onclick = () => { flipped = !flipped; draw(); if (flipped && opts.speak && rev) Speech.say(cur[0], opts.speak); };
  $('.d-card', host).onkeydown = e => { if (e.key === ' ') { e.preventDefault(); $('.d-card', host).click(); } if (e.key === '1') grade(0); if (e.key === '2') grade(1); };
  $('.d-yes', host).onclick = () => grade(1); $('.d-no', host).onclick = () => grade(0);
  $('.d-rev', host).onchange = e => { rev = e.target.checked; draw(); };
  boxes(); const sp0 = opts.speak; opts.speak = null; next(); opts.speak = sp0;
  return { progress: () => cards.filter(c => (st[id(c)] || 0) >= 4).length / cards.length };
}

// ---- Quiz. qs: [[question, [options], correctIndex, explanation]]. opts: {key, n, timer(min), title}
function Quiz(host, qs, opts) {
  const key = 'quiz.' + opts.key; let list = [], i = 0, score = 0, wrong = [], t0, tick;
  const start = (src) => {
    list = shuffle(src).slice(0, opts.n || src.length).map(q => { const o = q[1].map((x, k) => [x, k === q[2]]); return [q[0], shuffle(o), q[3]]; });
    i = 0; score = 0; wrong = []; t0 = Date.now(); clearInterval(tick);
    if (opts.timer) tick = setInterval(() => { const left = opts.timer * 60 - (Date.now() - t0) / 1000; const t = $('.q-time', host); if (!t) return clearInterval(tick); if (left <= 0) { clearInterval(tick); finish(); } else t.textContent = `⏱ ${Math.floor(left / 60)}:${String(Math.floor(left % 60)).padStart(2, '0')}`; }, 1000);
    show();
  };
  const show = () => { const q = list[i];
    host.innerHTML = `<div class="row small muted"><span>Question ${i + 1} / ${list.length}</span><span>Score: ${score}</span><span class="q-time"></span></div><div class="bar"><i style="width:${i / list.length * 100}%"></i></div>
     <p class="q-text">${esc(q[0])}</p><div class="q-opts">${q[1].map((o, k) => `<button class="opt" data-k="${k}"><b>${'ABCD'[k]}.</b> ${esc(o[0])}</button>`).join('')}</div><div class="q-ex"></div>`;
    $$('.opt', host).forEach(b => b.onclick = () => answer(+b.dataset.k)); };
  const answer = k => { const q = list[i], ok = q[1][k][1]; if ($('.opt[disabled]', host)) return; score += ok; if (!ok) wrong.push(q);
    $$('.opt', host).forEach((b, j) => { b.disabled = true; if (q[1][j][1]) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); });
    $('.q-ex', host).innerHTML = `<p class="res ${ok ? 'good' : 'bad'}">${ok ? '✅ Correct!' : '❌ Incorrect'}</p>${q[2] ? `<p class="tip">📘 ${esc(q[2])}</p>` : ''}<button class="btn q-next">${i + 1 < list.length ? 'Next →' : 'See results'}</button>`;
    $('.q-next', host).onclick = () => { i++; i < list.length ? show() : finish(); }; $('.q-next', host).focus(); };
  const finish = () => { clearInterval(tick); const pct = Math.round(score / list.length * 100), best = Store.get(key, 0); if (pct > best) Store.set(key, pct);
    const scaled = Math.round(100 + pct / 100 * 800);
    host.innerHTML = `<h3>Result: ${score} / ${list.length} (${pct}%)</h3>${opts.exam ? `<p>≈ CompTIA scale: <b>${scaled} / 900</b> — passing score 750 ${scaled >= 750 ? '✅' : '❌'}</p>` : ''}<p class="muted">Best score: ${Math.max(best, pct)}% · time ${Math.round((Date.now() - t0) / 60000)} min</p>
     ${wrong.length ? `<h3>Review your mistakes:</h3><ol>${wrong.map(q => `<li><b>${esc(q[0])}</b><br>✔ ${esc(q[1].find(o => o[1])[0])}${q[2] ? `<br><span class="muted small">${esc(q[2])}</span>` : ''}</li>`).join('')}</ol>` : '<p>🎉 No mistakes!</p>'}
     <div class="row"><button class="btn q-again">Try again</button>${wrong.length ? '<button class="btn ghost q-wrong">Retry mistakes only</button>' : ''}</div>`;
    $('.q-again', host).onclick = () => start(qs); if (wrong.length) { const w = wrong.map(q => [q[0], q[1].map(o => o[0]), q[1].findIndex(o => o[1]), q[2]]); $('.q-wrong', host).onclick = () => start(w); }
    App.refreshHome && App.refreshHome(); };
  host.innerHTML = `<p>${qs.length} questions${opts.n && opts.n < qs.length ? `, ${opts.n} random per test` : ''}${opts.timer ? `, time limit ${opts.timer} min` : ''}. Best: <b>${Store.get(key, 0)}%</b></p><button class="btn q-go">Start ▶</button>`;
  $('.q-go', host).onclick = () => start(qs);
}

// ---- Match game: click a left item then its pair on the right. pairs: [[a,b]]
function Match(host, pairs, opts) {
  const key = 'match.' + opts.key, n = opts.n || 6;
  const round = () => {
    const set = shuffle(pairs).slice(0, n), L = shuffle(set.map((p, i) => [p[0], i])), R = shuffle(set.map((p, i) => [p[1], i]));
    let sel = null, done = 0, miss = 0; const t0 = Date.now();
    host.innerHTML = `<div class="row small muted"><span>Соедини пары</span><span class="m-st"></span></div><div class="match"><div>${L.map(x => `<button class="opt m" data-s="L" data-i="${x[1]}">${esc(x[0])}</button>`).join('')}</div><div>${R.map(x => `<button class="opt m" data-s="R" data-i="${x[1]}">${esc(x[0])}</button>`).join('')}</div></div><div class="m-end"></div>`;
    const st = () => $('.m-st', host).textContent = `${done}/${n} · ошибок ${miss}`; st();
    $$('.m', host).forEach(b => b.onclick = () => {
      if (b.disabled) return;
      if (!sel || sel.dataset.s === b.dataset.s) { if (sel) sel.classList.remove('sel'); sel = b; b.classList.add('sel'); if (opts.speak && b.dataset.s === 'L') Speech.say(b.textContent, opts.speak); return; }
      if (sel.dataset.i === b.dataset.i) { [sel, b].forEach(x => { x.disabled = true; x.classList.add('right'); x.classList.remove('sel'); }); done++; sel = null; st();
        if (done === n) { const t = ((Date.now() - t0) / 1000).toFixed(1), best = Store.get(key, 999); if (miss === 0 && +t < best) Store.set(key, +t);
          $('.m-end', host).innerHTML = `<p class="res good">🎉 ${t} сек, ошибок: ${miss}. Рекорд без ошибок: ${Math.min(best, miss ? best : +t) === 999 ? '—' : Math.min(best, miss ? best : +t) + ' сек'}</p><button class="btn m-again">Новый раунд</button>`; $('.m-again', host).onclick = round; } }
      else { miss++; st(); b.classList.add('wrong'); sel.classList.add('wrong'); const a = sel; setTimeout(() => { a.classList.remove('wrong', 'sel'); b.classList.remove('wrong'); }, 500); sel = null; }
    });
  };
  round();
}

// ---- Blitz: 60 seconds, choose the right answer, streak multiplier. pairs: [[prompt, answer]]
function Blitz(host, pairs, opts) {
  const key = 'blitz.' + opts.key, secs = opts.secs || 60;
  const intro = () => { host.innerHTML = `<p>${secs} секунд. Отвечай как можно быстрее — серия правильных ответов умножает очки (×2 после 3, ×3 после 6). Рекорд: <b>${Store.get(key, 0)}</b></p><button class="btn b-go">Старт ⚡</button>`; $('.b-go', host).onclick = go; };
  const go = () => {
    let score = 0, streak = 0, ok = 0, bad = 0; const end = Date.now() + secs * 1000; let timer;
    const q = () => { const p = pick(pairs); const opts4 = [p[1]]; let guard = 0; while (opts4.length < 4 && guard++ < 100) { const o = pick(pairs)[1]; if (!opts4.includes(o)) opts4.push(o); }
      const sh = shuffle(opts4);
      host.innerHTML = `<div class="row small"><b class="b-t"></b><span>Очки: <b>${score}</b></span><span>Серия: ${streak} ${streak >= 6 ? '🔥×3' : streak >= 3 ? '🔥×2' : ''}</span></div><p class="q-text" style="font-size:24px">${esc(p[0])}</p><div class="q-opts">${sh.map(o => `<button class="opt">${esc(o)}</button>`).join('')}</div>`;
      if (opts.speak) Speech.say(p[0], opts.speak);
      $$('.opt', host).forEach(b => b.onclick = () => { const good = b.textContent === p[1]; if (good) { ok++; streak++; score += 10 * (streak >= 6 ? 3 : streak >= 3 ? 2 : 1); b.classList.add('right'); } else { bad++; streak = 0; b.classList.add('wrong'); $$('.opt', host).find(x => x.textContent === p[1]).classList.add('right'); }
        setTimeout(() => Date.now() < end ? q() : fin(), good ? 250 : 900); }); tickF(); };
    const tickF = () => { const t = $('.b-t', host); if (t) t.textContent = '⏱ ' + Math.max(0, Math.ceil((end - Date.now()) / 1000)); };
    timer = setInterval(() => { tickF(); if (Date.now() >= end) { clearInterval(timer); fin(); } }, 250);
    const fin = () => { clearInterval(timer); if (host.dataset.fin === String(end)) return; host.dataset.fin = String(end); const best = Store.get(key, 0); if (score > best) Store.set(key, score);
      host.innerHTML = `<h3>${score > best ? '🏆 Новый рекорд! ' : ''}Очки: ${score}</h3><p>Правильно: ${ok} · ошибок: ${bad} · рекорд: ${Math.max(score, best)}</p><button class="btn b-go">Ещё раз ⚡</button>`; $('.b-go', host).onclick = go; };
    q();
  };
  intro();
}
