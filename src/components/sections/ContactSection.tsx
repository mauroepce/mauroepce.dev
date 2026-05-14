"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";

const contactLinks = [
  {
    label: "Email",
    value: "hola@mauroepce.dev",
    href: "mailto:hola@mauroepce.dev",
  },
  {
    label: "GitHub",
    value: "github.com/mauroepce",
    href: "https://github.com/mauroepce",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mauroepce",
    href: "https://linkedin.com/in/mauroepce",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-foreground/20 text-xs font-mono tracking-[0.4em] mb-3">
          / 04
        </p>
        <h2 className="font-serif italic text-5xl md:text-6xl text-foreground">
          Let&apos;s build.
        </h2>
        <div className="mt-5 h-px w-12 bg-[#C9A84C]/40" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-mono text-foreground/38 leading-loose"
          >
            Open for remote freelance worldwide.
            <br />
            Startups, products, teams that ship.
            <br />
            If that sounds like you — reach out.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-mono text-foreground/18 tracking-widest uppercase"
          >
            Based in Colombia · Available worldwide
          </motion.p>
        </div>

        {/* Right: Links */}
        <div className="space-y-0">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-4 border-b border-foreground/8 hover:border-foreground/20 transition-all"
            >
              <span className="text-[10px] font-mono tracking-[0.35em] text-foreground/22 uppercase sm:w-20 shrink-0">
                {link.label}
              </span>
              <GlitchText
                text={link.value}
                className="text-xs font-mono text-foreground/38 group-hover:text-foreground/75 transition-colors break-all sm:break-normal sm:flex-1 sm:text-right"
              />
              <span className="hidden sm:inline text-[#C9A84C]/28 group-hover:text-[#C9A84C]/65 transition-colors text-sm shrink-0">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
