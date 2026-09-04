/**
 * ABOUT — FOUNDER / GROWTHWORKS SYSTEMS
 *
 * Preserves and modernizes the existing live /about page.
 * Aligns to:
 * - GWS About Founder Page Content UX & Implementation Specification
 * - GWS Content Inventory & Disposition Matrix
 * - GWS Typography Hierarchy and Spacing System
 * - GWS Color Application and CTA States
 * - GWS Motion and Animation Guidance
 * - Existing approved founder/source material (live page, Home page portrait)
 *
 * Route: /about
 * Live reference: https://www.growthworks-systems.com/about
 *
 * Content retention priorities:
 * - Long-form Clayton Tidwell biography (enterprise systems, Marine Corps, origin)
 * - Approved founder quotations (from live page)
 * - Four-experience section (Marine Corps, Enterprise Ops, Systems Integration, Transition)
 * - Revenue Infrastructure origin philosophy
 * - Five operating principles
 * - Personal/Beyond the Framework section (University of Oklahoma, continuous improvement)
 * - Discovery call CTA (diagnostic-first framing)
 *
 * NOT a template or placeholder — fully implemented editorial page.
 */

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ─── Layout Constants ───────────────────────────────────────────────────────────

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16";
// Narrower reading width for long-form biography
const BIO_CONTAINER = "max-w-[680px] mx-auto px-5 md:px-10 lg:px-16";
// Portrait zone can exceed reading width
const PORTRAIT_WIDTH = "max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16";

// ─── RevealOnScroll Helper ─────────────────────────────────────────────────────

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
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
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
          { threshold: 0.12 }
        );
        obs.observe(el);
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────────

function SectionLabel({
  num,
  label,
}: {
  num: string;
  label: string;
}) {
  return (
    <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {num ? `${num} ` : ""}
      {label}
    </p>
  );
}

// ─── Portrait Asset ─────────────────────────────────────────────────────────────

const CLAYTON_PORTRAIT = "/assets/images/branding/clayton-tidwell.jpg";

// ─── FOUNDER PORTRAIT + IDENTITY ───────────────────────────────────────────────

