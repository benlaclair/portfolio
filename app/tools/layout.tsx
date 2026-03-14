import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Production tools built to solve real problems in design, content, and workflow — a design proofer, social post generator, and an interactive SEO/AEO/GEO learning platform.',
  openGraph: {
    title: 'Tools — Ben LaClair',
    description:
      'Production tools built to solve real design and content problems.',
    url: 'https://benlaclair.com/tools',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
