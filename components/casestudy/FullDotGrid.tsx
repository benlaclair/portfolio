"use client";

import { useEffect, useRef } from "react";

export default function FullDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = ctx;

    function resize() {
      if (!canvas || !container || !cx) return;
      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      cx.scale(dpr, dpr);
      return { W, H };
    }

    let dims = resize() || { W: 600, H: 400 };
    const SPACING = 28;

    type Cluster = { x: number; y: number; r: number; t: number; dur: number };
    let clusters: Cluster[] = [];
    let raf: number;

    function burst() {
      const count = 2 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          clusters.push({
            x: Math.random() * dims.W,
            y: Math.random() * dims.H,
            r: 50 + Math.random() * 130,
            t: performance.now(),
            dur: 0.3 + Math.random() * 0.5,
          });
        }, i * 100);
      }
    }

    function draw() {
      const now = performance.now();
      const { W, H } = dims;
      const cols = Math.floor(W / SPACING);
      const rows = Math.floor(H / SPACING);
      cx.clearRect(0, 0, W, H);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING + SPACING / 2;
          const y = row * SPACING + SPACING / 2;
          let a = 0.07;

          for (const cl of clusters) {
            const age = (now - cl.t) / 1000;
            if (age > cl.dur) continue;
            const dist = Math.sqrt((x - cl.x) ** 2 + (y - cl.y) ** 2);
            if (dist < cl.r) {
              const wave = Math.sin((age / cl.dur) * Math.PI);
              a += 0.22 * wave * (1 - dist / cl.r);
            }
          }

          cx.fillStyle = `rgba(0,223,255,${Math.min(a, 0.4)})`;
          cx.beginPath();
          cx.arc(x, y, 1.5, 0, Math.PI * 2);
          cx.fill();
        }
      }

      clusters = clusters.filter((cl) => (now - cl.t) / 1000 <= cl.dur);
      raf = requestAnimationFrame(draw);
    }

    draw();
    const burstInterval = setInterval(burst, 1200 + Math.random() * 1800);
    burst();

    const onResize = () => { dims = resize() || dims; };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(burstInterval);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[320px] md:h-[400px]" style={{ background: "#080B0F" }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
