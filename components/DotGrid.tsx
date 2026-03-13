"use client";

import { useEffect, useRef } from "react";

export default function DotGrid({ showDots = true }: { showDots?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const SPACING = mobile ? 44 : 28;
    const RADIUS = 1.5;
    const BASE_A = 0.07;
    const WAVE_A = 0.22;
    let frameCount = 0;

    type Cluster = { cx: number; cy: number; r: number; startT: number; duration: number };
    let clusters: Cluster[] = [];
    let raf: number;
    let w = 0, h = 0;

    let burstActive = false;
    let burstEndAt = 0;
    let nextClusterAt = 0;
    let clustersLeft = 0;
    let nextBurstAt = 1.5;
    let origin = -1;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick(now: number) {
      if (!ctx) return;
      frameCount++;
      if (mobile && frameCount % 2 !== 0) { raf = requestAnimationFrame(tick); return; }
      if (origin < 0) origin = now;
      const t = (now - origin) / 1000;
      ctx.clearRect(0, 0, w, h);

      if (!burstActive && t >= nextBurstAt) {
        burstActive = true;
        clustersLeft = 2 + Math.floor(Math.random() * 4);
        nextClusterAt = t;
        burstEndAt = t + 0.6 + Math.random() * 1.0;
      }

      if (burstActive) {
        while (clustersLeft > 0 && t >= nextClusterAt) {
          clusters.push({
            cx: Math.random() * w,
            cy: Math.random() * h,
            r: 50 + Math.random() * 130,
            startT: t,
            duration: 0.25 + Math.random() * 0.45,
          });
          clustersLeft--;
          nextClusterAt += 0.04 + Math.random() * 0.18;
        }
        clusters = clusters.filter(c => t - c.startT < c.duration);
        if (t >= burstEndAt && clusters.length === 0) {
          burstActive = false;
          nextBurstAt = t + 1.5 + Math.random() * 3.5;
        }
      } else {
        clusters = clusters.filter(c => t - c.startT < c.duration);
      }

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

      // Base dot grid (optional)
      if (showDots) {
        ctx.fillStyle = `rgba(0,223,255,${BASE_A})`;
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * SPACING, y = r * SPACING;
            ctx.moveTo(x + RADIUS, y);
            ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
          }
        }
        ctx.fill();
      }

      // Cluster glow bursts
      if (clusters.length > 0) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * SPACING, y = r * SPACING;
            let extra = 0;
            for (const cl of clusters) {
              const dx = x - cl.cx, dy = y - cl.cy;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < cl.r) {
                const age = (t - cl.startT) / cl.duration;
                extra += (WAVE_A - BASE_A) * (1 - dist / cl.r) * Math.sin(age * Math.PI);
              }
            }
            if (extra > 0.005) {
              ctx.fillStyle = `rgba(0,223,255,${Math.min(BASE_A + extra, WAVE_A).toFixed(3)})`;
              ctx.beginPath();
              ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [showDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
