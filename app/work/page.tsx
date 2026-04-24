"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import DotGrid from "@/components/DotGrid";
import { PROJECTS } from "@/data/projects";
import { DESIGN_GROUPS } from "@/data/graphicDesign";

type Filter = "All" | "UI/UX" | "Branding";
const filters: Filter[] = ["All", "UI/UX", "Branding"];

const totalDesigns = DESIGN_GROUPS.reduce((sum, g) => sum + g.images.length, 0);

const MOSAIC = [
  {
    src: "/graphics/Client Work/imgi_8_d26KJYegtMtfkKLK.webp",
    alt: "College Basketball Finals 2024 poster featuring multiple university players and trophy",
    w: 1080, h: 1242,
  },
  {
    src: "/graphics/esports/imgi_17_WGJ6ZbI8G5KHWS5c (1).webp",
    alt: "Dark metallic wolf shield esports logo with circular digital ring and smoke",
    w: 3000, h: 1000,
  },
  {
    src: "/graphics/Educational Projects/imgi_26_48dPyzn0NgPrB43B.webp",
    alt: "Retro Vision neon outlined typography on dark starry space background",
    w: 3556, h: 2000,
  },
  {
    src: "/graphics/Client Work/imgi_35_yjlXqmf3wagmBbVf.webp",
    alt: "Holiday Face-Off hockey poster with four players and team logos on navy",
    w: 2000, h: 3067,
  },
  {
    src: "/graphics/Educational Projects/imgi_32_QQyeeIs0RIHttwB2.webp",
    alt: "Line 7 fashion poster with black and white yin-yang style letter composition",
    w: 1920, h: 2485,
  },
  {
    src: "/graphics/Educational Projects/imgi_3_0YOtGBhlKpAem5sW.webp",
    alt: "Pink and black Adidas Originals windbreaker with paint splatter effects",
    w: 800, h: 800,
  },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "UI/UX") return p.category === "UI/UX" || p.category === "Both";
    if (activeFilter === "Branding") return p.category === "Branding" || p.category === "Both";
    return true;
  });

  return (
    <div className="relative pt-24 md:pt-32 px-6 md:px-12 pb-12 md:pb-24">
      <DotGrid showDots={false} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-up">
        <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
          Selected work
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-12">
          WORK<span className="text-grad">_</span>
        </h1>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-8 md:mb-12 flex-wrap fade-up-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? "bg-grad text-[#080B0F]"
                  : "border-2 border-white/20 text-muted hover:border-white/50 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-sm text-muted self-center">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-up-2">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <ProjectCard project={project} index={0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Graphic design feature — visual mosaic with stats and CTA */}
        <div className="mt-20 md:mt-24 pt-12 border-t border-white/8 fade-up-3">
          <Link href="/work/graphic-design" className="group block">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-grad text-xs font-extrabold tracking-[0.2em] uppercase mb-3">
                  Also — Graphic Design
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight group-hover:text-grad transition-colors">
                  {totalDesigns} pieces. {DESIGN_GROUPS.length} industries.
                </h2>
                <p className="text-sm md:text-base text-muted mt-3 max-w-xl leading-relaxed">
                  Stream overlays, event posters, tournament branding, email campaigns, wayfinding signage, and brand systems across esports, education, and client work.
                </p>
              </div>
            </div>

            <div className="columns-2 md:columns-3 gap-3 md:gap-4 mb-8">
              {MOSAIC.map((img) => (
                <div
                  key={img.src}
                  className="mb-3 md:mb-4 break-inside-avoid rounded-xl overflow-hidden bg-surface"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    sizes="(max-width: 768px) 45vw, 30vw"
                    className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-muted">
                Six featured pieces. Click through to explore all {totalDesigns}.
              </p>
              <span className="bg-grad text-[#080B0F] font-extrabold px-6 py-3 rounded-full text-sm group-hover:bg-white transition-colors duration-300 inline-flex items-center gap-2">
                Explore all design
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
