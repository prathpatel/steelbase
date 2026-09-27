"use client";

import { useState } from "react";
import { Arrow, Check } from "./common";

export function CopyButton({ text, label = "Copy text" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
      <span>{copied ? "Copied" : label}</span>
      {copied ? <Check /> : <Arrow />}
    </button>
  );
}
