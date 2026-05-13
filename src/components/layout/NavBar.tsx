"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Signal", href: "/#signal" },
  { label: "Contact", href: "/#contact" },
];

export default function NavBar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 border-b border-border/60 bg-background/80 backdrop-blur-sm"
    >
      <a href="/" className="flex items-center gap-3 group">
        <svg
          viewBox="0 0 200 200"
          width="18"
          height="18"
          fill="none"
          strokeLinecap="round"
        >
          <path
            d="M 22 100 a 78 78 0 1 0 156 0 a 78 78 0 1 0 -156 0"
            stroke="currentColor"
            strokeWidth="4"
            className="text-foreground/30"
          />
          <path
            d="M 100 70 L 100 22 M 100 130 L 100 178 M 130 100 L 178 100 M 70 100 L 22 100"
            stroke="currentColor"
            strokeWidth="3"
            className="text-foreground/30"
          />
          <path
            d="M 121 79 L 155 45 M 79 79 L 45 45 M 121 121 L 155 155 M 79 121 L 45 155"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/20"
          />
          <path
            d="M 70 100 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0"
            stroke="currentColor"
            strokeWidth="3"
            className="text-foreground/30"
          />
          <circle cx="100" cy="100" r="5" fill="#C9A84C" opacity="0.7" />
        </svg>
        <GlitchText
          text="mauroepce"
          className="text-xs font-mono tracking-[0.25em] text-foreground/40 group-hover:text-foreground/70 transition-colors cursor-pointer"
        />
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs font-mono tracking-widest text-foreground/35 hover:text-foreground/80 transition-colors uppercase"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
