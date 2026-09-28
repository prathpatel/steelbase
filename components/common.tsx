import Link from "next/link";
import type { ReactNode } from "react";
import type { TierId } from "@/lib/catalog";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 3h18v4h-7v10h7v4H3v-4h7V7H3z" fill="currentColor" />
      </svg>
      <span className="logo-word">
        Fit Baroda<span className="logo-sub">Equipments</span>
      </span>
    </span>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function Check() {
  return (
    <svg className="check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const className = `btn btn-${variant}`;
  const content = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );
  return external ? (
    <a className={className} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}

export function Photo({
  name,
  alt,
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-small.webp 640w, /images/${name}.webp 1536w`}
      sizes="(max-width: 767px) 100vw, 70vw"
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width={1536}
      height={1024}
    />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="section-head" data-reveal>
      <div className="section-head-top">
        <p className="eyebrow">
          {index && <span className="eyebrow-index">{index}</span>}
          {eyebrow}
        </p>
        {action}
      </div>
      <h2 className="h2">{title}</h2>
      {intro && <p className="lede">{intro}</p>}
    </div>
  );
}

export function TierBadge({ tier }: { tier: TierId }) {
  const label = { core: "01 · Core", pro: "02 · Pro", build: "03 · Build" }[tier];
  return <span className={`tier-badge tier-${tier}`}>{label}</span>;
}
