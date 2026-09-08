import { useState, useEffect, useRef } from "react";

const cards = [
  {
    num: "01",
    title: "Digital Presence",
    tag: "Found + Understood",
    body: "Ensuring your business is seen, understood, and trusted before a prospect ever reaches out. Visibility that converts attention into intent.",
    detail:
      "A weak digital presence means qualified buyers are finding competitors instead. We build the foundation that earns discovery — optimized positioning, authoritative content, and a website that converts the traffic it earns.",
    stat: "3×",
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
    stat: "↑",
    statLabel: "Every stage improves from what comes after",
    accent: true,
  },
];

const INTERVAL = 2500;

export default function App() {
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
    <div className="size-full bg-white overflow-auto" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <section style={{ backgroundColor: "#ffffff" }}>

        {/* Top kicker band */}
        <div style={{ background: "#f5f0e8", borderBottom: "1px solid #e0d9cf", paddingBlock: 14, textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#9B1C1C", textTransform: "uppercase" }}>
            The Solution System
          </span>
        </div>

        {/* Hero text */}
        <div style={{ maxWidth: 860, marginInline: "auto", paddingBlock: "72px 64px", paddingInline: 24, textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 400, lineHeight: 1.13, color: "#111111", letterSpacing: "-0.01em", marginBottom: 12 }}>
            Each capability strengthens a different part<br />
            of the same{" "}
            <em style={{ color: "#9B1C1C", fontStyle: "italic" }}>revenue journey.</em>
          </h2>
          <div style={{ width: 48, height: 2, background: "#9B1C1C", marginInline: "auto", marginTop: 28, marginBottom: 28 }} />
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4a4744", maxWidth: 600, marginInline: "auto" }}>
            Four solution areas organized around the business responsibility they strengthen — not individual tools or technologies. Connected by design.
          </p>
        </div>

        {/* Journey step indicators */}
        <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24, marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 0 }}>
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
                    padding: "0 0 16px",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: active === i ? "2px solid #9B1C1C" : "1px solid #d4cfc8",
                    background: active === i ? "#9B1C1C" : "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}>
                    {active === i && (
                      <svg width="36" height="36" viewBox="0 0 36 36" style={{ position: "absolute", top: -2, left: -2, transform: "rotate(-90deg)" }}>
                        <circle
                          cx="18" cy="18" r="16"
                          fill="none"
                          stroke="rgba(155,28,28,0.25)"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 16}`}
                          strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress)}`}
                          style={{ transition: "stroke-dashoffset 0.05s linear" }}
                        />
                      </svg>
                    )}
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 600, color: active === i ? "#ffffff" : "#9B1C1C", letterSpacing: "0.06em", position: "relative", zIndex: 1 }}>
                      {card.num}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, fontWeight: active === i ? 600 : 400, color: active === i ? "#9B1C1C" : "#9b9590", letterSpacing: "0.04em", whiteSpace: "nowrap", transition: "all 0.3s ease" }}>
                    {card.title}
                  </span>
                </button>
                {i < 3 && (
                  <div style={{ flex: 1, height: 1, marginBottom: 28, marginInline: 8, background: "#e0d9cf", position: "relative", overflow: "hidden" }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "#9B1C1C",
                      transformOrigin: "left",
                      transform: active > i ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.4s ease",
                      opacity: 0.5,
                    }} />
                  </div>
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
            <div style={{ padding: "52px 48px", borderRight: `1px solid ${c.accent ? "rgba(255,255,255,0.15)" : "#d4cfc8"}`, position: "relative", overflow: "hidden" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: -20, right: -10, fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 180, fontWeight: 400, lineHeight: 1, color: c.accent ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", pointerEvents: "none", userSelect: "none" }}>
                {c.num}
              </span>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.accent ? "rgba(255,255,255,0.5)" : "#9B1C1C", marginBottom: 20 }}>
                {c.tag}
              </p>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: c.accent ? "#ffffff" : "#111111", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: 20 }}>
                {c.title}
              </h3>
              <div style={{ width: 36, height: 2, background: c.accent ? "rgba(255,255,255,0.3)" : "#9B1C1C", marginBottom: 24 }} />
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: c.accent ? "rgba(255,255,255,0.8)" : "#4a4744" }}>
                {c.body}
              </p>
            </div>

            {/* Right: detail + stat */}
            <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: c.accent ? "rgba(255,255,255,0.75)" : "#5a5754" }}>
                {c.detail}
              </p>
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${c.accent ? "rgba(255,255,255,0.15)" : "#e0d9cf"}`, display: "flex", alignItems: "baseline", gap: 14 }}>
                <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 48, fontWeight: 400, color: c.accent ? "#ffffff" : "#9B1C1C", lineHeight: 1 }}>
                  {c.stat}
                </span>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, fontWeight: 400, color: c.accent ? "rgba(255,255,255,0.55)" : "#9b9590", lineHeight: 1.4, maxWidth: 200 }}>
                  {c.statLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card grid thumbnails */}
        <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24, marginTop: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderLeft: "1px solid #d4cfc8", borderRight: "1px solid #d4cfc8", borderBottom: "1px solid #d4cfc8" }}>
            {cards.map((card, i) => (
              <button
                key={card.num}
                onClick={() => handleCardClick(i)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                style={{
                  textAlign: "left",
                  background: active === i ? (card.accent ? "#8a1717" : "#faf8f4") : (card.accent ? "#9B1C1C" : "#ffffff"),
                  borderRight: i < 3 ? "1px solid #d4cfc8" : "none",
                  borderTop: `2px solid ${active === i ? "#9B1C1C" : "transparent"}`,
                  padding: "24px 28px 20px",
                  cursor: "pointer",
                  transition: "background 0.25s ease",
                  border: "none",
                  borderRight: i < 3 ? "1px solid #d4cfc8" : "none",
                  borderTop: active === i ? "2px solid #9B1C1C" : "2px solid transparent",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: active === i ? (card.accent ? "rgba(255,255,255,0.6)" : "#9B1C1C") : (card.accent ? "rgba(255,255,255,0.5)" : "#c0b8b0"), marginBottom: 6 }}>
                  {card.num}
                </div>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, fontWeight: 400, color: card.accent ? "#ffffff" : "#111111", lineHeight: 1.2 }}>
                  {card.title}
                </div>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: active === i ? (card.accent ? "rgba(255,255,255,0.5)" : "#9B1C1C") : (card.accent ? "rgba(255,255,255,0.4)" : "#b0a8a0"), marginTop: 4 }}>
                  {card.tag}
                </div>
                {/* Progress sweep */}
                {active === i && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: card.accent ? "rgba(255,255,255,0.4)" : "#9B1C1C", width: `${progress * 100}%`, transition: "width 0.05s linear" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback label */}
        <div style={{ textAlign: "center", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9B1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.45 }}>
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 400, color: "#9b9590", fontStyle: "italic" }}>
            Revenue Intelligence feeds learning back to every prior stage
          </span>
        </div>

        {/* Closing band */}
        <div style={{ borderTop: "1px solid #e0d9cf", background: "#f5f0e8", paddingBlock: 52, paddingInline: 24, textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4a4744", maxWidth: 580, marginInline: "auto" }}>
            These four capabilities form one connected system. Each one reinforces the others.{" "}
            <span style={{ color: "#9B1C1C", fontWeight: 500 }}>Learn how they work together below.</span>
          </p>
        </div>

      </section>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
