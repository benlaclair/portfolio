"use client";

import { useEffect, useState } from "react";

function StaggerLoop() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
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

export default function FullMarqueeDemo() {
  const items = [
    "UI/UX DESIGN", "BRAND IDENTITY", "VISUAL DESIGN", "TYPOGRAPHY",
    "INTERACTION DESIGN", "LOGO SYSTEMS", "PACKAGING", "DESIGN STRATEGY",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10">
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

      <StaggerLoop />
    </div>
  );
}
