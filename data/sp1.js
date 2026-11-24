// Security+ SY0-701 — Domains 1–2 (chapters follow the Exam Cram 7E structure). Own summaries.
// card: "front|back"; quiz: [question, [A,B,C,D], correctIndex, explanation(ru)]
window.SP = window.SP || [];
SP.push(
{c:1,d:1,obj:'1.1',t:'Security Controls',ru:'Меры защиты (контроли)',md:`
Контроль (control) — любая мера, которая снижает риск. На экзамене спрашивают **категорию** (кто/чем реализует) и **тип** (что делает).
## 4 категории (categories)
| Категория | Суть | Примеры |
| Technical | реализуется технологией | firewall, шифрование, MFA, антивирус |
| Managerial | управленческие документы и решения | политики, risk assessment, планирование |
| Operational | выполняют люди в повседневной работе | охрана, обучение, процедуры бэкапа |
| Physical | физическое ограничение доступа | замки, заборы, турникеты, камеры |
## 6 типов (types)
- **Preventive** — предотвращает: firewall rule, замок, MFA.
- **Deterrent** — отпугивает, но не останавливает: табличка «Ведётся видеонаблюдение», баннер при входе.
- **Detective** — обнаруживает: IDS, логи, камеры (запись), аудит.
- **Corrective** — исправляет после события: восстановление из бэкапа, патч, антивирус удаляет вирус.
- **Compensating** — замена, если основной контроль невозможен: сегментация для старой системы без патчей.
- **Directive** — указывает, что делать: политика, инструкция «пароли не записывать».
> Один контроль может быть разных типов: камера с записью — detective, видимая камера — ещё и deterrent.
> Trick: guard (охранник) — operational категория, а по типу — preventive/deterrent.`,
cards:['Technical control|Контроль, реализованный технологией (firewall, MFA, шифрование)','Managerial control|Управленческий контроль: политики, оценка рисков, планирование','Operational control|Выполняется людьми: охрана, обучение, процедуры','Physical control|Физическая защита: замки, заборы, ворота, вестибюль','Preventive|Предотвращает инцидент (firewall, замок)','Deterrent|Отпугивает (знак, баннер), но не блокирует','Detective|Обнаруживает (IDS, логи, аудит)','Corrective|Исправляет после события (бэкап, патч)','Compensating|Альтернативный контроль, когда основной нельзя применить','Directive|Предписывает поведение (политика, инструкция)'],
quiz:[
['A company posts signs warning that the premises are monitored by CCTV. Which control type is this?',['Detective','Deterrent','Corrective','Preventive'],1,'A sign only discourages - deterrent.'],
['A legacy system cannot be patched, so it is placed on an isolated VLAN. What type of control is the VLAN?',['Compensating','Directive','Detective','Deterrent'],0,'The primary control (patching) is impossible, so the VLAN compensates.'],
['Restoring files from backup after ransomware is an example of which control type?',['Preventive','Detective','Corrective','Directive'],2,'Restoring fixes the damage after the event - corrective.'],
['Security awareness training is best categorized as which control category?',['Technical','Physical','Operational','Managerial'],2,'Training is performed by people - operational.'],
['A risk assessment report belongs to which control category?',['Managerial','Operational','Technical','Physical'],0,'Management documents and decisions - managerial.'],
['Which is a detective control?',['Firewall ACL','Security guard at a gate','Log review','Fence'],2,'Log review detects events - detective.']]},

{c:2,d:1,obj:'1.2',t:'Fundamental Security Concepts',ru:'Базовые концепции безопасности',md:`
## CIA triad
- **Confidentiality** — только авторизованные видят данные (шифрование, права доступа).
- **Integrity** — данные не изменены незаметно (хеши, цифровые подписи).
- **Availability** — доступно, когда нужно (резервирование, бэкапы, защита от DDoS).
**Non-repudiation** (неотказуемость) — нельзя отрицать действие: цифровая подпись доказывает автора.
## AAA
- **Authentication** — кто ты? (людей и систем: сертификаты устройств).
- **Authorization** — что тебе можно? (модели доступа).
- **Accounting** — что ты сделал? (логи).
## Gap analysis
Сравнение «как есть» с «как должно быть» (по стандарту, напр. NIST/ISO) → список недостающих мер.
## Zero Trust — «never trust, always verify»
| Плоскость | Компоненты |
| Control plane (решает) | Adaptive identity, Threat scope reduction, Policy-driven access control, **Policy Engine** (решение), **Policy Administrator** (передаёт решение) |
| Data plane (исполняет) | Implicit trust zones, Subject/System, **Policy Enforcement Point (PEP)** — пропускает или блокирует |
## Физическая безопасность
- **Bollards** — столбики против автомобилей; **fencing** — забор.
- **Access control vestibule** (mantrap) — шлюз из двух дверей против tailgating.
- Video surveillance, security guard, access badge, lighting.
- Сенсоры: **infrared** (тепло), **pressure** (давление/вес), **microwave**, **ultrasonic**.
## Deception and disruption
- **Honeypot** — ложный сервер-приманка; **honeynet** — сеть приманок.
- **Honeyfile** — файл-приманка («passwords.xlsx»), доступ к нему = тревога.
- **Honeytoken** — фальшивые данные/учётка; их использование выдаёт атакующего.`,
cards:['Confidentiality|Конфиденциальность — доступ только авторизованным (шифрование)','Integrity|Целостность — данные не изменены (хеши, подписи)','Availability|Доступность — работает, когда нужно (резерв, бэкапы)','Non-repudiation|Неотказуемость — нельзя отрицать действие (цифровая подпись)','AAA|Authentication, Authorization, Accounting','Gap analysis|Сравнение текущего состояния с целевым','Zero Trust|Никому не доверять по умолчанию, проверять каждый запрос','Policy Engine|Компонент Zero Trust, принимающий решение о доступе','Policy Administrator|Передаёт решение Policy Engine к PEP (создаёт/закрывает сессию)','Policy Enforcement Point|Точка data plane, которая разрешает/блокирует трафик','Access control vestibule|Шлюз из двух дверей (против tailgating)','Bollards|Столбики против таранного въезда автомобилей','Honeypot|Ложная система-приманка для атакующих','Honeyfile|Файл-приманка, обращение к которому вызывает тревогу','Honeytoken|Фальшивые данные/учётка для обнаружения утечки','Microwave / ultrasonic sensor|Датчики движения на отражённых волнах'],
quiz:[
['Which Zero Trust component makes the decision to grant or deny access?',['Policy Enforcement Point','Policy Engine','Implicit trust zone','Subject'],1,'The Policy Engine decides; the PEP only enforces.'],
['A digital signature on an email primarily provides which of the following?',['Availability','Confidentiality','Non-repudiation','Authorization'],2,'A signature proves the sender - non-repudiation (and integrity).'],
['A fake "salaries.xlsx" file placed on a share to detect intruders is a:',['Honeynet','Honeyfile','Honeytoken','Sandbox'],1,'A decoy file is a honeyfile.'],
['Which physical control prevents tailgating?',['Bollards','Access control vestibule','Lighting','Fencing'],1,'An access control vestibule (mantrap) admits one person at a time.'],
['Comparing current security posture to the NIST CSF to find missing controls is called:',['Gap analysis','Penetration test','Tabletop exercise','Risk transfer'],0,'Comparing current state to a framework is gap analysis.'],
['Logging which user accessed a file supports which part of AAA?',['Authentication','Authorization','Accounting','Attestation'],2,'Recording user actions is accounting.']]},

{c:3,d:1,obj:'1.3',t:'Change Management',ru:'Управление изменениями',md:`
Любое изменение (патч, новый firewall rule) может сломать систему или открыть дыру. Change management делает изменения **контролируемыми**.
## Business processes
- **Approval process** — изменение одобряет CAB (Change Advisory Board).
- **Ownership** — у изменения есть ответственный; **stakeholders** — все, кого оно касается.
- **Impact analysis** — что сломается, какие риски.
- **Test results** — сначала тест в тестовой среде (sandbox/staging).
- **Backout plan** — план отката, если что-то пошло не так.
- **Maintenance window** — согласованное время работ (ночью/выходные).
- **SOP** — стандартная операционная процедура.
## Technical implications
- Allow lists / deny lists должны быть обновлены.
- **Restricted activities** — делать только то, что одобрено (scope).
- **Downtime**, service restart, application restart — заранее предупредить.
- **Legacy applications** — могут не поддерживать новое.
- **Dependencies** — изменение одного сервиса влияет на другие.
## Documentation
Обновить диаграммы сети, политики и процедуры; **version control** — история версий конфигов и кода (Git), можно откатиться.
> Вопрос «что сделать, если изменение сломало сервис?» → выполнить backout plan.`,
cards:['Change Advisory Board (CAB)|Группа, одобряющая изменения','Impact analysis|Оценка последствий изменения','Backout plan|План отката изменения при сбое','Maintenance window|Согласованное время для работ','SOP|Standard Operating Procedure — стандартная процедура','Stakeholders|Все, кого затрагивает изменение','Dependencies|Зависимости: изменение одного влияет на другое','Version control|Контроль версий (история изменений, откат)','Legacy application|Старое ПО, которое может не поддерживать изменение','Restricted activities|Выполнять только одобренные действия в рамках изменения'],
quiz:[
['A patch caused a critical application to fail during the maintenance window. What should the administrator do FIRST?',['Open a new change request','Execute the backout plan','Disable logging','Contact the vendor for a refund'],1,'If a change fails, execute the backout plan.'],
['Which group typically approves changes to production systems?',['SOC','CAB','CSIRT','Red team'],1,'The Change Advisory Board approves changes.'],
['Which activity identifies how a change may affect other systems?',['Impact analysis','Tabletop exercise','Penetration test','Gap analysis'],0,'Impact analysis evaluates effects on other systems.'],
['Why should network diagrams be updated after a change?',['To satisfy version control','To keep documentation accurate','To reduce downtime','To restart services'],1,'Documentation must match the real environment.'],
['A scheduled period of low business activity when changes are implemented is a:',['Maintenance window','Backout window','Legal hold','Freeze test'],0,'That is a maintenance window.']]},

{c:4,d:1,obj:'1.4',t:'Cryptographic Solutions',ru:'Криптография',md:`
## Симметричное vs асимметричное
| | Symmetric | Asymmetric |
| Ключи | один общий | пара: public + private |
| Скорость | быстро, для больших данных | медленно |
| Примеры | AES, 3DES, ChaCha20 | RSA, ECC, Diffie-Hellman |
| Проблема | как передать ключ | — |
**Key exchange**: Diffie-Hellman/ECDHE создают общий ключ по открытому каналу. На практике (TLS): асимметрия для обмена ключом → симметрия для данных.
Длиннее ключ = сильнее (AES-256 > AES-128). ECC даёт ту же силу при меньших ключах (хорошо для мобильных/IoT).
## Уровни шифрования
Full-disk (BitLocker), partition, volume, file, database, record (отдельные поля), transport (TLS, IPSec, VPN).
## Инструменты
- **TPM** — чип на материнской плате, хранит ключи (BitLocker, secure boot).
- **HSM** — отдельное устройство для ключей (банки, CA).
- **KMS** — облачное управление ключами.
- **Secure enclave** — изолированная область процессора.
- **Key escrow** — копия ключа у доверенной третьей стороны.
## Hashing и пароли
- **Hash** — односторонняя функция (SHA-256); проверка целостности. MD5/SHA-1 устарели (коллизии).
- **Salting** — случайная соль к паролю → разные хеши одинаковых паролей, защита от rainbow tables.
- **Key stretching** — многократное хеширование (PBKDF2, bcrypt) замедляет перебор.
- **Digital signature** = хеш, зашифрованный **private key** отправителя; проверяют его **public key**.
## Obfuscation
**Steganography** (данные в картинке), **tokenization** (замена токеном, напр. номера карт), **data masking** (****1234).
## Blockchain
Распределённый **open public ledger** — неизменяемая цепочка блоков.
## Сертификаты и PKI
- **CA** выдаёт сертификаты; **root of trust** — корневой CA.
- **CSR** — запрос на сертификат (содержит public key).
- **Wildcard** *.example.com — для всех поддоменов; **SAN** — несколько имён.
- **Self-signed** — без доверенного CA (для внутреннего теста); **third-party** — публичный CA.
- Отзыв: **CRL** (список отозванных) и **OCSP** (онлайн-проверка в реальном времени); **OCSP stapling** — сервер сам прикладывает ответ.`,
cards:['Symmetric encryption|Один ключ для шифрования и расшифровки (AES)','Asymmetric encryption|Пара ключей public/private (RSA, ECC)','Diffie-Hellman|Протокол обмена ключами по открытому каналу','ECC|Elliptic Curve Cryptography — сильная при коротких ключах','TPM|Чип на материнской плате для хранения ключей','HSM|Отдельное аппаратное устройство для управления ключами','KMS|Key Management System (часто облачная)','Secure enclave|Изолированная защищённая область процессора','Key escrow|Хранение копии ключа у третьей стороны','Hashing|Односторонняя функция — целостность (SHA-256)','Salt|Случайное значение к паролю перед хешированием','Key stretching|Многократное хеширование (bcrypt, PBKDF2)','Digital signature|Хеш, зашифрованный private key отправителя','Steganography|Скрытие данных внутри другого файла','Tokenization|Замена чувствительных данных токеном','Data masking|Частичное скрытие данных (****1234)','CSR|Certificate Signing Request — запрос на сертификат','CRL|Certificate Revocation List — список отозванных','OCSP|Online Certificate Status Protocol — проверка статуса онлайн','Wildcard certificate|Сертификат для *.domain.com','Self-signed certificate|Подписан сам собой, без доверенного CA','Root of trust|Корневой доверенный элемент (root CA, TPM)','Collision|Два разных входа дают одинаковый хеш'],
quiz:[
['Alice wants to send Bob a message only Bob can read. Which key should she use to encrypt it?',['Alice private key','Alice public key','Bob public key','Bob private key'],2,"Encrypt with the recipient's public key; only the recipient's private key decrypts."],
['Which provides protection against rainbow table attacks?',['Salting','Encoding','Steganography','Compression'],0,'Salts make precomputed rainbow tables useless.'],
['A browser needs real-time certificate status. Which should be used?',['CRL','OCSP','CSR','Key escrow'],1,'OCSP checks certificate status in real time.'],
['Which hardware chip on a laptop stores BitLocker keys?',['HSM','TPM','KMS','SED controller'],1,'The TPM is built into the motherboard.'],
['Replacing a credit card number with a random value mapped in a secure vault is:',['Masking','Hashing','Tokenization','Salting'],2,'Tokenization replaces data with a token stored in a vault.'],
['A single certificate for mail.example.com, www.example.com and shop.example.com could be a:',['Self-signed certificate','Wildcard certificate','Root certificate','CRL'],1,'A wildcard *.example.com covers subdomains (a SAN certificate also works).'],
['Which algorithm is symmetric?',['RSA','ECC','AES','Diffie-Hellman'],2,'AES is a symmetric block cipher.'],
['Bcrypt and PBKDF2 are examples of:',['Key stretching','Key escrow','Tokenization','Steganography'],0,'Key stretching slows brute force with repeated hashing.']]},

{c:5,d:2,obj:'2.1',t:'Threat Actors and Motivations',ru:'Злоумышленники и мотивы',md:`
## Типы злоумышленников
| Actor | Ресурсы / уровень | Мотив |
| Nation-state | очень высокие, APT (долго и скрытно) | шпионаж, война, политика |
| Unskilled attacker (script kiddie) | низкие, готовые инструменты | развлечение, слава |
| Hacktivist | средние | политические/идеологические убеждения (дефейс, DDoS) |
| Insider threat | доступ изнутри | месть, деньги, ошибка |
| Organized crime | высокие, бизнес-модель | деньги (ransomware, кража карт) |
| Shadow IT | не злоумышленник, а сотрудник | удобство: ПО/облако без разрешения IT |
## Атрибуты
- **Internal / external** — внутри или вне организации.
- **Resources / funding** — деньги и инструменты.
- **Level of sophistication / capability** — уровень навыков.
## Мотивы
Data exfiltration, espionage, service disruption, blackmail (шантаж), financial gain, philosophical/political beliefs, ethical (white hat, bug bounty), revenge, disruption/chaos, war.
> APT (Advanced Persistent Threat) — почти всегда nation-state; ключевое слово «долгое скрытое присутствие».`,
cards:['Nation-state|Государственный актор, APT, максимум ресурсов, шпионаж','APT|Advanced Persistent Threat — долгая скрытая атака','Unskilled attacker|Script kiddie — использует чужие инструменты','Hacktivist|Атакует ради политических/идеологических целей','Insider threat|Угроза от сотрудника/подрядчика с доступом','Organized crime|Преступные группы ради денег','Shadow IT|Использование IT без одобрения отдела IT','Data exfiltration|Вывод (кража) данных','Espionage|Шпионаж','Blackmail|Шантаж'],
quiz:[
['An attacker remained hidden in a defense contractor network for 18 months stealing designs. Which actor is MOST likely?',['Hacktivist','Unskilled attacker','Nation-state','Shadow IT'],2,'Long hidden presence plus espionage indicates an APT/nation-state.'],
['Employees use an unapproved cloud file-sharing app to collaborate. This is:',['Insider threat','Shadow IT','Hacktivism','Espionage'],1,'Unapproved IT use is shadow IT.'],
['A group defaces a government website to protest a law. Motivation?',['Financial gain','Philosophical/political beliefs','Espionage','Revenge'],1,'Hacktivists act on political or philosophical beliefs.'],
['Which actor typically has the LEAST sophistication?',['Organized crime','Nation-state','Unskilled attacker','APT'],2,'Unskilled attackers (script kiddies) are the least sophisticated.'],
['A fired administrator deletes databases using credentials not yet revoked. Motivation?',['War','Revenge','Ethical','Espionage'],1,'Revenge is the typical motive of a fired insider.']]},

{c:6,d:2,obj:'2.2',t:'Threat Vectors and Attack Surfaces',ru:'Векторы угроз и поверхность атаки',md:`
**Threat vector** — путь, которым атака попадает в систему. **Attack surface** — все возможные точки входа.
## Векторы
- **Message-based**: email, SMS, instant messaging (вложения, ссылки).
- **Image-based** (вредоносный код/QR в картинке), **file-based** (макросы Office, PDF).
- **Voice call** (vishing), **removable device** (USB, оставленная на парковке).
- **Vulnerable software**: client-based (нужен агент) vs **agentless**.
- **Unsupported systems** — EOL, нет патчей.
- **Unsecure networks**: wireless (open Wi-Fi), wired, Bluetooth.
- **Open service ports**, **default credentials** (admin/admin).
- **Supply chain**: MSP (managed service provider), vendors, suppliers.
## Human vectors / social engineering
| Атака | Описание |
| Phishing | массовые поддельные письма |
| Vishing / Smishing | по телефону / через SMS |
| Misinformation / disinformation | ложная информация (случайно / намеренно) |
| Impersonation | выдача себя за другого (IT, начальник) |
| BEC (Business Email Compromise) | письмо «от директора» с просьбой перевести деньги |
| Pretexting | выдуманная легенда для доверия |
| Watering hole | заражение сайта, который часто посещают жертвы |
| Brand impersonation | поддельный сайт/письмо известного бренда |
| Typosquatting | домен с опечаткой: gooogle.com |
> Уменьшить attack surface: закрыть порты, удалить ненужное ПО, сменить default credentials.`,
cards:['Threat vector|Путь, по которому атака попадает в систему','Attack surface|Все точки, через которые можно атаковать','Smishing|Фишинг через SMS','Vishing|Фишинг по телефону (голос)','BEC|Business Email Compromise — мошенничество через письма от «руководства»','Pretexting|Атака с выдуманной легендой','Watering hole|Заражение сайта, который посещает цель','Typosquatting|Домен с опечаткой для обмана','Brand impersonation|Подделка известного бренда','Disinformation|Намеренно ложная информация','Misinformation|Ложная информация без злого умысла','Agentless|Без установки агента на устройство','MSP|Managed Service Provider — внешний IT-подрядчик (риск цепочки поставок)','Default credentials|Заводские логин/пароль'],
quiz:[
['Attackers compromise an industry forum frequently used by a target company’s engineers. This is a:',['Typosquatting','Watering hole attack','Pretexting','Smishing'],1,'A watering hole attack compromises a site the victims visit.'],
['An employee receives an email from the "CEO" urgently requesting a wire transfer. This is MOST likely:',['BEC','Vishing','Watering hole','Brand impersonation'],0,'Business Email Compromise.'],
['Registering "micros0ft.com" to capture mistyped traffic is:',['Typosquatting','Pharming','Disinformation','Smishing'],0,'A misspelled domain is typosquatting.'],
['Which best reduces the attack surface of a new server?',['Enable all services for testing','Disable unused ports and services','Use default credentials','Install more agents'],1,'Less exposed means a smaller attack surface.'],
['A USB drive labeled "Payroll" left in the parking lot is which vector?',['Removable device','Supply chain','Voice call','Unsecure network'],0,'Removable device (baiting).']]},

{c:7,d:2,obj:'2.3',t:'Vulnerability Types',ru:'Типы уязвимостей',md:`
## Application
- **Memory injection** — внедрение кода в память процесса.
- **Buffer overflow** — запись за пределы буфера → выполнение кода.
- **Race condition** — ошибка порядка операций; **TOC/TOU** (time-of-check/time-of-use): проверили одно, использовали уже изменённое.
- **Malicious update** — заражённое обновление (атака на цепочку поставок).
## Web
- **SQL injection (SQLi)** — ~' OR 1=1 --~ в поле ввода → доступ к БД. Защита: **parameterized queries**, input validation.
- **XSS** — внедрение JavaScript, который выполняется у других пользователей. Stored (в БД) / reflected (в ссылке). Защита: экранирование вывода, CSP.
## Hardware / OS
- **Firmware** уязвимости, **end-of-life (EOL)** — нет обновлений, **legacy** — устаревшее.
- OS-based — непропатченная ОС.
## Virtualization
- **VM escape** — выход из ВМ на гипервизор/другие ВМ.
- **Resource reuse** — данные остаются в переиспользуемой памяти/диске.
## Другие
- **Cloud-specific** (неправильные права на бакеты), **supply chain** (service, hardware, software provider).
- **Cryptographic** — слабые алгоритмы (MD5, DES, SSL), плохие ключи.
- **Misconfiguration** — самая частая: открытые порты, default settings.
- **Mobile**: **side loading** (установка не из магазина), **jailbreaking/rooting**.
- **Zero-day** — уязвимость неизвестна вендору, патча нет.`,
cards:['Buffer overflow|Запись данных за пределы буфера памяти','Memory injection|Внедрение кода в память запущенного процесса','Race condition|Ошибка из-за порядка одновременных операций','TOC/TOU|Time-of-check to time-of-use — разрыв между проверкой и использованием','Malicious update|Обновление, содержащее вредоносный код','SQL injection|Внедрение SQL-запросов через ввод','XSS|Cross-site scripting — внедрение JS для других пользователей','Parameterized query|Защита от SQLi — параметры отдельно от запроса','VM escape|Выход из виртуальной машины на хост','Resource reuse|Остаточные данные в переиспользуемых ресурсах','End-of-life (EOL)|Продукт больше не получает обновлений','Side loading|Установка приложений вне официального магазина','Jailbreaking|Снятие ограничений iOS (rooting — Android)','Zero-day|Уязвимость без патча, неизвестная вендору','Misconfiguration|Ошибка настройки — самая частая уязвимость'],
quiz:[
["Input of ' OR 1=1 -- in a login form indicates which attack?",['XSS','SQL injection','Buffer overflow','CSRF'],1,'Classic SQL injection.'],
['The BEST mitigation for SQL injection is:',['Parameterized queries','Disabling JavaScript','Increasing key length','Using a WAF only'],0,'Parameterized queries are the primary defense.'],
['An attacker breaks out of a guest VM and accesses the hypervisor. This is:',['Resource reuse','VM escape','Side loading','Privilege escalation'],1,'VM escape.'],
['A program checks file permissions, but the file is swapped before it is used. This is:',['TOC/TOU race condition','Memory injection','Directory traversal','Replay'],0,'Time-of-check to time-of-use race condition.'],
['A vendor has not released a fix because it was unaware of the flaw being exploited. This is a:',['Legacy vulnerability','Zero-day','Misconfiguration','EOL issue'],1,'Zero-day.'],
['Installing an APK downloaded from a website on Android is called:',['Jailbreaking','Side loading','Rooting','Tethering'],1,'Side loading.']]},

{c:8,d:2,obj:'2.4',t:'Malicious Activity and Indicators',ru:'Атаки и индикаторы',md:`
## Malware
| Тип | Признак |
| Ransomware | шифрует файлы, требует выкуп |
| Trojan | маскируется под полезную программу |
| Worm | распространяется сам по сети, без участия пользователя |
| Virus | нужен запуск пользователем, заражает файлы |
| Spyware / Keylogger | шпионит / записывает нажатия клавиш |
| Bloatware | ненужное предустановленное ПО |
| Logic bomb | срабатывает по условию/дате |
| Rootkit | скрывается глубоко в ОС, даёт root-доступ |
## Физические атаки
Brute force (взлом двери), **RFID cloning** (копия пропуска), environmental (отключение кондиционера, вода).
## Сетевые атаки
- **DDoS**: **amplified** (маленький запрос → большой ответ, DNS/NTP), **reflected** (ответ отправляется на подменённый IP жертвы).
- **DNS attacks**: DNS poisoning, domain hijacking.
- **Wireless**: evil twin, rogue AP, deauthentication, jamming.
- **On-path** (MITM), **credential replay**, malicious code.
## Приложения
Injection, buffer overflow, **replay**, **privilege escalation**, **forgery** (CSRF/SSRF), **directory traversal** (~../../etc/passwd~).
## Криптографические
**Downgrade** (принудить к слабому протоколу), **collision** (одинаковый хеш), **birthday attack** (вероятность коллизии).
## Пароли
**Spraying** (один пароль — много аккаунтов, обходит lockout), **brute force** (много паролей — один аккаунт).
## Индикаторы (IoC)
Account lockout, **concurrent session usage** (вход одновременно с двух мест), blocked content, **impossible travel** (вход из Москвы и Токио за 10 минут), resource consumption, resource inaccessibility, **out-of-cycle logging**, published/documented (данные в даркнете), **missing logs** (атакующий их удалил).`,
cards:['Ransomware|Шифрует данные и требует выкуп','Trojan|Вредонос под видом полезной программы','Worm|Самораспространяющийся по сети вредонос','Virus|Заражает файлы, нужен запуск пользователем','Logic bomb|Срабатывает при условии/дате','Rootkit|Скрывает присутствие и даёт root-доступ','Keylogger|Записывает нажатия клавиш','Bloatware|Ненужное предустановленное ПО','RFID cloning|Копирование бесконтактного пропуска','Amplified DDoS|Маленький запрос вызывает огромный ответ','Reflected DDoS|Ответы серверов направляются на IP жертвы (spoofing)','Directory traversal|../../ — выход за пределы разрешённой папки','Downgrade attack|Принуждение к более слабому протоколу','Birthday attack|Атака на коллизии хешей','Password spraying|Один пароль против многих аккаунтов','Impossible travel|Входы из далёких мест за короткое время','Concurrent session usage|Одновременные сессии одного пользователя из разных мест','Missing logs|Индикатор: логи удалены, чтобы скрыть следы','Credential replay|Повторное использование перехваченных учётных данных','Evil twin|Поддельная точка Wi-Fi с тем же SSID'],
quiz:[
['Malware spreads across the network without any user interaction. It is MOST likely a:',['Virus','Trojan','Worm','Logic bomb'],2,'A worm spreads by itself.'],
['Code inserted by a developer that deletes data if his name is removed from payroll is a:',['Rootkit','Logic bomb','Spyware','Worm'],1,'It triggers on a condition - logic bomb.'],
['A user logs in from New York and, 5 minutes later, from Singapore. Which indicator is this?',['Out-of-cycle logging','Impossible travel','Resource consumption','Account lockout'],1,'Impossible travel.'],
['Many accounts each get one login attempt with "Summer2024!". What attack is this?',['Brute force','Password spraying','Rainbow table','Credential replay'],1,'One password against many accounts is spraying (avoids lockout).'],
['A request contains ../../../etc/passwd. Which attack?',['Directory traversal','XSS','SQLi','Replay'],0,'Directory traversal.'],
['Attackers send small spoofed DNS queries that generate large responses to the victim. This is:',['Amplified DDoS','On-path','Downgrade','Evil twin'],0,'Amplification (and reflection) DDoS.'],
['Forcing a client to use SSL 3.0 instead of TLS 1.3 is a:',['Collision attack','Downgrade attack','Birthday attack','Replay attack'],1,'Downgrade attack.']]},

{c:9,d:2,obj:'2.5',t:'Mitigation Techniques',ru:'Методы снижения рисков',md:`
## Основные техники
- **Segmentation** — деление сети на зоны (VLAN, подсети) → ограничивает lateral movement.
- **Access control**: ACL, permissions.
- **Application allow list** — запускать только одобренное ПО (сильнее, чем deny list).
- **Isolation** — изолировать заражённое/опасное (карантин).
- **Patching** — устанавливать обновления.
- **Encryption** — шифровать данные at rest и in transit.
- **Monitoring** — логи, SIEM.
- **Least privilege** — минимум прав.
- **Configuration enforcement** — принудительное применение baseline (GPO, MDM).
- **Decommissioning** — правильный вывод из эксплуатации (стереть данные).
## Hardening techniques
- Encryption (диск), установка **endpoint protection** (EDR).
- **Host-based firewall**, **HIPS** (host-based intrusion prevention).
- **Disabling ports/protocols** — отключить ненужное (Telnet, SMBv1).
- **Default password changes**.
- **Removal of unnecessary software**.
> Если вопрос «какая мера ЛУЧШЕ всего остановит запуск неизвестных программ?» → application allow list.`,
cards:['Segmentation|Разделение сети на зоны','Application allow list|Разрешено только одобренное ПО','Isolation|Изоляция системы (карантин)','Least privilege|Минимально необходимые права','Configuration enforcement|Принудительное применение безопасной конфигурации','Decommissioning|Безопасный вывод системы из эксплуатации','HIPS|Host-based Intrusion Prevention System','Host-based firewall|Firewall на самом устройстве','Hardening|Усиление защиты: убрать лишнее, настроить безопасно','EDR|Endpoint Detection and Response'],
quiz:[
['Which control BEST prevents users from running unauthorized executables?',['Deny list','Application allow list','Host-based firewall','Antivirus'],1,'An allow list permits only known-good software.'],
['An infected workstation should be immediately:',['Rebooted','Isolated from the network','Patched','Decommissioned'],1,'Isolate first to stop the spread.'],
['Placing IoT cameras on a separate VLAN is an example of:',['Segmentation','Encryption','Decommissioning','Tokenization'],0,'Segmentation.'],
['Which is a hardening technique for a new server?',['Keep default passwords','Disable unused services','Enable Telnet','Install games'],1,'Disable everything that is not needed.'],
['Group Policy forcing screen lock on all PCs is:',['Configuration enforcement','Isolation','Monitoring','Patching'],0,'Configuration enforcement.']]}
);
