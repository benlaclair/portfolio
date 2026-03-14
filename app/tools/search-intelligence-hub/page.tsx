"use client";

import Link from "next/link";
import { TOOLS } from "@/data/tools";
import {
  seoHubStats,
  seoHubFeatures,
  seoHubOutcomes,
} from "@/data/seoHubCaseStudyData";
import DotGrid from "@/components/DotGrid";
import ScrollReveal from "@/components/casestudy/ScrollReveal";
import AnimatedStat from "@/components/casestudy/AnimatedStat";
import ToolStatusBadge from "@/components/tools/ToolStatusBadge";
import ToolEmbed from "@/components/tools/ToolEmbed";

export default function SeoHubCaseStudy() {
  const tool = TOOLS.find((t) => t.slug === "search-intelligence-hub")!;
  const currentIndex = TOOLS.findIndex((t) => t.slug === "search-intelligence-hub");
  const nextTool = TOOLS[(currentIndex + 1) % TOOLS.length];

  return (
    <div className="relative pt-24 md:pt-32 pb-12 md:pb-24">
      <DotGrid showDots={false} />

      {/* Header */}
      <div className="px-6 md:px-12 mb-12 fade-up">
        <div className="max-w-6xl mx-auto">
          <Link href="/tools" className="text-sm font-bold text-muted hover:text-ink transition-colors mb-8 inline-block">
            &larr; All tools
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {tool.tech.map((tag) => (
              <span key={tag} className="text-xs font-extrabold text-[#080B0F] px-3 py-1 rounded-full" style={{ background: tool.accentColor }}>{tag}</span>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Tool</p>
            <span className="text-muted">&middot;</span>
            <ToolStatusBadge status={tool.status} />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            Search Intelligence Hub<span style={{ color: tool.accentColor }}>_</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            {tool.tagline}
          </p>
        </div>
      </div>

      {/* Live Tool */}
      {tool.url && (
        <div className="px-6 md:px-12 mb-16 fade-up-1">
          <div className="max-w-6xl mx-auto">
            <ToolEmbed url={tool.url} title={tool.name} accentColor={tool.accentColor} />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="border-y border-white/8 mb-16 fade-up-1">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {seoHubStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-8 md:py-10 ${i < seoHubStats.length - 1 ? "border-r border-white/8" : ""} ${i < 2 ? "border-b border-white/8 md:border-b-0" : ""}`}
            >
              <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 100} accentColor={tool.accentColor} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* What it does */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">What it does</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6 max-w-3xl">
              A slide deck that wasn&rsquo;t sticking — turned into a product.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              A creative team couldn&rsquo;t distinguish AEO from a standard FAQ page, and a static presentation wasn&rsquo;t fixing that. This interactive platform replaces passive slides with color-coded strategy tracks, expandable sections, plain-language explanations, and 15+ copy-paste code examples — designed to be useful long after the initial presentation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {seoHubFeatures.map((f) => (
                <div key={f.number} className="bg-surface p-6 h-full">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block" style={{ color: tool.accentColor }}>{f.number}</span>
                  <div className="text-base font-extrabold text-ink mb-2 leading-tight">{f.title}</div>
                  <p className="text-sm text-muted leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Results</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {seoHubOutcomes.map((s) => (
                <div key={s.label} className="bg-surface p-5">
                  <span className="text-[10px] font-bold tracking-[0.15em] mb-2 block uppercase" style={{ color: tool.accentColor }}>{s.label}</span>
                  <div className="text-sm font-extrabold text-ink leading-snug">{s.value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Next tool */}
        <ScrollReveal>
          <div className="max-w-6xl mx-auto border-t border-white/8 pt-12">
            <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-3">Next tool</p>
            <Link
              href={`/tools/${nextTool.slug}`}
              className="text-3xl md:text-5xl font-extrabold text-ink transition-colors duration-300 block"
              style={{ '--hover-color': nextTool.accentColor } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = nextTool.accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              {nextTool.name} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
