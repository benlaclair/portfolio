"use client";

import { useState, useEffect, useCallback } from "react";

interface ImageGalleryProps {
  coverColor: string;
  count?: number;
}

export default function ImageGallery({ coverColor, count = 4 }: ImageGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive((i) => i === null ? null : (i - 1 + count) % count), [count]);
  const next = useCallback(() => setActive((i) => i === null ? null : (i + 1) % count), [count]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [active, close, next, prev]);

  const alphas = [1.0, 0.85, 0.7, 0.55];

  return (
    <>
      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative aspect-video rounded-2xl flex items-center justify-center overflow-hidden cursor-zoom-in"
            style={{ backgroundColor: coverColor, opacity: alphas[i] ?? 0.5 }}
          >
            <span className="text-white/20 font-extrabold text-2xl group-hover:text-white/40 transition-colors duration-200">
              Image {i + 1}
            </span>
            {/* hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 text-white drop-shadow"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM11 8v6M8 11h6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative w-[88vw] max-w-5xl aspect-video rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl"
            style={{ backgroundColor: coverColor, opacity: alphas[active] ?? 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white/30 font-extrabold text-4xl">Image {active + 1}</span>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Close */}
          <button
            onClick={close}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 flex gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
