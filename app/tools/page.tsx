import Link from 'next/link';
import DotGrid from '@/components/DotGrid';
import { TOOLS } from '@/data/tools';
import ToolCard from '@/components/tools/ToolCard';

export default function ToolsPage() {
  return (
    <div className="relative pt-24 md:pt-32 px-6 md:px-12 pb-12 md:pb-24">
      <DotGrid showDots={false} />
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="fade-up mb-8 md:mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
            Built things · 2025–2026
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-6">
            TOOLS<span className="text-grad">_</span>
          </h1>
          <p className="text-sm text-muted max-w-md leading-relaxed fade-up-1">
            Production tools I built to solve real problems in design, content, and workflow.
            Each one started as a pain point — and ended as something I actually use.
          </p>
        </div>

        {/* Tool sections */}
        <div>
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Footer */}
        <div className="pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/8 fade-up-2">
          <p className="text-xs text-muted">
            More tools in development — this page grows.
          </p>
          <Link
            href="/work"
            className="text-xs font-bold text-muted hover:text-grad transition-colors"
          >
            ← All work
          </Link>
        </div>
      </div>
    </div>
  );
}
