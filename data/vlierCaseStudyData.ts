export const vlierStats = [
  { value: "100", suffix: "+", label: "Product variants" },
  { value: "2", suffix: "", label: "Workflows mapped" },
  { value: "1", suffix: "", label: "Critical CTA surfaced" },
  { value: "B2B", suffix: "", label: "Engineer-first audience" },
];

export const vlierProblems = [
  {
    number: "01",
    title: "Wrong CTA hierarchy",
    body: "\u2018Find a Distributor\u2019 was the only visible CTA \u2014 a mid-funnel action placed before the user had any reason to trust the product. The highest-value action (CAD download) was invisible.",
  },
  {
    number: "02",
    title: "Two workflows, one layout",
    body: "Engineers browsing product families and engineers ready to download CAD files have completely different needs. The old page tried to serve both in a single flat scroll with no separation.",
  },
  {
    number: "03",
    title: "No path to conversion",
    body: "Getting from a product page to a CAD download meant reading a dense table, finding a tiny icon in the right row, and hoping you clicked the right one. There was no scent trail.",
  },
];

export const vlierPersonas = [
  {
    role: "The Browser",
    description:
      "An engineer with a positioning problem. They\u2019re comparing options across vendors \u2014 Vlier, JW Winco, Carr Lane. They need to scan product families, understand force ranges, and bookmark candidates. They\u2019re not ready to download anything yet.",
  },
  {
    role: "The Specifier",
    description:
      "The same engineer, later. They\u2019ve narrowed it down. Now they need exact dimensions \u2014 A through G, thread size, end force. They\u2019re going to drop this into a CAD assembly. The download is the conversion. Everything else is friction.",
  },
];

export const vlierDecisions = [
  {
    number: "01",
    label: "Information Architecture",
    title: "Separate browsing from speccing",
    description:
      "The old page was a single scroll serving both discovery and precision-data phases. I split these into two explicit tabs \u2014 Product Info and CAD/Specs. Clicking any part row automatically activates the CAD/Specs tab, moving the user forward without extra navigation.",
    oldPattern:
      "All information in one scroll \u2192 user has to find everything \u2192 cognitive overload \u2192 drop-off",
    newPattern:
      "Click a row \u2192 CAD tab activates \u2192 specs populate \u2192 download available \u2192 one clear next step",
  },
  {
    number: "02",
    label: "CTA Hierarchy",
    title: "Make CAD download the primary action",
    description:
      "I repositioned the CAD download as the most prominent CTA in the right column \u2014 persistent, always visible, and surfaced the moment a part row is clicked. \u2018Find a Distributor\u2019 moves to the Product Info tab where it belongs: after the engineer has validated the spec.",
  },
  {
    number: "03",
    label: "Filtering & Navigation",
    title: "Accordion tables with ANSI/Metric filtering",
    description:
      "Vlier serves both domestic (inch) and international (metric) markets. The old table dumped all variants together. The redesign uses collapsible accordion sections with filter buttons \u2014 engineers working in one system don\u2019t have to mentally filter out the other.",
  },
  {
    number: "04",
    label: "Row Interaction",
    title: "Click a row to surface the full spec",
    description:
      "The original table had all dimensions inline but no way to isolate a single part. The redesign adds row-click behavior: selecting a part number populates a dedicated specs panel in the right column with all dimensions labeled A through G, and auto-activates the CAD/Specs tab.",
  },
];

export const vlierOutcomes = [
  { label: "Deliverable", value: "2 full layout comps + dev-ready specs" },
  { label: "Primary CTA shift", value: "\u2018Find a Distributor\u2019 \u2192 \u2018Download CAD\u2019" },
  { label: "Interaction model", value: "Row click \u2192 spec panel \u2192 format \u2192 download" },
];

export const vlierBeforeIssues = [
  "H1 reads \u2018Steel\u2019 \u2014 not the actual product category name",
  "Only visible CTA is \u2018Find a Distributor\u2019 \u2014 mid-funnel, not conversion",
  "CAD download buried as tiny icons inside dense table rows",
  "Product photo and CAD diagram side by side with no hierarchy",
  "Single flat scroll \u2014 no separation between browsing and speccing",
  "No filtering between ANSI and Metric tables",
];

export const vlierAfterImprovements = [
  "Tabbed layout separates browsing from speccing \u2014 two distinct workflows",
  "CAD download is now the primary CTA \u2014 always visible in the right column",
  "Click any table row \u2192 specs auto-populate, CAD tab activates",
  "Accordion filtering (ANSI/Metric) reduces cognitive load for global users",
  "Persistent right column with product image, CTAs, and spec panel",
  "Conversion calculators built in \u2014 no more leaving the page to convert units",
];
