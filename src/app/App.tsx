import React, { useState } from "react";
import { C } from "./components/dashboard/tokens";
import { CoinHubXLogo } from "./components/dashboard/CoinHubXLogo";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { TreasurySection, TreasuryDrawer, FeeDrawer } from "./components/dashboard/TreasurySection";
import { LiquiditySection } from "./components/dashboard/LiquiditySection";
import { OperationsSection } from "./components/dashboard/OperationsSection";
import { IPIntelligenceTable } from "./components/dashboard/IPIntelligenceTable";
import { RailsSection } from "./components/dashboard/RailsSection";
import { GeoMapSection } from "./components/dashboard/GeoMapSection";
import { KPIAuditSection } from "./components/dashboard/KPIAuditSection";
import { LoadingState, DataUnavailableState, PermissionDeniedState } from "./components/dashboard/StateFrames";

const FRAMES = [
  { id: "desktop",         label: "① Desktop 1440",       group: "Layout" },
  { id: "tablet",          label: "② Tablet 768",          group: "Layout" },
  { id: "mobile",          label: "③ Mobile 390",          group: "Layout" },
  { id: "treasury-drawer", label: "④ Treasury Drawer",     group: "Drawers" },
  { id: "fee-drawer",      label: "⑤ Fee Drawer",          group: "Drawers" },
  { id: "liq-low",         label: "⑥ Liquidity Low",       group: "Liquidity" },
  { id: "liq-critical",    label: "⑦ Liquidity Critical",  group: "Liquidity" },
  { id: "ip-expanded",     label: "⑧ IP Table Expanded",   group: "Intelligence" },
  { id: "ip-drawer",       label: "⑨ IP Drawer",           group: "Intelligence" },
  { id: "geo-map",         label: "⑩ Geo Map",             group: "Intelligence" },
  { id: "loading",         label: "⑪ Loading",             group: "States" },
  { id: "unavailable",     label: "⑫ Unavailable",         group: "States" },
  { id: "denied",          label: "⑬ Permission Denied",   group: "States" },
];

const GROUPS = ["Layout", "Drawers", "Liquidity", "Intelligence", "States"];

const GROUP_COLORS: Record<string, string> = {
  Layout:       C.cyan,
  Drawers:      C.purple,
  Liquidity:    C.success,
  Intelligence: C.warning,
  States:       C.textMuted,
};

function FullDashboard({
  onOpenTreasury,
  onOpenFee,
  liquidityState = "healthy",
  expandedIP = false,
}: {
  onOpenTreasury: () => void;
  onOpenFee: () => void;
  liquidityState?: "healthy" | "low" | "critical";
  expandedIP?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingBottom: 48 }}>
      <TreasurySection onOpenTreasuryDrawer={onOpenTreasury} onOpenFeeDrawer={onOpenFee} />
      <LiquiditySection state={liquidityState} />
      <OperationsSection />
      <IPIntelligenceTable expandedMode={expandedIP} />
      <RailsSection />
      <GeoMapSection />
      <KPIAuditSection />
    </div>
  );
}

