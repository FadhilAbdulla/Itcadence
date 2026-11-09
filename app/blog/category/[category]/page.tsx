import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/BlogListing";
import { getAllPosts, getCategories } from "@/lib/posts";
import { pagePreview } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

const INTROS: Record<string, string> = {
  "banner-basics": "Start here: what Ellucian Banner is, how Banner 9 works, and the core concepts every Banner user should know.",
  "banner-student": "Registration, holds, time tickets, grade roll, Degree Works and fee assessment in Banner Student, explained.",
  "banner-finance-and-hr": "FOAPAL, payroll processing and financial aid year rollover in Banner Finance, HR and Financial Aid.",
  "banner-technical": "Job submission, population selection, security, SSO, ESM, performance and Extensibility for Banner technical teams.",
  integration: "Ellucian Ethos, REST APIs and modern integration patterns for Banner, and how to move away from fragile custom scripts.",
  cloud: "Banner SaaS, Ellucian Student powered by Banner, UAE hosting, migration timelines and what changes when direct database access goes away.",
  "e-learning": "Connecting Banner with Moodle, Canvas, Brightspace and Blackboard through ILP and APIs.",
  migration: "Moving to Ellucian Banner from a legacy system, converting data safely and choosing the right migration support.",
  "banner-support": "Runbooks, patching rhythms and registration-week readiness for the teams who keep Ellucian Banner running.",
};

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategories().find((x) => x.slug === category);
  if (!c) return {};
  const title = `${c.name}: Ellucian Banner Articles`;
  const description = INTROS[category] || `Ellucian Banner articles about ${c.name}.`;
  const url = `/blog/category/${category}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    ...pagePreview({ url, title: `${title} | ITCadence`, description }),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategories().find((x) => x.slug === category);
  if (!c) notFound();
  const posts = getAllPosts().filter((p) => p.category === c.name);
  return (
    <BlogListing
      posts={posts}
      active={category}
      title={`${c.name}`}
      intro={INTROS[category] || `Ellucian Banner articles about ${c.name}.`}
      crumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: c.name, href: `/blog/category/${category}` }]}
    />
  );
}
