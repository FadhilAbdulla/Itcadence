import type { Metadata } from "next";
import BlogListing from "@/components/BlogListing";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Ellucian Banner Blog: Q&A, Guides and Best Practices",
  description: "Answers to common Ellucian Banner questions and practical guides on Banner 9, Student, Finance, HR, Ethos integrations, LMS integration and Banner SaaS, from ITCadence.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "Ellucian Banner Blog | ITCadence", images: ["/og.jpg"] },
};

export default function BlogPage() {
  return (
    <BlogListing
      posts={getAllPosts()}
      title="Insights and answers for teams who run Ellucian Banner"
      intro="Practical answers to common Banner questions and in-depth guides on support, upgrades, integrations and enterprise e-learning, written from real support work."
      crumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]}
    />
  );
}
