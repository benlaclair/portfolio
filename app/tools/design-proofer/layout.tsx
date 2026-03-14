import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Proofer',
  description:
    'AI-powered design proofing tool — upload a PDF and a copy doc, get a structured report of every discrepancy.',
  openGraph: {
    title: 'Design Proofer — Ben LaClair',
    description: 'AI-powered design proofing tool that catches what manual review misses.',
    url: 'https://benlaclair.com/tools/design-proofer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
