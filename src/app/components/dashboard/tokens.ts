export const C = {
  bg: "#020618",
  bgCard: "#071327",
  bgPanel: "#0A1929",
  bgDeep: "#051018",
  cyan: "#00F0FF",
  cyanDim: "#0CEBFF",
  cyanFaint: "rgba(0,240,255,0.08)",
  cyanBorder: "rgba(0,240,255,0.18)",
  cyanGlow: "0 0 20px rgba(0,240,255,0.15)",
  purple: "#A855F7",
  purpleDim: "#8B5CF6",
  purpleFaint: "rgba(168,85,247,0.08)",
  purpleBorder: "rgba(168,85,247,0.25)",
  success: "#22C55E",
  successDim: "#16A34A",
  successFaint: "rgba(34,197,94,0.08)",
  successBorder: "rgba(34,197,94,0.25)",
  successGlow: "0 0 16px rgba(34,197,94,0.2)",
  warning: "#F59E0B",
  warningDim: "#D97706",
  warningFaint: "rgba(245,158,11,0.08)",
  warningBorder: "rgba(245,158,11,0.3)",
  warningGlow: "0 0 20px rgba(245,158,11,0.25)",
  critical: "#EF4444",
  criticalAlt: "#F6465D",
  criticalFaint: "rgba(239,68,68,0.08)",
  criticalBorder: "rgba(239,68,68,0.3)",
  criticalGlow: "0 0 20px rgba(239,68,68,0.25)",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#94a3b8",
  border: "rgba(0,240,255,0.12)",
  borderSubtle: "rgba(255,255,255,0.06)",
};

export const glassCard = {
  background: "rgba(7,19,39,0.85)",
  backdropFilter: "blur(12px)",
  border: `1px solid ${C.cyanBorder}`,
  borderRadius: "12px",
};

export const glassCardWarning = {
  background: "rgba(7,19,39,0.85)",
  backdropFilter: "blur(12px)",
  border: `1px solid ${C.warningBorder}`,
  borderRadius: "12px",
  boxShadow: C.warningGlow,
};

export const glassCardCritical = {
  background: "rgba(7,19,39,0.85)",
  backdropFilter: "blur(12px)",
  border: `1px solid ${C.criticalBorder}`,
  borderRadius: "12px",
  boxShadow: C.criticalGlow,
};

export const glassCardSuccess = {
  background: "rgba(7,19,39,0.85)",
  backdropFilter: "blur(12px)",
  border: `1px solid ${C.successBorder}`,
  borderRadius: "12px",
  boxShadow: C.successGlow,
};
