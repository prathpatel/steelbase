// Journal posts live in content/journal/<slug>.md: a small front-matter block
// (`key: value` lines between `---` fences) followed by Markdown.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tag: string;
  image: string; // name in public/images, without extension
  imageAlt: string;
  products: string[]; // product slugs shown under the post
  setups: string[]; // setup slugs shown under the post
  readingMinutes: number;
  body: string; // Markdown
};

const dir = path.join(process.cwd(), "content/journal");

function parse(slug: string, source: string): Post {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`content/journal/${slug}.md is missing its front matter`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const key of ["title", "description", "date", "tag", "image", "imageAlt"]) {
    if (!meta[key]) throw new Error(`content/journal/${slug}.md is missing "${key}"`);
  }
  const list = (value = "") => value.split(",").map((s) => s.trim()).filter(Boolean);
  const body = match[2].trim();
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    tag: meta.tag,
    image: meta.image,
    imageAlt: meta.imageAlt,
    products: list(meta.products),
    setups: list(meta.setups),
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
    body,
  };
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parse(file.replace(/\.md$/, ""), fs.readFileSync(path.join(dir, file), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

// Posts are written in this repo, so their HTML is trusted.
export function renderPost(post: Post) {
  return marked.parse(post.body, { async: false });
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
