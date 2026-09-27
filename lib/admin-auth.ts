// Single-password admin sign-in. ADMIN_PASSWORD is both the password and the key
// that signs the session cookie, so changing it signs everyone out.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "sb_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // seconds
export const MIN_PASSWORD_LENGTH = 12;

function password() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function adminConfigured() {
  return password().length >= MIN_PASSWORD_LENGTH;
}

function sign(value: string) {
  return createHmac("sha256", password()).update(`sb-admin-session:${value}`).digest("base64url");
}

function sameString(a: string, b: string) {
  const digest = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(digest(a), digest(b));
}

export function checkPassword(input: string) {
  return adminConfigured() && sameString(input, password());
}

export async function startSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(COOKIE)?.value ?? "";
  const [expires, signature] = token.split(".");
  return Boolean(signature) && Number(expires) > Date.now() && sameString(signature, sign(expires));
}

/** Call at the top of every admin page and admin server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
