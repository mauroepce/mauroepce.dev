"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechSketchProps {
  label: string;
  children: ReactNode;
}

export default function TechSketch({ label, children }: TechSketchProps) {
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
      <div className="mt-8 mb-8 max-w-md">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 uppercase">
            {label}
          </span>
          <div className="flex-1 h-px bg-foreground/8" />
          <span className="text-[10px] font-mono text-foreground/30 tracking-[0.2em] uppercase">
            expand ↗
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full border border-foreground/8 hover:border-[#C9A84C]/35 bg-[#0a0a0a]/40 p-4 transition-colors cursor-zoom-in text-left"
          aria-label={`Expand sketch: ${label}`}
        >
          {children}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#090909]/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            onClick={() => setOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.92, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono tracking-[0.35em] text-foreground/60 uppercase">
                  {label}
                </span>
                <div className="flex-1 h-px bg-foreground/15" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-mono text-foreground/45 hover:text-[#C9A84C]/85 transition-colors tracking-[0.25em] uppercase flex items-center gap-2"
                >
                  close <span className="text-base leading-none">×</span>
                </button>
              </div>
              <div className="border border-foreground/15 bg-[#0a0a0a] p-8 md:p-14">
                {children}
              </div>
              <p className="mt-3 text-[10px] font-mono text-foreground/25 tracking-wider italic">
                press esc or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
