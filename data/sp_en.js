// English theory for Security+ chapters (own summaries)
window.SP_EN = {
1:`A **control** is any measure that reduces risk. The exam asks for the **category** (how it is implemented) and the **type** (what it does).
## 4 categories
| Category | Meaning | Examples |
| Technical | implemented by technology | firewall, encryption, MFA, antivirus |
| Managerial | management documents and decisions | policies, risk assessments, planning |
| Operational | carried out by people day to day | guards, training, backup procedures |
| Physical | restricts physical access | locks, fences, turnstiles, cameras |
## 6 types
- **Preventive** — stops an incident: firewall rule, lock, MFA.
- **Deterrent** — discourages but does not stop: "CCTV in use" sign, login banner.
- **Detective** — identifies an event: IDS, logs, recorded video, audits.
- **Corrective** — fixes after the event: restore from backup, patch, AV removing malware.
- **Compensating** — alternative when the primary control is not possible: segmenting an unpatchable system.
- **Directive** — tells people what to do: policy, instruction "do not write down passwords".
> One control can have several types: a visible camera is detective and deterrent.
> Trick: a guard is an operational category, preventive/deterrent type.`,
2:`## CIA triad
- **Confidentiality** — only authorized parties see data (encryption, permissions).
- **Integrity** — data is not changed undetected (hashes, digital signatures).
- **Availability** — accessible when needed (redundancy, backups, DDoS protection).
**Non-repudiation** — a person cannot deny an action; a digital signature proves the author.
## AAA
- **Authentication** — who are you? (people and systems, e.g. device certificates)
- **Authorization** — what are you allowed to do? (access models)
- **Accounting** — what did you do? (logs)
## Gap analysis
Compare the current state with the desired state (NIST, ISO) → list of missing controls.
## Zero Trust — "never trust, always verify"
| Plane | Components |
| Control plane (decides) | Adaptive identity, Threat scope reduction, Policy-driven access control, **Policy Engine** (makes the decision), **Policy Administrator** (communicates it) |
| Data plane (enforces) | Implicit trust zones, Subject/System, **Policy Enforcement Point (PEP)** — allows or blocks |
## Physical security
- **Bollards** stop vehicles; **fencing** marks and protects the perimeter.
- **Access control vestibule** (mantrap) — two doors, prevents tailgating.
- Video surveillance, security guards, access badges, lighting.
- Sensors: **infrared** (heat), **pressure** (weight), **microwave**, **ultrasonic**.
## Deception and disruption
- **Honeypot** — fake decoy server; **honeynet** — network of honeypots.
- **Honeyfile** — decoy file ("passwords.xlsx"); access triggers an alert.
- **Honeytoken** — fake data/credential; its use reveals the attacker.`,
3:`Every change (patch, new firewall rule) can break a system or open a hole. Change management makes changes **controlled**.
## Business processes
- **Approval process** — the CAB (Change Advisory Board) approves.
- **Ownership** — a responsible owner; **stakeholders** — everyone affected.
- **Impact analysis** — what may break, what risks.
- **Test results** — test first in a test/staging environment.
- **Backout plan** — how to roll back if something fails.
- **Maintenance window** — agreed time for work (nights/weekends).
- **SOP** — standard operating procedure.
## Technical implications
- Update allow lists / deny lists.
- **Restricted activities** — do only what was approved (scope).
- **Downtime**, service restart, application restart — announce in advance.
- **Legacy applications** may not support the change.
- **Dependencies** — changing one service affects others.
## Documentation
Update network diagrams, policies and procedures; **version control** (Git) keeps the history of configs and code so you can roll back.
> "The change broke the service — what now?" → execute the backout plan.`,
4:`## Symmetric vs asymmetric
| | Symmetric | Asymmetric |
| Keys | one shared key | key pair: public + private |
| Speed | fast, for bulk data | slow |
| Examples | AES, 3DES, ChaCha20 | RSA, ECC, Diffie-Hellman |
| Problem | how to share the key | — |
**Key exchange**: Diffie-Hellman/ECDHE create a shared key over an open channel. In TLS: asymmetric for key exchange → symmetric for data.
Longer key = stronger (AES-256 > AES-128). ECC gives equal strength with shorter keys (good for mobile/IoT).
## Encryption levels
Full-disk (BitLocker), partition, volume, file, database, record (single fields), transport (TLS, IPSec, VPN).
## Tools
- **TPM** — chip on the motherboard that stores keys (BitLocker, secure boot).
- **HSM** — dedicated device for keys (banks, CAs).
- **KMS** — cloud key management.
- **Secure enclave** — isolated area of the processor.
- **Key escrow** — a trusted third party holds a copy of the key.
## Hashing and passwords
- **Hash** — one-way function (SHA-256) for integrity. MD5/SHA-1 are weak (collisions).
- **Salting** — random salt per password → identical passwords get different hashes; defeats rainbow tables.
- **Key stretching** — repeated hashing (PBKDF2, bcrypt) slows brute force.
- **Digital signature** = hash encrypted with the sender's **private key**; verified with the sender's **public key**.
## Obfuscation
**Steganography** (data hidden in an image), **tokenization** (replace with a token, e.g. card numbers), **data masking** (****1234).
## Blockchain
Distributed **open public ledger** — an immutable chain of blocks.
## Certificates and PKI
- A **CA** issues certificates; the **root of trust** is the root CA.
- **CSR** — certificate signing request (contains the public key).
- **Wildcard** *.example.com covers all subdomains; **SAN** lists several names.
- **Self-signed** — no trusted CA (internal testing); **third-party** — public CA.
- Revocation: **CRL** (list of revoked certs) and **OCSP** (real-time check); **OCSP stapling** — the server attaches the response.`,
5:`## Threat actors
| Actor | Resources / skill | Motivation |
| Nation-state | very high, APT (long and stealthy) | espionage, war, politics |
| Unskilled attacker (script kiddie) | low, ready-made tools | fun, fame |
| Hacktivist | medium | political/ideological beliefs (defacement, DDoS) |
| Insider threat | internal access | revenge, money, mistakes |
| Organized crime | high, business model | money (ransomware, card theft) |
| Shadow IT | not malicious, an employee | convenience: unapproved software/cloud |
## Attributes
- **Internal / external**.
- **Resources / funding**.
- **Level of sophistication / capability**.
## Motivations
Data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical/political beliefs, ethical (white hat, bug bounty), revenge, disruption/chaos, war.
> APT (Advanced Persistent Threat) almost always means nation-state; keyword: "long, hidden presence".`,
6:`A **threat vector** is the path an attack takes into a system. The **attack surface** is all possible entry points.
## Vectors
- **Message-based**: email, SMS, instant messaging (attachments, links).
- **Image-based** (malicious code/QR in an image), **file-based** (Office macros, PDFs).
- **Voice call** (vishing), **removable device** (USB left in the parking lot).
- **Vulnerable software**: client-based (needs an agent) vs **agentless**.
- **Unsupported systems** — end of life, no patches.
- **Unsecure networks**: wireless (open Wi-Fi), wired, Bluetooth.
- **Open service ports**, **default credentials** (admin/admin).
- **Supply chain**: MSPs (managed service providers), vendors, suppliers.
## Human vectors / social engineering
| Attack | Description |
| Phishing | mass fake emails |
| Vishing / Smishing | by phone / by SMS |
| Misinformation / disinformation | false info (accidental / deliberate) |
| Impersonation | pretending to be someone (IT, the boss) |
| BEC (Business Email Compromise) | "CEO" email asking for a money transfer |
| Pretexting | invented story to gain trust |
| Watering hole | infecting a site the victims often visit |
| Brand impersonation | fake site/email of a known brand |
| Typosquatting | misspelled domain: gooogle.com |
> Reduce the attack surface: close ports, remove unneeded software, change default credentials.`,
7:`## Application
- **Memory injection** — injecting code into a process's memory.
- **Buffer overflow** — writing past a buffer → code execution.
- **Race condition** — wrong order of operations; **TOC/TOU** (time-of-check/time-of-use): checked one thing, used something already changed.
- **Malicious update** — infected update (supply chain attack).
## Web
- **SQL injection (SQLi)** — ~' OR 1=1 --~ in an input field → database access. Defense: **parameterized queries**, input validation.
- **XSS** — injected JavaScript runs in other users' browsers. Stored (in the DB) / reflected (in a link). Defense: output encoding, CSP.
## Hardware / OS
- **Firmware** flaws, **end-of-life (EOL)** — no updates, **legacy** — outdated.
- OS-based — unpatched operating system.
## Virtualization
- **VM escape** — breaking out of a VM to the hypervisor/other VMs.
- **Resource reuse** — data left in reused memory/disk.
## Others
- **Cloud-specific** (wrong bucket permissions), **supply chain** (service, hardware, software provider).
- **Cryptographic** — weak algorithms (MD5, DES, SSL), poor keys.
- **Misconfiguration** — the most common: open ports, default settings.
- **Mobile**: **side loading** (apps from outside the store), **jailbreaking/rooting**.
- **Zero-day** — unknown to the vendor, no patch exists.`,
8:`## Malware
| Type | Sign |
| Ransomware | encrypts files, demands payment |
| Trojan | disguised as useful software |
| Worm | spreads by itself over the network, no user action |
| Virus | needs a user to run it, infects files |
| Spyware / Keylogger | spies / records keystrokes |
| Bloatware | unwanted preinstalled software |
| Logic bomb | triggers on a condition/date |
| Rootkit | hides deep in the OS, gives root access |
## Physical attacks
Brute force (forcing a door), **RFID cloning** (copying a badge), environmental (HVAC, water).
## Network attacks
- **DDoS**: **amplified** (small request → huge response, DNS/NTP), **reflected** (responses sent to the victim's spoofed IP).
- **DNS attacks**: DNS poisoning, domain hijacking.
- **Wireless**: evil twin, rogue AP, deauthentication, jamming.
- **On-path** (MITM), **credential replay**, malicious code.
## Application attacks
Injection, buffer overflow, **replay**, **privilege escalation**, **forgery** (CSRF/SSRF), **directory traversal** (~../../etc/passwd~).
## Cryptographic
**Downgrade** (force a weaker protocol), **collision** (same hash), **birthday attack** (probability of collisions).
## Passwords
**Spraying** (one password, many accounts — avoids lockout), **brute force** (many passwords, one account).
## Indicators (IoC)
Account lockout, **concurrent session usage**, blocked content, **impossible travel** (login from Moscow and Tokyo 10 minutes apart), resource consumption, resource inaccessibility, **out-of-cycle logging**, published/documented (data on the dark web), **missing logs** (the attacker deleted them).`,
9:`## Core techniques
- **Segmentation** — split the network into zones (VLANs, subnets) → limits lateral movement.
- **Access control**: ACLs, permissions.
- **Application allow list** — only approved software runs (stronger than a deny list).
- **Isolation** — quarantine infected/risky systems.
- **Patching** — install updates.
- **Encryption** — at rest and in transit.
- **Monitoring** — logs, SIEM.
- **Least privilege** — minimum rights.
- **Configuration enforcement** — force the baseline (GPO, MDM).
- **Decommissioning** — retire systems properly (wipe data).
## Hardening techniques
- Disk encryption, install **endpoint protection** (EDR).
- **Host-based firewall**, **HIPS** (host-based intrusion prevention).
- **Disable ports/protocols** you do not need (Telnet, SMBv1).
- **Change default passwords**.
- **Remove unnecessary software**.
> "Which measure BEST stops unknown programs from running?" → application allow list.`,
10:`## Cloud
- **Responsibility matrix** (shared responsibility): the provider secures the cloud, the customer secures what they put in it. IaaS — customer owns the OS and above; PaaS — the app and data; SaaS — mostly data and access.
- **Hybrid** = on-premises + cloud; **third-party vendors** add risk.
- **IaC** (Infrastructure as Code) — infrastructure described as code (Terraform): consistent, repeatable, reviewable.
- **Serverless** — code runs as functions (Lambda); the provider manages servers.
- **Microservices** — many small services via APIs; one failure does not take down everything.
## Network
- **Physical isolation / air-gapped** — no physical connection to other networks.
- **Logical segmentation** — VLANs, subnets.
- **SDN** (Software-Defined Networking) — control plane separated from data plane; the network is managed by software.
## Other models
On-premises, centralized vs decentralized, **containerization** (Docker: shared kernel, lightweight), **virtualization** (hypervisor, full OSes), **IoT**, **ICS/SCADA** (factories, power — hard to patch), **RTOS** (real-time OS), **embedded systems**, **high availability**.
## Considerations
Availability, resilience, cost, responsiveness, scalability, ease of deployment, **risk transference**, ease of recovery, **patch availability / inability to patch** (ICS, embedded), power, compute.
> "Cannot be patched" (SCADA, embedded) → segmentation/isolation as a compensating control.`,
11:`## Placement and zones
- **Device placement** — where firewalls, IDS, sensors go.
- **Security zones**: internet, **screened subnet (DMZ)**, internal, management.
- **Attack surface**, **connectivity**.
## Failure modes
- **Fail-open** — passes traffic on failure (availability first).
- **Fail-closed** — blocks traffic on failure (security first).
## Device attributes
- **Active** (can block) vs **passive** (only observes).
- **Inline** (traffic passes through — IPS) vs **tap/monitor** (copy of traffic — IDS, SPAN port).
## Network appliances
- **Jump server** (bastion) — single hardened entry point for administration.
- **Proxy server** — intermediary (forward — for users; reverse — in front of web servers).
- **IDS/IPS**, **load balancer**, **sensors**.
## Port security
**802.1X** — device authenticates before the port opens (supplicant → authenticator (switch) → authentication server (RADIUS)); uses **EAP**.
## Firewalls
| Type | Feature |
| Layer 4 | IP/port/protocol |
| Layer 7 / NGFW | application-aware, DPI, IPS, user identity |
| WAF | protects web apps from SQLi/XSS |
| UTM | all-in-one: firewall, AV, filtering, VPN (small business) |
## Secure access
- **VPN**, **remote access**, **tunneling**: **TLS** (SSL VPN, via browser), **IPSec** (AH — integrity, ESP — encryption; tunnel vs transport mode).
- **SD-WAN** — software-managed WAN between branches.
- **SASE** (Secure Access Service Edge) — cloud-delivered security + networking (SD-WAN + CASB + SWG + ZTNA).`,
12:`## Data types
Regulated (PII, PHI — by law), trade secret, intellectual property, legal information, financial information, human-readable / non-human-readable.
## Classifications
| Level | Example |
| Public | press release |
| Private / internal | internal documents |
| Sensitive | customer data |
| Confidential | contracts, source code |
| Restricted | special authorization only |
| Critical | the business stops without it |
## Data states
- **At rest** — on disk (disk/database encryption).
- **In transit / in motion** — over the network (TLS, VPN).
- **In use** — in memory/processing (secure enclave).
## Location
- **Data sovereignty** — data is subject to the laws of the country where it is stored.
- **Geolocation** — physical location.
## Protection methods
**Geographic restrictions**, **encryption**, **hashing**, **masking**, **tokenization**, **obfuscation**, **segmentation**, **permission restrictions**.`,
13:`## High availability
- **Load balancing** — spreads load across active servers (active-active).
- **Clustering** — servers act as one; if a node fails another takes over (failover).
## Recovery sites
| Site | Readiness | Cost |
| Hot | fully ready, data synchronized — minutes | expensive |
| Warm | hardware ready, data must be restored — hours/days | medium |
| Cold | only space and power — weeks | cheap |
**Geographic dispersion** — sites far apart (one disaster cannot hit both).
## Diversity
**Platform diversity** (different OS/vendors), **multi-cloud** (several providers), **continuity of operations (COOP)**.
## Capacity planning
People, technology, infrastructure — enough of each during a disruption?
## Testing
**Tabletop** (discussion), **failover** (real switch-over), **simulation**, **parallel processing** (run the backup site in parallel with production).
## Backups
- Onsite / offsite, frequency, encryption.
- **Full** (everything), **incremental** (changes since the last backup of any type: fast to make, slow to restore), **differential** (changes since the last full: grows daily; restore = full + latest differential).
- **Snapshots** (VM state at a point in time), **replication** (real-time copy), **journaling** (log of changes).
- **3-2-1 rule**: 3 copies, 2 media types, 1 offsite.
## Power
**UPS** — battery for minutes (graceful shutdown/transition), **generator** — long term, **PDU** — distribution.`,
14:`## Secure baselines
**Establish** (from CIS/vendor guides) → **deploy** (GPO, MDM, Ansible) → **maintain** (update, check for drift).
## Hardening targets
Mobile devices, workstations, switches, routers, cloud infrastructure, servers, ICS/SCADA, embedded, RTOS, IoT.
## Wireless
- **Site survey** and **heat map** — where to place access points, weak signal, rogue APs.
- **WPA3** (SAE replaces PSK — resists offline cracking), WPA2/WPA3-Enterprise with **RADIUS** (AAA).
## Mobile
- **MDM** — central management (policies, remote wipe, containerization).
- Models: **BYOD** (own device), **COPE** (corporate-owned, personal use allowed), **CYOD** (choose from a company list).
- Connections: cellular, Wi-Fi, Bluetooth.
## Application security
- **Input validation** (on the server side), **secure cookies** (Secure, HttpOnly flags), **static code analysis (SAST)**, **code signing** (authentic code).
- **Sandboxing** — run in isolation. **Monitoring**.`,
15:`You cannot protect what you do not know you have. Asset life cycle:
## 1. Acquisition / procurement
Buy from trusted suppliers, put security requirements in the contract.
## 2. Assignment / accounting
**Ownership** (the owner is accountable), **classification** (importance level).
## 3. Monitoring / asset tracking
**Inventory**, **enumeration** (automatic discovery of devices on the network).
## 4. Disposal / decommissioning
- **Sanitization** — erasing data (overwrite, crypto erase, degaussing for magnetic media).
- **Destruction** — physical (shredding, pulverizing, incineration).
- **Certification** — certificate of destruction from the vendor.
- **Data retention** — how long to keep data by law/policy before deletion.
> SSDs cannot be degaussed; use crypto erase/secure erase or destruction.`,
16:`## Identification
- **Vulnerability scan** — credentialed (logged in, deeper) vs non-credentialed (outside attacker's view); intrusive vs non-intrusive.
- **Application security**: **static analysis (SAST)** — code without running it; **dynamic analysis (DAST)** — running app, fuzzing; **package monitoring** — vulnerable libraries (SCA).
- **Threat feeds**: OSINT, proprietary/third-party, **ISACs** (information-sharing organizations), **dark web**.
- **Penetration testing**, **responsible disclosure program**, **bug bounty**, system/process audit.
## Analysis
- **Confirmation**: false positive (alert without a real vulnerability), false negative (missed vulnerability — more dangerous).
- **Prioritize**: **CVSS** (0–10 score), **CVE** (identifier), classification, **exposure factor**, environmental variables, industry/organizational impact, **risk tolerance**.
## Response / remediation
**Patching**, **insurance** (transfer), **segmentation**, **compensating controls**, **exceptions/exemptions** (formally accepted risk).
## Validation
**Rescanning**, audit, verification — confirm the fix.
## Reporting
Report to management: found, fixed, accepted.`,
17:`## What we monitor
Systems, applications, infrastructure.
## Activities
- **Log aggregation** — collecting logs in one place.
- **Alerting**, **scanning**, **reporting**, **archiving** (keeping logs for investigations/law).
- **Alert response**: **quarantine**, **alert tuning** (adjust rules to reduce false positives), validation.
## Tools
| Tool | Purpose |
| SIEM | collects and correlates logs, alerts (Splunk, Wazuh) |
| SCAP | standard for automated configuration checks (XCCDF, OVAL) |
| Benchmarks | CIS benchmarks — reference secure settings |
| Agent / agentless | with an installed agent or over the network/API |
| Antivirus / EDR | endpoint protection |
| DLP | data loss prevention |
| SNMP traps | the device sends an event message to the manager |
| NetFlow | traffic metadata: who, with whom, how much (no content) |
| Vulnerability scanner | finds vulnerabilities |
> Too many false alerts → alert tuning.`,
18:`## Firewall
Rules, access lists, ports/protocols, **screened subnets**. Rules are read top-down and end with **implicit deny**.
## IDS/IPS
**Signatures** (known attacks), **trends/anomalies** (deviations).
## Web filter
Agent-based or **centralized proxy**; URL scanning, **content categorization** (block "gambling"), block rules, **reputation**.
## OS security
**Group Policy** (Windows central settings), **SELinux** (Linux mandatory access control).
## Secure protocols
Choose protocol, port and transport: SSH instead of Telnet, SFTP instead of FTP, HTTPS instead of HTTP, LDAPS instead of LDAP, SNMPv3 instead of v1/v2.
## DNS filtering
Block malicious domains at the DNS level.
## Email security
| | What it does |
| SPF | lists the servers allowed to send mail for a domain (DNS TXT) |
| DKIM | digital signature on the email (authenticity and integrity) |
| DMARC | policy when SPF/DKIM fail (none/quarantine/reject) + reports |
| Gateway | mail filter: spam, attachments |
## Others
**FIM** (File Integrity Monitoring), **DLP**, **NAC** (checks a device before network access), **EDR/XDR**, **UBA/UEBA** (user behavior analytics).`,
19:`## Life cycle
**Provisioning / de-provisioning** (create/remove accounts), permission assignments, **identity proofing** (verify the person is who they claim), **attestation** (managers regularly confirm access).
## Federation and SSO
- **SSO** — one login for many systems.
- **LDAP** — directory (Active Directory). **LDAPS** — secure.
- **SAML** — XML assertions between IdP and SP (enterprise web SSO).
- **OAuth** — **authorization** (give an app access to a resource without a password). **OpenID Connect** = authentication on top of OAuth.
- **Federation** — trust between organizations.
## Access control models
| Model | Who decides |
| MAC | the system, by labels (Top Secret) — military |
| DAC | the resource owner (file permissions) |
| RBAC | by role/job |
| Rule-based | by rules (firewall, time) |
| ABAC | by attributes (department, location, device) |
+ **time-of-day restrictions**, **least privilege**.
## MFA
Factors: **something you know** (password, PIN), **have** (token, phone, smart card), **are** (biometrics), **somewhere you are** (location). Two passwords are NOT MFA (one factor).
Implementations: biometrics, **hard/soft tokens** (HOTP/TOTP), **security keys** (FIDO2).
## Passwords
Length beats complexity, no reuse, expiration/age, **password managers**, **passwordless** (FIDO2, passkeys).
## PAM
**Just-in-time permissions** (time-limited rights), **password vaulting** (admin password safe), **ephemeral credentials** (short-lived credentials).`,
20:`## Use cases
User provisioning, resource provisioning, **guard rails** (automatic limits, e.g. no public buckets), security groups, ticket creation, **escalation**, enabling/disabling services and access, **continuous integration and testing (CI/CD)**, integrations and **APIs**.
## Benefits
Efficiency/time saving, **enforcing baselines**, standard infrastructure configurations, secure **scaling**, **employee retention** (less routine work), **reaction time**, **workforce multiplier**.
## Other considerations (drawbacks)
**Complexity**, **cost**, **single point of failure**, **technical debt**, **ongoing supportability**.
> **SOAR** — a platform that automatically runs response playbooks (block an IP, open a ticket).`,
21:`## Process (in order!)
1. **Preparation** — plan, team, tools, training.
2. **Detection** — notice the event.
3. **Analysis** — confirm the incident, scope, priority.
4. **Containment** — limit it (isolate the host, disable the account).
5. **Eradication** — remove the cause (malware, backdoor).
6. **Recovery** — restore systems, monitor.
7. **Lessons learned** — review and improve.
## Training and testing
**Tabletop exercise**, **simulation**.
## Root cause analysis
Find the underlying cause, not just the symptoms.
## Threat hunting
Proactively searching for threats that automated tools missed.
## Digital forensics
- **Legal hold** — do not delete data related to litigation.
- **Chain of custody** — record of who held the evidence, when and where.
- **Acquisition** — take an image (with a hash to prove integrity); **order of volatility**: CPU cache/registers → RAM → swap → disk → remote logs → backups.
- **Preservation**, **reporting**, **e-discovery** (finding electronic evidence for court).
> Order of phases is the most common question. Containment comes BEFORE eradication.`,
22:`## Log data
| Log | What it shows |
| Firewall | allowed/blocked connections, IPs, ports |
| Application | errors, app logins, user actions |
| Endpoint | processes, software installs, EDR events |
| OS-specific security | logons/logoffs, privilege changes (Windows Event 4624/4625, Linux auth.log) |
| IPS/IDS | triggered attack signatures |
| Network | DHCP, DNS, proxy, NetFlow |
| Metadata | "data about data": email headers, photo EXIF, file creation time |
## Other sources
- **Vulnerability scans** — was the system vulnerable?
- **Automated reports**, **dashboards** — the big picture.
- **Packet captures (pcap)** — full traffic content (Wireshark) — the most detail.
> Need "the full content of network traffic" → packet capture. Need "who logged in and when" → OS security log.`,
23:`## Document hierarchy
| Document | Meaning | Mandatory? |
| Policy | high-level "what and why" (approved by management) | yes |
| Standard | specific requirements (password ≥ 14 chars, AES-256) | yes |
| Procedure | step-by-step "how" | yes |
| Guideline | recommendation | no |
## Policies
**AUP** (Acceptable Use Policy), information security policy, business continuity, disaster recovery, incident response, **SDLC** (secure development), change management.
## Standards
Password, access control, physical security, encryption.
## Procedures
Change management, **onboarding/offboarding** (grant/remove access and equipment), **playbooks**.
## External considerations
Regulatory, legal, industry, local/regional, national, global.
## Governance structures
Boards, committees, government entities, centralized vs decentralized.
## Data roles
| Role | Responsibility |
| Owner | senior manager accountable for the data, decides classification |
| Controller | decides purposes and means of processing (GDPR) |
| Processor | processes data on behalf of the controller |
| Custodian / steward | technically stores and protects it (IT, backups) |`,
24:`## Process
Identification → assessment → analysis → treatment → monitoring/reporting.
Assessment: **ad hoc**, **recurring**, **one-time**, **continuous**.
## Analysis
- **Qualitative** — High/Medium/Low (likelihood × impact matrix).
- **Quantitative** — in money:
| Formula | Meaning |
| SLE = AV × EF | Single Loss Expectancy — loss from one event |
| ALE = SLE × ARO | Annualized Loss Expectancy — loss per year |
| ARO | times per year (0.5 = once every 2 years) |
| EF | exposure factor — share of the asset lost (0–100%) |
Example: server $100,000, EF 40% → SLE $40,000; ARO 0.25 → ALE $10,000/year. A control costing more than the ALE is not worth it.
## Risk register
List of risks: **risk owner**, **KRIs** (key risk indicators), **risk threshold**.
## Attitude to risk
- **Risk appetite**: expansionary (accept risk for growth), conservative, neutral.
- **Risk tolerance** — acceptable deviation.
## Strategies
| Strategy | Example |
| Mitigate | firewall, patches |
| Transfer | insurance, outsourcing |
| Avoid | stop the risky activity |
| Accept | accept it (exception/exemption) when cheaper |
## BIA (Business Impact Analysis)
- **RTO** — how fast the system must be restored.
- **RPO** — how much data can be lost (time since last backup).
- **MTTR** — mean time to repair.
- **MTBF** — mean time between failures (reliability).`,
25:`## Vendor assessment
Penetration testing, **right-to-audit clause**, evidence of internal audits, **independent assessments** (SOC 2, ISO 27001), **supply chain analysis**.
## Vendor selection
**Due diligence** (research before signing), **conflict of interest**.
## Agreement types
| Agreement | Meaning |
| SLA | service level: 99.9% uptime, response times |
| MOU / MOA | memorandum of understanding / agreement (MOA is more formal) |
| MSA | Master Service Agreement — general terms for future work |
| SOW / WO | Statement of Work / Work Order — specific work, dates, deliverables |
| NDA | non-disclosure |
| BPA | Business Partners Agreement — partnership, shares, duties |
## Monitoring
**Vendor monitoring**, **questionnaires** (security questionnaires), **rules of engagement** (what is allowed during tests/work).`,
26:`## Reporting
**Internal** (to management) and **external** (to regulators).
## Consequences of non-compliance
Fines, sanctions, reputational damage, **loss of license**, contractual impacts.
## Compliance monitoring
**Due diligence / due care** (investigate / act responsibly), **attestation and acknowledgement** (confirm and sign), internal/external, **automation**.
## Privacy
- Laws: local/regional, national, global (**GDPR** — EU).
- **Data subject** — the person the data is about.
- **Controller vs processor**.
- **Ownership**, **data inventory and retention**.
- **Right to be forgotten** — right to have personal data erased (GDPR).
## Key regulations/standards
| Name | Scope |
| GDPR | personal data of EU residents |
| HIPAA | health data (US) |
| PCI DSS | payment card data |
| SOX | financial reporting of public companies (US) |
| ISO 27001 | information security management system |
| NIST CSF | cybersecurity framework |`,
27:`## Attestation
Independent confirmation (e.g. a SOC 2 report).
## Internal
Compliance, **audit committee**, **self-assessments**.
## External
Regulatory, examinations, assessments, **independent third-party audit**.
## Penetration testing
| Type | Meaning |
| Physical | break into the building |
| Offensive (red team) | attack |
| Defensive (blue team) | defend |
| Integrated (purple) | work together |
| Known environment (white box) | tester knows everything |
| Partially known (gray box) | partial information |
| Unknown environment (black box) | no information, like an outside attacker |
## Reconnaissance
- **Passive** — no contact with the target (OSINT, WHOIS, social media).
- **Active** — direct interaction (Nmap scan, banner grabbing).
> Before a pentest you MUST have **rules of engagement** and written authorization.`,
28:`## Phishing
**Campaigns** (simulated phishing emails), **recognizing attempts** (urgency, odd sender, mismatched link), **responding to reported suspicious messages** ("report phishing" button).
## Anomalous behavior
**Risky** (bypassing policy), **unexpected** (unusual time/volume), **unintentional** (mistakes from lack of knowledge).
## Training topics
Policy/handbooks, **situational awareness**, **insider threat**, password management, **removable media and cables** (found USBs and cables may be malicious), social engineering, **operational security (OPSEC)**, **hybrid/remote work** (home Wi-Fi, VPN, screen lock).
## Reporting and monitoring
**Initial** (onboarding) and **recurring** (regular) training; metrics: click rate in simulated phishing, report rate.
## Development and execution
Build the program → run it → measure → improve.`
};
