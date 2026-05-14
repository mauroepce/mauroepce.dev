"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  age: number; // ms since spawn
  size: number;
};

const TRAIL_LIFE_MS = 700;
const SPAWN_INTERVAL_MS = 12;
const MAX_POINTS = 80;
const INK_COLOR = "#E8E2D5";

export default function InkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const lastSpawnRef = useRef(0);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);
  const enabledRef = useRef(true);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) {
      enabledRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return;
      lastSpawnRef.current = now;

      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        size: 1.2 + Math.random() * 0.6,
      });

      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    let lastFrame = performance.now();
    const render = () => {
      const now = performance.now();
      const dt = now - lastFrame;
      lastFrame = now;

      ctx.clearRect(0, 0, canvas.width / dprRef.current, canvas.height / dprRef.current);

      const pts = pointsRef.current;
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.age += dt;
        if (p.age >= TRAIL_LIFE_MS) {
          pts.splice(i, 1);
          continue;
        }
        const t = p.age / TRAIL_LIFE_MS; // 0..1
        const alpha = (1 - t) * 0.55;
        const radius = p.size * (1 - t * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${INK_COLOR}${Math.round(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabledRef.current && typeof window !== "undefined") return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
