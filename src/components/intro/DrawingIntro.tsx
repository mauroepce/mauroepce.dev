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
    const t1 = setTimeout(() => setShowLabel(true), 2800);
    const t2 = setTimeout(dismiss, 4800);
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
              width="160"
              height="160"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer circle */}
              <motion.path
                d="M 22 100 a 78 78 0 1 0 156 0 a 78 78 0 1 0 -156 0"
                stroke="#E8E2D5"
                strokeWidth="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0, duration: 1.6, ease: "easeInOut" }}
              />
              {/* Cardinal N spoke */}
              <motion.path
                d="M 100 70 L 100 22"
                stroke="#E8E2D5"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4, ease: "easeInOut" }}
              />
              {/* Cardinal S spoke */}
              <motion.path
                d="M 100 130 L 100 178"
                stroke="#E8E2D5"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4, ease: "easeInOut" }}
              />
              {/* Cardinal E spoke */}
              <motion.path
                d="M 130 100 L 178 100"
                stroke="#E8E2D5"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.4, ease: "easeInOut" }}
              />
              {/* Cardinal W spoke */}
              <motion.path
                d="M 70 100 L 22 100"
                stroke="#E8E2D5"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.4, ease: "easeInOut" }}
              />
              {/* Diagonal NE */}
              <motion.path
                d="M 121 79 L 155 45"
                stroke="#E8E2D5"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.35, ease: "easeInOut" }}
              />
              {/* Diagonal NW */}
              <motion.path
                d="M 79 79 L 45 45"
                stroke="#E8E2D5"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.35, ease: "easeInOut" }}
              />
              {/* Diagonal SE */}
              <motion.path
                d="M 121 121 L 155 155"
                stroke="#E8E2D5"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.35, ease: "easeInOut" }}
              />
              {/* Diagonal SW */}
              <motion.path
                d="M 79 121 L 45 155"
                stroke="#E8E2D5"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.35, ease: "easeInOut" }}
              />
              {/* Inner circle */}
              <motion.path
                d="M 70 100 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0"
                stroke="#E8E2D5"
                strokeWidth="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.7, ease: "easeInOut" }}
              />
              {/* Center dot — gold */}
              <motion.path
                d="M 97 100 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"
                stroke="none"
                fill="#C9A84C"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.3, ease: "easeInOut" }}
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
