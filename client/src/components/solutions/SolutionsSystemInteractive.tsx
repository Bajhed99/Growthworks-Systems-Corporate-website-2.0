import { useState, useEffect, useRef } from "react";

const cards = [
  {
    num: "01",
    title: "Digital Presence",
    tag: "Found + Understood",
    body: "Ensuring your business is seen, understood, and trusted before a prospect ever reaches out. Visibility that converts attention into intent.",
    detail:
      "A weak digital presence means qualified buyers are finding competitors instead. We build the foundation that earns discovery — optimized positioning, authoritative content, and a website that converts the traffic it earns.",
    stat: "3x",
    statLabel: "more inbound leads with strong presence",
  },
  {
    num: "02",
    title: "Lead Response",
    tag: "Captured + Moving",
    body: "Turning inbound interest into active opportunities before attention fades. Speed and consistency that competitors cannot match manually.",
    detail:
      "The first business to respond wins 78% of the time. We close the gap between inquiry and contact with automated follow-up, qualification workflows, and routing that puts the right lead in front of the right person instantly.",
    stat: "78%",
    statLabel: "of deals go to the first responder",
  },
  {
    num: "03",
    title: "Sales Operations",
    tag: "Consistent + Converting",
    body: "Keeping deals moving with repeatable process, clear ownership, and zero gaps in follow-through. No lead falls through the cracks.",
    detail:
      "Most lost deals are not lost to competition — they are lost to silence. We implement pipeline discipline, coaching checkpoints, and CRM hygiene so your team closes predictably regardless of rep experience or deal complexity.",
    stat: "41%",
    statLabel: "of pipeline lost to inaction, not competition",
  },
  {
    num: "04",
    title: "Revenue Intelligence",
    tag: "Measured + Improving",
    body: "Understanding what is working, what is leaking, and where to focus next. Decisions driven by data, not instinct or assumption.",
    detail:
      "Revenue Intelligence connects every stage into a single feedback loop. You see where leads stall, which messages convert, and which reps need support — then that knowledge feeds back upstream to sharpen everything before it.",
    stat: "&#8593;",
    statLabel: "Every stage improves from what comes after",
    accent: true,
  },
];

const INTERVAL = 2500;

