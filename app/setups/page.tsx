import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ButtonLink, Photo, SectionHead } from "@/components/common";
import { setups } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Gym setups",
  description:
    "Complete gym setups for homes, offices, housing societies, hotels, studios and commercial gyms. Equipment planned around your space and budget, shipped direct from the manufacturer.",
};

const included = [
  ["Space brief", "Floor area, ceiling height, access, users and the kind of training you want to support."],
  ["Equipment plan", "A zone-by-zone equipment list across strength, free weights, cardio and flooring."],
  ["One quote", "Every item, delivery and installation in a single written quote. No surprise line items."],
  ["Delivery & install", "Dispatch direct from the manufacturer, with installation coordinated where available."],
];

export default function SetupsPage() {
  return (
    <>
      <section className="banner">
        <Photo name="gym" priority className="banner-photo" alt="A commercial strength floor with racks and benches" />
        <div className="wrap banner-inner">
          <p className="eyebrow">Tier 03 · Build · Custom quote</p>
          <h1 className="display page-title">
            Full gym
            <br />
            setups.
          </h1>
          <p className="lede">
            Home, corporate, commercial, society, hotel or studio. Tell us what you&apos;re building and we&apos;ll plan
            the whole floor.
          </p>
          <div className="actions">
            <ButtonLink href="/quote?need=build">Start your project</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap">
          <SectionHead
            index="01"
            eyebrow="What are you building?"
            title="Pick your space."
            intro="Budgets below are typical ranges to help you plan. Your quote is built around your actual floor."
          />
          <div className="setup-grid setup-grid-light">
            {setups.map((s, i) => (
              <Link key={s.slug} href={`/setups/${s.slug}`} className="setup-card" data-reveal>
                <span className="setup-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="setup-card-name">{s.name}</h2>
                <p className="setup-card-headline">{s.summary}</p>
                <dl className="setup-card-meta">
                  <div>
                    <dt>Typical area</dt>
                    <dd>{s.area}</dd>
                  </div>
                  <div>
                    <dt>Typical budget</dt>
                    <dd>{s.budget}</dd>
                  </div>
                </dl>
                <span className="setup-card-cta">
                  See the plan <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <SectionHead
            index="02"
            eyebrow="What's included"
            title={
              <>
                Empty floor
                <br />
                to first rep.
              </>
            }
          />
          <ol className="steps steps-dark">
            {included.map(([title, copy], i) => (
              <li key={title} className="step" data-reveal>
                <span className="step-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-steel section-tight">
        <div className="wrap inline-cta">
          <div>
            <p className="eyebrow">Not sure where to start?</p>
            <h2 className="h3">Send us your floor plan, or just a photo.</h2>
            <p>We&apos;ll suggest a starting equipment list and a budget range for your space.</p>
          </div>
          <ButtonLink href="/quote?need=build">Get a setup quote</ButtonLink>
        </div>
      </section>
    </>
  );
}
