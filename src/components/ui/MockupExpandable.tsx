"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MockupExpandableProps {
  label: string;
  children: ReactNode;
  scale?: number;
}

export default function MockupExpandable({
  label,
  children,
  scale = 1.8,
}: MockupExpandableProps) {
  const [open, setOpen] = useState(false);
  const [effectiveScale, setEffectiveScale] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEffectiveScale(mq.matches ? scale : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [scale]);

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
      <div className="relative group">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block cursor-zoom-in"
          aria-label={`Expand mockup: ${label}`}
        >
          {children}
        </button>
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-mono text-foreground/30 tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          click to expand ↗
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#090909]/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 cursor-zoom-out overflow-auto"
            onClick={() => setOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.92, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative cursor-default flex flex-col items-center max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4 w-full max-w-md">
                <span className="text-xs font-mono tracking-[0.35em] text-foreground/60 uppercase truncate">
                  {label}
                </span>
                <div className="flex-1 h-px bg-foreground/15" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-mono text-foreground/45 hover:text-[#C9A84C]/85 transition-colors tracking-[0.25em] uppercase flex items-center gap-2 shrink-0"
                >
                  close <span className="text-base leading-none">×</span>
                </button>
              </div>

              <div
                style={{
                  transform: `scale(${effectiveScale})`,
                  transformOrigin: "center top",
                  marginBottom: `calc(${(effectiveScale - 1) * 100}% - 0px)`,
                }}
                className="my-4"
              >
                {children}
              </div>

              <p className="mt-4 text-[10px] font-mono text-foreground/25 tracking-wider italic">
                press esc or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
