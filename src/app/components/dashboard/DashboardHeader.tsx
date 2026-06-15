import React, { useState } from "react";
import { C } from "./tokens";
import { SecondaryBtn, GhostBtn } from "./Primitives";
import { CoinHubXLogo } from "./CoinHubXLogo";
import {
  Wallet,
  Droplets,
  ArrowUpFromLine,
  BarChart3,
  BookOpen,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const DATE_RANGES = ["Today", "7D", "10D", "30D", "90D", "Custom"];
const CURRENCIES = ["GBP", "USD", "EUR", "AED", "NGN", "GHS"];

interface Props {
  onOpenDrawer?: (type: string) => void;
}

export function DashboardHeader({ onOpenDrawer }: Props) {
  const [activeRange, setActiveRange] = useState("30D");
  const [currency, setCurrency] = useState("GBP");
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div
      style={{
        background: "rgba(5,16,24,0.98)",
        borderBottom: `1px solid ${C.cyanBorder}`,
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0 24px",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 16,
          paddingBottom: 12,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Title block */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <CoinHubXLogo size={38} showWordmark={false} />
          <div style={{ width: 1, height: 36, background: C.cyanBorder }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: C.text,
                  fontSize: 17,
                  fontWeight: 800,
                  letterSpacing: "-0.3px",
                }}
              >
                Business Dashboard
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: "rgba(168,85,247,0.12)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  color: C.purple,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                <ShieldCheck size={9} />
                STAFF ONLY
              </span>
            </div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 1 }}>
              Staff-only treasury, finance, liquidity and operational intelligence
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <SecondaryBtn small onClick={() => onOpenDrawer?.("treasury")}>
            <Wallet size={12} />
            Open Treasury
          </SecondaryBtn>
          <SecondaryBtn small onClick={() => onOpenDrawer?.("liquidity")}>
            <Droplets size={12} />
            Open Liquidity
          </SecondaryBtn>
          <SecondaryBtn small onClick={() => onOpenDrawer?.("withdrawals")}>
            <ArrowUpFromLine size={12} />
            Open Withdrawals
          </SecondaryBtn>
          <SecondaryBtn small onClick={() => onOpenDrawer?.("analytics")}>
            <BarChart3 size={12} />
            Open Analytics
          </SecondaryBtn>
          <GhostBtn small onClick={() => onOpenDrawer?.("explanation")}>
            <BookOpen size={11} />
            Read Dashboard Explanation
          </GhostBtn>
        </div>
      </div>

      {/* Bottom row — date range + currency */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingBottom: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Date range pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: 3,
          }}
        >
          {DATE_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                background: activeRange === r
                  ? "linear-gradient(135deg, rgba(0,240,255,0.2) 0%, rgba(10,132,255,0.2) 100%)"
                  : "transparent",
                border: activeRange === r ? `1px solid ${C.cyanBorder}` : "1px solid transparent",
                color: activeRange === r ? C.cyan : C.textMuted,
                fontSize: 11,
                fontWeight: activeRange === r ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Currency selector */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setCurrencyOpen(!currencyOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 8,
              background: "rgba(0,240,255,0.05)",
              border: `1px solid ${C.cyanBorder}`,
              color: C.cyan,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#00F0FF,#0A84FF)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                color: "#020618",
                fontWeight: 900,
              }}
            >
              £
            </span>
            {currency}
            <ChevronDown size={10} />
          </button>
          {currencyOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                background: "#0A1929",
                border: `1px solid ${C.cyanBorder}`,
                borderRadius: 8,
                padding: 4,
                zIndex: 200,
                minWidth: 100,
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: currency === c ? "rgba(0,240,255,0.1)" : "transparent",
                    color: currency === c ? C.cyan : C.textDim,
                    fontSize: 12,
                    fontWeight: currency === c ? 700 : 500,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ color: C.textMuted, fontSize: 10, marginLeft: "auto" }}>
          All values show native asset backing. Display currency (
          <span style={{ color: C.cyan }}>{currency}</span>) is for reference only — not literal cash.
        </div>
      </div>
    </div>
  );
}
