import { useState, useEffect, useRef } from 'react'
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const DOMAINS = [
  { id: 1,  short: ['Strategy &', 'Positioning'],   name: 'Strategy & Positioning',           desc: 'Defines target markets, competitive positioning, and the revenue growth strategy that guides every other domain in the system.' },
  { id: 2,  short: ['Market', 'Visibility'],         name: 'Market Visibility',                 desc: 'Ensures the right audience discovers and recognizes the brand through SEO, content, advertising, and channel presence.' },
  { id: 3,  short: ['Digital', 'Experience'],        name: 'Digital Experience',                desc: 'The website and digital touchpoints that convert visibility into engagement and qualified interest.' },
  { id: 4,  short: ['Lead Capture', '& Conversion'], name: 'Lead Capture & Conversion',        desc: 'Systems and processes that capture prospect information and qualify interest into actionable, scored leads.' },
  { id: 5,  short: ['CRM &', 'Pipeline'],            name: 'CRM & Pipeline',                   desc: 'The platform and workflow that tracks every opportunity, ensuring no lead is lost and pipeline always remains visible.' },
  { id: 6,  short: ['Automation', '& Follow-Up'],    name: 'Automation & Follow-Up',           desc: 'Systematic, personalized outreach that keeps prospects engaged through automated and triggered communications.' },
  { id: 7,  short: ['Sales', 'Enablement'],          name: 'Sales Enablement & Conversion',    desc: 'The tools, content, and processes that empower sales teams to close business consistently and predictably.' },
  { id: 8,  short: ['Customer', 'Experience'],       name: 'Customer Experience & Retention',  desc: 'Post-sale systems that deliver on the promise, reduce churn, and build long-term customer advocates.' },
  { id: 9,  short: ['Data &', 'Measurement'],        name: 'Data, Measurement & Optimization', desc: 'The analytics layer providing insight across all domains to continuously improve performance at every stage.' },
]

const DOMAIN_ICONS = ['target', 'eye', 'monitor', 'magnet', 'database', 'zap', 'briefcase', 'heart', 'chart']

const LEAKAGE_STAGES = [
  { name: 'Visibility', desc: 'The right audience arrives, but the message or experience doesn\'t connect.' },
  { name: 'Website',    desc: 'Interest isn\'t captured or context is lost before a lead is created.' },
  { name: 'CRM',        desc: 'Leads aren\'t prioritized or followed up with quickly enough.' },
  { name: 'Follow-Up',  desc: 'Handoff lacks context or buyer intent is lost in the transition.' },
  { name: 'Sales',      desc: 'Onboarding or delivery doesn\'t meet expectations set during the sale.' },
  { name: 'Customer',   desc: 'No feedback loop exists to learn from experience and improve.' },
  { name: 'Intelligence', desc: null },
]

const MATURITY_STAGES = [
  { n: '01', name: 'Fragmented',    desc: 'Silos. Manual processes. Limited visibility across the revenue system.' },
  { n: '02', name: 'Stabilized',    desc: 'Core systems in place. Basic alignment between teams and tools.' },
  { n: '03', name: 'Integrated',    desc: 'Systems connect. Data flows. Handoffs between domains improve.' },
  { n: '04', name: 'AI-Enabled',    desc: 'Intelligence drives actions, prioritization, and next-best steps.' },
  { n: '05', name: 'Revenue Engine',desc: 'A learning system. Predictable, scalable growth at every stage.' },
]

// ─── Icons ─────────────────────────────────────────────────────────────────────

const I = {
  target:    ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  eye:       ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  monitor:   ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
  ),
  magnet:    ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><path d="M6 15H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M18 15h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><path d="M4 6v7a8 8 0 0 0 16 0V6"/></svg>
  ),
  database:  ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ),
  zap:       ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  briefcase: ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  heart:     ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  ),
  chart:     ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
  ),
  search:    ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  ),
  gear:      ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  pen:       ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
  ),
  arrow:     ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  warning:   ({ s=20, c='#D97706' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><path d="m10.29 3.86-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.71-3.14l-8-14a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  cart:      ({ s=20, c='currentColor' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
  ),
}

function Icon({ name, s = 20, c = 'currentColor' }: { name: string; s?: number; c?: string }) {
  const Component = I[name as keyof typeof I]
  return Component ? <Component s={s} c={c} /> : null
}

// ─── Shared layout primitives ───────────────────────────────────────────────────
// Container: max 1200 px, 64 px desktop gutters
const CONTAINER = 'max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16'

function SectionLabel({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p className="text-[18px] font-sans font-semibold text-[#BE1E2D] tracking-[0.18em] uppercase mb-4">
      {label}
    </p>
  )
}

// ─── INFRA VISUAL FROM ZIP ─────────────────────────────────────────────────────
const CRIMSON = "#BE1E2D";
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

const INFRA_W = 680;
const INFRA_H = 280;
const INFRA_ICON_BOX_H = 60;
// Lines start at the bottom-center of the icon box (no label offset).
const INFRA_LINE_START_Y = INFRA_ICON_BOX_H;
const INFRA_HUB_CX = INFRA_W / 2;
const INFRA_HUB_CY = INFRA_H - 8;

// 5 pillars evenly spaced, symmetric around the horizontal center.
// Positions: 10%, 30%, 50%, 70%, 90% of the diagram width (4 equal gaps).
const INFRA_X_POSITIONS = [0.1, 0.3, 0.5, 0.7, 0.9].map((r) => r * INFRA_W);

