import { getAllPosts, getPost } from "@/lib/posts";
import { postMarkdown } from "@/lib/llms";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ file: `${p.slug}.md` }));
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const post = getPost(file.replace(/\.md$/, ""));
  if (!post) return new Response("Not found", { status: 404 });
  return new Response(postMarkdown(post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex, follow" },
  });
}
