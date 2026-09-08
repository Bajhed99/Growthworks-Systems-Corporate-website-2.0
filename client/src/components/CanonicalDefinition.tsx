import { useState, useEffect, useRef } from "react";

// ── Palette ───────────────────────────────────────────────────────────────────
const RED   = "#841617";   // Crimson — sole red used throughout
const BLACK = "#0f0f0f";

// ── Diagram coordinate system ─────────────────────────────────────────────────
const VW = 700;
const VH = 430;

const BOX_W      = 62;
const BOX_H      = 62;
const NUM_Y      = 10;              // "01" label y
const BOX_TOP    = 20;
const ICON_Y     = BOX_TOP + BOX_H / 2;
const LABEL_Y    = BOX_TOP + BOX_H + 22;
const LINE_FROM_Y = BOX_TOP + BOX_H;

const NODE_CXS   = [70, 210, 350, 490, 630];
const HUB_CX     = VW / 2;
const HUB_TOP    = 200;
const HUB_H      = 50;
const HUB_W      = 250;
const HUB_CY     = HUB_TOP + HUB_H / 2;

const CONN_END_Y = HUB_TOP + HUB_H + 38;
const OUT_TOP    = CONN_END_Y + 2;
const OUT_H      = 92;
const OUT_W      = 500;
const OUT_CX     = HUB_CX;

// ── Icons (centred at 0 0) ────────────────────────────────────────────────────
const ICON_PROPS = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const };

function IconStrategy()   { return <g {...ICON_PROPS}><circle r="9"/><circle r="5.5"/><circle r="2"/></g>; }
function IconTechnology() { return <g {...ICON_PROPS} strokeLinejoin="round"><rect x="-9" y="-7" width="18" height="13" rx="1.5"/><path d="M-3.5 7h7M0 6v3"/></g>; }
function IconData()       { return <g {...ICON_PROPS}><ellipse cx="0" cy="-5.5" rx="8" ry="2.5"/><path d="M8 0c0 1.38-3.58 2.5-8 2.5S-8 1.38-8 0"/><path d="M-8-5.5v11c0 1.38 3.58 2.5 8 2.5S8 6.88 8 5.5v-11"/></g>; }
function IconProcesses()  {
  return (
    <g {...ICON_PROPS}>
      <circle r="2.8"/>
      <path d="M7.2 2.6a1.5 1.5 0 0 0 .3 1.66l.05.05a1.82 1.82 0 0 1-2.58 2.58l-.05-.05A1.5 1.5 0 0 0 3.26 6.5a1.5 1.5 0 0 0-.91 1.37V8a1.82 1.82 0 0 1-3.64 0v-.08a1.5 1.5 0 0 0-.98-1.37 1.5 1.5 0 0 0-1.66.3l-.05.05a1.82 1.82 0 0 1-2.58-2.58l.05-.05A1.5 1.5 0 0 0-7.2 2.6a1.5 1.5 0 0 0-1.37-.91H-8.8a1.82 1.82 0 0 1 0-3.64h.08a1.5 1.5 0 0 0 1.37-.98 1.5 1.5 0 0 0-.3-1.66l-.05-.05a1.82 1.82 0 0 1 2.58-2.58l.05.05A1.5 1.5 0 0 0-3.26-7.5a1.5 1.5 0 0 0 .91-1.37V-8.8a1.82 1.82 0 0 1 3.64 0v.08a1.5 1.5 0 0 0 .91 1.37 1.5 1.5 0 0 0 1.66-.3l.05-.05a1.82 1.82 0 0 1 2.58 2.58l-.05.05A1.5 1.5 0 0 0 7.2-2.6a1.5 1.5 0 0 0 1.37.91H8.8a1.82 1.82 0 0 1 0 3.64h-.08a1.5 1.5 0 0 0-1.37.91z"/>
    </g>
  );
}
function IconPeople()     { return <g {...ICON_PROPS} strokeLinejoin="round"><path d="M7.78-6.39a5 5 0 0 0-7.07 0L0-5.2l-.71-.71a5 5 0 0 0-7.07 7.07l.71.71L0 8.49l7.07-7.07.71-.71a5 5 0 0 0 0-7.07z"/></g>; }

