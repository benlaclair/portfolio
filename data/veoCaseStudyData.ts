export const veoStats = [
  { value: "15", suffix: "s", label: "Spot length" },
  { value: "4", suffix: "+", label: "AI scenes generated" },
  { value: "TV+CTV", suffix: "", label: "Aired on" },
  { value: "Flow", suffix: "", label: "Google AI platform" },
];

export const veoScenes = [
  {
    number: "01",
    title: "The Starting Line",
    description:
      "Mice line up at the roofline edge — poised like athletes before a race. Sets the tone: playful, cinematic, unmistakably winter.",
  },
  {
    number: "02",
    title: "The Sledding Run",
    description:
      "A mouse drops into a gutter and sleds downward — the hero moment. The camera punches in and pans to follow the descent, selling the speed and scale.",
  },
  {
    number: "03",
    title: "Going Inside",
    description:
      "The mice transition from outdoor athletics to indoor infiltration — slipping through a gap in the structure. The shift from sport to threat happens in a single cut.",
  },
  {
    number: "04",
    title: "The Attic",
    description:
      "Mice pop up from insulation in the attic — the punchline. They've reached the finish line. The voiceover lands: \"Don't let 'em reach the finish line.\"",
  },
];

export const veoChallenges = [
  {
    number: "01",
    title: "No direct Olympic references",
    body: "Legal restrictions meant zero use of the Olympics logo, rings, \"Team USA,\" \"medal,\" or even the word \"Olympics.\" The concept had to evoke the Games through visual storytelling alone — winter sports, competition, athletic framing.",
  },
  {
    number: "02",
    title: "Broadcast-ready AI footage",
    body: "AI-generated video had to meet the quality bar for traditional TV and CTV — no uncanny artifacts, consistent lighting, believable motion. Each scene went through multiple generation rounds to hit production standards.",
  },
  {
    number: "03",
    title: "Matching the editor's pacing",
    body: "The agency's script called for precise timing — scenes had to deliver enough usable footage for cuts at specific beats. Generating clips with the right length, composition, and energy to fit a 15-second edit required deliberate prompting.",
  },
];

export const veoProcess = [
  {
    step: "01",
    title: "Brief & Concept",
    description: "Received the creative brief: mice as winter athletes, pest control tie-in, no direct Olympic branding. Broke the script down into four distinct scenes for storyboarding.",
  },
  {
    step: "02",
    title: "Storyboarding with AI",
    description: "Used Gemini and ChatGPT to fully storyboard each scene — mapping out camera angles, character action, lighting, and atmosphere. Iterated on the storyboards to build stronger, more specific generation prompts.",
  },
  {
    step: "03",
    title: "Generation in Google Flow",
    description: "Brought the refined prompts into Google Flow's workspace and began generating footage. Used a mix of frame-to-frame, extension, and element-to-video prompting techniques to control motion, continuity, and composition across scenes.",
  },
  {
    step: "04",
    title: "Iteration & Selection",
    description: "Ran multiple generation rounds per scene, selecting the best outputs and refining prompts until each clip held up at full resolution — clean enough for a living room TV, not just a phone screen.",
  },
  {
    step: "05",
    title: "Delivery",
    description: "Delivered production-ready AI footage to the agency for final editing, voiceover integration, sound design, and broadcast packaging.",
  },
];

export const veoOutcomes = [
  { label: "Deliverable", value: "4+ production-ready AI video scenes" },
  { label: "Platform", value: "Aired on traditional TV & CTV during Winter Olympics coverage" },
  { label: "Format", value: "15-second broadcast spot with VO, SFX, and end slate" },
];
