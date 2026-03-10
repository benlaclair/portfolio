"use client";

import { useEffect, useRef } from "react";
import { designFeatures } from "@/data/caseStudyData";
import FullGlitchDemo from "./FullGlitchDemo";
import FullDotGrid from "./FullDotGrid";
import FullGradientDemo from "./FullGradientDemo";
import FullMarqueeDemo from "./FullMarqueeDemo";

export default function ExpandedPanel({
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
