import React, { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TableOfContents from "@/components/TableOfContents";

// Cal.com embed global type
declare global {
  interface Window {
    Cal: {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
      (event: string, ...args: unknown[]): void;
    };
  }
}

/**
 * AI VISIBILITY REVIEW — Booking Surface
 *
 * Canonical booking route: /ai-visibility-review
 * Booking target: https://cal.com/clayton-tidwell-gws/gws-ai-visibility-call
 *
 * This is the focused scheduling surface for the AI Visibility Review conversion flow.
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
 * - Target URL: https://cal.com/clayton-tidwell-gws/gws-ai-visibility-call
 * - Embed via <CalEmbed> component below
 * - Fallback: external link opens in new tab with rel="noopener noreferrer"
 */

const CAL_URL = "https://cal.com/clayton-tidwell-gws/gws-ai-visibility-call";

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
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 500ms ease-out ${delay}ms, transform 500ms ease-out ${delay}ms`,
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
    <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 industries-section-label">
      {label}
    </h3>
  );
}

// ─── Cal.com Embed ────────────────────────────────────────────────────────
// Inline Cal.com embed for the AI Visibility Review booking surface.
// Reference: https://docs.cal.com/embedding
// Target calLink: clayton-tidwell-gws/gws-ai-visibility-call
//
// Behavior:
// - On mount, injects https://app.cal.com/embed/embed.js once.
// - Renders the official inline embed into #my-cal-inline-gws-ai-visibility-call.
// - If the script fails to load, falls back to a "Open Booking Calendar" link.

const CAL_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
const CAL_ELEMENT_ID = "my-cal-inline-gws-ai-visibility-call";
const CAL_NAMESPACE = "gws-ai-visibility-call";

function CalEmbed() {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    // Inject the Cal.com loader IIFE exactly as the official snippet requires.
    const loader = document.createElement("script");
    loader.type = "text/javascript";
    loader.async = true;
    loader.text = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_SCRIPT_SRC}", "init");`;

    const init = document.createElement("script");
    init.type = "text/javascript";
    init.text = `
      Cal("init", "${CAL_NAMESPACE}", {origin:"https://app.cal.com"});
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      Cal.ns["${CAL_NAMESPACE}"]("inline", {
        elementOrSelector:"#${CAL_ELEMENT_ID}",
        config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
        calLink: "clayton-tidwell-gws/${CAL_NAMESPACE}",
      });
      Cal.ns["${CAL_NAMESPACE}"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;

    const handleError = () => setState("error");
    loader.addEventListener("error", handleError);
    init.addEventListener("error", handleError);

    document.body.appendChild(loader);
    document.body.appendChild(init);

    // If the Cal global becomes available, mark loaded.
    const checkInterval = window.setInterval(() => {
      if (window.Cal && (window.Cal as any).loaded) {
        setState("loaded");
        window.clearInterval(checkInterval);
      }
    }, 250);

    // Stop polling after 12s and surface fallback.
    const timeout = window.setTimeout(() => {
      window.clearInterval(checkInterval);
      if (state !== "loaded") setState("error");
    }, 12000);

    return () => {
      window.clearInterval(checkInterval);
      window.clearTimeout(timeout);
      loader.removeEventListener("error", handleError);
      init.removeEventListener("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === "error") {
    return (
      <div className="cal-embed-fallback">
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
    <div
      id={`cal-embed-wrapper-${CAL_NAMESPACE}`}
      style={{ width: "100%", height: "100%", minHeight: "700px", position: "relative" }}
    >
      {state === "loading" && (
        <div
          className="cal-embed-loading"
          aria-live="polite"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: 14,
            pointerEvents: "none",
          }}
        >
          Loading booking calendar…
        </div>
      )}
      {/* Cal.com inline embed target. */}
      <div
        id={CAL_ELEMENT_ID}
        style={{ width: "100%", height: "100%", minHeight: "700px", overflow: "scroll" }}
      />
    </div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────

function DiagnosticHero() {
  return (
    <section
      aria-labelledby="ai-visibility-review-h1"
      className="bg-surface pt-[96px] md:pt-[128px] pb-[64px] md:pb-[80px] border-b border-stone-300"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="max-w-[640px]">
          <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 industries-section-label">
            AI Visibility
          </h3>
          <h1
            id="ai-visibility-review-h1"
            className="font-serif font-normal text-gray-900 leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Book your <span style={{ color: '#841617' }}>AI Visibility Review</span>.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-900 mb-5 max-w-[600px]">
            Choose a time that works for you to begin a structured conversation about how your business appears to AI-powered search systems — and what it takes to get found, cited, and recommended.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 max-w-[560px]">
            You do not need to have your AI visibility fully diagnosed before the conversation.
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
      className="bg-white py-[112px] md:py-[96px] border-b border-stone-300"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <h3
            id="booking-section-label"
            className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-6 industries-section-label"
          >
            Schedule
          </h3>
        </RevealOnScroll>
        <div
          className="cal-embed-container"
          style={{ maxWidth: "900px" }}
        >
          <CalEmbed />
        </div>

        {/* Cal.com embed loader script — required for inline embed */}
        <script
          src="https://app.cal.com/embed/embed.js"
          defer
          onError={() => console.error("Cal embed loader failed to load")}
        />
      </div>
    </section>
  );
}

// ─── What to Expect ───────────────────────────────────────────────────────

const WHAT_EXPECT = [
  {
    step: "1",
    title: "Understand",
    desc: "Discuss how your business currently appears across AI-powered search systems like ChatGPT, Gemini, Perplexity, and Google AI Overviews.",
  },
  {
    step: "2",
    title: "Identify",
    desc: "Look for gaps in entity accuracy, citation authority, and content signals that affect how AI systems represent your business.",
  },
  {
    step: "3",
    title: "Prioritize",
    desc: "Clarify which AI visibility improvements will create the most meaningful impact for your specific market and buyer journey.",
  },
  {
    step: "4",
    title: "Decide",
    desc: "Determine the most appropriate next step toward becoming the recommended choice in AI-assisted buying environments.",
  },
];

function WhatToExpectSection() {
  return (
    <section
      aria-labelledby="what-expect-h2"
      className="bg-surface py-[112px] md:py-[88px] border-b border-stone-300"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <SectionLabel label="What to Expect" />
          <h2
            id="what-expect-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-10 max-w-[640px]"
          >
            <span style={{ color: '#841617' }}>A structured conversation</span>. No obligation.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[900px]">
          {WHAT_EXPECT.map((item, i) => (
            <RevealOnScroll key={item.step} delay={i * 60}>
              <div className="flex flex-col h-full border border-gray-200 rounded-none bg-white p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-crimson bg-surface flex items-center justify-center mb-5">
                  <span className="text-[13px] font-sans font-bold text-crimson">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif font-normal text-gray-900 text-[20px] leading-[1.25] mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-gray-500">
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
      className="relative overflow-hidden"
      style={{ background: '#000000', color: '#FFFFFF', paddingTop: 88, paddingBottom: 144 }}
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
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 relative z-10 text-center">
        <RevealOnScroll>
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.40)' }}>
            No preparation required
          </p>
          <h2
            id="preparation-h2"
            className="font-serif font-normal text-[32px] md:text-[44px] leading-[1.15] mb-6 max-w-[640px] mx-auto"
            style={{ color: '#FFFFFF' }}
          >
            Come as you are.
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] mb-5 max-w-[560px] mx-auto" style={{ color: 'rgba(255,255,255,0.70)' }}>
            You do not need to prepare a formal presentation or diagnose the issue yourself.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] mb-8 max-w-[560px] mx-auto" style={{ color: 'rgba(255,255,255,0.60)' }}>
            Useful context — not required — may include:
          </p>
          <div className="max-w-[560px] mx-auto mb-10 text-left">
            <ul className="space-y-3">
              {[
                "What the business sells and who the primary customer is",
                "How leads are generated today",
                "What happens after an inquiry is received",
                "Current CRM, sales, or marketing systems in place",
                "The issue that prompted the conversation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center mt-[2px]">
                    <span className="text-[12px] font-sans font-bold" style={{ color: 'rgba(255,255,255,0.70)' }}>•</span>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-[560px] mx-auto p-6 border border-white/10 rounded-none" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <p className="text-[15px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.70)' }}>
              <strong style={{ color: '#FFFFFF' }}>Not a sales call.</strong> If there is no clear fit, GWS will say so. There is no obligation.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────

export default function AIVisibilityReview() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <TableOfContents />
        <DiagnosticHero />
        <BookingSection />
        <WhatToExpectSection />
        <PreparationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
