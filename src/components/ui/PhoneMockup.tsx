"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface PhoneMockupProps {
  src: string;
}

export default function PhoneMockup({ src }: PhoneMockupProps) {
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
      className="relative flex items-center justify-center"
    >
      {/* Phone outline SVG — fine line, tattoo style */}
      <div className="relative" style={{ width: 220, height: 440 }}>
        <svg
          viewBox="0 0 220 440"
          fill="none"
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2, pointerEvents: "none" }}
        >
          {/* Outer shell */}
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
          {/* Inner screen border */}
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
          {/* Dynamic island / notch */}
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
          {/* Side buttons — left */}
          <line x1="0.3" y1="110" x2="0.3" y2="145" stroke="#E8E2D5" strokeWidth="0.6" strokeOpacity="0.2" />
          <line x1="0.3" y1="158" x2="0.3" y2="200" stroke="#E8E2D5" strokeWidth="0.6" strokeOpacity="0.2" />
          {/* Side button — right */}
          <line x1="219.7" y1="130" x2="219.7" y2="185" stroke="#E8E2D5" strokeWidth="0.6" strokeOpacity="0.2" />
          {/* Bottom bar */}
          <rect x="85" y="416" width="50" height="3" rx="1.5" fill="#E8E2D5" fillOpacity="0.08" />
          {/* Corner accents — gold dots */}
          <circle cx="33" cy="33" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="187" cy="33" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="33" cy="407" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="187" cy="407" r="1.5" fill="#C9A84C" fillOpacity="0.35" />
        </svg>

        {/* Video screen */}
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
        </div>
      </div>
    </motion.div>
  );
}
