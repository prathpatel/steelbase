"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { submitQuote } from "@/app/quote/actions";
import { formatPrice, products, setups, tiers, type TierId } from "@/lib/catalog";
import { enquiryMessage } from "@/lib/enquiry";
import { mailtoLink, site, whatsappLink } from "@/lib/site";
import { Arrow, Check } from "./common";

export type Brief = {
  need: TierId | "";
  products: string[];
  setup: string;
  area: string;
  budget: string;
  city: string;
  pincode: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const areas = ["Under 300 sq ft", "300 – 800 sq ft", "800 – 1,500 sq ft", "1,500 – 3,000 sq ft", "3,000 sq ft +", "Not sure yet"];
const budgets = ["₹2L – ₹5L", "₹5L – ₹10L", "₹10L – ₹25L", "₹25L +", "Not decided"];
const timelines = ["As soon as possible", "Within a month", "1 – 3 months", "Just exploring"];
const stepNames = ["What you need", "The details", "Where & when", "Your contact"];

export function QuoteForm({ initial, initialStep = 0 }: { initial: Partial<Brief>; initialStep?: number }) {
  const [step, setStep] = useState(initialStep);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const startedAt = useRef(0);
  const [brief, setBrief] = useState<Brief>({
    need: "",
    products: [],
    setup: "",
    area: "",
    budget: "",
    city: "",
    pincode: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    ...initial,
  });
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => setBrief((b) => ({ ...b, [key]: value }));
  const focusHeading = () => requestAnimationFrame(() => heading.current?.focus());

  function toggleProduct(slug: string) {
    setError("");
    setBrief((b) => ({
      ...b,
      products: b.products.includes(slug) ? b.products.filter((s) => s !== slug) : [...b.products, slug],
    }));
  }

  async function next(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1 && brief.need !== "build" && brief.products.length === 0) {
      setError("Pick at least one item, or go back and choose a full setup.");
      return;
    }
    setError("");
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitting(true);
      const result = await submitQuote(brief, { website, elapsedMs: Date.now() - startedAt.current });
      setSubmitting(false);
      if (result.ok) {
        setReference(result.reference);
      } else if (result.error === "rate-limited") {
        setError("We've already received several requests from you. Please try again later.");
        return;
      } else if (result.error === "invalid") {
        setError("Some details don't look right. Please check them and try again.");
        return;
      } else if (!canSendDirectly) {
        setError("We couldn't send your request just now. Please try again in a few minutes.");
        return;
      }
      setDone(true);
    }
    focusHeading();
  }

  function back() {
    setError("");
    setStep(step - 1);
    focusHeading();
  }

  const tierProducts = products.filter((p) => p.tier === brief.need);
  const chosen = products.filter((p) => brief.products.includes(p.slug));
  const setup = setups.find((s) => s.slug === brief.setup);
  const tier = tiers.find((t) => t.id === brief.need);

  const message = brief.need
    ? enquiryMessage({ ...brief, tier: brief.need, reference, items: chosen, setupName: setup?.name })
    : "";

  const mailto = mailtoLink(
    (brief.need === "build" && site.projectsEmail) || site.email,
    `Quote request — ${brief.name}`,
    message,
  );
  const whatsapp = whatsappLink(message);
  const canSendDirectly = Boolean(mailto || whatsapp);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (done) {
    return (
      <div className="quote-done">
        <span className="quote-done-mark">
          <Check />
        </span>
        <h2 ref={heading} tabIndex={-1} className="h3">
          {reference ? `Request received — ${reference}.` : "Your request is ready to send."}
        </h2>
        {reference && !canSendDirectly && (
          <p>
            We&apos;ll get back to you on {brief.phone} with a written quote covering price, delivery and installation.
            Keep your reference handy if you contact us about it.
          </p>
        )}
        {reference && canSendDirectly && (
          <p>
            We reply with a written quote covering price, delivery and installation. For a faster reply, send it by{" "}
            {[whatsapp && "WhatsApp", mailto && "email"].filter(Boolean).join(" or ")} as well.
          </p>
        )}
        {!reference && (
          <p>
            Send it to us by {[whatsapp && "WhatsApp", mailto && "email"].filter(Boolean).join(" or ")}. We reply with a
            written quote covering price, delivery and installation.
          </p>
        )}
        {canSendDirectly && (
          <>
            <pre className="quote-preview">{message}</pre>
            <div className="actions">
              {whatsapp && (
                <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">
                  <span>Send on WhatsApp</span>
                  <Arrow />
                </a>
              )}
              {mailto && (
                <a className={`btn ${whatsapp ? "btn-ghost" : "btn-primary"}`} href={mailto}>
                  <span>Send by email</span>
                  <Arrow />
                </a>
              )}
              <button type="button" className="btn btn-ghost" onClick={copy}>
                <span>{copied ? "Copied" : "Copy text"}</span>
                {copied ? <Check /> : <Arrow />}
              </button>
            </div>
          </>
        )}
        {reference ? (
          <Link href="/equipment" className="text-link">
            Keep browsing <Arrow />
          </Link>
        ) : (
          <button type="button" className="text-link" onClick={() => (setDone(false), setStep(0))}>
            Edit my request <Arrow />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="quote-form">
      <ol className="quote-steps">
        {stepNames.map((name, i) => (
          <li key={name} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
            <span>{i < step ? <Check /> : `0${i + 1}`}</span>
            {name}
          </li>
        ))}
      </ol>

      <h2 ref={heading} tabIndex={-1} className="h3 quote-heading">
        {stepNames[step]}
      </h2>

      <form onSubmit={next}>
        {step === 0 && (
          <fieldset>
            <legend>What are you looking for?</legend>
            <div className="options">
              {tiers.map((t) => (
                <label key={t.id} className={`option ${brief.need === t.id ? "is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="need"
                    required
                    checked={brief.need === t.id}
                    onChange={() => setBrief((b) => ({ ...b, need: t.id, products: t.id === b.need ? b.products : [] }))}
                  />
                  <span className="option-num">{t.number}</span>
                  <span className="option-body">
                    <strong>
                      {t.name} · {t.range}
                    </strong>
                    <span>{t.title}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && brief.need !== "build" && (
          <fieldset aria-describedby={error ? "quote-error" : undefined}>
            <legend>Which {tier?.name} items do you want priced?</legend>
            <p className="help">Choose all that apply.</p>
            <div className="options options-2">
              {tierProducts.map((p) => (
                <label key={p.slug} className={`option ${brief.products.includes(p.slug) ? "is-selected" : ""}`}>
                  <input type="checkbox" checked={brief.products.includes(p.slug)} onChange={() => toggleProduct(p.slug)} />
                  <span className="option-tick">{brief.products.includes(p.slug) && <Check />}</span>
                  <span className="option-body">
                    <strong>{p.name}</strong>
                    <span>
                      {p.callout} · {formatPrice(p.price)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p id="quote-error" className="form-error" role="alert">
                {error}
              </p>
            )}
          </fieldset>
        )}

        {step === 1 && brief.need === "build" && (
          <>
            <fieldset>
              <legend>What kind of space?</legend>
              <div className="options options-2">
                {setups.map((s) => (
                  <label key={s.slug} className={`option ${brief.setup === s.slug ? "is-selected" : ""}`}>
                    <input type="radio" name="setup" required checked={brief.setup === s.slug} onChange={() => set("setup", s.slug)} />
                    <span className="option-body">
                      <strong>{s.name}</strong>
                      <span>Typically {s.area}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field-row">
              <label className="field">
                <span>Floor area</span>
                <select required value={brief.area} onChange={(e) => set("area", e.target.value)}>
                  <option value="" disabled>
                    Select
                  </option>
                  {areas.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Budget</span>
                <select required value={brief.budget} onChange={(e) => set("budget", e.target.value)}>
                  <option value="" disabled>
                    Select
                  </option>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="field-row">
              <label className="field">
                <span>City</span>
                <input
                  required
                  autoComplete="address-level2"
                  value={brief.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="e.g. Vadodara"
                  maxLength={80}
                />
              </label>
              <label className="field">
                <span>
                  PIN code <em>(optional)</em>
                </span>
                <input
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[0-9]{6}"
                  title="6-digit PIN code"
                  value={brief.pincode}
                  onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="390001"
                />
              </label>
            </div>
            <fieldset>
              <legend>When do you need it?</legend>
              <div className="options options-2">
                {timelines.map((t) => (
                  <label key={t} className={`option option-compact ${brief.timeline === t ? "is-selected" : ""}`}>
                    <input type="radio" name="timeline" required checked={brief.timeline === t} onChange={() => set("timeline", t)} />
                    <span className="option-body">
                      <strong>{t}</strong>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {step === 3 && (
          <>
            <label className="field">
              <span>Name</span>
              <input required autoComplete="name" value={brief.name} onChange={(e) => set("name", e.target.value)} maxLength={100} />
            </label>
            <div className="field-row">
              <label className="field">
                <span>Phone</span>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={brief.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+91"
                  pattern="[+0-9 ]{10,16}"
                  title="10–16 digits, spaces and an optional +"
                />
              </label>
              <label className="field">
                <span>
                  Email <em>(optional)</em>
                </span>
                <input type="email" autoComplete="email" value={brief.email} onChange={(e) => set("email", e.target.value)} maxLength={200} />
              </label>
            </div>
            <label className="field">
              <span>
                Anything else? <em>(optional)</em>
              </span>
              <textarea
                rows={4}
                value={brief.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Quantities, floor details, delivery constraints…"
                maxLength={2000}
              />
            </label>
            {/* Honeypot: hidden from people and screen readers, filled in by bots. */}
            <div className="hp" aria-hidden="true">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>
            <p className="help">
              We share these details with our manufacturing partner to prepare your quote. See our{" "}
              <Link href="/privacy" className="inline-link">
                privacy policy
              </Link>
              .
            </p>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </>
        )}

        <div className="form-actions">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={back}>
              <span>Back</span>
            </button>
          ) : (
            <Link href="/equipment" className="text-link">
              Browse equipment first
            </Link>
          )}
          <button type="submit" className="btn btn-dark" disabled={submitting}>
            <span>{step === 3 ? (submitting ? "Sending…" : "Send request") : "Continue"}</span>
            <Arrow />
          </button>
        </div>
      </form>
    </div>
  );
}
