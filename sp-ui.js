// Security+ UI: chapter theory + flashcards + quiz; games; exam simulator
const SP_PORTS = [['FTP','20/21'],['SSH / SFTP / SCP','22'],['Telnet','23'],['SMTP','25'],['DNS','53'],['DHCP','67/68'],['TFTP','69'],['HTTP','80'],['Kerberos','88'],['POP3','110'],['NTP','123'],['IMAP','143'],['SNMP','161/162'],['LDAP','389'],['HTTPS','443'],['SMB','445'],['Syslog','514'],['SMTPS (submission)','587'],['LDAPS','636'],['IMAPS','993'],['POP3S','995'],['MS SQL','1433'],['RADIUS','1812/1813'],['MySQL','3306'],['RDP','3389'],['SIP','5060/5061'],['TACACS+','49']];
function spInit(el) {
  const D = ['', 'General Security Concepts', 'Threats, Vulnerabilities & Mitigations', 'Security Architecture', 'Security Operations', 'Program Management & Oversight'];
  const cards = c => c.cards.map(s => s.split('|'));
  const root = $('#spRoot', el);
  root.innerHTML = `<div class="card"><p>Учим по главам книги Exam Cram (28 глав = 28 целей экзамена). В каждой главе: <b>теория → флешкарты → тест</b>. Глава считается пройденной при тесте ≥ 80%.</p>
   <select id="spSel" style="width:100%">${SP.map(c => `<option value="${c.c}">Гл. ${c.c} (${c.obj}) ${c.t} — ${c.ru}</option>`).join('')}</select>
   <p class="small muted">Все 5 доменов, 28 глав. Тесты — на английском, как на экзамене.</p><div id="spStat" class="small"></div></div><div id="spBody"></div>`;
  const stat = () => $('#spStat', root).innerHTML = [1, 2, 3, 4, 5].map(d => { const ch = SP.filter(c => c.d === d); const ok = ch.filter(c => Store.get('quiz.sp' + c.c, 0) >= 80).length; return `D${d} ${D[d]}: <b>${ok}/${ch.length || '—'}</b>`; }).join(' · ');
  const open = n => { const c = SP.find(x => x.c === +n); Store.set('sp.cur', c.c); $('#spSel', root).value = c.c;
    const lg = Store.get('sp.lang', 'ru'), en = window.SP_EN && SP_EN[c.c];
    const body = lg === 'en' && en ? md(en) : lg === 'both' && en ? `<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr))"><div><h3 class="muted">🇷🇺 Русский</h3>${md(c.md)}</div><div><h3 class="muted">🇬🇧 English</h3>${md(en)}</div></div>` : md(c.md);
    $('#spBody', root).innerHTML = `<div class="card"><div class="row sub" style="margin:0 0 8px">${[['ru', '🇷🇺 Русский'], ['en', '🇬🇧 English'], ['both', 'RU + EN']].map(x => `<button data-lg="${x[0]}" class="${lg === x[0] ? 'on' : ''}">${x[1]}</button>`).join('')}</div><h2>Глава ${c.c}. ${c.t}</h2><p class="muted">Objective ${c.obj} · Domain ${c.d}: ${D[c.d]} · ${c.ru}</p>${body}</div>
     <div class="card"><h3>🗂️ Флешкарты главы (${c.cards.length})</h3><div class="spDeck"></div></div><div class="card"><h3>📝 Тест главы (вопросы как на экзамене)</h3><div class="spQuiz"></div></div>
     <div class="row"><button class="btn ghost" id="spPrev">← Пред.</button><button class="btn ghost" id="spNext">След. →</button></div>`;
    Deck($('.spDeck', root), cards(c), { key: 'sp' + c.c }); Quiz($('.spQuiz', root), c.quiz, { key: 'sp' + c.c });
    $$('[data-lg]', root).forEach(b => b.onclick = () => { Store.set('sp.lang', b.dataset.lg); open(c.c); });
    $('#spPrev', root).onclick = () => open(Math.max(SP[0].c, c.c - 1)); $('#spNext', root).onclick = () => open(Math.min(SP[SP.length - 1].c, c.c + 1)); };
  $('#spSel', root).onchange = e => open(e.target.value); open(Store.get('sp.cur', SP[0].c)); stat(); el.addEventListener('click', stat);

  const allCards = SP.flatMap(cards), allQ = SP.flatMap(c => c.quiz);
  const g = $('#spGames', el);
  g.innerHTML = `<div class="card"><h3>🗂️ Все флешкарты Security+ (${allCards.length})</h3><div id="gA"></div></div>
   <div class="card"><h3>🎓 Симулятор экзамена</h3><p class="small muted">Реальный экзамен: до 90 вопросов, 90 мин, проход 750/900.</p><div class="row"><button class="btn ghost" data-ex="30">30 questions / 30 min</button><button class="btn ghost" data-ex="60">60 / 60 min</button><button class="btn ghost" data-ex="90">Full exam: 90 / 90 min</button></div><div class="row" style="margin-top:6px">${[1,2,3,4,5].map(d=>`<button class="btn ghost" data-dom="${d}">Domain ${d} only</button>`).join('')}</div><div id="gEx" style="margin-top:8px"></div></div>
   <div class="card"><h3>🧩 Найди пару: термин ↔ значение</h3><div id="gM"></div></div>
   <div class="card"><h3>⚡ Блиц: порты (60 сек)</h3><div id="gP"></div></div>
   <div class="card"><h3>⚡ Блиц: термины (60 сек)</h3><div id="gB"></div></div>
   <div class="card"><h3>🧩 Пары: протокол ↔ порт</h3><div id="gPM"></div></div>
   <div class="card"><h3>🔤 Акронимы (${SP_ACR.length}) — флешкарты</h3><div id="gAD"></div></div>
   <div class="card"><h3>⚡ Блиц: расшифруй акроним</h3><div id="gAB"></div></div>
   ${SP_SORT.map((s,i)=>`<div class="card"><h3>🎯 Scenario → ${s[0]}</h3><div id="gS${i}"></div></div>`).join('')}`;
  Deck($('#gA', g), allCards, { key: 'spAll' }); Match($('#gM', g), allCards, { key: 'spTerms' });
  Blitz($('#gP', g), SP_PORTS, { key: 'spPorts' }); Blitz($('#gB', g), allCards, { key: 'spTerms' }); Match($('#gPM', g), SP_PORTS, { key: 'spPorts' });
  Deck($('#gAD', g), SP_ACR, { key: 'spAcr' }); Blitz($('#gAB', g), SP_ACR, { key: 'spAcr' });
  SP_SORT.forEach((s, i) => Blitz($('#gS' + i, g), s[1], { key: 'spSort' + i, secs: 45 }));
  $$('[data-dom]', g).forEach(b => b.onclick = () => Quiz($('#gEx', g), SP.filter(c => c.d === +b.dataset.dom).flatMap(c => c.quiz), { key: 'spDom' + b.dataset.dom, n: 30, timer: 30, exam: true }));
  $$('[data-ex]', g).forEach(b => b.onclick = () => Quiz($('#gEx', g), allQ, { key: 'spExam' + b.dataset.ex, n: +b.dataset.ex, timer: +b.dataset.ex, exam: true }));
}
