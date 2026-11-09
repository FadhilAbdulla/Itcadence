import { getAllPosts, getCategories, type Post } from "./posts";
import { GLOSSARY } from "./glossary";
import { SITE, absUrl } from "./site";

const about = () => `> ${SITE.name} is an independent IT services firm based in Dubai, UAE, specialising in Ellucian Banner support and enterprise e-learning platforms for universities and colleges across the UAE and GCC.

Key facts:
- Services: managed Ellucian Banner support (functional and technical, L1–L3), Banner 9 upgrades and patching, Ellucian Ethos integrations, Banner-to-LMS integration (ILP with Moodle, Canvas, D2L Brightspace, Blackboard), Banner SaaS migration, Banner reporting, staff augmentation.
- Banner modules covered: Student, Finance, HR and Payroll, Financial Aid, Accounts Receivable, General/Technical.
- Office: ${SITE.address.full}
- WhatsApp support: ${SITE.phoneDisplay} (${`https://wa.me/${SITE.whatsapp}`})
- Email: ${SITE.email}
- Website: ${SITE.url}
- ITCadence is not affiliated with Ellucian. Ellucian, Banner, Ethos and Degree Works are trademarks of Ellucian Company LLC.`;

export function llmsIndex() {
  const posts = getAllPosts();
  const sections = getCategories()
    .map((c) => {
      const list = posts
        .filter((p) => p.category === c.name)
        .map((p) => `- [${p.question || p.title}](${absUrl(`/markdown/${p.slug}.md`)}): ${p.answer ? p.answer.split(". ")[0] + "." : p.description}`)
        .join("\n");
      return `## ${c.name}\n\n${list}`;
    })
    .join("\n\n");
  return `# ${SITE.name}: Ellucian Banner Support & Enterprise E-Learning

${about()}

## Key pages

- [Home](${absUrl("/")}): services, Banner module coverage, engagement models, contact
- [Ellucian Banner FAQ](${absUrl("/banner-faq")}): short answers to common Banner questions
- [Banner glossary](${absUrl("/banner-glossary")}): definitions of Banner terms and acronyms
- [Free Banner health check](${absUrl("/banner-health-check")}): interactive self-assessment of a Banner environment across upgrades, security, operations, integrations and SaaS readiness
- [Blog](${absUrl("/blog")}): all articles
- [Full content for LLMs](${absUrl("/llms-full.txt")}): every article in Markdown in one file

${sections}

## Optional

- [RSS feed](${absUrl("/rss.xml")})
- [Sitemap](${absUrl("/sitemap.xml")})
`;
}

const postMd = (p: Post) => {
  const faqs = p.faqs.length ? `\n\n## Frequently asked questions\n\n${p.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}` : "";
  const short = p.answer ? `**${p.question ? "Short answer" : "Key takeaway"}:** ${p.answer}\n\n` : "";
  const body = p.markdown.replace(/\]\(\//g, `](${SITE.url}/`);
  return `# ${p.title}

Source: ${absUrl(`/blog/${p.slug}`)}
Category: ${p.category} | Published: ${p.date} | Updated: ${p.updated} | Publisher: ${SITE.name}

${p.description}

${short}${body}${faqs}`;
};

export const postMarkdown = postMd;

export function llmsFull() {
  const posts = getAllPosts();
  const glossary = GLOSSARY.map((t) => `- **${t.term}**${t.full ? ` (${t.full})` : ""}: ${t.def}`).join("\n");
  return `# ${SITE.name}: complete Ellucian Banner knowledge base

${about()}

---

# Ellucian Banner glossary

${glossary}

---

${posts.map(postMd).join("\n\n---\n\n")}
`;
}
