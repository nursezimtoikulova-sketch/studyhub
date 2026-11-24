// Security+ SY0-701 — Domain 5 (chapters 23–28). Own summaries; quizzes in English.
SP.push(
{c:23,d:5,obj:'5.1',t:'Security Governance',ru:'Управление безопасностью (governance)',md:`
## Иерархия документов
| Документ | Суть | Обязателен? |
| Policy | общее «что и зачем» (утверждает руководство) | да |
| Standard | конкретные требования (пароль ≥ 14 символов, AES-256) | да |
| Procedure | пошаговое «как» | да |
| Guideline | рекомендация | нет |
## Политики
**AUP** (Acceptable Use Policy — что можно делать с IT компании), information security policy, business continuity, disaster recovery, incident response, **SDLC** (безопасная разработка), change management.
## Стандарты
Password, access control, physical security, encryption.
## Процедуры
Change management, **onboarding/offboarding** (выдать/забрать доступы и оборудование), **playbooks**.
## Внешние факторы
Regulatory, legal, industry, local/regional, national, global.
## Структуры управления
Boards, committees, government entities, centralized vs decentralized.
## Роли по данным
| Роль | Обязанность |
| Owner | руководитель, отвечает за данные, решает классификацию |
| Controller | определяет цели и способы обработки (GDPR) |
| Processor | обрабатывает данные по поручению controller |
| Custodian / steward | технически хранит и защищает (IT, бэкапы) |`,
cards:['Policy|Общий документ руководства «что и зачем»','Standard|Обязательные конкретные требования','Procedure|Пошаговая инструкция «как»','Guideline|Необязательная рекомендация','AUP|Acceptable Use Policy — правила использования IT','SDLC|Software Development Life Cycle','Onboarding|Процесс приёма сотрудника (доступы, обучение)','Offboarding|Процесс увольнения (отзыв доступов)','Playbook|Пошаговый сценарий реагирования','Data owner|Руководитель, отвечающий за данные и классификацию','Data controller|Определяет цели и способы обработки данных','Data processor|Обрабатывает данные по поручению controller','Data custodian|Технически хранит и защищает данные'],
quiz:[
['A document stating "All laptops must use AES-256 full-disk encryption" is a:',['Policy','Standard','Guideline','Procedure'],1,'Specific mandatory requirement = standard.'],
['Employees must sign a document describing allowed use of company email and internet. This is the:',['AUP','NDA','SLA','MOU'],0,'Acceptable Use Policy.'],
['Who decides the classification level of a dataset?',['Data custodian','Data owner','Data processor','End user'],1,'The owner classifies data.'],
['A payroll company processes salaries on behalf of a client. Under GDPR the payroll company is the:',['Controller','Processor','Owner','Steward'],1,'It processes data on behalf of the controller.'],
['Revoking accounts and collecting badges on an employee’s last day is part of:',['Onboarding','Offboarding','Attestation','Provisioning'],1,'Offboarding.'],
['Which document is NOT mandatory?',['Policy','Standard','Procedure','Guideline'],3,'Guidelines are recommendations.']]},

{c:24,d:5,obj:'5.2',t:'Risk Management',ru:'Управление рисками',md:`
## Процесс
Identification → assessment → analysis → treatment → monitoring/reporting.
Assessment: **ad hoc**, **recurring**, **one-time**, **continuous**.
## Анализ
- **Qualitative** — High/Medium/Low (матрица вероятность × влияние).
- **Quantitative** — в деньгах:
| Формула | Значение |
| SLE = AV × EF | Single Loss Expectancy — ущерб от одного события |
| ALE = SLE × ARO | Annualized Loss Expectancy — ущерб в год |
| ARO | сколько раз в год (0.5 = раз в 2 года) |
| EF | exposure factor — доля потери (0–100%) |
Пример: сервер 100 000 $, EF 40% → SLE 40 000 $; ARO 0.25 → ALE 10 000 $/год. Контроль дороже ALE — невыгоден.
## Risk register
Список рисков: **risk owner**, **KRI** (key risk indicators), **risk threshold**.
## Отношение к риску
- **Risk appetite**: expansionary (готовы рисковать ради роста), conservative, neutral.
- **Risk tolerance** — допустимое отклонение.
## Стратегии
| Стратегия | Пример |
| Mitigate | поставить firewall, патчи |
| Transfer | страховка, аутсорс |
| Avoid | отказаться от рискованной деятельности |
| Accept | принять (exception/exemption), если дешевле |
## BIA (Business Impact Analysis)
- **RTO** — за сколько восстановить систему.
- **RPO** — сколько данных можно потерять (время с последнего бэкапа).
- **MTTR** — среднее время ремонта.
- **MTBF** — среднее время между отказами (надёжность).`,
cards:['SLE|Single Loss Expectancy = AV × EF','ALE|Annualized Loss Expectancy = SLE × ARO','ARO|Annualized Rate of Occurrence — частота в год','EF|Exposure Factor — доля потери актива','AV|Asset Value — стоимость актива','Qualitative analysis|Оценка рисков уровнями (High/Medium/Low)','Quantitative analysis|Оценка рисков в деньгах','Risk register|Реестр рисков с владельцами и статусом','KRI|Key Risk Indicator — ключевой индикатор риска','Risk appetite|Сколько риска организация готова принять','Risk tolerance|Допустимое отклонение от appetite','Risk mitigation|Снижение риска мерами защиты','Risk transfer|Передача риска (страховка)','Risk avoidance|Отказ от рискованной деятельности','Risk acceptance|Принятие риска','RTO|Recovery Time Objective — время восстановления','RPO|Recovery Point Objective — допустимая потеря данных','MTTR|Mean Time To Repair','MTBF|Mean Time Between Failures','BIA|Business Impact Analysis'],
quiz:[
['An asset is worth $200,000 and the exposure factor is 25%. What is the SLE?',['$25,000','$50,000','$75,000','$200,000'],1,'SLE = AV x EF = 200,000 x 0.25 = 50,000.'],
['SLE is $50,000 and the event happens once every four years. What is the ALE?',['$12,500','$50,000','$200,000','$25,000'],0,'ARO = 0.25; ALE = 50,000 x 0.25 = 12,500.'],
['Buying cyber insurance is which risk strategy?',['Accept','Avoid','Transfer','Mitigate'],2,'Insurance transfers financial risk.'],
['A company stops offering a risky service entirely. Strategy?',['Avoid','Transfer','Accept','Mitigate'],0,'Avoidance.'],
['The business can lose at most 2 hours of data. This defines the:',['RTO','RPO','MTTR','MTBF'],1,'RPO is the acceptable data loss.'],
['The system must be back online within 4 hours. This defines the:',['RTO','RPO','MTBF','ARO'],0,'RTO is the restoration time.'],
['Rating risks as High, Medium or Low is:',['Quantitative','Qualitative','Continuous','Inherent'],1,'Qualitative analysis.'],
['Which metric measures reliability of a component?',['MTTR','MTBF','RPO','SLE'],1,'Mean Time Between Failures.']]},

{c:25,d:5,obj:'5.3',t:'Third-Party Risk Management',ru:'Риски третьих сторон',md:`
## Оценка поставщика (vendor assessment)
Penetration testing, **right-to-audit clause** (право проверять поставщика), evidence of internal audits, **independent assessments** (SOC 2, ISO 27001), **supply chain analysis**.
## Выбор
**Due diligence** (проверка перед контрактом), **conflict of interest**.
## Типы соглашений
| Соглашение | Суть |
| SLA | уровень услуг: uptime 99.9%, время реакции |
| MOU / MOA | меморандум о взаимопонимании / соглашении (MOA строже) |
| MSA | Master Service Agreement — общие условия для будущих работ |
| SOW / WO | Statement of Work / Work Order — конкретная работа, сроки, результат |
| NDA | неразглашение |
| BPA | Business Partners Agreement — партнёрство, доли, обязанности |
## Мониторинг
**Vendor monitoring**, **questionnaires** (анкеты безопасности), **rules of engagement** (что разрешено при тестах/работе).`,
cards:['Right-to-audit clause|Пункт договора, дающий право проверять поставщика','Due diligence|Тщательная проверка перед решением','SLA|Service Level Agreement — гарантированный уровень услуг','MOU|Memorandum of Understanding — неформальное соглашение','MOA|Memorandum of Agreement — более формальное соглашение','MSA|Master Service Agreement — общие условия сотрудничества','SOW|Statement of Work — описание конкретной работы','NDA|Non-Disclosure Agreement — неразглашение','BPA|Business Partners Agreement','Vendor questionnaire|Анкета по безопасности для поставщика','Supply chain analysis|Оценка рисков цепочки поставок','Rules of engagement|Правила и рамки проведения работ/тестов'],
quiz:[
['Which agreement guarantees 99.9% uptime and defines penalties?',['NDA','SLA','MOU','BPA'],1,'Service Level Agreement.'],
['Which contract clause allows a company to inspect a vendor’s security controls?',['Right-to-audit clause','Non-compete clause','Indemnity clause','Force majeure'],0,'Right-to-audit.'],
['A document describing specific deliverables and timelines for one project under an existing MSA is a:',['SOW','MOU','NDA','SLA'],0,'Statement of Work.'],
['Researching a vendor’s financial stability and security history before signing is:',['Due diligence','Due care','Attestation','Escalation'],0,'Due diligence.'],
['Which agreement protects confidential information shared with a contractor?',['NDA','BPA','SLA','MSA'],0,'Non-Disclosure Agreement.']]},

{c:26,d:5,obj:'5.4',t:'Security Compliance',ru:'Соответствие требованиям',md:`
## Отчётность
**Internal** (руководству) и **external** (регуляторам).
## Последствия несоответствия
Fines (штрафы), sanctions, reputational damage, **loss of license**, contractual impacts.
## Мониторинг
**Due diligence / due care** (проверить / действовать ответственно), **attestation and acknowledgement** (подтверждение и подпись), internal/external, **automation**.
## Privacy
- Законы: local/regional, national, global (**GDPR** — ЕС).
- **Data subject** — человек, чьи данные.
- **Controller vs processor**.
- **Ownership**, **data inventory and retention**.
- **Right to be forgotten** — право потребовать удалить свои данные (GDPR).
## Важные регуляции/стандарты (для ориентира)
| Название | Область |
| GDPR | персональные данные жителей ЕС |
| HIPAA | медицинские данные (США) |
| PCI DSS | данные платёжных карт |
| SOX | финансовая отчётность публичных компаний (США) |
| ISO 27001 | система управления ИБ |
| NIST CSF | фреймворк кибербезопасности |`,
cards:['Due care|Действовать ответственно для защиты (выполнять меры)','Attestation|Формальное подтверждение соответствия','Data subject|Человек, к которому относятся персональные данные','Right to be forgotten|Право требовать удаления своих данных','GDPR|Регламент ЕС о защите персональных данных','HIPAA|Закон США о медицинских данных','PCI DSS|Стандарт защиты данных платёжных карт','SOX|Закон США о финансовой отчётности','ISO 27001|Стандарт системы управления ИБ','Loss of license|Лишение лицензии из-за несоответствия'],
quiz:[
['A merchant that stores credit card numbers must comply with:',['HIPAA','PCI DSS','SOX','FERPA'],1,'PCI DSS covers cardholder data.'],
['A customer asks an EU company to erase all of their personal data. This right is:',['Right to be forgotten','Legal hold','Data sovereignty','Attestation'],0,'GDPR right to erasure.'],
['The person whose personal data is processed is the:',['Data controller','Data subject','Data custodian','Data processor'],1,'Data subject.'],
['Which is a consequence of non-compliance?',['Fines and sanctions','Lower ALE','Faster RTO','Improved SLA'],0,'Fines, sanctions, reputational damage, loss of license.'],
['Employees sign that they have read the security policy each year. This is:',['Acknowledgement/attestation','Onboarding','Due diligence','Exemption'],0,'Attestation and acknowledgement.']]},

{c:27,d:5,obj:'5.5',t:'Audits and Assessments',ru:'Аудиты и оценки',md:`
## Attestation
Независимое подтверждение (например, отчёт SOC 2).
## Internal
Compliance, **audit committee**, **self-assessments**.
## External
Regulatory, examinations, assessment, **independent third-party audit**.
## Penetration testing
| Тип | Суть |
| Physical | проникнуть в здание |
| Offensive (red team) | атакуют |
| Defensive (blue team) | защищаются |
| Integrated (purple) | совместная работа |
| Known environment (white box) | тестер знает всё |
| Partially known (gray box) | частичная информация |
| Unknown environment (black box) | ничего не знает, как внешний атакующий |
## Reconnaissance
- **Passive** — без контакта с целью (OSINT, WHOIS, соцсети).
- **Active** — прямое взаимодействие (nmap-скан, баннеры).
> Перед пентестом обязательны **rules of engagement** и письменное разрешение.`,
cards:['Known environment test|White box — тестер знает всё о системе','Partially known environment|Gray box — частичная информация','Unknown environment test|Black box — без информации','Passive reconnaissance|Сбор данных без контакта с целью (OSINT)','Active reconnaissance|Прямое взаимодействие с целью (сканирование)','Red team|Атакующая команда','Blue team|Защищающаяся команда','Purple team|Совместная работа red и blue','Audit committee|Комитет, контролирующий аудит','Self-assessment|Самооценка организацией','Independent third-party audit|Аудит внешней независимой стороной'],
quiz:[
['Testers receive network diagrams and source code before testing. This is a:',['Unknown environment test','Known environment test','Partially known environment test','Passive test'],1,'Known environment (white box).'],
['Searching LinkedIn and WHOIS records about the target is:',['Active reconnaissance','Passive reconnaissance','Exploitation','Pivoting'],1,'No direct contact with the target = passive.'],
['Running Nmap against the target’s public IP range is:',['Passive reconnaissance','Active reconnaissance','OSINT','Attestation'],1,'Scanning interacts with the target.'],
['Red and blue teams work together and share findings in real time. This is:',['Purple team / integrated','Physical test','Offensive only','Audit committee'],0,'Integrated (purple) testing.'],
['What MUST exist before a penetration test starts?',['Bug bounty','Signed authorization and rules of engagement','SOC 2 report','Insurance'],1,'Written permission and rules of engagement.']]},

{c:28,d:5,obj:'5.6',t:'Security Awareness',ru:'Программа осведомлённости',md:`
## Phishing
**Campaigns** (учебные фишинговые рассылки), **recognizing attempts** (признаки: срочность, странный отправитель, ссылка не совпадает), **responding to reported suspicious messages** (кнопка «сообщить о фишинге»).
## Anomalous behavior
**Risky** (обход политик), **unexpected** (необычное время/объём), **unintentional** (ошибка по незнанию).
## Обучение
Policy/handbooks, **situational awareness**, **insider threat**, password management, **removable media and cables** (чужие USB и кабели могут быть вредоносными), social engineering, **operational security (OPSEC)**, **hybrid/remote work** (домашний Wi-Fi, VPN, блокировка экрана).
## Reporting and monitoring
**Initial** (базовое обучение) и **recurring** (регулярное); метрики: % кликов в тестовом фишинге, % сообщивших.
## Development и execution
Создать программу → провести → измерить → улучшить.`,
cards:['Phishing campaign|Учебная фишинговая рассылка для проверки сотрудников','Situational awareness|Внимание к окружению и подозрительным ситуациям','OPSEC|Operational Security — не раскрывать лишнюю информацию','Removable media risk|Найденные USB/кабели могут содержать вредонос','Recurring training|Регулярное повторное обучение','Unintentional behavior|Ошибка сотрудника без злого умысла','Risky behavior|Сознательный обход правил','Click rate|Доля сотрудников, кликнувших в тестовом фишинге'],
quiz:[
['Which metric BEST shows a phishing awareness program is working?',['Number of firewall rules','Decreasing click rate in simulated phishing','More antivirus alerts','Higher ALE'],1,'Lower click rates and higher report rates show improvement.'],
['An employee posts a photo of their desk showing a password sticky note. Training should focus on:',['OPSEC','RAID','PKI','SDN'],0,'Operational security.'],
['A user finds a charging cable in the lobby and plugs it into a laptop. Which training topic applies?',['Removable media and cables','Data sovereignty','Change management','Asset disposal'],0,'Malicious cables/USB.'],
['What should users do when they receive a suspicious email?',['Forward it to coworkers','Report it via the official process','Reply to verify','Delete the mailbox'],1,'Report suspicious messages.'],
['Training given to every new hire before system access is:',['Initial training','Recurring training','Tabletop','Attestation'],0,'Initial training.']]}
);

