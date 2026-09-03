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

const GWS_PROCESS = [
  { name: 'Diagnose',   desc: 'Assess your current infrastructure. Find gaps and leakage.' },
  { name: 'Design',     desc: 'Build the right system, aligned to your goals and market.' },
  { name: 'Implement',  desc: 'Integrate systems, processes, and skills. Establish momentum.' },
  { name: 'Optimize',   desc: 'Measure, learn, and refine to continuously improve.' },
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

function SectionLabel({ num, label, dark = false }: { num: string; label: string; dark?: boolean }) {
  return (
    <p className={`text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
      {num}&ensp;{label}
    </p>
  )
}

// ─── SECTION 01: HERO ──────────────────────────────────────────────────────────
function HeroSection() {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 400); return () => clearTimeout(t) }, [])

  const scrollToNext = () => {
    document.getElementById('canonical-definition')?.scrollIntoView({ behavior: 'smooth' })
  }

  const inputs = [
    { label: 'Strategy',   yPct: 15 },
    { label: 'Technology', yPct: 30 },
    { label: 'Data',       yPct: 50 },
    { label: 'Processes',  yPct: 70 },
    { label: 'People',     yPct: 85 },
  ]
  const CX = 420, CY = 200

  return (
    <section className="bg-gws-dark text-white min-h-screen flex flex-col relative overflow-hidden pt-[88px] pb-14">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Glow */}
      <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-crimson/20 blur-[120px] pointer-events-none" />

      <div className={`${CONTAINER} relative z-10 w-full flex-1 flex items-center`}>
        <div className="grid lg:grid-cols-[1fr_560px] gap-16 items-center w-full">

          {/* Left copy */}
          <div className="max-w-[800px]">
            <SectionLabel num="01" label="REVENUE INFRASTRUCTURE" dark />
            {/* H1 — 60px desktop / 40px mobile, DM Serif Display */}
            <h1 className="font-serif font-normal text-[40px] md:text-[60px] leading-[1.08] tracking-tight mb-6 max-w-[760px]">
              Revenue growth depends on the{' '}
              <span className="text-crimson">system</span> behind it.
            </h1>
            {/* Body Large — 20px desktop / 18px mobile */}
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/60 mb-10 max-w-[560px]">
              Revenue Infrastructure is the connected system of strategy, technology, data, processes, and execution that turns market opportunity into measurable revenue. When those parts work together, growth becomes easier to see, manage, and improve.
            </p>
            {/* Primary CTA */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-crimson hover:bg-crimson-dark transition-colors text-white font-sans font-semibold text-[16px] h-12 px-8 rounded flex items-center gap-2.5">
                BOOK A REVENUE DIAGNOSTIC <Icon name="arrow" s={16} c="white" />
              </button>
            </div>
          </div>

          {/* Right SVG visual — hidden below lg */}
          <div className="hidden lg:block">
            <svg viewBox="0 0 560 400" className="w-full" aria-hidden="true">
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="10" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <marker id="arrW" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="white" opacity="0.5"/>
                </marker>
              </defs>

              {/* Paths from inputs to hub */}
              {inputs.map((inp, i) => {
                const sy = inp.yPct / 100 * 400
                return (
                  <path key={i}
                    d={`M 90 ${sy} Q 255 ${sy} ${CX} ${CY}`}
                    fill="none" stroke="white" strokeOpacity={0.2} strokeWidth={1.2}
                    strokeDasharray="5 4"
                    className={drawn ? 'path-draw' : ''}
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                )
              })}

              {/* Hub */}
              <circle cx={CX} cy={CY} r={66} fill="#BE1E2D" filter="url(#glow)" />
              <circle cx={CX} cy={CY} r={66} fill="#BE1E2D" />
              {/* Hub text — 14px SVG inside visual element */}
              <text x={CX} y={CY - 14} textAnchor="middle" fill="white" fontSize="13" fontWeight="600" letterSpacing="2" fontFamily="'DM Sans', sans-serif">REVENUE</text>
              <text x={CX} y={CY + 4}  textAnchor="middle" fill="white" fontSize="13" fontWeight="600" letterSpacing="2" fontFamily="'DM Sans', sans-serif">INFRA-</text>
              <text x={CX} y={CY + 22} textAnchor="middle" fill="white" fontSize="13" fontWeight="600" letterSpacing="2" fontFamily="'DM Sans', sans-serif">STRUCTURE</text>

              {/* Output arrow */}
              <line x1={CX + 68} y1={CY} x2={500} y2={CY} stroke="white" strokeOpacity={0.5} strokeWidth={1.5}
                    markerEnd="url(#arrW)"
                    className={drawn ? 'path-draw' : ''} style={{ animationDelay: '1.1s' }} />

              {/* Revenue Outcomes box */}
              <rect x={510} y={CY - 50} width={42} height={100} rx={4} fill="none" stroke="white" strokeOpacity={0.2} strokeWidth={1} />
              <text x={531} y={CY - 24} textAnchor="middle" fill="white" fillOpacity={0.8} fontSize="10" fontFamily="'DM Sans', sans-serif">Revenue</text>
              <text x={531} y={CY - 10} textAnchor="middle" fill="white" fillOpacity={0.8} fontSize="10" fontFamily="'DM Sans', sans-serif">Outcomes</text>
              <line x1={516} y1={CY + 2} x2={546} y2={CY + 2} stroke="white" strokeOpacity={0.25} strokeWidth={0.8} />
              {['Growth', 'Clarity', 'Scale'].map((t, i) => (
                <text key={t} x={531} y={CY + 16 + i * 13} textAnchor="middle" fill="white" fillOpacity={0.4} fontSize="9" fontFamily="'DM Sans', sans-serif">{t}</text>
              ))}

              {/* Input nodes + labels */}
              {inputs.map((inp, i) => {
                const sy = inp.yPct / 100 * 400
                return (
                  <g key={i}>
                    <circle cx={72} cy={sy} r={20} fill="white" fillOpacity={0.06} stroke="white" strokeOpacity={0.18} strokeWidth={1} />
                    <text x={72} y={sy + 4} textAnchor="middle" fill="white" fillOpacity={0.6} fontSize="10" fontFamily="'DM Sans', sans-serif">{inp.label.slice(0, 3)}</text>
                    <text x={28} y={sy + 4} textAnchor="middle" fill="white" fillOpacity={0.5} fontSize="11" fontFamily="'DM Sans', sans-serif">{inp.label}</text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom-center: Learn More + accordion chevron */}
      <div className="relative z-10 flex flex-col items-center gap-3 pt-6">
        <button
          onClick={scrollToNext}
          className="text-white/60 hover:text-white transition-colors font-sans font-medium text-[16px] tracking-wide"
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
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="opacity-40 group-hover:opacity-80 transition-opacity animate-bounce"
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
    { label: 'Strategy',   Icon: () => <Icon name="target"   s={24} c="#6B7280" /> },
    { label: 'Technology', Icon: () => <Icon name="monitor"  s={24} c="#6B7280" /> },
    { label: 'Data',       Icon: () => <Icon name="database" s={24} c="#6B7280" /> },
    { label: 'Processes',  Icon: () => <Icon name="gear"     s={24} c="#6B7280" /> },
    { label: 'People',     Icon: () => <Icon name="heart"    s={24} c="#6B7280" /> },
  ]

  return (
    <section id="canonical-definition" ref={ref as React.Ref<HTMLElement>} className="py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel num="02" label="Canonical Definition" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          {/* Intro — max 720 px */}
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[720px]">
            Revenue Infrastructure is the interconnected system through which a business creates demand, captures opportunity, converts buyers, delivers value, retains customers, and learns from the results. It includes the strategies, technologies, data, processes, people, and feedback loops that connect the entire revenue journey. It is not a marketing funnel, a CRM, a technology stack, or a collection of isolated tactics.
          </p>

          {/* Convergence diagram */}
          <div className="flex flex-col items-center gap-8 max-w-[800px] mx-auto">
            {/* Five inputs */}
            <div className="flex gap-6 md:gap-12 justify-center flex-wrap">
              {inputs.map((inp) => (
                <div key={inp.label} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full border border-gray-200 bg-surface flex items-center justify-center">
                    <inp.Icon />
                  </div>
                  <span className="text-[16px] font-sans text-gray-500 font-medium">{inp.label}</span>
                </div>
              ))}
            </div>

            {/* Convergence lines */}
            <div className="w-full max-w-lg h-8 relative">
              <svg viewBox="0 0 480 32" className="w-full h-full" aria-hidden="true">
                {[40, 140, 240, 340, 440].map((x, i) => (
                  <line key={i} x1={x} y1={0} x2={240} y2={32} stroke="#E5E7EB" strokeWidth={1.5} />
                ))}
              </svg>
            </div>

            {/* Revenue Infrastructure — central label */}
            <div className="w-full max-w-lg bg-crimson text-white text-center py-5 rounded-sm">
              <span className="font-sans font-semibold text-[16px] tracking-[0.22em] uppercase">Revenue Infrastructure</span>
            </div>

            {/* Downward connector */}
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gray-300" />
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-gray-400" />
            </div>

            {/* Revenue Outcomes */}
            <div className="border border-gray-200 rounded px-10 py-5 text-center">
              {/* H3 — 28 px, DM Serif Display */}
              <h3 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] text-gray-900 mb-2">Revenue Outcomes</h3>
              <p className="text-[16px] font-sans text-gray-500">
                Growth&thinsp;•&thinsp;Efficiency&thinsp;•&thinsp;Predictability&thinsp;•&thinsp;Scalability
              </p>
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
        <SectionLabel num="03" label="Why Revenue Infrastructure Matters" />
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
                      <div className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
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
        <SectionLabel num="04" label="Nine-Domain Framework" />
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
                  className="text-left rounded-2xl border p-7 transition-all duration-200 focus:outline-none group"
                  style={{
                    borderColor:  isActive ? '#BE1E2D' : '#E5E7EB',
                    background:   isActive ? '#FFF1F2' : 'white',
                    opacity:      isOther ? 0.45 : 1,
                    boxShadow:    isActive
                      ? '0 0 0 3px rgba(190,30,45,0.08), 0 4px 16px rgba(190,30,45,0.1)'
                      : '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={() => setActiveDomain(d.id)}
                  onMouseLeave={() => setActiveDomain(null)}
                  onClick={() => setActiveDomain(isActive ? null : d.id)}
                >
                  {/* Card header: icon + number */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200"
                      style={{ background: isActive ? '#BE1E2D' : '#F3F4F6' }}
                    >
                      <Icon name={icon} s={20} c={isActive ? 'white' : '#4B5563'} />
                    </div>
                    <span
                      className="font-sans font-bold text-[12px] tracking-[0.14em]"
                      style={{ color: isActive ? '#BE1E2D' : '#D1D5DB' }}
                    >
                      {String(d.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Domain name */}
                  <h4
                    className="font-serif font-normal text-[20px] md:text-[21px] leading-[1.3] mb-3"
                    style={{ color: isActive ? '#BE1E2D' : '#111827' }}
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
  const { ref, visible } = useReveal()
  const [hovered, setHovered] = useState<number | null>(null)

  // The six forces of the Revenue Infrastructure Flywheel
  const forces = [
    { id: 1, name: 'Visibility',      icon: 'eye',       desc: 'Ensures the right audience discovers and recognizes the brand' },
    { id: 2, name: 'Trust',           icon: 'target',    desc: 'Builds credibility and confidence in the brand and offering' },
    { id: 3, name: 'Conversion',      icon: 'magnet',    desc: 'Turns interest into qualified leads and customers' },
    { id: 4, name: 'Operations',      icon: 'database',  desc: 'Delivers value consistently and efficiently' },
    { id: 5, name: 'Intelligence',    icon: 'chart',     desc: 'Captures insights and learns from performance data' },
    { id: 6, name: 'Optimization',    icon: 'gear',      desc: 'Applies learnings to improve the entire system' },
  ]

  // SVG coordinate space for the flywheel (circular layout)
  const VW = 600, VH = 600
  const centerX = VW / 2, centerY = VH / 2
  const radius = 180
  const nodeR = 28

  // Calculate positions for the six forces in a circle
  const positions = forces.map((_, i) => {
    const angle = (i / forces.length) * 2 * Math.PI - Math.PI / 2 // Start at top
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  })

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[144px] bg-surface">
      <div className={CONTAINER}>
        <SectionLabel num="05" label="Revenue Infrastructure Flywheel" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Revenue Infrastructure compounds when the system reinforces itself.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Each strength builds on the previous, creating a self-reinforcing cycle of growth.
          </p>

          {/* ── Desktop flywheel diagram ── */}
          <div className="hidden lg:block">
            <div className="relative w-full" style={{ aspectRatio: `${VW} / ${VH}` }}>
              {/* SVG: flywheel geometry and connections */}
              <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VW} ${VH}`} aria-hidden="true">
                <defs>
                  {/* Arrow markers for connections */}
                  <marker id="flywheel-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 z" fill="#BE1E2D" />
                  </marker>
                  <marker id="flywheel-arrow-active" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 z" fill="#BE1E2D" />
                  </marker>
                </defs>

                {/* Circular path for the flywheel */}
                <path
                  d={`M ${centerX + radius},${centerY}
                     A ${radius},${radius} 0 1,1 ${centerX - radius},${centerY}
                     A ${radius},${radius} 0 1,1 ${centerX + radius},${centerY}`}
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />

                {/* Connections between forces (arrows) */}
                {forces.map((force, i) => {
                  const nextIndex = (i + 1) % forces.length
                  const fromPos = positions[i]
                  const toPos = positions[nextIndex]

                  // Calculate arrow positioning on the circle
                  const angleFrom = Math.atan2(fromPos.y - centerY, fromPos.x - centerX)
                  const angleTo = Math.atan2(toPos.y - centerY, toPos.x - centerX)

                  const fromX = centerX + (radius - nodeR) * Math.cos(angleFrom)
                  const fromY = centerY + (radius - nodeR) * Math.sin(angleFrom)
                  const toX = centerX + (radius - nodeR) * Math.cos(angleTo)
                  const toY = centerY + (radius - nodeR) * Math.sin(angleTo)

                  const isActive = hovered === force.id || hovered === forces[nextIndex].id

                  return (
                    <path
                      key={i}
                      d={`M ${fromX},${fromY} L ${toX},${toY}`}
                      fill="none"
                      stroke={isActive ? '#BE1E2D' : '#E5E7EB'}
                      strokeWidth={isActive ? 2 : 1.5}
                      markerEnd="url(#flywheel-arrow)"
                      style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                    />
                  )
                })}

                {/* Pulse animation - one signal traveling around the loop */}
                {/* This would be implemented with CSS animation or SMIL in a real implementation */}
                {/* For now, we'll show the complete state */}
              </svg>

              {/* HTML nodes (force labels) positioned over SVG */}
              {forces.map((force, i) => {
                const pos = positions[i]
                const xPct = (pos.x / VW) * 100
                const yPct = (pos.y / VH) * 100
                const isActive = hovered === force.id
                const isOther = hovered !== null && !isActive

                return (
                  <div key={force.id}>
                    {/* Force button/node */}
                    <button
                      className="absolute flex items-center justify-center transition-all duration-200 focus:outline-none"
                      style={{
                        width: 56, height: 56,
                        left: `${xPct}%`, top: `${yPct}%`,
                        transform: 'translate(-50%, -50%)',
                        background: isActive ? '#BE1E2D' : 'white',
                        border: `${isActive ? 2 : 1.5}px solid ${isActive ? 'white' : '#E5E7EB'}`,
                        color: isActive ? 'white' : '#4B5563',
                        opacity: isOther ? 0.3 : 1,
                        boxShadow: isActive
                          ? '0 0 0 4px rgba(190,30,45,0.15), 0 3px 8px rgba(190,30,45,0.2)'
                          : '0 1px 3px rgba(0,0,0,0.1)',
                        zIndex: 10
                      }}
                      onMouseEnter={() => setHovered(force.id)}
                      onMouseLeave={() => setHovered(null)}
                      aria-label={force.name}
                    >
                      <Icon name={force.icon} s={20} c={isActive ? 'white' : '#4B5563'} />
                    </button>

                    {/* Force label */}
                    <div
                      className="absolute pointer-events-none text-center"
                      style={{
                        left: `${xPct}%`,
                        top: `${((pos.y + nodeR + 18) / VH) * 100}%`,
                        width: 80,
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                        opacity: isOther ? 0.2 : 1,
                        transition: 'opacity 0.2s',
                        zIndex: 10
                      }}
                    >
                      <span className="block font-sans font-semibold text-[11px] tracking-[0.15em]"
                        style={{ color: isActive ? '#BE1E2D' : '#6B7280' }}>
                        {String(force.id).padStart(2, '0')}
                      </span>
                      <span className="block font-sans font-semibold text-[14px]"
                        style={{ color: isActive ? '#BE1E2D' : '#1F2937', marginTop: 2 }}>
                        {force.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Description panel */}
            <div className="mt-6 text-center space-y-3">
              {hovered ? (
                <div>
                  <h3 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25]">
                    {forces[hovered - 1].name}
                  </h3>
                  <p className="text-[16px] font-sans text-gray-600 leading-[1.6] max-w-[500px] mx-auto">
                    {forces[hovered - 1].desc}
                  </p>
                </div>
              ) : (
                <p className="text-[16px] font-sans text-gray-500">
                  Hover any force to see how it strengthens the next
                </p>
              )}
            </div>
          </div>

          {/* ── Mobile: vertical sequence ── */}
          <div className="lg:hidden mt-4 space-y-6">
            {forces.map((force, i) => (
              <div key={force.id} className="flex items-start gap-4">
                {/* Force indicator */}
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full"
                    style={{
                      background: '#BE1E2D',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 600
                    }}>
                    {String(force.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Force content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon name={force.icon} s={18} c="#BE1E2D" />
                    <h3 className="font-serif font-normal text-[20px] md:text-[22px] leading-[1.3]">
                      {force.name}
                    </h3>
                  </div>
                  <p className="text-[16px] font-sans text-gray-600 leading-[1.6]">
                    {force.desc}
                  </p>
                </div>

                {/* Connection arrow (except for last item) */}
                {i < forces.length - 1 && (
                  <div className="w-2 h-2 flex items-center justify-center mt-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8L8 12M8 12L12 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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
    <section ref={ref as React.Ref<HTMLElement>} className="py-[72px] md:py-[112px] bg-white">
      <div className={CONTAINER}>
        <SectionLabel num="06" label="Fragmented vs Connected" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-gray-900 mb-5 max-w-[720px]">
            Same components. Very different outcomes.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[620px]">
            The difference isn't the tools. It's whether they work as a system.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            {/* ── FRAGMENTED ── */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-7 pb-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-crimson shrink-0" />
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
            <div className="border border-connected/30 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-7 pb-5 border-b border-connected/10 flex items-center gap-3" style={{ background: 'rgba(5,150,105,0.04)' }}>
                <div className="w-2 h-2 rounded-full bg-connected shrink-0" />
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
        <SectionLabel num="07" label="Revenue Leakage Points" />
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
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-3">
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
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${activeLeakage === i ? 'bg-warning/20 scale-110' : 'hover:bg-warning/10'}`}>
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
              <div className="bg-warning-light border border-warning/20 rounded-xl p-8">
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
              <p className="text-[16px] font-sans text-gray-400 italic">
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
        <SectionLabel num="08" label="Revenue Infrastructure Maturity" />
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
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 relative transition-all ${
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
          <div className="bg-surface rounded-xl p-8 md:p-10 border border-gray-100 min-h-[120px]">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center text-white text-[14px] font-sans font-bold shrink-0">{active.n}</div>
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
        <SectionLabel num="09" label="Traditional Approaches vs Revenue Infrastructure" />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-16 max-w-[620px]">
            Specialists optimise a part. Revenue Infrastructure orchestrates the whole.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="border border-gray-200 rounded-xl p-8 md:p-10">
              <p className="text-[14px] font-sans font-bold tracking-[0.16em] text-gray-400 uppercase mb-8">Traditional (Specialist) Approach</p>
              <div className="flex flex-wrap gap-6 mb-10 justify-center">
                {specialists.map((s) => (
                  <div key={s.name} className="flex flex-col items-center gap-2.5">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
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
            <div className="border border-crimson/20 rounded-xl p-8 md:p-10 bg-crimson-muted">
              <p className="text-[14px] font-sans font-bold tracking-[0.16em] text-crimson uppercase mb-8">Revenue Infrastructure Approach</p>
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                {DOMAINS.map((d, i) => (
                  <div key={d.id} className="flex items-center gap-2 bg-white border border-crimson/15 rounded-full px-4 py-2">
                    <div className="w-5 h-5 rounded-full bg-crimson/12 flex items-center justify-center">
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
        <SectionLabel num="10" label="How GWS Applies the Framework" />
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
                      <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center mb-6 relative z-10 border-2"
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
                      <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center mb-6 relative z-10 border-2"
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
        <SectionLabel num="11" label="Business Outcomes" />
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
              <div key={o.name} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
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
    <section ref={ref as React.Ref<HTMLElement>} className="py-[144px] bg-gws-dark text-white relative overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Crimson glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[300px] bg-crimson/15 blur-[100px] pointer-events-none" />
      {/* System motif */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 140 140" width={280} height={280}>
          <circle cx={70} cy={70} r={50} fill="none" stroke="white" strokeWidth={0.8} strokeDasharray="4 3"/>
          <circle cx={70} cy={70} r={18} fill="white" fillOpacity={0.3}/>
          {bgDomains.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={7} fill="none" stroke="white" strokeWidth={0.8}/>
              <line x1={70} y1={70} x2={p.x} y2={p.y} stroke="white" strokeWidth={0.5} strokeOpacity={0.5}/>
            </g>
          ))}
        </svg>
      </div>

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <SectionLabel num="12" label="Revenue Diagnostic CTA" dark />
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          {/* H2 */}
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] mb-6 max-w-[720px] mx-auto">
            Start with the{' '}
            <span className="text-crimson">system.</span>
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/60 mb-10 max-w-[560px] mx-auto">
            Find where your Revenue Infrastructure is helping — or limiting — growth.
          </p>

          {/* Checklist */}
          <ul className="flex flex-col items-center gap-3 mb-12">
            {ctaItems.map(item => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-crimson/25 border border-crimson/50 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#BE1E2D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[18px] font-sans text-white/75">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA button — 16 px semibold, 48 px height */}
          <button className="bg-crimson hover:bg-crimson-dark transition-colors text-white font-sans font-semibold text-[16px] h-12 px-10 rounded flex items-center gap-3 mx-auto">
            Book a Revenue Diagnostic <Icon name="arrow" s={16} c="white" />
          </button>

          <p className="font-sans text-white/25 text-[14px] mt-12 tracking-wide">
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
