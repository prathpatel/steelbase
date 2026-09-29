import { formatPrice, getTier, type TierId } from "./catalog";

export type EnquiryDetails = {
  reference?: string;
  tier: TierId;
  items: { name: string; code: string; price: number }[];
  setupName?: string;
  area?: string | null;
  budget?: string | null;
  city: string;
  pincode?: string | null;
  timeline: string;
  name: string;
  phone: string;
  email?: string | null;
  notes?: string | null;
};

export function formatReference(id: number) {
  return `SB-${String(id).padStart(5, "0")}`;
}

/** Plain-text enquiry, as sent by the customer and forwarded to the manufacturer. */
export function enquiryMessage(e: EnquiryDetails) {
  const tier = getTier(e.tier);
  return [
    `FitBRC enquiry — ${tier.name} (${tier.range})`,
    e.reference ? `Reference: ${e.reference}` : null,
    "",
    e.tier === "build"
      ? `Setup: ${e.setupName ?? "Not sure"}\nArea: ${e.area ?? ""}\nBudget: ${e.budget ?? ""}`
      : `Items:\n${e.items.map((p) => `- ${p.name} (${p.code}) · ${formatPrice(p.price)}`).join("\n")}`,
    "",
    `City: ${e.city}${e.pincode ? ` (${e.pincode})` : ""}`,
    `Timeline: ${e.timeline}`,
    "",
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    e.email ? `Email: ${e.email}` : null,
    e.notes ? `\nNotes: ${e.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
