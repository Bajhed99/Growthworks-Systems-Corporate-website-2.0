import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * AI VISIBILITY CALL — Booking Surface
 *
 * Canonical booking route: /ai-visibility-call
 * Cal inline embed: https://app.cal.com/embed/embed.js
 * Cal link: clayton-tidwell-gws/gws-ai-visibility-call
 */

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

function SectionLabel({ label }: { label: string }) {
  return (
    <h3 className="text-[18px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {label}
    </h3>
  );
}

function CalEmbed() {
  return (
    <div className="cal-embed-wrapper" style={{ minHeight: "680px" }}>
      <div
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        id="my-cal-inline-gws-ai-visibility-call"
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "gws-ai-visibility-call", {origin:"https://app.cal.com"});
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns["gws-ai-visibility-call"]("inline", {
  elementOrSelector:"#my-cal-inline-gws-ai-visibility-call",
  config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
  calLink: "clayton-tidwell-gws/gws-ai-visibility-call",
});
Cal.ns["gws-ai-visibility-call"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});`,
        }}
      />
    </div>
  );
}

function AIVisibilityHero() {
  return (
    <section
      aria-labelledby="ai-visibility-call-h1"
      className="bg-surface pt-[96px] md:pt-[128px] pb-[64px] md:pb-[80px] border-b border-stone-300"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="max-w-[640px]">
          <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">
            AI Visibility Call
          </h3>
          <h1
            id="ai-visibility-call-h1"
            className="font-serif font-normal text-gray-900 leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            Book your AI Visibility Call.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-900 mb-5 max-w-[600px]">
            Choose a time to discuss how your business can become visible to AI systems, improve discoverability, and align your digital presence with how modern search and recommendation engines operate.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 max-w-[560px]">
            No pre-work required. We will assess your current visibility and identify the highest-impact adjustments.
          </p>
        </div>
      </div>
    </section>
  );
}

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
            className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-6 text-gray-400"
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
      </div>
    </section>
  );
}

const WHAT_EXPECT = [
  {
    step: "1",
    title: "Review",
    desc: "Understand how AI systems currently perceive your business and content.",
  },
  {
    step: "2",
    title: "Identify",
    desc: "Pinpoint gaps in structured data, entity clarity, and visibility signals.",
  },
  {
    step: "3",
    title: "Plan",
    desc: "Agree on prioritized actions to improve discoverability and authority.",
  },
  {
    step: "4",
    title: "Proceed",
    desc: "Determine the right next step — whether implementation or deeper analysis.",
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
            A focused conversation. No obligation.
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

function PreparationSection() {
  return (
    <section
      aria-labelledby="preparation-h2"
      className="bg-white py-[112px] md:py-[88px] border-b border-stone-300"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="max-w-[640px]">
          <RevealOnScroll>
            <SectionLabel label="No Preparation Required" />
            <h2
              id="preparation-h2"
              className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6"
            >
              Come as you are.
            </h2>
            <p className="text-[18px] leading-[1.65] text-gray-900 mb-5">
              You do not need to have an AI strategy fully formed before the call.
            </p>
            <p className="text-[16px] leading-[1.65] text-gray-500 mb-8">
              Useful context — not required — may include:
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <ul className="space-y-3 mb-8">
              {[
                "Current website and digital presence overview",
                "Who the primary audience is and how they discover you",
                "Any existing SEO, content, or structured-data work",
                "The business outcomes that matter most right now",
                "What prompted the interest in AI visibility",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-gray-500"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] w-[6px] h-[6px] shrink-0 rounded-full bg-crimson"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="p-6 border border-crimson/25 rounded-none bg-surface">
              <p className="text-[15px] leading-[1.65] text-gray-500">
                <strong className="text-gray-900">Not a sales call.</strong>{" "}
                If there is no clear fit, GWS will say so. There is no obligation.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

export default function AIVisibilityCallPage() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <AIVisibilityHero />
        <BookingSection />
        <WhatToExpectSection />
        <PreparationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
