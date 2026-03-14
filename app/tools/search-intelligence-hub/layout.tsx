import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Intelligence Hub',
  description:
    'Interactive learning platform that breaks down SEO, GEO, and AEO with color-coded sections, plain-English explanations, and copy-paste code examples.',
  openGraph: {
    title: 'Search Intelligence Hub — Ben LaClair',
    description: 'Interactive SEO/GEO/AEO learning platform built to replace a slide deck.',
    url: 'https://benlaclair.com/tools/search-intelligence-hub',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
