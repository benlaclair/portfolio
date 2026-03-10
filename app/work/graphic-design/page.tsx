"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DESIGN_GROUPS } from "@/data/graphicDesign";
import DotGrid from "@/components/DotGrid";
import Lightbox from "@/components/design/Lightbox";
import DesignSection from "@/components/design/DesignSection";

export default function GraphicDesignPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  return (
    <div className="relative pt-24 md:pt-32 px-6 md:px-12 pb-12 md:pb-24">
      <DotGrid showDots={false} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-up">
          <Link
            href="/work"
            className="text-sm font-bold text-muted hover:text-ink transition-colors mb-8 inline-block"
          >
            ← All work
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
            Graphic Design
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-4">
            DESIGN<span className="text-grad">_</span>
          </h1>
          <p className="text-base text-muted max-w-lg leading-relaxed mb-16">
            A collection of graphic design work spanning social media, print, branding,
            and digital — built for real clients across a range of industries.
          </p>
        </div>

        {/* Design groups */}
        <div className="flex flex-col gap-10">
          {DESIGN_GROUPS.map((group, i) => (
            <DesignSection key={group.id} group={group} index={i} onOpenLightbox={openLightbox} />
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
