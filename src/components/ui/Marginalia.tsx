"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MarginaliaProps {
  text: string;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "right-middle";
  className?: string;
  rotate?: number;
}

const POSITIONS: Record<NonNullable<MarginaliaProps["position"]>, string> = {
  "top-left": "top-6 left-6",
  "top-right": "top-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "right-middle": "top-1/2 right-8 -translate-y-1/2",
};

export default function Marginalia({
  text,
  position = "top-right",
  className = "",
  rotate = -3,
}: MarginaliaProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 0.35 } : {}}
      whileHover={{ opacity: 0.9, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-handwritten)",
        transform: `rotate(${rotate}deg)`,
      }}
      className={`absolute ${POSITIONS[position]} pointer-events-auto text-[#C9A84C]/55 text-lg italic tracking-wide select-none cursor-default max-w-[220px] leading-tight ${className}`}
    >
      — {text}
    </motion.span>
  );
}
