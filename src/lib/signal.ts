import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SIGNAL_DIR = path.join(process.cwd(), "content/signal");

export type SignalEntry = {
  slug: string;
  title: string;
  date: string;
  week: string;
  tags: string[];
  excerpt: string;
};

export type SignalEntryFull = SignalEntry & {
  content: string;
};

function readEntry(file: string): SignalEntryFull | null {
  const fullPath = path.join(SIGNAL_DIR, file);
  if (!fs.existsSync(fullPath)) return null;

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: file.replace(/\.(mdx|md)$/, ""),
    title: String(data.title ?? "Untitled"),
    date: String(data.date ?? ""),
    week: String(data.week ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ""),
    content: content.trim(),
  };
}

export function getSignalEntries(): SignalEntry[] {
  if (!fs.existsSync(SIGNAL_DIR)) return [];

  const files = fs
    .readdirSync(SIGNAL_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const entries = files
    .map((f) => readEntry(f))
    .filter((e): e is SignalEntryFull => e !== null)
    .map(({ content: _content, ...rest }) => rest);

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export function getSignalEntry(slug: string): SignalEntryFull | null {
  if (!fs.existsSync(SIGNAL_DIR)) return null;

  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const file of candidates) {
    const fullPath = path.join(SIGNAL_DIR, file);
    if (fs.existsSync(fullPath)) {
      return readEntry(file);
    }
  }
  return null;
}

export function getSignalSlugs(): string[] {
  if (!fs.existsSync(SIGNAL_DIR)) return [];

  return fs
    .readdirSync(SIGNAL_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function formatSignalDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function formatSignalDateLong(iso: string): string {
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
