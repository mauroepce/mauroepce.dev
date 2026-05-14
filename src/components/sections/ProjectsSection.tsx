"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import PhoneMockup from "@/components/ui/PhoneMockup";
import PhoneSlideshow from "@/components/ui/PhoneSlideshow";
import BrowserMockup from "@/components/ui/BrowserMockup";
import Marginalia from "@/components/ui/Marginalia";
import MockupExpandable from "@/components/ui/MockupExpandable";
import ChileTravelSketch from "@/components/sketches/ChileTravelSketch";
import HonorariosSketch from "@/components/sketches/HonorariosSketch";
import ClaceboxSketch from "@/components/sketches/ClaceboxSketch";
import BirdiSketch from "@/components/sketches/BirdiSketch";

type Project = {
  number: string;
  title: string;
  badge: string | null;
  description: string;
  tags: string[];
  github: string | null;
  live: string | null;
  appStore: string | null;
  playStore: string | null;
  year: string;
  video: string | null;
  mockup: "phone" | "browser" | "phone-slideshow" | null;
  url?: string;
  slides?: string[];
  sketch?: "chiletravel" | "honorarios" | "clacebox" | "birdi";
};

function renderSketch(sketch: Project["sketch"]) {
  switch (sketch) {
    case "chiletravel":
      return <ChileTravelSketch />;
    case "honorarios":
      return <HonorariosSketch />;
    case "clacebox":
      return <ClaceboxSketch />;
    case "birdi":
      return <BirdiSketch />;
    default:
      return null;
  }
}

