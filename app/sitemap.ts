import type { MetadataRoute } from "next";
import { getAllPosts, getCategories } from "@/lib/posts";
import { absUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updated || new Date().toISOString().slice(0, 10);
  return [
    { url: absUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absUrl("/blog"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: absUrl("/banner-faq"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: absUrl("/banner-health-check"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    { url: absUrl("/banner-glossary"), lastModified: latest, changeFrequency: "monthly", priority: 0.7 },
    ...getCategories().map((c) => ({ url: absUrl(`/blog/category/${c.slug}`), lastModified: latest, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...posts.map((p) => ({
      url: absUrl(`/blog/${p.slug}`), lastModified: p.updated, changeFrequency: "monthly" as const, priority: 0.8,
      images: [absUrl(p.cover)],
    })),
  ];
}
