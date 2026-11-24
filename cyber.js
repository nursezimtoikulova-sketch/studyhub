// ===== CYBER SECURITY: project lab + glossary/translator + certification maps =====
const CY_STAGES = [
 {n:1,t:'Infrastructure Setup',ru:'Построение инфраструктуры',
  what:'Виртуальная сеть компании: сервер Ubuntu, клиенты, отдельная внутренняя сеть, IP-план, DNS.',
  why:'Нельзя защитить то, чего не понимаешь. Схема сети и IP-план — основа для firewall, мониторинга и расследований.',
  how:'VirtualBox: создать NAT Network / Internal Network «LAN». Статические IP (например 10.10.10.0/24: firewall .1, server .10, client1 .21, client2 .22, SIEM .50, Kali .99). На Ubuntu Server: <code>netplan</code>, затем DNS (bind9 или dnsmasq), hostnames.',
  test:'<code>ip a</code>, <code>ping</code> между машинами, <code>dig server.lab.local</code> / <code>nslookup</code>. Нарисовать схему и таблицу IP.',
  tasks:['Установить VirtualBox и создать внутреннюю сеть LAN','Установить Ubuntu Server (2 GB RAM, 20 GB)','Составить IP-план и таблицу хостов','Настроить статический IP через netplan','Поднять DNS (dnsmasq/bind9) для домена lab.local','Проверить ping и DNS со всех машин','Нарисовать схему сети (draw.io) и сохранить в портфолио']},
 {n:2,t:'Network Security',ru:'Безопасность сети',
  what:'pfSense как шлюз между INTERNET и LAN, правила входящего/исходящего трафика, сегментация, защищённый SSH.',
  why:'Firewall уменьшает attack surface: всё, что не разрешено явно, запрещено (default deny). Сегментация останавливает lateral movement.',
  how:'pfSense: WAN = NAT адаптер, LAN = внутренняя сеть. Правила: разрешить только нужное (DNS, HTTP/S, SSH с админ-хоста). Отдельные подсети: USERS, SERVERS, SECURITY. На сервере: <code>ufw default deny incoming</code>, SSH по ключам, <code>PermitRootLogin no</code>, <code>PasswordAuthentication no</code>, fail2ban.',
  test:'С Kali: <code>nmap -sS -p- 10.10.10.10</code> до и после. Попытаться подключиться к запрещённому порту, найти блокировку в логах pfSense.',
  tasks:['Установить pfSense (WAN + LAN)','Создать правила default deny + разрешённые сервисы','Разделить сеть на 2–3 подсети/VLAN','Настроить ufw на сервере','SSH: только ключи, без root, fail2ban','Сравнить nmap «до» и «после»']},
 {n:3,t:'Identity & Access Management',ru:'Управление доступом (IAM)',
  what:'Пользователи, группы, роли, аутентификация, Least Privilege, MFA.',
  why:'Большинство взломов — через украденные учётки и лишние права. Least Privilege ограничивает ущерб.',
  how:'Linux: <code>adduser</code>, <code>groupadd</code>, <code>usermod -aG</code>, sudoers только для admins, права на папки (<code>chmod</code>, <code>chown</code>, ACL). Политика паролей (pam_pwquality). MFA для SSH: Google Authenticator PAM. Дополнительно: Samba AD / Windows Server AD или OpenLDAP.',
  test:'Войти обычным пользователем → попытка sudo и доступа к чужим файлам должна быть отклонена. Проверить <code>/var/log/auth.log</code>.',
  tasks:['Создать роли: admin, dev, hr, guest','Настроить группы и права на общие папки','Ограничить sudo','Политика паролей','MFA (TOTP) для SSH','Таблица «кто что может» (access matrix)']},
 {n:4,t:'Endpoint Security',ru:'Защита конечных устройств',
  what:'Харденинг Linux и Windows, антивирус, обновления, аудит действий.',
  why:'Endpoint — точка входа для фишинга и malware. Харденинг закрывает типовые векторы.',
  how:'Linux: unattended-upgrades, auditd, AppArmor, Lynis audit. Windows: Defender, Firewall, BitLocker, локальные политики (secpol.msc), запрет макросов, Sysmon для логов.',
  test:'<code>sudo lynis audit system</code> — Hardening index до/после. Тестовый файл EICAR должен быть обнаружен Defender. Событие входа видно в Event Viewer.',
  tasks:['Автообновления на Linux','auditd + правила аудита /etc/passwd, sudo','Lynis: зафиксировать индекс до/после','Windows: Defender, Firewall, политики паролей','Установить Sysmon','Проверка EICAR']},
 {n:5,t:'Vulnerability Assessment',ru:'Оценка уязвимостей (Kali)',
  what:'Аудит своей лаборатории: Nmap, Greenbone/OpenVAS, Nikto, Burp Suite, проверка конфигураций.',
  why:'Найти слабые места раньше атакующего и приоритизировать исправление (CVSS).',
  how:'Только своя лаборатория! <code>nmap -sV -sC</code>, Greenbone scan сервера, <code>nikto -h http://10.10.10.10</code>, Burp как прокси для тестового веб-приложения (DVWA).',
  test:'Отчёт: найдено → риск (CVSS) → исправление → повторный скан подтверждает исправление.',
  tasks:['Nmap: инвентаризация хостов и сервисов','Greenbone: первый скан','Nikto против тестового веб-сервера','Burp Suite + DVWA (низкий уровень)','Таблица уязвимостей с CVSS и приоритетом','Исправить и пересканировать']},
 {n:6,t:'Intrusion Detection & Prevention',ru:'Обнаружение и предотвращение атак',
  what:'Suricata как IDS/IPS (на pfSense или отдельном сенсоре), анализ трафика, свои правила.',
  why:'Firewall пропускает «разрешённый» трафик — IDS ищет атаки внутри него.',
  how:'pfSense пакет Suricata или Suricata на Ubuntu. ET Open rules. Своё правило, например: <code>alert tcp any any -> $HOME_NET 22 (msg:"SSH brute"; flags:S; threshold:type both,track by_src,count 5,seconds 60; sid:1000001;)</code>. Wireshark для разбора пакетов.',
  test:'С Kali запустить nmap-скан и hydra против SSH тестового пользователя → алерты в <code>eve.json</code>/fast.log.',
  tasks:['Установить Suricata','Подключить ET Open rules','Написать 2 своих правила','Поймать nmap-скан','Поймать brute-force SSH','Разобрать pcap в Wireshark']},
 {n:7,t:'SIEM & SOC',ru:'SIEM и центр мониторинга',
  what:'Wazuh: сбор логов со всех машин, корреляция, алерты, дашборды.',
  why:'SOC видит всю картину: одно событие — шум, цепочка событий — инцидент.',
  how:'Wazuh all-in-one (4+ GB RAM). Агенты на Ubuntu и Windows. Интеграция Suricata eve.json. Свои правила в local_rules.xml, File Integrity Monitoring, дашборды.',
  test:'Неудачные входы, изменение /etc/passwd, алерт Suricata → видны в Wazuh, срабатывает правило уровня ≥10.',
  tasks:['Установить Wazuh manager','Агенты на всех машинах','Подключить логи Suricata','Включить FIM','Написать своё правило','Собрать дашборд «SOC Overview»']},
 {n:8,t:'Incident Response',ru:'Реагирование на инциденты',
  what:'Сценарий атаки на свою лабораторию и полный цикл реагирования.',
  why:'Важно не только обнаружить, но и правильно действовать: NIST 800-61 — Preparation, Detection & Analysis, Containment, Eradication, Recovery, Lessons Learned.',
  how:'Сценарий: brute-force SSH → вход → создание пользователя-бэкдора. Найти по логам (Wazuh, auth.log), изолировать (правило pfSense), удалить бэкдор, сменить ключи, восстановить из бэкапа.',
  test:'Incident Report: timeline, IOC, root cause, ущерб, действия, рекомендации.',
  tasks:['Написать playbook для brute-force','Провести симуляцию атаки','Построить timeline по логам','Изолировать хост','Восстановление из бэкапа','Incident Report (шаблон в портфолио)']},
 {n:9,t:'Security Automation',ru:'Автоматизация',
  what:'Python и Bash: сбор логов, поиск подозрительных IP, автоматические проверки.',
  why:'Инженер автоматизирует повторяющуюся работу и снижает человеческие ошибки.',
  how:'Python: парсинг auth.log (re, collections.Counter) → топ IP с неудачными входами → автоблок через ufw. Bash: ежедневный скрипт проверки (открытые порты, обновления, пользователи с UID 0) + cron. Резервное копирование: rsync/restic + cron.',
  test:'Скрипт находит IP из теста hydra; cron-задача создаёт отчёт каждый день.',
  tasks:['Python: парсер auth.log','Автоблокировка IP','Bash: daily security check','Backup скрипт + cron','Проверить восстановление из бэкапа']},
 {n:10,t:'Final Security Audit',ru:'Финальный аудит',
  what:'Полный аудит: сеть, сервер, endpoints, доступ, уязвимости, мониторинг, IR.',
  why:'Итог = портфолио: документация, схемы, конфиги, результаты тестов.',
  how:'Чек-лист по CIS Benchmarks, повторные сканы, отчёт для «руководства».',
  test:'Каждый пункт: доказательство (скриншот/лог/конфиг) в GitHub-репозитории портфолио.',
  tasks:['Аудит по чек-листу CIS','Повторный Greenbone/nmap','Документация архитектуры','GitHub-репозиторий портфолио','Финальная презентация проекта']}
];
window.cyberProgress = () => { let d = 0, n = 0; CY_STAGES.forEach(s => { n += s.tasks.length; d += chkProgress('cy.s' + s.n, 1) ; }); return n ? d / n : 0; };

