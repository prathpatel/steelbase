import type { Metadata } from "next";
import "./globals.css";
import "./secondary.css";
import "./art-direction.css";

export const metadata: Metadata = {
  title: "TEMPER — Equipment for people who train.",
  description: "A considered collection of strength equipment. Explore the TEMPER pre-launch concept for free weights, grip and commercial training spaces. Vadodara, India.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
