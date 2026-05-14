"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import SigilA from "@/components/sigils/SigilA";

const links = [
  { label: "About", href: "/#about", number: "01" },
  { label: "Projects", href: "/#projects", number: "02" },
  { label: "Signal", href: "/#signal", number: "03" },
  { label: "Contact", href: "/#contact", number: "04" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 border-b border-border/60 bg-background/80 backdrop-blur-sm"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <SigilA
            size={22}
            className="text-foreground/55 group-hover:text-foreground/85 transition-colors"
          />
          <GlitchText
            text="mauroepce"
            className="text-xs font-mono tracking-[0.25em] text-foreground/65 group-hover:text-foreground/90 transition-colors cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="ink-underline text-xs font-mono tracking-widest text-foreground/65 hover:text-foreground/95 transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden flex flex-col items-end justify-center gap-1.5 w-11 h-11 -mr-2 group"
        >
          <span className="block h-px w-6 bg-foreground/65 group-hover:bg-foreground/95 transition-colors" />
          <span className="block h-px w-5 bg-foreground/65 group-hover:bg-foreground/95 transition-colors" />
          <span className="block h-px w-6 bg-foreground/65 group-hover:bg-foreground/95 transition-colors" />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden bg-background/98 backdrop-blur-md flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between px-8 py-5 border-b border-foreground/10"
            >
              <div className="flex items-center gap-3">
                <SigilA size={22} className="text-foreground/55" />
                <span className="text-xs font-mono tracking-[0.25em] text-foreground/70 uppercase">
                  Index
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-xs font-mono tracking-[0.25em] text-foreground/65 hover:text-foreground/95 transition-colors uppercase py-2 pl-3 -mr-2 flex items-center gap-2"
              >
                close <span className="text-base leading-none">×</span>
              </button>
            </motion.div>

            <nav className="flex-1 flex flex-col px-8 pt-10 overflow-y-auto">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-center justify-between py-6 border-b border-foreground/8 active:bg-foreground/3 transition-colors"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-foreground/55 uppercase">
                      / {link.number}
                    </span>
                    <span className="font-serif italic text-4xl text-foreground/80 group-hover:text-foreground transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-[#C9A84C]/45 group-hover:text-[#C9A84C]/85 transition-colors text-xl">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="px-8 pb-10 pt-6 flex items-center justify-end"
            >
              <span
                className="text-lg italic text-[#C9A84C]/65 pr-2"
                style={{
                  fontFamily: "var(--font-handwritten)",
                  transform: "rotate(-3deg)",
                }}
              >
                — turn the page
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
