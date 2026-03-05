"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";

export default function WorkSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !innerRef.current) return;

    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const oneSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = oneSetWidth;
    });

    let lastFrame = 0;
    let offset = 0;

    function checkLoop() {
      const el = scrollRef.current;
      if (!el) return;
      const oneSetWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= oneSetWidth * 2) {
        el.scrollLeft -= oneSetWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += oneSetWidth;
      }
    }

    function autoScroll(now: number) {
      if (!lastFrame) lastFrame = now;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      if (scrollRef.current && innerRef.current) {
        offset += dt * 0.03;
        const px = Math.floor(offset);
        if (px >= 1) {
          scrollRef.current.scrollLeft -= px;
          offset -= px;
          checkLoop();
        }
        innerRef.current.style.transform = `translateX(${offset}px)`;
      }
      raf = requestAnimationFrame(autoScroll);
    }

    let raf = requestAnimationFrame(autoScroll);
    el.addEventListener("scroll", checkLoop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", checkLoop);
    };
  }, []);

  return (
    <section className="px-6 md:px-12 py-20 fade-up-1">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink">
            WORK<span className="text-grad">_</span>
          </h2>
          <Link
            href="/work"
            className="text-sm font-bold text-muted hover:text-ink transition-colors"
          >
            All projects →
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Link href="/work" className="block group">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide select-none pointer-events-none rounded-xl relative"
        >
          <div ref={innerRef} className="flex gap-6" style={{ willChange: "transform" }}>
            {[0, 1, 2].map((copy) =>
              PROJECTS.map((project, j) => (
                <div
                  key={`${copy}-${j}`}
                  className="shrink-0 w-[320px] md:w-[380px]"
                >
                  {/* Cover */}
                  <div
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4"
                    style={{ background: `linear-gradient(to right, ${project.coverColor}, ${project.coverColor}77)` }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl md:text-6xl font-extrabold text-white/15 tracking-tighter select-none">
                        {project.title.split("—")[0].trim().toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-ink text-base leading-snug truncate">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted mt-0.5 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs font-extrabold bg-grad text-[#080B0F] px-2.5 py-1 rounded-full whitespace-nowrap">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted">{project.year}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-xl flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-grad text-[#080B0F] font-extrabold px-6 py-3 rounded-full text-sm shadow-lg">
              View all projects →
            </span>
          </div>
        </div>
        </Link>
      </div>
    </section>
  );
}
