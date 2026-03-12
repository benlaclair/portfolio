"use client";

import { useState } from "react";

// Vlier design tokens — authentic to the actual deliverable
const NAVY = "#142559";
const NAVY_DARK = "#19295C";
const TEAL = "#00A491";
const FONT = "'Alef', sans-serif";

/* ── Decision 01: Tabbed Layout Demo ── */
export function TabbedLayoutDemo() {
  const [tab, setTab] = useState<"info" | "cad">("info");

  return (
    <div style={{ fontFamily: FONT, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(20,37,89,0.2)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');`}</style>
      {/* Tab bar */}
      <div style={{ display: "flex", background: NAVY_DARK }}>
        <div style={{ flex: 1, padding: "10px 16px", display: "flex", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FONT }}>Knurled Knob Plungers</span>
        </div>
        {(["info", "cad"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 20px",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: FONT,
              border: "none",
              cursor: "pointer",
              background: tab === t ? (t === "info" ? "#E5E8E8" : "#2E6393") : "transparent",
              color: tab === t && t === "info" ? NAVY : "#fff",
              borderTop: `3px solid ${tab === t ? (t === "info" ? "#E5E8E8" : "#2E6393") : "transparent"}`,
              transition: "all 0.2s",
            }}
          >
            {t === "info" ? "Product Info" : "CAD/Specs"}
          </button>
        ))}
      </div>
      {/* Content preview */}
      <div style={{ padding: "14px 16px", background: "#fff", minHeight: 60 }}>
        {tab === "info" ? (
          <div>
            <p style={{ fontSize: 12, color: "#5F5F5F", lineHeight: 1.6, margin: 0, fontFamily: FONT }}>
              Standard spring plungers offer long travel, large bearing surfaces and numerous material and design options.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ border: "1px dashed #bbb", padding: "8px 14px", flex: 1, textAlign: "center", color: "#999", fontSize: 11, fontStyle: "italic", fontFamily: FONT }}>
              Click a row to view specs
            </div>
            <button style={{ padding: "8px 14px", fontSize: 12, fontWeight: 700, fontFamily: FONT, background: TEAL, color: "#fff", border: "none", cursor: "pointer" }}>
              Download CAD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Decision 02: CTA Hierarchy Demo ── */
export function CTAHierarchyDemo() {
  const [clicked, setClicked] = useState<string | null>(null);

  const buttons = [
    { label: "Add to Cart", bg: "#fff", color: NAVY, border: `1px solid ${NAVY}`, note: "Available — not primary" },
    { label: "Select Format", bg: NAVY, color: "#fff", border: "none", note: "Sets up the download" },
    { label: "Download CAD", bg: TEAL, color: "#fff", border: "none", note: "Primary conversion", primary: true },
  ];

  return (
    <div style={{ fontFamily: FONT, maxWidth: 380 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {buttons.map((b) => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => setClicked(b.label)}
              style={{
                flex: 1,
                padding: "9px 14px",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: FONT,
                background: b.bg,
                color: b.color,
                border: b.border,
                cursor: "pointer",
                transition: "transform 0.1s ease-out, box-shadow 0.15s ease-out",
                transform: clicked === b.label ? "scale(0.97)" : "none",
                boxShadow: clicked === b.label ? "0 0 0 2px " + TEAL : "none",
              }}
            >
              {b.label === "Download CAD" ? "⬇ " : ""}{b.label}
            </button>
            <span style={{ fontSize: 11, color: b.primary ? TEAL : "#999", fontWeight: b.primary ? 700 : 400, width: 140, fontFamily: FONT }}>
              {b.primary ? "← " : ""}{b.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Decision 03: Filter Demo ── */
export function FilterDemo() {
  const [filter, setFilter] = useState<"all" | "ansi" | "metric">("all");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["Non-Locking – Steel"]));

  const toggleSection = (name: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const filters = [
    { key: "all" as const, label: "Open All", bg: NAVY },
    { key: "ansi" as const, label: "ANSI (Inch/American)", bg: NAVY },
    { key: "metric" as const, label: "Metric", bg: TEAL },
  ];

  const tableData: { name: string; type: "ansi" | "metric"; rows: string[][] }[] = [
    { name: "Non-Locking – Steel", type: "ansi", rows: [["SL190", "10-32", "0.40"], ["SL250", "1/4-20", "0.50"]] },
    { name: "Locking – Steel", type: "ansi", rows: [["SL190L", "10-32", "0.40"], ["SL250L", "1/4-20", "0.50"]] },
    { name: "Non-Locking – Metric", type: "metric", rows: [["SLM5", "M5×0.8", "10.0"], ["SLM6", "M6×1.0", "12.0"]] },
  ];

  const visible = tableData.filter((t) => filter === "all" || t.type === filter);

  return (
    <div style={{ fontFamily: FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');`}</style>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "7px 14px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: FONT,
              background: filter === f.key ? f.bg : "transparent",
              color: filter === f.key ? "#fff" : f.bg,
              border: `1px solid ${f.bg}`,
              cursor: "pointer",
              transition: "all 0.15s ease-out",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {visible.map((t) => {
          const isOpen = openSections.has(t.name);
          return (
            <div key={t.name}>
              <button
                onClick={() => toggleSection(t.name)}
                style={{ width: "100%", background: NAVY_DARK, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", cursor: "pointer" }}
              >
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: FONT }}>{t.name}</span>
                <span style={{ color: TEAL, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{isOpen ? "\u2212" : "+"}</span>
              </button>
              {isOpen && (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: FONT, background: "#fff" }}>
                  <thead>
                    <tr>
                      {["Part", "A", "B"].map((h) => (
                        <th key={h} style={{ background: "#1B4F72", color: "#fff", padding: "6px 8px", textAlign: "center", fontWeight: 700, fontSize: 10, border: "1px solid #16456a" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r, ri) => (
                      <tr key={r[0]} style={{ background: ri % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                        <td style={{ padding: "5px 8px", textAlign: "center", color: "#333", fontWeight: 400, borderBottom: "1px solid #e0e0e0" }}>{r[0]}</td>
                        <td style={{ padding: "5px 8px", textAlign: "center", color: "#333", borderBottom: "1px solid #e0e0e0" }}>{r[1]}</td>
                        <td style={{ padding: "5px 8px", textAlign: "center", color: "#333", borderBottom: "1px solid #e0e0e0" }}>{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Decision 04: Row Click Demo ── */
const TH_BG_DEMO = "#1B4F72";

export function RowClickDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  const rows = [
    { part: "SL190", init: "0.5", final: "3.0", a: "10-32", b: "0.40", c: "0.094", d: "0.104" },
    { part: "SL250", init: "1.0", final: "4.0", a: "1/4-20", b: "0.50", c: "0.125", d: "0.123" },
    { part: "SL312", init: "1.0", final: "6.0", a: "5/16-18", b: "0.625", c: "0.188", d: "0.154" },
  ];

  const sel = selected !== null ? rows[selected] : null;

  return (
    <div style={{ fontFamily: FONT, display: "grid", gridTemplateColumns: "1fr 150px", gap: 8, alignItems: "start" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');`}</style>
      {/* Table */}
      <div style={{ overflow: "hidden", border: "1px solid #ddd" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: FONT }}>
          <thead>
            <tr>
              {["Part No.", "Initial", "Final", "A", "B"].map((h) => (
                <th key={h} style={{ background: TH_BG_DEMO, color: "#fff", padding: "8px 6px", textAlign: "center", fontWeight: 700, fontSize: 10, border: "1px solid #1e5277" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.part}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? TEAL : i % 2 === 0 ? "#fff" : "#f8f9fa",
                  cursor: "pointer",
                  transition: "background 0.15s ease-out",
                }}
                onMouseEnter={(e) => { if (selected !== i) e.currentTarget.style.background = "rgba(0,164,145,0.12)"; }}
                onMouseLeave={(e) => { if (selected !== i) e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#f8f9fa"; }}
              >
                <td style={{ padding: "7px 6px", textAlign: "center", color: selected === i ? "#fff" : "#333", fontWeight: 400, borderBottom: "1px solid #e0e0e0" }}>{r.part}</td>
                <td style={{ padding: "7px 6px", textAlign: "center", color: selected === i ? "#fff" : "#333", borderBottom: "1px solid #e0e0e0" }}>{r.init}</td>
                <td style={{ padding: "7px 6px", textAlign: "center", color: selected === i ? "#fff" : "#333", borderBottom: "1px solid #e0e0e0" }}>{r.final}</td>
                <td style={{ padding: "7px 6px", textAlign: "center", color: selected === i ? "#fff" : "#333", borderBottom: "1px solid #e0e0e0" }}>{r.a}</td>
                <td style={{ padding: "7px 6px", textAlign: "center", color: selected === i ? "#fff" : "#333", borderBottom: "1px solid #e0e0e0" }}>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spec panel */}
      <div style={{ border: `1px solid ${sel ? NAVY : "#ddd"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
        {sel ? (
          <>
            <div style={{ background: NAVY, padding: "6px 10px", textAlign: "center" }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: FONT }}>{sel.part}</span>
            </div>
            {(["A", "B", "C", "D"] as const).map((dim) => (
              <div key={dim} style={{ display: "flex", borderBottom: "1px solid #eee" }}>
                <div style={{ background: NAVY, color: "#fff", padding: "5px 10px", fontSize: 12, fontWeight: 700, width: 32, textAlign: "center", fontFamily: FONT }}>{dim}</div>
                <div style={{ padding: "5px 10px", fontSize: 12, color: NAVY, fontFamily: FONT, textAlign: "center", flex: 1 }}>{sel[dim.toLowerCase() as "a" | "b" | "c" | "d"]}</div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ padding: 12, textAlign: "center", color: "#999", fontSize: 10, fontStyle: "italic", fontFamily: FONT }}>
            Click a row
          </div>
        )}
      </div>
    </div>
  );
}
