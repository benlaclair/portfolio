"use client";

import { useState } from "react";

interface DesignDecisionCardProps {
  number: string;
  label: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function DesignDecisionCard({ number, label, title, description, children }: DesignDecisionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
        open ? "border-white/15" : "border-white/8 hover:border-white/15 cursor-pointer"
      }`}
      onClick={!open ? () => setOpen(true) : undefined}
    >
      <div className={`px-5 md:px-6 py-5 flex justify-between items-center gap-4 transition-colors duration-300 ease-out ${open ? "bg-white/[0.03]" : "bg-surface"}`}>
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[10px] font-bold tracking-[0.15em] text-grad uppercase">{number}</span>
            <span className="text-[10px] font-bold tracking-[0.1em] text-white/20 uppercase">{label}</span>
          </div>
          <div className="text-base md:text-lg font-extrabold text-ink">{title}</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          className="w-8 h-8 rounded-full border border-white/20 text-muted shrink-0 hover:border-white/40 hover:text-ink transition-colors cursor-pointer flex items-center justify-center"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {!open && <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      <div
        className="transition-all duration-400 ease-out overflow-hidden"
        style={{
          maxHeight: open ? 800 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-5 md:px-6 pb-6 bg-white/[0.03] border-t border-white/8">
          <p className="text-sm text-muted leading-relaxed my-4">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
