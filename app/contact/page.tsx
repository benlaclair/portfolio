"use client";

import ContactForm from "@/components/ContactForm";
import DotGrid from "@/components/DotGrid";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/benlaclair" },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen pt-32 px-6 md:px-12 pb-24">
      <DotGrid showDots={false} />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fade-up">
        <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-2">
          Say hello
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-ink tracking-tight mb-4">
          LET&apos;S TALK<span className="text-grad"> ✦</span>
        </h1>
        <p className="text-base text-muted mb-12 max-w-lg leading-relaxed">
          Have a project in mind, want to collaborate, or just want to say hi?
          My inbox is open.
        </p>
        </div>

        {/* Form */}
        <div className="mb-16 fade-up-1">
          <ContactForm />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10 fade-up-2">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-bold text-muted uppercase tracking-widest whitespace-nowrap">
            Or find me here
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Social links */}
        <div className="flex gap-3 fade-up-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface rounded-2xl px-6 py-5 text-center font-extrabold text-ink hover:bg-grad hover:text-[#080B0F] transition-all duration-300 text-base border-2 border-white/8"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
