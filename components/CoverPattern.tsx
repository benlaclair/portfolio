"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function CoverPattern({
  title,
  coverColor,
}: {
  title: string;
  coverColor: string;
}) {
  const mobile = useIsMobile();
  const label = title.split("—")[0].trim();
  const rows = mobile ? 16 : 32;
  const cols = mobile ? 6 : 10;

  return (
    <>
      <style>{`
        @keyframes cvDriftR { from { transform: translateX(0px); } to { transform: translateX(280px); } }
        @keyframes cvDriftL { from { transform: translateX(0px); } to { transform: translateX(-280px); } }
        @media (prefers-reduced-motion: reduce) {
          [data-cover-pattern] * { animation-play-state: paused !important; }
        }
      `}</style>
      <div
        data-cover-pattern
        aria-hidden
        style={{
          position: "absolute",
          top: "-120%",
          left: "-120%",
          width: "340%",
          height: "340%",
          transform: "rotate(-38deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: "80px",
              whiteSpace: "nowrap",
              marginBottom: "10px",
              justifyContent: "center",
              lineHeight: 1,
              animation: `${row % 2 === 0 ? "cvDriftR" : "cvDriftL"} 45s linear ${-(row % 9) * 5}s infinite`,
            }}
          >
            {Array.from({ length: cols }).map((_, col) => (
              <span
                key={col}
                style={{
                  color: coverColor,
                  opacity: 0.28,
                  fontSize: "6rem",
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  userSelect: "none",
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
