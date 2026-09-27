import knex, { type Knex } from "knex";
import config from "@/knexfile";

// Reuse one pool across dev hot reloads.
const globalForDb = globalThis as unknown as { db?: Knex };

export function getDb(): Knex {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and point it at your Postgres database.");
  }
  globalForDb.db ??= knex(config);
  return globalForDb.db;
}

export const quoteStatuses = ["new", "contacted", "quoted", "won", "lost"] as const;
export type QuoteStatus = (typeof quoteStatuses)[number];

export type QuoteRequestRow = {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: QuoteStatus;
  tier: "core" | "pro" | "build";
  setup_slug: string | null;
  area: string | null;
  budget: string | null;
  city: string;
  pincode: string | null;
  timeline: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  ip_hash: string | null;
  admin_notes: string | null;
};

export type QuoteRequestItemRow = {
  id: number;
  quote_request_id: number;
  product_slug: string;
  product_code: string;
  product_name: string;
  unit_price: number;
};
