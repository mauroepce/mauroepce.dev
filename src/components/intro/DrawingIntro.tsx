"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DrawingIntroProps {
  onComplete: () => void;
}

export default function DrawingIntro({ onComplete }: DrawingIntroProps) {
  const [visible, setVisible] = useState(true);
  const [showLabel, setShowLabel] = useState(false);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onComplete, 700);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setShowLabel(true), 3000);
    const t2 = setTimeout(dismiss, 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909] cursor-pointer select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          onClick={dismiss}
        >
          <div className="flex flex-col items-center gap-10">
            <svg
              viewBox="0 0 200 200"
              width="180"
              height="180"
              fill="none"
              strokeLinecap="round"
            >
              {/* Left circle — the first world (code/precision) */}
              <motion.path
                d="M 36 100 a 44 44 0 1 0 88 0 a 44 44 0 1 0 -88 0"
                stroke="#E8E2D5"
                strokeWidth="0.9"
                strokeOpacity="0.85"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0, duration: 1.4, ease: "easeInOut" }}
              />
              {/* Right circle — the second world (art/gesture) */}
              <motion.path
                d="M 76 100 a 44 44 0 1 0 88 0 a 44 44 0 1 0 -88 0"
                stroke="#E8E2D5"
                strokeWidth="0.9"
                strokeOpacity="0.85"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 1.4, ease: "easeInOut" }}
              />
              {/* Vertical axis — what binds the two worlds */}
              <motion.line
                x1="100"
                y1="32"
                x2="100"
                y2="168"
                stroke="#E8E2D5"
                strokeWidth="0.7"
                strokeOpacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.7, ease: "easeInOut" }}
              />
              {/* Top anchor */}
              <motion.circle
                cx="100"
                cy="32"
                r="1.8"
                fill="#E8E2D5"
                fillOpacity="0.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 2.4, duration: 0.3 }}
              />
              {/* Bottom anchor */}
              <motion.circle
                cx="100"
                cy="168"
                r="1.8"
                fill="#E8E2D5"
                fillOpacity="0.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.3 }}
              />
              {/* Gold center — where dualities meet */}
              <motion.circle
                cx="100"
                cy="100"
                r="5"
                fill="#C9A84C"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.7, duration: 0.5, ease: "easeOut" }}
              />
            </svg>

            <AnimatePresence>
              {showLabel && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#E8E2D5]/30 text-xs tracking-[0.5em] uppercase font-mono"
                >
                  mauroepce
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
