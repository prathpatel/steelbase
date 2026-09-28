import Link from "next/link";
import { setups } from "@/lib/catalog";
import { site } from "@/lib/site";
import { Logo } from "./common";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="hazard" aria-hidden="true" />
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{site.tagline}</p>
            <p className="muted">{site.city}</p>
          </div>
          <div>
            <p className="footer-title">Equipment</p>
            <Link href="/equipment?tier=core">Core · ₹25k–50k</Link>
            <Link href="/equipment?tier=pro">Pro · ₹1L–2L</Link>
            <Link href="/equipment">All equipment</Link>
          </div>
          <div>
            <p className="footer-title">Gym setups</p>
            {setups.map((s) => (
              <Link key={s.slug} href={`/setups/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-title">Company</p>
            <Link href="/about">About</Link>
            <Link href="/about#faq">FAQ</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/quote">Get a quote</Link>
            <Link href="/privacy">Privacy</Link>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">
          FIT BARODA
          <br />
          EQUIPMENTS
        </div>
        <div className="footer-bottom">
          <span>© 2026 {site.name}</span>
          <span>
            Prices shown are indicative. Final pricing, delivery and installation are confirmed in your quote.
          </span>
        </div>
      </div>
    </footer>
  );
}
