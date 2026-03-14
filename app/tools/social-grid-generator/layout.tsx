import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Grid Generator',
  description:
    'Paste a month of social copy — get a full visual grid of branded post designs with AI-matched images and bulk export.',
  openGraph: {
    title: 'Social Grid Generator — Ben LaClair',
    description: 'Turn a month of copy into export-ready social post designs in 5 minutes.',
    url: 'https://benlaclair.com/tools/social-grid-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
