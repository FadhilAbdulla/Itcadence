import type { Metadata } from "next";
import BlogListing from "@/components/BlogListing";
import { getAllPosts } from "@/lib/posts";
import { pagePreview } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ellucian Banner Blog: Q&A and Practical Guides",
  description: "Answers to common Ellucian Banner questions and practical guides on Banner 9, Student, Finance, HR, Ethos, LMS integration and SaaS, from ITCadence.",
  alternates: { canonical: "/blog" },
  ...pagePreview({ url: "/blog", title: "Ellucian Banner Blog | ITCadence", description: "Answers to common Ellucian Banner questions and practical guides on Banner 9, Student, Finance, HR, Ethos, LMS integration and SaaS, from ITCadence." }),
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
