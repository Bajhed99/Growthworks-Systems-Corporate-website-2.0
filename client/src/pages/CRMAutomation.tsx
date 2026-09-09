import React, { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

/**
 * CRM & AUTOMATION — Solution Detail Page
 *
 * Route: /solutions/crm-automation
 * Live source: https://www.growthworks-systems.com/solutions/crm-automation
 *
 * Canonical relationship: SALES OPERATIONS (Solutions Overview taxonomy)
 * → deeper CRM & Automation implementation capability.
 *
 * Architecture preserved from source:
 * Header → Hero (Cream) → 01 Business Problem (White)
 * → 02 GWS Approach (Cream) → Revenue Ops / Diagnostic CTA
 * (Cream + dark info panel) → Dark Closing Band → Footer
 */

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
      setVisible(true);
      hasTriggered.current = true;
      return;
    }
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 600ms ease ${delayMs}ms, transform 600ms ease ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Shared Helpers ────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[18px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
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

// ─── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      aria-labelledby="crm-hero-h1"
      className="bg-surface pt-[112px] md:pt-[144px] pb-[72px] md:pb-[88px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="max-w-[680px]">
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
            CRM &amp; Automation
          </p>
          <h1
            id="crm-hero-h1"
            className="font-serif font-normal text-gray-900 leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
            style={{ textWrap: "balance" }}
          >
            <span className="text-[#841617]">Revenue leakage</span> lives in the gaps between your systems.
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-900 mb-6 max-w-[620px]">
            CRM and Revenue Operations close the gaps between marketing, sales and delivery — reducing handoff failures, inconsistent follow-up, and limited visibility that cost businesses qualified pipeline every month.
          </p>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-gray-500 mb-10 max-w-[620px]">
            The gap between your marketing, sales, and delivery systems is where qualified prospects are lost — and where the right revenue infrastructure can recover them.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/revenue-diagnostic"
              className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-[#841617] hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
              style={{ fontFamily: '"DM Sans", Arial, sans-serif' }}
            >
              Book a Revenue Diagnostic
            </a>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("problem-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="framework-learn-more mt-6"
          >
            Learn More
          </button>
          <Accordion type="single" collapsible className="mt-4 max-w-[620px]">
            {[
              {
                q: "What causes revenue leakage?",
                a: "Revenue leakage occurs when leads slip through gaps between disconnected systems — manual data entry, inconsistent follow-up, and limited pipeline visibility all contribute to lost opportunities.",
              },
              {
                q: "How does CRM automation help?",
                a: "Automated workflows, structured lead routing, and integrated systems eliminate handoff failures and ensure every qualified prospect receives consistent, timely engagement.",
              },
              {
                q: "What does a Revenue Diagnostic cover?",
                a: "A structured conversation about your current CRM, automation, and pipeline visibility — and the highest-impact improvements that deserve first attention.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-[16px] font-sans text-gray-600 hover:text-[#841617] transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px] leading-[1.65] text-gray-500">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// ─── Section 01 — The Business Problem ─────────────────────────────────────

function ProblemSection() {
  const items = [
    "Leads are entered manually, creating delays and data gaps.",
    "Follow-up depends on individual discipline rather than systematic automation.",
    "Pipeline visibility is limited to what salespeople self-report.",
    "Marketing and sales data live in separate systems with no integration.",
    "There is no measurement of lead source, conversion rate, or revenue attribution.",
  ];

  return (
    <section
      id="problem-section"
      aria-labelledby="problem-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="01" />
            <div className="lg:mt-3">
              <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">
                The Business Problem
              </p>
            </div>
          </div>

          <div className="max-w-[680px]">
            <RevealOnScroll>
              <h2
                id="problem-h2"
                className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6"
              >
                Most businesses have a CRM. Few have a revenue system.
              </h2>
              <p className="text-[18px] leading-[1.65] text-gray-900 mb-10 max-w-[680px]">
                A CRM that isn't connected to your marketing, website, and communication systems is a contact database — not a revenue system. Without automated workflows, consistent follow-up, and pipeline visibility, qualified leads fall through gaps that are invisible until a prospect chooses a competitor.
              </p>
            </RevealOnScroll>

            <div className="max-w-[720px] space-y-0">
              {items.map((text, i) => (
                <RevealOnScroll key={i} delayMs={i * 60}>
                  <div className="flex gap-4 py-5 border-b border-gray-200 first:border-t first:border-gray-200">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 mt-[10px] w-[6px] h-[6px] rounded-full bg-[#841617]"
                    />
                    <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">{text}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02 — The GWS Approach ────────────────────────────────────────

function ApproachSection() {
  const components = [
    {
      num: "01",
      title: "CRM Configuration & Optimization",
      desc: "Configure your CRM as a revenue system — not a contact database. Includes pipeline stages, lead scoring where appropriate, and workflow automation.",
    },
    {
      num: "02",
      title: "Lead Routing & Assignment",
      desc: "Ensure every qualified lead reaches the right person using consistent routing logic. Automated routing eliminates the handoff gap.",
    },
    {
      num: "03",
      title: "Follow-Up Automation",
      desc: "Structured follow-up sequences aligned to buying stages — maintaining contact with prospects through every stage of the process.",
    },
    {
      num: "04",
      title: "Pipeline Visibility & Reporting",
      desc: "Dashboards and reporting that give visibility into pipeline condition, progression, conversion, and forecasting.",
    },
    {
      num: "05",
      title: "Workflow Automation",
      desc: "Reduce unnecessary repetitive work across sales, onboarding, and client-management processes — freeing your team for high-value work.",
    },
    {
      num: "06",
      title: "Integration Architecture",
      desc: "Connect your CRM appropriately to website, phone, email, calendar, and other approved operational tools — eliminating data silos and handoff failures.",
    },
  ];

  return (
    <section
      aria-labelledby="approach-h2"
      className="bg-surface py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="02" />
            <div className="lg:mt-3">
              <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">
                The GWS Approach
              </p>
            </div>
          </div>

          <div className="max-w-[1000px]">
            <RevealOnScroll>
              <h2
                id="approach-h2"
                className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-4 max-w-[720px]"
              >
                Six components of a functioning revenue system.
              </h2>
              <p className="text-[17px] leading-[1.65] text-gray-500 mb-10 md:mb-12">
                CRM and Revenue Operations are built around six interconnected components. Each addresses a specific gap where revenue leakage occurs — and where a designed system can close it.
              </p>
            </RevealOnScroll>

            {components.map((c, i) => (
              <RevealOnScroll key={c.num} delayMs={i * 50}>
                <div
                  className={`grid grid-cols-[60px_1fr] md:grid-cols-[80px_minmax(220px,1fr)_2fr] gap-4 md:gap-8 py-7 md:py-8 ${
                    i < components.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <div>
                    <span className="font-serif font-normal text-[#841617] text-[22px] md:text-[24px] leading-[1]">
                      {c.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-gray-900 leading-[1.25] text-[20px] md:text-[22px]">
                      {c.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section — Revenue Operations / Diagnostic CTA ─────────────────────────

function DiagnosticCTASection() {
  const steps = [
    { num: "1", title: "Structured diagnostic conversation", desc: "Not a sales presentation." },
    { num: "2", title: "Current-state / Revenue Infrastructure assessment", desc: "Context across your existing systems." },
    { num: "3", title: "Identify highest-priority improvement opportunity", desc: "The most meaningful constraint first." },
    { num: "4", title: "Establish useful next-step direction", desc: "No obligation, no guaranteed proposal." },
  ];

  return (
    <section
      aria-labelledby="diagnostic-cta-h2"
      className="bg-surface py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left — CTA */}
          <RevealOnScroll>
            <SectionLabel label="Revenue Operations" />
            <h2
              id="diagnostic-cta-h2"
              className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[640px]"
            >
              Find out where your revenue operations are leaking.
            </h2>
            <p className="text-[18px] leading-[1.65] text-gray-500 mb-8 max-w-[580px]">
              A diagnostic conversation about your current CRM, automation, and pipeline visibility — and the highest-impact improvements that deserve first attention.
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
                className="inline-flex items-center gap-2 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] border-b border-[#841617] pb-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
              >
                Understand the Framework
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </RevealOnScroll>

          {/* Right — Dark info panel */}
          <RevealOnScroll delayMs={120}>
            <div className="bg-gws-dark text-white rounded-none p-8 md:p-10">
              <h3 className="font-serif font-normal text-[22px] md:text-[24px] leading-[1.2] mb-6">
                What Happens on the Call
              </h3>
              <div className="space-y-5">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-crimson flex items-center justify-center text-[13px] font-sans font-bold">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-serif font-normal text-[16px] md:text-[17px] leading-[1.3] text-white/95 mb-0.5">
                        {step.title}
                      </h4>
                      <p className="text-[16px] md:text-[17px] leading-[1.6] text-white/60">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── Dark Closing Band ─────────────────────────────────────────────────────

function ClosingBand() {
  return (
    <section
      aria-labelledby="closing-h2"
      className="bg-gws-dark text-white py-[72px] md:py-[112px] relative overflow-hidden"
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
      <div className={`${CONTAINER} relative z-10`}>
        <RevealOnScroll>
          <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">
            Start with the system
          </p>
          <h2
            id="closing-h2"
            className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Your business doesn't have a marketing problem.
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/70 mb-4 max-w-[600px]">
            It has a Revenue Infrastructure problem.
          </p>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/70 mb-10 max-w-[600px]">
            A Revenue Diagnostic is not a sales pitch. It's a diagnostic conversation to identify where your revenue infrastructure is leaking — and what it would take to fix it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
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

// ─── Main Component ────────────────────────────────────────────────────────

export default function CRMAutomation() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <ApproachSection />
        <DiagnosticCTASection />
        <ClosingBand />
      </main>
      <SiteFooter />
    </div>
  );
}
