"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marginalia from "@/components/ui/Marginalia";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "React Native",
  "Docker",
  "Redux",
  "Express",
  "Prisma",
  "Cypress",
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
      <Marginalia text="same hand, three crafts" position="top-right" rotate={2} />
      <FadeIn>
        <div className="mb-16">
          <p className="text-foreground/50 text-xs font-mono tracking-[0.4em] mb-3">
            / 01
          </p>
          <h2 className="font-serif italic text-5xl md:text-6xl text-foreground">
            About
          </h2>
          <div className="mt-5 h-px w-12 bg-[#C9A84C]/65" />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Text */}
        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <p className="text-sm font-mono text-foreground/65 leading-loose">
              I work across three disciplines that share one thing — a line
              drawn with intent. Software systems, drawing, fine line tattoo
              on synthetic skin. The art isn&apos;t a hobby of the
              engineering; the engineering isn&apos;t a hobby of the art.
              Same hand.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm font-mono text-foreground/65 leading-loose">
              Seven years writing production code. Currently full-stack at
              TeselaGen Biotechnology (California, remote), consulting through
              Saargo. Before that I founded Birdi — a marketplace startup
              with last-mile logistics. Raised $100k USD in private
              investment, built two coordinated native Android apps, ran the
              business for three years before pandemic forced shutdown.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-sm font-mono text-foreground/65 leading-loose">
              I work best with teams that care about what they build.
              Open for remote freelance worldwide.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="pt-4">
              <p className="text-[10px] font-mono tracking-[0.4em] text-foreground/50 uppercase mb-4">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-foreground/65 border border-foreground/25 px-3 py-1 hover:border-[#C9A84C]/50 hover:text-foreground/90 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: Fine line visual */}
        <FadeIn delay={0.2}>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-70 mx-auto lg:mx-0">
              <svg
                viewBox="0 0 300 300"
                fill="none"
                stroke="currentColor"
                className="w-full h-auto"
              >
                {/* Grid */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0"
                    y1={i * 50}
                    x2="300"
                    y2={i * 50}
                    strokeWidth="0.4"
                    className="text-foreground/6"
                  />
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 50}
                    y1="0"
                    x2={i * 50}
                    y2="300"
                    strokeWidth="0.4"
                    className="text-foreground/6"
                  />
                ))}
                {/* Compass rose overlay */}
                <path
                  d="M 11 150 a 139 139 0 1 0 278 0 a 139 139 0 1 0 -278 0"
                  strokeWidth="0.5"
                  className="text-foreground/12"
                />
                <path
                  d="M 150 70 L 150 11 M 150 230 L 150 289 M 230 150 L 289 150 M 70 150 L 11 150"
                  strokeWidth="0.5"
                  className="text-foreground/12"
                />
                <path
                  d="M 196 104 L 231 69 M 104 104 L 69 69 M 196 196 L 231 231 M 104 196 L 69 231"
                  strokeWidth="0.3"
                  className="text-foreground/8"
                />
                {/* Inner circle */}
                <path
                  d="M 100 150 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0"
                  strokeWidth="0.4"
                  className="text-foreground/10"
                />
              </svg>

              {/* Overlay labels */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <p className="text-[10px] font-mono text-foreground/55 tracking-[0.35em]">
                  DEV
                </p>
                <div className="w-px h-6 bg-foreground/25" />
                <p className="text-[10px] font-mono text-[#C9A84C]/70 tracking-[0.35em]">
                  ART
                </p>
                <div className="w-px h-6 bg-foreground/25" />
                <p className="text-[10px] font-mono text-foreground/55 tracking-[0.35em]">
                  INK
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
