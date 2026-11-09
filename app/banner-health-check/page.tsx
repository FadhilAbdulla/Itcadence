import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import HealthCheck from "@/components/HealthCheck";
import { AREAS, TOTAL_CHECKS } from "@/lib/healthcheck";
import { SITE, absUrl, pagePreview } from "@/lib/site";

const title = "Free Ellucian Banner Health Check";
const description = `Score your Ellucian Banner environment in five minutes: ${TOTAL_CHECKS} questions on upgrades, security, operations, integrations and SaaS readiness, with next steps.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/banner-health-check" },
  ...pagePreview({ url: "/banner-health-check", title: `${title} | ${SITE.name}`, description }),
};

export default function BannerHealthCheckPage() {
  const ld = [
    {
      "@context": "https://schema.org", "@type": "WebApplication", name: title, url: absUrl("/banner-health-check"),
      description, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "AED" }, provider: { "@id": absUrl("/#organization") },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Banner health check", item: absUrl("/banner-health-check") },
      ],
    },
  ];
  return (
    <>
      <JsonLd data={ld} />
      <Nav />
      <main>
        <section className="page-hero">
          <div className="blob blob--1" /><div className="blob blob--2" />
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Banner health check</span></nav>
            <h1 data-split>Free Ellucian Banner health check</h1>
            <p className="reveal">Answer {TOTAL_CHECKS} quick questions across {AREAS.length} areas. Get a score, the gaps worth fixing first and links to practical guides. It takes about five minutes.</p>
          </div>
        </section>
        <section className="section hc-section">
          <div className="container hc-wrap">
            <p className="hc__intro">
              Answer for your production Banner environment. Choose <b>Not sure</b> when nobody can confirm the answer, as that is useful to know too.
              Your answers stay in your browser and are not stored or sent anywhere unless you choose to share your results.
            </p>
            <HealthCheck />
            <p className="hc__disclaimer muted">This self-assessment gives a quick indication, not an audit. For an independent review of your environment, <Link href="/#contact">talk to ITCadence</Link>.</p>
          </div>
        </section>
      </main>
    </>
  );
}
