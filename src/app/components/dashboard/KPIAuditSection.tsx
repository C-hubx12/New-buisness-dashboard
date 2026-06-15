import React, { useState } from "react";
import { C } from "./tokens";
import { SectionHeader } from "./Primitives";
import { ChevronDown, ChevronRight } from "lucide-react";

interface AuditRow {
  card: string;
  endpoint: string;
  field: string;
  meaning: string;
  nativeOrDisplay: string;
  staffNote: string;
}

const AUDIT_ROWS: AuditRow[] = [
  {
    card: "Withdrawable Fee Profit",
    endpoint: "/api/treasury/withdrawable-fee-profit",
    field: "withdrawable_fee_gbp",
    meaning: "Total platform fee income accumulated and not yet withdrawn",
    nativeOrDisplay: "Native GBP (not display equivalent)",
    staffNote: "This is platform profit only. Never touches customer funds.",
  },
  {
    card: "Platform Treasury Position",
    endpoint: "/api/treasury/position",
    field: "treasury_total_gbp_equivalent",
    meaning: "Sum of all platform-owned assets converted to GBP for display",
    nativeOrDisplay: "Display equivalent — native backing shown per asset",
    staffNote: "Excludes all customer balances. Platform capital only.",
  },
  {
    card: "Native GBP Cash Only",
    endpoint: "/api/treasury/gbp-cash",
    field: "gbp_cash_balance",
    meaning: "Liquid GBP sitting in platform bank accounts",
    nativeOrDisplay: "Native GBP (actual bank balance)",
    staffNote: "No crypto conversion. Actual liquid GBP only.",
  },
  {
    card: "Treasury Crypto Value",
    endpoint: "/api/treasury/crypto-value",
    field: "crypto_value_gbp_live",
    meaning: "Platform crypto holdings valued at live market rates",
    nativeOrDisplay: "Display equivalent — volatile, changes with market",
    staffNote: "Not cash. Value fluctuates. Native chain balances shown separately.",
  },
  {
    card: "Fee Percentage Assurance",
    endpoint: "/api/treasury/fee-assurance",
    field: "fee_percent_verified",
    meaning: "Confirms configured fee % matches actual fee deducted in ledger",
    nativeOrDisplay: "Percentage — not a balance",
    staffNote: "Audit check only. Not a financial amount.",
  },
  {
    card: "Liquidity Status",
    endpoint: "/api/liquidity/status",
    field: "status_flag",
    meaning: "Healthy / Low / Critical flag from liquidity service",
    nativeOrDisplay: "Status enum — not a balance",
    staffNote: "Drives the liquidity warning section colour and alert.",
  },
  {
    card: "Available USDT",
    endpoint: "/api/liquidity/available",
    field: "available_usdt",
    meaning: "USDT in platform liquidity pool available for P2P trades",
    nativeOrDisplay: "Native USDT (on-chain)",
    staffNote: "Not customer USDT. Platform liquidity pool only.",
  },
  {
    card: "Active Users",
    endpoint: "/api/ops/active-users",
    field: "active_user_count",
    meaning: "Users with at least one session in the selected date range",
    nativeOrDisplay: "Count — not a balance",
    staffNote: "Activity count only. No financial meaning.",
  },
  {
    card: "New Signups",
    endpoint: "/api/ops/new-signups",
    field: "new_signup_count",
    meaning: "New accounts registered within the selected date range",
    nativeOrDisplay: "Count — not a balance",
    staffNote: "Growth metric. No financial meaning.",
  },
  {
    card: "Suspicious Signup IPs",
    endpoint: "/api/ops/suspicious-ips",
    field: "suspicious_ip_count",
    meaning: "IPs flagged by risk engine as VPN, Tor, datacenter, or high-risk",
    nativeOrDisplay: "Count — not a balance",
    staffNote: "Risk signal only. Triggers manual review.",
  },
  {
    card: "Referral Rewards Paid",
    endpoint: "/api/ops/referral-rewards",
    field: "referral_rewards_paid_gbp",
    meaning: "Total referral bonuses paid out from platform reward budget",
    nativeOrDisplay: "Native GBP equivalent from ledger",
    staffNote: "Platform cost, not customer balance or treasury position.",
  },
  {
    card: "Ledger Compliance",
    endpoint: "/api/ledger/compliance",
    field: "compliance_ok",
    meaning: "Boolean: all ledger entries balance (debit = credit)",
    nativeOrDisplay: "Boolean status — not a balance",
    staffNote: "Must always be true. Red = critical incident.",
  },
  {
    card: "Liquidity Reconciliation",
    endpoint: "/api/liquidity/reconciliation",
    field: "reconciliation_ok",
    meaning: "On-chain balance matches ledger balance within tolerance",
    nativeOrDisplay: "Boolean status — not a balance",
    staffNote: "Discrepancy here needs immediate investigation.",
  },
];

