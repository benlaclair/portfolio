"use client";

import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import {
  veoStats,
  veoScenes,
  veoChallenges,
  veoProcess,
  veoOutcomes,
} from "@/data/veoCaseStudyData";
import DotGrid from "@/components/DotGrid";
import ScrollReveal from "@/components/casestudy/ScrollReveal";
import AnimatedStat from "@/components/casestudy/AnimatedStat";
import VideoHero from "@/components/casestudy/veo/VideoHero";

export default function VeoCaseStudy() {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === "veo-olympics");
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
            {["AI Video", "Google Flow", "TV/CTV", "Creative Direction"].map((tag) => (
              <span key={tag} className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Case Study</p>
            <span className="text-muted">&middot;</span>
            <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">2026</p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            AI Winter Olympics Spot<span className="text-grad">_</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            I generated every video scene for a 15-second TV spot using Google Flow — it aired on traditional TV and CTV during Winter Olympics coverage.
          </p>
        </div>
      </div>

      {/* Hero Video */}
      <div className="px-6 md:px-12 mb-16 fade-up-1">
        <div className="max-w-6xl mx-auto">
          <VideoHero />
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-white/8 mb-16 fade-up-1">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {veoStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-8 md:py-10 ${i < veoStats.length - 1 ? "border-r border-white/8" : ""} ${i < 2 ? "border-b border-white/8 md:border-b-0" : ""}`}
            >
              <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 100} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* The Client + Brief */}
          <ScrollReveal className="mb-16 md:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Client</span>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight leading-tight mb-4">
                  A pest control brand with prime airtime
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  The client is a regional pest control company. With the Winter Olympics approaching, they saw the massive audience as the perfect moment to run a memorable TV campaign — something that would cut through the noise of standard pest control advertising.
                </p>
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Brief</span>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight leading-tight mb-4">
                  A 15-second AI-generated commercial
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  The agency needed a 15-second AI-generated TV spot depicting mice as winter athletes — bobsledding through gutters, sneaking inside, taking over an attic. My role: generate all video footage using Google Flow, delivering broadcast-ready AI clips for the final cut.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* The Concept */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Concept</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6 max-w-3xl">
              Mice training for entry — like Olympic athletes.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              The agency flipped the script on pest control ads: instead of showing pests as a nuisance, the concept framed them as determined athletes training for the &ldquo;sport&rdquo; of home infiltration. I brought that vision to life across four AI-generated scenes — from the starting line to the attic.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {veoScenes.map((scene) => (
                <div key={scene.number} className="bg-surface p-6 h-full">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-grad uppercase mb-2 block">Scene {scene.number}</span>
                  <div className="text-base font-extrabold text-ink mb-2 leading-tight">{scene.title}</div>
                  <p className="text-sm text-muted leading-relaxed">{scene.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* The Constraint */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">The Constraint</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6 max-w-3xl">
              Evoke the Olympics without ever saying it.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              Legal restrictions meant zero use of the Olympics logo, rings, &ldquo;Team USA,&rdquo; &ldquo;medal,&rdquo; or even the word &ldquo;Olympics.&rdquo; Every scene had to communicate &ldquo;winter sports competition&rdquo; purely through visual storytelling — camera angles, athletic framing, snow, and speed.
            </p>

            <div className="border-l-2 border-lime pl-6 max-w-2xl">
              <p className="text-lg font-extrabold text-ink leading-snug italic">
                &ldquo;Think mice are hibernating? They&rsquo;re training for entry.&rdquo;
              </p>
              <span className="text-[11px] font-bold tracking-[0.1em] text-muted mt-2 uppercase block">— Voiceover script</span>
            </div>
          </ScrollReveal>

          {/* Challenges */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Challenges</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-8 max-w-3xl">
              Making AI footage broadcast-ready.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {veoChallenges.map((c) => (
                <div key={c.number} className="bg-surface p-6 h-full">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-grad uppercase mb-2 block">{c.number}</span>
                  <div className="text-base font-extrabold text-ink mb-2 leading-tight">{c.title}</div>
                  <p className="text-sm text-muted leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Process */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-3 max-w-3xl">
              Gemini + ChatGPT + Google Flow.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              AI wasn&rsquo;t just the output — it was the entire workflow. I used LLMs to storyboard and refine prompts, then generated footage in Google Flow using frame-to-frame, extension, and element-to-video techniques.
            </p>

            <div className="flex flex-col gap-px bg-white/8 rounded-2xl overflow-hidden">
              {veoProcess.map((p) => (
                <div key={p.step} className="bg-surface p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-extrabold text-grad leading-none">{p.step}</span>
                    <div className="text-base font-extrabold text-ink leading-tight">{p.title}</div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Outcome */}
          <ScrollReveal className="mb-16 md:mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">Outcome</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6">
              From AI generation to prime-time broadcast.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              Every AI-generated scene I delivered made it into the final 15-second spot. The agency handled voiceover, sound design, and the end slate — then the commercial aired on traditional TV and connected TV during Winter Olympics coverage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
              {veoOutcomes.map((s) => (
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
