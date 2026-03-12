"use client";

import { useState, useCallback, useEffect } from "react";

// Vlier design tokens — authentic to the actual deliverable
const NAVY = "#142559";
const NAVY_DARK = "#0e1b45";
const TEAL = "#00A491";
const TH_BG = "#1B4F72";
const OFF_WHITE = "#E5E8E8";
const SIDEBAR_BG = "#cad0d1";

const FONT = "'Alef', sans-serif";

// Product data
const ANSI_TABLES = [
  {
    id: "non-locking-steel",
    title: "Non-Locking Plunger Nose \u2013 Steel",
    type: "ansi",
    rows: [
      { part: "SL190", lock: "SL190P", init: "0.5", final: "3.0", a: "10-32", b: "0.40", c: "0.094", d: "0.104**", e: "0.38", f: "0.250", g: "0.19", rohs: true },
      { part: "SL250", lock: "SL250P", init: "1.0", final: "4.0", a: "1/4-20", b: "0.50", c: "0.125", d: "0.123", e: "0.50", f: "0.313", g: "0.19", rohs: true },
      { part: "SL312", lock: "SL312P", init: "1.0", final: "6.0", a: "5/16-18", b: "0.625", c: "0.188", d: "0.154", e: "0.63", f: "0.375", g: "0.25", rohs: true },
      { part: "SL375", lock: "SL375P", init: "1.0", final: "8.0", a: "3/8-16", b: "0.750", c: "0.218", d: "0.185", e: "0.75", f: "0.500", g: "0.31", rohs: true },
      { part: "SL500", lock: "SL500P", init: "1.0", final: "10.0", a: "1/2-13", b: "0.875", c: "0.25", d: "0.248", e: "1.00", f: "0.625", g: "0.38", rohs: true },
    ],
  },
  {
    id: "locking-steel",
    title: "Standard End Force \u2013 Locking \u2013 Steel",
    type: "ansi",
    rows: [
      { part: "SL190L", lock: "SL190LP", init: "0.5", final: "3.0", a: "10-32", b: "0.40", c: "0.094", d: "0.104", e: "0.38", f: "0.250", g: "0.19", rohs: true },
      { part: "SL250L", lock: "SL250LP", init: "1.0", final: "4.0", a: "1/4-20", b: "0.50", c: "0.125", d: "0.123", e: "0.50", f: "0.313", g: "0.19", rohs: true },
    ],
  },
  {
    id: "heavy-locking-steel",
    title: "Heavy End Force \u2013 Locking \u2013 Steel",
    type: "ansi",
    rows: [
      { part: "SL190H", lock: "SL190HP", init: "1.0", final: "5.0", a: "10-32", b: "0.40", c: "0.094", d: "0.104", e: "0.38", f: "0.250", g: "0.19", rohs: true },
      { part: "SL250H", lock: "SL250HP", init: "2.0", final: "7.0", a: "1/4-20", b: "0.50", c: "0.125", d: "0.123", e: "0.50", f: "0.313", g: "0.19", rohs: true },
    ],
  },
];

const METRIC_TABLES = [
  {
    id: "non-locking-metric",
    title: "Non-Locking Plunger Nose \u2013 Metric",
    type: "metric",
    rows: [
      { part: "SLM5", lock: "SLM5P", init: "0.5", final: "3.0", a: "M5\u00d70.8", b: "10.0", c: "2.5", d: "2.6", e: "9.5", f: "6.5", g: "5.0", rohs: true },
      { part: "SLM6", lock: "SLM6P", init: "1.0", final: "4.0", a: "M6\u00d71.0", b: "12.0", c: "3.0", d: "3.1", e: "12.0", f: "8.0", g: "5.0", rohs: true },
      { part: "SLM8", lock: "SLM8P", init: "1.0", final: "6.0", a: "M8\u00d71.25", b: "16.0", c: "4.5", d: "4.0", e: "16.0", f: "10.0", g: "6.0", rohs: true },
    ],
  },
];

const ALL_TABLES = [...ANSI_TABLES, ...METRIC_TABLES];

type RowData = (typeof ANSI_TABLES)[0]["rows"][0];

