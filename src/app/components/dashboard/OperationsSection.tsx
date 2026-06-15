import React from "react";
import { C } from "./tokens";
import { GlassCard, SectionHeader, SourceBadge } from "./Primitives";
import { Users, UserPlus, Globe, AlertTriangle, Gift, Activity } from "lucide-react";

const OPS_CARDS = [
  {
    id: "active-users",
    icon: <Activity size={16} color={C.cyan} />,
    title: "Active Users",
    description: "Users with at least one session in the selected date range.",
    badge: { label: "Live endpoint", color: "cyan" as const },
    endpoint: "/api/ops/active-users",
    field: "active_user_count",
    color: C.cyan,
    colorFaint: "rgba(0,240,255,0.08)",
    colorBorder: "rgba(0,240,255,0.18)",
  },
  {
    id: "total-users",
    icon: <Users size={16} color={C.purple} />,
    title: "Total Users",
    description: "All registered user accounts. Does not reflect balances.",
    badge: { label: "DB count", color: "purple" as const },
    endpoint: "/api/ops/total-users",
    field: "total_user_count",
    color: C.purple,
    colorFaint: "rgba(168,85,247,0.08)",
    colorBorder: "rgba(168,85,247,0.18)",
  },
  {
    id: "new-signups",
    icon: <UserPlus size={16} color={C.success} />,
    title: "New Signups",
    description: "Accounts created within the selected date range.",
    badge: { label: "DB count", color: "green" as const },
    endpoint: "/api/ops/new-signups",
    field: "new_signup_count",
    color: C.success,
    colorFaint: "rgba(34,197,94,0.08)",
    colorBorder: "rgba(34,197,94,0.18)",
  },
  {
    id: "signup-ips",
    icon: <Globe size={16} color={C.cyanDim} />,
    title: "Signup IPs",
    description: "Unique IP addresses used during account creation in range.",
    badge: { label: "IP log", color: "cyan" as const },
    endpoint: "/api/ops/signup-ips",
    field: "unique_signup_ip_count",
    color: C.cyanDim,
    colorFaint: "rgba(12,235,255,0.08)",
    colorBorder: "rgba(12,235,255,0.18)",
  },
  {
    id: "suspicious-ips",
    icon: <AlertTriangle size={16} color={C.warning} />,
    title: "Suspicious Signup IPs",
    description: "IPs flagged by risk scoring: VPN, Tor, datacenter, or high-risk country.",
    badge: { label: "Risk engine", color: "amber" as const },
    endpoint: "/api/ops/suspicious-ips",
    field: "suspicious_ip_count",
    color: C.warning,
    colorFaint: "rgba(245,158,11,0.08)",
    colorBorder: "rgba(245,158,11,0.25)",
  },
  {
    id: "referral-rewards",
    icon: <Gift size={16} color={C.purple} />,
    title: "Referral Rewards Paid",
    description: "Total referral bonuses paid out in the selected period. Native asset + display equivalent.",
    badge: { label: "Ledger-backed", color: "purple" as const },
    endpoint: "/api/ops/referral-rewards",
    field: "referral_rewards_paid_gbp",
    color: C.purple,
    colorFaint: "rgba(168,85,247,0.08)",
    colorBorder: "rgba(168,85,247,0.18)",
  },
];

export function OperationsSection() {
  return (
    <div style={{ padding: "20px 24px 0" }}>
      <SectionHeader
        icon="📊"
        title="Operations & Growth"
        subtitle="User activity and growth metrics — separate from finance and treasury"
        accent={C.purple}
        tag="NOT BALANCES"
      />

      {/* Distinction banner */}
      <div
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          background: "rgba(168,85,247,0.05)",
          border: "1px solid rgba(168,85,247,0.2)",
          marginBottom: 16,
          fontSize: 12,
          color: C.textDim,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <AlertTriangle size={13} color={C.purple} />
        <span>
          <strong style={{ color: C.purple }}>Operations cards show user activity counts only.</strong>{" "}
          These figures are NOT balances, fees, or financial amounts. Do not confuse with Treasury section above.
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {OPS_CARDS.map((card) => (
          <div
            key={card.id}
            style={{
              background: "rgba(7,19,39,0.9)",
              backdropFilter: "blur(14px)",
              border: `1px solid ${card.colorBorder}`,
              borderRadius: 12,
              padding: 18,
              boxShadow: `0 0 18px ${card.colorFaint}`,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: card.colorFaint,
                  border: `1px solid ${card.colorBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
              <SourceBadge label={card.badge.label} color={card.badge.color} />
            </div>

            {/* Title */}
            <div style={{ color: C.textDim, fontSize: 11, fontWeight: 600, marginBottom: 8 }}>{card.title}</div>

            {/* Value — unavailable */}
            <div
              style={{
                color: C.textMuted,
                fontSize: 26,
                fontWeight: 800,
                fontFamily: "monospace",
                letterSpacing: "-1px",
                marginBottom: 4,
              }}
            >
              —
            </div>
            <div style={{ color: C.textMuted, fontSize: 10, fontFamily: "monospace", marginBottom: 8 }}>
              Unavailable
            </div>

            {/* Description */}
            <div style={{ color: C.textMuted, fontSize: 10, lineHeight: 1.5, marginBottom: 10 }}>
              {card.description}
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
          </div>
        ))}
      </div>
    </div>
  );
}
