import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const DIAGNOSTIC_QUESTIONS = [
  {
    num: "01",
    title: "Where Are We Losing Revenue?",
    desc: "Most organizations see weak performance without knowing which system, process, or handoff is responsible. The diagnostic identifies the specific points where revenue is being lost.",
  },
  {
    num: "02",
    title: "What Is the Business Impact?",
    desc: "Identifying a deficiency is not enough. The diagnostic connects each finding to measurable operating consequences and revenue impact.",
  },
  {
    num: "03",
    title: "What Should We Fix First?",
    desc: "Priorities must be sequenced based on business impact, risk, effort, and practical implementation capacity. The diagnostic produces a prioritized roadmap.",
  },
];

const ASSESSMENT_PRINCIPLES = [
  {
    num: "01",
    title: "Educate First",
    desc: "Establish the standard before scoring the organization against it. Every dimension is explained before it is assessed.",
  },
  {
    num: "02",
    title: "Score Second",
    desc: "Assess each relevant dimension using observations, evidence, and available data. Findings are grounded in what exists today.",
  },
  {
    num: "03",
    title: "Recommend Third",
    desc: "Translate findings into prioritized improvement direction. Recommendations are sequenced by impact, effort, and business readiness.",
  },
];

const METHODOLOGY_STAGES = [
  {
    num: "01",
    name: "Prepare",
    phase: "DIAGNOSTIC",
    timing: "Pre-engagement",
    output: "Engagement Brief",
    desc: "Define scope, objectives, stakeholders, and data requirements. Establish the assessment plan and timeline.",
  },
  {
    num: "02",
    name: "Assess",
    phase: "DIAGNOSTIC",
    timing: "Week 1–2",
    output: "Raw Assessment Data",
    desc: "Conduct structured interviews, audit existing systems, gather evidence across all relevant domains.",
  },
  {
    num: "03",
    name: "Analyze",
    phase: "DIAGNOSTIC",
    timing: "Week 2–3",
    output: "Domain Score Report",
    desc: "Score each domain, identify gaps, quantify leakage, classify risk levels across the infrastructure.",
  },
  {
    num: "04",
    name: "Prioritize",
    phase: "DIAGNOSTIC",
    timing: "Week 3",
    output: "Priority Matrix",
    desc: "Map findings to business impact versus implementation effort. Sequence recommendations by value and feasibility.",
  },
  {
    num: "05",
    name: "Recommend",
    phase: "DIAGNOSTIC",
    timing: "Week 3–4",
    output: "Executive Report",
    desc: "Deliver board-ready findings, prioritized recommendations, phased roadmap, and expected outcomes.",
  },
  {
    num: "06",
    name: "Implement",
    phase: "IMPLEMENTATION",
    timing: "Month 1–6",
    output: "Implemented Systems",
    desc: "Execute the prioritized roadmap. Integrate systems, establish processes, build capabilities, establish momentum.",
  },
  {
    num: "07",
    name: "Measure",
    phase: "INTELLIGENCE",
    timing: "Ongoing",
    output: "Intelligence Dashboard",
    desc: "Track performance across domains. Monitor leading indicators. Measure actual outcomes against expected results.",
  },
  {
    num: "08",
    name: "Optimize",
    phase: "INTELLIGENCE",
    timing: "Ongoing",
    output: "Optimization Log",
    desc: "Refine based on data. Learn from results. Continuously improve infrastructure effectiveness over time.",
  },
];

const DIAGNOSTIC_DOMAINS = [
  { code: "D1", name: "Strategic Positioning & Offer Architecture", score: "—", risk: "Pending Assessment" },
  { code: "D2", name: "Digital Presence & AI-Ready Website", score: "—", risk: "Pending Assessment" },
  { code: "D3", name: "Search, Local & AI Visibility", score: "—", risk: "Pending Assessment" },
  { code: "D4", name: "Authority, Content, Reviews & Trust", score: "—", risk: "Pending Assessment" },
  { code: "D5", name: "Customer Acquisition & Outbound Systems", score: "—", risk: "Pending Assessment" },
  { code: "D6", name: "Conversion, Speed-to-Lead & AI Reception", score: "—", risk: "Pending Assessment" },
  { code: "D7", name: "CRM, Pipeline & Revenue Operations", score: "—", risk: "Pending Assessment" },
  { code: "D8", name: "Automation, Customer Experience & Retention", score: "—", risk: "Pending Assessment" },
  { code: "D9", name: "Revenue Intelligence, Measurement & Optimization", score: "—", risk: "Pending Assessment" },
];

