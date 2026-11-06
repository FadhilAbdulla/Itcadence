import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { Arrow } from "@/components/Icons";
import { getAllPosts, slugify } from "@/lib/posts";
import { absUrl, pagePreview } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ellucian Banner FAQ: Common Questions Answered",
  description: "Short, direct answers to common Ellucian Banner questions: Banner 9, PIDM, FOAPAL, job submission, holds, grade roll, Ethos, ILP, SaaS and more.",
  alternates: { canonical: "/banner-faq" },
  ...pagePreview({ url: "/banner-faq", title: "Ellucian Banner FAQ | ITCadence", description: "Short, direct answers to common Ellucian Banner questions: Banner 9, PIDM, FOAPAL, job submission, holds, grade roll, Ethos, ILP, SaaS and more." }),
};

export default function BannerFaq() {
  const qs = getAllPosts().filter((p) => p.question && p.answer);
  const groups = [...new Set(qs.map((p) => p.category))].map((c) => ({ name: c, id: slugify(c), items: qs.filter((p) => p.category === c) }));
  const ld = [
    {
      "@context": "https://schema.org", "@type": "FAQPage", url: absUrl("/banner-faq"),
      name: "Ellucian Banner FAQ",
      mainEntity: qs.map((p) => ({
        "@type": "Question", name: p.question,
        acceptedAnswer: { "@type": "Answer", text: p.answer, url: absUrl(`/blog/${p.slug}`) },
      })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Banner FAQ", item: absUrl("/banner-faq") },
      ],
    },
  ];
  return (
    <>
      <JsonLd data={ld} />
      <Nav active="/banner-faq" />
      <main>
        <section className="page-hero">
          <div className="blob blob--1" /><div className="blob blob--2" />
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Banner Q&amp;A</span></nav>
            <h1 data-split>Ellucian Banner questions, answered</h1>
            <p className="reveal">{qs.length} of the questions Banner teams ask most, each with a short direct answer and a full article behind it.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <nav className="jump reveal" aria-label="Jump to topic">
              {groups.map((g) => <a key={g.id} className="filter" href={`#${g.id}`}>{g.name} <span style={{ opacity: 0.55 }}>{g.items.length}</span></a>)}
              <Link className="filter" href="/banner-glossary">Glossary →</Link>
            </nav>
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="qa-group" style={{ scrollMarginTop: 100 }} aria-labelledby={`${g.id}-h`}>
                <h2 id={`${g.id}-h`} className="reveal">{g.name}</h2>
                <div className="qa-hub" data-stagger>
                  {g.items.map((p) => (
                    <article key={p.slug} className="qa-item">
                      <Link href={`/blog/${p.slug}`} className="qa-item__img" aria-hidden="true" tabIndex={-1}>
                        <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 640px) 100vw, 220px" />
                      </Link>
                      <div>
                        <h3 style={{ fontSize: 22, marginBottom: 10 }}><Link href={`/blog/${p.slug}`}>{p.question}</Link></h3>
                        <p>{p.answer}</p>
                        <Link href={`/blog/${p.slug}`} className="post-card__more">Read the full answer <Arrow /></Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
