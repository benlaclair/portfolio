export interface Project {
  slug: string;
  title: string;
  category: 'UI/UX' | 'Branding' | 'Both';
  tags: string[];
  coverColor: string;
  description: string;
  overview: string;
  tools: string[];
  year: string;
  role: string;
  images: string[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'benlaclair-com',
    title: 'benlaclair.com — Portfolio',
    category: 'Both',
    tags: ['UX/UI Design', 'Web Development', 'Brand Identity'],
    coverColor: '#00DFFF',
    description: 'The dark, techy portfolio I always wanted to build — from scratch.',
    overview: 'My old portfolio was on uxfol.io — a template, bootcamp projects, nothing that felt like me. I rebuilt it from scratch in ~10 hours using Next.js, React, and Claude Code as a dev collaborator. Dark mode everything, glitch effects, cyan gradients, and all the expressive web dev I never get to do in client work.',
    tools: ['Next.js', 'React', 'Figma', 'Claude Code'],
    year: '2026',
    role: 'Designer & Developer',
    images: [],
    featured: true,
  },
];
