"use server";

import { z } from "zod";
import type { Brief } from "@/components/quote-form";
import { getDb } from "@/db";
import { getProduct, getSetup, type Product } from "@/lib/catalog";
import { formatReference } from "@/lib/enquiry";
import { requestIpHash } from "@/lib/request-ip";

const briefSchema = z.object({
  need: z.enum(["core", "pro", "build"]),
  products: z.array(z.string().max(80)).max(50),
  setup: z.string().max(60),
  area: z.string().max(40),
  budget: z.string().max(40),
  city: z.string().trim().min(1).max(80),
  pincode: z.string().regex(/^(\d{6})?$/),
  timeline: z.string().trim().min(1).max(40),
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().regex(/^[+0-9 ]{10,16}$/),
  email: z.union([z.literal(""), z.string().trim().email().max(200)]),
  notes: z.string().trim().max(2000),
});

// Spam guards. A real visitor needs well over this long to get through four steps.
const MIN_FILL_MS = 4000;
const limits = [
  { by: "ip_hash", max: 3, minutes: 10 },
  { by: "ip_hash", max: 10, minutes: 24 * 60 },
  { by: "phone", max: 3, minutes: 24 * 60 },
] as const;

export type SubmitQuoteResult =
  | { ok: true; reference: string }
  | { ok: false; error: "invalid" | "rate-limited" | "unavailable" };

export async function submitQuote(
  input: Brief,
  // Honeypot field (hidden from people, filled by bots) and time spent on the form.
  guard: { website: string; elapsedMs: number },
): Promise<SubmitQuoteResult> {
  if (guard.website || !(guard.elapsedMs >= MIN_FILL_MS)) return { ok: false, error: "invalid" };

  const parsed = briefSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const brief = parsed.data;

  // Resolve items from the catalogue on the server; never trust client-sent prices.
  const build = brief.need === "build";
  const setup = build ? getSetup(brief.setup) : undefined;
  const items = build
    ? []
    : brief.products.map(getProduct).filter((p): p is Product => p?.tier === brief.need);
  if (build ? !setup : items.length === 0) return { ok: false, error: "invalid" };

  try {
    const db = getDb();
    const ipHash = await requestIpHash();

    for (const limit of limits) {
      const value = limit.by === "ip_hash" ? ipHash : brief.phone;
      if (!value) continue;
      const [{ count }] = await db("quote_requests")
        .where(limit.by, value)
        .where("created_at", ">", new Date(Date.now() - limit.minutes * 60_000))
        .count({ count: "*" });
      if (Number(count) >= limit.max) return { ok: false, error: "rate-limited" };
    }

    const id = await db.transaction(async (trx) => {
      const [row] = await trx("quote_requests")
        .insert({
          tier: brief.need,
          setup_slug: setup?.slug ?? null,
          area: build ? brief.area : null,
          budget: build ? brief.budget : null,
          city: brief.city,
          pincode: brief.pincode || null,
          timeline: brief.timeline,
          name: brief.name,
          phone: brief.phone,
          email: brief.email || null,
          notes: brief.notes || null,
          ip_hash: ipHash,
        })
        .returning("id");
      if (items.length) {
        await trx("quote_request_items").insert(
          items.map((p) => ({
            quote_request_id: row.id,
            product_slug: p.slug,
            product_code: p.code,
            product_name: p.name,
            unit_price: p.price,
          })),
        );
      }
      return row.id as number;
    });
    return { ok: true, reference: formatReference(id) };
  } catch (error) {
    console.error("Failed to save quote request", error);
    return { ok: false, error: "unavailable" };
  }
}
