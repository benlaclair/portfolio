import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected UI/UX design, branding, and web development projects by Ben LaClair.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
