'use client';

import React, { useState, useEffect, useRef } from "react";

/* ── Arrow path data (used by both static lines and animateMotion mpaths) ── */
const ARROWS = [
  { id: "arrow-a", d: "M 185 36 L 230 36", len: 45 },
  { id: "arrow-b", d: "M 425 36 L 470 36", len: 45 },
  { id: "arrow-c", d: "M 665 36 L 710 36", len: 45 },
];

/* ── Feedback loop path ── */
const FEEDBACK = {
  id: "arrow-feedback",
  d: "M 870 36 L 880 36 L 880 120 L 880 140 C 880 150 860 150 480 150 L 20 150 L 20 130",
  len: 880,
};

/* ── Node geometry ── */
const NODES = [
  { id: "node-dp",  x: 0,   y: 8, w: 175, h: 56, tx: 24,  ty: 34, sy: 52, title: "Digital Presence",   sub: "Found + Understood" },
  { id: "node-lr",  x: 240, y: 8, w: 175, h: 56, tx: 264, ty: 34, sy: 52, title: "Lead Response",      sub: "Captured + Moving" },
  { id: "node-so",  x: 480, y: 8, w: 175, h: 56, tx: 500, ty: 34, sy: 52, title: "Sales Operations",   sub: "Consistent + Converting" },
  { id: "node-ri",  x: 720, y: 8, w: 140, h: 56, tx: 736, ty: 34, sy: 52, title: "Revenue Intelligence", sub: "Measured + Improving", highlight: true },
];

const IS_RI = (t: string) => t === "Revenue Intelligence";

export function SolutionsConnectedSystemSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSectionVisible(true);
            obs.disconnect();
            /* Start particles after node/arrow draw-in completes (~0.8s) */
            const t = setTimeout(() => setParticlesActive(true), 820);
            return () => clearTimeout(t);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Kick SVG animateMotion elements once particlesActive flips */
  useEffect(() => {
    if (!particlesActive || !svgRef.current) return;
    const svg = svgRef.current;
    const motions = svg.querySelectorAll<SVGAnimateMotionElement>("animateMotion");
    /* Set svg.currentTime past any begin-delay so all loops start */
    const t = setTimeout(() => {
      try { svg.setCurrentTime(0.05); } catch {}
      motions.forEach((m) => {
        try { m.beginElement(); } catch {}
      });
    }, 60);
    return () => clearTimeout(t);
  }, [particlesActive]);

  const d = (i: number) => `${0.08 + i * 0.1}s`;

  return (
    <section aria-label="How the Four Areas Work Together" className="diagnostic-section section--gray">
      <div className="site-shell" ref={sectionRef}>
        {/* ── Heading block ─────────────────────────────────────────── */}
        <div style={{
          textAlign: "center",
          maxWidth: "680px",
          marginInline: "auto",
          marginBottom: "48px",
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}>
          <p className="section-kicker" style={{ textAlign: "center" }}>Connected By Design</p>
          <h2 id="connected-system-title" style={{ textAlign: "center" }}>
            Improving one area helps. Connecting all four{" "}
            <span style={{ color: "var(--maroon)" }}>creates leverage.</span>
          </h2>
          <p className="section-intro" style={{ maxWidth: "680px", marginInline: "auto", textAlign: "center" }}>
            The four areas represent a connected revenue path, not independent service
            categories. Each stage feeds the next, and Revenue Intelligence feeds learning
            back into all earlier stages.
          </p>
        </div>

        {/* ── Diagram panel ────────────────────────────────────────── */}
        <div style={{
          marginTop: "32px",
          padding: "36px 28px",
          background: "#fff",
          border: "1px solid #DDD6CC",
          borderRadius: 0,
        }} aria-label="Connected revenue path flow">
          <div className="hidden md:block">
            <svg
              ref={svgRef}
              viewBox="0 0 880 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", maxWidth: "880px", display: "block" }}
            >
              <defs>
                {/* Arrow marker */}
                <marker id="arrow-cs" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#841617" opacity="0.55" />
                </marker>

                {/* Particle glow filter */}
                <filter id="p-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Node shadow */}
                <filter id="n-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#00000018" />
                </filter>
              </defs>

              {/* ══════════════════════════════════════════════════════
                   LAYER 1 — arrow paths (behind everything)
                   Draw-in animation on static lines; motion paths
                   reference these via <mpath> for particle travel.
                   ══════════════════════════════════════════════════════ */}

              {/* Forward arrows — draw in */}
              {ARROWS.map((a, i) => (
                <path
                  key={a.id}
                  id={a.id}
                  d={a.d}
                  stroke="#DDD6CC"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-cs)"
                  strokeDasharray={a.len}
                  strokeDashoffset={sectionVisible ? 0 : a.len}
                  style={{
                    transition: `stroke-dashoffset 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.55 + i * 0.1}s`,
                  }}
                />
              ))}

              {/* Feedback loop — draw in */}
              <path
                id={FEEDBACK.id}
                d={FEEDBACK.d}
                stroke="#841617"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                fill="none"
                opacity="0.55"
                markerEnd="url(#arrow-cs)"
                strokeDashoffset={sectionVisible ? 0 : FEEDBACK.len}
                style={{
                  transition: `stroke-dashoffset 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.85s`,
                }}
              >
                {/* Continuous flow after draw-in completes */}
                {sectionVisible && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-24"
                    dur="1.2s"
                    begin="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </path>
              <text x="480" y="140" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#841617" textAnchor="middle" opacity="0.85" fontStyle="italic">
                Feedback → All stages
              </text>

              {/* ══════════════════════════════════════════════════════
                   LAYER 2 — nodes
                   Staggered cascade entrance + hover lift
                   ══════════════════════════════════════════════════════ */}

              {NODES.map((n, i) => {
                const ri = IS_RI(n.title);
                return (
                  <g
                    key={n.id}
                    className="cs-node"
                    style={{
                      opacity: sectionVisible ? 1 : 0,
                      transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
                      transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${d(i)}, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${d(i)}`,
                    }}
                  >
                    {/* Pulsing ring (Revenue Intelligence only) */}
                    {ri && (
                      <rect
                        x={n.x - 6} y={n.y - 6}
                        width={n.w + 12} height={n.h + 12}
                        rx="2"
                        fill="none"
                        stroke="#841617"
                        strokeWidth="1"
                        opacity="0.35"
                        className="ri-pulse-ring"
                      />
                    )}

                    {/* Card rect */}
                    <rect
                      x={n.x} y={n.y}
                      width={n.w} height={n.h}
                      rx="0"
                      fill={ri ? "#fff8f6" : "#FFFFFF"}
                      stroke={ri ? "#841617" : "#DDD6CC"}
                      strokeWidth={ri ? "1.5" : "1"}
                      filter="url(#n-shadow)"
                    />

                    {/* Title */}
                    <text
                      x={n.tx} y={n.ty}
                      fontFamily="DM Serif Display, Georgia, serif"
                      fontSize={ri ? "12.5" : "14"}
                      fontWeight="400"
                      fill="#2B2B2B"
                    >
                      {n.title}
                    </text>

                    {/* Subtitle */}
                    <text
                      x={n.tx} y={n.sy}
                      fontFamily="DM Sans, system-ui, sans-serif"
                      fontSize="11"
                      fill="#625E59"
                    >
                      {n.sub}
                    </text>
                  </g>
                );
              })}

              {/* ══════════════════════════════════════════════════════
                   LAYER 3 — flowing data particles
                   Small dots travel along each arrow path and the
                   feedback loop, beginning after the draw-in finishes.
                   ══════════════════════════════════════════════════════ */}

              {particlesActive && (
                <>
                  {/* Forward flow particles */}
                  {ARROWS.map((a) => (
                    <circle
                      key={`fp-${a.id}`}
                      r="3"
                      fill="#841617"
                      opacity="0.7"
                      filter="url(#p-glow)"
                    >
                      <animateMotion
                        dur="2.2s"
                        repeatCount="indefinite"
                        begin={`${0.08 + ARROWS.indexOf(a) * 0.25}s`}
                      >
                        <mpath href={`#${a.id}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.12;0.88;1" dur="2.2s" repeatCount="indefinite" begin={`${0.08 + ARROWS.indexOf(a) * 0.25}s`} />
                    </circle>
                  ))}

                  {/* Feedback loop particle — slower, more deliberate */}
                  <circle
                    r="3.2"
                    fill="#841617"
                    opacity="0.65"
                    filter="url(#p-glow)"
                  >
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      begin="0s"
                    >
                      <mpath href={`#${FEEDBACK.id}`} />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.92;1" dur="4s" repeatCount="indefinite" begin="0s" />
                  </circle>
                </>
              )}
            </svg>
          </div>

          {/* ── Mobile: full-width stacked cards, no side overflow ── */}
          <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { name: "Digital Presence",   sub: "Found + Understood",       desc: "Discovery and consideration" },
              { name: "Lead Response",      sub: "Captured + Moving",        desc: "Capture and speed" },
              { name: "Sales Operations",   sub: "Consistent + Converting",  desc: "Progression and consistency" },
              { name: "Revenue Intelligence", sub: "Measured + Improving", desc: "Measurement and prioritization", highlight: true },
            ].map((stage, i) => (
              <div
                key={stage.name}
                style={{
                  background: stage.highlight ? "#fff8f6" : "#ffffff",
                  border: stage.highlight ? "1.5px solid #841617" : "1px solid #DDD6CC",
                  borderTop: stage.highlight ? "4px solid #841617" : "3px solid #841617",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.45s ease ${0.15 + i * 0.07}s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.07}s`,
                }}
              >
                {/* Number badge + title */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#ffffff",
                    background: "#841617",
                    borderRadius: "50%",
                    width: "26px", height: "26px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  <h4 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "16px", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.3, margin: 0 }}>
                    {stage.name}
                  </h4>
                </div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "13px", color: "#625E59", margin: "0 0 4px" }}>{stage.sub}</p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "14px", color: "#334155", lineHeight: 1.6, margin: 0 }}>{stage.desc}</p>
              </div>
            ))}
          </div>
          <div className="md:hidden" style={{ padding: "14px 0 0", display: "flex", alignItems: "center", gap: "8px", opacity: sectionVisible ? 1 : 0, transition: "opacity 0.4s ease 0.55s" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid #841617", display: "inline-block" }}></span>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "13px", color: "#625E59", fontStyle: "italic" }}>Feedback → All stages</span>
          </div>
        </div>

        {/* ── Closing copy ─────────────────────────────────────────── */}
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "15px",
          color: "#334155",
          lineHeight: 1.7,
          marginTop: "36px",
          maxWidth: "640px",
          marginInline: "auto",
          textAlign: "center",
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease 0.85s, transform 0.6s ease 0.85s",
        }}>
          No solution is recommended in isolation. Every recommendation is tied to the
          business outcome and system constraint it is intended to improve.
        </p>
      </div>

      {/* ── Animations & hover styles ─────────────────────────────── */}
      <style>{`
        /* ── Desktop node hover ── */
        .cs-node {
          cursor: default;
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cs-node:hover rect[rx="0"] {
          filter: url(#n-shadow) drop-shadow(0 2px 6px rgba(132,22,23,0.10));
        }

        /* ── Revenue Intelligence node: breathing glow ring ── */
        @keyframes riPulse {
          0%   { opacity: 0.15; stroke-width: 1;   }
          50%  { opacity: 0.45; stroke-width: 1.8; }
          100% { opacity: 0.15; stroke-width: 1;   }
        }
        .ri-pulse-ring {
          animation: riPulse 3s ease-in-out infinite;
          transform-origin: 790px 36px;
        }

        /* ── Panel ambient glow (behind diagram, subtle) ── */
        @keyframes panelBreathe {
          0%   { box-shadow: inset 0 0 40px rgba(132,22,23,0.015); }
          50%  { box-shadow: inset 0 0 60px rgba(132,22,23,0.035); }
          100% { box-shadow: inset 0 0 40px rgba(132,22,23,0.015); }
        }
        .cs-panel {
          animation: panelBreathe 6s ease-in-out infinite;
        }

        /* ── Mobile connector dot pulse ── */
        @keyframes dotPulse {
          0%, 100% { transform: scale(1);   opacity: 0.8; }
          50%      { transform: scale(1.3); opacity: 1;   }
        }
        .cs-mobile-dot {
          animation: dotPulse 2s ease-in-out infinite;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
          .ri-pulse-ring,
          .cs-panel,
          .cs-mobile-dot {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
