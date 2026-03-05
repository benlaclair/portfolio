"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import DotGrid from "@/components/DotGrid";
import { PROJECTS } from "@/data/projects";

type Filter = "All" | "UI/UX" | "Branding";
const filters: Filter[] = ["All", "UI/UX", "Branding"];

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
        <div className="flex gap-2 mb-12 flex-wrap fade-up-1">
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

        {/* Graphic design gallery link */}
        <div className="mt-10 pt-6 md:mt-20 md:pt-12 border-t border-white/8 fade-up-3">
          <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-4">
            Also
          </p>
          <Link
            href="/work/graphic-design"
            className="group flex items-center justify-between bg-surface border border-white/8 rounded-2xl px-5 py-4 md:px-8 md:py-6 hover:border-white/20 transition-all duration-300"
          >
            <div>
              <p className="text-xl font-extrabold text-ink mb-1 group-hover:text-grad transition-colors">
                Graphic Design
              </p>
              <p className="text-sm text-muted">
                Social media, print, brand assets & digital collateral
              </p>
            </div>
            <span className="text-2xl text-muted group-hover:text-ink transition-colors ml-6">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
