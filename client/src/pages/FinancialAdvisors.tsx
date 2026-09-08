import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * FINANCIAL ADVISORS & RIAs INDUSTRY PAGE
 *
 * Preserves and modernizes the existing live Financial Advisors & RIAs page.
 * Aligns to:
 * - GWS Industry Pages specification
 * - Revenue Infrastructure governance (canonical four-module taxonomy)
 * - AI Visibility ownership (route to /ai-visibility, no deep framework reproduction)
 * - Revenue Diagnostic CTA standard
 * - Advisory-specific trust-led, research-led, consideration-heavy editorial tone
 * - GWS typography and spacing systems
 * - Responsive and accessibility requirements
 * - Claim audit (unsupported assertions corrected)
 *
 * Route: /industries/financial-advisors (per Industries Hub routing)
 * Live reference: https://www.growthworks-systems.com/industries/financial-advisors
 *
 * Core theme: TRUST → RESEARCH → INQUIRY → QUALIFICATION → ADVISOR MEETING → FOLLOW-UP
 * Emphasis: Longer consideration cycle, trust accumulation, context continuity.
 * NOT fast operational rhythm — distinct from Home Services page.
 */

// ─── Shared Constants ────────────────────────────────────────────────────────

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";
const BODY_CONTAINER = "max-w-[720px] mx-auto px-5 md:px-0";

