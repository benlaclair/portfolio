"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { SCRAMBLE_CHARS, ANIMATION_TIMING } from "@/data/constants";

export default function AnimatedStat({ value, suffix, label, delay, accentColor }: {
  value: string;
  suffix: string;
  label: string;
  delay: number;
  accentColor?: string;
}) {
  const { ref, inView } = useInView(0.3);
  const [display, setDisplay] = useState(value);
  const isNumeric = /^\d+$/.test(value);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const target = parseInt(value);
    const duration = 800;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target).toString());
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, isNumeric]);

  useEffect(() => {
    if (!inView || isNumeric) return;
    const mobile = window.innerWidth < 768;
    const letters = value.split("");
    const resolveAt = letters.map((_, i) => 200 + i * 120);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const next = letters.map((char, i) => {
        if (elapsed >= resolveAt[i]) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });
      setDisplay(next.join(""));

      if (elapsed >= resolveAt[resolveAt.length - 1]) {
        clearInterval(interval);
        setDisplay(value);
      }
    }, mobile ? ANIMATION_TIMING.scrambleMobile : ANIMATION_TIMING.scrambleDesktop);

    return () => clearInterval(interval);
  }, [inView, value, isNumeric]);

  return (
    <div ref={ref}>
      <span
        className={`text-2xl md:text-4xl font-extrabold tracking-tight leading-none ${accentColor ? "" : "text-grad"}`}
        style={accentColor ? { color: accentColor } : undefined}
      >
        {display}{suffix}
      </span>
      <span className="block text-xs font-bold tracking-[0.12em] text-muted uppercase mt-2">
        {label}
      </span>
    </div>
  );
}
