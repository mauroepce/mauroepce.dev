import Link from "next/link";
import { getBlogEntries, formatBlogDateLong } from "@/lib/blog";
import NavBar from "@/components/layout/NavBar";
import SigilA from "@/components/sigils/SigilA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — mauroepce",
  description:
    "Long-form writing on engineering, AI frameworks, and building things with agents.",
};

export default function BlogIndexPage() {
  const entries = getBlogEntries();

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-24">
        <section className="px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground/55 hover:text-foreground/90 transition-colors mb-16"
          >
            <span className="text-[#C9A84C]/70">←</span> Home
          </Link>

          {/* Header */}
          <header className="mb-16">
            <p
              aria-hidden="true"
              className="text-foreground/50 text-xs font-mono tracking-[0.4em] mb-3"
            >
              / 04
            </p>
            <h1 className="font-serif italic text-5xl md:text-6xl text-foreground">
              Blog
            </h1>
            <div className="mt-5 h-px w-12 bg-[#C9A84C]/65" />
            <p className="mt-6 text-sm font-mono text-foreground/55 tracking-wide max-w-xl leading-loose">
              Long-form writing. Engineering with AI agents, framework design,
              things worth more than a Signal note.
            </p>
          </header>

          {/* Entries */}
          {entries.length > 0 ? (
            <div className="space-y-px">
              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/blog/${entry.slug}`}
                  className="group block py-10 border-b border-foreground/25 hover:border-foreground/40 transition-colors"
                >
                  <article className="grid grid-cols-1 md:grid-cols-[10rem_1fr_auto] gap-4 md:gap-8 items-start">
                    <div className="shrink-0">
                      <p className="text-[10px] font-mono tracking-[0.25em] text-foreground/55 uppercase">
                        {formatBlogDateLong(entry.date)}
                      </p>
                      {entry.readingTime && (
                        <p className="mt-2 text-[10px] font-mono tracking-wider text-[#C9A84C]/70">
                          {entry.readingTime}
                        </p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-serif italic text-2xl md:text-3xl text-foreground/85 group-hover:text-foreground transition-colors leading-snug">
                        {entry.title}
                      </h2>
                      <p className="mt-4 text-sm font-mono text-foreground/55 leading-relaxed max-w-2xl">
                        {entry.excerpt}
                      </p>
                      {entry.tags.length > 0 && (
                        <ul
                          aria-label="Tags"
                          className="flex flex-wrap gap-3 mt-5 list-none p-0"
                        >
                          {entry.tags.map((tag) => (
                            <li
                              key={tag}
                              className="text-[10px] font-mono text-foreground/55 tracking-wider"
                            >
                              #{tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <span className="hidden md:inline text-[#C9A84C]/40 group-hover:text-[#C9A84C]/85 transition-colors text-lg pt-2">
                      →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm font-mono text-foreground/55 italic">
              No posts yet. Add a file to content/blog/ to start.
            </p>
          )}
        </section>
      </main>
      <footer className="border-t border-border/40 py-6 px-8 md:px-16 lg:px-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SigilA size={16} className="text-foreground/55" />
          <span className="text-xs font-mono text-foreground/55 tracking-widest">
            mauroepce
          </span>
        </div>
        <span className="text-xs font-mono text-foreground/55 tracking-widest">
          © 2026
        </span>
      </footer>
    </>
  );
}
