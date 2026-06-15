import React, { useState } from "react";
import { C } from "./tokens";
import { SectionHeader } from "./Primitives";

const REGIONS = [
  { name: "Europe", pct: 32, color: C.cyan },
  { name: "United Kingdom", pct: 18, color: C.cyanDim },
  { name: "West Africa", pct: 22, color: C.purple },
  { name: "East Africa", pct: 10, color: C.purpleDim },
  { name: "North America", pct: 8, color: C.success },
  { name: "Middle East", pct: 5, color: C.warning },
  { name: "Other", pct: 5, color: C.textMuted },
];

const TOP_COUNTRIES = [
  { flag: "🇬🇧", name: "United Kingdom", pct: 18, users: "—" },
  { flag: "🇳🇬", name: "Nigeria", pct: 15, users: "—" },
  { flag: "🇬🇭", name: "Ghana", pct: 9, users: "—" },
  { flag: "🇩🇪", name: "Germany", pct: 7, users: "—" },
  { flag: "🇦🇪", name: "UAE", pct: 5, users: "—" },
  { flag: "🇺🇸", name: "United States", pct: 4, users: "—" },
  { flag: "🇰🇪", name: "Kenya", pct: 3, users: "—" },
];

// SVG world map — simplified continent silhouettes as decorative paths
function WorldMapSVG({ tooltip }: { tooltip: string | null }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "2/1", minHeight: 200 }}>
      <svg
        viewBox="0 0 800 400"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ocean background */}
        <rect width="800" height="400" fill="#051018" rx="8" />

        {/* Grid lines */}
        {[80, 160, 240, 320].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(0,240,255,0.04)" strokeWidth="1" />
        ))}
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="rgba(0,240,255,0.04)" strokeWidth="1" />
        ))}

        {/* North America */}
        <path
          d="M 80 60 L 180 50 L 200 80 L 190 140 L 160 160 L 130 180 L 100 170 L 70 140 L 60 100 Z"
          fill="rgba(0,240,255,0.12)"
          stroke={C.cyan}
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
        {/* Greenland */}
        <path
          d="M 200 30 L 240 20 L 250 50 L 220 60 L 200 50 Z"
          fill="rgba(0,240,255,0.06)"
          stroke={C.cyan}
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        {/* South America */}
        <path
          d="M 150 200 L 200 190 L 220 230 L 210 290 L 180 330 L 150 320 L 130 280 L 130 230 Z"
          fill="rgba(168,85,247,0.1)"
          stroke={C.purple}
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        {/* Europe */}
        <path
          d="M 360 50 L 420 40 L 440 70 L 430 100 L 400 110 L 370 100 L 350 80 Z"
          fill="rgba(0,240,255,0.18)"
          stroke={C.cyan}
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        {/* UK highlight */}
        <path
          d="M 340 55 L 356 48 L 360 68 L 348 75 L 336 68 Z"
          fill="rgba(0,240,255,0.30)"
          stroke={C.cyan}
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        {/* Africa */}
        <path
          d="M 360 130 L 430 120 L 460 160 L 450 240 L 420 290 L 390 310 L 360 290 L 340 240 L 340 180 Z"
          fill="rgba(168,85,247,0.18)"
          stroke={C.purple}
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* Nigeria highlight */}
        <path
          d="M 370 195 L 410 190 L 420 215 L 400 228 L 370 220 Z"
          fill="rgba(168,85,247,0.35)"
          stroke={C.purple}
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        {/* Asia */}
        <path
          d="M 440 40 L 650 30 L 680 80 L 670 150 L 600 180 L 520 170 L 460 140 L 440 100 Z"
          fill="rgba(0,240,255,0.08)"
          stroke={C.cyan}
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        {/* Middle East highlight */}
        <path
          d="M 460 120 L 510 115 L 520 145 L 490 155 L 460 145 Z"
          fill="rgba(245,158,11,0.2)"
          stroke={C.warning}
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* India */}
        <path
          d="M 550 140 L 590 130 L 600 170 L 580 210 L 555 200 L 540 170 Z"
          fill="rgba(0,240,255,0.1)"
          stroke={C.cyan}
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        {/* Southeast Asia */}
        <path
          d="M 620 150 L 680 140 L 700 180 L 670 200 L 630 190 Z"
          fill="rgba(0,240,255,0.07)"
          stroke={C.cyan}
          strokeWidth="0.6"
          strokeOpacity="0.25"
        />
        {/* Australia */}
        <path
          d="M 620 260 L 700 250 L 720 290 L 700 320 L 650 330 L 610 310 L 600 280 Z"
          fill="rgba(34,197,94,0.08)"
          stroke={C.success}
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />

        {/* UK dot */}
        <circle cx="348" cy="62" r="4" fill={C.cyan} opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Nigeria dot */}
        <circle cx="393" cy="208" r="4" fill={C.purple} opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* Germany dot */}
        <circle cx="398" cy="72" r="3" fill={C.cyan} opacity="0.7" />
        {/* UAE dot */}
        <circle cx="488" cy="132" r="3" fill={C.warning} opacity="0.7" />
        {/* Ghana dot */}
        <circle cx="372" cy="218" r="3" fill={C.purple} opacity="0.7" />
        {/* Kenya dot */}
        <circle cx="430" cy="230" r="2.5" fill={C.purple} opacity="0.6" />

        {/* Glow overlay on UK */}
        <circle cx="348" cy="62" r="12" fill="none" stroke={C.cyan} strokeWidth="0.8" opacity="0.3">
          <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Legend labels */}
        <text x="335" y="55" fill={C.cyan} fontSize="7" opacity="0.8">UK 18%</text>
        <text x="384" y="205" fill={C.purple} fontSize="7" opacity="0.8">NG 15%</text>
        <text x="400" y="50" fill={C.cyan} fontSize="7" opacity="0.6">EU</text>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(7,19,39,0.95)",
            border: `1px solid ${C.cyanBorder}`,
            color: C.text,
            fontSize: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}
        >
          <div style={{ color: C.cyan, fontWeight: 700 }}>{tooltip}</div>
          <div style={{ color: C.textMuted, fontSize: 10, marginTop: 2 }}>
            Source: /api/ops/user-geo · Display only
          </div>
        </div>
      )}
    </div>
  );
}

