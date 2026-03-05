const items = [
  "UI/UX DESIGN",
  "BRAND IDENTITY",
  "VISUAL DESIGN",
  "TYPOGRAPHY",
  "INTERACTION DESIGN",
  "LOGO SYSTEMS",
  "PACKAGING",
  "DESIGN STRATEGY",
];

export default function MarqueeBanner() {
  return (
    <div className="bg-grad py-4 overflow-hidden">
      <div className="animate-marquee">
        {[0, 1, 2, 3].map((copy) =>
          items.map((item, i) => (
            <span
              key={`${copy}-${i}`}
              className="text-[#080B0F] font-extrabold text-sm tracking-widest uppercase shrink-0"
            >
              <span className="opacity-40 mx-6">✦</span>
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
