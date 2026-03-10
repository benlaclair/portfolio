import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design",
  description:
    "Social media, print, brand assets, and digital collateral by Ben LaClair.",
  alternates: { canonical: "/work/graphic-design" },
};

export default function GraphicDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