function FounderHero() {
  return (
    <section
      aria-labelledby="founder-hero-h1"
      className="bg-[#F8F5EC] pt-[112px] md:pt-[128px] pb-[80px] md:pb-[96px] border-b border-[#D8D5CE] overflow-hidden"
    >
      <div className={PORTRAIT_WIDTH}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Portrait column */}
          <RevealOnScroll>
            <div className="relative">
              <div className="aspect-[3/4] max-w-[420px] lg:max-w-[480px] rounded-none overflow-hidden border border-[#DDD6CC] bg-[#F2E7E3]">
                <img
                  src={CLAYTON_PORTRAIT}
                  alt="Clayton Tidwell — Founder, GrowthWorks Systems"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Credential badge beneath portrait */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="https://www.linkedin.com/in/clayton-tidwell-11a2525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-sans font-semibold text-[#625E59] hover:text-[#841617] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Identity + copy column */}
          <div className="flex flex-col justify-center pt-4 lg:pt-0">
            <RevealOnScroll>
              <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-3 text-[#841617]">
                Meet the Founder
              </p>
              <h1
                id="founder-hero-h1"
                className="font-serif font-normal text-[#2B2B2B] leading-[1.08] tracking-tight text-[40px] md:text-[52px] mb-4"
                style={{ textWrap: "balance" }}
              >
                Clayton Tidwell
              </h1>
              <p className="text-[18px] leading-[1.5] text-[#625E59] font-sans font-medium mb-6">
                Founder, GrowthWorks Systems
              </p>
              <p className="text-[17px] leading-[1.7] text-[#2B2B2B] mb-8 max-w-[560px]">
                After three decades helping organizations transform operations, he concluded most growing businesses were no longer constrained by operations. They were constrained by fragmented revenue systems — and no one had designed the complete solution.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-start gap-3">
                <a
                  href="/revenue-diagnostic"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  Book a Revenue Diagnostic
                </a>
                <a
                  href="#experience"
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-none border border-[#841617] text-[#841617] bg-[#F8F5EC] hover:bg-[#F2E7E3] active:bg-[#E9D8D3] transition-colors font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  Meet Clayton
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 01 WHY GWS EXISTS ────────────────────────────────────────────────────────

function WhyGWSSection() {
  return (
    <section
      id="why-gws"
      aria-labelledby="why-gws-h2"
      className="bg-white py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="01" label="Why GWS Exists" />
          <h2
            id="why-gws-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-8 max-w-[700px]"
          >
            Businesses have been sold disconnected solutions. No one designed the complete system.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-6 max-w-[640px]">
                Firms collected isolated tools — websites, SEO campaigns, unimplemented CRMs, unaccountable advertising, automated-but-wrong workflows, AI features on broken systems — each vendor optimizing only one piece.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-6 max-w-[640px]">
                The outcome: irregular revenue, invisible leakage, and marketing spend lacking explanation. Every new tool was supposed to fix something — but the system underneath kept producing the same results.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#625E59] max-w-[640px]">
                GrowthWorks Systems was founded to design the complete system that makes every marketing investment work better.
              </p>
            </div>

            <div className="bg-[#F8F5EC] border border-[#DDD6CC] rounded-none p-7 md:p-8">
              <p className="text-[16px] leading-[1.7] text-[#2B2B2B] font-serif italic border-l-[3px] border-[#841617] pl-5 mb-6">
                "I didn't create GrowthWorks Systems because businesses needed another marketing agency. I created it because they needed someone to design the system that makes every marketing investment work better."
              </p>
              <p className="text-[13px] font-sans font-semibold tracking-[0.1em] uppercase text-[#841617]">
                — Clayton Tidwell, Founder
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── 02 EXPERIENCE BEHIND THE FRAMEWORK ───────────────────────────────────────

const EXPERIENCE_PILLARS = [
  {
    num: "01",
    title: "U.S. Marine Corps",
    subtitle: "Mission clarity, disciplined execution",
    body: "Clarity before action. Systems thinking over improvisation. Accountability for outcomes rather than effort alone. These operating principles shaped a framework for solving complex, high-stakes problems — and translate directly to solving complex revenue problems.",
  },
  {
    num: "02",
    title: "Enterprise Operations & Technology Transformation",
    subtitle: "Where technology investments fail",
    body: "Decades in business and technology transformation across manufacturing, distribution, ERP, and commodity operations. The consistent lesson: technology investments fail when underlying business systems are broken. The system matters more than the tool.",
  },
  {
    num: "03",
    title: "Systems Integration at Scale",
    subtitle: "Architecture connecting the pieces",
    body: "Large-scale systems integration work across energy, commodity, and financial services. Enterprise environments where operational architectures had to connect tools into a coherent, measurable whole. The same architecture problem, applied to revenue.",
  },
  {
    num: "04",
    title: "Transition to Founder-Led Businesses",
    subtitle: "Enterprise thinking, accessible scale",
    body: "After watching enterprises struggle with disconnected tactics, founder-led businesses deserved the same integrated thinking — applied at a scale and cost structure that makes sense for growing companies. Revenue Infrastructure is enterprise discipline without the enterprise overhead.",
  },
];

function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-h2"
      className="bg-[#F8F5EC] py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="02" label="The Experience Behind the Framework" />
          <h2
            id="experience-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-4 max-w-[700px]"
          >
            Derived from three decades of operational problem solving, not marketing theory.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#625E59] mb-14 max-w-[640px]">
            The Revenue Infrastructure framework wasn't invented in a marketing course. It was forged in environments where systems, processes, data, and people had to work together reliably — or the operation failed.
          </p>
        </RevealOnScroll>

        <div className="space-y-0">
          {EXPERIENCE_PILLARS.map((pillar, idx) => (
            <RevealOnScroll key={pillar.num} delay={idx * 60}>
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-12 py-10 border-b border-[#DDD6CC] last:border-b-0">
                {/* Label column */}
                <div className="flex flex-col">
                  <span className="text-[13px] font-sans font-bold tracking-[0.18em] uppercase text-[#841617] mb-2">
                    {pillar.num}
                  </span>
                  <h3 className="font-serif font-normal text-[#2B2B2B] leading-[1.2] text-[22px] md:text-[24px] mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] font-sans font-medium text-[#625E59] leading-[1.5]">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Body column */}
                <div className="flex-1">
                  <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#2B2B2B]">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 03 WHY REVENUE INFRASTRUCTURE ────────────────────────────────────────────

function WhyRevenueInfrastructureSection() {
  return (
    <section
      aria-labelledby="why-ri-h2"
      className="bg-white py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="03" label="Why Revenue Infrastructure" />
          <h2
            id="why-ri-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-8 max-w-[700px]"
          >
            An operating system, not another marketing methodology.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-6">
                Marketing tactics change. SEO, paid ads, social platforms, AI tools — the tactics shift year to year. What doesn't change is the need for durable architecture underneath.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-6">
                Revenue Infrastructure defines how a firm attracts, converts, retains, and grows customers permanently — as an integrated system. Built correctly once, every future marketing, technology, and AI investment compounds.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#625E59]">
                Enterprise systems thinking, applied to revenue for founder-led businesses at accessible scale.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#841617]/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[13px] font-sans font-bold text-[#841617]">1</span>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[16px] text-[#2B2B2B] mb-1">Systems</h4>
                  <p className="text-[15px] leading-[1.6] text-[#625E59]">
                    The connected architecture behind your revenue path.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#841617]/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[13px] font-sans font-bold text-[#841617]">2</span>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[16px] text-[#2B2B2B] mb-1">Digital Assets</h4>
                  <p className="text-[15px] leading-[1.6] text-[#625E59]">
                    Website, content, discoverability, authority signals.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#841617]/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[13px] font-sans font-bold text-[#841617]">3</span>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[16px] text-[#2B2B2B] mb-1">Processes</h4>
                  <p className="text-[15px] leading-[1.6] text-[#625E59]">
                    How inquiry, qualification, follow-up, and conversion work.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#841617]/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[13px] font-sans font-bold text-[#841617]">4</span>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[16px] text-[#2B2B2B] mb-1">Authority & AI</h4>
                  <p className="text-[15px] leading-[1.6] text-[#625E59]">
                    Trust signals and AI-discoverable business presence.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#841617]/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[13px] font-sans font-bold text-[#841617]">5</span>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[16px] text-[#2B2B2B] mb-1">Measurement</h4>
                  <p className="text-[15px] leading-[1.6] text-[#625E59]">
                    Connecting activity to business outcomes.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#DDD6CC]">
                <a
                  href="/framework"
                  className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  Explore the Revenue Infrastructure Framework
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── 04 WHY AI CHANGED EVERYTHING ─────────────────────────────────────────────

function WhyAISection() {
  return (
    <section
      aria-labelledby="why-ai-h2"
      className="bg-[#F8F5EC] py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="04" label="Why AI Changed Everything" />
          <h2
            id="why-ai-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-8 max-w-[700px]"
          >
            AI made Revenue Infrastructure more important — not less.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-6">
                AI-powered search synthesizes structured data, authority signals, review patterns, content architecture, and entity relationships. It doesn't browse websites the way a human would.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-6">
                Businesses with structured Revenue Infrastructure get recommended by AI systems. Disconnected businesses become invisible to AI-assisted buyers — not because the quality is lower, but because the infrastructure is missing.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#625E59]">
                AI didn't create a new marketing problem. It exposed the Revenue Infrastructure problem that was already there.
              </p>
            </div>

            <div className="bg-white border border-[#DDD6CC] rounded-none p-7 md:p-8">
              <p className="text-[16px] leading-[1.7] text-[#2B2B2B] font-serif italic border-l-[3px] border-[#841617] pl-5 mb-6">
                "AI didn't create a new marketing problem. It exposed the Revenue Infrastructure problem that was already there."
              </p>
              <p className="text-[13px] font-sans font-semibold tracking-[0.1em] uppercase text-[#841617]">
                — Clayton Tidwell, Founder
              </p>

              <div className="mt-8 pt-6 border-t border-[#DDD6CC]">
                <a
                  href="/ai-visibility"
                  className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  Learn about AI Visibility
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── 05 WHAT CLIENTS CAN EXPECT ────────────────────────────────────────────────

const OPERATING_PRINCIPLES = [
  {
    num: "01",
    title: "Diagnose before prescribing",
    desc: "Structured assessment first. No recommendations before diagnosis. Understanding what is actually happening matters more than immediately offering a solution.",
  },
  {
    num: "02",
    title: "Solve systems, not symptoms",
    desc: "Compound infrastructure versus isolated campaigns that require constant reinvestment. The goal is a system that produces consistent results.",
  },
  {
    num: "03",
    title: "Measure business outcomes",
    desc: "Revenue performance is the objective, not activity metrics. If it doesn't connect to the business outcome, it isn't the priority.",
  },
  {
    num: "04",
    title: "Build capabilities clients own",
    desc: "Avoid dependency. The infrastructure belongs to the client. The goal is capability, not reliance.",
  },
  {
    num: "05",
    title: "Sustainable revenue performance",
    desc: "Ongoing operating system with measurement, optimization, and adaptation. Revenue infrastructure is not a project — it's a discipline.",
  },
];

function PrinciplesSection() {
  return (
    <section
      aria-labelledby="principles-h2"
      className="bg-white py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="05" label="What Clients Can Expect" />
          <h2
            id="principles-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-4 max-w-[700px]"
          >
            Five operating principles govern every engagement.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#625E59] mb-14 max-w-[640px]">
            Not aspirational values. Operational commitments that shape how every engagement runs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,1fr)] gap-5">
            {OPERATING_PRINCIPLES.map((principle, idx) => (
              <RevealOnScroll key={principle.num} delay={idx * 50}>
                <div className="bg-[#F8F5EC] border border-[#DDD6CC] rounded-none p-6 md:p-7 h-full">
                  <span className="text-[13px] font-sans font-bold tracking-[0.18em] uppercase text-[#841617] block mb-3">
                    {principle.num}
                  </span>
                  <h3 className="font-serif font-normal text-[#2B2B2B] leading-[1.25] text-[20px] md:text-[21px] mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[#625E59]">
                    {principle.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── BEYOND THE FRAMEWORK (Personal) ─────────────────────────────────────────

function BeyondFrameworkSection() {
  return (
    <section
      aria-labelledby="beyond-h2"
      className="bg-[#F8F5EC] py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Left: heading + copy */}
            <div>
              <SectionLabel num="" label="Beyond the Framework" />
              <h2
                id="beyond-h2"
                className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[520px]"
              >
                The human context behind the methodology.
              </h2>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B] mb-5">
                Revenue Infrastructure didn't come from studying AI or marketing theory. It came from operational problem solving — and the observation that the same systems failures kept appearing across very different industries.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#625E59] mb-6">
                The best business systems, like the best organizations, are never finished. They evolve through observation, measurement, disciplined execution, and continuous improvement.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#2B2B2B]">
                That philosophy shapes everything at GrowthWorks Systems — including how the firm itself operates.
              </p>
            </div>

            {/* Right: personal details in editorial card */}
            <div className="bg-white border border-[#DDD6CC] rounded-none p-8 md:p-10">
              <h3 className="font-serif font-normal text-[#2B2B2B] leading-[1.2] text-[22px] md:text-[24px] mb-6">
                Personal background
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-[14px] font-sans font-semibold tracking-[0.1em] uppercase text-[#841617] mb-2">
                    Education
                  </p>
                  <p className="text-[16px] leading-[1.6] text-[#2B2B2B]">
                    University of Oklahoma alumnus
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-sans font-semibold tracking-[0.1em] uppercase text-[#841617] mb-2">
                    Background
                  </p>
                  <p className="text-[16px] leading-[1.6] text-[#2B2B2B]">
                    U.S. Marine Corps Corporal and Military Police officer. Desert Shield / Desert Storm veteran. The discipline, clarity, and systems orientation that shaped his operating approach.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-sans font-semibold tracking-[0.1em] uppercase text-[#841617] mb-2">
                    Interests
                  </p>
                  <p className="text-[16px] leading-[1.6] text-[#2B2B2B]">
                    Tracking AI evolution, business strategy, and the continuous refinement of the Revenue Infrastructure methodology. Oklahoma Sooners football season-ticket holder.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-sans font-semibold tracking-[0.1em] uppercase text-[#841617] mb-2">
                    Operating belief
                  </p>
                  <p className="text-[16px] leading-[1.65] text-[#625E59] italic">
                    "The best systems are never finished — they evolve through observation, measurement, and disciplined execution."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── DIAGNOSTIC PROCESS ───────────────────────────────────────────────────────

const DIAGNOSTIC_STEPS = [
  {
    num: "01",
    title: "Structured diagnostic conversation",
    desc: "Not a sales presentation. A real assessment of how your revenue system currently works — and where it is breaking down.",
  },
  {
    num: "02",
    title: "Revenue Infrastructure assessment",
    desc: "Review of your current discovery, response, sales, and measurement capabilities across the connected revenue path.",
  },
  {
    num: "03",
    title: "Highest-impact opportunity identification",
    desc: "Where is opportunity being lost? What deserves attention first? The diagnosis shapes the roadmap.",
  },
  {
    num: "04",
    title: "Actionable recommendation",
    desc: "Specific, prioritized next steps — with no obligation. You decide what to act on.",
  },
];

function DiagnosticSection() {
  return (
    <section
      aria-labelledby="diagnostic-h2"
      className="bg-white py-[80px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="" label="What Happens on the Diagnostic" />
          <h2
            id="diagnostic-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-4 max-w-[640px]"
          >
            No pitch. No obligation. A real read on where your revenue system is working — and where it isn't.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#625E59] mb-12 max-w-[600px]">
            The Revenue Diagnostic examines the connected path from discovery through conversion, sales progression, and measurement to identify where opportunity is being lost.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIAGNOSTIC_STEPS.map((step, idx) => (
              <RevealOnScroll key={step.num} delay={idx * 50}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#841617] text-[#841617] font-sans font-bold text-[14px]">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-[17px] text-[#2B2B2B] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-[1.65] text-[#625E59]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── CLOSING CTA ───────────────────────────────────────────────────────────────

function ClosingCTASection() {
  return (
    <section
      aria-labelledby="about-closing-cta"
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

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <RevealOnScroll>
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            Start with understanding
          </p>
          <h2
            id="about-closing-cta"
            className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[640px] mx-auto"
          >
            Before deciding what to build, identify what is actually limiting growth.
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-10 max-w-[560px] mx-auto">
            The Revenue Diagnostic examines the connected path from discovery through conversion, sales progression, and measurement — to identify where opportunity is being lost and what deserves attention first.
          </p>
          <a
            href="/revenue-diagnostic"
            className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
          >
            Book a Revenue Diagnostic
          </a>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14px] font-sans text-white/40">
            <a
              href="/framework"
              className="hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white"
            >
              Explore the Framework
            </a>
            <a
              href="mailto:clayton@growthworks-systems.com"
              className="hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white"
            >
              clayton@growthworks-systems.com
            </a>
            <a
              href="tel:+12143027720"
              className="hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white"
            >
              214-302-7720
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ───────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <FounderHero />
        <WhyGWSSection />
        <ExperienceSection />
        <WhyRevenueInfrastructureSection />
        <WhyAISection />
        <PrinciplesSection />
        <BeyondFrameworkSection />
        <DiagnosticSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
