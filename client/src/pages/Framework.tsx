import { Fragment, useState, useEffect, useRef } from 'react'
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NineDomainFramework from "@/components/NineDomainFramework";
import CanonicalDefinition from "@/components/CanonicalDefinition";
import RevenueMaturity from "@/components/RevenueMaturity";

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
    <p className="text-[14px] font-sans font-[600] text-[#841617] tracking-[0.18em] uppercase mb-4">
      {label}
    </p>
  )
}

// ─── INFRA VISUAL FROM ZIP ─────────────────────────────────────────────────────
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

      <div className={`${CONTAINER} relative z-10 w-full flex-1 flex items-center`}>
        <div className="w-full max-w-[720px]">

          {/* Copy */}
          <div>
            <SectionLabel label="REVENUE INFRASTRUCTURE" dark />
            {/* H1 — 60px desktop / 40px mobile, DM Serif Display */}
            <h1 className="font-serif font-normal text-[40px] md:text-[60px] leading-[1.08] tracking-tight mb-6">
              Revenue <span className="text-[#841617]">growth</span> depends on the{' '}
              <span className="text-[#841617]">system</span> behind it.
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
            stroke="#841617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
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

// ─── SECTION 02: CANONICAL DEFINITION (zip package — as-is) ───────────────────
function CanonicalDefinitionSection() {
  return <CanonicalDefinition />
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
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]" style={{ fontFamily: "'DM Serif Display', serif" }}>
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

