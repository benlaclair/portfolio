"use client";

import { useEffect, useState } from "react";
import { SCRAMBLE_CHARS, ANIMATION_TIMING } from "@/data/constants";

export default function MiniGlitchDemo() {
  const [glitching, setGlitching] = useState(false);
  const [scramble, setScramble] = useState<string | null>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    function runCycle() {
      const target = ["B", "E", "N", "."];
      const resolveAt = [300, 450, 600, 780];
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
            setTimeout(() => setGlitching(false), 180);
          }, 600);
        }
      }, mobile ? ANIMATION_TIMING.scrambleMobile : ANIMATION_TIMING.scrambleDesktop);

      timer = setTimeout(runCycle, mobile ? 6000 + Math.random() * 5000 : 4000 + Math.random() * 3000);
    }

    timer = setTimeout(runCycle, 1200);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <div className="relative h-16 flex items-center justify-center overflow-hidden select-none">
      {glitching && (
        <>
          <span
            className="absolute text-3xl font-extrabold pointer-events-none"
            style={{
              color: "#00F5E9",
              clipPath: "inset(0% 0% 50% 0%)",
              transform: "translate(-8px, -3px)",
            }}
          >
            BEN.
          </span>
          <span
            className="absolute text-3xl font-extrabold pointer-events-none"
            style={{
              color: "#0090C8",
              clipPath: "inset(50% 0% 0% 0%)",
              transform: "translate(8px, 3px)",
            }}
          >
            BEN.
          </span>
        </>
      )}
      <span
        className="text-3xl font-extrabold"
        style={{ opacity: glitching ? 0 : 1 }}
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
  );
}