const PILLARS = [
  { label: "Strategy",   desc: "Go-to-market direction, positioning, and ideal customer alignment", Icon: IconStrategy },
  { label: "Technology", desc: "Platforms, integrations, and tooling that power the revenue system", Icon: IconTechnology },
  { label: "Data",       desc: "Signals, intelligence, and feedback loops across the full journey",  Icon: IconData },
  { label: "Processes",  desc: "Repeatable motions, playbooks, and operational discipline",          Icon: IconProcesses },
  { label: "People",     desc: "Talent, culture, and accountability structures that sustain it all", Icon: IconPeople },
];

// ── SVG corner brackets ───────────────────────────────────────────────────────
function SvgCorners({ x, y, w, h, size = 8, color = RED, weight = "1" }: {
  x: number; y: number; w: number; h: number; size?: number; color?: string; weight?: string;
}) {
  return (
    <g stroke={color} strokeWidth={weight} fill="none">
      <path d={`M${x+size},${y} L${x},${y} L${x},${y+size}`}/>
      <path d={`M${x+w-size},${y} L${x+w},${y} L${x+w},${y+size}`}/>
      <path d={`M${x},${y+h-size} L${x},${y+h} L${x+size},${y+h}`}/>
      <path d={`M${x+w-size},${y+h} L${x+w},${y+h} L${x+w},${y+h-size}`}/>
    </g>
  );
}

