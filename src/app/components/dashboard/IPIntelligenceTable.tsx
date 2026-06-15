import React, { useState } from "react";
import { C } from "./tokens";
import { SectionHeader, Tag, GhostBtn, SecondaryBtn } from "./Primitives";
import { ChevronDown, ChevronRight, Copy, Search, Eye, Shield, User, X } from "lucide-react";

interface IPRow {
  id: string;
  email: string;
  name: string;
  signupTime: string;
  ip: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  os: string;
  referralCode: string;
  riskScore: number;
  riskFlags: string[];
  failedLogins: number;
}

const MOCK_ROWS: IPRow[] = [
  {
    id: "u1",
    email: "j.obi***@gmail.com",
    name: "J. Obi***",
    signupTime: "2024-01-15 14:32 UTC",
    ip: "102.89.*.***",
    country: "Nigeria",
    city: "Lagos",
    device: "Mobile",
    browser: "Chrome",
    os: "Android",
    referralCode: "REF-4429",
    riskScore: 72,
    riskFlags: ["VPN detected", "High-risk country"],
    failedLogins: 3,
  },
  {
    id: "u2",
    email: "a.smith***@outlook.com",
    name: "A. Smith***",
    signupTime: "2024-01-15 13:11 UTC",
    ip: "86.12.*.***",
    country: "United Kingdom",
    city: "London",
    device: "Desktop",
    browser: "Firefox",
    os: "Windows",
    referralCode: "REF-0031",
    riskScore: 12,
    riskFlags: [],
    failedLogins: 0,
  },
  {
    id: "u3",
    email: "k.diaw***@yahoo.com",
    name: "K. Diaw***",
    signupTime: "2024-01-15 11:44 UTC",
    ip: "197.211.*.***",
    country: "Ghana",
    city: "Accra",
    device: "Mobile",
    browser: "Safari",
    os: "iOS",
    referralCode: "—",
    riskScore: 48,
    riskFlags: ["Datacenter IP"],
    failedLogins: 1,
  },
  {
    id: "u4",
    email: "m.ali***@proton.me",
    name: "M. Ali***",
    signupTime: "2024-01-15 09:02 UTC",
    ip: "185.220.*.***",
    country: "Unknown",
    city: "Unknown",
    device: "Desktop",
    browser: "Tor Browser",
    os: "Linux",
    referralCode: "REF-7791",
    riskScore: 97,
    riskFlags: ["Tor exit node", "Anonymising proxy", "Multiple signups same IP"],
    failedLogins: 7,
  },
];

function riskColor(score: number) {
  if (score >= 70) return C.critical;
  if (score >= 40) return C.warning;
  return C.success;
}

function riskBg(score: number) {
  if (score >= 70) return "rgba(239,68,68,0.12)";
  if (score >= 40) return "rgba(245,158,11,0.10)";
  return "rgba(34,197,94,0.10)";
}

