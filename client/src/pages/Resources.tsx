import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "available" | "in-development" | "coming-soon";

interface ResourceItem {
  type: string;
  title: string;
  desc: string;
  status: Status;
  href?: string;
}

interface Category {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: ResourceItem[];
}

// ─── Resource Data (preserved from live source) ───────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "frameworks",
    label: "Frameworks",
    eyebrow: "PROPRIETARY FRAMEWORKS",
    title: "Revenue Infrastructure Frameworks",
    intro:
      "Structured intellectual frameworks that define, organize, and operationalize the Revenue Infrastructure category. These frameworks are the foundation of every GWS engagement and are published here as a public resource.",
    items: [
      { type: "Framework", title: "The Revenue Infrastructure Framework", desc: "The canonical framework defining the Nine Domains of Revenue Infrastructure — the complete operating system behind predictable revenue.", status: "available", href: "/framework" },
      { type: "Framework", title: "Revenue Infrastructure Maturity Model", desc: "Five maturity levels — Fragmented, Stabilized, Integrated, AI-Enabled, Revenue Engine — with characteristics, business risks, and expected outcomes.", status: "available" },
      { type: "Diagnostic Framework", title: "The Revenue Leakage Framework", desc: "Seven systematic points where businesses lose qualified revenue before a sale is ever attempted — and the Revenue Infrastructure domains that address each one.", status: "available" },
      { type: "Competitive Framework", title: "Agency vs. Revenue Infrastructure", desc: "An executive comparison of marketing agencies, website companies, SEO firms, software vendors, and GWS — evaluated on business outcomes rather than features.", status: "available" },
      { type: "System Model", title: "The Revenue Infrastructure Flywheel", desc: "The six-stage compounding system: Visibility → Trust → Conversion → Operations → Intelligence → Optimization → increased Visibility.", status: "available" },
      { type: "Methodology", title: "The GWS Discovery Framework", desc: "GWS's five-phase engagement methodology: Discover, Diagnose, Prioritize, Implement, Optimize — with phase outputs and decision criteria.", status: "available" },
      { type: "Framework", title: "AI Visibility Framework™", desc: "The seven-stage operating lifecycle for AI Visibility — from entity definition through systematic measurement of AI-sourced revenue. The canonical GWS implementation model.", status: "available" },
      { type: "Maturity Model", title: "AI Visibility Maturity Model™", desc: "Five maturity levels — Invisible, Indexed, Recognized, Recommended, Authoritative — with characteristics, business risks, and advancement paths for each level.", status: "available" },
      { type: "Methodology", title: "AI Visibility Score™ — Scoring Methodology", desc: "Seven-dimension diagnostic instrument measuring Entity Accuracy, Citation Authority, Content Authority, Technical Readiness, Recommendation Frequency, Competitive Position, and Measurement Infrastructure.", status: "available" },
      { type: "Implementation Guide", title: "AI Visibility Roadmap™", desc: "Five-phase implementation framework from baseline assessment through compound competitive advantage. Phase-by-phase deliverables, milestones, and success criteria.", status: "available" },
      { type: "Reference Framework", title: "AI Search Evolution — Discipline Comparison", desc: "How buyer search behavior has evolved from traditional search to AI answer engines. Includes SEO vs. GEO vs. AEO comparison table and AI Visibility discipline definition.", status: "available" },
      { type: "Consulting Methodology", title: "Revenue Infrastructure Diagnostic Methodology", desc: "The eight-stage consulting process: Prepare → Assess → Analyze → Prioritize → Recommend → Implement → Measure → Optimize. With stage inputs, outputs, and timeframes.", status: "available" },
      { type: "Diagnostic Tool", title: "Executive Scorecard — Structure & Methodology", desc: "The template and scoring methodology for the Revenue Infrastructure Executive Scorecard — overall score, domain scores, maturity level, and risk classification.", status: "available" },
      { type: "Diagnostic Tool", title: "Revenue Infrastructure Heat Map", desc: "Domain-level risk and opportunity visualization. Critical Risk, High Risk, Medium Risk, Low Risk, and Strength classifications across all Nine Domains.", status: "available" },
      { type: "Decision Framework", title: "Prioritization Matrix — Impact vs. Effort", desc: "Business impact versus implementation effort matrix for sequencing Revenue Infrastructure recommendations. Quick Wins, Strategic Priorities, Fill-In Work, and Reconsider quadrants.", status: "available" },
      { type: "Assessment Architecture", title: "Revenue Infrastructure Assessment Family", desc: "Six specialized assessments — AI Visibility, AI-Ready Website, Speed-to-Lead, Authority & Trust, CRM & Revenue Operations — each rolling into the master Revenue Infrastructure Assessment.", status: "available" },
      { type: "Implementation Guide", title: "Improvement Roadmap — Four-Phase Implementation", desc: "Phased implementation guidance: Immediate (30 days), Foundation (90 days), Optimization (6 months), Continuous Improvement. Phase focus, actions, and expected outputs.", status: "available" },
      { type: "Report Architecture", title: "Executive Report Structure", desc: "The ten-section architecture of the GWS Revenue Infrastructure Executive Report — from Executive Summary through Appendix. Section purpose, audience, and typical page count.", status: "available" },
    ],
  },
  {
    id: "research",
    label: "Research",
    eyebrow: "ORIGINAL RESEARCH",
    title: "Revenue Infrastructure Research",
    intro:
      "Data-driven research on AI adoption, buyer behavior, speed-to-lead performance, and Revenue Infrastructure maturity across founder-led service businesses. All research is original GWS work — no fabricated statistics or third-party data presented as proprietary.",
    items: [
      { type: "Research Report", title: "AI Search Adoption in Home Services", desc: "How homeowners are using AI-powered search to find, evaluate, and select home service providers — and what it means for business visibility.", status: "in-development" },
      { type: "Benchmark Data", title: "Speed-to-Lead Benchmark Study", desc: "Response time benchmarks across home service categories and their measured impact on conversion rates and revenue outcomes.", status: "in-development" },
      { type: "Benchmark Study", title: "Revenue Infrastructure Maturity Benchmark", desc: "Infrastructure maturity distribution across founder-led service businesses — where most businesses actually are versus where they believe they are.", status: "in-development" },
      { type: "Research Report", title: "The Cost of Fragmented Infrastructure", desc: "A quantitative analysis of revenue leakage attributable to disconnected systems, slow response, poor AI visibility, and absent measurement.", status: "coming-soon" },
    ],
  },
  {
    id: "industry-guides",
    label: "Industry Guides",
    eyebrow: "INDUSTRY-SPECIFIC GUIDES",
    title: "Revenue Infrastructure by Industry",
    intro:
      "Industry-specific implementation guides that translate the Revenue Infrastructure framework into the operational context of specific service business categories.",
    items: [
      { type: "Industry Guide", title: "Revenue Infrastructure for Home Services", desc: "A complete guide to building Revenue Infrastructure for home service businesses — HVAC, plumbing, electrical, roofing, landscaping, and related trades.", status: "in-development" },
      { type: "Industry Guide", title: "Revenue Infrastructure for Financial Advisors", desc: "How independent financial advisors and RIAs build the infrastructure required to attract, qualify, and retain high-net-worth clients in an AI-influenced research environment.", status: "coming-soon" },
      { type: "Industry Guide", title: "Revenue Infrastructure for Insurance Agencies", desc: "Infrastructure priorities for independent insurance agencies competing in a market where AI-powered comparison and recommendation is reshaping buyer behavior.", status: "coming-soon" },
    ],
  },
  {
    id: "case-studies",
    label: "Case Studies",
    eyebrow: "CLIENT RESULTS",
    title: "Revenue Infrastructure in Practice",
    intro:
      "Documented case studies showing how GWS has diagnosed, designed, and implemented Revenue Infrastructure for specific businesses. Case studies are published only when results are verified and client permission is granted. No fabricated outcomes.",
    items: [
      { type: "Case Study", title: "Home Services: AI Visibility Transformation", desc: "How a regional home service business went from invisible to AI-powered search to consistently recommended by ChatGPT and Gemini within 90 days.", status: "coming-soon" },
      { type: "Case Study", title: "Speed-to-Lead: From 4 Hours to 4 Minutes", desc: "How implementing AI reception and automated lead routing reduced response time and measurably increased close rate for a service business.", status: "coming-soon" },
      { type: "Case Study", title: "CRM & Pipeline: Eliminating Revenue Leakage", desc: "How a structured CRM implementation and automated follow-up system recovered pipeline that was previously falling through manual process gaps.", status: "coming-soon" },
    ],
  },
  {
    id: "executive-briefs",
    label: "Executive Briefs",
    eyebrow: "EXECUTIVE BRIEFS",
    title: "Revenue Infrastructure Executive Briefs",
    intro:
      "Short-form executive documents designed for founders and business leaders who need to understand a Revenue Infrastructure concept quickly and make an informed decision. Each brief is under 1,000 words.",
    items: [
      { type: "Executive Brief", title: "What Is Revenue Infrastructure? (Executive Brief)", desc: "A concise executive introduction to the Revenue Infrastructure category — what it is, why it matters, and how it differs from traditional marketing and technology approaches.", status: "in-development" },
      { type: "Executive Brief", title: "The AI Visibility Imperative", desc: "Why AI-powered search is reshaping buyer behavior and what business owners need to understand about the new visibility landscape.", status: "in-development" },
      { type: "Executive Brief", title: "Why Your CRM Isn't Working", desc: "The infrastructure reasons most CRM implementations fail to deliver their promised revenue impact — and what a properly integrated CRM actually requires.", status: "coming-soon" },
      { type: "Executive Brief", title: "The Speed-to-Lead Problem", desc: "Why response time is the single most controllable variable in lead conversion — and what it takes to achieve consistent sub-5-minute response.", status: "coming-soon" },
    ],
  },
  {
    id: "whitepapers",
    label: "Whitepapers",
    eyebrow: "WHITEPAPERS & LONG-FORM RESEARCH",
    title: "Revenue Infrastructure Whitepapers",
    intro:
      "Long-form research documents that establish the intellectual foundation for the Revenue Infrastructure category. Whitepapers are designed for executives, investors, and strategic advisors who require depth and rigor.",
    items: [
      { type: "Whitepaper", title: "Defining Revenue Infrastructure: A New Business Discipline", desc: "The foundational whitepaper establishing Revenue Infrastructure as a distinct business discipline — its definition, scope, components, and strategic implications for founder-led service businesses.", status: "in-development" },
      { type: "Whitepaper", title: "AI and the Future of Business Visibility", desc: "How the shift from keyword-based search to AI-generated recommendations is restructuring competitive advantage for service businesses — and what it requires of Revenue Infrastructure.", status: "coming-soon" },
      { type: "Whitepaper", title: "The Revenue Infrastructure Maturity Model: Methodology and Evidence", desc: "The research and reasoning behind the five-level Revenue Infrastructure Maturity Model — including assessment methodology, level definitions, and advancement criteria.", status: "coming-soon" },
    ],
  },
  {
    id: "assessments",
    label: "Assessments",
    eyebrow: "ASSESSMENT METHODOLOGIES",
    title: "Revenue Infrastructure Diagnostic Tools",
    intro:
      "Structured assessments that measure specific dimensions of Revenue Infrastructure and identify priority improvement areas. Assessments are designed to produce actionable findings, not generic scores.",
    items: [
      { type: "Free Assessment", title: "AI Visibility Score", desc: "A structured assessment of how visible your business is to AI-powered search systems — including ChatGPT, Gemini, Perplexity, and Google AI Overviews.", status: "available", href: "/diagnostic-platform" },
      { type: "Free Assessment", title: "AI-Ready Website Audit", desc: "A structured evaluation of your website's conversion architecture, technical performance, content authority signals, and AI readiness across 40+ criteria.", status: "available", href: "/ai-ready-website" },
      { type: "Assessment", title: "Revenue Infrastructure Self-Assessment", desc: "A structured self-assessment across all Nine Domains of Revenue Infrastructure. Produces a maturity score, domain-level findings, and a prioritized improvement roadmap.", status: "in-development" },
      { type: "Assessment", title: "Revenue Leakage Diagnostic", desc: "A guided diagnostic that identifies which of the seven Revenue Leakage points are most active in your business and quantifies their estimated impact on revenue.", status: "coming-soon" },
    ],
  },
];

