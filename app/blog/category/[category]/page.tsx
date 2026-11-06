import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/BlogListing";
import { getAllPosts, getCategories } from "@/lib/posts";

type Props = { params: Promise<{ category: string }> };

const INTROS: Record<string, string> = {
  "banner-basics": "Start here: what Ellucian Banner is, how Banner 9 works, and the core concepts every Banner user should know.",
  "banner-student": "Registration, holds, time tickets, grade roll, Degree Works and fee assessment in Banner Student, explained.",
  "banner-finance-and-hr": "FOAPAL, payroll processing and financial aid year rollover in Banner Finance, HR and Financial Aid.",
  "banner-technical": "Job submission, population selection, security, SSO, ESM, performance and Extensibility for Banner technical teams.",
  integration: "Ellucian Ethos, APIs and modern integration patterns for Banner.",
  cloud: "Banner SaaS, cloud migration planning and the new operating model.",
  "e-learning": "Connecting Banner with Moodle, Canvas, Brightspace and Blackboard through ILP and APIs.",
  "banner-support": "Runbooks and operating rhythms for teams who keep Banner running.",
};

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategories().find((x) => x.slug === category);
  if (!c) return {};
  return {
    title: `${c.name}: Ellucian Banner Articles and Answers`,
    description: INTROS[category] || `Ellucian Banner articles about ${c.name}.`,
    alternates: { canonical: `/blog/category/${category}` },
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