// ─── SECTION 04: NINE-DOMAIN FRAMEWORK (from zip package) ────────────────────
function NineDomainSection() {
  return <NineDomainFramework />
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
  const RED = '#841617'

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
    <section className="pt-[90px] pb-[90px] bg-[#000000] text-white relative" style={{ ...zeroRadius, contain: 'layout', overflow: 'visible' }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <div>
            <p className="text-[14px] font-sans font-[600] tracking-[0.18em] uppercase mb-4" style={{ color: '#ffffff' }}>
              Revenue Infrastructure Flywheel
            </p>
            <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-white mb-5 max-w-[720px]" style={{ fontFamily: "'DM Serif Display', serif" }}>
              <span style={{ color: '#841617' }}>Revenue Infrastructure</span> <span style={{ color: '#ffffff' }}>compounds when the system reinforces itself.</span>
            </h2>
            <p className="text-[18px] leading-[1.65] text-white/60 mb-16 max-w-[620px]">
              Each strength builds on the previous, creating a self-reinforcing cycle of growth.
            </p>
          </div>

          {/* Right column — flywheel */}
          <div className="flex items-center justify-center py-10 lg:py-0">
            <div className="relative" style={{ width: 'min(700px, 100%)', aspectRatio: '1', overflow: 'visible' }}>
            <svg viewBox="0 0 700 700" style={{ width: '100%', height: '100%', transform: 'scale(1.48)', transformOrigin: 'center center', overflow: 'visible' }} aria-hidden="true">
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
                  <stop offset="0%" stopColor="#A62832" />
                  <stop offset="100%" stopColor="#5A0C14" />
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
              <circle data-name="bg-glow-circle" cx={CX} cy={CY} r={250} fill="url(#bg-glow)" aria-label="Background radial glow" />

              {/* Outer orbit ring */}
              <circle data-name="orbit-ring" cx={CX} cy={CY} r={220} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" aria-label="Outer orbit ring" />

              {/* Main track ring */}
              <circle data-name="track-ring" cx={CX} cy={CY} r={RING_R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" aria-label="Main track ring" />

              {/* Spinning dashed highlight */}
              <circle
                data-name="spin-ring"
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
                aria-label="Spinning dashed highlight ring"
              />

              {/* Arc arrows */}
              {STEPS.map((_, i) => {
                const dim = active !== null && active !== i
                return (
                  <g data-name="arc-glow-layer" key={i} style={{ transition: 'opacity 0.3s ease' }} opacity={dim ? 0.18 : 1} aria-label={`Arc glow for step ${STEPS[i].label}`}>
                    {/* soft glow layer */}
                    <path
                      data-name="arc-glow-stroke"
                      d={arcPath(i)}
                      fill="none"
                      stroke={RED}
                      strokeWidth="7"
                      strokeLinecap="round"
                      opacity="0.15"
                      aria-label={`Soft glow for step ${STEPS[i].label} arc`}
                    />
                    {/* main arc */}
                    <path
                      data-name="arc-main-stroke"
                      d={arcPath(i)}
                      fill="none"
                      stroke={RED}
                      strokeWidth="2"
                      strokeLinecap="round"
                      markerEnd="url(#tip)"
                      aria-label={`Main arc for step ${STEPS[i].label}`}
                    />
                  </g>
                )
              })}

              {/* Center hub */}
              <circle data-name="hub-outer-border" cx={CX} cy={CY} r={HUB_R + 6} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" aria-label="Hub outer border" />
              <circle data-name="hub-fill" cx={CX} cy={CY} r={HUB_R} fill="url(#hub-fill)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" aria-label="Hub fill circle" />

              {/* Hub default label */}
              {active === null && (
                <text
                  data-name="hub-default-label"
                  x={CX} y={CY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.22)"
                  fontSize="15"
                  fontWeight="700"
                  letterSpacing="0.2em"
                  fontFamily="'Inter', system-ui, sans-serif"
                  aria-label="Hub default label: FLYWHEEL"
                >
                  FLYWHEEL
                </text>
              )}

              {/* Hub active content */}
              {step && (
                <>
                  <text data-name="hub-active-step-number" x={CX} y={CY - 28} textAnchor="middle" dominantBaseline="middle"
                    fill={RED} fontSize="15" fontWeight="700" letterSpacing="0.15em"
                    fontFamily="'Inter', system-ui, sans-serif" aria-label={`Active step number: ${step.n}`}>
                    {step.n}
                  </text>
                  <text data-name="hub-active-step-label" x={CX} y={CY + 3} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="24" fontWeight="700" letterSpacing="0.01em"
                    fontFamily="'Inter', system-ui, sans-serif" aria-label={`Active step label: ${step.label}`}>
                    {step.label}
                  </text>
                  <text data-name="hub-active-step-sub" x={CX} y={CY + 33} textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(255,255,255,0.4)" fontSize="15" fontWeight="400"
                    fontFamily="'Inter', system-ui, sans-serif" aria-label={`Active step sub: ${step.sub}`}>
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
                    data-name={`node-group-${s.label.toLowerCase()}`}
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    aria-label={`Flywheel node: ${s.label}`}
                  >
                    {/* outer glow ring on hover */}
                    <circle
                      data-name={`node-glow-ring-${s.label.toLowerCase()}`}
                      cx={x} cy={y} r={NODE_R + 14}
                      fill={RED}
                      opacity={isActive ? 0.12 : 0}
                      style={{ transition: 'opacity 0.25s ease' }}
                      aria-label={`Glow ring for ${s.label}`}
                    />
                    {/* node body */}
                    <circle
                      data-name={`node-body-${s.label.toLowerCase()}`}
                      cx={x} cy={y} r={NODE_R}
                      fill={isActive ? 'url(#node-active)' : '#0D1122'}
                      stroke={isActive ? RED : 'rgba(255,255,255,0.2)'}
                      strokeWidth={isActive ? '2' : '1.5'}
                      style={{ transition: 'fill 0.25s ease, stroke 0.25s ease' }}
                      aria-label={`Node body for ${s.label}`}
                    />
                    {/* step number */}
                    <text
                      data-name={`node-number-text-${s.label.toLowerCase()}`}
                      x={x} y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? 'white' : 'rgba(255,255,255,0.45)'}
                      fontSize="18"
                      fontWeight="600"
                      letterSpacing="0.05em"
                      fontFamily="'Inter', system-ui, sans-serif"
                      style={{ transition: 'fill 0.25s', userSelect: 'none' }}
                      aria-label={`Step number ${s.n}`}
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
                    data-name={`label-group-${s.label.toLowerCase()}`}
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    aria-label={`Label group for ${s.label}`}
                  >
                    <text
                      data-name={`label-title-${s.label.toLowerCase()}`}
                      x={x} y={y - 14}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill={dimmed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.88)'}
                      fontSize="20"
                      fontWeight="600"
                      letterSpacing="0.01em"
                      fontFamily="'Inter', system-ui, sans-serif"
                      style={{ transition: 'fill 0.3s', userSelect: 'none' }}
                      aria-label={`Label title: ${s.label}`}
                    >
                      {s.label}
                    </text>
                    <text
                      data-name={`label-subtitle-${s.label.toLowerCase()}`}
                      x={x} y={y + 18}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill={isActive ? `${RED}cc` : dimmed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}
                      fontSize="14"
                      fontWeight="400"
                      fontFamily="'Inter', system-ui, sans-serif"
                      style={{ transition: 'fill 0.3s', userSelect: 'none' }}
                      aria-label={`Label subtitle: ${s.sub}`}
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

// ─── SECTION 06: FRAGMENTED VS CONNECTED (Figma-designed) ─────────────────────
function FragmentedVsConnectedSection() {
  const { ref, visible } = useReveal()

  // From Figma package src/App.tsx — plug-and-play section
  const nodes = [
    { cx: 52, label: "Marketing", icon: "eye" },
    { cx: 158, label: "Website", icon: "monitor" },
    { cx: 264, label: "CRM", icon: "db" },
    { cx: 370, label: "Sales", icon: "briefcase" },
    { cx: 476, label: "Customer", icon: "heart" },
  ] as const;
  const CY = 118; const LABEL_Y = 174;
  const GAPS = [
    { x1: 52 + 26, x2: 158 - 26 },
    { x1: 158 + 26, x2: 264 - 26 },
    { x1: 264 + 26, x2: 370 - 26 },
    { x1: 370 + 26, x2: 476 - 26 },
  ];
  const InlineSvgIcon = ({ type, stroke }: { type: string; stroke: string }) => {
    const p = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (type === "eye") return <g {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></g>;
    if (type === "monitor") return <g {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></g>;
    if (type === "db") return <g {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></g>;
    if (type === "briefcase") return <g {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></g>;
    return <g {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></g>;
  };

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[112px] bg-[#FAFAF8]">
      <div className={CONTAINER}>
        <div className={"reveal " + (visible ? "visible" : "")}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#841617", marginBottom: 16 }}>
              Fragmented vs Connected
            </p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 44, fontWeight: 400, color: "#0f0d0d", lineHeight: 1.1, margin: 0 }}>
              Two ways to connect your systems.<br />
              <em style={{ color: "#841617" }}>One that actually works.</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 960, margin: "0 auto" }}>
            {/* FRAGMENTED */}
            <div className="panel-card panel-frag" style={{ background: "#F8F6EC", border: "1px solid #E4DFD0", overflow: "hidden" }}>
              <div style={{ padding: "20px 36px", borderBottom: "1px solid #E4DFD0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#841617", opacity: 0.5 }} />
                  <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9A8F80" }}>Fragmented</span>
                </div>
                <span style={{ fontSize: 14, color: "#B5AA97" }}>5 silos</span>
              </div>
              <div style={{ position: "relative", aspectRatio: "528/260", background: "#F0EDE3" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 528 260">
                  <defs>
                    <pattern id="dotG" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.9" fill="#C9C3B5" />
                    </pattern>
                  </defs>
                  <rect width="528" height="260" fill="#F8F6EC" />
                  <rect width="528" height="260" fill="url(#dotG)" />
                  {GAPS.map((g, i) => {
                    const mx = (g.x1 + g.x2) / 2;
                    return (
                      <g key={i}>
                        <line x1={g.x1} y1={CY} x2={mx - 12} y2={CY} stroke="#C5B89F" strokeWidth="1.5" strokeDasharray="5 4" />
                        <line x1={mx + 12} y1={CY} x2={g.x2} y2={CY} stroke="#C5B89F" strokeWidth="1.5" strokeDasharray="5 4" />
                        <text className="frag-x" x={mx} y={CY + 6} textAnchor="middle" fill="#841617" fontSize="18" opacity="0.45" fontFamily="sans-serif">✕</text>
                      </g>
                    );
                  })}
                  {nodes.map(({ cx, label, icon }) => (
                    <g key={cx} className="frag-node">
                      <circle className="frag-circle" cx={cx} cy={CY} r="30" fill="#EDE8DC" stroke="#D4CCBB" strokeWidth="1.5" style={{ transition: "fill 0.25s, stroke 0.25s" }} />
                      <g transform={"translate(" + (cx - 12) + ", " + (CY - 12) + ")"}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <InlineSvgIcon type={icon} stroke="#B5A990" />
                        </svg>
                      </g>
                      <text x={cx} y={LABEL_Y} textAnchor="middle" fill="#9A8F7E" fontSize="14" fontFamily="'DM Sans', sans-serif" fontWeight="500">{label}</text>
                    </g>
                  ))}
                </svg>
              </div>
              <div style={{ padding: "26px 36px 30px", background: "#F8F6EC" }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {["Disconnected systems", "Missing handoffs", "Isolated data silos", "Context lost at every stage"].map((item) => (
                    <li key={item} className="list-item" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="6" stroke="#841617" strokeWidth="1" strokeOpacity="0.35" />
                        <path d="M4 4l6 6M10 4L4 10" stroke="#841617" strokeWidth="1.1" strokeOpacity="0.6" strokeLinecap="round" />
                      </svg>
                      <span className="list-text" style={{ fontSize: 17.5, color: "#7A7060", fontWeight: 500, transition: "color 0.2s" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CONNECTED */}
            <div className="panel-card panel-con" style={{ background: "#100c0c", border: "1px solid #2e1e1e", overflow: "hidden" }}>
              <div style={{ padding: "20px 36px", borderBottom: "1px solid #2e1e1e", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#140e0e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#841617" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#841617" }}>Connected</span>
                </div>
                <span style={{ fontSize: 14, color: "#5a3a3a" }}>unified layer</span>
              </div>
              <div style={{ position: "relative", aspectRatio: "528/260", background: "#0d0909" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 528 260">
                  <defs>
                    <pattern id="dotD" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.9" fill="#2a1a1a" />
                    </pattern>
                    <radialGradient id="cGlow" cx="50%" cy="45%" r="55%">
                      <stop offset="0%" stopColor="#841617" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#841617" stopOpacity="0" />
                    </radialGradient>
                    <filter id="ng" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="6" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <marker id="cArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,1 L5,3 L0,5z" fill="#c8383b" />
                    </marker>
                    <marker id="rArr" markerWidth="5" markerHeight="5" refX="1" refY="2.5" orient="auto">
                      <path d="M4,1 L0,2.5 L4,4z" fill="#841617" fillOpacity="0.4" />
                    </marker>
                  </defs>
                  <rect width="528" height="260" fill="#0d0909" />
                  <rect width="528" height="260" fill="url(#dotD)" />
                  <rect width="528" height="260" fill="url(#cGlow)" />
                  {GAPS.map((g, i) => (
                    <g key={i}>
                      <line x1={g.x1} y1={CY - 6} x2={g.x2} y2={CY - 6} stroke="#4a1a1a" strokeWidth="1.8" />
                      <line className="con-flow" x1={g.x1} y1={CY - 6} x2={g.x2} y2={CY - 6} stroke="#c8383b" strokeWidth="1.8" markerEnd="url(#cArr)" style={{ animationDelay: (i * 0.18) + "s" }} />
                      <line x1={g.x2} y1={CY + 6} x2={g.x1} y2={CY + 6} stroke="#841617" strokeWidth="0.9" strokeOpacity="0.3" markerEnd="url(#rArr)" />
                    </g>
                  ))}
                  {nodes.map(({ cx, label, icon }) => (
                    <g key={cx} className="con-node" filter="url(#ng)">
                      <circle className="con-circle" cx={cx} cy={CY} r="30" fill="#1e0f0f" stroke="#841617" strokeWidth="1.8" style={{ transition: "stroke 0.25s, stroke-width 0.25s" }} />
                      <g transform={"translate(" + (cx - 12) + ", " + (CY - 12) + ")"}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <InlineSvgIcon type={icon} stroke="#c8383b" />
                        </svg>
                      </g>
                      <text x={cx} y={LABEL_Y} textAnchor="middle" fill="#7a5050" fontSize="14" fontFamily="'DM Sans', sans-serif" fontWeight="500">{label}</text>
                    </g>
                  ))}
                </svg>
              </div>
              <div style={{ padding: "26px 36px 30px", background: "#100c0c" }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {["Continuous signal flow", "Shared context at every stage", "Coordinated next actions", "Feedback and intelligence loop"].map((item) => (
                    <li key={item} className="list-item" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="6" fill="rgba(200,56,59,0.15)" stroke="#c8383b" strokeWidth="1" strokeOpacity="0.6" />
                        <path d="M3.5 7l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="list-text" style={{ fontSize: 17.5, color: "#C4A0A0", fontWeight: 500, transition: "color 0.2s" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 36, fontSize: 15.5, color: "#B5AA97", letterSpacing: "0.04em", textAlign: "center" }}>
            Every handoff without shared context is a conversion lost.
          </p>
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
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]" style={{ fontFamily: "'DM Serif Display', serif" }}>
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


// ─── SECTION 09: TRADITIONAL vs REVENUE INFRASTRUCTURE ────────────────────────
function TraditionalVsRISection() {
  const { ref, visible } = useReveal()
  const [activeTab, setActiveTab] = useState<"traditional" | "ri">("traditional")

  const iconMap: Record<string, React.ReactNode> = {
    monitor: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    database: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    zap: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    target: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    capture: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 15H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M18 15h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><path d="M4 6v7a8 8 0 0 0 16 0V6"/></svg>,
    briefcase: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    heart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    chart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  }

  const specialists = [
    { key: "monitor", label: "Website Agency", sub: "Owns digital only" },
    { key: "search", label: "SEO Agency", sub: "Owns rankings only" },
    { key: "database", label: "CRM Vendor", sub: "Owns contacts only" },
    { key: "zap", label: "Automation Provider", sub: "Owns workflows only" },
    { key: "target", label: "Marketing Agency", sub: "Owns campaigns only" },
  ]

  const riRows = [
    [
      { key: "target", label: "Strategy" },
      { key: "eye", label: "Market" },
      { key: "monitor", label: "Digital" },
    ],
    [
      { key: "capture", label: "Lead Capture" },
      { key: "database", label: "CRM" },
      { key: "zap", label: "Automation" },
    ],
    [
      { key: "briefcase", label: "Sales" },
      { key: "heart", label: "Customer" },
      { key: "chart", label: "Data" },
    ],
  ]

  const tradMetrics = [
    { value: "5×", label: "Separate invoices" },
    { value: "0", label: "Shared dashboards" },
    { value: "∞", label: "Attribution gaps" },
  ]

  const riMetrics = [
    { value: "1", label: "Operating system" },
    { value: "100%", label: "Accountability" },
    { value: "∞", label: "Shared insights" },
  ]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-surface">
      <div className={CONTAINER}>
        <div data-reveal className="mb-6" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <span style={{ color: "#841617", fontSize: 14, fontWeight: 600, letterSpacing: "0.22em" }} className="uppercase font-sans">
            Framework Approach
          </span>
        </div>

        <div data-reveal className={`reveal ${visible ? 'visible' : ''}`} style={{ "--delay": "80ms" } as React.CSSProperties}>
          <h2 className="font-bold leading-[1.08] mb-5 text-black" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, maxWidth: 700 }}>
            Specialists optimise a part.
            <br />
            <em style={{ fontStyle: "italic" }}>
              <span style={{ color: "#841617" }}>Infrastructure</span> orchestrates the whole.
            </em>
          </h2>

          <p className="text-[16px] md:text-[18px] leading-[1.8] max-w-[520px] mb-12" style={{ color: "#5C5347" }}>
            Most businesses stack point solutions — each solving one problem in isolation.
            Revenue Infrastructure connects every function into one accountable operating system.
          </p>
        </div>

        {/* ── Mobile tabs ── */}
        <div className="md:hidden flex mb-5 border border-black/15 overflow-hidden">
          {(["traditional", "ri"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200"
              style={{
                backgroundColor: activeTab === tab ? (tab === "ri" ? "#841617" : "#111111") : "#F4F0E8",
                color: activeTab === tab ? "#FFFFFF" : "#7A7060",
              }}
            >
              {tab === "traditional" ? "Traditional" : "Revenue Infra"}
            </button>
          ))}
        </div>

        {/* ── Comparison ── */}
        <div className="grid md:grid-cols-[1fr_48px_1fr] gap-0 items-stretch">

          {/* Traditional */}
          <div className={activeTab !== "traditional" ? "hidden md:block" : ""}>
            <div data-reveal className="border border-black/15 overflow-hidden flex flex-col h-full" style={{ backgroundColor: "#FFFFFF", "--delay": "180ms" } as React.CSSProperties}>
              {/* Header */}
              <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between" style={{ backgroundColor: "#F0EBE1" }}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#C5BDB0" }} />)}
                  </div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase ml-1" style={{ color: "#7A7060" }}>
                    Traditional Approach
                  </p>
                </div>
                <span className="text-[9px] font-black tracking-widest px-2 py-1 border border-black/12" style={{ color: "#9C8F7A", backgroundColor: "#EAE4D9" }}>
                  FRAGMENTED
                </span>
              </div>

              {/* Silos */}
              <div className="flex-1 px-6 pt-6 pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-5 text-center" style={{ color: "#B0A898" }}>
                  5 specialists · 0 shared data
                </p>

                <div className="space-y-2.5">
                  {specialists.map((s, i) => (
                    <div key={s.key} data-reveal className="flex items-center gap-3 px-4 py-3 border border-black/8 relative" style={{ backgroundColor: "#F9F6F1", "--delay": `${260 + i * 60}ms` } as React.CSSProperties}>
                      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: "#D6CEC2" }} />

                      <div className="w-9 h-9 flex items-center justify-center border border-black/10 shrink-0" style={{ backgroundColor: "#EDE8DF", color: "#9C8F7A" }}>
                        {iconMap[s.key]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-black leading-tight">{s.label}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: "#A09488" }}>{s.sub}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <line x1="2" y1="2" x2="8" y2="8" stroke="#C5BDB0" strokeWidth="1.5"/>
                          <line x1="8" y1="2" x2="2" y2="8" stroke="#C5BDB0" strokeWidth="1.5"/>
                        </svg>
                        <span className="text-[9px] font-bold tracking-widest" style={{ color: "#C5BDB0" }}>SILO</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pain metrics */}
                <div data-reveal className="grid grid-cols-3 gap-0 mt-6 border border-black/10 overflow-hidden" style={{ "--delay": "600ms" } as React.CSSProperties}>
                  {tradMetrics.map((m, i) => (
                    <div key={m.label} className="flex flex-col items-center justify-center py-4 px-2 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none", backgroundColor: "#F5F1E9" }}>
                      <span className="text-[22px] font-bold text-black leading-none mb-1">{m.value}</span>
                      <span className="text-[10px] leading-tight" style={{ color: "#9C8F7A" }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="mx-6 mb-6 p-4 border border-black/10 flex items-start gap-3" style={{ backgroundColor: "#F5F1E9" }}>
                <span style={{ color: "#9C8F7A", marginTop: 1 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-black leading-snug">Each improves a piece. No one owns the system.</p>
                  <p className="text-[11px] mt-1 italic" style={{ color: "#7A7060" }}>No compound growth. No accountability.</p>
                </div>
              </div>
            </div>
          </div>

          {/* VS spine */}
          <div className="hidden md:flex flex-col items-center justify-center gap-3">
            <div className="w-px flex-1" style={{ backgroundColor: "#D6CFC3" }} />
            <span className="w-9 h-9 flex items-center justify-center text-[9px] font-black tracking-[0.15em] shrink-0" style={{ backgroundColor: "#111111", color: "#FFFFFF" }}>
              VS
            </span>
            <div className="w-px flex-1" style={{ backgroundColor: "#D6CFC3" }} />
          </div>

          {/* Revenue Infrastructure */}
          <div className={activeTab !== "ri" ? "hidden md:block" : ""}>
            <div data-reveal className="overflow-hidden flex flex-col h-full" style={{ backgroundColor: "#FBF8F4", border: "1.5px solid #841617", "--delay": "240ms" } as React.CSSProperties}>
              {/* Header */}
              <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between" style={{ backgroundColor: "#F0EBE1" }}>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#841617", animationDuration: "2.2s" }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#841617" }} />
                  </span>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#841617" }}>
                    Revenue Infrastructure
                  </p>
                </div>
                <span className="text-[9px] font-black tracking-widest px-2 py-1 border" style={{ color: "#841617", borderColor: "#841617", backgroundColor: "#FFFFFF" }}>
                  UNIFIED
                </span>
              </div>

              {/* Connected system diagram */}
              <div className="flex-1 px-6 pt-6 pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-5 text-center" style={{ color: "#841617" }}>
                  1 system · 9 functions · 1 shared outcome
                </p>

                {/* Hub node */}
                <div data-reveal className="flex items-center justify-center gap-2 py-3.5 px-4" style={{ backgroundColor: "#841617", "--delay": "320ms" } as React.CSSProperties}>
                  <span style={{ color: "white" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </span>
                  <span className="text-[12px] font-bold tracking-[0.18em] text-white uppercase">Revenue Infrastructure</span>
                </div>

                {/* Trunk line */}
                <div className="flex justify-center">
                  <div className="w-px h-3" style={{ backgroundColor: "#841617" }} />
                </div>

                {/* Capability rows */}
                {riRows.map((row, ri) => (
                  <div key={ri}>
                    {/* Branch bar */}
                    <div className="relative h-3 flex items-end justify-center">
                      <div className="absolute" style={{ left: "16.66%", right: "16.66%", top: 0, height: "1px", backgroundColor: "#841617" }} />
                      {[0, 1, 2].map(ci => (
                        <div key={ci} className="absolute bottom-0 w-px h-full" style={{ left: `${16.66 + ci * 33.33}%`, backgroundColor: "#841617" }} />
                      ))}
                    </div>

                    {/* Chips */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {row.map((cap, ci) => (
                        <div key={cap.label} data-reveal className="flex flex-col items-center gap-1.5 border py-3 px-1" style={{ backgroundColor: "#FFFFFF", borderColor: "#D6CFC3", borderTop: "2px solid #841617", "--delay": `${400 + ri * 80 + ci * 35}ms` } as React.CSSProperties}>
                          <div className="w-7 h-7 flex items-center justify-center" style={{ color: "#841617" }}>
                            {iconMap[cap.key]}
                          </div>
                          <span className="text-[10px] font-bold text-center text-black leading-tight tracking-wide uppercase">
                            {cap.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {ri < riRows.length - 1 && (
                      <div className="flex justify-center">
                        <div className="w-px h-1.5" style={{ backgroundColor: "#841617" }} />
                      </div>
                    )}
                  </div>
                ))}

                {/* Outcome metrics */}
                <div data-reveal className="grid grid-cols-3 gap-0 mt-6 border overflow-hidden" style={{ borderColor: "#841617", "--delay": "700ms" } as React.CSSProperties}>
                  {riMetrics.map((m, i) => (
                    <div key={m.label} className="flex flex-col items-center justify-center py-4 px-2 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(132,22,23,0.2)" : "none", backgroundColor: "#F4F0E8" }}>
                      <span className="text-[22px] font-bold leading-none mb-1" style={{ color: "#841617" }}>{m.value}</span>
                      <span className="text-[10px] leading-tight text-black">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="mx-6 mb-6 p-4 border border-black/8 border-l-[3px] flex items-start gap-3" style={{ backgroundColor: "#F0EBE1", borderLeftColor: "#841617" }}>
                <span style={{ color: "#841617", marginTop: 1 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-black leading-snug">Shared data. Shared accountability.</p>
                  <p className="text-[14px] font-bold mt-0.5" style={{ color: "#841617" }}>Connected. Coordinated. Accountable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom insight strip ── */}
        <div data-reveal className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 border border-black/12 overflow-hidden" style={{ "--delay": "500ms" } as React.CSSProperties}>
          {[
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, title: "One source of truth", body: "Every team draws from the same data — no reconciliation, no guessing." },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: "Compound growth", body: "Functions reinforce each other instead of operating in separate silos." },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>, title: "Full accountability", body: "One system. One outcome. Everyone aligned around the same number." },
          ].map((item, i) => (
            <div key={item.title} className="flex items-start gap-4 px-6 py-6" style={{
              backgroundColor: i === 1 ? "#F0EBE1" : "#F7F3EC",
              borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderTop: "3px solid",
              borderTopColor: i === 1 ? "#841617" : "#111111",
            }}>
              <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: i === 1 ? "#841617" : "#111111", color: "#FFFFFF" }}>
                {item.icon}
              </div>
              <div>
                <p className="text-[13px] font-bold text-black mb-1">{item.title}</p>
                <p className="text-[12px] leading-[1.6]" style={{ color: "#7A7060" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer rule ── */}
        <div data-reveal className="mt-10 flex items-center gap-5" style={{ "--delay": "650ms" } as React.CSSProperties}>
          <div className="h-px flex-1" style={{ backgroundColor: "#D6CFC3" }} />
          <p className="text-[11px] tracking-[0.16em] uppercase font-medium shrink-0" style={{ color: "#9C8F7A" }}>
            The difference is in the architecture
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: "#D6CFC3" }} />
        </div>

      </div>
    </section>
  )
}

// ─── SECTION 10: HOW GWS APPLIES THE FRAMEWORK (Figma Design — Plug & Play) ───
// Source: C:\Users\sjhed\Downloads\How GWS Applies the Framework.zip
// Component: HowGWAppliesTheFrameworkSection — replaces old HowGWSAppliesSection
function HowGWAppliesTheFrameworkSection() {
  const CRIMSON = "#841617"
  const CREAM = "#F8F6EC"

  const SearchIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
  );
  const EditIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
  );
  const GearIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  );
  const ChartIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></svg>
  );
  const StarIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  );

  const fourSteps = [
    { icon: <SearchIcon />, title: "Diagnose", description: "Assess your current infrastructure. Expose gaps, bottlenecks, and revenue leakage." },
    { icon: <EditIcon />,   title: "Design",   description: "Build the right system architecture, aligned precisely to your goals and market." },
    { icon: <GearIcon />,  title: "Implement", description: "Integrate systems, processes, and skills. Establish the momentum that compounds." },
    { icon: <ChartIcon />, title: "Optimize",  description: "Measure outcomes, learn from data, and refine continuously for compounding gains." },
  ];

  const fiveSteps = [
    { icon: <SearchIcon />, title: "Discover",    description: "Uncover the true state of your revenue infrastructure — no assumptions." },
    { icon: <EditIcon />,   title: "Diagnose",    description: "Pinpoint gaps and the root causes behind underperformance." },
    { icon: <StarIcon />,   title: "Prioritize",  description: "Focus on the highest-impact areas ranked by potential and implementation effort." },
    { icon: <GearIcon />,  title: "Implement",   description: "Integrate systems, processes, and skills with precision. Establish momentum." },
    { icon: <ChartIcon />, title: "Optimize",    description: "Measure, learn, and refine to compound improvements over time." },
  ];

  const { ref, visible } = useReveal();

  // ── Animated arrow connector (exact from zip App.tsx) ─────────────────────────
  function AnimatedArrow({ delay = 0 }: { delay?: number }) {
    const pathRef = useRef<SVGPathElement>(null);
    useEffect(() => {
      const el = pathRef.current;
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      const t = setTimeout(() => {
        el.style.transition = `stroke-dashoffset 0.45s cubic-bezier(0.4,0,0.2,1) ${delay}s`;
        el.style.strokeDashoffset = "0";
      }, 80);
      return () => clearTimeout(t);
    }, [delay]);
    return (
      <div className="hidden md:flex items-center justify-center flex-shrink-0" style={{ width: 48, marginTop: -8 }}>
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
          <path ref={pathRef} d="M4 12 H38 M30 5 L38 12 L30 19" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  interface StepData { icon: React.ReactNode; title: string; description: string; }
  function StepCard({ icon, title, description, index }: StepData & { index: number }) {
    const [hovered, setHovered] = useState(false);
    const num = String(index + 1).padStart(2, "0");
    return (
      <div className="step-card relative flex flex-col bg-white border border-black/10 overflow-hidden flex-1 min-w-0 cursor-default select-none"
        style={{ animationDelay: `${index * 0.08}s`, boxShadow: hovered ? "0 20px 48px -8px rgba(0,0,0,0.18), 0 6px 16px -4px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ height: 3, background: CRIMSON, transform: hovered ? "scaleX(1)" : "scaleX(0.3)", transformOrigin: "left", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)" }} />
        <div className="p-6 flex flex-col flex-1">
          <span className="absolute top-3 right-4 font-serif leading-none select-none pointer-events-none" style={{ fontSize: 56, color: CRIMSON, opacity: hovered ? 0.07 : 0.04, transition: "opacity 0.3s ease", fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>{num}</span>
          <div className="icon-box w-12 h-12 flex items-center justify-center mb-5 flex-shrink-0" style={{ background: hovered ? CRIMSON : CREAM, transition: "background 0.3s ease" }}>
            <div style={{ filter: hovered ? "brightness(0) invert(1)" : "none", transition: "filter 0.3s ease" }}>{icon}</div>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: CRIMSON, fontWeight: 600, marginBottom: 8 }}>Step {num}</span>
          <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, lineHeight: 1.25, color: "#000", fontWeight: 400, marginBottom: 8 }}>{title}</h4>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.7, color: "#000", opacity: 0.5, marginTop: "auto", paddingTop: 8 }}>{description}</p>
        </div>
      </div>
    );
  }

  function ProcessSection({ label, steps }: { label: string; steps: StepData[] }) {
    return (
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-5"><div style={{ width: 28, height: 1.5, background: CRIMSON }} /><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: CRIMSON, fontWeight: 600 }}>{label}</span></div>
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
          {steps.map((s, i) => (
            <Fragment key={i}>
              <StepCard {...s} index={i} />
              {i < steps.length - 1 && <AnimatedArrow delay={0.3 + i * 0.15} />}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel label="How GWS Applies the Framework" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "44px", lineHeight: 1.1, color: "#000", fontWeight: 400 }} className="mb-6 max-w-[760px]">
            Infrastructure aligned to drive <em style={{ color: CRIMSON, fontStyle: "italic" }}>predictable growth.</em>
          </h2>
          <div style={{ width: 48, height: 2, background: CRIMSON, marginBottom: 40 }} />

          <ProcessSection label="Four-Step Summary" steps={fourSteps} />
          <ProcessSection label="Five-Phase Discovery Framework" steps={fiveSteps} />

          <div className="mt-4 pt-10 flex flex-col md:flex-row items-start md:items-center gap-4" style={{ borderTop: `1px solid rgba(132,22,23,0.15)` }}>
            <div style={{ width: 4, height: 40, background: CRIMSON, flexShrink: 0 }} />
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.35, color: "#000", fontWeight: 400, opacity: 0.75 }}>
              From insight to infrastructure.{" "}<span style={{ color: CRIMSON }}>From infrastructure to impact.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 11: BUSINESS OUTCOMES ────────────────────────────────────────────
function BusinessOutcomesSection() {
  const { ref, visible } = useReveal()
  const outcomes = [
    { icon: 'eye',       name: 'Be Found',             desc: 'Attract the right audience with clarity and consistency.', color: '#841617' },
    { icon: 'magnet',    name: 'Capture & Respond',    desc: 'Engage at the right time and respond fast.',                color: '#059669' },
    { icon: 'cart',      name: 'Convert Consistently', desc: 'Turn interest into qualified pipeline and closed revenue.', color: '#2563EB' },
    { icon: 'chart',     name: 'Improve & Scale',      desc: 'Use data and insight to optimise and scale growth.',        color: '#7C3AED' },
  ]

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-surface">
      <div className={CONTAINER}>
        <SectionLabel label="Business Outcomes" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]" style={{ fontFamily: "'DM Serif Display', serif" }}>
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
    <section ref={ref as React.Ref<HTMLElement>} className="py-[144px] bg-white text-gray-900 relative overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.06]"
           style={{ backgroundImage: 'radial-gradient(circle, #841617 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* System motif */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 140 140" width={280} height={280}>
          <circle cx={70} cy={70} r={50} fill="none" stroke="#841617" strokeWidth={0.8} strokeDasharray="4 3"/>
          <circle cx={70} cy={70} r={18} fill="#841617" fillOpacity={0.3}/>
          {bgDomains.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={7} fill="none" stroke="#841617" strokeWidth={0.8}/>
              <line x1={70} y1={70} x2={p.x} y2={p.y} stroke="#841617" strokeWidth={0.5} strokeOpacity={0.5}/>
            </g>
          ))}
        </svg>
      </div>

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <SectionLabel label="Revenue Diagnostic CTA" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          {/* H2 */}
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] mb-6 max-w-[720px] mx-auto" style={{ fontFamily: "'DM Serif Display', serif" }}>
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
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#841617" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[18px] font-sans text-gray-600">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA button — 16 px semibold, 48 px height */}
          <a
            href="/revenue-diagnostic"
            style={{ color: '#ffffff', backgroundColor: '#841617' }}
            className="inline-flex items-center justify-center bg-[#841617] hover:bg-[#721315] transition-colors !text-white visited:!text-white focus:!text-white active:!text-white font-['DM_Sans'] font-semibold text-[16px] h-12 px-8 rounded w-fit mx-auto no-underline hover:no-underline"
          >
            Book a Revenue Diagnostic <Icon name="arrow" s={16} c="white" />
          </a>

          <p className="font-sans text-gray-500 text-[15px] mt-[35px] tracking-wide">
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
      <RevenueMaturity />
      <TraditionalVsRISection />
      <HowGWAppliesTheFrameworkSection />
      <BusinessOutcomesSection />
      <DiagnosticCTASection />
      <SiteFooter />
    </div>
  )
}
