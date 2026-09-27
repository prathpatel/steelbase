import type { Metadata } from "next";
import { ButtonLink } from "@/components/common";
import { JournalCard } from "@/components/journal-card";
import { getPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Practical guides on choosing gym equipment and planning training spaces: barbells, knurling, free-weight floors and what commercial-grade really means.",
};

export default function JournalPage() {
  const posts = getPosts();

  return (
    <>
      <section className="page-top section-light">
        <div className="wrap">
          <p className="eyebrow">Journal</p>
          <h1 className="display page-title">
            Know your
            <br />
            steel.
          </h1>
          <p className="lede">
            Straight guides to choosing equipment and planning a training space. What to ask for, what to check and
            what actually matters.
          </p>
          <div className="journal-grid journal-grid-index">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-steel section-tight">
        <div className="wrap inline-cta">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="h3">Know what you need?</h2>
            <p>One piece or a whole floor. We&apos;ll come back with a clear quote.</p>
          </div>
          <ButtonLink href="/quote">Get a quote</ButtonLink>
        </div>
      </section>
    </>
  );
}
