"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { SignalEntry } from "@/lib/signal";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function SignalEntryItem({
  entry,
  index,
}: {
  entry: SignalEntry;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/signal/${entry.slug}`}
        className="group block py-8 border-b border-foreground/6 hover:border-foreground/12 transition-colors"
      >
        <article className="flex gap-8 md:gap-12">
          <div className="shrink-0 pt-1 w-20 text-right">
            <p className="text-[10px] font-mono text-foreground/18 tracking-wider">
              {formatDate(entry.date)}
            </p>
            <p className="text-[10px] font-mono text-[#C9A84C]/38 tracking-wider">
              {entry.week}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center pt-2">
            <div className="w-px flex-1 bg-foreground/6 group-hover:bg-foreground/15 transition-colors" />
            <div className="w-1 h-1 rounded-full bg-[#C9A84C]/38 my-2 shrink-0 group-hover:bg-[#C9A84C]/80 transition-colors" />
          </div>

          <div className="flex-1 space-y-2 pb-2">
            <div className="flex items-start gap-3">
              <h3 className="font-serif text-xl text-foreground/70 group-hover:text-foreground transition-colors leading-snug flex-1">
                {entry.title}
              </h3>
              <span className="text-[#C9A84C]/30 group-hover:text-[#C9A84C]/70 transition-colors text-sm pt-1 shrink-0">
                →
              </span>
            </div>
            <p className="text-xs font-mono text-foreground/32 leading-relaxed group-hover:text-foreground/50 transition-colors">
              {entry.excerpt}
            </p>
            {entry.tags.length > 0 && (
              <div className="flex gap-3 pt-1">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-foreground/18 tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

interface SignalSectionProps {
  entries: SignalEntry[];
}

export default function SignalSection({ entries }: SignalSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="signal" className="px-8 md:px-16 lg:px-24 py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-foreground/20 text-xs font-mono tracking-[0.4em] mb-3">
          / 03
        </p>
        <h2 className="font-serif italic text-5xl md:text-6xl text-foreground">
          Signal
        </h2>
        <div className="mt-5 h-px w-12 bg-[#C9A84C]/40" />
        <p className="mt-6 text-xs font-mono text-foreground/22 tracking-wide max-w-sm leading-loose">
          Things I&apos;m learning. Features I shipped. Ideas I&apos;m working
          through. Updated from VSCode — no CMS, just markdown pushed to GitHub.
        </p>
      </motion.div>

      {entries.length > 0 ? (
        <div>
          {entries.map((entry, i) => (
            <SignalEntryItem key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-xs font-mono text-foreground/25 italic">
          No entries yet. Add a file to content/signal/ to start.
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 border border-foreground/6 p-6"
      >
        <p className="text-[10px] font-mono tracking-[0.4em] text-foreground/18 uppercase mb-4">
          How to post from VSCode
        </p>
        <pre className="text-xs font-mono text-foreground/28 leading-relaxed whitespace-pre-wrap">
          {`# 1. Create a file:
content/signal/2026-05-18-your-slug.mdx

# 2. Add frontmatter + excerpt:
---
title: "What you shipped"
date: "2026-05-18"
week: "W20"
tags: ["tag1", "tag2"]
excerpt: "Short summary that appears in the feed."
---

# 3. Push:
git add . && git commit -m "signal: short title" && git push

# Vercel redeploys. Live in ~30s.`}
        </pre>
      </motion.div>
    </section>
  );
}