const HEATMAP_DOMAINS = [
  { code: "D1", short: "Strategic Positioning", risk: "MEDIUM RISK" },
  { code: "D2", short: "Digital Presence", risk: "HIGH RISK" },
  { code: "D3", short: "AI Visibility", risk: "CRITICAL RISK" },
  { code: "D4", short: "Authority & Trust", risk: "HIGH RISK" },
  { code: "D5", short: "Customer Acquisition", risk: "MEDIUM RISK" },
  { code: "D6", short: "Conversion & Speed-to-Lead", risk: "CRITICAL RISK" },
  { code: "D7", short: "CRM & Revenue Ops", risk: "HIGH RISK" },
  { code: "D8", short: "Automation & Retention", risk: "MEDIUM RISK" },
  { code: "D9", short: "Revenue Intelligence", risk: "HIGH RISK" },
];

const ASSESSMENTS = [
  {
    name: "AI Visibility Assessment",
    domain: "D3",
    dimensions: ["Entity Accuracy", "Citation Authority", "Content Authority", "Technical Readiness", "Recommendation Frequency", "Competitive Position", "Measurement Infrastructure"],
  },
  {
    name: "AI-Ready Website Assessment",
    domain: "D2",
    dimensions: ["Technical Performance", "AI Comprehension", "Structured Data", "Content Architecture", "Conversion Infrastructure", "Entity Signals"],
  },
  {
    name: "Speed-to-Lead Assessment",
    domain: "D6",
    dimensions: ["Response Time Benchmarks", "Lead Routing", "AI Reception Capability", "Follow-Up Sequences", "Conversion Rate by Channel"],
  },
  {
    name: "Authority & Trust Assessment",
    domain: "D4",
    dimensions: ["Review Volume and Velocity", "Reputation Score", "Thought Leadership Assets", "Third-Party Citations", "Content Authority Signals"],
  },
  {
    name: "CRM & Revenue Operations Assessment",
    domain: "D7 / D8",
    dimensions: ["CRM Adoption", "Pipeline Visibility", "Workflow Automation", "Data Quality", "Reporting Infrastructure", "Team Enablement"],
  },
  {
    name: "Master Revenue Infrastructure Assessment",
    domain: "D1–D9",
    dimensions: ["Executive Scorecard", "Domain Heat Map", "Prioritization Matrix", "Improvement Roadmap"],
  },
];

const ROADMAP_PHASES = [
  {
    num: "01",
    name: "Immediate",
    timing: "30 Days",
    focus: "Stop the Bleeding",
    actions: ["AI Visibility baseline", "Entity definition", "Google Business Profile optimization", "Citation audit", "Speed-to-lead measurement", "Review-generation activation", "Website technical audit", "Critical fixes"],
    output: "Stabilized Foundation",
  },
  {
    num: "02",
    name: "Foundation",
    timing: "90 Days",
    focus: "Build the Infrastructure",
    actions: ["AI-Ready Website implementation", "CRM deployment", "Pipeline configuration", "Content Authority program", "Conversion System implementation", "Attribution / measurement infrastructure"],
    output: "Operational Infrastructure",
  },
  {
    num: "03",
    name: "Optimization",
    timing: "6 Months",
    focus: "Compound the Advantage",
    actions: ["AI Visibility authority building", "AI Visibility monitoring", "Workflow automation", "Integration", "Outbound acquisition", "Revenue Intelligence dashboards", "Competitive positioning"],
    output: "Integrated Revenue Engine",
  },
  {
    num: "04",
    name: "Continuous Improvement",
    timing: "Ongoing",
    focus: "Compounding Advantage",
    actions: ["Monthly performance review", "AI Visibility monitoring", "Growth experiments", "New-domain activation", "Annual Revenue Infrastructure reassessment"],
    output: "Compounding Advantage",
  },
];

