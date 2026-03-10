import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Ben LaClair — a graphic designer and developer with a background in UI/UX, brand identity, and building things from scratch.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
