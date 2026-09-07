import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ─── Shared layout and utilities ──────────────────────────────────────────────

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";

function SectionLabel({ label }: { label: string }) {
  return (
    <h3 className="text-[18px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {label}
    </h3>
  );
}

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

// ─── Section 01 — Insurance Hero ──────────────────────────────────────────────

function InsuranceHero() {
  return (
    <section
      aria-labelledby="insurance-hero-h1"
      className="bg-surface pt-[112px] md:pt-[144px] pb-[72px] md:pb-[88px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <div className="max-w-[720px]">
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            Insurance Agencies
          </p>
          <h1
            id="insurance-hero-h1"
            className="font-serif font-normal text-gray-900 leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Connect lead generation, producer follow-up, and revenue visibility.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-900 mb-6 max-w-[620px]">
            Insurance agencies generate opportunity through multiple channels — referrals, local discovery, paid campaigns, website inquiries, inbound calls, partner relationships, and renewals. The challenge is keeping those opportunities connected after they enter the business.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 mb-10 max-w-[600px]">
            Information moves between marketing platforms, phone systems, forms, producers, CRM systems, quoting processes, and follow-up tasks. Every handoff can create lost context, unclear ownership, or delayed action. GrowthWorks Systems creates a more coordinated path from inquiry to measurable business outcome.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/revenue-diagnostic"
              className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
            >
              Book a Revenue Diagnostic
            </a>
            <a
              href="/framework"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-none border border-[#841617] text-[#841617] bg-surface hover:bg-[#F2E7E3] active:bg-[#E9D8D3] transition-colors font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
            >
              Explore the Framework
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02 — Problem Statement ───────────────────────────────────────────

const CHALLENGES = [
  {
    title: "Referral growth is slowing",
    desc: "Organic referrals remain valuable, but growth from referrals alone has plateaued. New acquisition channels require systematic capture and follow-up.",
  },
  {
    title: "Website traffic doesn't convert",
    desc: "Website visits don't translate to qualified inquiries. Prospects may find you but lack clarity on service offerings, carrier options, or the next step.",
  },
  {
    title: "Lead response is too slow",
    desc: "Inquiry-to-response time correlates with conversion. But when inquiries route through multiple systems, response can drift into hours or days.",
  },
  {
    title: "Local visibility is weak",
    desc: "Prospects researching agencies use AI tools and local search. Many agencies lack the consistent, discoverable, AI-readable business information those systems depend on.",
  },
  {
    title: "Differentiation is difficult",
    desc: "In a crowded market, trust and reputation matter. But building and maintaining those signals across multiple platforms requires coordinated effort.",
  },
  {
    title: "CRM follow-up is fragmented",
    desc: "Producers work from multiple systems—CRM, email, phone notes, broker platforms. Context gets lost when systems don't integrate. Follow-up becomes inconsistent.",
  },
];

function ProblemStatementSection() {
  return (
    <section
      aria-labelledby="problem-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Where Agencies Leak Revenue" />
          <blockquote className="font-serif font-normal text-gray-900 leading-[1.15] text-[24px] md:text-[28px] mb-12 max-w-[720px] border-l-[3px] border-[#841617] pl-6 italic">
            "Most independent agencies are built on referrals and relationships. Those still matter — but they're no longer sufficient."
          </blockquote>

          <h2
            id="problem-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-10 max-w-[720px]"
          >
            Six systemic challenges agencies face today
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHALLENGES.map((challenge, idx) => (
              <RevealOnScroll key={challenge.title} delay={idx * 40}>
                <div className="flex flex-col h-full">
                  <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[20px] md:text-[21px] mb-3">
                    {challenge.title}
                  </h3>
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
                    {challenge.desc}
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

// ─── Section 03 — Trust Before Quoting ────────────────────────────────────────

const TRUST_DIMENSIONS = [
  {
    title: "Responsiveness",
    desc: "Buyers evaluate your speed to reply, availability, and consistency through follow-up. First response time signals respect for their inquiry.",
  },
  {
    title: "Expertise",
    desc: "Relevant knowledge about their situation, carriers, coverage options, and process builds confidence. They need to know you can guide them.",
  },
  {
    title: "Reputation",
    desc: "Reviews, ratings, local authority signals, referrals from trusted sources, and credentials demonstrate you're established and trusted in your market.",
  },
  {
    title: "Clarity",
    desc: "Transparent explanation of process, carrier options, pricing considerations, and next steps removes uncertainty. Confusion delays decisions.",
  },
];

function TrustBeforeQuotingSection() {
  return (
    <section
      aria-labelledby="trust-h2"
      className="bg-surface py-[72px] md:py-[112px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Trust Before Quoting" />
          <h2
            id="trust-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Buyers evaluate before they decide.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-12 max-w-[680px]">
            In insurance, the relationship decision happens before the quote. Prospects assess your responsiveness, expertise, reputation, and clarity as signals of whether you're the right partner. That evaluation window is narrow. Speed and consistency matter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {TRUST_DIMENSIONS.map((dim, idx) => (
              <RevealOnScroll key={dim.title} delay={idx * 50}>
                <div className="flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#841617] text-white font-sans font-bold text-[14px] shrink-0 mt-1"
                    >
                      {idx + 1}
                    </span>
                    <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[21px]">
                      {dim.title}
                    </h3>
                  </div>
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 ml-11">
                    {dim.desc}
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

// ─── Section 04 — AI Discovery Gap ────────────────────────────────────────────

const DISCOVERY_SIGNALS = [
  {
    signal: "Entity Authority",
    desc: "Business registration, consistent name/address/phone, ownership clarity. AI systems verify you exist and are legitimate.",
  },
  {
    signal: "Review Signals",
    desc: "Ratings, testimonials, recency of reviews. Consistent positive signals build confidence that you deliver on promises.",
  },
  {
    signal: "Content Relevance",
    desc: "Clear service descriptions, carrier focus, target market clarity, expertise articles. Content signals what you specialize in.",
  },
  {
    signal: "Local Presence",
    desc: "Google Business Profile accuracy, local citations, maps presence, directory listings. Local presence signals you're accessible and real.",
  },
  {
    signal: "Trust Indicators",
    desc: "Industry credentials, affiliations, awards, case studies, founder background. These signals demonstrate you're an authority.",
  },
];

function AIDiscoverySection() {
  return (
    <section
      aria-labelledby="ai-discovery-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="AI Discovery Gap" />
          <h2
            id="ai-discovery-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            How AI systems evaluate insurance agencies
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-4 max-w-[680px]">
            Prospects increasingly use AI-assisted tools to research and evaluate agencies. Machine systems benefit from clear signals about who you are, what you do, and whether you're trustworthy. You control most of these signals.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            Discoverability is concentrated. If your agency isn't visible through these signals, you miss opportunities before they even reach your website.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {DISCOVERY_SIGNALS.map((item, idx) => (
              <RevealOnScroll key={item.signal} delay={idx * 40}>
                <div className="border border-gray-200 rounded-none p-6 bg-[#FAFBFC]">
                  <h3 className="font-sans font-bold text-[16px] text-[#841617] mb-2 tracking-wide">
                    {item.signal}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-gray-900">
                    {item.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href="/ai-visibility"
              className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
            >
              Learn more about AI Visibility
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 05 — Four Capability Groups ──────────────────────────────────────

const CAPABILITY_GROUPS = [
  {
    title: "Get Found",
    desc: "Prospects need to discover you through search, local discovery, referrals, and ads.",
    actions: [
      "Website architecture that clarifies services and carriers",
      "Local search optimization and Google Business Profile",
      "Content strategy that builds authority in your market",
      "Conversion pathways that guide prospects to inquiry",
    ],
  },
  {
    title: "Build Trust",
    desc: "Discovery alone isn't enough. Prospects evaluate reputation before deciding.",
    actions: [
      "Review reputation management and response",
      "Local authority signals through content and expertise",
      "Credentials, affiliations, and awards visibility",
      "Founder and team credibility positioning",
    ],
  },
  {
    title: "Convert",
    desc: "When prospects are ready, your response and process determine whether they move forward.",
    actions: [
      "Inquiry capture across channels (website, phone, referral)",
      "Speed-to-lead response and acknowledgment",
      "Qualification and routing to the right producer",
      "Clear next steps and scheduling",
    ],
  },
  {
    title: "Grow",
    desc: "One sale is the beginning. Renewals, cross-sell, and referrals compound revenue.",
    actions: [
      "Lifecycle visibility from inquiry through renewal",
      "Referral system triggers and tracking",
      "Cross-sell opportunity identification",
      "Revenue intelligence from all sources",
    ],
  },
];

function CapabilityGroupsSection() {
  return (
    <section
      aria-labelledby="capabilities-h2"
      className="bg-surface py-[72px] md:py-[112px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Revenue Infrastructure Applied" />
          <h2
            id="capabilities-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            How the four Revenue Infrastructure modules work together in insurance.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-12 max-w-[680px]">
            The Revenue Infrastructure framework applies across industries. These four capability groups describe how they connect for insurance agencies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAPABILITY_GROUPS.map((group, idx) => (
              <RevealOnScroll key={group.title} delay={idx * 50}>
                <article className="bg-white border border-gray-200 rounded-none p-7 md:p-8 flex flex-col h-full">
                  <header className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#841617]/10 text-[#841617] font-sans font-bold text-[14px] mb-3">
                      {idx + 1}
                    </span>
                    <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[24px] md:text-[28px]">
                      {group.title}
                    </h3>
                  </header>
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-900 mb-5">
                    {group.desc}
                  </p>
                  <ul className="space-y-3 flex-1">
                    {group.actions.map((action) => (
                      <li
                        key={action}
                        className="flex items-start gap-2 text-[15px] leading-[1.5] text-gray-500"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#841617]/70"
                        />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href="/solutions"
                      className="inline-flex items-center gap-1 text-[#841617] font-sans font-semibold text-[14px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                    >
                      Explore solutions
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 06 — Lifecycle & Operating Principles ────────────────────────────

function LifecycleSection() {
  const stages = [
    {
      stage: "Discovery / Referral",
      detail: "Lead enters from search, referral, campaign, or inbound call",
      connection: "Source and context captured",
    },
    {
      stage: "Inquiry",
      detail: "Prospect asks a question or requests a quote",
      connection: "Inquiry acknowledged across channels",
    },
    {
      stage: "Response",
      detail: "Producer contacted, context shared, next step clear",
      connection: "Ownership assigned, timeline established",
    },
    {
      stage: "Quote / Conversation",
      detail: "Producer discusses options, coverage, carriers, pricing",
      connection: "Progress tracked and visible",
    },
    {
      stage: "Follow-Up",
      detail: "Consistent touchpoints keep momentum",
      connection: "Triggers automated where approved",
    },
    {
      stage: "Decision / Bind",
      detail: "Prospect becomes client through policy decision",
      connection: "Outcome recorded for measurement",
    },
    {
      stage: "Renewal",
      detail: "Policy comes up for renewal at trigger date",
      connection: "Lifecycle visibility enables proactive outreach",
    },
    {
      stage: "Cross-Sell / Referral",
      detail: "Opportunities identified from lifecycle data",
      connection: "Revenue compound through existing relationships",
    },
  ];

  const principles = [
    "Trust is built through responsiveness and reliability.",
    "Relationships matter, but relationships need operational infrastructure.",
    "Local reputation signals influence discovery and trust.",
    "Response speed correlates with conversion when combined with clarity.",
    "Operational consistency prevents opportunity loss at handoffs.",
  ];

  return (
    <section
      aria-labelledby="lifecycle-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="The Connected Agency State" />
          <h2
            id="lifecycle-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            From inquiry to measurement
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-12 max-w-[680px]">
            In a connected agency, lead context, producer ownership, quote progression, follow-up consistency, and outcome visibility work as one system. This prevents opportunities from slipping through cracks.
          </p>

          {/* Lifecycle stages */}
          <div className="mb-16">
            <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[22px] md:text-[24px] mb-8">
              The insurance agency lifecycle
            </h3>
            <div className="space-y-4">
              {stages.map((s, idx) => (
                <RevealOnScroll key={s.stage} delay={idx * 20}>
                  <div className="flex gap-4 md:gap-6 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-shrink-0">
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-[#841617] text-[#841617] font-sans font-bold text-[12px]"
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-normal text-gray-900 text-[18px] mb-1">
                        {s.stage}
                      </h4>
                      <p className="text-[15px] leading-[1.6] text-gray-500 mb-2">
                        {s.detail}
                      </p>
                      <p className="text-[14px] leading-[1.5] text-[#841617] font-sans font-semibold">
                        {s.connection}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Operating principles */}
          <div>
            <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[22px] md:text-[24px] mb-8">
              Operating principles for connected agencies
            </h3>
            <div className="space-y-3">
              {principles.map((principle) => (
                <RevealOnScroll key={principle}>
                  <p className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.65] text-gray-900">
                    <span
                      aria-hidden="true"
                      className="mt-[8px] w-[6px] h-[6px] shrink-0 rounded-full bg-[#841617]"
                    />
                    <span>{principle}</span>
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 07 — FAQ ─────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Do you work with independent insurance agencies?",
    a: "Yes. GrowthWorks Systems works with independent agencies, managing general agents (MGAs), and insurance wholesalers. The focus is on revenue from discovery through measurement, regardless of agency structure or size.",
  },
  {
    q: "Can GWS improve referral systems?",
    a: "Yes. Many agencies rely on referrals but lack systems to track, measure, or amplify them. Revenue Infrastructure visibility can help identify which referral sources are most valuable and how to encourage more high-quality referrals.",
  },
  {
    q: "Does this replace our agency management system?",
    a: "No. GWS assesses how your existing CRM, website, intake, automation, and reporting systems connect. We don't replace AMS systems. Instead, we help coordinate data and workflows across the systems you already use.",
  },
  {
    q: "Can AI assist with inquiry handling?",
    a: "AI-assisted intake may support approved general business information, basic inquiry capture, routing to the right producer, and scheduling, subject to your agency's review and applicable compliance requirements. This is not insurance advice; that remains with your producers and compliance team.",
  },
  {
    q: "Can this work with existing systems?",
    a: "Yes. The Revenue Infrastructure approach assesses how existing platforms (CRM, website, phone, email, broker systems) can work more cohesively. Integration feasibility depends on your specific platforms and what data they expose.",
  },
  {
    q: "Do we need a new website?",
    a: "Not necessarily. A Revenue Diagnostic evaluates your current website in the context of discovery, trust, conversion, and measurement. Sometimes improvements to content, structure, or performance matter more than a full redesign.",
  },
  {
    q: "How is implementation prioritized?",
    a: "Priorities emerge from the Revenue Diagnostic. We typically start with the highest-leverage changes — often discovery and response speed — then move into deeper operational work like lifecycle automation.",
  },
  {
    q: "What happens during the Revenue Diagnostic?",
    a: "A Revenue Diagnostic maps your current systems, channels, and outcomes. We review where opportunities enter, how they move through your business, where they leak, and which changes would drive the most revenue impact.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-h2"
      className="bg-surface py-[72px] md:py-[112px] border-b border-gray-200"
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <SectionLabel label="Frequently Asked Questions" />
          <h2
            id="faq-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-12 max-w-[720px]"
          >
            Questions agencies ask about Revenue Infrastructure
          </h2>

          <div className="max-w-[780px] space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <RevealOnScroll key={item.q} delay={idx * 25}>
                <div
                  className="border border-gray-200 rounded-none overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 hover:bg-[#FAFBFC] active:bg-[#F2E7E3] transition-colors text-left"
                    aria-expanded={openIndex === idx}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="font-sans font-semibold text-[16px] md:text-[17px] leading-[1.5] text-gray-900 flex-1">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1 text-[#841617] font-sans font-bold text-[18px] transition-transform"
                      style={{
                        transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      ⌄
                    </span>
                  </button>
                  {openIndex === idx && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-6 pb-5 pt-0 border-t border-gray-200"
                    >
                      <p className="text-[15px] md:text-[16px] leading-[1.65] text-gray-500">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 08 — Closing CTA ──────────────────────────────────────────────────

function ClosingCTASection() {
  return (
    <section
      aria-labelledby="insurance-closing-cta"
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
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-[#841617]/15 blur-[100px] pointer-events-none"
      />

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
          Start with the system
        </p>
        <h2
          id="insurance-closing-cta"
          className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px] mx-auto"
        >
          Measure where your system is helping — or limiting — growth.
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

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function InsuranceAgencies() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <InsuranceHero />
        <ProblemStatementSection />
        <TrustBeforeQuotingSection />
        <AIDiscoverySection />
        <CapabilityGroupsSection />
        <LifecycleSection />
        <FAQSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