const EXECUTIVE_REPORT_SECTIONS = [
  { num: "01", name: "Executive Summary", pages: "1–2 pages" },
  { num: "02", name: "Business Context", pages: "1 page" },
  { num: "03", name: "Assessment Methodology", pages: "1 page" },
  { num: "04", name: "Domain Findings", pages: "9–18 pages" },
  { num: "05", name: "Executive Scorecard", pages: "1–2 pages" },
  { num: "06", name: "Revenue Leakage Analysis", pages: "2–3 pages" },
  { num: "07", name: "Prioritization Matrix", pages: "1–2 pages" },
  { num: "08", name: "Improvement Roadmap", pages: "2–3 pages" },
  { num: "09", name: "Expected Outcomes", pages: "1–2 pages" },
  { num: "10", name: "Appendix", pages: "Variable" },
];

const DIAGNOSTIC_OUTPUTS = [
  { num: "01", name: "Revenue Infrastructure Score", desc: "Overall system health metric" },
  { num: "02", name: "Maturity Level", desc: "Current stage of infrastructure development" },
  { num: "03", name: "Domain Heat Map", desc: "Risk and opportunity visualization" },
  { num: "04", name: "Revenue Leakage Analysis", desc: "Quantified impact of system gaps" },
  { num: "05", name: "Prioritization Matrix", desc: "Impact vs. effort sequencing" },
  { num: "06", name: "Phased Improvement Roadmap", desc: "Time-sequenced implementation plan" },
  { num: "07", name: "Executive Report", desc: "Board-ready findings document" },
  { num: "08", name: "Discovery Call Agenda", desc: "Grounded in specific findings" },
];

// ─── Shared layout primitives ───────────────────────────────────────────────────
const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";

function SectionLabel({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p className={`text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 ${dark ? "text-white/40" : "text-[#841617]"}`}>
      {label}
    </p>
  );
}

