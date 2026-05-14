"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { SignalEntry } from "@/lib/signal";
import Marginalia from "@/components/ui/Marginalia";

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
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/signal/${entry.slug}`}
        className="group block py-10 border-b border-foreground/20 hover:border-foreground/40 transition-colors relative"
      >
        <article className="flex flex-col md:flex-row gap-5 md:gap-12">
          {/* Date stamp — corner of a journal page */}
          <div className="shrink-0 w-28 relative self-start">
            <div className="border border-foreground/35 group-hover:border-[#C9A84C]/65 transition-colors p-3 bg-[#0a0a0a]/40">
              <p className="text-[9px] font-mono text-foreground/65 tracking-[0.2em] uppercase mb-1">
                {formatDate(entry.date)}
              </p>
              <div className="h-px w-6 bg-foreground/35 mb-1" />
              <p
                className="text-2xl text-[#C9A84C]/80 leading-none"
                style={{ fontFamily: "var(--font-handwritten)" }}
              >
                {entry.week}
              </p>
            </div>
            {/* Decorative pin mark */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#C9A84C]/65 group-hover:bg-[#C9A84C]/80 transition-colors" />
          </div>

          {/* Journal page content */}
          <div className="flex-1 min-w-0 space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <h3 className="font-serif italic text-xl md:text-2xl text-foreground/75 group-hover:text-foreground transition-colors leading-snug flex-1">
                {entry.title}
              </h3>
              <span className="text-[#C9A84C]/30 group-hover:text-[#C9A84C]/80 transition-colors text-sm pt-2 shrink-0">
                →
              </span>
            </div>
            <p
              className="text-base text-foreground/65 leading-relaxed group-hover:text-foreground/85 transition-colors max-w-2xl"
              style={{ fontFamily: "var(--font-handwritten)" }}
            >
              {entry.excerpt}
            </p>
            {entry.tags.length > 0 && (
              <div className="flex gap-3 pt-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-foreground/55 tracking-wider"
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
    <section id="signal" className="relative px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
      <Marginalia
        text="the noise is the data"
        position="top-right"
        rotate={3}
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-foreground/50 text-xs font-mono tracking-[0.4em] mb-3">
          / 03
        </p>
        <h2 className="font-serif italic text-5xl md:text-6xl text-foreground">
          Signal
        </h2>
        <div className="mt-5 h-px w-12 bg-[#C9A84C]/65" />
        <p className="mt-6 text-xs font-mono text-foreground/55 tracking-wide max-w-sm leading-loose">
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
        <p className="text-xs font-mono text-foreground/55 italic">
          No entries yet. Add a file to content/signal/ to start.
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 border border-foreground/20 p-5 md:p-6 overflow-x-auto"
      >
        <p className="text-[10px] font-mono tracking-[0.4em] text-foreground/50 uppercase mb-4">
          How to post from VSCode
        </p>
        <pre className="text-[11px] md:text-xs font-mono text-foreground/60 leading-relaxed whitespace-pre-wrap wrap-break-word">
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
