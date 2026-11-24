// ===== CHESS extras: engine + coach, opening trainer, mate in 2, endgame trainer, coordinates, flashcards =====
const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const CENTER = [0, 1, 2, 3, 3, 2, 1, 0];
function evalBoard(g) { // + good for white
  let s = 0; const b = g.board();
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) { const p = b[r][f]; if (!p) continue;
    let v = VAL[p.type]; if (p.type === 'n' || p.type === 'b') v += (CENTER[r] + CENTER[f]) * 4; if (p.type === 'p') v += (p.color === 'w' ? 6 - r : r - 1) * 6 + (CENTER[f] * 2);
    s += p.color === 'w' ? v : -v; }
  return s;
}
function search(g, depth, a, b, max) {
  if (g.in_checkmate()) return max ? -99999 - depth : 99999 + depth;
  if (g.in_draw() || g.in_stalemate()) return 0;
  if (depth === 0) return evalBoard(g);
  const ms = g.moves({ verbose: true }).sort((x, y) => (y.captured ? VAL[y.captured] : 0) - (x.captured ? VAL[x.captured] : 0));
  for (const m of ms) { g.move(m); const v = search(g, depth - 1, a, b, !max); g.undo();
    if (max) { if (v > a) a = v; } else { if (v < b) b = v; } if (a >= b) break; }
  return max ? a : b;
}
function bestMove(g, depth) {
  const white = g.turn() === 'w'; let best = null, bv = white ? -Infinity : Infinity;
  for (const m of shuffle(g.moves({ verbose: true }))) { g.move(m); const v = search(g, depth - 1, -Infinity, Infinity, !white) + (Math.random() * 20 - 10); g.undo();
    if (white ? v > bv : v < bv) { bv = v; best = m; } }
  return best;
}
// Side `side` generating moves regardless of turn
function asTurn(fen, side) { const p = fen.split(' '); p[1] = side; p[3] = '-'; return p.join(' '); }
// Pieces of `side` that are attacked and not adequately defended
function hanging(g, side) {
  const res = [], opp = side === 'w' ? 'b' : 'w'; const t = new Chess();
  if (!t.load(asTurn(g.fen(), opp))) return res;
  const caps = t.moves({ verbose: true }).filter(m => m.captured && m.color === opp);
  const bySq = {}; caps.forEach(m => { (bySq[m.to] = bySq[m.to] || []).push(m); });
  for (const sq in bySq) { const piece = g.get(sq); if (!piece || piece.color !== side || piece.type === 'k') continue;
    const minAtt = Math.min(...bySq[sq].map(m => VAL[m.piece] || 100));
    t.move(bySq[sq][0]); const defended = t.moves({ verbose: true }).some(m => m.to === sq); t.undo();
    if (!defended || minAtt < VAL[piece.type]) res.push(sq + ' (' + { p: 'пешка', n: 'конь', b: 'слон', r: 'ладья', q: 'ферзь' }[piece.type] + ')'); }
  return res;
}
function mateIn1Moves(fen) { const g = new Chess(fen); return g.moves().filter(m => { g.move(m); const ok = g.in_checkmate(); g.undo(); return ok; }); }
function isMate2First(fen, mv) { const g = new Chess(fen); if (!g.move(mv)) return false; if (g.in_checkmate()) return true; const rs = g.moves(); if (!rs.length) return false;
  return rs.every(r => { g.move(r); const ok = mateIn1Moves(g.fen()).length > 0; g.undo(); return ok; }); }

