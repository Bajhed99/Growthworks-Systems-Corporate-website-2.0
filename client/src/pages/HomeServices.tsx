import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * HOME SERVICES INDUSTRY PAGE
 *
 * Preserves and modernizes the existing live Home Services page structure
 * while aligning to:
 * - Current GWS Industry Pages specification
 * - Revenue Infrastructure governance
 * - Solutions taxonomy (DIGITAL PRESENCE, LEAD RESPONSE, SALES OPERATIONS, REVENUE INTELLIGENCE)
 * - AI Visibility ownership boundaries
 * - Revenue Diagnostic CTA standard
 * - GWS typography and spacing systems
 * - Responsive and accessibility requirements
 *
 * Route: /home-services (per Industries Hub routing)
 * Live reference: https://www.growthworks-systems.com/industries/home-services
 *
 * Core theme: LOCAL DISCOVERY → HIGH-INTENT INQUIRY → HANDOFF-DRIVEN REVENUE
 * Emphasis: Opportunity lost between handoffs and system disconnections.
 */

// ─── Shared Constants ─────────────────────────────────────────────────────

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16";

// ─── RevealOnScroll Helper ────────────────────────────────────────────────

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

// ─── Section Label Helper ─────────────────────────────────────────────────

function SectionLabel({
  num,
  label,
}: {
  num: string;
  label: string;
}) {
  return (
    <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {num}&ensp;{label}
    </p>
  );
}

// ─── Section 01: Hero ─────────────────────────────────────────────────────

