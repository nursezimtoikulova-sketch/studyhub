// ===== CHINESE: tones, write your name, 30 daily lessons, stroke practice =====
// lesson: [title, [[hanzi,pinyin,ru],...x5], [phrase hanzi, pinyin, ru], tip]
const ZH_L = [
['Приветствие',[['你','nǐ','ты'],['好','hǎo','хорошо'],['您','nín','Вы (вежл.)'],['我','wǒ','я'],['他 / 她','tā','он / она']],['你好！','nǐ hǎo','Привет!'],'Правило 3-го тона: два 3-х тона подряд → первый звучит как 2-й: nǐ hǎo → «ní hǎo».'],
['Вежливость',[['谢谢','xiè xie','спасибо'],['不客气','bú kè qi','не за что'],['对不起','duì bu qǐ','извините'],['没关系','méi guān xi','ничего страшного'],['再见','zài jiàn','до свидания']],['谢谢你！','xiè xie nǐ','Спасибо тебе!'],'不 bù перед 4-м тоном становится bú: bú kè qi, bú shì.'],
['Как тебя зовут?',[['叫','jiào','звать(ся)'],['名字','míng zi','имя'],['什么','shén me','что? какой?'],['是','shì','быть, являться'],['姓','xìng','фамилия; по фамилии']],['你叫什么名字？','nǐ jiào shén me míng zi','Как тебя зовут?'],'Ответ: 我叫… (wǒ jiào …) — Меня зовут … Своё имя собери во вкладке «Моё имя».'],
['Страны',[['中国','zhōng guó','Китай'],['人','rén','человек'],['哪','nǎ','какой? который?'],['吉尔吉斯斯坦','jí ěr jí sī sī tǎn','Кыргызстан'],['俄罗斯','é luó sī','Россия']],['你是哪国人？','nǐ shì nǎ guó rén','Ты из какой страны?'],'Страна + 人 = житель: 中国人 — китаец, 俄罗斯人 — русский.'],
['Числа 1–5',[['一','yī','один'],['二','èr','два'],['三','sān','три'],['四','sì','четыре'],['五','wǔ','пять']],['一二三四五','yī èr sān sì wǔ','1 2 3 4 5'],'四 sì (4) и 十 shí (10) — следи за тоном и звуком s / sh!'],
['Числа 6–10',[['六','liù','шесть'],['七','qī','семь'],['八','bā','восемь'],['九','jiǔ','девять'],['十','shí','десять']],['十一，二十，九十九','shí yī, èr shí, jiǔ shí jiǔ','11, 20, 99'],'Числа строятся логично: 十一 = 10+1, 二十 = 2×10, 三十五 = 35.'],
['Семья',[['爸爸','bà ba','папа'],['妈妈','mā ma','мама'],['哥哥','gē ge','старший брат'],['姐姐','jiě jie','старшая сестра'],['妹妹','mèi mei','младшая сестра']],['这是我妈妈。','zhè shì wǒ mā ma','Это моя мама.'],'Повторённый слог читается нейтральным (лёгким) тоном: mā ma.'],
['Мы, вы, это',[['我们','wǒ men','мы'],['你们','nǐ men','вы'],['他们','tā men','они'],['这','zhè','это'],['那','nà','то']],['他们是我的朋友。','tā men shì wǒ de péng you','Они мои друзья.'],'们 men делает множественное число для людей.'],
['Как дела?',[['吗','ma','вопросит. частица'],['不','bù','не'],['很','hěn','очень'],['也','yě','тоже'],['呢','ne','а (ты)?']],['你好吗？我很好，你呢？','nǐ hǎo ma? wǒ hěn hǎo, nǐ ne?','Как дела? Хорошо, а ты?'],'吗 в конце превращает фразу в вопрос «да/нет». Порядок слов не меняется!'],
['Еда и напитки',[['吃','chī','есть'],['喝','hē','пить'],['水','shuǐ','вода'],['茶','chá','чай'],['米饭','mǐ fàn','рис (варёный)']],['我喝茶。','wǒ hē chá','Я пью чай.'],'Порядок как в русском/английском: подлежащее — глагол — дополнение.'],
['Хочу и люблю',[['想','xiǎng','хотеть; думать'],['要','yào','хотеть, нужно'],['喜欢','xǐ huan','нравиться'],['爱','ài','любить'],['咖啡','kā fēi','кофе']],['我喜欢喝咖啡。','wǒ xǐ huan hē kā fēi','Я люблю пить кофе.'],'想 мягче (хотелось бы), 要 сильнее (хочу / буду).'],
['Иметь',[['有','yǒu','иметь, есть'],['没有','méi yǒu','не иметь, нет'],['个','gè','счётное слово'],['朋友','péng you','друг'],['猫','māo','кошка']],['我有一个朋友。','wǒ yǒu yí gè péng you','У меня есть один друг.'],'Отрицание 有 — только 没 (méi), не 不! 一 перед 4-м тоном → yí: yí gè.'],
['Время',[['今天','jīn tiān','сегодня'],['明天','míng tiān','завтра'],['昨天','zuó tiān','вчера'],['现在','xiàn zài','сейчас'],['点','diǎn','час (время)']],['现在几点？','xiàn zài jǐ diǎn','Который час?'],'几 jǐ — сколько (до 10), для времени и маленьких чисел.'],
['Дни и месяцы',[['星期','xīng qī','неделя'],['星期一','xīng qī yī','понедельник'],['天','tiān','день; небо'],['月','yuè','месяц; луна'],['年','nián','год']],['今天星期几？','jīn tiān xīng qī jǐ','Какой сегодня день недели?'],'Дни: 星期 + число (1–6), воскресенье — 星期天 xīng qī tiān.'],
['Места',[['学校','xué xiào','школа'],['家','jiā','дом; семья'],['医院','yī yuàn','больница'],['商店','shāng diàn','магазин'],['去','qù','идти, ехать']],['我去学校。','wǒ qù xué xiào','Я иду в школу.'],'去 + место — без предлога: 去商店 = пойти в магазин.'],
['Где?',[['在','zài','находиться; в'],['哪儿','nǎr','где?'],['这儿','zhèr','здесь'],['那儿','nàr','там'],['里','lǐ','внутри']],['你在哪儿？','nǐ zài nǎr','Ты где?'],'儿 r — северный (пекинский) призвук: nǎr, zhèr.'],
['Учёба',[['学习','xué xí','учиться'],['汉语','hàn yǔ','китайский язык'],['老师','lǎo shī','учитель'],['学生','xué sheng','ученик'],['书','shū','книга']],['我学习汉语。','wǒ xué xí hàn yǔ','Я учу китайский.'],'老师 часто ставят после фамилии: 王老师 — учитель Ван.'],
['Работа',[['工作','gōng zuò','работа; работать'],['医生','yī shēng','врач'],['做','zuò','делать'],['电脑','diàn nǎo','компьютер'],['公司','gōng sī','компания']],['你做什么工作？','nǐ zuò shén me gōng zuò','Кем ты работаешь?'],'电脑 = «электрический мозг». Китайские слова часто логичны — используй это для памяти!'],
['Покупки',[['钱','qián','деньги'],['多少','duō shao','сколько'],['块','kuài','юань (разг.)'],['买','mǎi','покупать'],['卖','mài','продавать']],['这个多少钱？','zhè ge duō shao qián','Сколько это стоит?'],'买 mǎi (3) — покупать, 卖 mài (4) — продавать. Тон меняет смысл!'],
['Прилагательные',[['大','dà','большой'],['小','xiǎo','маленький'],['多','duō','много'],['热','rè','жарко'],['冷','lěng','холодно']],['今天很冷。','jīn tiān hěn lěng','Сегодня холодно.'],'Без глагола «быть»: 很 + прилагательное. Не говори 是冷!'],
['Чувства и действия',[['看','kàn','смотреть'],['听','tīng','слушать'],['说','shuō','говорить'],['读','dú','читать (вслух)'],['写','xiě','писать']],['我听音乐。','wǒ tīng yīn yuè','Я слушаю музыку.'],'看书 kàn shū — читать книгу (досл. «смотреть книгу»).'],
['Умею / могу',[['会','huì','уметь (навык)'],['能','néng','мочь (возможность)'],['可以','kě yǐ','можно'],['开车','kāi chē','водить машину'],['一点儿','yì diǎnr','немного']],['我会说一点儿汉语。','wǒ huì shuō yì diǎnr hàn yǔ','Я немного говорю по-китайски.'],'会 — научился; 能 — есть возможность; 可以 — разрешено.'],
['Транспорт',[['坐','zuò','сидеть; ехать на'],['飞机','fēi jī','самолёт'],['出租车','chū zū chē','такси'],['火车','huǒ chē','поезд'],['来','lái','приходить']],['我坐飞机去北京。','wǒ zuò fēi jī qù běi jīng','Я лечу в Пекин на самолёте.'],'Порядок: кто — КАК (坐飞机) — куда (去北京). Способ стоит перед действием.'],
['Погода',[['天气','tiān qì','погода'],['下雨','xià yǔ','идёт дождь'],['太','tài','слишком'],['了','le','частица (изменение)'],['怎么样','zěn me yàng','как? каков?']],['今天天气怎么样？','jīn tiān tiān qì zěn me yàng','Какая сегодня погода?'],'太…了 = слишком: 太热了！ — Слишком жарко!'],
['Самочувствие',[['身体','shēn tǐ','тело; здоровье'],['累','lèi','уставший'],['睡觉','shuì jiào','спать'],['起床','qǐ chuáng','вставать'],['病','bìng','болезнь']],['我很累，我想睡觉。','wǒ hěn lèi, wǒ xiǎng shuì jiào','Я устала, хочу спать.'],'Комбинируй: 我想 + глагол = я хочу сделать…'],
['Еда 2',[['菜','cài','блюдо; овощи'],['水果','shuǐ guǒ','фрукты'],['苹果','píng guǒ','яблоко'],['好吃','hǎo chī','вкусный'],['饭店','fàn diàn','ресторан']],['这个菜很好吃。','zhè ge cài hěn hǎo chī','Это блюдо очень вкусное.'],'好 + глагол = приятно делать: 好吃 вкусно, 好喝 вкусно (напиток), 好看 красиво.'],
['Части дня',[['上午','shàng wǔ','утро (до обеда)'],['中午','zhōng wǔ','полдень'],['下午','xià wǔ','после обеда'],['分钟','fēn zhōng','минута'],['时候','shí hou','время, момент']],['你什么时候来？','nǐ shén me shí hou lái','Когда ты придёшь?'],'Время стоит ПЕРЕД глаголом: 我明天去 — я завтра пойду.'],
['Знакомство',[['认识','rèn shi','быть знакомым'],['高兴','gāo xìng','радостный'],['电话','diàn huà','телефон'],['打','dǎ','бить; звонить'],['先生','xiān sheng','господин; муж']],['认识你很高兴！','rèn shi nǐ hěn gāo xìng','Приятно познакомиться!'],'打电话 dǎ diàn huà — звонить по телефону.'],
['Цвета и одежда',[['衣服','yī fu','одежда'],['红','hóng','красный'],['白','bái','белый'],['黑','hēi','чёрный'],['漂亮','piào liang','красивый']],['你的衣服很漂亮。','nǐ de yī fu hěn piào liang','У тебя красивая одежда.'],'的 de = принадлежность: 我的 — мой, 你的 — твой.'],
['Повторение и связки',[['的','de','частица принадлежности'],['和','hé','и (между сущ.)'],['都','dōu','все; всё'],['对','duì','правильно'],['回','huí','возвращаться']],['我们都是朋友。','wǒ men dōu shì péng you','Мы все друзья.'],'Поздравляю! 150 слов. Дальше — HSK 1 → HSK 2. Повтори уроки 1–30 в режиме карточек.']
];
const TONE_RE = [/[āēīōūǖ]/, /[áéíóúǘ]/, /[ǎěǐǒǔǚ]/, /[àèìòùǜ]/];
const toneOf = syl => { for (let i = 0; i < 4; i++) if (TONE_RE[i].test(syl)) return i + 1; return 5; };
const colorPy = py => py.split(/(\s+|[,.?!，。？！]+)/).map(s => /\w|[^\x00-\x7F]/.test(s) && !/^[,.?!，。？！\s]+$/.test(s) ? `<span class="t${toneOf(s)}">${s}</span>` : s).join('');
const NAME_SYL = [['a','阿','ā'],['ai','艾','ài'],['an','安','ān'],['ba','巴','bā'],['bo','博','bó'],['da','达','dá'],['de','德','dé'],['di','迪','dí'],['-r / -l (конец слога)','尔','ěr'],['fu / f','弗','fú'],['ga','加','jiā'],['ge / g','格','gé'],['gu','古','gǔ'],['gul','古丽','gǔ lì'],['ha','哈','hā'],['ji','吉','jí'],['ka','卡','kǎ'],['ke / k','克','kè'],['ku','库','kù'],['la','拉','lā'],['le','勒','lè'],['li','丽','lì'],['lin','林','lín'],['lu','卢','lú'],['ma','玛','mǎ'],['mi','米','mǐ'],['m (конец)','姆','mǔ'],['mu','穆','mù'],['na','娜','nà'],['n (конец)','恩','ēn'],['ni','妮','nī'],['nu','努','nǔ'],['ra','拉','lā'],['ro','罗','luó'],['ru','鲁','lǔ'],['sa','萨','sà'],['se','塞','sài'],['s (конец)','斯','sī'],['su','苏','sū'],['ta','塔','tǎ'],['te / t','特','tè'],['ti','蒂','dì'],['to','托','tuō'],['u / ul','乌','wū'],['wa / va','瓦','wǎ'],['ya','娅','yà'],['yi / i','伊','yī'],['yu','尤','yóu'],['za','扎','zā'],['ze','泽','zé'],['zi / z','兹','zī'],['sh','什','shí']];
const TONE_DRILL = [['妈','mā',1],['麻','má',2],['马','mǎ',3],['骂','mà',4],['八','bā',1],['白','bái',2],['好','hǎo',3],['大','dà',4],['书','shū',1],['人','rén',2],['我','wǒ',3],['四','sì',4],['三','sān',1],['茶','chá',2],['水','shuǐ',3],['去','qù',4],['喝','hē',1],['十','shí',2],['五','wǔ',3],['爱','ài',4],['天','tiān',1],['来','lái',2],['小','xiǎo',3],['看','kàn',4],['猫','māo',1],['钱','qián',2],['买','mǎi',3],['卖','mài',4]];

