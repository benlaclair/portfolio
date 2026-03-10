"use client";

import Image from "next/image";

export default function ImageThumb({
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
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 800px"
        className={`${imgClassName} transition-transform duration-300 ease-out group-hover/thumb:scale-[1.03]`}
        loading="lazy"
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
