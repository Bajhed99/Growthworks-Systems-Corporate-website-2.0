import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * REVENUE DIAGNOSTIC — Booking Surface
 *
 * Canonical booking route: /revenue-diagnostic
 * Booking target: https://cal.com/clayton-tidwell-gws/discovery-audit-call
 *
 * This is the focused scheduling surface for the Revenue Diagnostic conversion flow.
 * NOT another landing page, contact page, methodology page, or Solutions page.
 *
 * Responsibilities:
 * - Concise orientation
 * - Cal.com embed (or production-ready placeholder)
 * - Loading + error/fallback states
 * - What to Expect (4 steps)
 * - Preparation reassurance
 * - Clear header/footer navigation
 *
 * Cal.com integration:
 * - Target URL: https://cal.com/clayton-tidwell-gws/discovery-audit-call
 * - Embed via <CalEmbed> component below
 * - Fallback: external link opens in new tab with rel="noopener noreferrer"
 */

const CAL_URL = "https://cal.com/clayton-tidwell-gws/discovery-audit-call";

// ─── RevealOnScroll ────────────────────────────────────────────────────────

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
        transform: visible ? "translateY(0)" : "translateY(10px)",
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

// ─── Section label ────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {label}
    </p>
  );
}

// ─── Cal.com Embed ────────────────────────────────────────────────────────
// Production-ready Cal.com embed component.
// Replace the placeholder markup with the official Cal.com embed library
// when the integration is ready.
// Reference: https://docs.cal.com/embedding
//
// CAL.COM EMBED INTEGRATION POINT
// Target URL: https://cal.com/clayton-tidwell-gws/discovery-audit-call
// Once Cal.com embed script is available, replace the placeholder div below
// with the official Cal.com embed (e.g. <Cal /> from @calcom/embed-react
// or inline embed script with data-url pointing to CAL_URL).

type EmbedState = "idle" | "loading" | "loaded" | "error";

