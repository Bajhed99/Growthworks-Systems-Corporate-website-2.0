'use client';

/* ── Design tokens ──────────────────────────────────────────────────────── */
const MAROON = "#841617";
const WHITE = "#FFFFFF";
const LIGHT_GREY = "#B0ACA6";
const MID_GREY = "#6B6560";
const DARK_GREY = "#2A2725";
const CARD_BG = "#1E1C1A";
const PANEL_BG = "#0D0C0B";

/* ── Card data ── */
const CARDS = [
  { title: "Digital Presence",     sub: "Found + Understood" },
  { title: "Lead Response",        sub: "Captured + Moving" },
  { title: "Sales Operations",     sub: "Consistent + Converting" },
  { title: "Revenue Intelligence", sub: "Measured + Improving" },
];

export function SolutionsConnectedSystemSection() {
  return (
    <section
      aria-label="How the Four Areas Work Together"
      className="diagnostic-section section--dark"
      style={{ background: PANEL_BG, position: "relative", overflow: "hidden" }}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Headings */}
      <div
        className="site-shell"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "680px",
          marginInline: "auto",
          marginBottom: "48px",
        }}
      >
        <p className="section-kicker" style={{ color: MAROON, fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Connected By Design
        </p>
        <h2
          id="connected-system-title"
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: WHITE,
            margin: "0 0 16px",
          }}
        >
          Improving one area helps. Connecting all four{" "}
          <span style={{ color: MAROON }}>creates leverage.</span>
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "15px",
            lineHeight: 1.6,
            color: LIGHT_GREY,
            maxWidth: "640px",
            marginInline: "auto",
          }}
        >
          The four areas represent a connected revenue path, not independent service
          categories. Each stage feeds the next, and Revenue Intelligence feeds learning
          back into all earlier stages.
        </p>
      </div>

      {/* Simple card grid */}
      <div
        className="site-shell"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          maxWidth: "860px",
          marginInline: "auto",
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{
              background: CARD_BG,
              border: i === 3 ? `1px solid ${MAROON}` : `1px solid ${DARK_GREY}`,
              borderRadius: "6px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.30)",
            }}
          >
            <p
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: "13px",
                fontWeight: 400,
                color: i === 3 ? MAROON : LIGHT_GREY,
                margin: "0 0 6px",
              }}
            >
              0{i + 1}
            </p>
            <p
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: "18px",
                fontWeight: i === 3 ? 600 : 400,
                color: WHITE,
                lineHeight: 1.3,
                margin: "0 0 4px",
              }}
            >
              {card.title}
            </p>
            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "13px",
                color: LIGHT_GREY,
                margin: 0,
              }}
            >
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Closing copy */}
      <div className="site-shell">
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "15px",
            color: LIGHT_GREY,
            lineHeight: 1.7,
            marginTop: "40px",
            textAlign: "center",
            maxWidth: "640px",
            marginInline: "auto",
          }}
        >
          No solution is recommended in isolation. Every recommendation is tied to the
          business outcome and system constraint it is intended to improve.
        </p>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .site-shell > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