// Glossary: [English, Русский, explanation]
const CY_GLOSS = [
['Attack surface','Поверхность атаки','Все точки, через которые можно атаковать систему (порты, сервисы, пользователи).'],
['Threat','Угроза','Возможное событие, которое может причинить вред.'],
['Vulnerability','Уязвимость','Слабое место в системе, которое можно использовать.'],
['Exploit','Эксплойт','Код или метод, использующий уязвимость.'],
['Risk','Риск','Вероятность × ущерб: насколько опасна угроза для нас.'],
['Threat actor','Злоумышленник / субъект угрозы','Кто атакует: хакер-одиночка, группа APT, инсайдер, государство.'],
['Insider threat','Внутренняя угроза','Угроза от сотрудника или подрядчика с доступом.'],
['CIA triad','Триада CIA','Confidentiality (конфиденциальность), Integrity (целостность), Availability (доступность).'],
['Confidentiality','Конфиденциальность','Данные видят только те, кому разрешено.'],
['Integrity','Целостность','Данные не изменены без разрешения.'],
['Availability','Доступность','Система работает, когда нужна.'],
['Non-repudiation','Неотказуемость','Нельзя отрицать совершённое действие (цифровая подпись).'],
['AAA','AAA','Authentication, Authorization, Accounting — кто ты, что можешь, что сделал.'],
['Authentication','Аутентификация','Проверка личности (пароль, ключ, биометрия).'],
['Authorization','Авторизация','Проверка прав: что разрешено делать.'],
['Accounting','Учёт (аудит действий)','Запись того, что пользователь делал.'],
['MFA','Многофакторная аутентификация','Два и более фактора: знаю (пароль), имею (телефон), являюсь (отпечаток).'],
['Least privilege','Минимальные привилегии','Давать только те права, которые нужны для работы.'],
['Separation of duties','Разделение обязанностей','Одна критичная операция требует нескольких людей.'],
['Zero Trust','Нулевое доверие','Никому не доверять по умолчанию, проверять каждый запрос.'],
['Defense in depth','Эшелонированная защита','Несколько слоёв защиты: если один упал, работают другие.'],
['Hardening','Харденинг (усиление защиты)','Отключение лишнего и безопасная настройка системы.'],
['Baseline','Базовая конфигурация','Эталонная безопасная настройка, с которой сравнивают.'],
['Patch','Патч (исправление)','Обновление, закрывающее уязвимость.'],
['Patch management','Управление обновлениями','Процесс своевременной установки патчей.'],
['Firewall','Межсетевой экран','Фильтрует трафик по правилам.'],
['Stateful firewall','Firewall с отслеживанием состояния','Помнит соединения и пропускает ответы на разрешённые запросы.'],
['WAF','Web Application Firewall','Firewall для веб-приложений (защита от SQLi, XSS).'],
['ACL','Список контроля доступа','Правила «кому/чему разрешено/запрещено».'],
['Implicit deny','Неявный запрет','Всё, что не разрешено явно, запрещено.'],
['Ingress / Egress','Входящий / исходящий трафик','Ingress — в сеть, egress — из сети.'],
['Port','Порт','Номер «двери» сервиса: 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP.'],
['VLAN','Виртуальная локальная сеть','Логическое разделение сети на сегменты.'],
['Segmentation','Сегментация','Разделение сети на зоны для ограничения распространения атаки.'],
['DMZ / Screened subnet','Демилитаризованная зона','Отдельная зона для публичных серверов.'],
['Lateral movement','Горизонтальное перемещение','Атакующий переходит с одного взломанного хоста на другие.'],
['Privilege escalation','Повышение привилегий','Получение прав выше, чем положено (user → root).'],
['IDS','Система обнаружения вторжений','Обнаруживает и сообщает об атаке (пассивно).'],
['IPS','Система предотвращения вторжений','Обнаруживает и блокирует атаку (активно, inline).'],
['Signature-based','На основе сигнатур','Обнаружение по известным шаблонам атак.'],
['Anomaly-based','На основе аномалий','Обнаружение отклонений от нормального поведения.'],
['False positive','Ложное срабатывание','Тревога, хотя атаки нет.'],
['False negative','Пропуск атаки','Атака есть, а тревоги нет (опаснее!).'],
['SIEM','Система управления событиями безопасности','Собирает и коррелирует логи, создаёт алерты (Wazuh, Splunk).'],
['SOC','Центр мониторинга безопасности','Команда, которая 24/7 следит за событиями и реагирует.'],
['SOAR','Оркестрация и автоматизация реагирования','Автоматические playbook-и реагирования.'],
['Log','Журнал (лог)','Запись событий системы.'],
['Correlation','Корреляция','Связывание разных событий в одну картину атаки.'],
['Alert','Оповещение / алерт','Сигнал о подозрительном событии.'],
['Triage','Сортировка (триаж)','Быстрая оценка: насколько алерт важен.'],
['IOC','Индикатор компрометации','След атаки: IP, хеш файла, домен.'],
['IOA','Индикатор атаки','Признак действия атакующего в процессе.'],
['TTP','Тактики, техники, процедуры','Как действует атакующий (см. MITRE ATT&CK).'],
['MITRE ATT&CK','Матрица MITRE ATT&CK','База знаний тактик и техник атакующих.'],
['Kill chain','Цепочка атаки','Этапы атаки: разведка → доставка → эксплуатация → закрепление → действия.'],
['Reconnaissance','Разведка','Сбор информации о цели перед атакой.'],
['Footprinting','Сбор следов / профилирование','Пассивная разведка: домены, сотрудники, IP.'],
['Enumeration','Перечисление','Активное выяснение пользователей, сервисов, ресурсов.'],
['Payload','Полезная нагрузка','Часть атаки, которая выполняет вредное действие.'],
['Persistence','Закрепление','Способ атакующего остаться в системе после перезагрузки.'],
['Backdoor','Бэкдор (чёрный ход)','Скрытый способ доступа в обход защиты.'],
['C2 (Command and Control)','Командный сервер','Сервер, через который атакующий управляет заражёнными машинами.'],
['Exfiltration','Эксфильтрация (вывод данных)','Кража данных из сети.'],
['Malware','Вредоносное ПО','Вирусы, черви, трояны, шифровальщики и т.д.'],
['Ransomware','Программа-вымогатель','Шифрует данные и требует выкуп.'],
['Trojan','Троян','Вредонос под видом полезной программы.'],
['Worm','Червь','Сам распространяется по сети.'],
['Rootkit','Руткит','Скрывает присутствие атакующего на уровне системы.'],
['Keylogger','Кейлоггер','Записывает нажатия клавиш.'],
['Botnet','Ботнет','Сеть заражённых машин под управлением атакующего.'],
['Phishing','Фишинг','Обманные письма/сайты для кражи данных.'],
['Spear phishing','Целевой фишинг','Фишинг против конкретного человека.'],
['Whaling','Вейлинг','Фишинг против руководителей.'],
['Vishing / Smishing','Голосовой / SMS-фишинг','Обман по телефону / SMS.'],
['Social engineering','Социальная инженерия','Манипуляция людьми, чтобы получить доступ.'],
['Pretexting','Претекстинг','Обман с выдуманной легендой («я из IT-отдела»).'],
['Tailgating','Проход «на хвосте»','Пройти в здание за сотрудником без пропуска.'],
['Brute force','Перебор (брутфорс)','Подбор пароля перебором вариантов.'],
['Password spraying','Распыление паролей','Один популярный пароль против многих аккаунтов.'],
['Credential stuffing','Подстановка учётных данных','Использование утёкших пар логин/пароль на других сайтах.'],
['Hash','Хеш','Односторонний «отпечаток» данных (SHA-256). Нельзя расшифровать обратно.'],
['Salt','Соль','Случайные данные к паролю перед хешированием против rainbow tables.'],
['Encryption','Шифрование','Преобразование данных так, что прочитать может только владелец ключа.'],
['Symmetric encryption','Симметричное шифрование','Один ключ для шифрования и расшифровки (AES).'],
['Asymmetric encryption','Асимметричное шифрование','Пара ключей: публичный и приватный (RSA, ECC).'],
['Public key / Private key','Открытый / закрытый ключ','Открытым шифруют/проверяют, закрытым расшифровывают/подписывают.'],
['Digital signature','Цифровая подпись','Доказывает автора и целостность.'],
['Certificate','Сертификат','Связывает публичный ключ с владельцем; выдаёт CA.'],
['PKI','Инфраструктура открытых ключей','Система CA, сертификатов и ключей.'],
['TLS','TLS','Протокол шифрования трафика (HTTPS).'],
['VPN','Виртуальная частная сеть','Зашифрованный туннель через интернет.'],
['Data at rest / in transit / in use','Данные в хранении / при передаче / в обработке','Три состояния данных, каждое защищают по-своему.'],
['Obfuscation','Обфускация','Запутывание кода/данных, чтобы затруднить анализ.'],
['Steganography','Стеганография','Скрытие данных внутри других файлов (картинок).'],
['Tokenization','Токенизация','Замена чувствительных данных токеном.'],
['DLP','Предотвращение утечек данных','Контроль, чтобы конфиденциальные данные не ушли наружу.'],
['SQL injection','SQL-инъекция','Внедрение SQL-кода через поле ввода.'],
['XSS','Межсайтовый скриптинг','Внедрение JavaScript в страницу для других пользователей.'],
['CSRF','Подделка межсайтового запроса','Заставить браузер жертвы выполнить действие на сайте.'],
['Buffer overflow','Переполнение буфера','Запись данных за пределы памяти → выполнение кода.'],
['Race condition','Состояние гонки','Ошибка из-за неправильного порядка одновременных операций.'],
['Zero-day','Уязвимость нулевого дня','Уязвимость, для которой ещё нет патча.'],
['CVE','CVE','Публичный идентификатор уязвимости (CVE-2024-XXXX).'],
['CVSS','CVSS','Оценка опасности уязвимости от 0 до 10.'],
['Penetration test','Тест на проникновение (пентест)','Разрешённая имитация атаки для поиска слабостей.'],
['Vulnerability scan','Сканирование уязвимостей','Автоматический поиск известных уязвимостей.'],
['Red team / Blue team / Purple team','Красная / синяя / фиолетовая команда','Атакующие / защитники / совместная работа.'],
['Rules of engagement','Правила проведения работ','Что разрешено в пентесте: цели, время, методы.'],
['Sandbox','Песочница','Изолированная среда для запуска подозрительного.'],
['Honeypot','Ловушка (хонипот)','Приманка для атакующих, чтобы изучать их.'],
['EDR / XDR','Обнаружение и реагирование на endpoint','Агент, который следит за процессами и блокирует угрозы.'],
['Incident','Инцидент','Событие, нарушившее безопасность.'],
['Incident response','Реагирование на инциденты','Процесс: подготовка → обнаружение → сдерживание → устранение → восстановление → уроки.'],
['Containment','Сдерживание (изоляция)','Ограничить распространение атаки.'],
['Eradication','Устранение','Удалить причину и следы атаки.'],
['Recovery','Восстановление','Вернуть системы в рабочее состояние.'],
['Lessons learned','Разбор и выводы','Что улучшить после инцидента.'],
['Playbook / Runbook','Сценарий действий','Пошаговая инструкция на конкретный тип инцидента.'],
['Chain of custody','Цепочка хранения доказательств','Документирование, кто и когда работал с уликами.'],
['Forensics','Криминалистика','Сбор и анализ цифровых доказательств.'],
['Order of volatility','Порядок изменчивости','Собирать сначала самые «летучие» данные: RAM → диск → бэкапы.'],
['Backup','Резервная копия','Копия данных для восстановления. Правило 3-2-1.'],
['RPO / RTO','RPO / RTO','Сколько данных можно потерять / за сколько надо восстановить.'],
['Business continuity','Непрерывность бизнеса','Работа компании во время сбоя.'],
['Disaster recovery','Аварийное восстановление','План восстановления IT после катастрофы.'],
['High availability','Высокая доступность','Система работает почти без простоев (кластеры, резерв).'],
['Load balancer','Балансировщик нагрузки','Распределяет трафик между серверами.'],
['DoS / DDoS','Отказ в обслуживании','Перегрузка сервиса, чтобы он перестал работать.'],
['MITM / On-path attack','Атака «человек посередине»','Перехват трафика между двумя сторонами.'],
['ARP spoofing','ARP-спуфинг','Подмена MAC-адреса в локальной сети для перехвата.'],
['DNS poisoning','Отравление DNS','Подмена DNS-ответов, чтобы увести на фальшивый сайт.'],
['Spoofing','Подмена (спуфинг)','Выдавать себя за другого (IP, email, MAC).'],
['Replay attack','Атака повторного воспроизведения','Повторная отправка перехваченных данных.'],
['Session hijacking','Перехват сессии','Кража cookie/токена сессии.'],
['Supply chain attack','Атака на цепочку поставок','Взлом через поставщика ПО или оборудования.'],
['Shadow IT','Теневые IT','Сервисы, которые сотрудники используют без ведома IT.'],
['BYOD','Свои устройства на работе','Bring Your Own Device.'],
['MDM','Управление мобильными устройствами','Централизованный контроль телефонов/ноутбуков.'],
['IAM','Управление идентификацией и доступом','Учётки, роли, права, жизненный цикл пользователей.'],
['RBAC','Ролевое управление доступом','Права по ролям (HR, Admin).'],
['ABAC','Доступ на основе атрибутов','Права по атрибутам (отдел, время, место).'],
['MAC / DAC','Мандатный / дискреционный доступ','MAC — система решает по меткам; DAC — владелец файла решает.'],
['SSO','Единый вход','Один вход для многих сервисов.'],
['Federation','Федерация','Доверие между организациями для входа (SAML, OAuth, OIDC).'],
['PAM (Privileged Access Mgmt)','Управление привилегированным доступом','Контроль админских учёток (just-in-time, сейфы паролей).'],
['Governance','Управление (руководство)','Политики, роли и ответственность в безопасности.'],
['Compliance','Соответствие требованиям','Выполнение законов и стандартов (GDPR, PCI DSS, ISO 27001).'],
['Policy / Standard / Procedure / Guideline','Политика / стандарт / процедура / рекомендация','От общего «что» до конкретного «как».'],
['Audit','Аудит','Независимая проверка соответствия.'],
['Due diligence / Due care','Должная проверка / должная забота','Изучить риски / действовать ответственно.'],
['Risk appetite','Аппетит к риску','Сколько риска организация готова принять.'],
['Risk mitigation / transfer / avoidance / acceptance','Снижение / передача / избегание / принятие риска','Четыре способа обработки риска.'],
['Control (security control)','Мера (средство) защиты','Технические, административные, физические меры.'],
['Preventive / Detective / Corrective','Превентивные / обнаруживающие / корректирующие','Типы мер: предотвратить, обнаружить, исправить.'],
['Compensating control','Компенсирующая мера','Альтернативная защита, если основную нельзя применить.'],
['SLA','Соглашение об уровне услуг','Договор о качестве сервиса.'],
['NDA','Соглашение о неразглашении','Договор о конфиденциальности.'],
['Cloud: IaaS / PaaS / SaaS','Облако: инфраструктура / платформа / ПО как услуга','Модели облачных сервисов.'],
['Shared responsibility model','Модель разделённой ответственности','Что защищает облачный провайдер, а что — клиент.'],
['Container','Контейнер','Изолированное приложение (Docker).'],
['IaC','Инфраструктура как код','Описание инфраструктуры в файлах (Terraform, Ansible).'],
['DevSecOps','DevSecOps','Безопасность встроена в процесс разработки и CI/CD.'],
['Microservices','Микросервисы','Приложение из множества маленьких сервисов.'],
['IoT','Интернет вещей','Умные устройства — часто слабо защищены.'],
['SCADA / ICS','Промышленные системы управления','Управление заводами, энергетикой.'],
['Packet','Пакет','Порция данных в сети.'],
['Protocol','Протокол','Правила общения устройств (TCP, UDP, HTTP).'],
['TCP handshake','Трёхстороннее рукопожатие TCP','SYN → SYN-ACK → ACK.'],
['Subnet / CIDR','Подсеть / CIDR','10.10.10.0/24 = 256 адресов, 254 для хостов.'],
['Gateway','Шлюз','Маршрутизатор, через который идёт трафик в другие сети.'],
['NAT','Трансляция адресов','Замена внутренних IP на внешний.'],
['DHCP','DHCP','Автоматическая выдача IP-адресов.'],
['DNS','Система доменных имён','Перевод имён (google.com) в IP-адреса.'],
['Proxy','Прокси','Посредник между клиентом и сервером.'],
['Reverse shell','Обратный шелл','Жертва сама подключается к атакующему и даёт ему командную строку.'],
['Fingerprinting','Определение (снятие отпечатка)','Определение ОС и версий сервисов (nmap -O, -sV).'],
['Banner grabbing','Сбор баннеров','Чтение приветствия сервиса, чтобы узнать версию.'],
['Wireless: WPA3','WPA3','Современная защита Wi-Fi.'],
['Evil twin','Злой двойник','Поддельная точка Wi-Fi с тем же именем.'],
['Jailbreak / Rooting','Джейлбрейк / рутирование','Снятие ограничений с телефона (риск безопасности).'],
['Sideloading','Сторонняя установка','Установка приложений не из официального магазина.'],
['Secure boot','Безопасная загрузка','Загружается только подписанное ПО.'],
['TPM','Доверенный платформенный модуль','Чип для ключей шифрования (BitLocker).'],
['HSM','Аппаратный модуль безопасности','Устройство для хранения криптоключей.'],
['Entropy','Энтропия','Мера случайности (важна для ключей и паролей).'],
['Threat intelligence','Разведка угроз','Сведения о текущих угрозах и атакующих.'],
['Threat hunting','Охота за угрозами','Проактивный поиск скрытых атакующих.'],
['OSINT','Разведка по открытым источникам','Сбор информации из открытых источников.'],
['Mitigation','Смягчение (снижение) риска','Меры, уменьшающие вероятность или ущерб.'],
['Remediation','Устранение (исправление)','Исправление уязвимости или последствий.'],
['Deprecated','Устаревший','Больше не поддерживается, лучше не использовать.'],
['Legacy system','Устаревшая система','Старая система, которую сложно обновить.'],
['Least functionality','Минимальная функциональность','Устанавливать и включать только необходимое.'],
['Air gap','Воздушный зазор','Физическая изоляция сети от интернета.'],
];

