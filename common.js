// Shared helpers: storage, speech, tabs
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const Store = {
  get(k, d) { try { const v = localStorage.getItem('hub.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('hub.' + k, JSON.stringify(v)); } catch (e) {} }
};

// Text-to-speech through the browser (free). Best voices: Microsoft Edge ("Natural" voices).
const Speech = {
  voices: [],
  load() { this.voices = speechSynthesis.getVoices(); },
  // Only voices whose language really matches (es-* for Spanish, zh-CN/zh-* for Chinese). Never an English voice for Spanish.
  list(lang) { const p = lang.slice(0, 2).toLowerCase(); return this.voices.filter(x => x.lang.replace('_', '-').toLowerCase().startsWith(p)); },
  pick(lang) {
    const saved = Store.get('voice.' + lang.slice(0, 2), ''), L = this.list(lang);
    const exact = L.filter(x => x.lang.replace('_', '-').toLowerCase() === lang.toLowerCase());
    return L.find(x => x.name === saved) || exact.find(x => /natural|online|google/i.test(x.name)) || exact[0] || L.find(x => /natural|online|google/i.test(x.name)) || L[0] || null;
  },
  audio: null,
  play(src, then) { if ('speechSynthesis' in window) speechSynthesis.cancel(); if (this.audio) { this.audio.onended = null; this.audio.pause(); }
    this.audio = new Audio(src); this.audio.onended = then || null; return this.audio.play(); },
  // Recorded native neural voice (Microsoft Elvira es-ES / Xiaoxiao zh-CN) first; whole phrase or char-by-char for Chinese names
  recorded(text, lang) {
    const A = window.AUDIO && AUDIO[lang.slice(0, 2)]; if (!A) return false; const t = String(text).trim();
    if (A[t]) { this.play(A[t]).catch(() => {}); return true; }
    const chars = [...t].filter(c => /[一-鿿]/.test(c));
    if (lang.startsWith('zh') && chars.length && chars.every(c => A[c])) { const step = i => i < chars.length && this.play(A[chars[i]], () => step(i + 1)).catch(() => {}); step(0); return true; }
    return false;
  },
  say(text, lang, rate = 0.85) {
    if (!Store.get('voice.sys.' + lang.slice(0, 2), false) && this.recorded(text, lang)) return;
    const v = 'speechSynthesis' in window ? this.pick(lang) : null;
    if (!v && lang.slice(0, 2) !== 'en') return this.online(text, lang);   // no native-language voice → online native TTS
    speechSynthesis.cancel(); if (this.audio) this.audio.pause();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = v ? v.lang : lang; u.rate = rate; if (v) u.voice = v;
    speechSynthesis.speak(u);
  },
  // Fallback: Google Translate pronunciation audio (sends only the study word/phrase)
  online(text, lang) {
    if ('speechSynthesis' in window) speechSynthesis.cancel(); if (this.audio) this.audio.pause();
    const tl = lang.slice(0, 2) === 'zh' ? 'zh-CN' : lang.slice(0, 2);
    this.audio = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' + tl + '&q=' + encodeURIComponent(text.slice(0, 190)));
    this.audio.play().catch(() => alert('Нет голоса для этого языка и нет интернета. Установи голос: Параметры Windows → Время и язык → Речь → Добавить голоса (Español, 中文).'));
  },
  status(lang) { const l = lang.slice(0, 2); if (window.AUDIO && AUDIO[l] && !Store.get('voice.sys.' + l, false)) return `✅ записанный нейроголос ${l === 'es' ? 'Elvira (es-ES, Испания)' : 'Xiaoxiao (zh-CN)'} — ${Object.keys(AUDIO[l]).length} фраз, работает без интернета`;
    const v = this.pick(lang); return v ? `✅ ${v.name} (${v.lang})` : '🌐 нет установленного голоса — используется онлайн-голос Google (нужен интернет)'; }
};
if ('speechSynthesis' in window) { Speech.load(); speechSynthesis.onvoiceschanged = () => Speech.load(); }
const spk = (text, lang) => `<button class="spk" title="Послушать" onclick="Speech.say(${esc(JSON.stringify(text))},'${lang}')">🔊</button>`;

// Sub-tabs inside a section: subTabs(rootEl, [[id,label,html],...])
function subTabs(root, items, key) {
  const cur = Store.get('sub.' + key, items[0][0]);
  root.insertAdjacentHTML('beforeend',
    `<div class="sub">${items.map(i => `<button data-p="${i[0]}">${i[1]}</button>`).join('')}</div>` +
    items.map(i => `<div class="pane" data-pane="${i[0]}">${i[2] || ''}</div>`).join(''));
  const show = id => {
    $$('.sub button', root).forEach(b => b.classList.toggle('on', b.dataset.p === id));
    $$('.pane', root).forEach(p => p.classList.toggle('on', p.dataset.pane === id));
    Store.set('sub.' + key, id);
  };
  $$('.sub button', root).forEach(b => b.onclick = () => show(b.dataset.p));
  show(items.some(i => i[0] === cur) ? cur : items[0][0]);
}

// Checklist with saved progress
function checklist(key, items) {
  const st = Store.get('chk.' + key, {});
  return `<div data-chk="${key}">` + items.map((t, i) =>
    `<label class="check"><input type="checkbox" data-i="${i}" ${st[i] ? 'checked' : ''}><span class="${st[i] ? 'done' : ''}">${t}</span></label>`).join('') + `</div>`;
}
document.addEventListener('change', e => {
  const box = e.target.closest('[data-chk]');
  if (!box || e.target.type !== 'checkbox') return;
  const k = 'chk.' + box.dataset.chk, st = Store.get(k, {});
  st[e.target.dataset.i] = e.target.checked; Store.set(k, st);
  e.target.nextElementSibling.classList.toggle('done', e.target.checked);
  App.refreshHome && App.refreshHome();
});
const chkProgress = (key, n) => { const st = Store.get('chk.' + key, {}); return Object.values(st).filter(Boolean).length / n; };

const App = {
  modules: {},
  reg(id, fn) { this.modules[id] = fn; },
  start() {
    for (const [id, fn] of Object.entries(this.modules)) { try { fn($('#' + id)); } catch (e) { console.error(id, e); $('#' + id).innerHTML = '<p>Ошибка загрузки раздела: ' + esc(e.message) + '</p>'; } }
    const go = t => { $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === t)); $$('.tab').forEach(s => s.classList.toggle('on', s.id === t)); Store.set('tab', t); };
    $$('#nav button').forEach(b => b.onclick = () => { go(b.dataset.tab); scrollTo(0, 0); });
    window.goTab = go;
    go(Store.get('tab', 'home'));
  }
};

// Home dashboard
App.reg('home', el => {
  const render = () => {
    const zhDay = Store.get('zh.day', 0), esKnown = Object.keys(Store.get('es.known', {})).length;
    const cy = Math.round((window.cyberProgress ? window.cyberProgress() : 0) * 100);
    const puz = Object.keys(Store.get('chess.solved', {})).length;
    el.innerHTML = `
    <h1>Привет! Что делаем сегодня?</h1>
    <p class="muted">Всё сохраняется в этом браузере. Озвучка работает лучше всего в <b>Microsoft Edge</b> (там есть естественные голоса для испанского и китайского).</p>
    <div class="grid">
      <div class="card"><h3>🛡️ Cyber Security</h3><p>Проект «Secure Infrastructure from Zero»: выполнено <b>${cy}%</b></p><div class="bar"><i style="width:${cy}%"></i></div><p><button class="btn" onclick="goTab('cyber')">Продолжить</button></p></div>
      <div class="card"><h3>🇨🇳 中文</h3><p>Сегодня: урок <b>${Math.min(zhDay + 1, 30)}</b> из 30 (5 слов + фраза, с тонами и звуком)</p><p><button class="btn" onclick="goTab('zh')">Урок дня</button></p></div>
      <div class="card"><h3>🇪🇸 Español</h3><p>Выучено слов: <b>${esKnown}</b> / 1000. Цель дня: 15 карточек + 1 тема грамматики</p><p><button class="btn" onclick="goTab('es')">Учить</button></p></div>
      <div class="card"><h3>♟️ Шахматы</h3><p>Решено задач: <b>${puz}</b>. Цель дня: 1 тема теории + задачи + 1 партия 15+10</p><p><button class="btn" onclick="goTab('chess')">Тренировка</button></p></div>
      <div class="card"><h3>🧊 Кубик Рубика</h3><p>3×3 → 4×4 → 5×5 → 6×6, пошаговые методы и алгоритмы</p><p><button class="btn" onclick="goTab('cube')">Открыть</button></p></div>
    </div>
    <div class="card"><h3>🔊 Голоса озвучки</h3>${[['es-ES', 'Español', 'Hola, ¿cómo estás? Me llamo Ana y estudio español.'], ['zh-CN', '中文', '你好，我叫安娜。我学习汉语。'], ['en-US', 'English', 'Confidentiality, integrity and availability.']].map(([l, n, t]) => `
      <div class="row" style="margin:6px 0"><b style="min-width:70px">${n}</b><select data-voice="${l}"><option value="">${l === 'en-US' ? 'авто' : 'записанный нейроголос (лучший)'}</option>${Speech.list(l).map(v => `<option ${Store.get('voice.' + l.slice(0, 2), '') === v.name ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select>
      <button class="btn ghost" onclick="Speech.say(${esc(JSON.stringify(t))},'${l}')">▶ Тест</button><span class="small muted">${Speech.status(l)}</span></div>`).join('')}
      <p class="small muted">Испанский и китайский читаются только испанским/китайским голосом. Если голоса нет в системе — включается онлайн-голос Google. Лучшие голоса: браузер Edge (Natural) или Windows → Параметры → Время и язык → Речь → Добавить голоса.</p></div>
    <div class="card"><h3>Распорядок дня (≈90 минут)</h3>${checklist('daily.' + new Date().toISOString().slice(0, 10), [
      'Cyber: 1 задача проекта (WHAT → WHY → HOW → TEST) — 40 мин',
      'Китайский: урок дня, повторить вслух каждое слово 3 раза — 15 мин',
      'Испанский: 15 карточек + 1 тема грамматики + упражнение — 20 мин',
      'Шахматы: 5–10 задач + 1 партия 15+10 с разбором — 15–30 мин',
      'Кубик: 5 сборок на время или 1 новый алгоритм — 5–10 мин'])}
    </div>`;
  };
  App.refreshHome = render; render();
  el.addEventListener('change', e => { const s = e.target.closest('[data-voice]'); if (s) { const l = s.dataset.voice.slice(0, 2); Store.set('voice.' + l, s.value); Store.set('voice.sys.' + l, !!s.value); render(); } });
  if ('speechSynthesis' in window) speechSynthesis.addEventListener('voiceschanged', () => { if ($('#home').classList.contains('on')) render(); });
});
