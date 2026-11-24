// ===== SPANISH: grammar (basic level), 1000 words, conjugation trainer =====
const P6 = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'];
const ES_IRR = {
 ser:'soy eres es somos sois son', estar:'estoy estás está estamos estáis están', ir:'voy vas va vamos vais van',
 tener:'tengo tienes tiene tenemos tenéis tienen', hacer:'hago haces hace hacemos hacéis hacen', poder:'puedo puedes puede podemos podéis pueden',
 querer:'quiero quieres quiere queremos queréis quieren', venir:'vengo vienes viene venimos venís vienen', decir:'digo dices dice decimos decís dicen',
 salir:'salgo sales sale salimos salís salen', poner:'pongo pones pone ponemos ponéis ponen', saber:'sé sabes sabe sabemos sabéis saben',
 conocer:'conozco conoces conoce conocemos conocéis conocen', ver:'veo ves ve vemos veis ven', dar:'doy das da damos dais dan',
 dormir:'duermo duermes duerme dormimos dormís duermen', pedir:'pido pides pide pedimos pedís piden', pensar:'pienso piensas piensa pensamos pensáis piensan',
 jugar:'juego juegas juega jugamos jugáis juegan', volver:'vuelvo vuelves vuelve volvemos volvéis vuelven', preferir:'prefiero prefieres prefiere preferimos preferís prefieren',
 traer:'traigo traes trae traemos traéis traen', empezar:'empiezo empiezas empieza empezamos empezáis empiezan', oír:'oigo oyes oye oímos oís oyen'
};
const ES_REG = 'hablar trabajar estudiar comprar necesitar llegar tomar mirar escuchar cocinar bailar caminar comer beber leer aprender comprender vender correr vivir escribir abrir recibir decidir subir'.split(' ');
const END = { ar: 'o as a amos áis an', er: 'o es e emos éis en', ir: 'o es e imos ís en' };
const conj = v => ES_IRR[v] ? ES_IRR[v].split(' ') : END[v.slice(-2)].split(' ').map(e => v.slice(0, -2) + e);
const norm = s => s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');
const ex = (es, ru) => `<li>${spk(es, 'es-ES')} <b>${esc(es)}</b> — <span class="muted">${esc(ru)}</span></li>`;
const conjTable = v => `<table><tr><th colspan="2">${v} ${spk(conj(v).join(', '), 'es-ES')}</th></tr>${conj(v).map((f, i) => `<tr><td class="muted">${P6[i]}</td><td><b>${f}</b></td></tr>`).join('')}</table>`;

