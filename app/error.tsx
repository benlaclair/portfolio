"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-4">
        Error
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight mb-4">
        Something went wrong<span className="text-grad">.</span>
      </h1>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-grad text-[#080B0F] font-extrabold px-8 py-4 rounded-full text-sm hover:bg-white transition-colors duration-300"
      >
        Try again →
      </button>
    </div>
  );
}