function HomeServicesHero() {
  return (
    <section
      aria-labelledby="home-services-h1"
      className="bg-[#F8F5EC] pt-[112px] md:pt-[144px] pb-[72px] md:pb-[88px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="max-w-[680px]">
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            Home Services
          </p>
          <h1
            id="home-services-h1"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Turn local demand into a more reliable revenue system.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#2B2B2B] mb-6 max-w-[620px]">
            Home-service businesses often operate in a high-intent environment. When a homeowner needs help, the business that is easiest to find, fastest to respond, simplest to schedule, and most consistent in follow-up can have an advantage.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59] mb-10 max-w-[600px]">
            The problem is that these activities often sit in separate systems. Marketing creates demand. Calls and forms capture it. Dispatch or scheduling takes over. Sales follows up. CRM records may or may not stay current. Reporting often focuses on channels rather than the complete customer path.
          </p>
          <a
            href="/revenue-diagnostic"
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
          >
            Book a Revenue Diagnostic
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02: Operating Reality ───────────────────────────────────────

function OperatingRealitySection() {
  return (
    <section
      aria-labelledby="operating-reality-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="01" label="Operating Reality" />
          <h2
            id="operating-reality-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            The core challenge: opportunity leaks between handoffs.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#2B2B2B] mb-5 max-w-[680px]">
            Home service revenue flows through multiple stages and systems. Each transition—from discovery to inquiry, inquiry to response, response to scheduling, scheduling to estimate, estimate to service, service to follow-up—creates a point where information can fragment, context can be lost, and the homeowner's intent can leak away to a faster, more organized competitor.
          </p>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-10 max-w-[680px]">
            The businesses that win are those where these handoffs are intentional, visible, and measured—not accidental.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 03: Five-Gap Problem Model ──────────────────────────────────

function ProblemModelSection() {
  const problems = [
    {
      num: "01",
      title: "AI Invisibility",
      description: "Businesses lack the structure to appear reliably in AI-powered search results (ChatGPT, Google AI, Perplexity). Without AI-ready presence, opportunities discovered through conversational AI go elsewhere.",
    },
    {
      num: "02",
      title: "Speed-to-Lead Failure",
      description: "Response times measured in hours rather than minutes can mean lost opportunities. When a homeowner needs help and you don't respond first, a faster competitor may have already won their consideration.",
    },
    {
      num: "03",
      title: "Reputation Gaps",
      description: "Systematic review generation and reputation management strengthen trust and discoverability. Absence of this creates a visibility and trust deficit compared to organized competitors.",
    },
    {
      num: "04",
      title: "After-Hours Opportunity Loss",
      description: "Inquiries outside business hours go unanswered without automated reception systems. These moments represent lost revenue and competitive disadvantage against businesses with AI-assisted after-hours response.",
    },
    {
      num: "05",
      title: "Weak Local Authority",
      description: "Incomplete Google Business Profiles, inconsistent local SEO, and fragmented service-area clarity weaken discoverability. Strong local authority signals make you easier to find and more credible.",
    },
  ];

  return (
    <section
      aria-labelledby="problem-model-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="02" label="Five Structural Gaps" />
          <h2
            id="problem-model-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Where home service revenue typically leaks.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            These are structural gaps, not individual channel problems. They compound across discovery, inquiry, response, and conversion.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {problems.map((problem, i) => (
            <RevealOnScroll key={problem.num} delay={i * 60}>
              <article className="flex flex-col h-full border border-[#DDD6CC] rounded-[16px] bg-white p-7 md:p-8">
                <div className="mb-4">
                  <span className="text-[12px] font-sans font-bold tracking-[0.16em] text-[#841617] uppercase">
                    {problem.num}
                  </span>
                </div>
                <h3 className="font-serif font-normal text-[#2B2B2B] leading-[1.25] text-[24px] md:text-[28px] mb-3">
                  {problem.title}
                </h3>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59]">
                  {problem.description}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 04: Revenue Journey ─────────────────────────────────────────

function RevenueJourneySection() {
  const journey = [
    { stage: "1", label: "Local Discovery", detail: "Homeowner finds you through search, map, referral, or ad" },
    { stage: "2", label: "Inquiry", detail: "Phone call, form, message, or chat initiated" },
    { stage: "3", label: "Response", detail: "Business acknowledges and routes inquiry to owner or team" },
    { stage: "4", label: "Scheduling", detail: "Calendar or dispatch confirms appointment or site visit" },
    { stage: "5", label: "Estimate / Service", detail: "In-home or virtual evaluation and quote presented" },
    { stage: "6", label: "Follow-Up", detail: "Consistent outreach on decision or next steps" },
    { stage: "7", label: "Booked Revenue", detail: "Service completed, outcome recorded" },
    { stage: "8", label: "Measurement", detail: "Source, timing, and outcome visibility for learning" },
  ];

  return (
    <section
      aria-labelledby="journey-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="03" label="The Complete Journey" />
          <h2
            id="journey-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            How demand becomes booked, measurable revenue.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            Each stage has different systems, ownership, and visibility. Connected Revenue Infrastructure means each handoff preserves context and intent.
          </p>
        </RevealOnScroll>

        <div className="space-y-3">
          {journey.map((item, idx) => (
            <RevealOnScroll key={item.stage} delay={idx * 40}>
              <div className="flex items-start gap-4 p-6 border border-[#DDD6CC] rounded-[12px] bg-[#F8F5EC] hover:shadow-[0_4px_12px_rgba(43,43,43,0.06)] transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-none border border-[#841617] bg-white flex items-center justify-center">
                  <span className="text-[14px] font-sans font-bold text-[#841617]">{item.stage}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-normal text-[#2B2B2B] text-[18px] md:text-[20px] leading-[1.2] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-[16px] leading-[1.6] text-[#625E59]">{item.detail}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 p-8 border border-[#841617] rounded-[14px] bg-[#F8F5EC]">
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#2B2B2B]">
            <strong>The key insight:</strong> Opportunity leaks occur at transitions—when the inquiry moves from marketing to sales, when the response moves from inbound to dispatch, when the follow-up moves from one person to another. Connected Revenue Infrastructure keeps that context alive.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section 05: How GWS Applies ─────────────────────────────────────────

function GWSApplianceSection() {
  const modules = [
    {
      title: "Digital Presence",
      description:
        "Website experience, local discoverability, Google Business Profile optimization, service-area clarity, trust signals, and conversion pathways that make you easy to find and evaluate.",
    },
    {
      title: "Lead Response",
      description:
        "Lead capture across channels, speed-to-lead automation, after-hours acknowledgment, routing to the right team member, scheduling integration, and AI-assisted reception that never misses an inquiry.",
    },
    {
      title: "Sales Operations",
      description:
        "CRM structure, estimate and opportunity tracking, clear ownership and pipeline stages, follow-up workflows, and handoff consistency that keeps every opportunity visible and progressing.",
    },
    {
      title: "Revenue Intelligence",
      description:
        "Source-to-outcome visibility, response-time analysis, pipeline performance measurement, leakage identification, and continuous improvement data that shows where revenue is coming from and where it's being lost.",
    },
  ];

  return (
    <section
      aria-labelledby="gws-applies-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="04" label="GWS Revenue Infrastructure" />
          <h2
            id="gws-applies-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Connect those pieces around one objective: reduce the opportunity lost between local discovery and booked, completed, measurable revenue.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-12 max-w-[680px]">
            GWS Revenue Infrastructure organizes into four connected modules. In home services, each one directly addresses the gaps above.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, i) => (
            <RevealOnScroll key={module.title} delay={i * 80}>
              <div className="flex flex-col h-full border border-[#DDD6CC] rounded-[16px] bg-white p-8">
                <span className="text-[12px] font-sans font-bold tracking-[0.16em] text-[#841617] uppercase mb-3">
                  Module {i + 1}
                </span>
                <h3 className="font-serif font-normal text-[#2B2B2B] leading-[1.25] text-[24px] md:text-[28px] mb-4">
                  {module.title}
                </h3>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59]">
                  {module.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 06: Connected State ─────────────────────────────────────────

function ConnectedStateSection() {
  return (
    <section
      aria-labelledby="connected-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="05" label="What Connected Looks Like" />
          <h2
            id="connected-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            For a home service business, Revenue Infrastructure means one coherent operating system.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 space-y-4 max-w-[720px]">
          <RevealOnScroll delay={0}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">1</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Homeowner discovers</strong> your service through local search, map listing, or referral.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">2</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Inquiry is captured</strong> consistently across phone, form, chat, or message—and immediately acknowledged, even outside business hours.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">3</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Routing and scheduling</strong> happen with full context. The right team member gets the right information immediately.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={240}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">4</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Estimate or service</strong> context is carried forward. Nothing is re-explained or lost.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={320}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">5</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Follow-up</strong> is triggered automatically and consistently based on pipeline stage and opportunity priority.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">6</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Revenue outcome</strong> is recorded—where it came from, how long it took, what the revenue amount was.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={480}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#841617] flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-sans font-bold">7</span>
              </div>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B]">
                <strong>Learning informs</strong> future visibility, response strategy, and operational adjustments.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-12 p-8 border border-[#841617] rounded-[14px] bg-[#F8F5EC]">
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#2B2B2B]">
            This isn't about individual tools or quick wins. It's about seeing where your revenue system is disconnected—and whether fixing those disconnections gives you a structural advantage.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section 07: Competitive Context ──────────────────────────────────────

function CompetitiveContextSection() {
  return (
    <section
      aria-labelledby="competitive-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="06" label="Competitive Reality" />
          <h2
            id="competitive-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            As buyer discovery and response expectations evolve, businesses with clearer systems can be easier to discover, faster to respond, and easier to measure.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-8 max-w-[680px]">
            Home service buyers increasingly expect:
          </p>
        </RevealOnScroll>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-[820px]">
          {[
            "Immediate discovery through AI and local search",
            "Response within minutes, not hours",
            "Clear scheduling and communication",
            "Consistent follow-up and transparency",
            "Visibility into project status and timeline",
            "Reputation and reviews that reflect quality",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-[#2B2B2B]"
            >
              <span
                aria-hidden="true"
                className="mt-[10px] w-[6px] h-[6px] shrink-0 rounded-full bg-[#841617]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-[18px] leading-[1.65] text-[#625E59] max-w-[680px]">
          Businesses that systematically meet these expectations capture more of the demand already being generated. Those that don't will continue to leak opportunity to competitors who have built more reliable systems.
        </p>
      </div>
    </section>
  );
}

// ─── Section 08: Outcomes ────────────────────────────────────────────────

function OutcomesSection() {
  const outcomes = [
    "Capture more of the demand already being generated locally.",
    "Reduce response and follow-up gaps that lose opportunities.",
    "Give teams a clearer operating path from inquiry to booked work.",
    "See where local demand becomes revenue—and where it does not.",
  ];

  return (
    <section
      aria-labelledby="outcomes-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="07" label="Outcomes" />
          <h2
            id="outcomes-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            What connected Revenue Infrastructure enables.
          </h2>
        </RevealOnScroll>

        <ul className="space-y-4 max-w-[720px] mt-8">
          {outcomes.map((outcome, idx) => (
            <RevealOnScroll key={outcome} delay={idx * 60}>
              <li className="flex items-start gap-4 p-6 border border-[#DDD6CC] rounded-[12px] bg-[#F8F5EC]">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-[#841617] flex items-center justify-center text-white text-[12px] font-sans font-bold"
                >
                  {idx + 1}
                </span>
                <span className="text-[17px] leading-[1.65] text-[#2B2B2B]">{outcome}</span>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Section 09: AI Visibility Context ────────────────────────────────────

function AIVisibilityContextSection() {
  return (
    <section
      aria-labelledby="ai-context-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel num="08" label="AI Discoverability" />
          <h2
            id="ai-context-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            AI-powered search is reshaping how homeowners discover service providers.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#2B2B2B] mb-6 max-w-[680px]">
            Conversational AI (ChatGPT, Google AI, Perplexia) now plays a role in discovery. Homeowners ask questions in natural language, and these systems return recommendations based on availability, reviews, and service clarity.
          </p>
          <p className="text-[18px] leading-[1.65] text-[#625E59] mb-8 max-w-[680px]">
            To be recommended consistently in AI discovery, you need an AI-ready digital presence: clear service descriptions, reliable business data, transparent reviews, and structured local authority signals. This is the foundation of what we call AI Visibility.
          </p>
          <a
            href="/ai-visibility"
            className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
          >
            Learn about AI Visibility
            <span aria-hidden="true">→</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 10: Closing CTA ──────────────────────────────────────────────

function ClosingCTASection() {
  return (
    <section
      aria-labelledby="closing-cta-h2"
      className="bg-[#2B2B2B] text-white py-[88px] md:py-[144px] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-[#841617]/15 blur-[100px] pointer-events-none"
      />

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
          Start with the system
        </p>
        <h2
          id="closing-cta-h2"
          className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px] mx-auto"
        >
          See where your revenue system is helping — or limiting — growth.
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-10 max-w-[600px] mx-auto">
          A Revenue Diagnostic maps the system behind your revenue. No replacement funnels. No quick wins. Just a clear read on what to fix first.
        </p>
        <a
          href="/revenue-diagnostic"
          className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
        >
          Book a Revenue Diagnostic
        </a>
        <p className="text-white/40 text-[14px] mt-12 tracking-wide">
          One system. Real alignment. Predictable revenue.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────

export default function HomeServices() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main className="gws-page">
        <HomeServicesHero />
        <OperatingRealitySection />
        <ProblemModelSection />
        <RevenueJourneySection />
        <GWSApplianceSection />
        <ConnectedStateSection />
        <CompetitiveContextSection />
        <OutcomesSection />
        <AIVisibilityContextSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
