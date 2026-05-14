import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getSignalEntry,
  getSignalEntries,
  getSignalSlugs,
  formatSignalDate,
  formatSignalDateLong,
} from "@/lib/signal";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import NavBar from "@/components/layout/NavBar";
import SigilA from "@/components/sigils/SigilA";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getSignalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getSignalEntry(slug);
  if (!entry) return { title: "Signal — mauroepce" };

  return {
    title: `${entry.title} — Signal · mauroepce`,
    description: entry.excerpt,
  };
}

export default async function SignalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getSignalEntry(slug);

  if (!entry) notFound();

  const allEntries = getSignalEntries();
  const currentIndex = allEntries.findIndex((e) => e.slug === slug);
  const newer = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const older =
    currentIndex >= 0 && currentIndex < allEntries.length - 1
      ? allEntries[currentIndex + 1]
      : null;
  const otherEntries = allEntries
    .filter((e) => e.slug !== slug && e.slug !== newer?.slug && e.slug !== older?.slug)
    .slice(0, 3);

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-24">
        <article className="px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/#signal"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground/30 hover:text-foreground/70 transition-colors mb-16"
          >
            <span className="text-[#C9A84C]/50">←</span> Signal
          </Link>

          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[10px] font-mono tracking-wider text-foreground/30">
                {formatSignalDateLong(entry.date)}
              </p>
              {entry.week && (
                <>
                  <span className="text-foreground/15">·</span>
                  <p className="text-[10px] font-mono tracking-wider text-[#C9A84C]/50">
                    {entry.week}
                  </p>
                </>
              )}
            </div>

            <h1 className="font-serif italic text-4xl md:text-6xl text-foreground leading-tight mb-8">
              {entry.title}
            </h1>

            <p className="text-base font-mono text-foreground/45 leading-relaxed max-w-2xl">
              {entry.excerpt}
            </p>

            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-foreground/30 tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 h-px w-12 bg-[#C9A84C]/40" />
          </header>

          {/* Body */}
          {entry.content ? (
            <div className="mdx-content">
              <MDXRemote
                source={entry.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-sm font-mono text-foreground/25 italic">
              (No additional detail for this entry.)
            </p>
          )}

          {/* Prev / Next navigation */}
          {(newer || older) && (
            <nav className="mt-24 pt-12 border-t border-foreground/8 grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/8">
              {older ? (
                <Link
                  href={`/signal/${older.slug}`}
                  className="group block bg-background hover:bg-foreground/[0.02] transition-colors p-6"
                >
                  <p className="text-[10px] font-mono tracking-[0.35em] text-foreground/30 uppercase mb-3">
                    <span className="text-[#C9A84C]/50">←</span> Older
                  </p>
                  <p className="text-[10px] font-mono text-foreground/25 tracking-wider mb-1">
                    {formatSignalDate(older.date)} · {older.week}
                  </p>
                  <h3 className="font-serif text-xl text-foreground/70 group-hover:text-foreground transition-colors leading-snug">
                    {older.title}
                  </h3>
                </Link>
              ) : (
                <div className="bg-background p-6" />
              )}
              {newer ? (
                <Link
                  href={`/signal/${newer.slug}`}
                  className="group block bg-background hover:bg-foreground/[0.02] transition-colors p-6 md:text-right"
                >
                  <p className="text-[10px] font-mono tracking-[0.35em] text-foreground/30 uppercase mb-3">
                    Newer <span className="text-[#C9A84C]/50">→</span>
                  </p>
                  <p className="text-[10px] font-mono text-foreground/25 tracking-wider mb-1">
                    {formatSignalDate(newer.date)} · {newer.week}
                  </p>
                  <h3 className="font-serif text-xl text-foreground/70 group-hover:text-foreground transition-colors leading-snug">
                    {newer.title}
                  </h3>
                </Link>
              ) : (
                <div className="bg-background p-6" />
              )}
            </nav>
          )}

          {/* More signals */}
          {otherEntries.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center gap-4 mb-8">
                <p className="text-[10px] font-mono tracking-[0.4em] text-foreground/30 uppercase">
                  More from Signal
                </p>
                <div className="flex-1 h-px bg-foreground/8" />
              </div>
              <div className="space-y-px">
                {otherEntries.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/signal/${other.slug}`}
                    className="group flex items-start gap-6 py-5 border-b border-foreground/6 hover:border-foreground/15 transition-colors"
                  >
                    <div className="shrink-0 pt-1 w-20 text-right">
                      <p className="text-[10px] font-mono text-foreground/22 tracking-wider">
                        {formatSignalDate(other.date)}
                      </p>
                      <p className="text-[10px] font-mono text-[#C9A84C]/40 tracking-wider">
                        {other.week}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-lg text-foreground/70 group-hover:text-foreground transition-colors leading-snug">
                        {other.title}
                      </h4>
                      <p className="text-xs font-mono text-foreground/30 leading-relaxed mt-1 line-clamp-2">
                        {other.excerpt}
                      </p>
                    </div>
                    <span className="shrink-0 text-[#C9A84C]/30 group-hover:text-[#C9A84C]/70 transition-colors pt-2">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to home */}
          <div className="mt-20 flex justify-center">
            <Link
              href="/#signal"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground/30 hover:text-foreground/70 transition-colors"
            >
              <span className="text-[#C9A84C]/50">←</span> All signals
            </Link>
          </div>
        </article>
      </main>
      <footer className="border-t border-border/40 py-6 px-8 md:px-16 lg:px-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SigilA size={16} className="text-foreground/25" />
          <span className="text-xs font-mono text-foreground/18 tracking-widest">
            mauroepce
          </span>
        </div>
        <span className="text-xs font-mono text-foreground/18 tracking-widest">
          © 2026
        </span>
      </footer>
    </>
  );
}
