import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://benlaclair.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ben LaClair — Designer & Developer",
    template: "%s | Ben LaClair",
  },
  description:
    "Portfolio of Ben LaClair, a graphic designer and developer specializing in UI/UX design, brand identity, and custom web builds.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ben LaClair",
    title: "Ben LaClair — Designer & Developer",
    description:
      "Portfolio of Ben LaClair, a graphic designer and developer specializing in UI/UX design, brand identity, and custom web builds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ben LaClair — Designer & Developer",
    description:
      "Portfolio of Ben LaClair, a graphic designer and developer specializing in UI/UX design, brand identity, and custom web builds.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ben LaClair",
    url: siteUrl,
    jobTitle: "Graphic Designer & Developer",
    knowsAbout: ["UI/UX Design", "Brand Identity", "Web Development", "Next.js", "React"],
    sameAs: ["https://www.linkedin.com/in/benlaclair"],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
