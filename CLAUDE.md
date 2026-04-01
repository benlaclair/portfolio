# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config, Next.js core-web-vitals + TypeScript rules)
- No test runner is configured; Playwright is a devDependency but no test scripts or test files exist yet

## Architecture

This is a **Next.js 16** portfolio site using the App Router, React 19, Tailwind CSS v4, and framer-motion. Deployed on Vercel.

### Routing & Pages

- `app/` uses the App Router with nested layouts. Each route folder has its own `layout.tsx` (for metadata) and `page.tsx`.
- `app/work/[slug]/page.tsx` — Dynamic route for case study pages. Uses `generateStaticParams` from `PROJECTS` data to statically generate pages.
- `app/tools/` — Each tool has its own sub-route (e.g., `tools/design-proofer/`).
- `app/sitemap.ts` and `app/robots.ts` — SEO files generated programmatically.

### Data Layer

All content is driven by typed TypeScript arrays in `data/` — there is no CMS or database.

- `data/projects.ts` — `PROJECTS` array (type `Project`) drives the work section and `[slug]` routes.
- `data/tools.ts` — `TOOLS` array (type `Tool`) drives the tools section.
- `data/*CaseStudyData.ts` — Per-project case study content (stats, sections, demos).
- `data/graphicDesign.ts` — Graphic design gallery data.

To add a new project: add an entry to `PROJECTS` in `data/projects.ts`, create `app/work/<slug>/page.tsx` and `layout.tsx`, and optionally add a case study data file.

### Component Patterns

- `components/` — Shared UI components (Navbar, Footer, HeroSection, sliders, etc.).
- `components/casestudy/` — Case-study-specific components with per-project subdirectories (e.g., `casestudy/vlier/`, `casestudy/veo/`).
- `components/design/` — Graphic design gallery components with lightbox.
- `components/tools/` — Tool card and embed components.
- `hooks/` — Custom hooks (`useInView`, `useIsMobile`).

### Styling

- **Tailwind CSS v4** configured via `@import "tailwindcss"` in `app/globals.css` with `@theme` for custom tokens.
- Custom color palette: `bg` (#080B0F), `surface` (#161C23), `ink` (#F0F4F8), `muted` (#A8B5C4), cyan accent gradient (`lime` #00DFFF → `violet` #0090C8).
- Custom utilities defined in globals.css: `.text-grad`, `.bg-grad`, `.scrollbar-hide`.
- Font: Plus Jakarta Sans loaded via `next/font/google`.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Use `@/components/`, `@/data/`, `@/hooks/` for imports.
