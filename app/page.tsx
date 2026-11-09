import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import PostCard from "@/components/PostCard";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { Arrow, Book, Chart, Check, Cloud, Gear, Headset, Mail, Pin, Plug, WhatsApp } from "@/components/Icons";
import { getAllPosts } from "@/lib/posts";
import { GLOSSARY } from "@/lib/glossary";
import { SITE, absUrl, waLink } from "@/lib/site";

const services = [
  { Icon: Headset, t: "Managed Banner Support", d: "A dedicated team that handles functional and technical Ellucian Banner tickets under agreed response times.", items: ["L1–L3 functional & technical", "Job submission & batch monitoring", "SLA-backed incident response"] },
  { Icon: Gear, t: "Banner Upgrades & Patching", d: "A predictable release cadence that keeps Banner 9 current without disrupting the academic calendar.", items: ["Release bundling & regression", "Modification inventory & retirement", "ESM-based scripted deployments"] },
  { Icon: Book, t: "Enterprise E-Learning", d: "Design, deployment and support of enterprise LMS environments connected to Banner.", items: ["Moodle, Canvas, Brightspace", "ILP grade & enrolment sync", "Course shell automation"] },
  { Icon: Plug, t: "Integrations & Ethos", d: "Replace fragile scripts with API-based integrations that survive upgrades.", items: ["Ethos APIs & notifications", "Third-party system feeds", "Integration monitoring"] },
  { Icon: Cloud, t: "Cloud & SaaS Migration", d: "Assessment, rebuild and hypercare for moving Banner to Ellucian SaaS or managed cloud.", items: ["Readiness assessment", "Mods rebuilt with Extensibility", "Cutover rehearsals"] },
  { Icon: Chart, t: "Reporting & Analytics", d: "Operational and executive reporting on Banner data, from census day to graduation.", items: ["Argos & SQL reporting", "Dashboards for leadership", "Data quality checks"] },
];

const modules = [
  { tab: "Student", h: "Banner Student", p: "From admissions and catalogue to registration, academic history and graduation, we keep the student lifecycle running smoothly.", list: ["Registration & Self-Service configuration", "Curriculum, catalogue & schedule rules", "Academic history, transcripts & Degree Works", "Term roll and grading cycles"], m: "24/7", ms: "registration-week coverage available", tags: ["SFAREGS", "SSASECT", "SHRROLL", "Degree Works", "Self-Service", "SOAHOLD"] },
  { tab: "Finance", h: "Banner Finance", p: "General ledger, procurement, budgets and fixed assets configured to match how your institution operates.", list: ["FOAPAL chart of accounts design", "Purchasing, requisitions & approvals", "Budget development & year-end close", "Grants and endowment tracking"], m: "Year-end", ms: "close support built into every plan", tags: ["FGAJVCD", "FOAPAL", "FGIBDST", "Purchasing", "Budget", "Grants"] },
  { tab: "HR", h: "Banner HR & Payroll", p: "Position control, payroll runs and employee self-service, supported by people who understand the calendar.", list: ["Position control & job assignments", "Payroll calculation & deductions", "Leave, benefits & time entry", "Employee Self-Service"], m: "Payroll", ms: "run monitoring and issue triage", tags: ["PHPCALC", "NBAJOBS", "PEAEMPL", "PHPUPDT", "Leave", "ESS"] },
  { tab: "Fin. Aid", h: "Banner Financial Aid", p: "Need analysis, packaging and disbursement handled with care for regulatory accuracy.", list: ["Aid year setup & rollover", "Packaging & budgeting rules", "Disbursement processing", "Regulatory update testing"], m: "Aid year", ms: "rollover planned and rehearsed", tags: ["Need Analysis", "Packaging", "Disbursement", "SAP", "Budgets", "Rollover"] },
  { tab: "A/R", h: "Accounts Receivable", p: "Student accounts, billing, payment plans and collections, reconciled and audit-ready.", list: ["Fee assessment & detail codes", "Billing, statements & payment plans", "Payment gateway integrations", "Reconciliation with Finance"], m: "Billing", ms: "cycles validated before every term", tags: ["TSAAREV", "TSADETC", "SFRFASC", "Gateways", "Refunds", "Holds"] },
  { tab: "General", h: "Banner General & Technical", p: "The platform under everything: security, job submission, Application Navigator and the Oracle database.", list: ["Security classes & role provisioning", "Job submission & population selection", "Admin Pages, Navigator & Extensibility", "Oracle performance tuning"], m: "Banner 9", ms: "Admin Pages & Self-Service expertise", tags: ["GJAPCTL", "GLRSLCT", "GSASECR", "ESM", "SSO", "Ethos"] },
];

