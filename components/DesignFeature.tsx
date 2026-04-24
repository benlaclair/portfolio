"use client";

import Image from "next/image";
import Link from "next/link";
import { DESIGN_GROUPS } from "@/data/graphicDesign";

const totalImages = DESIGN_GROUPS.reduce((sum, g) => sum + g.images.length, 0);

const HERO = {
  src: "/graphics/Client Work/imgi_34_NFkXe0lJMcgYeEEi.webp",
  alt: "Saatva Empire Classic poster with four players on NYC street backdrop",
};

const GRID = [
  {
    src: "/graphics/esports/imgi_9_nXOT2Lcgpom1h3qv (1).webp",
    alt: "Cyan 3D Curfew text with neon glow and teal flame effects",
  },
  {
    src: "/graphics/Educational Projects/imgi_25_i2l0HYbFNS7RIiKw.webp",
    alt: "Synthwave-style Retro Vision poster with VR headset and neon grid",
  },
  {
    src: "/graphics/Client Work/imgi_36_sJcuCkxVSV5XWtzY.webp",
    alt: "Vivid Seats Legends Classic poster with four basketball players at Barclays Center",
  },
  {
    src: "/graphics/Educational Projects/imgi_32_QQyeeIs0RIHttwB2.webp",
    alt: "Line 7 fashion poster with black and white yin-yang style letter composition",
  },
];

export default function DesignFeature() {
  return (
    <section className="px-6 md:px-12 py-24 fade-up-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-grad text-xs font-extrabold tracking-[0.2em] uppercase mb-3">
              Graphic Design
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight">
              DESIGN<span className="text-grad">_</span>
            </h2>
            <p className="text-sm md:text-base text-muted mt-4 max-w-xl leading-relaxed">
              {totalImages} pieces across esports, education, and client work — stream overlays, event posters, tournament branding, email campaigns, and brand systems.
            </p>
          </div>

          <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
            <span className="text-xs font-bold text-muted tracking-[0.15em] uppercase">
              3 industries
            </span>
            <span className="text-xs font-bold text-muted tracking-[0.15em] uppercase">
              4+ years
            </span>
          </div>
        </div>

        {/* Hero + Grid */}
        <Link
          href="/work/graphic-design"
          className="group block"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
            {/* Hero — takes 2 cols on desktop */}
            <div className="lg:col-span-2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] rounded-2xl overflow-hidden bg-surface">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0F]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.15em] uppercase text-grad mb-1">
                    Client Work
                  </p>
                  <p className="text-base md:text-lg font-extrabold text-ink">
                    Saatva Empire Classic
                  </p>
                </div>
              </div>
            </div>

            {/* 2x2 grid on desktop, 2x2 on mobile */}
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:col-span-1">
              {GRID.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-surface"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-t border-white/8 pt-6">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-grad" />
              <span>Featured from {DESIGN_GROUPS.length} collections</span>
            </div>
            <span className="bg-grad text-[#080B0F] font-extrabold px-6 py-3 rounded-full text-sm group-hover:bg-white transition-colors duration-300 inline-flex items-center gap-2">
              Explore all design
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
