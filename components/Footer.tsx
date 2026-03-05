export default function Footer() {
  return (
    <footer className="border-t border-white/8 mt-24 px-6 py-8 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          ben<span className="text-grad font-bold">.</span> ✦ 2026 — Made from scratch
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/benlaclair" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink transition-colors font-medium"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
