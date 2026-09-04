import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * CONVERSION SYSTEMS — Retained Solution Detail Page
 *
 * This is a retained page that deepens LEAD RESPONSE within the
 * canonical Solutions taxonomy (Digital Presence / Lead Response /
 * Sales Operations / Revenue Intelligence).
 *
 * Relationship:  LEAD RESPONSE → Conversion Systems (depth)
 * Public route:  /conversion-systems
 * Live source:   https://www.growthworks-systems.com/solutions/conversion
 *
 * PRESERVE:
 *  - Hero (eyebrow, headline, supporting copy, dual CTAs)
 *  - Section 01 — The Business Problem
 *  - Section 02 — The GWS Approach (all six components)
 *  - After-hours / diagnostic CTA section
 *  - Dark call-info panel (What Happens on the Call)
 *  - Dark closing band
 *  - Footer
 *
 * RECONCILE:
 *  - Primary CTA → BOOK A REVENUE DIAGNOSTIC
 *  - Lead Response taxonomy relationship
 *  - Soften unsupported absolutes
 *  - Design system tokens (typography, color, spacing)
 *  - Responsive, accessibility, motion rules
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

// ─── Section: Hero ────────────────────────────────────────────────────────

function ConversionSystemsHero() {
  return (
    <section
      aria-labelledby="conversion-systems-h1"
      className="bg-[#F8F5EC] pt-[112px] md:pt-[144px] pb-[72px] md:pb-[88px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="max-w-[720px]">
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            Conversion Systems
          </p>
          <h1
            id="conversion-systems-h1"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Every missed call is a missed opportunity. Most are preventable.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#2B2B2B] mb-6 max-w-[640px]">
            Conversion Systems are designed to capture inbound opportunity with timely response, qualification, routing, booking, and follow-up—including periods when staff may not immediately be available.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59] mb-10 max-w-[620px]">
            When a prospect reaches out, the speed, clarity, and structure of the response often shapes whether that inquiry becomes a conversation, a booked appointment, or a missed opportunity.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/revenue-diagnostic"
              className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
            >
              Book a Revenue Diagnostic
            </a>
            <a
              href="/solutions"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-none border border-[#841617] text-[#841617] bg-transparent hover:bg-[#F2E7E3] active:bg-[#E9D8D3] transition-colors font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
            >
              View All Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 01 — The Business Problem ────────────────────────────────────

function BusinessProblemSection() {
  return (
    <section
      aria-labelledby="business-problem-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <span
              className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight"
              aria-hidden="true"
            >
              01
            </span>
            <div className="lg:mt-3">
              <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-[#625E59]">
                The Business Problem
              </p>
            </div>
          </div>

          <div className="max-w-[680px]">
            <RevealOnScroll>
              <h2
                id="business-problem-h2"
                className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6"
              >
                Qualified leads are being lost before the first conversation.
              </h2>
              <p className="text-[18px] leading-[1.65] text-[#2B2B2B] mb-5">
                Response time matters. The longer a high-intent inquiry sits without meaningful engagement, the more likely it is that momentum is lost, intent cools, or a faster-responding competitor captures the opportunity.
              </p>
              <p className="text-[18px] leading-[1.65] text-[#2B2B2B] mb-5">
                Delays in response can materially reduce the likelihood that a high-intent inquiry progresses.
              </p>
              <p className="text-[17px] leading-[1.65] text-[#625E59] mb-5">
                Many service businesses discover that their most preventable losses are not from a lack of demand, but from response friction across:
              </p>
              <ul className="space-y-3 mb-6 max-w-[620px]">
                {[
                  "After-hours inquiries that arrive when no one is available to respond",
                  "Weekend calls that go to voicemail without follow-up",
                  "Peak-period overflow when staff are stretched across multiple responsibilities",
                  "Missed calls without automated acknowledgment or callback workflow",
                  "Slow manual response that loses momentum to faster competitors",
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
              <p className="text-[17px] leading-[1.65] text-[#625E59]">
                These are structural gaps, not individual failures. They emerge when inbound demand, response capacity, and qualification routing are not designed as one system.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02 — The GWS Approach (Six Components) ──────────────────────

function GWSApproachSection() {
  const components = [
    {
      num: "01",
      title: "Speed-to-Lead Systems",
      description:
        "Timely automated acknowledgment and response workflows that engage inbound inquiries quickly. Designed to preserve momentum and route the opportunity to the right next step.",
    },
    {
      num: "02",
      title: "AI Reception & Missed Call Response",
      description:
        "AI-assisted handling of appropriate inbound scenarios, including missed calls, outside-business-hours intake, basic qualification, booking, and routing—within safe, well-defined contexts. Not designed to replace judgment on complex or regulated conversations.",
    },
    {
      num: "03",
      title: "Lead Capture Architecture",
      description:
        "Lead capture across website, landing pages, and inbound channels, with appropriate qualification and routing into the right pipeline, conversation, or scheduling flow.",
    },
    {
      num: "04",
      title: "Appointment Booking Systems",
      description:
        "Reduce booking friction by allowing appropriate qualified prospects to schedule directly, without requiring a phone call or extended back-and-forth.",
    },
    {
      num: "05",
      title: "Qualification Workflows",
      description:
        "Structured questions and workflows that help identify context, fit, and the appropriate next action—feeding a human decision rather than replacing it. Designed to inform follow-up, not to make final judgment on every prospect.",
    },
    {
      num: "06",
      title: "Conversion Optimization",
      description:
        "Ongoing testing, data review, and improvement across the conversion touchpoints that matter most—from first response to booked appointment.",
    },
  ];

  return (
    <section
      aria-labelledby="gws-approach-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start mb-10 md:mb-12">
          <div className="flex lg:block items-baseline gap-3">
            <span
              className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight"
              aria-hidden="true"
            >
              02
            </span>
            <div className="lg:mt-3">
              <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-[#625E59]">
                The GWS Approach
              </p>
            </div>
          </div>

          <div className="max-w-[720px]">
            <RevealOnScroll>
              <h2
                id="gws-approach-h2"
                className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-4"
              >
                Systematic conversion infrastructure across every inbound channel.
              </h2>
              <p className="text-[17px] leading-[1.65] text-[#625E59]">
                Conversion Systems organize six capabilities designed to work together. Each one addresses a specific point where opportunity can be lost—and where a designed system can preserve it.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Six rows: number / capability / explanation, divided horizontally */}
        <div className="max-w-[1000px]">
          {components.map((component, i) => (
            <RevealOnScroll key={component.num} delay={i * 50}>
              <div
                className={`grid grid-cols-[60px_1fr] md:grid-cols-[80px_minmax(220px,1fr)_2fr] gap-4 md:gap-8 py-7 md:py-8 ${
                  i < components.length - 1 ? "border-b border-[#DDD6CC]" : ""
                }`}
              >
                <div>
                  <span className="font-serif font-normal text-[#841617] text-[22px] md:text-[24px] leading-[1]">
                    {component.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-normal text-[#2B2B2B] leading-[1.25] text-[20px] md:text-[22px]">
                    {component.title}
                  </h3>
                </div>
                <div>
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59]">
                    {component.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Lead Response taxonomy link */}
        <div className="mt-10 max-w-[1000px]">
          <p className="text-[15px] leading-[1.6] text-[#625E59]">
            <span className="font-sans font-semibold text-[#2B2B2B]">Part of:</span>{" "}
            Conversion Systems is the depth implementation of the{" "}
            <a
              href="/solutions#lead-response"
              className="text-[#841617] font-sans font-semibold border-b border-[#841617] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
            >
              Lead Response
            </a>{" "}
            area within the Revenue Infrastructure system.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── After-Hours / Diagnostic CTA Section ────────────────────────────────

function AfterHoursCTASection() {
  return (
    <section
      aria-labelledby="after-hours-cta-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: recognition question + supporting copy + actions */}
          <div className="max-w-[620px]">
            <RevealOnScroll>
              <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
                After-Hours & Conversion Diagnostic
              </p>
              <h2
                id="after-hours-cta-h2"
                className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[40px] mb-6"
              >
                How many qualified leads are you losing after hours?
              </h2>
              <p className="text-[17px] leading-[1.65] text-[#2B2B2B] mb-5">
                The Revenue Diagnostic can help identify where response gaps, missed-call handling, after-hours coverage, qualification friction, booking friction, and routing gaps may be affecting opportunity.
              </p>
              <p className="text-[17px] leading-[1.65] text-[#625E59] mb-8">
                It is designed to assess the potential business impact of these gaps—not as a sales presentation, but as a structured look at where your conversion system is helping and where it is limiting.
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
                  className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  Understand the Framework
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Charcoal call-info panel — What Happens on the Call */}
          <RevealOnScroll delay={120}>
            <aside
              aria-labelledby="call-info-h3"
              className="bg-[#2B2B2B] text-white rounded-[16px] p-8 md:p-10"
            >
              <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase mb-3 text-[#841617]">
                What Happens on the Call
              </p>
              <h3
                id="call-info-h3"
                className="font-serif font-normal text-white text-[24px] md:text-[28px] leading-[1.2] mb-6"
              >
                A structured look at your conversion system.
              </h3>

              <ol className="space-y-5">
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-[12px] font-sans font-bold text-white mt-[2px]"
                  >
                    1
                  </span>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-[15px] mb-1">
                      Diagnostic Conversation
                    </h4>
                    <p className="text-[14px] leading-[1.55] text-white/70">
                      A working session on your current inbound flow, response patterns, and where leads tend to slow down or go cold.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-[12px] font-sans font-bold text-white mt-[2px]"
                  >
                    2
                  </span>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-[15px] mb-1">
                      Infrastructure Assessment
                    </h4>
                    <p className="text-[14px] leading-[1.55] text-white/70">
                      A look at your speed-to-lead, after-hours handling, qualification, booking, and routing—measured against what a reliable conversion system requires.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-[12px] font-sans font-bold text-white mt-[2px]"
                  >
                    3
                  </span>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-[15px] mb-1">
                      Handoff & Routing Review
                    </h4>
                    <p className="text-[14px] leading-[1.55] text-white/70">
                      An evaluation of where context breaks down between systems or owners, and where structure could preserve it.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-[12px] font-sans font-bold text-white mt-[2px]"
                  >
                    4
                  </span>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-[15px] mb-1">
                      Actionable Recommendations
                    </h4>
                    <p className="text-[14px] leading-[1.55] text-white/70">
                      Clear next steps—not a generic deck, not a sales pitch. A focused read on what to address first and why.
                    </p>
                  </div>
                </li>
              </ol>
            </aside>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── Dark Closing Band ───────────────────────────────────────────────────

function DarkClosingBand() {
  return (
    <section
      aria-labelledby="closing-band-h2"
      className="bg-[#2B2B2B] text-white py-[88px] md:py-[144px] relative overflow-hidden border-b border-[#D8D5CE]"
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
          The system behind every conversion
        </p>
        <h2
          id="closing-band-h2"
          className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px] mx-auto"
        >
          Build the conversion system your business actually needs.
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-10 max-w-[600px] mx-auto">
          A Revenue Diagnostic maps the system behind your inbound flow. No replacement funnels. No quick wins. Just a clear read on what to fix first.
        </p>
        <a
          href="/revenue-diagnostic"
          className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
        >
          Book a Revenue Diagnostic
        </a>
        <div className="mt-8">
          <a
            href="/framework"
            className="inline-flex items-center gap-2 text-white/80 border-b border-white/40 pb-1 text-[15px] font-sans font-semibold hover:text-white hover:border-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
          >
            Understand the Framework
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="text-white/40 text-[14px] mt-12 tracking-wide">
          Conversion Systems — the depth of Lead Response within Revenue Infrastructure.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────

export default function ConversionSystems() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main className="gws-page">
        <ConversionSystemsHero />
        <BusinessProblemSection />
        <GWSApproachSection />
        <AfterHoursCTASection />
        <DarkClosingBand />
      </main>
      <SiteFooter />
    </div>
  );
}
