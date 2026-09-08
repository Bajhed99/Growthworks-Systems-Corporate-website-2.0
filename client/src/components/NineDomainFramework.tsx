import { useState, useEffect, useCallback, useRef } from "react";

const domains = [
  { id: 1, title: "Strategy & Positioning", description: "Defines target markets, competitive positioning, and the revenue growth strategy that guides every other domain in the system.", detail: "Without a clear strategy, every other domain operates on assumption. We map your ideal customer profile, analyze competitive white space, and build the positioning narrative that makes differentiation legible at every touchpoint.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>) },
  { id: 2, title: "Market Visibility", description: "Ensures the right audience discovers and recognizes the brand through SEO, content, advertising, and channel presence.", detail: "Visibility isn't volume — it's precision. We engineer presence across the channels your buyers actually use, building authority through content while paid programs accelerate reach for high-intent segments.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>) },
  { id: 3, title: "Digital Experience", description: "The website and digital touchpoints that convert visibility into engagement and qualified interest.", detail: "Your digital experience is a sales asset, not a brochure. We audit every touchpoint against conversion principles, redesign flows that leak revenue, and align messaging with where buyers are in their decision process.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>) },
  { id: 4, title: "Lead Capture & Conversion", description: "Systems and processes that capture prospect information and qualify interest into actionable, scored leads.", detail: "Most companies capture contact data. We build qualification architectures — progressive profiling, behavioral scoring, and gating strategies calibrated to your sales cycle so every lead handed to sales is worth their time.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 15H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M18 15h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" /><path d="M4 6v7a8 8 0 0 0 16 0V6" /></svg>) },
  { id: 5, title: "CRM & Pipeline", description: "The platform and workflow that tracks every opportunity, ensuring no lead is lost and pipeline always remains visible.", detail: "CRM is infrastructure, not software. We design the data model, stage definitions, and workflow automation that make your pipeline a reliable instrument — one that tells you where deals stall, not just where they sit.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>) },
  { id: 6, title: "Automation & Follow-Up", description: "Systematic, personalized outreach that keeps prospects engaged through automated and triggered communications.", detail: "Speed and relevance are the twin variables of follow-up. We build trigger-based sequences that respond to buyer signals in real time, personalizing at scale without sacrificing the credibility of a human relationship.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>) },
  { id: 7, title: "Sales Enablement & Conversion", description: "The tools, content, and processes that empower sales teams to close business consistently and predictably.", detail: "Enablement is the bridge between marketing and revenue. We build the playbooks, battle cards, proposal templates, and training cadences that turn your sales team into a high-performing, repeatable machine.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>) },
  { id: 8, title: "Customer Experience & Retention", description: "Post-sale systems that deliver on the promise, reduce churn, and build long-term customer advocates.", detail: "Acquisition cost is sunk. Retention is margin. We design onboarding experiences, health-score frameworks, and expansion plays that turn customers into a revenue base that compounds over time.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>) },
  { id: 9, title: "Data, Measurement & Optimization", description: "The analytics layer providing insight across all domains to continuously improve performance at every stage.", detail: "You cannot optimize what you cannot see. We build the measurement architecture — attribution models, KPI frameworks, and reporting dashboards — that turns data into a strategic asset rather than a reporting obligation.", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></svg>) },
];

const NODE_W = 300;
const NODE_H = 200;
const cols = [36, 150, 264];
const rows = [34, 100, 166];
const nodePos = (id: number) => { const idx = id - 1; return { x: cols[idx % 3], y: rows[Math.floor(idx / 3)] }; };
const edges: [number, number][] = [];
for (let a = 1; a <= 9; a++) { for (let b = a + 1; b <= 9; b++) { edges.push([a, b]); } }
const TRAVEL_DOTS = [{ edge: [1, 5] as [number, number], delay: 0, dur: 2.8 }, { edge: [5, 9] as [number, number], delay: 0.4, dur: 2.8 }, { edge: [2, 6] as [number, number], delay: 1.1, dur: 3.2 }, { edge: [4, 8] as [number, number], delay: 0.7, dur: 3.0 }, { edge: [1, 9] as [number, number], delay: 1.5, dur: 4.0 }, { edge: [3, 7] as [number, number], delay: 2.0, dur: 3.5 }, { edge: [1, 3] as [number, number], delay: 0.2, dur: 2.2 }, { edge: [7, 9] as [number, number], delay: 1.8, dur: 2.2 }, { edge: [2, 8] as [number, number], delay: 0.9, dur: 3.8 }];

function SystemDiagram({ active, onSelect }: { active: number | null; onSelect: (id: number) => void }) {
  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      <svg viewBox={`0 0 ${NODE_W} ${NODE_H}`} width="100%" style={{ display: "block", maxWidth: 340, margin: "0 auto" }} aria-label="Nine-domain system map">
        <defs>
          <style>{`@keyframes travelDot { 0% { opacity: 0; offset-distance: 0%; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { opacity: 0; offset-distance: 100%; } }`}</style>
        </defs>
        {edges.map(([a, b]) => {
          const pa = nodePos(a); const pb = nodePos(b);
          const isAdjacentRow = Math.abs(Math.floor((a - 1) / 3) - Math.floor((b - 1) / 3)) <= 1;
          const isAdjacentCol = Math.abs(((a - 1) % 3) - ((b - 1) % 3)) <= 1;
          const isPrimary = isAdjacentRow && isAdjacentCol;
          return <line key={`${a}-${b}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={isPrimary ? "#D1D5DB" : "#E5E7EB"} strokeWidth={isPrimary ? 1 : 0.5} strokeDasharray={isPrimary ? "none" : "2 4"} />;
        })}
        {TRAVEL_DOTS.map((dot, i) => {
          const pa = nodePos(dot.edge[0]); const pb = nodePos(dot.edge[1]);
          const pathId = `travel-path-${i}`;
          return (
            <g key={i}>
              <path id={pathId} d={`M${pa.x},${pa.y} L${pb.x},${pb.y}`} fill="none" stroke="none" />
              <circle r="2.2" fill="#841617" opacity="0.7">
                <animateMotion dur={`${dot.dur}s`} repeatCount="indefinite" begin={`${dot.delay}s`}><mpath href={`#${pathId}`} /></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.08;0.92;1" dur={`${dot.dur}s`} repeatCount="indefinite" begin={`${dot.delay}s`} />
              </circle>
            </g>
          );
        })}
        {domains.map((d) => {
          const pos = nodePos(d.id); const isActive = active === d.id;
          return (
            <g key={d.id} style={{ cursor: "pointer" }} onClick={() => onSelect(d.id)}>
              {isActive && <circle cx={pos.x} cy={pos.y} r="18" fill="none" stroke="#841617" strokeWidth="1" opacity="0.25"><animate attributeName="r" values="16;24;16" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" /></circle>}
              <circle cx={pos.x} cy={pos.y} r="14" fill={isActive ? "#841617" : "#fff"} stroke={isActive ? "#841617" : "#D1D5DB"} strokeWidth={isActive ? 0 : 1} style={{ transition: "fill 0.2s, stroke 0.2s" }} />
              <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="9" fontFamily="var(--font-sans, Inter, sans-serif)" fontWeight="600" letterSpacing="0.05em" fill={isActive ? "#fff" : "#9CA3AF"} style={{ transition: "fill 0.2s" }}>{String(d.id).padStart(2, "0")}</text>
            </g>
          );
        })}
      </svg>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#9CA3AF", letterSpacing: "0.08em", textAlign: "center", textTransform: "uppercase", marginTop: 12 }}>System map — select a domain</p>
    </div>
  );
}

type PopoverPos = { top: number; left: number; side: "right" | "left" | "below"; arrowLeft?: number };

function NineDomainFramework() {
  const [active, setActive] = useState<number | null>(null);
  const [popoverPos, setPopoverPos] = useState<PopoverPos | null>(null);
  const cardRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const activeDomain = domains.find((d) => d.id === active);
  const POPOVER_W = 300;
  const GAP = 12;

  const computePos = useCallback((id: number): PopoverPos => {
    const el = cardRefs.current[id];
    const grid = gridRef.current;
    if (!el || !grid) return { top: 0, left: 0, side: "right" };
    const elRect = el.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    const top = elRect.top - gridRect.top;
    const cardBottom = elRect.bottom - gridRect.top;
    const cardRight = elRect.right - gridRect.left;
    const cardLeft = elRect.left - gridRect.left;
    const cardCenterX = (elRect.left + elRect.right) / 2 - gridRect.left;
    const gridWidth = gridRect.width;
    if (window.innerWidth < 960) {
      return { top: cardBottom + GAP, left: 0, side: "below", arrowLeft: Math.max(16, Math.min(cardCenterX, gridWidth - 16)) };
    }
    const spaceRight = gridWidth - cardRight;
    const side: "right" | "left" = spaceRight >= POPOVER_W + GAP ? "right" : "left";
    const left = side === "right" ? cardRight + GAP : cardLeft - POPOVER_W - GAP;
    return { top, left, side };
  }, []);

  const handleSelect = (id: number) => {
    if (active === id) { setActive(null); setPopoverPos(null); }
    else { setActive(id); setPopoverPos(computePos(id)); }
  };
  const close = () => { setActive(null); setPopoverPos(null); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onResize = () => { if (active !== null) setPopoverPos(computePos(active)); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [active, computePos]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current && !popoverRef.current.contains(target)) {
        const clickedCard = Object.values(cardRefs.current).some((el) => el && el.contains(target));
        if (!clickedCard) close();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <section id="nine-domain-framework" style={{ padding: "88px 0 120px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)" }}>
        <style>{`
          .domain-card { text-align: left; padding: 28px 24px; background: #fff; border: 1px solid #E5E7EB !important; cursor: pointer; transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; outline: none; display: block; width: 100%; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
          .domain-card:hover:not(.domain-card--active) { background: #fff; border-color: #841617 !important; box-shadow: 0 8px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(132,22,23,0.12) !important; transform: translateY(-2px); }
          .domain-card--active { background: #fff; border: 2px solid #841617 !important; box-shadow: 0 8px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(132,22,23,0.15) !important; z-index: 1; position: relative; }
          @media (max-width: 900px) { .header-grid { grid-template-columns: 1fr !important; } .domain-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px) { .domain-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#841617", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40 }}>
          Nine-Domain Framework
        </p>

        <div className="header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "0 80px", alignItems: "center", marginBottom: 64 }}>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(30px, 3.8vw, 50px)", lineHeight: 1.1, color: "#111827", margin: "0 0 24px" }}>
              Nine domains.{" "}<em style={{ fontStyle: "italic", color: "#841617" }}>One connected system.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.75, color: "#6B7280", margin: "0 0 8px", maxWidth: 480 }}>
              Each domain serves the whole. No single domain drives revenue alone — it's the coordination between all nine that makes a revenue system compound over time.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#9CA3AF", letterSpacing: "0.02em" }}>
              Every line on the map is a live dependency. Select a node or card to explore.
            </p>
          </div>
          <div style={{ border: "1px solid #E5E7EB", padding: "28px 20px 20px", background: "#fff", position: "relative" }}>
            <div style={{ position: "absolute", top: -1, right: -1, background: "#841617", padding: "3px 10px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }}>System Map</span>
            </div>
            <SystemDiagram active={active} onSelect={handleSelect} />
          </div>
        </div>

        <div ref={gridRef} className="domain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", position: "relative" }}>
          {domains.map((domain) => {
            const isActive = active === domain.id;
            return (
              <button key={domain.id} ref={(el) => { cardRefs.current[domain.id] = el; }} onClick={() => handleSelect(domain.id)} className={`domain-card${isActive ? " domain-card--active" : ""}`} style={{ border: "none", boxShadow: "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: isActive ? "#841617" : "#111827", color: "#fff", transition: "background 0.18s", flexShrink: 0 }}>{domain.icon}</div>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#841617" }}>{String(domain.id).padStart(2, "0")}</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-serif, 'DM Serif Display', Georgia, serif)", fontWeight: 400, fontSize: 19, lineHeight: 1.3, color: "#111827", marginBottom: 10 }}>{domain.title}</h4>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.7, color: "#6B7280", margin: 0 }}>{domain.description}</p>
                <div style={{ marginTop: 20, height: 2, background: isActive ? "#841617" : "#111827", width: isActive ? "100%" : "24px", transition: "width 0.25s ease, background 0.18s" }} />
              </button>
            );
          })}

          {activeDomain && popoverPos && (
            <div ref={popoverRef} style={{ position: "absolute", top: popoverPos.top, left: popoverPos.side === "below" ? 0 : popoverPos.left, width: popoverPos.side === "below" ? "100%" : POPOVER_W, zIndex: 200, animation: "popIn 0.18s ease", pointerEvents: "auto" }}>
              <style>{`@keyframes popIn { from { opacity: 0; transform: ${popoverPos.side === "below" ? "translateY(-6px)" : `translateX(${popoverPos.side === "right" ? "-8px" : "8px"})`}; } to { opacity: 1; transform: translateX(0) translateY(0); } }`}</style>
              {popoverPos.side === "below" ? (
                <div style={{ position: "absolute", top: -7, left: popoverPos.arrowLeft ?? 24, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderBottom: "7px solid #111827" }} />
              ) : (
                <div style={{ position: "absolute", top: 20, ...(popoverPos.side === "right" ? { left: -7 } : { right: -7 }), width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", ...(popoverPos.side === "right" ? { borderRight: "7px solid #111827" } : { borderLeft: "7px solid #111827" }) }} />
              )}
              <div style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
                <div style={{ background: "#111827", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, background: "#841617", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{activeDomain.icon}</div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "#841617", textTransform: "uppercase" }}>Domain {String(activeDomain.id).padStart(2, "0")}</span>
                  </div>
                  <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 2, display: "flex", alignItems: "center" }} aria-label="Close">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <div style={{ padding: "18px 18px 20px" }}>
                  <h4 style={{ fontFamily: "var(--font-serif, 'DM Serif Display', Georgia, serif)", fontWeight: 400, fontSize: 17, lineHeight: 1.25, color: "#111827", marginBottom: 8 }}>{activeDomain.title}</h4>
                  <div style={{ width: 24, height: 2, background: "#841617", marginBottom: 12 }} />
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.75, color: "#374151", margin: 0 }}>{activeDomain.detail}</p>
                </div>
                <div style={{ borderTop: "1px solid #F3F4F6", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#9CA3AF", letterSpacing: "0.1em" }}>{String(activeDomain.id).padStart(2, "0")} of 09</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <div key={n} style={{ width: n === activeDomain.id ? 16 : 5, height: 3, background: n === activeDomain.id ? "#841617" : "#E5E7EB", transition: "width 0.2s, background 0.2s" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NineDomainFramework;
