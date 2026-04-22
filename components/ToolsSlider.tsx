"use client";

import Link from "next/link";
import { TOOLS } from "@/data/tools";
import ToolVisual from "@/components/tools/ToolVisual";
import { useLoopingScroll } from "@/hooks/useLoopingScroll";

export default function ToolsSlider() {
  const { scrollRef, innerRef } = useLoopingScroll("left");

  return (
    <section className="pb-20 fade-up-2">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink">
            TOOLS<span className="text-grad">_</span>
          </h2>
          <Link
            href="/tools"
            className="text-sm font-bold text-muted hover:text-ink transition-colors"
          >
            All tools →
          </Link>
        </div>
        <p className="text-sm text-muted mt-2">
          Production tools I built to solve real problems in design, content, and workflow.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Link href="/tools" className="block group cursor-pointer relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide select-none pointer-events-none rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
          >
            <div ref={innerRef} className="flex gap-5" style={{ willChange: "transform" }}>
              {[0, 1, 2].map((copy) =>
                TOOLS.map((tool, j) => (
                  <div
                    key={`${copy}-${j}`}
                    className="shrink-0 w-[300px] md:w-[360px]"
                  >
                    <ToolVisual type={tool.visual} accentColor={tool.accentColor} />
                    <div className="mt-3 px-1">
                      <h3 className="font-bold text-ink text-base leading-snug">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted mt-1 line-clamp-2">{tool.tagline}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-xl flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-grad text-[#080B0F] font-extrabold px-6 py-3 rounded-full text-sm shadow-lg">
              View all tools →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
