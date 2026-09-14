import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TableOfContents from "@/components/TableOfContents";

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

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";

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

// ─── Section Number & Label Helpers ────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase text-[#841617] industries-section-label">
      {label}
    </p>
  );
}

function SectionNumber({ num }: { num: string }) {
  return (
    <span
      className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight"
      aria-hidden="true"
    >
      {num}
    </span>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────

function ConversionSystemsHero() {
  return (
    <section
      aria-labelledby="conversion-systems-title"
      className="gws-glowy-hero"
      style={{ minHeight: 'unset', height: 655.078 }}
    >
      <div className="gws-glowy-canvas" style={{ height: 655.078 }} />
      <div className="gws-glowy-content" style={{ paddingBottom: 108 }}>
        <div className={CONTAINER}>
          <div className="gws-glowy-content-inner" style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="gws-glowy-badge">
              Conversion Systems
            </div>
            <h2 id="conversion-systems-title" className="gws-glowy-title">
              Every missed call is a missed opportunity. Most are <span style={{ color: 'var(--maroon)' }}>preventable.</span>
            </h2>
            <p className="gws-glowy-copy">
              Conversion Systems are designed to capture inbound opportunity with timely response, qualification, routing, booking, and follow-up—including periods when staff may not immediately be available.
            </p>
            <div className="gws-glowy-actions">
              <a
                href="/revenue-diagnostic"
                className="gws-glowy-primary supporting-button"
                style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: 14 }}
              >
                Book a Revenue Diagnostic
              </a>
            </div>
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
      id="business-problem-section"
      aria-labelledby="business-problem-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="01" />
            <div className="lg:mt-3">
              <SectionLabel label="The Business Problem" />
            </div>
          </div>

          <div className="max-w-[680px]">
            <RevealOnScroll>
              <h2
                id="business-problem-h2"
                className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6"
              >
                Qualified leads are being lost before the <span style={{ color: '#841617' }}>first conversation</span>.
              </h2>
              <p className="text-[18px] leading-[1.65] text-gray-900 mb-5">
                Response time matters. The longer a high-intent inquiry sits without meaningful engagement, the more likely it is that momentum is lost, intent cools, or a faster-responding competitor captures the opportunity.
              </p>
              <p className="text-[18px] leading-[1.65] text-gray-900 mb-5">
                Delays in response can materially reduce the likelihood that a high-intent inquiry progresses.
              </p>
              <p className="text-[17px] leading-[1.65] text-gray-500 mb-5">
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
                    className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-gray-900"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-[6px] h-[6px] shrink-0 rounded-full bg-[#841617]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[17px] leading-[1.65] text-gray-500">
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
    { num: "01", title: "Speed-to-Lead Systems", description: "Timely automated acknowledgment and response workflows that engage inbound inquiries quickly. Designed to preserve momentum and route the opportunity to the right next step." },
    { num: "02", title: "AI Reception & Missed Call Response", description: "AI-assisted handling of appropriate inbound scenarios, including missed calls, outside-business-hours intake, basic qualification, booking, and routing—within safe, well-defined contexts. Not designed to replace judgment on complex or regulated conversations." },
    { num: "03", title: "Lead Capture Architecture", description: "Lead capture across website, landing pages, and inbound channels, with appropriate qualification and routing into the right pipeline, conversation, or scheduling flow." },
    { num: "04", title: "Appointment Booking Systems", description: "Reduce booking friction by allowing appropriate qualified prospects to schedule directly, without requiring a phone call or extended back-and-forth." },
    { num: "05", title: "Qualification Workflows", description: "Structured questions and workflows that help identify context, fit, and the appropriate next action—feeding a human decision rather than replacing it. Designed to inform follow-up, not to make final judgment on every prospect." },
    { num: "06", title: "Conversion Optimization", description: "Ongoing testing, data review, and improvement across the conversion touchpoints that matter most—from first response to booked appointment." },
  ];

  return (
    <section
      aria-labelledby="gws-approach-h2"
      className="bg-surface py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="02" />
            <div className="lg:mt-3">
              <SectionLabel label="The GWS Approach" />
            </div>
          </div>

          <div className="max-w-[720px]">
            <RevealOnScroll>
              <h2
                id="gws-approach-h2"
                className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-4"
              >
                Systematic conversion infrastructure across every <span style={{ color: '#841617' }}>inbound channel</span>.
              </h2>
              <p className="text-[17px] leading-[1.65] text-gray-500">
                Conversion Systems organize six capabilities designed to work together. Each one addresses a specific point where opportunity can be lost—and where a designed system can preserve it.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Six capability cards */}
        <div className="max-w-[1000px] space-y-4">
          {components.map((c, i) => (
            <RevealOnScroll key={c.num} delay={i * 50}>
              <article
                className="border border-gray-200 rounded-none bg-white p-6 md:p-7 transition-all duration-250 hover:border-[#841617]/40 hover:shadow-[0_4px_14px_rgba(132,22,23,0.08)]"
              >
                <div className="grid grid-cols-[50px_1fr] gap-4 md:gap-8 items-start">
                  <div className="flex-shrink-0 flex items-start">
                    <span className="font-serif font-normal text-[#841617] text-[22px] md:text-[24px] leading-[1]">
                      {c.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[20px] md:text-[22px] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
                      {c.description}
                    </p>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* Lead Response taxonomy link */}
        <div className="mt-10 max-w-[1000px]">
          <p className="text-[15px] leading-[1.6] text-gray-500">
            <span className="font-sans font-semibold text-gray-900">Part of:</span>{" "}
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
      className="bg-surface py-[88px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="03" />
            <div className="lg:mt-3">
              <SectionLabel label="After-Hours & Conversion Diagnostic" />
            </div>
          </div>
          <div className="max-w-[640px]">
            <RevealOnScroll>
              <h2
                id="after-hours-cta-h2"
                className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[640px]"
              >
                How many qualified leads are you losing <span style={{ color: '#841617' }}>after hours</span>?
              </h2>
              <p className="text-[18px] leading-[1.65] text-gray-500 mb-8 max-w-[580px]">
                The Revenue Diagnostic can help identify where response gaps, missed-call handling, after-hours coverage, qualification friction, booking friction, and routing gaps may be affecting opportunity.
              </p>
              <p className="text-[18px] leading-[1.65] text-gray-500 mb-8 max-w-[580px]">
                It is designed to assess the potential business impact of these gaps—not as a sales presentation, but as a structured look at where your conversion system is helping and where it is limiting.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/revenue-diagnostic"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                  style={{ color: '#ffffff' }}
                >
                  Book a Revenue Diagnostic
                </a>
                <a
                  href="/framework"
                  className="inline-flex items-center gap-2 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] border-b border-[#841617] pb-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                >
                  Understand the Framework
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </RevealOnScroll>

            {/* Right — Dark info panel */}
            <RevealOnScroll delay={120}>
              <aside
                aria-labelledby="call-info-h3"
                className="bg-gws-dark text-white rounded-none p-8 md:p-10"
              >
                <h3
                  id="call-info-h3"
                  className="font-serif font-normal text-[22px] md:text-[24px] leading-[1.2] mb-6"
                >
                  What Happens on the Call
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-none bg-[#1a1a1a]/40 border border-white/5 hover:bg-[#1a1a1a]/60 hover:border-white/10 transition-all">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-crimson flex items-center justify-center text-[13px] font-sans font-bold">
                      <span aria-hidden="true">1</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-normal text-[16px] md:text-[17px] leading-[1.3] text-white/95 mb-0.5">
                        Diagnostic Conversation
                      </h4>
                      <p className="text-[15px] md:text-[16px] leading-[1.55] text-white/60">
                        A working session on your current inbound flow, response patterns, and where leads tend to slow down or go cold.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-none bg-[#1a1a1a]/40 border border-white/5 hover:bg-[#1a1a1a]/60 hover:border-white/10 transition-all">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-crimson flex items-center justify-center text-[13px] font-sans font-bold">
                      <span aria-hidden="true">2</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-normal text-[16px] md:text-[17px] leading-[1.3] text-white/95 mb-0.5">
                        Infrastructure Assessment
                      </h4>
                      <p className="text-[15px] md:text-[16px] leading-[1.55] text-white/60">
                        A look at your speed-to-lead, after-hours handling, qualification, booking, and routing—measured against what a reliable conversion system requires.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-none bg-[#1a1a1a]/40 border border-white/5 hover:bg-[#1a1a1a]/60 hover:border-white/10 transition-all">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-crimson flex items-center justify-center text-[13px] font-sans font-bold">
                      <span aria-hidden="true">3</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-normal text-[16px] md:text-[17px] leading-[1.3] text-white/95 mb-0.5">
                        Handoff & Routing Review
                      </h4>
                      <p className="text-[15px] md:text-[16px] leading-[1.55] text-white/60">
                        An evaluation of where context breaks down between systems or owners, and where structure could preserve it.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-none bg-[#1a1a1a]/40 border border-white/5 hover:bg-[#1a1a1a]/60 hover:border-white/10 transition-all">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-crimson flex items-center justify-center text-[13px] font-sans font-bold">
                      <span aria-hidden="true">4</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-normal text-[16px] md:text-[17px] leading-[1.3] text-white/95 mb-0.5">
                        Actionable Recommendations
                      </h4>
                      <p className="text-[15px] md:text-[16px] leading-[1.55] text-white/60">
                        Clear next steps—not a generic deck, not a sales pitch. A focused read on what to address first and why.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </RevealOnScroll>
          </div>
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
      className="bg-black text-white py-[72px] md:py-[112px] relative overflow-hidden"
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
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-crimson/15 blur-[100px] pointer-events-none"
      />
      <div className={`${CONTAINER} relative z-10 text-center`}>
        <RevealOnScroll>
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-white/50">
            Start with the system
          </p>
          <h2
            id="closing-band-h2"
            className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 mx-auto max-w-[720px]"
            style={{ color: '#ffffff' }}
          >
            Your business doesn't have a marketing problem. It has a <span className="heading-accent" style={{ color: '#C41E3A' }}>Conversion System</span> problem.
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/70 mb-4 mx-auto max-w-[600px]">
            A Revenue Diagnostic is not a sales pitch. It's a diagnostic conversation to identify where your conversion system is leaking — and what it would take to fix it.
          </p>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/70 mb-10 mx-auto max-w-[600px]">
            Conversion Systems are the depth of Lead Response within Revenue Infrastructure — turning inbound opportunity into measurable pipeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/revenue-diagnostic"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
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

// ─── Main Page Component ─────────────────────────────────────────────────

export default function ConversionSystems() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main className="gws-page">
        <TableOfContents />
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
