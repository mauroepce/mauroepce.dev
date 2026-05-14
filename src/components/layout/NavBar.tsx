"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import SigilA from "@/components/sigils/SigilA";

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
        <SigilA
          size={22}
          className="text-foreground/55 group-hover:text-foreground/85 transition-colors"
        />
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
            className="ink-underline text-xs font-mono tracking-widest text-foreground/35 hover:text-foreground/80 transition-colors uppercase"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
