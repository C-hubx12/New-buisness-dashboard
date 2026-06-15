import React, { useState } from "react";
import { C } from "./tokens";
import { GlassCard, SectionHeader, SourceBadge, BigValue, SecondaryBtn, GhostBtn, Divider } from "./Primitives";
import { X, TrendingUp, DollarSign, Coins, Percent, ChevronRight, Info } from "lucide-react";

interface FinanceCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: { label: string; color: "cyan" | "purple" | "green" | "amber" };
  native?: string;
  nativeLabel?: string;
  display?: string;
  displayLabel?: string;
  unavailable?: boolean;
  disclaimer?: string;
  endpoint: string;
  field: string;
}

const FINANCE_CARDS: FinanceCard[] = [
  {
    id: "fee-profit",
    icon: <TrendingUp size={16} color={C.cyan} />,
    title: "Withdrawable Fee Profit",
    description: "Platform fee income available to withdraw. This is PLATFORM profit only — not customer funds.",
    badge: { label: "Ledger-backed", color: "cyan" },
    native: "£ — Unavailable",
    nativeLabel: "GBP native balance",
    display: undefined,
    displayLabel: "GBP display",
    unavailable: true,
    disclaimer: "⚠ Requires backend endpoint: /api/treasury/withdrawable-fee-profit",
    endpoint: "/api/treasury/withdrawable-fee-profit",
    field: "withdrawable_fee_gbp",
  },
  {
    id: "treasury-position",
    icon: <DollarSign size={16} color={C.purple} />,
    title: "Platform Treasury Position",
    description: "Total platform-owned treasury. Excludes all customer balances. Platform operational capital only.",
    badge: { label: "Ledger-backed", color: "purple" },
    native: "— Unavailable",
    nativeLabel: "Multi-asset native",
    display: undefined,
    displayLabel: "GBP equivalent",
    unavailable: true,
    disclaimer: "⚠ Requires backend endpoint: /api/treasury/position",
    endpoint: "/api/treasury/position",
    field: "treasury_total_gbp_equivalent",
  },
  {
    id: "gbp-cash",
    icon: <span style={{ fontSize: 14, color: C.cyan }}>£</span>,
    title: "Native GBP Cash Only",
    description: "Liquid GBP held in platform bank accounts. Excludes crypto holdings entirely.",
    badge: { label: "Live endpoint", color: "green" },
    native: "— Unavailable",
    nativeLabel: "GBP bank balance",
    unavailable: true,
    disclaimer: "⚠ Requires bank API integration or manual sync",
    endpoint: "/api/treasury/gbp-cash",
    field: "gbp_cash_balance",
  },
  {
    id: "crypto-value",
    icon: <Coins size={16} color={C.warning} />,
    title: "Treasury Crypto Value",
    description: "Total crypto assets held in platform treasury wallets. Valued at live market rates. Volatile.",
    badge: { label: "Live endpoint", color: "amber" },
    native: "— Unavailable",
    nativeLabel: "Multi-chain native",
    display: undefined,
    displayLabel: "GBP at live rate",
    unavailable: true,
    disclaimer: "⚠ Requires live price feed + on-chain balance sync",
    endpoint: "/api/treasury/crypto-value",
    field: "crypto_value_gbp_live",
  },
  {
    id: "fee-assurance",
    icon: <Percent size={16} color={C.success} />,
    title: "Fee Percentage Assurance",
    description: "Confirms fee % applied to trades matches configured rate. Ledger-verified.",
    badge: { label: "Ledger-backed", color: "green" },
    native: "— Unavailable",
    nativeLabel: "Fee % from ledger",
    unavailable: true,
    disclaimer: "⚠ Requires ledger audit endpoint",
    endpoint: "/api/treasury/fee-assurance",
    field: "fee_percent_verified",
  },
];

