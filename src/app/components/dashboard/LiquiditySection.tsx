import React from "react";
import { C } from "./tokens";
import { GlassCard, SectionHeader, StatusPill, WarningBtn, CriticalBtn, SecondaryBtn } from "./Primitives";
import { Droplets, AlertTriangle, AlertOctagon, CheckCircle2, TrendingDown } from "lucide-react";

type LiquidityState = "healthy" | "low" | "critical";

interface Props {
  state: LiquidityState;
}

const CONFIG = {
  healthy: {
    glow: "success" as const,
    headerBg: "rgba(34,197,94,0.06)",
    headerBorder: "rgba(34,197,94,0.2)",
    Icon: CheckCircle2,
    iconColor: "#22C55E",
    bannerBg: "rgba(34,197,94,0.06)",
    bannerBorder: "rgba(34,197,94,0.2)",
    bannerColor: "#22C55E",
    bannerText: "Liquidity is healthy. No top-up required at this time.",
    barColor: "#22C55E",
    barGlow: "0 0 8px rgba(34,197,94,0.4)",
    barPercent: 82,
    btnLabel: "Open Liquidity Panel",
    BtnComponent: SecondaryBtn,
  },
  low: {
    glow: "warning" as const,
    headerBg: "rgba(245,158,11,0.06)",
    headerBorder: "rgba(245,158,11,0.25)",
    Icon: AlertTriangle,
    iconColor: "#F59E0B",
    bannerBg: "rgba(245,158,11,0.07)",
    bannerBorder: "rgba(245,158,11,0.3)",
    bannerColor: "#F59E0B",
    bannerText: "⚠ Liquidity is LOW. Staff should review and consider topping up.",
    barColor: "#F59E0B",
    barGlow: "0 0 8px rgba(245,158,11,0.4)",
    barPercent: 34,
    btnLabel: "Open Liquidity Top-Up",
    BtnComponent: WarningBtn,
  },
  critical: {
    glow: "critical" as const,
    headerBg: "rgba(239,68,68,0.06)",
    headerBorder: "rgba(239,68,68,0.3)",
    Icon: AlertOctagon,
    iconColor: "#EF4444",
    bannerBg: "rgba(239,68,68,0.08)",
    bannerBorder: "rgba(239,68,68,0.35)",
    bannerColor: "#EF4444",
    bannerText: "🚨 CRITICAL: Liquidity is dangerously low. Immediate top-up required.",
    barColor: "#F6465D",
    barGlow: "0 0 8px rgba(239,68,68,0.6)",
    barPercent: 9,
    btnLabel: "Open Liquidity Top-Up — URGENT",
    BtnComponent: CriticalBtn,
  },
};

const METRICS = [
  { label: "Available USDT", field: "liquidity.available_usdt", note: "Live on-chain balance" },
  { label: "Minimum Threshold", field: "liquidity.min_threshold_usdt", note: "Config-defined floor" },
  { label: "Missing to Threshold", field: "liquidity.deficit_usdt", note: "Calculated: threshold − available" },
  { label: "Suggested Top-Up", field: "liquidity.suggested_topup_usdt", note: "Calculated: deficit + 20% buffer" },
];

export function LiquiditySection({ state }: Props) {
  const cfg = CONFIG[state];
  const { Icon, BtnComponent } = cfg;

  return (
    <div style={{ padding: "20px 24px 0" }}>
      <SectionHeader
        icon="💧"
        title="Liquidity / Top-Up"
        subtitle="Platform USDT liquidity pool — staff must monitor and top up as required"
        accent={state === "healthy" ? C.success : state === "low" ? C.warning : C.critical}
      />

      <GlassCard glow={cfg.glow}>
        <div style={{ padding: 20 }}>
          {/* Status header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: 10,
              background: cfg.headerBg,
              border: `1px solid ${cfg.headerBorder}`,
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon size={22} color={cfg.iconColor} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: C.text, fontSize: 15, fontWeight: 800 }}>Liquidity Status</span>
                  <StatusPill status={state} />
                </div>
                <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
                  Source: liquidity.status_flag — Live endpoint
                </div>
              </div>
            </div>
            <BtnComponent onClick={() => {}}>
              <Droplets size={13} />
              {cfg.btnLabel}
            </BtnComponent>
          </div>

          {/* Alert banner */}
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: cfg.bannerBg,
              border: `1px solid ${cfg.bannerBorder}`,
              color: cfg.bannerColor,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            {cfg.bannerText}
          </div>

          {/* Liquidity bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: C.textMuted, fontSize: 11 }}>Available vs Threshold</span>
              <span style={{ color: cfg.barColor, fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>
                {cfg.barPercent}%
              </span>
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${cfg.barPercent}%`,
                  borderRadius: 4,
                  background: cfg.barColor,
                  boxShadow: cfg.barGlow,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ color: C.textMuted, fontSize: 9, fontFamily: "monospace" }}>0</span>
              <span style={{ color: C.textMuted, fontSize: 9, fontFamily: "monospace" }}>Min threshold</span>
              <span style={{ color: C.textMuted, fontSize: 9, fontFamily: "monospace" }}>Target</span>
            </div>
          </div>

          {/* Metric rows */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {METRICS.map((m) => (
              <div
                key={m.label}
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${C.borderSubtle}`,
                }}
              >
                <div style={{ color: C.textMuted, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  {m.label}
                </div>
                <div style={{ color: C.textMuted, fontSize: 18, fontFamily: "monospace", fontWeight: 700, marginBottom: 4 }}>
                  — Unavailable
                </div>
                <div style={{ color: C.textMuted, fontSize: 9, fontFamily: "monospace" }}>{m.field}</div>
                <div style={{ color: C.textMuted, fontSize: 9, marginTop: 2 }}>{m.note}</div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div
            style={{
              marginTop: 14,
              padding: "8px 12px",
              borderRadius: 6,
              background: "rgba(245,158,11,0.05)",
              border: "1px solid rgba(245,158,11,0.15)",
              color: C.warning,
              fontSize: 10,
            }}
          >
            ⚠ <strong>Future backend requirement:</strong> Live USDT balance endpoint + threshold config endpoint required to populate values.
            Status badge is driven by <code style={{ fontFamily: "monospace" }}>liquidity.status_flag</code> from the liquidity service.
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