// ── Revenue Infrastructure Diagram ───────────────────────────────────────────
function Diagram({ active, onEnter, onLeave }: {
  active: number | null;
  onEnter: (i: number) => void;
  onLeave: () => void;
}) {
  const lineLengths = NODE_CXS.map(cx => Math.hypot(HUB_CX - cx, HUB_TOP - LINE_FROM_Y));

  return (
    <svg
      viewBox={`-20 -14 ${VW + 40} ${VH + 18}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-label="Revenue Infrastructure diagram"
    >
      <defs>
        <filter id="glow-line" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-hub" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-node" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* per-line gradient */}
        {NODE_CXS.map((cx, i) => (
          <linearGradient key={i} id={`lg${i}`}
            x1={cx} y1={LINE_FROM_Y} x2={HUB_CX} y2={HUB_TOP}
            gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={RED} stopOpacity="0.15"/>
            <stop offset="100%" stopColor={RED} stopOpacity="0.9"/>
          </linearGradient>
        ))}

        {/* radial glow behind hub */}
        <radialGradient id="hubAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.07"/>
          <stop offset="100%" stopColor={RED} stopOpacity="0"/>
        </radialGradient>

        <style>{`
          @keyframes _draw  { from { stroke-dashoffset: var(--ll); } to { stroke-dashoffset: 0; } }
          @keyframes _part  {
            0%  { stroke-dashoffset: var(--ll); opacity: .85; }
            85% { stroke-dashoffset: 0; opacity: .85; }
            100%{ stroke-dashoffset: 0; opacity: 0; }
          }
          @keyframes _pop   { from { opacity: 0; transform: scale(.82); } to { opacity: 1; transform: scale(1); } }
          @keyframes _pulse { 0% { r: 5; opacity: .65; } 70% { r: 20; opacity: 0; } 100% { r: 20; opacity: 0; } }
          @keyframes _drop  { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes _nIn   { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          .ri-node { animation: _nIn .55s ease both; }
          .ri-hub  { animation: _pop .45s ease .9s  both; opacity: 0; transform-origin: ${HUB_CX}px ${HUB_CY}px; }
          .ri-conn { animation: _drop .45s ease 1.35s both; opacity: 0; }
          .ri-out  { animation: _drop .55s ease 1.55s both; opacity: 0; }
        `}</style>
      </defs>

      {/* ── Hub area radial aura ── */}
      <ellipse cx={HUB_CX} cy={HUB_CY + 20} rx="220" ry="100" fill="url(#hubAura)"/>

      {/* ── Horizontal rail connecting pillar tops ── */}
      <line
        x1={NODE_CXS[0]} y1={BOX_TOP}
        x2={NODE_CXS[4]} y2={BOX_TOP}
        stroke={RED} strokeOpacity="0.1" strokeWidth="1"
        strokeDasharray="4 5"
      />

      {/* ── Ghost lines ── */}
      {NODE_CXS.map((cx, i) => (
        <line key={`g${i}`} x1={cx} y1={LINE_FROM_Y} x2={HUB_CX} y2={HUB_TOP}
          stroke={RED} strokeOpacity="0.08" strokeWidth="1"/>
      ))}

      {/* ── Animated gradient lines ── */}
      {NODE_CXS.map((cx, i) => {
        const ll = lineLengths[i];
        const on = active === i;
        return (
          <line key={`l${i}`} x1={cx} y1={LINE_FROM_Y} x2={HUB_CX} y2={HUB_TOP}
            stroke={on ? RED : `url(#lg${i})`}
            strokeWidth={on ? 2.2 : 1.3}
            strokeDasharray={`${ll}`}
            strokeDashoffset="0"
            filter={on ? "url(#glow-line)" : undefined}
            style={{ "--ll": ll, animation: `_draw .7s cubic-bezier(.4,0,.2,1) ${i*.08}s both`, transition: "stroke .2s, stroke-width .2s" } as React.CSSProperties}
          />
        );
      })}

      {/* ── Particle flow ── */}
      {NODE_CXS.map((cx, i) => {
        const ll = lineLengths[i];
        return (
          <line key={`p${i}`} x1={cx} y1={LINE_FROM_Y} x2={HUB_CX} y2={HUB_TOP}
            stroke={RED} strokeWidth="2.5" strokeDasharray={`5 ${ll}`} strokeLinecap="round"
            style={{ "--ll": ll, animation: `_part 2.8s ease-in ${1.1+i*.18}s infinite`, opacity: 0 } as React.CSSProperties}
          />
        );
      })}

      {/* ── Pillar nodes ── */}
      {PILLARS.map(({ label, Icon }, i) => {
        const cx = NODE_CXS[i];
        const bx = cx - BOX_W / 2;
        const on = active === i;
        return (
          <g key={i} className="ri-node"
            style={{ animationDelay: `${.06 + i*.09}s` }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={onLeave}
          >
            {/* number label */}
            <text x={cx} y={NUM_Y}
              textAnchor="middle" fontSize="8" fontFamily="'DM Sans', sans-serif"
              fontWeight="600" letterSpacing="0.8"
              fill={on ? RED : "rgba(132,22,23,0.45)"}
              style={{ transition: "fill .2s" } as React.CSSProperties}
            >
              {`0${i+1}`}
            </text>

            {/* glow halo on active */}
            {on && (
              <rect x={bx-3} y={BOX_TOP-3} width={BOX_W+6} height={BOX_H+6}
                fill="none" stroke={BLACK} strokeWidth="10" strokeOpacity="0.1"
                filter="url(#glow-node)"
              />
            )}

            {/* box */}
            <rect x={bx} y={BOX_TOP} width={BOX_W} height={BOX_H}
              fill={on ? BLACK : "#fff"}
              stroke={on ? BLACK : RED}
              strokeOpacity={on ? 1 : 0.3}
              strokeWidth="1.5"
              style={{ transition: "fill .22s, stroke .22s, stroke-opacity .22s" }}
            />
            <SvgCorners x={bx} y={BOX_TOP} w={BOX_W} h={BOX_H} color={RED} weight="1.2"/>

            {/* icon */}
            <g transform={`translate(${cx},${ICON_Y})`} color={on ? "#fff" : RED}
              style={{ transition: "color .22s" }}>
              <Icon/>
            </g>

            {/* label */}
            <text x={cx} y={LABEL_Y}
              textAnchor="middle" fontSize="9" fontFamily="'DM Sans', sans-serif"
              fontWeight="600" letterSpacing="1.6"
              fill={on ? BLACK : "#4a4a4a"}
              style={{ transition: "fill .2s" } as React.CSSProperties}
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* ── Hub ── */}
      <g className="ri-hub">
        <rect x={HUB_CX-HUB_W/2+5} y={HUB_TOP+5} width={HUB_W} height={HUB_H}
          fill={RED} opacity="0.14"/>
        <rect x={HUB_CX-HUB_W/2} y={HUB_TOP} width={HUB_W} height={HUB_H}
          fill={BLACK} stroke={BLACK} strokeWidth="1.5"/>
        <SvgCorners x={HUB_CX-HUB_W/2} y={HUB_TOP} w={HUB_W} h={HUB_H} size={10} color={RED} weight="1.2"/>
        <text x={HUB_CX} y={HUB_CY+5}
          textAnchor="middle" fontSize="11.5" fontFamily="'DM Sans', sans-serif"
          fontWeight="600" letterSpacing="2.8" fill="#fff"
        >
          REVENUE INFRASTRUCTURE
        </text>
        <circle cx={HUB_CX} cy={HUB_TOP} r="5" fill={RED} filter="url(#glow-hub)"/>
        <circle cx={HUB_CX} cy={HUB_TOP} fill="none" stroke={RED} strokeWidth="1.2"
          style={{ animation: "_pulse 2.4s ease-out 1.2s infinite" }}/>
      </g>

      {/* ── Connector ── */}
      <g className="ri-conn">
        <line x1={HUB_CX} y1={HUB_TOP+HUB_H} x2={HUB_CX} y2={CONN_END_Y-7}
          stroke={BLACK} strokeWidth="1.5" strokeOpacity="0.4"
          strokeDasharray="3 3"
        />
        <polygon
          points={`${HUB_CX-5},${CONN_END_Y-7} ${HUB_CX+5},${CONN_END_Y-7} ${HUB_CX},${CONN_END_Y+2}`}
          fill={BLACK} opacity="0.7"
        />
      </g>

      {/* ── Outcomes ── */}
      <g className="ri-out">
        <rect x={OUT_CX-OUT_W/2+5} y={OUT_TOP+5} width={OUT_W} height={OUT_H}
          fill={BLACK} opacity="0.06"/>
        <rect x={OUT_CX-OUT_W/2} y={OUT_TOP} width={OUT_W} height={OUT_H}
          fill="#fff" stroke={BLACK} strokeWidth="1.5"/>
        <SvgCorners x={OUT_CX-OUT_W/2} y={OUT_TOP} w={OUT_W} h={OUT_H} size={9} color={RED} weight="1.2"/>
        <text x={OUT_CX} y={OUT_TOP+30}
          textAnchor="middle" fontSize="18"
          fontFamily="'DM Serif Display', Georgia, serif"
          fontWeight="400" fill={BLACK} letterSpacing="0.3"
        >
          Revenue Outcomes
        </text>
        <text textAnchor="middle" fontSize="9" fontFamily="'DM Sans', sans-serif"
          fontWeight="500" fill="rgba(0,0,0,0.42)" letterSpacing="2">
          <tspan x={OUT_CX} y={OUT_TOP+54}>GROWTH · EFFICIENCY</tspan>
          <tspan x={OUT_CX} dy="16">PREDICTABILITY · SCALABILITY</tspan>
        </text>
      </g>
    </svg>
  );
}

// ── Cross icon ────────────────────────────────────────────────────────────────
function CrossIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="8" y2="8" stroke={RED} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="2" y2="8" stroke={RED} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const NOT_ITEMS = [
  "A marketing funnel",
  "A CRM or technology stack",
  "A collection of isolated tactics",
];

// ── Page section ──────────────────────────────────────────────────────────────
export default function CanonicalDefinition() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activePillar, setActivePillar] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(16px)",
    transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="canonical-definition"
      style={{
        background: "#fff",
        borderTop: `3px solid ${BLACK}`,
        padding: "96px 0 0",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(132,22,23,0.07) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}/>

      <div style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 48px)",
        position: "relative",
        boxSizing: "border-box",
      }}>

        {/* ── Eyebrow ── */}
        <p style={{
          ...fade(0),
          margin: "0 0 48px",
          fontSize: 14,
          fontWeight: 600,
          color: RED,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Canonical Definition
        </p>

        {/* ── Two-column grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)",
          gap: "clamp(40px, 5vw, 80px)",
          alignItems: "start",
        }} className="def-grid">

          {/* ══ LEFT ══ */}
          <div style={{ minWidth: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>

            {/* heading */}
            <h2 style={{
              ...fade(0.07),
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              fontSize: 44,
              lineHeight: 1.18,
              color: BLACK,
              margin: "0 0 28px",
              letterSpacing: "-0.015em",
            }}>
              The interconnected system behind every{" "}
              <em style={{ color: RED }}>revenue outcome.</em>
            </h2>

            {/* definition paragraph */}
            <div style={{ ...fade(0.2), position: "relative", paddingLeft: 18, marginBottom: 32 }}>
              <span style={{
                position: "absolute", left: 0, top: 4, bottom: 4,
                width: 2,
                background: `linear-gradient(${RED}, rgba(132,22,23,0.06))`,
              }}/>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.8, color: "#565656" }}>
                <strong style={{ color: BLACK, fontWeight: 600 }}>Revenue Infrastructure</strong> is the
                interconnected system through which a business creates demand, captures opportunity, converts
                buyers, delivers value, retains customers, and learns from the results — connecting strategy,
                technology, data, processes, and people into a single operating whole.
              </p>
            </div>

            {/* "It is not" */}
            <div style={{ ...fade(0.28), marginBottom: 36, borderLeft: `3px solid ${RED}`, paddingLeft: 18 }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
                textTransform: "uppercase", color: RED, margin: "0 0 12px",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                It is not
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {NOT_ITEMS.map((item, i) => (
                  <li key={i} style={{
                    display: "flex", alignItems: "center", gap: 11,
                    fontSize: 14, color: "#3c3c3c",
                    padding: "9px 0",
                    borderBottom: i < NOT_ITEMS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  }}>
                    <span style={{
                      width: 20, height: 20, flexShrink: 0,
                      border: "1px solid rgba(132,22,23,0.3)",
                      background: "rgba(132,22,23,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <CrossIcon/>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Five pillars — numbered tags */}
            <div style={{ ...fade(0.36) }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#aaa", margin: "0 0 12px",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Five pillars
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {PILLARS.map((p, i) => {
                  const on = activePillar === i;
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => setActivePillar(i)}
                      onMouseLeave={() => setActivePillar(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 7,
                        border: `1px solid ${on ? BLACK : "rgba(0,0,0,0.15)"}`,
                        padding: "5px 14px 5px 10px",
                        fontSize: 11, fontWeight: 500,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: on ? "#fff" : "#444",
                        background: on ? BLACK : "transparent",
                        cursor: "default", transition: "all .2s",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 700, color: on ? RED : RED, letterSpacing: "0.05em" }}>
                        0{i+1}
                      </span>
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* pillar description */}
              <div style={{ marginTop: 16, minHeight: 24, transition: "opacity .2s", opacity: activePillar !== null ? 1 : 0 }}>
                {activePillar !== null && (
                  <p style={{ margin: 0, fontSize: 13, color: "#555", fontStyle: "italic", lineHeight: 1.6 }}>
                    <span style={{ color: RED, fontStyle: "normal", fontWeight: 600 }}>
                      {`0${activePillar+1} — `}
                    </span>
                    {PILLARS[activePillar].desc}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ══ RIGHT — diagram ══ */}
          <div style={{ ...fade(0.14), minWidth: 0, width: "100%", paddingTop: 4 }}>
            <Diagram
              active={activePillar}
              onEnter={setActivePillar}
              onLeave={() => setActivePillar(null)}
            />
          </div>
        </div>
      </div>

      {/* ── Closing strip ── */}
      <div style={{
        ...fade(0.45),
        marginTop: 80,
        borderTop: "1px solid rgba(0,0,0,0.09)",
        background: BLACK,
        padding: "36px clamp(20px, 4vw, 48px)",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <p style={{
            margin: 0,
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(16px, 2vw, 22px)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.4,
            fontStyle: "italic",
            maxWidth: 640,
          }}>
            "Revenue Infrastructure is not built — it is architected with intention and compounded over time."
          </p>
          <span style={{
            display: "block",
            width: 40, height: 40,
            border: `1.5px solid ${RED}`,
            flexShrink: 0,
            position: "relative",
          }}>
            <span style={{ position: "absolute", inset: 5, border: `1px solid rgba(132,22,23,0.35)` }}/>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .def-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