// [id, title, html, exercises [question, answer|answers]]
const ES_GRAM = [
['pron','1. Личные местоимения (кто делает действие?)',`
<table><tr><th>Ед. число</th><th>Мн. число</th></tr>
<tr><td>yo — я</td><td>nosotros / nosotras — мы</td></tr><tr><td>tú — ты</td><td>vosotros / vosotras — вы (Испания, неформ.)</td></tr>
<tr><td>él — он, ella — она, usted — Вы</td><td>ellos — они (м.), ellas — они (ж.), ustedes — вы/Вы</td></tr></table>
<p>💡 <b>usted / ustedes</b> спрягаются как 3-е лицо: <i>Usted habla</i>. В Латинской Америке вместо vosotros всегда <b>ustedes</b>.</p>
<p>💡 Местоимение часто <b>опускают</b>, глагол уже показывает лицо: <i>Hablo español</i> = Я говорю по-испански.</p>
<ul>${ex('Yo soy estudiante.','Я студентка.')}${ex('Ella es de México.','Она из Мексики.')}${ex('¿Usted habla inglés?','Вы говорите по-английски?')}</ul>`,
[['___ (мы, ж.р.) somos amigas.','nosotras'],['___ (Вы, вежл.) es muy amable.','usted'],['___ (они, только женщины) trabajan aquí.','ellas'],['___ (ты) eres inteligente.','tú']]],
['gen','2. Род существительных (мужской / женский)',`
<p><b>Мужской:</b> обычно на <b>-o</b> (el libro), а также -aje, -or: el viaje, el amor.<br><b>Женский:</b> обычно на <b>-a</b> (la casa), а также <b>-ción, -sión, -dad, -tad, -tud, -umbre</b>: la canción, la ciudad, la libertad, la actitud, la costumbre.</p>
<h3>⚠️ Исключения — выучить!</h3>
<p><b>Мужские на -a:</b> el día, el mapa, el sofá, el planeta, и греческие на <b>-ma</b>: el problema, el sistema, el tema, el idioma, el programa, el clima.<br>
<b>Женские на -o:</b> la mano, la foto (fotografía), la moto, la radio.<br>
<b>el agua, el águila, el hambre</b> — женский род, но <b>el</b> перед ударным a- (las aguas frías).<br>
<b>-e и согласные</b> — запоминать: el coche, la noche, el árbol, la flor, la leche, el café.</p>
<ul>${ex('El problema es difícil.','Проблема сложная.')}${ex('La mano derecha.','Правая рука.')}${ex('El agua está fría.','Вода холодная.')}</ul>`,
[['___ día (артикль)','el'],['___ canción','la'],['___ problema','el'],['___ mano','la'],['___ ciudad','la'],['___ mapa','el'],['___ foto','la'],['___ idioma','el']]],
['art','3. Артикли: определённый и неопределённый',`
<table><tr><th></th><th>Опред. (тот самый)</th><th>Неопред. (какой-то)</th></tr>
<tr><td>м.р. ед.</td><td>el</td><td>un</td></tr><tr><td>ж.р. ед.</td><td>la</td><td>una</td></tr><tr><td>м.р. мн.</td><td>los</td><td>unos (несколько)</td></tr><tr><td>ж.р. мн.</td><td>las</td><td>unas</td></tr></table>
<p>Слияния: <b>a + el = al</b> (Voy al cine), <b>de + el = del</b> (la casa del profesor). С <i>él</i> (он) не сливается.</p>
<h3>Когда определённый артикль (el/la)</h3><ul><li>Известный/конкретный предмет: <i>El libro está en la mesa.</i></li><li>Общие понятия и вкусы: <i>Me gusta <b>el</b> café.</i></li><li>Дни недели: <i><b>el</b> lunes</i> = в понедельник.</li><li>Титулы, когда говорим о человеке: <i>El señor López no está.</i></li><li>Время: <i>Son <b>las</b> tres.</i></li></ul>
<h3>Когда без артикля</h3><ul><li>Профессия после ser: <i>Soy profesora</i> (без una!).</li><li>Языки после hablar: <i>Hablo español.</i></li><li>Обращение: <i>Buenos días, señor López.</i></li></ul>`,
[['Voy ___ (a+el) supermercado.','al'],['Es el coche ___ (de+el) profesor.','del'],['Tengo ___ (какой-то) perro.','un'],['Me gusta ___ música.','la'],['Son ___ dos.','las'],['Mi hermana es ___ médica. (напиши «-» если не нужен)','-']]],
['plu','4. Множественное число',`
<ul><li>На гласную → <b>+s</b>: casa → casas, café → cafés</li><li>На согласную → <b>+es</b>: ciudad → ciudades, árbol → árboles</li><li><b>-z → -ces</b>: lápiz → lápices, vez → veces</li>
<li>Ударение может исчезнуть/появиться: canción → <b>canciones</b>, joven → <b>jóvenes</b>, examen → exámenes</li><li>Безударное <b>-s</b> не меняется: el lunes → los lunes, la crisis → las crisis</li>
<li>Смешанная группа → мужской род: <i>los padres</i> = родители, <i>los hermanos</i> = братья и сёстры</li></ul>`,
[['libro → ?','libros'],['ciudad → ?','ciudades'],['lápiz → ?','lápices'],['canción → ?','canciones'],['joven → ?','jóvenes'],['el martes → los ?','martes']]],
['adj','5. Прилагательные: согласование',`
<p>Прилагательное <b>после</b> существительного и согласуется в роде и числе.</p>
<table><tr><th>Тип</th><th>м. ед.</th><th>ж. ед.</th><th>м. мн.</th><th>ж. мн.</th></tr>
<tr><td>-o</td><td>alto</td><td>alta</td><td>altos</td><td>altas</td></tr><tr><td>-e</td><td>grande</td><td>grande</td><td>grandes</td><td>grandes</td></tr>
<tr><td>согласная</td><td>fácil</td><td>fácil</td><td>fáciles</td><td>fáciles</td></tr><tr><td>национальность</td><td>español</td><td>española</td><td>españoles</td><td>españolas</td></tr></table>
<p>⚠️ Перед сущ. м.р. ед.ч.: <b>bueno → buen</b> (un buen día), <b>malo → mal</b>, <b>grande → gran</b> (перед любым родом: una gran mujer = великая).</p>
<ul>${ex('Las casas blancas.','Белые дома.')}${ex('Un chico simpático y una chica simpática.','Симпатичный парень и симпатичная девушка.')}</ul>`,
[['las chicas (alto) → ?','altas'],['un libro (interesante) → ?','interesante'],['las ciudades (grande) → ?','grandes'],['una mujer (español) → ?','española'],['un ___ (bueno) amigo','buen'],['los ejercicios (fácil) → ?','fáciles']]],
['reg','6. Глаголы -AR, -ER, -IR (настоящее время)',`
<p>Убираем окончание инфинитива и добавляем новое:</p>
<div class="grid">${conjTable('hablar')}${conjTable('comer')}${conjTable('vivir')}</div>
<p>💡 -er и -ir отличаются только в <b>nosotros</b> и <b>vosotros</b>: comemos / vivimos.</p>`,
[['yo (trabajar)','trabajo'],['nosotros (vivir)','vivimos'],['ella (comer)','come'],['tú (escribir)','escribes'],['ellos (estudiar)','estudian'],['vosotros (beber)','bebéis']]],
['ser','7. SER и ESTAR (быть)',`
<div class="grid">${conjTable('ser')}${conjTable('estar')}</div>
<p><b>SER</b> — постоянное, «что/кто это» (DOCTOR): <b>D</b>escription — описание, <b>O</b>ccupation — профессия, <b>C</b>haracteristic — характер, <b>T</b>ime — время/дата, <b>O</b>rigin — происхождение, <b>R</b>elationship — отношения.</p>
<p><b>ESTAR</b> — состояние и место (PLACE): <b>P</b>osition, <b>L</b>ocation — где, <b>A</b>ction — сейчас делаю (estoy hablando), <b>C</b>ondition — состояние, <b>E</b>motion — чувства.</p>
<ul>${ex('Soy de Kirguistán.','Я из Кыргызстана.')}${ex('Estoy cansada.','Я устала.')}${ex('Madrid está en España.','Мадрид находится в Испании.')}${ex('Es lunes. Son las cinco.','Понедельник. Пять часов.')}</ul>
<p>⚠️ Меняют смысл: <i>es aburrido</i> (скучный человек) / <i>está aburrido</i> (ему скучно); <i>es listo</i> (умный) / <i>está listo</i> (готов).</p>`,
[['Yo ___ profesora. (ser)','soy'],['Nosotros ___ en casa. (estar)','estamos'],['¿De dónde ___ tú? (ser)','eres'],['Ella ___ triste hoy.','está'],['Hoy ___ martes.','es'],['El café ___ caliente (сейчас).','está']]],
['tener','8. TENER (иметь) и выражения',`
<div class="grid">${conjTable('tener')}</div>
<p>По-испански многие состояния «имеют»: <b>tener ... años</b> (лет), <b>hambre</b> (голод), <b>sed</b> (жажда), <b>frío / calor</b>, <b>miedo</b> (страх), <b>sueño</b> (хочу спать), <b>prisa</b> (спешу), <b>razón</b> (прав).</p>
<p><b>tener que + инфинитив</b> = должен: <i>Tengo que estudiar.</i></p>
<ul>${ex('Tengo veinticinco años.','Мне 25 лет.')}${ex('¿Tienes hambre?','Ты голодна?')}${ex('Tenemos que trabajar mañana.','Мы должны работать завтра.')}</ul>`,
[['Yo ___ dos hermanos.','tengo'],['¿Cuántos años ___ tú?','tienes'],['Ella ___ frío.','tiene'],['Nosotros ___ que salir.','tenemos'],['Ellos ___ razón.','tienen']]],
['ir','9. IR (идти/ехать) и будущее ir a + инф.',`
<div class="grid">${conjTable('ir')}</div>
<p><b>ir a + место:</b> Voy a la playa. <b>ir a + инфинитив</b> = собираюсь (ближайшее будущее): <i>Voy a estudiar.</i></p>
<ul>${ex('Vamos al cine esta noche.','Мы идём в кино сегодня вечером.')}${ex('¿Qué vas a hacer mañana?','Что ты будешь делать завтра?')}</ul>`,
[['Yo ___ a la universidad.','voy'],['Ellos ___ a comer.','van'],['¿Adónde ___ tú?','vas'],['Nosotros ___ a viajar.','vamos']]],
['irr','10. Неправильные глаголы (исключения)',`
<h3>A) «-go» в форме yo</h3><p>hacer → <b>hago</b>, poner → <b>pongo</b>, salir → <b>salgo</b>, traer → <b>traigo</b>, oír → <b>oigo</b>, tener → <b>tengo</b>, venir → <b>vengo</b>, decir → <b>digo</b></p>
<h3>B) Другие неправильные yo</h3><p>saber → <b>sé</b>, conocer → <b>conozco</b>, ver → <b>veo</b>, dar → <b>doy</b>, estar → <b>estoy</b></p>
<h3>C) Глаголы-«ботинки» (меняют корень, кроме nosotros/vosotros)</h3>
<p><b>e → ie:</b> querer (quiero), pensar (pienso), empezar (empiezo), preferir (prefiero), tener (tienes), venir (vienes)<br>
<b>o → ue:</b> poder (puedo), dormir (duermo), volver (vuelvo), encontrar (encuentro); <b>u → ue:</b> jugar (juego)<br>
<b>e → i:</b> pedir (pido), repetir (repito), servir (sirvo), decir (dices)</p>
<div class="grid">${['querer','poder','pedir','hacer','decir','venir'].map(conjTable).join('')}</div>
<p class="muted small">👉 Тренируй все формы во вкладке «Спряжение».</p>`,
[['yo (hacer)','hago'],['yo (saber)','sé'],['tú (poder)','puedes'],['nosotros (poder)','podemos'],['ella (querer)','quiere'],['yo (conocer)','conozco'],['ellos (dormir)','duermen'],['yo (salir)','salgo'],['tú (pedir)','pides'],['yo (dar)','doy']]],
['neg','11. Отрицание',`
<p><b>no</b> ставится перед глаголом: <i>No hablo francés.</i> С местоимениями: <i>No lo sé.</i></p>
<p>Двойное отрицание — <b>норма</b>: <b>no ... nada</b> (ничего), <b>nadie</b> (никто), <b>nunca</b> (никогда), <b>tampoco</b> (тоже не), <b>ningún/ninguna</b> (ни один).</p>
<p>Если отрицательное слово стоит <b>перед</b> глаголом — no не нужно: <i>Nunca como carne</i> = <i>No como carne nunca</i>.</p>
<ul>${ex('No tengo nada.','У меня ничего нет.')}${ex('No viene nadie.','Никто не приходит.')}${ex('Yo tampoco.','Я тоже нет.')}</ul>`,
[['Make negative: Hablo alemán. → ___ hablo alemán.','no'],['No veo a ___ (никого).','nadie'],['No quiero ___ (ничего).','nada'],['___ (никогда) bebo café.','nunca'],['No me gusta. — A mí ___ (тоже нет).','tampoco']]],
['q','12. Вопросы и интонация',`
<p>Вопрос пишется <b>¿...?</b>. Для вопроса «да/нет» хватит <b>повышения интонации</b> в конце: <i>¿Hablas español?↗</i>. Можно поменять порядок: <i>¿Habla usted español?</i></p>
<table><tr><th>Слово</th><th>Значение</th></tr>${[['¿Qué?','что? какой?'],['¿Quién? / ¿Quiénes?','кто?'],['¿Cómo?','как?'],['¿Dónde?','где?'],['¿Adónde?','куда?'],['¿De dónde?','откуда?'],['¿Cuándo?','когда?'],['¿Cuánto/a/os/as?','сколько?'],['¿Cuál? / ¿Cuáles?','который? какой (из)?'],['¿Por qué?','почему? (ответ: porque — потому что)']].map(r => `<tr><td>${spk(r[0], 'es-ES')} <b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('')}</table>
<p>⚠️ В вопросительных словах всегда есть ударение (qué, cómo, dónde), в обычных — нет (que, como, donde).</p>
<ul>${ex('¿Cómo te llamas?','Как тебя зовут?')}${ex('¿De dónde eres?','Откуда ты?')}${ex('¿Cuántos años tienes?','Сколько тебе лет?')}</ul>`,
[['¿___ te llamas? (как)','cómo'],['¿___ vives? (где)','dónde'],['¿___ es tu cumpleaños? (когда)','cuándo'],['¿___ estudias español? (почему)','por qué'],['¿___ cuesta? (сколько)','cuánto'],['¿___ es ella? (кто)','quién']]],
['cont','13. Present Continuous: estar + gerundio',`
<p>Что происходит <b>прямо сейчас</b>: <b>estar</b> + герундий.</p>
<p>-ar → <b>-ando</b> (hablando), -er/-ir → <b>-iendo</b> (comiendo, viviendo)</p>
<p>⚠️ Исключения: leer → <b>leyendo</b>, oír → <b>oyendo</b>, ir → <b>yendo</b>, traer → <b>trayendo</b>; o→u: dormir → <b>durmiendo</b>, morir → muriendo, poder → pudiendo; e→i: pedir → <b>pidiendo</b>, decir → <b>diciendo</b>, venir → <b>viniendo</b>, repetir → repitiendo.</p>
<ul>${ex('Estoy estudiando español.','Я (сейчас) учу испанский.')}${ex('¿Qué estás haciendo?','Что ты делаешь?')}${ex('Los niños están durmiendo.','Дети спят.')}</ul>`,
[['Yo estoy ___ (hablar).','hablando'],['Ella está ___ (comer).','comiendo'],['Estamos ___ (leer).','leyendo'],['El bebé está ___ (dormir).','durmiendo'],['¿Qué estás ___ (decir)?','diciendo'],['Ellos están ___ (escribir).','escribiendo']]],
['gus','14. GUSTAR (нравиться) — бонус',`
<p>Буквально «мне нравится <i>что-то</i>»: <b>me / te / le / nos / os / les + gusta</b> (ед.ч. или инфинитив) / <b>gustan</b> (мн.ч.).</p>
<ul>${ex('Me gusta el chocolate.','Я люблю шоколад.')}${ex('Me gustan los idiomas.','Мне нравятся языки.')}${ex('¿Te gusta bailar?','Тебе нравится танцевать?')}${ex('No nos gusta el frío.','Нам не нравится холод.')}</ul>`,
[['Me ___ los gatos.','gustan'],['¿Te ___ leer?','gusta'],['A ella ___ gusta el té.','le'],['A nosotros ___ gusta viajar.','nos']]],
['hay','15. HAY vs ESTAR — бонус',`
<p><b>hay</b> = есть/имеется (что-то новое, с un/una, числами, без артикля): <i>Hay un banco cerca.</i><br><b>estar</b> = где находится конкретное (с el/la): <i>El banco está en la plaza.</i></p>
<ul>${ex('¿Hay una farmacia por aquí?','Здесь есть аптека?')}${ex('La farmacia está a la derecha.','Аптека справа.')}</ul>`,
[['___ tres libros en la mesa.','hay'],['Mi casa ___ cerca del parque.','está'],['¿___ leche en el frigorífico?','hay'],['Los niños ___ en el colegio.','están']]]
];

App.reg('es', el => {
  el.innerHTML = `<h1>🇪🇸 Español — базовый уровень</h1><p class="muted">Грамматика с упражнениями, 1000 самых частых слов (из твоего PDF), тренажёр спряжения. 🔊 = прослушать (голос es-ES).</p>`;
  const gram = `<div class="card"><p>Порядок: 1 тема в день → прочитай, послушай примеры, сделай упражнение. Выполненные темы отмечаются ✓.</p><div id="gList" class="row"></div></div><div id="gBody"></div>`;
  const cats = Object.keys(ES_VOCAB);
  const vocab = `<div class="card"><div class="row"><label>Категория: <select id="vCat"><option value="*">Все (1000)</option>${cats.map(c => `<option>${c}</option>`).join('')}</select></label>
     <label><input type="checkbox" id="vOnlyNew" checked> только невыученные</label><span id="vStat" class="muted small"></span></div>
     <div id="vCard" class="flash"></div>
     <div class="row" style="justify-content:center"><button class="btn ghost" id="vAgain">Ещё раз ↻</button><button class="btn ok" id="vKnow">Знаю ✓</button></div></div>
     <div class="card"><h3>Тест: выбери перевод</h3><div id="vQuiz"></div></div>
     <div class="card"><h3>Список слов</h3><input id="vSearch" placeholder="поиск: испанский или английский" style="width:100%"><div id="vList" class="tbl" style="max-height:420px;overflow:auto;margin-top:8px"></div></div>`;
  const conjT = `<div class="card"><h3>Тренажёр спряжения (настоящее время)</h3>
     <div class="row"><label>Глаголы: <select id="cSet"><option value="irr">неправильные</option><option value="reg">правильные -ar/-er/-ir</option><option value="all">все</option></select></label></div>
     <p style="font-size:22px;margin:14px 0" id="cQ"></p><div class="row"><input id="cA" placeholder="форма глагола" autocomplete="off"><button class="btn" id="cCheck">Проверить</button><button class="btn ghost" id="cNext">Дальше</button></div>
     <p id="cRes" class="res"></p><p class="small muted">Счёт: <span id="cScore">0/0</span></p></div>
     <div class="card"><h3>Таблицы всех неправильных глаголов</h3><div class="grid">${Object.keys(ES_IRR).map(conjTable).join('')}</div></div>`;
  const games = `<div class="card"><div class="row"><label>Категория: <select id="egCat">${cats.map(c => `<option>${c}</option>`).join('')}</select></label></div></div>
     <div class="card"><h3>🗂️ Флешкарты (Лейтнер)</h3><div id="egDeck"></div></div><div class="card"><h3>🧩 Найди пару</h3><div id="egMatch"></div></div><div class="card"><h3>⚡ Блиц: слова</h3><div id="egBlitz"></div></div><div class="card"><h3>⚡ Блиц: спряжение</h3><div id="egConj"></div></div>`;
  subTabs(el, [['gram', '📘 Грамматика', gram], ['vocab', '🗂️ 1000 слов', vocab], ['games', '🎮 Игры', games], ['conj', '🔁 Спряжение', conjT]], 'es');
  const eg = () => { const c = $('#egCat', el).value, ws = ES_VOCAB[c]; Deck($('#egDeck', el), ws, { key: 'es.' + c, speak: 'es-ES' }); Match($('#egMatch', el), ws, { key: 'es.' + c, speak: 'es-ES' }); Blitz($('#egBlitz', el), ws, { key: 'es.' + c }); };
  $('#egCat', el).onchange = eg; setTimeout(eg);
  Blitz($('#egConj', el), Object.keys(ES_IRR).flatMap(v => conj(v).map((f, i) => [P6[i] + ' + ' + v, f])), { key: 'esConj' });

  // Grammar
  const done = Store.get('es.gdone', {});
  const listBtns = () => $('#gList', el).innerHTML = ES_GRAM.map(g => `<button class="btn ${done[g[0]] ? 'ok' : 'ghost'}" data-g="${g[0]}" style="font-size:13px;padding:5px 10px">${g[1].split('.')[0]}${done[g[0]] ? ' ✓' : ''}</button>`).join('');
  const openG = id => {
    const g = ES_GRAM.find(x => x[0] === id); Store.set('es.gcur', id);
    $('#gBody', el).innerHTML = `<div class="card"><h2>${g[1]}</h2>${g[2]}<h3>✍️ Упражнение</h3>${g[3].map((q, i) => `<div class="row" style="margin:6px 0"><span style="min-width:260px">${esc(q[0])}</span><input data-q="${i}" size="16" autocomplete="off"> <span data-r="${i}"></span></div>`).join('')}
      <p><button class="btn" id="gCheck">Проверить</button> <button class="btn ghost" id="gShow">Показать ответы</button></p><p id="gRes" class="res"></p></div>`;
    $('#gCheck', el).onclick = () => { let ok = 0; g[3].forEach((q, i) => { const v = $(`[data-q="${i}"]`, el).value, a = q[1]; const good = norm(v) === norm(a) || (a === '-' && v.trim() === '');
        const exact = v.trim().toLowerCase() === a; $(`[data-r="${i}"]`, el).innerHTML = good ? (exact || a === '-' ? '✅' : `✅ <span class="muted small">пиши с ударением: ${a}</span>`) : '❌'; ok += good; });
      $('#gRes', el).textContent = `${ok} / ${g[3].length}`; $('#gRes', el).className = 'res ' + (ok === g[3].length ? 'good' : 'bad');
      if (ok === g[3].length) { done[id] = 1; Store.set('es.gdone', done); listBtns(); } };
    $('#gShow', el).onclick = () => g[3].forEach((q, i) => $(`[data-r="${i}"]`, el).innerHTML = `<span class="muted">${esc(q[1])}</span>`);
  };
  listBtns(); $('#gList', el).onclick = e => { const b = e.target.closest('[data-g]'); if (b) openG(b.dataset.g); };
  openG(Store.get('es.gcur', 'pron'));

  // Vocab
  const all = cats.flatMap(c => ES_VOCAB[c].map(w => [w[0], w[1], c]));
  let known = Store.get('es.known', {}), cur;
  const pool = () => { const c = $('#vCat', el).value; let p = all.filter(w => c === '*' || w[2] === c); if ($('#vOnlyNew', el).checked) { const n = p.filter(w => !known[w[0]]); if (n.length) p = n; } return p; };
  const stat = () => $('#vStat', el).textContent = `выучено ${Object.keys(known).length} / 1000`;
  const nextCard = (say = true) => { const p = pool(); cur = p[Math.floor(Math.random() * p.length)]; $('#vCard', el).innerHTML = `${esc(cur[0])}<div class="back">${cur[2]} · нажми, чтобы увидеть перевод</div>`; if (say) Speech.say(cur[0], 'es-ES'); stat(); };
  $('#vCard', el).onclick = () => { $('#vCard', el).innerHTML = `${esc(cur[0])} ${spk(cur[0], 'es-ES')}<div class="back">${esc(cur[1])}</div>`; };
  $('#vAgain', el).onclick = nextCard; $('#vKnow', el).onclick = () => { known[cur[0]] = 1; Store.set('es.known', known); nextCard(); App.refreshHome(); };
  $('#vCat', el).onchange = $('#vOnlyNew', el).onchange = nextCard;
  let qs = 0, qn = 0;
  const quiz = () => { const p = pool(), w = p[Math.floor(Math.random() * p.length)]; const opts = [w]; while (opts.length < 4) { const o = all[Math.floor(Math.random() * all.length)]; if (!opts.some(x => x[1] === o[1])) opts.push(o); } opts.sort(() => Math.random() - .5);
    $('#vQuiz', el).innerHTML = `<p style="font-size:24px">${esc(w[0])} ${spk(w[0], 'es-ES')}</p><div class="row">${opts.map(o => `<button class="btn ghost" data-ok="${o === w ? 1 : 0}">${esc(o[1])}</button>`).join('')}</div><p class="res" id="qRes"></p><p class="small muted">Счёт: ${qs}/${qn}</p>`;
    $$('#vQuiz [data-ok]', el).forEach(b => b.onclick = () => { qn++; if (b.dataset.ok === '1') { qs++; b.className = 'btn ok'; setTimeout(quiz, 700); } else { b.style.borderColor = 'var(--warn)'; $('#qRes', el).textContent = 'Правильно: ' + w[1]; $('#qRes', el).className = 'res bad'; setTimeout(quiz, 1800); } }); };
  const list = () => { const s = norm($('#vSearch', el).value); const r = all.filter(w => !s || norm(w[0] + ' ' + w[1]).includes(s)).slice(0, 300);
    $('#vList', el).innerHTML = `<table>${r.map(w => `<tr><td>${spk(w[0], 'es-ES')} <b>${esc(w[0])}</b></td><td>${esc(w[1])}</td><td class="muted small">${w[2]}${known[w[0]] ? ' ✓' : ''}</td></tr>`).join('')}</table>`; };
  $('#vSearch', el).oninput = list; nextCard(false); quiz(); list();

  // Conjugation
  let cv, cp, cs = 0, cn = 0;
  const cnext = () => { const set = $('#cSet', el).value, vs = set === 'irr' ? Object.keys(ES_IRR) : set === 'reg' ? ES_REG : Object.keys(ES_IRR).concat(ES_REG);
    cv = vs[Math.floor(Math.random() * vs.length)]; cp = Math.floor(Math.random() * 6); $('#cQ', el).innerHTML = `<span class="muted">${P6[cp]}</span> + <b>${cv}</b> = ?`; $('#cA', el).value = ''; $('#cRes', el).textContent = ''; $('#cA', el).focus(); };
  const ccheck = () => { const a = conj(cv)[cp], v = $('#cA', el).value; cn++; const good = norm(v) === norm(a); cs += good;
    $('#cRes', el).innerHTML = good ? '✅ ' + a + (v.trim().toLowerCase() !== a ? ' (не забудь ударение)' : '') : '❌ правильно: <b>' + a + '</b>'; $('#cRes', el).className = 'res ' + (good ? 'good' : 'bad'); $('#cScore', el).textContent = cs + '/' + cn; Speech.say(a, 'es-ES'); };
  $('#cCheck', el).onclick = ccheck; $('#cNext', el).onclick = cnext; $('#cSet', el).onchange = cnext;
  $('#cA', el).onkeydown = e => { if (e.key === 'Enter') { $('#cRes', el).textContent ? cnext() : ccheck(); } };
  cnext();
});
