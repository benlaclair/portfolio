"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import DotGrid from "@/components/DotGrid";
import { PROJECTS } from "@/data/projects";
import { stats, beforeItems, afterItems, designFeatures } from "@/data/caseStudyData";
import ScrollReveal from "@/components/casestudy/ScrollReveal";
import AnimatedStat from "@/components/casestudy/AnimatedStat";
import MiniGlitchDemo from "@/components/casestudy/MiniGlitchDemo";
import MiniDotGrid from "@/components/casestudy/MiniDotGrid";
import ExpandedPanel from "@/components/casestudy/ExpandedPanel";

export default function BenLaclairCaseStudy() {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === "benlaclair-com");
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [flyingOut, setFlyingOut] = useState<number | null>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const closeOverlay = useCallback(() => setExpandedFeature(null), []);

  const handleExpand = useCallback((i: number) => {
    setFlyingOut(i);
    setTimeout(() => {
      setFlyingOut(null);
      setExpandedFeature(i);
      requestAnimationFrame(() => {
        featureSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 400);
  }, []);

  return (
    <div className="relative pt-24 md:pt-32 pb-12 md:pb-24">
      <DotGrid showDots={false} />

      {/* Header */}
      <div className="px-6 md:px-12 mb-12 fade-up">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/work"
            className="text-sm font-bold text-muted hover:text-ink transition-colors mb-8 inline-block"
          >
            ← All work
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {["UX/UI Design", "Web Development", "Brand Identity", "Next.js"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
              Portfolio
            </p>
            <span className="text-muted">·</span>
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
              2026
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            benlaclair.com<span className="text-grad">_</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            The portfolio I actually wanted to build — dark, techy, and unapologetically mine.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-y border-white/8 mb-16 fade-up-1">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-8 md:py-10 ${
                i < stats.length - 1 ? "border-r border-white/8" : ""
              } ${i < 2 ? "border-b border-white/8 md:border-b-0" : ""}`}
            >
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Browser mockup */}
      <div className="px-6 md:px-12 mb-16 md:mb-24 fade-up-2">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-white/8">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="text-xs text-muted ml-3 tracking-wide">
                benlaclair.com
              </span>
            </div>
            <div className="bg-bg p-6 md:p-8 min-h-[260px]">
              <div className="flex justify-between items-center mb-8 pb-3 border-b border-white/5">
                <span className="text-base font-extrabold text-ink">ben.</span>
                <div className="flex gap-5">
                  <span className="text-xs text-muted">Work</span>
                  <span className="text-xs text-muted">About</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-3">
                  Portfolio 2026_
                </p>
                <p className="text-5xl md:text-6xl font-extrabold text-ink tracking-tighter leading-none mb-2">
                  BEN.
                </p>
                <p className="text-xs text-muted mt-3">
                  UX/UI & Graphic Designer
                </p>
              </div>
              <div className="overflow-hidden border-t border-white/5 pt-3">
                <p className="text-[9px] tracking-[0.08em] text-white/15 whitespace-nowrap">
                  ·UI/UX DESIGN ·BRAND IDENTITY ·VISUAL DESIGN ·TYPOGRAPHY
                  ·INTERACTION DESIGN ·LOGO SYSTEMS ·PACKAGING ·DESIGN STRATEGY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* THE DECISION */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                The Decision
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.05] mb-8">
              I wanted dark mode everything. So I built it.
            </h2>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-5">
              My old portfolio was on uxfol.io — a template, bootcamp projects,
              nothing that felt like me. I kept looking at developer portfolios
              and dark-themed editorial sites thinking &ldquo;that&apos;s the energy I
              want&rdquo; but nothing in my toolkit let me get there. So I scrapped
              everything and started from zero.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              The dark background, the cyan glow, the glitch effects, the
              monospaced details — this is the aesthetic I&apos;ve always gravitated
              toward but never had a reason to ship. A personal portfolio was
              the perfect excuse to go all in on it. No client constraints, no
              brand guidelines to follow. Just the vibe I actually like.
            </p>
          </ScrollReveal>

          {/* THE BUILD */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                The Build
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.05] mb-8">
              10 hours, a blank repo, and a lot of caffeine.
            </h2>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-5">
              I built the whole thing in about 10 hours using Next.js, React,
              and Claude Code as a dev collaborator. No template, no starter kit —
              just an idea of the mood I wanted and a terminal window.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              I&apos;ll be upfront: I used AI to help me code this. But
              &ldquo;AI-assisted&rdquo; doesn&apos;t mean &ldquo;AI-designed.&rdquo; Every
              visual decision — the color system, the animation timing, the
              glitch behavior, the layout rhythm — came from my head.
              Claude Code was the engine; I was driving. Knowing how to direct
              AI toward a specific creative vision is a real skill, and this
              project is proof of that.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              What I&apos;m most proud of is how it feels. Most portfolios are
              basically slideshows. I wanted mine to feel like a place — something
              you explore, not just scroll through. The transitions, the hover
              states, the little moments of motion — that&apos;s the stuff that
              made this project genuinely fun to build.
            </p>
          </ScrollReveal>

          {/* THE DETAILS — design feature showcase */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                The Details
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.05] mb-4">
              The nerdy stuff I got to build.
            </h2>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-10">
              This is the part I get excited about. These are the visual systems
              running under the hood — the effects and details that give the site
              its personality. Click any card to see it in action.
            </p>

            {/* Feature cards — 2x2 grid with fly-out expand */}
            <div ref={featureSectionRef} className="scroll-mt-24">
              {expandedFeature === null ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{
                  transition: "opacity 0.4s ease",
                  opacity: flyingOut !== null ? 0 : 1,
                  pointerEvents: flyingOut !== null ? "none" : "auto",
                }}
              >
                {designFeatures.map((feature, i) => {
                  const flyDirections = [
                    "translate(-50px, -30px) scale(0.9)",
                    "translate(50px, -30px) scale(0.9)",
                    "translate(-50px, 30px) scale(0.9)",
                    "translate(50px, 30px) scale(0.9)",
                  ];
                  return (
                    <ScrollReveal key={feature.label} delay={i * 80}>
                      <div
                        className="group relative bg-surface border border-white/8 rounded-2xl p-5 md:p-6 hover:border-white/15 cursor-pointer h-full flex flex-col"
                        style={{
                          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, border-color 0.3s",
                          transform: flyingOut !== null ? flyDirections[i] : "translate(0,0) scale(1)",
                        }}
                        onClick={() => handleExpand(i)}
                      >
                        {/* Live demo area */}
                        <div className="w-full bg-bg rounded-xl border border-white/5 overflow-hidden relative group/demo mb-4">
                          {i === 0 && <MiniGlitchDemo />}
                          {i === 1 && <MiniDotGrid />}
                          {i === 2 && (
                            <div className="h-16 flex items-center justify-center gap-3 px-4">
                              <span className="text-2xl font-extrabold text-grad">Aa</span>
                              <div className="flex-1 h-3 rounded-full bg-grad opacity-80" />
                              <div className="w-8 h-8 rounded-full bg-grad" />
                            </div>
                          )}
                          {i === 3 && (
                            <div className="h-16 overflow-hidden flex items-center">
                              <div className="animate-marquee">
                                {[0, 1].map((copy) => (
                                  <span
                                    key={copy}
                                    className="text-[10px] font-extrabold tracking-widest text-white/20 uppercase whitespace-nowrap"
                                  >
                                    <span className="mx-3 opacity-40">·</span>UI/UX DESIGN
                                    <span className="mx-3 opacity-40">·</span>BRAND IDENTITY
                                    <span className="mx-3 opacity-40">·</span>VISUAL DESIGN
                                    <span className="mx-3 opacity-40">·</span>TYPOGRAPHY
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Expand hint */}
                          <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover/demo:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl">
                            <span className="text-xs font-bold tracking-[0.15em] text-grad uppercase flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-lime">
                                <polyline points="15 3 21 3 21 9" /><line x1="21" y1="3" x2="14" y2="10" />
                                <polyline points="9 21 3 21 3 15" /><line x1="3" y1="21" x2="10" y2="14" />
                              </svg>
                              Expand
                            </span>
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="text-base font-extrabold text-ink">
                            {feature.label}
                          </h3>
                          <span className="text-[10px] font-bold tracking-[0.15em] text-white/20 group-hover:text-lime/50 transition-colors duration-300 uppercase flex items-center gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 3 21 3 21 9" /><line x1="21" y1="3" x2="14" y2="10" />
                            </svg>
                            Expand
                          </span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed mb-3 flex-1">
                          {feature.description}
                        </p>
                        <p className="text-[10px] font-bold tracking-wide text-white/20 uppercase">
                          {feature.detail}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
              ) : (
                <ExpandedPanel
                  featureIndex={expandedFeature}
                  onClose={closeOverlay}
                />
              )}
            </div>
          </ScrollReveal>

          {/* BEFORE / AFTER */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-5 mb-8">
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                Before / After
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden">
              <div className="bg-surface p-7 md:p-9 flex flex-col gap-4">
                <div className="flex justify-between items-baseline pb-5 border-b border-white/8">
                  <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
                    Before
                  </span>
                  <span className="text-[10px] tracking-wide text-muted">
                    uxfol.io · 2024
                  </span>
                </div>
                {beforeItems.map((item) => (
                  <div key={item} className="flex gap-3 items-baseline">
                    <span className="text-white/15 text-sm">✕</span>
                    <span className="text-sm text-muted">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-lime/[0.03] border-l-0 md:border-l border-white/8 p-7 md:p-9 flex flex-col gap-4">
                <div className="flex justify-between items-baseline pb-5 border-b border-white/8">
                  <span className="text-xs font-bold tracking-[0.2em] text-grad uppercase">
                    After
                  </span>
                  <span className="text-[10px] tracking-wide text-muted">
                    benlaclair.com · 2026
                  </span>
                </div>
                {afterItems.map((item) => (
                  <div key={item} className="flex gap-3 items-baseline">
                    <span className="text-grad text-sm">✓</span>
                    <span className="text-sm text-ink/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Next project */}
        <ScrollReveal>
          <div className="max-w-6xl mx-auto border-t border-white/8 pt-12">
            <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-3">
              Next project
            </p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="text-3xl md:text-5xl font-extrabold text-ink hover:text-grad transition-colors duration-300 block"
            >
              {nextProject.title} →
            </Link>
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
}
