"use client";

import Link from "next/link";

export default function WorkError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-4">
        Error
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight mb-4">
        Something went wrong<span className="text-grad">.</span>
      </h1>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-8">
        This project couldn&apos;t be loaded. Please try again or head back to all work.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-grad text-[#080B0F] font-extrabold px-8 py-4 rounded-full text-sm hover:bg-white transition-colors duration-300"
        >
          Try again →
        </button>
        <Link
          href="/work"
          className="border-2 border-white/20 text-ink font-extrabold px-8 py-4 rounded-full text-sm hover:border-white transition-colors duration-300"
        >
          ← All work
        </Link>
      </div>
    </div>
  );
}