const TH: React.CSSProperties = {
  color: "#fff",
  padding: "4px 2px",
  textAlign: "center",
  whiteSpace: "nowrap",
  fontWeight: 700,
  fontSize: 9,
  fontFamily: FONT,
  border: "1px solid #16456a",
  verticalAlign: "bottom",
  background: TH_BG,
};

export default function InteractiveProductPage() {
  const [activeTab, setActiveTab] = useState<"info" | "cad">("info");
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(["non-locking-steel"]));
  const [filter, setFilter] = useState<"all" | "ansi" | "metric">("all");
  const [selectedPart, setSelectedPart] = useState<{ tableId: string; row: RowData } | null>(null);

  const [inchVal, setInchVal] = useState("");
  const [mmVal, setMmVal] = useState("");
  const [lbfVal, setLbfVal] = useState("");
  const [nVal, setNVal] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleAccordion = useCallback((id: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleRowClick = useCallback((tableId: string, row: RowData) => {
    if (selectedPart?.row.part === row.part) {
      setSelectedPart(null);
    } else {
      setSelectedPart({ tableId, row });
      setActiveTab("cad");
    }
  }, [selectedPart]);

  const handleFilter = useCallback((f: "all" | "ansi" | "metric") => {
    setFilter(f);
    if (f === "all") setOpenAccordions(new Set(ALL_TABLES.map((t) => t.id)));
  }, []);

  const handleInch = (v: string) => { setInchVal(v); const n = parseFloat(v); setMmVal(isNaN(n) ? "" : (n * 25.4).toFixed(3)); };
  const handleMm = (v: string) => { setMmVal(v); const n = parseFloat(v); setInchVal(isNaN(n) ? "" : (n / 25.4).toFixed(4)); };
  const handleLbf = (v: string) => { setLbfVal(v); const n = parseFloat(v); setNVal(isNaN(n) ? "" : (n * 4.44822).toFixed(3)); };
  const handleN = (v: string) => { setNVal(v); const n = parseFloat(v); setLbfVal(isNaN(n) ? "" : (n / 4.44822).toFixed(3)); };

  const visibleTables = ALL_TABLES.filter((t) => {
    if (filter === "ansi") return t.type === "ansi";
    if (filter === "metric") return t.type === "metric";
    return true;
  });

  const specs = selectedPart
    ? [
        ["A", selectedPart.row.a],
        ["B", selectedPart.row.b],
        ["C", selectedPart.row.c],
        ["D", selectedPart.row.d],
        ["E", selectedPart.row.e],
        ["F", selectedPart.row.f],
        ["G", selectedPart.row.g],
      ]
    : [];

  /* ─── Tab button helper ─── */
  const tabBtn = (id: "info" | "cad", label: string) => {
    const active = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        style={{
          flex: 1,
          padding: isMobile ? "10px 0" : "14px 0",
          fontSize: isMobile ? 14 : 18,
          fontWeight: 700,
          fontFamily: FONT,
          border: "none",
          cursor: "pointer",
          background: active ? (id === "info" ? OFF_WHITE : TH_BG) : NAVY,
          color: active && id === "info" ? NAVY : "#fff",
          borderBottom: active ? `3px solid ${id === "info" ? TEAL : "#fff"}` : "3px solid transparent",
          transition: "all 0.2s ease-out",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ fontFamily: FONT, fontSize: 13, color: "#333", background: "#fff", lineHeight: 1.5 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');`}</style>

      {/* ─── TOP BAR: title + tabs ─── */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", background: NAVY }}>
        <div style={{ flex: isMobile ? undefined : "1 1 62%", display: "flex", alignItems: "center", padding: isMobile ? "10px 14px" : "0 20px", minHeight: isMobile ? undefined : 52 }}>
          <h2 style={{ color: "#fff", fontSize: isMobile ? 18 : 22, fontWeight: 700, margin: 0, fontFamily: FONT }}>
            Knurled Knob Plungers
          </h2>
        </div>
        <div style={{ flex: isMobile ? undefined : "0 0 38%", display: "flex" }}>
          {tabBtn("info", "Product info")}
          {tabBtn("cad", "CAD/Specs")}
        </div>
      </div>

      {/* ─── BODY: two columns on desktop, stacked on mobile ─── */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: isMobile ? undefined : "1 1 62%", padding: isMobile ? "10px 10px" : "14px 16px", minWidth: 0, overflow: "hidden" }}>
          {/* Header + filter buttons */}
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: NAVY, margin: "0 0 4px", fontFamily: FONT }}>
              Knurled Knob Plungers Tables
            </h3>
            <p style={{ fontSize: 11, color: "#666", margin: "0 0 8px", fontFamily: FONT }}>
              Click any row to see CAD, more information on part, and add to quote.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {[
                { key: "all" as const, label: "Open All", bg: "#fff", color: NAVY, border: `1px solid ${NAVY}` },
                { key: "ansi" as const, label: isMobile ? "ANSI" : "ANSI (Inch/American) Tables", bg: NAVY, color: "#fff", border: "none" },
                { key: "metric" as const, label: isMobile ? "Metric" : "Metric Tables", bg: TEAL, color: "#fff", border: "none" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => handleFilter(f.key)}
                  style={{
                    padding: "5px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: FONT,
                    background: f.bg,
                    color: f.color,
                    border: f.border,
                    cursor: "pointer",
                    opacity: filter === f.key ? 1 : 0.75,
                    transition: "opacity 0.15s",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion tables */}
          {visibleTables.map((table) => {
            const isOpen = openAccordions.has(table.id);
            return (
              <div key={table.id} style={{ marginBottom: 2 }}>
                <button
                  onClick={() => toggleAccordion(table.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: NAVY,
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: isMobile ? 11 : 13, fontWeight: 700, fontFamily: FONT, textAlign: "left" }}>
                    Knurled Knob Plungers {table.title}
                  </span>
                  <span style={{ color: TEAL, fontSize: 20, fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? 1200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease-in-out",
                  }}
                >
                  <div style={{ display: "flex", background: "#fff" }}>
                    {/* Left panel — navy with CAD drawing (hidden on mobile) */}
                    {!isMobile && (
                      <div style={{ width: 130, flexShrink: 0, padding: 8, background: NAVY }}>
                        <div
                          style={{
                            background: "#fff",
                            height: 90,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 6,
                          }}
                        >
                          <span style={{ fontSize: 9, color: "#aaa", fontFamily: FONT }}>CAD line drawing</span>
                        </div>
                        <p style={{ fontSize: 9, color: TEAL, lineHeight: 1.4, fontWeight: 700, fontFamily: FONT, margin: "0 0 6px" }}>
                          Click any row to see CAD, more information on part, and add to quote.
                        </p>
                        <button
                          style={{
                            background: TEAL,
                            color: "#fff",
                            border: "none",
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "5px 6px",
                            width: "100%",
                            cursor: "pointer",
                            fontFamily: FONT,
                          }}
                        >
                          Contact Engineering
                        </button>
                      </div>
                    )}

                    {/* Data table */}
                    <div style={{ flex: 1, minWidth: 0, overflowX: isMobile ? "auto" : "hidden" }}>
                      <table style={{ width: isMobile ? undefined : "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: FONT }}>
                        <thead>
                          <tr>
                            <th rowSpan={2} style={TH}>Part No.</th>
                            <th rowSpan={2} style={{ ...TH, fontSize: 7, lineHeight: 1.2 }}>With<br />Thread<br />Lock</th>
                            <th colSpan={2} style={{ ...TH, borderBottom: "none", fontSize: 8 }}>End Force<br />(Lbs.)</th>
                            {["A", "B", "C", "D", "E", "F", "G"].map((h) => (
                              <th key={h} rowSpan={2} style={TH}>{h}</th>
                            ))}
                            <th rowSpan={2} style={TH}>ROHS</th>
                            <th rowSpan={2} style={TH}>CAD</th>
                            <th rowSpan={2} style={{ ...TH, fontSize: 7, lineHeight: 1.2 }}>CAD<br />W/<br />Lock</th>
                          </tr>
                          <tr>
                            <th style={{ ...TH, borderTop: "none" }}>Initial</th>
                            <th style={{ ...TH, borderTop: "none" }}>Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, ri) => {
                            const sel = selectedPart?.row.part === row.part;
                            const td = (v: string, link = false): React.CSSProperties => ({
                              padding: "4px 2px",
                              textAlign: "center",
                              color: sel ? "#fff" : link ? TEAL : "#333",
                              fontWeight: sel ? 700 : 400,
                              fontSize: 10,
                              borderBottom: "1px solid #e0e0e0",
                              fontFamily: FONT,
                              whiteSpace: "nowrap",
                            });
                            return (
                              <tr
                                key={row.part}
                                onClick={() => handleRowClick(table.id, row)}
                                style={{
                                  background: sel ? TEAL : ri % 2 === 0 ? "#fff" : "#f8f9fa",
                                  cursor: "pointer",
                                  transition: "background 0.15s ease-out",
                                }}
                                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "rgba(0,164,145,0.1)"; }}
                                onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = ri % 2 === 0 ? "#fff" : "#f8f9fa"; }}
                              >
                                <td style={td(row.part)}>{row.part}</td>
                                <td style={td(row.lock)}>{row.lock}</td>
                                <td style={td(row.init)}>{row.init}</td>
                                <td style={td(row.final)}>{row.final}</td>
                                <td style={td(row.a)}>{row.a}</td>
                                <td style={td(row.b)}>{row.b}</td>
                                <td style={td(row.c)}>{row.c}</td>
                                <td style={td(row.d)}>{row.d}</td>
                                <td style={td(row.e)}>{row.e}</td>
                                <td style={td(row.f)}>{row.f}</td>
                                <td style={td(row.g)}>{row.g}</td>
                                <td style={td("")}>
                                  {row.rohs && (
                                    <span style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: 13,
                                      height: 13,
                                      border: sel ? "1.5px solid #fff" : "1.5px solid #555",
                                      background: sel ? "rgba(255,255,255,0.2)" : "#fff",
                                      fontSize: 9,
                                      color: sel ? "#fff" : "#333",
                                      lineHeight: 1,
                                    }}>
                                      ✓
                                    </span>
                                  )}
                                </td>
                                <td style={td(row.part, true)}>{row.part}</td>
                                <td style={td(row.lock, true)}>{row.lock}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Conversion Calculators */}
          <div style={{ border: `2px solid ${NAVY}`, marginTop: 20 }}>
            <div style={{ padding: isMobile ? "14px 10px 10px" : "20px 16px 14px", textAlign: "center" }}>
              <h3 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: NAVY, margin: "0 0 4px", fontFamily: FONT }}>
                Conversion Calculators
              </h3>
              <p style={{ fontSize: isMobile ? 11 : 13, color: "#666", margin: 0, fontFamily: FONT }}>
                Enter known value in place of X to view results.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minWidth: 0 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ background: NAVY, color: "#fff", padding: "8px 12px", fontSize: 13, fontWeight: 700, textAlign: "center", fontFamily: FONT }}>
                  Metric &amp; Inch conversion:
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 8px" : "14px 10px" }}>
                  <input type="number" placeholder="X" value={inchVal} onChange={(e) => handleInch(e.target.value)}
                    style={{ flex: 1, padding: "8px 10px", border: `1px solid ${NAVY}`, fontSize: 13, fontFamily: FONT, outline: "none", minWidth: 0, textAlign: "center" }} />
                  <span style={{ fontSize: 12, color: "#333", fontFamily: FONT, flexShrink: 0 }}>Inch</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>=</span>
                  <input type="number" placeholder="X" value={mmVal} onChange={(e) => handleMm(e.target.value)}
                    style={{ flex: 1, padding: "8px 10px", border: `1px solid ${NAVY}`, fontSize: 13, fontFamily: FONT, outline: "none", minWidth: 0, textAlign: "center" }} />
                  <span style={{ fontSize: 12, color: "#333", fontFamily: FONT, flexShrink: 0 }}>mm</span>
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ background: NAVY, color: "#fff", padding: "8px 12px", fontSize: 13, fontWeight: 700, textAlign: "center", fontFamily: FONT }}>
                  Lbf/Newton Conversion:
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: isMobile ? "10px 8px" : "14px 10px" }}>
                  <input type="number" placeholder="X" value={lbfVal} onChange={(e) => handleLbf(e.target.value)}
                    style={{ flex: 1, padding: "8px 10px", border: `1px solid ${NAVY}`, fontSize: 13, fontFamily: FONT, outline: "none", minWidth: 0, textAlign: "center" }} />
                  <span style={{ fontSize: 12, color: "#333", fontFamily: FONT, flexShrink: 0 }}>lbf</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>=</span>
                  <input type="number" placeholder="X" value={nVal} onChange={(e) => handleN(e.target.value)}
                    style={{ flex: 1, padding: "8px 10px", border: `1px solid ${NAVY}`, fontSize: 13, fontFamily: FONT, outline: "none", minWidth: 0, textAlign: "center" }} />
                  <span style={{ fontSize: 12, color: "#333", fontFamily: FONT, flexShrink: 0 }}>N</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN — matches tab width on desktop, full width on mobile ─── */}
        <div style={{ flex: isMobile ? undefined : "0 0 38%", background: SIDEBAR_BG, padding: isMobile ? 14 : 16, borderLeft: isMobile ? "none" : "1px solid #bbb", borderTop: isMobile ? "1px solid #bbb" : "none" }}>
          {/* Product image */}
          <div
            style={{
              background: "#e2e5e8",
              height: isMobile ? 160 : 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
              fontSize: 12,
              color: "#999",
            }}
          >
            Product Image
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 44,
                  height: 44,
                  background: "#d4d8dc",
                  outline: i === 0 ? `2px solid ${TEAL}` : "1px solid #aaa",
                }}
              />
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
            <button style={{ padding: "10px", fontSize: 14, fontWeight: 700, fontFamily: FONT, background: "#fff", color: NAVY, border: `1px solid ${NAVY}`, cursor: "pointer" }}>
              Add to Cart
            </button>
            {activeTab === "info" ? (
              <>
                <button style={{ padding: "10px", fontSize: 14, fontWeight: 700, fontFamily: FONT, background: NAVY, color: "#fff", border: "none", cursor: "pointer" }}>
                  Find a Distributor
                </button>
                <button style={{ padding: "10px", fontSize: 14, fontWeight: 700, fontFamily: FONT, background: TEAL, color: "#fff", border: "none", cursor: "pointer" }}>
                  Print Page
                </button>
              </>
            ) : (
              <>
                <button style={{ padding: "10px", fontSize: 14, fontWeight: 700, fontFamily: FONT, background: NAVY, color: "#fff", border: "none", cursor: "pointer" }}>
                  Select Format
                </button>
                <button style={{ padding: "10px", fontSize: 14, fontWeight: 700, fontFamily: FONT, background: TEAL, color: "#fff", border: "none", cursor: "pointer" }}>
                  ⬇ Download CAD
                </button>
              </>
            )}
          </div>

          {/* Tab-dependent content */}
          {activeTab === "info" ? (
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, margin: "0 0 10px", fontFamily: FONT }}>
                Knurled Knob Plungers
              </h3>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: "0 0 4px", fontFamily: FONT }}>
                Product Description
              </h4>
              <p style={{ fontSize: 12, color: "#5F5F5F", lineHeight: 1.7, margin: "0 0 14px", fontFamily: FONT }}>
                Standard spring plungers offer long travel, large bearing surfaces and numerous material and design options including an optional locking element.
              </p>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: "0 0 4px", fontFamily: FONT }}>
                Typical Uses
              </h4>
              <ul style={{ fontSize: 12, color: "#5F5F5F", lineHeight: 2, paddingLeft: 18, margin: 0, fontFamily: FONT }}>
                {["Positioning", "Indexing", "Ejecting", "Latching", "Detents"].map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              {selectedPart ? (
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc", background: "#fff", fontFamily: FONT }}>
                  <thead>
                    <tr>
                      <th colSpan={2} style={{ background: NAVY, color: "#fff", padding: "10px 14px", fontSize: 16, fontWeight: 700, textAlign: "center" }}>
                        Product Specs: {selectedPart.row.part}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map(([label, value]) => (
                      <tr key={label}>
                        <td style={{ background: NAVY, color: "#fff", padding: "8px 0", fontSize: 16, fontWeight: 700, textAlign: "center", width: "28%", borderBottom: "1px solid #1e3a6e" }}>
                          {label}
                        </td>
                        <td style={{ padding: "8px 16px", fontSize: 15, color: NAVY, borderBottom: "1px solid #eee", textAlign: "center" }}>
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ border: "1px dashed #aaa", padding: 24, textAlign: "center", color: "#999", fontSize: 12, fontStyle: "italic", fontFamily: FONT }}>
                  Click any part number in a table to view its specifications here.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
