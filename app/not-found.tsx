import Link from "next/link";
import DotGrid from "@/components/DotGrid";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <DotGrid showDots={false} />
      <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-4">
        404
      </p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-4">
        Page not found<span className="text-grad">.</span>
      </h1>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-grad text-[#080B0F] font-extrabold px-8 py-4 rounded-full text-sm hover:bg-white transition-colors duration-300"
      >
        Back to home →
      </Link>
    </div>
  );
}
