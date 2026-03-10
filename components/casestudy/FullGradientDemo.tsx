export default function FullGradientDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 py-10">
      <div className="text-center">
        <span className="text-grad font-extrabold tracking-tighter leading-none" style={{ fontSize: "clamp(60px, 12vw, 160px)" }}>
          Aa
        </span>
      </div>

      <div className="w-full max-w-lg">
        <div className="h-4 rounded-full bg-grad mb-4" />
        <div className="flex justify-between text-xs font-bold tracking-[0.15em] text-muted uppercase">
          <span>#00DFFF</span>
          <span>→</span>
          <span>#0090C8</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <span className="bg-grad text-[#080B0F] font-bold text-sm px-6 py-3 rounded-full">Button</span>
        <span className="text-grad font-extrabold text-2xl">Accent Text</span>
        <span className="text-xs font-extrabold bg-grad text-[#080B0F] px-3 py-1 rounded-full">Tag</span>
        <span className="inline-flex items-center gap-2 bg-lime/20 border border-lime/50 text-grad text-xs font-extrabold px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />
          Status
        </span>
        <div className="w-10 h-10 rounded-full bg-grad" />
      </div>
    </div>
  );
}
