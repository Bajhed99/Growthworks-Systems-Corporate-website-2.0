import React, { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TableOfContents from "@/components/TableOfContents";

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

function Hero() {
  return (
    <section
      aria-labelledby="crm-hero-title"
      className="gws-glowy-hero"
      style={{ minHeight: 'unset', height: 655.078 }}
    >
      <div className="gws-glowy-canvas" style={{ height: 655.078 }} />
      <div className="gws-glowy-content" style={{ paddingBottom: 108 }}>
        <div className={CONTAINER}>
          <div className="gws-glowy-content-inner" style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="gws-glowy-badge">
              CRM &amp; Automation
            </div>
            <h2 id="crm-hero-title" className="gws-glowy-title">
              Revenue leakage lives in the gaps <span style={{ color: 'var(--maroon)' }}>between your systems.</span>
            </h2>
            <p className="gws-glowy-copy">
              CRM and Revenue Operations close the gaps between marketing, sales and delivery — reducing handoff failures, inconsistent follow-up, and limited visibility that cost businesses qualified pipeline every month.
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

function ProblemSection() {
  const items = [
    {
      label: "Leads are entered manually, creating delays and data gaps.",
      detail: "Manual entry means prospects sit idle between capture and CRM creation. Every minute of delay lowers the chance of a timely, high-quality follow-up.",
    },
    {
      label: "Follow-up depends on individual discipline rather than systematic automation.",
      detail: "When follow-up lives in human memory, consistency breaks down. A structured sequence ensures every prospect receives appropriate attention regardless of who owns the lead.",
    },
    {
      label: "Pipeline visibility is limited to what salespeople self-report.",
      detail: "Self-reported data is incomplete and delayed. Real pipeline visibility comes from system-recorded activity, deal stages, and conversion metrics.",
    },
    {
      label: "Marketing and sales data live in separate systems with no integration.",
      detail: "Disconnected systems create orphaned touchpoints. Integration ensures context travels with the prospect from first interaction through close.",
    },
    {
      label: "There is no measurement of lead source, conversion rate, or revenue attribution.",
      detail: "Without measurement you cannot identify which channels produce revenue, which stages leak opportunities, or where to invest for the highest return.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="problem-section" aria-labelledby="problem-h2" className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]">
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
              <h2 id="problem-h2" className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6">
                Most businesses have a CRM. Few have a <span className="text-crimson">revenue system.</span>
              </h2>
              <p className="text-[18px] leading-[1.65] text-gray-900 mb-10 max-w-[680px]">
                A CRM that isn't connected to your marketing, website, and communication systems is a contact database — not a revenue system. Without automated workflows, consistent follow-up, and pipeline visibility, qualified leads fall through gaps that are invisible until a prospect chooses a competitor.
              </p>
            </RevealOnScroll>

            <div className="space-y-3">
              {items.map((item, i) => (
                <RevealOnScroll key={i} delayMs={i * 60}>
                  <article
                    className={`border border-gray-200 rounded-none bg-white transition-all duration-250 hover:border-[#841617]/40 hover:shadow-[0_4px_12px_rgba(132,22,23,0.06)] ${
                      openIndex === i ? "border-[#841617]/50 shadow-[0_4px_14px_rgba(132,22,23,0.08)]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={openIndex === i}
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-start gap-4 p-5 text-left min-h-[48px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                    >
                      <span aria-hidden="true" className="flex-shrink-0 mt-[10px] w-[6px] h-[6px] rounded-full bg-[#841617]" />
                      <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-900 flex-1">
                        {item.label}
                      </p>
                      <span
                        aria-hidden="true"
                        className={`flex-shrink-0 mt-[8px] w-7 h-7 rounded-full border border-[#841617] bg-white flex items-center justify-center text-[16px] font-sans font-bold text-[#841617] transition-transform ${openIndex === i ? "rotate-45" : ""}`}
                      >
                        <span className="leading-none">+</span>
                      </span>
                    </button>

                    {openIndex === i && (
                      <div className="px-5 pb-5 pl-[26px] text-[16px] md:text-[17px] leading-[1.65] text-gray-500 border-t border-gray-200">
                        {item.detail}
                      </div>
                    )}
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const components = [
    { num: "01", title: "CRM Configuration & Optimization", desc: "Configure your CRM as a revenue system — not a contact database. Includes pipeline stages, lead scoring where appropriate, and workflow automation." },
    { num: "02", title: "Lead Routing & Assignment", desc: "Ensure every qualified lead reaches the right person using consistent routing logic. Automated routing eliminates the handoff gap." },
    { num: "03", title: "Follow-Up Automation", desc: "Structured follow-up sequences aligned to buying stages — maintaining contact with prospects through every stage of the process." },
    { num: "04", title: "Pipeline Visibility & Reporting", desc: "Dashboards and reporting that give visibility into pipeline condition, progression, conversion, and forecasting." },
    { num: "05", title: "Workflow Automation", desc: "Reduce unnecessary repetitive work across sales, onboarding, and client-management processes — freeing your team for high-value work." },
    { num: "06", title: "Integration Architecture", desc: "Connect your CRM appropriately to website, phone, email, calendar, and other approved operational tools — eliminating data silos and handoff failures." },
  ];

  return (
    <section aria-labelledby="approach-h2" className="bg-surface py-[72px] md:py-[112px] border-b border-[#D8D5CE]">
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
              <h2 id="approach-h2" className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-4 max-w-[720px]">
                Six components of a functioning <span className="text-crimson">revenue system.</span>
              </h2>
              <p className="text-[17px] leading-[1.65] text-gray-500 mb-10 md:mb-12">
                CRM and Revenue Operations are built around six interconnected components. Each addresses a specific gap where revenue leakage occurs — and where a designed system can close it.
              </p>
            </RevealOnScroll>

            <div className="space-y-4">
              {components.map((c, i) => (
                <RevealOnScroll key={c.num} delayMs={i * 50}>
                  <article
                    className={`border border-gray-200 rounded-none bg-white p-6 md:p-7 transition-all duration-250 hover:border-[#841617]/40 hover:shadow-[0_4px_14px_rgba(132,22,23,0.08)]`}
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
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiagnosticCTASection() {
  const steps = [
    { num: "1", title: "Structured diagnostic conversation", desc: "Not a sales presentation." },
    { num: "2", title: "Current-state / Revenue Infrastructure assessment", desc: "Context across your existing systems." },
    { num: "3", title: "Identify highest-priority improvement opportunity", desc: "The most meaningful constraint first." },
    { num: "4", title: "Establish useful next-step direction", desc: "No obligation, no guaranteed proposal." },
  ];

  return (
    <section aria-labelledby="diagnostic-cta-h2" className="bg-surface py-[88px] md:py-[112px] border-b border-[#D8D5CE]">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="03" />
            <div className="lg:mt-3">
              <SectionLabel label="Revenue Operations" />
            </div>
          </div>
          <div className="max-w-[640px]">
            <RevealOnScroll>
              <h2 id="diagnostic-cta-h2" className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[640px]">
                Find out where your <span className="text-crimson">revenue operations</span> are leaking.
              </h2>
              <p className="text-[18px] leading-[1.65] text-gray-500 mb-8 max-w-[580px]">
                A diagnostic conversation about your current CRM, automation, and pipeline visibility — and the highest-impact improvements that deserve first attention.
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
            <RevealOnScroll delayMs={120}>
              <div className="bg-gws-dark text-white rounded-none p-8 md:p-10">
                <h3 className="font-serif font-normal text-[22px] md:text-[24px] leading-[1.2] mb-6">
                  What Happens on the Call
                </h3>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div
                      key={step.num}
                      className="flex gap-4 items-start p-4 rounded-none bg-[#1a1a1a]/40 border border-white/5 hover:bg-[#1a1a1a]/60 hover:border-white/10 transition-all"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-crimson flex items-center justify-center text-[13px] font-sans font-bold">
                        <span aria-hidden="true">{step.num}</span>
                      </div>
                      <div>
                        <h4 className="font-serif font-normal text-[16px] md:text-[17px] leading-[1.3] text-white/95 mb-0.5">
                          {step.title}
                        </h4>
                        <p className="text-[15px] md:text-[16px] leading-[1.55] text-white/60">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingBand() {
  return (
    <section aria-labelledby="closing-h2" className="bg-black text-white py-[72px] md:py-[112px] relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div aria-hidden="true" className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-crimson/15 blur-[100px] pointer-events-none" />
      <div className={`${CONTAINER} relative z-10`}>
        <RevealOnScroll>
          <div className="text-center">
            <p className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-white/50">
              Start with the system
            </p>
            <h2 id="closing-h2" className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 mx-auto max-w-[720px]" style={{ color: '#ffffff' }}>
              Your business doesn't have a marketing problem. It has a <span className="heading-accent" style={{ color: '#C41E3A' }}>Revenue Infrastructure</span> problem.
            </h2>
            <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/70 mb-4 mx-auto max-w-[600px]">
              A Revenue Diagnostic is not a sales pitch. It's a diagnostic conversation to identify where your revenue infrastructure is leaking — and what it would take to fix it.
            </p>
            <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/70 mb-10 mx-auto max-w-[600px]">
              Your website is one part of that infrastructure. The Revenue Diagnostic examines how all the parts work together.
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
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default function CRMAutomation() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <TableOfContents />
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
