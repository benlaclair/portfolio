export interface Project {
  slug: string;
  title: string;
  category: 'UI/UX' | 'Branding' | 'Both';
  tags: string[];
  coverColor: string;
  coverImage?: string;
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
    coverImage: '/images/benlaclair-cover.png',
    description: 'The dark, techy portfolio I always wanted to build — from scratch.',
    overview: 'My old portfolio was on uxfol.io — a template, bootcamp projects, nothing that felt like me. I rebuilt it from scratch in ~10 hours using Next.js, React, and Claude Code as a dev collaborator. Dark mode everything, glitch effects, cyan gradients, and all the expressive web dev I never get to do in client work.',
    tools: ['Next.js', 'React', 'Figma', 'Claude Code'],
    year: '2026',
    role: 'Designer & Developer',
    images: [],
    featured: true,
  },
  {
    slug: 'vlier-com',
    title: 'Vlier.com — Product Page',
    category: 'UI/UX',
    tags: ['UX/UI Design', 'Research & Strategy', 'Prototyping', 'B2B'],
    coverColor: '#e8ff4a',
    description: 'Restructuring a legacy industrial product page so the most valuable action — downloading a CAD file — became unavoidable.',
    overview: 'Vlier is a division of Hutchinson Aerospace & Industry, manufacturing precision positioning hardware since 1946. As part of their Website 4.0 initiative, I redesigned the product page UX — the most critical touchpoint in the conversion path. The core shift: stop treating the product page as a catalog and start treating it as the beginning of a sale.',
    tools: ['Figma', 'Research', 'Prototyping'],
    year: '2025',
    role: 'UX/UI Designer',
    images: [],
    featured: true,
  },
  {
    slug: 'veo-olympics',
    title: 'AI Winter Olympics Spot',
    category: 'Both',
    tags: ['AI Video', 'Google Flow', 'TV/CTV', 'Creative Direction'],
    coverColor: '#4A90D9',
    description: 'AI-generated 15-second TV spot that aired during Winter Olympics coverage.',
    overview: 'A pest control brand needed a 15-second TV spot timed to Winter Olympics coverage. The concept: mice as winter athletes — bobsledding through gutters, sneaking inside, taking over an attic. I generated all video footage using Google Flow, delivering a production-ready AI commercial that aired on traditional TV and CTV.',
    tools: ['Google Flow', 'Gemini', 'ChatGPT', 'AI Video Generation'],
    year: '2026',
    role: 'AI Video Creator',
    images: [],
    featured: true,
  },
];
