import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";
import { Arrow, TierBadge } from "./common";
import { Drawing } from "./drawings";

export function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`blueprint ${large ? "blueprint-lg" : ""}`}>
      <div className="blueprint-meta">
        <span>{product.code}</span>
        <TierBadge tier={product.tier} />
      </div>
      <Drawing kind={product.drawing} />
      <span className="blueprint-callout">{product.callout}</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/equipment/${product.slug}`} className="product-card" data-reveal>
      <ProductArt product={product} />
      <div className="product-card-body">
        <div>
          <p className="product-card-cat">{product.category}</p>
          <h3 className="product-card-name">{product.name}</h3>
        </div>
        <div className="product-card-foot">
          <span className="price">
            {formatPrice(product.price)}
            <small>indicative</small>
          </span>
          <span className="round-arrow">
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
