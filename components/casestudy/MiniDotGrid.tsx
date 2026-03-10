"use client";

import { useEffect, useRef } from "react";

export default function MiniDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 280, H = 80;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const SPACING = 20;
    const cols = Math.floor(W / SPACING);
    const rows = Math.floor(H / SPACING);

    type Cluster = { x: number; y: number; r: number; t: number; dur: number };
    let clusters: Cluster[] = [];
    let raf: number;
    const cx = ctx;

    function burst() {
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          clusters.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 30 + Math.random() * 60,
            t: performance.now(),
            dur: 0.3 + Math.random() * 0.4,
          });
        }, i * 80);
      }
    }

    function draw() {
      const now = performance.now();
      cx.clearRect(0, 0, W, H);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING + SPACING / 2;
          const y = row * SPACING + SPACING / 2;
          let a = 0.08;

          for (const cl of clusters) {
            const age = (now - cl.t) / 1000;
            if (age > cl.dur) continue;
            const dist = Math.sqrt((x - cl.x) ** 2 + (y - cl.y) ** 2);
            if (dist < cl.r) {
              const wave = Math.sin((age / cl.dur) * Math.PI);
              a += 0.25 * wave * (1 - dist / cl.r);
            }
          }

          cx.fillStyle = `rgba(0,223,255,${Math.min(a, 0.4)})`;
          cx.beginPath();
          cx.arc(x, y, 1.2, 0, Math.PI * 2);
          cx.fill();
        }
      }

      clusters = clusters.filter((cl) => (now - cl.t) / 1000 <= cl.dur);
      raf = requestAnimationFrame(draw);
    }

    draw();
    const burstInterval = setInterval(burst, 1500 + Math.random() * 2000);
    burst();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(burstInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg"
      style={{ height: 80, background: "#080B0F" }}
    />
  );
}
