import React from "react";
import { C } from "./tokens";
import { PrimaryBtn, SecondaryBtn } from "./Primitives";
import { Loader2, WifiOff, ShieldX, RefreshCw, Home, BookOpen } from "lucide-react";

// ── Loading State ─────────────────────────────────────────────────────────────
export function LoadingState() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 48,
      }}
    >
      {/* Animated logo mark */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid ${C.cyanBorder}`,
            animation: "spin 3s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: `2px solid rgba(168,85,247,0.3)`,
            animation: "spin 2s linear infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader2
            size={28}
            color={C.cyan}
            style={{ animation: "spin 1s linear infinite" }}
          />
        </div>
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          Loading Dashboard
        </div>
        <div style={{ color: C.textMuted, fontSize: 12, maxWidth: 360, lineHeight: 1.6 }}>
          Fetching treasury, liquidity, and operational data from backend endpoints.
          This may take a moment.
        </div>
      </div>

      {/* Loading bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
        {[
          { label: "Treasury endpoints", pct: 85, color: C.cyan },
          { label: "Liquidity service", pct: 60, color: C.purple },
          { label: "Operations data", pct: 40, color: C.success },
          { label: "IP intelligence", pct: 20, color: C.warning },
        ].map((item) => (
          <div key={item.label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span style={{ color: C.textMuted, fontSize: 10 }}>{item.label}</span>
              <span style={{ color: item.color, fontSize: 10, fontFamily: "monospace" }}>
                {item.pct}%
              </span>
            </div>
            <div
              style={{
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${item.pct}%`,
                  borderRadius: 2,
                  background: item.color,
                  boxShadow: `0 0 6px ${item.color}60`,
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ color: C.textMuted, fontSize: 10, fontFamily: "monospace" }}>
        staff-dashboard v2.0 · CoinHubX Internal
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Data Unavailable State ────────────────────────────────────────────────────
export function DataUnavailableState() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 48,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(245,158,11,0.08)",
          border: `2px solid ${C.warningBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 24px rgba(245,158,11,0.15)",
        }}
      >
        <WifiOff size={32} color={C.warning} />
      </div>

      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div style={{ color: C.text, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          Data Unavailable
        </div>
        <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
          One or more backend endpoints are not returning data. This is expected if the relevant
          endpoints have not yet been connected.
        </div>
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: "rgba(245,158,11,0.06)",
            border: `1px solid ${C.warningBorder}`,
            textAlign: "left",
            marginBottom: 20,
          }}
        >
          <div style={{ color: C.warning, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
            Affected endpoints:
          </div>
          {[
            "/api/treasury/withdrawable-fee-profit",
            "/api/treasury/position",
            "/api/liquidity/status",
            "/api/ops/active-users",
          ].map((ep) => (
            <div
              key={ep}
              style={{
                color: C.textMuted,
                fontSize: 10,
                fontFamily: "monospace",
                padding: "3px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {ep} — <span style={{ color: C.warning }}>503 / not wired</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <PrimaryBtn onClick={() => window.location.reload()}>
          <RefreshCw size={13} /> Retry
        </PrimaryBtn>
        <SecondaryBtn>
          <BookOpen size={13} /> Read Dashboard Explanation
        </SecondaryBtn>
      </div>

      <div style={{ color: C.textMuted, fontSize: 10 }}>
        Values will populate automatically once endpoints are connected.
        Do not refresh repeatedly — this will not force data that does not exist.
      </div>
    </div>
  );
}

// ── Permission Denied State ───────────────────────────────────────────────────
export function PermissionDeniedState() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 48,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(239,68,68,0.08)",
          border: `2px solid ${C.criticalBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 24px rgba(239,68,68,0.2)",
        }}
      >
        <ShieldX size={32} color={C.critical} />
      </div>

      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div style={{ color: C.critical, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          Permission Denied
        </div>
        <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
          You do not have the required staff role to view this dashboard. This page is restricted
          to authorised internal staff only.
        </div>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: 10,
            background: "rgba(239,68,68,0.06)",
            border: `1px solid ${C.criticalBorder}`,
            marginBottom: 20,
          }}
        >
          <div style={{ color: C.textDim, fontSize: 12, lineHeight: 1.6 }}>
            <div style={{ marginBottom: 6 }}>
              <span style={{ color: C.textMuted }}>Required role: </span>
              <span
                style={{
                  padding: "1px 8px",
                  borderRadius: 4,
                  background: "rgba(239,68,68,0.12)",
                  color: C.critical,
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                STAFF / ADMIN
              </span>
            </div>
            <div>
              <span style={{ color: C.textMuted }}>Your role: </span>
              <span
                style={{
                  padding: "1px 8px",
                  borderRadius: 4,
                  background: "rgba(100,116,139,0.12)",
                  color: C.textDim,
                  fontSize: 11,
                  fontFamily: "monospace",
                }}
              >
                USER
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            background: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.2)",
            color: C.textMuted,
            fontSize: 11,
            lineHeight: 1.5,
            textAlign: "left",
          }}
        >
          If you believe you should have access, contact your system administrator.
          Do not attempt to bypass this restriction — all access attempts are logged.
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <SecondaryBtn onClick={() => {}}>
          <Home size={13} /> Return to Dashboard Home
        </SecondaryBtn>
      </div>

      <div
        style={{
          color: C.textMuted,
          fontSize: 9,
          fontFamily: "monospace",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span style={{ color: C.critical }}>●</span>
        Access attempt logged · {new Date().toISOString()}
      </div>
    </div>
  );
}
