// Brand + contact details used across the site. Contact fields left empty are hidden
// everywhere (links, buttons, footer), so fill them in only once they're real.
export const site = {
  name: "FitBRC",
  tagline: "Gym equipment, direct from the manufacturer.",
  city: "Vadodara, Gujarat, India",
  // Inboxes, e.g. "hello@fitbrc.in".
  email: "",
  projectsEmail: "",
  partnersEmail: "",
  // Digits only, with country code (e.g. "919876543210").
  whatsapp: "",
};

// Public origin for canonical URLs, sitemap and link previews. Set SITE_URL in
// production (e.g. https://fitbrc.in); Vercel's own domain is used as a fallback.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function whatsappLink(text: string) {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;
}

export function mailtoLink(to: string, subject?: string, body?: string) {
  if (!to) return null;
  const params = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
}

/** Any way to reach us besides the quote form. */
export const hasDirectContact = Boolean(site.email || site.projectsEmail || site.whatsapp);
