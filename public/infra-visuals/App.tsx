import { useState, useEffect, useRef } from "react";

const CRIMSON = "#841617";
const CRIMSON_DIM = "rgba(132,22,23,0.3)";
const CRIMSON_GLOW = "rgba(132,22,23,0.5)";

const PILLARS = [
  {
    label: "Strategy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: "Technology",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Data",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    label: "Processes",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    label: "People",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const W = 680;
const H = 280;
const ICON_BOX_H = 60;
const ICON_GAP = 6;
const LABEL_H = 16;
const LINE_START_Y = ICON_BOX_H + ICON_GAP + LABEL_H; // 82 — just below label
const HUB_CX = W / 2;
const HUB_CY = H - 8;

const xPositions = [0.083, 0.25, 0.5, 0.75, 0.917].map((r) => r * W);

export default function App() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const [hubPulse, setHubPulse] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHubPulse((p) => !p);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 280; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hubAppear {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseRing {
          0%   { r: 7;  opacity: 0.7; }
          70%  { r: 16; opacity: 0; }
          100% { r: 16; opacity: 0; }
        }
        @keyframes particleFlow {
          0%   { stroke-dashoffset: 280; opacity: 0.9; }
          80%  { stroke-dashoffset: 0;   opacity: 0.9; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        @keyframes dropAppear {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pillar-node {
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
        }
        .pillar-node:hover { transform: translateY(-4px); }
        .icon-box {
          transition: box-shadow 0.22s ease, background 0.22s ease;
        }
        .pillar-node:hover .icon-box {
          background: rgba(132,22,23,0.07) !important;
          box-shadow: 0 0 18px rgba(132,22,23,0.22);
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Diagram */}
        <div style={{ position: "relative", width: "100%", maxWidth: W }}>

          {/* SVG layer: lines */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "auto", display: "block" }}
            aria-hidden="true"
          >
            <defs>
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="hubGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {xPositions.map((x, i) => (
                <linearGradient key={i} id={`lineGrad${i}`} x1={x} y1={LINE_START_Y} x2={HUB_CX} y2={HUB_CY} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={CRIMSON} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={CRIMSON} stopOpacity="0.9" />
                </linearGradient>
              ))}
            </defs>

            {/* Base dim lines */}
            {xPositions.map((x, i) => (
              <line
                key={`base-${i}`}
                x1={x} y1={LINE_START_Y}
                x2={HUB_CX} y2={HUB_CY}
                stroke={CRIMSON_DIM}
                strokeWidth="1"
              />
            ))}

            {/* Animated draw lines */}
            {animated && xPositions.map((x, i) => {
              const dx = HUB_CX - x;
              const dy = HUB_CY - (LINE_START_Y);
              const len = Math.sqrt(dx * dx + dy * dy);
              const isHov = hovered === i;
              return (
                <line
                  key={`anim-${i}`}
                  x1={x} y1={LINE_START_Y}
                  x2={HUB_CX} y2={HUB_CY}
                  stroke={isHov ? CRIMSON : `url(#lineGrad${i})`}
                  strokeWidth={isHov ? 1.8 : 1.2}
                  strokeDasharray={len}
                  strokeDashoffset={0}
                  filter={isHov ? "url(#lineGlow)" : undefined}
                  style={{
                    animation: `drawLine 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s both`,
                    transition: "stroke 0.2s, stroke-width 0.2s",
                  }}
                />
              );
            })}

            {/* Particle dots flowing along lines */}
            {animated && xPositions.map((x, i) => {
              const dx = HUB_CX - x;
              const dy = HUB_CY - (LINE_START_Y);
              const len = Math.sqrt(dx * dx + dy * dy);
              return (
                <line
                  key={`particle-${i}`}
                  x1={x} y1={LINE_START_Y}
                  x2={HUB_CX} y2={HUB_CY}
                  stroke={CRIMSON}
                  strokeWidth="2"
                  strokeDasharray={`4 ${len}`}
                  strokeLinecap="round"
                  style={{
                    animation: `particleFlow 2.4s ease-in ${1.0 + i * 0.15}s infinite`,
                    opacity: 0,
                  }}
                />
              );
            })}

            {/* Hub dot */}
            {animated && (
              <>
                <circle
                  cx={HUB_CX} cy={HUB_CY} r="5"
                  fill={CRIMSON}
                  filter="url(#hubGlow)"
                  style={{ animation: "hubAppear 0.4s ease 0.8s both" }}
                />
                <circle
                  cx={HUB_CX} cy={HUB_CY}
                  fill="none"
                  stroke={CRIMSON}
                  strokeWidth="1"
                  style={{
                    animation: `pulseRing 2.2s ease-out ${hubPulse ? "0s" : "1.1s"} infinite`,
                  }}
                />
              </>
            )}
          </svg>

          {/* Pillar icon nodes — absolutely positioned over SVG */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {PILLARS.map((p, i) => {
              const pct = xPositions[i] / W;
              return (
                <div
                  key={i}
                  className="pillar-node"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${pct * 100}%`,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    pointerEvents: "auto",
                    opacity: animated ? 1 : 0,
                    animation: animated ? `fadeUp 0.5s ease ${0.1 + i * 0.08}s both` : undefined,
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="icon-box"
                    style={{
                      width: 60,
                      height: 60,
                      border: `1.5px solid ${hovered === i ? CRIMSON : CRIMSON_DIM}`,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: CRIMSON,
                      position: "relative",
                    }}
                  >
                    {/* Corner accents */}
                    <span style={{ position: "absolute", top: -1, left: -1, width: 6, height: 6, borderTop: `1px solid ${CRIMSON}`, borderLeft: `1px solid ${CRIMSON}` }} />
                    <span style={{ position: "absolute", top: -1, right: -1, width: 6, height: 6, borderTop: `1px solid ${CRIMSON}`, borderRight: `1px solid ${CRIMSON}` }} />
                    <span style={{ position: "absolute", bottom: -1, left: -1, width: 6, height: 6, borderBottom: `1px solid ${CRIMSON}`, borderLeft: `1px solid ${CRIMSON}` }} />
                    <span style={{ position: "absolute", bottom: -1, right: -1, width: 6, height: 6, borderBottom: `1px solid ${CRIMSON}`, borderRight: `1px solid ${CRIMSON}` }} />
                    {p.icon}
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: hovered === i ? CRIMSON : "#444",
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Revenue Infrastructure — centered in flow */}
        {animated && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: -4,
              animation: "hubAppear 0.5s ease 0.9s both",
              opacity: 0,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: `1.5px solid ${CRIMSON}`,
                padding: "16px 40px",
                textAlign: "center",
                boxShadow: `0 0 24px rgba(132,22,23,0.12)`,
                position: "relative",
              }}
            >
              {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h], ci) => (
                <span key={ci} style={{
                  position: "absolute",
                  [v]: -2, [h]: -2,
                  width: 8, height: 8,
                  [`border${v.charAt(0).toUpperCase() + v.slice(1)}`]: `2px solid ${CRIMSON}`,
                  [`border${h.charAt(0).toUpperCase() + h.slice(1)}`]: `2px solid ${CRIMSON}`,
                }} />
              ))}
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: CRIMSON,
                }}
              >
                Revenue Infrastructure
              </span>
            </div>
          </div>
        )}

        {/* Connector arrow */}
        {animated && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 0,
              gap: 0,
              animation: "dropAppear 0.5s ease 1.3s both",
              opacity: 0,
            }}
          >
            <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${CRIMSON_DIM}, ${CRIMSON})` }} />
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M5 8L0 0h10L5 8z" fill={CRIMSON} />
            </svg>
          </div>
        )}

        {/* Revenue Outcomes */}
        {animated && (
          <div
            style={{
              marginTop: 12,
              border: `1px solid rgba(0,0,0,0.12)`,
              padding: "20px 48px",
              textAlign: "center",
              animation: "dropAppear 0.5s ease 1.5s both",
              opacity: 0,
              position: "relative",
              background: "#fafafa",
            }}
          >
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                fontSize: 20,
                color: "#111",
                margin: 0,
                marginBottom: 6,
                letterSpacing: "0.02em",
              }}
            >
              Revenue Outcomes
            </h3>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 11,
                color: "rgba(0,0,0,0.4)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Growth&nbsp;&nbsp;·&nbsp;&nbsp;Efficiency&nbsp;&nbsp;·&nbsp;&nbsp;Predictability&nbsp;&nbsp;·&nbsp;&nbsp;Scalability
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
