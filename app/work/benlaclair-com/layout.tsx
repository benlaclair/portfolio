import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "benlaclair.com — Portfolio Case Study",
  description:
    "How I designed and built my portfolio from scratch in ~10 hours using Next.js, React, and Claude Code. Dark mode, glitch effects, and all the expressive web dev I love.",
  alternates: { canonical: "/work/benlaclair-com" },
};

export default function BenLaclairLayout({ children }: { children: React.ReactNode }) {
  return children;
}
