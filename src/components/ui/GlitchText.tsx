"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<number>(0);
  const iterRef = useRef(0);

  const handleEnter = useCallback(() => {
    iterRef.current = 0;
    const total = 14;

    const tick = () => {
      iterRef.current++;
      const progress = iterRef.current / total;

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < text.length * progress) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterRef.current < total) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    };

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(tick);
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={handleEnter}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {displayed}
    </span>
  );
}
