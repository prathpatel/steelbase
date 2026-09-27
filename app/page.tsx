import Link from "next/link";
import { Arrow, ButtonLink, Photo, SectionHead } from "@/components/common";
import { JournalCard } from "@/components/journal-card";
import { ProductCard } from "@/components/product-card";
import { products, setups, tiers } from "@/lib/catalog";
import { getPosts } from "@/lib/journal";

const steps = [
  ["Choose", "Pick equipment from Core or Pro, or tell us about the space you're building."],
  ["Quote", "We confirm the exact model, price, delivery and installation in one written quote."],
  ["Dispatch", "Your order ships straight from our manufacturing partner. No middle warehouse."],
  ["Install", "For racks, machines and full setups, we coordinate installation where available."],
];

const reasons = [
  ["Direct from the factory", "Equipment ships from the manufacturer to your floor, so you're not paying for a showroom."],
  ["Clear price tiers", "Core, Pro or Build. You know what you're looking at before you ask for a price."],
  ["One point of contact", "From the first question to installation, you deal with one team."],
  ["Planned, not just sold", "For full setups we start with your space and your users, not a catalogue."],
];

export default function Home() {
  const core = products.filter((p) => p.tier === "core").slice(0, 3);
  const pro = products.filter((p) => p.tier === "pro").slice(0, 3);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <section className="hero">
        <Photo
          name="hero"
          priority
          className="hero-photo"
          alt="A loaded Olympic barbell on a rubber floor in a dark strength gym"
        />
        <div className="wrap hero-inner">
          <p className="eyebrow">Gym equipment · Direct from the manufacturer</p>
          <h1 className="display hero-title">
            Build
            <br />
            your <span className="accent">base.</span>
          </h1>
          <p className="hero-lede">
            Equipment for home gyms, studios and commercial floors, in three clear price tiers, shipped
            straight from the factory to your floor.
          </p>
          <div className="actions">
            <ButtonLink href="/equipment">Shop equipment</ButtonLink>
            <ButtonLink href="/setups" variant="ghost">
              Plan a full gym
            </ButtonLink>
          </div>
        </div>
        <div className="wrap">
          <nav className="hero-tiers" aria-label="Price tiers">
            {tiers.map((tier) => (
              <Link key={tier.id} href={tier.href} className={`hero-tier hero-tier-${tier.id}`}>
                <span className="hero-tier-num">{tier.number}</span>
                <span className="hero-tier-name">{tier.name}</span>
                <span className="hero-tier-range">{tier.range}</span>
                <span className="hero-tier-title">{tier.title}</span>
                <Arrow />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap">
          <SectionHead
            index="01"
            eyebrow="Three tiers"
            title={
              <>
                Three ways
                <br />
                to build.
              </>
            }
            intro="Start with one piece, upgrade to commercial-grade machines, or fit out a complete gym. Every tier ships direct from the manufacturer."
          />
          <div className="tier-grid">
            {tiers.map((tier) => {
              const examples =
                tier.id === "build"
                  ? setups.map((s) => s.name)
                  : products.filter((p) => p.tier === tier.id).map((p) => p.name);
              return (
                <Link key={tier.id} href={tier.href} className={`tier-card tier-card-${tier.id}`} data-reveal>
                  {tier.id === "build" && <span className="hazard hazard-top" aria-hidden="true" />}
                  <div className="tier-card-top">
                    <span className="tier-card-num">{tier.number}</span>
                    <span className="tier-card-range">{tier.range}</span>
                  </div>
                  <h3 className="tier-card-name">{tier.name}</h3>
                  <p className="tier-card-title">{tier.title}</p>
                  <p className="tier-card-summary">{tier.summary}</p>
                  <ul className="tier-card-list">
                    {examples.slice(0, 5).map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <span className="tier-card-cta">
                    {tier.cta}
                    <Arrow />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <SectionHead
            index="02"
            eyebrow="Tier 01 · Core · ₹25k – ₹50k"
            title="Start strong at home."
            intro="The essentials of a serious home setup. Compact, durable and made to be used every day."
            action={
              <Link href="/equipment?tier=core" className="text-link">
                All Core equipment <Arrow />
              </Link>
            }
          />
          <div className="product-grid">
            {core.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark section-flush-top">
        <div className="wrap">
          <SectionHead
            index="03"
            eyebrow="Tier 02 · Pro · ₹1L – ₹2L"
            title="Commercial-grade machines."
            intro="Bigger frames, bigger stacks, cardio rated for continuous use. For studios, trainers and home gyms that want the real thing."
            action={
              <Link href="/equipment?tier=pro" className="text-link">
                All Pro equipment <Arrow />
              </Link>
            }
          />
          <div className="product-grid">
            {pro.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-steel">
        <div className="wrap">
          <SectionHead
            index="04"
            eyebrow="Tier 03 · Build · Custom quote"
            title={
              <>
                Complete gym
                <br />
                setups.
              </>
            }
            intro="Tell us what you're building. We plan the equipment list around your floor, your users and your budget, then coordinate delivery and installation."
            action={
              <Link href="/setups" className="text-link">
                How setups work <Arrow />
              </Link>
            }
          />
          <div className="setup-grid">
            {setups.map((s, i) => (
              <Link key={s.slug} href={`/setups/${s.slug}`} className="setup-card" data-reveal>
                <span className="setup-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="setup-card-name">{s.name}</h3>
                <p className="setup-card-headline">{s.headline}</p>
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
                  Plan this setup <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap">
          <SectionHead
            index="05"
            eyebrow="How it works"
            title={
              <>
                Factory to floor
                <br />
                in four steps.
              </>
            }
          />
          <ol className="steps">
            {steps.map(([title, copy], i) => (
              <li key={title} className="step" data-reveal>
                <span className="step-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="why">
        <Photo name="gym" className="why-photo" alt="A strength gym floor with racks, benches and industrial windows" />
        <div className="wrap why-inner">
          <div className="why-head" data-reveal>
            <p className="eyebrow">Why SteelBase</p>
            <h2 className="h2">
              Built on steel.
              <br />
              Sold straight.
            </h2>
          </div>
          <div className="why-grid">
            {reasons.map(([title, copy]) => (
              <div key={title} className="why-item" data-reveal>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-steel">
        <div className="wrap">
          <SectionHead
            index="06"
            eyebrow="Journal"
            title={
              <>
                Know your
                <br />
                steel.
              </>
            }
            intro="Straight guides to choosing equipment and planning a training space."
            action={
              <Link href="/journal" className="text-link">
                All articles <Arrow />
              </Link>
            }
          />
          <div className="journal-grid">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap split-cta">
          <div className="split-cta-panel" data-reveal>
            <p className="eyebrow">For your training</p>
            <h2 className="h2">Buying for yourself?</h2>
            <p>Browse Core and Pro equipment with clear indicative prices.</p>
            <div className="actions">
              <ButtonLink href="/equipment?tier=core" variant="dark">
                Shop Core
              </ButtonLink>
              <ButtonLink href="/equipment?tier=pro" variant="ghost">
                Shop Pro
              </ButtonLink>
            </div>
          </div>
          <div className="split-cta-panel split-cta-panel-dark" data-reveal>
            <p className="eyebrow">For your space</p>
            <h2 className="h2">Building a gym?</h2>
            <p>Tell us about the space. We&apos;ll come back with an equipment plan and a single quote.</p>
            <div className="actions">
              <ButtonLink href="/quote?need=build">Start your project</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
