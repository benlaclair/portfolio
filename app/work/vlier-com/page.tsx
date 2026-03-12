"use client";

import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import {
  vlierStats,
  vlierProblems,
  vlierPersonas,
  vlierDecisions,
  vlierOutcomes,
} from "@/data/vlierCaseStudyData";
import DotGrid from "@/components/DotGrid";
import ScrollReveal from "@/components/casestudy/ScrollReveal";
import AnimatedStat from "@/components/casestudy/AnimatedStat";
import DesignDecisionCard from "@/components/casestudy/vlier/DesignDecisionCard";
import { TabbedLayoutDemo, CTAHierarchyDemo, FilterDemo, RowClickDemo } from "@/components/casestudy/vlier/DecisionDemos";
import InteractiveProductPage from "@/components/casestudy/vlier/InteractiveProductPage";

export default function VlierCaseStudy() {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === "vlier-com");
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="relative pt-24 md:pt-32 pb-12 md:pb-24">
      <DotGrid showDots={false} />

      {/* Header */}
      <div className="px-6 md:px-12 mb-12 fade-up">
        <div className="max-w-6xl mx-auto">
          <Link href="/work" className="text-sm font-bold text-muted hover:text-ink transition-colors mb-8 inline-block">
            &larr; All work
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {["UX/UI Design", "Research & Strategy", "Prototyping", "B2B"].map((tag) => (
              <span key={tag} className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Case Study</p>
            <span className="text-muted">&middot;</span>
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">2025 / 2026</p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            Vlier.com<span className="text-grad">_</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            Restructuring a legacy industrial product page so that the most valuable user action — downloading a CAD file — became unavoidable.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-white/8 mb-16 fade-up-1">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {vlierStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-8 md:py-10 ${i < vlierStats.length - 1 ? "border-r border-white/8" : ""} ${i < 2 ? "border-b border-white/8 md:border-b-0" : ""}`}
            >
              <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 100} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* The Client + Brief — compact two-column */}
          <ScrollReveal className="mb-16 md:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Client</span>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight leading-tight mb-4">
                  Vlier — precision hardware since 1946
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  A division of Hutchinson Aerospace &amp; Industry, manufacturing spring plungers and positioning hardware for aerospace, defense, and industrial manufacturing. Their buyers are engineers who need exact specifications before placing an order.
                </p>
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Brief</span>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight leading-tight mb-4">
                  Redesign the product page UX
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  My role spanned UX research, visual design, and interactive prototyping — delivering two layout comps and dev-ready interaction specs for engineering handoff.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* The Problem — condensed */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6 max-w-3xl">
              The most valuable action on the page was the hardest to find.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              A CAD download is Vlier's strongest purchase signal — an engineer who downloads a CAD file is more likely than not to eventually buy. On the old page, that action was a tiny icon buried inside a spec table row. The only visible CTA was "Find a Distributor" — a mid-funnel action that skipped the most critical step entirely.
            </p>

            <div className="border-l-2 border-lime pl-6 mb-10 max-w-2xl">
              <p className="text-lg font-extrabold text-ink leading-snug italic">
                "A CAD download more likely than not turns into a sale — whether that's 2 months or 12 months from now."
              </p>
              <span className="text-[11px] font-bold tracking-[0.1em] text-muted mt-2 uppercase block">— Vlier Sales Team</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {vlierProblems.map((p) => (
                <div key={p.number} className="bg-surface p-6 h-full">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-grad uppercase mb-2 block">{p.number}</span>
                  <div className="text-base font-extrabold text-ink mb-2 leading-tight">{p.title}</div>
                  <p className="text-sm text-muted leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Research — compact personas */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Research</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6">
              Same user. Two different moments.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden mb-6">
              {vlierPersonas.map((u) => (
                <div key={u.role} className="bg-surface p-6 h-full">
                  <div className="text-lg font-extrabold text-grad mb-3">{u.role}</div>
                  <p className="text-sm text-muted leading-relaxed">{u.description}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              The page needed to serve both workflows without forcing either to wade through what they don't need. That meant a tabbed layout where browsing and speccing each get their own space.
            </p>
          </ScrollReveal>

          {/* Design Decisions — no nested ScrollReveals */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Design Decisions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-8">
              Every decision traced back to the engineer.
            </h2>
            <div className="flex flex-col gap-2">
              {vlierDecisions.map((d, i) => (
                <DesignDecisionCard key={d.number} number={d.number} label={d.label} title={d.title} description={d.description}>
                  {i === 0 && <TabbedLayoutDemo />}
                  {i === 1 && <CTAHierarchyDemo />}
                  {i === 2 && <FilterDemo />}
                  {i === 3 && <RowClickDemo />}
                </DesignDecisionCard>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Demo — the star of the show */}
        <ScrollReveal className="mb-16 md:mb-20">
          <div className="max-w-5xl mx-auto mb-6">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Experience It</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-3">
              Try the redesigned product page.
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              Click rows to see specs populate. Switch tabs. Filter tables. Use the calculators. This is a working prototype of the production spec.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-white/8">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="text-xs text-muted ml-3 tracking-wide">vlier.com — <span className="text-grad font-bold">interactive prototype</span></span>
              </div>
              <InteractiveProductPage />
            </div>
          </div>
        </ScrollReveal>

        {/* Outcome — compact */}
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Outcome</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6">
              In development. Grounded in research.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              Deliverables included two full layout comps, interaction specs, responsive breakpoint guidance, and a CTA hierarchy rationale tied to Vlier's conversion data. The core shift: stop treating the product page as a catalog — start treating it as the beginning of a sale.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {vlierOutcomes.map((s) => (
                <div key={s.label} className="bg-surface p-5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-grad mb-2 block uppercase">{s.label}</span>
                  <div className="text-sm font-extrabold text-ink leading-snug">{s.value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Next project */}
        <ScrollReveal>
          <div className="max-w-6xl mx-auto border-t border-white/8 pt-12">
            <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-3">Next project</p>
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