App.reg('cyber', el => {
  el.innerHTML = `<h1>🛡️ Cyber Security Engineering Project</h1>
  <p class="muted">Build a Secure Infrastructure from Zero — ты Security Engineer в компании. Каждая задача: <b>WHAT</b> → <b>WHY</b> → <b>HOW</b> → <b>TEST</b>. ⚠️ Тестируем только собственную лабораторию.</p>`;
  const stages = CY_STAGES.map(s => `<div class="card"><h3>Этап ${s.n}. ${s.t} <span class="muted small">— ${s.ru}</span></h3>
    <div class="wwht"><b>WHAT</b><div>${s.what}</div><b>WHY</b><div>${s.why}</div><b>HOW</b><div>${s.how}</div><b>TEST</b><div>${s.test}</div></div>
    <h3>Задачи</h3>${checklist('cy.s' + s.n, s.tasks)}
    <textarea data-note="${s.n}" rows="2" style="width:100%;margin-top:8px" placeholder="Мои заметки / что получилось / ошибки">${esc(Store.get('cy.note' + s.n, ''))}</textarea></div>`).join('');
  const arch = `<div class="card"><h3>Архитектура лаборатории</h3><div class="diagram">                 INTERNET
                    |
              [ pfSense FIREWALL ]   10.10.10.1
                    |
              [ INTERNAL LAN 10.10.10.0/24 ]
          +---------+----------+-----------+
          |         |          |           |
     SERVER      CLIENT 1   CLIENT 2     KALI (тесты)
   Ubuntu .10   Win10/11 .21 Ubuntu .22   .99
          |         |          |
          +---- логи/агенты ---+
                    |
           [ Wazuh SIEM .50 ] + Suricata IDS
                    |
             [ SECURITY SOC ]</div>
  <div class="tbl"><table><tr><th>VM</th><th>Назначение</th><th>RAM (мин.)</th></tr>
  <tr><td>pfSense</td><td>Firewall / шлюз</td><td>1 GB</td></tr><tr><td>Ubuntu Server</td><td>Основной сервер (DNS, web, SSH)</td><td>2 GB</td></tr>
  <tr><td>Windows 10/11</td><td>Пользовательский ПК</td><td>4 GB</td></tr><tr><td>Ubuntu Desktop</td><td>2-й пользовательский ПК</td><td>2 GB</td></tr>
  <tr><td>Wazuh / Security Onion</td><td>SIEM, мониторинг</td><td>4–8 GB</td></tr><tr><td>Kali Linux</td><td>Security testing</td><td>2–4 GB</td></tr></table></div>
  <p class="small muted">При 16 GB RAM включай одновременно 3–4 VM. Добавляем компоненты постепенно.</p>
  <h3>Технологический стек</h3><p>${['Kali Linux','Ubuntu','Windows','VirtualBox/VMware','pfSense','Nmap','Greenbone','Suricata','Wazuh','Wireshark','Burp Suite','Python','Bash','Linux Hardening','LDAP / Active Directory'].map(t => `<span class="tag">${t}</span>`).join('')}</p></div>`;
  const disc = `<div class="card"><h3>Задание 0 — Infrastructure Discovery</h3><p class="muted small">Заполни — это определит, сколько VM можно запускать одновременно.</p>
   <div class="row"><label>RAM: <select data-d="ram"><option></option><option>8 GB</option><option>16 GB</option><option>32 GB</option></select></label>
   <label>CPU: <input data-d="cpu" placeholder="напр. Ryzen 5 5600H"></label><label>Свободно на диске: <input data-d="disk" placeholder="GB" size="6"></label></div>
   <div class="row" style="margin-top:8px"><label>Kali установлена: <select data-d="kali"><option></option><option>VirtualBox</option><option>VMware</option><option>На компьютере</option><option>Ещё нет</option></select></label>
   <label>Цель: <select data-d="goal"><option>C — Full Cybersecurity Engineer (рекомендуется)</option><option>A — Blue Team / Security Engineer</option><option>B — Red + Blue Team</option></select></label></div>
   <p id="discOut" class="small"></p></div>`;
  const bar = `<div class="card"><b>Прогресс проекта:</b> <span id="cyPct"></span><div class="bar"><i id="cyBar"></i></div></div>`;
  const gloss = `<div class="card"><h3>Переводчик терминов EN → RU</h3>
    <div class="row"><input id="gq" placeholder="Введи слово или фразу (напр. lateral movement)" style="flex:1;min-width:220px"><button class="btn ghost" id="gTr">Google Translate ↗</button></div>
    <p class="small muted">Ищет по словарю (${CY_GLOSS.length} терминов). Если термина нет — кнопка откроет Google Translate (EN→RU). 🔊 — английское произношение.</p>
    <div id="gOut" class="tbl"></div></div>`;
  const certs = `<div class="card"><h3>CompTIA Security+ SY0-701 (книга Exam Cram)</h3>
    ${checklist('cert.secplus', ['Domain 1 — General Security Concepts (12%): controls, CIA, AAA, Zero Trust, crypto, PKI','Domain 2 — Threats, Vulnerabilities & Mitigations (22%): actors, vectors, malware, attacks, mitigations','Domain 3 — Security Architecture (18%): cloud, network design, data protection, resilience, backups','Domain 4 — Security Operations (28%): hardening, IAM, monitoring, vulnerability mgmt, IR, forensics, automation','Domain 5 — Security Program Management & Oversight (20%): governance, risk, third parties, compliance, audits, awareness','Practice exam 1 (≥ 80%)','Practice exam 2 (≥ 85%)'])}
    <p class="small muted">Связь с проектом: этапы 2,6 → Domain 3; этапы 3,4,5,7,8,9 → Domain 4; этап 10 → Domain 5.</p></div>
    <div class="card"><h3>Google Cybersecurity Certificate</h3>${checklist('cert.google', ['1. Foundations of Cybersecurity','2. Play It Safe: Manage Security Risks','3. Connect and Protect: Networks and Network Security','4. Tools of the Trade: Linux and SQL','5. Assets, Threats, and Vulnerabilities','6. Sound the Alarm: Detection and Response','7. Automate Cybersecurity Tasks with Python','8. Put It to Work: Prepare for Cybersecurity Jobs'])}</div>
    <div class="card"><h3>Метод изучения сложного английского текста</h3><ol>
    <li>Прочитай абзац целиком, не останавливаясь.</li><li>Выпиши незнакомые термины → найди в переводчике выше.</li>
    <li>Объясни абзац своими словами по-русски (1–2 предложения).</li><li>Свяжи с лабораторией: «где я это увижу/настрою?»</li><li>Через день — повтори карточки терминов.</li></ol></div>`;
  const quiz = `<div class="card"><h3>Карточки терминов</h3><div id="gCard" class="flash"></div>
    <div class="row" style="justify-content:center"><button class="btn ghost" id="gNext">Следующий</button><button class="btn ok" id="gKnow">Знаю ✓</button></div></div>`;
  subTabs(el, [['sp', '📘 Security+ теория', '<div id="spRoot"></div>'], ['spg', '🎮 Флешкарты, игры, экзамен', '<div id="spGames"></div>'], ['lab', '🧪 Практика: лаборатория', bar + disc + arch + stages], ['gloss', '📖 Словарь / переводчик', gloss + quiz], ['cert', '🎓 Сертификаты', certs]], 'cyber');
  if (window.spInit && window.SP) spInit(el);

  // progress
  const upd = () => { const p = Math.round(cyberProgress() * 100); $('#cyPct', el).textContent = p + '%'; $('#cyBar', el).style.width = p + '%'; };
  el.addEventListener('change', upd); upd();
  $$('textarea[data-note]', el).forEach(t => t.oninput = () => Store.set('cy.note' + t.dataset.note, t.value));
  // discovery
  const d = Store.get('cy.disc', {});
  const advise = () => { const r = d.ram || ''; $('#discOut', el).innerHTML = r.startsWith('8') ? '💡 8 GB: одновременно 2 VM (например Kali + Ubuntu Server). Wazuh лучше позже или в облаке.' : r.startsWith('16') ? '💡 16 GB: 3–4 VM одновременно (pfSense + Server + Kali, Wazuh отдельно).' : r.startsWith('32') ? '💡 32 GB: можно всю лабораторию сразу.' : ''; };
  $$('[data-d]', el).forEach(i => { if (d[i.dataset.d]) i.value = d[i.dataset.d]; i.onchange = i.oninput = () => { d[i.dataset.d] = i.value; Store.set('cy.disc', d); advise(); }; }); advise();
  // glossary search
  const out = $('#gOut', el), q = $('#gq', el);
  const show = () => {
    const s = q.value.trim().toLowerCase();
    const rows = (s ? CY_GLOSS.filter(g => (g[0] + ' ' + g[1] + ' ' + g[2]).toLowerCase().includes(s)) : CY_GLOSS);
    out.innerHTML = rows.length ? `<table><tr><th>English</th><th>Русский</th><th>Объяснение</th></tr>${rows.map(g => `<tr><td><b>${esc(g[0])}</b> ${spk(g[0], 'en-US')}</td><td>${esc(g[1])}</td><td class="small">${esc(g[2])}</td></tr>`).join('')}</table>`
      : `<p>Нет в словаре. Нажми «Google Translate ↗».</p>`;
  };
  q.oninput = show; show();
  $('#gTr', el).onclick = () => window.open('https://translate.google.com/?sl=en&tl=ru&op=translate&text=' + encodeURIComponent(q.value), '_blank');
  // cards
  let known = Store.get('cy.known', {}), cur;
  const next = () => { const pool = CY_GLOSS.filter(g => !known[g[0]]); const list = pool.length ? pool : CY_GLOSS; cur = list[Math.floor(Math.random() * list.length)];
    $('#gCard', el).innerHTML = `${esc(cur[0])} <div class="back">нажми, чтобы увидеть перевод · осталось ${pool.length}</div>`; $('#gCard', el).dataset.open = ''; };
  $('#gCard', el).onclick = () => { $('#gCard', el).innerHTML = `${esc(cur[1])}<div class="back">${esc(cur[0])} — ${esc(cur[2])}</div>`; Speech.say(cur[0], 'en-US'); };
  $('#gNext', el).onclick = next; $('#gKnow', el).onclick = () => { known[cur[0]] = 1; Store.set('cy.known', known); next(); };
  next();
});
