"use client";

import { useState, useEffect, useRef } from "react";

interface ToolEmbedProps {
  url: string;
  title: string;
  accentColor?: string;
}

export default function ToolEmbed({ url, title, accentColor }: ToolEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    fallbackTimer.current = setTimeout(() => setLoaded(true), 8000);
    return () => { if (fallbackTimer.current) clearTimeout(fallbackTimer.current); };
  }, []);

  const handleLoad = () => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    setLoaded(true);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="text-xs text-muted ml-3 tracking-wide truncate">
          {title} — <span className="font-bold" style={{ color: accentColor }}>Live</span>
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[10px] font-bold text-muted hover:text-ink transition-colors shrink-0"
        >
          Open ↗
        </a>
      </div>

      {/* Iframe */}
      <div className="relative bg-[#0a0d12] aspect-[16/10]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-5 h-5 border-2 border-white/20 border-t-lime rounded-full animate-spin mb-3 mx-auto" />
              <p className="text-xs text-muted">Loading tool...</p>
            </div>
          </div>
        )}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          onLoad={handleLoad}
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
