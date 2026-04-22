"use client";

import { useEffect, useRef, useState } from "react";
import DotGrid from "@/components/DotGrid";
import { SCRAMBLE_CHARS, ANIMATION_TIMING } from "@/data/constants";

const BURST_PATTERNS = [
  [
    { clip: "inset(0% 0% 80% 0%)", x: -22, y: 0, color: "#F0F4F8" },
    { clip: "inset(22% 0% 55% 0%)", x: 28, y: 0, color: "#F0F4F8" },
    { clip: "inset(47% 0% 33% 0%)", x: -16, y: 0, color: "#F0F4F8" },
    { clip: "inset(0% 0% 80% 0%)", x: -30, y: 0, color: "#00F5E9" },
    { clip: "inset(22% 0% 55% 0%)", x: 36, y: 0, color: "#0090C8" },
  ],
  [
    { clip: "inset(0% 50% 50% 0%)", x: -30, y: -20, color: "#F0F4F8" },
    { clip: "inset(0% 0% 50% 50%)", x: 30, y: -20, color: "#F0F4F8" },
    { clip: "inset(50% 50% 0% 0%)", x: -30, y: 20, color: "#F0F4F8" },
    { clip: "inset(50% 0% 0% 50%)", x: 30, y: 20, color: "#F0F4F8" },
    { clip: "inset(0% 50% 50% 0%)", x: -38, y: -26, color: "#00F5E9" },
    { clip: "inset(50% 0% 0% 50%)", x: 38, y: 26, color: "#0090C8" },
  ],
  [
    { clip: "inset(0% 0% 50% 0%)", x: -40, y: 0, color: "#F0F4F8" },
    { clip: "inset(52% 0% 0% 0%)", x: 38, y: 0, color: "#F0F4F8" },
    { clip: "inset(0% 0% 50% 0%)", x: -48, y: 0, color: "#00F5E9" },
    { clip: "inset(52% 0% 0% 0%)", x: 46, y: 0, color: "#0090C8" },
  ],
];

export default function FullGlitchDemo() {
  const [glitching, setGlitching] = useState(false);
  const [scramble, setScramble] = useState<string | null>(null);
  const burstRef = useRef(0);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    function runCycle() {
      const target = ["B", "E", "N", "."];
      const resolveAt = [350, 500, 650, 820];
      const start = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const display = target.map((char, i) => {
          if (elapsed >= resolveAt[i]) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        });
        setScramble(display.join(""));
        if (elapsed >= resolveAt[3]) {
          clearInterval(interval);
          setScramble(null);
          setTimeout(() => {
            setGlitching(true);
            let frames = mobile ? 1 + Math.floor(Math.random() * 2) : 3 + Math.floor(Math.random() * 4);
            function nextFrame() {
              if (frames <= 0) {
                setGlitching(false);
                return;
              }
              frames--;
              setTimeout(nextFrame, 40 + Math.random() * 35);
            }
            setTimeout(nextFrame, 50);
          }, 400);
        }
      }, mobile ? ANIMATION_TIMING.scrambleMobile : ANIMATION_TIMING.scrambleDesktop);

      timer = setTimeout(runCycle, mobile ? 5000 + Math.random() * 4000 : 3000 + Math.random() * 2500);
    }

    runCycle();
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const currentPattern = glitching
    ? BURST_PATTERNS[burstRef.current % BURST_PATTERNS.length]
    : null;

  useEffect(() => {
    if (glitching) burstRef.current++;
  }, [glitching]);

  return (
    <div className="relative flex items-center justify-center select-none h-[320px] md:h-[400px]">
      <DotGrid />
      <div className="relative">
        {currentPattern?.map((slice, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute inset-0 font-extrabold leading-none tracking-tighter pointer-events-none"
            style={{
              fontSize: "clamp(80px, 15vw, 200px)",
              color: slice.color,
              transform: `translate(${slice.x}px, ${slice.y}px)`,
              clipPath: slice.clip,
            }}
          >
            BEN.
          </span>
        ))}
        <span
          style={{
            fontSize: "clamp(80px, 15vw, 200px)",
            opacity: glitching ? 0 : 1,
          }}
          className="font-extrabold leading-none tracking-tighter relative"
        >
          {scramble ? (
            <span className="text-ink">{scramble}</span>
          ) : (
            <>
              <span className="text-ink">BEN</span>
              <span className="text-grad">.</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