const M2 = [
 ['r5k1/5ppp/8/8/8/8/3R1PPP/3R2K1 w - - 0 1','Сдвоенные ладьи и последняя горизонталь'],
 ['6k1/8/8/8/8/8/R7/1R4K1 w - - 0 1','Линейный мат: сначала отрежь короля'],
 ['k7/8/2K5/8/8/8/8/7R w - - 0 1','Король + ладья: тихий ход королём'],
 ['7k/8/5K2/8/8/8/8/R7 w - - 0 1','Король + ладья (зеркально)'],
 ['1r5k/6pp/7N/3Q4/8/8/8/6K1 w - - 0 1','Спёртый мат: жертва ферзя'],
 ['5rk1/6pp/8/8/8/1B6/5PPP/3Q2K1 w - - 0 1','Слон по диагонали a2-g8 + ферзь'],
];
const CH_CARDS = [['Ценность фигур','Пешка 1, конь 3, слон 3, ладья 5, ферзь 9'],['CCT','Checks, Captures, Threats — проверяй перед каждым ходом'],['Вилка (fork)','Одна фигура атакует две цели сразу'],['Связка (pin)','Фигура не может уйти: за ней более ценная (абсолютная — за ней король)'],['Сквозной удар (skewer)','Атака ценной фигуры, за которой стоит другая'],['Открытый шах','Уход фигуры открывает шах другой фигурой'],['Двойной шах','Шах двумя фигурами — король обязан уходить'],['Отвлечение (deflection)','Заставить защитника уйти с важного поля'],['Завлечение (decoy)','Заманить фигуру на плохое поле жертвой'],['Мат по последней горизонтали','Король заперт своими пешками; профилактика — «форточка» h3/h6'],['Принципы дебюта','Центр, развитие, рокировка, не выводить рано ферзя'],['Оппозиция','Короли напротив через одно поле — выигрывает тот, кто НЕ должен ходить'],['Правило квадрата','Если король входит в квадрат пешки — он её догонит'],['Позиция Филидора','Защита в ладейном эндшпиле: ладья на 6-й (3-й) горизонтали'],['Позиция Лусены','Выигрыш в ладейном эндшпиле: «строим мост» ладьёй'],['Мат ферзём','Ферзь отрезает короля «ходом коня», король подходит; бойся пата!'],['Мат ладьёй','Метод коробки: уменьшай клетку ладьёй, король помогает'],['Слабое поле','Поле, которое нельзя защитить пешкой — место для коня'],['Открытая линия','Вертикаль без пешек — место для ладьи'],['Худшая фигура','Нет тактики? Улучши свою худшую фигуру'],['Итальянская партия','1.e4 e5 2.Nf3 Nc6 3.Bc4'],['Лондонская система','1.d4 d5 2.Bf4 + e3, Nf3, c3, Nbd2, Bd3'],['Ферзевый гамбит отказанный','1.d4 d5 2.c4 e6'],['Защита от детского мата','…Nc6, …g6, …Nf6 — не паникуй'],['Пат','Нет ходов и нет шаха = ничья. Опасно при матовании ферзём'],['Рокировка','Король на 2 поля к ладье; нельзя из-под шаха, через битое поле и если король/ладья ходили']];

