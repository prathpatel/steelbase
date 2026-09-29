"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow, Logo } from "./common";

const nav = [
  { label: "Core", note: "₹25k–50k", href: "/equipment?tier=core" },
  { label: "Pro", note: "₹1L–2L", href: "/equipment?tier=pro" },
  { label: "Gym setups", note: "Custom", href: "/setups" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    return path !== "/equipment" && pathname.startsWith(path);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
        <div className="wrap site-header-inner">
          <Link href="/" aria-label="FitBRC home" className="site-header-logo">
            <Logo />
          </Link>
          <nav className="site-nav" aria-label="Main">
            <Link href="/equipment" className={pathname === "/equipment" ? "is-active" : ""}>
              All equipment
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
                {item.label}
                {item.note && <span className="site-nav-note">{item.note}</span>}
              </Link>
            ))}
          </nav>
          <Link href="/quote" className="btn btn-primary btn-sm site-header-cta">
            <span>Get a quote</span>
            <Arrow />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className={`burger ${open ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile"
          onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        >
          <div className="wrap">
            <Link href="/equipment">
              All equipment
              <Arrow />
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>
                  {item.label}
                  {item.note && <small>{item.note}</small>}
                </span>
                <Arrow />
              </Link>
            ))}
            <Link href="/quote" className="btn btn-primary mobile-menu-cta">
              <span>Get a quote</span>
              <Arrow />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
