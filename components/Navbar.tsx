"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 fade-down">
      <div className="flex items-center justify-between bg-[#080B0F]/85 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/8 shadow-sm">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-ink tracking-tight">
          ben<span className="text-grad">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors relative group ${
                (href === "/about" ? pathname === href : pathname.startsWith(href))
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-grad transition-all duration-300 ${
                  (href === "/about" ? pathname === href : pathname.startsWith(href)) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-grad text-[#080B0F] text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors duration-300"
          >
            Work with me →
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`w-6 h-0.5 bg-ink transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-ink transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-white/8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-ink hover:text-grad transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-grad text-[#080B0F] text-sm font-bold px-5 py-3 rounded-full text-center hover:bg-white transition-colors"
          >
            Work with me →
          </Link>
        </div>
      </div>
    </header>
  );
}
