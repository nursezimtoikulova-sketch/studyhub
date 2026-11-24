// Security+ SY0-701 — Domains 3–4 (chapters 10–22). Own summaries; quizzes in English.
SP.push(
{c:10,d:3,obj:'3.1',t:'Architecture Models',ru:'Модели архитектуры',md:`
## Облако
- **Responsibility matrix** (shared responsibility): провайдер защищает облако, клиент — то, что он в облако кладёт. IaaS — клиент отвечает за ОС и выше; PaaS — за приложение и данные; SaaS — в основном за данные и доступы.
- **Hybrid** = своё + облако; **third-party vendors** добавляют риск.
- **IaC** (Infrastructure as Code) — инфраструктура описана кодом (Terraform): одинаково, повторяемо, проверяемо.
- **Serverless** — код запускается функциями (Lambda), серверами управляет провайдер.
- **Microservices** — много маленьких сервисов через API; сбой одного не роняет всё.
## Сеть
- **Physical isolation / air-gapped** — нет физического соединения с другими сетями.
- **Logical segmentation** — VLAN, подсети.
- **SDN** (Software-Defined Networking) — control plane отделён от data plane, сетью управляют программно.
## Другие модели
On-premises (всё своё), centralized vs decentralized, **containerization** (Docker: общий kernel, лёгкие), **virtualization** (гипервизор, полные ОС), **IoT**, **ICS/SCADA** (заводы, энергетика — сложно патчить), **RTOS** (системы реального времени), **embedded systems**, **high availability**.
## Соображения (considerations)
Availability, resilience, cost, responsiveness, scalability, ease of deployment, **risk transference** (облако/страховка), ease of recovery, **patch availability / inability to patch** (ICS, embedded), power, compute.
> Ключ: «нельзя патчить» (SCADA, embedded) → сегментация/изоляция как компенсирующий контроль.`,
cards:['Shared responsibility model|Провайдер отвечает за безопасность облака, клиент — за то, что в облаке','IaC|Infrastructure as Code — инфраструктура описана кодом','Serverless|Функции без управления серверами (провайдер управляет)','Microservices|Приложение из маленьких независимых сервисов через API','Air-gapped|Физически изолированная сеть','SDN|Software-Defined Networking — сеть управляется программно','Containerization|Изоляция приложений с общим ядром ОС','Hypervisor|ПО, запускающее виртуальные машины','ICS/SCADA|Промышленные системы управления','RTOS|Операционная система реального времени','Embedded system|Встроенная специализированная система','Hybrid cloud|Сочетание on-premises и публичного облака'],
quiz:[
['In an IaaS model, who is responsible for patching the guest operating system?',['Cloud provider','Customer','Hypervisor vendor','ISP'],1,'In IaaS the customer manages the OS and everything above it.'],
['Which approach allows identical, repeatable deployment of cloud environments from templates?',['Serverless','IaC','SDN','Microservices'],1,'Infrastructure as Code defines infrastructure in versionable templates.'],
['A water treatment SCADA system cannot be patched. What is the BEST mitigation?',['Install antivirus','Isolate it on a segmented network','Move it to SaaS','Disable logging'],1,'When patching is impossible, isolation/segmentation compensates.'],
['Which technology separates the control plane from the data plane?',['SDN','RTOS','VLAN','NAT'],0,'Software-Defined Networking centralizes control logic.'],
['Containers differ from virtual machines because containers:',['Each run a full OS','Share the host OS kernel','Cannot be orchestrated','Require air gaps'],1,'Containers share the kernel and are lighter.'],
['A failure in one component of the app does not bring down the whole app. Which architecture is MOST likely used?',['Monolithic','Microservices','Air-gapped','Mainframe'],1,'Microservices isolate failures between independent services.']]},

{c:11,d:3,obj:'3.2',t:'Enterprise Infrastructure Security',ru:'Защита инфраструктуры предприятия',md:`
## Размещение и зоны
- **Device placement** — где ставить firewall, IDS, сенсоры.
- **Security zones**: internet, **screened subnet (DMZ)**, internal, management.
- **Attack surface**, **connectivity**.
## Failure modes
- **Fail-open** — при сбое пропускает трафик (важна доступность).
- **Fail-closed** — при сбое блокирует (важна безопасность).
## Атрибуты устройств
- **Active** (может блокировать) vs **passive** (только наблюдает).
- **Inline** (трафик идёт через устройство — IPS) vs **tap/monitor** (копия трафика — IDS, SPAN port).
## Сетевые устройства
- **Jump server** (bastion) — единая защищённая точка входа для администрирования.
- **Proxy server** — посредник (forward — для пользователей; reverse — перед веб-серверами).
- **IDS/IPS**, **load balancer**, **sensors**.
## Port security
**802.1X** — аутентификация устройства перед доступом к порту (supplicant → authenticator (switch) → authentication server (RADIUS)); использует **EAP**.
## Firewalls
| Тип | Особенность |
| Layer 4 | IP/порт/протокол |
| Layer 7 / NGFW | понимает приложения, DPI, IPS, идентификация пользователей |
| WAF | защищает веб-приложения от SQLi/XSS |
| UTM | всё в одном: firewall, AV, фильтр, VPN (для малого бизнеса) |
## Защищённый доступ
- **VPN**, **remote access**, **tunneling**: **TLS** (SSL VPN, через браузер), **IPSec** (AH — целостность, ESP — шифрование; tunnel vs transport mode).
- **SD-WAN** — программно управляемая WAN между филиалами.
- **SASE** (Secure Access Service Edge) — облачная безопасность + сеть (SD-WAN + CASB + SWG + ZTNA).`,
cards:['Screened subnet (DMZ)|Зона для публичных серверов между интернетом и внутренней сетью','Fail-open|При сбое пропускает трафик','Fail-closed|При сбое блокирует трафик','Inline device|Трафик проходит через устройство (может блокировать)','Tap / monitor mode|Устройство получает копию трафика','Jump server|Защищённый сервер-шлюз для администрирования','Reverse proxy|Прокси перед веб-серверами','802.1X|Аутентификация устройства на порту (port-based NAC)','EAP|Extensible Authentication Protocol','NGFW|Next-Generation Firewall — уровень приложений, DPI','WAF|Web Application Firewall','UTM|Unified Threat Management — всё в одном','IPSec ESP|Шифрование и целостность пакетов IPSec','IPSec AH|Только целостность/аутентификация, без шифрования','SD-WAN|Программно управляемая глобальная сеть','SASE|Облачная модель: сеть + безопасность на краю'],
quiz:[
['Which failure mode keeps traffic flowing when a security device fails, prioritizing availability over security?',['Fail-open','Fail-closed','Fail-secure','Fail-safe lockdown'],0,'Fail-open passes traffic on failure; fail-closed blocks it.'],
['Which device must be placed inline to actively block attacks?',['IDS','IPS','SPAN port','Network tap'],1,'An IPS is inline and can drop traffic.'],
['Administrators must connect to servers through one hardened, monitored host. This host is a:',['Jump server','Reverse proxy','Load balancer','Honeypot'],0,'A jump (bastion) server.'],
['Which standard requires a device to authenticate before a switch port allows traffic?',['802.11','802.1X','802.3','802.1Q'],1,'802.1X port-based network access control.'],
['Which firewall can block SQL injection against a web application?',['Layer 4 firewall','WAF','Stateless ACL','NAT gateway'],1,'A Web Application Firewall inspects HTTP traffic.'],
['Which IPSec component provides encryption?',['AH','ESP','IKE only','GRE'],1,'ESP encrypts; AH only authenticates.'],
['A cloud service combining SD-WAN, CASB, SWG and ZTNA is called:',['SASE','UTM','SIEM','SOAR'],0,'Secure Access Service Edge.']]},

{c:12,d:3,obj:'3.3',t:'Data Protection Strategies',ru:'Защита данных',md:`
## Типы данных
Regulated (PII, PHI — закон), trade secret, intellectual property, legal information, financial information, human-readable / non-human-readable.
## Классификация
| Уровень | Пример |
| Public | пресс-релиз |
| Private / internal | внутренние документы |
| Sensitive | данные клиентов |
| Confidential | контракты, исходный код |
| Restricted | только по особому разрешению |
| Critical | без них бизнес остановится |
## Состояния данных
- **At rest** — на диске (шифрование диска/БД).
- **In transit / in motion** — по сети (TLS, VPN).
- **In use** — в памяти/обработке (secure enclave).
## Где хранятся
- **Data sovereignty** — данные подчиняются законам страны, где хранятся.
- **Geolocation** — физическое местонахождение.
## Методы защиты
**Geographic restrictions**, **encryption**, **hashing**, **masking**, **tokenization**, **obfuscation**, **segmentation**, **permission restrictions**.`,
cards:['PII|Personally Identifiable Information — личные данные','PHI|Protected Health Information — медицинские данные','Data at rest|Данные в хранении','Data in transit|Данные при передаче','Data in use|Данные в обработке (в памяти)','Data sovereignty|Данные подчиняются законам страны хранения','Trade secret|Коммерческая тайна','Data classification|Присвоение уровня чувствительности данным','Geographic restrictions|Ограничение доступа по местоположению','Confidential|Высокая чувствительность, ущерб при раскрытии'],
quiz:[
['A European company must keep customer data inside the EU due to local law. This concept is:',['Data masking','Data sovereignty','Tokenization','Geofencing'],1,'Data sovereignty: data is subject to the laws of the country where it is stored.'],
['TLS primarily protects data:',['At rest','In transit','In use','In escrow'],1,'TLS encrypts data moving across the network.'],
['Which protects data while it is being processed in memory?',['Full-disk encryption','Secure enclave','TLS','Backups'],1,'Data in use is protected by secure enclaves/trusted execution.'],
['Medical records are classified as which data type?',['Public','Regulated (PHI)','Trade secret','Non-human-readable'],1,'PHI is regulated data (e.g., HIPAA).'],
['Showing only the last four digits of an account number is:',['Hashing','Masking','Segmentation','Encryption'],1,'Data masking hides part of the data.']]},

{c:13,d:3,obj:'3.4',t:'Resilience and Recovery',ru:'Отказоустойчивость и восстановление',md:`
## High availability
- **Load balancing** — распределяет нагрузку между активными серверами (active-active).
- **Clustering** — группа серверов как один; при отказе узла работу подхватывает другой (failover).
## Резервные площадки
| Site | Готовность | Стоимость |
| Hot | полностью готов, данные синхронны — минуты | дорого |
| Warm | оборудование есть, данные нужно восстановить — часы/дни | средне |
| Cold | только помещение и питание — недели | дёшево |
**Geographic dispersion** — площадки далеко друг от друга (одна катастрофа не заденет обе).
## Разнообразие
**Platform diversity** (разные ОС/вендоры), **multi-cloud** (несколько провайдеров), **continuity of operations (COOP)**.
## Capacity planning
People, technology, infrastructure — хватит ли людей и ресурсов при сбое.
## Тестирование
**Tabletop** (обсуждение за столом), **failover** (реальное переключение), **simulation**, **parallel processing** (запуск на резервной площадке параллельно с основной).
## Бэкапы
- Onsite / offsite, frequency, encryption.
- **Full** (всё), **incremental** (изменения с последнего любого бэкапа: быстро делать, долго восстанавливать), **differential** (изменения с последнего full: растёт, восстановление = full + последний diff).
- **Snapshots** (состояние ВМ на момент), **replication** (копирование в реальном времени), **journaling** (журнал изменений).
- Правило **3-2-1**: 3 копии, 2 типа носителей, 1 вне площадки.
## Питание
**UPS** — батарея на минуты (корректное выключение/переход), **generator** — долго, **PDU** — распределение.`,
cards:['Hot site|Полностью готовая резервная площадка — минуты','Warm site|Частично готовая площадка — часы/дни','Cold site|Только помещение и питание — недели','Load balancing|Распределение нагрузки между серверами','Clustering|Группа серверов с автоматическим failover','Geographic dispersion|Разнесение площадок географически','Incremental backup|Изменения с последнего любого бэкапа','Differential backup|Изменения с последнего полного бэкапа','Snapshot|Снимок состояния системы на момент времени','Replication|Непрерывное копирование данных','Journaling|Журналирование изменений для восстановления','3-2-1 rule|3 копии, 2 носителя, 1 вне площадки','UPS|Источник бесперебойного питания (кратковременно)','Generator|Генератор — длительное питание','Tabletop exercise|Обсуждение сценария без реальных действий','Failover test|Реальное переключение на резерв'],
quiz:[
['Which recovery site can take over within minutes but is the MOST expensive?',['Cold','Warm','Hot','Mobile'],2,'A hot site is fully equipped and synchronized.'],
['Full backup on Sunday, then daily backups capturing changes since Sunday. What type?',['Incremental','Differential','Snapshot','Journaling'],1,'Differential captures changes since the last full backup.'],
['Which provides short-term power to allow safe shutdown?',['Generator','UPS','PDU','Dual NIC'],1,'A UPS bridges short outages.'],
['Executives walk through a ransomware scenario in a conference room. This is a:',['Failover test','Simulation','Tabletop exercise','Parallel processing'],2,'Discussion-based = tabletop.'],
['Using AWS and Azure together to avoid provider outage is:',['Multi-cloud','Hybrid cloud','Clustering','Replication'],0,'Multi-cloud diversifies providers.'],
['Which restore requires the full backup plus EVERY backup since?',['Differential','Incremental','Snapshot','Copy'],1,'Incremental restores need the full + all incrementals.']]},

{c:14,d:4,obj:'4.1',t:'Securing Resources',ru:'Защита ресурсов (baselines, mobile, wireless, apps)',md:`
## Secure baselines
**Establish** (создать по CIS/вендору) → **deploy** (GPO, MDM, Ansible) → **maintain** (обновлять, проверять отклонения).
## Hardening targets
Mobile, workstations, switches, routers, cloud infrastructure, servers, ICS/SCADA, embedded, RTOS, IoT.
## Wireless
- **Site survey** и **heat map** — где ставить точки доступа, где слабый сигнал/чужие AP.
- **WPA3** (SAE вместо PSK — защита от офлайн-перебора), WPA2-Enterprise/WPA3-Enterprise с **RADIUS** (AAA).
## Mobile
- **MDM** — централизованное управление (политики, удалённое стирание, контейнеризация).
- Модели: **BYOD** (своё устройство), **COPE** (корпоративное, личное использование разрешено), **CYOD** (выбери из списка компании).
- Подключения: cellular, Wi-Fi, Bluetooth.
## Application security
- **Input validation** (проверка ввода на сервере), **secure cookies** (флаги Secure, HttpOnly), **static code analysis (SAST)**, **code signing** (подлинность кода).
- **Sandboxing** — запуск в изоляции. **Monitoring**.`,
cards:['Secure baseline|Эталонная безопасная конфигурация','Site survey|Обследование радиосреды перед установкой Wi-Fi','Heat map|Карта силы сигнала Wi-Fi','WPA3 SAE|Simultaneous Authentication of Equals — замена PSK','RADIUS|Сервер AAA для Wi-Fi Enterprise / VPN','MDM|Mobile Device Management','BYOD|Bring Your Own Device','COPE|Corporate-Owned, Personally Enabled','CYOD|Choose Your Own Device','Input validation|Проверка ввода (на стороне сервера)','Secure cookie|Cookie с флагами Secure/HttpOnly','Static code analysis|Анализ исходного кода без запуска','Code signing|Цифровая подпись кода','Sandboxing|Запуск в изолированной среде'],
quiz:[
['Which tool shows where Wi-Fi coverage is weak in a building?',['Heat map','NetFlow','SIEM','Protocol analyzer'],0,'A heat map visualizes signal strength.'],
['The company buys phones and allows limited personal use. Which model?',['BYOD','COPE','CYOD','VDI'],1,'Corporate-Owned, Personally Enabled.'],
['Which WPA3 feature replaces the pre-shared key handshake and resists offline dictionary attacks?',['TKIP','SAE','WPS','CCMP'],1,'Simultaneous Authentication of Equals.'],
['Which ensures users that software came from the vendor and was not modified?',['Code signing','Sandboxing','Fuzzing','Obfuscation'],0,'Code signing proves origin and integrity.'],
['Remotely wiping a lost corporate phone requires:',['MDM','DLP','NAC','WAF'],0,'Mobile Device Management.'],
['The BEST defense against injection in a web form is:',['Client-side JavaScript checks only','Server-side input validation','Longer passwords','Secure cookies'],1,'Validate input on the server side.']]},

{c:15,d:4,obj:'4.2',t:'Asset Management',ru:'Управление активами',md:`
Нельзя защитить то, о чём не знаешь. Жизненный цикл актива:
## 1. Acquisition / procurement
Покупка у проверенных поставщиков, требования безопасности в контракте.
## 2. Assignment / accounting
**Ownership** (владелец отвечает), **classification** (уровень важности).
## 3. Monitoring / asset tracking
**Inventory** (учёт), **enumeration** (автоматический поиск устройств в сети).
## 4. Disposal / decommissioning
- **Sanitization** — стирание данных (overwrite, crypto erase, degaussing для магнитных).
- **Destruction** — физическое уничтожение (shredding, pulverizing, incineration).
- **Certification** — документ (certificate of destruction) от подрядчика.
- **Data retention** — сколько хранить по закону/политике, прежде чем удалить.
> Если диск SSD — degaussing не работает; используй crypto erase/secure erase или уничтожение.`,
cards:['Asset inventory|Учёт всех активов','Enumeration|Автоматическое обнаружение устройств','Asset owner|Ответственный за актив','Sanitization|Удаление данных без возможности восстановления','Degaussing|Размагничивание (только HDD/ленты, не SSD)','Crypto erase|Уничтожение ключа шифрования — данные нечитаемы','Certificate of destruction|Документ, подтверждающий уничтожение','Data retention|Срок хранения данных','Procurement|Закупка'],
quiz:[
['Which method will NOT effectively sanitize an SSD?',['Crypto erase','Physical shredding','Degaussing','Secure erase command'],2,'Degaussing affects magnetic media only.'],
['A third party destroys drives. What proves it was done?',['Certificate of destruction','SLA','Chain of custody form only','NDA'],0,'A certificate of destruction documents disposal.'],
['Automatically discovering all devices on the network is called:',['Enumeration','Classification','Attestation','Sanitization'],0,'Enumeration finds assets.'],
['Who is accountable for the protection of a specific asset?',['Asset owner','Auditor','End user','Vendor'],0,'The owner is accountable.'],
['How long financial records must be kept is defined by:',['Data retention policy','AUP','SLA','Hashing'],0,'Retention rules.']]},

{c:16,d:4,obj:'4.3',t:'Vulnerability Management',ru:'Управление уязвимостями',md:`
## Identification
- **Vulnerability scan** — credentialed (с логином, глубже) vs non-credentialed (как внешний атакующий); intrusive vs non-intrusive.
- **Application security**: **static analysis (SAST)** — код без запуска; **dynamic analysis (DAST)** — запущенное приложение, fuzzing; **package monitoring** — уязвимые библиотеки (SCA).
- **Threat feeds**: OSINT, proprietary/third-party, **ISAC** (information-sharing organizations), **dark web**.
- **Penetration testing**, **responsible disclosure program**, **bug bounty**, system/process audit.
## Analysis
- **Confirmation**: false positive (тревога без уязвимости), false negative (уязвимость не найдена — опаснее).
- **Prioritize**: **CVSS** (0–10 оценка), **CVE** (идентификатор), classification, **exposure factor**, environmental variables, industry/organizational impact, **risk tolerance**.
## Response / remediation
**Patching**, **insurance** (передача), **segmentation**, **compensating controls**, **exceptions/exemptions** (официальное принятие риска).
## Validation
**Rescanning**, audit, verification — проверить, что исправлено.
## Reporting
Отчёт руководству: что найдено, исправлено, принято.`,
cards:['Credentialed scan|Скан с учётными данными — видит больше','Non-credentialed scan|Скан как внешний атакующий','SAST|Статический анализ кода','DAST|Динамический анализ запущенного приложения','Fuzzing|Подача случайных/неправильных данных для поиска сбоев','Package monitoring (SCA)|Отслеживание уязвимых библиотек','ISAC|Отраслевой центр обмена информацией об угрозах','Bug bounty|Вознаграждение исследователям за найденные уязвимости','Responsible disclosure|Сообщение об уязвимости вендору до публикации','CVE|Идентификатор уязвимости','CVSS|Оценка серьёзности 0–10','False positive|Сообщение об уязвимости, которой нет','False negative|Пропущенная реальная уязвимость','Exception / exemption|Официальное принятие нерешённой уязвимости','Rescan|Повторный скан для подтверждения исправления'],
quiz:[
['Which scan gives the MOST accurate view of missing patches on a server?',['Non-credentialed scan','Credentialed scan','Port scan','Ping sweep'],1,'Credentialed scans can inspect installed software.'],
['A scanner reports a vulnerability that does not exist. This is a:',['True positive','False positive','False negative','True negative'],1,'False positive.'],
['Which standard provides a 0–10 severity score?',['CVE','CVSS','SCAP','STIX'],1,'Common Vulnerability Scoring System.'],
['After applying patches, how do you validate remediation?',['Rescan','Delete logs','Issue an exemption','Buy insurance'],0,'Rescanning confirms the fix.'],
['Sending random malformed input to a running application to find crashes is:',['SAST','Fuzzing','Code signing','Package monitoring'],1,'Fuzzing is dynamic testing.'],
['A company pays outside researchers who report flaws in its website. This is a:',['Bug bounty program','Penetration test','Tabletop exercise','Threat feed'],0,'Bug bounty.']]},

{c:17,d:4,obj:'4.4',t:'Security Alerting and Monitoring',ru:'Мониторинг и оповещения',md:`
## Что мониторим
Systems, applications, infrastructure.
## Действия
- **Log aggregation** — сбор логов в одно место.
- **Alerting**, **scanning**, **reporting**, **archiving** (хранение для расследований/закона).
- **Alert response**: **quarantine** (изоляция), **alert tuning** (настройка правил, чтобы меньше ложных срабатываний), validation.
## Инструменты
| Инструмент | Для чего |
| SIEM | сбор и корреляция логов, алерты (Splunk, Wazuh) |
| SCAP | стандарт автоматической проверки конфигураций (XCCDF, OVAL) |
| Benchmarks | CIS benchmarks — эталонные настройки |
| Agent / agentless | с установкой агента или через сеть/API |
| Antivirus / EDR | защита конечных устройств |
| DLP | предотвращение утечки данных |
| SNMP traps | устройство само шлёт сообщение о событии менеджеру |
| NetFlow | метаданные трафика: кто, с кем, сколько (без содержимого) |
| Vulnerability scanner | поиск уязвимостей |
> Слишком много ложных алертов → alert tuning.`,
cards:['Log aggregation|Сбор логов из разных источников в одно место','SIEM|Сбор, корреляция и анализ событий безопасности','SCAP|Security Content Automation Protocol — автоматическая проверка соответствия','CIS Benchmark|Эталонная безопасная конфигурация от CIS','SNMP trap|Сообщение от устройства о событии','NetFlow|Метаданные сетевых потоков','Alert tuning|Настройка правил для снижения ложных срабатываний','Quarantine|Изоляция подозрительного файла/устройства','Agentless|Мониторинг без установки агента','Archiving|Долгосрочное хранение логов'],
quiz:[
['Analysts are overwhelmed by false positives. What should they do?',['Disable the SIEM','Tune the alerts','Delete logs','Add more sensors'],1,'Alert tuning reduces noise.'],
['Which tool shows who talked to whom and how much data was sent, without payload?',['NetFlow','Packet capture','SNMP trap','DLP'],0,'NetFlow collects flow metadata.'],
['Which protocol standard automates checking systems against security configuration baselines?',['SCAP','SNMP','SMTP','SAML'],0,'SCAP.'],
['A router sends an unsolicited message to the management station when an interface goes down. This is:',['SNMP trap','Syslog pull','NetFlow export','Heartbeat'],0,'SNMP traps are sent by the agent.'],
['Which system correlates events from firewalls, servers and endpoints?',['SIEM','UTM','NAC','HSM'],0,'SIEM.']]},

{c:18,d:4,obj:'4.5',t:'Enterprise Security Capabilities',ru:'Средства защиты предприятия',md:`
## Firewall
Rules, access lists, ports/protocols, **screened subnets**. Правила читаются сверху вниз, в конце — **implicit deny**.
## IDS/IPS
**Signatures** (известные атаки), **trends/anomaly** (отклонения).
## Web filter
Agent-based или **centralized proxy**; URL scanning, **content categorization** (блок «азартные игры»), block rules, **reputation**.
## OS security
**Group Policy** (Windows, централизованные настройки), **SELinux** (Linux, mandatory access control).
## Защищённые протоколы
Выбор протокола, порта и транспорта: SSH вместо Telnet, SFTP вместо FTP, HTTPS вместо HTTP, LDAPS вместо LDAP, SNMPv3 вместо v1/v2.
## DNS filtering
Блокировка вредоносных доменов на уровне DNS.
## Email security
| | Что делает |
| SPF | список серверов, которые могут слать почту от домена (DNS TXT) |
| DKIM | цифровая подпись письма (подлинность и целостность) |
| DMARC | политика: что делать, если SPF/DKIM не прошли (none/quarantine/reject) + отчёты |
| Gateway | фильтр почты: спам, вложения |
## Другое
**FIM** (File Integrity Monitoring), **DLP**, **NAC** (проверка устройства перед доступом в сеть), **EDR/XDR**, **UBA/UEBA** (анализ поведения пользователей).`,
cards:['Implicit deny|Всё, что не разрешено правилами, запрещено','Content categorization|Блокировка сайтов по категориям','Group Policy|Централизованные настройки Windows','SELinux|Мандатный контроль доступа в Linux','SPF|Список серверов, имеющих право отправлять почту домена','DKIM|Цифровая подпись email','DMARC|Политика обработки писем, не прошедших SPF/DKIM','DNS filtering|Блокировка вредоносных доменов через DNS','FIM|File Integrity Monitoring — контроль изменений файлов','NAC|Network Access Control — проверка устройства перед подключением','XDR|Extended Detection and Response — EDR + сеть + облако','UEBA|User and Entity Behavior Analytics','SNMPv3|Версия SNMP с шифрованием и аутентификацией'],
quiz:[
['Which email record tells receivers what to do when SPF and DKIM checks fail?',['SPF','DKIM','DMARC','MX'],2,'DMARC defines the policy and reporting.'],
['Which mechanism adds a digital signature to outgoing email?',['SPF','DKIM','DMARC','S/MIME gateway'],1,'DKIM signs messages.'],
['Which is the secure replacement for Telnet?',['FTP','SSH','SNMPv1','HTTP'],1,'SSH encrypts remote sessions.'],
['Unauthorized changes to system files must be detected. Which tool?',['FIM','DNS filtering','NAC','Web filter'],0,'File Integrity Monitoring.'],
['Laptops without current antivirus must be blocked from joining the LAN. Which technology?',['NAC','DLP','SIEM','WAF'],0,'NAC checks posture before access.'],
['A user suddenly downloads 50 GB at 3 a.m., unlike their normal pattern. Which tool flags this?',['UEBA','SPF','FIM','Group Policy'],0,'User behavior analytics detects anomalies.']]},

{c:19,d:4,obj:'4.6',t:'Identity and Access Management',ru:'Управление идентификацией и доступом',md:`
## Жизненный цикл
**Provisioning / de-provisioning** (создать/удалить учётку), permission assignments, **identity proofing** (проверить, что человек тот, кем себя называет), **attestation** (регулярное подтверждение прав руководителем).
## Federation и SSO
- **SSO** — один вход для многих систем.
- **LDAP** — каталог (Active Directory). **LDAPS** — защищённый.
- **SAML** — XML, обмен утверждениями между IdP и SP (корпоративный SSO в веб).
- **OAuth** — **авторизация** (дать приложению доступ к ресурсу без пароля). **OpenID Connect** = аутентификация поверх OAuth.
- **Federation** — доверие между организациями.
## Модели доступа
| Модель | Кто решает |
| MAC | система по меткам (Top Secret) — военные |
| DAC | владелец ресурса (права на файлы) |
| RBAC | по роли/должности |
| Rule-based | по правилам (firewall, время) |
| ABAC | по атрибутам (отдел, место, устройство) |
+ **time-of-day restrictions**, **least privilege**.
## MFA
Факторы: **something you know** (пароль, PIN), **have** (токен, телефон, smart card), **are** (биометрия), **somewhere you are** (геолокация). Два пароля — это НЕ MFA (один фактор).
Реализации: biometrics, **hard/soft tokens** (HOTP/TOTP), **security keys** (FIDO2).
## Пароли
Длина > сложность, без повторного использования, expiration/age, **password managers**, **passwordless** (FIDO2, passkeys).
## PAM
**Just-in-time permissions** (права на время), **password vaulting** (сейф паролей админов), **ephemeral credentials** (одноразовые учётные данные).`,
cards:['Provisioning|Создание учётной записи и прав','De-provisioning|Удаление/отключение учётки (увольнение)','Identity proofing|Проверка реальной личности перед выдачей учётки','Attestation|Периодическое подтверждение прав доступа','SAML|XML-стандарт для SSO между IdP и SP','OAuth|Стандарт делегированной авторизации','OpenID Connect|Аутентификация поверх OAuth 2.0','LDAP|Протокол доступа к каталогу (389; LDAPS 636)','MAC|Mandatory Access Control — по меткам','DAC|Discretionary Access Control — решает владелец','RBAC|Role-Based Access Control','ABAC|Attribute-Based Access Control','Rule-based access control|Доступ по правилам (ACL, время)','TOTP|Одноразовый пароль, зависящий от времени','HOTP|Одноразовый пароль на основе счётчика','FIDO2 / security key|Аппаратный ключ, беспарольный вход','Just-in-time access|Временные привилегии только на нужный срок','Password vaulting|Сейф для привилегированных паролей','Ephemeral credentials|Кратковременные одноразовые учётные данные','Federation|Доверие идентичностей между организациями'],
quiz:[
['A user logs in with a password and a PIN. How many authentication factors are used?',['One','Two','Three','Zero'],0,'Both are something you know, so it is single-factor.'],
['An app gets permission to read your calendar without receiving your password. Which protocol?',['SAML','OAuth','LDAP','Kerberos'],1,'OAuth is delegated authorization.'],
['Access based on job title such as "Nurse" or "Accountant" is:',['MAC','DAC','RBAC','ABAC'],2,'Role-Based Access Control.'],
['Classified documents labeled Secret can only be read by users with Secret clearance. Model?',['MAC','DAC','RBAC','Rule-based'],0,'Mandatory Access Control uses labels.'],
['Admins receive privileged rights for only 2 hours when approved. This is:',['Password vaulting','Just-in-time permissions','Federation','SSO'],1,'JIT privileged access.'],
['Managers quarterly confirm their staff still need their access. This is:',['Attestation','Provisioning','Identity proofing','Federation'],0,'Access attestation/recertification.'],
['Which XML-based standard enables web SSO between an identity provider and a service provider?',['OAuth','SAML','RADIUS','TACACS+'],1,'SAML.']]},

{c:20,d:4,obj:'4.7',t:'Automation and Orchestration',ru:'Автоматизация и оркестрация',md:`
## Use cases
User provisioning, resource provisioning, **guard rails** (автоматические ограничения, напр. запрет публичных бакетов), security groups, ticket creation, **escalation**, enabling/disabling services and access, **continuous integration and testing (CI/CD)**, integrations and **APIs**.
## Benefits
Efficiency/time saving, **enforcing baselines**, standard infrastructure configurations, **scaling** securely, **employee retention** (меньше рутины), **reaction time** (быстрее реагирование), **workforce multiplier**.
## Other considerations (минусы)
**Complexity**, **cost**, **single point of failure**, **technical debt**, **ongoing supportability**.
> **SOAR** — платформа, автоматически выполняющая playbook-и реагирования (напр. заблокировать IP, создать тикет).`,
cards:['Guard rails|Автоматические ограничения, не дающие сделать небезопасное','SOAR|Security Orchestration, Automation and Response','CI/CD|Непрерывная интеграция и доставка кода','Workforce multiplier|Автоматизация увеличивает эффективность команды','Technical debt|Накопленные проблемы от быстрых/временных решений','Single point of failure|Один компонент, отказ которого ломает всё','API|Интерфейс для интеграции систем','Escalation|Передача инцидента на более высокий уровень'],
quiz:[
['Which is a DISADVANTAGE of security automation?',['Faster reaction time','Enforced baselines','It can create a single point of failure','Workforce multiplier'],2,'Automation can concentrate risk in one system.'],
['A cloud policy automatically prevents anyone from making a storage bucket public. This is a:',['Guard rail','Ticket','Honeypot','Exception'],0,'Guard rails prevent insecure actions.'],
['Which platform runs automated incident-response playbooks?',['SIEM','SOAR','NAC','DLP'],1,'SOAR orchestrates response.'],
['Automatically creating accounts when HR adds a new hire is:',['User provisioning','Escalation','Attestation','Sandboxing'],0,'Automated user provisioning.'],
['Automation reduces repetitive tasks, helping keep staff. This benefit is:',['Employee retention','Technical debt','Complexity','Cost'],0,'Employee retention.']]},

{c:21,d:4,obj:'4.8',t:'Incident Response',ru:'Реагирование на инциденты',md:`
## Процесс (по порядку!)
1. **Preparation** — план, команда, инструменты, обучение.
2. **Detection** — обнаружить событие.
3. **Analysis** — подтвердить инцидент, масштаб, приоритет.
4. **Containment** — сдержать (изолировать хост, заблокировать учётку).
5. **Eradication** — удалить причину (malware, бэкдор).
6. **Recovery** — восстановить системы, мониторить.
7. **Lessons learned** — разбор, улучшения.
## Training и testing
**Tabletop exercise**, **simulation**.
## Root cause analysis
Найти первопричину, а не только симптомы.
## Threat hunting
Проактивный поиск угроз, которых не заметили автоматические системы.
## Digital forensics
- **Legal hold** — запрет удалять данные, связанные с судом.
- **Chain of custody** — документ: кто, когда, где держал улику.
- **Acquisition** — снятие образа (с хешем для доказательства целостности); **order of volatility**: CPU cache/регистры → RAM → swap → диск → удалённые логи → бэкапы.
- **Preservation**, **reporting**, **e-discovery** (поиск электронных доказательств для суда).
> Порядок этапов — самый частый вопрос. Containment идёт ДО eradication.`,
cards:['Preparation|1-й этап IR: план, команда, инструменты','Detection|Обнаружение события','Analysis|Подтверждение и оценка инцидента','Containment|Сдерживание: ограничить распространение','Eradication|Устранение причины (удаление malware)','Recovery|Восстановление систем','Lessons learned|Разбор после инцидента','Root cause analysis|Поиск первопричины','Threat hunting|Проактивный поиск скрытых угроз','Legal hold|Обязательство сохранить данные для суда','Chain of custody|Документирование обращения с уликами','Order of volatility|Порядок сбора: от самых изменчивых (RAM) к стабильным','E-discovery|Поиск электронных доказательств для суда','Acquisition|Получение копии/образа доказательств'],
quiz:[
['Which incident response phase comes immediately AFTER containment?',['Analysis','Eradication','Recovery','Lessons learned'],1,'Containment → eradication → recovery.'],
['Which should be collected FIRST according to order of volatility?',['Hard drive','RAM','Backups','Archived logs'],1,'RAM is more volatile than disk.'],
['A form recording every person who handled a seized laptop is the:',['Legal hold','Chain of custody','SLA','Incident report'],1,'Chain of custody.'],
['Lawyers instruct IT not to delete emails related to a lawsuit. This is a:',['Legal hold','E-discovery','Retention exception','Containment'],0,'Legal hold preserves data.'],
['Analysts proactively search logs for signs of an attacker not caught by alerts. This is:',['Threat hunting','Tabletop','Vulnerability scanning','Recovery'],0,'Threat hunting.'],
['Disconnecting an infected server from the network is part of:',['Preparation','Containment','Eradication','Lessons learned'],1,'Isolation is containment.'],
['Creating the incident response plan and training the team belongs to:',['Preparation','Detection','Recovery','Analysis'],0,'Preparation.']]},

{c:22,d:4,obj:'4.9',t:'Data Sources for Investigations',ru:'Источники данных для расследований',md:`
## Log data
| Лог | Что покажет |
| Firewall | разрешённые/заблокированные соединения, IP, порты |
| Application | ошибки, входы в приложение, действия пользователей |
| Endpoint | процессы, установка ПО, события EDR |
| OS-specific security | входы/выходы, изменения прав (Windows Event 4624/4625, Linux auth.log) |
| IPS/IDS | сработавшие сигнатуры атак |
| Network | DHCP, DNS, прокси, NetFlow |
| Metadata | «данные о данных»: заголовки email, EXIF фото, время создания файла |
## Другие источники
- **Vulnerability scans** — была ли система уязвима.
- **Automated reports**, **dashboards** — общая картина.
- **Packet captures (pcap)** — полное содержимое трафика (Wireshark) — самая детальная информация.
> Нужен «полный контент сообщения в сети» → packet capture. Нужно «кто и когда вошёл» → OS security log.`,
cards:['Firewall log|Разрешённые/заблокированные соединения','Application log|События конкретного приложения','Endpoint log|Процессы и события на устройстве','OS security log|Входы, выходы, изменения прав','Metadata|Данные о данных (заголовки, EXIF, время)','Packet capture|Полная запись сетевого трафика (pcap)','Dashboard|Визуальная сводка событий','Windows Event 4625|Неудачная попытка входа'],
quiz:[
['An analyst needs the full contents of suspicious network traffic. Which source?',['NetFlow','Packet capture','Firewall log','Dashboard'],1,'Packet captures include payloads.'],
['Which data source shows the true sender path of a phishing email?',['Email header metadata','Firewall log','Vulnerability scan','EDR dashboard'],0,'Email headers are metadata.'],
['Which log shows repeated failed logons on a Windows server?',['Application log','OS security log','IPS log','DNS log'],1,'Security event log (e.g., 4625).'],
['To determine whether a breached server had a known unpatched flaw, check:',['Vulnerability scan results','DHCP logs','Packet capture','Badge logs'],0,'Vulnerability scans show exposure.'],
['Which log shows that traffic to port 3389 was blocked?',['Firewall log','Application log','Metadata','Endpoint log'],0,'Firewall logs record allow/deny.']]}
);
