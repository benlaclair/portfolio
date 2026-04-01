"use client";

import { useEffect, useRef } from "react";

export function useLoopingScroll(direction: "left" | "right" = "left", speed = 0.03) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !innerRef.current) return;

    // Jump to the middle copy so we can loop in both directions
    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const oneSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = oneSetWidth;
    });

    let lastFrame = 0;
    let offset = 0;

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

    const sign = direction === "left" ? -1 : 1;
    let visible = true;

    function autoScroll(now: number) {
      if (!lastFrame) lastFrame = now;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      if (scrollRef.current && innerRef.current) {
        offset += dt * speed;
        const px = Math.floor(offset);
        if (px >= 1) {
          scrollRef.current.scrollLeft += sign * px;
          offset -= px;
          checkLoop();
        }
        innerRef.current.style.transform = `translateX(${-sign * offset}px)`;
      }
      if (visible) raf = requestAnimationFrame(autoScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) { lastFrame = 0; raf = requestAnimationFrame(autoScroll); }
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    observer.observe(el);

    let raf = requestAnimationFrame(autoScroll);
    el.addEventListener("scroll", checkLoop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener("scroll", checkLoop);
    };
  }, [direction, speed]);

  return { scrollRef, innerRef };
}