export function KPIAuditSection() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div style={{ padding: "20px 24px 0" }}>
      {/* Collapsible header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
          background: "rgba(168,85,247,0.06)",
          border: `1px solid rgba(168,85,247,0.2)`,
          borderRadius: collapsed ? 12 : "12px 12px 0 0",
          padding: "14px 18px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(168,85,247,0.1)",
            border: "1px solid rgba(168,85,247,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          🔎
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>
              KPI Truth Audit
            </span>
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
              }}
            >
              INTERNAL STAFF TABLE
            </span>
          </div>
          <div style={{ color: C.textMuted, fontSize: 11, marginTop: 1 }}>
            Proves every dashboard card maps to a real backend field — not invented data
          </div>
        </div>
        {collapsed
          ? <ChevronRight size={16} color={C.textMuted} />
          : <ChevronDown size={16} color={C.cyan} />}
      </button>

      {!collapsed && (
        <div
          style={{
            background: "rgba(7,19,39,0.9)",
            border: `1px solid rgba(168,85,247,0.2)`,
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.6fr 1.4fr 1.8fr 1.4fr 1.8fr",
              padding: "10px 16px",
              background: "rgba(168,85,247,0.06)",
              borderBottom: `1px solid rgba(168,85,247,0.15)`,
              gap: 8,
            }}
          >
            {[
              "UI Card",
              "Endpoint",
              "Field Used",
              "Meaning",
              "Native or Display",
              "Staff Interpretation",
            ].map((h) => (
              <div
                key={h}
                style={{
                  color: C.purple,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {AUDIT_ROWS.map((row, i) => (
            <div
              key={row.card}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.6fr 1.4fr 1.8fr 1.4fr 1.8fr",
                padding: "11px 16px",
                borderBottom:
                  i < AUDIT_ROWS.length - 1
                    ? `1px solid rgba(255,255,255,0.04)`
                    : "none",
                gap: 8,
                alignItems: "start",
                background:
                  i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              }}
            >
              <div style={{ color: C.text, fontSize: 11, fontWeight: 600 }}>
                {row.card}
              </div>
              <div
                style={{
                  color: C.cyan,
                  fontSize: 9,
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {row.endpoint}
              </div>
              <div
                style={{
                  color: C.textDim,
                  fontSize: 9,
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {row.field}
              </div>
              <div style={{ color: C.textMuted, fontSize: 10, lineHeight: 1.5 }}>
                {row.meaning}
              </div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: row.nativeOrDisplay.includes("Native")
                      ? "rgba(34,197,94,0.1)"
                      : row.nativeOrDisplay.includes("Display")
                      ? "rgba(168,85,247,0.1)"
                      : "rgba(100,116,139,0.1)",
                    color: row.nativeOrDisplay.includes("Native")
                      ? C.success
                      : row.nativeOrDisplay.includes("Display")
                      ? C.purple
                      : C.textDim,
                    fontSize: 9,
                    fontWeight: 600,
                  }}
                >
                  {row.nativeOrDisplay}
                </span>
              </div>
              <div style={{ color: C.textMuted, fontSize: 10, lineHeight: 1.5, fontStyle: "italic" }}>
                {row.staffNote}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div
            style={{
              padding: "10px 16px",
              borderTop: `1px solid rgba(168,85,247,0.15)`,
              background: "rgba(168,85,247,0.04)",
              color: C.textMuted,
              fontSize: 9,
            }}
          >
            All endpoints listed as "future backend requirement" are not yet connected. Cards show
            "Unavailable" state until endpoints are wired. This table is the single source of truth
            for what each UI card means and where its data comes from.
          </div>
        </div>
      )}
    </div>
  );
}
