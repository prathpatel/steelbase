import Link from "next/link";
import { formatDate, type Post } from "@/lib/journal";
import { Arrow, Photo } from "./common";

export function JournalCard({ post }: { post: Post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="journal-card" data-reveal>
      <div className="journal-card-photo">
        <Photo name={post.image} alt={post.imageAlt} />
      </div>
      <div className="journal-card-body">
        <p className="journal-meta">
          <span>{post.tag}</span>
          <span>{post.readingMinutes} min read</span>
        </p>
        <h3 className="journal-card-title">{post.title}</h3>
        <p className="journal-card-desc">{post.description}</p>
        <div className="journal-card-foot">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="round-arrow">
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