// ─── SECTION 01: HERO ──────────────────────────────────────────────────────────
function HeroSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      className="bg-[#F8F5EC] pt-[96px] md:pt-[128px] pb-[72px] md:pb-[96px] border-b border-[#DDD6CC]"
    >
      <div className={CONTAINER}>
        <div className={`grid lg:grid-cols-[1fr_480px] gap-12 items-center reveal ${visible ? "visible" : ""}`}>
          {/* Left: Copy + CTAs */}
          <div>
            <SectionLabel label="DIAGNOSTIC PLATFORM" />
            <h1 className="font-serif font-normal text-[#2B2B2B] leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6">
              Revenue Infrastructure Diagnostic
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#2B2B2B] mb-10 max-w-[600px]">
              A disciplined, repeatable methodology for evaluating and improving the systems that determine a business's ability to attract, convert, retain, and grow profitable customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/revenue-diagnostic"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px]"
              >
                BOOK A REVENUE DIAGNOSTIC
              </a>
              <a
                href="#methodology"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none border-2 border-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white transition-colors text-[#2B2B2B] font-sans font-semibold text-[16px]"
              >
                VIEW METHODOLOGY
              </a>
            </div>
          </div>

          {/* Right: Analytical summary panel */}
          <div className="hidden lg:block bg-[#2B2B2B] rounded-2xl p-8 border border-[#3A3A3A]">
            <div className="space-y-6">
              <div className="border-b border-[#3A3A3A] pb-5">
                <p className="text-[11px] font-sans font-bold tracking-[0.12em] uppercase text-white/40 mb-3">Overall RI Score</p>
                <p className="text-[48px] font-serif font-normal text-white leading-none">—</p>
                <p className="text-[14px] font-sans text-white/60 mt-2">Pending Assessment</p>
              </div>
              <div className="border-b border-[#3A3A3A] pb-5">
                <p className="text-[11px] font-sans font-bold tracking-[0.12em] uppercase text-white/40 mb-3">Maturity Level</p>
                <p className="text-[20px] font-serif text-white">—</p>
              </div>
              <div>
                <p className="text-[11px] font-sans font-bold tracking-[0.12em] uppercase text-white/40 mb-3">Domains Assessed</p>
                <div className="flex flex-wrap gap-2">
                  {["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"].map((d) => (
                    <span key={d} className="text-[13px] font-sans font-semibold text-white/30 bg-white/5 px-3 py-1 rounded">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 02: THREE DIAGNOSTIC QUESTIONS ────────────────────────────────────
function DiagnosticQuestionsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="questions" ref={ref as React.Ref<HTMLElement>} className="py-[72px] md:py-[112px] bg-white scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <div className="max-w-[720px] mb-12">
            <SectionLabel label="THE DIAGNOSTIC ANSWERS THREE QUESTIONS" />
            <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B]">
              Where revenue is lost. What it costs. What to fix first.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DIAGNOSTIC_QUESTIONS.map((q, i) => (
              <div key={q.num} className="border-t-4 border-[#841617] pt-6">
                <span className="text-[14px] font-sans font-bold tracking-[0.14em] uppercase text-[#841617] mb-4 block">{q.num}</span>
                <h3 className="font-serif font-normal text-[20px] md:text-[24px] leading-[1.25] text-[#2B2B2B] mb-3">{q.title}</h3>
                <p className="text-[16px] font-sans text-[#625E59] leading-[1.6]">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 03: ASSESSMENT PRINCIPLES ─────────────────────────────────────────
function AssessmentPrinciplesSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="assessment-principles" ref={ref as React.Ref<HTMLElement>} className="py-[72px] md:py-[112px] bg-[#F8F5EC] scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="ASSESSMENT PRINCIPLES" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-12">
            Educate. Score. Recommend.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {ASSESSMENT_PRINCIPLES.map((p) => (
              <div key={p.num} className="bg-white border border-[#DDD6CC] rounded-xl p-8">
                <div className="w-12 h-12 rounded-full bg-[#841617] text-white flex items-center justify-center font-sans font-bold text-[16px] mb-5">
                  {p.num}
                </div>
                <h3 className="font-serif font-normal text-[20px] md:text-[21px] leading-[1.3] text-[#2B2B2B] mb-3">{p.title}</h3>
                <p className="text-[16px] font-sans text-[#625E59] leading-[1.6]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 04: EIGHT-STAGE METHODOLOGY ───────────────────────────────────────
function MethodologySection() {
  const { ref, visible } = useReveal();

  return (
    <section id="methodology" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-white scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="CONSULTING METHODOLOGY" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            Eight stages from first contact to compounding advantage.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The Revenue Infrastructure Diagnostic follows a structured eight-stage process, grouped into three phases.
          </p>

          {/* Phase groupings */}
          <div className="mb-12 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#841617]"></div>
              <span className="text-[14px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Diagnostic Phase</span>
              <span className="text-[14px] font-sans text-[#625E59]">Stages 01–05</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#059669]"></div>
              <span className="text-[14px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Implementation Phase</span>
              <span className="text-[14px] font-sans text-[#625E59]">Stage 06</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
              <span className="text-[14px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Intelligence Phase</span>
              <span className="text-[14px] font-sans text-[#625E59]">Stages 07–08</span>
            </div>
          </div>

          {/* Desktop: Horizontal overview */}
          <div className="hidden lg:block mb-12">
            <div className="relative">
              <div className="absolute top-[40px] left-[6%] right-[6%] h-px bg-[#DDD6CC]"></div>
              <div className="flex justify-between">
                {METHODOLOGY_STAGES.map((stage, i) => {
                  const phaseColor = stage.phase === "DIAGNOSTIC" ? "#841617" : stage.phase === "IMPLEMENTATION" ? "#059669" : "#2563EB";
                  return (
                    <div key={stage.num} className="flex flex-col items-center" style={{ flex: 1 }}>
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center border-4 bg-white relative z-10 mb-4"
                        style={{ borderColor: phaseColor }}
                      >
                        <span className="text-[16px] font-sans font-bold" style={{ color: phaseColor }}>
                          {stage.num}
                        </span>
                      </div>
                      <h4 className="font-serif font-normal text-[18px] leading-[1.3] text-[#2B2B2B] mb-1 text-center">{stage.name}</h4>
                      <p className="text-[13px] font-sans text-[#625E59] text-center">{stage.timing}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stage details */}
          <div className="space-y-4">
            {METHODOLOGY_STAGES.map((stage) => {
              const phaseColor = stage.phase === "DIAGNOSTIC" ? "#841617" : stage.phase === "IMPLEMENTATION" ? "#059669" : "#2563EB";
              return (
                <div key={stage.num} className="border border-[#DDD6CC] rounded-xl p-6 md:p-8 bg-white">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border-2" style={{ borderColor: phaseColor, backgroundColor: `${phaseColor}15` }}>
                        <span className="text-[16px] font-sans font-bold" style={{ color: phaseColor }}>
                          {stage.num}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                        <h3 className="font-serif font-normal text-[20px] md:text-[24px] leading-[1.25] text-[#2B2B2B]">{stage.name}</h3>
                        <span className="text-[14px] font-sans text-[#625E59]">{stage.timing}</span>
                      </div>
                      <p className="text-[16px] font-sans text-[#625E59] leading-[1.6] mb-4">{stage.desc}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Output:</span>
                        <span className="text-[14px] font-sans font-semibold text-[#2B2B2B]">{stage.output}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 05: EXECUTIVE SCORECARD ───────────────────────────────────────────
function ExecutiveScorecardSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="executive-scorecard" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-[#F8F5EC] scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="EXECUTIVE SCORECARD" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            A single view of your Revenue Infrastructure performance.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The Executive Scorecard consolidates findings across all Nine Domains into one dashboard view.
          </p>

          {/* Summary metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Overall RI Score", value: "—" },
              { label: "Maturity Level", value: "Pending Assessment" },
              { label: "Critical Risk Domains", value: "—" },
              { label: "High Risk Domains", value: "—" },
              { label: "Quick Win Opportunities", value: "—" },
              { label: "Estimated Revenue Leakage", value: "—" },
            ].map((metric) => (
              <div key={metric.label} className="bg-white border border-[#DDD6CC] rounded-xl p-6">
                <p className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59] mb-3">{metric.label}</p>
                <p className="text-[28px] font-serif text-[#2B2B2B]">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Domain scorecard */}
          <div className="bg-white border border-[#DDD6CC] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#DDD6CC] bg-[#F8F5EC]">
                    <th className="text-left px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Domain</th>
                    <th className="text-left px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Name</th>
                    <th className="text-center px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Score</th>
                    <th className="text-left px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Risk State</th>
                  </tr>
                </thead>
                <tbody>
                  {DIAGNOSTIC_DOMAINS.map((domain) => (
                    <tr key={domain.code} className="border-b border-[#DDD6CC] last:border-b-0">
                      <td className="px-6 py-4 text-[14px] font-sans font-bold text-[#841617]">{domain.code}</td>
                      <td className="px-6 py-4 text-[16px] font-sans text-[#2B2B2B]">{domain.name}</td>
                      <td className="px-6 py-4 text-center text-[18px] font-serif text-[#2B2B2B]">{domain.score}</td>
                      <td className="px-6 py-4 text-[14px] font-sans text-[#625E59]">{domain.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 06: DOMAIN HEAT MAP ───────────────────────────────────────────────
function DomainHeatMapSection() {
  const { ref, visible } = useReveal();

  const getRiskColor = (risk: string) => {
    if (risk.includes("CRITICAL")) return { bg: "#7F1D1D", border: "#991B1B", text: "#FEE2E2" };
    if (risk.includes("HIGH")) return { bg: "#DC2626", border: "#EF4444", text: "#FEE2E2" };
    if (risk.includes("MEDIUM")) return { bg: "#D97706", border: "#F59E0B", text: "#FEF3C7" };
    return { bg: "#6B7280", border: "#9CA3AF", text: "#F3F4F6" };
  };

  return (
    <section id="heat-map" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-white scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="DOMAIN HEAT MAP" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            Business risk and opportunity visualized across all Nine Domains.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The Heat Map translates domain scores into a visual risk classification system.
          </p>

          <div className="mb-8 p-4 bg-[#F8F5EC] border border-[#DDD6CC] rounded-xl">
            <p className="text-[14px] font-sans font-semibold text-[#625E59] text-center">
              <span className="text-[#841617] font-bold">ILLUSTRATIVE ASSESSMENT</span> — Example risk states for demonstration purposes
            </p>
          </div>

          {/* 3×3 Grid on desktop, stacked on mobile */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HEATMAP_DOMAINS.map((domain) => {
              const colors = getRiskColor(domain.risk);
              return (
                <div
                  key={domain.code}
                  className="rounded-xl p-6 border-2"
                  style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[16px] font-sans font-bold" style={{ color: colors.text }}>
                      {domain.code}
                    </span>
                    <span
                      className="text-[11px] font-sans font-bold tracking-[0.12em] uppercase px-2 py-1 rounded"
                      style={{ backgroundColor: colors.border, color: colors.text }}
                    >
                      {domain.risk}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-[16px] leading-[1.3]" style={{ color: colors.text }}>
                    {domain.short}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 07: PRIORITIZATION MATRIX ─────────────────────────────────────────
function PrioritizationMatrixSection() {
  const { ref, visible } = useReveal();

  const quadrants = [
    {
      name: "Quick Wins",
      subtitle: "High Impact / Low Effort",
      items: ["AI Visibility Foundation", "Speed-to-Lead System", "Google Business Profile"],
      color: "#059669",
    },
    {
      name: "Strategic Priorities",
      subtitle: "High Impact / Higher Effort",
      items: ["AI-Ready Website Rebuild", "CRM Implementation", "Content Authority Program"],
      color: "#2563EB",
    },
    {
      name: "Fill-In Work",
      subtitle: "Medium Impact / Medium Effort",
      items: ["Workflow Automation", "Attribution Tracking", "Outbound Sequences"],
      color: "#D97706",
    },
    {
      name: "Reconsider",
      subtitle: "Lower Impact / High Effort",
      items: ["Review Generation System"],
      color: "#6B7280",
    },
  ];

  return (
    <section id="prioritization-matrix" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-[#F8F5EC] scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="PRIORITIZATION MATRIX" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            Business impact versus implementation effort. Sequence matters.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The Matrix maps every recommendation by impact and effort to determine implementation priority.
          </p>

          <div className="mb-8 p-4 bg-white border border-[#DDD6CC] rounded-xl">
            <p className="text-[14px] font-sans font-semibold text-[#625E59] text-center">
              <span className="text-[#841617] font-bold">ILLUSTRATIVE RECOMMENDATIONS</span> — Example priorities for demonstration purposes
            </p>
          </div>

          {/* 2×2 Matrix - Desktop */}
          <div className="hidden lg:grid grid-cols-2 gap-4 mb-12">
            {quadrants.map((q) => (
              <div
                key={q.name}
                className="rounded-xl p-8 border-2 min-h-[240px]"
                style={{ borderColor: q.color, backgroundColor: `${q.color}10` }}
              >
                <div className="mb-6">
                  <h3 className="font-serif font-normal text-[24px] leading-[1.25] text-[#2B2B2B] mb-1">{q.name}</h3>
                  <p className="text-[14px] font-sans text-[#625E59]">{q.subtitle}</p>
                </div>
                <ul className="space-y-2">
                  {q.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: q.color }}></span>
                      <span className="text-[15px] font-sans text-[#2B2B2B]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: Stacked quadrants */}
          <div className="lg:hidden space-y-4">
            {quadrants.map((q) => (
              <div
                key={q.name}
                className="rounded-xl p-6 border-2"
                style={{ borderColor: q.color, backgroundColor: `${q.color}10` }}
              >
                <div className="mb-4">
                  <h3 className="font-serif font-normal text-[20px] leading-[1.25] text-[#2B2B2B] mb-1">{q.name}</h3>
                  <p className="text-[14px] font-sans text-[#625E59]">{q.subtitle}</p>
                </div>
                <ul className="space-y-2">
                  {q.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: q.color }}></span>
                      <span className="text-[15px] font-sans text-[#2B2B2B]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Axes labels - Desktop only */}
          <div className="hidden lg:block mt-8">
            <div className="flex justify-between items-center max-w-[800px] mx-auto">
              <div className="text-center">
                <p className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">← Lower Impact</p>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">BUSINESS IMPACT</p>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Higher Impact →</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">IMPLEMENTATION EFFORT</p>
              <p className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59] mt-1">Low Effort ↑ | ↓ High Effort</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 08: ASSESSMENT FAMILY ─────────────────────────────────────────────
function AssessmentFamilySection() {
  const { ref, visible } = useReveal();

  return (
    <section id="assessment-family" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-white scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="ASSESSMENT FAMILY" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            Six specialized assessments. One unified methodology.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            Individual assessments use the Educate → Score → Recommend methodology and roll into the broader Revenue Infrastructure Assessment.
          </p>

          <div className="space-y-6">
            {ASSESSMENTS.map((assessment, i) => (
              <div key={assessment.name} className="border border-[#DDD6CC] rounded-xl p-6 md:p-8 bg-white">
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <span className="inline-block text-[12px] font-sans font-bold tracking-[0.14em] uppercase text-white bg-[#841617] px-3 py-1 rounded">
                      {assessment.domain}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-normal text-[20px] md:text-[24px] leading-[1.25] text-[#2B2B2B]">{assessment.name}</h3>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59] mb-3">Assessment Dimensions</p>
                  <div className="flex flex-wrap gap-2">
                    {assessment.dimensions.map((dim) => (
                      <span key={dim} className="text-[14px] font-sans text-[#2B2B2B] bg-[#F8F5EC] border border-[#DDD6CC] px-3 py-1.5 rounded">
                        {dim}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 09: IMPROVEMENT ROADMAP ───────────────────────────────────────────
function ImprovementRoadmapSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="improvement-roadmap" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-[#F8F5EC] scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="IMPROVEMENT ROADMAP" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            Four phases from stabilization to compounding advantage.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The Roadmap sequences improvements by business impact, dependency, and practical implementation capacity.
          </p>

          {/* Desktop: Horizontal roadmap */}
          <div className="hidden lg:block mb-12">
            <div className="relative">
              <div className="absolute top-[48px] left-[6%] right-[6%] h-px bg-[#DDD6CC]"></div>
              <div className="flex justify-between">
                {ROADMAP_PHASES.map((phase) => (
                  <div key={phase.num} className="flex flex-col items-center" style={{ flex: 1 }}>
                    <div className="w-24 h-24 rounded-full bg-[#841617] text-white flex items-center justify-center border-4 border-white shadow-lg relative z-10 mb-4">
                      <span className="text-[18px] font-sans font-bold">{phase.num}</span>
                    </div>
                    <h4 className="font-serif font-normal text-[18px] leading-[1.3] text-[#2B2B2B] mb-1 text-center">{phase.name}</h4>
                    <p className="text-[13px] font-sans text-[#625E59] text-center mb-1">{phase.timing}</p>
                    <p className="text-[14px] font-sans font-semibold text-[#841617] text-center">{phase.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase details */}
          <div className="space-y-6">
            {ROADMAP_PHASES.map((phase) => (
              <div key={phase.num} className="bg-white border border-[#DDD6CC] rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#841617] text-white flex items-center justify-center">
                      <span className="text-[18px] font-sans font-bold">{phase.num}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                      <h3 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] text-[#2B2B2B]">{phase.name}</h3>
                      <span className="text-[14px] font-sans text-[#625E59]">{phase.timing}</span>
                    </div>
                    <p className="text-[16px] font-sans font-semibold text-[#841617] mb-4">{phase.focus}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-[14px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59] mb-3">Phase Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.actions.map((action) => (
                      <span key={action} className="text-[14px] font-sans text-[#2B2B2B] bg-[#F8F5EC] border border-[#DDD6CC] px-3 py-1.5 rounded">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[#DDD6CC]">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Phase Output:</span>
                    <span className="text-[16px] font-sans font-semibold text-[#841617]">{phase.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10: EXECUTIVE REPORT ──────────────────────────────────────────────
function ExecutiveReportSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="executive-report" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-white scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="EXECUTIVE REPORT" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            A board-ready document. Not a marketing deck.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The Executive Report is a comprehensive, structured document designed for executive decision-making.
          </p>

          <div className="bg-[#F8F5EC] border border-[#DDD6CC] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#DDD6CC]">
                    <th className="text-left px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59] w-16">#</th>
                    <th className="text-left px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Section</th>
                    <th className="text-right px-6 py-4 text-[13px] font-sans font-bold tracking-[0.12em] uppercase text-[#625E59]">Length</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {EXECUTIVE_REPORT_SECTIONS.map((section) => (
                    <tr key={section.num} className="border-b border-[#DDD6CC] last:border-b-0">
                      <td className="px-6 py-4 text-[14px] font-sans font-bold text-[#841617]">{section.num}</td>
                      <td className="px-6 py-4 text-[16px] font-sans text-[#2B2B2B]">{section.name}</td>
                      <td className="px-6 py-4 text-right text-[14px] font-sans text-[#625E59]">{section.pages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#F8F5EC] border border-[#DDD6CC] rounded-xl">
            <p className="text-[16px] font-sans text-[#625E59] leading-[1.6]">
              <strong className="text-[#2B2B2B] font-semibold">Note:</strong> The initial booking at{" "}
              <a href="/revenue-diagnostic" className="text-[#841617] underline underline-offset-2 hover:text-[#721315]">
                /revenue-diagnostic
              </a>{" "}
              begins the diagnostic process. The full Executive Report is delivered upon completion of the comprehensive assessment engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 11: DIAGNOSTIC OUTPUTS ────────────────────────────────────────────
function DiagnosticOutputsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="diagnostic-outputs" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-[#F8F5EC] scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <SectionLabel label="DIAGNOSTIC OUTPUTS" />
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-4">
            Eight artifacts. One complete picture.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            The diagnostic produces a comprehensive suite of deliverables that together form a complete view of your Revenue Infrastructure.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {DIAGNOSTIC_OUTPUTS.map((output) => (
              <div key={output.num} className="bg-white border border-[#DDD6CC] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#841617] text-white flex items-center justify-center font-sans font-bold text-[14px]">
                    {output.num}
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-[18px] md:text-[20px] leading-[1.3] text-[#2B2B2B] mb-1">{output.name}</h3>
                    <p className="text-[15px] font-sans text-[#625E59] leading-[1.6]">{output.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 12: BEGIN THE DIAGNOSTIC ─────────────────────────────────────────
function BeginDiagnosticSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="begin-diagnostic" ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-white scroll-mt-24">
      <div className={CONTAINER}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <div className="max-w-[720px] mx-auto text-center">
            <SectionLabel label="BEGIN THE DIAGNOSTIC" />
            <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] text-[#2B2B2B] mb-6">
              The Discovery Call is the first stage of the diagnostic.
            </h2>
            <p className="text-[18px] leading-[1.65] text-[#625E59] mb-4 max-w-[640px] mx-auto">
              The first conversation helps gather business context, identify likely areas of concern, understand current systems, and establish whether deeper assessment is appropriate.
            </p>
            <p className="text-[16px] leading-[1.65] text-[#625E59] mb-10 max-w-[600px] mx-auto">
              The Discovery Call is Stage 01 (Prepare) of the eight-stage methodology. It establishes the foundation for a structured Revenue Infrastructure assessment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/revenue-diagnostic"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px]"
              >
                BOOK A REVENUE DIAGNOSTIC
              </a>
              <a
                href="/resources#frameworks"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none border-2 border-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white transition-colors text-[#2B2B2B] font-sans font-semibold text-[16px]"
              >
                VIEW ALL FRAMEWORKS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 13: DARK CLOSING CTA ──────────────────────────────────────────────
function ClosingCTASection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-[88px] md:py-[144px] bg-[#2B2B2B] text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div aria-hidden="true" className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[300px] bg-[#841617]/15 blur-[100px] pointer-events-none" />

      <div className={`${CONTAINER} relative z-10`}>
        <div className={`max-w-[720px] mx-auto text-center reveal ${visible ? "visible" : ""}`}>
          <h2 className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] mb-6">
            Your business has a Revenue Infrastructure problem.
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-10 max-w-[600px] mx-auto">
            The diagnostic identifies where your infrastructure is helping — or limiting — growth. Find gaps, quantify leakage, and determine what to fix first.
          </p>
          <a
            href="/revenue-diagnostic"
            className="inline-flex items-center justify-center min-h-[48px] px-10 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px]"
          >
            BOOK A REVENUE DIAGNOSTIC
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export default function DiagnosticPlatform() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <HeroSection />
        <DiagnosticQuestionsSection />
        <AssessmentPrinciplesSection />
        <MethodologySection />
        <ExecutiveScorecardSection />
        <DomainHeatMapSection />
        <PrioritizationMatrixSection />
        <AssessmentFamilySection />
        <ImprovementRoadmapSection />
        <ExecutiveReportSection />
        <DiagnosticOutputsSection />
        <BeginDiagnosticSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
