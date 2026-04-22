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
    const BURST_CLUSTER_MIN = 2;
    const BURST_CLUSTER_MAX = 4;
    const BURST_RADIUS_MIN = 50;
    const BURST_RADIUS_MAX = 130;
    const BURST_DURATION_MIN = 0.25;
    const BURST_DURATION_MAX = 0.45;
    const BURST_SPREAD_MIN = 0.04;
    const BURST_SPREAD_MAX = 0.18;
    const BURST_WINDOW_MIN = 0.6;
    const BURST_WINDOW_MAX = 1.0;
    const BURST_COOLDOWN_MIN = 1.5;
    const BURST_COOLDOWN_MAX = 3.5;

    type Cluster = { cx: number; cy: number; r: number; startT: number; duration: number };
    let clusters: Cluster[] = [];
    let raf: number;
    let w = 0, h = 0;

    let burstActive = false;
    let burstEndAt = 0;
    let nextClusterAt = 0;
    let clustersLeft = 0;
    let nextBurstAt = BURST_COOLDOWN_MIN;
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

    // On mobile with showDots=false, render nothing — skip the RAF loop entirely
    if (mobile && !showDots) {
      resize();
      return;
    }

    // On mobile with showDots=true, draw static dots once — no animation loop
    if (mobile && showDots) {
      resize();
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
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
      // Redraw on resize only
      const onResize = () => {
        resize();
        if (!ctx) return;
        const cols = Math.ceil(w / SPACING) + 1;
        const rows = Math.ceil(h / SPACING) + 1;
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
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // Desktop: full animated dot grid with cluster bursts
    function tick(now: number) {
      if (!ctx) return;
      if (origin < 0) origin = now;
      const t = (now - origin) / 1000;
      ctx.clearRect(0, 0, w, h);

      if (!burstActive && t >= nextBurstAt) {
        burstActive = true;
        clustersLeft = BURST_CLUSTER_MIN + Math.floor(Math.random() * BURST_CLUSTER_MAX);
        nextClusterAt = t;
        burstEndAt = t + BURST_WINDOW_MIN + Math.random() * BURST_WINDOW_MAX;
      }

      if (burstActive) {
        while (clustersLeft > 0 && t >= nextClusterAt) {
          clusters.push({
            cx: Math.random() * w,
            cy: Math.random() * h,
            r: BURST_RADIUS_MIN + Math.random() * BURST_RADIUS_MAX,
            startT: t,
            duration: BURST_DURATION_MIN + Math.random() * BURST_DURATION_MAX,
          });
          clustersLeft--;
          nextClusterAt += BURST_SPREAD_MIN + Math.random() * BURST_SPREAD_MAX;
        }
        clusters = clusters.filter(c => t - c.startT < c.duration);
        if (t >= burstEndAt && clusters.length === 0) {
          burstActive = false;
          nextBurstAt = t + BURST_COOLDOWN_MIN + Math.random() * BURST_COOLDOWN_MAX;
        }
      } else {
        clusters = clusters.filter(c => t - c.startT < c.duration);
      }

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

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
