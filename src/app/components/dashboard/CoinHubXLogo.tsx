import React from "react";

interface Props {
  size?: number;
  showWordmark?: boolean;
}

export function CoinHubXLogo({ size = 36, showWordmark = true }: Props) {
  const h = Math.round(size * 1.15);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      {/* Shield mark — self-contained SVG, no text overflow */}
      <svg
        width={size}
        height={h}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 6px rgba(30,160,255,0.6))", flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="shOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bc8ff" />
            <stop offset="55%" stopColor="#1a7fd4" />
            <stop offset="100%" stopColor="#0a4a9e" />
          </linearGradient>
          <linearGradient id="shInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#071e42" />
            <stop offset="100%" stopColor="#030e22" />
          </linearGradient>
          <linearGradient id="chxGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8e6ff" />
            <stop offset="40%" stopColor="#3db5ff" />
            <stop offset="100%" stopColor="#1060cc" />
          </linearGradient>
          <clipPath id="shieldClip">
            <path d="M50 6 L90 20 L90 60 Q90 90 50 108 Q10 90 10 60 L10 20 Z" />
          </clipPath>
        </defs>

        {/* Outer shield body */}
        <path
          d="M50 3 L93 18 L93 60 Q93 93 50 112 Q7 93 7 60 L7 18 Z"
          fill="url(#shOuter)"
        />

        {/* Bevel inset line */}
        <path
          d="M50 9 L87 22 L87 60 Q87 88 50 106 Q13 88 13 60 L13 22 Z"
          fill="none"
          stroke="rgba(180,230,255,0.18)"
          strokeWidth="1.5"
        />

        {/* Inner dark fill */}
        <path
          d="M50 12 L84 24 L84 60 Q84 86 50 103 Q16 86 16 60 L16 24 Z"
          fill="url(#shInner)"
        />

        {/* CHX text — clipped inside shield, sized to fit */}
        <g clipPath="url(#shieldClip)">
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fontSize="38"
            fontWeight="900"
            fontFamily="'Arial Black', 'Impact', Arial, sans-serif"
            fill="url(#chxGrad)"
            letterSpacing="-1"
          >
            CHX
          </text>
        </g>

        {/* Top sheen highlight */}
        <path
          d="M50 4 L90 18 L90 24 L50 11 L10 24 L10 18 Z"
          fill="rgba(200,240,255,0.22)"
        />

        {/* Outer edge highlight — left */}
        <path
          d="M10 20 L10 60 Q10 88 30 102"
          fill="none"
          stroke="rgba(150,210,255,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark — only shown when requested */}
      {showWordmark && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span
            style={{
              fontSize: Math.round(size * 0.46),
              fontWeight: 900,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #7ee8ff 0%, #2ab8ff 50%, #0a72ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              display: "block",
            }}
          >
            CoinHubX
          </span>
          <span
            style={{
              fontSize: Math.round(size * 0.21),
              fontWeight: 600,
              color: "rgba(80,160,230,0.55)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "'Inter', system-ui, sans-serif",
              display: "block",
            }}
          >
            Business
          </span>
        </div>
      )}
    </div>
  );
}
