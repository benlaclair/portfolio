"use client";

import { useState } from "react";

const FORMSPREE_ID = "xojkaqeb";

const inputClass =
  "w-full bg-surface border-2 border-white/10 rounded-xl px-5 py-3.5 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:border-lime transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-surface border-2 border-lime/30 rounded-xl px-8 py-12 text-center">
        <p className="text-2xl font-extrabold text-ink mb-2">Message sent!</p>
        <p className="text-sm text-muted mb-4">I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-bold text-muted hover:text-ink transition-colors"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from humans, bots fill it and get rejected */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        placeholder="Tell me about your project..."
        required
        rows={6}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full md:w-auto self-start bg-grad text-[#080B0F] font-extrabold px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 text-sm disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send it →"}
      </button>
      {status === "error" && (
        <div className="flex items-center gap-3">
          <p className="text-sm text-red-400">Something went wrong.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-bold text-red-400 hover:text-ink transition-colors underline"
          >
            Try again
          </button>
        </div>
      )}
    </form>
  );
}