// ── Treasury Breakdown Drawer ─────────────────────────────────────────────────
export function TreasuryDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
      }}
    >
      <div
        style={{ flex: 1, background: "rgba(2,6,24,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        style={{
          width: 480,
          background: "#071327",
          borderLeft: `1px solid ${C.cyanBorder}`,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,240,255,0.08)",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0,240,255,0.03)",
          }}
        >
          <div>
            <div style={{ color: C.cyan, fontSize: 16, fontWeight: 800 }}>Treasury Breakdown</div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
              Platform-owned treasury only. Not customer balances.
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Disclaimer banner */}
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
              color: C.purple,
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            <strong>Important:</strong> Treasury is platform capital only. Customer wallets and balances are
            entirely separate and are never included here.
          </div>

          {/* Line items */}
          {[
            { label: "GBP Cash (Bank)", value: "— Unavailable", note: "Ledger-backed", endpoint: "/api/treasury/gbp-cash" },
            { label: "USDT Treasury Wallet", value: "— Unavailable", note: "On-chain", endpoint: "/api/treasury/usdt" },
            { label: "BTC Treasury Wallet", value: "— Unavailable", note: "On-chain", endpoint: "/api/treasury/btc" },
            { label: "ETH Treasury Wallet", value: "— Unavailable", note: "On-chain", endpoint: "/api/treasury/eth" },
            { label: "Accumulated Fee Profit", value: "— Unavailable", note: "Ledger-backed", endpoint: "/api/treasury/fees" },
            { label: "Operational Reserve", value: "— Unavailable", note: "Ledger-backed", endpoint: "/api/treasury/reserve" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: C.textMuted, fontSize: 10, marginTop: 2, fontFamily: "monospace" }}>
                  {item.endpoint}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: C.textMuted, fontSize: 14, fontFamily: "monospace" }}>{item.value}</div>
                <div style={{ color: C.textMuted, fontSize: 10, marginTop: 1 }}>{item.note}</div>
              </div>
            </div>
          ))}

          <Divider />

          <div
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              background: "rgba(0,240,255,0.04)",
              border: `1px solid ${C.cyanBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: C.cyan, fontSize: 14, fontWeight: 700 }}>Total Treasury</span>
            <span style={{ color: C.textMuted, fontSize: 16, fontFamily: "monospace", fontWeight: 700 }}>
              — Unavailable
            </span>
          </div>

          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: C.warning,
              fontSize: 11,
            }}
          >
            ⚠ <strong>Future backend requirement:</strong> Treasury aggregation endpoint needed to populate live values.
            All lines currently show "Unavailable" to prevent display of incorrect or zero figures.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Fee Breakdown Drawer ───────────────────────────────────────────────────────
export function FeeDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex" }}>
      <div
        style={{ flex: 1, background: "rgba(2,6,24,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        style={{
          width: 480,
          background: "#071327",
          borderLeft: `1px solid ${C.cyanBorder}`,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,240,255,0.08)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0,240,255,0.03)",
          }}
        >
          <div>
            <div style={{ color: C.cyan, fontSize: 16, fontWeight: 800 }}>Withdrawable Fee Breakdown</div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
              Platform fee profit only. This is NOT customer money.
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: C.success,
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            <strong>Fee profit</strong> is earned from platform trading fees. It is platform revenue, separate from
            any customer deposit or balance.
          </div>

          {[
            { label: "P2P Trade Fees (GBP)", value: "— Unavailable", note: "ledger.fees.p2p_gbp" },
            { label: "P2P Trade Fees (USDT)", value: "— Unavailable", note: "ledger.fees.p2p_usdt" },
            { label: "Conversion Fees", value: "— Unavailable", note: "ledger.fees.conversion" },
            { label: "Withdrawal Fees", value: "— Unavailable", note: "ledger.fees.withdrawal" },
            { label: "Commission Retained", value: "— Unavailable", note: "ledger.commission.retained" },
            { label: "Already Withdrawn", value: "— Unavailable", note: "ledger.fees.withdrawn" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: C.textMuted, fontSize: 10, marginTop: 2, fontFamily: "monospace" }}>{item.note}</div>
              </div>
              <div style={{ color: C.textMuted, fontSize: 14, fontFamily: "monospace" }}>{item.value}</div>
            </div>
          ))}

          <Divider />

          <div
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              background: "rgba(0,240,255,0.04)",
              border: `1px solid ${C.cyanBorder}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: C.cyan, fontSize: 14, fontWeight: 700 }}>Total Withdrawable</span>
            <span style={{ color: C.textMuted, fontSize: 16, fontFamily: "monospace", fontWeight: 700 }}>— Unavailable</span>
          </div>

          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: C.warning,
              fontSize: 11,
            }}
          >
            ⚠ <strong>Future backend requirement:</strong> Fee aggregation endpoint must sum all fee ledger entries by
            type and subtract already-withdrawn amounts.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Treasury Section (main) ───────────────────────────────────────────────────
export function TreasurySection({
  onOpenTreasuryDrawer,
  onOpenFeeDrawer,
}: {
  onOpenTreasuryDrawer: () => void;
  onOpenFeeDrawer: () => void;
}) {
  return (
    <div style={{ padding: "20px 24px 0" }}>
      <SectionHeader
        icon="🏦"
        title="Treasury & Finance"
        subtitle="Platform-owned capital only — excludes all customer balances"
        accent={C.cyan}
        tag="LEDGER-BACKED"
      />

      {/* Important notice banner */}
      <div
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          background: "rgba(0,240,255,0.04)",
          border: `1px solid ${C.cyanBorder}`,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 12,
          color: C.textDim,
        }}
      >
        <Info size={14} color={C.cyan} style={{ flexShrink: 0 }} />
        <span>
          <strong style={{ color: C.cyan }}>Treasury</strong> = platform operational capital only.{" "}
          <strong style={{ color: C.cyan }}>Fee Profit</strong> = platform earned fees only. Neither includes
          customer deposits, customer wallets, or customer trade balances.
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {FINANCE_CARDS.map((card) => (
          <GlassCard key={card.id} glow="cyan">
            <div style={{ padding: 20 }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "rgba(0,240,255,0.08)",
                      border: `1px solid ${C.cyanBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </div>
                  <span style={{ color: C.textDim, fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
                    {card.title}
                  </span>
                </div>
                <SourceBadge label={card.badge.label} color={card.badge.color} />
              </div>

              {/* Value */}
              <BigValue
                native={card.native}
                nativeLabel={card.nativeLabel}
                display={card.display}
                displayLabel={card.displayLabel}
                unavailable={card.unavailable}
              />

              {/* Description */}
              <p style={{ color: C.textMuted, fontSize: 11, marginTop: 10, lineHeight: 1.5, marginBottom: 12 }}>
                {card.description}
              </p>

              {/* Disclaimer */}
              {card.disclaimer && (
                <div
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: "rgba(245,158,11,0.07)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    color: C.warning,
                    fontSize: 10,
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {card.disclaimer}
                </div>
              )}

              {/* Action */}
              <button
                onClick={card.id === "treasury-position" ? onOpenTreasuryDrawer : card.id === "fee-profit" ? onOpenFeeDrawer : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "5px 10px",
                  borderRadius: 6,
                  background: "rgba(0,240,255,0.06)",
                  border: `1px solid ${C.cyanBorder}`,
                  color: C.cyan,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View breakdown <ChevronRight size={10} />
              </button>

              {/* Endpoint footnote */}
              <div style={{ marginTop: 8, color: C.textMuted, fontSize: 9, fontFamily: "monospace" }}>
                {card.endpoint} → {card.field}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
