# ITCadence website (Next.js)

Corporate site for **ITCadence**: Ellucian Banner support and enterprise e-learning, Dubai.
Built with Next.js 16 (App Router) and fully static, so it can be deployed to Vercel, Netlify, any Node host, or exported.

## Run it

```bash
npm install
cp .env.example .env.local      # set NEXT_PUBLIC_SITE_URL to your real domain
npm run dev                     # http://localhost:3000
npm run build && npm start      # production
```

> Set `NEXT_PUBLIC_SITE_URL` before building for production. Canonical URLs, the sitemap, Open Graph tags, RSS and llms.txt all use it.

## Project layout

| Path | What it is |
|---|---|
| `app/` | Pages and routes (home, blog, categories, Banner FAQ hub, glossary, sitemap, robots, RSS, llms.txt) |
| `components/` | Nav, footer, post cards, contact form, `Interactions.tsx` (all animations) |
| `content/posts/*.md` | **Blog posts.** One Markdown file per article |
| `lib/site.ts` | Company details: phone, WhatsApp, email, address, domain |
| `lib/glossary.ts` | Banner glossary terms |
| `public/images/blog/` | Cover images (1200×630, also used as social share images) |
| `public/images/diagrams/` | In-article SVG diagrams |
| `scripts/` | Cover image and diagram generators |

## Adding a blog post / Banner Q&A

Create `content/posts/your-slug.md`:

```md
---
title: "How Do I Reset a Banner Self-Service PIN?"
description: "One-sentence summary used for Google and social cards (150–160 chars)."
category: "Banner Student"        # reuse an existing category where possible
tags: ["Self-Service", "PIN"]
date: "2026-11-05"
updated: "2026-11-05"             # optional, bump when you revise the post
question: "How do I reset a Banner Self-Service PIN?"   # optional; makes it a Q&A
answer: "A 2–4 sentence direct answer. Shown in the Short answer box, in FAQ schema and in llms.txt."
coverCode: "GOATPAC"              # optional, the big code shown on the cover image
faqs:
  - q: "Follow-up question?"
    a: "Short answer."
---

## Overview

Article body in Markdown. Tables, lists, `code`, > **Tip:** callouts and
![alt text](/images/diagrams/your-diagram.svg "caption") images are supported.
```

Then generate its cover image:

```bash
npm i -D playwright && npx playwright install chromium   # first time only
npm run images            # creates covers only for posts that don't have one
```

The post automatically appears in the blog, its category page, the FAQ hub (if it has `question` + `answer`), the sitemap, RSS, `llms.txt`, `llms-full.txt` and `/markdown/<slug>.md`.

## SEO & LLM optimisation built in

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards with a unique image per post
- JSON-LD: Organization, ProfessionalService (Dubai address, phone), WebSite, TechArticle, BreadcrumbList, FAQPage, DefinedTermSet (glossary), CollectionPage
- `sitemap.xml` (with images), `robots.txt` explicitly allowing search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…)
- `llms.txt` (site summary and index for AI assistants) and `llms-full.txt` (all content in one Markdown file)
- Each article available as Markdown at `/markdown/<slug>.md`, linked with `rel="alternate"`
- Answer-first structure: every Q&A opens with a 2–4 sentence direct answer, then detail, tables and FAQs
- Static generation for fast load times; semantic HTML, breadcrumbs, internal linking between related posts
- RSS feed at `/rss.xml`

After going live: submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Before launch, update

- `lib/site.ts`: real email address (currently `info@itcadence.com`) and domain
- Home page stats (24/7, 15 min, etc. in `app/page.tsx`): confirm they match your real commitments
- The contact form hands details to WhatsApp; connect a form service (Formspree, Resend, etc.) if you also want emails
