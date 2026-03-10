"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { SCRAMBLE_CHARS } from "@/data/constants";

export default function AnimatedStat({ value, suffix, label, delay }: {
  value: string;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, inView } = useInView(0.3);
  const [display, setDisplay] = useState(value);
  const isNumeric = /^\d+$/.test(value);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const target = parseInt(value);
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target).toString());
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, isNumeric]);

  useEffect(() => {
    if (!inView || isNumeric) return;
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
    }, 40);

    return () => clearInterval(interval);
  }, [inView, value, isNumeric]);

  return (
    <div ref={ref}>
      <span className="text-2xl md:text-4xl font-extrabold text-grad tracking-tight leading-none">
        {display}{suffix}
      </span>
      <span className="block text-xs font-bold tracking-[0.12em] text-muted uppercase mt-2">
        {label}
      </span>
    </div>
  );
}
