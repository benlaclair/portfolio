"use client";

import Link from 'next/link';
import type { Tool } from '@/data/tools';
import ScrollReveal from '@/components/casestudy/ScrollReveal';
import ToolStatusBadge from './ToolStatusBadge';
import ToolVisual from './ToolVisual';

export default function ToolCard({ tool }: { tool: Tool }) {
  const isContentLeft = tool.layout === 'content-left';

  return (
    <ScrollReveal>
      <section
        className="py-12 md:py-20 border-t border-white/8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content */}
          <div className={isContentLeft ? 'lg:order-1' : 'lg:order-2'}>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
                {tool.number}
              </p>
              <span className="text-muted/30">·</span>
              <ToolStatusBadge status={tool.status} />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight mb-3">
              {tool.name}
              <span style={{ color: tool.accentColor }}>_</span>
            </h2>

            <p className="text-sm text-muted leading-relaxed mb-6 max-w-md">
              {tool.tagline}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tool.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1.5 border border-white/10 rounded-full text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {tool.url && (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200"
                  style={{
                    background: tool.accentColor,
                    color: '#080B0F',
                  }}
                >
                  Try it →
                </a>
              )}
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-muted border border-white/10 px-5 py-2.5 rounded-full hover:text-ink hover:border-white/20 transition-all duration-200"
              >
                Case study →
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className={isContentLeft ? 'lg:order-2' : 'lg:order-1'}>
            <ToolVisual type={tool.visual} accentColor={tool.accentColor} />
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
