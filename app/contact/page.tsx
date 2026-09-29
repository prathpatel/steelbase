import type { Metadata } from "next";
import { Arrow, ButtonLink } from "@/components/common";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to FitBRC about equipment, full gym setups or manufacturing partnerships.",
};

export default function ContactPage() {
  const whatsapp = whatsappLink("Hi FitBRC, I have a question.");
  const channels = [
    { label: "Equipment questions", detail: "Core and Pro equipment, orders and delivery.", email: site.email },
    { label: "Gym setup projects", detail: "Home, corporate, commercial, society, hotel and studio setups.", email: site.projectsEmail },
    { label: "Manufacturing partners", detail: "Manufacturers interested in selling through FitBRC.", email: site.partnersEmail },
  ].filter((c) => c.email);

  return (
    <section className="page-top section-light">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <h1 className="display page-title">Talk to us.</h1>
        <p className="lede">
          {channels.length > 0
            ? "Questions about equipment, a gym you're planning, or a partnership. Pick the right inbox and we'll get back to you."
            : "Questions about equipment, a gym you're planning, or a partnership. Send us a request with your details and we'll call you back."}
        </p>

        <div className="contact-grid">
          {channels.map((c) => (
            <a key={c.label} href={`mailto:${c.email}`} className="contact-card" data-reveal>
              <p className="eyebrow">{c.label}</p>
              <p>{c.detail}</p>
              <span className="contact-card-email">
                {c.email}
                <Arrow />
              </span>
            </a>
          ))}
          <div className="contact-card contact-card-dark" data-reveal>
            <p className="eyebrow">Based in</p>
            <p className="contact-card-city">{site.city}</p>
            <p>Quoting for projects across India.</p>
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noreferrer" className="contact-card-email">
                WhatsApp us <Arrow />
              </a>
            )}
          </div>
        </div>

        <div className="inline-cta inline-cta-light">
          <div>
            <h2 className="h3">{channels.length > 0 ? "Know what you need?" : "Send us your request."}</h2>
            <p>
              {channels.length > 0
                ? "The quote form gets you a price faster than email."
                : "Tell us what you need and how to reach you. We reply with a written quote."}
            </p>
          </div>
          <ButtonLink href="/quote" variant="dark">
            Get a quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
