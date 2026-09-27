import { ButtonLink } from "@/components/common";

export default function NotFound() {
  return (
    <section className="page-top section-light not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="display page-title">Missed the rep.</h1>
        <p className="lede">That page doesn&apos;t exist. Try the equipment catalogue or head back home.</p>
        <div className="actions">
          <ButtonLink href="/equipment" variant="dark">
            Browse equipment
          </ButtonLink>
          <ButtonLink href="/" variant="ghost">
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
