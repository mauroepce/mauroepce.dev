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
  "top-left": "md:top-6 md:left-6",
  "top-right": "md:top-6 md:right-6",
  "bottom-left": "md:bottom-6 md:left-6",
  "bottom-right": "md:bottom-6 md:right-6",
  "right-middle": "md:top-1/2 md:right-8 md:-translate-y-1/2",
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
      animate={inView ? { opacity: 0.55 } : {}}
      whileHover={{ opacity: 1, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-handwritten)",
        transform: `rotate(${rotate}deg)`,
        transformOrigin: "left center",
      }}
      className={`block md:absolute ${POSITIONS[position]} mb-6 md:mb-0 pointer-events-auto text-[#C9A84C]/80 text-base md:text-lg italic tracking-wide select-none cursor-default max-w-full md:max-w-55 leading-tight ${className}`}
    >
      — {text}
    </motion.span>
  );
}
