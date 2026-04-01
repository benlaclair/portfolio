"use client";

import Image from "next/image";
import Link from "next/link";
import { DESIGN_GROUPS } from "@/data/graphicDesign";
import { useLoopingScroll } from "@/hooks/useLoopingScroll";

// Grab a mix of images from all groups
const SLIDER_IMAGES = DESIGN_GROUPS.flatMap((g) =>
  g.images.slice(0, 6).map((img) => ({ ...img, group: g.title }))
);

export default function DesignSlider() {
  const { scrollRef, innerRef } = useLoopingScroll("right");

  return (
    <section className="pb-20 fade-up-2">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink">
            DESIGN<span className="text-grad">_</span>
          </h2>
          <Link
            href="/work/graphic-design"
            className="text-sm font-bold text-muted hover:text-ink transition-colors"
          >
            View all designs →
          </Link>
        </div>
        <p className="text-sm text-muted mt-2">
          A sample of graphic design work across esports, education, and client projects.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Link href="/work/graphic-design" className="block group cursor-pointer relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide select-none pointer-events-none rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
        >
          <div ref={innerRef} className="flex gap-3" style={{ willChange: "transform" }}>
          {[0, 1, 2].map((copy) =>
            SLIDER_IMAGES.map((img, j) => (
              <div
                key={`${copy}-${j}`}
                className="shrink-0 h-[220px] md:h-[280px] rounded-xl overflow-hidden bg-surface"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 300px, 500px"
                  className="h-full w-auto block"
                  loading="lazy"
                />
              </div>
            ))
          )}
          </div>
        </div>
        {/* Hover overlay — outside scroll container so it stays fixed */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-xl flex items-center justify-center pointer-events-none">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-grad text-[#080B0F] font-extrabold px-6 py-3 rounded-full text-sm shadow-lg">
            View all designs →
          </span>
        </div>
        </Link>
      </div>
    </section>
  );
}
