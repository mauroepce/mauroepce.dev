import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogEntry = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime?: string;
};

export type BlogEntryFull = BlogEntry & {
  content: string;
};

function readEntry(file: string): BlogEntryFull | null {
  const fullPath = path.join(BLOG_DIR, file);
  if (!fs.existsSync(fullPath)) return null;

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: file.replace(/\.(mdx|md)$/, ""),
    title: String(data.title ?? "Untitled"),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ""),
    readingTime: data.readingTime ? String(data.readingTime) : undefined,
    content: content.trim(),
  };
}

export function getBlogEntries(): BlogEntry[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const entries = files
    .map((f) => readEntry(f))
    .filter((e): e is BlogEntryFull => e !== null)
    .map(({ content: _content, ...rest }) => rest);

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogEntry(slug: string): BlogEntryFull | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const file of candidates) {
    const fullPath = path.join(BLOG_DIR, file);
    if (fs.existsSync(fullPath)) {
      return readEntry(file);
    }
  }
  return null;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function formatBlogDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function formatBlogDateLong(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