export default function App() {
  const [activeFrame, setActiveFrame] = useState("desktop");
  const [treasuryOpen, setTreasuryOpen] = useState(false);
  const [feeOpen, setFeeOpen] = useState(false);

  const LAYOUT_WIDTHS: Record<string, string | number> = {
    desktop: "100%",
    tablet: 768,
    mobile: 390,
  };

  const isLayout = ["desktop", "tablet", "mobile"].includes(activeFrame);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 12% -10%, rgba(0,231,255,0.16), transparent 30%), radial-gradient(circle at 82% 0%, rgba(245,199,107,0.10), transparent 28%), linear-gradient(180deg, #061126 0%, #030713 44%, #01030A 100%)",
        color: C.text,
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      {/* ── 13-Frame Navigator ─────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(7,17,34,0.98), rgba(3,7,19,0.96))",
          borderBottom: `1px solid rgba(111,246,255,0.16)`,
          boxShadow: "0 18px 50px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.05)",
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 300,
        }}
      >
        {/* CoinHubX brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginRight: 10,
            paddingRight: 14,
            borderRight: `1px solid rgba(0,240,255,0.12)`,
          }}
        >
          <CoinHubXLogo size={28} showWordmark={true} />
          <span style={{ color: C.textMuted, fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", marginLeft: 2 }}>
            · 13 FRAMES
          </span>
        </div>

        {GROUPS.map((group) => (
          <React.Fragment key={group}>
            <span
              style={{
                color: GROUP_COLORS[group],
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 5px",
                borderRadius: 3,
                background: `${GROUP_COLORS[group]}12`,
                marginLeft: 6,
                flexShrink: 0,
              }}
            >
              {group}
            </span>
            {FRAMES.filter((f) => f.group === group).map((frame) => (
              <button
                key={frame.id}
                onClick={() => { setActiveFrame(frame.id); setTreasuryOpen(false); setFeeOpen(false); }}
                style={{
                  padding: "4px 9px",
                  borderRadius: 5,
                  background: activeFrame === frame.id ? `${GROUP_COLORS[group]}18` : "transparent",
                  border: activeFrame === frame.id
                    ? `1px solid ${GROUP_COLORS[group]}45`
                    : "1px solid transparent",
                  color: activeFrame === frame.id ? GROUP_COLORS[group] : C.textMuted,
                  fontSize: 9,
                  fontWeight: activeFrame === frame.id ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.12s",
                  letterSpacing: "0.01em",
                }}
              >
                {frame.label}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* ── LAYOUT FRAMES (desktop / tablet / mobile) ───────────────────── */}
      {isLayout && (
        <div
          style={{
            display: "flex",
            justifyContent: activeFrame !== "desktop" ? "center" : undefined,
            background: activeFrame !== "desktop" ? "#010410" : undefined,
            minHeight: "calc(100vh - 45px)",
            paddingBottom: activeFrame !== "desktop" ? 40 : undefined,
            paddingTop: activeFrame !== "desktop" ? 24 : undefined,
          }}
        >
          <div
            style={{
              width: LAYOUT_WIDTHS[activeFrame],
              maxWidth: "100%",
              background: "linear-gradient(180deg, rgba(6,17,38,0.98), rgba(2,7,19,1))",
              boxShadow: activeFrame !== "desktop"
                ? "0 30px 120px rgba(0,0,0,0.92), 0 0 0 1px rgba(111,246,255,0.16), 0 0 70px rgba(0,231,255,0.10)"
                : undefined,
              borderRadius: activeFrame !== "desktop" ? 14 : undefined,
              overflow: activeFrame !== "desktop" ? "hidden" : undefined,
              minHeight: "80vh",
            }}
          >
            {/* Overlaid drawers when triggered from header */}
            {treasuryOpen && <TreasuryDrawer onClose={() => setTreasuryOpen(false)} />}
            {feeOpen && <FeeDrawer onClose={() => setFeeOpen(false)} />}

            <DashboardHeader
              onOpenDrawer={(type) => {
                if (type === "treasury") setTreasuryOpen(true);
                if (type === "withdrawals") setFeeOpen(true);
              }}
            />
            <FullDashboard
              onOpenTreasury={() => setTreasuryOpen(true)}
              onOpenFee={() => setFeeOpen(true)}
            />
          </div>
        </div>
      )}

      {/* ── FRAME 4: Treasury drawer open ──────────────────────────────── */}
      {activeFrame === "treasury-drawer" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div style={{ position: "relative" }}>
            <FullDashboard onOpenTreasury={() => {}} onOpenFee={() => {}} />
            <TreasuryDrawer onClose={() => setActiveFrame("desktop")} />
          </div>
        </div>
      )}

      {/* ── FRAME 5: Fee drawer open ────────────────────────────────────── */}
      {activeFrame === "fee-drawer" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div style={{ position: "relative" }}>
            <FullDashboard onOpenTreasury={() => {}} onOpenFee={() => {}} />
            <FeeDrawer onClose={() => setActiveFrame("desktop")} />
          </div>
        </div>
      )}

      {/* ── FRAME 6: Liquidity Low ──────────────────────────────────────── */}
      {activeFrame === "liq-low" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div
            style={{
              padding: "10px 24px",
              background: "rgba(245,158,11,0.05)",
              borderBottom: `1px solid ${C.warningBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>⚠️</span>
            <span style={{ color: C.warning, fontSize: 12, fontWeight: 700 }}>
              Frame 6 — Low Liquidity Warning State
            </span>
          </div>
          <div style={{ paddingBottom: 48 }}>
            <LiquiditySection state="low" />
          </div>
        </div>
      )}

      {/* ── FRAME 7: Liquidity Critical ─────────────────────────────────── */}
      {activeFrame === "liq-critical" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div
            style={{
              padding: "10px 24px",
              background: "rgba(239,68,68,0.07)",
              borderBottom: `1px solid ${C.criticalBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>🚨</span>
            <span style={{ color: C.critical, fontSize: 12, fontWeight: 700 }}>
              Frame 7 — Critical Liquidity Warning State — Immediate top-up required
            </span>
          </div>
          <div style={{ paddingBottom: 48 }}>
            <LiquiditySection state="critical" />
          </div>
        </div>
      )}

      {/* ── FRAME 8: IP Table Expanded Row ──────────────────────────────── */}
      {activeFrame === "ip-expanded" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div
            style={{
              padding: "10px 24px",
              background: "rgba(245,158,11,0.05)",
              borderBottom: `1px solid ${C.warningBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>🔍</span>
            <span style={{ color: C.warning, fontSize: 12, fontWeight: 700 }}>
              Frame 8 — IP Intelligence Table with Expanded Row (click any row to expand)
            </span>
          </div>
          <div style={{ paddingBottom: 48 }}>
            <IPIntelligenceTable expandedMode={true} />
          </div>
        </div>
      )}

      {/* ── FRAME 9: User/IP Investigation Drawer ───────────────────────── */}
      {activeFrame === "ip-drawer" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div
            style={{
              padding: "10px 24px",
              background: "rgba(0,240,255,0.04)",
              borderBottom: `1px solid ${C.cyanBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>🛡️</span>
            <span style={{ color: C.cyan, fontSize: 12, fontWeight: 700 }}>
              Frame 9 — User/IP Investigation Drawer (expand a row and click View User)
            </span>
          </div>
          <div style={{ paddingBottom: 48 }}>
            <IPIntelligenceTable expandedMode={true} />
          </div>
        </div>
      )}

      {/* ── FRAME 10: Geo Map ───────────────────────────────────────────── */}
      {activeFrame === "geo-map" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <div
            style={{
              padding: "10px 24px",
              background: "rgba(0,240,255,0.04)",
              borderBottom: `1px solid ${C.cyanBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>🌍</span>
            <span style={{ color: C.cyan, fontSize: 12, fontWeight: 700 }}>
              Frame 10 — Geographic Intelligence Section (hover map regions for tooltip)
            </span>
          </div>
          <div style={{ paddingBottom: 48 }}>
            <GeoMapSection />
          </div>
        </div>
      )}

      {/* ── FRAME 11: Loading ───────────────────────────────────────────── */}
      {activeFrame === "loading" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <LoadingState />
        </div>
      )}

      {/* ── FRAME 12: Data Unavailable ──────────────────────────────────── */}
      {activeFrame === "unavailable" && (
        <div style={{ background: "#020618", minHeight: "calc(100vh - 45px)" }}>
          <DashboardHeader onOpenDrawer={() => {}} />
          <DataUnavailableState />
        </div>
      )}

      {/* ── FRAME 13: Permission Denied ─────────────────────────────────── */}
      {activeFrame === "denied" && (
        <div
          style={{
            background: "#020618",
            minHeight: "calc(100vh - 45px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PermissionDeniedState />
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(0,231,255,0.36), rgba(245,199,107,0.26)); border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,231,255,0.55); }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
