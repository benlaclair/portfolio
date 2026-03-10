"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DESIGN_GROUPS } from "@/data/graphicDesign";
import DotGrid from "@/components/DotGrid";

/* ── Lightbox ── */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer text-xl font-bold backdrop-blur-sm"
      >
        ×
      </button>

      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[92vw] max-h-[90vh] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

/* ── Clickable image thumbnail ── */
function ImageThumb({
  src,
  alt,
  className,
  imgClassName,
  onOpen,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onOpen: (src: string, alt: string) => void;
}) {
  return (
    <div
      className={`cursor-zoom-in group/thumb relative ${className ?? ""}`}
      onClick={() => onOpen(src, alt)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${imgClassName} transition-transform duration-300 ease-out group-hover/thumb:scale-[1.03]`}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <span className="text-white text-sm font-bold uppercase tracking-wider opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
          View ↗
        </span>
      </div>
    </div>
  );
}

/* ── Section ── */
function DesignSection({
  group,
  index,
  onOpenLightbox,
}: {
  group: (typeof DESIGN_GROUPS)[number];
  index: number;
  onOpenLightbox: (src: string, alt: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasImages = group.images.length > 0;

  // Drag-to-scroll with momentum
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumRaf = useRef(0);

  function stopMomentum() {
    if (momentumRaf.current) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = 0;
    }
  }

  function startMomentum() {
    const el = scrollRef.current;
    if (!el) return;
    let v = velocity.current;
    const decay = 0.95;
    const minV = 0.5;

    function step() {
      v *= decay;
      if (Math.abs(v) < minV || !scrollRef.current) {
        momentumRaf.current = 0;
        return;
      }
      scrollRef.current.scrollLeft -= v;
      checkLoop();
      momentumRaf.current = requestAnimationFrame(step);
    }
    momentumRaf.current = requestAnimationFrame(step);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!scrollRef.current) return;
    stopMomentum();
    if (innerRef.current) innerRef.current.style.transform = '';
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    velocity.current = 0;
    // Don't capture yet — wait until we confirm a drag
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;

    // Capture pointer only once we exceed the drag threshold
    if (!hasDragged.current && Math.abs(dx) > 5) {
      hasDragged.current = true;
      try { scrollRef.current.setPointerCapture(e.pointerId); } catch {}
      scrollRef.current.style.cursor = "grabbing";
    }

    if (!hasDragged.current) return;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.clientX - lastX.current) / dt * 16;
    }
    lastX.current = e.clientX;
    lastTime.current = now;

    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
    checkLoop();
    dragScrollLeft.current = scrollRef.current.scrollLeft + dx;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!isDragging.current || !scrollRef.current) return;
    isDragging.current = false;
    if (hasDragged.current) {
      try { scrollRef.current.releasePointerCapture(e.pointerId); } catch {}
      scrollRef.current.style.cursor = "";
      startMomentum();
    }
  }

  function handleImageClick(src: string, alt: string) {
    if (hasDragged.current) return;
    onOpenLightbox(src, alt);
  }

  function collapse() {
    setExpanded(false);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // Infinite loop: we render 3 copies and keep scroll centered on the middle set.
  const isHovered = useRef(false);
  const autoScrollRaf = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !hasImages || expanded) return;

    // Jump to the start of the middle copy (no smooth)
    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const oneSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = oneSetWidth;
    });

    // Slow auto-scroll using CSS transform for sub-pixel smoothness
    let lastFrame = 0;
    let offset = 0;
    function autoScroll(now: number) {
      if (!lastFrame) { lastFrame = now; }
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      if (!isHovered.current && !isDragging.current && scrollRef.current && innerRef.current && momentumRaf.current === 0) {
        const dir = index % 2 === 0 ? 1 : -1;
        offset += dt * 0.03;
        const px = Math.floor(offset);
        if (px >= 1) {
          scrollRef.current.scrollLeft += px * dir;
          offset -= px;
          checkLoop();
        }
        innerRef.current.style.transform = `translateX(${-offset * dir}px)`;
      }
      autoScrollRaf.current = requestAnimationFrame(autoScroll);
    }
    autoScrollRaf.current = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(autoScrollRaf.current);
  }, [hasImages, expanded]);

  function checkLoop() {
    const el = scrollRef.current;
    if (!el) return;
    const oneSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= oneSetWidth * 2) {
      el.scrollLeft -= oneSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += oneSetWidth;
    }
  }

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div ref={sectionRef} className={`fade-up-${Math.min(index + 1, 3)} scroll-mt-20`}>
      {/* Clickable group header */}
      <button
        onClick={() => expanded ? collapse() : setExpanded(true)}
        className="w-full flex items-center justify-between pb-4 border-b border-white/8 cursor-pointer group text-left"
      >
        <div>
          <h2 className="text-xl font-extrabold text-ink group-hover:text-lime transition-colors">
            {group.title}
          </h2>
          <p className="text-sm text-muted mt-1">{group.description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className="text-xs text-muted font-semibold">
            {group.images.length} {group.images.length === 1 ? "piece" : "pieces"}
          </span>
          <span className="text-xs text-muted font-bold uppercase tracking-wider">
            {expanded ? "Collapse" : "View all"}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted"
          >
            +
          </motion.span>
        </div>
      </button>

      <div className="pt-6">
        {hasImages ? (
          <>
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div
                key="slider"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative group/slider"
              >
                {/* Left arrow */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-ink/80 text-cream flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hover:bg-ink"
                >
                  ←
                </button>

                {/* Scrollable row — drag to scroll, infinite loop */}
                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab select-none"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerEnter={() => { isHovered.current = true; }}
                  onPointerLeave={(e) => { onPointerUp(e); isHovered.current = false; }}
                  onScroll={checkLoop}
                >
                  <div ref={innerRef} className="flex gap-3" style={{ willChange: 'transform' }}>
                    {[0, 1, 2].map((copy) =>
                      group.images.map((img, j) => (
                        <ImageThumb
                          key={`${copy}-${j}`}
                          src={img.src}
                          alt={img.alt}
                          className="shrink-0 h-[260px] md:h-[320px] rounded-xl overflow-hidden bg-surface"
                          imgClassName="h-full w-auto block pointer-events-none"
                          onOpen={handleImageClick}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Right arrow */}
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-ink/80 text-cream flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hover:bg-ink"
                >
                  →
                </button>

                {/* Fade edge on right side */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent" />
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Desktop: sticky float collapse button */}
                <button
                  onClick={collapse}
                  className="hidden md:block sticky top-20 z-20 float-right ml-4 mb-4 px-4 py-2 rounded-full bg-surface border border-white/10 text-xs font-bold uppercase tracking-wider text-muted hover:text-ink hover:border-lime transition-colors cursor-pointer backdrop-blur-sm shadow-lg"
                >
                  Collapse ×
                </button>

                <div className="flex flex-col gap-4">
                  {group.images.map((img, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: j * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <ImageThumb
                        src={img.src}
                        alt={img.alt}
                        className="rounded-xl overflow-hidden bg-surface"
                        imgClassName="w-full h-auto block"
                        onOpen={onOpenLightbox}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Mobile: portal collapse button — portaled to body to escape transform ancestors */}
          {expanded && typeof document !== "undefined" && createPortal(
            <button
              onClick={collapse}
              className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-surface border border-white/10 text-xs font-bold uppercase tracking-wider text-muted hover:text-ink hover:border-lime transition-colors cursor-pointer backdrop-blur-sm shadow-lg"
            >
              Collapse ×
            </button>,
            document.body
          )}
          </>
        ) : (
          <div className="flex gap-3 overflow-hidden">
            {[...Array(4)].map((_, j) => (
              <div
                key={j}
                className="shrink-0 w-[280px] md:w-[320px] aspect-video rounded-xl bg-surface border border-white/8 border-dashed flex items-center justify-center"
              >
                <span className="text-white/15 text-xs font-bold uppercase tracking-widest">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function GraphicDesignPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  return (
    <div className="relative pt-24 md:pt-32 px-6 md:px-12 pb-12 md:pb-24">
      <DotGrid showDots={false} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-up">
          <Link
            href="/work"
            className="text-sm font-bold text-muted hover:text-ink transition-colors mb-8 inline-block"
          >
            ← All work
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
            Graphic Design
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-4">
            DESIGN<span className="text-grad">_</span>
          </h1>
          <p className="text-base text-muted max-w-lg leading-relaxed mb-16">
            A collection of graphic design work spanning social media, print, branding,
            and digital — built for real clients across a range of industries.
          </p>
        </div>

        {/* Design groups */}
        <div className="flex flex-col gap-10">
          {DESIGN_GROUPS.map((group, i) => (
            <DesignSection key={group.id} group={group} index={i} onOpenLightbox={openLightbox} />
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