// ─── Status label component ────────────────────────────────────────────────────

function StatusLabel({ status }: { status: Status }) {
  const text = status === "available" ? "AVAILABLE" : status === "in-development" ? "IN DEVELOPMENT" : "COMING SOON";
  const colorClass =
    status === "available"
      ? "bg-[#841617] text-white"
      : status === "in-development"
        ? "bg-[#625E59] text-white"
        : "bg-[#DDD6CC] text-[#625E59]";
  return (
    <span className={`inline-block text-[11px] font-sans font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full ${colorClass}`}>
      {text}
    </span>
  );
}

// ─── Section reveal ───────────────────────────────────────────────────────────

function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 500ms ease-out ${delay}ms, transform 500ms ease-out ${delay}ms`,
      }}
      ref={(el) => {
        if (!el || visible) return;
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                setVisible(true);
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );
        obs.observe(el);
      }}
    >
      {children}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      aria-labelledby="resources-hero-h1"
      className="bg-[#2B2B2B] pt-[120px] md:pt-[144px] pb-[72px] md:pb-[96px] border-b border-[#3A3A3A] relative overflow-hidden"
    >
      {/* Subtle dot texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="max-w-[780px]">
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-5 text-[#841617]">
            GWS KNOWLEDGE PLATFORM
          </p>
          <h1
            id="resources-hero-h1"
            className="font-serif font-normal text-white leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Frameworks, research, and diagnostic tools.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-5 max-w-[640px]">
            GWS publishes its frameworks, research, and diagnostic tools as public resources. Businesses that understand Revenue Infrastructure can make better decisions regardless of whether they work directly with GWS.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Beta Status Callout ──────────────────────────────────────────────────────

function BetaStatus() {
  return (
    <section
      aria-label="Platform status"
      className="bg-[#841617] text-white"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 py-5 md:py-6">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8 gap-3">
          <div className="flex-shrink-0">
            <span className="inline-block text-[10px] font-sans font-extrabold tracking-[0.2em] uppercase bg-white/10 text-white px-3 py-1 rounded-full">
              PLATFORM STATUS — BETA
            </span>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.55] text-white/90">
            The Knowledge Platform is being built. The architecture shown represents the planned content structure across seven categories. Resources marked{" "}
            <strong className="text-white font-semibold">Available</strong> can be opened now. Resources marked{" "}
            <strong className="text-white font-semibold">In Development</strong> or{" "}
            <strong className="text-white font-semibold">Coming Soon</strong> are in progress and will be published as completed. No placeholder content has been fabricated.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Category Navigation (Anchor bar) ────────────────────────────────────────

function CategoryNav() {
  const links = [
    { label: "Frameworks", href: "#frameworks" },
    { label: "Research", href: "#research" },
    { label: "Industry Guides", href: "#industry-guides" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Executive Briefs", href: "#executive-briefs" },
    { label: "Whitepapers", href: "#whitepapers" },
    { label: "Assessments", href: "#assessments" },
  ];
  return (
    <nav
      aria-label="Resource categories"
      className="bg-[#2B2B2B] border-b border-[#3A3A3A] sticky top-0 z-40"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="flex flex-wrap gap-x-1 gap-y-2 md:gap-x-3 md:gap-y-0 py-3 md:py-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] md:text-[14px] font-sans font-medium text-white/70 hover:text-white hover:border-b hover:border-[#841617] focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-[#841617] focus-visible:outline-offset-[2px] px-2 md:px-3 py-1.5 rounded-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Resource Row Component ──────────────────────────────────────────────────

function ResourceRow({ item, delay }: { item: ResourceItem; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <article
        className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 py-5 md:py-6 border-b border-[#DDD6CC] first:border-t first:border-[#DDD6CC]"
      >
        {/* Type */}
        <div className="flex-shrink-0 sm:w-[140px] md:w-[160px]">
          <span className="text-[11px] font-sans font-bold tracking-[0.1em] uppercase text-[#841617]/80">
            {item.type}
          </span>
        </div>

        {/* Title + Description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-normal text-[#2B2B2B] text-[18px] md:text-[20px] leading-[1.25] mb-1.5">
            {item.status === "available" && item.href ? (
              <a href={item.href} className="hover:text-[#841617] hover:underline underline-offset-[3px] focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-[#841617] focus-visible:outline-offset-[2px] transition-colors">
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h3>
          <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#625E59]">{item.desc}</p>
        </div>

        {/* Status + Action */}
        <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 sm:w-[160px] md:w-[180px]">
          <StatusLabel status={item.status} />
          {item.status === "available" && item.href ? (
            <a
              href={item.href}
              className="text-[13px] font-sans font-bold tracking-[0.08em] uppercase text-[#841617] hover:text-[#721315] hover:underline underline-offset-[3px] transition-colors focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-[#841617] focus-visible:outline-offset-[2px]"
            >
              Access →
            </a>
          ) : null}
        </div>
      </article>
    </RevealOnScroll>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────

function ResourceSection({ category }: { category: Category }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-h2`} className="bg-white py-[72px] md:py-[96px] border-b border-[#DDD6CC] scroll-mt-[72px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            {category.eyebrow}
          </p>
          <h2
            id={`${category.id}-h2`}
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[28px] md:text-[40px] md:leading-[1.10] mb-4 max-w-[720px]"
          >
            {category.title}
          </h2>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59] mb-10 md:mb-12 max-w-[680px]">
            {category.intro}
          </p>
        </RevealOnScroll>

        <div>
          {category.items.map((item, i) => (
            <ResourceRow key={item.title} item={item} delay={i * 50 + 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stay Informed ────────────────────────────────────────────────────────────

function StayInformed() {
  return (
    <section
      aria-labelledby="stay-informed-h2"
      className="bg-[#F8F5EC] py-[80px] md:py-[120px] border-b border-[#DDD6CC]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="max-w-[680px]">
          <RevealOnScroll>
            <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
              STAY INFORMED
            </p>
            <h2
              id="stay-informed-h2"
              className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6"
            >
              New frameworks, research, and diagnostic tools are published as they are completed.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#2B2B2B] mb-4 max-w-[560px]">
              Visitors may discuss how Revenue Infrastructure applies to their business and may learn about newly released resources through direct conversation.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href="/revenue-diagnostic"
                className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-[10px] bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
              >
                Book a Revenue Diagnostic
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── Platform Summary ─────────────────────────────────────────────────────────

function PlatformSummary() {
  const counts = [
    { label: "Frameworks", value: "18 published" },
    { label: "Research Reports", value: "1 in development, 1 coming soon" },
    { label: "Industry Guides", value: "1 in development, 2 coming soon" },
    { label: "Case Studies", value: "3 coming soon" },
    { label: "Executive Briefs", value: "2 in development, 2 coming soon" },
    { label: "Whitepapers", value: "1 in development, 2 coming soon" },
    { label: "Assessments", value: "2 available, 2 in progress" },
  ];
  return (
    <section aria-label="Platform summary" className="bg-white border-b border-[#DDD6CC]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <RevealOnScroll>
          <h3 className="font-serif font-normal text-[#2B2B2B] text-[22px] md:text-[28px] leading-[1.2] mb-8 max-w-[600px]">
            What is available now — and what is being built next.
          </h3>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {counts.map((c, i) => (
            <RevealOnScroll key={c.label} delay={i * 60}>
              <div className="border-t-2 border-[#841617]/20 pt-4">
                <p className="text-[14px] font-sans font-bold tracking-[0.08em] uppercase text-[#841617] mb-1">{c.label}</p>
                <p className="text-[15px] md:text-[16px] leading-[1.45] text-[#2B2B2B]">{c.value}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dark Closing Band ───────────────────────────────────────────────────────

function ClosingBand() {
  return (
    <section
      aria-labelledby="closing-h2"
      className="bg-[#2B2B2B] text-white py-[88px] md:py-[144px] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-[#841617]/15 blur-[100px] pointer-events-none"
      />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 relative z-10">
        <RevealOnScroll>
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            UNDERSTAND THE FRAMEWORK
          </p>
          <h2
            id="closing-h2"
            className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Your business has a Revenue Infrastructure problem.
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-4 max-w-[600px]">
            The frameworks and assessments published here describe the category. A Revenue Diagnostic applies them to your specific business.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="/revenue-diagnostic"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-[10px] bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
            >
              Book a Revenue Diagnostic
            </a>
            <a
              href="/framework"
              className="inline-flex items-center gap-2 text-white font-sans font-semibold text-[15px] hover:text-white/80 border-b border-white/40 pb-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
            >
              Understand the Framework
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Resources() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <BetaStatus />
        <CategoryNav />
        {CATEGORIES.map((cat) => (
          <ResourceSection key={cat.id} category={cat} />
        ))}
        <StayInformed />
        <PlatformSummary />
        <ClosingBand />
      </main>
      <SiteFooter />
    </div>
  );
}