const faqs = [
  { q: "Do you work directly with Ellucian?", a: "ITCadence is an independent services firm. We work alongside your Ellucian contract and support entitlements, handling day-to-day functional and technical work, and escalate product defects to Ellucian through your institution's support channels." },
  { q: "Can you support our Banner environment remotely?", a: "Yes. Most of our work is delivered remotely through secure VPN or your preferred remote access tooling, with on-site visits in the UAE and GCC when a project calls for it." },
  { q: "Which LMS platforms do you integrate with Ellucian Banner?", a: "We work with Moodle, Canvas, D2L Brightspace and Blackboard, typically through Ellucian's Integration for Learning Platforms (ILP) or API-based integrations via Ethos." },
  { q: "How quickly can ITCadence start?", a: "Managed support usually begins with a two-week onboarding: access, knowledge transfer, runbook review and a Banner health check. Urgent break-fix help can start sooner." },
  { q: "Do you help with Banner SaaS migrations?", a: "Yes. We run readiness assessments, inventory and classify modifications and integrations, rebuild them on supported extension points, and provide hypercare after cutover." },
  { q: "How do I reach Banner support urgently?", a: `Message us on WhatsApp at ${SITE.phoneDisplay} for the fastest response, or use the contact form. Managed support clients also get a dedicated escalation path.` },
];

const marquee = ["Banner Student", "Banner Finance", "HR & Payroll", "Financial Aid", "Ellucian Ethos", "Banner 9 Admin Pages", "Self-Service", "Moodle", "Canvas", "D2L Brightspace", "Blackboard", "Degree Works", "Oracle Database", "Ellucian SaaS"];