export function GeoMapSection() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div style={{ padding: "20px 24px 0" }}>
      <SectionHeader
        icon="🌍"
        title="Geographic Intelligence"
        subtitle="User location distribution — sourced from /api/ops/user-geo · Display only, not financial data"
        accent={C.cyan}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 16,
        }}
      >
        {/* Map */}
        <div
          style={{
            background: "rgba(7,19,39,0.9)",
            border: `1px solid ${C.cyanBorder}`,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 24px rgba(0,240,255,0.08)",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: C.textDim, fontSize: 12, fontWeight: 700 }}>
              User Origin Map
            </span>
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(0,240,255,0.08)",
                border: `1px solid ${C.cyanBorder}`,
                color: C.textMuted,
                fontSize: 9,
                fontFamily: "monospace",
              }}
            >
              /api/ops/user-geo
            </span>
          </div>
          <div style={{ padding: 12 }}>
            <WorldMapSVG tooltip={hoveredRegion} />
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderTop: `1px solid ${C.border}`,
              color: C.textMuted,
              fontSize: 9,
            }}
          >
            ⚠ Map shows approximate user distribution based on IP geolocation. Accuracy not guaranteed.
            Hover tooltip style shown — live data requires backend geo endpoint.
          </div>
        </div>

        {/* Sidebar stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Region bars */}
          <div
            style={{
              background: "rgba(7,19,39,0.9)",
              border: `1px solid ${C.cyanBorder}`,
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 0 20px rgba(0,240,255,0.06)",
            }}
          >
            <div style={{ color: C.textDim, fontSize: 11, fontWeight: 700, marginBottom: 14 }}>
              Region Share
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {REGIONS.map((r) => (
                <div
                  key={r.name}
                  onMouseEnter={() => setHoveredRegion(`${r.name} — ${r.pct}%`)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{ cursor: "default" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: C.textMuted, fontSize: 10 }}>{r.name}</span>
                    <span
                      style={{
                        color: r.color,
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: "monospace",
                      }}
                    >
                      {r.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.05)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${r.pct}%`,
                        borderRadius: 2,
                        background: r.color,
                        boxShadow: `0 0 6px ${r.color}60`,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top countries */}
          <div
            style={{
              background: "rgba(7,19,39,0.9)",
              border: `1px solid ${C.cyanBorder}`,
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 0 20px rgba(0,240,255,0.06)",
            }}
          >
            <div style={{ color: C.textDim, fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
              Top Countries
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TOP_COUNTRIES.map((c, i) => (
                <div
                  key={c.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "5px 8px",
                    borderRadius: 6,
                    background: i === 0 ? "rgba(0,240,255,0.05)" : "transparent",
                    border: i === 0 ? `1px solid ${C.cyanBorder}` : "1px solid transparent",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{c.flag}</span>
                  <span style={{ color: C.textDim, fontSize: 11, flex: 1 }}>{c.name}</span>
                  <span
                    style={{
                      color: C.cyan,
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "monospace",
                    }}
                  >
                    {c.pct}%
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 10,
                color: C.textMuted,
                fontSize: 9,
                fontFamily: "monospace",
              }}
            >
              ⚠ Future backend requirement: live geo data endpoint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
