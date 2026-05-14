"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface BrowserMockupProps {
  src?: string | null;
  url?: string;
}

const W = 480;
const H = 300;
const TOP = 30;

export default function BrowserMockup({
  src,
  url = "localhost:3000",
}: BrowserMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative flex items-center justify-center w-full"
    >
      <div
        className="relative max-w-full"
        style={{ width: W, height: H, aspectRatio: `${W} / ${H}` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2, pointerEvents: "none" }}
        >
          {/* Outer frame */}
          <rect
            x="1"
            y="1"
            width={W - 2}
            height={H - 2}
            rx="6"
            stroke="#E8E2D5"
            strokeWidth="0.6"
            strokeOpacity="0.25"
          />
          {/* Top bar separator */}
          <line
            x1="1"
            y1={TOP}
            x2={W - 1}
            y2={TOP}
            stroke="#E8E2D5"
            strokeWidth="0.4"
            strokeOpacity="0.2"
          />
          {/* Traffic lights — outlined */}
          <circle
            cx="16"
            cy={TOP / 2}
            r="3.5"
            stroke="#E8E2D5"
            strokeWidth="0.4"
            strokeOpacity="0.32"
          />
          <circle
            cx="28"
            cy={TOP / 2}
            r="3.5"
            stroke="#E8E2D5"
            strokeWidth="0.4"
            strokeOpacity="0.32"
          />
          <circle
            cx="40"
            cy={TOP / 2}
            r="3.5"
            stroke="#E8E2D5"
            strokeWidth="0.4"
            strokeOpacity="0.32"
          />
          {/* URL pill */}
          <rect
            x="105"
            y="8.5"
            width={W - 210}
            height="13"
            rx="3"
            stroke="#E8E2D5"
            strokeWidth="0.3"
            strokeOpacity="0.18"
          />
          {/* Gold corner accents */}
          <circle cx="8" cy={H - 8} r="1.2" fill="#C9A84C" fillOpacity="0.4" />
          <circle
            cx={W - 8}
            cy={H - 8}
            r="1.2"
            fill="#C9A84C"
            fillOpacity="0.4"
          />
        </svg>

        {/* URL text overlay */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 8,
            left: 105,
            width: W - 210,
            height: 14,
          }}
        >
          <p className="text-[9px] font-mono text-foreground/35 text-center leading-[14px] truncate">
            {url}
          </p>
        </div>

        {/* Viewport */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            top: TOP + 1,
            left: 1,
            width: W - 2,
            height: H - TOP - 2,
            borderRadius: "0 0 6px 6px",
            zIndex: 1,
          }}
        >
          {src ? (
            <>
              {!loaded && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-px h-8 bg-foreground/10 animate-pulse" />
                </div>
              )}
              <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={() => setLoaded(true)}
                className="w-full h-full object-cover"
                style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
              <div className="text-center space-y-3">
                <div className="w-10 h-px bg-[#C9A84C]/65 mx-auto" />
                <p className="text-[9px] font-mono tracking-[0.4em] text-foreground/35 uppercase">
                  preview · soon
                </p>
                <div className="w-10 h-px bg-[#C9A84C]/65 mx-auto" />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