App.reg('zh', el => {
  el.innerHTML = `<h1>🇨🇳 中文 — с нуля</h1><p class="muted">Каждый день 1 урок: 5 слов с тонами + фраза + подсказка. 🔊 = голос zh-CN. Цвета тонов: <span class="t1">1 ˉ</span> <span class="t2">2 ˊ</span> <span class="t3">3 ˇ</span> <span class="t4">4 ˋ</span> <span class="t5">нейтр.</span></p>`;
  const lesson = `<div class="card row"><button class="btn ghost" id="zPrev">←</button><select id="zSel">${ZH_L.map((l, i) => `<option value="${i}">Урок ${i + 1}: ${l[0]}</option>`).join('')}</select><button class="btn ghost" id="zNext">→</button><span id="zProg" class="muted small"></span></div><div id="zBody"></div>`;
  const tones = `<div class="card"><h2>4 тона + нейтральный</h2><p>Тон = мелодия слога. Один и тот же слог с другим тоном — другое слово!</p>
    <div class="tbl"><table><tr><th>Тон</th><th>Как звучит</th><th>Пример</th></tr>
    <tr><td class="t1"><b>1 — ā</b></td><td>высокий ровный, как долгая нота «ааа»</td><td>${spk('妈', 'zh-CN')} 妈 mā — мама</td></tr>
    <tr><td class="t2"><b>2 — á</b></td><td>восходящий, как удивлённое «а?»</td><td>${spk('麻', 'zh-CN')} 麻 má — конопля</td></tr>
    <tr><td class="t3"><b>3 — ǎ</b></td><td>низкий, опускается и чуть поднимается «а-а»</td><td>${spk('马', 'zh-CN')} 马 mǎ — лошадь</td></tr>
    <tr><td class="t4"><b>4 — à</b></td><td>резко падающий, как приказ «Да!»</td><td>${spk('骂', 'zh-CN')} 骂 mà — ругать</td></tr>
    <tr><td class="t5"><b>нейтр. — a</b></td><td>короткий, лёгкий, без ударения</td><td>${spk('吗', 'zh-CN')} 吗 ma — вопрос</td></tr></table></div>
    <p>🎯 Фраза-тренажёр: ${spk('妈妈骂马吗？', 'zh-CN')} <b>妈妈骂马吗？</b> ${colorPy('mā ma mà mǎ ma?')} — «Мама ругает лошадь?»</p></div>
    <div class="card"><h3>🎧 Угадай тон на слух</h3><div class="row"><button class="btn" id="tPlay">▶ Слушать</button>${[1, 2, 3, 4].map(t => `<button class="btn ghost" data-t="${t}">${t}</button>`).join('')}</div><p id="tRes" class="res"></p><p class="small muted">Счёт: <span id="tScore">0/0</span></p></div>
    <div class="card"><h3>Pinyin: трудные звуки</h3><ul><li><b>zh, ch, sh, r</b> — язык загнут назад (как «ж», «ч», «ш»)</li><li><b>z, c, s</b> — «дз», «ц» (с придыханием), «с»</li><li><b>j, q, x</b> — мягкие «дзь», «ць», «сь»</li><li><b>ü</b> — как немецкое ü (губы трубочкой, говорим «и»). После j, q, x, y пишется u: qù, xué</li><li><b>p, t, k, c, ch, q</b> — с сильным выдохом (придыханием)</li><li><b>e</b> — между «э» и «ы»: hē</li></ul></div>`;
  const name = `<div class="card"><h2>✍️ Моё имя по-китайски</h2><p>Иностранные имена записываются <b>по звучанию</b> (音译 yīn yì): имя делят на слоги и подбирают иероглифы с похожим звуком. Для женских имён часто выбирают «красивые» иероглифы: 娜 nà, 丽 lì, 莎 shā, 娅 yà.</p>
    <p><b>Примеры:</b> Айгуль — 艾古丽 (ài gǔ lì), Нурлан — 努尔兰 (nǔ ěr lán), Асель — 阿塞尔 (ā sài ěr), Анна — 安娜 (ān nà), Мария — 玛丽亚 (mǎ lì yà).</p>
    <p>Разбей своё имя на слоги и нажимай кнопки:</p><div class="row" id="nSyl">${NAME_SYL.map((s, i) => `<button class="btn ghost" data-n="${i}" style="font-size:14px;padding:4px 9px">${s[0]} = ${s[1]}</button>`).join('')}</div>
    <div class="card"><div class="hz" id="nHz">—</div><div id="nPy" class="muted"></div><div class="row" style="margin-top:8px"><button class="btn" id="nSay">🔊 Произнести</button><button class="btn ghost" id="nDel">⌫ Убрать</button><button class="btn ghost" id="nClr">Очистить</button><button class="btn ok" id="nWrite">Тренировать написание</button></div></div>
    <p class="small muted">💡 Китайцы ещё выбирают <b>китайское имя</b> со смыслом (напр. фамилия + 2 иероглифа). Можно попросить преподавателя или носителя подобрать.</p></div>`;
  const write = `<div class="card"><h2>🖌️ Порядок черт (пиши мышкой / пальцем)</h2><div class="row"><input id="wIn" value="你好" size="10"><button class="btn" id="wGo">Показать</button><button class="btn ghost" id="wQuiz">Написать самой</button></div>
    <p class="small muted">Сначала посмотри анимацию, потом нажми «Написать самой» и рисуй черты по порядку. Правила: сверху вниз, слева направо, горизонталь раньше вертикали.</p><div id="wBox" class="row"></div></div>`;
  const review = `<div class="card"><h3>🗂️ Флешкарты (Лейтнер): пройденные уроки</h3><div id="zDeck"></div></div><div class="card"><h3>🧩 Иероглиф ↔ значение</h3><div id="zMatch"></div></div><div class="card"><h3>⚡ Блиц: pinyin → значение</h3><div id="zBlitz"></div></div><div class="card"><h3>Карточки: все пройденные слова</h3><div id="rCard" class="flash"></div><div class="row" style="justify-content:center"><button class="btn ghost" id="rNext">Следующее</button></div></div>`;
  subTabs(el, [['les', '📅 Урок дня', lesson], ['tones', '🎵 Тоны', tones], ['name', '✍️ Моё имя', name], ['write', '🖌️ Письмо', write], ['rev', '🔁 Повторение', review]], 'zh');

  // Lessons
  const sel = $('#zSel', el);
  const show = i => {
    i = Math.max(0, Math.min(ZH_L.length - 1, i)); sel.value = i; const L = ZH_L[i], day = Store.get('zh.day', 0);
    $('#zProg', el).textContent = `пройдено: ${day} / 30`;
    $('#zBody', el).innerHTML = `<div class="card"><h2>Урок ${i + 1}. ${L[0]}</h2><div class="grid">${L[1].map(w => `<div class="card" style="text-align:center;margin:0"><div class="hz">${w[0]}</div><div style="font-size:20px">${colorPy(w[1])}</div><div>${esc(w[2])}</div><p>${spk(w[0], 'zh-CN')} <button class="spk" onclick="zhWrite('${w[0].replace(/[\s/]/g, '')}')">🖌️</button></p></div>`).join('')}</div>
      <h3>Фраза дня</h3><p class="hz" style="font-size:32px">${L[2][0]} ${spk(L[2][0], 'zh-CN')}</p><p style="font-size:19px">${colorPy(L[2][1])}</p><p>${esc(L[2][2])}</p>
      <p>💡 ${esc(L[3])}</p><h3>Как учить (15 мин)</h3><ol class="small"><li>Послушай каждое слово 3 раза и повтори вслух, следи за цветом тона.</li><li>Закрой pinyin — прочитай по иероглифу.</li><li>Напиши каждый иероглиф 1 раз во вкладке «Письмо» (🖌️).</li><li>Составь 2 своих предложения со словами урока.</li></ol>
      <button class="btn ok" id="zDone">✓ Урок выучен</button></div>`;
    $('#zDone', el).onclick = () => { Store.set('zh.day', Math.max(day, i + 1)); App.refreshHome(); show(i + 1); };
  };
  sel.onchange = () => show(+sel.value); $('#zPrev', el).onclick = () => show(+sel.value - 1); $('#zNext', el).onclick = () => show(+sel.value + 1);
  show(Math.min(Store.get('zh.day', 0), 29));

  // Tone drill
  let td, ts = 0, tn = 0;
  $('#tPlay', el).onclick = () => { td = TONE_DRILL[Math.floor(Math.random() * TONE_DRILL.length)]; Speech.say(td[0], 'zh-CN', 0.7); $('#tRes', el).textContent = '…какой тон?'; $('#tRes', el).className = 'res'; };
  $$('[data-t]', el).forEach(b => b.onclick = () => { if (!td) return; tn++; const ok = +b.dataset.t === td[2]; ts += ok;
    $('#tRes', el).innerHTML = (ok ? '✅ ' : '❌ ') + `${td[0]} <span class="t${td[2]}">${td[1]}</span> — тон ${td[2]}`; $('#tRes', el).className = 'res ' + (ok ? 'good' : 'bad'); $('#tScore', el).textContent = ts + '/' + tn; td = null; });

  // Name builder
  let nm = Store.get('zh.name', []);
  const nr = () => { $('#nHz', el).textContent = nm.map(i => NAME_SYL[i][1]).join('') || '—'; $('#nPy', el).innerHTML = colorPy(nm.map(i => NAME_SYL[i][2]).join(' ')); Store.set('zh.name', nm); };
  $('#nSyl', el).onclick = e => { const b = e.target.closest('[data-n]'); if (b) { nm.push(+b.dataset.n); nr(); } };
  $('#nDel', el).onclick = () => { nm.pop(); nr(); }; $('#nClr', el).onclick = () => { nm = []; nr(); };
  $('#nSay', el).onclick = () => nm.length && Speech.say(nm.map(i => NAME_SYL[i][1]).join(''), 'zh-CN', 0.7);
  $('#nWrite', el).onclick = () => nm.length && zhWrite(nm.map(i => NAME_SYL[i][1]).join(''));
  nr();

  // Stroke order
  let writers = [];
  const draw = quiz => { const box = $('#wBox', el); box.innerHTML = ''; writers = [];
    if (!window.HanziWriter) { box.innerHTML = '<p>Нужен интернет для загрузки анимации черт.</p>'; return; }
    [...$('#wIn', el).value.replace(/[^一-鿿]/g, '')].slice(0, 6).forEach(ch => { const d = document.createElement('div'); d.style.border = '1px solid var(--line)'; d.style.borderRadius = '10px'; box.appendChild(d);
      const w = HanziWriter.create(d, ch, { width: 150, height: 150, padding: 8, showOutline: true, strokeAnimationSpeed: 1, delayBetweenStrokes: 200, strokeColor: '#5b4cdb', outlineColor: '#cfd3dc', drawingColor: '#0e9f6e' });
      quiz ? w.quiz() : w.loopCharacterAnimation(); writers.push(w); d.onclick = () => Speech.say(ch, 'zh-CN'); }); };
  $('#wGo', el).onclick = () => draw(false); $('#wQuiz', el).onclick = () => draw(true);
  window.zhWrite = t => { $('#wIn', el).value = t; $$('.sub button', el).find(b => b.dataset.p === 'write').click(); draw(false); };
  draw(false);

  // Review
  const rv = () => { const n = Math.max(1, Store.get('zh.day', 0)); const ws = ZH_L.slice(0, n).flatMap(l => l[1]); const w = ws[Math.floor(Math.random() * ws.length)];
    const c = $('#rCard', el); c.innerHTML = `<div class="hz">${w[0]}</div><div class="back">нажми — pinyin и перевод</div>`; c.onclick = () => { c.innerHTML = `<div class="hz">${w[0]}</div><div style="font-size:22px">${colorPy(w[1])}</div><div class="back">${esc(w[2])}</div>`; Speech.say(w[0].split('/')[0], 'zh-CN'); }; };
  $('#rNext', el).onclick = rv; rv();
  const zw = () => ZH_L.slice(0, Math.max(2, Store.get('zh.day', 0))).flatMap(l => l[1]);
  const zg = () => { const ws = zw(); Deck($('#zDeck', el), ws.map(w => [w[0], w[1] + ' — ' + w[2]]), { key: 'zh', speak: 'zh-CN' }); Match($('#zMatch', el), ws.map(w => [w[0], w[2]]), { key: 'zh', n: Math.min(6, ws.length) }); Blitz($('#zBlitz', el), ws.map(w => [w[1], w[2]]), { key: 'zh' }); };
  zg();
});
