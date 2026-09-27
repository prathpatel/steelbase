import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Photo, SectionHead } from "@/components/common";
import { JournalCard } from "@/components/journal-card";
import { ProductCard } from "@/components/product-card";
import { getProduct, getSetup, type Product, type Setup } from "@/lib/catalog";
import { formatDate, getPost, getPosts, renderPost } from "@/lib/journal";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [`/images/${post.image}.webp`],
    },
  };
}

export default async function JournalPostPage({ params }: { params: Params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const products = post.products.map(getProduct).filter((p): p is Product => Boolean(p));
  const setups = post.setups.map(getSetup).filter((s): s is Setup => Boolean(s));
  const more = getPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="page-top section-light article-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/journal">Journal</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{post.tag}</span>
            </nav>
            <h1 className="display article-title">{post.title}</h1>
            <p className="lede">{post.description}</p>
            <p className="journal-meta article-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingMinutes} min read</span>
            </p>
          </div>
        </header>

        <div className="article-photo">
          <Photo name={post.image} alt={post.imageAlt} priority />
        </div>

        <div className="section section-light">
          <div className="wrap">
            <div className="prose" dangerouslySetInnerHTML={{ __html: renderPost(post) }} />
          </div>
        </div>
      </article>

      {(products.length > 0 || setups.length > 0) && (
        <section className="section section-dark">
          <div className="wrap">
            <SectionHead eyebrow="From the article" title="Equipment mentioned." />
            {products.length > 0 && (
              <div className={`product-grid ${products.length === 4 ? "product-grid-4" : ""}`}>
                {products.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
            {setups.length > 0 && (
              <div className="article-setups">
                {setups.map((s) => (
                  <Link key={s.slug} href={`/setups/${s.slug}`} className="text-link">
                    Plan a {s.name.toLowerCase()} <Arrow />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section section-steel section-tight">
        <div className="wrap inline-cta">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="h3">Ready to price it up?</h2>
            <p>Tell us what you&apos;re building. We&apos;ll confirm model, price, delivery and installation.</p>
          </div>
          <ButtonLink href="/quote">Get a quote</ButtonLink>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section section-light">
          <div className="wrap">
            <SectionHead
              eyebrow="Journal"
              title="Keep reading."
              action={
                <Link href="/journal" className="text-link">
                  All articles <Arrow />
                </Link>
              }
            />
            <div className="journal-grid">
              {more.map((p) => (
                <JournalCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
