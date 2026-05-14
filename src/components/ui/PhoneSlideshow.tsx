"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

interface PhoneSlideshowProps {
  slides: string[];
  interval?: number;
}

const W = 220;
const H = 440;

export default function PhoneSlideshow({
  slides,
  interval = 3500,
}: PhoneSlideshowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || slides.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [inView, interval, slides.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative flex items-center justify-center"
    >
      <div className="relative" style={{ width: W, height: H }}>
        {/* Phone frame SVG (same as PhoneMockup) */}
        <svg
          viewBox="0 0 220 440"
          fill="none"
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2, pointerEvents: "none" }}
        >
          <rect
            x="1"
            y="1"
            width="218"
            height="438"
            rx="32"
            stroke="#E8E2D5"
            strokeWidth="0.6"
            strokeOpacity="0.25"
          />
          <rect
            x="10"
            y="18"
            width="200"
            height="404"
            rx="24"
            stroke="#E8E2D5"
            strokeWidth="0.3"
            strokeOpacity="0.12"
          />
          <rect
            x="78"
            y="24"
            width="64"
            height="14"
            rx="7"
            fill="#090909"
            stroke="#E8E2D5"
            strokeWidth="0.3"
            strokeOpacity="0.15"
          />
          <line
            x1="0.3"
            y1="110"
            x2="0.3"
            y2="145"
            stroke="#E8E2D5"
            strokeWidth="0.6"
            strokeOpacity="0.2"
          />
          <line
            x1="0.3"
            y1="158"
            x2="0.3"
            y2="200"
            stroke="#E8E2D5"
            strokeWidth="0.6"
            strokeOpacity="0.2"
          />
          <line
            x1="219.7"
            y1="130"
            x2="219.7"
            y2="185"
            stroke="#E8E2D5"
            strokeWidth="0.6"
            strokeOpacity="0.2"
          />
          <rect
            x="85"
            y="416"
            width="50"
            height="3"
            rx="1.5"
            fill="#E8E2D5"
            fillOpacity="0.08"
          />
          <circle cx="33" cy="33" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="187" cy="33" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="33" cy="407" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="187" cy="407" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
        </svg>

        {/* Screen with slides */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            top: 18,
            left: 10,
            width: 200,
            height: 404,
            borderRadius: 24,
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[index]}
                alt={`Slide ${index + 1}`}
                fill
                sizes="200px"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Slide progress indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-px transition-all duration-500 ${
                  i === index ? "w-5 bg-[#C9A84C]/70" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
