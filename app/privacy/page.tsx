import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Fit Baroda Equipments collects when you request a quote, why, who it's shared with and your rights.",
};

const updated = "27 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="page-top section-light article-head">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1 className="display article-title">Privacy policy</h1>
          <p className="lede">
            What we collect when you ask for a quote, why we need it, who sees it and what you can ask us to do with
            it.
          </p>
          <p className="journal-meta article-meta">Last updated {updated}</p>
        </div>
      </section>

      <section className="section section-light section-flush-top">
        <div className="wrap">
          <div className="prose">
            <h2>Who we are</h2>
            <p>
              {site.name} ({site.city}) markets gym equipment made by manufacturing partners. When you send us a quote
              request, we are responsible for the personal data you give us.
            </p>

            <h2>What we collect</h2>
            <p>
              When you use the <Link href="/quote">quote form</Link>, we collect what you type in:
            </p>
            <ul>
              <li>your name and phone number, and your email address if you give it;</li>
              <li>your city and, if you give it, your PIN code;</li>
              <li>
                what you&apos;re looking for: the tier, products or type of setup, floor area, budget and timeline;
              </li>
              <li>any notes you add.</li>
            </ul>
            <p>
              To stop spam, we also keep a scrambled code derived from your internet (IP) address. It lets us see
              whether many requests come from the same connection. We don&apos;t store the address itself.
            </p>
            <p>
              We don&apos;t use advertising or analytics trackers, and you don&apos;t need an account. The site&apos;s
              fonts load from Google Fonts, so your browser connects to Google&apos;s servers when you visit.
            </p>

            <h2>Why we use it</h2>
            <ul>
              <li>To respond to your request and get you a quote for the equipment you asked about.</li>
              <li>To follow up with you about that request.</li>
              <li>To keep the quote form free of spam and abuse.</li>
            </ul>
            <p>
              We use your details only for these purposes, on the basis of the consent you give when you send the form.
              We don&apos;t sell your data or use it for unrelated marketing.
            </p>

            <h2>Who we share it with</h2>
            <ul>
              <li>
                <strong>Our manufacturing partner.</strong> They prepare your quote, take your order and payment, and
                deliver and install the equipment. To do that they receive your request details, including your name
                and phone number, along with a reference number that shows the request came through us.
              </li>
              <li>
                <strong>Our service providers.</strong> The companies that host this website and its database store
                the data on our behalf.
              </li>
              <li>Authorities, if the law requires it.</li>
            </ul>

            <h2>How long we keep it</h2>
            <p>
              We keep a request for as long as we need it to handle your enquiry and any follow-up about it, and for up
              to two years after our last contact with you, unless the law requires us to keep it longer. After that we
              delete it.
            </p>

            <h2>Your rights</h2>
            <p>Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask us to:</p>
            <ul>
              <li>tell you what personal data we hold about you and who we&apos;ve shared it with;</li>
              <li>correct or complete it;</li>
              <li>delete it, and withdraw the consent you gave when you sent your request;</li>
              <li>deal with a complaint about how we&apos;ve handled your data.</li>
            </ul>
            <p>
              If you&apos;re not satisfied with our response, you can complain to the Data Protection Board of India.
            </p>

            <h2>Contact</h2>
            <p>
              For any of the above, contact us{" "}
              {site.email ? (
                <>
                  at <a href={`mailto:${site.email}`}>{site.email}</a>
                </>
              ) : (
                <>
                  using the details on our <Link href="/contact">contact page</Link>
                </>
              )}
              . Include your quote reference (for example SB-00012) if you have one.
            </p>

            <h2>Changes</h2>
            <p>If we change this policy, we&apos;ll update it here and change the date at the top.</p>
          </div>
        </div>
      </section>
    </>
  );
}
