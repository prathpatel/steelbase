import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Check, Photo, SectionHead } from "@/components/common";
import { ProductCard } from "@/components/product-card";
import { getProduct, getSetup, setups, type Product } from "@/lib/catalog";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return setups.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const setup = getSetup((await params).slug);
  if (!setup) return {};
  return { title: setup.name, description: setup.summary };
}

export default async function SetupPage({ params }: { params: Params }) {
  const setup = getSetup((await params).slug);
  if (!setup) notFound();

  const starters = setup.starters.map(getProduct).filter((p): p is Product => Boolean(p));
  const others = setups.filter((s) => s.slug !== setup.slug);
  const quoteHref = `/quote?need=build&setup=${setup.slug}`;

  return (
    <>
      <section className="banner">
        <Photo name={setup.photo} priority className="banner-photo" alt="" />
        <div className="wrap banner-inner">
          <nav className="crumbs crumbs-dark" aria-label="Breadcrumb">
            <Link href="/setups">Gym setups</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{setup.name}</span>
          </nav>
          <h1 className="display page-title">{setup.name}</h1>
          <p className="lede">{setup.headline}</p>
          <dl className="facts">
            <div>
              <dt>Typical area</dt>
              <dd>{setup.area}</dd>
            </div>
            <div>
              <dt>Typical budget</dt>
              <dd>{setup.budget}</dd>
            </div>
            <div>
              <dt>Pricing</dt>
              <dd>Custom quote</dd>
            </div>
          </dl>
          <div className="actions">
            <ButtonLink href={quoteHref}>Plan my {setup.name.toLowerCase()}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap">
          <SectionHead index="01" eyebrow="The plan" title="What goes on the floor." intro={setup.summary} />
          <div className="zone-grid">
            {setup.zones.map((zone, i) => (
              <div key={zone.name} className="zone" data-reveal>
                <span className="zone-num">Zone {String(i + 1).padStart(2, "0")}</span>
                <h3>{zone.name}</h3>
                <ul>
                  {zone.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="note">
            A typical starting point. Quantities and exact models are set with you based on your floor, users and budget.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <SectionHead
            index="02"
            eyebrow="Where most setups start"
            title="Starting equipment."
            intro="Pieces from our Core and Pro tiers that usually anchor this kind of space."
          />
          <div className="product-grid product-grid-4">
            {starters.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap consider">
          <SectionHead index="03" eyebrow="Before we quote" title="What we'll ask about." />
          <ul className="checklist checklist-lg">
            {setup.considerations.map((c) => (
              <li key={c} data-reveal>
                <Check />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-steel section-tight">
        <div className="wrap inline-cta">
          <div>
            <p className="eyebrow">Tier 03 · Build</p>
            <h2 className="h3">Ready to plan your {setup.name.toLowerCase()}?</h2>
            <p>Share your space and budget. We&apos;ll come back with an equipment plan and one quote.</p>
          </div>
          <ButtonLink href={quoteHref}>Start your project</ButtonLink>
        </div>
      </section>

      <section className="section section-light section-tight">
        <div className="wrap">
          <p className="eyebrow">Other setups</p>
          <div className="other-setups">
            {others.map((s) => (
              <Link key={s.slug} href={`/setups/${s.slug}`}>
                {s.name}
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
