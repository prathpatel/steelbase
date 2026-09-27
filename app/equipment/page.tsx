import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog-browser";
import { categories, type Category } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Core equipment from ₹25k–50k and Pro commercial-grade machines from ₹1L–2L. Racks, benches, free weights and cardio shipped direct from the manufacturer.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EquipmentPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const tierParam = typeof params.tier === "string" ? params.tier : "";
  const categoryParam = typeof params.category === "string" ? params.category : "";
  const tier = tierParam === "core" || tierParam === "pro" ? tierParam : "all";
  const category = (categories as readonly string[]).includes(categoryParam) ? (categoryParam as Category) : "all";

  return (
    <section className="page-top section-light">
      <div className="wrap">
        <p className="eyebrow">Equipment · Tiers 01 &amp; 02</p>
        <h1 className="display page-title">Equipment</h1>
        <p className="lede">
          Two tiers of individual equipment, each with a clear price band. Every price is indicative, and your
          quote confirms the exact model, delivery and installation.
        </p>
        {/* key resets filter state when the header links change the query */}
        <CatalogBrowser key={`${tier}-${category}`} initialTier={tier} initialCategory={category} />
      </div>
    </section>
  );
}
