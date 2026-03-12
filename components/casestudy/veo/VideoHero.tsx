"use client";

import { useState } from "react";

export default function VideoHero() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="text-xs text-muted ml-3 tracking-wide">
          AI Winter Olympics Spot — <span className="text-grad font-bold">15s broadcast</span>
        </span>
      </div>

      {/* Video or placeholder */}
      {hasError ? (
        <div className="bg-[#0a0d12] aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">🎬</div>
            <p className="text-sm text-muted">Video coming soon</p>
          </div>
        </div>
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full aspect-video bg-[#0a0d12] object-cover"
          onError={() => setHasError(true)}
        >
          <source src="/videos/veo-olympics-hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
