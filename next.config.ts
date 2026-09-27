import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Docker build sets NEXT_OUTPUT=standalone to emit a self-contained server in
  // .next/standalone; everywhere else `next start` serves the regular build.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  // Knex lazy-requires every SQL driver it supports; keep it out of the bundle.
  serverExternalPackages: ["knex"],
};

export default nextConfig;
