import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import PostCard from "@/components/PostCard";
import JsonLd from "@/components/JsonLd";
import { Book, Cal, Clock, LinkedIn, LogoMark, Spark, WhatsApp } from "@/components/Icons";
import { formatDate, getAllPosts, getPost, getRelated, slugify } from "@/lib/posts";
import { SITE, absUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, "Ellucian Banner", post.category],
    alternates: { canonical: url, types: { "text/markdown": `/markdown/${post.slug}.md` } },
    openGraph: {
      type: "article", url, title: post.title, description: post.description,
      publishedTime: post.date, modifiedTime: post.updated, section: post.category, tags: post.tags,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.cover] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelated(post);
  const url = absUrl(`/blog/${post.slug}`);
  const catSlug = slugify(post.category);

  const ld: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: post.title,
      description: post.description,
      image: [absUrl(post.cover)],
      datePublished: post.date,
      dateModified: post.updated,
      author: { "@type": "Organization", name: "ITCadence", url: SITE.url },
      publisher: { "@id": absUrl("/#organization") },
      mainEntityOfPage: url,
      articleSection: post.category,
      keywords: post.tags.join(", "),
      about: [{ "@type": "SoftwareApplication", name: "Ellucian Banner", applicationCategory: "Higher education ERP" }],
      inLanguage: "en",
      wordCount: post.markdown.split(/\s+/).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.category, item: absUrl(`/blog/category/${catSlug}`) },
        { "@type": "ListItem", position: 4, name: post.title, item: url },
      ],
    },
  ];
  const qa = [...(post.question && post.answer ? [{ q: post.question, a: post.answer }] : []), ...post.faqs];
  if (qa.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: qa.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <>
      <JsonLd data={ld} />
      <Nav active="/blog" />
      <main>
        <article>
          <header className="article-hero">
            <div className="page-hero" style={{ position: "absolute", inset: 0, padding: 0 }}><div className="blob blob--1" /><div className="blob blob--2" /></div>
            <div className="container">
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span>
                <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
                <Link href={`/blog/category/${catSlug}`}>{post.category}</Link>
              </nav>
              <h1 data-split>{post.title}</h1>
              <p className="lead reveal">{post.description}</p>
              <div className="article-meta reveal">
                <span><Cal /> <time dateTime={post.date}>{formatDate(post.date)}</time></span>
                <span><Clock /> {post.readingMinutes} min read</span>
                <span><Book size={18} /> {post.category}</span>
              </div>
            </div>
          </header>
          <div className="article-cover reveal reveal--scale">
            <Image src={post.cover} alt={post.coverAlt} width={1200} height={630} priority sizes="(max-width: 1100px) 100vw, 1052px" />
          </div>
          <div className="article-layout">
            <div className="prose">
              {post.answer && (
                <section className="answer-box" aria-label="Short answer">
                  <div className="answer-box__label"><Spark /> {post.question ? "Short answer" : "Key takeaway"}</div>
                  {post.question && <h2 style={{ position: "relative", color: "#fff", fontSize: 22, margin: "0 0 10px" }}>{post.question}</h2>}
                  <p>{post.answer}</p>
                </section>
              )}
              <div dangerouslySetInnerHTML={{ __html: post.html }} />

              {post.faqs.length > 0 && (
                <section className="faq-block" aria-labelledby="faq-h">
                  <h2 id="faq-h">Frequently asked questions</h2>
                  <div className="faq">
                    {post.faqs.map((f, i) => (
                      <div className="faq__item" key={i} style={{ "--d": "0s" } as CSSProperties}>
                        <h3 style={{ margin: 0 }}><button className="faq__q" aria-expanded="false">{f.q}<span className="faq__icon" /></button></h3>
                        <div className="faq__a"><div><p>{f.a}</p></div></div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="tags">{post.tags.map((t) => <span key={t}>#{t}</span>)}</div>
              <p className="updated-note">Last reviewed <time dateTime={post.updated}>{formatDate(post.updated)}</time> by the ITCadence Banner team. Ellucian product capabilities vary by version and licence; confirm details against current Ellucian documentation.</p>

              <div className="author">
                <div className="author__avatar"><LogoMark /></div>
                <div><b>ITCadence Banner Team</b><span>Ellucian Banner and e-learning specialists, {SITE.address.region}. <Link href="/#contact" style={{ color: "var(--accent-deep)", fontWeight: 600 }}>Need help with this?</Link></span></div>
              </div>
            </div>
            <aside className="toc" aria-label="On this page">
              {post.headings.length > 0 && (
                <>
                  <h2 className="h4" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)", marginBottom: 16 }}>On this page</h2>
                  <ol>{post.headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
                </>
              )}
              <h2 className="h4" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)", marginBottom: 16 }}>Share</h2>
              <div className="share">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn"><LinkedIn /></a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`} target="_blank" rel="noopener" aria-label="Share on WhatsApp"><WhatsApp size={17} /></a>
                <a href={`/markdown/${post.slug}.md`} aria-label="View as Markdown" title="View as Markdown" style={{ fontSize: 11, fontWeight: 700 }}>MD</a>
              </div>
            </aside>
          </div>
        </article>
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="more-h">
          <div className="container">
            <div className="section-head"><span className="eyebrow reveal">Keep reading</span><h2 id="more-h" data-split>Related Banner articles</h2></div>
            <div className="posts" data-stagger>{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      </main>
    </>
  );
}
