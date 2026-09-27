import type { MetadataRoute } from "next";
import { products, setups } from "@/lib/catalog";
import { getPosts } from "@/lib/journal";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/equipment", "/setups", "/journal", "/about", "/contact", "/quote", "/privacy"];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...products.map((p) => ({ url: `${siteUrl}/equipment/${p.slug}` })),
    ...setups.map((s) => ({ url: `${siteUrl}/setups/${s.slug}` })),
    ...getPosts().map((p) => ({ url: `${siteUrl}/journal/${p.slug}`, lastModified: p.date })),
  ];
}
