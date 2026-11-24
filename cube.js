// ===== RUBIK'S CUBE: 3x3 beginner + CFOP basics, 4x4, 5x5, 6x6, timer =====
const algLink = (a, pz = '3x3x3') => `<a target="_blank" title="Анимация" href="https://alg.cubing.net/?puzzle=${pz}&alg=${encodeURIComponent(a.replace(/'/g, '-').replace(/ /g, '_'))}">▶</a>`;
const A = (a, pz) => `<span class="alg">${a}</span> ${algLink(a, pz)}`;
const step = (t, body) => `<div class="card"><h3>${t}</h3>${body}</div>`;

App.reg('cube', el => {
  el.innerHTML = `<h1>🧊 Кубик Рубика 3×3 → 6×6</h1><p class="muted">Пошагово: что сделать → алгоритм → как проверить. ▶ рядом с алгоритмом открывает анимацию (alg.cubing.net).</p>`;
  const nota = step('Нотация (как читать алгоритмы)', `<div class="tbl"><table><tr><th>Буква</th><th>Слой</th></tr>
   <tr><td><b>R</b> / <b>L</b></td><td>правый / левый</td></tr><tr><td><b>U</b> / <b>D</b></td><td>верхний / нижний</td></tr><tr><td><b>F</b> / <b>B</b></td><td>передний / задний</td></tr>
   <tr><td><b>X</b></td><td>по часовой стрелке (если смотреть на эту грань)</td></tr><tr><td><b>X'</b></td><td>против часовой</td></tr><tr><td><b>X2</b></td><td>на 180°</td></tr>
   <tr><td><b>Rw</b> / <b>r</b></td><td>2 правых слоя вместе (на 3×3 r = R + средний)</td></tr><tr><td><b>M</b></td><td>средний слой между L и R (как L)</td></tr>
   <tr><td><b>3Rw</b></td><td>3 правых слоя (5×5, 6×6)</td></tr><tr><td><b>x, y, z</b></td><td>поворот всего кубика (как R, U, F)</td></tr></table></div>`);
  const b3 = [
   step('Шаг 1. Белый крест', `<p>Собери 4 белых ребра вокруг белого центра так, чтобы <b>второй цвет ребра совпадал с боковым центром</b> («ромашка» → крест). Делается интуитивно: ребро над нужным центром → <span class="alg">F2</span>.</p><p>✔ Проверка: белый крест сверху (или снизу), на каждой стороне цвет ребра = цвет центра.</p>`),
   step('Шаг 2. Белые углы', `<p>Белый крест вниз. Угол с нужными цветами поставь над его местом (справа спереди) и повторяй:</p>${A("R U R' U'")}<p>…пока угол не встанет белым вниз (до 6 раз). ✔ Первый слой собран целиком.</p>`),
   step('Шаг 3. Средний слой', `<p>Найди ребро без жёлтого в верхнем слое, совмести его передний цвет с центром. Куда ему нужно?</p><p>Вправо: ${A("U R U' R' U' F' U F")}</p><p>Влево: ${A("U' L' U L U F U' F'")}</p><p>Если ребро застряло неправильно в среднем слое — вставь любое ребро на его место, оно выйдет наверх.</p>`),
   step('Шаг 4. Жёлтый крест', `${A("F R U R' U' F'")}<p>Точка → делай 1 раз → «Г» (держи в левом заднем углу) → 1 раз → линия (горизонтально) → 1 раз → крест.</p>`),
   step('Шаг 5. Рёбра жёлтого креста по цветам', `<p>Крути U, пока 2 ребра не совпадут с центрами. Держи совпавшие <b>сзади и справа</b>:</p>${A("R U R' U R U2 R' U")}<p>Если совпали противоположные — сделай 1 раз с любой стороны, затем снова.</p>`),
   step('Шаг 6. Расставить жёлтые углы по местам', `<p>Найди угол, который стоит на своём месте (цвета совпадают, даже если повернут). Держи его <b>справа спереди сверху</b>:</p>${A("U R U' L' U R' U' L")}<p>Повторяй, пока все углы не встанут на места. Если ни одного — сделай 1 раз с любой стороны.</p>`),
   step('Шаг 7. Повернуть жёлтые углы', `<p>Жёлтым вверх, неправильный угол — справа спереди сверху. Повторяй:</p>${A("R' D' R D")}<p>…пока этот угол не станет жёлтым вверх. Потом поверни <b>только U</b> (не весь кубик!), подведи следующий угол и повторяй. ⚠️ Середина кубика «разваливается» — это нормально, в конце всё соберётся.</p>`)
  ].join('');
  const cfop = step('Следующий уровень: CFOP (≈ до 30 сек)', `<ol><li><b>Cross</b> — крест снизу, планируя целиком в инспекции (15 сек).</li><li><b>F2L</b> — угол + ребро вставляются парой (интуитивно, базово: ${A("U R U' R'")}, ${A("R U R'")}, ${A("y' U' L' U L")}).</li><li><b>OLL</b> (2-look): сначала крест, потом углы.</li><li><b>PLL</b> (2-look): сначала углы, потом рёбра.</li></ol>
   <h3>2-look OLL</h3><p>Крест: ${A("F R U R' U' F'")} · ${A("F U R U' R' F'")}</p>
   <p>Углы: Sune ${A("R U R' U R U2 R'")} · Antisune ${A("R U2 R' U' R U' R'")} · H ${A("F R U R' U' R U R' U' R U R' U' F'")} · Pi ${A("R U2 R2 U' R2 U' R2 U2 R")} · Headlights ${A("R2 D R' U2 R D' R' U2 R'")} · T ${A("r U R' U' r' F R F'")} · Bowtie ${A("F' r U R' U' r' F R")}</p>
   <h3>2-look PLL</h3><p>Углы: T-perm ${A("R U R' U' R' F R2 U' R' U' R U R' F'")} · Y-perm ${A("F R U' R' U' R U R' F' R U R' U' R' F R F'")}</p>
   <p>Рёбра: Ua ${A("R U' R U R U R U' R' U' R2")} · Ub ${A("R2 U R U R' U' R' U' R' U R'")} · H ${A("M2 U M2 U2 M2 U M2")} · Z ${A("M' U M2 U M2 U M' U2 M2")}</p>`)
   + step('Мои алгоритмы', checklist('cube.algs', ['Знаю все 7 шагов новичка без подсказки', 'Крест за ≤ 8 ходов', '2-look OLL: 2 + 7 алгоритмов', '2-look PLL: 2 + 4 алгоритма', 'Интуитивный F2L', 'Сборка 3×3 < 1 мин', 'Сборка 3×3 < 40 сек']));
  const b4 = step('4×4 — метод редукции', `<p>Идея: превратить 4×4 в 3×3 — собрать центры 2×2, спарить рёбра, затем собрать как 3×3 (+ 2 возможные «паритеты»).</p>
   <ol><li><b>Центры:</b> белый, потом жёлтый (напротив), затем 4 боковых в правильном порядке (белый верх, зелёный спереди → красный справа, синий сзади, оранжевый слева). Строй полоски 1×2 и соединяй: ${A("Rw U Rw'", '4x4x4')}.</li>
   <li><b>Рёбра:</b> держи две половинки одного ребра слева спереди и справа спереди на одной высоте, затем: ${A("Dw R U R' F R' F' R Dw'", '4x4x4')} — пара собрана, а несобранное ребро ушло вниз. Повторяй до последних 2 рёбер.</li>
   <li><b>3×3 этап:</b> крути только внешние слои (R, U, F…), как обычный 3×3.</li>
   <li><b>OLL-паритет</b> (одно ребро «перевёрнуто» на жёлтой стороне, держи его спереди сверху): ${A("Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'", '4x4x4')}</li>
   <li><b>PLL-паритет</b> (два ребра или два угла нужно поменять — невозможно на 3×3): ${A("2R2 U2 2R2 Uw2 2R2 Uw2", '4x4x4')} <span class="muted small">(2R = только внутренний правый слой)</span></li></ol>`);
  const b5 = step('5×5 — редукция', `<ol><li><b>Центры 3×3:</b> собирай полоски 1×3 (вокруг фиксированного центра) и соединяй их, как на 4×4. Порядок цветов фиксирован центральными элементами.</li>
   <li><b>Рёбра («тройки»):</b> средний элемент ребра + 2 крыла. Совмещай крылья с серединой и используй ${A("Dw R U R' F R' F' R Dw'", '5x5x5')} (Dw — 2 слоя) или 3Dw для другого крыла.</li>
   <li><b>Последние 2 ребра</b> — если одно крыло перевёрнуто (паритет): ${A("r2 B2 U2 l U2 r' U2 r U2 F2 r F2 l' B2 r2", '5x5x5')} <span class="muted small">(r, l — внутренние слои)</span></li>
   <li><b>3×3 этап</b> — PLL-паритета на 5×5 нет (нечётный кубик).</li></ol>`);
  const b6 = step('6×6 — редукция', `<ol><li><b>Центры 4×4</b> на каждой грани (16 элементов): строй полоски 1×4 из двух 1×2, затем соединяй. Порядок: белый → жёлтый → 4 боковых (схема цветов как на 4×4, центр не фиксирован — следи!).</li>
   <li><b>Рёбра:</b> 4 элемента в каждом ребре. Сначала соединяй внутренние пары, затем внешние, тем же приёмом «Dw … Dw'» с нужным количеством слоёв (2Dw / 3Dw).</li>
   <li><b>3×3 этап</b> + возможны <b>оба паритета</b> как на 4×4: используй те же алгоритмы, но со слоями «3Rw» (3 слоя) / «3R» вместо Rw / 2R.</li>
   <li>Совет: собирай центры медленно и чисто — 80% ошибок на 6×6 = перепутанные центры.</li></ol>`)
   + step('Прогресс по кубикам', checklist('cube.big', ['4×4: центры без подсказки', '4×4: пары рёбер', '4×4: оба паритета', '5×5: центры', '5×5: рёбра + паритет последних двух', '6×6: центры 4×4', '6×6: рёбра', '6×6: полная сборка']))
   + `<p class="small muted">Полезно: <a href="https://ruwix.com/" target="_blank">ruwix.com</a> (решатели и туториалы), <a href="https://jperm.net/algs" target="_blank">jperm.net/algs</a> (списки алгоритмов).</p>`;
  const timer = `<div class="card"><div class="row"><label>Кубик: <select id="tz"><option value="3">3×3</option><option value="4">4×4</option><option value="5">5×5</option><option value="6">6×6</option></select></label><button class="btn ghost" id="tScr">Новый скрамбл</button></div>
   <p id="scr" class="alg" style="display:block;margin:12px 0;line-height:1.7"></p>
   <div id="tm" style="font-size:64px;text-align:center;font-variant-numeric:tabular-nums;cursor:pointer;user-select:none">0.00</div>
   <p class="muted small" style="text-align:center">Пробел (или нажми на таймер): старт / стоп</p><div id="tStats"></div></div>`;
  const games = `<div class="card"><h3>🗂️ Флешкарты алгоритмов</h3><p class="small muted">Видишь название случая → вспомни алгоритм вслух/руками → переверни и проверь.</p><div id="cuDeck"></div></div>
   <div class="card"><h3>🧩 Пропущенный ход</h3><div id="cuMiss"></div></div><div class="card"><h3>🔢 Расставь ходы по порядку</h3><div id="cuOrd"></div></div>
   <div class="card"><h3>⚡ Блиц: узнай алгоритм</h3><div id="cuBl"></div></div>`;
  subTabs(el, [['n', '🔤 Нотация', nota], ['b3', '3×3 новичок', b3], ['cfop', '3×3 CFOP', cfop], ['big', '4×4 · 5×5 · 6×6', b4 + b5 + b6], ['games', '🎮 Запомнить алгоритмы', games], ['timer', '⏱️ Таймер', timer]], 'cube');
  const ALGS = [['Белые углы',"R U R' U'"],['Средний слой → вправо',"U R U' R' U' F' U F"],['Средний слой → влево',"U' L' U L U F U' F'"],['Жёлтый крест',"F R U R' U' F'"],['Рёбра жёлтого креста',"R U R' U R U2 R' U"],['Расставить жёлтые углы',"U R U' L' U R' U' L"],['Повернуть жёлтый угол',"R' D' R D"],
   ['OLL крест (2)',"F U R U' R' F'"],['Sune',"R U R' U R U2 R'"],['Antisune',"R U2 R' U' R U' R'"],['OLL Pi',"R U2 R2 U' R2 U' R2 U2 R"],['OLL Headlights',"R2 D R' U2 R D' R' U2 R'"],['OLL T',"r U R' U' r' F R F'"],['OLL Bowtie',"F' r U R' U' r' F R"],
   ['T-perm',"R U R' U' R' F R2 U' R' U' R U R' F'"],['Y-perm',"F R U' R' U' R U R' F' R U R' U' R' F R F'"],['Ua-perm',"R U' R U R U R U' R' U' R2"],['Ub-perm',"R2 U R U R' U' R' U' R' U R'"],['H-perm',"M2 U M2 U2 M2 U M2"],['Z-perm',"M' U M2 U M2 U M' U2 M2"],
   ['4×4 пары рёбер',"Dw R U R' F R' F' R Dw'"],['4×4 PLL-паритет',"2R2 U2 2R2 Uw2 2R2 Uw2"],['4×4 OLL-паритет',"Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'"]];
  Deck($('#cuDeck', el), ALGS, { key: 'cubeAlgs' }); Blitz($('#cuBl', el), ALGS.map(a => [a[1], a[0]]), { key: 'cubeAlgs' });
  const MOVES = ['R', "R'", 'U', "U'", 'F', "F'", 'L', "L'", 'D', "D'", 'R2', 'U2'];
  const miss = () => { const a = pick(ALGS), m = a[1].split(' '), k = Math.floor(Math.random() * m.length), opts = shuffle([m[k], ...shuffle(MOVES.filter(x => x !== m[k])).slice(0, 3)]); const h = $('#cuMiss', el);
    h.innerHTML = `<p><b>${a[0]}</b></p><p class="alg">${m.map((x, i) => i === k ? '<b>❓</b>' : x).join(' ')}</p><div class="row">${opts.map(o => `<button class="btn ghost">${o}</button>`).join('')}</div><p class="res"></p>`;
    $$('button', h).forEach(b => b.onclick = () => { const ok = b.textContent === m[k]; $('.res', h).textContent = ok ? '✅ ' + a[1] : '❌ правильно: ' + m[k] + ' → ' + a[1]; $('.res', h).className = 'res ' + (ok ? 'good' : 'bad'); setTimeout(miss, ok ? 1200 : 2500); }); };
  const ord = () => { const a = pick(ALGS.filter(x => x[1].split(' ').length <= 11)), m = a[1].split(' '); let pos = 0; const h = $('#cuOrd', el);
    h.innerHTML = `<p><b>${a[0]}</b> — нажимай ходы по порядку</p><p class="alg o-out">&nbsp;</p><div class="row">${shuffle(m.map((x, i) => [x, i])).map(x => `<button class="btn ghost" data-m="${x[0]}">${x[0]}</button>`).join('')}</div><p class="res"></p>`;
    $$('[data-m]', h).forEach(b => b.onclick = () => { if (b.dataset.m === m[pos]) { b.disabled = true; b.style.opacity = .3; pos++; $('.o-out', h).textContent = m.slice(0, pos).join(' ');
        if (pos === m.length) { $('.res', h).textContent = '🎉 Верно!'; $('.res', h).className = 'res good'; setTimeout(ord, 1500); } } else { $('.res', h).textContent = '❌ Следующий ход не ' + b.dataset.m; $('.res', h).className = 'res bad'; } }); };
  miss(); ord();

  // Scramble + timer
  const scramble = n => { const faces = 'RLUDFB', ax = { R: 0, L: 0, U: 1, D: 1, F: 2, B: 2 }, len = { 3: 20, 4: 40, 5: 60, 6: 80 }[n]; let out = [], last = -1;
    while (out.length < len) { const f = faces[Math.floor(Math.random() * 6)]; if (ax[f] === last) continue; last = ax[f];
      let pre = ''; if (n >= 4 && Math.random() < .4) pre = n >= 6 && Math.random() < .4 ? '3' + f + 'w' : f + 'w'; out.push((pre || f) + ['', "'", '2'][Math.floor(Math.random() * 3)]); }
    return out.join(' '); };
  const tz = $('#tz', el), sc = $('#scr', el), tm = $('#tm', el);
  const newScr = () => sc.textContent = scramble(+tz.value);
  let t0 = 0, run = false, raf;
  const stats = () => { const all = Store.get('cube.times.' + tz.value, []); const best = all.length ? Math.min(...all) : 0; const l5 = all.slice(-5), avg = l5.length ? l5.reduce((a, b) => a + b, 0) / l5.length : 0;
    $('#tStats', el).innerHTML = `<p>Лучшее: <b>${best ? best.toFixed(2) : '—'}</b> · Среднее 5: <b>${avg ? avg.toFixed(2) : '—'}</b> · Сборок: ${all.length}</p><p class="small muted">${all.slice(-12).map(t => t.toFixed(2)).join(' · ')}</p>`; };
  const toggle = () => { if (!run) { t0 = performance.now(); run = true; const tick = () => { tm.textContent = ((performance.now() - t0) / 1000).toFixed(2); raf = requestAnimationFrame(tick); }; tick(); }
    else { run = false; cancelAnimationFrame(raf); const t = (performance.now() - t0) / 1000; tm.textContent = t.toFixed(2); const k = 'cube.times.' + tz.value, a = Store.get(k, []); a.push(+t.toFixed(2)); Store.set(k, a.slice(-200)); stats(); newScr(); } };
  tm.onclick = toggle;
  document.addEventListener('keydown', e => { if (e.code === 'Space' && $('#cube').classList.contains('on') && $('[data-pane="timer"]', el).classList.contains('on') && !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) { e.preventDefault(); toggle(); } });
  tz.onchange = () => { newScr(); stats(); }; $('#tScr', el).onclick = newScr; newScr(); stats();
});
