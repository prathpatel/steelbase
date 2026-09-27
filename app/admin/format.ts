import type { QuoteStatus } from "@/db";

export const statusLabels: Record<QuoteStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

export function formatWhen(date: Date) {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** wa.me link for a customer's phone, assuming India when there's no country code. */
export function customerWhatsapp(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return `https://wa.me/${digits}`;
}

/** Accepts "SB-00012", "sb12" or "12". */
export function parseReference(value: string) {
  const match = value.trim().match(/^(?:sb-?)?0*(\d{1,9})$/i);
  return match ? Number(match[1]) : null;
}
