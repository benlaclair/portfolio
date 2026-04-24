"use client";

import Image from "next/image";
import Link from "next/link";
import { DESIGN_GROUPS } from "@/data/graphicDesign";
import { useLoopingScroll } from "@/hooks/useLoopingScroll";

const totalImages = DESIGN_GROUPS.reduce((sum, g) => sum + g.images.length, 0);

const allImages = DESIGN_GROUPS.flatMap((g) =>
  g.images.map((img) => ({ ...img, group: g.title }))
);

function pickEvery(arr: typeof allImages, step: number, offset: number) {
  return arr.filter((_, i) => (i + offset) % step === 0);
}

const ROW_1 = pickEvery(allImages, 2, 0);
const ROW_2 = pickEvery(allImages, 2, 1);

function Row({ images, direction }: { images: typeof allImages; direction: "left" | "right" }) {
  const { scrollRef, innerRef } = useLoopingScroll(direction);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide select-none pointer-events-none"
    >
      <div ref={innerRef} className="flex gap-4" style={{ willChange: "transform" }}>
        {[0, 1, 2].map((copy) =>
          images.map((img, j) => (
            <div
              key={`${copy}-${j}`}
              className="shrink-0 h-[260px] md:h-[340px] rounded-xl overflow-hidden bg-surface"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                sizes="(max-width: 768px) 400px, 600px"
                className="h-full w-auto block"
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function DesignFeature() {
  return (
    <section className="py-24 fade-up-2">
      {/* Header — contained width */}
      <div className="px-6 md:px-12 mb-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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

          <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-1">
            <div className="md:text-right">
              <p className="text-2xl md:text-3xl font-extrabold text-ink leading-none">{totalImages}</p>
              <p className="text-xs font-bold text-muted tracking-[0.15em] uppercase mt-1">Pieces</p>
            </div>
            <div className="md:text-right">
              <p className="text-2xl md:text-3xl font-extrabold text-ink leading-none">{DESIGN_GROUPS.length}</p>
              <p className="text-xs font-bold text-muted tracking-[0.15em] uppercase mt-1">Industries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two scrolling rows — full bleed */}
      <div className="flex flex-col gap-4 mb-10">
        <Row images={ROW_1} direction="left" />
        <Row images={ROW_2} direction="right" />
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-muted">
            A sampling — click through to see the full body of work.
          </p>
          <Link
            href="/work/graphic-design"
            className="bg-grad text-[#080B0F] font-extrabold px-6 py-3 rounded-full text-sm hover:bg-white transition-colors duration-300 inline-flex items-center gap-2"
          >
            Explore all design
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
