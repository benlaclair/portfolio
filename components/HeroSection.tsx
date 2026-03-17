"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DotGrid from "@/components/DotGrid";
import { SCRAMBLE_CHARS } from "@/data/constants";

const tags = ["UX/UI Design", "Brand Identity", "Web Development", "AI Integration"];

const SCRAMBLE_TEXT = ["B", "E", "N", "."] as const;

type Slice = { clip: string; x: number; y?: number; color: string };
type GlitchFrame = { slices: Slice[]; mainX: number; mainY?: number };

const BURST_FRAMES: GlitchFrame[] = [
  // 0: alternating 5 horizontal strips
  { mainX: -2, slices: [
    { clip: "inset(0%  0% 80% 0%)", x: -14, color: "#F0F4F8" },
    { clip: "inset(22% 0% 55% 0%)", x:  18, color: "#F0F4F8" },
    { clip: "inset(47% 0% 33% 0%)", x: -10, color: "#F0F4F8" },
    { clip: "inset(69% 0% 13% 0%)", x:  14, color: "#F0F4F8" },
    { clip: "inset(89% 0% 0%  0%)", x:  -6, color: "#F0F4F8" },
    { clip: "inset(0%  0% 80% 0%)", x: -19, color: "#00F5E9" },
    { clip: "inset(47% 0% 33% 0%)", x: -15, color: "#00F5E9" },
    { clip: "inset(22% 0% 55% 0%)", x:  23, color: "#0090C8" },
    { clip: "inset(69% 0% 13% 0%)", x:  19, color: "#0090C8" },
  ]},

  // 1: two huge halves split apart
  { mainX: 0, slices: [
    { clip: "inset(0%  0% 50% 0%)", x: -28, color: "#F0F4F8" },
    { clip: "inset(52% 0% 0%  0%)", x:  26, color: "#F0F4F8" },
    { clip: "inset(0%  0% 50% 0%)", x: -33, color: "#00F5E9" },
    { clip: "inset(52% 0% 0%  0%)", x:  31, color: "#0090C8" },
  ]},

  // 2: staircase left
  { mainX: -4, slices: [
    { clip: "inset(0%  0% 83% 0%)", x:  -5, color: "#F0F4F8" },
    { clip: "inset(19% 0% 62% 0%)", x: -12, color: "#F0F4F8" },
    { clip: "inset(40% 0% 40% 0%)", x: -20, color: "#F0F4F8" },
    { clip: "inset(62% 0% 19% 0%)", x: -28, color: "#F0F4F8" },
    { clip: "inset(83% 0% 0%  0%)", x: -36, color: "#F0F4F8" },
    { clip: "inset(0%  0% 83% 0%)", x:  -9, color: "#00F5E9" },
    { clip: "inset(40% 0% 40% 0%)", x: -25, color: "#00F5E9" },
    { clip: "inset(83% 0% 0%  0%)", x: -41, color: "#00F5E9" },
  ]},

  // 3: staircase right
  { mainX: 4, slices: [
    { clip: "inset(0%  0% 83% 0%)", x:   6, color: "#F0F4F8" },
    { clip: "inset(19% 0% 62% 0%)", x:  14, color: "#F0F4F8" },
    { clip: "inset(40% 0% 40% 0%)", x:  22, color: "#F0F4F8" },
    { clip: "inset(62% 0% 19% 0%)", x:  30, color: "#F0F4F8" },
    { clip: "inset(83% 0% 0%  0%)", x:  38, color: "#F0F4F8" },
    { clip: "inset(19% 0% 62% 0%)", x:  19, color: "#0090C8" },
    { clip: "inset(62% 0% 19% 0%)", x:  35, color: "#0090C8" },
  ]},

  // 4: fine 8-strip rapid noise
  { mainX: 2, slices: [
    { clip: "inset(0%  0% 90% 0%)", x:  -7, color: "#F0F4F8" },
    { clip: "inset(12% 0% 78% 0%)", x:  10, color: "#F0F4F8" },
    { clip: "inset(24% 0% 66% 0%)", x: -13, color: "#F0F4F8" },
    { clip: "inset(36% 0% 54% 0%)", x:   8, color: "#F0F4F8" },
    { clip: "inset(48% 0% 42% 0%)", x: -10, color: "#F0F4F8" },
    { clip: "inset(60% 0% 30% 0%)", x:  12, color: "#F0F4F8" },
    { clip: "inset(72% 0% 18% 0%)", x:  -8, color: "#F0F4F8" },
    { clip: "inset(84% 0% 6%  0%)", x:   6, color: "#F0F4F8" },
    { clip: "inset(96% 0% 0%  0%)", x:  -5, color: "#F0F4F8" },
    { clip: "inset(0%  0% 90% 0%)", x: -11, color: "#00F5E9" },
    { clip: "inset(24% 0% 66% 0%)", x: -17, color: "#00F5E9" },
    { clip: "inset(12% 0% 78% 0%)", x:  14, color: "#0090C8" },
    { clip: "inset(48% 0% 42% 0%)", x:  13, color: "#0090C8" },
  ]},

  // 5: 5 vertical columns
  { mainX: 0, slices: [
    { clip: "inset(0% 80% 0% 0%)",  x: -18, color: "#F0F4F8" },
    { clip: "inset(0% 60% 0% 20%)", x:  14, color: "#F0F4F8" },
    { clip: "inset(0% 40% 0% 40%)", x: -10, color: "#F0F4F8" },
    { clip: "inset(0% 20% 0% 60%)", x:  16, color: "#F0F4F8" },
    { clip: "inset(0% 0%  0% 80%)", x:  -8, color: "#F0F4F8" },
    { clip: "inset(0% 80% 0% 0%)",  x: -23, color: "#00F5E9" },
    { clip: "inset(0% 40% 0% 40%)", x: -15, color: "#00F5E9" },
    { clip: "inset(0% 60% 0% 20%)", x:  19, color: "#0090C8" },
    { clip: "inset(0% 20% 0% 60%)", x:  21, color: "#0090C8" },
  ]},

  // 6: 3 wide vertical columns
  { mainX: 2, slices: [
    { clip: "inset(0% 67% 0% 0%)",  x: -24, color: "#F0F4F8" },
    { clip: "inset(0% 33% 0% 34%)", x:  20, color: "#F0F4F8" },
    { clip: "inset(0% 0%  0% 67%)", x: -16, color: "#F0F4F8" },
    { clip: "inset(0% 67% 0% 0%)",  x: -29, color: "#00F5E9" },
    { clip: "inset(0% 33% 0% 34%)", x:  25, color: "#0090C8" },
    { clip: "inset(0% 0%  0% 67%)", x: -21, color: "#00F5E9" },
  ]},

  // 7: left half rises, right half drops
  { mainX: 0, slices: [
    { clip: "inset(0% 50% 0% 0%)",  x:  -6, y: -22, color: "#F0F4F8" },
    { clip: "inset(0% 0%  0% 50%)", x:   6, y:  22, color: "#F0F4F8" },
    { clip: "inset(0% 50% 0% 0%)",  x: -10, y: -27, color: "#00F5E9" },
    { clip: "inset(0% 0%  0% 50%)", x:  10, y:  27, color: "#0090C8" },
  ]},

  // 8: quadrant explosion
  { mainX: 0, slices: [
    { clip: "inset(0%  50% 50% 0%)",  x: -20, y: -16, color: "#F0F4F8" },
    { clip: "inset(0%  0%  50% 50%)", x:  20, y: -16, color: "#F0F4F8" },
    { clip: "inset(50% 50% 0%  0%)",  x: -20, y:  16, color: "#F0F4F8" },
    { clip: "inset(50% 0%  0%  50%)", x:  20, y:  16, color: "#F0F4F8" },
    { clip: "inset(0%  50% 50% 0%)",  x: -25, y: -21, color: "#00F5E9" },
    { clip: "inset(0%  0%  50% 50%)", x:  25, y: -21, color: "#0090C8" },
    { clip: "inset(50% 50% 0%  0%)",  x: -25, y:  21, color: "#00F5E9" },
    { clip: "inset(50% 0%  0%  50%)", x:  25, y:  21, color: "#0090C8" },
  ]},

  // 9: whole thing jumps up hard
  { mainX: -3, mainY: -18, slices: [
    { clip: "inset(0% 0% 0% 0%)", x:  0, y:   0, color: "#F0F4F8" },
    { clip: "inset(0% 0% 0% 0%)", x: -5, y:  14, color: "#00F5E9" },
    { clip: "inset(0% 0% 0% 0%)", x:  5, y:  14, color: "#0090C8" },
  ]},

  // 10: horizontal strips with Y jitter
  { mainX: 0, slices: [
    { clip: "inset(0%  0% 80% 0%)", x: -16, y: -12, color: "#F0F4F8" },
    { clip: "inset(22% 0% 55% 0%)", x:  20, y:   8, color: "#F0F4F8" },
    { clip: "inset(47% 0% 33% 0%)", x: -10, y: -10, color: "#F0F4F8" },
    { clip: "inset(69% 0% 13% 0%)", x:  14, y:  14, color: "#F0F4F8" },
    { clip: "inset(89% 0% 0%  0%)", x:  -8, y:  -6, color: "#F0F4F8" },
    { clip: "inset(0%  0% 80% 0%)", x: -21, y: -17, color: "#00F5E9" },
    { clip: "inset(22% 0% 55% 0%)", x:  25, y:  13, color: "#0090C8" },
    { clip: "inset(47% 0% 33% 0%)", x: -15, y: -15, color: "#00F5E9" },
  ]},

  // 11: vertical columns with Y drop
  { mainX: 0, slices: [
    { clip: "inset(0% 80% 0% 0%)",  x: -10, y: -20, color: "#F0F4F8" },
    { clip: "inset(0% 60% 0% 20%)", x:   8, y:  16, color: "#F0F4F8" },
    { clip: "inset(0% 40% 0% 40%)", x: -12, y: -10, color: "#F0F4F8" },
    { clip: "inset(0% 20% 0% 60%)", x:  10, y:  22, color: "#F0F4F8" },
    { clip: "inset(0% 0%  0% 80%)", x:  -8, y: -18, color: "#F0F4F8" },
    { clip: "inset(0% 80% 0% 0%)",  x: -15, y: -25, color: "#00F5E9" },
    { clip: "inset(0% 40% 0% 40%)", x: -17, y: -15, color: "#00F5E9" },
    { clip: "inset(0% 20% 0% 60%)", x:  15, y:  27, color: "#0090C8" },
  ]},

  // 12: top-left and bottom-right quarters swap
  { mainX: 0, slices: [
    { clip: "inset(0%  55% 55% 0%)",  x:  32, y:   0, color: "#F0F4F8" },
    { clip: "inset(48% 0%  0%  55%)", x: -32, y:   0, color: "#F0F4F8" },
    { clip: "inset(0%  0%  55% 55%)", x:   0, y: -10, color: "#F0F4F8" },
    { clip: "inset(48% 55% 0%  0%)",  x:   0, y:  10, color: "#F0F4F8" },
    { clip: "inset(0%  55% 55% 0%)",  x:  37, y:   0, color: "#0090C8" },
    { clip: "inset(48% 0%  0%  55%)", x: -37, y:   0, color: "#00F5E9" },
  ]},

  // 13: whole text drops + subtle chroma
  { mainX: 2, mainY: 20, slices: [
    { clip: "inset(0% 0% 0% 0%)", x:   0, y:   0, color: "#F0F4F8" },
    { clip: "inset(0% 0% 0% 0%)", x:  -6, y:  -8, color: "#00F5E9" },
    { clip: "inset(0% 0% 0% 0%)", x:   6, y:  -8, color: "#0090C8" },
  ]},

  // 14: extreme wide — everything hard-left
  { mainX: -8, slices: [
    { clip: "inset(0%  0% 72% 0%)", x: -30, color: "#F0F4F8" },
    { clip: "inset(30% 0% 45% 0%)", x: -22, color: "#F0F4F8" },
    { clip: "inset(57% 0% 20% 0%)", x: -26, color: "#F0F4F8" },
    { clip: "inset(82% 0% 0%  0%)", x: -18, color: "#F0F4F8" },
    { clip: "inset(0%  0% 72% 0%)", x: -35, color: "#00F5E9" },
    { clip: "inset(30% 0% 45% 0%)", x: -27, color: "#00F5E9" },
  ]},

  // 15: top strip up, bottom strip down, middle stays
  { mainX: 0, slices: [
    { clip: "inset(0%  0% 70% 0%)", x:  0, y: -20, color: "#F0F4F8" },
    { clip: "inset(30% 0% 38% 0%)", x:  0, y:   0, color: "#F0F4F8" },
    { clip: "inset(64% 0% 0%  0%)", x:  0, y:  20, color: "#F0F4F8" },
    { clip: "inset(0%  0% 70% 0%)", x: -4, y: -26, color: "#00F5E9" },
    { clip: "inset(64% 0% 0%  0%)", x:  4, y:  26, color: "#0090C8" },
  ]},
];

