import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Winter Olympics Spot — AI Video Case Study",
  description:
    "AI-generated 15-second TV spot that aired during Winter Olympics coverage on traditional TV and CTV.",
  alternates: { canonical: "/work/veo-olympics" },
};

export default function VeoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