export default function Home() {
  const posts = getAllPosts();
  const questions = posts.filter((p) => p.question);
  const latest = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 6);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ITCadence services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem", position: i + 1,
      item: { "@type": "Service", name: s.t, description: s.d, provider: { "@id": absUrl("/#organization") }, areaServed: SITE.areaServed },
    })),
  };

  return (
    <>
      <JsonLd data={[faqLd, servicesLd]} />
      <Nav />
      <main>
        <section className="hero">
          <canvas className="hero__canvas" aria-hidden="true" />
          <div className="hero__grid" aria-hidden="true" />
          <div className="container hero__inner">
            <div>
              <div className="hero__badge"><span className="dot" />The UAE&apos;s dedicated Ellucian Banner support team</div>
              <h1>
                <span className="line"><span>Keep your campus</span></span>
                <span className="line"><span>running at full</span></span>
                <span className="line"><span><span className="rotator" data-rotate="cadence.|Banner 9.|enrolment.|e-learning.|cloud scale.">cadence.</span></span></span>
              </h1>
              <p className="hero__lead">Based in Dubai and working in your time zone, ITCadence provides managed <strong>Ellucian Banner support</strong>, Banner 9 upgrades, Ethos integrations and enterprise e-learning platforms, so your teams can focus on students, not systems.</p>
              <div className="hero__actions">
                <Link href="/banner-health-check" className="btn" data-magnetic>Take the free Banner health check <Arrow /></Link>
                <a href={waLink()} target="_blank" rel="noopener" className="btn btn--ghost" data-magnetic><WhatsApp size={18} /> WhatsApp support</a>
              </div>
              <div className="hero__trust">
                <div><Check /> Banner 9 &amp; SaaS</div>
                <div><Check /> Moodle · Canvas · Brightspace</div>
                <div><Check /> Dubai-based, GCC-wide</div>
              </div>
            </div>
            <div className="hero__visual" aria-hidden="true">
              <div className="dash" data-tilt="10">
                <div className="dash__head"><span className="dash__title">Banner environment health</span><span className="dash__live">LIVE</span></div>
                <div className="dash__bars">
                  {[0.55, 0.8, 0.62, 0.95, 0.7, 0.85, 0.5, 0.9, 0.75, 0.6, 0.88, 0.68].map((h, k) => (
                    <i key={k} style={{ "--h": h, animationDelay: `${k * 0.12}s` } as CSSProperties} />
                  ))}
                </div>
                <div className="dash__rows">
                  <div className="dash__row"><b>Registration Self-Service</b><span className="pill pill--ok">HEALTHY</span></div>
                  <div className="dash__row"><b>ILP grade sync → Moodle</b><span className="pill pill--info">SYNCING</span></div>
                  <div className="dash__row"><b>Payroll job PHPCALC</b><span className="pill pill--warn">QUEUED</span></div>
                </div>
              </div>
              <div className="float-chip float-chip--a"><span className="ico"><Check /></span>Ticket resolved</div>
              <div className="float-chip float-chip--b"><span className="ico"><Arrow /></span>Release bundle deployed</div>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true" />
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...marquee, ...marquee].map((m, i) => <span key={i} className="marquee__item">{m}</span>)}
          </div>
        </div>

        <section className="section" id="services" aria-labelledby="services-h">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">What we do</span>
              <h2 id="services-h" data-split>End-to-end support for the systems your institution runs on</h2>
              <p className="muted reveal">From the registrar&apos;s office to the virtual classroom, one partner that understands both Ellucian Banner and enterprise e-learning.</p>
            </div>
            <div className="services" data-stagger>
              {services.map(({ Icon, t, d, items }, i) => (
                <article className="card" data-tilt="6" key={t}>
                  <span className="card__num">0{i + 1}</span>
                  <div className="card__icon"><Icon /></div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark" id="banner" aria-labelledby="banner-h">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">Ellucian Banner coverage</span>
              <h2 id="banner-h" data-split>Every Banner module, supported by people who know the calendar</h2>
              <p className="muted reveal">Functional and technical expertise across the full Banner ERP suite.</p>
            </div>
            <div className="modules reveal">
              <div className="tabs" role="tablist">
                {modules.map((m, i) => (
                  <button key={m.tab} className={`tab${i === 0 ? " is-active" : ""}`} role="tab" aria-selected={i === 0}>{m.tab}<i className="tab__timer" /></button>
                ))}
              </div>
              <div>
                {modules.map((m, i) => (
                  <div key={m.tab} className={`panel${i === 0 ? " is-active" : ""}`} role="tabpanel">
                    <div>
                      <h3>{m.h}</h3>
                      <p>{m.p}</p>
                      <ul className="panel__list">{m.list.map((x) => <li key={x}><Check /><span>{x}</span></li>)}</ul>
                    </div>
                    <div className="panel__art">
                      <div className="panel__metric"><b>{m.m}</b><span>{m.ms}</span></div>
                      <div className="panel__tags">{m.tags.map((t) => <span key={t}>{t}</span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="why-h">
          <div className="container why">
            <div className="why__img reveal reveal--left">
              <Image src="/images/why-itcadence.jpg" alt="Illustration of the ITCadence Banner support desk with tickets, SLA tracking and WhatsApp support" width={1200} height={900} sizes="(max-width: 1080px) 100vw, 560px" />
              <div className="why__badge">Banner + LMS<small>one support partner</small></div>
            </div>
            <div>
              <span className="eyebrow reveal">Why ITCadence</span>
              <h2 id="why-h" data-split style={{ fontSize: "clamp(32px,4.4vw,52px)" }}>Your Banner team, extended</h2>
              <p className="muted reveal">We combine functional Banner knowledge with the technical depth to run Banner 9, Ethos and your learning platforms, all from Dubai and close to your time zone.</p>
              <ul data-stagger>
                <li><Check /> Banner specialists across Student, Finance, HR, Financial Aid and AR</li>
                <li><Check /> Fast escalation on WhatsApp, email or your ticketing tool</li>
                <li><Check /> Runbooks, monitoring and monthly health reports</li>
                <li><Check /> Working hours on Gulf Standard Time for the UAE, Saudi Arabia, Oman and the wider GCC</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="elearning" style={{ paddingTop: 0 }} aria-labelledby="el-h">
          <div className="container integrate">
            <div>
              <span className="eyebrow reveal">Enterprise e-learning</span>
              <h2 id="el-h" data-split style={{ fontSize: "clamp(32px,4.4vw,52px)" }}>Banner and your LMS, finally speaking the same language</h2>
              <p className="muted reveal">We design, host and support enterprise learning platforms and connect them to Banner, so courses, enrolments and grades flow automatically.</p>
              <div className="feature-list" data-stagger>
                <div className="feature"><div className="feature__ico"><Book /></div><div><h3 className="h4">Automatic course shells</h3><p>Sections created in Banner appear in the LMS with the right instructors before term starts.</p></div></div>
                <div className="feature"><div className="feature__ico"><Plug /></div><div><h3 className="h4">Real-time enrolment sync</h3><p>Add/drop changes reach the virtual classroom without manual uploads.</p></div></div>
                <div className="feature"><div className="feature__ico"><Chart /></div><div><h3 className="h4">Grades back to Banner</h3><p>Instructors submit final grades from the LMS, straight into academic history.</p></div></div>
              </div>
            </div>
            <div className="flow reveal reveal--right">
              <svg viewBox="0 0 520 380" role="img" aria-label="Diagram: Ellucian Banner connected through ILP and Ethos to Moodle, Canvas and Brightspace">
                <path id="w1" className="wire" d="M150 190 C 220 190, 220 80, 330 80" />
                <path id="w2" className="wire" d="M150 190 L 330 190" />
                <path id="w3" className="wire" d="M150 190 C 220 190, 220 300, 330 300" />
                <path className="wire wire--draw" d="M150 190 C 220 190, 220 80, 330 80" />
                <path className="wire wire--draw" d="M150 190 L 330 190" style={{ transitionDelay: ".3s" }} />
                <path className="wire wire--draw" d="M150 190 C 220 190, 220 300, 330 300" style={{ transitionDelay: ".6s" }} />
                <circle r="5" className="packet"><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href="#w1" /></animateMotion></circle>
                <circle r="5" className="packet"><animateMotion dur="2.2s" repeatCount="indefinite" begin=".6s"><mpath href="#w2" /></animateMotion></circle>
                <circle r="5" className="packet"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.1s"><mpath href="#w3" /></animateMotion></circle>
                <circle r="5" className="packet packet--b"><animateMotion dur="2.6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="1.3s"><mpath href="#w1" /></animateMotion></circle>
                <circle r="5" className="packet packet--b"><animateMotion dur="2.4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin=".2s"><mpath href="#w3" /></animateMotion></circle>
                <g className="node node--core"><rect x="10" y="135" width="140" height="110" rx="20" /><text x="80" y="185" textAnchor="middle">Ellucian Banner</text><text x="80" y="207" textAnchor="middle" className="sub">ILP · Ethos APIs</text></g>
                <g className="node"><rect x="330" y="45" width="170" height="70" rx="16" /><text x="415" y="78" textAnchor="middle">Moodle</text><text x="415" y="98" textAnchor="middle" className="sub">courses · enrolments</text></g>
                <g className="node"><rect x="330" y="155" width="170" height="70" rx="16" /><text x="415" y="188" textAnchor="middle">Canvas</text><text x="415" y="208" textAnchor="middle" className="sub">instructors · rosters</text></g>
                <g className="node"><rect x="330" y="265" width="170" height="70" rx="16" /><text x="415" y="298" textAnchor="middle">Brightspace</text><text x="415" y="318" textAnchor="middle" className="sub">final grades → Banner</text></g>
              </svg>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="process" aria-labelledby="process-h">
          <div className="container">
            <div className="section-head section-head--center">
              <span className="eyebrow reveal">Our approach</span>
              <h2 id="process-h" data-split>A steady rhythm from first call to continuous improvement</h2>
            </div>
            <div className="process">
              <div className="process__line" aria-hidden="true"><span /></div>
              {[["Assess", "Health check of your Banner environment, modifications, integrations and open tickets."], ["Stabilise", "Clear critical backlogs, document runbooks and set up monitoring and SLAs."], ["Optimise", "Bring releases current, retire mods and automate repetitive jobs."], ["Evolve", "Move integrations to APIs, connect your LMS and plan the path to the cloud."]].map(([h, p], i) => (
                <div className="step reveal" style={{ "--d": `${0.1 + i * 0.15}s` } as CSSProperties} key={h}>
                  <div className="step__num">0{i + 1}</div><h3>{h}</h3><p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="stats reveal">
              <div className="stat"><b><span data-count="24">24</span><small>/7</small></b><span>Support coverage available</span></div>
              <div className="stat"><b><span data-count="15">15</span><small>min</small></b><span>Critical incident response target</span></div>
              <div className="stat"><b><span data-count="6">6</span><small>+</small></b><span>Banner modules supported</span></div>
              <div className="stat"><b><span data-count={questions.length}>{questions.length}</span><small>+</small></b><span>Banner questions answered on our blog</span></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="plans-h">
          <div className="container">
            <div className="section-head section-head--center">
              <span className="eyebrow reveal">Engagement models</span>
              <h2 id="plans-h" data-split>Support shaped around how your team works</h2>
            </div>
            <div className="plans" data-stagger>
              <div className="plan"><h3>Project Delivery</h3><p>Fixed-scope work with a clear outcome.</p><ul>
                {["Upgrades & release catch-up", "LMS integration rollouts", "SaaS readiness assessments", "Defined milestones & handover"].map((x) => <li key={x}><Check />{x}</li>)}</ul>
                <Link href="#contact" className="btn btn--ghost">Scope a project <Arrow /></Link></div>
              <div className="plan plan--featured"><span className="plan__tag">Most popular</span><h3>Managed Support</h3><p>An extension of your Banner team, on retainer.</p><ul>
                {["Functional & technical tickets", "SLA-backed response times", "Release & patch cadence", "WhatsApp & email escalation", "Monthly health reports"].map((x) => <li key={x}><Check />{x}</li>)}</ul>
                <Link href="#contact" className="btn">Get a proposal <Arrow /></Link></div>
              <div className="plan"><h3>Staff Augmentation</h3><p>Banner specialists embedded in your team.</p><ul>
                {["Functional analysts per module", "Banner developers & DBAs", "Flexible monthly terms", "Remote or on-site in the UAE"].map((x) => <li key={x}><Check />{x}</li>)}</ul>
                <Link href="#contact" className="btn btn--ghost">Request a specialist <Arrow /></Link></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="support-band reveal reveal--scale">
              <div className="support-band__ico"><WhatsApp /></div>
              <div><h2 className="h3" style={{ fontSize: 24, marginBottom: 4 }}>Banner down? Message us on WhatsApp.</h2><p>One Dubai-based team for Banner, Moodle, Canvas, Brightspace and Blackboard. Reach our support desk directly at <strong>{SITE.phoneDisplay}</strong>.</p></div>
              <a href={waLink("Hello ITCadence, I need urgent Banner support.")} target="_blank" rel="noopener" className="btn btn--wa" data-magnetic>Chat on WhatsApp <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 20 }} aria-labelledby="learn-h">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">Learn Ellucian Banner</span>
              <h2 id="learn-h" data-split>Free Banner knowledge base</h2>
              <p className="muted reveal">Straight answers to the questions Banner teams ask every week, written by people who support Banner every day.</p>
            </div>
            <div className="resources" data-stagger>
              <Link href="/banner-faq" className="resource"><b>{questions.length}+</b><h3>Banner Q&amp;A hub</h3><p>Short, direct answers on Banner Student, Finance, HR, security, jobs and integrations.</p></Link>
              <Link href="/banner-glossary" className="resource"><b>{GLOSSARY.length}</b><h3>Banner glossary</h3><p>PIDM, FOAPAL, CRN, Ethos, ILP and more, defined in plain English.</p></Link>
              <Link href="/blog" className="resource"><b>{posts.length}</b><h3>Guides &amp; articles</h3><p>Upgrade cadences, SaaS migration plans, LMS integration and registration runbooks.</p></Link>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }} id="blog" aria-labelledby="blog-h">
          <div className="container">
            <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, maxWidth: "none", flexWrap: "wrap" }}>
              <div style={{ maxWidth: 640 }}><span className="eyebrow reveal">From the blog</span><h2 id="blog-h" data-split>Banner insights from the support desk</h2></div>
              <Link href="/blog" className="btn btn--dark reveal">View all articles <Arrow /></Link>
            </div>
            <div className="posts" data-stagger>{latest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }} id="faq" aria-labelledby="faq-h">
          <div className="container">
            <div className="section-head section-head--center"><span className="eyebrow reveal">FAQ</span><h2 id="faq-h" data-split>Questions institutions ask us</h2></div>
            <div className="faq">
              {faqs.map((f, i) => (
                <div className="faq__item reveal" style={{ "--d": `${i * 0.06}s` } as CSSProperties} key={f.q}>
                  <h3 style={{ margin: 0 }}><button className="faq__q" aria-expanded="false">{f.q}<span className="faq__icon" /></button></h3>
                  <div className="faq__a"><div><p>{f.a}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark" id="contact" aria-labelledby="contact-h">
          <div className="container contact">
            <div>
              <span className="eyebrow reveal">Contact</span>
              <h2 id="contact-h" data-split>Let&apos;s get your Banner environment in rhythm.</h2>
              <p className="muted reveal">Tell us what you&apos;re working on: a backlog of tickets, an upgrade, an LMS integration or a cloud move. We&apos;ll come back within one business day.</p>
              <address className="contact__info" style={{ fontStyle: "normal" }} data-stagger>
                <a href={waLink()} target="_blank" rel="noopener"><WhatsApp size={20} /> WhatsApp: {SITE.phoneDisplay}</a>
                <a href={`mailto:${SITE.email}`}><Mail /> {SITE.email}</a>
                <div><Pin /> {SITE.address.full}</div>
              </address>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
