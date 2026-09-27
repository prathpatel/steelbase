"use server";

import { redirect } from "next/navigation";
import { getDb, quoteStatuses, type QuoteStatus } from "@/db";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/admin-auth";
import { requestIpHash } from "@/lib/request-ip";

// Failed sign-ins per visitor. In memory: resets on restart and isn't shared between
// serverless instances, which is fine for slowing down password guessing.
const failures = new Map<string, { count: number; until: number }>();
const MAX_FAILURES = 5;
const LOCKOUT_MS = 15 * 60_000;

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const key = (await requestIpHash()) ?? "unknown";
  const now = Date.now();
  const entry = failures.get(key);
  if (entry && entry.until > now && entry.count >= MAX_FAILURES) {
    return { error: "Too many attempts. Try again in 15 minutes." };
  }

  if (!checkPassword(String(formData.get("password") ?? ""))) {
    const count = entry && entry.until > now ? entry.count + 1 : 1;
    failures.set(key, { count, until: now + LOCKOUT_MS });
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "Wrong password." };
  }

  failures.delete(key);
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function updateEnquiry(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as QuoteStatus;
  const notes = String(formData.get("admin_notes") ?? "").trim().slice(0, 5000);
  if (!Number.isInteger(id) || !quoteStatuses.includes(status)) redirect("/admin");

  await getDb()("quote_requests")
    .where({ id })
    .update({ status, admin_notes: notes || null, updated_at: new Date() });
  redirect(`/admin/enquiries/${id}?saved=1`);
}
