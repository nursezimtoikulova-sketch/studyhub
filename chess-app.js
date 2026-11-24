// ===== CHESS: 700 → 1200+ plan, theory, openings with board playback, mate puzzles =====
const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
// Simple clickable board on top of chess.js. opts: {fen, flip, onMove(move, game)}
function makeBoard(host, opts) {
  const g = new Chess(opts.fen); let sel = null, flip = !!opts.flip, locked = false;
  const files = 'abcdefgh';
  const render = () => {
    const b = g.board(); let h = '';
    for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
      const rr = flip ? 7 - r : r, ff = flip ? 7 - f : f, sq = files[ff] + (8 - rr), p = b[rr][ff];
      const hint = sel && g.moves({ square: sel, verbose: true }).some(m => m.to === sq);
      h += `<div class="sq ${(rr + ff) % 2 ? 'd' : 'l'} ${sel === sq ? 'sel' : ''} ${hint ? 'hint' : ''}" data-sq="${sq}">${p ? `<span class="${p.color === 'w' ? 'pw' : 'pb'}">${GLYPH[p.type]}</span>` : ''}</div>`;
    }
    host.innerHTML = h;
  };
  host.className = 'board';
  host.onclick = e => {
    if (locked) return; const d = e.target.closest('[data-sq]'); if (!d) return; const sq = d.dataset.sq, p = g.get(sq);
    if (sel) { const m = g.move({ from: sel, to: sq, promotion: 'q' }); sel = null;
      if (m) { render(); opts.onMove && opts.onMove(m, g); return; } }
    sel = p && p.color === g.turn() ? sq : null; render();
  };
  render();
  return { g, render, lock(v) { locked = v; }, flip(v) { flip = v; render(); }, load(fen) { g.load(fen); sel = null; render(); } };
}

const PUZ = [
 ['6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1','Мат по последней горизонтали (back rank)'],
 ['3r2k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1','Back rank — играют чёрные'],
 ['6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1','Спёртый мат конём (smothered mate)'],
 ['r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4','Детский мат — слабость f7'],
 ['rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2','Дурацкий мат — играют чёрные'],
 ['7k/8/6K1/8/8/8/8/Q7 w - - 0 1','Ферзь + король'],
 ['k7/7R/8/8/8/8/8/6RK w - - 0 1','Линейный мат двумя ладьями'],
 ['6k1/5p1p/5BpQ/8/8/8/8/6K1 w - - 0 1','Ферзь при поддержке слона'],
 ['7k/7p/5N2/8/8/8/8/6RK w - - 0 1','Ладья + конь (арабский мат)'],
 ['k7/2P5/1K6/8/8/8/8/8 w - - 0 1','Превращение пешки с матом'],
 ['6k1/5ppp/8/8/8/8/1Q3PPP/1R4K1 w - - 0 1','Ферзь + ладья по последней горизонтали'],
 ['5rk1/5ppp/8/6N1/7Q/8/5PPP/6K1 w - - 0 1','Ферзь + конь: удар по h7'],
];

const OPEN = [
 ['Белые: Итальянская партия','e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Re1 a6','Простой и надёжный план: центр (c3+d3), рокировка, ладья на e1, потом Nbd2-f1-g3.'],
 ['Белые: Лондонская система','d4 d5 Bf4 Nf6 e3 e6 Nf3 c5 c3 Nc6 Nbd2 Bd6 Bg3 O-O Bd3','Одна и та же расстановка почти против всего — экономит время на теорию.'],
 ['Чёрные против 1.e4: открытая игра (испанская)','e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7','Классика: 1...e5, развитие, рокировка. Изучай идеи, а не 20 ходов.'],
 ['Чёрные против 1.d4: Ферзевый гамбит отказанный','d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6','Солидно: пешки d5/e6, слон на e7, рокировка, потом ...Bb7 и ...c5.'],
 ['Ловушка: как защититься от детского мата','e4 e5 Qh5 Nc6 Bc4 g6 Qf3 Nf6','Не паникуй: ...Nc6, ...g6, ...Nf6 — и ферзь белых просто потерял время.'],
 ['Ловушка: «жареная печень» — правильная защита','e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5','После Ng5 играй ...d5! и на exd5 — ...Na5 (не ...Nxd5?!).'],
];