function chessExtra(el) {
  // ---------- Play vs computer with coach ----------
  const P = $('#chPlay', el);
  P.innerHTML = `<div class="card"><div class="row"><label>Цвет: <select id="gCol"><option value="w">Белые</option><option value="b">Чёрные</option></select></label><label>Уровень: <select id="gLvl"><option value="1">1 — новичок</option><option value="2" selected>2 — ~800</option><option value="3">3 — ~1000+ (думает дольше)</option></select></label><label><input type="checkbox" id="gCoach" checked> тренер (предупреждает о зевках)</label><button class="btn" id="gNew">Новая партия</button><button class="btn ghost" id="gUndo">↶ Вернуть ход</button></div>
   <div class="row" style="align-items:flex-start;gap:16px;margin-top:10px"><div id="gBoard"></div><div style="flex:1;min-width:220px"><p id="gStatus" class="res"></p><div id="gCoachBox" class="tip small">Тренер: перед ходом проверь шахи, взятия, угрозы (CCT).</div><p class="small muted" id="gPgn" style="font-family:Consolas,monospace"></p></div></div></div>`;
  let me = 'w';
  const gb = makeBoard($('#gBoard', P), { fen: 'start', onMove: (m, g) => after(m, g) });
  const coach = (g, html) => { if ($('#gCoach', P).checked) $('#gCoachBox', P).innerHTML = html; };
  const status = g => { $('#gPgn', P).textContent = g.pgn({ max_width: 60 });
    const s = g.in_checkmate() ? (g.turn() === me ? '❌ Мат. Разбери партию: где был первый зевок?' : '🏆 Мат! Ты выиграла!') : g.in_draw() || g.in_stalemate() ? '½ Ничья' : g.in_check() ? 'Шах!' : (g.turn() === me ? 'Твой ход' : 'Компьютер думает…');
    $('#gStatus', P).textContent = s; return g.game_over(); };
  const after = (m, g) => {
    if (g.turn() === me) return; gb.lock(true);
    const h = hanging(g, me);
    if (h.length) coach(g, `⚠️ <b>Осторожно!</b> После ${m.san} под боем без защиты: <b>${h.join(', ')}</b>. Нажми «↶ Вернуть ход», если это зевок.`);
    else coach(g, `✅ ${m.san} — фигуры защищены. Теперь подумай: что хочет соперник?`);
    if (status(g)) return;
    setTimeout(() => { const bm = bestMove(g, +$('#gLvl', P).value); if (bm) g.move(bm); gb.render(); gb.lock(false);
      if (!status(g)) { const th = hanging(g, me); if (th.length) coach(g, $('#gCoachBox', P).innerHTML + `<br>👀 Компьютер сыграл ${bm.san}. Под атакой: <b>${th.join(', ')}</b>`); else if (bm.captured) coach(g, $('#gCoachBox', P).innerHTML + `<br>Компьютер взял: ${bm.san}`); } }, 80);
  };
  const newGame = () => { me = $('#gCol', P).value; gb.load(new Chess().fen()); gb.flip(me === 'b'); gb.lock(false); coach(gb.g, 'Новая партия. Ритуал: CCT перед каждым ходом.'); status(gb.g);
    if (me === 'b') { gb.lock(true); setTimeout(() => { gb.g.move(bestMove(gb.g, +$('#gLvl', P).value)); gb.render(); gb.lock(false); status(gb.g); }, 80); } };
  $('#gNew', P).onclick = newGame;
  $('#gUndo', P).onclick = () => { const g = gb.g; g.undo(); if (g.turn() !== me) g.undo(); gb.render(); gb.lock(false); status(g); coach(g, 'Ход возвращён. Найди ход лучше!'); };
  newGame();

  // ---------- Opening trainer ----------
  const O = $('#chOtr', el);
  O.innerHTML = `<div class="card"><p>Играй ходы своей стороны по памяти, компьютер отвечает по линии. Ошибка — подсказка через 2 попытки.</p><div class="row"><select id="tLine">${OPEN.map((o, i) => `<option value="${i}">${o[0]}</option>`).join('')}</select><label>Я играю: <select id="tSide"><option value="w">белыми</option><option value="b">чёрными</option></select></label><button class="btn" id="tGo">Старт</button></div>
   <div class="row" style="align-items:flex-start;gap:16px;margin-top:10px"><div id="tBoard"></div><div><p id="tMsg" class="res"></p><p class="small muted">Пройдено линий без ошибок: <b id="tCnt">${Object.keys(Store.get('chess.otr', {})).length}</b></p></div></div></div>`;
  let tl = [], tp = 0, tErr = 0, tSide = 'w', tIdx = 0, tMist = 0;
  const tb = makeBoard($('#tBoard', O), { fen: 'start', onMove: (m, g) => {
    if (m.san === tl[tp]) { tp++; tErr = 0; $('#tMsg', O).textContent = '✅ ' + m.san; $('#tMsg', O).className = 'res good'; auto(); }
    else { g.undo(); tb.render(); tErr++; tMist++; $('#tMsg', O).textContent = tErr >= 2 ? `💡 Подсказка: ${tl[tp]}` : `❌ Не по линии. Подумай, зачем этот ход?`; $('#tMsg', O).className = 'res bad'; } } });
  const auto = () => { const g = tb.g; if (tp >= tl.length) { $('#tMsg', O).textContent = tMist ? `Линия пройдена (ошибок: ${tMist}). Ещё раз без ошибок!` : '🏆 Линия выучена без ошибок!'; if (!tMist) { const s = Store.get('chess.otr', {}); s[tIdx + tSide] = 1; Store.set('chess.otr', s); $('#tCnt', O).textContent = Object.keys(s).length; } tb.lock(true); return; }
    if ((tp % 2 === 0) !== (tSide === 'w')) { tb.lock(true); setTimeout(() => { g.move(tl[tp]); tp++; tb.render(); tb.lock(false); auto(); }, 400); } };
  $('#tGo', O).onclick = () => { tIdx = +$('#tLine', O).value; tSide = $('#tSide', O).value; tl = OPEN[tIdx][1].split(' '); tp = 0; tErr = 0; tMist = 0; tb.load(new Chess().fen()); tb.flip(tSide === 'b'); tb.lock(false); $('#tMsg', O).textContent = 'Твой ход!'; $('#tMsg', O).className = 'res'; auto(); };

  // ---------- Mate in 2 ----------
  const MM = $('#chM2', el), puz2 = M2.filter(p => { try { const g = new Chess(p[0]); return !mateIn1Moves(p[0]).length && g.moves().some(m => isMate2First(p[0], m)); } catch (e) { return false; } });
  MM.innerHTML = `<div class="card"><p class="small muted">Найди ход, после которого на ЛЮБОЙ ответ есть мат. Компьютер защищается.</p><div class="row"><select id="m2Sel">${puz2.map((p, i) => `<option value="${i}">Задача ${i + 1}</option>`).join('')}</select><span class="tag" id="m2Turn"></span></div>
   <div class="row" style="align-items:flex-start;gap:16px;margin-top:8px"><div id="m2Board"></div><div><p id="m2Theme"></p><p id="m2Res" class="res"></p><div class="row"><button class="btn ghost" id="m2Reset">↺ Заново</button><button class="btn" id="m2Next">Следующая →</button></div></div></div></div>`;
  let mi = 0, step = 0;
  const mb = makeBoard($('#m2Board', MM), { fen: puz2[0][0], onMove: (m, g) => {
    if (step === 0) { g.undo(); const ok = isMate2First(g.fen(), m.san); g.move(m.san); mb.render();
      if (!ok) { $('#m2Res', MM).textContent = `❌ ${m.san} — соперник защитится. Ищи форсированный ход (шах или угроза мата).`; $('#m2Res', MM).className = 'res bad'; mb.lock(true); return setTimeout(() => m2Load(mi), 1800); }
      if (g.in_checkmate()) { $('#m2Res', MM).textContent = '✅ Даже мат в 1!'; return win(); }
      step = 1; mb.lock(true); $('#m2Res', MM).textContent = `✅ ${m.san}! Теперь соперник…`; $('#m2Res', MM).className = 'res good';
      setTimeout(() => { const r = pick(g.moves()); g.move(r); mb.render(); mb.lock(false); $('#m2Res', MM).textContent = `Соперник: ${r}. Ставь мат!`; }, 600); }
    else if (g.in_checkmate()) { $('#m2Res', MM).textContent = `🏆 Мат! ${m.san}`; win(); }
    else { $('#m2Res', MM).textContent = `❌ ${m.san} — не мат`; $('#m2Res', MM).className = 'res bad'; g.undo(); mb.render(); } } });
  const win = () => { $('#m2Res', MM).className = 'res good'; mb.lock(true); const s = Store.get('chess.m2', {}); s[mi] = 1; Store.set('chess.m2', s); };
  const m2Load = i => { mi = i; step = 0; $('#m2Sel', MM).value = i; const g = new Chess(puz2[i][0]); mb.load(puz2[i][0]); mb.flip(g.turn() === 'b'); mb.lock(false);
    $('#m2Turn', MM).textContent = g.turn() === 'w' ? 'Ход белых, мат в 2' : 'Ход чёрных, мат в 2'; $('#m2Theme', MM).textContent = '💡 ' + puz2[i][1]; $('#m2Res', MM).textContent = ''; };
  $('#m2Sel', MM).onchange = e => m2Load(+e.target.value); $('#m2Reset', MM).onclick = () => m2Load(mi); $('#m2Next', MM).onclick = () => m2Load((mi + 1) % puz2.length);
  if (puz2.length) m2Load(0);
  window.__puz2 = puz2.length;

  // ---------- Endgame trainer ----------
  const E = $('#chEnd', el), ENDS = [['Ферзь + король против короля', '8/8/8/4k3/8/8/8/3QK3 w - - 0 1', 10], ['Ладья + король против короля', '8/8/8/4k3/8/8/8/R3K3 w - - 0 1', 16], ['Две ладьи (линейный мат)', '8/8/8/4k3/8/8/8/R3K2R w - - 0 1', 8]];
  E.innerHTML = `<div class="card"><p>Поставь мат за указанное число ходов. Компьютер убегает королём в центр. Пат = провал!</p><div class="row"><select id="eSel">${ENDS.map((e, i) => `<option value="${i}">${e[0]} (≤ ${e[2]} ходов)</option>`).join('')}</select><button class="btn" id="eGo">Старт</button></div>
   <div class="row" style="align-items:flex-start;gap:16px;margin-top:8px"><div id="eBoard"></div><div><p id="eRes" class="res"></p><p class="small">Ходов: <b id="eN">0</b></p><p class="small muted">Ферзь: отрезай короля «ходом коня» от него, веди к краю, потом подводи своего короля. Ладья: метод коробки.</p></div></div></div>`;
  let eLim = 10, eN = 0;
  const eb = makeBoard($('#eBoard', E), { fen: ENDS[0][1], onMove: (m, g) => {
    eN++; $('#eN', E).textContent = eN;
    if (g.in_checkmate()) { $('#eRes', E).textContent = eN <= eLim ? `🏆 Мат за ${eN} ходов!` : `Мат за ${eN} (цель ≤ ${eLim}). Попробуй быстрее!`; $('#eRes', E).className = 'res good'; return eb.lock(true); }
    if (g.in_stalemate() || g.in_draw()) { $('#eRes', E).textContent = '❌ Пат/ничья! Оставляй королю хотя бы одно поле, пока не подведёшь своего короля.'; $('#eRes', E).className = 'res bad'; return eb.lock(true); }
    eb.lock(true); setTimeout(() => { const ms = g.moves({ verbose: true }); let best = ms[0], bv = -1e9;
      ms.forEach(x => { g.move(x); const sq = x.to, f = sq.charCodeAt(0) - 97, r = +sq[1] - 1; const v = g.moves().length * 2 + (CENTER[f] + CENTER[r]) * 3 - (x.captured ? -50 : 0); g.undo(); if (v > bv) { bv = v; best = x; } });
      g.move(best); eb.render(); eb.lock(false); $('#eRes', E).textContent = 'Твой ход'; $('#eRes', E).className = 'res'; }, 250); } });
  $('#eGo', E).onclick = () => { const e = ENDS[+$('#eSel', E).value]; eLim = e[2]; eN = 0; $('#eN', E).textContent = 0; eb.load(e[1]); eb.lock(false); $('#eRes', E).textContent = 'Твой ход'; };

  // ---------- Coordinates ----------
  const C = $('#chCo', el);
  C.innerHTML = `<div class="card"><p>30 секунд: кликай названное поле. Знание координат = быстрее видишь тактику и читаешь разборы.</p><div class="row"><label><input type="checkbox" id="cFlip"> за чёрных</label><button class="btn" id="cGo">Старт ⚡</button><span>Рекорд: <b id="cBest">${Store.get('chess.coord', 0)}</b></span></div>
   <p style="font-size:40px;font-weight:700;text-align:center;margin:8px" id="cSq">—</p><div class="row" style="justify-content:center"><div id="cBoard"></div></div><p class="res" id="cRes" style="text-align:center"></p></div>`;
  const cb = makeBoard($('#cBoard', C), { fen: '8/8/8/8/8/8/8/8 w - - 0 1' }); cb.lock(true);
  let target = '', cScore = 0, cEnd = 0, cT;
  $('#cBoard', C).addEventListener('click', e => { const d = e.target.closest('[data-sq]'); if (!d || Date.now() > cEnd) return;
    if (d.dataset.sq === target) { cScore++; d.style.background = 'var(--acc2)'; setTimeout(() => d.style.background = '', 200); } else { d.style.background = 'var(--warn)'; setTimeout(() => d.style.background = '', 300); }
    target = 'abcdefgh'[Math.floor(Math.random() * 8)] + (1 + Math.floor(Math.random() * 8)); $('#cSq', C).textContent = target; $('#cRes', C).textContent = 'Очки: ' + cScore; }, true);
  $('#cGo', C).onclick = () => { cb.flip($('#cFlip', C).checked); cScore = 0; cEnd = Date.now() + 30000; target = 'e4'; $('#cSq', C).textContent = target; clearInterval(cT);
    cT = setInterval(() => { const left = Math.ceil((cEnd - Date.now()) / 1000); if (left <= 0) { clearInterval(cT); const b = Store.get('chess.coord', 0); if (cScore > b) Store.set('chess.coord', cScore); $('#cBest', C).textContent = Math.max(b, cScore); $('#cSq', C).textContent = '⏱ Время!'; $('#cRes', C).textContent = `Итог: ${cScore}`; } else $('#cRes', C).textContent = `Очки: ${cScore} · ⏱ ${left}`; }, 250); };

  // ---------- Flashcards ----------
  const K = $('#chCards', el);
  K.innerHTML = `<div class="card"><h3>🗂️ Шахматные понятия</h3><div id="kD"></div></div><div class="card"><h3>🧩 Найди пару</h3><div id="kM"></div></div><div class="card"><h3>⚡ Блиц</h3><div id="kB"></div></div>`;
  Deck($('#kD', K), CH_CARDS, { key: 'chessCards' }); Match($('#kM', K), CH_CARDS, { key: 'chessCards', n: 5 }); Blitz($('#kB', K), CH_CARDS, { key: 'chessCards' });
}
