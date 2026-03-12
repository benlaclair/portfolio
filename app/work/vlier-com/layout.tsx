import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vlier.com — Product Page Redesign",
  description:
    "Restructuring a legacy industrial product page so the most valuable user action — downloading a CAD file — became unavoidable rather than impossible to find.",
  alternates: { canonical: "/work/vlier-com" },
};

export default function VlierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
