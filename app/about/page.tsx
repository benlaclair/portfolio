"use client";

import Link from "next/link";
import DotGrid from "@/components/DotGrid";

const skills = [
  { name: "Figma", color: "#FF6B6B" },
  { name: "Photoshop", color: "#31A8FF" },
  { name: "Illustrator", color: "#FF9F00" },
  { name: "InDesign", color: "#FF3366" },
  { name: "Canva", color: "#00C4CC" },
  { name: "HTML / CSS", color: "#E34F26" },
  { name: "WordPress", color: "#21759B" },
  { name: "MailChimp", color: "#FFE01B" },
  { name: "Google Analytics", color: "#F9AB00" },
  { name: "UX Research", color: "#7B61FF" },
  { name: "Wireframing", color: "#06D6A0" },
  { name: "Prototyping", color: "#00CFFF" },
  { name: "Accessibility (WCAG)", color: "#F4A261" },
  { name: "A/B Testing", color: "#118AB2" },
  { name: "SEO", color: "#9999FF" },
  { name: "Responsive Design", color: "#FF61F6" },
];

const experience = [
  {
    role: "Graphic / AI Designer",
    org: "Market Mentors LLC. — Springfield, MA",
    period: "Aug 2026 – Present",
    type: "work",
    bullets: [
      "Utilizing evolving Generative AI platforms for graphic, video, and web development purposes",
      "Spearheading problem solving UX/UI redesigns for new and existing clients",
      "Meeting social, print, and digital graphic needs for over 40 clients",
      "Creating design systems and atomic design standards for developing client branding",
    ],
  },
  {
    role: "UX/UI Analyst, CMS Web Development and Graphic Design Intern",
    org: "Metropolitan YMCA of New Jersey — Maplewood, NJ",
    period: "Apr 2024 – Jun 2025",
    type: "work",
    bullets: [
      "Helped analyze user flow and experience on 4+ childcare and event sites",
      "Created infographics, logos, and t-shirt designs that increased social media engagement",
      "Led the creation of 2 new CMS centered websites, collecting, organizing and designing around data",
    ],
  },
  {
    role: "Multimedia Designer & WordPress Developer",
    org: "The Gazelle Group — Princeton, NJ",
    period: "Aug 2023 – Apr 2024",
    type: "work",
    bullets: [
      "Designed branded assets and signage for 5+ ESPN-affiliated tournaments, ensuring consistency across media kits, ads, and live updates",
      "Created 150+ real-time social posts, driving 10,000+ interactions and boosting fan engagement",
      "Built reusable Adobe components and led responsive updates on 11 WordPress sites, increasing efficiency and generating 2,500+ new visits",
      "Ran A/B testing on CTAs, improving click-through rates by 10%",
    ],
  },
  {
    role: "Graphic Design Intern",
    org: "Sweet Sign Systems — Jackson, NJ",
    period: "Jun 2020 – Jul 2023",
    type: "work",
    bullets: [
      "Designed install guides for 30+ signage projects, reducing field errors",
      "Standardized layout templates to improve consistency across 30+ designs",
      "Installed signage at 10+ client sites, earning a 95% client satisfaction rate",
    ],
  },
  {
    role: "UX/UI Design Certificate",
    org: "Skillcrush Academy — Remote",
    period: "Feb 2024 – Feb 2025",
    type: "education",
    bullets: [],
  },
  {
    role: "Certificate in Information Technology",
    org: "Seton Hall University — South Orange, NJ",
    period: "Aug 2022 – May 2023",
    type: "education",
    bullets: [],
  },
  {
    role: "B.A. Design & Interactive Media",
    org: "Seton Hall University — South Orange, NJ",
    period: "Aug 2018 – May 2022",
    type: "education",
    bullets: [],
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-24 md:pt-32 px-6 md:px-12 pb-12 md:pb-24">
      <DotGrid showDots={false} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-up">
        <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
          Who I am
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-16">
          ABOUT<span className="text-grad">_</span>
        </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-20 fade-up-1">
          {/* Bio */}
          <div>
            <div className="inline-flex items-center gap-2 bg-lime/20 border border-lime/50 text-ink text-xs font-bold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-lime inline-block animate-pulse" />
              Open to new opportunities
            </div>
            <p className="text-base text-ink/75 leading-relaxed mb-4">
              Hey, I&apos;m Ben — a UX/UI and Graphic Designer with{" "}
              <strong className="text-ink">5+ years of experience</strong> in
              user-centered design, research-based problem solving, and web
              content management.
            </p>
            <p className="text-base text-ink/75 leading-relaxed mb-4">
              I&apos;ve designed for{" "}
              <strong className="text-ink">ESPN-affiliated tournaments</strong>,
              redesigned program sites for the{" "}
              <strong className="text-ink">Metropolitan YMCA of NJ</strong>, and
              currently lead graphic and AI design work at{" "}
              <strong className="text-ink">Market Mentors LLC</strong> — serving
              40+ clients across social, print, and digital.
            </p>
            <p className="text-base text-ink/75 leading-relaxed mb-8">
              I actively integrate <strong className="text-ink">Generative AI</strong> into
              my workflow for ideation, research, and refinement — treating it
              as an opportunity to push design further, faster.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/contact"
                className="bg-grad text-[#080B0F] font-bold px-6 py-3 rounded-full text-sm hover:bg-white transition-colors"
              >
                Work with me →
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-ink font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors"
              >
                View Resume
              </a>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-6">
              Tools & Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="text-sm font-bold px-4 py-2 rounded-full text-ink"
                  style={{
                    backgroundColor: skill.color + "22",
                    border: `2px solid ${skill.color}55`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Experience & Education timeline */}
        <div className="border-t border-white/8 pt-12 mb-16 fade-up-2">
          <h2 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-10">
            Experience & Education
          </h2>

          <div className="flex flex-col">
            {experience.map((item, i) => (
              <div key={i} className="flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      item.type === "work" ? "bg-lime" : "bg-violet"
                    }`}
                  />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-1 mb-1 min-h-[24px]" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
                    {item.period}
                  </p>
                  <p className="text-base font-bold text-ink">{item.role}</p>
                  <p className="text-sm text-muted mb-2">{item.org}</p>
                  {item.bullets.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {item.bullets.map((b, j) => (
                        <li key={j} className="text-sm text-ink/60 flex gap-2">
                          <span className="text-grad shrink-0 mt-0.5">–</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="w-2 h-2 rounded-full bg-lime inline-block" /> Work
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="w-2 h-2 rounded-full bg-violet inline-block" /> Education
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
