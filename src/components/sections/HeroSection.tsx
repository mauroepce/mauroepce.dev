"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Developer.",
  "Artist.",
  "Tattooist in training.",
  "mauroepce.",
];

function useTyping(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1400);
      return () => clearTimeout(t);
    }

    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < word.length) {
        timeout = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          80
        );
      } else {
        setPaused(true);
        setDeleting(true);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, paused, wordIndex, words]);

  return displayed;
}

export default function HeroSection() {
  const role = useTyping(ROLES);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20">
      {/* Decorative symbol top-right */}
      <div className="absolute top-24 right-12 md:right-24 opacity-[0.06] pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          width="140"
          height="140"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            d="M 22 100 a 78 78 0 1 0 156 0 a 78 78 0 1 0 -156 0"
            strokeWidth="0.6"
          />
          <path
            d="M 100 70 L 100 22 M 100 130 L 100 178 M 130 100 L 178 100 M 70 100 L 22 100"
            strokeWidth="0.5"
          />
          <path
            d="M 121 79 L 155 45 M 79 79 L 45 45 M 121 121 L 155 155 M 79 121 L 45 155"
            strokeWidth="0.3"
          />
          <path
            d="M 70 100 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0"
            strokeWidth="0.4"
          />
        </svg>
      </div>

      <div className="max-w-4xl">
        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="text-[#C9A84C]/60 text-xs font-mono">{">"}</span>
          <span className="text-sm font-mono text-foreground/40 min-w-[220px]">
            {role}
            <span className="animate-pulse ml-0.5">_</span>
          </span>
        </motion.div>

        {/* Main tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-foreground mb-6"
        >
          I leave marks.
          <br />
          <span className="italic text-foreground/55">On screens.</span>
          <br />
          On skin.
        </motion.h1>

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-xs font-mono tracking-[0.3em] text-foreground/22 mb-10"
        >
          and on the systems no one sees.
        </motion.p>

        {/* Gold separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="w-14 h-px bg-[#C9A84C]/40 mb-10 origin-left"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-sm font-mono text-foreground/35 mb-10 max-w-sm leading-loose"
        >
          Full Stack Developer · ~4 years building.
          <br />
          Open to remote freelance worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-8"
        >
          <a
            href="#projects"
            className="text-xs font-mono tracking-widest uppercase text-foreground/70 border border-foreground/15 px-6 py-3 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]/80 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#signal"
            className="text-xs font-mono tracking-widest uppercase text-foreground/30 hover:text-foreground/70 transition-colors flex items-center gap-2"
          >
            Signal
            <span className="text-[#C9A84C]/50">→</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-8 bg-foreground/15"
        />
        <span className="text-[10px] font-mono tracking-[0.4em] text-foreground/15 uppercase">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
