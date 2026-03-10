"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import DotGrid from "@/components/DotGrid";
import { PROJECTS } from "@/data/projects";

/* ── data ── */
const stats = [
  { value: "10", suffix: " hrs", label: "Concept to launch" },
  { value: "Next.js", suffix: "", label: "Custom-coded" },
  { value: "0", suffix: "", label: "Templates used" },
  { value: "React", suffix: "", label: "From scratch" },
];

const beforeItems = [
  "Template platform",
  "Bootcamp projects only",
  "No personal brand",
  "Looked like everyone else",
];

const afterItems = [
  "Custom Next.js / React build",
  "Real client work (more incoming)",
  "Distinct editorial identity",
  "Shipped in ~10 hrs with AI",
];

const designFeatures = [
  {
    label: "Glitch & Scramble",
    description:
      'I\'ve always loved that moment in sci-fi interfaces where text flickers and resolves. The "BEN." wordmark does exactly that — characters scramble and lock in one by one, then a chromatic glitch burst tears through the text. It\'s the kind of detail I never get to ship in client work, and honestly my favorite thing on the site.',
    detail: "16 hand-tuned burst frames · 3-color chromatic split · 45ms scramble tick",
  },
  {
    label: "Living Dot Grid",
    description:
      "This one's subtle but it changes everything. The background is a canvas-rendered grid of cyan dots that pulses with random wave bursts — little clusters that bloom and fade like the page is breathing. Most people won't consciously notice it. That's the point.",
    detail: "28px grid · Canvas API at 60fps · 0.07 → 0.22 opacity wave",
  },
  {
    label: "Gradient System",
    description:
      "One gradient runs the whole show — bright cyan to deep blue. Accent text, buttons, tags, the marquee bar, hover states. Constraining myself to a single gradient forced every element to feel cohesive without me having to think about it. Simple rules, consistent results.",
    detail: "#00DFFF → #0090C8 · text-grad + bg-grad utilities",
  },
  {
    label: "Motion & Rhythm",
    description:
      "Nothing on this site just appears. Every section staggers in with a custom ease curve, project cards cascade in sequence, and the marquee ticker never stops moving. I wanted the site to feel like it's performing for you — not just sitting there waiting to be read.",
    detail: "0.7s staggered reveals · spring-based Framer Motion · 30s marquee loop",
  },
];

