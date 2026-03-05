"use client";

import { useState } from "react";

const inputClass =
  "w-full bg-surface border-2 border-white/10 rounded-xl px-5 py-3.5 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:border-lime transition-colors";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Ben,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <textarea
        placeholder="Tell me about your project..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={6}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="w-full md:w-auto self-start bg-grad text-[#080B0F] font-extrabold px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 text-sm"
      >
        Send it ✦
      </button>
    </form>
  );
}
