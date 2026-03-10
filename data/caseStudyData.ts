export const stats = [
  { value: "10", suffix: " hrs", label: "Concept to launch" },
  { value: "Next.js", suffix: "", label: "Custom-coded" },
  { value: "0", suffix: "", label: "Templates used" },
  { value: "React", suffix: "", label: "From scratch" },
];

export const beforeItems = [
  "Template platform",
  "Bootcamp projects only",
  "No personal brand",
  "Looked like everyone else",
];

export const afterItems = [
  "Custom Next.js / React build",
  "Real client work (more incoming)",
  "Distinct editorial identity",
  "Shipped in ~10 hrs with AI",
];

export const designFeatures = [
  {
    label: "Glitch & Scramble",
    description:
      'I\'ve always loved that moment in sci-fi interfaces where text flickers and resolves. The "BEN." wordmark does exactly that — characters scramble and lock in one by one, then a chromatic glitch burst tears through the text. It\'s the kind of detail I never get to ship in client work, and honestly my favorite thing on the site.',
    detail: "16 hand-tuned burst frames · 3-color chromatic split · 45ms scramble tick",
  },
  {
    label: "Living Dot Grid",
    description:
      "This one's subtle but it changes everything. The background is a canvas-rendered grid of cyan dots that pulses with random wave bursts — little clusters that bloom and fade like the page is breathing. Most people won't consciously notice it. That's the point.",
    detail: "28px grid · Canvas API at 60fps · 0.07 → 0.22 opacity wave",
  },
  {
    label: "Gradient System",
    description:
      "One gradient runs the whole show — bright cyan to deep blue. Accent text, buttons, tags, the marquee bar, hover states. Constraining myself to a single gradient forced every element to feel cohesive without me having to think about it. Simple rules, consistent results.",
    detail: "#00DFFF → #0090C8 · text-grad + bg-grad utilities",
  },
  {
    label: "Motion & Rhythm",
    description:
      "Nothing on this site just appears. Every section staggers in with a custom ease curve, project cards cascade in sequence, and the marquee ticker never stops moving. I wanted the site to feel like it's performing for you — not just sitting there waiting to be read.",
    detail: "0.7s staggered reveals · spring-based Framer Motion · 30s marquee loop",
  },
];