/* ── hooks ── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── components ── */
function ScrollReveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedStat({ value, suffix, label, delay }: {
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

  // Text scramble for non-numeric values
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%?";
  useEffect(() => {
    if (!inView || isNumeric) return;
    const letters = value.split("");
    const resolveAt = letters.map((_, i) => 200 + i * 120);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const next = letters.map((char, i) => {
        if (elapsed >= resolveAt[i]) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
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

/* Mini glitch demo for the design showcase */
function MiniGlitchDemo() {
  const [glitching, setGlitching] = useState(false);
  const [scramble, setScramble] = useState<string | null>(null);

  useEffect(() => {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%?|*=+~^&";
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    function runCycle() {
      // Scramble phase
      const target = ["B", "E", "N", "."];
      const resolveAt = [300, 450, 600, 780];
      const start = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const display = target.map((char, i) => {
          if (elapsed >= resolveAt[i]) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });
        setScramble(display.join(""));
        if (elapsed >= resolveAt[3]) {
          clearInterval(interval);
          setScramble(null);
          // Glitch burst after resolve
          setTimeout(() => {
            setGlitching(true);
            setTimeout(() => setGlitching(false), 180);
          }, 600);
        }
      }, 40);

      timer = setTimeout(runCycle, 4000 + Math.random() * 3000);
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

/* Mini dot grid pulse visualization */
function MiniDotGrid() {
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

/* ── Full-size demos ── */

function FullGlitchDemo() {
  const [glitching, setGlitching] = useState(false);
  const [scramble, setScramble] = useState<string | null>(null);

  useEffect(() => {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%?|*=+~^&";
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const BURST_SLICES = [
      [
        { clip: "inset(0% 0% 80% 0%)", x: -22, y: 0, color: "#F0F4F8" },
        { clip: "inset(22% 0% 55% 0%)", x: 28, y: 0, color: "#F0F4F8" },
        { clip: "inset(47% 0% 33% 0%)", x: -16, y: 0, color: "#F0F4F8" },
        { clip: "inset(69% 0% 13% 0%)", x: 20, y: 0, color: "#F0F4F8" },
        { clip: "inset(0% 0% 80% 0%)", x: -30, y: 0, color: "#00F5E9" },
        { clip: "inset(47% 0% 33% 0%)", x: -24, y: 0, color: "#00F5E9" },
        { clip: "inset(22% 0% 55% 0%)", x: 36, y: 0, color: "#0090C8" },
        { clip: "inset(69% 0% 13% 0%)", x: 28, y: 0, color: "#0090C8" },
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

    let sliceIdx = 0;
    type SliceState = typeof BURST_SLICES[0] | null;
    let activeSlices: SliceState = null;

    function runCycle() {
      const target = ["B", "E", "N", "."];
      const resolveAt = [350, 500, 650, 820];
      const start = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const display = target.map((char, i) => {
          if (elapsed >= resolveAt[i]) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });
        setScramble(display.join(""));
        if (elapsed >= resolveAt[3]) {
          clearInterval(interval);
          setScramble(null);
          // Glitch burst
          setTimeout(() => {
            activeSlices = BURST_SLICES[sliceIdx % BURST_SLICES.length];
            sliceIdx++;
            setGlitching(true);
            // Rapid multi-frame burst
            let frames = 3 + Math.floor(Math.random() * 4);
            function nextFrame() {
              if (frames <= 0) {
                setGlitching(false);
                activeSlices = null;
                return;
              }
              frames--;
              activeSlices = BURST_SLICES[Math.floor(Math.random() * BURST_SLICES.length)];
              setTimeout(nextFrame, 40 + Math.random() * 35);
            }
            setTimeout(nextFrame, 50);
          }, 400);
        }
      }, 45);

      timer = setTimeout(runCycle, 3000 + Math.random() * 2500);
    }

    runCycle();
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  // We need to track slices in state for rendering
  const [activeSlices, setActiveSlicesState] = useState<Array<{clip: string; x: number; y: number; color: string}> | null>(null);

  // Simplified approach: use glitching state to cycle through burst patterns
  const burstRef = useRef(0);
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

  const currentPattern = glitching
    ? BURST_PATTERNS[burstRef.current % BURST_PATTERNS.length]
    : null;

  // Advance pattern on each glitch
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

function FullDotGrid() {
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

function FullGradientDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 py-10">
      {/* Large gradient text */}
      <div className="text-center">
        <span className="text-grad font-extrabold tracking-tighter leading-none" style={{ fontSize: "clamp(60px, 12vw, 160px)" }}>
          Aa
        </span>
      </div>

      {/* Color strip */}
      <div className="w-full max-w-lg">
        <div className="h-4 rounded-full bg-grad mb-4" />
        <div className="flex justify-between text-xs font-bold tracking-[0.15em] text-muted uppercase">
          <span>#00DFFF</span>
          <span>→</span>
          <span>#0090C8</span>
        </div>
      </div>

      {/* Usage examples row */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <span className="bg-grad text-[#080B0F] font-bold text-sm px-6 py-3 rounded-full">Button</span>
        <span className="text-grad font-extrabold text-2xl">Accent Text</span>
        <span className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full">Tag</span>
        <span className="inline-flex items-center gap-2 bg-lime/20 border border-lime/50 text-grad text-xs font-extrabold px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />
          Status
        </span>
        <div className="w-10 h-10 rounded-full bg-grad" />
      </div>
    </div>
  );
}

function StaggerLoop() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Reset cycle to replay the animation every 3s
    const timer = setInterval(() => setCycle((c) => c + 1), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 px-8">
      <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
        Staggered entrance animation
      </p>
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`${cycle}-${i}`}
            className="w-16 h-16 md:w-24 md:h-24 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #00DFFF22, #0090C822)",
              border: "1px solid rgba(0,223,255,0.15)",
              opacity: 0,
              transform: "translateY(24px)",
              animation: `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s forwards`,
            }}
          />
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        {["0s", "+0.12s", "+0.24s", "+0.36s"].map((d) => (
          <span
            key={d}
            className="text-[10px] font-bold tracking-wide text-white/20 uppercase w-16 md:w-24 text-center"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function FullMarqueeDemo() {
  const items = [
    "UI/UX DESIGN", "BRAND IDENTITY", "VISUAL DESIGN", "TYPOGRAPHY",
    "INTERACTION DESIGN", "LOGO SYSTEMS", "PACKAGING", "DESIGN STRATEGY",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10">
      {/* Large marquee */}
      <div className="w-full bg-grad py-6 overflow-hidden">
        <div className="animate-marquee">
          {[0, 1, 2, 3].map((copy) =>
            items.map((item, j) => (
              <span
                key={`${copy}-${j}`}
                className="text-[#080B0F] font-extrabold text-xl md:text-3xl tracking-widest uppercase shrink-0"
              >
                <span className="opacity-40 mx-6">·</span>
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Staggered fade-up demo — loops */}
      <StaggerLoop />
    </div>
  );
}

/* Inline expanded preview panel */
function ExpandedPanel({
  featureIndex,
  onClose,
}: {
  featureIndex: number;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="bg-bg border border-white/10 rounded-2xl overflow-hidden flex flex-col md:h-full"
      style={{ animation: "fadeIn 0.3s ease-out both" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-white/8">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
            Live Preview
          </span>
          <span className="text-muted text-xs">·</span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-grad uppercase">
            {designFeatures[featureIndex].label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-ink transition-colors text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          Collapse
          <span className="text-sm">✕</span>
        </button>
      </div>

      {/* Demo area */}
      <div className="relative overflow-hidden min-h-[280px] md:flex-1">
        {featureIndex === 0 && <FullGlitchDemo />}
        {featureIndex === 1 && <FullDotGrid />}
        {featureIndex === 2 && <FullGradientDemo />}
        {featureIndex === 3 && <FullMarqueeDemo />}
      </div>

      {/* Bottom detail */}
      <div className="px-5 md:px-6 py-3 border-t border-white/8">
        <p className="text-[10px] font-bold tracking-wide text-white/20 uppercase">
          {designFeatures[featureIndex].detail}
        </p>
      </div>
    </div>
  );
}

/* ── main page ── */
export default function BenLaclairCaseStudy() {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === "benlaclair-com");
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const closeOverlay = useCallback(() => setExpandedFeature(null), []);

  return (
    <div className="relative pt-24 md:pt-32 pb-12 md:pb-24">
      <DotGrid showDots={false} />

      {/* Header */}
      <div className="px-6 md:px-12 mb-12 fade-up">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/work"
            className="text-sm font-bold text-muted hover:text-ink transition-colors mb-8 inline-block"
          >
            ← All work
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {["UX/UI Design", "Web Development", "Brand Identity", "Next.js"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
              Portfolio
            </p>
            <span className="text-muted">·</span>
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
              2026
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            benlaclair.com<span className="text-grad">_</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            The portfolio I actually wanted to build — dark, techy, and unapologetically mine.
          </p>
        </div>
      </div>

      {/* Stats row — animated counters */}
      <div className="border-y border-white/8 mb-16 fade-up-1">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-8 md:py-10 ${
                i < stats.length - 1 ? "border-r border-white/8" : ""
              } ${i < 2 ? "border-b border-white/8 md:border-b-0" : ""}`}
            >
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Browser mockup */}
      <div className="px-6 md:px-12 mb-16 md:mb-24 fade-up-2">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-white/8">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="text-xs text-muted ml-3 tracking-wide">
                benlaclair.com
              </span>
            </div>
            <div className="bg-bg p-6 md:p-8 min-h-[260px]">
              <div className="flex justify-between items-center mb-8 pb-3 border-b border-white/5">
                <span className="text-base font-extrabold text-ink">ben.</span>
                <div className="flex gap-5">
                  <span className="text-xs text-muted">Work</span>
                  <span className="text-xs text-muted">About</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-3">
                  Portfolio 2026_
                </p>
                <p className="text-5xl md:text-6xl font-extrabold text-ink tracking-tighter leading-none mb-2">
                  BEN.
                </p>
                <p className="text-xs text-muted mt-3">
                  UX/UI & Graphic Designer
                </p>
              </div>
              <div className="overflow-hidden border-t border-white/5 pt-3">
                <p className="text-[9px] tracking-[0.08em] text-white/15 whitespace-nowrap">
                  ·UI/UX DESIGN ·BRAND IDENTITY ·VISUAL DESIGN ·TYPOGRAPHY
                  ·INTERACTION DESIGN ·LOGO SYSTEMS ·PACKAGING ·DESIGN STRATEGY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* THE DECISION */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                The Decision
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.05] mb-8">
              I wanted dark mode everything. So I built it.
            </h2>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-5">
              My old portfolio was on uxfol.io — a template, bootcamp projects,
              nothing that felt like me. I kept looking at developer portfolios
              and dark-themed editorial sites thinking &ldquo;that&apos;s the energy I
              want&rdquo; but nothing in my toolkit let me get there. So I scrapped
              everything and started from zero.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              The dark background, the cyan glow, the glitch effects, the
              monospaced details — this is the aesthetic I&apos;ve always gravitated
              toward but never had a reason to ship. A personal portfolio was
              the perfect excuse to go all in on it. No client constraints, no
              brand guidelines to follow. Just the vibe I actually like.
            </p>
          </ScrollReveal>

          {/* THE BUILD */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                The Build
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.05] mb-8">
              10 hours, a blank repo, and a lot of caffeine.
            </h2>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-5">
              I built the whole thing in about 10 hours using Next.js, React,
              and Claude Code as a dev collaborator. No template, no starter kit —
              just an idea of the mood I wanted and a terminal window.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              I&apos;ll be upfront: I used AI to help me code this. But
              &ldquo;AI-assisted&rdquo; doesn&apos;t mean &ldquo;AI-designed.&rdquo; Every
              visual decision — the color system, the animation timing, the
              glitch behavior, the layout rhythm — came from my head.
              Claude Code was the engine; I was driving. Knowing how to direct
              AI toward a specific creative vision is a real skill, and this
              project is proof of that.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              What I&apos;m most proud of is how it feels. Most portfolios are
              basically slideshows. I wanted mine to feel like a place — something
              you explore, not just scroll through. The transitions, the hover
              states, the little moments of motion — that&apos;s the stuff that
              made this project genuinely fun to build.
            </p>
          </ScrollReveal>

          {/* THE DETAILS — design feature showcase */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                The Details
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.05] mb-4">
              The nerdy stuff I got to build.
            </h2>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-10">
              This is the part I get excited about. These are the visual systems
              running under the hood — the effects and details that give the site
              its personality. Click any card to see it in action.
            </p>

            {/* Feature cards — 2x2 grid with fly-out expand */}
            <div className="relative">
              {/* Cards grid — flies out when expanded */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ${
                  expandedFeature !== null ? "max-h-0 overflow-hidden md:max-h-none md:overflow-visible opacity-0 pointer-events-none" : ""
                }`}
              >
                {designFeatures.map((feature, i) => {
                  const flyDirections = [
                    "translate(-60px, -40px) scale(0.85)",
                    "translate(60px, -40px) scale(0.85)",
                    "translate(-60px, 40px) scale(0.85)",
                    "translate(60px, 40px) scale(0.85)",
                  ];
                  return (
                    <ScrollReveal key={feature.label} delay={i * 80}>
                      <div
                        className="group relative bg-surface border border-white/8 rounded-2xl p-5 md:p-6 hover:border-white/15 transition-all duration-500 cursor-pointer h-full flex flex-col"
                        style={{
                          transform: expandedFeature !== null ? flyDirections[i] : "translate(0,0) scale(1)",
                        }}
                        onClick={() => setExpandedFeature(i)}
                      >
                        {/* Live demo area */}
                        <div className="w-full bg-bg rounded-xl border border-white/5 overflow-hidden relative group/demo mb-4">
                          {i === 0 && <MiniGlitchDemo />}
                          {i === 1 && <MiniDotGrid />}
                          {i === 2 && (
                            <div className="h-16 flex items-center justify-center gap-3 px-4">
                              <span className="text-2xl font-extrabold text-grad">Aa</span>
                              <div className="flex-1 h-3 rounded-full bg-grad opacity-80" />
                              <div className="w-8 h-8 rounded-full bg-grad" />
                            </div>
                          )}
                          {i === 3 && (
                            <div className="h-16 overflow-hidden flex items-center">
                              <div className="animate-marquee">
                                {[0, 1].map((copy) => (
                                  <span
                                    key={copy}
                                    className="text-[10px] font-extrabold tracking-widest text-white/20 uppercase whitespace-nowrap"
                                  >
                                    <span className="mx-3 opacity-40">·</span>UI/UX DESIGN
                                    <span className="mx-3 opacity-40">·</span>BRAND IDENTITY
                                    <span className="mx-3 opacity-40">·</span>VISUAL DESIGN
                                    <span className="mx-3 opacity-40">·</span>TYPOGRAPHY
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Expand hint */}
                          <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover/demo:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl">
                            <span className="text-xs font-bold tracking-[0.15em] text-grad uppercase flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-lime">
                                <polyline points="15 3 21 3 21 9" /><line x1="21" y1="3" x2="14" y2="10" />
                                <polyline points="9 21 3 21 3 15" /><line x1="3" y1="21" x2="10" y2="14" />
                              </svg>
                              Expand
                            </span>
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="text-base font-extrabold text-ink">
                            {feature.label}
                          </h3>
                          <span className="text-[10px] font-bold tracking-[0.15em] text-white/20 group-hover:text-lime/50 transition-colors duration-300 uppercase flex items-center gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 3 21 3 21 9" /><line x1="21" y1="3" x2="14" y2="10" />
                            </svg>
                            Expand
                          </span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed mb-3 flex-1">
                          {feature.description}
                        </p>
                        <p className="text-[10px] font-bold tracking-wide text-white/20 uppercase">
                          {feature.detail}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
              )}

              {/* Expanded panel — absolute overlay on desktop, flow on mobile */}
              {expandedFeature !== null && (
                <div className="md:absolute md:inset-0">
                  <ExpandedPanel
                    featureIndex={expandedFeature}
                    onClose={closeOverlay}
                  />
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* BEFORE / AFTER */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-8">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                Before / After
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden">
              <div className="bg-surface p-7 md:p-9 flex flex-col gap-4">
                <div className="flex justify-between items-baseline pb-5 border-b border-white/8">
                  <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                    Before
                  </span>
                  <span className="text-[10px] tracking-wide text-muted">
                    uxfol.io · 2024
                  </span>
                </div>
                {beforeItems.map((item) => (
                  <div key={item} className="flex gap-3 items-baseline">
                    <span className="text-white/15 text-sm">✕</span>
                    <span className="text-sm text-muted">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-lime/[0.03] border-l-0 md:border-l border-white/8 p-7 md:p-9 flex flex-col gap-4">
                <div className="flex justify-between items-baseline pb-5 border-b border-white/8">
                  <span className="text-xs font-bold tracking-[0.2em] text-grad uppercase">
                    After
                  </span>
                  <span className="text-[10px] tracking-wide text-muted">
                    benlaclair.com · 2026
                  </span>
                </div>
                {afterItems.map((item) => (
                  <div key={item} className="flex gap-3 items-baseline">
                    <span className="text-grad text-sm">✓</span>
                    <span className="text-sm text-ink/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Next project */}
        <ScrollReveal>
          <div className="max-w-6xl mx-auto border-t border-white/8 pt-12">
            <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-3">
              Next project
            </p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="text-3xl md:text-5xl font-extrabold text-ink hover:text-grad transition-colors duration-300 block"
            >
              {nextProject.title} →
            </Link>
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
}
