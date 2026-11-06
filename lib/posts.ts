import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

export type Faq = { q: string; a: string };
export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  updated: string;
  readingMinutes: number;
  answer?: string; // short, answer-first summary (great for featured snippets & LLMs)
  question?: string;
  faqs: Faq[];
  featured: boolean;
  cover: string;
  coverAlt: string;
  markdown: string;
  html: string;
  headings: { id: string; text: string }[];
};

const DIR = path.join(process.cwd(), "content", "posts");

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&amp;|&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function render(md: string) {
  const headings: { id: string; text: string }[] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: any, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const plain = text.replace(/[`*_]/g, "");
        const id = slugify(plain);
        if (depth === 2) headings.push({ id, text: plain });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      table(this: any, token: Tokens.Table) {
        const head = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("");
        const body = token.rows
          .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
      },
      image({ href, title, text }: Tokens.Image) {
        return `<figure class="figure"><img src="${href}" alt="${text}" loading="lazy" decoding="async" />${
          title ? `<figcaption>${title}</figcaption>` : ""
        }</figure>`;
      },
      blockquote(this: any, { tokens }: Tokens.Blockquote) {
        const body = this.parser.parse(tokens);
        if (/^<p>\s*(<strong>)?(Note|Tip|Important)/i.test(body)) return `<div class="callout">${body}</div>`;
        return `<blockquote>${body}</blockquote>`;
      },
      link(this: any, { href, tokens }: Tokens.Link) {
        const label = this.parser.parseInline(tokens);
        const ext = /^https?:\/\//.test(href);
        return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
      },
    },
  });
  const html = marked.parse(md) as string;
  return { html, headings };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  cache = files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      const { html, headings } = render(content);
      const words = [content, data.answer || "", ...(data.faqs || []).map((f: Faq) => f.q + " " + f.a)].join(" ").split(/\s+/).length;
      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        date: String(data.date),
        updated: String(data.updated || data.date),
        readingMinutes: Math.max(2, Math.round(words / 200)),
        answer: data.answer,
        question: data.question,
        faqs: data.faqs || [],
        featured: !!data.featured,
        cover: data.cover || `/images/blog/${slug}.jpg`,
        coverAlt: data.coverAlt || `${data.title} – ITCadence Ellucian Banner blog`,
        markdown: content.trim(),
        html,
        headings,
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export function getCategories() {
  const map = new Map<string, number>();
  getAllPosts().forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
  return [...map.entries()].map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export function getRelated(post: Post, n = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const score = (p: Post) =>
    (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, n);
}

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
