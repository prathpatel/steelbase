"use client";

import { useActionState } from "react";
import { Arrow } from "@/components/common";
import { login, type LoginState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="admin-login-form">
      <label className="field">
        <span>Password</span>
        <input type="password" name="password" required autoComplete="current-password" autoFocus />
      </label>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-dark" disabled={pending}>
        <span>{pending ? "Signing in…" : "Sign in"}</span>
        <Arrow />
      </button>
    </form>
  );
}