const projects: Project[] = [
  {
    number: "01",
    title: "Chile Travel",
    badge: "Live · Gov",
    description:
      "Production iOS/Android app commissioned by Chile's National Tourism Service (SERNATUR). Coordinates three separate codebases — React Native, Firebase Cloud Functions, and WordPress — sharing session and favorites state in real time. The hardest part: bidirectional sync with timestamp-based anti-loop guards, and a 3-level geo-normalized cache (coordinates quantized to ~1.1km cells) that returns list data in under 50ms — no dedicated caching infrastructure.",
    tags: ["React Native", "TypeScript", "Firebase", "Elasticsearch", "Expo", "WordPress", "Google Maps API", "EAS"],
    appStore: "#",
    playStore: "#",
    github: null,
    live: null,
    year: "2025",
    video: "/videos/chile-travel.mp4",
    mockup: "phone",
    sketch: "chiletravel",
  },
  {
    number: "02",
    title: "Honorarios.cl",
    badge: "Live",
    description:
      "Tax-retention calculator and invoice tracker for Chilean devs paid in USD by foreign companies. Built on Next.js 15 + Supabase + Lemon Squeezy (Merchant of Record — no LLC needed), with idempotent webhooks, scheduled email reminders via Resend, and server-rendered React mockups instead of screenshots — so marketing visuals never drift from production. The hardest part: intent preservation through the full auth flow — calculator → localStorage draft → email confirmation → checkout → prefilled invoice form, no state lost. One of several MVPs from kindtools.co, my personal validation lab where ideas live or die in 14 days.",
    tags: ["Next.js 15", "TypeScript", "Supabase", "Lemon Squeezy", "Resend", "PostHog", "Tailwind", "Vercel Edge"],
    github: null,
    live: "https://honorarios-cl.kindtools.co/",
    appStore: null,
    playStore: null,
    year: "2026",
    video: "/videos/honorarios-cl.mp4",
    mockup: "browser",
    url: "honorarios-cl.kindtools.co",
    sketch: "honorarios",
  },
  {
    number: "03",
    title: "Clacebox",
    badge: "Beta",
    description:
      "Specialty coffee subscription platform for Ecuador's market. Built on Next.js 16 with the payment provider isolated behind a Strategy interface — Lemon Squeezy runs as Merchant of Record in production, but swappable without touching checkout or order code (evaluated Stripe, MercadoPago, Kushki, PayPal first). Webhook handler is idempotent at the request level: HMAC signature persisted in a WebhookEvent table dedupes retries, timingSafeEqual guards comparison, every handler enforces valid state transitions — PENDING → SUCCESS, never overwrites. Auth via Supabase PKCE with Google OAuth and a Postgres trigger syncing auth.users to the application User table on signup.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Prisma 7", "Supabase", "Tailwind 4", "shadcn/ui", "Lemon Squeezy", "Resend", "Vercel"],
    github: null,
    live: "https://clacebox.com/",
    appStore: null,
    playStore: null,
    year: "2026",
    video: "/videos/clacebox.mp4",
    mockup: "browser",
    url: "clacebox.com",
    sketch: "clacebox",
  },
  {
    number: "04",
    title: "Birdi",
    badge: "Founded",
    description:
      "C2C marketplace + last-mile logistics for Chile — Rappi meets Facebook Marketplace. Founded the company, raised $100k USD private investment, ran it for 3 years. Two coordinated native Android apps in Kotlin (one for buyers/sellers, one for couriers), Firebase + Node.js backend on GCP. The hard problem was escrow: buyer funds held in an internal wallet until couriers completed in-person verification at pickup (ID photos, signatures, condition checks per security protocol) and confirmed delivery. Cron jobs reconciled wallet balances daily; payouts triggered post-delivery. Transbank payment gateway. Shut down in 2021 — pandemic and capital decisions.",
    tags: ["Kotlin", "Android", "Firebase", "GCP", "Node.js", "Transbank", "Cron", "Founder"],
    github: null,
    live: null,
    appStore: null,
    playStore: null,
    year: "2019–2021",
    video: null,
    mockup: "phone-slideshow",
    slides: [
      "/images/birdi/birdi-01.png",
      "/images/birdi/birdi-02.png",
      "/images/birdi/birdi-03.png",
      "/images/birdi/birdi-04.png",
    ],
    sketch: "birdi",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const links = [
    project.github && { label: "GitHub", href: project.github },
    project.live && { label: "Live", href: project.live },
    project.appStore && { label: "App Store", href: project.appStore },
    project.playStore && { label: "Google Play", href: project.playStore },
  ].filter(Boolean) as { label: string; href: string }[];

  const hasMockup = project.mockup !== null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative border-t border-foreground/20 py-12 hover:border-foreground/40 transition-colors"
    >
      <div
        className={`flex flex-col gap-10 ${
          hasMockup
            ? "lg:flex-row lg:items-center lg:gap-16"
            : "md:flex-row md:items-start md:gap-14"
        }`}
      >
        {/* Number — hidden when mockup present on desktop */}
        <span
          className={`text-7xl font-serif italic text-foreground/20 group-hover:text-foreground/35 transition-colors leading-none shrink-0 select-none ${
            hasMockup ? "lg:hidden" : ""
          }`}
        >
          {project.number}
        </span>

        {/* Content */}
        <div className="flex-1 space-y-4 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-serif text-3xl md:text-4xl text-foreground">
                <GlitchText text={project.title} />
              </h3>
              {project.badge && (
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]/90 border border-[#C9A84C]/50 px-2 py-0.5 self-center">
                  {project.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-foreground/55 shrink-0 mt-2">
              {project.year}
            </span>
          </div>

          <p className="text-sm font-mono text-foreground/38 leading-loose max-w-xl">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-foreground/55 tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="flex items-center gap-6 pt-3 flex-wrap">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-underline text-xs font-mono tracking-widest uppercase text-foreground/60 hover:text-foreground/90 transition-colors flex items-center gap-2 py-2 -my-2"
                >
                  {link.label} <span className="text-[#C9A84C]/75">↗</span>
                </a>
              ))}
            </div>
          )}

          {/* Technical sketch — the codex artifact */}
          {renderSketch(project.sketch)}
        </div>

        {/* Mockup — clickable to expand into modal */}
        {project.mockup === "phone" && (
          <div className="shrink-0 flex justify-center lg:justify-end pb-8 lg:pb-0">
            <MockupExpandable label={project.title} scale={1.8}>
              <PhoneMockup src={project.video ?? ""} />
            </MockupExpandable>
          </div>
        )}
        {project.mockup === "phone-slideshow" && project.slides && (
          <div className="shrink-0 flex justify-center lg:justify-end pb-8 lg:pb-0">
            <MockupExpandable label={project.title} scale={1.8}>
              <PhoneSlideshow slides={project.slides} />
            </MockupExpandable>
          </div>
        )}
        {project.mockup === "browser" && (
          <div className="shrink-0 flex justify-center lg:justify-end w-full lg:w-auto pb-8 lg:pb-0">
            <MockupExpandable label={project.title} scale={1.5}>
              <BrowserMockup src={project.video} url={project.url} />
            </MockupExpandable>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
      <Marginalia
        text="every object casts a shadow"
        position="top-right"
        rotate={-3}
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-foreground/50 text-xs font-mono tracking-[0.4em] mb-3">
          / 02
        </p>
        <h2 className="font-serif italic text-5xl md:text-6xl text-foreground">
          Projects
        </h2>
        <div className="mt-5 h-px w-12 bg-[#C9A84C]/65" />
      </motion.div>

      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