// ─── RevealOnScroll Helper ─────────────────────────────────────────────────

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
  const hasTriggered = React.useRef(false);

  React.useEffect(() => {
    if (hasTriggered.current) return;
    if (!className) return;
    const el = document.querySelector(`.${className}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
      setVisible(true);
      hasTriggered.current = true;
    }
  }, [className]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
      ref={(el) => {
        if (!el || visible || hasTriggered.current) return;
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                setVisible(true);
                hasTriggered.current = true;
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

function SectionLabel({ label }: { label: string }) {
  return (
    <h3 className="text-[18px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {label}
    </h3>
  );
}

// ─── FAQ Accordion Helper ─────────────────────────────────────────────────

function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `faq-${question.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left bg-surface hover:bg-[#F0EAE0] transition-colors min-h-[48px] rounded-2xl"
      >
        <span className="font-serif font-normal text-gray-900 text-[18px] md:text-[20px] leading-[1.3]">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`flex-shrink-0 w-7 h-7 rounded-full border border-[#841617] bg-white flex items-center justify-center mt-[2px] transition-transform ${open ? "rotate-45" : "rotate-0"}`}
        >
          <span className="text-[16px] font-sans font-bold text-[#841617] leading-none mb-px">+</span>
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={`${open ? "block" : "hidden"} bg-white`}
      >
        <div className="p-6 pt-5 text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
          {answer}
        </div>
      </div>
    </div>
  );
}

// ─── Section 01: Hero ─────────────────────────────────────────────────────

function FinancialAdvisorsHero() {
  return (
    <section
      aria-labelledby="financial-advisors-h1"
      className="bg-surface pt-[112px] md:pt-[144px] pb-[112px] md:pb-[88px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <div className="max-w-[680px]">
          <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">
            Financial Advisors &amp; RIAs
          </h3>
          <h1
            id="financial-advisors-h1"
            className="font-serif font-normal text-gray-900 leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Build a clearer path from trust and discovery to qualified conversations.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-900 mb-6 max-w-[620px]">
            Financial advisory businesses operate in a consideration-heavy environment. Prospects may spend significant time researching firms, advisors, specialties, credentials, philosophies, and expertise before making contact.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 mb-10 max-w-[600px]">
            Visibility alone does not create a client. Once inquiry occurs, response, qualification, scheduling, follow-up, advisor ownership, CRM continuity, and pipeline visibility must work together. GWS connects those parts so qualified interest has a clearer path forward.
          </p>
          <a
            href="/revenue-diagnostic"
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded bg-crimson hover:bg-crimson-dark transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gray-900 focus-visible:outline-offset-[3px]"
          >
            Book a Revenue Diagnostic
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02: Advisory Firm Reality ─────────────────────────────────────

function AdvisoryFirmRealitySection() {
  return (
    <section
      aria-labelledby="advisory-reality-h2"
      className="bg-white py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="The Advisory Firm Reality" />
          <h2
            id="advisory-reality-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Most advisory firms grew on referrals. That foundation is still essential.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-5 max-w-[680px]">
            The referral relationship is genuine, trust-based, and worth protecting. But the environment in which it operates has expanded in ways that create new gaps—and new opportunities that most firms have not built for.
          </p>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-10 max-w-[680px]">
            AI-assisted discovery is becoming another environment where prospects evaluate and shorten their consideration lists. Firms that appear in those contexts with clear authority signals and structured trust indicators can enter more prospects' consideration sets. Those that do not may be invisible to a growing discovery channel.
          </p>
          <blockquote className="border-l-4 border-[#841617] pl-6 py-1 mb-10 max-w-[640px]">
            <p className="text-[20px] md:text-[22px] leading-[1.5] font-serif font-normal text-gray-900 italic">
              Technology is the implementation. Revenue performance is the objective.
            </p>
          </blockquote>
          <p className="text-[16px] leading-[1.65] text-gray-500 max-w-[680px]">
            The problem most firms face is not that they lack marketing. It is that the infrastructure behind referrals, discovery, inquiry, qualification, and follow-up is disconnected from one another. Each gap leaks qualified interest that the firm has already earned.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 03: Where Advisory Revenue Leaks ─────────────────────────────

function AdvisoryLeakageSection() {
  const leakages = [
    {
      num: "01",
      title: "Inconsistent referral flow",
      description:
        "Referrals arrive unpredictably. Without a systematic process to generate, track, and amplify them, growth depends on the strength of individual relationships rather than built infrastructure.",
    },
    {
      num: "02",
      title: "Low website conversion",
      description:
        "Prospective clients visit the site, read a list of services, and leave. The site describes what the firm does but fails to establish the trust required to book a consultation with an unfamiliar advisor.",
    },
    {
      num: "03",
      title: "Slow lead response",
      description:
        "A Friday-afternoon inquiry may get a Monday-morning reply. Faster-responding firms can reduce the risk of losing high-intent inquiries during the consideration window.",
    },
    {
      num: "04",
      title: "Weak AI discoverability",
      description:
        "When prospects use AI tools to research and evaluate advisors, firms without structured authority signals, clear entity information, and authoritative content may not surface in those results.",
    },
    {
      num: "05",
      title: "Fragmented CRM and follow-up",
      description:
        "Prospect data lives in spreadsheets, email threads, and a CRM not configured for advisory workflows. Follow-up is inconsistent; opportunities are lost between handoffs and over time.",
    },
    {
      num: "06",
      title: "Difficulty differentiating",
      description:
        "Without structured authority and content strategy, firms can appear identical to prospects researching multiple advisors. Price and referral familiarity decide choices that might have gone differently with clearer signals.",
    },
  ];

  return (
    <section
      aria-labelledby="leakage-h2"
      className="bg-surface py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Where Advisory Revenue Leaks" />
          <h2
            id="leakage-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Advisory firms face a Revenue Infrastructure problem — not a marketing problem.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            These are structural gaps. They compound across the research and consideration cycle, and they affect the firm's ability to convert the qualified interest it has already attracted.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {leakages.map((item, i) => (
            <RevealOnScroll key={item.num} delay={i * 60}>
              <article className="flex flex-col h-full border border-gray-200 rounded-2xl bg-white p-7 md:p-8">
                <div className="mb-4">
                  <span className="text-[12px] font-sans font-bold tracking-[0.16em] text-[#841617] uppercase">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[21px] md:text-[24px] mb-3">
                  {item.title}
                </h3>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
                  {item.description}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 04: Advisory Revenue Journey ─────────────────────────────────

function AdvisoryRevenueJourneySection() {
  const journey = [
    { stage: "1", label: "Discovery / Research", detail: "Prospect researches advisors, credentials, specialties, and firm reputation" },
    { stage: "2", label: "Trust Evaluation", detail: "Prospect evaluates authority, clarity, and trust signals across available information" },
    { stage: "3", label: "Inquiry", detail: "Prospect submits an inquiry — form, call, message, or scheduling request" },
    { stage: "4", label: "Qualification", detail: "Firm acknowledges, qualifies fit, and routes to the appropriate advisor" },
    { stage: "5", label: "Advisor Meeting", detail: "Initial consultation with context carried forward from discovery" },
    { stage: "6", label: "Follow-Up", detail: "Consistent, trust-building follow-up aligned to the prospect's readiness" },
    { stage: "7", label: "Client Decision", detail: "Prospect chooses and engagement begins with clear onboarding" },
    { stage: "8", label: "Measurement", detail: "Source, timing, and outcome visibility for continuous improvement" },
  ];

  return (
    <section
      aria-labelledby="advisory-journey-h2"
      className="bg-white py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="The Advisory Consideration Journey" />
          <h2
            id="advisory-journey-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            A longer cycle. Trust accumulates at every stage.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            Unlike transactional businesses, advisory relationships are built over time. Each stage of the consideration journey is an opportunity to build trust—or to lose it through gaps in context, response, or follow-up.
          </p>
        </RevealOnScroll>

        <div className="space-y-3">
          {journey.map((item, idx) => (
            <RevealOnScroll key={item.stage} delay={idx * 40}>
              <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-none bg-surface hover:shadow-[0_4px_12px_rgba(43,43,43,0.06)] transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-none border border-[#841617] bg-white flex items-center justify-center">
                  <span className="text-[14px] font-sans font-bold text-[#841617]">{item.stage}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-normal text-gray-900 text-[18px] md:text-[20px] leading-[1.2] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-[16px] leading-[1.6] text-gray-500">{item.detail}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 p-8 border border-[#841617] rounded-2xl bg-surface">
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-900">
            <strong>The key insight:</strong> The advisory revenue journey is not a funnel. It is a relationship-building cycle where context must carry forward at every stage. Revenue Infrastructure keeps that context alive — from first research to ongoing client relationship.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section 05: AI Discovery Context ─────────────────────────────────────

function AIDiscoverySection() {
  return (
    <section
      aria-labelledby="ai-discovery-h2"
      className="bg-surface py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="AI-Assisted Discovery" />
          <h2
            id="ai-discovery-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            AI tools are becoming part of how prospective clients evaluate and shorten their consideration lists.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-6 max-w-[680px]">
            When a prospect asks an AI assistant to recommend a fiduciary advisor in their area, the system returns an answer based on authority signals, structured content, entity clarity, and reputation indicators it can evaluate. This is not a replacement for referrals or traditional search—it is a growing channel that most firms have not built for.
          </p>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-8 max-w-[680px]">
            Firms with clearer authority structure, better entity consistency, more comprehensive content, and stronger trust signals are more likely to appear in those results. Poor machine-readable visibility can reduce the likelihood of being surfaced during AI-assisted research.
          </p>
          <a
            href="/ai-visibility"
            className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gray-900 focus-visible:outline-offset-[3px]"
          >
            Learn about AI Visibility
            <span aria-hidden="true">→</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 06: Revenue Infrastructure Applied ────────────────────────────

function AdvisoryFrameworkSection() {
  const domains = [
    {
      title: "Digital Presence",
      application:
        "Service and audience architecture, authority content, AI Visibility foundations, trust pathways, conversion UX, and discoverability for an advisory audience.",
    },
    {
      title: "Lead Response",
      application:
        "Inquiry capture, acknowledgment, qualification, advisor routing, and scheduling that preserves context and does not lose high-intent moments.",
    },
    {
      title: "Sales Operations",
      application:
        "CRM configuration for advisory workflows, pipeline stages, advisor ownership, follow-up workflows, and context continuity across the consideration cycle.",
    },
    {
      title: "Revenue Intelligence",
      application:
        "Source visibility, meeting progression, opportunity movement, bottlenecks, and business outcomes measured across the advisory journey—not just channel performance.",
    },
  ];

  return (
    <section
      aria-labelledby="advisory-framework-h2"
      className="bg-white py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Revenue Infrastructure for Advisory Firms" />
          <h2
            id="advisory-framework-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            How Revenue Infrastructure shows up in an advisory firm.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            The Revenue Infrastructure framework organizes into four connected modules. Each addresses a distinct dimension of how an advisory firm attracts, qualifies, converts, and retains clients.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain, i) => (
            <RevealOnScroll key={domain.title} delay={i * 80}>
              <div className="flex flex-col h-full border border-gray-200 rounded-2xl bg-surface p-8">
                <span className="text-[12px] font-sans font-bold tracking-[0.16em] text-[#841617] uppercase mb-3">
                  Module {i + 1}
                </span>
                <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[24px] md:text-[28px] mb-4">
                  {domain.title}
                </h3>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
                  {domain.application}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10">
          <RevealOnScroll>
            <a
              href="/framework"
              className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gray-900 focus-visible:outline-offset-[3px]"
            >
              Explore the Full Revenue Infrastructure Framework
              <span aria-hidden="true">→</span>
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── Section 07: Trust Before Technology ──────────────────────────────────

function TrustBeforeTechSection() {
  return (
    <section
      aria-labelledby="trust-tech-h2"
      className="bg-surface py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Our Approach" />
          <h2
            id="trust-tech-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Trust before technology.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-5 max-w-[680px]">
            Financial advisory businesses operate on trust. Every system GWS builds must reinforce that trust rather than undermine it. Speed, automation, and AI-assisted tools are configured to make the firm easier to trust—not just easier to find.
          </p>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-10 max-w-[680px]">
            The goal is not to replace the relationship. It is to build the infrastructure that protects and strengthens it.
          </p>
          <div className="p-6 border border-[#841617]/30 rounded-2xl bg-white max-w-[680px]">
            <p className="text-[15px] leading-[1.65] text-gray-500">
              <strong className="text-gray-900">Important:</strong> GrowthWorks Systems does not provide investment advice, legal advice, regulatory advice, or compliance advice. GWS builds Revenue Infrastructure in a manner consistent with the professional standards clients and their advisors expect. All advisory activities—investment recommendations, compliance determinations, fiduciary assessments—remain with the licensed advisor or firm.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 08: GWS Capabilities (Journey Layer) ─────────────────────────

function AdvisoryCapabilitiesSection() {
  const capabilities = [
    {
      group: "Get Found",
      items: [
        "AI Visibility foundations for advisory authority signals",
        "Local and professional visibility for the firm's audience",
        "AI-ready content architecture demonstrating expertise",
      ],
    },
    {
      group: "Build Trust",
      items: [
        "Structured trust and credibility signals",
        "Authority content answering pre-contact questions",
        "Reputation infrastructure for prospect evaluation",
      ],
    },
    {
      group: "Convert",
      items: [
        "Speed-to-lead response reducing the risk of losing high-intent inquiries",
        "AI-assisted inquiry handling configured for general information and scheduling",
        "Frictionless scheduling integrated with advisory qualification",
      ],
    },
    {
      group: "Grow",
      items: [
        "Referral tracking and amplification infrastructure",
        "Client experience automation preserving relationship quality",
        "Revenue intelligence showing source, timing, and outcome",
      ],
    },
  ];

  return (
    <section
      aria-labelledby="capabilities-h2"
      className="bg-white py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="GWS Capabilities" />
          <h2
            id="capabilities-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Organized around outcomes — not activities.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            Each capability maps to a specific gap in the advisory revenue journey. GWS does not sell activities. We engineer revenue results across the trust-to-conversion cycle.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <RevealOnScroll key={cap.group} delay={i * 80}>
              <div className="flex flex-col h-full border border-gray-200 rounded-2xl p-8">
                <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[21px] md:text-[24px] mb-5">
                  {cap.group}
                </h3>
                <ul className="space-y-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-gray-500">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] w-[6px] h-[6px] shrink-0 rounded-full bg-crimson"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 09: Operating Principles ────────────────────────────────────

function OperatingPrinciplesSection() {
  const principles = [
    {
      title: "Diagnose before prescribing",
      description:
        "Current Revenue Infrastructure is assessed before any solution is recommended. The diagnostic determines the roadmap.",
    },
    {
      title: "Trust is the product",
      description:
        "Every system is designed to establish and reinforce trust — not just to attract attention.",
    },
    {
      title: "Outcomes over activities",
      description:
        "Success is measured by qualified consultations booked, referrals generated, and revenue attributed — not impressions, clicks, or volume.",
    },
    {
      title: "Long-term relationships require long-term infrastructure",
      description:
        "Each Revenue Infrastructure domain compounds and strengthens the others over time.",
    },
  ];

  return (
    <section
      aria-labelledby="principles-h2"
      className="bg-surface py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Operating Principles" />
          <h2
            id="principles-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-10 max-w-[720px]"
          >
            How GWS works with advisory firms.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((principle, i) => (
            <RevealOnScroll key={principle.title} delay={i * 60}>
              <div className="border-t-2 border-[#841617] pt-5">
                <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[21px] md:text-[24px] mb-3">
                  {principle.title}
                </h3>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
                  {principle.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 10: FAQ ──────────────────────────────────────────────────────

function AdvisoryFAQSection() {
  return (
    <section
      aria-labelledby="faq-h2"
      className="bg-white py-[112px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Frequently Asked Questions" />
          <h2
            id="faq-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-12 max-w-[720px]"
          >
            Questions advisory firms ask before engaging GWS.
          </h2>
        </RevealOnScroll>

        <div className="space-y-4 max-w-[720px]">
          <FAQItem
            question="Do you work with independent RIAs and retirement planning firms?"
            answer="Yes. GWS works with independent RIAs, retirement planning firms, wealth management practices, and independent financial advisors. The framework is designed for founder-led service businesses where trust, credibility, and long-term relationships drive growth."
          />
          <FAQItem
            question="Can GWS improve referral generation?"
            answer="Referral systems are part of the Revenue Infrastructure framework. Programs include review generation, client communication sequences, and referral tracking. The relationship-based nature of referrals is preserved while consistency and measurability are added."
          />
          <FAQItem
            question="Does this replace our existing CRM?"
            answer="Not necessarily. The diagnostic evaluates the current CRM. Often the issue is configuration — missing workflows, inconsistent follow-up, limited visibility. Existing systems are configured and optimized when possible; replacements are recommended only when the platform creates structural limits."
          />
          <FAQItem
            question="Can AI handle general firm inquiries without giving financial advice?"
            answer="AI-assisted reception may be configured for approved general-information and scheduling use cases — questions about the firm, its services, process, and team, and appointment booking. All such use cases are subject to the firm's own compliance requirements and review. GWS does not configure AI systems to provide investment recommendations or engage in regulated advisory activities."
          />
          <FAQItem
            question="Do we need a new website?"
            answer="The diagnostic determines what is needed. Many sites fail because they describe services rather than establish trust, and lack structured data and authority signals for AI-assisted discovery. The appropriate level of intervention is recommended after assessment."
          />
          <FAQItem
            question="How does AI Visibility affect advisory firms specifically?"
            answer="When prospects use AI tools to research and evaluate advisors, the systems return recommendations based on authority signals, structured content, and entity clarity. Firms with AI-ready infrastructure are more likely to appear in those results. Poor machine-readable visibility can reduce the likelihood of being surfaced during AI-assisted research — a growing dynamic that compounds over time."
          />
          <FAQItem
            question="How is implementation prioritized?"
            answer="The diagnostic establishes a prioritized roadmap. Initial focus is placed on the highest-impact gaps in the current revenue system, with domains building on one another over time. Each implementation is structured to reinforce the others."
          />
          <FAQItem
            question="What happens during a Revenue Diagnostic?"
            answer="The Revenue Diagnostic is a structured diagnostic conversation — not a sales presentation. Current Revenue Infrastructure is reviewed across the four modules, leak points are identified, and a specific approach is outlined. If there is no clear fit, GWS says so. There is no obligation."
          />
        </div>
      </div>
    </section>
  );
}

// ─── Section 11: Continue Your Research ────────────────────────────────────

function ResearchRoutesSection() {
  const routes = [
    { href: "/framework", label: "Revenue Infrastructure Framework", desc: "The complete framework behind GWS Revenue Infrastructure." },
    { href: "/ai-visibility", label: "AI Visibility", desc: "How AI tools discover and recommend businesses." },
    { href: "/resources", label: "Resources", desc: "Framework guides, research, and supporting materials." },
    { href: "/about", label: "About the Founder", desc: "Clayton Tidwell and the GWS approach." },
  ];

  return (
    <section
      aria-labelledby="research-h2"
      className="bg-surface py-[112px] md:py-[88px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Continue Your Research" />
          <h2
            id="research-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-10 max-w-[720px]"
          >
            Explore the framework and supporting resources.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map((route, i) => (
            <RevealOnScroll key={route.href} delay={i * 60}>
              <a
                href={route.href}
                className="group flex flex-col p-6 border border-gray-200 rounded-2xl bg-white hover:border-[#841617] hover:shadow-[0_4px_16px_rgba(132,22,23,0.08)] transition-all min-h-[120px]"
              >
                <span className="font-serif font-normal text-[18px] leading-[1.3] text-gray-900 group-hover:text-[#841617] transition-colors mb-2">
                  {route.label}
                </span>
                <span className="text-[14px] leading-[1.6] text-gray-500">
                  {route.desc}
                </span>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 12: Closing CTA ──────────────────────────────────────────────

function ClosingCTASection() {
  return (
    <section
      aria-labelledby="closing-cta-h2"
      className="bg-gws-dark text-white py-[88px] md:py-[144px] relative overflow-hidden"
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
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-crimson/15 blur-[100px] pointer-events-none"
      />

      <div className={`${CONTAINER} relative z-10`}>
        <RevealOnScroll>
          <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">
            Start with the system
          </h3>
          <h2
            id="closing-cta-h2"
            className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            See where your advisory firm's revenue system is helping — or limiting — growth.
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-8 max-w-[600px]">
            A Revenue Diagnostic maps the system behind your revenue. No replacement funnels. No generic campaigns. A clear read on what to fix first.
          </p>
          <div className="max-w-[600px] mb-10">
            <h3 className="font-serif font-normal text-white/90 text-[20px] md:text-[22px] leading-[1.3] mb-4">
              What happens on the call:
            </h3>
            <ol className="space-y-3">
              {[
                "Structured diagnostic conversation — not a sales presentation",
                "Assessment of current Revenue Infrastructure across four modules",
                "Identification of highest-impact improvement opportunities",
                "A specific, actionable recommendation with no obligation",
              ].map((step, idx) => (
                <li key={step} className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-white/60">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center mt-[2px]">
                    <span className="text-[12px] font-sans font-bold text-white/70">{idx + 1}</span>
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <a
            href="/revenue-diagnostic"
            className="inline-flex items-center justify-center min-h-[48px] px-8 rounded bg-crimson hover:bg-crimson-dark transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
          >
            Book a Revenue Diagnostic
          </a>
          <p className="text-white/30 text-[14px] mt-10 tracking-wide">
            One system. Real alignment. Trust-led growth.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────

export default function FinancialAdvisors() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main className="gws-page">
        <FinancialAdvisorsHero />
        <AdvisoryFirmRealitySection />
        <AdvisoryLeakageSection />
        <AdvisoryRevenueJourneySection />
        <AIDiscoverySection />
        <AdvisoryFrameworkSection />
        <TrustBeforeTechSection />
        <AdvisoryCapabilitiesSection />
        <OperatingPrinciplesSection />
        <AdvisoryFAQSection />
        <ResearchRoutesSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
