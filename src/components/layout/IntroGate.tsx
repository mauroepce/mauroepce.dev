"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DrawingIntro from "@/components/intro/DrawingIntro";

const SESSION_KEY = "mauroepce:intro-seen";

type Phase = "deciding" | "playing" | "done";

export default function IntroGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("deciding");

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_KEY) === "1";
    setPhase(seen ? "done" : "playing");
  }, []);

  const handleComplete = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage may throw in private-mode / blocked contexts; safe to ignore
    }
    setPhase("done");
  };

  if (phase === "deciding") {
    return <div aria-hidden className="fixed inset-0 bg-background" />;
  }

  return (
    <>
      {phase === "playing" && <DrawingIntro onComplete={handleComplete} />}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
