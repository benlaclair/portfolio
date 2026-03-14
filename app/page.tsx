import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import WorkSlider from "@/components/WorkSlider";
import DesignSlider from "@/components/DesignSlider";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />

      {/* Work slider */}
      <WorkSlider />

      {/* Design slider */}
      <DesignSlider />

      {/* Tools section */}
      <section className="px-6 md:px-12 pb-16 fade-up-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/tools"
            className="group flex items-center justify-between bg-surface border border-white/8 rounded-2xl px-8 py-7 hover:border-white/20 transition-all duration-300"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-1.5">
                Built things
              </p>
              <p className="text-xl font-extrabold text-ink mb-1 group-hover:text-grad transition-colors">
                Tools<span className="text-grad">_</span>
              </p>
              <p className="text-sm text-muted">
                Production tools I built to solve real problems in design, content, and workflow.
              </p>
            </div>
            <div className="flex items-center gap-4 ml-6 shrink-0">
              <span className="hidden sm:block text-xs font-bold text-muted">
                3 tools
              </span>
              <span className="text-2xl text-muted group-hover:text-ink transition-colors">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA block */}
      <section className="px-6 md:px-12 pb-24 fade-up-2">
        <div className="max-w-6xl mx-auto">
          <div className="bg-surface border border-white/8 rounded-3xl px-10 py-16 text-center">
            <p className="text-grad text-xs font-extrabold tracking-[0.2em] uppercase mb-3">
              Let&apos;s collaborate
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ink mb-6 tracking-tight">
              Got a project in mind?
            </h2>
            <p className="text-ink/60 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
              Whether it&apos;s a brand, an app, or something totally new — I&apos;d love
              to hear about it.
            </p>
            <Link
              href="/contact"
              className="bg-grad text-[#080B0F] font-extrabold px-8 py-4 rounded-full text-sm hover:bg-white transition-colors duration-300 inline-block"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