function InfraVisual() {
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

        {/* Diagram — fixed width so SVG coords match HTML percentages 1:1 */}
        <div style={{ position: "relative", width: INFRA_W }}>

          {/* SVG layer: lines — scales proportionally within the 680px container */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${INFRA_W} ${INFRA_H}`}
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
              {INFRA_X_POSITIONS.map((x, i) => (
                <linearGradient key={i} id={`lineGrad${i}`} x1={x} y1={INFRA_LINE_START_Y} x2={INFRA_HUB_CX} y2={INFRA_HUB_CY} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={CRIMSON} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={CRIMSON} stopOpacity="0.9" />
                </linearGradient>
              ))}
            </defs>

            {/* Base dim lines */}
            {INFRA_X_POSITIONS.map((x, i) => (
              <line
                key={`base-${i}`}
                x1={x} y1={INFRA_LINE_START_Y}
                x2={INFRA_HUB_CX} y2={INFRA_HUB_CY}
                stroke={CRIMSON_DIM}
                strokeWidth="1"
              />
            ))}

            {/* Animated draw lines */}
            {animated && INFRA_X_POSITIONS.map((x, i) => {
              const dx = INFRA_HUB_CX - x;
              const dy = INFRA_HUB_CY - INFRA_LINE_START_Y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const isHov = hovered === i;
              return (
                <line
                  key={`anim-${i}`}
                  x1={x} y1={INFRA_LINE_START_Y}
                  x2={INFRA_HUB_CX} y2={INFRA_HUB_CY}
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
            {animated && INFRA_X_POSITIONS.map((x, i) => {
              const dx = INFRA_HUB_CX - x;
              const dy = INFRA_HUB_CY - INFRA_LINE_START_Y;
              const len = Math.sqrt(dx * dx + dy * dy);
              return (
                <line
                  key={`particle-${i}`}
                  x1={x} y1={INFRA_LINE_START_Y}
                  x2={INFRA_HUB_CX} y2={INFRA_HUB_CY}
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
                  cx={INFRA_HUB_CX} cy={INFRA_HUB_CY} r="5"
                  fill={CRIMSON}
                  filter="url(#hubGlow)"
                  style={{ animation: "hubAppear 0.4s ease 0.8s both" }}
                />
                <circle
                  cx={INFRA_HUB_CX} cy={INFRA_HUB_CY}
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

          {/* Pillar icon nodes */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {PILLARS.map((p, i) => {
              const pct = INFRA_X_POSITIONS[i] / INFRA_W;
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
                    <span style={{ position: "absolute", top: -1, left: -1, width: 6, height: 6, borderTop: `1px solid ${CRIMSON}`, borderLeft: `1px solid ${CRIMSON}` }} />
                    <span style={{ position: "absolute", top: -1, right: -1, width: 6, height: 6, borderTop: `1px solid ${CRIMSON}`, borderRight: `1px solid ${CRIMSON}` }} />
                    <span style={{ position: "absolute", bottom: -1, left: -1, width: 6, height: 6, borderBottom: `1px solid ${CRIMSON}`, borderLeft: `1px solid ${CRIMSON}` }} />
                    <span style={{ position: "absolute", bottom: -1, right: -1, width: 6, height: 6, borderBottom: `1px solid ${CRIMSON}`, borderRight: `1px solid ${CRIMSON}` }} />
                    {p.icon}
                  </div>

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

        {/* Revenue Infrastructure — central label */}
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

// ─── SECTION 01: HERO ──────────────────────────────────────────────────────────
function HeroSection() {
  const scrollToNext = () => {
    document.getElementById('canonical-definition')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-gws-dark text-white min-h-[532px] flex flex-col relative overflow-hidden pt-[88px] pb-14">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Glow */}
      <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-none bg-crimson/20 blur-[120px] pointer-events-none" />

      <div className={`${CONTAINER} relative z-10 w-full flex-1 flex items-center`}>
        <div className="w-full max-w-[720px]">

          {/* Copy */}
          <div>
            <SectionLabel label="REVENUE INFRASTRUCTURE" dark />
            {/* H1 — 60px desktop / 40px mobile, DM Serif Display */}
            <h1 className="font-serif font-normal text-[40px] md:text-[60px] leading-[1.08] tracking-tight mb-6">
              Revenue <span className="text-[#BE1E2D]">growth</span> depends on the{' '}
              <span className="text-[#BE1E2D]">system</span> behind it.
            </h1>
            {/* Body Large — 20px desktop / 18px mobile */}
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-black max-w-[560px]">
              Revenue Infrastructure is the connected system of strategy, technology, data, processes, and execution that turns market opportunity into measurable revenue. When those parts work together, growth becomes easier to see, manage, and improve.
            </p>
            {/* Primary CTA removed */}
          </div>
        </div>
      </div>

      {/* Bottom-center: Learn More + accordion chevron */}
      <div className="relative z-10 flex flex-col items-center gap-3 pt-6">
        <button
          onClick={scrollToNext}
          className="framework-learn-more"
        >
          Learn More
        </button>
        <button
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="flex flex-col items-center gap-1 group"
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#BE1E2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="framework-learn-more-chevron opacity-60 group-hover:opacity-100 transition-opacity animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </section>
  )
}

// ─── SECTION 02: CANONICAL DEFINITION ─────────────────────────────────────────
function CanonicalDefinitionSection() {
  const { ref, visible } = useReveal()
  const inputs = [
    { label: 'Strategy',   Icon: () => <Icon name="target"   s={24} c="#BE1E2D" /> },
    { label: 'Technology', Icon: () => <Icon name="monitor"  s={24} c="#BE1E2D" /> },
    { label: 'Data',       Icon: () => <Icon name="database" s={24} c="#BE1E2D" /> },
    { label: 'Processes',  Icon: () => <Icon name="gear"     s={24} c="#BE1E2D" /> },
    { label: 'People',     Icon: () => <Icon name="heart"    s={24} c="#BE1E2D" /> },
  ]

  return (
    <section id="canonical-definition" ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel label="Canonical Definition" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column — text */}
            <div>
              <p className="text-[17px] md:text-[18px] leading-[1.65] text-gray-500 mb-8">
                Revenue Infrastructure is the interconnected system through which a business creates demand, captures opportunity, converts buyers, delivers value, retains customers, and learns from the results. It includes the strategies, technologies, data, processes, people, and feedback loops that connect the entire revenue journey. It is not a marketing funnel, a CRM, a technology stack, or a collection of isolated tactics.
              </p>
            </div>

            {/* Right column — Infrastructure visuals from zip (direct JSX, animations/colors preserved) */}
            <div className="w-full">
              <InfraVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 03: WHY IT MATTERS ────────────────────────────────────────────────
function WhyItMattersSection() {
  const { ref, visible } = useReveal()
  const stages = [
    { label: 'Opportunity', icon: 'target' },
    { label: 'Capture',     icon: 'magnet' },
    { label: 'Conversion',  icon: 'cart' },
    { label: 'Delivery',    icon: 'briefcase' },
    { label: 'Retention',   icon: 'heart' },
    { label: 'Intelligence',icon: 'chart' },
    { label: 'Optimization',icon: 'gear' },
  ]
  const gaps = ['Poor visibility', 'Disjointed experience', 'Slow follow-up', 'Disconnected handoff', 'No insight loop', 'No optimization']

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-surface">
      <div className={CONTAINER}>
        <SectionLabel label="Why Revenue Infrastructure Matters" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          {/* H2 */}
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Revenue is a journey.
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Value is either passed forward — or lost at the handoffs.
          </p>

          {/* Journey visual */}
          <div className="overflow-x-auto -mx-5 px-5 md:-mx-8 md:px-8 lg:mx-0 lg:px-0">
            <div className="min-w-[700px]">
              {/* Icons row */}
              <div className="flex items-center">
                {stages.map((s, i) => (
                  <div key={s.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-14 h-14 rounded-none bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                        <Icon name={s.icon} s={22} c="#374151" />
                      </div>
                    </div>
                    {i < stages.length - 1 && (
                      <div className="flex items-center shrink-0 px-0.5">
                        <div className="w-5 h-px bg-gray-300" />
                        <div className="w-0 h-0 border-l-[5px] border-t-[4px] border-b-[4px] border-l-gray-400 border-t-transparent border-b-transparent" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stage labels — 16 px minimum */}
              <div className="flex mt-4 mb-8">
                {stages.map((s) => (
                  <div key={s.label} className="flex-1 text-center">
                    <span className="text-[14px] font-sans font-medium text-gray-600">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Gap / leakage markers */}
              <div className="flex px-7 mb-2">
                {gaps.map((g, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <Icon name="warning" s={20} />
                    <p className="text-[14px] font-sans text-gray-400 text-center leading-tight mt-2 max-w-[72px]">{g}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-16 border-t border-gray-200 pt-10">
            <p className="text-center text-[18px] font-sans font-medium text-gray-700 max-w-[620px] mx-auto leading-[1.6]">
              Revenue Infrastructure eliminates gaps, aligns the journey, and accelerates outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 04: NINE-DOMAIN FRAMEWORK ────────────────────────────────────────
function NineDomainSection() {
  const { ref, visible } = useReveal()
  const [activeDomain, setActiveDomain] = useState<number | null>(null)

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel label="Nine-Domain Framework" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Nine domains. One connected system.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[620px]">
            Each domain serves the whole. Together they form a coordinated revenue system.
          </p>

          {/* 3×3 card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOMAINS.map((d) => {
              const isActive = activeDomain === d.id
              const isOther  = activeDomain !== null && !isActive
              const icon     = DOMAIN_ICONS[d.id - 1]
              return (
                <button
                  key={d.id}
                  className="text-left rounded-none border p-7 transition-all duration-200 focus:outline-none group"
                  style={{
                    borderColor:  isActive ? '#841617' : '#E5E7EB',
                    background:   isActive ? '#FFF1F2' : 'white',
                    opacity:      isOther ? 0.45 : 1,
                    boxShadow:    isActive
                      ? '0 0 0 3px rgba(132,22,23,0.08), 0 4px 16px rgba(132,22,23,0.1)'
                      : '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={() => setActiveDomain(d.id)}
                  onMouseLeave={() => setActiveDomain(null)}
                  onClick={() => setActiveDomain(isActive ? null : d.id)}
                >
                  {/* Card header: icon + number */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-none flex items-center justify-center transition-colors duration-200"
                      style={{ background: isActive ? '#841617' : '#F3F4F6' }}
                    >
                      <Icon name={icon} s={20} c={isActive ? 'white' : '#4B5563'} />
                    </div>
                    <span
                      className="font-sans font-bold text-[12px] tracking-[0.14em]"
                      style={{ color: isActive ? '#841617' : '#D1D5DB' }}
                    >
                      {String(d.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Domain name */}
                  <h4
                    className="font-serif font-normal text-[20px] md:text-[21px] leading-[1.3] mb-3"
                    style={{ color: isActive ? '#841617' : '#111827' }}
                  >
                    {d.name}
                  </h4>

                  {/* Description */}
                  <p className="font-sans text-[15px] leading-[1.65] text-gray-500">
                    {d.desc}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 05: REVENUE INFRASTRUCTURE FLYWHEEL ────────────────────────────────────────
function RevenueInfrastructureFlywheelSection() {
  const [active, setActive] = useState<number | null>(null)
  const CX = 350
  const CY = 350
  const RING_R = 190
  const NODE_R = 32
  const LABEL_R = 258
  const HUB_R = 78
  const RED = '#BE1E2D'

  const STEPS = [
    { n: '01', label: 'Discover',  sub: 'Surface insights'    },
    { n: '02', label: 'Define',    sub: 'Frame the challenge'  },
    { n: '03', label: 'Design',    sub: 'Shape solutions'      },
    { n: '04', label: 'Develop',   sub: 'Build precisely'      },
    { n: '05', label: 'Deploy',    sub: 'Ship confidently'     },
    { n: '06', label: 'Measure',   sub: 'Learn and iterate'    },
  ]

  const step = active !== null ? STEPS[active] : null

  const ANCHORS = ['middle', 'start', 'start', 'middle', 'end', 'end'] as const
  const toRad = (d: number) => (d * Math.PI) / 180
  const ANGS = STEPS.map((_, i) => toRad(-90 + i * 60))

  const nodePts = ANGS.map(a => ({ x: CX + RING_R * Math.cos(a), y: CY + RING_R * Math.sin(a) }))
  const labelPts = ANGS.map(a => ({ x: CX + LABEL_R * Math.cos(a), y: CY + LABEL_R * Math.sin(a) }))

  const GAP = Math.asin((NODE_R + 8) / RING_R)

  function arcPath(i: number) {
    const j = (i + 1) % 6
    const a1 = ANGS[i] + GAP
    const a2 = ANGS[j] - GAP
    const x1 = (CX + RING_R * Math.cos(a1)).toFixed(2)
    const y1 = (CY + RING_R * Math.sin(a1)).toFixed(2)
    const x2 = (CX + RING_R * Math.cos(a2)).toFixed(2)
    const y2 = (CY + RING_R * Math.sin(a2)).toFixed(2)
    return `M ${x1} ${y1} A ${RING_R} ${RING_R} 0 0 1 ${x2} ${y2}`
  }

  // Cookie-cutter tags — disable circular corners sitewide
  const zeroRadius = { borderRadius: 0 }

  return (
    <section className="py-[40px] bg-[#000000] text-white relative overflow-hidden" style={zeroRadius}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <div>
            <p className="text-[18px] font-sans font-semibold text-[#BE1E2D] tracking-[0.18em] uppercase mb-4">
              05&ensp;Revenue Infrastructure Flywheel
            </p>
            <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-white mb-5 max-w-[720px]">
              <span style={{ color: '#BE1E2D' }}>Revenue Infrastructure</span> <span style={{ color: '#ffffff' }}>compounds when the system reinforces itself.</span>
            </h2>
            <p className="text-[18px] leading-[1.65] text-white/60 mb-16 max-w-[620px]">
              Each strength builds on the previous, creating a self-reinforcing cycle of growth.
            </p>
          </div>

          {/* Right column — flywheel */}
          <div className="flex items-center justify-center py-10 lg:py-0" style={{ minHeight: '560px' }}>
            <div className="relative" style={{ width: 'min(700px, 100vw)', height: '136vh', maxHeight: '1400px', aspectRatio: '1' }}>
            <svg viewBox="0 0 700 700" style={{ width: '100%', height: '100%' }} aria-hidden="true">
              <defs>
                <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={RED} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={RED} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="hub-fill" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#1A1A1A" />
                  <stop offset="100%" stopColor="#000000" />
                </radialGradient>
                <radialGradient id="node-active" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#E8253A" />
                  <stop offset="100%" stopColor="#7A0010" />
                </radialGradient>
                <filter id="arrow-glow" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id="tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M0,2 L0,8 L9,5 z" fill={RED} />
                </marker>
              </defs>

              {/* Background radial glow */}
              <circle cx={CX} cy={CY} r={250} fill="url(#bg-glow)" />

              {/* Outer orbit ring */}
              <circle cx={CX} cy={CY} r={220} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Main track ring */}
              <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

              {/* Spinning dashed highlight */}
              <circle
                cx={CX} cy={CY} r={RING_R}
                fill="none"
                stroke={RED}
                strokeOpacity="0.28"
                strokeWidth="1"
                strokeDasharray="4 30"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: 'ring-spin 18s linear infinite',
                }}
              />

              {/* Arc arrows */}
              {STEPS.map((_, i) => {
                const dim = active !== null && active !== i
                return (
                  <g key={i} style={{ transition: 'opacity 0.3s ease' }} opacity={dim ? 0.18 : 1}>
                    {/* soft glow layer */}
                    <path
                      d={arcPath(i)}
                      fill="none"
                      stroke={RED}
                      strokeWidth="7"
                      strokeLinecap="round"
                      opacity="0.15"
                    />
                    {/* main arc */}
                    <path
                      d={arcPath(i)}
                      fill="none"
                      stroke={RED}
                      strokeWidth="2"
                      strokeLinecap="round"
                      markerEnd="url(#tip)"
                    />
                  </g>
                )
              })}

              {/* Center hub */}
              <circle cx={CX} cy={CY} r={HUB_R + 6} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <circle cx={CX} cy={CY} r={HUB_R} fill="url(#hub-fill)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

              {/* Hub default label */}
              {active === null && (
                <text
                  x={CX} y={CY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.22)"
                  fontSize="15"
                  fontWeight="700"
                  letterSpacing="0.2em"
                  fontFamily="'Inter', system-ui, sans-serif"
                >
                  FLYWHEEL
                </text>
              )}

              {/* Hub active content */}
              {step && (
                <>
                  <text x={CX} y={CY - 28} textAnchor="middle" dominantBaseline="middle"
                    fill={RED} fontSize="15" fontWeight="700" letterSpacing="0.15em"
                    fontFamily="'Inter', system-ui, sans-serif">
                    {step.n}
                  </text>
                  <text x={CX} y={CY + 3} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="24" fontWeight="700" letterSpacing="0.01em"
                    fontFamily="'Inter', system-ui, sans-serif">
                    {step.label}
                  </text>
                  <text x={CX} y={CY + 33} textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(255,255,255,0.4)" fontSize="15" fontWeight="400"
                    fontFamily="'Inter', system-ui, sans-serif">
                    {step.sub}
                  </text>
                </>
              )}

              {/* Node circles */}
              {STEPS.map((s, i) => {
                const { x, y } = nodePts[i]
                const isActive = active === i
                return (
                  <g
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {/* outer glow ring on hover */}
                    <circle
                      cx={x} cy={y} r={NODE_R + 14}
                      fill={RED}
                      opacity={isActive ? 0.12 : 0}
                      style={{ transition: 'opacity 0.25s ease' }}
                    />
                    {/* node body */}
                    <circle
                      cx={x} cy={y} r={NODE_R}
                      fill={isActive ? 'url(#node-active)' : '#0D1122'}
                      stroke={isActive ? RED : 'rgba(255,255,255,0.2)'}
                      strokeWidth={isActive ? '2' : '1.5'}
                      style={{ transition: 'fill 0.25s ease, stroke 0.25s ease' }}
                    />
                    {/* step number */}
                    <text
                      x={x} y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? 'white' : 'rgba(255,255,255,0.45)'}
                      fontSize="18"
                      fontWeight="600"
                      letterSpacing="0.05em"
                      fontFamily="'Inter', system-ui, sans-serif"
                      style={{ transition: 'fill 0.25s', userSelect: 'none' }}
                    >
                      {s.n}
                    </text>
                  </g>
                )
              })}

              {/* Outer labels */}
              {STEPS.map((s, i) => {
                const { x, y } = labelPts[i]
                const anchor = ANCHORS[i]
                const isActive = active === i
                const dimmed = active !== null && !isActive
                return (
                  <g
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <text
                      x={x} y={y - 14}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill={dimmed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.88)'}
                      fontSize="20"
                      fontWeight="600"
                      letterSpacing="0.01em"
                      fontFamily="'Inter', system-ui, sans-serif"
                      style={{ transition: 'fill 0.3s', userSelect: 'none' }}
                    >
                      {s.label}
                    </text>
                    <text
                      x={x} y={y + 18}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill={isActive ? `${RED}cc` : dimmed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}
                      fontSize="14"
                      fontWeight="400"
                      fontFamily="'Inter', system-ui, sans-serif"
                      style={{ transition: 'fill 0.3s', userSelect: 'none' }}
                    >
                      {s.sub}
                    </text>
                  </g>
                )
              })}
            </svg>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

// ─── SECTION 06: FRAGMENTED VS CONNECTED ──────────────────────────────────────
function FragmentedVsConnectedSection() {
  const { ref, visible } = useReveal()

  // Same 5 nodes, same positions — only the connectors differ
  const nodes = [
    { label: 'Marketing', icon: 'eye' },
    { label: 'Website',   icon: 'monitor' },
    { label: 'CRM',       icon: 'database' },
    { label: 'Sales',     icon: 'briefcase' },
    { label: 'Customer',  icon: 'heart' },
  ]

  // SVG coordinate space: 500 × 210
  // Nodes at equal x spacing, centered row
  const VW = 500, VH = 210
  const nodeY = 72, nodeR = 28
  const xs = [44, 136, 228, 320, 412]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel label="Fragmented vs Connected" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Same components. Very different outcomes.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[620px]">
            The difference isn't the tools. It's whether they work as a system.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            {/* ── FRAGMENTED ── */}
            <div className="border border-gray-200 rounded-none overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-7 pb-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-2 h-2 rounded-none bg-crimson shrink-0" />
                <span className="font-sans font-semibold text-[13px] tracking-[0.18em] uppercase text-gray-500">Fragmented</span>
              </div>

              {/* Diagram */}
              <div className="px-6 pt-8 pb-4 bg-gray-50/60 relative" style={{ aspectRatio: `${VW} / ${VH}` }}>
                {/* SVG: broken connectors */}
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VW} ${VH}`} aria-label="Fragmented system" aria-hidden="true">
                  <defs>
                    <marker id="s06BrkArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0,0 L 6,3 L 0,6 z" fill="#FECACA" />
                    </marker>
                  </defs>

                  {/* Broken connectors — red dashed, no arrowhead completion */}
                  {xs.slice(0, 4).map((x, i) => {
                    const mx = (x + xs[i + 1]) / 2  // midpoint x
                    return (
                      <g key={i}>
                        {/* Left half of broken line */}
                        <line
                          x1={x + nodeR + 3} y1={nodeY}
                          x2={mx - 10} y2={nodeY}
                          stroke="#FECACA" strokeWidth="1.5" strokeDasharray="5 3"
                        />
                        {/* Right half */}
                        <line
                          x1={mx + 10} y1={nodeY}
                          x2={xs[i + 1] - nodeR - 3} y2={nodeY}
                          stroke="#FECACA" strokeWidth="1.5" strokeDasharray="5 3"
                        />
                        {/* Break mark */}
                        <text x={mx} y={nodeY + 5} textAnchor="middle"
                          fill="#EF4444" fontSize="14" opacity="0.7"
                          fontFamily="'DM Sans', sans-serif">✕</text>
                      </g>
                    )
                  })}

                  {/* Node circles */}
                  {xs.map((x) => (
                    <circle key={x} cx={x} cy={nodeY} r={nodeR}
                      fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
                  ))}

                  {/* Node labels below circles */}
                  {nodes.map((n, i) => (
                    <text key={n.label}
                      x={xs[i]} y={nodeY + nodeR + 18}
                      textAnchor="middle" fill="#9CA3AF"
                      fontSize="13" fontFamily="'DM Sans', sans-serif" fontWeight="500">
                      {n.label}
                    </text>
                  ))}
                </svg>

                {/* HTML icons inside SVG circles — fixed CSS px */}
                {nodes.map((n, i) => {
                  const xPct = (xs[i] / VW) * 100
                  const yPct = (nodeY / VH) * 100
                  return (
                    <div key={n.label} className="absolute pointer-events-none"
                      style={{ left: `${xPct}%`, top: `${yPct}%`, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                      <Icon name={n.icon} s={18} c="#D1D5DB" />
                    </div>
                  )
                })}
              </div>

              {/* Feature list */}
              <div className="px-8 py-7">
                <ul className="space-y-3">
                  {['Disconnected systems', 'Missing handoffs', 'Isolated data silos', 'Context lost at every stage'].map(t => (
                    <li key={t} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <circle cx="8" cy="8" r="7" stroke="#FECACA" strokeWidth="1.2" />
                        <path d="M5 5l6 6M11 5L5 11" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" />
                      </svg>
                      <span className="text-[16px] font-sans text-gray-500">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── CONNECTED ── */}
            <div className="border border-connected/30 rounded-none overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-7 pb-5 border-b border-connected/10 flex items-center gap-3" style={{ background: 'rgba(5,150,105,0.04)' }}>
                <div className="w-2 h-2 rounded-none bg-connected shrink-0" />
                <span className="font-sans font-semibold text-[13px] tracking-[0.18em] uppercase text-connected">Connected</span>
              </div>

              {/* Diagram */}
              <div className="px-6 pt-8 pb-4 relative" style={{ aspectRatio: `${VW} / ${VH}`, background: 'rgba(5,150,105,0.03)' }}>
                {/* SVG: clean flow + feedback arc */}
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VW} ${VH}`} aria-label="Connected system" aria-hidden="true">
                  <defs>
                    <marker id="s06ConArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                      <path d="M 0,0 L 7,3.5 L 0,7 z" fill="#059669" />
                    </marker>
                    <marker id="s06RetArr" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto">
                      <path d="M 0,8 L 3.5,1 L 7,8 z" fill="#059669" fillOpacity="0.5" />
                    </marker>
                  </defs>

                  {/* Forward connectors — solid green arrows */}
                  {xs.slice(0, 4).map((x, i) => (
                    <line key={i}
                      x1={x + nodeR + 3} y1={nodeY}
                      x2={xs[i + 1] - nodeR - 3} y2={nodeY}
                      stroke="#059669" strokeWidth="1.8"
                      markerEnd="url(#s06ConArr)"
                    />
                  ))}

                  {/* Feedback arc — dashed, returning from Customer to Marketing */}
                  <path
                    d={`M ${xs[4]},${nodeY + nodeR + 2} C ${xs[4]},${VH - 12} ${xs[0]},${VH - 12} ${xs[0]},${nodeY + nodeR + 2}`}
                    fill="none" stroke="#059669" strokeOpacity="0.4"
                    strokeWidth="1.4" strokeDasharray="6 4"
                    markerEnd="url(#s06RetArr)"
                  />

                  {/* "Intelligence" label at arc bottom */}
                  <text x={VW / 2} y={VH - 4}
                    textAnchor="middle" fill="#059669" fillOpacity="0.55"
                    fontSize="11.5" fontStyle="italic" fontFamily="'DM Sans', sans-serif">
                    Intelligence feedback loop
                  </text>

                  {/* Node circles */}
                  {xs.map((x) => (
                    <circle key={x} cx={x} cy={nodeY} r={nodeR}
                      fill="white" stroke="#059669" strokeWidth="1.5" />
                  ))}

                  {/* Node labels */}
                  {nodes.map((n, i) => (
                    <text key={n.label}
                      x={xs[i]} y={nodeY + nodeR + 18}
                      textAnchor="middle" fill="#374151"
                      fontSize="13" fontFamily="'DM Sans', sans-serif" fontWeight="600">
                      {n.label}
                    </text>
                  ))}
                </svg>

                {/* HTML icons — fixed CSS px */}
                {nodes.map((n, i) => {
                  const xPct = (xs[i] / VW) * 100
                  const yPct = (nodeY / VH) * 100
                  return (
                    <div key={n.label} className="absolute pointer-events-none"
                      style={{ left: `${xPct}%`, top: `${yPct}%`, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                      <Icon name={n.icon} s={18} c="#059669" />
                    </div>
                  )
                })}
              </div>

              {/* Feature list */}
              <div className="px-8 py-7">
                <ul className="space-y-3">
                  {['Continuous signal flow', 'Shared context at every stage', 'Coordinated next actions', 'Feedback and intelligence loop'].map(t => (
                    <li key={t} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <circle cx="8" cy="8" r="7" fill="rgba(5,150,105,0.1)" stroke="#059669" strokeWidth="1.2" strokeOpacity="0.5" />
                        <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[16px] font-sans text-gray-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 07: REVENUE LEAKAGE ──────────────────────────────────────────────
function RevenueLeakageSection() {
  const { ref, visible } = useReveal()
  const [activeLeakage, setActiveLeakage] = useState<number | null>(null)

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[144px] bg-surface">
      <div className={CONTAINER}>
        <SectionLabel label="Revenue Leakage Points" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Value is lost at the gaps between systems.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Individual systems may exist — but revenue can disappear between them.
          </p>

          {/* Handoff chain — horizontal on desktop, vertical on mobile */}
          <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
            <div className="min-w-[700px]">
              {/* Stage nodes */}
              <div className="flex items-center">
                {LEAKAGE_STAGES.map((s, i) => (
                  <div key={s.name} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-[60px] h-[60px] rounded-none bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-3">
                        <Icon name={DOMAIN_ICONS[i] ?? 'chart'} s={24} c="#374151" />
                      </div>
                      {/* Stage name — 16 px minimum */}
                      <span className="text-[16px] font-sans font-semibold text-gray-700 text-center">{s.name}</span>
                    </div>

                    {/* Leakage marker between stages */}
                    {i < LEAKAGE_STAGES.length - 1 && (
                      <button
                        className="flex flex-col items-center shrink-0 px-1 group"
                        onClick={() => setActiveLeakage(activeLeakage === i ? null : i)}
                        aria-label={`Leakage point: ${LEAKAGE_STAGES[i].name} to ${LEAKAGE_STAGES[i + 1].name}`}
                      >
                        <div className={`w-9 h-9 rounded-none flex items-center justify-center transition-all ${activeLeakage === i ? 'bg-warning/20 scale-110' : 'hover:bg-warning/10'}`}>
                          <Icon name="warning" s={20} />
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leakage detail — stable panel, 18 px body text */}
          <div className="mt-10 min-h-[80px]">
            {activeLeakage !== null && LEAKAGE_STAGES[activeLeakage].desc ? (
              <div className="bg-warning-light border border-warning/20 rounded-none p-8">
                <div className="flex items-start gap-4">
                  <Icon name="warning" s={22} />
                  <div>
                    <p className="text-[16px] font-sans font-semibold text-gray-800 mb-2">
                      {LEAKAGE_STAGES[activeLeakage].name} → {LEAKAGE_STAGES[activeLeakage + 1].name}
                    </p>
                    <p className="text-[18px] font-sans text-gray-600 leading-[1.65]">
                      {LEAKAGE_STAGES[activeLeakage].desc}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[16px] font-sans text-gray-500 italic">
                Select a warning marker to see where revenue is lost.
              </p>
            )}
          </div>

          <p className="mt-16 font-sans font-semibold text-crimson text-center text-[18px]">
            Fix the handoffs. Keep the revenue.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 08: INFRASTRUCTURE MATURITY ──────────────────────────────────────
function InfrastructureMaturitySection() {
  const { ref, visible } = useReveal()
  const [activeStage, setActiveStage] = useState(0)
  const active = MATURITY_STAGES[activeStage]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel label="Revenue Infrastructure Maturity" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Most organisations are somewhere on the journey.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Select a stage to explore where you are and what comes next.
          </p>

          {/* Maturity rail */}
          <div className="relative mb-16">
            {/* Track */}
            <div className="absolute top-6 left-[8%] right-[8%] h-0.5 bg-gray-200" />
            <div
              className="absolute top-6 left-[8%] h-0.5 bg-crimson transition-all duration-500"
              style={{ width: `${(activeStage / (MATURITY_STAGES.length - 1)) * 84}%` }}
            />

            <div className="flex justify-between relative">
              {MATURITY_STAGES.map((s, i) => {
                const isPast    = i < activeStage
                const isCurrent = i === activeStage
                return (
                  <button key={s.n} className="flex flex-col items-center flex-1 group" onClick={() => setActiveStage(i)}>
                    {/* Step indicator — 48 px touch target */}
                    <div className={`w-12 h-12 rounded-none flex items-center justify-center border-2 z-10 relative transition-all ${
                      isCurrent ? 'bg-crimson border-crimson text-white shadow-md scale-110'
                                : isPast   ? 'bg-white border-crimson text-crimson'
                                           : 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-400'}`}>
                      <span className="font-sans font-bold text-[14px]">{s.n}</span>
                    </div>
                    {/* Stage name — 16 px */}
                    <span className={`mt-3 text-[16px] font-sans font-semibold text-center leading-snug ${isCurrent ? 'text-crimson' : isPast ? 'text-gray-700' : 'text-gray-400'}`}>
                      {s.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stage detail — 18 px body */}
          <div className="bg-surface rounded-none p-8 md:p-10 border border-gray-100 min-h-[120px]">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-none bg-crimson flex items-center justify-center text-white text-[14px] font-sans font-bold shrink-0">{active.n}</div>
              <div>
                <h3 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] text-gray-900 mb-3">{active.name}</h3>
                <p className="text-[18px] font-sans text-gray-600 leading-[1.65]">{active.desc}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button className={`font-sans font-medium text-[16px] text-gray-500 hover:text-gray-800 transition-colors ${activeStage === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                    onClick={() => setActiveStage(s => Math.max(0, s - 1))}>
              ← Previous stage
            </button>
            <button className={`font-sans font-semibold text-[16px] text-crimson hover:text-crimson-dark transition-colors ${activeStage === MATURITY_STAGES.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    onClick={() => setActiveStage(s => Math.min(MATURITY_STAGES.length - 1, s + 1))}>
              Next stage →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 09: TRADITIONAL vs REVENUE INFRASTRUCTURE ────────────────────────
function TraditionalVsRISection() {
  const { ref, visible } = useReveal()
  const specialists = [
    { name: 'Website\nAgency',     icon: 'monitor' },
    { name: 'SEO\nAgency',         icon: 'search' },
    { name: 'CRM\nVendor',         icon: 'database' },
    { name: 'Automation\nProvider',icon: 'zap' },
    { name: 'Marketing\nAgency',   icon: 'target' },
  ]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-surface">
      <div className={CONTAINER}>
        <SectionLabel label="Traditional Approaches vs Revenue Infrastructure" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Specialists optimise a part. Revenue Infrastructure orchestrates the whole.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="border border-gray-200 rounded-none p-8 md:p-10">
              <p className="text-[14px] font-sans font-bold tracking-[0.16em] text-gray-400 uppercase mb-8">Traditional (Specialist) Approach</p>
              <div className="flex flex-wrap gap-6 mb-10 justify-center">
                {specialists.map((s) => (
                  <div key={s.name} className="flex flex-col items-center gap-2.5">
                    <div className="w-16 h-16 rounded-none bg-gray-50 border border-gray-200 flex items-center justify-center">
                      <Icon name={s.icon} s={26} c="#9CA3AF" />
                    </div>
                    <span className="text-[14px] font-sans text-gray-400 text-center leading-tight max-w-[70px]">
                      {s.name.split('\n').map((l, j) => <span key={j} className="block">{l}</span>)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[16px] font-sans text-gray-400 italic text-center">Each improves a piece. No one owns the system.</p>
            </div>

            {/* Revenue Infrastructure */}
            <div className="border border-crimson/20 rounded-none p-8 md:p-10 bg-crimson-muted">
              <p className="text-[14px] font-sans font-bold tracking-[0.16em] text-crimson uppercase mb-8">Revenue Infrastructure Approach</p>
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                {DOMAINS.map((d, i) => (
                  <div key={d.id} className="flex items-center gap-2 bg-white border border-crimson/15 rounded-none px-4 py-2">
                    <div className="w-5 h-5 rounded-none bg-crimson/12 flex items-center justify-center">
                      <Icon name={DOMAIN_ICONS[i]} s={12} c="#BE1E2D" />
                    </div>
                    <span className="text-[14px] font-sans font-medium text-gray-700">{d.short[0].replace(' &', '')}</span>
                  </div>
                ))}
              </div>
              <div className="text-center space-y-1">
                <p className="text-[16px] font-sans text-gray-500">One connected system. Shared data. Shared outcome.</p>
                <p className="text-[18px] font-sans font-bold text-crimson">Connected. Coordinated. Accountable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 10: HOW GWS APPLIES ──────────────────────────────────────────────
function HowGWSAppliesSection() {
  const { ref, visible } = useReveal()
  const processIcons  = ['search', 'pen', 'gear', 'chart']
  const processColors = ['#BE1E2D', '#059669', '#2563EB', '#7C3AED']

  // Four-step summary process
  const GWS_PROCESS = [
    { name: 'Diagnose',   desc: 'Assess your current infrastructure. Find gaps and leakage.' },
    { name: 'Design',     desc: 'Build the right system, aligned to your goals and market.' },
    { name: 'Implement',  desc: 'Integrate systems, processes, and skills. Establish momentum.' },
    { name: 'Optimize',   desc: 'Measure, learn, and refine to continuously improve.' },
  ]

  // Five-phase Discovery Framework
  const DISCOVERY_FRAMEWORK = [
    { name: 'Discover',   desc: 'Uncover the true state of your revenue infrastructure.' },
    { name: 'Diagnose',   desc: 'Assess your current infrastructure. Find gaps and leakage.' },
    { name: 'Prioritize', desc: 'Focus on high-impact areas based on potential and effort.' },
    { name: 'Implement',  desc: 'Integrate systems, processes, and skills. Establish momentum.' },
    { name: 'Optimize',   desc: 'Measure, learn, and refine to continuously improve.' },
  ]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel label="How GWS Applies the Framework" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Our process aligns your infrastructure to drive predictable growth.
          </h2>

          {/* Four-step summary */}
          <div className="mt-10 mb-16">
            <h3 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] text-gray-900 mb-4">
              Four-Step Summary
            </h3>
            <p className="text-[16px] font-sans text-gray-500 mb-6">
              Diagnose → Design → Implement → Optimize
            </p>

            {/* Connector line — desktop only */}
            <div className="relative">
              <div className="absolute top-[20px] left-[13%] right-[13%] h-px bg-gray-200 hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
                {GWS_PROCESS.map((step, i) => {
                  const colour = processColors[i]
                  const icon   = processIcons[i]
                  return (
                    <div key={step.name} className="flex flex-col items-center text-center">
                      <div className="w-[80px] h-[80px] rounded-none flex items-center justify-center mb-6 relative z-10 border-2"
                           style={{ background: `${colour}12`, borderColor: `${colour}22` }}>
                        <Icon name={icon} s={32} c={colour} />
                      </div>
                      {/* H4 — 21 px */}
                      <h4 className="font-serif font-normal text-[20px] md:text-[21px] leading-[1.3] text-gray-900 mb-3">{step.name}</h4>
                      <p className="text-[16px] font-sans text-gray-500 leading-[1.6]">{step.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Five-phase Discovery Framework */}
          <div className="mb-16">
            <h3 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] text-gray-900 mb-4">
              Five-Phase Discovery Framework
            </h3>
            <p className="text-[16px] font-sans text-gray-500 mb-6">
              Discover → Diagnose → Prioritize → Implement → Optimize
            </p>

            {/* Connector line — desktop only */}
            <div className="relative">
              <div className="absolute top-[20px] left-[13%] right-[13%] h-px bg-gray-200 hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
                {DISCOVERY_FRAMEWORK.map((step, i) => {
                  const colour = processColors[i % processColors.length] // Cycle through colors if needed
                  const icon   = processIcons[i % processIcons.length]   // Cycle through icons if needed
                  return (
                    <div key={step.name} className="flex flex-col items-center text-center">
                      <div className="w-[80px] h-[80px] rounded-none flex items-center justify-center mb-6 relative z-10 border-2"
                           style={{ background: `${colour}12`, borderColor: `${colour}22` }}>
                        <Icon name={icon} s={32} c={colour} />
                      </div>
                      {/* H4 — 21 px */}
                      <h4 className="font-serif font-normal text-[20px] md:text-[21px] leading-[1.3] text-gray-900 mb-3">{step.name}</h4>
                      <p className="text-[16px] font-sans text-gray-500 leading-[1.6]">{step.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <p className="text-center text-[16px] font-sans font-medium text-gray-500 mt-16">
            From insight to infrastructure. From infrastructure to impact.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 11: BUSINESS OUTCOMES ────────────────────────────────────────────
function BusinessOutcomesSection() {
  const { ref, visible } = useReveal()
  const outcomes = [
    { icon: 'eye',       name: 'Be Found',             desc: 'Attract the right audience with clarity and consistency.', color: '#BE1E2D' },
    { icon: 'magnet',    name: 'Capture & Respond',    desc: 'Engage at the right time and respond fast.',                color: '#059669' },
    { icon: 'cart',      name: 'Convert Consistently', desc: 'Turn interest into qualified pipeline and closed revenue.', color: '#2563EB' },
    { icon: 'chart',     name: 'Improve & Scale',      desc: 'Use data and insight to optimise and scale growth.',        color: '#7C3AED' },
  ]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-surface">
      <div className={CONTAINER}>
        <SectionLabel label="Business Outcomes" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            A stronger system. Better results.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Revenue Infrastructure creates consistent, measurable outcomes across every stage.
          </p>

          {/* 4-up grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {outcomes.map((o) => (
              <div key={o.name} className="bg-white border border-gray-100 rounded-none p-8 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-none flex items-center justify-center mb-6"
                     style={{ background: `${o.color}10` }}>
                  <Icon name={o.icon} s={26} c={o.color} />
                </div>
                {/* H3 inside card */}
                <h4 className="font-serif font-normal text-[20px] md:text-[21px] leading-[1.3] text-gray-900 mb-3">{o.name}</h4>
                <p className="text-[16px] font-sans text-gray-500 leading-[1.6]">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 12: DIAGNOSTIC CTA ───────────────────────────────────────────────
function DiagnosticCTASection() {
  const { ref, visible } = useReveal()
  const ctaItems = ['Uncover gaps and leakage', 'Identify opportunities', 'See what to fix first']

  // Background system motif
  const bgDomains = DOMAINS.map((_, i) => {
    const a = (-90 + i * 40) * Math.PI / 180
    return { x: 70 + 55 * Math.cos(a), y: 70 + 55 * Math.sin(a) }
  })

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[144px] bg-surface text-gray-900 relative overflow-hidden border-t border-[#D8D5CE]">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.06]"
           style={{ backgroundImage: 'radial-gradient(circle, #BE1E2D 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Crimson glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[300px] bg-crimson/10 blur-[100px] pointer-events-none" />
      {/* System motif */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 140 140" width={280} height={280}>
          <circle cx={70} cy={70} r={50} fill="none" stroke="#BE1E2D" strokeWidth={0.8} strokeDasharray="4 3"/>
          <circle cx={70} cy={70} r={18} fill="#BE1E2D" fillOpacity={0.3}/>
          {bgDomains.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={7} fill="none" stroke="#BE1E2D" strokeWidth={0.8}/>
              <line x1={70} y1={70} x2={p.x} y2={p.y} stroke="#BE1E2D" strokeWidth={0.5} strokeOpacity={0.5}/>
            </g>
          ))}
        </svg>
      </div>

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <SectionLabel label="Revenue Diagnostic CTA" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          {/* H2 */}
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] mb-6 max-w-[720px] mx-auto">
            Start with the{' '}
            <span className="text-crimson">system.</span>
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-500 mb-10 max-w-[560px] mx-auto">
            Find where your Revenue Infrastructure is helping — or limiting — growth.
          </p>

          {/* Checklist */}
          <ul className="flex flex-col items-center gap-3 mb-12">
            {ctaItems.map(item => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-none bg-crimson/10 border border-crimson/40 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#BE1E2D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[18px] font-sans text-gray-600">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA button — 16 px semibold, 48 px height */}
          <a
            href="/revenue-diagnostic"
            style={{ color: '#ffffff', backgroundColor: '#BE1E2D' }}
            className="inline-flex items-center justify-center bg-[#BE1E2D] hover:bg-[#721315] transition-colors !text-white visited:!text-white focus:!text-white active:!text-white font-['DM_Sans'] font-semibold text-[16px] h-12 px-8 rounded w-fit mx-auto no-underline hover:no-underline"
          >
            Book a Revenue Diagnostic <Icon name="arrow" s={16} c="white" />
          </a>

          <p className="font-sans text-gray-400 text-[14px] mt-20 tracking-wide">
            One system. Real alignment. Predictable growth.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export default function Framework() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <HeroSection />
      <CanonicalDefinitionSection />
      <WhyItMattersSection />
      <NineDomainSection />
      <RevenueInfrastructureFlywheelSection />
      <FragmentedVsConnectedSection />
      <RevenueLeakageSection />
      <InfrastructureMaturitySection />
      <TraditionalVsRISection />
      <HowGWSAppliesSection />
      <BusinessOutcomesSection />
      <DiagnosticCTASection />
      <SiteFooter />
    </div>
  )
}
