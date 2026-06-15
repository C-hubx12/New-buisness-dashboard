import React from "react";
import { C, glassCard } from "./tokens";

// ── Glass Card ─────────────────────────────────────────────────────────────
interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  glow?: "cyan" | "purple" | "success" | "warning" | "critical" | "none";
}
export function GlassCard({ children, style, className = "", glow = "cyan" }: GlassCardProps) {
  const glowMap = {
    cyan: "0 24px 70px rgba(0,0,0,0.46), 0 0 42px rgba(0,231,255,0.13)",
    purple: "0 24px 70px rgba(0,0,0,0.46), 0 0 42px rgba(155,109,255,0.15)",
    success: "0 24px 70px rgba(0,0,0,0.46), 0 0 34px rgba(53,229,138,0.14)",
    warning: "0 24px 70px rgba(0,0,0,0.46), 0 0 38px rgba(245,199,107,0.18)",
    critical: "0 24px 70px rgba(0,0,0,0.46), 0 0 38px rgba(255,77,109,0.18)",
    none: "0 20px 56px rgba(0,0,0,0.38)",
  };
  const borderMap = {
    cyan: C.cyanBorder,
    purple: C.purpleBorder,
    success: C.successBorder,
    warning: C.warningBorder,
    critical: C.criticalBorder,
    none: C.border,
  };
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(13,30,55,0.94) 0%, rgba(7,16,33,0.97) 52%, rgba(3,7,17,0.98) 100%)",
        backdropFilter: "blur(18px) saturate(145%)",
        border: `1px solid ${borderMap[glow]}`,
        borderRadius: "18px",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.085), inset 0 -1px 0 rgba(0,231,255,0.035), ${glowMap[glow]}`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(circle at 12% 0%, rgba(0,231,255,0.13), transparent 34%), radial-gradient(circle at 90% 8%, rgba(245,199,107,0.08), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.045), transparent 28%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── Source Badge ────────────────────────────────────────────────────────────
export function SourceBadge({ label, color = "cyan" }: { label: string; color?: "cyan" | "purple" | "green" | "amber" }) {
  const map = {
    cyan: { bg: "rgba(0,240,255,0.1)", color: C.cyan, border: C.cyanBorder },
    purple: { bg: "rgba(168,85,247,0.1)", color: C.purple, border: C.purpleBorder },
    green: { bg: "rgba(34,197,94,0.1)", color: C.success, border: C.successBorder },
    amber: { bg: "rgba(245,158,11,0.1)", color: C.warning, border: C.warningBorder },
  };
  const s = map[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 999,
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {label}
    </span>
  );
}

// ── Status Pill ─────────────────────────────────────────────────────────────
export function StatusPill({ status }: { status: "healthy" | "low" | "critical" | "warning" | "ok" | "broken" | "pending" }) {
  const map: Record<string, { bg: string; color: string; border: string; label: string }> = {
    healthy: { bg: "rgba(34,197,94,0.12)", color: C.success, border: C.successBorder, label: "Healthy" },
    ok: { bg: "rgba(34,197,94,0.12)", color: C.success, border: C.successBorder, label: "OK" },
    low: { bg: "rgba(245,158,11,0.12)", color: C.warning, border: C.warningBorder, label: "Low" },
    warning: { bg: "rgba(245,158,11,0.12)", color: C.warning, border: C.warningBorder, label: "Warning" },
    critical: { bg: "rgba(239,68,68,0.12)", color: C.critical, border: C.criticalBorder, label: "Critical" },
    broken: { bg: "rgba(239,68,68,0.12)", color: C.critical, border: C.criticalBorder, label: "Broken" },
    pending: { bg: "rgba(100,116,139,0.12)", color: C.textDim, border: C.borderSubtle, label: "Pending" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 999,
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.color,
          boxShadow: `0 0 6px ${s.color}`,
          display: "inline-block",
          animation: status === "critical" ? "pulse 1.5s infinite" : undefined,
        }}
      />
      {s.label}
    </span>
  );
}

// ── Primary Button ───────────────────────────────────────────────────────────
export function PrimaryBtn({ children, onClick, small }: { children: React.ReactNode; onClick?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "5px 12px" : "8px 18px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #6EF6FF 0%, #00E7FF 42%, #157BFF 100%)",
        color: "#020618",
        fontSize: small ? 11 : 13,
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.02em",
        boxShadow: "0 10px 26px rgba(0,231,255,0.24), inset 0 1px 0 rgba(255,255,255,0.42)",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ── Secondary Button ─────────────────────────────────────────────────────────
export function SecondaryBtn({ children, onClick, small }: { children: React.ReactNode; onClick?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "4px 10px" : "7px 16px",
        borderRadius: 12,
        background: "linear-gradient(180deg, rgba(0,231,255,0.10), rgba(0,231,255,0.035))",
        color: C.cyan,
        fontSize: small ? 11 : 13,
        fontWeight: 600,
        border: `1px solid ${C.cyanBorder}`,
        cursor: "pointer",
        letterSpacing: "0.02em",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ── Warning Button ────────────────────────────────────────────────────────────
export function WarningBtn({ children, onClick, small }: { children: React.ReactNode; onClick?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "5px 12px" : "8px 18px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #F8D58A 0%, #F5B84B 48%, #B96E12 100%)",
        color: "#020618",
        fontSize: small ? 11 : 13,
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        boxShadow: "0 0 16px rgba(245,158,11,0.3)",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ── Critical Button ───────────────────────────────────────────────────────────
export function CriticalBtn({ children, onClick, small }: { children: React.ReactNode; onClick?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "5px 12px" : "8px 18px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #FF7C8F 0%, #FF4D6D 52%, #CB233F 100%)",
        color: "#ffffff",
        fontSize: small ? 11 : 13,
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        boxShadow: "0 0 16px rgba(239,68,68,0.3)",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ── Ghost Button ──────────────────────────────────────────────────────────────
export function GhostBtn({ children, onClick, small }: { children: React.ReactNode; onClick?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: small ? "3px 8px" : "6px 12px",
        borderRadius: 6,
        background: "transparent",
        color: C.textDim,
        fontSize: small ? 10 : 12,
        fontWeight: 600,
        border: `1px solid ${C.borderSubtle}`,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
export function SectionHeader({
  icon,
  title,
  subtitle,
  accent = C.cyan,
  tag,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  accent?: string;
  tag?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `rgba(${accent === C.cyan ? "0,240,255" : accent === C.purple ? "168,85,247" : accent === C.warning ? "245,158,11" : "34,197,94"},0.12)`,
          border: `1px solid ${accent}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: C.text, fontSize: 15, fontWeight: 700 }}>{title}</span>
          {tag && (
            <span
              style={{
                padding: "1px 7px",
                borderRadius: 4,
                background: "rgba(168,85,247,0.12)",
                border: "1px solid rgba(168,85,247,0.25)",
                color: C.purple,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          )}
        </div>
        {subtitle && <div style={{ color: C.textMuted, fontSize: 11, marginTop: 1 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider({ color = C.cyanBorder }: { color?: string }) {
  return <div style={{ height: 1, background: color, margin: "16px 0" }} />;
}

// ── Value Display ─────────────────────────────────────────────────────────────
export function BigValue({
  native,
  nativeLabel,
  display,
  displayLabel,
  unavailable,
}: {
  native?: string;
  nativeLabel?: string;
  display?: string;
  displayLabel?: string;
  unavailable?: boolean;
}) {
  if (unavailable) {
    return (
      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: C.textMuted,
            fontFamily: "monospace",
            letterSpacing: "-0.5px",
          }}
        >
          — Unavailable
        </div>
        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>Endpoint not yet connected</div>
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: C.text,
          fontFamily: "monospace",
          letterSpacing: "-0.5px",
          lineHeight: 1.2,
        }}
      >
        {native}
      </div>
      {nativeLabel && (
        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1, fontFamily: "monospace" }}>
          Native: {nativeLabel}
        </div>
      )}
      {display && (
        <div
          style={{
            fontSize: 12,
            color: C.textDim,
            marginTop: 3,
            fontFamily: "monospace",
          }}
        >
          ≈ {display}
          {displayLabel && (
            <span style={{ color: C.textMuted, fontSize: 10, marginLeft: 4 }}>{displayLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Inline Tag ─────────────────────────────────────────────────────────────────
export function Tag({ label, color = "cyan" }: { label: string; color?: "cyan" | "red" | "amber" | "green" | "purple" | "gray" }) {
  const map = {
    cyan: { bg: "rgba(0,240,255,0.1)", color: C.cyan },
    red: { bg: "rgba(239,68,68,0.12)", color: C.critical },
    amber: { bg: "rgba(245,158,11,0.1)", color: C.warning },
    green: { bg: "rgba(34,197,94,0.1)", color: C.success },
    purple: { bg: "rgba(168,85,247,0.1)", color: C.purple },
    gray: { bg: "rgba(100,116,139,0.1)", color: C.textDim },
  };
  const s = map[color];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "1px 6px",
        borderRadius: 4,
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}
