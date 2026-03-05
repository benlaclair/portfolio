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
    slug: 'pulse-app',
    title: 'Pulse — Health App',
    category: 'UI/UX',
    tags: ['Mobile App', 'UX Research', 'Interaction Design'],
    coverColor: '#00DFFF', // Arc Blue
    description: 'A health tracking app designed to make wellness feel approachable and even enjoyable.',
    overview: 'Pulse is a health and wellness tracking app aimed at Gen Z users who want to stay on top of their mental and physical health without the anxiety of rigid goal-setting. The challenge was to design an experience that feels motivating rather than stressful — so we leaned into playful motion, gentle nudges, and a streak system that celebrates consistency over perfection.',
    tools: ['Figma', 'Principle', 'FigJam'],
    year: '2025',
    role: 'Lead UI/UX Designer',
    images: [],
    featured: true,
  },
  {
    slug: 'bloom-brand',
    title: 'Bloom — Brand Identity',
    category: 'Branding',
    tags: ['Brand Identity', 'Logo Design', 'Typography'],
    coverColor: '#0077B6', // Ocean Blue
    description: 'A full visual identity for a sustainable skincare startup entering a crowded market.',
    overview: 'Bloom is a sustainable skincare brand targeting eco-conscious millennials. The brief called for a brand that felt premium yet approachable, with a strong sustainability message baked into every visual touchpoint — from the wordmark to packaging illustrations. The resulting identity balances organic forms with clean typography and a forest-meets-soft-luxury palette.',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    year: '2025',
    role: 'Brand Designer',
    images: [],
    featured: true,
  },
  {
    slug: 'waypoint-dashboard',
    title: 'Waypoint — SaaS Dashboard',
    category: 'UI/UX',
    tags: ['Dashboard', 'Data Visualization', 'B2B SaaS'],
    coverColor: '#0090C8', // Plasma
    description: 'Redesigning a logistics SaaS dashboard to reduce cognitive load and improve team efficiency.',
    overview: 'Waypoint is a logistics management platform used by warehouse teams. The existing dashboard was cluttered with data but gave users no clear path through it. The redesign focused on progressive disclosure, clear information hierarchy, and role-based views to help different team members do their jobs faster — cutting average task completion time by 34%.',
    tools: ['Figma', 'FigJam', 'Maze'],
    year: '2024',
    role: 'UX Designer',
    images: [],
    featured: true,
  },
  {
    slug: 'nova-coffee',
    title: 'Nova Coffee — Branding',
    category: 'Branding',
    tags: ['Brand Identity', 'Packaging', 'Illustration'],
    coverColor: '#004F7C', // Pulse Dark
    description: 'Bold brand identity and packaging design for an independent specialty coffee roaster.',
    overview: 'Nova Coffee is a single-origin specialty roaster that wanted a brand as distinctive as their beans. The result is a bold, celestial-inspired identity with custom lettering, constellation-motif packaging, and a black-and-gold color system that stands out on the shelf and photographs beautifully on social media.',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    year: '2024',
    role: 'Brand & Packaging Designer',
    images: [],
    featured: false,
  },
  {
    slug: 'luma-onboarding',
    title: 'Luma — Onboarding Flow',
    category: 'UI/UX',
    tags: ['Onboarding', 'Mobile', 'UX Strategy'],
    coverColor: '#00B4D8', // Sky Blue
    description: 'Redesigning the onboarding experience for a fintech app to dramatically improve day-7 retention.',
    overview: 'Luma is a personal finance app that was losing 68% of users within the first week. Through user interviews and funnel analysis, I identified that the existing onboarding was asking too much too soon. The redesigned flow uses progressive profiling, contextual prompts, and instant value delivery — showing users their first insight before they even finish setup.',
    tools: ['Figma', 'Hotjar', 'Notion'],
    year: '2025',
    role: 'UX Designer',
    images: [],
    featured: false,
  },
  {
    slug: 'groundwork-studio',
    title: 'Groundwork — Studio Identity',
    category: 'Branding',
    tags: ['Brand Identity', 'Logo', 'Motion'],
    coverColor: '#023E8A', // Deep Navy
    description: 'Visual identity for a boutique architecture studio built around the idea of foundations and form.',
    overview: 'Groundwork is a boutique architecture firm that needed a brand identity to match their precise, minimalist approach to design. The resulting identity uses a geometric wordmark system, a restricted palette of slate and sand, and a subtle grid motif that references architectural drawing conventions — brought to life with a short motion loop for digital use.',
    tools: ['Illustrator', 'After Effects', 'Figma'],
    year: '2024',
    role: 'Brand Designer',
    images: [],
    featured: false,
  },
];
