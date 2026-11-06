import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./Icons";
import { formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link className="post-card" href={`/blog/${post.slug}`} data-tilt="4">
      <div className="post-card__art">
        <span className="post-card__cat">{post.category}</span>
        <Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 380px" priority={priority} />
      </div>
      <div className="post-card__body">
        <div className="post-card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time><span>·</span><span>{post.readingMinutes} min read</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="post-card__more">{post.question ? "Read the answer" : "Read article"} <Arrow /></span>
      </div>
    </Link>
  );
}
