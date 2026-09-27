import { redirect } from "next/navigation";
import { adminConfigured, isAdmin, MIN_PASSWORD_LENGTH } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="wrap admin-login">
      <p className="eyebrow">Admin</p>
      <h1 className="h2">Sign in</h1>
      {adminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="admin-empty">
          Admin is switched off. Set <code>ADMIN_PASSWORD</code> (at least {MIN_PASSWORD_LENGTH} characters) in the
          server&apos;s environment and restart it.
        </p>
      )}
    </div>
  );
}
