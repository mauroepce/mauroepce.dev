"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DrawingIntro from "@/components/intro/DrawingIntro";

export default function IntroGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <DrawingIntro onComplete={() => setIntroComplete(true)} />
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
