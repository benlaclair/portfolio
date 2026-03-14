export const socialGridStats = [
  { value: "3500", suffix: "+", label: "Lines of code" },
  { value: "30", suffix: "+", label: "Posts per batch" },
  { value: "90", suffix: "+", label: "Stock images" },
  { value: "4", suffix: "", label: "Platforms supported" },
];

export const socialGridFeatures = [
  {
    number: "01",
    title: "Smart Document Parsing",
    description:
      "Paste or upload a structured markdown document and the parser extracts dates, platforms, graphic text, copy, and special image requests — with real-time format validation.",
  },
  {
    number: "02",
    title: "AI Image Matching",
    description:
      "A weighted scoring system analyzes each post's copy for topic keywords, then assigns the most contextually relevant image from a curated library of 90+ stock photos across 15 categories.",
  },
  {
    number: "03",
    title: "Visual Grid Layout",
    description:
      "Posts render in a responsive, date-grouped grid with platform filtering. One-click filtering by LinkedIn, Facebook, Instagram, or TikTok — with adaptive columns from mobile to ultra-wide.",
  },
  {
    number: "04",
    title: "Custom Images & Bulk Export",
    description:
      "Replace any auto-assigned image via stock library, Unsplash, file upload, or URL — then select posts and export as a ZIP of production-ready 1080×1080 PNGs with smart file naming and CSV metadata.",
  },
];

export const socialGridChallenges = [
  {
    number: "01",
    title: "Image assignment at scale",
    body: "Assigning unique, contextually relevant images to 30+ posts without repetition required a weighted scoring system that tracks usage and falls back gracefully when topics overlap.",
  },
  {
    number: "02",
    title: "Canvas rendering vs html2canvas",
    body: "html2canvas had CORS issues and didn't support Tailwind v4 CSS variables. Built a custom Canvas 2D API renderer with manual object-fit logic, font sizing, and fallback placeholders.",
  },
  {
    number: "03",
    title: "Export file naming",
    body: "Scheduling tools require specific naming patterns. Built a filename generator that parses date components, sanitizes platform names, and slugifies graphic text — ensuring uniqueness across same-day, multi-platform posts.",
  },
];

export const socialGridProcess = [
  {
    step: "01",
    title: "Workflow Analysis",
    description: "Mapped the existing manual process: receive copy doc, find images, create individual post graphics, name files, export. Every step was a candidate for automation.",
  },
  {
    step: "02",
    title: "Parser & Data Model",
    description: "Built a custom markdown parser with regex extraction for dates, platforms, graphic text, copy, and special image requests. Designed the post data model around what export and rendering would need downstream.",
  },
  {
    step: "03",
    title: "Scoring System",
    description: "Developed the image matching engine — topic keywords extracted from post copy, scored against tagged images, with usage tracking to prevent repetition across the grid.",
  },
  {
    step: "04",
    title: "Grid & Interaction",
    description: "Built the responsive grid with date grouping, platform filtering, bulk selection, and the four-mode image replacement system. State persisted to localStorage for session continuity.",
  },
  {
    step: "05",
    title: "Export Pipeline",
    description: "Implemented Canvas 2D API rendering for production-grade PNG exports at 1080×1080. Added ZIP packaging with JSZip and CSV metadata export for scheduling tool integration.",
  },
];

export const socialGridOutcomes = [
  { label: "Speed", value: "2+ hours of manual design work reduced to 5 minutes" },
  { label: "Scale", value: "30+ branded posts per client per month, automated" },
  { label: "Output", value: "Export-ready PNGs + CSV metadata in a single ZIP" },
];