// ── User/IP Investigation Drawer ──────────────────────────────────────────────
export function UserIPDrawer({ row, onClose }: { row: IPRow; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex" }}>
      <div
        style={{ flex: 1, background: "rgba(2,6,24,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        style={{
          width: 520,
          background: "#071327",
          borderLeft: `1px solid ${C.cyanBorder}`,
          overflowY: "auto",
          boxShadow: "-8px 0 40px rgba(0,240,255,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(239,68,68,0.04)",
            position: "sticky",
            top: 0,
          }}
        >
          <div>
            <div style={{ color: C.cyan, fontSize: 15, fontWeight: 800 }}>User / IP Investigation</div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
              {row.email} — {row.ip}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Risk Score Banner */}
          <div
            style={{
              padding: "14px 18px",
              borderRadius: 10,
              background: riskBg(row.riskScore),
              border: `1px solid ${riskColor(row.riskScore)}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ color: C.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Risk Score</div>
              <div style={{ color: riskColor(row.riskScore), fontSize: 32, fontWeight: 900, fontFamily: "monospace", lineHeight: 1.1 }}>
                {row.riskScore}<span style={{ fontSize: 14 }}>/100</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              {row.riskFlags.map((flag) => (
                <Tag key={flag} label={flag} color={row.riskScore >= 70 ? "red" : "amber"} />
              ))}
              {row.riskFlags.length === 0 && <Tag label="No flags" color="green" />}
            </div>
          </div>

          {/* Identity */}
          <Section title="Identity" icon={<User size={13} color={C.cyan} />}>
            <Row label="Email (masked)" value={row.email} />
            <Row label="Display name (masked)" value={row.name} />
            <Row label="Signup time" value={row.signupTime} />
            <Row label="Referral code" value={row.referralCode} />
          </Section>

          {/* Network */}
          <Section title="Network Intelligence" icon={<Shield size={13} color={C.purple} />}>
            <Row label="IP address (masked)" value={row.ip} />
            <Row label="Country" value={row.country} />
            <Row label="City" value={row.city} />
            <Row label="Failed logins (same IP)" value={String(row.failedLogins)} highlight={row.failedLogins > 2} />
          </Section>

          {/* Device */}
          <Section title="Device & Browser" icon={<Eye size={13} color={C.cyan} />}>
            <Row label="Device type" value={row.device} />
            <Row label="Browser" value={row.browser} highlight={row.browser === "Tor Browser"} />
            <Row label="OS" value={row.os} />
          </Section>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SecondaryBtn onClick={() => {}}>
              <User size={12} /> Open Full User Profile
            </SecondaryBtn>
            <SecondaryBtn onClick={() => {}}>
              <Copy size={12} /> Copy IP Address
            </SecondaryBtn>
            <SecondaryBtn onClick={() => {}}>
              <Search size={12} /> Search All Signups from this IP
            </SecondaryBtn>
            <SecondaryBtn onClick={() => {}}>
              <Shield size={12} /> View Security Events
            </SecondaryBtn>
          </div>

          <div
            style={{
              padding: 10,
              borderRadius: 8,
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: C.warning,
              fontSize: 10,
            }}
          >
            ⚠ All data sourced from <code style={{ fontFamily: "monospace" }}>/api/ops/signup-ip-intelligence</code>.
            Email and IP are masked in-UI. Full data accessible via admin audit log only.
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 10,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${C.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          background: "rgba(0,240,255,0.04)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: C.textDim,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {icon} {title}
      </div>
      <div style={{ padding: "4px 0" }}>{children}</div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "7px 14px",
        borderBottom: `1px solid rgba(255,255,255,0.03)`,
      }}
    >
      <span style={{ color: C.textMuted, fontSize: 11 }}>{label}</span>
      <span
        style={{
          color: highlight ? C.critical : C.textDim,
          fontSize: 11,
          fontFamily: "monospace",
          fontWeight: highlight ? 700 : 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── IP Intelligence Table (main section) ──────────────────────────────────────
export function IPIntelligenceTable({ expandedMode }: { expandedMode?: boolean }) {
  const [expandedRow, setExpandedRow] = useState<string | null>(expandedMode ? "u4" : null);
  const [drawerRow, setDrawerRow] = useState<IPRow | null>(null);

  return (
    <>
      {drawerRow && <UserIPDrawer row={drawerRow} onClose={() => setDrawerRow(null)} />}

      <div style={{ padding: "20px 24px 0" }}>
        <SectionHeader
          icon="🔍"
          title="Signup / IP Intelligence"
          subtitle="Security and risk analysis for recent signups — sourced from /api/ops/signup-ip-intelligence"
          accent={C.warning}
          tag="RISK ENGINE"
        />

        <div
          style={{
            borderRadius: 12,
            border: `1px solid ${C.cyanBorder}`,
            background: "rgba(7,19,39,0.9)",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1.2fr 1.1fr 0.9fr 0.9fr 0.8fr 0.8fr 0.8fr 0.7fr 1fr",
              padding: "10px 16px",
              background: "rgba(0,240,255,0.04)",
              borderBottom: `1px solid ${C.border}`,
              gap: 8,
            }}
          >
            {["User", "Signup Time", "IP (masked)", "Location", "Device", "Browser", "OS", "Ref Code", "Risk", "Actions"].map((h) => (
              <div key={h} style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {MOCK_ROWS.map((row) => {
            const isExpanded = expandedRow === row.id;
            const rc = riskColor(row.riskScore);
            const rb = riskBg(row.riskScore);
            return (
              <div key={row.id}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.8fr 1.2fr 1.1fr 0.9fr 0.9fr 0.8fr 0.8fr 0.8fr 0.7fr 1fr",
                    padding: "12px 16px",
                    borderBottom: `1px solid ${isExpanded ? C.cyanBorder : "rgba(255,255,255,0.04)"}`,
                    gap: 8,
                    alignItems: "center",
                    background: isExpanded ? "rgba(0,240,255,0.04)" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onClick={() => setExpandedRow(isExpanded ? null : row.id)}
                >
                  <div>
                    <div style={{ color: C.text, fontSize: 11, fontWeight: 600 }}>{row.email}</div>
                    <div style={{ color: C.textMuted, fontSize: 9, marginTop: 1 }}>{row.name}</div>
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 10, fontFamily: "monospace" }}>{row.signupTime}</div>
                  <div style={{ color: C.cyan, fontSize: 10, fontFamily: "monospace" }}>{row.ip}</div>
                  <div>
                    <div style={{ color: C.textDim, fontSize: 10 }}>{row.country}</div>
                    <div style={{ color: C.textMuted, fontSize: 9 }}>{row.city}</div>
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 10 }}>{row.device}</div>
                  <div style={{ color: row.browser === "Tor Browser" ? C.critical : C.textMuted, fontSize: 10, fontWeight: row.browser === "Tor Browser" ? 700 : 400 }}>{row.browser}</div>
                  <div style={{ color: C.textMuted, fontSize: 10 }}>{row.os}</div>
                  <div style={{ color: C.textMuted, fontSize: 10, fontFamily: "monospace" }}>{row.referralCode}</div>
                  {/* Risk score */}
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: rb,
                        color: rc,
                        fontSize: 10,
                        fontWeight: 800,
                        fontFamily: "monospace",
                      }}
                    >
                      {row.riskScore}
                    </span>
                  </div>
                  {/* Expand chevron */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {isExpanded ? <ChevronDown size={12} color={C.cyan} /> : <ChevronRight size={12} color={C.textMuted} />}
                  </div>
                </div>

                {/* Expanded row */}
                {isExpanded && (
                  <div
                    style={{
                      padding: "14px 20px",
                      background: "rgba(0,240,255,0.03)",
                      borderBottom: `1px solid ${C.border}`,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Risk flags */}
                    <div style={{ flex: "1 1 200px" }}>
                      <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Risk Flags</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {row.riskFlags.length > 0
                          ? row.riskFlags.map((f) => <Tag key={f} label={f} color={row.riskScore >= 70 ? "red" : "amber"} />)
                          : <Tag label="No flags" color="green" />}
                      </div>
                    </div>

                    {/* Failed logins */}
                    <div style={{ flex: "1 1 160px" }}>
                      <div style={{ color: C.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Failed Logins (same IP)</div>
                      <div
                        style={{
                          color: row.failedLogins > 2 ? C.critical : C.success,
                          fontSize: 20,
                          fontWeight: 800,
                          fontFamily: "monospace",
                        }}
                      >
                        {row.failedLogins}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ flex: "1 1 260px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                      <GhostBtn small onClick={() => setDrawerRow(row)}>
                        <User size={10} /> View User
                      </GhostBtn>
                      <GhostBtn small>
                        <Copy size={10} /> Copy IP
                      </GhostBtn>
                      <GhostBtn small>
                        <Search size={10} /> Search Same IP
                      </GhostBtn>
                      <GhostBtn small>
                        <Shield size={10} /> View Security Events
                      </GhostBtn>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer */}
          <div
            style={{
              padding: "10px 16px",
              background: "rgba(0,0,0,0.2)",
              borderTop: `1px solid ${C.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: C.textMuted, fontSize: 10, fontFamily: "monospace" }}>
              Source: /api/ops/signup-ip-intelligence · Showing recent 4 signups · Email & IP masked
            </span>
            <GhostBtn small>Load more rows</GhostBtn>
          </div>
        </div>
      </div>
    </>
  );
}