export function SolutionsSystemInteractive() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now - pausedAtRef.current * INTERVAL;
      const elapsed = (now - startRef.current) % INTERVAL;
      const pct = elapsed / INTERVAL;
      setProgress(pct);
      if (elapsed / INTERVAL >= 1) {
        startRef.current = now;
        setActive((a) => (a + 1) % cards.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused]);

  const handleCardClick = (i: number) => {
    setActive(i);
    startRef.current = null;
    pausedAtRef.current = 0;
    setProgress(0);
  };

  const c = cards[active];

  return (
    <section className="section solutions-system-section" aria-label="The Solution System">
      {/* Top kicker band */}
      <div style={{ background: "#f5f0e8", borderBottom: "1px solid #e0d9cf", paddingBlock: 14, textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9B1C1C", textTransform: "uppercase" }}>
          The Solution System
        </span>
      </div>

      {/* Hero text */}
      <div style={{ maxWidth: 860, marginInline: "auto", paddingBlock: "72px 64px", paddingInline: 24, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 400, lineHeight: 1.13, color: "#111111", letterSpacing: "-0.01em", marginBottom: 12 }}>
          Each capability strengthens a different part<br />
          of the same{" "}
          <em style={{ color: "var(--maroon)", fontStyle: "italic" }}>revenue journey.</em>
        </h2>
        <div style={{ width: 48, height: 2, background: "var(--maroon)", marginInline: "auto", marginTop: 28, marginBottom: 28 }} />
        <p style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4a4744", maxWidth: 600, marginInline: "auto" }}>
          Four solution areas organized around the business responsibility they strengthen — not individual tools or technologies. Connected by design.
        </p>
      </div>

      {/* Journey step indicators */}
      <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24, marginBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {cards.map((card, i) => (
            <div key={card.num} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "none" }}>
              <button
                onClick={() => handleCardClick(i)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  opacity: i === active ? 1 : 0.55,
                  transition: "opacity 0.3s ease",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 20,
                  fontWeight: 400,
                  color: i === active ? "var(--maroon)" : "#111111",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: 4,
                }}>
                  {card.num}
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: i === active ? "var(--maroon)" : "#9B1C1C",
                  marginBottom: 6,
                }}>
                  {card.title}
                </span>
                <div style={{ width: "100%", height: 2, background: "#d4cfc8", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--maroon)",
                    transformOrigin: "left",
                    transform: active > i ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.4s ease",
                    opacity: 0.5,
                  }} />
                </div>
              </button>
              {i < cards.length - 1 && (
                <div style={{ width: 24, height: 2, background: "#d4cfc8", margin: "0 4px", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active card detail panel */}
      <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24, marginBottom: 0 }}>
        <div
          key={active}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: `1.5px solid ${c.accent ? "#9B1C1C" : "#d4cfc8"}`,
            background: c.accent ? "#9B1C1C" : "#ffffff",
            animation: "fadeSlideIn 0.35s ease forwards",
          }}
        >
          {/* Left: main content */}
          <div style={{ padding: "52px 48px", borderRight: c.accent ? "1px solid rgba(255,255,255,0.15)" : "1px solid #d4cfc8", position: "relative", overflow: "hidden" }}>
            <span aria-hidden="true" style={{ position: "absolute", top: -20, right: -10, fontFamily: "var(--font-heading)", fontSize: 180, fontWeight: 400, lineHeight: 1, color: c.accent ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", pointerEvents: "none", userSelect: "none" }}>
              {c.num}
            </span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent ? "rgba(255,255,255,0.5)" : "#9B1C1C", marginBottom: 20 }}>
              {c.tag}
            </p>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 36, fontWeight: 400, color: c.accent ? "#ffffff" : "#111111", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: 20 }}>
              {c.title}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: 1.7, color: c.accent ? "rgba(255,255,255,0.75)" : "#4a4744", marginBottom: 32 }}>
              {c.body}
            </p>

            {/* Detail / how we approach */}
            <div style={{ borderTop: c.accent ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e0d9cf", paddingTop: 24, marginBottom: 32 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent ? "rgba(255,255,255,0.45)" : "#9B1C1C", marginBottom: 12 }}>
                How We Approach It
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: 1.7, color: c.accent ? "rgba(255,255,255,0.7)" : "#4a4744" }}>
                {c.detail}
              </p>
            </div>

            {/* Stat block */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 40, fontWeight: 400, color: c.accent ? "#ffffff" : "#111111", lineHeight: 1, letterSpacing: "-0.01em" }}>
                {c.stat}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: c.accent ? "rgba(255,255,255,0.7)" : "#4a4744" }}>
                {c.statLabel}
              </span>
            </div>
          </div>

          {/* Right: visual panel */}
          <div style={{
            background: c.accent ? "#841617" : "#f5f0e8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            minHeight: 420,
          }}>
            <span aria-hidden="true" style={{
              position: "absolute",
              fontFamily: "var(--font-heading)",
              fontSize: 260,
              fontWeight: 400,
              lineHeight: 1,
              color: c.accent ? "rgba(255,255,255,0.04)" : "rgba(132,22,23,0.05)",
              userSelect: "none",
              pointerEvents: "none",
            }}>
              {c.num}
            </span>
            <span aria-hidden="true" style={{
              fontFamily: "var(--font-heading)",
              fontSize: 120,
              fontWeight: 400,
              color: c.accent ? "rgba(255,255,255,0.1)" : "rgba(132,22,23,0.08)",
              userSelect: "none",
              pointerEvents: "none",
              position: "relative",
              zIndex: 1,
            }}>
              {c.title}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24, marginTop: 0 }}>
        <div style={{ height: 3, background: "#e0d9cf", borderRadius: 0, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--maroon)", transition: "width 0.1s linear" }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
