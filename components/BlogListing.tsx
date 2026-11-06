import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import PostCard from "./PostCard";
import JsonLd from "./JsonLd";
import { Arrow } from "./Icons";
import { formatDate, getCategories, type Post } from "@/lib/posts";
import { absUrl } from "@/lib/site";

export default function BlogListing({ posts, title, intro, active, crumbs }: {
  posts: Post[]; title: string; intro: string; active?: string; crumbs: { name: string; href: string }[];
}) {
  const cats = getCategories();
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p !== featured);
  const ld = [
    {
      "@context": "https://schema.org", "@type": "CollectionPage", name: title, description: intro,
      url: absUrl(crumbs[crumbs.length - 1].href),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absUrl(`/blog/${p.slug}`), name: p.title })),
      },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absUrl(c.href) })),
    },
  ];
  return (
    <>
      <JsonLd data={ld} />
      <Nav active="/blog" />
      <main>
        <section className="page-hero">
          <div className="blob blob--1" /><div className="blob blob--2" />
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.href} style={{ display: "contents" }}>
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < crumbs.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                </span>
              ))}
            </nav>
            <h1 data-split>{title}</h1>
            <p className="reveal">{intro}</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            {featured && (
              <Link className="featured-post reveal" href={`/blog/${featured.slug}`}>
                <div className="post-card__art">
                  <span className="post-card__cat">Featured · {featured.category}</span>
                  <Image src={featured.cover} alt={featured.coverAlt} fill sizes="(max-width: 1080px) 100vw, 660px" priority />
                </div>
                <div className="featured-post__body">
                  <div className="post-card__meta"><time dateTime={featured.date}>{formatDate(featured.date)}</time><span>·</span><span>{featured.readingMinutes} min read</span></div>
                  <h2>{featured.title}</h2>
                  <p className="muted">{featured.description}</p>
                  <span className="post-card__more">Read article <Arrow /></span>
                </div>
              </Link>
            )}
            <nav className="filters reveal" aria-label="Blog categories">
              <Link className={`filter${!active ? " is-active" : ""}`} href="/blog">All articles</Link>
              {cats.map((c) => (
                <Link key={c.slug} className={`filter${active === c.slug ? " is-active" : ""}`} href={`/blog/category/${c.slug}`}>
                  {c.name} <span style={{ opacity: 0.55 }}>{c.count}</span>
                </Link>
              ))}
            </nav>
            <div className="posts" data-stagger>{rest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
            <div className="newsletter reveal" style={{ marginTop: 90 }}>
              <div className="blob" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 className="h3" style={{ fontSize: 32 }}>Have a Banner question we haven&apos;t answered?</h2>
                <p>Send it to our support desk on WhatsApp. We answer it for you, and the best ones become articles.</p>
              </div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/banner-faq" className="btn">Browse the Q&amp;A hub <Arrow /></Link>
                <Link href="/#contact" className="btn btn--ghost" style={{ color: "#fff" }}>Ask a question</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
