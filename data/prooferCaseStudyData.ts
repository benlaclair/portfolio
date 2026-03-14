export const prooferStats = [
  { value: "3500", suffix: "+", label: "Lines of code" },
  { value: "7", suffix: "", label: "Custom components" },
  { value: "5", suffix: "", label: "Dev phases" },
  { value: "Gemini", suffix: "", label: "AI engine" },
];

export const prooferFeatures = [
  {
    number: "01",
    title: "Dual File Upload",
    description:
      "Upload a design PDF and a copy document side by side. The tool validates both inputs in real time before sending them to Gemini for analysis.",
  },
  {
    number: "02",
    title: "AI-Powered Analysis",
    description:
      "Custom prompt engineering instructs Gemini to return structured findings — categorized by type, severity, page number, and exact location within the design.",
  },
  {
    number: "03",
    title: "Interactive Canvas",
    description:
      "Review flagged issues on the actual design file with custom zoom and pan controls. Each finding links to its location so you can verify without hunting.",
  },
  {
    number: "04",
    title: "Issue Triage",
    description:
      "Accept or reject each AI finding before exporting. The triage system prevents false positives from reaching the client report.",
  },
  {
    number: "05",
    title: "PDF Report Export",
    description:
      "Generate a multi-page, professionally formatted proofing report with custom pagination, headers, and branding — ready to hand to a client or creative director.",
  },
];

export const prooferChallenges = [
  {
    number: "01",
    title: "AI response consistency",
    body: "Gemini doesn't always return structured data the same way twice. Developed robust prompt engineering techniques to ensure consistently parseable responses with categorized findings, location data, and severity ratings.",
  },
  {
    number: "02",
    title: "Canvas performance",
    body: "Large design files with zoom and pan controls needed to stay responsive. Optimized the Canvas 2D API rendering pipeline to handle high-resolution PDFs without frame drops.",
  },
  {
    number: "03",
    title: "PDF layout complexity",
    body: "Variable-length findings lists meant every report had different pagination needs. Built custom multi-page layout logic in jsPDF to maintain professional formatting regardless of report size.",
  },
];

export const prooferProcess = [
  {
    step: "01",
    title: "Problem Definition",
    description: "Identified the pain point: proofing 40+ client accounts manually was burning hours per week and still missing errors. AI chatbots could catch issues, but their output was unstructured and unusable for client-facing work.",
  },
  {
    step: "02",
    title: "Architecture",
    description: "Designed a clean separation of concerns — file management, AI integration, results processing, interactive canvas, and PDF export as distinct layers. No external state library needed.",
  },
  {
    step: "03",
    title: "AI Integration",
    description: "Built the Gemini integration layer with custom prompts optimized for design proofing. Each prompt instructs the model to return findings with issue type, severity, page number, coordinates, and current-vs-expected comparisons.",
  },
  {
    step: "04",
    title: "Interactive Review",
    description: "Added the canvas system with zoom/pan controls so designers can verify each finding against the actual design. Issue triage lets you accept or reject before export.",
  },
  {
    step: "05",
    title: "Export System",
    description: "Built the PDF generation pipeline with jsPDF — multi-page reports with professional formatting, filtered by triage status, ready for client delivery.",
  },
];

export const prooferOutcomes = [
  { label: "Time savings", value: "Hours of manual proofing reduced to minutes" },
  { label: "Accuracy", value: "AI catches formatting and copy errors human reviewers miss" },
  { label: "Output", value: "Client-ready PDF reports with structured findings" },
];
