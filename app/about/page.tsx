import type { Metadata } from "next";
import { ButtonLink, Photo, SectionHead } from "@/components/common";
import { tiers } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fit Baroda Equipments sells gym equipment direct from manufacturing partners: curated, clearly priced and shipped straight to your floor.",
};

const faqs = [
  [
    "Do you hold stock?",
    "No. We work with manufacturing partners who dispatch your order directly to you. That's how we keep prices down: there's no warehouse or showroom in the middle.",
  ],
  [
    "Are the prices on the site final?",
    "They're indicative, so you know which tier you're looking at. Your written quote confirms the exact model, price, delivery charges and installation before you pay anything.",
  ],
  [
    "How long does delivery take?",
    "It depends on the item, the manufacturer's current schedule and your location. We confirm a delivery timeline in your quote.",
  ],
  [
    "Do you install equipment?",
    "For racks, machines and full gym setups we coordinate installation where our partners offer it in your area. Your quote says exactly what's included.",
  ],
  [
    "What about warranty?",
    "Equipment carries the manufacturer's warranty. We share the warranty terms for each item with your quote, and we're your point of contact if something goes wrong.",
  ],
  [
    "Can you source something that isn't listed?",
    "Often, yes. The catalogue is deliberately short. If you need something specific, include it in your quote request.",
  ],
  [
    "Do you deliver outside Gujarat?",
    "We're based in Vadodara and quote for projects across India. Delivery and installation availability are confirmed per location.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-top section-light">
        <div className="wrap about-intro">
          <p className="eyebrow">About Fit Baroda Equipments</p>
          <h1 className="display page-title">
            Built on
            <br />
            steel.
          </h1>
          <div className="about-intro-copy">
            <p className="lede">
              Buying gym equipment shouldn&apos;t mean wading through endless catalogues, vague &ldquo;premium
              quality&rdquo; claims and prices you can only get after three phone calls.
            </p>
            <p>
              Fit Baroda Equipments keeps it simple. We pick a short list of equipment that earns its place, put it in three clear
              price tiers and ship it straight from the manufacturer to your floor. For full gyms, we plan the space
              with you and put everything in one quote.
            </p>
          </div>
        </div>
      </section>

      <section className="about-photo">
        <Photo name="fabrication" alt="Steel gym equipment frame being welded" />
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <SectionHead
            index="01"
            eyebrow="How we're set up"
            title={
              <>
                Factory direct.
                <br />
                No middle warehouse.
              </>
            }
            intro="We handle selection, quoting and customer support. Our manufacturing partners build and dispatch. You get one point of contact and fewer mark-ups between the factory and your floor."
          />
          <div className="tier-strip">
            {tiers.map((t) => (
              <div key={t.id} className="tier-strip-item" data-reveal>
                <span className="tier-strip-num">{t.number}</span>
                <h3>{t.name}</h3>
                <p className="tier-strip-range">{t.range}</p>
                <p>{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section section-light">
        <div className="wrap faq-layout">
          <SectionHead index="02" eyebrow="FAQ" title="Straight answers." />
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-steel section-tight">
        <div className="wrap inline-cta">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="h3">Tell us what you&apos;re building.</h2>
            <p>One piece or a whole floor. We&apos;ll come back with a clear quote.</p>
          </div>
          <ButtonLink href="/quote">Get a quote</ButtonLink>
        </div>
      </section>
    </>
  );
}
