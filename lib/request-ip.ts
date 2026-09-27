import { createHmac } from "node:crypto";
import { headers } from "next/headers";

/**
 * The visitor's IP as a keyed hash, so it can be compared for rate limiting without
 * storing the address itself. Relies on the host or reverse proxy setting
 * X-Forwarded-For (Vercel, Render, Railway do; with nginx use
 * `proxy_set_header X-Forwarded-For $remote_addr;`).
 */
export async function requestIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip")?.trim();
  if (!ip) return null;
  const key = process.env.ADMIN_PASSWORD || "steelbase-ip";
  return createHmac("sha256", key).update(`sb-ip:${ip}`).digest("hex");
}