App.reg('chess', el => {
  el.innerHTML = `<h1>♟️ Шахматы: от ~700 к 1200+</h1><p class="muted">Без бесконечных повторов: теория → понимание → практика на доске → своя партия с разбором.</p>`;
  const plan = `<div class="card"><h2>Почему рейтинг стоит на ~700</h2><p>На этом уровне партии решают <b>зевки</b>, а не дебюты. 80% прогресса = перестать отдавать фигуры и научиться видеть простые тактики. Для быстрого темперамента главное — <b>ритуал перед ходом</b>.</p>
   <h3>🧠 Ритуал перед КАЖДЫМ ходом (5–10 секунд)</h3><ol><li><b>Что хочет соперник?</b> Чем угрожает его последний ход?</li><li><b>CCT</b>: Checks — Captures — Threats (шахи, взятия, угрозы) — для себя и соперника.</li><li>Мой ход: <b>не оставляю ли я фигуру без защиты?</b> (Blunder check)</li><li>Только потом — делай ход. Нашла хороший ход? Поищи лучше (10 сек).</li></ol>
   <h3>⏱️ Правила практики</h3><ul><li>Играй <b>15+10</b> или <b>10+5</b>, не bullet/blitz — быстрые контроли закрепляют зевки.</li><li>После каждой проигранной партии — 5 минут разбора: где был первый зевок?</li><li>Максимум 3 партии подряд — после 2 поражений перерыв (тильт).</li><li>Задачи: 10–15 в день по <b>темам</b>, а не случайные.</li></ul></div>
   <div class="card"><h2>План на 8 недель</h2>${checklist('chess.plan', [
    'Неделя 1: ритуал CCT + задачи «висячие фигуры» (hanging pieces)','Неделя 2: вилка (fork) + двойной удар','Неделя 3: связка (pin) и сквозной удар (skewer)','Неделя 4: открытый шах / двойной шах + мат по последней горизонтали',
    'Неделя 5: дебютный репертуар (вкладка «Дебюты») — по 1 линии за белых и чёрных','Неделя 6: эндшпиль: ферзь+король, ладья+король, оппозиция, правило квадрата','Неделя 7: план в миддлшпиле: слабые поля, открытые линии, атака на короля','Неделя 8: 10 партий 15+10 с разбором + задачи на смешанные темы'])}
   <p class="small muted">Бесплатные ресурсы без «наказаний» за ошибки: задачи по темам — <a href="https://lichess.org/training/themes" target="_blank">lichess.org/training/themes</a>, практика — <a href="https://lichess.org/practice" target="_blank">lichess.org/practice</a>, разбор партий — <a href="https://lichess.org/analysis" target="_blank">lichess.org/analysis</a>, игра с компьютером — <a href="https://lichess.org/setup/ai" target="_blank">lichess.org/setup/ai</a>.</p></div>`;
  const theory = `<div class="card"><h2>Принципы дебюта</h2><ol><li>Займи центр пешками (e4/d4, e5/d5).</li><li>Развивай коней и слонов (кони — до слонов), каждую фигуру 1 раз.</li><li>Рокируйся рано (до 10-го хода).</li><li>Не выводи ферзя рано — его будут гонять.</li><li>Соедини ладьи и поставь их на открытые линии.</li><li>Не делай лишних ходов пешками у своего короля.</li></ol></div>
   <div class="card"><h2>Тактические мотивы</h2><div class="tbl"><table><tr><th>Мотив</th><th>Суть</th><th>Как найти</th></tr>
   ${[['Вилка (Fork)','одна фигура нападает на две','ищи поля, откуда конь/пешка/ферзь бьёт сразу 2 цели (особенно короля и ферзя)'],['Связка (Pin)','фигура не может уйти, за ней более ценная','слон/ладья/ферзь на одной линии с королём или ферзём соперника'],['Сквозной удар (Skewer)','как связка, но ценная фигура впереди','шах королю, за которым стоит ладья/ферзь'],['Открытый шах (Discovered)','уходящая фигура открывает линию другой','фигура между твоей дальнобойной фигурой и королём соперника'],['Двойной шах','шах двумя фигурами сразу','король обязан уходить — часто мат'],['Отвлечение (Deflection)','заставь защитника уйти','кто единственный защищает важное поле/фигуру?'],['Завлечение (Decoy)','заманить фигуру на плохое поле','жертва, чтобы король/ферзь встал под вилку'],['Уничтожение защитника','бери фигуру, которая защищает','посчитай защитников цели и сними одного'],['Мат по последней горизонтали','король заперт своими пешками','у короля нет «форточки» (h3/h6)'],['Висячие фигуры','фигура без защиты','после каждого хода соперника: что у него не защищено?']].map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td class="small">${r[2]}</td></tr>`).join('')}</table></div></div>
   <div class="card"><h2>Эндшпиль — обязательный минимум</h2>${checklist('chess.end', ['Мат ферзём и королём (прижать короля к краю «ходом коня»)','Мат ладьёй и королём (метод «коробки»)','Оппозиция королей (пешечный эндшпиль)','Правило квадрата (догонит ли король пешку)','Король + пешка против короля: ключевые поля','Ладейный эндшпиль: позиция Филидора (защита)','Ладейный эндшпиль: позиция Лусены («строим мост»)'])}<p class="small muted">Тренировать: <a href="https://lichess.org/practice" target="_blank">Lichess Practice → Checkmates / Pawn endgames / Rook endgames</a></p></div>
   <div class="card"><h2>Миддлшпиль: как найти план</h2><ul><li>Если нет тактики — <b>улучши худшую фигуру</b>.</li><li>Ладьи — на открытые линии, конь — на сильное поле (которое пешка не может прогнать).</li><li>Атакуй там, где у тебя больше пространства (куда «смотрят» твои пешки).</li><li>Размены — когда ты впереди по материалу; избегай — когда позади.</li><li>Стоимость: пешка 1, конь 3, слон 3, ладья 5, ферзь 9.</li></ul></div>`;
  const openings = `<div class="card"><div class="row"><select id="oSel">${OPEN.map((o, i) => `<option value="${i}">${o[0]}</option>`).join('')}</select></div><p id="oNote" class="muted"></p>
   <div class="row" style="align-items:flex-start;gap:16px"><div id="oBoard"></div><div><p id="oMoves" style="font-family:Consolas,monospace;max-width:380px"></p><div class="row"><button class="btn ghost" id="oStart">⏮</button><button class="btn ghost" id="oBack">◀</button><button class="btn" id="oFwd">▶ Ход</button><button class="btn ghost" id="oEnd">⏭</button></div><p class="small muted">Перед каждым ходом угадай, куда пойдёт фигура и <b>зачем</b>.</p></div></div></div>`;
  const puz = `<div class="card"><h2>Задачи: мат в 1 ход</h2><p class="muted small">Кликни фигуру, потом поле. Принимается любой матующий ход.</p><div class="row"><select id="pSel"></select><span id="pTurn" class="tag"></span></div>
   <div class="row" style="align-items:flex-start;gap:16px;margin-top:8px"><div id="pBoard"></div><div><p id="pTheme"></p><p id="pRes" class="res"></p><div class="row"><button class="btn ghost" id="pReset">↺ Заново</button><button class="btn" id="pNext">Следующая →</button></div></div></div></div>
   <div class="card"><h3>Больше задач по темам (бесплатно)</h3><p>${['fork','pin','skewer','discoveredAttack','backRankMate','hangingPiece','deflection','mateIn2','endgame'].map(t => `<a class="tag" target="_blank" href="https://lichess.org/training/${t}">${t}</a>`).join(' ')}</p></div>`;
  subTabs(el, [['plan', '🗺️ План', plan], ['theory', '📚 Теория', theory], ['play', '🤖 Игра + тренер', '<div id="chPlay"></div>'], ['open', '♞ Дебюты', openings], ['otr', '🎯 Тренажёр дебютов', '<div id="chOtr"></div>'],
    ['puz', '🧩 Мат в 1', puz], ['m2', '🧩 Мат в 2', '<div id="chM2"></div>'], ['end', '👑 Эндшпиль', '<div id="chEnd"></div>'], ['coord', '🎯 Координаты', '<div id="chCo"></div>'], ['cards', '🗂️ Флешкарты', '<div id="chCards"></div>']], 'chess');

  if (!window.Chess) { $$('#oBoard,#pBoard', el).forEach(x => x.innerHTML = '<p>Нужен интернет для загрузки шахматного модуля.</p>'); return; }
  // Opening viewer
  const ob = makeBoard($('#oBoard', el), { fen: 'start' }); ob.lock(true);
  let line = [], pos = 0;
  const oShow = () => { const g = new Chess(); line.slice(0, pos).forEach(m => g.move(m)); ob.load(g.fen());
    $('#oMoves', el).innerHTML = line.map((m, i) => `${i % 2 === 0 ? `<span class="muted">${i / 2 + 1}.</span>` : ''}<span style="${i === pos - 1 ? 'background:var(--soft);color:var(--acc);font-weight:700' : ''}">${m}</span>`).join(' '); };
  const oLoad = i => { const o = OPEN[i]; line = o[1].split(' '); pos = 0; $('#oNote', el).textContent = o[2]; oShow(); };
  $('#oSel', el).onchange = e => oLoad(+e.target.value);
  $('#oFwd', el).onclick = () => { if (pos < line.length) { pos++; oShow(); } }; $('#oBack', el).onclick = () => { if (pos) { pos--; oShow(); } };
  $('#oStart', el).onclick = () => { pos = 0; oShow(); }; $('#oEnd', el).onclick = () => { pos = line.length; oShow(); };
  oLoad(0);
  // Puzzles
  const solved = Store.get('chess.solved', {});
  const pSel = $('#pSel', el); let pi = 0;
  const opts = () => pSel.innerHTML = PUZ.map((p, i) => `<option value="${i}">${solved[i] ? '✓ ' : ''}Задача ${i + 1}</option>`).join('');
  const pb = makeBoard($('#pBoard', el), { fen: PUZ[0][0], onMove: (m, g) => {
    pb.lock(true);
    if (g.in_checkmate()) { $('#pRes', el).textContent = `✅ Мат! ${m.san}`; $('#pRes', el).className = 'res good'; solved[pi] = 1; Store.set('chess.solved', solved); opts(); pSel.value = pi; App.refreshHome(); }
    else { $('#pRes', el).textContent = `❌ ${m.san} — не мат. Проверь шахи (CCT)!`; $('#pRes', el).className = 'res bad'; setTimeout(() => pLoad(pi), 1500); } } });
  const pLoad = i => { pi = i; pSel.value = i; const g = new Chess(PUZ[i][0]); pb.load(PUZ[i][0]); pb.flip(g.turn() === 'b'); pb.lock(false);
    $('#pTurn', el).textContent = g.turn() === 'w' ? 'Ход белых' : 'Ход чёрных'; $('#pTheme', el).textContent = '💡 ' + PUZ[i][1]; $('#pRes', el).textContent = ''; };
  opts(); pSel.onchange = () => pLoad(+pSel.value); $('#pReset', el).onclick = () => pLoad(pi); $('#pNext', el).onclick = () => pLoad((pi + 1) % PUZ.length);
  pLoad(0);
  if (window.chessExtra) chessExtra(el);
});
