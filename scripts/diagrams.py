"""Generates the in-article SVG diagrams into public/images/diagrams."""
import os
from html import escape

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "diagrams")
os.makedirs(OUT, exist_ok=True)

INK = "#0a1324"; TEAL = "#11b89b"; MINT = "#2ee6c5"; VIOLET = "#8b7bff"; AMBER = "#ffb547"
PAPER = "#f5f3ee"; MUTED = "#5b6478"; LINE = "#d9d5cc"
FONT = "font-family=\"Sora, 'Segoe UI', Helvetica, Arial, sans-serif\""
ACCENTS = [TEAL, VIOLET, AMBER, "#3aa0ff", "#ff6b8b", TEAL]

def wrap(text, n):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > n and cur:
            lines.append(cur); cur = w
        else:
            cur = (cur + " " + w).strip()
    lines.append(cur)
    return lines

def svg(w, h, body, title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{escape(title)}">
<title>{escape(title)}</title>
<defs>
  <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="{TEAL}"/></marker>
  <linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#13213d"/><stop offset="1" stop-color="{INK}"/></linearGradient>
</defs>
<rect width="{w}" height="{h}" rx="24" fill="{PAPER}"/>
<g {FONT}>{body}</g>
</svg>'''

def flow(name, title, steps, subtitle=""):
    """Horizontal numbered flow. steps = [(heading, code, detail)]"""
    n = len(steps)
    w, pad, gap = 1200, 50, 26
    bw = (w - pad * 2 - gap * (n - 1)) / n
    h = 420
    body = f'<text x="{pad}" y="62" font-size="26" font-weight="700" fill="{INK}">{escape(title)}</text>'
    if subtitle:
        body += f'<text x="{pad}" y="92" font-size="16" fill="{MUTED}">{escape(subtitle)}</text>'
    y = 130
    for i, (head, code, detail) in enumerate(steps):
        x = pad + i * (bw + gap)
        acc = ACCENTS[i % len(ACCENTS)]
        dark = i == 0 or i == n - 1
        fill = "url(#core)" if dark else "#ffffff"
        tc = "#ffffff" if dark else INK
        sc = "#9aa6c0" if dark else MUTED
        body += f'<rect x="{x:.1f}" y="{y}" width="{bw:.1f}" height="240" rx="18" fill="{fill}" stroke="{LINE if not dark else "none"}"/>'
        body += f'<rect x="{x:.1f}" y="{y}" width="{bw:.1f}" height="6" rx="3" fill="{acc}"/>'
        body += f'<circle cx="{x+30:.1f}" cy="{y+42}" r="17" fill="{acc}" fill-opacity=".18"/><text x="{x+30:.1f}" y="{y+48}" text-anchor="middle" font-size="16" font-weight="700" fill="{acc}">{i+1}</text>'
        hl = wrap(head, max(10, int(bw / 11)))
        for k, line in enumerate(hl):
            body += f'<text x="{x+20:.1f}" y="{y+92+k*24}" font-size="19" font-weight="700" fill="{tc}">{escape(line)}</text>'
        cy = y + 92 + len(hl) * 24 + 6
        if code:
            cw = len(code) * 9.6 + 20
            body += f'<rect x="{x+20:.1f}" y="{cy-4}" width="{cw:.1f}" height="28" rx="14" fill="{acc}" fill-opacity=".16"/><text x="{x+30:.1f}" y="{cy+15}" font-size="14" font-weight="700" fill="{acc if not dark else MINT}" font-family="ui-monospace, Menlo, Consolas, monospace">{escape(code)}</text>'
            cy += 44
        for k, line in enumerate(wrap(detail, max(14, int(bw / 8.4)))):
            body += f'<text x="{x+20:.1f}" y="{cy+k*21}" font-size="14.5" fill="{sc}">{escape(line)}</text>'
        if i < n - 1:
            ax = x + bw + 2
            body += f'<line x1="{ax:.1f}" y1="{y+120}" x2="{ax+gap-4:.1f}" y2="{y+120}" stroke="{TEAL}" stroke-width="2.5" marker-end="url(#ah)"/>'
    body += f'<text x="{w-pad}" y="{h-24}" text-anchor="end" font-size="13" fill="{MUTED}">itcadence.com · Ellucian Banner guides</text>'
    open(os.path.join(OUT, name + ".svg"), "w").write(svg(w, h, body, title))

flow("job-submission", "How a Banner job runs", [
    ("Define the job", "GJAJOBS", "Name, type and description of the process"),
    ("Define parameters", "GJAPDEF", "Parameter numbers, lengths and validation"),
    ("Submit", "GJAPCTL", "Enter parameters or load a saved set, pick DATABASEPRINT"),
    ("Job server runs it", "", "The process executes on the job submission server"),
    ("Review output", "GJIREVO", "Read the .lis output and .log file for errors"),
], "Banner General job submission, from definition to output")

flow("population-selection", "Population selection in Banner", [
    ("Write the rules", "GLRSLCT", "Conditions that describe who belongs in the list"),
    ("Extract", "GLBDATA", "Run the rules and store the resulting people"),
    ("Review and adjust", "GLAEXTR", "Add or remove people; inquire on GLIEXTR"),
    ("Use it", "", "Letters, holds, time tickets and batch jobs"),
], "Application + selection ID + creator ID identify each population")

flow("grade-roll", "From final grade to academic history", [
    ("Grade entry", "", "Faculty submit grades in Self-Service or via the LMS"),
    ("Validate", "", "Grades checked against grade mode and level"),
    ("Roll grades", "SHRROLL", "Registrar runs grade roll for the term"),
    ("Academic history", "SHRTCKN", "Course and grade history records created"),
    ("Calculate", "", "GPA, academic standing and transcripts updated"),
], "The Banner Student grade roll path")

flow("payroll-cycle", "A typical Banner payroll run", [
    ("Time & earnings", "", "Hours and earnings loaded for the pay period"),
    ("Calculate", "PHPCALC", "Gross-to-net pay, deductions and taxes"),
    ("Review & number", "", "Check exceptions, assign document numbers"),
    ("Pay", "PHPCHEK", "Cheques, plus direct deposit files via PHPDIRD"),
    ("Update", "PHPUPDT", "Write results to employee history"),
    ("Finance feed", "PHPFEED", "Post expense to Banner Finance by FOAPAL"),
], "Run each step through job submission and check totals before moving on")

flow("saas-phases", "Five phases of a Banner SaaS migration", [
    ("Inventory", "", "Mods, jobs, DB connections and file feeds"),
    ("Classify", "", "Retire, reconfigure, rebuild or re-platform"),
    ("Rebuild on APIs", "Ethos", "Move integrations off direct table access"),
    ("Rehearse cutover", "", "Two or more timed mock migrations with validation"),
    ("Hypercare", "", "Stabilise and adopt the SaaS operating model"),
], "From on-premise Banner to Ellucian SaaS")

# ---------- FOAPAL
def foapal():
    w, h = 1200, 420
    items = [("F", "Fund", "Where the money came from", "110000", TEAL),
             ("O", "Organisation", "Who is responsible", "3100", VIOLET),
             ("A", "Account", "What it was for", "7210", AMBER),
             ("P", "Program", "Why, functionally", "10", "#3aa0ff"),
             ("A", "Activity", "Optional: project or event", "CONF26", "#ff6b8b"),
             ("L", "Location", "Optional: where", "DXB", TEAL)]
    body = f'<text x="50" y="62" font-size="26" font-weight="700" fill="{INK}">The FOAPAL accounting string</text>'
    body += f'<text x="50" y="92" font-size="16" fill="{MUTED}">Every Banner Finance transaction is coded with these elements</text>'
    bw, gap, x0, y = 170, 18, 50, 130
    for i, (L, nm, q, ex, c) in enumerate(items):
        x = x0 + i * (bw + gap)
        opt = i >= 4
        dash = 'stroke-dasharray="6 6"' if opt else ''
        body += f'<rect x="{x}" y="{y}" width="{bw}" height="230" rx="18" fill="{"#ffffff" if not opt else PAPER}" stroke="{c}" stroke-width="{2 if not opt else 1.5}" {dash}/>'
        body += f'<text x="{x+bw/2}" y="{y+82}" text-anchor="middle" font-size="64" font-weight="700" fill="{c}">{L}</text>'
        body += f'<text x="{x+bw/2}" y="{y+122}" text-anchor="middle" font-size="19" font-weight="700" fill="{INK}">{nm}</text>'
        for k, line in enumerate(wrap(q, 18)):
            body += f'<text x="{x+bw/2}" y="{y+150+k*19}" text-anchor="middle" font-size="14" fill="{MUTED}">{escape(line)}</text>'
        body += f'<rect x="{x+bw/2-48}" y="{y+184}" width="96" height="28" rx="14" fill="{c}" fill-opacity=".15"/><text x="{x+bw/2}" y="{y+203}" text-anchor="middle" font-size="14" font-weight="700" fill="{INK}" font-family="ui-monospace, Menlo, Consolas, monospace">{ex}</text>'
    body += f'<text x="1150" y="396" text-anchor="end" font-size="13" fill="{MUTED}">itcadence.com · Ellucian Banner guides</text>'
    open(os.path.join(OUT, "foapal.svg"), "w").write(svg(w, h, body, "FOAPAL: Fund, Organisation, Account, Program, Activity, Location"))
foapal()

# ---------- Naming
def naming():
    w, h = 1200, 420
    parts = [("S", "Product", "Student", TEAL, 1), ("P", "Module", "Person", VIOLET, 1), ("A", "Type", "Application page", AMBER, 1), ("IDEN", "Description", "Identification", "#3aa0ff", 4)]
    body = f'<text x="50" y="62" font-size="26" font-weight="700" fill="{INK}">Reading a Banner object name</text>'
    body += f'<text x="50" y="92" font-size="16" fill="{MUTED}">Seven characters: product, module, object type and description</text>'
    x = 170
    for ch, label, mean, c, n in parts:
        bw = 110 * n + (n - 1) * 10
        body += f'<rect x="{x}" y="130" width="{bw}" height="130" rx="18" fill="#ffffff" stroke="{c}" stroke-width="2.5"/>'
        body += f'<text x="{x+bw/2}" y="225" text-anchor="middle" font-size="86" font-weight="700" fill="{INK}" font-family="ui-monospace, Menlo, Consolas, monospace" letter-spacing="{18 if n>1 else 0}">{ch}</text>'
        body += f'<line x1="{x+bw/2}" y1="268" x2="{x+bw/2}" y2="300" stroke="{c}" stroke-width="2.5"/>'
        body += f'<text x="{x+bw/2}" y="326" text-anchor="middle" font-size="15" font-weight="700" fill="{c}">{label.upper()}</text>'
        body += f'<text x="{x+bw/2}" y="352" text-anchor="middle" font-size="17" fill="{INK}">{mean}</text>'
        x += bw + 20
    body += f'<text x="1150" y="396" text-anchor="end" font-size="13" fill="{MUTED}">itcadence.com · Ellucian Banner guides</text>'
    open(os.path.join(OUT, "banner-naming.svg"), "w").write(svg(w, h, body, "SPAIDEN decoded: S Student, P Person, A Application, IDEN Identification"))
naming()

# ---------- Hub diagrams (architecture, ethos, ilp)
def hub(name, title, subtitle, left, core, right, left_label="", right_label=""):
    w, h = 1200, 470
    body = f'<text x="50" y="62" font-size="26" font-weight="700" fill="{INK}">{escape(title)}</text>'
    body += f'<text x="50" y="92" font-size="16" fill="{MUTED}">{escape(subtitle)}</text>'
    cx, cy, cw, ch = 470, 170, 260, 200
    body += f'<rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="24" fill="url(#core)"/>'
    for k, line in enumerate(core[0].split("\n")):
        body += f'<text x="{cx+cw/2}" y="{cy+82+k*28}" text-anchor="middle" font-size="22" font-weight="700" fill="#ffffff">{escape(line)}</text>'
    for k, line in enumerate(core[1].split("\n")):
        body += f'<text x="{cx+cw/2}" y="{cy+150+k*20}" text-anchor="middle" font-size="14" fill="{MINT}">{escape(line)}</text>'
    def col(items, x, side):
        n = len(items); tot = n * 70 + (n - 1) * 16; y0 = cy + ch / 2 - tot / 2
        out = ""
        for i, (a, b) in enumerate(items):
            y = y0 + i * 86
            c = ACCENTS[i % len(ACCENTS)]
            out += f'<rect x="{x}" y="{y:.1f}" width="300" height="70" rx="16" fill="#ffffff" stroke="{LINE}"/><rect x="{x}" y="{y:.1f}" width="6" height="70" rx="3" fill="{c}"/>'
            out += f'<text x="{x+24}" y="{y+30:.1f}" font-size="18" font-weight="700" fill="{INK}">{escape(a)}</text><text x="{x+24}" y="{y+52:.1f}" font-size="14" fill="{MUTED}">{escape(b)}</text>'
            if side == "L":
                out += f'<path d="M{x+300} {y+35:.1f} C {x+360} {y+35:.1f}, {cx-60} {cy+ch/2}, {cx-6} {cy+ch/2}" fill="none" stroke="{TEAL}" stroke-width="2.2" marker-end="url(#ah)" opacity=".85"/>'
            else:
                out += f'<path d="M{cx+cw+6} {cy+ch/2} C {cx+cw+60} {cy+ch/2}, {x-60} {y+35:.1f}, {x-4} {y+35:.1f}" fill="none" stroke="{TEAL}" stroke-width="2.2" marker-end="url(#ah)" marker-start="url(#ah)" opacity=".85"/>'
        return out
    body += col(left, 60, "L") + col(right, 840, "R")
    if left_label: body += f'<text x="210" y="140" text-anchor="middle" font-size="13" font-weight="700" fill="{TEAL}" letter-spacing="2">{left_label}</text>'
    if right_label: body += f'<text x="990" y="140" text-anchor="middle" font-size="13" font-weight="700" fill="{TEAL}" letter-spacing="2">{right_label}</text>'
    body += f'<text x="1150" y="446" text-anchor="end" font-size="13" fill="{MUTED}">itcadence.com · Ellucian Banner guides</text>'
    open(os.path.join(OUT, name + ".svg"), "w").write(svg(w, h, body, title))

hub("banner-architecture", "How Banner 9 fits together", "Users reach Banner through the browser; applications run on Java app servers over Oracle",
    [("Staff", "Admin Pages via Application Navigator"), ("Students & faculty", "Banner Self-Service"), ("Identity provider", "CAS or SAML single sign-on")],
    ("Banner 9 apps\non Tomcat / WebLogic", "Oracle database\nBanner General + modules"),
    [("Ellucian Ethos", "APIs and change notifications"), ("Job submission", "Batch processes and reports"), ("Reporting", "ODS, EDW, Argos, BI")], "USERS", "CONNECTED SERVICES")

hub("ethos-flow", "Banner integrations through Ethos", "Applications use versioned APIs and change notifications instead of direct table access",
    [("Banner Student", "Persons, sections, registrations"), ("Banner Finance & HR", "Vendors, employees, ledgers"), ("Other Ellucian apps", "Shared data model")],
    ("Ethos\nIntegration", "Data model · REST APIs\nChange notifications · API keys"),
    [("LMS", "Course and enrolment data"), ("CRM & portals", "Prospects, students, alumni"), ("ID card & housing", "Near real-time updates")], "SOURCE SYSTEMS", "CONSUMERS")

hub("ilp-sync", "Banner and the LMS through ILP", "Banner stays the system of record while teaching happens in the LMS",
    [("Terms & sections", "Course shells created"), ("Instructors & enrolments", "Add/drop reflected"), ("Final & midterm grades", "Returned to Banner")],
    ("Integration for\nLearning Platforms", "Banner Student ⇄ LMS"),
    [("Moodle", "Courses · enrolments"), ("Canvas", "Instructors · rosters"), ("D2L Brightspace", "Grades → Banner")], "BANNER DATA", "LEARNING PLATFORMS")

print("diagrams:", sorted(os.listdir(OUT)))
