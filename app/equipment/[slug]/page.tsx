import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Check, SectionHead, TierBadge } from "@/components/common";
import { ProductArt, ProductCard } from "@/components/product-card";
import { formatPrice, getProduct, getTier, products, setups } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const tier = getTier(product.tier);
  const related = products.filter((p) => p.tier === product.tier && p.slug !== product.slug).slice(0, 3);
  const suits = setups.filter((s) => s.starters.includes(product.slug));
  const whatsapp = whatsappLink(`Hi SteelBase, I'm interested in the ${product.name} (${product.code}).`);

  return (
    <>
      <section className="page-top section-light">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/equipment">Equipment</Link>
            <span aria-hidden="true">/</span>
            <Link href={tier.href}>{tier.name}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="pdp">
            <div className="pdp-art">
              <ProductArt product={product} large />
            </div>

            <div className="pdp-info">
              <div className="pdp-tags">
                <TierBadge tier={product.tier} />
                <span className="pdp-cat">{product.category}</span>
              </div>
              <h1 className="pdp-title">{product.name}</h1>
              <p className="pdp-summary">{product.summary}</p>

              <div className="pdp-price">
                <span className="pdp-price-value">{formatPrice(product.price)}</span>
                <span className="pdp-price-note">
                  Indicative price · {tier.name} tier ({tier.range}). Final price, delivery and installation are
                  confirmed in your quote.
                </span>
              </div>

              <div className="actions">
                <ButtonLink href={`/quote?need=${product.tier}&product=${product.slug}`}>Request this item</ButtonLink>
                {whatsapp ? (
                  <ButtonLink href={whatsapp} variant="ghost">
                    Ask on WhatsApp
                  </ButtonLink>
                ) : (
                  <ButtonLink href="/contact" variant="ghost">
                    Ask a question
                  </ButtonLink>
                )}
              </div>

              <ul className="checklist">
                {product.highlights.map((h) => (
                  <li key={h}>
                    <Check />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="pdp-ship">
                <p className="eyebrow">Shipping</p>
                <p>
                  Ships direct from our manufacturing partner to your address. Delivery timeline and installation (where
                  needed) are confirmed with your quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap spec-layout">
          <SectionHead
            eyebrow="Specifications"
            title="The details."
            intro="Typical figures for this class of equipment. Your quote confirms the exact manufacturer model and its specifications."
          />
          <div>
            <dl className="spec-table">
              {product.specs.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div>
                <dt>Model code</dt>
                <dd>{product.code}</dd>
              </div>
            </dl>
            <div className="ideal-for">
              <p className="eyebrow">Ideal for</p>
              <ul className="chips">
                {product.idealFor.map((i) => (
                  <li key={i} className="chip chip-static">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {suits.length > 0 && (
        <section className="section section-steel section-tight">
          <div className="wrap inline-cta">
            <div>
              <p className="eyebrow">Tier 03 · Build</p>
              <h2 className="h3">Part of a bigger plan?</h2>
              <p>
                {product.name} is a common starting point for{" "}
                {suits.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && (i === suits.length - 1 ? " and " : ", ")}
                    <Link href={`/setups/${s.slug}`} className="inline-link">
                      {s.name.toLowerCase()}
                    </Link>
                  </span>
                ))}{" "}
                setups.
              </p>
            </div>
            <ButtonLink href="/setups">Plan a full setup</ButtonLink>
          </div>
        </section>
      )}

      <section className="section section-light">
        <div className="wrap">
          <SectionHead
            eyebrow={`More from ${tier.name} · ${tier.range}`}
            title="In the same tier."
            action={
              <Link href={tier.href} className="text-link">
                All {tier.name} equipment <Arrow />
              </Link>
            }
          />
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
