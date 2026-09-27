"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, products, tiers, type Category } from "@/lib/catalog";
import { Arrow } from "./common";
import { ProductCard } from "./product-card";

type TierFilter = "all" | "core" | "pro";
type Sort = "featured" | "price-asc" | "price-desc";

export function CatalogBrowser({ initialTier, initialCategory }: { initialTier: TierFilter; initialCategory: Category | "all" }) {
  const [tier, setTier] = useState<TierFilter>(initialTier);
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");

  function sync(nextTier: TierFilter, nextCategory: Category | "all") {
    const params = new URLSearchParams();
    if (nextTier !== "all") params.set("tier", nextTier);
    if (nextCategory !== "all") params.set("category", nextCategory);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/equipment?${query}` : "/equipment");
  }

  function chooseTier(value: TierFilter) {
    setTier(value);
    sync(value, category);
  }

  function chooseCategory(value: Category | "all") {
    setCategory(value);
    sync(tier, value);
  }

  function reset() {
    setTier("all");
    setCategory("all");
    sync("all", "all");
  }

  const filtered = products
    .filter((p) => (tier === "all" || p.tier === tier) && (category === "all" || p.category === category))
    .sort((a, b) => (sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0));

  const activeTier = tier === "all" ? null : tiers.find((t) => t.id === tier)!;

  return (
    <>
      <div className="catalog-tiers" role="group" aria-label="Price tier">
        {(["all", "core", "pro"] as const).map((value) => {
          const t = tiers.find((x) => x.id === value);
          return (
            <button
              key={value}
              className="catalog-tier"
              aria-pressed={tier === value}
              onClick={() => chooseTier(value)}
            >
              <span className="catalog-tier-name">{t ? `${t.number} · ${t.name}` : "All tiers"}</span>
              <span className="catalog-tier-range">{t ? t.range : "₹25k – ₹2L"}</span>
            </button>
          );
        })}
        <Link href="/setups" className="catalog-tier catalog-tier-build">
          <span className="catalog-tier-name">03 · Build</span>
          <span className="catalog-tier-range">
            Full gym setups <Arrow />
          </span>
        </Link>
      </div>

      {activeTier && <p className="catalog-tier-summary">{activeTier.summary}</p>}

      <div className="catalog-toolbar">
        <div className="chips" role="group" aria-label="Category">
          {(["all", ...categories] as const).map((c) => (
            <button key={c} className="chip" aria-pressed={category === c} onClick={() => chooseCategory(c)}>
              {c === "all" ? "Everything" : c}
            </button>
          ))}
        </div>
        <label className="sort">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <p className="catalog-count" aria-live="polite">
        {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "item" : "items"}
      </p>

      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2 className="h3">Nothing here yet.</h2>
          <p>We&apos;re adding to this range. Tell us what you&apos;re looking for and we&apos;ll source it.</p>
          <div className="actions">
            <button className="btn btn-dark" onClick={reset}>
              <span>Show everything</span>
              <Arrow />
            </button>
            <Link className="btn btn-ghost" href="/quote">
              <span>Request an item</span>
              <Arrow />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