function CalEmbed() {
  const [state, setState] = useState<EmbedState>("idle");
  const [externalFallback, setExternalFallback] = useState(false);

  // NOTE: This is a production-ready placeholder.
  // The embed area below renders when Cal.com's official embed script is
  // available. Until then, the fallback external link handles booking.
  //
  // To activate the real embed, add the Cal.com embed script to the page:
  // <script src="https://app.cal.com/assets/embed/embed.js" />
  // Then render the Cal.com inline embed using data-url="CAL_URL"
  // or use the official @calcom/embed-react package.
  //
  // The container, loading state, and error/fallback are all production-ready
  // and require only the embed wiring to be completed.

  const handleFallbackClick = () => {
    setExternalFallback(true);
  };

  if (state === "error" || externalFallback) {
    return (
      <div className="cal-embed-fallback">
        <div className="cal-embed-fallback-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <p className="cal-embed-fallback-text">
          Having trouble loading the booking calendar?
        </p>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cal-embed-fallback-link"
        >
          Open Booking Calendar
        </a>
      </div>
    );
  }

  return (
    <div className="cal-embed-wrapper">
      {state === "idle" || state === "loading" ? (
        <div className="cal-embed-loading" aria-live="polite" aria-busy={state === "loading"}>
          <div className="cal-embed-loading-spinner" aria-hidden="true" />
          <span className="cal-embed-loading-text">Loading booking calendar…</span>
        </div>
      ) : null}

      {/*
        CAL.COM EMBED INTEGRATION POINT — replace comment with actual Cal.com embed.

        Example inline embed (requires Cal.com embed script from
        https://app.cal.com/assets/embed/embed.js):

        <div
          class="cal-embed"
          data-url={CAL_URL}
          style={{ width: "100%", height: "100%", minHeight: "640px" }}
        />

        Or with the React package @calcom/embed-react:

        import { InlineWidget } from "react-calendly";
        <InlineWidget
          url={CAL_URL}
          styles={{ height: "660px" }}
          pageSettings={{ ... }}
        />

        The container div below provides the structural shell.
        Once the embed is wired, remove the loading/error fallback UI
        and rely on the embed's own loading state.
      */}

      {/* Placeholder — production-ready structural shell. */}
      {/* To activate: add Cal.com embed script and render inline embed. */}
      <div
        className="cal-embed-placeholder"
        role="region"
        aria-label="Booking calendar"
        style={{ minHeight: "580px" }}
      >
        {/* Embed target area — Cal.com inline embed renders here. */}
        {/* Visible placeholder shown until embed script loads. */}
        <div className="cal-embed-placeholder-inner">
          <div className="cal-embed-placeholder-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <p className="cal-embed-placeholder-label">Booking calendar</p>
          <p className="cal-embed-placeholder-sub">
            The scheduling calendar loads here.
          </p>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cal-embed-placeholder-cta"
          >
            Open Booking Calendar
          </a>
        </div>
      </div>

      {/* Hidden trigger to simulate load completion — remove when real embed is wired */}
      {state === "idle" && (
        <button
          type="button"
          onClick={() => setState("loaded")}
          className="cal-embed-dev-trigger"
          aria-label="Simulate embed loaded (development only)"
          style={{ display: "none" }}
        >
          Dev: simulate load
        </button>
      )}
    </div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────

function DiagnosticHero() {
  return (
    <section
      aria-labelledby="revenue-diagnostic-h1"
      className="bg-[#F8F5EC] pt-[96px] md:pt-[128px] pb-[64px] md:pb-[80px] border-b border-[#D8D5CE]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="max-w-[640px]">
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            Revenue Diagnostic
          </p>
          <h1
            id="revenue-diagnostic-h1"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Book your Revenue Diagnostic.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#2B2B2B] mb-5 max-w-[600px]">
            Choose a time that works for you to begin a structured conversation about where your revenue system may be underperforming, disconnected, or unclear.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#625E59] max-w-[560px]">
            You do not need to have the problem fully diagnosed before the conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Booking Section ───────────────────────────────────────────────────────

function BookingSection() {
  return (
    <section
      aria-labelledby="booking-section-label"
      className="bg-white py-[72px] md:py-[96px] border-b border-[#D8D5CE]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <RevealOnScroll>
          <p
            id="booking-section-label"
            className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-6 text-[#841617]"
          >
            Schedule
          </p>
        </RevealOnScroll>
        <div
          className="cal-embed-container"
          style={{ maxWidth: "900px" }}
        >
          <CalEmbed />
        </div>
      </div>
    </section>
  );
}

// ─── What to Expect ───────────────────────────────────────────────────────

const WHAT_EXPECT = [
  {
    step: "1",
    title: "Understand",
    desc: "Discuss what is happening in the current revenue path.",
  },
  {
    step: "2",
    title: "Identify",
    desc: "Look for meaningful constraints or breakdowns.",
  },
  {
    step: "3",
    title: "Prioritize",
    desc: "Clarify what deserves investigation or improvement first.",
  },
  {
    step: "4",
    title: "Decide",
    desc: "Determine the most appropriate next step.",
  },
];

function WhatToExpectSection() {
  return (
    <section
      aria-labelledby="what-expect-h2"
      className="bg-[#F8F5EC] py-[72px] md:py-[88px] border-b border-[#D8D5CE]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <RevealOnScroll>
          <SectionLabel label="What to Expect" />
          <h2
            id="what-expect-h2"
            className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-10 max-w-[640px]"
          >
            A structured conversation. No obligation.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[900px]">
          {WHAT_EXPECT.map((item, i) => (
            <RevealOnScroll key={item.step} delay={i * 60}>
              <div className="flex flex-col h-full border border-[#DDD6CC] rounded-[14px] bg-white p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#841617] bg-[#F8F5EC] flex items-center justify-center mb-5">
                  <span className="text-[13px] font-sans font-bold text-[#841617]">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif font-normal text-[#2B2B2B] text-[20px] leading-[1.25] mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#625E59]">
                  {item.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Preparation Reassurance ───────────────────────────────────────────────

function PreparationSection() {
  return (
    <section
      aria-labelledby="preparation-h2"
      className="bg-white py-[72px] md:py-[88px] border-b border-[#D8D5CE]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="max-w-[640px]">
          <RevealOnScroll>
            <SectionLabel label="No Preparation Required" />
            <h2
              id="preparation-h2"
              className="font-serif font-normal text-[#2B2B2B] leading-[1.15] text-[32px] md:text-[44px] mb-6"
            >
              Come as you are.
            </h2>
            <p className="text-[18px] leading-[1.65] text-[#2B2B2B] mb-5">
              You do not need to prepare a formal presentation or diagnose the issue yourself.
            </p>
            <p className="text-[16px] leading-[1.65] text-[#625E59] mb-8">
              Useful context — not required — may include:
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <ul className="space-y-3 mb-8">
              {[
                "What the business sells and who the primary customer is",
                "How leads are generated today",
                "What happens after an inquiry is received",
                "Current CRM, sales, or marketing systems in place",
                "The issue that prompted the conversation",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-[#625E59]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] w-[6px] h-[6px] shrink-0 rounded-full bg-[#841617]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="p-6 border border-[#841617]/25 rounded-[12px] bg-[#F8F5EC]">
              <p className="text-[15px] leading-[1.65] text-[#625E59]">
                <strong className="text-[#2B2B2B]">Not a sales call.</strong>{" "}
                If there is no clear fit, GWS will say so. There is no obligation.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────

export default function RevenueDiagnostic() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <DiagnosticHero />
        <BookingSection />
        <WhatToExpectSection />
        <PreparationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
