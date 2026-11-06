import { getAllPosts } from "@/lib/posts";
import { SITE, absUrl } from "@/lib/site";

export const dynamic = "force-static";

const x = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map((p) => `<item>
  <title>${x(p.title)}</title>
  <link>${absUrl(`/blog/${p.slug}`)}</link>
  <guid isPermaLink="true">${absUrl(`/blog/${p.slug}`)}</guid>
  <pubDate>${new Date(p.date + "T08:00:00Z").toUTCString()}</pubDate>
  <category>${x(p.category)}</category>
  <description>${x(p.answer || p.description)}</description>
  <enclosure url="${absUrl(p.cover)}" type="image/jpeg" length="0"/>
</item>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${x(SITE.name)} – Ellucian Banner blog</title>
  <link>${SITE.url}</link>
  <description>${x(SITE.description)}</description>
  <language>en</language>
  <atom:link href="${absUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
