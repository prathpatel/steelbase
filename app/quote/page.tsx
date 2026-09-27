import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { getProduct, getSetup } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Request a quote for Core or Pro equipment, or a complete gym setup.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function QuotePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const str = (key: string) => (typeof params[key] === "string" ? (params[key] as string) : "");

  const product = getProduct(str("product"));
  const setup = getSetup(str("setup"));
  const needParam = str("need");
  const need =
    product?.tier ?? (setup ? "build" : needParam === "core" || needParam === "pro" || needParam === "build" ? needParam : "");

  return (
    <section className="page-top section-light">
      <div className="wrap quote-layout">
        <aside className="quote-aside">
          <p className="eyebrow">Get a quote</p>
          <h1 className="display page-title page-title-sm">
            Let&apos;s build
            <br />
            your base.
          </h1>
          <p className="lede">
            Four short steps. We reply with one written quote covering the exact model, price, delivery and installation.
          </p>
          {site.email && (
            <div className="quote-contact">
              <p className="eyebrow">Prefer to talk?</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <p className="muted">{site.city}</p>
            </div>
          )}
        </aside>
        <QuoteForm
          key={`${need}-${product?.slug ?? ""}-${setup?.slug ?? ""}`}
          initialStep={need ? 1 : 0}
          initial={{ need, products: product ? [product.slug] : [], setup: setup?.slug ?? "" }}
        />
      </div>
    </section>
  );
}
