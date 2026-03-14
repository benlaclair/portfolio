import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import WorkSlider from "@/components/WorkSlider";
import DesignSlider from "@/components/DesignSlider";
import ToolsSlider from "@/components/ToolsSlider";
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

      {/* Tools slider */}
      <ToolsSlider />

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
