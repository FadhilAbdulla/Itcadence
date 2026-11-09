/**
 * Generates 1200x630 blog cover images (also used as Open Graph images)
 * for every post in content/posts that doesn't have one yet.
 *
 *   npm run images            -> only missing covers
 *   npm run images -- --all   -> regenerate everything
 *
 * Requires Playwright:  npm i -D playwright && npx playwright install chromium
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const POSTS = path.join(ROOT, "content", "posts");
const OUT = path.join(ROOT, "public", "images", "blog");
const ALL = process.argv.includes("--all");
fs.mkdirSync(OUT, { recursive: true });

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

const font = (pkg, file) => {
  const p = path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file);
  return fs.existsSync(p) ? `url(data:font/woff2;base64,${fs.readFileSync(p).toString("base64")})` : "local(Arial)";
};
const FONTS = `
@font-face{font-family:Sora;font-weight:700;src:${font("sora", "sora-latin-700-normal.woff2")}}
@font-face{font-family:Sora;font-weight:600;src:${font("sora", "sora-latin-600-normal.woff2")}}
@font-face{font-family:Manrope;font-weight:500;src:${font("manrope", "manrope-latin-500-normal.woff2")}}
@font-face{font-family:Manrope;font-weight:700;src:${font("manrope", "manrope-latin-700-normal.woff2")}}`;

const PALETTE = {
  "Banner Basics": ["#2ee6c5", "#8b7bff"],
  "Banner Student": ["#8b7bff", "#ffb547"],
  "Banner Finance & HR": ["#ffb547", "#2ee6c5"],
  "Banner Technical": ["#3aa0ff", "#2ee6c5"],
  Integration: ["#2ee6c5", "#3aa0ff"],
  Cloud: ["#3aa0ff", "#8b7bff"],
  "E-Learning": ["#2ee6c5", "#ffb547"],
  "Banner Support": ["#2ee6c5", "#ff6b8b"],
  Migration: ["#ffb547", "#8b7bff"],
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

function coverHtml({ title, category, code, question, seed }) {
  const [c1, c2] = PALETTE[category] || ["#2ee6c5", "#8b7bff"];
  const r = (n) => (hash(seed + n) % 1000) / 1000;
  const bars = Array.from({ length: 9 }, (_, i) => 30 + Math.round(r("b" + i) * 70));
  const fields = Array.from({ length: 4 }, (_, i) => 40 + Math.round(r("f" + i) * 55));
  const size = title.length > 70 ? 46 : title.length > 52 ? 52 : 58;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#0a1324;font-family:Manrope,Arial,sans-serif;color:#fff;position:relative}
.o1{position:absolute;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,${c1}66,transparent 65%);left:${-160 + r("x") * 200}px;top:${-260 + r("y") * 120}px}
.o2{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,${c2}55,transparent 65%);right:${-260 + r("z") * 120}px;bottom:${-330 + r("w") * 120}px}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px}
.rings{position:absolute;right:120px;top:40px;width:520px;height:520px}
.rings i{position:absolute;inset:0;border:1.5px solid rgba(255,255,255,.12);border-radius:50%}
.rings i:nth-child(2){inset:70px}.rings i:nth-child(3){inset:140px}
.left{position:absolute;left:64px;top:56px;bottom:56px;width:640px;display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:12px;font-family:Sora;font-weight:700;font-size:26px;letter-spacing:-.02em}
.logo b{color:#2ee6c5}
.chip{display:inline-flex;align-items:center;gap:10px;margin-top:auto;margin-bottom:22px;align-self:flex-start;padding:9px 18px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);font-weight:700;font-size:17px;letter-spacing:.04em}
.chip i{width:9px;height:9px;border-radius:50%;background:${c1}}
h1{font-family:Sora;font-weight:700;font-size:${size}px;line-height:1.08;letter-spacing:-.035em}
h1 em{font-style:normal;color:${c1}}
.win{position:absolute;right:70px;top:120px;width:400px;border-radius:22px;background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.2);padding:22px;box-shadow:0 40px 80px -30px rgba(0,0,0,.7);transform:rotate(${(r("rot") * 6 - 3).toFixed(1)}deg)}
.dots{display:flex;gap:7px;margin-bottom:18px}.dots i{width:11px;height:11px;border-radius:50%;background:rgba(255,255,255,.25)}
.code{font-family:Sora;font-weight:700;font-size:${code && code.length > 8 ? 30 : 40}px;letter-spacing:.04em;color:#fff;margin-bottom:16px}
.code small{display:block;font-family:Manrope;font-size:13px;letter-spacing:.14em;color:${c1};margin-bottom:6px}
.f{height:14px;border-radius:7px;background:rgba(255,255,255,.14);margin-bottom:11px}
.bars{display:flex;align-items:flex-end;gap:9px;height:110px;margin-top:20px}
.bars i{flex:1;border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,${c1},${c1}22)}
.bars i:nth-child(even){background:linear-gradient(180deg,${c2},${c2}22)}
.q{position:absolute;right:56px;bottom:70px;width:120px;height:120px;border-radius:30px;background:${c1};color:#0a1324;font-family:Sora;font-weight:700;font-size:72px;display:grid;place-items:center;transform:rotate(-8deg);box-shadow:0 30px 60px -20px ${c1}aa}
</style></head><body>
<div class="o1"></div><div class="o2"></div><div class="grid"></div>
<div class="rings"><i></i><i></i><i></i></div>
<div class="win"><div class="dots"><i></i><i></i><i></i></div>
<div class="code"><small>${question ? "BANNER Q&amp;A" : "ITCADENCE GUIDE"}</small>${esc(code)}</div>
${fields.map((w) => `<div class="f" style="width:${w}%"></div>`).join("")}
<div class="bars">${bars.map((h) => `<i style="height:${h}%"></i>`).join("")}</div></div>
${question ? '<div class="q">?</div>' : ""}
<div class="left">
<div class="logo"><svg width="40" height="40" viewBox="0 0 34 34"><rect width="34" height="34" rx="10" fill="#2ee6c5" fill-opacity=".16"/><g fill="#2ee6c5"><rect x="7" y="13" width="3.6" height="14" rx="1.8"/><rect x="12.8" y="8" width="3.6" height="19" rx="1.8"/><rect x="18.6" y="11" width="3.6" height="16" rx="1.8"/><rect x="24.4" y="15" width="3.6" height="12" rx="1.8"/></g></svg><span>IT<b>Cadence</b></span></div>
<div class="chip"><i></i>${esc(category)}</div>
<h1>${title}</h1>
</div></body></html>`;
}

function emphasise(title) {
  // Highlight the part after a colon or question mark, or the last 2 words
  const t = esc(title);
  const colon = t.indexOf(": ");
  if (colon > 0) return `${t.slice(0, colon + 1)} <em>${t.slice(colon + 2)}</em>`;
  const words = t.split(" ");
  return `${words.slice(0, -2).join(" ")} <em>${words.slice(-2).join(" ")}</em>`;
}


function whyHtml() {
  const rows = [
    ["P1", "Registration Self-Service timeout", "Resolved", "#2ee6c5", "12 min"],
    ["P2", "ILP grade sync – 14 unmatched users", "In progress", "#8b7bff", "38 min"],
    ["P3", "GJAPCTL parameter set for SHRROLL", "Resolved", "#2ee6c5", "1 h"],
    ["P2", "FOAPAL validation on FGAJVCD", "Resolved", "#2ee6c5", "52 min"],
    ["P3", "Self-Service theme update", "Scheduled", "#ffb547", "Tomorrow"],
  ];
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{box-sizing:border-box;margin:0}body{width:1200px;height:900px;overflow:hidden;background:#0a1324;font-family:Manrope,Arial;color:#fff;position:relative}
.o{position:absolute;border-radius:50%}.o1{width:700px;height:700px;left:-200px;top:-250px;background:radial-gradient(circle,#2ee6c555,transparent 65%)}.o2{width:700px;height:700px;right:-250px;bottom:-300px;background:radial-gradient(circle,#8b7bff55,transparent 65%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px}
.card{position:absolute;border-radius:26px;background:linear-gradient(160deg,rgba(255,255,255,.13),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.18);box-shadow:0 40px 80px -30px rgba(0,0,0,.7);padding:30px}
.main{left:70px;top:90px;width:720px}
h3{font-family:Sora;font-size:26px;margin-bottom:6px}.sub{color:#9aa6c0;font-size:16px;margin-bottom:24px}
.row{display:flex;align-items:center;gap:16px;padding:16px 18px;border-radius:14px;background:rgba(255,255,255,.05);margin-bottom:10px;font-size:17px}
.pr{font-family:Sora;font-weight:700;font-size:13px;padding:5px 10px;border-radius:8px;background:rgba(255,255,255,.1)}
.t{flex:1;font-weight:700}.st{font-weight:700;font-size:13px;padding:6px 12px;border-radius:999px}.tm{color:#9aa6c0;width:80px;text-align:right;font-size:14px}
.sla{right:70px;top:150px;width:330px;text-align:center}
.ring{width:210px;height:210px;margin:10px auto 18px;border-radius:50%;background:conic-gradient(#2ee6c5 0 94%,rgba(255,255,255,.1) 94% 100%);display:grid;place-items:center}
.ring div{width:170px;height:170px;border-radius:50%;background:#101b33;display:grid;place-items:center;font-family:Sora;font-weight:700;font-size:46px}
.ring small{display:block;font-size:13px;color:#9aa6c0;font-family:Manrope;font-weight:700;letter-spacing:.1em}
.chat{right:120px;top:560px;width:380px;background:#fff;color:#0a1324;padding:22px}
.chat b{font-family:Sora}.chat p{color:#5b6478;font-size:15px;margin-top:6px}.wa{display:inline-flex;width:40px;height:40px;border-radius:12px;background:#25d366;margin-right:12px;vertical-align:middle}
.bars{display:flex;gap:10px;align-items:flex-end;height:90px;margin-top:18px}.bars i{flex:1;border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,#2ee6c5,#2ee6c522)}.bars i:nth-child(even){background:linear-gradient(180deg,#8b7bff,#8b7bff22)}
</style></head><body><div class="o o1"></div><div class="o o2"></div><div class="grid"></div>
<div class="card main"><h3>ITCadence support desk</h3><div class="sub">Banner &amp; LMS tickets · this week</div>
${rows.map(([p,t,s,c,tm])=>`<div class="row"><span class="pr">${p}</span><span class="t">${t}</span><span class="st" style="background:${c}22;color:${c}">${s}</span><span class="tm">${tm}</span></div>`).join("")}
<div class="bars">${[50,70,45,85,60,90,55,75,65,95,70,80].map(h=>`<i style="height:${h}%"></i>`).join("")}</div></div>
<div class="card sla"><div class="ring"><div><span>94%<small>WITHIN SLA</small></span></div></div><div class="sub" style="margin:0">Illustrative dashboard</div></div>
<div class="card chat"><span class="wa"></span><b>WhatsApp support</b><p>“Registration page is slow for some students” → triaged in minutes</p></div>
</body></html>`;
}

const CAT_CODE = {
  "Banner Basics": "BANNER 9", "Banner Student": "STUDENT", "Banner Finance & HR": "FINANCE",
  "Banner Technical": "TECHNICAL", Integration: "ETHOS", Cloud: "SAAS", "E-Learning": "LMS", "Banner Support": "SUPPORT",
};

const files = fs.readdirSync(POSTS).filter((f) => f.endsWith(".md"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let made = 0;
for (const f of files) {
  const slug = f.replace(/\.md$/, "");
  const out = path.join(OUT, `${slug}.jpg`);
  if (!ALL && fs.existsSync(out)) continue;
  const { data, content } = matter(fs.readFileSync(path.join(POSTS, f), "utf8"));
  const code = data.coverCode || (content.match(/`([A-Z]{7})`/) || [])[1] || CAT_CODE[data.category] || "BANNER";
  const shortTitle = data.coverTitle || data.question || data.title.split(/[:?]/)[0];
  await page.setContent(coverHtml({ title: emphasise(shortTitle), category: data.category, code, question: !!data.question, seed: slug }), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type: "jpeg", quality: 84 });
  made++;
}

// Site-wide Open Graph image + home illustration
const extras = [
  ["og.jpg", { title: "Ellucian Banner support & <em>enterprise e-learning</em>", category: "Dubai · UAE · GCC", code: "BANNER 9", question: false, seed: "og" }],
];
if (ALL || !fs.existsSync(path.join(ROOT, "public", "images", "why-itcadence.jpg"))) {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.setContent(whyHtml(), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(ROOT, "public", "images", "why-itcadence.jpg"), type: "jpeg", quality: 86 });
  await page.setViewportSize({ width: 1200, height: 630 });
  made++;
}
for (const [name, opts] of extras) {
  const out = path.join(ROOT, "public", name);
  if (!ALL && fs.existsSync(out)) continue;
  await page.setContent(coverHtml(opts), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type: "jpeg", quality: 86 });
  made++;
}
await browser.close();
console.log(`Generated ${made} image(s).`);