// Extra drill data
window.SP_ACR = [['AES','Advanced Encryption Standard'],['ACL','Access Control List'],['ALE','Annualized Loss Expectancy'],['APT','Advanced Persistent Threat'],['ARO','Annualized Rate of Occurrence'],['BEC','Business Email Compromise'],['BIA','Business Impact Analysis'],['BYOD','Bring Your Own Device'],['CASB','Cloud Access Security Broker'],['CA','Certificate Authority'],['CRL','Certificate Revocation List'],['CSR','Certificate Signing Request'],['CVE','Common Vulnerabilities and Exposures'],['CVSS','Common Vulnerability Scoring System'],['COPE','Corporate-Owned, Personally Enabled'],['DAC','Discretionary Access Control'],['DKIM','DomainKeys Identified Mail'],['DLP','Data Loss Prevention'],['DMARC','Domain-based Message Authentication, Reporting and Conformance'],['DDoS','Distributed Denial of Service'],['EDR','Endpoint Detection and Response'],['FIM','File Integrity Monitoring'],['HIPS','Host-based Intrusion Prevention System'],['HSM','Hardware Security Module'],['IaC','Infrastructure as Code'],['IDS','Intrusion Detection System'],['IPS','Intrusion Prevention System'],['IoC','Indicator of Compromise'],['ISAC','Information Sharing and Analysis Center'],['KMS','Key Management System'],['MAC','Mandatory Access Control'],['MDM','Mobile Device Management'],['MFA','Multifactor Authentication'],['MOU','Memorandum of Understanding'],['MSA','Master Service Agreement'],['MTBF','Mean Time Between Failures'],['MTTR','Mean Time To Repair'],['NAC','Network Access Control'],['NDA','Non-Disclosure Agreement'],['NGFW','Next-Generation Firewall'],['OCSP','Online Certificate Status Protocol'],['OSINT','Open-Source Intelligence'],['PAM','Privileged Access Management'],['PBKDF2','Password-Based Key Derivation Function 2'],['PHI','Protected Health Information'],['PII','Personally Identifiable Information'],['PKI','Public Key Infrastructure'],['RADIUS','Remote Authentication Dial-In User Service'],['RBAC','Role-Based Access Control'],['RPO','Recovery Point Objective'],['RTO','Recovery Time Objective'],['RTOS','Real-Time Operating System'],['SAML','Security Assertion Markup Language'],['SASE','Secure Access Service Edge'],['SCADA','Supervisory Control and Data Acquisition'],['SCAP','Security Content Automation Protocol'],['SD-WAN','Software-Defined Wide Area Network'],['SDN','Software-Defined Networking'],['SIEM','Security Information and Event Management'],['SLA','Service-Level Agreement'],['SLE','Single Loss Expectancy'],['SOAR','Security Orchestration, Automation and Response'],['SOW','Statement of Work'],['SPF','Sender Policy Framework'],['SSO','Single Sign-On'],['TOTP','Time-based One-Time Password'],['TPM','Trusted Platform Module'],['UEBA','User and Entity Behavior Analytics'],['UTM','Unified Threat Management'],['VPN','Virtual Private Network'],['WAF','Web Application Firewall'],['WPA3','Wi-Fi Protected Access 3'],['XDR','Extended Detection and Response'],['XSS','Cross-Site Scripting'],['ZTNA','Zero Trust Network Access']];
// Scenario drills: which control type / IR phase
window.SP_SORT = [
 ['Control type',[['Firewall rule blocking port 23','Preventive'],['Sign: "Area under surveillance"','Deterrent'],['IDS alert','Detective'],['Restore from backup','Corrective'],['VLAN for unpatchable device','Compensating'],['Policy: lock screen when leaving','Directive'],['Log review','Detective'],['Door lock','Preventive'],['Applying a patch after an incident','Corrective'],['Login warning banner','Deterrent']]],
 ['IR phase',[['Build the IR plan and train staff','Preparation'],['SIEM alert fires','Detection'],['Determine scope and severity','Analysis'],['Disconnect infected host','Containment'],['Remove malware and backdoor accounts','Eradication'],['Restore systems from clean backup','Recovery'],['Post-incident review meeting','Lessons learned']]],
 ['Risk strategy',[['Buy cyber insurance','Transfer'],['Install a WAF','Mitigate'],['Stop selling in a risky country','Avoid'],['Formally document an exception','Accept'],['Outsource payment processing','Transfer'],['Apply patches','Mitigate']]],
 ['Access control model',[['Military clearance labels','MAC'],['File owner shares a folder','DAC'],['Permissions by job role','RBAC'],['Access only from managed device in office','ABAC'],['Firewall allows traffic 9am-5pm','Rule-based']]]
];
