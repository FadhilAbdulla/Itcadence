import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { GLOSSARY, termId } from "@/lib/glossary";
import { absUrl, pagePreview } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ellucian Banner Glossary: Banner Terms Explained",
  description: "Plain-English definitions of Ellucian Banner terms: PIDM, FOAPAL, CRN, term codes, Application Navigator, Ethos, ILP, ESM, Data Connect and more.",
  alternates: { canonical: "/banner-glossary" },
  ...pagePreview({ url: "/banner-glossary", title: "Ellucian Banner Glossary | ITCadence", description: "Plain-English definitions of Ellucian Banner terms: PIDM, FOAPAL, CRN, term codes, Application Navigator, Ethos, ILP, ESM, Data Connect and more." }),
};

export default function Glossary() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(sorted.map((t) => t.term[0].toUpperCase()))];
  const ld = {
    "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Ellucian Banner Glossary", url: absUrl("/banner-glossary"),
    hasDefinedTerm: sorted.map((t) => ({
      "@type": "DefinedTerm", name: t.term, alternateName: t.full, description: t.def,
      url: absUrl(`/banner-glossary#${termId(t.term)}`), inDefinedTermSet: absUrl("/banner-glossary"),
    })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <Nav />
      <main>
        <section className="page-hero">
          <div className="blob blob--1" /><div className="blob blob--2" />
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Banner glossary</span></nav>
            <h1 data-split>Ellucian Banner glossary</h1>
            <p className="reveal">{sorted.length} Banner terms and acronyms, defined in plain English, with links to the full explanations.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <nav className="jump reveal" aria-label="Letters">
              {letters.map((l) => <a key={l} className="filter" href={`#letter-${l}`}>{l}</a>)}
            </nav>
            <dl className="glossary" data-stagger>
              {sorted.map((t, i) => {
                const first = i === 0 || sorted[i - 1].term[0].toUpperCase() !== t.term[0].toUpperCase();
                return (
                  <div className="term" key={t.term} id={termId(t.term)}>
                    <dt>{first && <span id={`letter-${t.term[0].toUpperCase()}`} style={{ position: "relative", top: -100 }} />}{t.term}{t.full && <small>{t.full}</small>}</dt>
                    <dd>{t.def} {t.link && <Link href={t.link}>Learn more →</Link>}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>
      </main>
    </>
  );
}
