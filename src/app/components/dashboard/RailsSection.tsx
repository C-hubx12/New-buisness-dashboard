import React from "react";
import { C } from "./tokens";
import { SectionHeader, StatusPill } from "./Primitives";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type RailStatus = "healthy" | "warning" | "broken" | "pending";

interface RailCard {
  title: string;
  description: string;
  status: RailStatus;
  value: string;
  valueNote: string;
  endpoint: string;
  field: string;
  icon: string;
}

const RAILS: RailCard[] = [
  {
    title: "Total Assets in Registry",
    description: "All assets registered in the platform asset registry. Includes active and inactive.",
    status: "healthy",
    value: "— Unavailable",
    valueNote: "asset_registry.total_count",
    endpoint: "/api/rails/asset-registry",
    field: "total_asset_count",
    icon: "📦",
  },
  {
    title: "Withdraw-Enabled Assets",
    description: "Assets currently enabled for withdrawal. Requires active rail + liquidity check.",
    status: "warning",
    value: "— Unavailable",
    valueNote: "asset_registry.withdraw_enabled_count",
    endpoint: "/api/rails/withdraw-enabled",
    field: "withdraw_enabled_count",
    icon: "⬆️",
  },
  {
    title: "Wired Rail Chains",
    description: "Blockchain networks with active wired rails. Determines which chains support live transfers.",
    status: "healthy",
    value: "— Unavailable",
    valueNote: "rails.wired_chain_count",
    endpoint: "/api/rails/wired-chains",
    field: "wired_chain_count",
    icon: "🔗",
  },
  {
    title: "Ledger Compliance",
    description: "Confirms all ledger entries balance correctly. Debit = credit for every transaction.",
    status: "healthy",
    value: "— Unavailable",
    valueNote: "ledger.compliance_status",
    endpoint: "/api/ledger/compliance",
    field: "compliance_ok",
    icon: "📋",
  },
  {
    title: "Liquidity Reconciliation",
    description: "On-chain balance vs ledger balance match check. Detects discrepancies instantly.",
    status: "warning",
    value: "— Unavailable",
    valueNote: "liquidity.reconciliation_status",
    endpoint: "/api/liquidity/reconciliation",
    field: "reconciliation_ok",
    icon: "⚖️",
  },
  {
    title: "Commission / Fee Flow",
    description: "Confirms fee ledger entries are posting correctly to platform fee wallet.",
    status: "healthy",
    value: "— Unavailable",
    valueNote: "ledger.fee_flow_status",
    endpoint: "/api/ledger/fee-flow",
    field: "fee_flow_ok",
    icon: "💸",
  },
];

function StatusIcon({ status }: { status: RailStatus }) {
  if (status === "healthy") return <CheckCircle2 size={15} color={C.success} />;
  if (status === "warning") return <AlertTriangle size={15} color={C.warning} />;
  if (status === "broken") return <XCircle size={15} color={C.critical} />;
  return <AlertTriangle size={15} color={C.textMuted} />;
}

function cardGlow(status: RailStatus) {
  if (status === "healthy") return { border: C.successBorder, glow: "0 0 16px rgba(34,197,94,0.1)" };
  if (status === "warning") return { border: C.warningBorder, glow: "0 0 16px rgba(245,158,11,0.12)" };
  if (status === "broken") return { border: C.criticalBorder, glow: "0 0 16px rgba(239,68,68,0.15)" };
  return { border: C.border, glow: "none" };
}

export function RailsSection() {
  return (
    <div style={{ padding: "20px 24px 0" }}>
      <SectionHeader
        icon="🛤️"
        title="Rails / Ledger / Liquidity Assurance"
        subtitle="Operational safety panel — green = healthy, amber = warning, red = broken"
        accent={C.success}
        tag="OPS SAFETY"
      />

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        {[
          { color: C.success, label: "Healthy — operating normally" },
          { color: C.warning, label: "Warning — needs review" },
          { color: C.critical, label: "Broken — immediate action" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block", boxShadow: `0 0 5px ${l.color}` }} />
            <span style={{ color: C.textMuted, fontSize: 10 }}>{l.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {RAILS.map((card) => {
          const { border, glow } = cardGlow(card.status);
          return (
            <div
              key={card.title}
              style={{
                background: "rgba(7,19,39,0.9)",
                backdropFilter: "blur(14px)",
                border: `1px solid ${border}`,
                borderRadius: 12,
                padding: 18,
                boxShadow: glow,
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{card.icon}</span>
                  <StatusIcon status={card.status} />
                </div>
                <StatusPill status={card.status} />
              </div>

              {/* Title */}
              <div style={{ color: C.text, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: C.textMuted, fontSize: 10, lineHeight: 1.5, marginBottom: 12 }}>{card.description}</div>

              {/* Value */}
              <div style={{ color: C.textMuted, fontSize: 16, fontFamily: "monospace", fontWeight: 700, marginBottom: 2 }}>
                {card.value}
              </div>
              <div style={{ color: C.textMuted, fontSize: 9, fontFamily: "monospace", marginBottom: 10 }}>
                {card.valueNote}
              </div>

              {/* Endpoint */}
              <div
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${C.borderSubtle}`,
                  color: C.textMuted,
                  fontSize: 9,
                  fontFamily: "monospace",
                }}
              >
                {card.endpoint} → {card.field}
              </div>

              {/* Warning footnote */}
              {card.status === "warning" && (
                <div
                  style={{
                    marginTop: 8,
                    padding: "5px 8px",
                    borderRadius: 5,
                    background: "rgba(245,158,11,0.07)",
                    color: C.warning,
                    fontSize: 9,
                  }}
                >
                  ⚠ Endpoint not yet connected — endpoint needed to populate live status
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
