import { PROJECTS } from "@/data/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverPattern from "@/components/CoverPattern";
import ImageGallery from "@/components/ImageGallery";
import DotGrid from "@/components/DotGrid";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

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

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Hero cover */}
      <div
        className="relative w-full flex items-center justify-center mb-16 overflow-hidden fade-up-1 py-16 md:py-24"
        style={{ backgroundColor: "#080B0F" }}
      >
        <CoverPattern title={project.title} coverColor={project.coverColor} />

        {/* Center card */}
        <div
          className="relative z-10 w-[88%] max-w-5xl py-16 md:py-24 rounded-2xl text-center border"
          style={{
            background: `linear-gradient(135deg, ${project.coverColor} 0%, ${project.coverColor}99 100%)`,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <p className="text-sm font-extrabold tracking-[0.3em] uppercase mb-6 text-white/80">
            {project.category}
          </p>
          <div className="w-16 h-px mx-auto mb-8 bg-white/30" />
          <p className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none px-12 text-white">
            {project.title.split("—")[0].trim()}
          </p>
          {project.title.includes("—") && (
            <p className="text-base font-semibold mt-5 tracking-wide text-white/70">
              {project.title.split("—")[1]?.trim()}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 fade-up-2">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Sidebar metadata */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-1">
                Role
              </p>
              <p className="text-sm font-semibold text-ink">{project.role}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-1">
                Year
              </p>
              <p className="text-sm font-semibold text-ink">{project.year}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-2">
                Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-semibold bg-white/8 text-ink px-3 py-1.5 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-bold text-muted uppercase tracking-[0.15em] mb-4">
              Overview
            </h2>
            <p className="text-base text-ink/75 leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>

        {/* Image gallery */}
        <ImageGallery coverColor={project.coverColor} />

        {/* Next project */}
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
      </div>
    </div>
  );
}