export default function HeroSection() {
  const [frameIdx, setFrameIdx] = useState<number | null>(null);
  const [scrambleState, setScrambleState] = useState<(string | null)[] | null>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    let alive = true;
    let frameTimer: ReturnType<typeof setTimeout>;
    let burstTimer: ReturnType<typeof setTimeout>;
    let scrambleTick: ReturnType<typeof setInterval>;
    let scrambleTimer: ReturnType<typeof setTimeout>;

    const RESOLVE_AT = [350, 500, 650, 820];
    const scrambleInterval = mobile ? 80 : 45;

    function runScramble(onDone?: () => void) {
      clearInterval(scrambleTick);
      const resolved = [false, false, false, false];
      const start = Date.now();

      scrambleTick = setInterval(() => {
        const elapsed = Date.now() - start;
        let allDone = true;

        const next = SCRAMBLE_TEXT.map((_, i) => {
          if (resolved[i]) return null;
          if (elapsed >= RESOLVE_AT[i]) {
            resolved[i] = true;
            return null;
          }
          allDone = false;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }) as (string | null)[];

        setScrambleState([...next]);

        if (allDone) {
          clearInterval(scrambleTick);
          setScrambleState(null);
          onDone?.();
        }
      }, scrambleInterval);
    }

    function scheduleScramble() {
      if (!alive) return;
      scrambleTimer = setTimeout(() => {
        if (!alive) return;
        runScramble(scheduleScramble);
      }, mobile ? 12000 + Math.floor(Math.random() * 8000) : 8000 + Math.floor(Math.random() * 7000));
    }

    runScramble(scheduleScramble);

    function runBurst(onDone?: () => void) {
      const count = mobile ? 2 + Math.floor(Math.random() * 2) : 3 + Math.floor(Math.random() * 6);
      const pool = [...BURST_FRAMES.keys()];
      const picked: number[] = [];
      while (picked.length < count && pool.length > 0) {
        const i = Math.floor(Math.random() * pool.length);
        picked.push(pool.splice(i, 1)[0]);
      }

      let i = 0;
      function nextFrame() {
        if (!alive) return;
        if (i >= picked.length) {
          setFrameIdx(null);
          onDone?.();
          return;
        }
        setFrameIdx(picked[i]);
        i++;
        const delay = 35 + Math.floor(Math.random() * 40);
        frameTimer = setTimeout(nextFrame, delay);
      }
      nextFrame();
    }

    function scheduleNext() {
      if (!alive) return;
      const wait = mobile ? 5000 + Math.floor(Math.random() * 5000) : 2500 + Math.floor(Math.random() * 3500);
      burstTimer = setTimeout(() => {
        if (!alive) return;
        runBurst(() => {
          if (!alive) return;
          if (!mobile && Math.random() < 0.35) {
            frameTimer = setTimeout(() => { if (alive) runBurst(scheduleNext); }, 200 + Math.floor(Math.random() * 250));
          } else {
            scheduleNext();
          }
        });
      }, wait);
    }

    burstTimer = setTimeout(() => runBurst(scheduleNext), 1200);

    return () => {
      alive = false;
      clearTimeout(frameTimer);
      clearTimeout(burstTimer);
      clearTimeout(scrambleTimer);
      clearInterval(scrambleTick);
    };
  }, []);

  const frame = frameIdx !== null ? BURST_FRAMES[frameIdx] : null;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 overflow-hidden">
      <DotGrid />
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-4"
      >
        Portfolio 2026_
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-[22vw] md:text-[18vw] font-extrabold leading-none tracking-tighter"
      >
        <span
          className="relative block select-none"
          style={{
            transform: `translate(${frame?.mainX ?? 0}px, ${frame?.mainY ?? 0}px)`,
          }}
        >
          {frame?.slices.map((slice, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute inset-0 font-extrabold leading-none tracking-tighter pointer-events-none"
              style={{
                color: slice.color,
                transform: `translate(${slice.x}px, ${slice.y ?? 0}px)`,
                clipPath: slice.clip,
              }}
            >
              BEN.
            </span>
          ))}

          <span className="relative" style={{ opacity: frame ? 0 : 1 }}>
            {scrambleState ? (
              SCRAMBLE_TEXT.map((char, i) => {
                const resolved = scrambleState[i] === null;
                return (
                  <span
                    key={i}
                    className={resolved && char === "." ? "text-grad" : "text-ink"}
                  >
                    {scrambleState[i] ?? char}
                  </span>
                );
              })
            ) : (
              <>
                <span className="text-ink">BEN</span>
                <span className="text-grad">.</span>
              </>
            )}
          </span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-2"
      >
        <p className="text-2xl md:text-4xl font-extrabold text-ink">
          UX/UI & Graphic Designer
        </p>
        <p className="text-base text-muted mt-2 max-w-sm leading-relaxed">
          5+ years crafting user-centered design — from brand identity to full digital experiences.
        </p>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          className="inline-flex items-center gap-2 bg-lime/20 border border-lime/50 text-grad text-xs font-extrabold px-4 py-2 rounded-full select-none mt-6 mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block animate-pulse" />
          Open to work
        </motion.div>

        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <Link
            href="/work"
            className="inline-flex items-center justify-center bg-grad text-[#080B0F] font-bold px-7 py-3.5 rounded-full text-sm hover:bg-white transition-colors duration-300 w-full md:w-auto"
          >
            View Work →
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border-2 border-white/20 text-ink font-bold px-7 py-3.5 rounded-full text-sm hover:bg-white/10 transition-all duration-300 w-full md:w-auto"
          >
            About Me
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex gap-3 mt-12 flex-wrap"
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold text-muted border border-white/12 px-4 py-2 rounded-full"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
